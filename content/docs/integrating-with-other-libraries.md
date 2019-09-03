---
id: integrating-with-other-libraries
title: Digər Kitabxanalar ilə İnteqrasiya
permalink: docs/integrating-with-other-libraries.html
---

React bütün veb applikasiyalarda işlənilə bilər. React-i digər applikasiyalara və digər applikasiyları React-ə qoşmaq mümkündür. Bu sənəddə çox işlənən ssenarilərə baxacağıq. Bu sənəddə [jQuery](https://jquery.com/) və [Backbone](https://backbonejs.org/) kitabxanalarına inteqrasiyaya fokuslandığımıza baxmayaraq göstərilən fikirlər ilə komponentləri hər hansı mövcud koda inteqrasiya etmək mümkündür.

## DOM Manipulyasiya Plaginlərinə İnteqrasiya {#integrating-with-dom-manipulation-plugins}

React-in DOM-dan kənarda baş verən dəyişikliklərdən xəbəri yoxdur. React yalnız daxili strukturundan istifadə edərək DOM-u yeniləyir. Əgər DOM nodları digər kitabxana tərəfindən manipulyasiya olunursa, React-in başı qarışır və bərpa ola bilmir.

Amma bu o demək deyil ki, React-i DOM-u təsir edən digər həllər ilə birləşdirmək mümkün deyil və ya çətindir. Sadəcə hər həəlin nə etdiyi haqda zehinli olmalısınız.

Ziddiyətlərin olmaması üçün ən asan yol React komponentinin yeniləməsinin qarşısını almaqdır. Siz buna React-in yeniləməyə səbəbi olmayan elementlər (məsələn boş `<div />`) render edərək nail ola bilərsiniz.

### Problemə Yanaşma {#how-to-approach-the-problem}

Bunu göstərə bilmək üçün sadə jQuery plaginini əhatə edən komponent yaradaq.

Biz ana DOM elementinə [ref](/docs/refs-and-the-dom.html) qoşacağıq. `componentDidMount`-da bu elementə referans alıb jQuery plagininə göndərəcəyik.

React-in ilkin renderdən sonra DOM-u render etməsinin qarşısını almaq üçün `render()` funksiyasından boş `<div />` elementi qaytaracağıq. `<div />` elementinin heç bir parametri və ya uşaqları olmadığından, React-in bu komponenti yeniləməsinin heç bir mənası yoxdur. Bu səbəbdən jQuery plagini DOM-un bu hissəsini problemsiz dəyişə bilər:

```js{3,4,8,12}
class SomePlugin extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.somePlugin();
  }

  componentWillUnmount() {
    this.$el.somePlugin('destroy');
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}
```

Nəzərə alın ki, biz `componentDidMount` və `componentWillUnmount` [lifecycle funksiyalarını](/docs/react-component.html#the-component-lifecycle) təyin edirik. Bir çox jQuery plaginləri DOM-a hadisə işləyiciləri qoşduğundan, bu hadisə işləyicilərini `componentWillUnmount`-dan ayırmaq lazımdır. Əgər plagin temizlik üçün heç bir funksiya təmin etmirsə, siz bunu özünüz təmin etməli ola bilərsiniz. Yaddaş sızmalarının olmaması üçün, hadisə işləyicilərini silməyi yaddan çıxarmayın.

### jQuery Chosen Plagini ilə İnteqrasiya {#integrating-with-jquery-chosen-plugin}

Bu konsepsiyaların daha dəqiq misalı üçün, gəlin `<select>` sahələrinə əlavələr edən [Chosen](https://harvesthq.github.io/chosen/) plaginini əhatə edən komponent yaradaq.

>**Qeyd:**
>
>Bunun mümkün olması React applikasiyaları üçün ən yaxşı yol anlamına gəlmir. Biz işlədə bildiyiniz halda React komponentləri işlətməyini tövsiyyə edirik. React komponentlərini React applikasiyalarında işlətmək daha asandır. Əlavə olaraq bu komponentlərin üzərində davranış və görünüş dəyişikləri üçün daha çox kontrol var.

İlk olaraq, gəlin Chosen-ın DOM-un üzərində nə etdiyinə baxaq.

Əgər siz bu plagini `<select>` DOM nodunun üzərində çağırırsınızsa, bu plagin orijinal DOM noddan atributları oxuyur, birsətrli stil ilə nodu gizlədir, və özünəməxsus görünüşü olan DOM nodunu bu orijinal elementdən sonra DOM-a əlavə edir. Sonra, bu plagin dəyişikliklər haqqında xəbər verə bilmək üçün jQuery hadisələrini işlədir.

Fərz edək ki, `<Chosen>` əhatə edən React komponentinin aşağıdaki kimi API-ı olmasını istəyirik:

```js
function Example() {
  return (
    <Chosen onChange={value => console.log(value)}>
      <option>vanil</option>
      <option>şokolad</option>
      <option>çiyələk</option>
    </Chosen>
  );
}
```

Sadəlik üçün biz bu komponenti [kontrol olunmayan komponent](/docs/uncontrolled-components.html) kimi tətbiq edəcəyik.

İlk öncə, `render()` funksiyası `<div>`-in daxilində `<select>` elementi qaytaran boş komponent düzəldəcəyik:

```js{4,5}
class Chosen extends React.Component {
  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
```

Əlavə `<div>`-in daxilində `<select>` elementini necə əhatə etdiyimizə fikir verin. Bunun olması vacibdir. Çünki Chosen plagini `<select>` nodundan sonra yeni DOM nodu əlavə edəcək. Lakin, React-in dünyasında, `<div>` elementinin həmişə bir uşağı var. Bu yolla biz React yeniliklərinin Chosen tərəfindən əlavə edilən əlavə DOM nodu ilə ziddiyətdə olmayacağını siğortalayırıq. Əgər React axınından kənarda DOM-unu dəyişirsinizsə, React-in bu DOM nodlara əl vurmayacağından əmin olun.

İndi biz lifecycle funksiyalarını tətbiq edəcəyik. Chosen plaginini `componentDidMount`-da `<select>` noduna ref ilə inisializasiya edib `componentWillUnmount`-da sökəcəyik:

```js{2,3,7}
componentDidMount() {
  this.$el = $(this.el);
  this.$el.chosen();
}

componentWillUnmount() {
  this.$el.chosen('destroy');
}
```

[**CodePen-də Sınayın**](https://codepen.io/gaearon/pen/qmqeQx?editors=0010)

Nəzərə alın ki, React `this.el` sahəsinə heç bir xüsusi məna vermir. Yuxarıdaki kod, bu sahəyə `render()` funksiyasından `ref` ilə dəyər təyin etdiyimizdən işləyir:

```js
<select className="Chosen-select" ref={el => this.el = el}>
```

Bu bizim komponentimizin render edilməsi üçün yetərlidir. Lakin biz həmçinin dəyər dəyişmələrindən xəbərdar olmaq istəyirik. Bunun üçün Chosen tərəfindən idarə edilən `<select>`-in jQuery `change` hadisəsinə abunə olmaq lazımdır.

Komponentin propları (hadisə işləyiciləri daxil olmaqla) zaman ilə dəyişdiyindən `this.props.onChange` propunu Chosen plagininə bir başa göndərməyəcəyik. Əvəzinə, `this.props.onChange` propu çağıran `handleChange()` funksiyası yaradıb, bu funksiyanı jQuery `change` hadisəsinə abunə edəcəyik:

```js{5,6,10,14-16}
componentDidMount() {
  this.$el = $(this.el);
  this.$el.chosen();

  this.handleChange = this.handleChange.bind(this);
  this.$el.on('change', this.handleChange);
}

componentWillUnmount() {
  this.$el.off('change', this.handleChange);
  this.$el.chosen('destroy');
}

handleChange(e) {
  this.props.onChange(e.target.value);
}
```

[**CodePen-də Sınayın**](https://codepen.io/gaearon/pen/bWgbeE?editors=0010)

Sonda, biz bir məsələnidə nəzərə almalıyıq. React-də proplar zaman ilə dəyişə bilərlər. Məsələn, valideyn komponentin vəziyyəti dəyişərsə `<Chosen>` komponenti fərqli uşaqlar qəbul edə bilər. Bu deməkdir ki, React-in DOM-u idarə etmədiyindən, prop yenilikləri əsasında DOM-u əl ilə yeniləmək lazımdır.

Chosen plaginini sənədləri, orijinal DOM elementində baş verən dəyişikliklər haqqında Chosen-i xəbərdar etmək üçün jQuery `trigger()` API-ından istifadə etməyi təklif edir. Biz React-ə `<select>`-in daxilində `this.props.children` propunu yenilənməsinə icazə verməyimizdən əlavə `componentDidUpdate()` lifecycle funksiyası əlavə edib Chosen-ə uşaq siyahısında baş verən dəyişikliklər haqqında xəbər verəcəyik:

```js{2,3}
componentDidUpdate(prevProps) {
  if (prevProps.children !== this.props.children) {
    this.$el.trigger("chosen:updated");
  }
}
```

Bu halda, React `<select>`-in uşaqlarını yenilədikdə, Chosen özünün DOM elementini yeniləyəcək.

`Chosen` komponentinin tam tətbiqi aşağıdaki formada olacaq:

```js
class Chosen extends React.Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.chosen();

    this.handleChange = this.handleChange.bind(this);
    this.$el.on('change', this.handleChange);
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.$el.trigger("chosen:updated");
    }
  }

  componentWillUnmount() {
    this.$el.off('change', this.handleChange);
    this.$el.chosen('destroy');
  }
  
  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <select className="Chosen-select" ref={el => this.el = el}>
          {this.props.children}
        </select>
      </div>
    );
  }
}
```

[**CodePen-də Sınayın**](https://codepen.io/gaearon/pen/xdgKOz?editors=0010)

## Integrating with Other View Libraries {#integrating-with-other-view-libraries}

React can be embedded into other applications thanks to the flexibility of [`ReactDOM.render()`](/docs/react-dom.html#render).

Although React is commonly used at startup to load a single root React component into the DOM, `ReactDOM.render()` can also be called multiple times for independent parts of the UI which can be as small as a button, or as large as an app.

In fact, this is exactly how React is used at Facebook. This lets us write applications in React piece by piece, and combine them with our existing server-generated templates and other client-side code.

### Replacing String-Based Rendering with React {#replacing-string-based-rendering-with-react}

A common pattern in older web applications is to describe chunks of the DOM as a string and insert it into the DOM like so: `$el.html(htmlString)`. These points in a codebase are perfect for introducing React. Just rewrite the string based rendering as a React component.

So the following jQuery implementation...

```js
$('#container').html('<button id="btn">Say Hello</button>');
$('#btn').click(function() {
  alert('Hello!');
});
```

...could be rewritten using a React component:

```js
function Button() {
  return <button id="btn">Say Hello</button>;
}

ReactDOM.render(
  <Button />,
  document.getElementById('container'),
  function() {
    $('#btn').click(function() {
      alert('Hello!');
    });
  }
);
```

From here you could start moving more logic into the component and begin adopting more common React practices. For example, in components it is best not to rely on IDs because the same component can be rendered multiple times. Instead, we will use the [React event system](/docs/handling-events.html) and register the click handler directly on the React `<button>` element:

```js{2,6,9}
function Button(props) {
  return <button onClick={props.onClick}>Say Hello</button>;
}

function HelloButton() {
  function handleClick() {
    alert('Hello!');
  }
  return <Button onClick={handleClick} />;
}

ReactDOM.render(
  <HelloButton />,
  document.getElementById('container')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/RVKbvW?editors=1010)

You can have as many such isolated components as you like, and use `ReactDOM.render()` to render them to different DOM containers. Gradually, as you convert more of your app to React, you will be able to combine them into larger components, and move some of the `ReactDOM.render()` calls up the hierarchy.

### Embedding React in a Backbone View {#embedding-react-in-a-backbone-view}

[Backbone](https://backbonejs.org/) views typically use HTML strings, or string-producing template functions, to create the content for their DOM elements. This process, too, can be replaced with rendering a React component.

Below, we will create a Backbone view called `ParagraphView`. It will override Backbone's `render()` function to render a React `<Paragraph>` component into the DOM element provided by Backbone (`this.el`). Here, too, we are using [`ReactDOM.render()`](/docs/react-dom.html#render):

```js{1,5,8,12}
function Paragraph(props) {
  return <p>{props.text}</p>;
}

const ParagraphView = Backbone.View.extend({
  render() {
    const text = this.model.get('text');
    ReactDOM.render(<Paragraph text={text} />, this.el);
    return this;
  },
  remove() {
    ReactDOM.unmountComponentAtNode(this.el);
    Backbone.View.prototype.remove.call(this);
  }
});
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/gWgOYL?editors=0010)

It is important that we also call `ReactDOM.unmountComponentAtNode()` in the `remove` method so that React unregisters event handlers and other resources associated with the component tree when it is detached.

When a component is removed *from within* a React tree, the cleanup is performed automatically, but because we are removing the entire tree by hand, we must call this method.

## Integrating with Model Layers {#integrating-with-model-layers}

While it is generally recommended to use unidirectional data flow such as [React state](/docs/lifting-state-up.html), [Flux](https://facebook.github.io/flux/), or [Redux](https://redux.js.org/), React components can use a model layer from other frameworks and libraries.

### Using Backbone Models in React Components {#using-backbone-models-in-react-components}

The simplest way to consume [Backbone](https://backbonejs.org/) models and collections from a React component is to listen to the various change events and manually force an update.

Components responsible for rendering models would listen to `'change'` events, while components responsible for rendering collections would listen for `'add'` and `'remove'` events. In both cases, call [`this.forceUpdate()`](/docs/react-component.html#forceupdate) to rerender the component with the new data.

In the example below, the `List` component renders a Backbone collection, using the `Item` component to render individual items.

```js{1,7-9,12,16,24,30-32,35,39,46}
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.model.on('change', this.handleChange);
  }

  componentWillUnmount() {
    this.props.model.off('change', this.handleChange);
  }

  render() {
    return <li>{this.props.model.get('text')}</li>;
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.collection.on('add', 'remove', this.handleChange);
  }

  componentWillUnmount() {
    this.props.collection.off('add', 'remove', this.handleChange);
  }

  render() {
    return (
      <ul>
        {this.props.collection.map(model => (
          <Item key={model.cid} model={model} />
        ))}
      </ul>
    );
  }
}
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/GmrREm?editors=0010)

### Extracting Data from Backbone Models {#extracting-data-from-backbone-models}

The approach above requires your React components to be aware of the Backbone models and collections. If you later plan to migrate to another data management solution, you might want to concentrate the knowledge about Backbone in as few parts of the code as possible.

One solution to this is to extract the model's attributes as plain data whenever it changes, and keep this logic in a single place. The following is [a higher-order component](/docs/higher-order-components.html) that extracts all attributes of a Backbone model into state, passing the data to the wrapped component.

This way, only the higher-order component needs to know about Backbone model internals, and most components in the app can stay agnostic of Backbone.

In the example below, we will make a copy of the model's attributes to form the initial state. We subscribe to the `change` event (and unsubscribe on unmounting), and when it happens, we update the state with the model's current attributes. Finally, we make sure that if the `model` prop itself changes, we don't forget to unsubscribe from the old model, and subscribe to the new one.

Note that this example is not meant to be exhaustive with regards to working with Backbone, but it should give you an idea for how to approach this in a generic way:

```js{1,5,10,14,16,17,22,26,32}
function connectToBackboneModel(WrappedComponent) {
  return class BackboneComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = Object.assign({}, props.model.attributes);
      this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
      this.props.model.on('change', this.handleChange);
    }

    componentWillReceiveProps(nextProps) {
      this.setState(Object.assign({}, nextProps.model.attributes));
      if (nextProps.model !== this.props.model) {
        this.props.model.off('change', this.handleChange);
        nextProps.model.on('change', this.handleChange);
      }
    }

    componentWillUnmount() {
      this.props.model.off('change', this.handleChange);
    }

    handleChange(model) {
      this.setState(model.changedAttributes());
    }

    render() {
      const propsExceptModel = Object.assign({}, this.props);
      delete propsExceptModel.model;
      return <WrappedComponent {...propsExceptModel} {...this.state} />;
    }
  }
}
```

To demonstrate how to use it, we will connect a `NameInput` React component to a Backbone model, and update its `firstName` attribute every time the input changes:

```js{4,6,11,15,19-21}
function NameInput(props) {
  return (
    <p>
      <input value={props.firstName} onChange={props.handleChange} />
      <br />
      My name is {props.firstName}.
    </p>
  );
}

const BackboneNameInput = connectToBackboneModel(NameInput);

function Example(props) {
  function handleChange(e) {
    props.model.set('firstName', e.target.value);
  }

  return (
    <BackboneNameInput
      model={props.model}
      handleChange={handleChange}
    />
  );
}

const model = new Backbone.Model({ firstName: 'Frodo' });
ReactDOM.render(
  <Example model={model} />,
  document.getElementById('root')
);
```

[**Try it on CodePen**](https://codepen.io/gaearon/pen/PmWwwa?editors=0010)

This technique is not limited to Backbone. You can use React with any model library by subscribing to its changes in the lifecycle methods and, optionally, copying the data into the local React state.

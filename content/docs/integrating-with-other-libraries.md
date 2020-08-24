---
id: integrating-with-other-libraries
title: Digər Kitabxanalar ilə İnteqrasiya
permalink: docs/integrating-with-other-libraries.html
prev: render-props.html
next: accessibility.html
---

React bütün veb applikasiyalarda işlənilə bilər. React-i digər applikasiyalara və digər applikasiyları React-ə qoşmaq mümkündür. Bu sənəddə çox işlənilən ssenarilərə baxacağıq. Əsas olaraq [jQuery](https://jquery.com/) və [Backbone](https://backbonejs.org/) kitabxanalarına inteqrasiyaya fokuslandığımıza baxmayaraq istifadə olunan fikirlər ilə komponentləri hər hansı mövcud koda inteqrasiya etmək mümkündür.

## DOM Manipulyasiya Plaginlərinə İnteqrasiya {#integrating-with-dom-manipulation-plugins}

DOM-da React-dən kənarda baş verən dəyişikliklərdən React-in xəbəri yoxdur. React yalnız daxili strukturundan istifadə edərək DOM-u yeniləyir. Əgər DOM nodları digər kitabxana tərəfindən manipulyasiya olunursa, React-in başı qarışır və bu vəziyyətdən bərpa oluna bilmir.

Lakin bu, DOM-u təsir edən digər həllər ilə React-i birləşdirməyin mümkün olmaması və ya çətin olması anlamına gəlmir. Sadəcə olaraq, hər həllin işləmə prinsipləri haqda zehinli olmaq lazımdır.

React komponentinin yenilənməsinin qarşısını almaq, ziddiyətləri aradan qaldırmaq üçün ən asan yoldur. React-in yeniləməyə səbəbi olmayan elementlər (məsələn boş `<div />`) render edərək bu ziddiyətlərini qarşısını ala bilərsiniz.

### Problemə Yanaşma {#how-to-approach-the-problem}

Bunu göstərə bilmək üçün sadə jQuery plaginini əhatə edən komponent yaradaq.

Biz ana DOM elementinə [ref](/docs/refs-and-the-dom.html) qoşub `componentDidMount` funksiyasında bu elementə referans alıb jQuery plagininə göndərəcəyik.

React-in ilkin renderdən sonra DOM-u render etməsinin qarşısını almaq üçün `render()` funksiyasından boş `<div />` elementi qaytaracağıq. `<div />` elementinin parametrləri və ya uşaqları olmadığından, React-in bu komponenti yeniləməsinin heç bir mənası yoxdur. Bu səbəbdən jQuery plagini DOM-un bu hissəsini problemsiz dəyişə bilər:

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

Nəzərə alın ki, biz `componentDidMount` və `componentWillUnmount` [lifecycle funksiyalarını](/docs/react-component.html#the-component-lifecycle) təyin edirik. Bir çox jQuery plaginləri DOM-a hadisə işləyiciləri qoşduğundan, bu hadisə işləyicilərini `componentWillUnmount`-da ayırmaq lazımdır. Əgər plagin təmizlik üçün heç bir funksiya təmin etmirsə, siz bunu özünüz təmin etməli ola bilərsiniz. Yaddaş sızmalarının olmaması üçün hadisə işləyicilərini silməyi yaddan çıxarmayın.

### jQuery Chosen Plagini ilə İnteqrasiya {#integrating-with-jquery-chosen-plugin}

Bu konsepsiyaların daha dəqiq misalı üçün `<select>` sahələrinə əlavələr edən [Chosen](https://harvesthq.github.io/chosen/) plaginini əhatə edən komponent yaradaq.

>**Qeyd:**
>
>Bu həllin mümkün olması React applikasiyaları üçün ən yaxşı yol anlamına gəlmir. Biz işlədə bildiyiniz halda React komponentləri işlətməyi tövsiyə edirik. React komponentlərini React applikasiyalarında işlətmək daha asandır. Əlavə olaraq bu komponentlərin üzərində davranış və görünüş dəyişikləri üçün daha çox kontrol var.

İlk olaraq, gəlin Chosen plugininin DOM-un üzərində nə etdiyinə baxaq.

Bu plagini `<select>` DOM nodunun üzərində çağırıdıqda, bu plagin orijinal DOM noddan atributları oxuyur, birsətrli stil ilə nodu gizlədir, və özünəməxsus görünüşü olan DOM nodunu bu orijinal elementdən sonra DOM-a əlavə edir. Bundan sonra, dəyişikliklər haqqında xəbər verə bilmək üçün bu plugin jQuery hadisələrindən istifadə edir.

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

Əlavə `<div>`-in daxilində `<select>` elementini əhatə etdiyimizə fikir verin. Bunun olması vacibdir. Çünki, Chosen plagini `<select>` nodundan sonra yeni DOM nodu əlavə edəcək. Lakin, React dünyasında, `<div>` elementinin həmişə bir uşağı var. Bu yol ilə, React yeniliklərinin Chosen tərəfindən əlavə edilən əlavə DOM nodu ilə ziddiyətdə olmayacağını siğortalayırıq. Əgər React axınından kənarda DOM nodləri dəyişirsə, React-in bu nodlara əl vurmayacağından əmin olun.

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

Nəzərə alın ki, React `this.el` parametrinə heç bir xüsusi məna vermir. Yuxarıdaki kod, `render()` funksiyasında bu parametrə `ref` ilə dəyər təyin edildiyindən işləyir:

```js
<select className="Chosen-select" ref={el => this.el = el}>
```

Komponentimizin render edilməsi üçün bu kodun yetərli olmasına baxmayaraq biz dəyər dəyişmələrindən xəbərdar olmaq da istəyirik. Bunun üçün Chosen tərəfindən idarə edilən `<select>`-in jQuery `change` hadisəsinə abunə olmaq lazımdır.

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

Bir məsələnidə nəzərə almaq lazımdır. React-də proplar zaman ilə dəyişə bilər. Məsələn, valideyn komponentin vəziyyəti dəyişdikdə `<Chosen>` komponenti fərqli uşaqlar qəbul edə bilər. React-in DOM-u idarə etmədiyindən, prop yenilikləri əsasında DOM-u əl ilə yeniləmək lazımdır.

Chosen plaginini sənədləri, orijinal DOM elementində baş verən dəyişikliklər haqqında Chosen-i xəbərdar etmək üçün jQuery `trigger()` API-ından istifadə etməyi təklif edir. React-ə `<select>`-in daxilində `this.props.children` propunu yeniləməsinə icazə verməyimizdən əlavə `componentDidUpdate()` lifecycle funksiyasından istifadə edərək Chosen-ə uşaq siyahısında baş verən dəyişikliklər haqqında xəbər verəcəyik:

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

## Digər Kitabxanalar ilə İnteqrasiya {#integrating-with-other-view-libraries}

[`ReactDOM.render()`](/docs/react-dom.html#render) funksiyasının elastikliyi React-i digər applikasiyalara əlavə etməyə imkan yaradır.

Çox zaman React, tək ana React komponentini DOM-a yükləmək üçün işlədilir. Lakin `ReactDOM.render()` ilə UI-ın bir neçə müstəqil hissəsini (məsələn kiçik düymə və ya applikasiya kimi böyük) render etmək olar.

Facebook-da React bu formada işlədilir. Bu bizə React-də applikasiyaları hissə hissə yazmağa və React hissələrini mövcud serverdə yaradılan şablon və ya digər klient kodu ilə birlikdə işlətməyə icazə verir.

### Mətn ilə Render Etməni React ilə Əvəz Etmək {#replacing-string-based-rendering-with-react}

Köhnə veb applikasiyalarda çox işlədilən həllərdən biri, DOM-un hissələrini mətn ilə təsvir edib DOM-a göstərilən formada əlavə etməkdir: `$el.html(htmlString)`. Bu formalı kodlar, React təqdim etmək üçün ən yaxşı nöqtələrdir. Mətn ilə render etmələri React komponentlərinə çevirin.

Aşağıdaki jQuery tətbiqi...

```js
$('#container').html('<button id="btn">Salam De</button>');
$('#btn').click(function() {
  alert('Salam!');
});
```

...React komponenti kimi yazıla bilər:

```js
function Button() {
  return <button id="btn">Salam De</button>;
}

ReactDOM.render(
  <Button />,
  document.getElementById('container'),
  function() {
    $('#btn').click(function() {
      alert('Salam!');
    });
  }
);
```

Siz buradan başlayaraq daha çox kodu komponentlərə çevirib React-də işlədilən praktikaları tətbiq edə bilərsiniz. Məsələn, eyni komponentin bir neçə dəfə render edilə bildiyindən, komponentlərdə ID-lər işlətmək məsləhət deyil. Bunun əvəzinə, [React-in hadisə sistemindən](/docs/handling-events.html) istifadə edib tıklamaq işləyicisini birbaşa React `<button>` elementinə goşa bilərsiniz:

```js{2,6,9}
function Button(props) {
  return <button onClick={props.onClick}>Salam De</button>;
}

function HelloButton() {
  function handleClick() {
    alert('Salam!');
  }
  return <Button onClick={handleClick} />;
}

ReactDOM.render(
  <HelloButton />,
  document.getElementById('container')
);
```

[**CodePen-də Sınayın**](https://codepen.io/gaearon/pen/RVKbvW?editors=1010)

Siz bu formalı komponentləri `ReactDOM.render()`-dən istifadə edib fərqli DOM konteynerlərə  render edə bilərsiniz. Zaman ilə, applikasiyanın daha çox hissələri React-ə çevirərək bə bu komponentləri birləşdirərək `ReactDOM.render()` çağırışlarını iyerarxiyada qaldıra bilərik.

### React-i Backbone Görünüşlərinə Qoşmaq {#embedding-react-in-a-backbone-view}

[Backbone](https://backbonejs.org/) görünüşləri adətən HTML mətnləri və ya mətn yaradan şablon funksiyalarından istifadə edərək DOM elementləri üçün kontent yaradır. Bu proses React komponenti render etməsi ilə əvəz edilə bilər.

Aşağıda `ParagraphView` Backbone görünüşü yaradacağıq. Bu görünüş, Backbone-un `render()` funksiyasını əvəzləyərək `<Paragraph>` React komponentini Backbone tərəfindən təmin edilən DOM elementinə (`this.el`) render edəcək. Biz burada da [`ReactDOM.render()`-dən](/docs/react-dom.html#render) istifadə edəcəyik:

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

[**CodePen-də Sınayın**](https://codepen.io/gaearon/pen/gWgOYL?editors=0010)

Elementin DOM-dan ayrıldığı zaman React-də hadisə işləyicilərini və komponent ağacı haqqında olan resursları silmək üçün `remove` funksiyasında `ReactDOM.unmountComponentAtNode()` çağırmaq lazımdır.

React ağacı *daxilində olan* komponent silindikdə, bu təmizlik işi avtomatik baş verir. Lakin burada elementi ağacdan əl ilə sildiyimizdən, bu funksiyanı çağırmaq lazımdır.

## Model Təbəqələri ilə İnteqrasiya {#integrating-with-model-layers}

Adətən, [React state](/docs/lifting-state-up.html), [Flux](https://facebook.github.io/flux/) və ya [Redux](https://redux.js.org/) kimi bir tərəfli məlumat axından istifadə etməyi tövsiyə etməyimizə baxmayaraq React komponentləri, digər freymvork və kitabxanaların model təbəqələrindən də istifadə edə bilərlər.

### React Komponentlərində Backbone Modellərindən İstifadə {#using-backbone-models-in-react-components}

[Backbone](https://backbonejs.org/) model və kolleksiyalarının React komponentinə istehlakı üçün ən asan yol, fərqli dəyişmə hadisələrinə qulaq asaraq əl ilə yeniləmələri çağırmaqdır.

Modelləri render edən komponentlər `'change'` eventlərinə qulaq asmalı, kolleksiyaları render edən komponentlər isə `'add'` və ya `'remove'` hadisələrinə qulaq asmalıdırlar. Hər iki halda, [`this.forceUpdate()`](/docs/react-component.html#forceupdate) funksiyasını çağıraraq, komponenti yeni məlumat ilə yenidən render edin.

Aşağıdaki nümunədə, `Item` komponenti individual elmentləri render edir, `List` komponenti isə Backbone kolleksiyasını render edir

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

[**CodePen-də Sınayın**](https://codepen.io/gaearon/pen/GmrREm?editors=0010)

### Backbone Modellərindən Məlumatların İxracı {#extracting-data-from-backbone-models}

Yuxarıdaki yanaşma, React komponentlərinin Backbone model və kolleksiyalarından xəbəri olmasını tələb edir. Əgər gələcəkdə digər məlumat kontrol edən həllinə miqrasiya etmək istəyirsinizsə, Backbone haqqında biliyinizi kodda çox az yerlərə tətbiq edin.

Bunun həllinin biri model atributları dəyişdiyi zaman sadə məlumat kimi ixrac edib, bu məntiqi yalnız bir yerdə saxlayın. Aşağıda göstərilən [yüksək dərəcəli komponent](/docs/higher-order-components.html), Backbone modelinin bütün atributlarını state-ə ixrac edib bu məlumatı əhatədə olan komponentə göndərir.

Bu şəkildə yalnız yüksək dərəcəli komponentin Backbone modeli daxili haqqında məlumatı var. Bu həll, applikasiyada olan bir çox komponentin Backbone-dan xəbəri olmamasına imkan yaradır.

Aşağıdaki nümunədə, modelin atributlarının kopiyasını çıxarıb ilkin vəziyyət yaradacağıq. `change` hadisəsinə abunə olub (və silindiyi zaman abunəlikdən çıxıb), dəyişiklik zamanı state-i, modelin cari atributları ilə yeniləyirik. Sonda, `model` propu özü dəyişdikdə köhnə modeli abunəlikdən çıxarıb yeni modelə abunə oluruq.

Nəzərə alın ki, bu nümumə Backbone ilə işləmək üçün tam deyil. Amma, bu sizə ümumi halda Backbone ilə işləmək üçün fikirlər verə bilər:

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

Gəlin bu yol ilə komponent düzəltməyə baxaq. `NameInput` React komponentini Backbone modelinə qoşaraq anket sahəsi dəyişdikdə `firstName` atributunu yeniləyək:

```js{4,6,11,15,19-21}
function NameInput(props) {
  return (
    <p>
      <input value={props.firstName} onChange={props.handleChange} />
      <br />
      Mənim adım: {props.firstName}.
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

[**CodePen-də Sınayın**](https://codepen.io/gaearon/pen/PmWwwa?editors=0010)

Bu texnika yalnız Backbone üçün məhdudlaşmır. React-i hər hansı model kitabxanası ilə işlədib lifecycle funksiyalarında dəyişikliklərə abunə ola bilərsiniz. Əlavə olaraq model məlumatını lokal React state-inə kopiyalaya bilərsiniz.
---
id: refs-and-the-dom
title: Ref-lər və DOM
redirect_from:
  - "docs/working-with-the-browser.html"
  - "docs/more-about-refs.html"
  - "docs/more-about-refs-ko-KR.html"
  - "docs/more-about-refs-zh-CN.html"
  - "tips/expose-component-functions.html"
  - "tips/children-undefined.html"
permalink: docs/refs-and-the-dom.html
---

Ref-lər ilə render metodundan DOM-a və ya React elementlərinə istinad etmək mümkündür.

Normal React məlumat axınında valideyn komponentlərin uşaqlar ilə əlaqəsi üçün yeganə yol [proplardır](/docs/components-and-props.html). Uşaq komponenti dəyişmək üçün bu komponenti yeni proplar ilə render etmək lazımdır. Lakin, bəzi hallarda uşaq komponentini normal imperativ şəkildə məlumat axınından kənarda dəyişmək lazım olur. Dəyişiləcək uşaq komponenti React komponentinin instansiyası və ya DOM elementi ola bilər. React-də hər iki ssenari üçün çıxış yolu var.

### Ref-lərdən Nə Vaxt İstifadə Etmək Lazımdır {#when-to-use-refs}

Bir neçə ssenarilərdə ref-lərdən istifadə etmək faydalıdır:

* Fokusun, yazı seleksiyasının, və ya media ifasının idarə edilməsi.
* İmperativ animasiyaların çağırışı.
* 3-cü tərəfin DOM kitabxanaları ilə inteqrasiya edilməsi.

Deklarativ tətbiq edilə bilən əməliyyatlarda ref-lərdən istifadə etməkdən çəkinin.

Məsələn, `Dialog` komponentinə `open()` və ya `close()` metodlarını ifşa etmək əvəzinə bu komponentə `isOpen` propu göndərin.

### Ref-lərdən Çox İstifadə Etməyin {#dont-overuse-refs}

Applikasiyada "işləri həll etmək" üçün ref-lərdən istifadə etmək istəyə bilərsiniz. Əgər buna meyliniz varsa, state-in komponent iyerarxiyasına malik olması haqqda kritiki fikirləşin. Adətən, state-in iyerarxiyanın üst səviyyələrində yerləşdirilməsi aydın olur. Nümunələr üçün [State-in Qaldırılması](/docs/lifting-state-up.html) təlimatına baxın.

> Qeyd
>
> Aşağıdakı nümunələrdə React-in 16.3-cü versiyasında təqdim edilən `React.createRef()` API-ndan istifadə edilir. Əgər React-in əvvəlki versiyalarından istifadə edirsinizsə, [callback ref-lərindən](#callback-refs) istifadə etməyi tövsiyyə edirik.

### Ref-lərin Yaradılması {#creating-refs}

Ref-lər `React.createRef()` funksiyası ilə yaranaraq React elementlərinə `ref` atributu ilə qoşulur. Adətən, ref-lərin komponentin hər yerində istinad edilə bilməsi üçün komponent yarandılan zaman komponentin instansiya parametrinə təyin edilir.

```javascript{4,7}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

### Ref-lərin İstifadəsi {#accessing-refs}

Ref-i `render` funksiyasında olan elementə göndərdikdə noda göstərilən referansa ref-in `current` atributundan istinad etmək mümkündür.

```javascript
const node = this.myRef.current;
```

Ref-in dəyəri nodun tipinə görə dəyişir:

- `ref` atributunu HTML elementində işlətdikdə kontruktorda `React.createRef()` ilə yaradılan `ref` obyektinin `current` parametri DOM element obyektini qəbul edir.
- `ref` atributunu xüsusi klas komponentində işlətdikdə `ref` obyektinin `current` parametri mount olunan klasın instansiyasını qəbul edir.
- Funksiyaların instansiyaları olmadığından **`ref` atributunu funksiya komponentlərində işlətmək mümkün deyil**.

Aşağıdakı nümunələrdə bu tiplərin fərqləri göstəriləcək.

#### Ref-i DOM Elementinə Əlavə Et {#adding-a-ref-to-a-dom-element}

This code uses a `ref` to store a reference to a DOM node:

```javascript{5,12,22}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

React will assign the `current` property with the DOM element when the component mounts, and assign it back to `null` when it unmounts. `ref` updates happen before `componentDidMount` or `componentDidUpdate` lifecycle methods.

#### Adding a Ref to a Class Component {#adding-a-ref-to-a-class-component}

If we wanted to wrap the `CustomTextInput` above to simulate it being clicked immediately after mounting, we could use a ref to get access to the custom input and call its `focusTextInput` method manually:

```javascript{4,8,13}
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

Note that this only works if `CustomTextInput` is declared as a class:

```js{1}
class CustomTextInput extends React.Component {
  // ...
}
```

#### Refs and Function Components {#refs-and-function-components}

**You may not use the `ref` attribute on function components** because they don't have instances:

```javascript{1,8,13}
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // This will *not* work!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

You should convert the component to a class if you need a ref to it, just like you do when you need lifecycle methods or state.

You can, however, **use the `ref` attribute inside a function component** as long as you refer to a DOM element or a class component:

```javascript{2,3,6,13}
function CustomTextInput(props) {
  // textInput must be declared here so the ref can refer to it
  let textInput = React.createRef();

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />
      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```

### Exposing DOM Refs to Parent Components {#exposing-dom-refs-to-parent-components}

In rare cases, you might want to have access to a child's DOM node from a parent component. This is generally not recommended because it breaks component encapsulation, but it can occasionally be useful for triggering focus or measuring the size or position of a child DOM node.

While you could [add a ref to the child component](#adding-a-ref-to-a-class-component), this is not an ideal solution, as you would only get a component instance rather than a DOM node. Additionally, this wouldn't work with function components.

If you use React 16.3 or higher, we recommend to use [ref forwarding](/docs/forwarding-refs.html) for these cases. **Ref forwarding lets components opt into exposing any child component's ref as their own**. You can find a detailed example of how to expose a child's DOM node to a parent component [in the ref forwarding documentation](/docs/forwarding-refs.html#forwarding-refs-to-dom-components).

If you use React 16.2 or lower, or if you need more flexibility than provided by ref forwarding, you can use [this alternative approach](https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509) and explicitly pass a ref as a differently named prop.

When possible, we advise against exposing DOM nodes, but it can be a useful escape hatch. Note that this approach requires you to add some code to the child component. If you have absolutely no control over the child component implementation, your last option is to use [`findDOMNode()`](/docs/react-dom.html#finddomnode), but it is discouraged and deprecated in [`StrictMode`](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage).

### Callback Refs {#callback-refs}

React also supports another way to set refs called "callback refs", which gives more fine-grain control over when refs are set and unset.

Instead of passing a `ref` attribute created by `createRef()`, you pass a function. The function receives the React component instance or HTML DOM element as its argument, which can be stored and accessed elsewhere. 

The example below implements a common pattern: using the `ref` callback to store a reference to a DOM node in an instance property.

```javascript{5,7-9,11-14,19,29,34}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // Focus the text input using the raw DOM API
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // autofocus the input on mount
    this.focusTextInput();
  }

  render() {
    // Use the `ref` callback to store a reference to the text input DOM
    // element in an instance field (for example, this.textInput).
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

React will call the `ref` callback with the DOM element when the component mounts, and call it with `null` when it unmounts. Refs are guaranteed to be up-to-date before `componentDidMount` or `componentDidUpdate` fires.

You can pass callback refs between components like you can with object refs that were created with `React.createRef()`.

```javascript{4,13}
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

In the example above, `Parent` passes its ref callback as an `inputRef` prop to the `CustomTextInput`, and the `CustomTextInput` passes the same function as a special `ref` attribute to the `<input>`. As a result, `this.inputElement` in `Parent` will be set to the DOM node corresponding to the `<input>` element in the `CustomTextInput`.

### Legacy API: String Refs {#legacy-api-string-refs}

If you worked with React before, you might be familiar with an older API where the `ref` attribute is a string, like `"textInput"`, and the DOM node is accessed as `this.refs.textInput`. We advise against it because string refs have [some issues](https://github.com/facebook/react/pull/8333#issuecomment-271648615), are considered legacy, and **are likely to be removed in one of the future releases**. 

> Note
>
> If you're currently using `this.refs.textInput` to access refs, we recommend using either the [callback pattern](#callback-refs) or the [`createRef` API](#creating-refs) instead.

### Caveats with callback refs {#caveats-with-callback-refs}

If the `ref` callback is defined as an inline function, it will get called twice during updates, first with `null` and then again with the DOM element. This is because a new instance of the function is created with each render, so React needs to clear the old ref and set up the new one. You can avoid this by defining the `ref` callback as a bound method on the class, but note that it shouldn't matter in most cases.

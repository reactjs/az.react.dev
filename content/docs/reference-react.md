---
id: react-api
title: Üst Səviyyəli React API
layout: docs
category: Arayış
permalink: docs/react-api.html
redirect_from:
  - "docs/reference.html"
  - "docs/clone-with-props.html"
  - "docs/top-level-api.html"
  - "docs/top-level-api-ja-JP.html"
  - "docs/top-level-api-ko-KR.html"
  - "docs/top-level-api-zh-CN.html"
---

`React` React kitabxanası üçün başlanğıc nöqtəsidir. Əgər siz React-i `<script>` təqi ilə yükləyirsinizsə, bu üst səviyyəli API-lar `React` qlobalında mövcuddur. Əgər siz NPM ilə ES6 işlədirsinizsə, siz `import React from 'react'` yaza bilərsiniz. Əgər siz NPM ilə ES5 işlədirsinizsə, siz `var React = require('react')` yaza bilərsiniz.

## İcmal {#overview}

### Komponentlər {#components}

React komponentləri sizə UI-ı müstəqil, yenidən işlənə bilən hissələrə ayırmağa və bu hissələr haqqında ayrılıqda fikirləşməyə imkan yaradır. React komponentləri `React.Component` və ya `React.PureComponent` klaslarını genişləndirərək müəyyənləşdirilə bilir.

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

Əgər siz ES6 klasları istifadə etmirsinizsə, siz `create-react-class` modulundan istifadə edə bilərsiniz. Əlavə məlumat üçün, [ES6-sız React-in istifadəsi](/docs/react-without-es6.html) bölməsini oxuyun.

React komponentləri həmçinin funskiyalar ilə də müəyyənləşdirilə bilərlər. Bu funskiyalar aşağıdakılar ilə əhatə oluna bilərələr:

- [`React.memo`](#reactmemo)

### React Elementlərinin Düzəldilməsi {#creating-react-elements}

Biz UI-ın nə olacağını təsvir etmək üçün [JSX işlətməyi](/docs/introducing-jsx.html) tövsiyyə edirik. Hər bir JSX elementi [`React.createElement()`](#createelement) funskiyasını çağırmaq üçün gözəl sintaksisdir. JSX işlətdikdə adətən aşağıdakı funskiyaları birbaşa çağırmırsınız.

- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

Daha ətraflı məlumat üçün [JSX-siz React-in İşlənməsini](/docs/react-without-jsx.html) oxuyun.

### Elementlərin Transformasiyası {#transforming-elements}

`React` elementlərin manipulyasiyası üçün bir neçə API təmin edir:

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`React.Children`](#reactchildren)

### Fraqmentlər {#fragments}

`React` həmçinin bir neçə elmeentin əhatə olan elementsiz bir neçə elementi render etmək üçün kompoennt tmin edir.

- [`React.Fragment`](#reactfragment)

### Reflər {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### Suspense {#suspense}

Suspense komponentləri render etməmişdən qabaq neyisə "gözləməsinə" imkan yaradır. Bugün, Suspense yalnız bir ssenarini dəstələyir: [komponentlərin `React.lazy` ilə dinamik yüklənməsi](/docs/code-splitting.html#reactlazy). Gələcəkdə, bu başqa ssenariləri (məsələn məklumatın yüklənməsi) də dəstəkləyəcək.

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

### Hooklar {#hooks}

*Hooklar* React 16.8-a yeni əlavədir. Onlar sizə state və başqa React xüsusiyyətlərini klas yazmadan istifadə etməyə imkan yaradır. Hooklara [həsr olunmuş ayrıca sənədləri](/docs/hooks-intro.html) və API arayışları var:

- [Əsas Hooklar](/docs/hooks-reference.html#basic-hooks)
  - [`useState`](/docs/hooks-reference.html#usestate)
  - [`useEffect`](/docs/hooks-reference.html#useeffect)
  - [`useContext`](/docs/hooks-reference.html#usecontext)
- [Əlavə Hooklar](/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](/docs/hooks-reference.html#usereducer)
  - [`useCallback`](/docs/hooks-reference.html#usecallback)
  - [`useMemo`](/docs/hooks-reference.html#usememo)
  - [`useRef`](/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](/docs/hooks-reference.html#usedebugvalue)

* * *

## Arayış {#reference}

### `React.Component` {#reactcomponent}

`React.Component` [ES6 klasları](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) ilə müəyyənləşdirilən React komponentləri üçün əsas klasdır:

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Salam, {this.props.name}</h1>;
  }
}
```

`React.Component` əsas klasına aid Funskiya və parametrlərin siyahısı üçün [React.Component API Arayışına](/docs/react-component.html) baxın.

* * *

### `React.PureComponent` {#reactpurecomponent}

`React.PureComponent` [`React.Component-inə`](#reactcomponent) bənzəyir. Bu ikisi arasında fərq [`React.Component-in`](#reactcomponent) [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) funskiyasını tətbiq etməsəsi, `React.PureComponent`-in isə bu funskiyasının dayaz prop və state müqayisəsi ilə tətbiq etməsidir.

Əgər React komponentin `render()` funskiyası verilən proplar və state əsasında eyni nəticəni render edirsə, siz bəzi hallarda performans üçün `React.PureComponent`-dən istifadə edə bilərsiniz.

> Qeyd
>
> `React.PureComponent`-in `shouldComponentUpdate()` funskiyası obyektləri yalnız dayaz müqayisə edir. Əgər kompleks data strukturlar varsa, bu sizə dərin müqayisələrdə səhv-neqativlər verə bilər. Komponentinizə `PureComponent` ilə yalnız sadə proplar və state olduqda işlədin. Əks halda dərin data stukturlarının dəyişdiyini bildiyiniz zaman [`forceUpdate()`](/docs/react-component.html#forceupdate) funskiyasından istifadə edin. Və ya dərin məlumatların tez müqayisəsi üçün [dəyişməyən obyektlərdən](https://facebook.github.io/immutable-js/) istifadə edin.
>
> Əlavə olaraq, `React.PureComponent`-in `shouldComponentUpdate()` funskiyası komponentdən başlayan komponent ağacının prop yeniliklərini saymır. Əmin olunki, bütün uşaq komponentlərdə "təmizdirlər."

* * *

### `React.memo` {#reactmemo}

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* render using props */
});
```

`React.memo` [yüksək dərəcəli komponentdir](/docs/higher-order-components.html). Bu [`React.PureComponent`](#reactpurecomponent) ilə oxşardır. Lakin bu klaslar əvəzinə funskiya komponentləri ilə işlənilir.

If your function component renders the same result given the same props, you can wrap it in a call to `React.memo` for a performance boost in some cases by memoizing the result. This means that React will skip rendering the component, and reuse the last rendered result.

By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.

```javascript
function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);
```

This method only exists as a **[performance optimization](/docs/optimizing-performance.html).** Do not rely on it to "prevent" a render, as this can lead to bugs.

> Note
>
> Unlike the [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) method on class components, the `areEqual` function returns `true` if the props are equal and `false` if the props are not equal. This is the inverse from `shouldComponentUpdate`.

* * *

### `createElement()` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Create and return a new [React element](/docs/rendering-elements.html) of the given type. The type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](/docs/components-and-props.html) type (a class or a function), or a [React fragment](#reactfragment) type.

Code written with [JSX](/docs/introducing-jsx.html) will be converted to use `React.createElement()`. You will not typically invoke `React.createElement()` directly if you are using JSX. See [React Without JSX](/docs/react-without-jsx.html) to learn more.

* * *

### `cloneElement()` {#cloneelement}

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

Clone and return a new React element using `element` as the starting point. The resulting element will have the original element's props with the new props merged in shallowly. New children will replace existing children. `key` and `ref` from the original element will be preserved.

`React.cloneElement()` is almost equivalent to:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

However, it also preserves `ref`s. This means that if you get a child with a `ref` on it, you won't accidentally steal it from your ancestor. You will get the same `ref` attached to your new element.

This API was introduced as a replacement of the deprecated `React.addons.cloneWithProps()`.

* * *

### `createFactory()` {#createfactory}

```javascript
React.createFactory(type)
```

Return a function that produces React elements of a given type. Like [`React.createElement()`](#createElement), the type argument can be either a tag name string (such as `'div'` or `'span'`), a [React component](/docs/components-and-props.html) type (a class or a function), or a [React fragment](#reactfragment) type.

This helper is considered legacy, and we encourage you to either use JSX or use `React.createElement()` directly instead.

You will not typically invoke `React.createFactory()` directly if you are using JSX. See [React Without JSX](/docs/react-without-jsx.html) to learn more.

* * *

### `isValidElement()` {#isvalidelement}

```javascript
React.isValidElement(object)
```

Elementin React elementi olmasını təsdiqləyir. `true` və ya `false` qaytarır.

* * *

### `React.Children` {#reactchildren}

`React.Children` `this.props.children` qeyri şəffaf data strukturu ilə məşğul olmaq üçün faydalı funskiyalar ilə təmin edir.

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

`children`-da olan hər birbaşa ola uşağın üzərində funskiya çağırır. Bu funskiyada `this`, `thisArg` ilə təyin edilir. Əgər `children` masivdirsə, massiv traver edəcək və funskiya hər uşaqda çağrılacaq. Əgər `children` `null` və ya `undefined`-dirsə, bu funskiya massiv əvəzinə `null` və ya `undefined` qaytaracaq.

> Qeyd
>
> Əgər `children` `Fragment`-dirsə, bu bir uşaq kimi sayılacaq və travers olunmayacaq.

#### `React.Children.forEach` {#reactchildrenforeach}

```javascript
React.Children.forEach(children, function[(thisArg)])
```

[`React.Children.map()`](#reactchildrenmap) kimi. Amma massiv qaytarmır.

#### `React.Children.count` {#reactchildrencount}

```javascript
React.Children.count(children)
```

`children`-də olan komponentlərin sayını qaytarır. Bu dəyər, `map` və ya `forEach` callback-inin neçə dəfə çağrılmasına bərabərdir.

#### `React.Children.only` {#reactchildrenonly}

```javascript
React.Children.only(children)
```

`children`-in yalnız bir uşağı (React elementi) olmasını təsqidləyir və bu elementi qaytarır. Əks halda, bu funksiya xəta atir.

> Qeyd:
>
>`React.Children.only()` [`React.Children.map()`](#reactchildrenmap) funskiyasının qaytardığı dəyəri qəbul etmir. Çünki bu funskiyaının qaytardığı massivdir, React elementi deyil.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

 `children` data strukturundan yastı massiv yaradır, uşaqları açarlar ilə təyin edir, və yaranan massivi qaytarır. Uşaqların kolleksiyalarıni render zamanı manipulyasiya etmək, xüsusilədə `this.props.children`-ı render etməmişdən oncə sıralamaq və ya parçalamaq, üçün yararlıdır.

> Qeyd:
>
> `React.Children.toArray()` uşaqların siyahısını yastıladıqda, iç içə massivlərin semantikasını qorumaq üçün açarları dəyişir. Yəni, `toArray`, qaytarılan massivin daxilində olan hər massivin elementlərin açarlarının düzgün əhatəsi üçün, bütün açarlara prefix əlavə edir.

* * *

### `React.Fragment` {#reactfragment}

`React.Fragment` komponenti bir neçə elementi, əlavə DOM elementi yaratmadan `render()` funskiyasından qaytarmağa imkan yaradır:

```javascript
render() {
  return (
    <React.Fragment>
      Some text.
      <h2>A heading</h2>
    </React.Fragment>
  );
}
```

Siz həmçinin `<></>` qısa sintaksisi işlədə bilərsiniz. Daha ətraflı məlumat üçün, [React v16.2.0: Fraqmentlərin Dəstəyinin Təkmilləşdirilməsi](/blog/2017/11/28/react-v16.2.0-fragment-support.html) yazısını oxuyun.

### `React.createRef` {#reactcreateref}

`React.createRef` React elementlərinə ref parametri ilə qoşulan [ref](/docs/refs-and-the-dom.html) yaradır.
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

`React.forwardRef` creates a React component that forwards the [ref](/docs/refs-and-the-dom.html) attribute it receives to another component below in the tree. This technique is not very common but is particularly useful in two scenarios:

* [Forwarding refs to DOM components](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Forwarding refs in higher-order-components](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` accepts a rendering function as an argument. React will call this function with `props` and `ref` as two arguments. This function should return a React node.

`embed:reference-react-forward-ref.js`

In the above example, React passes a `ref` given to `<FancyButton ref={ref}>` element as a second argument to the rendering function inside the `React.forwardRef` call. This rendering function passes the `ref` to the `<button ref={ref}>` element.

As a result, after React attaches the ref, `ref.current` will point directly to the `<button>` DOM element instance.

For more information, see [forwarding refs](/docs/forwarding-refs.html).

### `React.lazy` {#reactlazy}

`React.lazy()` lets you define a component that is loaded dynamically. This helps reduce the bundle size to delay loading components that aren't used during the initial render.

You can learn how to use it from our [code splitting documentation](/docs/code-splitting.html#reactlazy). You might also want to check out [this article](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) explaining how to use it in more detail.

```js
// This component is loaded dynamically
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Note that rendering `lazy` components requires that there's a `<React.Suspense>` component higher in the rendering tree. This is how you specify a loading indicator.

> **Note**
>
> Using `React.lazy`with dynamic import requires Promises to be available in the JS environment. This requires a polyfill on IE11 and below.

### `React.Suspense` {#reactsuspense}

`React.Suspense` let you specify the loading indicator in case some components in the tree below it are not yet ready to render. Today, lazy loading components is the **only** use case supported by `<React.Suspense>`:

```js
// This component is loaded dynamically
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // Displays <Spinner> until OtherComponent loads
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

It is documented in our [code splitting guide](/docs/code-splitting.html#reactlazy). Note that `lazy` components can be deep inside the `Suspense` tree -- it doesn't have to wrap every one of them. The best practice is to place `<Suspense>` where you want to see a loading indicator, but to use `lazy()` wherever you want to do code splitting.

While this is not supported today, in the future we plan to let `Suspense` handle more scenarios such as data fetching. You can read about this in [our roadmap](/blog/2018/11/27/react-16-roadmap.html).

>Note:
>
>`React.lazy()` and `<React.Suspense>` are not yet supported by `ReactDOMServer`. This is a known limitation that will be resolved in the future.

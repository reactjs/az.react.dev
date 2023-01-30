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

React komponentləri sizə UI-ı müstəqil, yenidən işlənə bilən hissələrə ayırmağa və bu hissələr haqqında ayrılıqda fikirləşməyə imkan yaradır. React komponentləri `React.Component` və ya `React.PureComponent` siniflərini genişləndirərək müəyyənləşdirilə bilir.

 - [`React.Component`](#reactcomponent)
 - [`React.PureComponent`](#reactpurecomponent)

Əgər siz ES6 sinifləri istifadə etmirsinizsə, siz `create-react-class` modulundan istifadə edə bilərsiniz. Əlavə məlumat üçün, [ES6-sız React-in istifadəsi](/docs/react-without-es6.html) bölməsini oxuyun.

React komponentləri həmçinin funksiyalar ilə də müəyyənləşdirilə bilər. Bu funksiyalar aşağıdakılar ilə əhatə oluna bilər:

- [`React.memo`](#reactmemo)

### React Elementlərinin Düzəldilməsi {#creating-react-elements}

Biz UI-ın nə olacağını təsvir etmək üçün [JSX işlətməyi](/docs/introducing-jsx.html) tövsiyə edirik. Hər bir JSX elementi [`React.createElement()`](#createelement) funksiyasını çağırmaq üçün gözəl sintaksisdir. JSX işlətdikdə adətən aşağıdakı funksiyaları birbaşa çağırmırsınız.

- [`createElement()`](#createelement)
- [`createFactory()`](#createfactory)

Daha ətraflı məlumat üçün [JSX-siz React-in İşlənməsini](/docs/react-without-jsx.html) oxuyun.

### Elementlərin Transformasiyası {#transforming-elements}

`React` elementlərin manipulyasiyası üçün bir neçə API təmin edir:

- [`cloneElement()`](#cloneelement)
- [`isValidElement()`](#isvalidelement)
- [`React.Children`](#reactchildren)

### Fraqmentlər {#fragments}


React həmçinin əhatə edən element olmadan bir neçə elementi render etmək üçün komponent təmin edir.

- [`React.Fragment`](#reactfragment)

### Reflər {#refs}

- [`React.createRef`](#reactcreateref)
- [`React.forwardRef`](#reactforwardref)

### Suspense {#suspense}

Suspense komponentləri render etməmişdən qabaq nəyisə "gözləməsinə" imkan yaradır. Bu gün Suspense yalnız bir ssenarini dəstələyir: [komponentlərin `React.lazy` ilə dinamik yüklənməsi](/docs/code-splitting.html#reactlazy). Gələcəkdə bu başqa ssenariləri (məsələn məklumatın yüklənməsi) də dəstəkləyəcək.

- [`React.lazy`](#reactlazy)
- [`React.Suspense`](#reactsuspense)

<<<<<<< HEAD
### Hooklar {#hooks}
=======
### Transitions {#transitions}

*Transitions* are a new concurrent feature introduced in React 18. They allow you to mark updates as transitions, which tells React that they can be interrupted and avoid going back to Suspense fallbacks for already visible content.

- [`React.startTransition`](#starttransition)
- [`React.useTransition`](/docs/hooks-reference.html#usetransition)

### Hooks {#hooks}
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

*Hooklar* React 16.8-a yeni əlavədir. Onlar sizə state və başqa React xüsusiyyətlərini sinif yazmadan istifadə etməyə imkan yaradır. Hooklara [həsr olunmuş ayrıca sənədləri](/docs/hooks-intro.html) və API arayışları var:

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
  - [`useDeferredValue`](/docs/hooks-reference.html#usedeferredvalue)
  - [`useTransition`](/docs/hooks-reference.html#usetransition)
  - [`useId`](/docs/hooks-reference.html#useid)
- [Library Hooks](/docs/hooks-reference.html#library-hooks)
  - [`useSyncExternalStore`](/docs/hooks-reference.html#usesyncexternalstore)
  - [`useInsertionEffect`](/docs/hooks-reference.html#useinsertioneffect)

* * *

## Arayış {#reference}

### `React.Component` {#reactcomponent}

<<<<<<< HEAD
`React.Component` [ES6 sinifləri](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) ilə müəyyənləşdirilən React komponentləri üçün əsas sinifdir:
=======
> Try the new React documentation for [`Component`](https://beta.reactjs.org/reference/react/Component).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.Component` is the base class for React components when they are defined using [ES6 classes](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes):
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Salam, {this.props.name}</h1>;
  }
}
```

`React.Component` əsas sinfinə aid funksiya və parametrlərin siyahısı üçün [React.Component API Arayışına](/docs/react-component.html) baxın.

* * *

### `React.PureComponent` {#reactpurecomponent}

<<<<<<< HEAD
`React.PureComponent`-i [`React.Component`-inə](#reactcomponent) bənzəyir. Bu ikisi arasında fərq [`React.Component-in`](#reactcomponent) [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) funksiyasını tətbiq etməməsi, `React.PureComponent`-in isə bu funksiyanın dayaz prop və state müqayisəsi ilə tətbiq etməsidir.
=======
> Try the new React documentation for [`PureComponent`](https://beta.reactjs.org/reference/react/PureComponent).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.PureComponent` is similar to [`React.Component`](#reactcomponent). The difference between them is that [`React.Component`](#reactcomponent) doesn't implement [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate), but `React.PureComponent` implements it with a shallow prop and state comparison.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

Əgər React komponentin `render()` funksiyası verilən proplar və state əsasında eyni nəticəni render edirsə, siz bəzi hallarda performans üçün `React.PureComponent`-dən istifadə edə bilərsiniz.

> Qeyd
>
<<<<<<< HEAD
> `React.PureComponent`-in `shouldComponentUpdate()` funksiyası obyektləri yalnız dayaz müqayisə edir. Əgər kompleks data strukturlar varsa, bu sizə dərin müqayisələrdə səhv-neqativlər verə bilər. Komponentinizi `PureComponent` ilə yalnız sadə proplar və state olduqda genişləndirin. Əks halda dərin data strukturlarının dəyişdiyini bildiyiniz zaman [`forceUpdate()`](/docs/react-component.html#forceupdate) funksiyasından istifadə edin. Əlavə olaraq, dərin məlumatların tez müqayisəsi üçün [dəyişməyən obyektlərdən](https://facebook.github.io/immutable-js/) istifadə edin.
=======
> `React.PureComponent`'s `shouldComponentUpdate()` only shallowly compares the objects. If these contain complex data structures, it may produce false-negatives for deeper differences. Only extend `PureComponent` when you expect to have simple props and state, or use [`forceUpdate()`](/docs/react-component.html#forceupdate) when you know deep data structures have changed. Or, consider using [immutable objects](https://immutable-js.com/) to facilitate fast comparisons of nested data.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b
>
> Əlavə olaraq, `React.PureComponent`-in `shouldComponentUpdate()` funksiyası komponentdən başlayan komponent ağacının prop yeniliklərini saymır. Əmin olun ki, bütün uşaq komponentlər də "təmizdirlər."

* * *

### `React.memo` {#reactmemo}

> Try the new React documentation for [`memo`](https://beta.reactjs.org/reference/react/memo).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* proplar ilə render edin */
});
```

`React.memo` [yüksək dərəcəli komponentdir](/docs/higher-order-components.html).

Əgər sizin komponentiniz eyni proplar ilə həmişə eyni nəticəni verirsə, siz funksiyanı `React.memo` ilə əhatə edib bəzi hallarda nəticəni memoize edərək performansı artıra bilərsiniz. Bu deməkdir ki, React, komponentin render etməsini atlayıb əvvəlki render etmənin nəticəsini işlədəcək.

`React.memo` funksiyası yalnız prop dəyişikliklərini yoxlayır. `React.memo` ilə əhatə edilən funksiya komponentinin tətbiqində [`useState`](/docs/hooks-state.html), [`useReducer`](/docs/hooks-reference.html#usereducer) və ya [`useContext`](/docs/hooks-reference.html#usecontext) Hookunu istifadə etdikdə bu komponent state və ya kontekst yenilikləri olduqda yenidən render ediləcək.

Bu funksiya default halda props obyektində olan mürəkkəb obyektləri dayaz formada müqayisə edəcək. Əgər müqayisəni idarə etmək istəyirsinizsə, xüsusi müqayisə funksiyasını ikinci arqument kimi göndərə bilərsiniz.

```javascript
function MyComponent(props) {
  /* proplar ilə render edin */
}
function areEqual(prevProps, nextProps) {
  /*
  Əgər nextProps-u render-ə göndərdikdə qaytarılan nəticə,
  prevProps-u render-ə göndərdikdə qaytarılan nəticə ilə eynidirsə,
  true qaytarın. Əks halda false qaytarın.
  */
}
export default React.memo(MyComponent, areEqual);
```

Bu metod yalnız **[performans optimizasiyası](/docs/optimizing-performance.html)** üçün yararlıdır. Bu funksiyaya render-in qarşısını almaq üçün etibar etməyin -- bu sizdə baqlara səbəb ola bilər.

> Qeyd
>
> Sinif komponentlərdə [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) funksiyasından fərqli olaraq, `areEqual` funksiyası proplar eyni olduqda `true`, fərqli olduqda isə `false` qaytarır. Bu `shouldComponentUpdate` funksiyasının tərsidir.

* * *

### `createElement()` {#createelement}

> Try the new React documentation for [`createElement`](https://beta.reactjs.org/reference/react/createElement).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Verilmiş tip ilə yeni [React elementi](/docs/rendering-elements.html) yaradın və qaytarın. Element tipi təq ad yazısı (məsələn `'div'` və ya `'span'`), [React komponent](/docs/components-and-props.html) tipi (sinif və ya funksiya) və ya [React fraqment](#reactfragment) tipi ola bilər.

[JSX](/docs/introducing-jsx.html) ilə yazılmış kod `React.createElement()`-ə çevriləcək. Siz JSX işlətdiyiniz zaman çox vaxt `React.createElement()` funksiyasını birbaşa çağırmırsınız. Ətraflı məlumat üçün [JSX-siz React](/docs/react-without-jsx.html) sənədinə baxın.

* * *

### `cloneElement()` {#cloneelement}

> Try the new React documentation for [`cloneElement`](https://beta.reactjs.org/reference/react/cloneElement).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```
React.cloneElement(
  element,
  [config],
  [...children]
)
```

<<<<<<< HEAD
`element`-i başlanğıc nöqtəsi götürərək, elementi kopiyalayıb, yeni React elementi qaytar. Nəticədə yaranan elementdə orijinal elementin propları ilə yeni propların dayaz birləşməsi var. Yeni uşaqlar mövcud uşaqları əvəz edəcək. `key` və `ref` orijinal elementdəki kimi qalacaq.
=======
Clone and return a new React element using `element` as the starting point. `config` should contain all new props, `key`, or `ref`. The resulting element will have the original element's props with the new props merged in shallowly. New children will replace existing children. `key` and `ref` from the original element will be preserved if no `key` and `ref` present in the `config`.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

`React.cloneElement()` aşağıdakı ifadə ilə təxminən eynidir:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

<<<<<<< HEAD
Lakin, bu həmçinin `ref`-ləridə saxlayır. Bu deməkdir ki, əgər sizə üstündə `ref` olan uşaq gəlirsə, siz təsadüfən, ref-i əcdad komponentdən oğurlamayacaqsınız. Siz yeni `ref` qoşulmuş yeni element alacaqsınız.
=======
However, it also preserves `ref`s. This means that if you get a child with a `ref` on it, you won't accidentally steal it from your ancestor. You will get the same `ref` attached to your new element. The new `ref` or `key` will replace old ones if present.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

Bu API, köhnəlmiş `React.addons.cloneWithProps()` funksiyasının əvəzləmək üçün təqdim edilmişdir.

* * *

### `createFactory()` {#createfactory}

> Try the new React documentation for [`createFactory`](https://beta.reactjs.org/reference/react/createFactory).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
React.createFactory(type)
```

Verilmiş tip ilə React elementlər yaradan funksiya qaytarır. [`React.createElement()`](#createelement) kimi, tip arqumenti təq ad yazısı (məsələn `'div'` və ya `'span'`), [React komponent](/docs/components-and-props.html) tipi (sinif və ya funksiya) və ya [React fraqment](#reactfragment) tipi ola bilər.

Bu köməkçi funksiya köhnəlmiş kimi hesab edilir və biz bu funksiyanı işlətmək əvəzinə birbaşa JSX və ya `React.createElement()` işlətməyi təşviq edirik.

Siz JSX işlətdiyiniz zaman çox vaxt `React.createFactory()` funksiyasını birbaşa çağırmırsınız. Ətraflı məlumat üçün [JSX-siz React](/docs/react-without-jsx.html) sənədinə baxın.

* * *

### `isValidElement()` {#isvalidelement}

> Try the new React documentation for [`isValidElement`](https://beta.reactjs.org/reference/react/isValidElement).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```javascript
React.isValidElement(object)
```

Elementin React elementi olmasını təsdiqləyir. `true` və ya `false` qaytarır.

* * *

### `React.Children` {#reactchildren}

<<<<<<< HEAD
`React.Children` `this.props.children` qeyri şəffaf data strukturu ilə məşğul olmaq üçün faydalı funksiyalar ilə təmin edir.
=======
> Try the new React documentation for [`Children`](https://beta.reactjs.org/reference/react/Children).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.Children` provides utilities for dealing with the `this.props.children` opaque data structure.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

#### `React.Children.map` {#reactchildrenmap}

```javascript
React.Children.map(children, function[(thisArg)])
```

`children`-da olan hər birbaşa ola uşağın üzərində funksiya çağırır. Bu funksiyada `this`, `thisArg` ilə təyin edilir. Əgər `children` massivdirsə, massiv traver edəcək və funksiya hər uşaqda çağrılacaq. Əgər `children` `null` və ya `undefined`-dirsə, bu funksiya massiv əvəzinə `null` və ya `undefined` qaytaracaq.

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

`children`-in yalnız bir uşağı (React elementi) olmasını təsqidləyir və bu elementi qaytarır. Əks halda, bu funksiya xəta atır.

> Qeyd:
>
>`React.Children.only()` [`React.Children.map()`](#reactchildrenmap) funksiyasının qaytardığı dəyəri qəbul etmir. Çünki bu funksiyaının qaytardığı massivdir, React elementi deyil.

#### `React.Children.toArray` {#reactchildrentoarray}

```javascript
React.Children.toArray(children)
```

 `children` data strukturundan yastı massiv yaradır, uşaqları açarlar ilə təyin edir və yaranan massivi qaytarır. Uşaqların kolleksiyalarını render zamanı manipulyasiya etmək, xüsusilə də `this.props.children`-ı render etməmişdən öncə sıralamaq və ya parçalamaq üçün yararlıdır.

> Qeyd:
>
> `React.Children.toArray()` uşaqların siyahısını yastıladıqda, iç-içə massivlərin semantikasını qorumaq üçün açarları dəyişir. Yəni, `toArray`, qaytarılan massivin daxilində olan hər massiv elementlərin açarlarının düzgün əhatəsi üçün bütün açarlara prefix əlavə edir.

* * *

### `React.Fragment` {#reactfragment}

<<<<<<< HEAD
`React.Fragment` komponenti bir neçə elementi, əlavə DOM elementi yaratmadan `render()` funksiyasından qaytarmağa imkan yaradır:
=======
> Try the new React documentation for [`Fragment`](https://beta.reactjs.org/reference/react/Fragment).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

The `React.Fragment` component lets you return multiple elements in a `render()` method without creating an additional DOM element:
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

```javascript
render() {
  return (
    <React.Fragment>
      Bir mətn.
      <h2>Başlıq</h2>
    </React.Fragment>
  );
}
```

Siz həmçinin `<></>` qısa sintaksisi işlədə bilərsiniz. Daha ətraflı məlumat üçün, [React v16.2.0: Fraqmentlərin Dəstəyinin Təkmilləşdirilməsi](/blog/2017/11/28/react-v16.2.0-fragment-support.html) yazısını oxuyun.

### `React.createRef` {#reactcreateref}

<<<<<<< HEAD
`React.createRef` React elementlərinə ref parametri ilə qoşulan [ref](/docs/refs-and-the-dom.html) yaradır.
=======
> Try the new React documentation for [`createRef`](https://beta.reactjs.org/reference/react/createRef).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.createRef` creates a [ref](/docs/refs-and-the-dom.html) that can be attached to React elements via the ref attribute.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

<<<<<<< HEAD
`React.forwardRef` qəbul etdiyi [ref-i](/docs/refs-and-the-dom.html) aşağısında olan digər komponentə yönləndirən React komponenti yaradır. Bu texnika tez-tez istifadə olunmur; bu yalnız iki ssenaridə faydalıdır:
=======
> Try the new React documentation for [`forwardRef`](https://beta.reactjs.org/reference/react/forwardRef).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.forwardRef` creates a React component that forwards the [ref](/docs/refs-and-the-dom.html) attribute it receives to another component below in the tree. This technique is not very common but is particularly useful in two scenarios:
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

* [Ref-lərin DOM komponentlərə yönləndirilməsi](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Yüksək dərəcəli komponentlərdə ref-lərin yönləndirilməsi](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` render funksiyasını arqument kimi qəbul edir. React bu funksiyanı `props` və `ref` arqumentləri ilə çağırır. Bu funksiya React nodu qaytarmalıdır.

`embed:reference-react-forward-ref.js`

Bu nümunədə, React, `<FancyButton ref={ref}>` elementinə verilən `ref`-i `React.forwardRef` funksiyasında olan render funksiyasının ikinci arqumentinə ötürür. Bu rendering funksiyası `ref`-i `<button ref={ref}>` elementinə ötürür.

Nəticədə, React ref-i əlavə etdikdən sonra, `ref.current` birbaşa `button` DOM elementini qeyd edəcək.

Əlavə məlumat üçün, [ref-lərin yönləndirilməsini](/docs/forwarding-refs.html) oxuyun.

### `React.lazy` {#reactlazy}

<<<<<<< HEAD
`React.lazy()` sizə dinamik yüklənən komponenti müəyyən etməyə icazə verir. Bu ilkin render zamanı işlənməyən komponentlərin yüklənməsini gecikdirərək, sizin applikasiyanızın paket ölçüsünü azaltmağa kömək edir.
=======
> Try the new React documentation for [`lazy`](https://beta.reactjs.org/reference/react/lazy).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.lazy()` lets you define a component that is loaded dynamically. This helps reduce the bundle size to delay loading components that aren't used during the initial render.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

Siz bunu necə işlətməyi [kod parçalanması sənədindən](/docs/code-splitting.html#reactlazy) öyrənə bilərsiniz. Siz həmçinin bunu işlətmək haqqında daha ətraflı izahat üçün [bu məqaləni](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) oxuya bilərsiniz.

```js
// Bu komponent dinamik olaraq yüklənir
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Nəzərə alın ki, `lazy` komponentləri render etmək üçün komponent ağacında üstdə `<React.Suspense>` komponenti olmalıdır. Siz belə formada yükləmə göstəricisini müəyyənləşdirirsiniz.

<<<<<<< HEAD
> **Qeyd**
>
> `React.lazy`-ni dinamik import ilə işlətmək üçün Javascript mühitində Promise-in olması tələb olunur. Bu, IE11 və aşağı versiyalarda polifilin işlədilməsini tələb edir.

### `React.Suspense` {#reactsuspense}

`React.Suspense`, ağacda olan komponentlərin render-ə hazır olmadığı halda sizə yükləmə indikatoru müəyyənləşdirməyə icazə verir. Bugün, `<React.Suspense>` **yalnız** komponentlərin lazy yüklənməsini dəstəkləyir:
=======
### `React.Suspense` {#reactsuspense}

> Try the new React documentation for [`Suspense`](https://beta.reactjs.org/reference/react/Suspense).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

`React.Suspense` lets you specify the loading indicator in case some components in the tree below it are not yet ready to render. In the future we plan to let `Suspense` handle more scenarios such as data fetching. You can read about this in [our roadmap](/blog/2018/11/27/react-16-roadmap.html).

Today, lazy loading components is the **only** use case supported by `<React.Suspense>`:
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

```js
// Bu komponent dinamik yüklənir
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    // OtherComponent yüklənənədək <Spinner> render olunur
    <React.Suspense fallback={<Spinner />}>
      <div>
        <OtherComponent />
      </div>
    </React.Suspense>
  );
}
```

Bu funksionallıq, [kod parçalanması sənədində](/docs/code-splitting.html#reactlazy) göstərilmişdir. Qeyd edin ki, `lazy` komponentlər `Suspense` ağacının dərinliklərində də ola bilər. Suspense hər bir `lazy` komponenti əhatə etməməlidir. Yükləmə indikatoru görmək istədiyiniz yerdə `<Suspense>`-i əlavə etmək, amma `lazy()`-ni kod parçalaması etmək istədiyiniz yerdə işlətmək ən yaxşı praktikadır.

<<<<<<< HEAD
İndiki gündə dəstəklənməməsinə baxmayaraq, biz gələcəkdə `Suspense`-in məlumat yüklənməsi kimi ssenarilərini dəstəkləməsini planlaşdırırıq. Bu haqda əlavə məlumat üçün, [yol xəritəmizi](/blog/2018/11/27/react-16-roadmap.html) oxuya bilərsiniz.

>Qeyd:
>
>`React.lazy()` və `<React.Suspense>` `ReactDOMServer` tərəfindən dəstəklənmir. Bu məlum olan məhdudiyyət gələcəkdə həll olunacaq.
=======
> Note
>
> For content that is already shown to the user, switching back to a loading indicator can be disorienting. It is sometimes better to show the "old" UI while the new UI is being prepared. To do this, you can use the new transition APIs [`startTransition`](#starttransition) and [`useTransition`](/docs/hooks-reference.html#usetransition) to mark updates as transitions and avoid unexpected fallbacks.

#### `React.Suspense` in Server Side Rendering {#reactsuspense-in-server-side-rendering}
During server side rendering Suspense Boundaries allow you to flush your application in smaller chunks by suspending.
When a component suspends we schedule a low priority task to render the closest Suspense boundary's fallback. If the component unsuspends before we flush the fallback then we send down the actual content and throw away the fallback.

#### `React.Suspense` during hydration {#reactsuspense-during-hydration}
Suspense boundaries depend on their parent boundaries being hydrated before they can hydrate, but they can hydrate independently from sibling boundaries. Events on a boundary before it is hydrated will cause the boundary to hydrate at a higher priority than neighboring boundaries. [Read more](https://github.com/reactwg/react-18/discussions/130)

### `React.startTransition` {#starttransition}

> Try the new React documentation for [`startTransition`](https://beta.reactjs.org/reference/react/startTransition).
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

```js
React.startTransition(callback)
```
`React.startTransition` lets you mark updates inside the provided callback as transitions. This method is designed to be used when [`React.useTransition`](/docs/hooks-reference.html#usetransition) is not available.

> Note:
>
> Updates in a transition yield to more urgent updates such as clicks.
>
> Updates in a transition will not show a fallback for re-suspended content, allowing the user to continue interacting while rendering the update.
>
> `React.startTransition` does not provide an `isPending` flag. To track the pending status of a transition see [`React.useTransition`](/docs/hooks-reference.html#usetransition).
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

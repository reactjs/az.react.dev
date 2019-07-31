---
id: react-component
title: React.Component
layout: docs
category: Reference
permalink: docs/react-component.html
redirect_from:
  - "docs/component-api.html"
  - "docs/component-specs.html"
  - "docs/component-specs-ko-KR.html"
  - "docs/component-specs-zh-CN.html"
  - "tips/UNSAFE_componentWillReceiveProps-not-triggered-after-mounting.html"
  - "tips/dom-event-listeners.html"
  - "tips/initial-ajax.html"
  - "tips/use-react-with-other-libraries.html"
---

Bu səhifədə React komponent klass təriflərinin ətraflı API arayışı var. Bu səhifə, sizin React-in [Komponent və Proplar](/docs/components-and-props.html) və [State və Lifecycle](/docs/state-and-lifecycle.html) kimi React-in əsas konsepsiyalarından məlumatı olduğunuzu fərziyyə edir. Əgər sizin məlumatınız yoxdursa, ilk öncə bu konsepsiyaları oxuyun.

## İcmal

React komponentləri klas və ya funksiya kimi müəyyənləşdirməyə icazə verir. Klas ilə müəyyənləşdirilmiş komponentlərin funksiya komponentlərindən bir neçə əlavə xüsusiyyətləri var və bu səhifədə bu xüsusiyyətlər haqqında ətraflı məlumat var. React klas komponenti yaratmaq üçün, klasları `React.Component`-dən genişləndirmək lazımdır:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Salam, {this.props.name}</h1>;
  }
}
```

`React.Component` subklasında yeganə müəyyənləşdirilməsi olan funksiya [`render()`](#render) funksiyasıdır. Bu səhifədə göstərilən digər bütün funksiyaların müəyyənləşdirilməsi məcburi deyil.

**Biz özünüzün baza komponent klası yaratmamağınızı təvsiyyə edirik.** React komponentlərində, [kodun yenidən işlədilməsi varislik əvəzinə kompozisiya ilə nail olunur](/docs/composition-vs-inheritance.html).

>Qeyd:
>
>React sizə ES6 klas sintaksisindən istifadə etməyə məcbur etmir. Əgər siz ES6 klasları istifadə etmək istəmirsinizsə, `create-react-class` modulu və ya buna oxşar digər abastraksiyadan istifadə edə bilərsiniz. Ətraflı məlumat üçün [ES6-sız React səhifəsinə](/docs/react-without-es6.html) baxın.

### Komponentin Lifecycle-ı {#the-component-lifecycle}

Hər komponentın bir neçə "lifecycle funksiyaları" var. Siz bu funksiyaları yenidən təyin edərək, kodu prosesin xüsusi zamanlarında icra edə bilərsiniz.. **Siz bu [lifecycle sxemindən](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) arayış kimi istifadə edə bilərsiniz.** Aşağıdalı listdə, çox işlədilən lifecycle funksiyaları **qalın** şrift ilə yazılın. Digərlər daha nadir hallarda istifadə olunur.

#### Mount Edilmə {#mounting}

Aşağıdakı funksiyalar komponent yarandığı və DOM-a əlavə edildiyi zaman göstərilən sıra ilə çağrılır:

- [**`constructor()`**](#constructor)
- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [**`render()`**](#render)
- [**`componentDidMount()`**](#componentdidmount)

>Qeyd:
>
>Bu funksiyalar köhnədir və yeni kodda bu funksiyaları [işlətməyin](/blog/2018/03/27/update-on-async-rendering.html):
>
>- [`UNSAFE_componentWillMount()`](#unsafe_componentwillmount)

#### Yeniləmə {#updating}

Propların və state-in dəyişdiyi zaman yenilənmə baş verir. Komponent yenidən render edildiyi zaman aşağıdakı funksiyalar göstərilən sıra ilə çağrılır:

- [`static getDerivedStateFromProps()`](#static-getderivedstatefromprops)
- [`shouldComponentUpdate()`](#shouldcomponentupdate)
- [**`render()`**](#render)
- [`getSnapshotBeforeUpdate()`](#getsnapshotbeforeupdate)
- [**`componentDidUpdate()`**](#componentdidupdate)

>Qeyd:
>
>Bu funksiyalar köhnədir və yeni kodda bu funksiyaları [işlətməyin](/blog/2018/03/27/update-on-async-rendering.html):
>
>- [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate)
>- [`UNSAFE_componentWillReceiveProps()`](#unsafe_componentwillreceiveprops)

#### Unmount Edilmə {#unmounting}

Aşağıdakı funksiya komponent DOM-dan silindiyi zaman çağrılır:

- [**`componentWillUnmount()`**](#componentwillunmount)

#### Xətaların İşlənməsi {#error-handling}

Aşağıdakı funksiyalar render zamanı, lifecycle funksiyasında, və ya uşaq komponentin konstruktorunda error zamanı çağrılır.

- [`static getDerivedStateFromError()`](#static-getderivedstatefromerror)
- [`componentDidCatch()`](#componentdidcatch)

### Digər API-lar {#other-apis}

Komponentlər həmçinin açağıdakı API-lar təmin edirlər:

  - [`setState()`](#setstate)
  - [`forceUpdate()`](#forceupdate)

### Klas Parametrləri {#class-properties}

  - [`defaultProps`](#defaultprops)
  - [`displayName`](#displayname)

### İnstansiya Parametrləri {#instance-properties}

  - [`props`](#props)
  - [`state`](#state)

* * *

## Arayış {#reference}

### Tez-tez istifadə olunan Lifecycle Funksiyaları {#commonly-used-lifecycle-methods}

Bu bölmədəki funksiyalar React komponentləri düzəldərkən istifadə hallarının böyük əksəriyyətini təşkil edir. **Visual arayış üçün [lifecycle sxeminə](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) baxın.**

### `render()` {#render}

```javascript
render()
```

`render()` klas komponenti üçün yeganə müəyyənləşdirilməli funksiyadır.

Çağrıldığı zaman, bu funksiya, `this.props` və `this.state` parametrlərindən istifadə edərək aşağıdakı tipləri qaytarmalıdır:

- **React elementləri.** Adətən [JSX](/docs/introducing-jsx.html) ilə düzəldilir. Məsələn, `<div />` və ya `<MyComponent />` React-ə DOM nodu və ya başqa istifadəçi tərəfindən düzəldilmiş komponenti render etməyi təlimatlandıran React elementləridirlər.
- **Massivlər və fraqmentlər.** Bir renderdən bir neçə elementi qaytarmağa icazə verirlər. Əlavə məlumat üçün [fragmentlər](/docs/fragments.html) haqqında sənədlərə baxın.
- **Portallar**. Uşaqları fərqli DOM ağaçına render eməyə imkan verirlər. Əlavə məlumat üçün [portallar](/docs/portals.html) sənədinə baxın.
- **Mətn və rəqəm.** Bunlar DOM-a mətn nodları kimi render edilirlər.
- **Booleans və ya `null`**. Heç nə render etmə. (Bir çox zaman `return test && <Child />` pattern-i istifadə etmək üçün işlədilir. `test` booleandır.)

`render()` funksiyası saf olmalıdır. Bu deməkdirki, bu funksiya komponent vəziyyətini dəyişmir, hər çağrıldığı zaman eyni nəticəni verir, və birbaşa brauzer ilə əlaqə yaratmır.

Əgər sizə brauzer ilə əlaqə yaratmaq lazındırsa, görüləcək işi `componentDidMount()` və ya digər lifecycle funksiyalarında icra edin. `render()` funksiyasını saf saxladıqda komponentlər haqqında düşünmək asanlaşır.

> Qeyd
>
> Əgər [`shouldComponentUpdate()`](#shouldcomponentupdate) false qaytarırsa, `render()` funksiyası çağrılmayacaq.

* * *

### `constructor()` {#constructor}

```javascript
constructor(props)
```

**Əgər siz state inisializasiya etmirsinizsə və funksiyaları bind etmirsinizsə, React komponenti üçün konstruktor yaratmaq lazım deyil.**

React komponentinin konstruktoru komponent mount olmamışdan qabaq çağrılır. `React.Component` subklası üçün konstruktor yaratdıqda, hər hansı bir ifadədən öncə `super(props)` çağırın. Əks halda, `this.props` konstruktor zamanı `undefined` olacaq. Bu baqlara səbəb ola bilər.

Adətən React konstruktorlar iki halda işlədilir:

* `this.state`-ə obyekt təyin edərək [lokal state-in](/docs/state-and-lifecycle.html) inisializasiyası zamanı.
* [Hadisə işləyiciləri](/docs/handling-events.html) funksiyalarının klas instansiyasına bind edilməsi üçün.

`constructor()`-da **`setState()`-dən istifadə etməyin**. Əgər komponentə lokal state lazımdırsa, **ilkin state-i `this.state`-ə konstruktordan birbaşa təyin edin**:

```js
constructor(props) {
  super(props);
  // Burada this.setState() çağırmayın!
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

`this.state`-ə birbaşa teəyin edilməyi yalnız konstruktorda etmək olar. Bütün başğa funksiyalarda,`this.setState()`-dən istifadə edin.

Konstruktorda side-effektlərdən və ya abunələrdən istifadə etməyin. Bu hallar üçün `componentDidMount()`-dan istifadə edin.

>Qeyd
>
>**Propları state-ə kopiyalamayın! Bu çox tez-tez edilən bir səhvdir:**
>
>```js
>constructor(props) {
>  super(props);
>  // Bunu etməyin!
>  this.state = { color: props.color };
>}
>```
>
>Burada problem bunun lazımsız olduğu (siz birbaşa `this.props.color` istifadə edə bilərsiniz) və baqların yaranmasına səbəb olduğundandır (`color` propuna edilən yeniliklər state-də görünməyəcak).
>
>**Bu pattern-i yalnız prop yeniliklərini bilərəkdən saymamaq istəyirsinizsə işlədin.** Bu halda, propu `initialColor` və ya `defaultColor` kimi adlandırmaq məntiqlidir. Siz komponentin daxili state-ini [komponentin `key`-ini dəyişərək](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) sıfırlaya bilərsiniz.
>
>State-in proplardan asılı olmasını istəyirsinizsə [törənən state-dən çəkinmək üçün olan bloq yazımızı](/blog/2018/06/07/you-probably-dont-need-derived-state.html) oxuyun.


* * *

### `componentDidMount()` {#componentdidmount}

```javascript
componentDidMount()
```

`componentDidMount()` komponentin mount olduqdan (ağaca əlavə olduqdan) dərhal sonra çağrılır. DOM nodlar lazın olan inisializasiyanın burada olması məsləhətlidir. Əgər siz məlumatları kənar yerdən yükləyirsinizsə, şəbəkə sorğusunu bu funksiyadan çağıra bilərsiniz.

Abunələri bu funksiyada qurmaq məsləhətlidir. Əgər siz abunə qurursunuzsa, `componentWillUnmount()` funksiyasında bu abunələri ləğv etməyi unutmayın.

Siz **`setState()`-i dərhal** `componentDidMount()`-dan çağıra bilərsiniz. Bu əlavə render edəcək amma bu render brauzerin ekranı yeniləməsindən öncə baş verəcək. Bu qarantiya verir ki, `render()`-in iki dəfə çağrılmasına baxmayaraq, istifadəçi ara state-i gorməyəcək. Bu pattern performans problemləri yarada bilər. Bu səbədən bu patterni ehtoyat ilə istifadə edin. Bir çox halda, siz ilkin state-i `constructor()`-dan təyin edə bilərsiniz. Amma ölçü və pozisiyadan asılı olan elementləri (məsələn modal və ya tooltip) render etmədən öncə, DOM nodun ölçülərini hesablayıb state-ə yazmaq kimi hallarda bu pattern faydalıdır.

* * *

### `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

`componentDidUpdate()` yeniləmə baş verdikdən dərhal sonra çağrılır. Bu funksiya ilkin render zamanı çağrılmır.

Komponent yeniləndiyi zaman DOM nod üstündə işləmək üçün bu fürsətdən istifadə edin. Bu həmçinin şəbəkə sorğuları etmək üçün yaxşı yerdir. Bu halda cari proplar ilə keçmiş propları müqayisə etməyi unutmayın (məsələn proplar dəyişməyibsə, şəbəkə sorğusu lazım olmaya bilər).

```js
componentDidUpdate(prevProps) {
  // Tipik İstifadə (propları müqayisə etməyi unutmayın):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

Siz **`setState()`-i dərhal** `componentDidUpdate()`-dən çağıra bilərsiniz. Amma qeyd edin ki, **bu yuxarıdakı kimi müqayisə şərt ifadəsində əhatə olmalıdır**. Əks halda bu sonsuz sikla səbəb ola bilər. Həmçinin, bu əlavə render etmələrə səbəb ola bilər və bu renderləri istifadəçi görməsə belə, performans problemləri yarana bilər. Əgər siz propları state-ə uyğun etmək istəyirsinizsə, propu birbaşa işlətməyiniz məsləhət görünür. [Propların state-ə kopiyalanmasının niye baqlara səbəb olacağı](/blog/2018/06/07/you-probably-dont-need-derived-state.html) haqda əlavə məlumat üçün postu oxuyun.

Əgər sizin komponentiniz `getSnapshotBeforeUpdate()` lifecycle funksiyasını tətbiq edirsə (çox nadir hallarda), bu funksiyanin qaytardığı dəyər `componentDidUpdate()` funksiyasının 3cü "snapshot" arqumentinə ötürüləcək. Əks halda bu arqument undefined olacaq.

> Qeyd
>
> [`shouldComponentUpdate()`](#shouldcomponentupdate) false qaytardıqda `componentDidUpdate()` çağrılmayacaq.

* * *

### `componentWillUnmount()` {#componentwillunmount}

```javascript
componentWillUnmount()
```

`componentWillUnmount()` komponent unmount olmamışdan və dağılmamışdan dərhal öncə çağrılır. Bu funksiyada bütün lazımı təmizləmə işlərini (məsələn aktiv taymerləri etibarsız etmək, şəbəkə sorğularını ləğv etmək və ya `componentDidMount()`-da yaranmış abunələri ləğv etmək) yerinə yetirin.

`componentWillUnmount()`-dan **`setState()`-i heç zaman çağırmayın.** Çünki bu komponent heç bir zaman yeniden render edilməyəcək. Komponent instansiyası unmount olduqdan sonra yenidən mount olunmayacaq.

* * *

### Rarely Used Lifecycle Methods {#rarely-used-lifecycle-methods}

The methods in this section correspond to uncommon use cases. They're handy once in a while, but most of your components probably don't need any of them. **You can see most of the methods below on [this lifecycle diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) if you click the "Show less common lifecycles" checkbox at the top of it.**


### `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

Use `shouldComponentUpdate()` to let React know if a component's output is not affected by the current change in state or props. The default behavior is to re-render on every state change, and in the vast majority of cases you should rely on the default behavior.

`shouldComponentUpdate()` is invoked before rendering when new props or state are being received. Defaults to `true`. This method is not called for the initial render or when `forceUpdate()` is used.

This method only exists as a **[performance optimization](/docs/optimizing-performance.html).** Do not rely on it to "prevent" a rendering, as this can lead to bugs. **Consider using the built-in [`PureComponent`](/docs/react-api.html#reactpurecomponent)** instead of writing `shouldComponentUpdate()` by hand. `PureComponent` performs a shallow comparison of props and state, and reduces the chance that you'll skip a necessary update.

If you are confident you want to write it by hand, you may compare `this.props` with `nextProps` and `this.state` with `nextState` and return `false` to tell React the update can be skipped. Note that returning `false` does not prevent child components from re-rendering when *their* state changes.

We do not recommend doing deep equality checks or using `JSON.stringify()` in `shouldComponentUpdate()`. It is very inefficient and will harm performance.

Currently, if `shouldComponentUpdate()` returns `false`, then [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate), [`render()`](#render), and [`componentDidUpdate()`](#componentdidupdate) will not be invoked. In the future React may treat `shouldComponentUpdate()` as a hint rather than a strict directive, and returning `false` may still result in a re-rendering of the component.

* * *

### `static getDerivedStateFromProps()` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

`getDerivedStateFromProps` is invoked right before calling the render method, both on the initial mount and on subsequent updates. It should return an object to update the state, or null to update nothing.

This method exists for [rare use cases](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) where the state depends on changes in props over time. For example, it might be handy for implementing a `<Transition>` component that compares its previous and next children to decide which of them to animate in and out.

Deriving state leads to verbose code and makes your components difficult to think about.  
[Make sure you're familiar with simpler alternatives:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)

* If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](#componentdidupdate) lifecycle instead.

* If you want to **re-compute some data only when a prop changes**, [use a memoization helper instead](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).

* If you want to **"reset" some state when a prop changes**, consider either making a component [fully controlled](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.

This method doesn't have access to the component instance. If you'd like, you can reuse some code between `getDerivedStateFromProps()` and the other class methods by extracting pure functions of the component props and state outside the class definition.

Note that this method is fired on *every* render, regardless of the cause. This is in contrast to `UNSAFE_componentWillReceiveProps`, which only fires when the parent causes a re-render and not as a result of a local `setState`.

* * *

### `getSnapshotBeforeUpdate()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

`getSnapshotBeforeUpdate()` is invoked right before the most recently rendered output is committed to e.g. the DOM. It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. Any value returned by this lifecycle will be passed as a parameter to `componentDidUpdate()`.

This use case is not common, but it may occur in UIs like a chat thread that need to handle scroll position in a special way.

A snapshot value (or `null`) should be returned.

For example:

`embed:react-component-reference/get-snapshot-before-update.js`

In the above examples, it is important to read the `scrollHeight` property in `getSnapshotBeforeUpdate` because there may be delays between "render" phase lifecycles (like `render`) and "commit" phase lifecycles (like `getSnapshotBeforeUpdate` and `componentDidUpdate`).

* * *

### Error boundaries {#error-boundaries}

[Error boundaries](/docs/error-boundaries.html) are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

A class component becomes an error boundary if it defines either (or both) of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch()`. Updating state from these lifecycles lets you capture an unhandled JavaScript error in the below tree and display a fallback UI.

Only use error boundaries for recovering from unexpected exceptions; **don't try to use them for control flow.**

For more details, see [*Error Handling in React 16*](/blog/2017/07/26/error-handling-in-react-16.html).

> Note
> 
> Error boundaries only catch errors in the components **below** them in the tree. An error boundary can’t catch an error within itself.

### `static getDerivedStateFromError()` {#static-getderivedstatefromerror}
```javascript
static getDerivedStateFromError(error)
```

Bu lifecycle funksiyası komponentin aşağısında olan komponentlərdə xəta baş verdikdə çağrılır. Bu funksiya atılan xətanı arqument kimi qəbul edir və yenilənəcək state-i qaytarır.

```js{7-10,13-16}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Sonrakı renderdə xəta UI-nı göstərmək üçün state-i yenilə
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // Burada hər hansı bir xəta UI-ı işlədə bilərsiniz
      return <h1>Xəta baş verdi.</h1>;
    }

    return this.props.children; 
  }
}
```

> Qeyd
>
> `getDerivedStateFromError()` "render" fazası zamanı çağrılır. Bu səbəbdən side-effectlərə icazə yoxdur.
Bu hallar üçün, `componentDidCatch()` işlədin.

* * *

### `componentDidCatch()` {#componentdidcatch}

```javascript
componentDidCatch(error, info)
```

Bu lifecycle funksiyası komponentin aşağısında olan komponentlərdə xəta baş verdikdə çağrılır.
Bu funksiyanın iki arqumenti var:

1. `error` - Baş verən xəta.
2. `info` - `componentStack` açarı altında [hansı komponentin xətanı atdığı haqqında məlumatı saxlayan](/docs/error-boundaries.html#component-stack-traces) obyekt.


`componentDidCatch()` "commit" fazasında çarğrılır. Bu səbəbdən side-effektlərə icazə var. Bu funksiya logging kimi əməliyyatlar üçün işlənilir:

```js{12-19}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Sonrakı renderdə xəta UI-nı göstərmək üçün state-i yenilə
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Example "componentStack":
    //   in ComponentThatThrows (created by App)
    //   in ErrorBoundary (created by App)
    //   in div (created by App)
    //   in App
    logComponentStackToMyService(info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // Burada hər hansı bir xəta UI-ı işlədə bilərsiniz
      return <h1>Xəta baş verdi.</h1>;
    }

    return this.props.children; 
  }
}
```

> Qeyd
> 
> Xəta zamanı, siz `componentDidCatch()`-dən `setState` çağıraraq  xəta UI-nı render edə bilərsiniz. Amma bu gələcək versiyalarda köhnələcək.
> Xəta render etmək üçün `static getDerivedStateFromError()` funksiyasından istifadə edin.

* * *

### Köhnə Lifecycle Funksiyaları {#legacy-lifecycle-methods}

Aşağıdakı lifecycle funksiyalar köhnədirlər. Bu funksiyalar indidə işləməyinə baxmayaraq, biz yeni kodda bu lifecycle-ları işlətməyi tövsiyyə etmirik. Siz [bu bloq yazısında](/blog/2018/03/27/update-on-async-rendering.html) köhnə lifecycle funksiyalarından miqrasiya etmək üçün əlavə məlumat ala bilərsiniz.

### `UNSAFE_componentWillMount()` {#unsafe_componentwillmount}

```javascript
UNSAFE_componentWillMount()
```

> Qeyd
>
> Bu lifecycle əvvəllər `componentWillMount` adlanırdı. Bu ad 17ci versiyaya kimi işləyəcək. [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) istifadə edərək komponentlərinizi yeniləyin.

`UNSAFE_componentWillMount()` mount olmamışdan əvvəl baş verir. Bunun `render()`-dan əvvəl çağrıldığından,  `setState()`-i bu funksiyada sinxron formada çağrıldıqda əlavə render baş vermir. Ümumiyyətlə, biz state-i inisializasiya etmək üçün `constructor()`-dan istifadə etməyi tovsiyyə edirik.

Bu funksiyada side-effectlər və ya abunələrdən istifadə etməyin. Bu hallar üçün, `componentDidMount()`-dan istifadə edin.

Server render zamanı yalnız bu lifecycle funksiyası çağrılır.

* * *

### `UNSAFE_componentWillReceiveProps()` {#unsafe_componentwillreceiveprops}

```javascript
UNSAFE_componentWillReceiveProps(nextProps)
```

> Qeyd
>
> Bu lifecycle əvvəllər `componentWillReceiveProps` adlanırdı. Bu ad 17ci versiyaya kimi işləyəcək. [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) istifadə edərək komponentlərinizi yeniləyin.

> Note:
>
> Using this lifecycle method often leads to bugs and inconsistencies
>
> * If you need to **perform a side effect** (for example, data fetching or an animation) in response to a change in props, use [`componentDidUpdate`](#componentdidupdate) lifecycle instead.
> * If you used `componentWillReceiveProps` for **re-computing some data only when a prop changes**, [use a memoization helper instead](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).
> * If you used `componentWillReceiveProps` to **"reset" some state when a prop changes**, consider either making a component [fully controlled](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) or [fully uncontrolled with a `key`](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) instead.
>
> For other use cases, [follow the recommendations in this blog post about derived state](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

`UNSAFE_componentWillReceiveProps()` is invoked before a mounted component receives new props. If you need to update the state in response to prop changes (for example, to reset it), you may compare `this.props` and `nextProps` and perform state transitions using `this.setState()` in this method.

Note that if a parent component causes your component to re-render, this method will be called even if props have not changed. Make sure to compare the current and next values if you only want to handle changes.

React doesn't call `UNSAFE_componentWillReceiveProps()` with initial props during [mounting](#mounting). It only calls this method if some of component's props may update. Calling `this.setState()` generally doesn't trigger `UNSAFE_componentWillReceiveProps()`.

* * *

### `UNSAFE_componentWillUpdate()` {#unsafe_componentwillupdate}

```javascript
UNSAFE_componentWillUpdate(nextProps, nextState)
```

> Qeyd
>
> This lifecycle əvvəllər `componentWillUpdate` adlanırdı. TBu ad 17ci versiyaya kimi işləyəcək. [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) istifadə edərək komponentlərinizi yeniləyin.

`UNSAFE_componentWillUpdate()` is invoked just before rendering when new props or state are being received. Use this as an opportunity to perform preparation before an update occurs. This method is not called for the initial render.

Note that you cannot call `this.setState()` here; nor should you do anything else (e.g. dispatch a Redux action) that would trigger an update to a React component before `UNSAFE_componentWillUpdate()` returns.

Typically, this method can be replaced by `componentDidUpdate()`. If you were reading from the DOM in this method (e.g. to save a scroll position), you can move that logic to `getSnapshotBeforeUpdate()`.

> Qeyd
>
> [`shouldComponentUpdate()`](#shouldcomponentupdate) false qaytardıqda, `UNSAFE_componentWillUpdate()` çağrılmayacaq.

* * *

## Digər API-lar {#other-apis-1}

Lifecycle funksiyalarından fərqli olaraq (React bu funksiyaları çağırır), aşağıdakı funksiyalar komponentdə *siz* tərəfindən çağrılır.

Burada yalnız iki funksiya var: `setState()` və `forceUpdate()`.

### `setState()` {#setstate}

```javascript
setState(updater[, callback])
```

`setState()` enqueues changes to the component state and tells React that this component and its children need to be re-rendered with the updated state. This is the primary method you use to update the user interface in response to event handlers and server responses.

Think of `setState()` as a *request* rather than an immediate command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately.

`setState()` does not always immediately update the component. It may batch or defer the update until later. This makes reading `this.state` right after calling `setState()` a potential pitfall. Instead, use `componentDidUpdate` or a `setState` callback (`setState(updater, callback)`), either of which are guaranteed to fire after the update has been applied. If you need to set the state based on the previous state, read about the `updater` argument below.

`setState()` will always lead to a re-render unless `shouldComponentUpdate()` returns `false`. If mutable objects are being used and conditional rendering logic cannot be implemented in `shouldComponentUpdate()`, calling `setState()` only when the new state differs from the previous state will avoid unnecessary re-renders.

The first argument is an `updater` function with the signature:

```javascript
(state, props) => stateChange
```

`state` is a reference to the component state at the time the change is being applied. It should not be directly mutated. Instead, changes should be represented by building a new object based on the input from `state` and `props`. For instance, suppose we wanted to increment a value in state by `props.step`:

```javascript
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

Both `state` and `props` received by the updater function are guaranteed to be up-to-date. The output of the updater is shallowly merged with `state`.

The second parameter to `setState()` is an optional callback function that will be executed once `setState` is completed and the component is re-rendered. Generally we recommend using `componentDidUpdate()` for such logic instead.

You may optionally pass an object as the first argument to `setState()` instead of a function:

```javascript
setState(stateChange[, callback])
```

This performs a shallow merge of `stateChange` into the new state, e.g., to adjust a shopping cart item quantity:

```javascript
this.setState({quantity: 2})
```

This form of `setState()` is also asynchronous, and multiple calls during the same cycle may be batched together. For example, if you attempt to increment an item quantity more than once in the same cycle, that will result in the equivalent of:

```javaScript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

Subsequent calls will override values from previous calls in the same cycle, so the quantity will only be incremented once. If the next state depends on the current state, we recommend using the updater function form, instead:

```js
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```

For more detail, see:

* [State and Lifecycle guide](/docs/state-and-lifecycle.html)
* [In depth: When and why are `setState()` calls batched?](https://stackoverflow.com/a/48610973/458193)
* [In depth: Why isn't `this.state` updated immediately?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

* * *

### `forceUpdate()` {#forceupdate}

```javascript
component.forceUpdate(callback)
```

Normalda, sizin komponentinizin state və ya propları dəyişdikdə, komponent yenidən render edir. Əgər sizin `render()` funksiyanız başqa məlumatlardan asılıdırsa, siz React-ə komponenti yeniden render etmək üçün `forceUpdate()` funksiyasını çağıra bilərsiniz.

`forceUpdate()` funksiyası komponentdə, `shouldComponentUpdate()` atlayaraq, `render()` funksiyasını çağıracaq. Bu uşaq komponentlərdə normal lifecycle funksiyalarını çağıracaq (`shouldComponentUpdate()` daxil olmaqla). React DOM-u yalnız markap dəyişdikdə yeniləyəcək.

Normalda siz `render()`-də `forceUpdate()`-i heç bir halda işlətməməli və yalnız `this.props` və `this.state`-i oxuya bilərsiniz.

* * *

## Klas Parametrləri {#class-properties-1}

### `defaultProps` {#defaultprops}

`defaultProps` klasa ilkin propların verilməsi üçün komponent klasının parametri kimi təyin edilir. Bu `undefined` proplar üçün işlənilir. `null` proplarda işləmir. Məsələn:

```js
class CustomButton extends React.Component {
  // ...
}

CustomButton.defaultProps = {
  color: 'blue'
};
```

Əgər `props.color` təmin edilməyibsə, ilkin prop `'blue'` olacaq:

```js
  render() {
    return <CustomButton /> ; // props.color 'blue' olacaq
  }
```

Əgər `props.color` null ilə təyin edilibsə, null kimi qalacaq:

```js
  render() {
    return <CustomButton color={null} /> ; // props.color null olacaq
  }
```

* * *

### `displayName` {#displayname}

`displayName` parametri mesajları debaq etmək üçün işlədilir. Adətən, bunu açıq şəkildə təyin etmək lazım deyil. Çünki, komponenti təyin edən funksiya və ya klasın adından istifadə edilərək avtomatik şəkildə təyin edilir. Debaq zamanı komponentdə fərqli ad görmək üçün və ya yüksək-dərəcəli komponent işləndiyi zaman bu parametri açıq şəkildə təyin etmək olar. Əlavə məlumat üçün, [Asan Debaq Etmək üçün Nümayiş Adını Əhatə Et](/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging) sənədini oxuyun.

* * *

## İnstansiya Parametrləri {#instance-properties-1}

### `props` {#props}

`this.props` komponenti çağıranın təyin etdiyi propları saxlayır. Proplar haqqında məlumat üçün [Komponent və Proplar](/docs/components-and-props.html) sənədinə baxın.

Xüsusi olaraq, `this.props.children` xüsusi propdur. Bu prop adətən JSX taqinin daxilində təyin edilmək əvəzinə, JSX ifadəsində uçaq təqlər ilə təyin edilir.

### `state` {#state}

State komponentə aid olan və zaman keçdikcə dəyişən məlumatları saxlayır. State istifadəçi tərəfindən yaranır, və sadə Javascript obyekti olmalıdır

Əgər hər hansı bir dəyər render üçün və ya məlumat axını üçün (məsələn timer ID-si) istifadə edilmirsə, bu dəyəri state-də saxlamaq lazım deyil. Komponentin instansiya parametri kimi bu dəyərləri yarada bilərsiniz.

State haqqında əlavə məlumat üçün [State və Lifecycle](/docs/state-and-lifecycle.html) sənədini oxuyun.

`this.state`-i heç zaman birbaşa dəyişməyin. Çünki `setState()`-i sonra çağırdıqda sizin birbaşa etdiyiniz dəyişikliyi əvəz edə bilər. `this.state`-ə dəyişməz obyekt kimi davranın.

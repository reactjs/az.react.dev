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

Bu səhifədə React komponent klas təriflərinin ətraflı API arayışı var. Bu səhifə, sizin [Komponent və Proplar](/docs/components-and-props.html) və [State və Lifecycle](/docs/state-and-lifecycle.html) kimi React-in əsas konsepsiyalarından məlumatı olduğunuzu fərziyyə edir. Əgər sizin məlumatınız yoxdursa, ilk öncə bu konsepsiyaları oxuyun.

## İcmal

React, komponentləri klas və ya funksiya kimi müəyyənləşdirməyə icazə verir. Klas ilə müəyyənləşdirilmiş komponentlərin funksiya komponentlərindən bir neçə əlavə xüsusiyyətləri var. Bu səhifədə bu xüsusiyyətlər haqqında ətraflı məlumat var. React klas komponenti yaratmaq üçün klasları `React.Component`-dən genişləndirmək lazımdır:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Salam, {this.props.name}</h1>;
  }
}
```

`React.Component` subklasında yeganə müəyyənləşdirilməsi olan funksiya [`render()`](#render) funksiyasıdır. Bu səhifədə göstərilən digər bütün funksiyaların müəyyənləşdirilməsi məcburi deyil.

**Biz xüsusi baza komponent klası yaratmağı tövsiyyə etmirik.** React komponentlərində [kodun yenidən işlədilməsinə varislik əvəzinə kompozisiya ilə nail olunur](/docs/composition-vs-inheritance.html).

>Qeyd:
>
>React sizi ES6 klas sintaksisindən istifadə etməyə məcbur etmir. Əgər siz ES6 klasları istifadə etmək istəmirsinizsə, `create-react-class` modulu və ya buna oxşar digər abastraksiyadan istifadə edə bilərsiniz. Ətraflı məlumat üçün [ES6-sız React səhifəsinə](/docs/react-without-es6.html) baxın.

### Komponentin Lifecycle-ı {#the-component-lifecycle}

Hər komponentın bir neçə "lifecycle funksiyaları" var. Siz bu funksiyaları yenidən təyin edərək, kodu prosesin xüsusi zamanlarında icra edə bilərsiniz. **Siz bu [lifecycle sxemindən](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) arayış kimi istifadə edə bilərsiniz.** Aşağıdakı siyahıda çox işlədilən lifecycle funksiyaları **qalın** şrift ilə yazılmışdır. Digərlər daha nadir hallarda istifadə olunur.

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

Proplar və state-in dəyişdiyi zaman yenilənmə baş verir. Komponent yenidən render edildiyi zaman aşağıdakı funksiyalar göstərilən sıra ilə çağrılır:

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

Aşağıdakı funksiyalar render-də, lifecycle funksiyasında, və ya uşaq komponentin konstruktorunda xəta baş verdiyi zaman çağrılır.

- [`static getDerivedStateFromError()`](#static-getderivedstatefromerror)
- [`componentDidCatch()`](#componentdidcatch)

### Digər API-lar {#other-apis}

Komponentlər həmçinin açağıdakı API-ları təmin edirlər:

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

Bu bölmədəki funksiyalar React komponentləri düzəldərkən istifadə hallarının böyük əksəriyyətini təşkil edir. **Vizual arayış üçün [lifecycle sxeminə](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) baxın.**

### `render()` {#render}

```javascript
render()
```

`render()` klas komponenti üçün yeganə müəyyənləşdirilməli funksiyadır.

Çağrıldığı zaman, bu funksiya, `this.props` və `this.state` parametrlərindən istifadə edərək aşağıdakı tiplərdən birini qaytarmalıdır:

- **React elementləri.** Adətən [JSX](/docs/introducing-jsx.html) ilə düzəldilir. Məsələn, `<div />` və ya `<MyComponent />` React-ə DOM nodu və ya başqa istifadəçi tərəfindən düzəldilmiş komponenti render etməyi təlimatlandıran React elementləridirlər.
- **Massivlər və fraqmentlər.** Bir renderdən bir neçə elementi qaytarmağa icazə verirlər. Əlavə məlumat üçün [fragmentlər](/docs/fragments.html) haqqında sənədə baxın.
- **Portallar**. Uşaqları fərqli DOM ağaçına render etməyə imkan verirlər. Əlavə məlumat üçün [portallar](/docs/portals.html) sənədinə baxın.
- **Mətn və rəqəm.** Bunlar DOM-a mətn nodları kimi render edilirlər.
- **Booleans və ya `null`**. Heç nə render etmə. (Bir çox zaman `return test && <Child />` pattern-i istifadə etmək üçün işlədilir. `test` booleandır.)

`render()` funksiyası saf olmalıdır. Bu deməkdir ki, bu funksiya komponent vəziyyətini dəyişmir, hər çağrıldığı zaman eyni nəticəni verir, və birbaşa brauzer ilə əlaqə yaratmır.

Əgər sizə brauzer ilə əlaqə yaratmaq lazımdırsa, görüləcək işi `componentDidMount()` və ya digər lifecycle funksiyalarında icra edin. `render()` funksiyasını saf saxladıqda komponentlər haqqında düşünmək asanlaşır.

> Qeyd
>
> Əgər [`shouldComponentUpdate()`](#shouldcomponentupdate) false qaytarırsa, `render()` funksiyası çağrılmayacaq.

* * *

### `constructor()` {#constructor}

```javascript
constructor(props)
```

**Əgər siz state-i inisializasiya və funksiyaları bind etmirsinizsə, React komponenti üçün konstruktor yaratmaq lazım deyil.**

React komponentinin konstruktoru komponent mount olmamışdan qabaq çağrılır. `React.Component` subklası üçün konstruktor yaratdıqda, hər hansı bir ifadədən öncə `super(props)` çağırın. Əks halda, `this.props` konstruktor zamanı `undefined` olacaq. Bu baqlara səbəb ola bilər.

Adətən React-də konstruktorlar iki halda işlədilir:

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

`this.state`-ə birbaşa təyin edilmə yalnız konstruktorda mümkündür. Bütün başğa funksiyalarda `this.setState()`-dən istifadə edin.

Konstruktorda side-effektlərdən və ya abunələrdən istifadə etməyin. Bu hallar üçün `componentDidMount()`-dan istifadə edin.

>Qeyd
>
>**Propları state-ə kopiyalamayın! Bu tez-tez edilən bir səhvdir:**
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

`componentDidMount()` komponentin mount olduqdan (ağaca əlavə olduqdan) dərhal sonra çağrılır. DOM nodlardan asılı olan inisializasiyaların burada olması məsləhətlidir. Əgər siz məlumatları kənar yerdən yükləyirsinizsə şəbəkə sorğusunu bu funksiyadan çağıra bilərsiniz.

Abunələri bu funksiyada qurmaq məsləhətlidir. Əgər siz abunə qurursunuzsa `componentWillUnmount()` funksiyasında bu abunələri ləğv etməyi unutmayın.

Siz **`setState()`-i dərhal** `componentDidMount()`-dan çağıra bilərsiniz. Bunun əlavə render etməsinə baxmayaraq render brauzerin ekranı yeniləməsindən öncə baş verəcək. Bu qarantiya verir ki, `render()`-in iki dəfə çağrılmasına baxmayaraq, istifadəçi ara state-i gorməyəcək. Bu pattern performans problemləri yarada bilər. Bu səbədən bu patterni ehtiyat ilə istifadə edin. Bir çox halda, siz ilkin state-i `constructor()`-dan təyin edə bilərsiniz. Amma ölçü və pozisiyadan asılı olan elementləri (məsələn modal və ya tooltip) render etmədən öncə, DOM nodun ölçülərini hesablayıb state-ə yazmaq kimi hallarda bu pattern faydalıdır.

* * *

### `componentDidUpdate()` {#componentdidupdate}

```javascript
componentDidUpdate(prevProps, prevState, snapshot)
```

`componentDidUpdate()` yeniləmə baş verdikdən dərhal sonra çağrılır. Bu funksiya ilkin render zamanı çağrılmır.

Komponent yeniləndiyi zaman DOM nodun üstündə işləmək üçün istifadə edin. Bu həmçinin şəbəkə sorğuları etmək üçün yaxşı yerdir. Bu halda cari proplar ilə keçmiş propları müqayisə etməyi unutmayın (məsələn proplar dəyişmədikdə şəbəkə sorğusu lazım olmaya bilər).

```js
componentDidUpdate(prevProps) {
  // Tipik İstifadə (propları müqayisə etməyi unutmayın):
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

Siz **`setState()`-i dərhal** `componentDidUpdate()`-dən çağıra bilərsiniz. Amma qeyd edin ki, **bu yuxarıdakı kimi müqayisə şərt ifadəsində əhatə olmalıdır**. Əks halda bu sonsuz sikla səbəb ola bilər. Həmçinin, bu əlavə render etmələrə səbəb ola bilər və renderləri istifadəçi görməsə belə, performans problemləri yarana bilər. Əgər siz propları state-ə uyğun etmək istəyirsinizsə, propu birbaşa işlətməyiniz məsləhət görünür. [Propların state-ə kopiyalanmasının niye baqlara səbəb olacağı](/blog/2018/06/07/you-probably-dont-need-derived-state.html) haqda əlavə məlumat üçün yazını oxuyun.

Əgər sizin komponentiniz `getSnapshotBeforeUpdate()` lifecycle funksiyasını tətbiq edirsə (çox nadir hallarda), bu funksiyanin qaytardığı dəyər `componentDidUpdate()` funksiyasının 3cü "snapshot" arqumentinə ötürüləcək. Əks halda arqument undefined olacaq.

> Qeyd
>
> [`shouldComponentUpdate()`](#shouldcomponentupdate) false qaytardıqda `componentDidUpdate()` çağrılmayacaq.

* * *

### `componentWillUnmount()` {#componentwillunmount}

```javascript
componentWillUnmount()
```

`componentWillUnmount()` komponent unmount olmamışdan və dağılmamışdan dərhal öncə çağrılır. Bu funksiyada bütün lazımı təmizləmə işlərini (məsələn aktiv taymerləri etibarsız etmək, şəbəkə sorğularını ləğv etmək və ya `componentDidMount()`-da yaranmış abunələri ləğv etmək) yerinə yetirin.

`componentWillUnmount()`-dan **`setState()`-i heç zaman çağırmayın.** Çünki unmount edilən komponent heç bir zaman yeniden render edilməyəcək. Komponent instansiyası unmount olduqdan sonra yenidən mount olunmayacaq.

* * *

### Nadir Hallarda İşlədilən Lifecycle Funksiyaları {#rarely-used-lifecycle-methods}

Bu bölmədə göstərilən funksiyalar nadir hallar üçündür. Əksər komponentlərə bu funksiyaların lazım olmamasına baxmayaraq, bəzi hallarda bu metodlara ehtiyac olur. **Siz aşağıdakı funksiyaların bir çoxunu [lifecycle sxemində](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) səhifənin yuxarısında "Show less common lifecycles" çekboksunu tıklayaraq görə bilərsiniz.**


### `shouldComponentUpdate()` {#shouldcomponentupdate}

```javascript
shouldComponentUpdate(nextProps, nextState)
```

`shouldComponentUpdate()` funksiyasından istifadə edərək React-ə komponentdə state və ya propların dəyişməsinin komponentin nəticəsinə təsir etmədiyini göstərin. Normalda hər state dəyişikliyində komponent yenidən render edir. Biz əksər hallarda normativə etibar etməyi tövsiyyə edirik.

`shouldComponentUpdate()` proplar və ya state dəyişdikdə hər render-dən öncə çağrılır. Defoltda bu funksiya `true` qaytarır. Bu funksiya ilkin render zamanı və ya `forceUpdate()` işlədildikdə çağrılmır.

Bu funksiyanın yeganə səbəbi **[performansın optimallaşması üçündür](/docs/optimizing-performance.html).** Renderin qarşısını almaq üçün bu funksiyadan istifadə etməyin. Baqlara səbəb ola bilər. `shouldComponentUpdate()` əllə yazmaq əvəzinə **hazır quraşdırılmış [`PureComponent`-dən](/docs/react-api.html#reactpurecomponent)** istifadə edin. `PureComponent` proplar və state arasında dayaz müqayisə edir və səhv yeniliyi atlamaların şansını azaldır.

Əgər siz əllə bunu yazmaqdan əminsinizsə, `this.props`-u `nextProps` ilə və `this.state`-i `nextState` ilə yoxlayıb React-ə yeniliyi atlamağı üçün `false` qaytarın. Qeyd edin ki, uşaq komponentlərin state-i dəyişdikdə ana komponentin `false` qaytarmasından asılı olmayaraq uşaq komponentlər yeniden render ediləcəklər.

Biz `shouldComponentUpdate()`-də dərin obyekt müqayisəsi etməyi və ya `JSON.stringify()` işlətməyi məsləhət görmürük. Bu çox səmərəsizdir və performansa ziyan vuracaq.

Hal hazırda, əgər `shouldComponentUpdate()` `false` qaytarırsa, [`UNSAFE_componentWillUpdate()`](#unsafe_componentwillupdate), [`render()`](#render) və [`componentDidUpdate()`](#componentdidupdate) çağrılmayacaq. Amma gələcəkdə React `shouldComponentUpdate()` funksiyasına sərt direktiv əvəzinə bir işarə kimi rəftar edə bilər. Bu deməkdir ki, `false` qaytardıqda komponent yenə də render edə bilər.

* * *

### `static getDerivedStateFromProps()` {#static-getderivedstatefromprops}

```js
static getDerivedStateFromProps(props, state)
```

`getDerivedStateFromProps` render funksiyası çağrılmamışdan dərhal öncə (ilkin mount və sonrakı yeniliklər zamanı) çağrıla bilər. Bu funksiya state-i yeniləmək üçün obyekt qaytarmalı və ya yeniləməmək üçün null qaytarmalıdır.

Bu funksiya state-in zaman ilə propların dəyişməsindən asılı olduğu [nadir halda](/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state) işlənilir. Məsələn, əvvəlki və sonrakı uşaqları müqayisə edib hansı uşaqların animasiya ediləcəyini müəyyənləşdirmək üçün `<Transition>` kimi komponentinin tətbiqi üçün bu funksiya faydalı ola bilər.

State-i törətmək qarışıq koda səbəb olub komponentin pis anlaşılmasına səbəb ola bilər. 
[Daha sadə alternativlər ilə tanış olun:](/blog/2018/06/07/you-probably-dont-need-derived-state.html)

* Əgər sizə propların dəyişməsi əsasında **side effekt icra etmək lazımdırsa** (məsələn, məlumatın yüklənməsi və ya animasiya) [`componentDidUpdate`](#componentdidupdate) lifecycle funksiyasından istifadə edin.

* Əgər sizə **prop dəyişdikdə hər hansı bir məlumatı yenidən hesablamaq lazımdırsa** [memoizasiya koməkçisindən istifadə edin](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).

* Əgər siz **prop dəyişdikdə hər hansı bir state-i sıfırlamaq istəyirsinizsə**, komponenti [tam kontrol olunan](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) və ya [`key` ilə tam kontrol olunmayan](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) edin.

Bu funksiyanın komponent instansiyasına girişi yoxdur. Siz komponent proplarının saf funksiyalarını və state-i klas tərifindən ekstrakt edib `getDerivedStateFromProps()` və digər klas metodları arasında kodu paylaşa bilərsiniz.

Qeyd edin ki, bu funksiya səbəbsiz halda **hər** render-də çağrılır. Bundan fərqli olaraq `UNSAFE_componentWillReceiveProps` funksiyası lokal `setState` əsasında yox, yalnız ana komponent yenidən render etdikdə çağrılır.

* * *

### `getSnapshotBeforeUpdate()` {#getsnapshotbeforeupdate}

```javascript
getSnapshotBeforeUpdate(prevProps, prevState)
```

`getSnapshotBeforeUpdate()` ən son render edilən nəticənin DOM-a köçürülməsindən dərhal əvvəl çağrılır.  Bu funksiya komponentə DOM-dan bəzi məlumatları (məsələn skrol pozisiyası) dəyişməmişdən öncə yaxalamaq üçün istifadə edilir. Bu funksiyadan qaytarılan hər hansı bir dəyər `componentDidUpdate()` funksiyasına arqument kimi ötürülür.

Bu istifadə halı sıravi deyil: çat kimi skrol posiziyasını xüsusi formada işlədən UI-larda işlədilə bilər.

Snapshot dəyəri (və ya `null`) qaytarılmalıdır.

Məsələn:

`embed:react-component-reference/get-snapshot-before-update.js`

Yuxarıdakı nümunədə, `scrollHeight` parametrini `getSnapshotBeforeUpdate` funskiyasında oxumaq daha düzgündür. Çünki "render" fazası lifecycle-ları (məsələn `render`) və "commit" fazası lifecycle-ları (məsələn `getSnapshotBeforeUpdate` və `componentDidUpdate`) arasında gecikmə ola bilər.

* * *

### Error boundaries {#error-boundaries}

[Xəta Sərhədləri](/docs/error-boundaries.html) uşaq komponent ağacında xətaları tutan, tutulan xətaları loq edən, və sınmış komponent ağacında xəta UI-ı göstərən React komponentləridir. Xəta sərhədləri uşaq komponent ağacında render zamanı, lifecycle funksiyalarında, və konstruktorlarda baş verən xətaları tutur.

Klas komponenti `static getDerivedStateFromError()` və ya `componentDidCatch()` lifecycle funksiyalarından hər hansınısa (və ya hər ikisini) tətbiq edirsə bu komponent xəta sərhədi olur. Bu lifecycle funksiyalarından state-i yeniləyərək uşaq komponentlərdə tutulmayan Javascript xətalarını tutmaq və xəta UI-ı göstərmək mümkündür.

Xəta sərhədlərini yalnız gözlənilməz xətalardan bərpa üçün işlədin. **Kontrol axını üçün istifadə etməyin.**

Əlavə məlumat üçün [*React 16-da Xəta Sərhədləri*](/blog/2017/07/26/error-handling-in-react-16.html) yazısını oxuyun.

> Qeyd
> 
> Xəta sərhadləri yalnız **ağacın aşağısında olan** komponentlərin xətalarını tuta bilirlər. Xəta sərhədi özündə baş verən xətanı tuta bilmir.

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
> `getDerivedStateFromError()` "render" fazası zamanı çağrılır. Bu səbəbdən side-effektlərə icazə yoxdur.
Belə hallar üçün `componentDidCatch()` işlədin.

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
> Xəta zamanı, siz `componentDidCatch()`-dən `setState` çağıraraq xəta UI-nı render edə bilərsiniz. Amma bu gələcək versiyalarda köhnələcək.
> Xəta render etmək üçün `static getDerivedStateFromError()` funksiyasından istifadə edin.

* * *

### Köhnə Lifecycle Funksiyaları {#legacy-lifecycle-methods}

Aşağıdakı lifecycle funksiyalar köhnədirlər. Bu funksiyaların indi işləməyinə baxmayaraq, biz yeni kodda bu lifecycle-ları işlətməyi tövsiyyə etmirik. Siz [bu bloq yazısında](/blog/2018/03/27/update-on-async-rendering.html) köhnə lifecycle funksiyalarından miqrasiya etmək üçün əlavə məlumat ala bilərsiniz.

### `UNSAFE_componentWillMount()` {#unsafe_componentwillmount}

```javascript
UNSAFE_componentWillMount()
```

> Qeyd
>
> Bu lifecycle əvvəllər `componentWillMount` adlanırdı. Bu ad 17ci versiyaya kimi işləyəcək. [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) istifadə edərək komponentlərinizi yeniləyin.

`UNSAFE_componentWillMount()` mount olmamışdan əvvəl baş verir. Bunun `render()`-dan əvvəl çağrıldığından  `setState()` bu funksiyada sinxron formada çağrıldıqda əlavə render baş vermir. Ümumiyyətlə, biz state-i inisializasiya etmək üçün `constructor()`-dan istifadə etməyi tovsiyyə edirik.

Bu funksiyada side-effektlər və ya abunələrdən istifadə etməyin. Belə hallar üçün `componentDidMount()`-dan istifadə edin.

Server render zamanı yalnız bu lifecycle funksiyası çağrılır.

* * *

### `UNSAFE_componentWillReceiveProps()` {#unsafe_componentwillreceiveprops}

```javascript
UNSAFE_componentWillReceiveProps(nextProps)
```

> Qeyd
>
> Bu lifecycle əvvəllər `componentWillReceiveProps` adlanırdı. Bu ad 17ci versiyaya kimi işləyəcək. [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) istifadə edərək komponentlərinizi yeniləyin.

> Qeyd:
>
> Bu lifecycle funksiyasını işlətmək yalnız baqlara və uyğunsuzluqlara səbəb olur
>
> * Əgər sizə propların dəyişməsi əsasında **side effekt icra etmək lazımdırsa** (məsələn, məlumatın yüklənməsi və ya animasiya),[`componentDidUpdate`](#componentdidupdate) lifecycle funksiyasından istifadə edin.
> * Əgər sizə **prop dəyişdikdə hər hansı bir məlumatı yenidən hesablamaq lazımdırsa** [memoizasiya koməkçisindən istifadə edin](/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization).
> * Əgər siz **prop dəyişdikdə hər hansı bir state-i sıfırlamaq istəyirsinizsə** komponenti ya [tam kontrol olunan](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component) və ya [`key` ilə tam kontrol olunmayan](/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) edin.
>
> Digər alternativlər üçün [bu törənmiş state haqqında bloq yazısında olan tövsiyyələri tətbiq edin](/blog/2018/06/07/you-probably-dont-need-derived-state.html).

`UNSAFE_componentWillReceiveProps()` funksiyası mount olunmuş komponent propları qəbul etməmişdən öncə çağrılırır. Əgər sizə prop dəyişiklikləri əsasında state-i yeniləmək lazımdırsa (məsələn, state-i sıfırlamaq üçün) siz `this.props`-u `nextProps` ilə müqayisə edib state-i `this.setState()` ilə yeniləyə bilərsiniz.

Qeyd edin ki, əgər ana komponentdə yenidən render baş verirsə bu funksiya propların dəyişməsindən asılı olmayaraq yenidən çağrılacaq. Əmin olun ki, cari və yeni prop dəyərlərini müqayisə edirsiniz.

React [mount zamanı](#mounting) `UNSAFE_componentWillReceiveProps()` funksiyasını ilkin proplar ilə çağırmır. Bu funksiya yalnız komponentin propları yeniləndiyi zaman çağrılır. `this.setState()` çağrılıdığı zaman `UNSAFE_componentWillReceiveProps()` çağrılmır.

* * *

### `UNSAFE_componentWillUpdate()` {#unsafe_componentwillupdate}

```javascript
UNSAFE_componentWillUpdate(nextProps, nextState)
```

> Qeyd
>
> This lifecycle əvvəllər `componentWillUpdate` adlanırdı. Bu ad 17ci versiyaya kimi işləyəcək. [`rename-unsafe-lifecycles` codemod](https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles) istifadə edərək komponentlərinizi yeniləyin.

`UNSAFE_componentWillUpdate()` yeni proplar və ya state qəbul olunduqdan və komponent render olunmamışdan öncə çağrılır. Bu funksiyada yenilik baş verməmişdən qabaq lazımi hazırlıqları görün. Bu funksiya ilkin render zamanı çağrılmır.

Qeyd edin ki, bu funksiyada `this.setState()` çağırmaq və ya React komponenti yeniləyən heç bir əməliyyat etmək olmaz.

Adətən, bu funksiyanı `componentDidUpdate()` ilə əvəz etmək olar. Əgər siz bu funksiyadan DOM-dan dəyərləri oxumaq üçün (məsələn skrol pozisiyasını yadda saxlamaq üçün) istifadə edirdinizsə siz bu məntiqi `getSnapshotBeforeUpdate()` köçürə bilərsiniz.

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

`setState()` dəyişiklikləri komponent state-ində növbəyə əlavə edir və React-ə bu komponentin və uşaqlarının yenidən render edilməsini bildirir. Bu funksiya UI-ı hadisə işləyiciləri və server cavabları əsasında yeniləmək üçün əsas metoddur.

`setState()`-ə komponenti yeniləmək üçün birbaşa əmr əvəzinə bir *sorğu* kimi baxın. Daha yaxşı performans üçün React yeniləməni gecikdirib bir neçə komponenti bir keçiddə yeniləyə bilər. React state yeniliklərinin dərhal tətbiqinə qarantiya vermir.

`setState()` komponenti dərhal yeniləmir. Bu dəyişklikləri bir dəstəyə yığa bilər və ya yeniliyi sonraya qədər təxirə sala bilər. Bu `this.state`-i `setState()`-dən dərhal sonra oxuduqda problem yardır. Bunun əvəzinə, `componentDidUpdate` və ya `setState` callback-indən istifadə edin (`setState(updater, callback)`). Bu iki yol yenilik baş verdikdən sonra həmişə çağrılır. Əgər sizə state-i keçmiş state əsasında təyin etmək lazımdırsa, aşağıdakı `updater` arqumenti haqqında oxuyun.

`shouldComponentUpdate()`-in`false` qaytarması istisna olmaqla `setState()` komponenti həmişə yenidən render etdirəcək. Əgər dəyişən obyektlər işlənilirsə və şərtli render `shouldComponentUpdate()`-də tətbiq edilə bilmirsə, `setState()`-i yalnız yeni state-in köhnə state-dən fərqli olduğu zaman çağırdıqda lazımsız yeniden renderlərdən qaçınmaq olar.

İlk arqument aşağıdakı imza ilə `updater` funksiyasıdır:

```javascript
(state, props) => stateChange
```

`state` arqumenti dəyişiklik tətbiq edilən zaman komponent state-inə referansdır. Bu dəyər birbaşa mutasiya edilməməlidir. Dəyişikliklər `state` və `props` arqumentləri əsasında yeni obyekt yaratmaq ilə baş verməlidir. Məsələn, gəlin cari state-in dəyərini `props.step` əsasında artıraq:

```javascript
this.setState((state, props) => {
  return {counter: state.counter + props.step};
});
```

`updater` funksiyasında olan `state` və `props` dəyərlərinin yeni olmasında qarantiya var. `updater`-in nəticəsi `state` ilə dayaz birləşdirilir (merge).

`setState()`-in ikinci arqumenti məcburi olmayan callback funksiyasıdır. Bu funksiya `setState` başa çatdıqda və komponent yenidən render etdikdə icra olunur. Normalda biz belə məntiq üçün `componentDidUpdate()` işlətməyi tövsiyyə edirik.

Siz `setState()`-in `updater` arqumentinə funksiya əvəzinə obyekt də göndərə bilərsiniz:

```javascript
setState(stateChange[, callback])
```

Bu `stateChange` ilə cari state-i dayaz birləşdirərək komponent state-ini yeniləyir. Məsələn, alış-veriş səbətində olan maddənin miqdarını dəyişmək üçün aşağıdakı formada yazmaq olar:

```javascript
this.setState({quantity: 2})
```

Bu formalı `setState()` də asinxron baş verir və bir siklda baş verən bir neçə `setState` çağırışı bir dəstə ilə baş verə bilər. Məsələn, əgər siz maddə dəyərini bir siklda bir neçə dəfə artırsanız aşağıdakı kimi nəticə ola bilər:

```javaScript
Object.assign(
  previousState,
  {quantity: state.quantity + 1},
  {quantity: state.quantity + 1},
  ...
)
```

Bir siklda bir neçə çağırış əvvəlki çağırışları "ləğv edəcək" və bu miqdarın yalnız bir dəfə artması ilə nəticələnəcək. Əgər sonrakı state cari state-dən asılıdırsa, biz `updater`-i funksiya formasında istifadə etməyi tövsiyyə edirik:

```js
this.setState((state) => {
  return {quantity: state.quantity + 1};
});
```

Əlavə məlumat üçün aşağıdakı səhifələrə baxın:

* [State və Lifecycle sənədi](/docs/state-and-lifecycle.html)
* [Dərindən: Ne zaman və niyə `setState()` çağırışları dəstələnir?](https://stackoverflow.com/a/48610973/458193)
* [Dərindən: `this.state` niyə dərhal yenilənmir?](https://github.com/facebook/react/issues/11527#issuecomment-360199710)

* * *

### `forceUpdate()` {#forceupdate}

```javascript
component.forceUpdate(callback)
```

Normalda, sizin komponentinizin state və ya propları dəyişdikdə, komponent yenidən render edir. Əgər sizin `render()` funksiyanız başqa məlumatlardan asılıdırsa, siz React-ə komponenti yeniden render etmək üçün `forceUpdate()` funksiyasından istifadə edə bilərsiniz.

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

`displayName` parametri mesajları debaq etmək üçün işlədilir. Adətən, bunu açıq şəkildə təyin etmək lazım deyil. Çünki, komponenti təyin edən funksiya və ya klasın adından istifadə edilərək avtomatik şəkildə təyin edilir. Debaq zamanı komponentdə fərqli ad görmək üçün və ya yüksək-dərəcəli komponent işləndiyi zaman bu parametri açıq şəkildə təyin etmək olar. Əlavə məlumat üçün [Asan Debaq Etmək üçün Nümayiş Adını Əhatə Et](/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging) sənədini oxuyun.

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

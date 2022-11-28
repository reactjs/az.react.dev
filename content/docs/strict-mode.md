---
id: strict-mode
title: Strict Rejimi
permalink: docs/strict-mode.html
---

Applikasiyada potensial problemləri vurğulayan alətlərdən biri `StrictMode`-dur. `StrictMode`, `Fragment` kimi heç bir görünən UI render etmir. Bu alət sadəcə uşaqlar üçün əlavə yoxlamalar edərək xəbərdarlıqlar göstərir.

> Qeyd:
>
> Strict rejimi yoxlamaları yalnız development zamanı olur. Bu rejim _produksiya quruluşuna heç bir təsir etmir_.

Strikt rejimi applikasiyanın istənilən hissəsində activləşdirmək mümkündür. Məsələn:

`embed:strict-mode/enabling-strict-mode.js`

Yuxarıdakı nümunədə, strict rejim yoxlamaları `Header` və `Footer` komponentlərində işlədilməyəcək. Lakin, `ComponentOne`, `ComponentTwo` və bu komponentlərin ağacında olan bütün komponentlərdə yoxlamalar aktivləşəcək.

<<<<<<< HEAD
`StrictMode` aşağıdakı problemlər üçün faydalıdır:
=======
`StrictMode` currently helps with:
* [Identifying components with unsafe lifecycles](#identifying-unsafe-lifecycles)
* [Warning about legacy string ref API usage](#warning-about-legacy-string-ref-api-usage)
* [Warning about deprecated findDOMNode usage](#warning-about-deprecated-finddomnode-usage)
* [Detecting unexpected side effects](#detecting-unexpected-side-effects)
* [Detecting legacy context API](#detecting-legacy-context-api)
* [Ensuring reusable state](#ensuring-reusable-state)
>>>>>>> 1a641bb88e647186f260dd2a8e56f0b083f2e46b

* [Təhlükəli lifecycle işlədən komponentlərin tapılması](#identifying-unsafe-lifecycles)
* [Köhnə mətn ref API-ının istifadə edilməsi haqqında xəbərdarlıq](#warning-about-legacy-string-ref-api-usage)
* [Köhnə findDOMNode-un istifadə edilməsi haqqında xəbərdarlıq](#warning-about-deprecated-finddomnode-usage)
* [Gözlənilməz side effektlərin tapılması](#detecting-unexpected-side-effects)
* [Köhnə kontekst API-larının tapılması](#detecting-legacy-context-api)

React-in gələcək buraxılışlarında bu moda yeni xüsusiyyətlər əlavə ediləcək.

### Təhlükəli lifecycle funksiyalarının tapılması {#identifying-unsafe-lifecycles}

[Bu bloq yazısında göstərildiyi kimi](/blog/2018/03/27/update-on-async-rendering.html), asinxron React applikasiyalarında bəzi lifecycle funksiyalarının işlədilməsi təhlükəlidir. Lakin, 3-cü tərəfinin kitabxanalarını işlətdikdə bu lifecycle-ların işlənmədiyindən əmin olmaq çətinləşir. Xoşbəxtlikdən, strict rejim sizə kömək edə bilər!

Strict rejim aktiv olduqda təhlükəli lifecycle funksiyaları işlədən sinif komponentlərinin siyahısını yaradılır və bu komponentlər haqqında məlumatlar xəbərdarlıq kimi loq edilir:

![](../images/blog/strict-mode-unsafe-lifecycles-warning.png)

Strict rejimdən yaranan problemləri _indi_ həll etdikdə React-in gələcək buraxılışlarında asinxron render etmədən tam faydalana biləcəksiniz.

### Köhnə mətn ref API-ının istifadə edilməsi haqqında xəbərdarlıq {#warning-about-legacy-string-ref-api-usage}

Əvəllər, React-də ref-lərin iki növ istifadəsi var idi: köhnə mətn ref API-ı və callback API-ı ilə. Mətn ref-lərin işlədilməsinin daha asan olduğuna baxmayaraq bu ref-lərin [bir neçə problemləri](https://github.com/facebook/react/issues/1373) var. Bu səbəbdən, rəsmi tövsiyəmiz [callback ref-dən istifadə etmək idi](/docs/refs-and-the-dom.html#legacy-api-string-refs).

React 16.3-də, mətn ref-lərinin asanlığı olan və heç bir problemini daşımayan yeni ref API-ı əlavə edildi:

`embed:16-3-release-blog-post/create-ref-example.js`

Obyekt ref-ləri mətn ref-lərini əvəz etmək üçün əlavə edilib. Bu səbəbdən, mətn ref-ləri işləndiyi zaman strict rejim xəbərdarlıqlar göstərir.

> **Qeyd:**
>
> `createRef` API-ından əlavə, callback ref-lərindən də istifadə etmək mümkündür.
>
> Komponentlərdə callback ref-lərini dəyişmək lazım deyil. Bu ref-lərin daha əyilən olduğundan bu ref-lərə genişləndirilmiş xüsusiyyət kimi baxılır.

[`createRef` API-ı haqqında buradan məlumat ala bilərsiniz.](/docs/refs-and-the-dom.html)

### Köhnə findDOMNode-un istifadə edilməsi haqqında xəbərdarlıq {#warning-about-deprecated-finddomnode-usage}

React-də sinif instansiyası əsasında ağacda DOM nodunun tapılması üçün `findDOMNode` funksiyasından istifadə edilirdi. Normalda, [ref-in DOM-a birbaşa qoşulması](/docs/refs-and-the-dom.html#creating-refs) bu funksiyanın istifadəsini əvəzləyir.

`findDOMNode` funksiyası sinif komponentləri ilə də işləyir. Lakin, bu xüsusiyyət valideynin xüsusi uşaqları render etməsinə imkan yaratdığından abstraksiya dərəcələrini sındıra bilir. Valideyn komponenti uşaq komponentin DOM noduna yönəltdiyindən refaktorinq üçün problemlər yaranır. `findDOMNode` funksiyası yalnız bir uşaq qaytara bilir. Lakin, Fraqmentlərdən istifadə edərək bir neçə DOM nodu render etmək mümkündür. `findDOMNode` bir dəfə oxumaq üçün yaranmış API-dır. Bu API, yalnız lazım olduqda cavab qaytarır. Uşaq komponent fərqli nod render etdikdə dəyişiklikləri idarə etmək mümkün deyil. Bu səbəbdən, `findDOMNode` funksiyası komponentlər, dəyişməyən tək DOM nod qaytardıqda işlədilirdi.

İndi, ref-i xüsusi komponentə göndərib komponentin DOM noduna [yönləndirə bilərsiniz](/docs/forwarding-refs.html#forwarding-refs-to-dom-components).

Əlavə olaraq, komponentdə əhatə olunan DOM nodu əlavə edib ref-i birbaşa bu noda qoşa bilərsiniz.

```javascript{4,7}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }
  render() {
    return <div ref={this.wrapper}>{this.props.children}</div>;
  }
}
```

> Qeyd:
>
> DOM nodunun şablonun bir hissəsi olmaması üçün [`display: contents`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#display_contents) CSS atributundan istifadə edə bilərsiniz.

### Gözlənilməz side effektlərin tapılması {#detecting-unexpected-side-effects}

Konseptual olaraq React iki fazadan ibarətdir:

* **render** fazasında DOM-da baş verəcək (və ya nativ görünüşə) dəyişikliklər müəyyənləşdirilir. Bu faza zamanı, `render` funksiyası çağrılaraq cari nəticə əvvəlki render nəticəsi ilə müqayisə olunur.
* **commit** fazasında lazımı dəyişikliklər tətbiq edilir. (Bu, React DOM-da DOM nodlarının əlavəsi, silinməsi, və ya yenilənməsi əməlliyatlarıdır.) Əlavə olaraq, bu fazada`componentDidMount` və `componentDidUpdate` kimi lifecycle funksiyaları çağrılır.

Adətən, commit fazası tez, render fazası isə yavaş olur. Bu səbəbdən, gələcək konkurrent rejimində (hələ ki, standart aktiv deyil) render işi bir neçə yerə bölünəcək. Brauzeri blok etməmək üçün işlər fasilə ilə icra olunacaqlar. Bu deməkdir ki, render fazası lifecycle-ları, commit fazasından öncə bir neçə dəfə çağrıla bilər. Bu lifecycle-lar commit fazası olmadan da çağrıla bilərlər (yüksək prioritet kəsilməsi zamanı və ya xəta nəticəsində).

Render fazasının lifecycle-ları aşağıda göstərilən sinif metodlarıdır:

* `constructor`
* `componentWillMount` (or `UNSAFE_componentWillMount`)
* `componentWillReceiveProps` (or `UNSAFE_componentWillReceiveProps`)
* `componentWillUpdate` (or `UNSAFE_componentWillUpdate`)
* `getDerivedStateFromProps`
* `shouldComponentUpdate`
* `render`
* `setState` yeniləmə funksiyası (ilk arqument)

Bu metodların birdən çox çağrıla bildiyindən bu metodlarda side effektlərin olmaması vacibdir. Bu qaydanı saymadıqda yaddaş sızmaları və etibarsız applikasiya vəziyyəti kimi problemlər yarana bilər. Təəssüf ki, bu problemlərin [müəyyən pattern-i olmadığından](https://en.wikipedia.org/wiki/Deterministic_algorithm) bu problemləri tutmaq mümkün deyil.

Strict rejim avtomatik olaraq belə yan effektləri aşkar edə bilmir. Amma, bu rejim ilə yan effektlərin olduğu yerləri tapmaq mümkündür. Bu yan effektlərin tapılması üçün aşağıdakı funksiyalar iki dəfə çağrılır:

* Sinif komponentinin `constructor`, `render` və `shouldComponentUpdate` funksiyaları
* Sinif komponentinin statik `getDerivedStateFromProps` metodu
* Funksiya komponentinin gövdələri
* State yeniləyici funksiyalar (`setState` funksiyasının ilk arqumenti)
* `useState`, `useMemo` və `useReducer`-ə göndərilən funksiyalar

> Qeyd:
>
> Bu yalnız development zamanı baş verir. _Produksiya zamanı lifecycle-lar iki dəfə çağrılmayacaq._

Aşağıdakı kodu nəzərdən keçirin:

`embed:strict-mode/side-effects-in-constructor.js`

İlk baxışda bu kod problemsiz görünür. `SharedApplicationState.recordEvent` funksiyası [idempotent](https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning) olmadıqda komponentin bir neçə dəfə yaranması etibarsız applikasiya vəziyyətinə gətirə bilər. Bu formalı baqlar development zamanı görünməyə bilər.

Komponent konstruktorunda olduğu kimi strict rejim funksiyaları bİlərəkdən iki dəfə çağıraraq bu side effektləri tapa bilir.

<<<<<<< HEAD
### Köhnə kontekst API-larının tapılması {#detecting-legacy-context-api}
=======
> Note:
>
> In React 17, React automatically modifies the console methods like `console.log()` to silence the logs in the second call to lifecycle functions. However, it may cause undesired behavior in certain cases where [a workaround can be used](https://github.com/facebook/react/issues/20090#issuecomment-715927125).
>
> Starting from React 18, React does not suppress any logs. However, if you have React DevTools installed, the logs from the second call will appear slightly dimmed. React DevTools also offers a setting (off by default) to suppress them completely.
>>>>>>> 1a641bb88e647186f260dd2a8e56f0b083f2e46b

Köhnə kontekst API-ının xətalara meyilli olduğundan bu API gələcək böyük versiyada silinəcək. Bu API bütün 16.x buraxılışlarında işləyəcək. Lakin, strict rejimdə aşağıdakı xəbərdarlıq göstəriləcək:

![](../images/blog/warn-legacy-context-in-strict-mode.png)

<<<<<<< HEAD
Yeni versiyaya miqrasiya etmək üçün [yeni kontekst API sənədinə](/docs/context.html) baxın.
=======
Read the [new context API documentation](/docs/context.html) to help migrate to the new version.


### Ensuring reusable state {#ensuring-reusable-state}

In the future, we’d like to add a feature that allows React to add and remove sections of the UI while preserving state. For example, when a user tabs away from a screen and back, React should be able to immediately show the previous screen. To do this, React will support remounting trees using the same component state used before unmounting.

This feature will give React better performance out-of-the-box, but requires components to be resilient to effects being mounted and destroyed multiple times. Most effects will work without any changes, but some effects do not properly clean up subscriptions in the destroy callback, or implicitly assume they are only mounted or destroyed once.

To help surface these issues, React 18 introduces a new development-only check to Strict Mode. This new check will automatically unmount and remount every component, whenever a component mounts for the first time, restoring the previous state on the second mount.

To demonstrate the development behavior you'll see in Strict Mode with this feature, consider what happens when React mounts a new component. Without this change, when a component mounts, React creates the effects:

```
* React mounts the component.
  * Layout effects are created.
  * Effects are created.
```

With Strict Mode starting in React 18, whenever a component mounts in development, React will simulate immediately unmounting and remounting the component:

```
* React mounts the component.
    * Layout effects are created.
    * Effect effects are created.
* React simulates effects being destroyed on a mounted component.
    * Layout effects are destroyed.
    * Effects are destroyed.
* React simulates effects being re-created on a mounted component.
    * Layout effects are created
    * Effect setup code runs
```

On the second mount, React will restore the state from the first mount. This feature simulates user behavior such as a user tabbing away from a screen and back, ensuring that code will properly handle state restoration.

When the component unmounts, effects are destroyed as normal:

```
* React unmounts the component.
  * Layout effects are destroyed.
  * Effect effects are destroyed.
```

Unmounting and remounting includes:

- `componentDidMount`
- `componentWillUnmount`
- `useEffect`
- `useLayoutEffect`
- `useInsertionEffect`

> Note:
>
> This only applies to development mode, _production behavior is unchanged_.

For help supporting common issues, see:
  - [How to support Reusable State in Effects](https://github.com/reactwg/react-18/discussions/18)
>>>>>>> 1a641bb88e647186f260dd2a8e56f0b083f2e46b

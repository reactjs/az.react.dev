---
id: strict-mode
title: Strict Rejim
permalink: docs/strict-mode.html
---

Applikasiyada potensial problemləri vurğulayan alətlərdən biri `StrictMode`-dur. `StrictMode`, `Fragment` kimi heç bir görünən UI render etmir. Bu alət sadəcə uşaqlar üçün əlavə yoxlamalar edərək xəbərdarlıqlar göstərir.

> Qeyd:
>
> Strict rejim yoxlamaları yalnız development zamanı olur. Bu rejim _produksiya quruluşuna heç bir təsir etmir_.

Strikt rejimi applikasiyanın istənilən hissəsində activləşdirmək mümkündür. Məsələn:

`embed:strict-mode/enabling-strict-mode.js`

Yuxarıdakı nümunədə, strict rejim yoxlamaları `Header` və `Footer` komponentlərində işlədilməyəcək. Lakin, `ComponentOne`, `ComponentTwo` və bu komponentlərin ağacında olan bütün komponentlərdə yoxlamalar aktivləşəcək.

`StrictMode` aşağıdakı problemlər üçün faydalıdır:

* [Təhlükəli lifecycle işlədən komponentlərin tapılması](#identifying-unsafe-lifecycles)
* [Köhnə mətn ref API-ının istifadə edilməsi haqqında xəbərdarlıq](#warning-about-legacy-string-ref-api-usage)
* [Köhnə findDOMNode-un istifadə edilməsi haqqında xəbərdarlıq](#warning-about-deprecated-finddomnode-usage)
* [Gözlənilməz side effektlərin tapılması](#detecting-unexpected-side-effects)
* [Köhnə kontekst API-larının tapılması](#detecting-legacy-context-api)

React-in gələcək buraxılışlarında bu moda yeni xüsusiyyətlər əlavə ediləcək.

### Təhlükəli lifecycle funksiyalarının tapılması {#identifying-unsafe-lifecycles}

[Bu bloq yazısında göstərildiyi kimi](/blog/2018/03/27/update-on-async-rendering.html), asinxron React applikasiyalarında bəzi lifecycle funksiyalarının işlədilməsi təhlükəlidir. Lakin, 3-cü tərəfinin kitabxanalarını işlətdikdə bu lifecycle-ların işlənmədiyindən əmin olmaq çətinləşir. Xoşbəxtlikdən, strict rejim sizə kömək edə bilər!

Strict rejim aktiv olduqda təhlükəli lifecycle funksiyaları işlədən klas komponentlərinin siyahısını yaradılır və bu komponentlər haqqında məlumatlar xəbərdarlıq kimi loq edilir:

![](../images/blog/strict-mode-unsafe-lifecycles-warning.png)

Strict rejimdən yaranan problemləri _indi_ həll etdikdə React-in gələcək buraxılışlarında asinxron render etmədən tam faydalana biləcəksiniz.

### Köhnə mətn ref API-ının istifadə edilməsi haqqında xəbərdarlıq {#warning-about-legacy-string-ref-api-usage}

Əvəllər, React-də ref-lərin iki növ istifadəsi var idi: köhnə mətn ref API-ı və callback API-ı ilə. Mətn ref-lərin işlədilməsinin daha asan olduğuna baxmayaraq bu ref-lərin [bir neçə problemləri](https://github.com/facebook/react/issues/1373) var. Bu səbəbdən, rəsmi tövsiyyəmiz [callback ref-dən istifadə etmək idi](/docs/refs-and-the-dom.html#legacy-api-string-refs).

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

React-də klas instansiyası əsasında ağacda DOM nodunun tapılması üçün `findDOMNode` funksiyasından istifadə edilirdi. Normalda, [ref-in DOM-a birbaşa qoşulması](/docs/refs-and-the-dom.html#creating-refs) bu funksiyanın istifadəsini əvəzləyir.

`findDOMNode` funksiyası klas komponentləri ilə də işləyir. Lakin, bu xüsusiyyət valideynin xüsusi uşaqları render etməsinə imkan yaratdığından abstraksiya dərəcələrini sındıra bilir. Valideyn komponenti uşaq komponentin DOM noduna yönəltdiyindən refaktorinq üçün problemlər yaranır. `findDOMNode` funksiyası yalnız bir uşaq qaytara bilir. Lakin, Fraqmentlərdən istifadə edərək bir neçə DOM nodu render etmək mümkündür. `findDOMNode` bir dəfə oxumaq üçün yaranmış API-dır. Bu API, yalnız lazım olduqda cavab qaytarır. Uşaq komponent fərqli nod render etdikdə dəyişiklikləri idarə etmək mümkün deyil. Bu səbəbdən, `findDOMNode` funksiyası komponentlər, dəyişməyən tək DOM nod qaytardıqda işlədilirdi.

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

Adətən, commit fazası tez, render fazası isə yavaş olur. Bu səbəbdən, gələcək asinxron modunda (standart aktiv olmayacaq) render işi bir neçə yerə bölünəcək. Brauzeri blok etməmək üçün işlər fasilə ilə icra olunacaqlar. Bu deməkdir ki, render fazası lifecycle-ları, commit fazasından öncə bir neçə dəfə çağrıla bilər. Bu lifecycle-lar commit fazası olmadan da çağrıla bilərlər (yüksək prioritet kəsilməsi zamanı və ya xətada nəticəsində).

Render fazasının lifecycle-ları aşağıda göstərilən klas metodlarıdır:

* `constructor`
* `componentWillMount`
* `componentWillReceiveProps`
* `componentWillUpdate`
* `getDerivedStateFromProps`
* `shouldComponentUpdate`
* `render`
* `setState` yeniləmə funksiyası (ilk arqument)

Bu metodların birdən çox çağrıla bildiyindən bu metodlarda side effektlərin olmaması vacibdir. Bu qaydanı saymadıqda yaddaş sızmaları və etibarsız applikasiya vəziyyəti kimi problemlər yarana bilər. Təəssüf ki, bu problemlərin [müəyyən pattern-i olmadığından](https://en.wikipedia.org/wiki/Deterministic_algorithm) bu problemləri tutmaq mümkün deyil.

Strict rejim avtomatik olaraq belə side effektləri aşkar edə bilmir. Amma, bu rejim ilə side effektlərin olduğu yerləri tapmaq mümkündür. Bu side effektlərin tapılması üçün, aşağıdakı funksiyalar iki dəfə çağrılır:

* Klas komponentin `constructor` funksiyası
* `render` funksiyası
* `setState`-in yeniləmə funksiyası (ilk arqument)
* Statik `getDerivedStateFromProps` lifecycle metodu

> Qeyd:
>
> Bu yalnız development zamanı baş verir. _Produksiya zamanı lifecycle-lar iki dəfə çağrılmayacaq._

Aşağıdakı kodu nəzərdən keçirin:

`embed:strict-mode/side-effects-in-constructor.js`

İlk baxışda bu kod problemsiz görünür. `SharedApplicationState.recordEvent` funksiyası [idempotent](https://en.wikipedia.org/wiki/Idempotence#Computer_science_meaning) olmadıqda komponentin bir neçə dəfə yaranması etibarsız applikasiya vəziyyətinə gətirə bilər. Bu formalı baqlar development zamanı görünməyə bilər.

Komponent konstruktorunda olduğu kimi strict rejim funksiyaları bİlərəkdən iki dəfə çağıraraq bu side effektləri tapa bilir.

### Köhnə kontekst API-larının tapılması {#detecting-legacy-context-api}

Köhnə kontekst API-ının xətalara meyilli olduğundan bu API gələcək böyük versiyada silinəcək. Bu API bütün 16.x buraxılışlarında işləyəcək. Lakin, strict rejimdə aşağıdakı xəbərdarlıq göstəriləcək:

![](../images/blog/warn-legacy-context-in-strict-mode.png)

Yeni versiyaya miqrasiya etmək üçün [yeni kontekst API sənədinə](/docs/context.html) baxın.

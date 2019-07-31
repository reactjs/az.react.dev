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

React komponentləri həmçinin funksiyalar ilə də müəyyənləşdirilə bilər. Bu funksiyalar aşağıdakılar ilə əhatə oluna bilər:

- [`React.memo`](#reactmemo)

### React Elementlərinin Düzəldilməsi {#creating-react-elements}

Biz UI-ın nə olacağını təsvir etmək üçün [JSX işlətməyi](/docs/introducing-jsx.html) tövsiyyə edirik. Hər bir JSX elementi [`React.createElement()`](#createelement) funksiyasını çağırmaq üçün gözəl sintaksisdir. JSX işlətdikdə adətən aşağıdakı funksiyaları birbaşa çağırmırsınız.

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

Suspense komponentləri render etməmişdən qabaq nəyisə "gözləməsinə" imkan yaradır. Bu gün, Suspense yalnız bir ssenarini dəstələyir: [komponentlərin `React.lazy` ilə dinamik yüklənməsi](/docs/code-splitting.html#reactlazy). Gələcəkdə bu başqa ssenariləri (məsələn məklumatın yüklənməsi) də dəstəkləyəcək.

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

`React.Component` əsas klasına aid funksiya və parametrlərin siyahısı üçün [React.Component API Arayışına](/docs/react-component.html) baxın.

* * *

### `React.PureComponent` {#reactpurecomponent}

`React.PureComponent` [`React.Component-inə`](#reactcomponent) bənzəyir. Bu ikisi arasında fərq [`React.Component-in`](#reactcomponent) [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) funksiyasını tətbiq etməməsi, `React.PureComponent`-in isə bu funksiyasının dayaz prop və state müqayisəsi ilə tətbiq etməsidir.

Əgər React komponentin `render()` funksiyası verilən proplar və state əsasında eyni nəticəni render edirsə, siz bəzi hallarda performans üçün `React.PureComponent`-dən istifadə edə bilərsiniz.

> Qeyd
>
> `React.PureComponent`-in `shouldComponentUpdate()` funksiyası obyektləri yalnız dayaz müqayisə edir. Əgər kompleks data strukturlar varsa, bu sizə dərin müqayisələrdə səhv-neqativlər verə bilər. Komponentinizi `PureComponent` ilə yalnız sadə proplar və state olduqda genişləndirin. Əks halda dərin data strukturlarının dəyişdiyini bildiyiniz zaman [`forceUpdate()`](/docs/react-component.html#forceupdate) funksiyasından istifadə edin. Əlavə olaraq, dərin məlumatların tez müqayisəsi üçün [dəyişməyən obyektlərdən](https://facebook.github.io/immutable-js/) istifadə edin.
>
> Əlavə olaraq, `React.PureComponent`-in `shouldComponentUpdate()` funksiyası komponentdən başlayan komponent ağacının prop yeniliklərini saymır. Əmin olun ki, bütün uşaq komponentlər də "təmizdirlər."

* * *

### `React.memo` {#reactmemo}

```javascript
const MyComponent = React.memo(function MyComponent(props) {
  /* proplar ilə render edin */
});
```

`React.memo` [yüksək dərəcəli komponentdir](/docs/higher-order-components.html). Bu [`React.PureComponent`](#reactpurecomponent) ilə oxşardır. Lakin bu klaslar əvəzinə funksiya komponentləri ilə işlənilir.

Əgər sizin komponent funksiyanız eyni proplar ilə həmişə eyni nəticəni verirsə, siz funksiyanı `React.memo` ilə əhatə edib bəzi hallarda nəticəni memoize edərək performansı artıra bilərsiniz. Bu deməkdir ki, React komponentin renderini atlayıb, keçmiş renderdə olan nəticəni işlədəcək.

Default halda, bu props obyektində olan kompleks obyektləri dayaz formada müqayisə edəcək. Əgər siz müqayisəni kontrol etmək istəyirsinizsə, siz xüsusi müqayisə funksiyasını ikinci arqument kimi göndərə bilərsiniz.

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
> Klass komponentlərdə [`shouldComponentUpdate()`](/docs/react-component.html#shouldcomponentupdate) funksiyasından fərqli olaraq, `areEqual` funksiyası proplar eyni olduqda `true`, fərqli olduqda isə `false` qaytarır. Bu `shouldComponentUpdate` funksiyasının tərsidir.

* * *

### `createElement()` {#createelement}

```javascript
React.createElement(
  type,
  [props],
  [...children]
)
```

Verilmiş tip ilə yeni [React elementi](/docs/rendering-elements.html) yaradın və qaytarın. Element tipi təq ad yazısı (məsələn `'div'` və ya `'span'`), [React komponent](/docs/components-and-props.html) tipi (klas və ya funksiya) və ya [React fraqment](#reactfragment) tipi ola bilər.

[JSX](/docs/introducing-jsx.html) ilə yazılmış kod `React.createElement()`-ə çevriləcək. Siz JSX işlətdiyiniz zaman çox vaxt `React.createElement()` funksiyasını birbaşa çağırmırsınız. Ətraflı məlumat üçün [JSX-siz React](/docs/react-without-jsx.html) sənədinə baxın.

* * *

### `cloneElement()` {#cloneelement}

```
React.cloneElement(
  element,
  [props],
  [...children]
)
```

`element`-i başlanğıc nöqtəsi götürərək, elementi kopiyalayıb, yeni React elementi qaytar. Nəticədə yaranan elementdə orijinal elementin propları ilə yeni propların dayaz birləşməsi var. Yeni uşaqlar mövcud uşaqları əvəz edəcək. `key` və `ref` orijinal elementdəki kimi qalacaq.

`React.cloneElement()` aşağıdakı ifadə ilə təxminən eynidir:

```js
<element.type {...element.props} {...props}>{children}</element.type>
```

Lakin, bu həmçinin `ref`-ləridə saxlayır. Bu deməkdir ki, əgər sizə üstündə `ref` olan uşaq gəlirsə, siz təsadüfən, ref-i əcdad komponentdən oğurlamayacaqsınız. Siz yeni `ref` qoşulmuş yeni element alacaqsınız.

Bu API, köhnəlmiş `React.addons.cloneWithProps()` funksiyasının əvəzləmək üçün təqdim edilmişdir.

* * *

### `createFactory()` {#createfactory}

```javascript
React.createFactory(type)
```

Verilmiş tip ilə React elementlər yaradan funksiya qaytarır. [`React.createElement()`](#createelement) kimi, tip arqumenti təq ad yazısı (məsələn `'div'` və ya `'span'`), [React komponent](/docs/components-and-props.html) tipi (klas və ya funksiya) və ya [React fraqment](#reactfragment) tipi ola bilər.

Bu köməkçi funksiya köhnəlmiş kimi hesab edilir və biz bu funksiyanı işlətmək əvəzinə birbaşa JSX və ya `React.createElement()` işlətməyi təşviq edirik.

Siz JSX işlətdiyiniz zaman çox vaxt `React.createFactory()` funksiyasını birbaşa çağırmırsınız. Ətraflı məlumat üçün [JSX-siz React](/docs/react-without-jsx.html) sənədinə baxın.

* * *

### `isValidElement()` {#isvalidelement}

```javascript
React.isValidElement(object)
```

Elementin React elementi olmasını təsdiqləyir. `true` və ya `false` qaytarır.

* * *

### `React.Children` {#reactchildren}

`React.Children` `this.props.children` qeyri şəffaf data strukturu ilə məşğul olmaq üçün faydalı funksiyalar ilə təmin edir.

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

`React.Fragment` komponenti bir neçə elementi, əlavə DOM elementi yaratmadan `render()` funksiyasından qaytarmağa imkan yaradır:

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

`React.createRef` React elementlərinə ref parametri ilə qoşulan [ref](/docs/refs-and-the-dom.html) yaradır.
`embed:16-3-release-blog-post/create-ref-example.js`

### `React.forwardRef` {#reactforwardref}

`React.forwardRef` qəbul etdiyi [ref-i](/docs/refs-and-the-dom.html) aşağısında olan digər komponentə yönləndirən React komponenti yaradır. Bu texnika tez-tez istifadə olunmur; bu yalnız iki ssenaridə faydalıdır:

* [Ref-lərin DOM komponentlərə yönləndirilməsi](/docs/forwarding-refs.html#forwarding-refs-to-dom-components)
* [Yüksək dərəcəli komponentlərdə ref-lərin yönləndirilməsi](/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components)

`React.forwardRef` render funksiyasını arqument kimi qəbul edir. React bu funksiyanı `props` və `ref` arqumentləri ilə çağırır. Bu funksiya React nodu qaytarmalıdır.

`embed:reference-react-forward-ref.js`

Bu nümunədə, React, `<FancyButton ref={ref}>` elementinə verilən `ref`-i `React.forwardRef` funksiyasında olan render funksiyasının ikinci arqumentinə ötürür. Bu rendering funksiyası `ref`-i `<button ref={ref}>` elementinə ötürür.

Nəticədə, React ref-i əlavə etdikdən sonra, `ref.current` birbaşa `button` DOM elementini qeyd edəcək.

Əlavə məlumat üçün, [ref-lərin yönləndirilməsini](/docs/forwarding-refs.html) oxuyun.

### `React.lazy` {#reactlazy}

`React.lazy()` sizə dinamik yüklənən komponenti müəyyən etməyə icazə verir. Bu ilkin render zamanı işlənməyən komponentlərin yüklənməsini gecikdirərək, sizin applikasiyanızın paket ölçüsünü azaltmağa kömək edir.

Siz bunu necə işlətməyi [kod parçalanması sənədindən](/docs/code-splitting.html#reactlazy) öyrənə bilərsiniz. Siz həmçinin bunu işlətmək haqqında daha ətraflı izahat üçün [bu məqaləni](https://medium.com/@pomber/lazy-loading-and-preloading-components-in-react-16-6-804de091c82d) oxuya bilərsiniz.

```js
// Bu komponent dinamik olaraq yüklənir
const SomeComponent = React.lazy(() => import('./SomeComponent'));
```

Nəzərə alın ki, `lazy` komponentləri render etmək üçün komponent ağacında üstdə `<React.Suspense>` komponenti olmalıdır. Siz belə formada yükləmə göstəricisini müəyyənləşdirirsiniz.

> **Qeyd**
>
> `React.lazy`-ni dinamik import ilə işlətmək üçün Javascript mühitində Promise-in olması tələb olunur. Bu, IE11 və aşağı versiyalarda polifilin işlədilməsini tələb edir.

### `React.Suspense` {#reactsuspense}

`React.Suspense`, ağacda olan komponentlərin render-ə hazır olmadığı halda sizə yükləmə indikatoru müəyyənləşdirməyə icazə verir. Bugün, `<React.Suspense>` **yalnız** komponentlərin lazy yüklənməsini dəstəkləyir:

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

İndiki gündə dəstəklənməməsinə baxmayaraq, biz gələcəkdə `Suspense`-in məlumat yüklənməsi kimi ssenarilərini dəstəkləməsini planlaşdırırıq. Bu haqda əlavə məlumat üçün, [yol xəritəmizi](/blog/2018/11/27/react-16-roadmap.html) oxuya bilərsiniz.


>Qeyd:
>
>`React.lazy()` və `<React.Suspense>` `ReactDOMServer` tərəfindən dəstəklənmir. Bu məlum olan məhdudiyyət gələcəkdə həll olunacaq.

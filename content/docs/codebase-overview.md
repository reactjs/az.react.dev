---
id: codebase-overview
title: Kodun Icmalı
layout: contributing
permalink: docs/codebase-overview.html
prev: how-to-contribute.html
next: implementation-notes.html
redirect_from:
  - "contributing/codebase-overview.html"
---

Bu bölmədə React kodunun orqanizasiyası, konvensiyaları və tətbiqinin icmalı göstərilir.

Əgər [React-ə töhvə vermək istəyirsinizsə](/docs/how-to-contribute.html), buradakı təlimatların sizə dəyişiklik etməkdən qorxmayacağınıza imkan yaradacağına ümid edirik.

Burada göstərilən konvensiyaların React appliksiyalarında işlədilməsinə tövsiyyə etmirik. Bu konvensiyaların çoxu tarixi səbəblərə görə mövcuddur və zaman keçdikcə bu konvensiyalar dəyişə bilər.

### Xarici Asılılıqlar {#external-dependencies}

React-in heç bir xarici asılılığı yoxdur. Adətən, `require()` çağırışları React-in kodunda olan fayllara istinad edir. Lakin, burada bir neçə nadir istisnalar var.

[fbjs repo-sunun](https://github.com/facebook/fbjs) mövcud olmasının səbəbi React-in bəzi faydalı funksiyaları [Relay](https://github.com/facebook/relay) kimi kitabxanalar ilə paylaşmasıdır. Biz bu funksiyaları həmişə sinxron saxlayırıq. Biz Node ekosistemində olan bu faydalı funksiyaların ekvivalenti olan modullardan istifadə etmirik. Çünki, biz Facebook mühəndislərinin istənilən zaman dəyişikliklər edə bilməsini istəyirik. fbjs-də olan heç bir funksiya açıq API kimi qəbul olunmur. Bu API-lar yalnız Facebook-un React kimi layihələrində işlənilir.

### Ana Direktoriyalar {#top-level-folders}

[React repo-sunu](https://github.com/facebook/react) klon etdikdə aşağıdakı direktoriyaları görəcəksiniz:

* [`packages`](https://github.com/facebook/react/tree/master/packages) direktoriyasında React reposunda olan bütün paketlərin metadata-ları (`package.json` kimi) və mənbə kodları (`src` alt direktoriyalarında) saxlanılır. **Əgər etdiyiniz dəyişiklik kod ilə əlaqəlidirsə, siz vaxtınızın çoxunu hər paketin `src` alt direktoriyasında keçirəcəksiniz.**
* [`fixtures`](https://github.com/facebook/react/tree/master/fixtures) direktoriyasında iştirakçılar üçün test React appliksiyaları saxlanılır.
* `build` direktoriyası React-in qurulma nəticəsini saxlayır. Bu direktoriya repo-da yoxdur, amma bu direktoriyanı React-i ilk dəfə [quraşdırdıqda](/docs/how-to-contribute.html#development-workflow) görəcəksiniz.

Sənədlər [React-dən kənar repo-da](https://github.com/reactjs/reactjs.org) saxlanılır.

Bu repo-da digər ana direktoriyalarda var. Lakin, bu direktoriyalarda alətlərin saxlandlğından iştirak etdiyiniz zaman bu direktoriyalarda işləməyəcəksiniz.

### Paylaşılan Testlər {#colocated-tests}

Bizdə vahid testləri üçün ana direktoriya yoxdur. Əvəzinə, testlər test olunan faylların olduğu direktoriyada olan `__tests__` direktoriyasında saxlanılır.

Məsələn,[`setInnerHTML.js`](https://github.com/facebook/react/blob/87724bd87506325fcaf2648c70fc1f43411a87be/src/renderers/dom/client/utils/setInnerHTML.js) faylı üçün test [`__tests__/setInnerHTML-test.js`](https://github.com/facebook/react/blob/87724bd87506325fcaf2648c70fc1f43411a87be/src/renderers/dom/client/utils/__tests__/setInnerHTML-test.js) faylda yerləşir.

### Xəbərdarlıq və İnvariantlar {#warnings-and-invariants}

React kodunda xəbərdarlıqları göstərmək üçün `warning` modulundan istifadə edilir:

```js
var warning = require('warning');

warning(
  2 + 2 === 4,
  'Riyaziyyat bu gün işləmir.'
);
```

**Xəbərdarlıqlar `warning` şərti `false` olduqda göstərilir.**

Burada şərtlər, istisna vəziyyətlər əvəzinə normal vəziyyətləri əks etdirməlidir.

Konsola dublikat xəbərdarlıqları göstərməkdən çəkinməyə çalışın:

```js
var warning = require('warning');

var didWarnAboutMath = false;
if (!didWarnAboutMath) {
  warning(
    2 + 2 === 4,
    'Math is not working today.'
  );
  didWarnAboutMath = true;
}
```

Xəbərdarlıqlar yalnız təkmilləşmə zamanı aktivdirlər. Produksiya zamanı xəbərdarlıqlar tam silinirlər. Əgər hər hansı kodun icrasını saxlamaq istəyirsinizsə, `invariant` modulundan istifadə edin:

```js
var invariant = require('invariant');

invariant(
  2 + 2 === 4,
  'Giriş qadağandır!'
);
```

**İnvariant `invariant` şərti `false` olduqda göstərilir.**

"Invariant", "bu şərtin həmişə true olması" deməkdir. Bunun iddia etməyə (assertion) bənzədiyini fikirləşə bilərsiniz.

Təkmilləşmə və produksiya davranışlarını eyni saxlama vacibdir. Bu səbəbdən, `invariant`-lar hər iki mühitdə göstərilir. Produksiya zamanı paket ölçüsünü azaltmaq üçün xəta mesajları avtomatik olaraq xəta kodları ilə əvəz edilir.

### Təkmilləşmə və Produksiya {#development-and-production}

Kod bloklarının yalnız təkmilləşmə zamanı mövcud olması üçün `__DEV__` pseudo-qlobal dəyişənindən istifadə edin.

Bu dəyişən, kompilyasiya zamanı eyni-sətrə keçirilir və CommonJS qurulması zamanı `process.env.NODE_ENV !== 'production'` kod ilə əvəz olunur.

Bu dəyişən, bağımsız qurulmalar üçün minifikasiya olunmamış qurulmalarda `true`-a çevrilir. Minifikasiya olunmuş qurulmalarda isə dəyişəni saxlayan `if` bloku ilə birlikdə tam silinir.

```js
if (__DEV__) {
  // Bu blokdakı kod yalnız təkmilləşmə zamanı mövcud olacaq.
}
```

### Flow {#flow}

Bu yaxınlarda, biz koda [Flow](https://flow.org/) yoxlamalarını əlavə etdik. Lisenziya başlıq kommentində `@flow` ilə işarələnən fayllarda tip yoxlamaları baş verəcək.

Biz, [mövcud koda Flow işarələrinin əlavə edilmələrinin](https://github.com/facebook/react/pull/7600/files) PR-larını qəbul edirik. Flow işarələri bu aşağıdakı formada olur:

```js
ReactRef.detachRefs = function(
  instance: ReactInstance,
  element: ReactElement | string | number | null | false,
): void {
  // ...
}
```

Mümkün olduğu zaman yeni kodlarda Flow işarələri olmalıdır.
Kodunuzu lokal mühitdə Flow ilə yoxlamaq üçün `yarn flow` əmrini icra edə bilərsiniz.

### Dinamik İnyeksiya {#dynamic-injection}

React bəzi modullarda dinamik inyeksiyadan istifadə edir. Bunun həmişə açıq olmasına baxmayaraq bu kodun anlaşılmasını azaldır. Bunun mövcud olmasının əsas səbəbi React-in yalnız DOM-u dəstəkləməsindən gəlir. React Native, React-in forku kimi başlanılıb. Biz, React Native-in bəzi davranışlarını əvəzləməsi üçün dinamik inyeksiyadan istifadə etdik.

Siz, bəzi modulların dinamik asılılıqlarının aşağıdakı formada təyin edildiyini görəcəksiniz:

```js
// Dinamik şəkikdə inyeksiya olunub
var textComponentClass = null;

// Dinamik inyeksiya olunan dəyərdən asılıdır
function createInstanceForText(text) {
  return new textComponentClass(text);
}

var ReactHostComponent = {
  createInstanceForText,

  // Dinamik inyeksiya üçün fürsət yaradır
  injection: {
    injectTextComponentClass: function(componentClass) {
      textComponentClass = componentClass;
    },
  },
};

module.exports = ReactHostComponent;
```

`injection` sahəsi xüsusi formada idarə olunmur. Lakin, konvensiyaya görə modulun icra zamanı bəzi asılılıqları (adətən, platformaya xas) inyeksiya edəcəyi bilinir.

Kodda bir neçə inyeksiya nöqtələri var. Gələcəkdə, biz dinamik inyeksiya mexanizmindən imtina etmək və bütün hissələri statik şəkildə qurmaq istəyirik.

### Çoxlu Paketlər {#multiple-packages}

React, [monorepo](https://danluu.com/monorepo/)-dur. Bu repo bir neçə paketdən ibarətdir. Bu paketlər eyni zamanda koordinasiya oluna bilir və bütün paketlərin issue-ları bir yerdə saxlanılır.

### React Core {#react-core}

React-in "core"-ubda bütün [yuxarı səviyyəli `React` API-ları](/docs/top-level-api.html#react) saxlanılır. Məsələn:

* `React.createElement()`
* `React.Component`
* `React.Children`

**React core-da yalnız komponentləri təyin etmək üçün lazım olan API-lar saxlanılır.** Burada [rekonsilyasiya](/docs/reconciliation.html) alqoritmi və ya digər platformaya xas olan kodlar mövcud deyil. Buradakı kodlar həm React DOM, həm də React Native komponentləri tərəfindən istifadə edilir.

React core-un kodu [`packages/react`](https://github.com/facebook/react/tree/master/packages/react) direktoriyasında saxlanılır. React core, NPM-də [`react`](https://www.npmjs.com/package/react) paketi adı altında mövcuddur. Bağımsız brauzer qurulmaları isə `react.js` adlanır. Bu qurulmalarda ixrac edilən qlobal dəyişənin adı `React`-dir.

### Render Edici Qurğular {#renderers}

React was originally created for the DOM but it was later adapted to also support native platforms with [React Native](https://facebook.github.io/react-native/). This introduced the concept of "renderers" to React internals.

**Renderers manage how a React tree turns into the underlying platform calls.**

Renderers are also located in [`packages/`](https://github.com/facebook/react/tree/master/packages/):

* [React DOM Renderer](https://github.com/facebook/react/tree/master/packages/react-dom) renders React components to the DOM. It implements [top-level `ReactDOM` APIs](/docs/react-dom.html) and is available as [`react-dom`](https://www.npmjs.com/package/react-dom) npm package. It can also be used as standalone browser bundle called `react-dom.js` that exports a `ReactDOM` global.
* [React Native Renderer](https://github.com/facebook/react/tree/master/packages/react-native-renderer) renders React components to native views. It is used internally by React Native.
* [React Test Renderer](https://github.com/facebook/react/tree/master/packages/react-test-renderer) renders React components to JSON trees. It is used by the [Snapshot Testing](https://facebook.github.io/jest/blog/2016/07/27/jest-14.html) feature of [Jest](https://facebook.github.io/jest) and is available as [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) npm package.

The only other officially supported renderer is [`react-art`](https://github.com/facebook/react/tree/master/packages/react-art). It used to be in a separate [GitHub repository](https://github.com/reactjs/react-art) but we moved it into the main source tree for now.

>**Note:**
>
>Technically the [`react-native-renderer`](https://github.com/facebook/react/tree/master/packages/react-native-renderer) is a very thin layer that teaches React to interact with React Native implementation. The real platform-specific code managing the native views lives in the [React Native repository](https://github.com/facebook/react-native) together with its components.

### Reconcilers {#reconcilers}

Even vastly different renderers like React DOM and React Native need to share a lot of logic. In particular, the [reconciliation](/docs/reconciliation.html) algorithm should be as similar as possible so that declarative rendering, custom components, state, lifecycle methods, and refs work consistently across platforms.

To solve this, different renderers share some code between them. We call this part of React a "reconciler". When an update such as `setState()` is scheduled, the reconciler calls `render()` on components in the tree and mounts, updates, or unmounts them.

Reconcilers are not packaged separately because they currently have no public API. Instead, they are exclusively used by renderers such as React DOM and React Native.

### Stack Reconciler {#stack-reconciler}

The "stack" reconciler is the implementation powering React 15 and earlier. We have since stopped using it, but it is documented in detail in the [next section](/docs/implementation-notes.html).

### Fiber Reconciler {#fiber-reconciler}

The "fiber" reconciler is a new effort aiming to resolve the problems inherent in the stack reconciler and fix a few long-standing issues. It has been the default reconciler since React 16.

Its main goals are:

* Ability to split interruptible work in chunks.
* Ability to prioritize, rebase and reuse work in progress.
* Ability to yield back and forth between parents and children to support layout in React.
* Ability to return multiple elements from `render()`.
* Better support for error boundaries.

You can read more about React Fiber Architecture [here](https://github.com/acdlite/react-fiber-architecture) and [here](https://blog.ag-grid.com/inside-fiber-an-in-depth-overview-of-the-new-reconciliation-algorithm-in-react). While it has shipped with React 16, the async features are not enabled by default yet.

Its source code is located in [`packages/react-reconciler`](https://github.com/facebook/react/tree/master/packages/react-reconciler).

### Event System {#event-system}

React implements a synthetic event system which is agnostic of the renderers and works both with React DOM and React Native. Its source code is located in [`packages/legacy-events`](https://github.com/facebook/react/tree/master/packages/legacy-events).

There is a [video with a deep code dive into it](https://www.youtube.com/watch?v=dRo_egw7tBc) (66 mins).

### What Next? {#what-next}

Read the [next section](/docs/implementation-notes.html) to learn about the pre-React 16 implementation of reconciler in more detail. We haven't documented the internals of the new reconciler yet.

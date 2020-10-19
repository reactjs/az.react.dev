---
id: code-splitting
title: Kod Parçalanması
permalink: docs/code-splitting.html
---

## Paketləmə {#bundling}

<<<<<<< HEAD
Bir çox React applikasiyalarında, faylları [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) və ya [Browserify](http://browserify.org/) kimi alətlər ilə paketləriylər. Paketləmə (bundling) import olunan faylların izlənməsi və "bundle" adlanan bir fayla birləşdirilməsidir. Bu fayl bütün applikasiyanı saytda bir dəfəyə yükləmək üçün istifadə edilə bilər.
=======
Most React apps will have their files "bundled" using tools like [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) or [Browserify](http://browserify.org/). Bundling is the process of following imported files and merging them into a single file: a "bundle". This bundle can then be included on a webpage to load an entire app at once.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

#### Nümunə {#example}

**Applikasiya:**

```js
// app.js
import { add } from './math.js';

console.log(add(16, 26)); // 42
```

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

**Paket:**

```js
function add(a, b) {
  return a + b;
}

console.log(add(16, 26)); // 42
```

> Qeyd:
>
> Sizin paketləriniz yuxarıdankından çox fərqli olacaq.

<<<<<<< HEAD
Əgər siz [Create React App](https://create-react-app.dev/), [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org/) və ya oxşar bir alət işlədirsinizsə, applikasiyanı paketləmək üçün Webpack quraşdırılmış olacaq.

Əgər siz belə alətlərdən istifadə etmirsinizsə, siz paketləməni özünüz qoşmalısınız. Misal üçün, Webpack sənədlərində [İnstalyasiya](https://webpack.js.org/guides/installation/) və
[Başlamaq](https://webpack.js.org/guides/getting-started/) təlimatlarına baxın.
=======
If you're using [Create React App](https://create-react-app.dev/), [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org/), or a similar tool, you will have a Webpack setup out of the box to bundle your app.

If you aren't, you'll need to setup bundling yourself. For example, see the [Installation](https://webpack.js.org/guides/installation/) and [Getting Started](https://webpack.js.org/guides/getting-started/) guides on the Webpack docs.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

## Kod Parçalanması {#code-splitting}

<<<<<<< HEAD
Paketləmə əladır amma sizin applikasiyanız böyüdükcə paket də böyüyəcək, xüsusəndə böyük ölçülü üçüncü tərəf kitabxanalardan istifadə edildikdə. Təsadüfən paketin ölçüsünü böyüdüb applikasiyanın yüklənməsi zamanını artırmamaq üçün paketə import etdiyiniz kodlara fikir verin.

Böyük paket ilə qalmamaq üçün öncədən problemin üstünə düşub paketi "parçalamağa" başlaya bilərsiniz. [Webpack](https://webpack.js.org/guides/code-splitting/),[Rollup](https://rollupjs.org/guide/en/#code-splitting) və Browserify ([factor-bundle](https://github.com/browserify/factor-bundle) ilə) kimi paketləmə alətlərinin dəstəklədiyi, bir çox paketlərin yaranıb icra zamanı dinamik formada yüklənməsi xüsusiyyəti [Kod Parçalanması](https://webpack.js.org/guides/code-splitting/) adlanır.

Kod Parçalanması sizin applikasiyanızda istifadəçiyə hal-hazırda lazım olanları "lazy-load" etməyə kömək edir. Bu sizin applikasiyanızın performansını dramatik şəkildə təkmilləşdirir. Siz applikasiyada bütün kodun həcmini azalatmasanız da, istifadəçinin işlətməyəcəyi hissələrin yüklənmənməsini qabağını alır bə ilk yüklənən kodun həcmini azaltmış olursunuz.

## `import()` {#import}

Kod Parçalanmasını applikasiyanıza əlavə etməyin ən yaxşı yolu dinamik `import()` sintaksisindən istifadə etməkdir.
=======
Bundling is great, but as your app grows, your bundle will grow too. Especially if you are including large third-party libraries. You need to keep an eye on the code you are including in your bundle so that you don't accidentally make it so large that your app takes a long time to load.

To avoid winding up with a large bundle, it's good to get ahead of the problem and start "splitting" your bundle. Code-Splitting is a feature
supported by bundlers like [Webpack](https://webpack.js.org/guides/code-splitting/), [Rollup](https://rollupjs.org/guide/en/#code-splitting) and Browserify (via [factor-bundle](https://github.com/browserify/factor-bundle)) which can create multiple bundles that can be dynamically loaded at runtime.

Code-splitting your app can help you "lazy-load" just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven't reduced the overall amount of code in your app, you've avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

## `import()` {#import}

The best way to introduce code-splitting into your app is through the dynamic `import()` syntax.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

**Əvvəl:**

```js
import { add } from './math';

console.log(add(16, 26));
```

**Sonra:**

```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

<<<<<<< HEAD
Webpack bu sintaksisi görən kimi sizin applikasiyanızın kodunu avtomatik parçalayacaq. Əgər Create React App işlədirsinizsə, bu xüsusiyyət artiq sizin üçün konfiqurasiya olunub və bunu dərhal [işlədə bilərsiniz](https://facebook.github.io/create-react-app/docs/code-splitting). Bu xüsusiyyəti [Next.js](https://nextjs.org/docs/advanced-features/dynamic-import) də dəstəkləyir.

Əgər Webpack-i özünüz quraşdırırsınızsa, Webpack-in [kod parçalaması haqqında təlimatını](https://webpack.js.org/guides/code-splitting/) oxumaq sizə lazım olacaq. Sizin Webpack konfiqurasiyanız təxminən [belə bir formada](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269) görünəcək.

[Babel](https://babeljs.io/) işlədərkən Babel-ın dinamik import sintaksisini təhlil edə bilməsi amma transformasiya edə bilməməsi lazımdır. Bunun üçün siz [babel-plugin-syntax-dynamic-import](https://yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import)-dan istifadə edə bilərsiniz.
=======
When Webpack comes across this syntax, it automatically starts code-splitting your app. If you're using Create React App, this is already configured for you and you can [start using it](https://create-react-app.dev/docs/code-splitting/) immediately. It's also supported out of the box in [Next.js](https://nextjs.org/docs/advanced-features/dynamic-import).

If you're setting up Webpack yourself, you'll probably want to read Webpack's [guide on code splitting](https://webpack.js.org/guides/code-splitting/). Your Webpack config should look vaguely [like this](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269).

When using [Babel](https://babeljs.io/), you'll need to make sure that Babel can parse the dynamic import syntax but is not transforming it. For that you will need [@babel/plugin-syntax-dynamic-import](https://classic.yarnpkg.com/en/package/@babel/plugin-syntax-dynamic-import).
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

## `React.lazy` {#reactlazy}

> Qeyd:
>
> `React.lazy` və Suspense, serverdə render etmək üçün hazır deyil. Əgər sizə serverdə render olunan applikasiya üçün kod parçalaması lazımdırsa, biz [Loadable Components](https://github.com/gregberge/loadable-components) işlətməyi tövsiyə edirik. Bunun [server render etməsi üçün yaxşı təlimatı var](https://loadable-components.com/docs/server-side-rendering/).

`React.lazy` funksiyası dinamik import olunmuş komponenti adi komponent kimi render etməyə imkan yaradır.

**Əvvəl:**

```js
import OtherComponent from './OtherComponent';
```

**Sonra:**

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

Bu avtomatik olaraq `OtherComponent` render olduğu zaman, komponent olan paketi yükləyəcək.

`React.lazy` funksiyası mütləq olaraq dinamik `import()` funksiyasını çağırmalıdır. Bu mütləq `default` eksportunda React komponenti olan modulu "resolve" edən `Promise`-ə qaytarmalıdır.

### Suspense {#suspense}

Əgər `MyComponent` render olunduğu zaman `OtherComponent` olan modul hələ yükənməyibsə, biz modul yüklənənə kimi "fallback" kontenti (məsələn Yükləmə indikatoru) göstərməliyik. Bu `Suspense` komponenti ilə həyata keçirilir.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Yüklənir...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

`fallback` propu komponent yüklənənə kimi render etmək istədiyiniz React elementini qəbul edir. Siz `Suspense` komponentini lazy komponentin üstündə istənilən yerdə yerləşdirə bilərsiniz. Siz hətta bir neçə lazy komponentləri bir Suspense komponenti ilə əhatə edə bilərsiniz.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Yüklənir...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

### Xəta sərhədləri {#error-boundaries}

Əgər modulun yüklənməsi uğursuz keçirsə (məsələn, şəbəkə problemlərinə görə), xəta göstəriləcək. Siz yaxşı İstifadəçi Təcrübəsi üçün bu xətaları tutmaq və bu xətaları bərpa etmək üçün [Xəta Sərhədlərindən](/docs/error-boundaries.html) istifadə edə bilərsiniz. Xəta Sərhədini yaratdıqdan sonra, siz şəbəkə xətası göstərmək üçün bu xəta sərhədini lazy komponentin yuxarısında istənilən yerdə istifadə edə bilərsiniz.

```js
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Yüklənir...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

## Route əsasında kod parçalaması {#route-based-code-splitting}

<<<<<<< HEAD
Applikasiyanızda harada kod parçalaması etmək biraz çaşdırıcı ola bilər. Siz həmişə İstifadəçi Təcrübəsini pozmamaq və paketləri bərabər ayırlmaq üçün düzgün yerdən applikasiyanı bölməlisiniz.

Yaxşı başlanğıc nöqtəsi route-lardan bölməni aparmaqdır. Bir çox insan vebdə səhifə keçidlərinin yüklənməsinin zaman aldığına vərdiş ediblər. Bu zaman siz həmçinin bütün səhifəni dərhal yenidən render edirsiniz deyə istifadəçilər eyni zamanda səhifədəki başqa elementlərə qarşılıqlı təsir etmirlər.

Aşağıdakı nümunədə [React Router](https://reacttraining.com/react-router/) və `React.lazy`-dən istifadə edərək applikasiya kodunu route əsasında parçalanması göstərilib.
=======
Deciding where in your app to introduce code splitting can be a bit tricky. You want to make sure you choose places that will split bundles evenly, but won't disrupt the user experience.

A good place to start is with routes. Most people on the web are used to page transitions taking some amount of time to load. You also tend to be re-rendering the entire page at once so your users are unlikely to be interacting with other elements on the page at the same time.

Here's an example of how to setup route-based code splitting into your app using libraries like [React Router](https://reacttraining.com/react-router/) with `React.lazy`.
>>>>>>> 4e6cee1f82737aa915afd87de0cd4a8393de3fc8

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Yüklənir...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## Adlı Eksportlar {#named-exports}

`React.lazy` yalnız `default` eksportları dəstəkləyir. Əgər sizin import etmək istədiyiniz modul, adlı eksportlar edirsə, siz bu adlı eksportları yenidən `default` eksport edən ara modulu yarada bilərsiniz. Bu tree shaking-in işlədiyini və lazım olmayan komponentlərin yüklənmədiyini təmin edir.

```js
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
```

```js
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
```

```js
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```

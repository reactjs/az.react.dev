---
id: code-splitting
title: Kod Parçalanması
permalink: docs/code-splitting.html
---

## Paketləmə {#bundling}

Bir çox React applikasiyalarında, faylları [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) və ya [Browserify](http://browserify.org/) kimi alətlər ilə paketləyirlər. Paketləmə (bundling) idxal olunan modulların izlənməsi və "bundle" adlanan bir fayla birləşdirilməsidir. Bu fayl bütün applikasiyanı saytda bir dəfəyə yükləmək üçün istifadə edilə bilər.

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

Əgər siz [Create React App](https://create-react-app.dev/), [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.org/) və ya oxşar bir alət işlədirsinizsə, applikasiyanı paketləmək üçün Webpack quraşdırılmış olacaq.

Əgər siz belə alətlərdən istifadə etmirsinizsə, siz paketləməni özünüz qoşmalısınız. Misal üçün, Webpack sənədlərində [Quraşdırma](https://webpack.js.org/guides/installation/) və
[Başlamaq](https://webpack.js.org/guides/getting-started/) təlimatlarına baxın.

## Kod Parçalanması {#code-splitting}

Paketləmə əladır amma sizin applikasiyanız böyüdükcə paket də böyüyəcək, xüsusəndə böyük ölçülü üçüncü tərəf kitabxanalardan istifadə edildikdə. Təsadüfən paketin ölçüsünü böyüdüb applikasiyanın yüklənməsi zamanını artırmamaq üçün paketə idxal etdiyiniz modullara fikir verin.

Böyük paket ilə qalmamaq üçün öncədən problemin üstünə düşub paketi "parçalamağa" başlaya bilərsiniz. [Webpack](https://webpack.js.org/guides/code-splitting/), [Rollup](https://rollupjs.org/guide/en/#code-splitting) və Browserify ([factor-bundle](https://github.com/browserify/factor-bundle) ilə) kimi paketləmə alətlərinin dəstəklədiyi, bir çox paketlərin yaranıb icra zamanı dinamik formada yüklənməsi xüsusiyyəti [Kod Parçalanması](https://webpack.js.org/guides/code-splitting/) adlanır.

Kod Parçalanması sizin applikasiyanızda istifadəçiyə hal-hazırda lazım olanları "lazy-load" etməyə kömək edir. Bu sizin applikasiyanızın performansını dramatik şəkildə təkmilləşdirir. Siz applikasiyada bütün kodun həcmini azalatmasanız da, istifadəçinin işlətməyəcəyi hissələrin yüklənmənməsini qabağını alır bə ilk yüklənən kodun həcmini azaltmış olursunuz.

## `import()` {#import}

Kod Parçalanmasını applikasiyanıza əlavə etməyin ən yaxşı yolu dinamik `import()` sintaksisindən istifadə etməkdir.

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

Webpack bu sintaksisi görən kimi sizin applikasiyanızın kodunu avtomatik parçalayacaq. Əgər Create React App işlədirsinizsə, bu xüsusiyyət artiq sizin üçün konfiqurasiya olunub və bunu dərhal [işlədə bilərsiniz](https://create-react-app.dev/docs/code-splitting/). Bu xüsusiyyəti [Next.js](https://nextjs.org/docs/advanced-features/dynamic-import) də dəstəkləyir.

Əgər Webpack-i özünüz quraşdırırsınızsa, Webpack-in [kod parçalaması haqqında təlimatını](https://webpack.js.org/guides/code-splitting/) oxumaq sizə lazım olacaq. Sizin Webpack konfiqurasiyanız təxminən [belə bir formada](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269) görünəcək.

[Babel](https://babeljs.io/) işlədərkən Babel-ın dinamik import sintaksisini təhlil edə bilməsi amma transformasiya edə bilməməsi lazımdır. Bunun üçün siz [@babel/plugin-syntax-dynamic-import](https://classic.yarnpkg.com/en/package/@babel/plugin-syntax-dynamic-import)-dan istifadə edə bilərsiniz.

## `React.lazy` {#reactlazy}

<<<<<<< HEAD
> Qeyd:
>
> `React.lazy` və Suspense, serverdə render etmək üçün hazır deyil. Əgər sizə serverdə render olunan applikasiya üçün kod parçalaması lazımdırsa, biz [Loadable Components](https://github.com/gregberge/loadable-components) işlətməyi tövsiyə edirik. Bunun [server render etməsi üçün yaxşı təlimatı var](https://loadable-components.com/docs/server-side-rendering/).

`React.lazy` funksiyası dinamik import olunmuş komponenti adi komponent kimi render etməyə imkan yaradır.
=======
The `React.lazy` function lets you render a dynamic import as a regular component.
>>>>>>> 8fe817e61e5fe50020ed9379ce9e1c5a2cf476a9

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

<<<<<<< HEAD
### Xəta sərhədləri {#error-boundaries}
=======
### Avoiding fallbacks {#avoiding-fallbacks}
Any component may suspend as a result of rendering, even components that were already shown to the user. In order for screen content to always be consistent, if an already shown component suspends, React has to hide its tree up to the closest `<Suspense>` boundary. However, from the user's perspective, this can be disorienting.

Consider this tab switcher:

```js
import React, { Suspense } from 'react';
import Tabs from './Tabs';
import Glimmer from './Glimmer';

const Comments = React.lazy(() => import('./Comments'));
const Photos = React.lazy(() => import('./Photos'));

function MyComponent() {
  const [tab, setTab] = React.useState('photos');
  
  function handleTabSelect(tab) {
    setTab(tab);
  };

  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>
        {tab === 'photos' ? <Photos /> : <Comments />}
      </Suspense>
    </div>
  );
}

```

In this example, if tab gets changed from `'photos'` to `'comments'`, but `Comments` suspends, the user will see a glimmer. This makes sense because the user no longer wants to see `Photos`, the `Comments` component is not ready to render anything, and React needs to keep the user experience consistent, so it has no choice but to show the `Glimmer` above.

However, sometimes this user experience is not desirable. In particular, it is sometimes better to show the "old" UI while the new UI is being prepared. You can use the new [`startTransition`](/docs/react-api.html#starttransition) API to make React do this:

```js
function handleTabSelect(tab) {
  startTransition(() => {
    setTab(tab);
  });
}
```

Here, you tell React that setting tab to `'comments'` is not an urgent update, but is a [transition](/docs/react-api.html#transitions) that may take some time. React will then keep the old UI in place and interactive, and will switch to showing `<Comments />` when it is ready. See [Transitions](/docs/react-api.html#transitions) for more info.

### Error boundaries {#error-boundaries}
>>>>>>> 8fe817e61e5fe50020ed9379ce9e1c5a2cf476a9

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

Applikasiyanızda harada kod parçalaması etmək biraz çaşdırıcı ola bilər. Siz həmişə İstifadəçi Təcrübəsini pozmamaq və paketləri bərabər ayırlmaq üçün düzgün yerdən applikasiyanı bölməlisiniz.

Yaxşı başlanğıc nöqtəsi route-lardan bölməni aparmaqdır. Bir çox insan vebdə səhifə keçidlərinin yüklənməsinin zaman aldığına vərdiş ediblər. Bu zaman siz həmçinin bütün səhifəni dərhal yenidən render edirsiniz deyə istifadəçilər eyni zamanda səhifədəki başqa elementlərə qarşılıqlı təsir etmirlər.

<<<<<<< HEAD
Aşağıdakı nümunədə [React Router](https://reacttraining.com/react-router/) və `React.lazy`-dən istifadə edərək applikasiya kodunu route əsasında parçalanması göstərilib.
=======
Here's an example of how to setup route-based code splitting into your app using libraries like [React Router](https://reactrouter.com/) with `React.lazy`.
>>>>>>> 8fe817e61e5fe50020ed9379ce9e1c5a2cf476a9

```js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
<<<<<<< HEAD
    <Suspense fallback={<div>Yüklənir...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
=======
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
>>>>>>> 8fe817e61e5fe50020ed9379ce9e1c5a2cf476a9
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

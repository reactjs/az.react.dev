---
id: code-splitting
title: Kod Parçalanması
permalink: docs/code-splitting.html
---

## Paketləmə {#bundling}

Bir çox React applikasiyalarında, faylları [Webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/) və ya [Browserify](http://browserify.org/) kimi alətlər ilə paketləriylər. Paketləmə (bundling) import olunan faylların izlənməsi və "bundle" adlanan bir fayla birləşdirilməsidir. Bu fayl bütün applikasiyanı saytda bir dəfəyə yükləmək üçün istifadə edilə bilər.

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

Əgər siz [Create React App](https://github.com/facebookincubator/create-react-app), [Next.js](https://github.com/zeit/next.js/), [Gatsby](https://www.gatsbyjs.org/) və ya oxşar bir alət işlədirsinizsə, applikasiyanı paketləmək üçün Webpack sizdə hazır qoşulmuş olacaq.

Əgər siz belə alətlərdən istifadə etmirsinizsə, siz paketləməni özünüz qoşmalısınız. Misal üçün, Webpack sənədlərində [İnstalyasiya](https://webpack.js.org/guides/installation/) və
[Başlamaq](https://webpack.js.org/guides/getting-started/) təlimatlarına baxın.

## Kod Parçalanması {#code-splitting}

Paketləmə əladır amma sizin applikasiyanız böyüdükcə paket də böyüyəcək, xüsusəndə böyük ölçülü üçüncü tərəf kitabxanalardan istifadə edildikdə. Təsadüfən paketin ölçüsünü böyüdüb applikasiyanın yüklənməsi zamanını artırmamaq üçün paketə import etdiyiniz kodlara fikir verin.

Böyük paket ilə qalmamaq üçün öncədən problemin üstünə düşub paketi "parçalamağa" başlaya bilərsiniz. Webpack və Browserify ([factor-bundle](https://github.com/browserify/factor-bundle) ilə)  kimi paketləmə alətlərində bir çox paketləri yaradıb dinamik formada icra müddətində yüklənməsi xüsusiyyəti [Kod Parçalanması](https://webpack.js.org/guides/code-splitting/) adlanır.

Kod Parçalanması sizin applikasiyanızda istifadəçiyə hal-hazırda lazım olanları "lazy-load" etməyə kömək edir. Bu sizin applikasiyanızın performansını dramatik şəkildə təkminləşdirir. Siz applikasiyada bütün kodun həcmini azalatmasanız da, istifadəçinin işlətməyəcəyi hissələrin yüklənmənməsini qabağını alır bə ilk yüklənən kodun həcmini azaltmış olursunuz.

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

> Qeyd:
>
> Dinamik `import()` sintaksisi ECMAScript (JavaScript) 
> [təklifi fazasındadır](https://github.com/tc39/proposal-dynamic-import) və hələki dil standartının 
> bir hissəsi deyil. Bu təklif yaxın gələcəkdə standarta qəbul ediləcək.

Webpack bu sintaksisi görən kimi, sizin applikasiyanızın kodunu avtomatik parçalayacaq. Əgər siz Create React App işlədirsinizsə, bu xüsusiyyət artiq sizin üçün konfiqurasiya olunub və siz dərhal bunu [işlədə bilərsiniz](https://facebook.github.io/create-react-app/docs/code-splitting). Bu xusiyyəti həmçinin [Next.js](https://github.com/zeit/next.js/#dynamic-import) də dəstəkləyir.

Əgər Webpack-i özünüz quraşdırırsınızsa, Webpack-in [kod parçalaması haqqında təlimatını](https://webpack.js.org/guides/code-splitting/) oxumaq sizə lazım olacaq. Sizin Webpack konfiqurasiyanız təxminən [belə bir formada](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269) görünəcək.

[Babel](https://babeljs.io/) işlədərkən Babel-ın dinamik import sintaksisini təhlil edə bilməsi amma transformasiya edə bilməməsi lazımdır. Bunun üçün siz [babel-plugin-syntax-dynamic-import](https://yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import)-dan istifadə edə bilərsiniz.

## `React.lazy` {#reactlazy}

> Qeyd:
>
> `React.lazy` və Suspense serverdə render etmək üçün hazır deyil. Əgər sizə kod parçalanması server-də render olunan applikasiya üçün lazımdırsa, biz [Loadable Components](https://github.com/smooth-code/loadable-components) işlətməyi tövsiyyə edirik. Bunun [server rendering üçün yaxşı təlimatı var](https://github.com/smooth-code/loadable-components/blob/master/packages/server/README.md).

`React.lazy` funskiyası dinamik import olunmuş komponenti adi komponent kimi render etməyə imkan yaradır.

**Əvvəl:**

```js
import OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

**Sonra:**

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

Bu avtomatik olara `OtherComponent` render olduğu zaman, komponent olan paketi yükləyəcək.

`React.lazy` funskiyası mütləq olaraq dinamik `import()` funskiyasını çağırmalıdır. Bu mütləq `default` eksportunda React komponenti olan modulu "resolve" edən `Promise`-ə qaytarmalıdır.

### Suspense {#suspense}

Əgər `MyComponent` render olunduğu zaman `OtherComponent` olan modul hələ yükənməyibsə, biz modul yüklənənə kimi "fallback" kontenti (məsələn Yükləmə indikatoru) göstərməliyik. Bu `Suspense` komponenti ilə həyata keçirilir.

```js
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

Aşağıdakı nümunədə [React Router](https://reacttraining.com/react-router/) və `React.lazy`-dən istifadə edərək applikasiya kodunu route əsasında parçalanması göstərilib.

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

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

---
id: code-splitting
title: Kod Parçalanması
permalink: docs/code-splitting.html
---

## Paketləmə {#bundling}

Bir çox React applikasiyalarda faylları [Webpack](https://webpack.js.org/) və ya [Browserify](http://browserify.org/) kimi alətlər ilə paketləriylər. Paketləmə (bundling) import olunan faylların izlənməsi və "bundle" adlanan bir fayla birləşdirilməsidir. Bu fayl bütün applikasiyanı saytda bir dəfəyə yükləmək üçün istifadə edilə bilər.

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
Əgər siz [Create React App](https://github.com/facebookincubator/create-react-app), [Next.js](https://github.com/zeit/next.js/), [Gatsby](https://www.gatsbyjs.org/), və ya oxşar bir alət işlədirsinizsə, applikasiyanı paketləmək üçün Webpack sizdə hazır qoşulmuş olacaq.

Əgər siz belə alətlərdən istifadə etmirsinizsə, siz paketləməni özünüz goşmalısınız. Misal üçün Webpack sənədlərində [İnstalyasiya](https://webpack.js.org/guides/installation/) və
[Başlamaq](https://webpack.js.org/guides/getting-started/) təlimatlarına baxın.

## Kod Parçalanması {#code-splitting}

Paketləmə əladır amma sizin applikasiyanız böyüdükcə paket də böyüyəcək, xüsusəndə böyük üçüncü tərəf kitabxanalardan istifadə edildidikdə. Təsadüfən paketin ölçüsünü böyüdüb applikasiyanın yüklənməsi zamanını artırmamaq üçün paketə import etdiyiniz kodlara fikir verin.ß

Böyük paket ilə qalmamaq üçün öncədən problemin üstünə düşmə və paketi "parçalamağa" başlaya bilərsiniz. Webpack və Browserify ([factor-bundle](https://github.com/browserify/factor-bundle) ilə)  kimi paketləmə alətlərində bir çox paketləri yaradıb dinamik formada icra müddətində yüklənməsi xüsusiyyəti [Kod Parçalanması](https://webpack.js.org/guides/code-splitting/) adlanır.

Kod Parçalanması sizin applikasiyanızda istifadəçiyə cari lazım olanları "lazy-load" etməyə kömək edir. Bu sizin applikasiyanızın performansını dramatik şəkildə təkminləşdirir. Siz applikasiyada bütün kodun həcmini azalatmasanız da, istifadəçinin işlətməyəcəyi hissələrin yüklənmənməyini qabağını alır bə ilk yüklənən kodun həcmini azaltmış olursunuz.

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
> [təklifi fazasındadır](https://github.com/tc39/proposal-dynamic-import) və hələki dilin standartının 
> bir hissəsi deyil. Bu təflik yaxın gələcəkdə standarta qəbul ediləcək.

Webpack bu sintaksisi görən kimi, sizin applikasiyanızın kodunu avtomatik parçalayacaq. Əgər siz Create React App işlədirsinizsə, bu xüsusiyyət artiq sizin üçün konfiqurasiya olunub və siz dərhal bunu [işlədə bilərsiniz](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#code-splitting). Bu xusiyyət həmçinin [Next.js-də](https://github.com/zeit/next.js/#dynamic-import) dəstəklənir.

Əgər siz Webpack-i özünüz quraşdırırsınızsa, Webpack-in [kod parçalaması haqqında təlimatını](https://webpack.js.org/guides/code-splitting/) oxumaq sizə lazım olacaq. Sizin Webpack konfiqurasiyası daha [belə bir formada](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269) görünəcək.

[Babel](http://babeljs.io/) işlədərkən Babel-ın dinamik import sintaksisini təhlil edə bilir amma transformasiya etmir. Bunun üçün sizə [babel-plugin-syntax-dynamic-import](https://yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import) lazımdır.

## `React.lazy` {#reactlazy}

> Note:
>
> `React.lazy` and Suspense is not yet available for server-side rendering. If you want to do code-splitting in a server rendered app, we recommend [Loadable Components](https://github.com/smooth-code/loadable-components). It has a nice [guide for bundle splitting with server-side rendering](https://github.com/smooth-code/loadable-components/blob/master/packages/server/README.md).

The `React.lazy` function lets you render a dynamic import as a regular component.

**Before:**

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

**After:**

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

This will automatically load the bundle containing the `OtherComponent` when this component gets rendered.

`React.lazy` takes a function that must call a dynamic `import()`. This must return a `Promise` which resolves to a module with a `default` export containing a React component.

### Suspense {#suspense}

If the module containing the `OtherComponent` is not yet loaded by the time `MyComponent` renders, we must show some fallback content while we're waiting for it to load - such as a loading indicator. This is done using the `Suspense` component.

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

The `fallback` prop accepts any React elements that you want to render while waiting for the component to load. You can place the `Suspense` component anywhere above the lazy component. You can even wrap multiple lazy components with a single `Suspense` component.

```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

### Error boundaries {#error-boundaries}

If the other module fails to load (for example, due to network failure), it will trigger an error. You can handle these errors to show a nice user experience and manage recovery with [Error Boundaries](/docs/error-boundaries.html). Once you've created your Error Boundary, you can use it anywhere above your lazy components to display an error state when there's a network error.

```js
import MyErrorBoundary from './MyErrorBoundary';
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

## Route-based code splitting {#route-based-code-splitting}

Deciding where in your app to introduce code splitting can be a bit tricky. You
want to make sure you choose places that will split bundles evenly, but won't
disrupt the user experience.

A good place to start is with routes. Most people on the web are used to
page transitions taking some amount of time to load. You also tend to be
re-rendering the entire page at once so your users are unlikely to be
interacting with other elements on the page at the same time.

Here's an example of how to setup route-based code splitting into your app using
libraries like [React Router](https://reacttraining.com/react-router/) with `React.lazy`.

```js
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./routes/Home'));
const About = lazy(() => import('./routes/About'));

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Suspense>
  </Router>
);
```

## Named Exports {#named-exports}

`React.lazy` currently only supports default exports. If the module you want to import uses named exports, you can create an intermediate module that reexports it as the default. This ensures that treeshaking keeps working and that you don't pull in unused components.

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

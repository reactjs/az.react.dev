---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

`ReactDOMServer` obyekti sizə komponentləri statik markapa render etməyə imkan yaradır. Adətən, bu Node serveri ilə işlənilir:

```js
// ES modulları
import ReactDOMServer from 'react-dom/server';
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## İcmal {#overview}

Aşağıdakı funksiyalar brauzerdə və serverdə işlənilə bilər:

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

Aşağıda göstərilən funksiyalar **yalnız serverdə mövcud olan** `stream` paketindən asılıdırlar. Bu səbəbdən bu metodlar brauzerdə işləməyəcəklər.

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToReadableStream()`](#rendertoreadablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Arayış {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

React elementini ilkin HTML-ə render edin. React, HTML mətni qaytaracaq. Siz bu funksiya ilə HTML-i serverdə yaradıb markapı ilkin sorğuda göndərə bilərsiniz. Bu səhifələrin daha tez yüklənməsinə və SEO üçün axtarış qurğularının səhifələrdə gəzişməsinə imkan yaradır.

<<<<<<< HEAD
Əgər siz [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) funksiyasını serverdə render edilmiş markap olan DOM noduna çağırsanız, React mövcud markapı saxlayacaq və yalnız hadisə icləyicilərini qoşacaq. Bu sizə daha performanslı ilk yüklənmiş təcrübə verəcək.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

[`renderToString`](#rendertostring)-ə bənzəyir amma bu React-in daxili istifadə etdiyi `data-reactroot` kimi əlavə DOM atributları yaratmır. Bu funksiya əlavə atributları silməklə nəticənin ölçüsünü azaldır. Bu səbəbdən bu funksiya React-i sadə statik səhifə generatoru kimi işlətmək üçün fayadalıdır.

<<<<<<< HEAD
Əgər siz markapi interaktiv etmək üçün React-i klientdə işlədirsinizsə, bu funksiyadan istifadə etməyin. Bunun əvəzinə, serverdə [`renderToString`](#rendertostring) və klientdə [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) işlədin.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

* * *

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

Render a React element to its initial HTML. Returns a [Control object](https://github.com/facebook/react/blob/3f8990898309c61c817fbf663f5221d9a00d0eaa/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L49-L54) that allows you to pipe the output or abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" later through javascript execution. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note:
>
> This is a Node.js specific API and modern server environments should use renderToReadableStream instead.
>

```
const {pipe, abort} = renderToPipeableStream(
  <App />,
  {
    onAllReady() {
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      pipe(res);
    },
    onShellError(x) {
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    }
  }
);
```

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
    ReactDOMServer.renderToReadableStream(element, options);
```

Streams a React element to its initial HTML. Returns a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```
let controller = new AbortController();
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
    }
  );
  
  // This is to wait for all suspense boundaries to be ready. You can uncomment
  // this line if you don't want to stream to the client
  // await stream.allReady;

  return new Response(stream, {
    headers: {'Content-Type': 'text/html'},
  });
} catch (error) {
  return new Response(
    '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>',
    {
      status: 500,
      headers: {'Content-Type': 'text/html'},
    }
  );
}
```
* * *

### `renderToNodeStream()` {#rendertonodestream} (Deprecated)

```javascript
ReactDOMServer.renderToNodeStream(element)
```

React elementini ilkin HTML-ə render edin. HTML mətni çıxaran [oxunan axın](https://nodejs.org/api/stream.html#stream_readable_streams) qaytarır. Bu axının HTML nəticəsi [`ReactDOMServer.renderToString`-in](#rendertostring) qaytaracağı HTML nəticəsi ilə tam eynidir. Siz bu funksiya ilə HTML-i serverdə yaradıb markapı ilkin sorğuda göndərə bilərsiniz. Bu səhifələrin daha tez yüklənməsinə və SEO üçün axtarış qurğularının səhifələrdə gəzişməsinə imkan yaradır.

<<<<<<< HEAD
Əgər siz [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) funksiyasını server render edilmiş markap olan DOM noduna çağırsanız, React mövcud markapı saxlayacaq və yalnız hadisə icləyicilərini qoşacaq. Bu sizə daha performanslı ilk yüklənmiş təcrübə verəcək.
=======
If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Qeyd:
>
> Yalnız serverdə. Bu API brauzerdə mövcud deyil.
>
> Bu funksiyadan qaytarılan axın utf-8 ilə kodlaşdırılmış bayt axını qaytaracaq. Əgər sizə başqa kodlaşdırmada olan axın lazımdırsa, mətnləri transkodlaşdırmaq üçün çevirmə axınları ilə təmin edən [iconv-lite](https://www.npmjs.com/package/iconv-lite) kitabxanasından istifadə edin.

* * *

### `renderToStaticNodeStream()` {#rendertostaticnodestream}

```javascript
ReactDOMServer.renderToStaticNodeStream(element)
```

[`renderToNodeStream`](#rendertonodestream)-ə bənzəyir amma bu React-in daxili istifadə etdiyi `data-reactroot` kimi əlavə DOM atributları yaratmır. Bu funksiya əlavə atributları silməklə nəticənin ölçüsünü azaldır. Bu səbəbdən bu funksiya React-i sadə statik səhifə generatoru kimi işlətmək üçün fayadalıdır.

Bu axının HTML nəticəsi [`ReactDOMServer.renderToStaticMarkup`-ın](#rendertostaticmarkup) qataracağı HTML nəticəsi ilə tam eynidir.

<<<<<<< HEAD
Əgər siz markapi interaktiv etmək üçün React-i klientdə işlədirsinizsə, bu funksiyadan istifadə etməyin. Bunun əvəzinə, serverdə [`renderToNodeStream`](#rendertonodestream) və klientdə [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) işlədin.
=======
If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToNodeStream`](#rendertonodestream) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> 707f22d25f5b343a2e5e063877f1fc97cb1f48a1

> Qeyd:
>
> Yalnız serverdə. Bu API brauzerdə mövcud deyil.
>
> Bu funksiyadan qaytarılan axın utf-8 ilə kodlaşdırılmış bayt axını qaytaracaq. Əgər sizə başqa kodlaşdırmada olan axın lazımdırsa, mətnləri transkodlaşdırmaq üçün çevirmə axınları ilə təmin edən [iconv-lite](https://www.npmjs.com/package/iconv-lite) kitabxanasından istifadə edin.

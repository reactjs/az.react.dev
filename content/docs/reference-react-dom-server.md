---
id: react-dom-server
title: ReactDOMServer
layout: docs
category: Reference
permalink: docs/react-dom-server.html
---

`ReactDOMServer` obyekti sizə komponentləri statik markapa render etməyə imkan yaradır. Adətən, bu Node serveri ilə işlənilir:

```js
<<<<<<< HEAD
// ES modulları
import ReactDOMServer from 'react-dom/server';
=======
// ES modules
import * as ReactDOMServer from 'react-dom/server';
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f
// CommonJS
var ReactDOMServer = require('react-dom/server');
```

## İcmal {#overview}

<<<<<<< HEAD
Aşağıdakı funksiyalar brauzerdə və serverdə işlənilə bilər:
=======
These methods are only available in the **environments with [Node.js Streams](https://nodejs.dev/learn/nodejs-streams):**

- [`renderToPipeableStream()`](#rendertopipeablestream)
- [`renderToNodeStream()`](#rendertonodestream) (Deprecated)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

These methods are only available in the **environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)** (this includes browsers, Deno, and some modern edge runtimes):

- [`renderToReadableStream()`](#rendertoreadablestream)

The following methods can be used in the environments that don't support streams:
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

- [`renderToString()`](#rendertostring)
- [`renderToStaticMarkup()`](#rendertostaticmarkup)

<<<<<<< HEAD
Aşağıda göstərilən funksiyalar **yalnız serverdə mövcud olan** `stream` paketindən asılıdırlar. Bu səbəbdən bu metodlar brauzerdə işləməyəcəklər.

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Arayış {#reference}
=======
## Reference {#reference}
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

### `renderToPipeableStream()` {#rendertopipeablestream}

```javascript
ReactDOMServer.renderToPipeableStream(element, options)
```

<<<<<<< HEAD
React elementini ilkin HTML-ə render edin. React, HTML mətni qaytaracaq. Siz bu funksiya ilə HTML-i serverdə yaradıb markapı ilkin sorğuda göndərə bilərsiniz. Bu səhifələrin daha tez yüklənməsinə və SEO üçün axtarış qurğularının səhifələrdə gəzişməsinə imkan yaradır.

Əgər siz [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) funksiyasını serverdə render edilmiş markap olan DOM noduna çağırsanız, React mövcud markapı saxlayacaq və yalnız hadisə icləyicilərini qoşacaq. Bu sizə daha performanslı ilk yüklənmiş təcrübə verəcək.
=======
Render a React element to its initial HTML. Returns a stream with a `pipe(res)` method to pipe the output and `abort()` to abort the request. Fully supports Suspense and streaming of HTML with "delayed" content blocks "popping in" via inline `<script>` tags later. [Read more](https://github.com/reactwg/react-18/discussions/37)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let didError = false;
const stream = renderToPipeableStream(
  <App />,
  {
    onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.setHeader('Content-type', 'text/html');
      stream.pipe(res);
    },
    onShellError(error) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      res.statusCode = 500;
      res.send(
        '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
      );
    },
    onAllReady() {
      // If you don't want streaming, use this instead of onShellReady.
      // This will fire after the entire page content is ready.
      // You can use this for crawlers or static generation.

      // res.statusCode = didError ? 500 : 200;
      // res.setHeader('Content-type', 'text/html');
      // stream.pipe(res);
    },
    onError(err) {
      didError = true;
      console.error(err);
    },
  }
);
```

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerNode.js#L36-L46).

> Note:
>
> This is a Node.js-specific API. Environments with [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API), like Deno and modern edge runtimes, should use [`renderToReadableStream`](#rendertoreadablestream) instead.
>
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

* * *

### `renderToReadableStream()` {#rendertoreadablestream}

```javascript
ReactDOMServer.renderToReadableStream(element, options);
```

<<<<<<< HEAD
[`renderToString`](#rendertostring)-ə bənzəyir amma bu React-in daxili istifadə etdiyi `data-reactroot` kimi əlavə DOM atributları yaratmır. Bu funksiya əlavə atributları silməklə nəticənin ölçüsünü azaldır. Bu səbəbdən bu funksiya React-i sadə statik səhifə generatoru kimi işlətmək üçün fayadalıdır.

Əgər siz markapi interaktiv etmək üçün React-i klientdə işlədirsinizsə, bu funksiyadan istifadə etməyin. Bunun əvəzinə, serverdə [`renderToString`](#rendertostring) və klientdə [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) işlədin.
=======
Streams a React element to its initial HTML. Returns a Promise that resolves to a [Readable Stream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream). Fully supports Suspense and streaming of HTML. [Read more](https://github.com/reactwg/react-18/discussions/127)

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

```javascript
let controller = new AbortController();
let didError = false;
try {
  let stream = await renderToReadableStream(
    <html>
      <body>Success</body>
    </html>,
    {
      signal: controller.signal,
      onError(error) {
        didError = true;
        console.error(error);
      }
    }
  );
  
  // This is to wait for all Suspense boundaries to be ready. You can uncomment
  // this line if you want to buffer the entire HTML instead of streaming it.
  // You can use this for crawlers or static generation:

  // await stream.allReady;

  return new Response(stream, {
    status: didError ? 500 : 200,
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

See the [full list of options](https://github.com/facebook/react/blob/14c2be8dac2d5482fda8a0906a31d239df8551fc/packages/react-dom/src/server/ReactDOMFizzServerBrowser.js#L27-L35).

> Note:
>
> This API depends on [Web Streams](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API). For Node.js, use [`renderToPipeableStream`](#rendertopipeablestream) instead.
>
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

* * *

### `renderToNodeStream()`  (Deprecated) {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

<<<<<<< HEAD
React elementini ilkin HTML-ə render edin. HTML mətni çıxaran [oxunan axın](https://nodejs.org/api/stream.html#stream_readable_streams) qaytarır. Bu axının HTML nəticəsi [`ReactDOMServer.renderToString`-in](#rendertostring) qaytaracağı HTML nəticəsi ilə tam eynidir. Siz bu funksiya ilə HTML-i serverdə yaradıb markapı ilkin sorğuda göndərə bilərsiniz. Bu səhifələrin daha tez yüklənməsinə və SEO üçün axtarış qurğularının səhifələrdə gəzişməsinə imkan yaradır.

Əgər siz [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) funksiyasını server render edilmiş markap olan DOM noduna çağırsanız, React mövcud markapı saxlayacaq və yalnız hadisə icləyicilərini qoşacaq. Bu sizə daha performanslı ilk yüklənmiş təcrübə verəcək.
=======
Render a React element to its initial HTML. Returns a [Node.js Readable stream](https://nodejs.org/api/stream.html#stream_readable_streams) that outputs an HTML string. The HTML output by this stream is exactly equal to what [`ReactDOMServer.renderToString`](#rendertostring) would return. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

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
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

> Qeyd:
>
> Yalnız serverdə. Bu API brauzerdə mövcud deyil.
>
<<<<<<< HEAD
> Bu funksiyadan qaytarılan axın utf-8 ilə kodlaşdırılmış bayt axını qaytaracaq. Əgər sizə başqa kodlaşdırmada olan axın lazımdırsa, mətnləri transkodlaşdırmaq üçün çevirmə axınları ilə təmin edən [iconv-lite](https://www.npmjs.com/package/iconv-lite) kitabxanasından istifadə edin.
=======
> The stream returned from this method will return a byte stream encoded in utf-8. If you need a stream in another encoding, take a look at a project like [iconv-lite](https://www.npmjs.com/package/iconv-lite), which provides transform streams for transcoding text.

* * *

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

Render a React element to its initial HTML. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

If you call [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

> Note
>
> This API has limited Suspense support and does not support streaming.
>
> On the server, it is recommended to use either [`renderToPipeableStream`](#rendertopipeablestream) (for Node.js) or [`renderToReadableStream`](#rendertoreadablestream) (for Web Streams) instead.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

Similar to [`renderToString`](#rendertostring), except this doesn't create extra DOM attributes that React uses internally, such as `data-reactroot`. This is useful if you want to use React as a simple static page generator, as stripping away the extra attributes can save some bytes.

If you plan to use React on the client to make the markup interactive, do not use this method. Instead, use [`renderToString`](#rendertostring) on the server and [`ReactDOM.hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) on the client.
>>>>>>> d522a5f4a9faaf6fd314f4d15f1be65ca997760f

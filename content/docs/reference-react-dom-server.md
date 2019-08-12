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

- [`renderToNodeStream()`](#rendertonodestream)
- [`renderToStaticNodeStream()`](#rendertostaticnodestream)

* * *

## Arayış {#reference}

### `renderToString()` {#rendertostring}

```javascript
ReactDOMServer.renderToString(element)
```

React elementini ilkin HTML-ə render edin. React, HTML mətni qaytaracaq. Siz bu funksiya ilə HTML-i serverdə yaradıb markapı ilkin sorğuda göndərə bilərsiniz. Bu səhifələrin daha tez yüklənməsinə və SEO üçün axtarış qurğularının səhifələrdə gəzişməsinə imkan yaradır.

Əgər siz [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) funksiyasını serverdə render edilmiş markap olan DOM noduna çağırsanız, React mövcud markapı saxlayacaq və yalnız hadisə icləyicilərini qoşacaq. Bu sizə daha performanslı ilk yüklənmiş təcrübə verəcək.

* * *

### `renderToStaticMarkup()` {#rendertostaticmarkup}

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

[`renderToString`](#rendertostring)-ə bənzəyir amma bu React-in daxili istifadə etdiyi `data-reactroot` kimi əlavə DOM atributları yaratmır. Bu funksiya əlavə atributları silməklə nəticənin ölçüsünü azaldır. Bu səbəbdən bu funksiya React-i sadə statik səhifə generatoru kimi işlətmək üçün fayadalıdır.

Əgər siz markapi interaktiv etmək üçün React-i klientdə işlədirsinizsə, bu funksiyadan istifadə etməyin. Bunun əvəzinə, serverdə [`renderToString`](#rendertostring) və klientdə [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) işlədin.

* * *

### `renderToNodeStream()` {#rendertonodestream}

```javascript
ReactDOMServer.renderToNodeStream(element)
```

React elementini ilkin HTML-ə render edin. HTML mətni çıxaran [oxunan axın](https://nodejs.org/api/stream.html#stream_readable_streams) qaytarır. Bu axının HTML nəticəsi [`ReactDOMServer.renderToString`-in](#rendertostring) qaytaracağı HTML nəticəsi ilə tam eynidir. Siz bu funksiya ilə HTML-i serverdə yaradıb markapı ilkin sorğuda göndərə bilərsiniz. Bu səhifələrin daha tez yüklənməsinə və SEO üçün axtarış qurğularının səhifələrdə gəzişməsinə imkan yaradır.

Əgər siz [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) funksiyasını server render edilmiş markap olan DOM noduna çağırsanız, React mövcud markapı saxlayacaq və yalnız hadisə icləyicilərini qoşacaq. Bu sizə daha performanslı ilk yüklənmiş təcrübə verəcək.

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

Əgər siz markapi interaktiv etmək üçün React-i klientdə işlədirsinizsə, bu funksiyadan istifadə etməyin. Bunun əvəzinə, serverdə [`renderToNodeStream`](#rendertonodestream) və klientdə [`ReactDOM.hydrate()`](/docs/react-dom.html#hydrate) işlədin.

> Qeyd:
>
> Yalnız serverdə. Bu API brauzerdə mövcud deyil.
>
> Bu funksiyadan qaytarılan axın utf-8 ilə kodlaşdırılmış bayt axını qaytaracaq. Əgər sizə başqa kodlaşdırmada olan axın lazımdırsa, mətnləri transkodlaşdırmaq üçün çevirmə axınları ilə təmin edən [iconv-lite](https://www.npmjs.com/package/iconv-lite) kitabxanasından istifadə edin.

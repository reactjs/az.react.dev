---
id: cdn-links
title: CDN Linkləri
permalink: docs/cdn-links.html
prev: create-a-new-react-app.html
next: hello-world.html
---

React və ReactDOM CDN-dən mövcuddur.

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
```

Yuxarıda göstərilən versiyalar yalnız development üçündür. Bu linkləri produksiyada işlətməyin. React-in minimallaşmış (minify) və produksiya üçün optimallaşmış versiyalarını aşağıdakı linklərdən yükləyə bilərsiniz:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

`react` və `react-dom`-un spesifik versiyalarını yükləmək üçün `16` rəqəmini versiya nömrəsi ilə əvəz edin.

### Niyə `crossorigin` Atributu? {#why-the-crossorigin-attribute}

React-i CDN-dən yükləyirsinizsə [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) atributunu saxlamağı tövsiyyə edirik:

```html
<script crossorigin src="..."></script>
```

Əlavə olaraq, CDN-lərin `Access-Control-Allow-Origin: *` HTTP başlığı əlavə etdiyini də yoxlayın:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

Bu atribut ve başlıqlar, sizi React 16 və yuxarı versiyalarda daha yaxşı [xəta idarəsi təcrübəsi](/blog/2017/07/26/error-handling-in-react-16.html) ilə təmin edir.

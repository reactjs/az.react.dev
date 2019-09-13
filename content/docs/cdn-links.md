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

Yuxarıda göstərilən versiyalar yalnız development üçündür. Production-da işlətmək üçün deyil. React-in minify olunmuş ve production üçün optimallaşmış versiyaları aşağıdaki linklərdən mövcuddur:

```html
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

`react` və `react-dom`-un spesifik versiyalarını yükləmək üçün `16`-nı versiya nömrəsi ilə əvəz edin.

### Niye `crossorigin` Atributu? {#why-the-crossorigin-attribute}

React-i CDN-dən yükləyirsinizsə [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) atributunu saxlamağı tövsiyyə edirik:

```html
<script crossorigin src="..."></script>
```

CDN-lərin `Access-Control-Allow-Origin: *` HTTP başlığı etdiyini yoxlamağıda tövsiyyə edirik:

![Access-Control-Allow-Origin: *](../images/docs/cdn-cors-header.png)

Bu sizə React 16 və yuxarı versiyalarda daha yaxşı [xəta idarəsi təcrübəsi](/blog/2017/07/26/error-handling-in-react-16.html) verir.

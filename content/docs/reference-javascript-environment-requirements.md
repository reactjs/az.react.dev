---
id: javascript-environment-requirements
title: JavaScript Mühitinin Tələbləri
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
React 16 [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) və [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) kolleksiya tiplərindən asılıdır. Əgər siz bu funksiyaları nativ təmin etməyən köhnə brauzerləri (məsələn IE < 11) və ya standart tətbiq etməyən brauzerləri (məsələn IE 11) dəstəkləyirsinizsə, [core-js](https://github.com/zloirock/core-js) kimi qlobal polifili paketlənmiş applikasiyanıza əlavə edin.

React 16-nı keçmiş brauzerlərdə dəstəkləmək üçün core-js ilə polifilləşmiş mühit aşağıdakı kimi ola bilər:
=======
React 18 supports all modern browsers (Edge, Firefox, Chrome, Safari, etc).

If you support older browsers and devices such as Internet Explorer which do not provide modern browser features natively or have non-compliant implementations, consider including a global polyfill in your bundled application.
>>>>>>> e77ba1e90338ff18f965c9b94c733b034b3ac18f

Here is a list of the modern features React 18 uses:
- [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Salam Dünya!</h1>,
  document.getElementById('root')
);
```

React həmçinin `requestAnimationFrame`-dən (hətta test mühitlərində) asılıdır.  
Siz `requestAnimationFrame`-i "shim" etmək üçün [raf](https://www.npmjs.com/package/raf) paketindən istifadə edə bilərsiniz:

```js
import 'raf/polyfill';
```
=======
The correct polyfill for these features depend on your environment. For many users, you can configure your [Browserlist](https://github.com/browserslist/browserslist) settings. For others, you may need to import polyfills like [`core-js`](https://github.com/zloirock/core-js) directly.
>>>>>>> e77ba1e90338ff18f965c9b94c733b034b3ac18f

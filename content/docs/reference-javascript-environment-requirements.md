---
id: javascript-environment-requirements
title: JavaScript Mühitinin Tələbləri
layout: docs
category: Reference
permalink: docs/javascript-environment-requirements.html
---

<<<<<<< HEAD
React 16 [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) və [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) kolleksiya tiplərindən asılıdır. Əgər siz bu funksiyaları nativ təmin etməyən köhnə brauzerləri (məsələn IE < 11) və ya standart tətbiq etməyən brauzerləri (məsələn IE 11) dəstəkləyirsinizsə, [core-js](https://github.com/zloirock/core-js) və ya [babel-polyfill](https://babeljs.io/docs/usage/polyfill/) kimi qlobal polifilləri paketlənmiş applikasiyanıza əlavə edin.
=======
React 16 depends on the collection types [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) and [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set). If you support older browsers and devices which may not yet provide these natively (e.g. IE < 11) or which have non-compliant implementations (e.g. IE 11), consider including a global polyfill in your bundled application, such as [core-js](https://github.com/zloirock/core-js).
>>>>>>> 957276e1e92bb48e5bb6b1c17fd0e7a559de0748

React 16-nı keçmiş brauzerlərdə dəstəkləmək üçün core-js ilə polifilləşmiş mühit aşağıdakı kimi ola bilər:

```js
import 'core-js/es/map';
import 'core-js/es/set';

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

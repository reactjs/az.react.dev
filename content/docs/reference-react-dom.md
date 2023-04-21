---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.
>
> These new documentation pages teach modern React:
>
> - [`react-dom`: Components](https://react.dev/reference/react-dom/components)
> - [`react-dom`: APIs](https://react.dev/reference/react-dom)
> - [`react-dom`: Client APIs](https://react.dev/reference/react-dom/client)
> - [`react-dom`: Server APIs](https://react.dev/reference/react-dom/server)

</div>

The `react-dom` package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside the React model if you need to.

```js
import * as ReactDOM from 'react-dom';
```

If you use ES5 with npm, you can write:

```js
var ReactDOM = require('react-dom');
```

The `react-dom` package also provides modules specific to client and server apps:
- [`react-dom/client`](/docs/react-dom-client.html)
- [`react-dom/server`](/docs/react-dom-server.html)

## İcmal {#overview}

The `react-dom` package exports these methods:
- [`createPortal()`](#createportal)
- [`flushSync()`](#flushsync)

These `react-dom` methods are also exported, but are considered legacy:
- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`findDOMNode()`](#finddomnode)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)

> Note: 
> 
> Both `render` and `hydrate` have been replaced with new [client methods](/docs/react-dom-client.html) in React 18. These methods will warn that your app will behave as if it's running React 17 (learn more [here](https://reactjs.org/link/switch-to-createroot)).

### Brauzer Dəstəyi {#browser-support}

React supports all modern browsers, although [some polyfills are required](/docs/javascript-environment-requirements.html) for older versions.

> Qeyd
>
> We do not support older browsers that don't support ES5 methods or microtasks such as Internet Explorer. You may find that your apps do work in older browsers if polyfills such as [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) are included in the page, but you're on your own if you choose to take this path.

## Arayış {#reference}

### `createPortal()` {#createportal}

<div class="scary">

> This content is out of date.
>
> Read the new React documentation for [`createPortal`](https://react.dev/reference/react-dom/createPortal).

</div>

```javascript
createPortal(child, container)
```

Creates a portal. Portals provide a way to [render children into a DOM node that exists outside the hierarchy of the DOM component](/docs/portals.html).

### `flushSync()` {#flushsync}

<div class="scary">

> This content is out of date.
>
> Read the new React documentation for [`flushSync`](https://react.dev/reference/react-dom/flushSync).

</div>

```javascript
flushSync(callback)
```

Force React to flush any updates inside the provided callback synchronously. This ensures that the DOM is updated immediately.

```javascript
// Force this state update to be synchronous.
flushSync(() => {
  setCount(count + 1);
});
// By this point, DOM is updated.
```

> Note:
> 
> `flushSync` can significantly hurt performance. Use sparingly.
> 
> `flushSync` may force pending Suspense boundaries to show their `fallback` state.
> 
> `flushSync` may also run pending effects and synchronously apply any updates they contain before returning.
> 
> `flushSync` may also flush updates outside the callback when necessary to flush the updates inside the callback. For example, if there are pending updates from a click, React may flush those before flushing the updates inside the callback.

## Legacy Reference {#legacy-reference}
### `render()` {#render}

<div class="scary">

> This content is out of date.
>
> Read the new React documentation for [`render`](https://react.dev/reference/react-dom/render).

</div>

```javascript
render(element, container[, callback])
```

> Note:
>
> `render` has been replaced with `createRoot` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

DOM-da göstərilən `container`-ə React elementini render edərək komponent [referansı](/docs/more-about-refs.html) qaytar ([state-siz komponentlər](/docs/components-and-props.html#function-and-class-components) üçün `null` qaytarır).

Əgər `container`-ə əvvəl başqa React elementi render edilmişdirsə, bu funksiya olan `container`-i yalnız yeniləyəcək və DOM-u yeni React elementini göstərmək üçün dəyişəcək.

Əgər vacib olmayan callback arqumenti təmin edilibsə, təmin edilən funksiya komponent render edildikdən və ya yeniləndikdən sonra çağrılacaq.

> Qeyd:
>
> `render()` təmin edilən konteynerin daxilini kontrol edir. İlk çağırışda, konteynerin içində olan bütün DOM elementlər silinir. Sonrakı dəyişikliklər isə React-in DOM müqayisə edən alqoritmi ilə səmərəli formada yenilənir.
>
> `render()` konteyner nodunu dəyişmir (yalnız konteynerin uşaqlarını dəyişir). Mövcud olan uşaqları silmədən yeni komponenti mövcud olan DOM noduna əlavə etmək mümkündür.
>
> Hal hazırda `render()` ana  `ReactComponent` instansiyasına referansı qaytarır. Amma bu dəyərin istifadəsi köhnəlib və bu dəyərdən istifadə etməyin.
> Çünki React gələcəkdə bəzi hallarda komponentləri asinxron formada render edə bilər. Əgər sizə ana `ReactComponent` instansiyasına referans lazımdırsa, tövsiyə olunan həll ana elementə
> [callback ref-i](/docs/refs-and-the-dom.html#callback-refs) qoşmaqdır.
>
> Using `render()` to hydrate a server-rendered container is deprecated. Use [`hydrateRoot()`](/docs/react-dom-client.html#hydrateroot) instead.

* * *

### `hydrate()` {#hydrate}

<div class="scary">

> This content is out of date.
>
> Read the new React documentation for [`hydrate`](https://react.dev/reference/react-dom/hydrate).

</div>

```javascript
hydrate(element, container[, callback])
```

> Note:
>
> `hydrate` has been replaced with `hydrateRoot` in React 18. See [hydrateRoot](/docs/react-dom-client.html#hydrateroot) for more info.

[`render()`](#render)-dən fərqli olaraq bu funksiya [`ReactDOMServer`](/docs/react-dom-server.html) tərəfindən render edilən HTML kontenti olan konteyneri hidrat etmək üçün işlədilir. React mövcud markapa hadisə işləyicilərini qoşmağa çalışacaq.

React render edilən kontentin server və klientdə eyni olmasını umur. Bu, mətnlərdə olan fərqlilikləri düzəldə bilir amma siz bütün uyğunsuzlara baq kimi davranıb düzəltməyə çalışın. Təkmilləşmə modunda, React hidrasiya zamanı baş verən bütün uyğunsuzluqlar haqqında xəbərdarlıq edir. Uyğunsuzluqlar zamanı attribut fərqlərinin düzəlməsinə heç bir qarantiya yoxdur. Bunun səbəbi performan ilə bağlıdır. Bir çox applikasiyalarda uyğunsuzluqlar nadir olduğundan bütün markapları validasiya etmək çox bahalıdır.

Əgər elementin atributu və ya mətn kontenti server və klientdə qaçılmaz şəkildə fərqlənirsə (məsələn tarix), siz elementə `suppressHydrationWarning={true}` əlavə etməklə xəbərdarlığı söndürə bilərsiniz. Bu yalnız bir dərəcə dərinlikdə işləyir və yalnız çıxış yolu kimi işlətmək üçün nəzərdə tutulub. Bunu çox işlətməyin. Mətn kontenti olmadıqda, React yenə də uyğunsuzluqları düzəltməyə bilər və bu gələcək yeniliklərə kimi eyni qala bilər.

Əgər sizə server və klientdə bilərəkdən fərqli render etmək lazımdırsa siz iki-keçidli render etmədən istifadə edə bilərsiniz. Klientdə fərqli render edilməli komponentlər `this.state.isClient` state (`componentDidMount`-da bunu `true` ilə təyin edə bilərsiniz) dəyərini oxuya bilərlər. Bu səbəbdən ilkin render keçidində klient server ilə eyni kontenti render edəcək və uyğunsuzluq olmayacaq. Amma hidrasiyadan sonra sinxron formada ikinci keçid baş verəcək. Nəzərə alın ki, bu yanaşmada komponentlər iki dəfə render edildiyindən komponentləriniz yavaş işləyə bilərlər. Bu səbəbdən bu yolu diqqət ilə işlədin.

Yavaş internet sürətlədində istifadəçi təcrübəsindən zehinli olun. Javascript kodu ilkin HTML renderindən çox gec sonra yüklənə bilər. Bu səbəbdən klient keçidində fərqli bir şey render edildikdə, keçid çox xoşagəlməz ola bilər. Amma yaxşı icra edildikdə, applikasiyanın "qabığını" serverdə render etmək faydalı ola bilər. Bunu markap uyğunsuzluqları olmadan edə bilmək üçün, əvvəlki paraqrafda olan izahata baxın.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

<div class="scary">

> This content is out of date.
>
> Read the new React documentation for [`unmountComponentAtNode`](https://react.dev/reference/react-dom/unmountComponentAtNode).

</div>

```javascript
unmountComponentAtNode(container)
```

> Note:
>
> `unmountComponentAtNode` has been replaced with `root.unmount()` in React 18. See [createRoot](/docs/react-dom-client.html#createroot) for more info.

Mount olunmuş React komponenti DOM-dan silir və bütün aid olan hadisə işləyicilərini və state-i təmizləyir. Əgər konteynerə heç bir komponent mount edilməyibsə bu funksiyanı çağırdıqda heç nə baş vermir. Bu funksiya komponent unmount edildikdə `true`, unmount edilməyə komponent olmadıqda isə `false` qaytarır.

* * *

### `findDOMNode()` {#finddomnode}

<div class="scary">

> This content is out of date.
>
> Read the new React documentation for [`findDOMNode`](https://react.dev/reference/react-dom/findDOMNode).

</div>

> Qeyd:
>
> `findDOMNode` DOM noduna daxil olmaq üçün bir üsuldur. Bu üsulun komponent abstraksiyasını sındırdığına görə bir çox hallarda bu üsuldan istifadə etməyi tövsiyə etmirik. [`StrictMode`-da bu üsul köhnəlib.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
findDOMNode(component)
```
Əgər komponent DOM-a mount edilibsə bu funksiya brauzerdə komponentə müvafiq nativ DOM elementini qaytarır. Bu metod anket sahələrinin dəyərlərini oxumaq və DOM ölçmələri aparmaq kimi əməliyyatlar üçün DOM-dan dəyərləri oxumaq üçün faydalıdır. **Bir çox hallarda, siz DOM noduna ref qoşub `findDOMNode`-dan istifadə etməyə bilərsiniz.**

Komponent `null` və ya `false` render etdikdə `findDOMNode` `null` qaytarır. Komponent mətn render etdikdə, `findDOMNode` dəyəri saxlayan mətn DOM nodu qaytarır. React 16-dan başlayaraq komponent fraqment ilə bir neçə uşaq qaytara bilər. Bu halda `findDOMNode` ilk boş olmayan uşağın DOM nodunu qaytaracaq.

> Qeyd:
>
> `findDOMNode` yalnız mount olunmuş komponentlər ilə işləyir (yəni DOM-da yerləşən komponentlər ilə). Əgər siz bu funksiyanı mount olunmamış komponentdə çağırsanız (məsələn `findDOMNode()` funksiyasını hələ yaranmamış komponentin `render()`-ində çağırsanız) xəta atılacaq.
>
> `findDOMNode` funksiya komponentlərində işlənə bilməz.

* * *

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Portal yaradır. Portallar [DOM komponenti iyerarxiyası kənarında olan DOM noduna uşaqları render etmək üçün](/docs/portals.html) yol təmin edir.

---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

Əgər siz React-i `<script>` təqi ilə yükləyirsinizsə, yüksək dərəcəli API-lar `ReactDOM` qlobal dəyişənindən istifadə edilə bilərlər. Əgər siz NPM ilə ES6 işlədirsinizsə, siz `import ReactDOM from 'react-dom'` yaza bilərsiniz. Əgər siz NPM ile ES5 işlədirsinizsə, siz `var ReactDOM = require('react-dom')` yaza bilərsiniz.

## İcmal {#overview}

`react-dom` paketi applikasiyanızın ən yüksək dərəcəsində DOMa-a aid olan metodlar ilə və React modelindən kanara çıxmaq üçün metodlar ilə təmin edir. Sizin komponentlərinizin əksəriyyəti bu modulu işlətməməlidir.

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

### Brauzer Dəstəyi {#browser-support}

React bütün populyar brauzerləri (Internet Explorer 9 və yuxarı daxil olmaqla) dəstəkləyir. IE 9 və IE 10 kimi köhnə brauzerlər üçün [bəzi polifillər lazım ola bilər.](/docs/javascript-environment-requirements.html)

> Qeyd
>
> Biz ES5 metodları dəstəkləməyən köhnə brauzerləri dəstəkləmir. Amma bir çox applikasiyalar [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) kimi polifillər səhifəyə yüklənəndə köhnə brauzerlərdə işləyirlər. Siz bu yolu seçirsinizsə biz sizə kömək edə bilmərik.

* * *

## Arayış {#reference}

### `render()` {#render}

```javascript
ReactDOM.render(element, container[, callback])
```

DOM-da göstərilən `container`-ə React elementini render et və komponent [referansı](/docs/more-about-refs.html) qaytar ([state-siz komponentlər](/docs/components-and-props.html#functional-and-class-components) üçün `null` qaytarır).

Əgər `container`-ə əvvəl başqa React elementi render edilmişdirsə bu funksiya olan `container`-i yalnız yeniləyəcək və DOM-u yeni React elementini göstərmək üçün dəyişəcək.

Əgər vacib olmayan callback arqumenti təmin edilibsə, təmin edilən funksiya komponent render edildikdən və ya yeniləndikdən sonra çağrılacak.

> Qeyd:
>
> `ReactDOM.render()` təmin edilən konteynerin daxilini kontrol edir. İlk çağırışda, konteynerin içində olan bütün DOM elementlər silinir. Sonrakı dəyişikliklər isə React-in DOM müqayisə edən alqoritmi ilə səmərəli formada yenilənir.
>
> `ReactDOM.render()` konteyner nodunu dəyişmir (yalnız konteynerin uşaqlarını dəyişir). Mövcud olan uşaqları silmədən yeni komponenti mövcud olan DOM noduna əlavə etmək mümkündür.
>
> Hal hazırda `ReactDOM.render()` ana  `ReactComponent` instansiyasına referansı qaytarır. Amma bu dəyərin istifadəsi köhnəlib və bu dəyərdən istifadə etməyin.
> Çünki React gələcəkdə bəzi hallarda komponentləri asinxron formada render edə bilər. Əgər sizə ana `ReactComponent` instansiyasına referans lazımdırsa, tövsiyyə olunan həll ana elementə
> [callback ref-i](/docs/more-about-refs.html#the-ref-callback-attribute) qoşmaqdır.
>
> `ReactDOM.render()` ilə server-də render edilən komponenti hidrat (hydrate) etmək köhnəlib və React 17-də silinəcək. Bunun yerinə [`hydrate()`-dən](#hydrate) istifadə edin.

* * *

### `hydrate()` {#hydrate}

```javascript
ReactDOM.hydrate(element, container[, callback])
```

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.

React expects that the rendered content is identical between the server and the client. It can patch up differences in text content, but you should treat mismatches as bugs and fix them. In development mode, React warns about mismatches during hydration. There are no guarantees that attribute differences will be patched up in case of mismatches. This is important for performance reasons because in most apps, mismatches are rare, and so validating all markup would be prohibitively expensive.

If a single element's attribute or text content is unavoidably different between the server and the client (for example, a timestamp), you may silence the warning by adding `suppressHydrationWarning={true}` to the element. It only works one level deep, and is intended to be an escape hatch. Don't overuse it. Unless it's text content, React still won't attempt to patch it up, so it may remain inconsistent until future updates.

If you intentionally need to render something different on the server and the client, you can do a two-pass rendering. Components that render something different on the client can read a state variable like `this.state.isClient`, which you can set to `true` in `componentDidMount()`. This way the initial render pass will render the same content as the server, avoiding mismatches, but an additional pass will happen synchronously right after hydration. Note that this approach will make your components slower because they have to render twice, so use it with caution.

Remember to be mindful of user experience on slow connections. The JavaScript code may load significantly later than the initial HTML render, so if you render something different in the client-only pass, the transition can be jarring. However, if executed well, it may be beneficial to render a "shell" of the application on the server, and only show some of the extra widgets on the client. To learn how to do this without getting the markup mismatch issues, refer to the explanation in the previous paragraph.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
ReactDOM.unmountComponentAtNode(container)
```

Mount olunmuş React komponenti DOM-dan silir və bütün aid olan hadisə işləyicilərini və state-i təmizləyir. Əgər konteynerə heç bir komponent mount edilməyibsə bu funksiyanı çağırdıqda heç nə baş vermir. Bu funksiya komponent unmount edildikdə `true`, unmount edilməyə komponent olmadıqda isə `false` qaytarır.

* * *

### `findDOMNode()` {#finddomnode}

> Qeyd:
>
> `findDOMNode` DOM noduna daxil olmaq üçün bir üsuldur. Bu üsulun komponent abstraksiyasını sındırdığına görə bir çox hallarda bu üsuldan istifadə etməyi tövsiyyə etmirik. [`StrictMode`-da bu üsul köhnəlib.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
ReactDOM.findDOMNode(component)
```
Əgər komponent DOM-a mount edilibsə bu funksiya brauzerdə komponentə müvafiq nativ DOM elementini qaytarır. Bu metod anket sahələrinin dəyərlərini oxumaq və DOM ölçmələri aparmaq kimi əməliyyatlar üçün DOM-dan dəyərləri oxumaq üçün faydalıdır. **Bir çox hallarda, siz DOM noduna ref qoşub `findDOMNode`-dan istifadə etməyə bilərsiniz.**

Komponent `null` və ya `false` render etdikdə `findDOMNode` `null` qaytarır. Komponent mətn render etdikdə, `findDOMNode`, dəyəri saxlayan mətn DOM nodu qaytarır. React 16-dan başlayaraq, komponent fraqment ilə bir neçə uşaq qaytara bilər. Bu halda `findDOMNode` ilk boş olmayan uşağın DOM nodunu qaytaracaq.

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

Portal yaradır. Portallar [DOM komponenti iyerarxiyası kənarında olan DOM noduna uşaqları render etmək üçün](/docs/portals.html) yol ilə təmin edir.

---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

Əgər siz React-i `<script>` təqi ilə yükləyirsinizsə, yüksək dərəcəli API-lar 
üçün `ReactDOM` qlobal dəyişənindən istifadə edilə bilərlər. Əgər siz NPM ilə ES6 işlədirsinizsə, siz `import ReactDOM from 'react-dom'` yaza bilərsiniz. Əgər siz NPM ile ES5 işlədirsinizsə, siz `var ReactDOM = require('react-dom')` yaza bilərsiniz.

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

[`render()`](#render)-dən fərqli olaraq bu funksiya [`ReactDOMServer`](/docs/react-dom-server.html) tərəfindən render edilən HTML kontenti olan konteyneri hidrat etmək üçün işlədilir. React mövcud markapa hadisə işləyicilərini qoşmağa çalışacaq.

React render edilən kontentin server və klientdə eyni olmasını umur. Bu, mətnlərdə olan fərqlilikləri düzəldə bilir amma siz bütün uyğunsuzlara baq kimi davranıb düzəltməyə çalışın. Təkminləşmə modunda, React hidrasiya zamanı baş verən bütün uyğunsuzluqlar haqqında xəbərdarlıq edir. Uyğunsuzluqlar zamanı attribut fərqlərinin düzəlməsinə heç bir qarantiya yoxdur. Bunun səbəbi performan ilə bağlıdır. Bir çox applikasiyalarda uyğunsuzluqların nadir olduğundan bütün markapları validasiya etmək çox bahalıdır.

Əgər elementin atributu və ya mətn kontenti server və klientdə qaçılmaz şəkildə fərqlənirsə (məsələn tarix), siz elementə `suppressHydrationWarning={true}` əlavə etməklə xəbərdarlığı söndürə bilərsiniz. Bu yalnız bir dərəcə dərinlikdə işləyir və yalnız çıxış yolu kimi işlətmək üçün nəzərdə tutulub. Bunu çox işlətməyin. Mətn kontenti olmadıqda, React yenədə uyğunsuzları düzəltməyə bilər və bu gələcək yeniliklərə kimi uyğunsuz qala bilər.

Əgər sizə server və klientdə bilərəkdən fərqli render etmək lazımdırsa siz iki-keçidli render etmədən istifadə edə bilərsiniz. Klientdə fərqli render edilməli komponentlər `this.state.isClient` state (`componentDidMount`-da bunu `true` ilə təyin edə bilərsiniz) dəyərini oxuya bilərlər. Bu səbəbdən ilkin render keçidində klient server ilə eyni kontenti render edəcək və uyğunsuzlug olmayacaq. Amma hidrasiyadan sonra sinxron formada ikinci keçid baş verəcək. Qeyd edin ki, bu yanaşmada komponentlər iki dəfə render edildiyindən komponentləriniz yavaş işləyə bilərlər. Bu səbəbdən bu yolu diqqət ilə işlədin.

Yavaş internet sürətlədində istifadəçi təcrübəsindən zehinli olun. Javascript kodu ilkin HTML renderindən çox gec sonra yüklənə bilər. Bu səbəbdən klient keçidində fərqli bir şey render edildikdə, keçid çox xoşagəlməz ola bilər. Amma yaxşı icra edildikdə, applikasiyanın "qabığını" serverdə render etmək faydalı ola bilər. Bunu markap uyğunsuzluqları olmadan edə bilmək üçün, əvvəlki paraqrafda olan izahata baxın.

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

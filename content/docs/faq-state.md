---
id: faq-state
title: Komponent State-i
permalink: docs/faq-state.html
layout: docs
category: FAQ
---

### `setState` nə edir? {#what-does-setstate-do}

Komponentin `state` obyektinin yenilənməsi əməliyyatını planlamaq üçün `setState()` funksiyasında istifadə edilir. Komponent, yeni state dəyişikliklərini yenidən render etmə ilə cavablandırır.

### `state` və `props` arasında fərq nedir? {#what-is-the-difference-between-state-and-props}

[`props`](/docs/components-and-props.html) (ingilicə, "properties" sözünün qısa forması -- parametrlər) və [`state`](/docs/state-and-lifecycle.html) sadə JavaScript obyektləridir. Bu obyektlər render nəticəsinə təsir edən məlumatlardan ibarətdir. `props` obyekti komponentə *göndərilir* (funksiya arqumentləri kimi), `state` isə komponent *daxilində* baş verir (funksiya daxilində olan dəyişənlər kimi).

`props` və `state` haqqında əlavə məlumat üçün aşağıdakı resurslara baxın:

* [Props və ya State](https://github.com/uberVU/react-guide/blob/master/props-vs-state.md)
* [ReactJS: Props və ya State](https://lucybain.com/blog/2016/react-state-vs-pros/)

### `setState` niyə yanlış dəyər qaytarır? {#why-is-setstate-giving-me-the-wrong-value}

React dünyasında `this.props` və `this.state` obyektləri *render olunmuş* (ekranda görününən) dəyərləri təmsil edir.

`setState` çağırışlarının asinxron olduğundan `setState` çağırışından dərhal sonra `this.state` obyekti düzgün dəyər göstərməyəcək. Cari state dəyəri əsasında yeni state dəyərini hesablamaq lazımdırsa, `setState` funksiyasına obyekt əvəzinə yeniləmə funksiyası göndərin.

Aşağıdakı kod istədiyiniz kimi *işləməyəcək*:

```jsx
incrementCount() {
  // Qeyd: bu nəzərdə tutulduğu kimi *işləməyəcək*.
  this.setState({count: this.state.count + 1});
}

handleSomething() {
  // Fərz edək ki, `this.state.count` dəyəri 0 ilə başlayır.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();
  // Komponent yenidən render edildikdə `this.state.count` state dəyəri 3-ə yox, 1-ə bərabər olacaq.

  // Burada `incrementCount()` funksiyası `this.state.count` dəyərini çağırır.
  // React isə komponent yenidən render edilənə kimi `this.state.count` dəyərini yeniləmir.
  // Bu səbəbdən `incrementCount()` funksiyası hər zaman `this.state.count` dəyərini 0 kimi görür və yeni state-ə 1 dəyərini təyin edir.

  // Düzəliş aşağıda göstərilib!
}
```

Bu problemi düzəltmək üçün aşağıdakı bölmələrə baxın.

### Cari state dəyəri əsasında yeni state-i necə yeniləyə bilərəm? {#how-do-i-update-state-with-values-that-depend-on-the-current-state}

`setState` funksiyasına obyekt əvəzinə funksiya göndərərək cari dəyərin hər zaman ən yeni dəyər olduğunu siğortalamaq mümkündür (aşağıda baxın).

### `setState`-ə obyekt və funksiya göndərmək arasında olan fərq nədir? {#what-is-the-difference-between-passing-an-object-or-a-function-in-setstate}

Yeniləmə funksiyası göndərildikdə cari state-in funksiya daxilindən istifadəsi mümkün olur. `setState` çağırışları dəstələndiyindən yeniləmə funksiyaları yenilikləri bir-birinin üzərindən zəncirləyərək konfliktsiz işləməsinə imkan yaradır:

```jsx
incrementCount() {
  this.setState((state) => {
    // Vacıb: yeniləmə zamanı cari state üçün `this.state` əvəzinə `state` obyektindən istifadə edin.
    return {count: state.count + 1}
  });
}

handleSomething() {
  // Fərz edək ki, `this.state.count` dəyəri 0 ilə başlayır.
  this.incrementCount();
  this.incrementCount();
  this.incrementCount();

  // Bu çağırışdan `this.state.count` dəyərini oxuduqda 0 veriləcək.
  // Lakin, React komponenti yenidən render etdikdə, yeni dəyər 3 olacaq.
}
```

[setState haqqında buradan oxuyun](/docs/react-component.html#setstate)

### `setState` nə zaman asinxrondur? {#when-is-setstate-asynchronous}

Hal hazırda, `setState`, hadisə işləyiciləri daxilində asinxron baş verir.

Nümunə: Tıklamaq hadisəsi zamanı `Parent` və `Child` komponentləri `setState` çağırdıqda `Child`-ın iki dəfə render edilməməsi üçün `setState`-in asinxron olması vacibdir. Əvəzinə, React, brauzer hadisəsinin sonunda state yeniliklərini "təmizləyir". Bu, böyük applikasiyalarda böyük performans qazancına səbəb olur.

Bunun tətbiq detalı olduğundan bu qanuna etibar etməyin. Gələcək versiyalarda yeniliklər daha çox ssenarilərdə dəstələnəcək.

### Niyə `this.state` dəyəri sinxron yenilənmir? {#why-doesnt-react-update-thisstate-synchronously}

Əvvəlki bölmədə izah edildiyi kimi, yenideən render etmək əməliyyatı bütün komponentlərin hadisə işləyicilərindən `setState`-lər çağırıldıqdan sonra başlayır. Bu, lazımsız render etmələrin qabağını alaraq performans qazancına səbəb olur.

Lakin, React-in `this.state`-i render etmədən yeniləmədiyi sizi maraqlandıra bilər.

Bunun iki səbəbi var:

* Bu, `props` və `state` arasında olan ardıcıllığı pozaraq debaq etməni çətinləşdirə bilər.
* Bu, bəzi yeni xüsusiyyətlərin tətbiqinin qeyri-mümkün olmasına səbəb ola bilər.

Xüsusi nümunələr üçün [bu GitHub şərhini](https://github.com/facebook/react/issues/11527#issuecomment-360199710) oxuyun.

### Redux və MobX kimi state idarə edən kitabxana istifadə etmək lazımdır? {#should-i-use-a-state-management-library-like-redux-or-mobx}

[Lazım ola bilər.](https://redux.js.org/faq/general#when-should-i-use-redux)

Yeni kitabxanalardan istifadə etmədən öncə React-i yaxşı bilmək daha vacibdir. Yalnız React-dən istifadə edərək mürəkkəb applikasiyalar düzəltmək mümkündür.

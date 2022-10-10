---
id: rendering-elements
title: Elementlərin Render Edilməsi
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

React applikasiyalarının ən kiçik blokları elementlərdir.

Elementlər ekranda nə görmək istədiyinizi təsvir edir:

```js
const element = <h1>Salam Dünya</h1>;
```

Brauzerin DOM elementlərindən fərqli olaraq React elementləri ucuz qiymətə başa gələn sadə JavaScript obyektləridir. Brauzer DOM-unu React elementləri ilə uyğunlaşdırmaq üçün React DOM paketi DOM-u yeniləyir.

>**Qeyd:** 
>
>Elementləri daha çox tanınan "komponentlər" konsepsiyası ilə çaşdırmaq olar. [Gələcək bölmədə](/docs/components-and-props.html) biz komponentlər ilə tanış olacağıq. Komponentlərin elementlərdən düzəldiyindən biz qabağa atlamadan öncə bu bölməni oxumağı tövsiyə edirik.

## Elementləri DOM-a Render Edin {#rendering-an-element-into-the-dom}

Fərz edək ki, HTML faylında `<div>` elementi var:

```html
<div id="root"></div>
```

Biz bu nodu "ana" DOM nodu sayırıq. Çünki bu nodun içərisində baş verən bütün dəyişikliklər React DOM tərəfindən idarə olunacaq.

Adətən, React-də düzəldilmiş applikasiyaların tək ana DOM nodu var. Əgər siz React-i mövcud applikasiyanıza inteqrasiya edirsinizsə, sizdə istədiyiniz qədər ana DOM nodları ola bilər.

<<<<<<< HEAD
React elementini ana DOM noduna render etmək üçün həm elementi həm də ana nodu [`ReactDOM.render()`](/docs/react-dom.html#render) funksiyasına göndərin:
=======
To render a React element, first pass the DOM element to [`ReactDOM.createRoot()`](/docs/react-dom-client.html#createroot), then pass the React element to `root.render()`:
>>>>>>> d07016aea812d26c60252a952bff7ae3e70bde27

`embed:rendering-elements/render-an-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/ZpvBNJ?editors=1010)**

Bu səhifə "Salam Dünya" göstərəcək.

## Render Edilmiş Elementi Yeniləyin {#updating-the-rendered-element}

React elementləri [dəyişilməzdir](https://en.wikipedia.org/wiki/Immutable_object). Element yarandıqdan sonra bu elementin uşaqlarını və ya atributlarını dəyişmək olmaz. Element filmdə bir kadr kimidir: hər hansı bir zamanda UI-ı təsvir edir.

<<<<<<< HEAD
Bizim indiki biliyimiz ilə UI-ı yeniləmək üçün yalnız yeni element yaradıb [`ReactDOM.render()`](/docs/react-dom.html#render) funksiyasına göndərməliyik.
=======
With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `root.render()`.
>>>>>>> d07016aea812d26c60252a952bff7ae3e70bde27

Aşağıda olan saat misalına baxaq:

`embed:rendering-elements/update-rendered-element.js`

**[Try it on CodePen](https://codepen.io/gaearon/pen/gwoJZk?editors=1010)**

<<<<<<< HEAD
Bu kod hər saniyə [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback-indən [`ReactDOM.render()`](/docs/react-dom.html#render) funksiyasını çağırır.
=======
It calls [`root.render()`](/docs/react-dom.html#render) every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.
>>>>>>> d07016aea812d26c60252a952bff7ae3e70bde27

>**Qeyd:**
>
<<<<<<< HEAD
>Praktikada, React applikasiyalarında [`ReactDOM.render()`](/docs/react-dom.html#render) funksiyası yalnız bir dəfə çağrılır. Gələcək bölmələrdə belə kodun [state-li komponetlərə](/docs/state-and-lifecycle.html) necə inkapsulyasiya etdiyini oyrənəcəyik.
=======
>In practice, most React apps only call `root.render()` once. In the next sections we will learn how such code gets encapsulated into [stateful components](/docs/state-and-lifecycle.html).
>>>>>>> d07016aea812d26c60252a952bff7ae3e70bde27
>
>Biz mövzuları ötürməyi tövsiyə etmirik. Çünki bu mövzular bir-birilərindən asılıdırlar.

## React Yalnız Lazım Olanları Yeniləyir {#react-only-updates-whats-necessary}

React DOM, DOM-u istənilən vəziyyətə gətirmək üçün elementləri və uşaqları keçmiş versiyaları ilə müqayisə edərək yalnız lazımi DOM yeniliklərini tətbiq edir.

<<<<<<< HEAD
Siz bunu təsqid etmək üçün [sonuncu misalımızı](codepen://rendering-elements/update-rendered-element) brauzer alətləri ilə yoxlaya bilərsiniz:
=======
You can verify by inspecting the [last example](https://codepen.io/gaearon/pen/gwoJZk?editors=1010) with the browser tools:
>>>>>>> d07016aea812d26c60252a952bff7ae3e70bde27

![DOM yoxlayanının yenilikləri göstərməsi](../images/docs/granular-dom-updates.gif)

Bizim hər anda bütün UI ağacını təsvir edən elementi yaratmağımıza baxmayaraq React DOM yalnız dəyişiklik baş verən mətn nodlarını yeniləyir.

Bizim təcrübəmiz göstərir ki, UI-ı zaman ilə necə dəyişmək əvəzinə hər hansı bir anda necə görünəcəyi haqqda fikirləşmək bir çox baqların qarşısını alır.

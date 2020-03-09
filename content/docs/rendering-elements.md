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
React elementini DOM noduna render etmək üçün, həm elementi həm də ana nodu `ReactDOM.render()` funksiyasına göndərin:
=======
To render a React element into a root DOM node, pass both to [`ReactDOM.render()`](/docs/react-dom.html#render):
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9

`embed:rendering-elements/render-an-element.js`

[](codepen://rendering-elements/render-an-element)

Bu səhifə "Salam Dünya" göstərəcək.

## Render Edilmiş Elementi Yeniləyin {#updating-the-rendered-element}

React elementləri [dəyişilməzdir](https://en.wikipedia.org/wiki/Immutable_object). Element yarandıqdan sonra bu elementin uşaqlarını və ya atributlarını dəyişmək olmaz. Element filmdə bir kadr kimidir: hər hansı bir zamanda UI-ı təsvir edir.

<<<<<<< HEAD
Bizim indiki biliyimiz ilə UI-ı yeniləmək üçün yalnız yeni element yaradıb `ReactDOM.render()`-ə göndərməliyik.
=======
With our knowledge so far, the only way to update the UI is to create a new element, and pass it to [`ReactDOM.render()`](/docs/react-dom.html#render).
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9

Aşağıda olan saat misalına baxaq:

`embed:rendering-elements/update-rendered-element.js`

[](codepen://rendering-elements/update-rendered-element)

<<<<<<< HEAD
Bu kod hər saniyə [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)-ın callback-indən `ReactDOM.render()` funksiyasını çağırır.
=======
It calls [`ReactDOM.render()`](/docs/react-dom.html#render) every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9

>**Qeyd:**
>
<<<<<<< HEAD
>Praktikada, React applikasiyaları `ReactDOM.render()` funksiyasını yalnız bir dəfə çağırırlar. Gələcək bölmələrdə belə kodun [state-li komponetlərə](/docs/state-and-lifecycle.html) necə inkapsulyasiya etdiyini oyrənəcəyik.
=======
>In practice, most React apps only call [`ReactDOM.render()`](/docs/react-dom.html#render) once. In the next sections we will learn how such code gets encapsulated into [stateful components](/docs/state-and-lifecycle.html).
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9
>
>Biz mövzuları ötürməyi tövsiyə etmirik. Çünki bu mövzular bir-birilərindən asılıdırlar.

## React Yalnız Lazım Olanları Yeniləyir {#react-only-updates-whats-necessary}

React DOM, DOM-u istənilən vəziyyətə gətirmək üçün elementləri və uşaqları keçmiş versiyaları ilə müqayisə edərək yalnız lazımi DOM yeniliklərini tətbiq edir.

Siz bunu təsqid etmək üçün [sonuncu misalımızı](codepen://rendering-elements/update-rendered-element) brauzer alətləri ilə yoxlaya bilərsiniz:

![DOM yoxlayanının yenilikləri göstərməsi](../images/docs/granular-dom-updates.gif)

Bizim hər anda bütün UI ağacını təsvir edən elementi yaratmağımıza baxmayaraq React DOM yalnız dəyişiklik baş verən mətn nodlarını yeniləyir.

<<<<<<< HEAD
UI-ı zaman ilə necə dəyişmək əvəzinə hər hansı bir anda necə görünəcəyi haqqda fikirləşmək bir çox baqların qarşısını alır.
=======
In our experience, thinking about how the UI should look at any given moment, rather than how to change it over time, eliminates a whole class of bugs.
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9

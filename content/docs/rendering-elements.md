---
id: rendering-elements
title: Elementlərin Render Edilməsi
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

React applikasiyalarının ən kiçik blokları elemenlərdir.

Elementlər ekranda nə görmək istədiyinizi təsvir edir:

```js
const element = <h1>Salam Dünya</h1>;
```

Brauzerin DOM elementlərindən fəqrli olaraq React elementləri ucuz qiymətə düzəldilə bilən sadə obyektlərdir. Brauzer DOM-u React elementləri ilə uyğunlaşdırmaq üçün React DOM paketi DOM-u yeniləyir.

>**Qeyd:**
>
>Elementləri daha çox tanınan "komponentlər" konsepsiyası ilə çaşdırmaq olar. [Gələcək bölmədə](/docs/components-and-props.html) biz komponentlər haqqında tanış olacağıq. Komponentlər elementlərdən düzəldiyindən, biz qabağa atlamadan öncə bu bölməni oxumağı tövsiyyə edirik.

## Elementləri DOM-a Render Edin {#rendering-an-element-into-the-dom}

Fərz edək ki, HTML faylında `<div>` elementi var:

```html
<div id="root"></div>
```

Biz bu nodu "ana" DOM nodu sayırıq. Çünki bu nodun içərisində baş verən bütün dəyişikliklən React DOM tərəfindən idarə olunacaq.

Adətən, React-də düzəldilmiş applikasiyaların tək ana DOM nodu var. Əgər siz React-i mövcud applikasiyanıza inteqrasiya edirsinizsə, sizdə istədiyiniz qədər ana DOM nodları ola bilər.

React elementinin DOM noduna render etmək üçün, həm elementi həm də ana nodu `ReactDOM.render()` funksiyasına göndərin:

`embed:rendering-elements/render-an-element.js`

[](codepen://rendering-elements/render-an-element)

Bu səhifədə "Salam Dünya" göstərəcək.

## Render Edilmiş Elementi Yeniləyin {#updating-the-rendered-element}

React elementləri [dəyişilməzdir](https://en.wikipedia.org/wiki/Immutable_object). Elementi yarandıqdan sonra, siz bu elementin uşaqlarını və ya atributlarını dəyişə bilməzsiniz. Element filmdə bir kadr kimidir: element hər hansı bir zamanda UI-ı təsvir edir.

Bizim indiki biliyimiz ilə, UI-ı yeniləmək üçün yalnız yeni element yaradıb `ReactDOM.render()`-ə göndərməliyik.

Aşağıda olan saat misalına baxaq:

`embed:rendering-elements/update-rendered-element.js`

[](codepen://rendering-elements/update-rendered-element)

Bu kod hər saniyə [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)-ın callback-indən `ReactDOM.render()` funksiyasını çağırır.

>**Qeyd:**
>
>Praktikada, React applikasiyaları `ReactDOM.render()` funksiyasını yalnız bir dəfə çağırırlar. Gələcək bölmələrdə belə kodun [state-li komponetlərə](/docs/state-and-lifecycle.html) necə inkapsulyasiya etdiyini oyrənəcəyik.
>
>Biz mövzuları ötürməyi tövsiyyə etmirik. Çünki bu mövzular bir-biriləri üzərində qurulurlar.

## React Yalnız Lazım Olanları Yeniləyir {#react-only-updates-whats-necessary}

React DOM, DOM-u istənilən vəziyyətə gətirmək üçün elementləri və uşaqları keçmiş versiyaları ilə müqayisə edərək yalnız lazımi DOM yeniliklərini tətbiq edir.

Siz bunu təsqid etmək üçün [sonuncu misalımızı](codepen://rendering-elements/update-rendered-element) brauzer alətləri ilə yoxlaya bilərsiniz:

![DOM yoxlayanının yenilikləri göstərməsi](../images/docs/granular-dom-updates.gif)

Biz, hər anda bütün UI ağacını təsvir edən elementi yaratmağımıza baxmayaraq React DOM yalnız dəyişiklik baş verən mətn nodlarını yeniləyir.

UI-ı zaman ilə necə dəyişmək əvəzinə hər hansı bir anda necə görünəcəyi haqqda fikirləşmək bir çox baqların qarşısını alır.

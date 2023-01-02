---
id: handling-events
title: Hadisələrin Emal Edilməsi
permalink: docs/handling-events.html
prev: state-and-lifecycle.html
next: conditional-rendering.html
redirect_from:
  - "docs/events-ko-KR.html"
---

React elementlərində hadisələrin emal edilməsi DOM elementlərindəkinə bənzəyir. Amma bəzi sintaktik fərqlər var:

* React hadisələrinə lowercase yox camelCase istifadə edilərək ad verilir.
* JSX ilə string yerinə funksiya hadisə işlədicisi kimi ötürülür.

Misal üçün aşağıdakı HTML:

```html
<button onclick="activateLasers()">
  Lazerləri aktivləşdir
</button>
```

React-dəkindən bir az fərqlidir:

```js{1}
<button onClick={activateLasers}>
  Lazerləri aktivləşdir
</button>
```

<<<<<<< HEAD
Başqa bir fərq ondan ibarətdir ki, React-də `false` qaytarmaqla default davranışın qarşısını almaq olmur. Bunu etmək üçün `preventDefault` açıq şəkildə çağırılmalıdır. Məsələn, sadə HTML ilə linkin ilkin davranışını (yeni səhifə açmaq) ləğv etmək üçün belə yaza bilərsiniz:

```html
<a href="#" onclick="console.log('Linkə tıklandı.'); return false">
  Mənə tıkla
</a>
=======
Another difference is that you cannot return `false` to prevent default behavior in React. You must call `preventDefault` explicitly. For example, with plain HTML, to prevent the default form behavior of submitting, you can write:

```html
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
>>>>>>> e77ba1e90338ff18f965c9b94c733b034b3ac18f
```

React-də bunu belə yazmaq olar:

```js{3}
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD
    console.log('Linkə tıklandı.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Mənə tıkla
    </a>
=======
    console.log('You clicked submit.');
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
>>>>>>> e77ba1e90338ff18f965c9b94c733b034b3ac18f
  );
}
```

Burada `e` sintetik hadisədir. React sintetik hadisələri [W3C spesifikasiyasına](https://www.w3.org/TR/DOM-Level-3-Events/) uyğun olaraq təyin edir. Bu deməkdir ki, brauzerlər arası uyğunsuzluqlardan narahat olmaq lazım deyil. React hadisələri nativ hadisələr kimi eyni işləmirlər. Ətraflı məlumat üçün [`SyntheticEvent`](/docs/events.html) təlimatına nəzər yetirin.

React istifadə edərkən DOM elementi yarandıqdan sonra işləyici əlavə etmək üçün `addEventListener` çağırmağa ehtiyac yoxdur. Əvəzinə, işləyicini element ilk dəfə render olunduqda təmin edin.

Komponent [ES6 sinfi](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) kimi təyin olunduqda hadisə işləyicisi sinfin metodlarından biri ola bilər. Məsələn, aşağıdakı `Toggle` komponenti istifadəçiyə "ON" və "OFF" halları arasında dəyişməyə imkan verən düyməyə render olunur:

```js{6,7,10-14,18}
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // Bu binding `this`-in callback-də işləməsi üçün önəmlidir
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```

[**CodePen-də bax**](https://codepen.io/gaearon/pen/xEmzGg?editors=0010)

JSX callback-lərində `this` ilə işləyərkən ehtiyatlı olmaq lazımdır. JavaScript-də sinif metodları ilkin olaraq kontekstə [bağlanmayıb (bind)](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind). Əgər `this.handleClick`-i bağlamasaq və onu `onClick`-ə ötürməyi unutsaq, funksiya çağırıldıqda `this` `undefined` olacaq.

Bu spesifik olaraq React-ə aid davranış deyil, [JavaScript-də funksiyalar ümumiyyətlə belə işləyir](https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/). Metodu sonunda mötərizəsiz istifadə etməklə də bağlamaq olar. Məsələn: `onClick={this.handleClick}`.

<<<<<<< HEAD
Əgər `bind` xoşunuza gəlmirsə, iki alternativ yolunuz var. Birincisi sınaq vəziyyətində olan [public sinif sahələri sintaksisi](https://babeljs.io/docs/plugins/transform-class-properties/) istifadə etməkdir. Bu sahələri callback-ləri düzgün bağlamaq üçün istifadə etmək olar:

```js{2-6}
class LoggingButton extends React.Component {
  // Bu sintaksis `this`-in handleClick-ə bind olunduğuna zəmanət verir.
  // Diqqət: bu *experimental* sintaksisdir.
=======
If calling `bind` annoys you, there are two ways you can get around this. You can use [public class fields syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) to correctly bind callbacks:

```js{2-6}
class LoggingButton extends React.Component {
  // This syntax ensures `this` is bound within handleClick.
>>>>>>> e77ba1e90338ff18f965c9b94c733b034b3ac18f
  handleClick = () => {
    console.log('this is:', this);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Mənə tıkla
      </button>
    );
  }
}
```

Bu sintaksis [Create React App-da](https://github.com/facebookincubator/create-react-app) ilkin olaraq qoşulub.

Əgər sahə sintaksisi istifadə etmirsinizsə, onda callback-də [arrow funksiyaları](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) istifadə edə bilərsiniz:

```js{7-9}
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // Bu sintaksis `this`-in handleClick-ə bind olunduğuna zəmanət verir
    return (
      <button onClick={() => this.handleClick()}>
        Tıkla
      </button>
    );
  }
}
```

Bu sintaksisin çatışmazlığı ondan ibarətdir ki, hər dəfə `LoggingButton` render olanda yeni callback yaradılır. Əksər hallarda bu problem deyil. Lakin əgər bu callback prop kimi uşaq komponentlərə ötürülürsə, onda həmin komponentlər əlavə render işi görə bilər. Belə performans problemlərini aradan qaldırmaq üçün konstruktorda bağlamaq və ya sinif sahələri sintaksisindən istifadə etmək məsləhət görülür.

## Arqumentlərin hadisə işləyicilərinə ötürülməsi {#passing-arguments-to-event-handlers}

Tsıklın daxilindən hadisə işləyicisinə əlavə parametr ötürmək lazım ola bilər. Məsələn, əgər `id` sıra ID-sidirsə aşağıdakı variantlardan birini istifadə etmək olar:

```js
<button onClick={(e) => this.deleteRow(id, e)}>Sıranı sil</button>
<button onClick={this.deleteRow.bind(this, id)}>Sıranı sil</button>
```

Bu iki sətir eyni işi görür, və müvafiq olaraq [arrow funksiyaları](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) və [`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind) istifadə edir.

Hər iki halda, React hadisəsini təmsil edən `e` arqumenti, ID-dən sonra ikinci parametr kimi ötürüləcək. Arrow funksiyaları istifadə etdikdə bu arqument açıq şəkildə ötürülür, lakin `bind` ilə bu avtomatik baş verir.

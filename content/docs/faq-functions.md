---
id: faq-functions
title: Funksiyaların Komponentlərə Göndərilməsi
permalink: docs/faq-functions.html
layout: docs
category: FAQ
---

### Komponentə onClick kimi hadisə işləyicisini necə göndərə bilərəm? {#how-do-i-pass-an-event-handler-like-onclick-to-a-component}

Hadisə işləyicilərini və digər funksiyaları uşaq komponentlərə proplar kimi göndərin:

```jsx
<button onClick={this.handleClick}>
```

Hadisə işləyicisində valideyn komponentdən istifadə etmək istədikdə, funksiyanı komponent instansiyasına bind etmək lazımdır (aşağı bölməyə baxın).

### Funksiyanı komponent instansiyasına necə bind edə bilərəm? {#how-do-i-bind-a-function-to-a-component-instance}

Qurulma addımından və sintaksisdən asılı olaraq funksiyaların `this.props` və `this.state` kimi atributları istifadə etməsi üçün bir neçə yolu var.

#### Konstruktorda Bind etmək (ES2015) {#bind-in-constructor-es2015}

```jsx
class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log('Tıklama Hadisəsi Baş Verdi');
  }
  render() {
    return <button onClick={this.handleClick}>Tıkla</button>;
  }
}
```

<<<<<<< HEAD
#### Sinif Parametrləri (3-cü Mərhələ Təklifi) {#class-properties-stage-3-proposal}

```jsx
class Foo extends Component {
  // Qeyd: bu sintaksis experimentaldır və hələ standartlaşmayıb.
  handleClick = () => {
    console.log('Tıklama Hadisəsi Baş Verdi');
  }
=======
#### Class Properties (ES2022) {#class-properties-es2022}

```jsx
class Foo extends Component {
  handleClick = () => {
    console.log('Click happened');
  };
>>>>>>> 664dd5736287e01a4557cd03c9a8736682911b34
  render() {
    return <button onClick={this.handleClick}>Tıkla</button>;
  }
}
```

#### Render-də Bind etmək {#bind-in-render}

```jsx
class Foo extends Component {
  handleClick() {
    console.log('Tıklama hadisəsi baş verdi');
  }
  render() {
    return <button onClick={this.handleClick.bind(this)}>Tıkla</button>;
  }
}
```

>**Qeyd:**
>
>`Function.prototype.bind` funksiyanı render-də çağırdıqda komponentin hər render edilməsi zamanı yeni funksiya yaranacaq. Bunun performansa təsiri ola bilər (aşağıdakı bölmələrə baxın).

#### Render-də Ox Funksiyası {#arrow-function-in-render}

```jsx
class Foo extends Component {
  handleClick() {
    console.log('Tıklama Hadisəsi Baş Verdi');
  }
  render() {
    return <button onClick={() => this.handleClick()}>Tıkla</button>;
  }
}
```

>**Qeyd:**
>
>Render-dən ox funksiyası işlədildikdə komponentin hər render edilməsi zamanı yeni funksiya yaranacaq. Bu, identiklik müqayisələrə dayalı optimallaşdırılmaları sındıra bilər.

### Render funksiyalarında ox funksiyalarını işlətmək olar? {#is-it-ok-to-use-arrow-functions-in-render-methods}

Normalda, olar. Bu, callback funksiyalarına arqumentlər göndərməyin ən asan yoludur.

Performans problemləri olduqda optimallaşdırma edin!

### Bind etmə niyə vacibdir? {#why-is-binding-necessary-at-all}

JavaScript-də aşağıdakı iki kod parçası bərabər **deyil**:

```js
obj.method();
```

```js
var method = obj.method;
method();
```

İkinci kod parçası ilə birinci kod parçasının eyni işləməsi üçün bind etmə lazımdır.

React-də, adətən digər komponentlərə *göndərilən* funksiyaları bind etmək lazımdır. Məsələn, `<button onClick={this.handleClick}>` kodu `this.handleClick` funksiyasını göndərdiyinə görə bu funksiyanı bind etmək lazımdır. Lakin, `render` və ya lifecycle funksiyalarını bind etmək lazım deyil. Biz bu funksiyaları digər komponentlərə göndərmirik.

[Yehuda Katzın bu məqaləsində](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) bind etmənin nə olduğu və JavaScript-də funksiyaların necə işlədiyi haqda izahatlar var.

### Niyə funksiyam komponent hər render edildiyi zaman çağrılır? {#why-is-my-function-being-called-every-time-the-component-renders}

Funksiyanı komponentə göndərdikdə _bu funksiyanı çağırmadığınızdan_ əmin olun:

```jsx
render() {
  // Yanlışdır: handleClick funksiyası referans kimi göndərilmək əvəzinə çağrılır!
  return <button onClick={this.handleClick()}>Tıkla</button>
}
```

Bunun əvəzinə, *funksiyanın özünü göndərin* (mötərizəsiz):

```jsx
render() {
  // Düzdür: handleClick funksiyası referans kimi göndərilir!
  return <button onClick={this.handleClick}>Tıkla</button>
}
```

### Callback və Hadisə işləyicilərinə arqumentləri necə göndərə bilərəm? {#how-do-i-pass-a-parameter-to-an-event-handler-or-callback}

Ox funksiyası ilə hadisə işləyicisini əhatə edərək arqumentləri göndərmək mümkündür:

```jsx
<button onClick={() => this.handleClick(id)} />
```

Bu, `.bind` funksiyasının çağrılmasına bərabərdir:

```jsx
<button onClick={this.handleClick.bind(this, id)} />
```

#### Nümunə: Arqumentləri ox funksiyaları ilə göndərmək {#example-passing-params-using-arrow-functions}

```jsx
const A = 65 // ASCII hərf kodu

class Alphabet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justClicked: null,
      letters: Array.from({length: 26}, (_, i) => String.fromCharCode(A + i))
    };
  }
  handleClick(letter) {
    this.setState({ justClicked: letter });
  }
  render() {
    return (
      <div>
        Tıklandı: {this.state.justClicked}
        <ul>
          {this.state.letters.map(letter =>
            <li key={letter} onClick={() => this.handleClick(letter)}>
              {letter}
            </li>
          )}
        </ul>
      </div>
    )
  }
}
```

#### Nümunə: Arqumentləri data-atributları ilə göndərmək {#example-passing-params-using-data-attributes}

Alternativ olaraq, DOM API-ları istifadə edərək hadisə işləyiciləri üçün lazım olan məlumatları saxlaya bilərsiniz. Böyük sayda elementləri optimallaşdırmaq və ya React.PureComponent yoxlamalarından asılı olan render ağacından istifadə etmək istəyirsinizsə, bu yanaşmanı nəzərə alın.

```jsx
const A = 65 // ASCII hərf kodu

class Alphabet extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      justClicked: null,
      letters: Array.from({length: 26}, (_, i) => String.fromCharCode(A + i))
    };
  }

  handleClick(e) {
    this.setState({
      justClicked: e.target.dataset.letter
    });
  }

  render() {
    return (
      <div>
        Tıklandı: {this.state.justClicked}
        <ul>
          {this.state.letters.map(letter =>
            <li key={letter} data-letter={letter} onClick={this.handleClick}>
              {letter}
            </li>
          )}
        </ul>
      </div>
    )
  }
}
```

### Funksiyanın çox tez və ya eyni zamanda bir neçə dəfə çağrılmasının qarşısını necə ala bilərəm? {#how-can-i-prevent-a-function-from-being-called-too-quickly-or-too-many-times-in-a-row}

Əgər `onClick` və ya `onScroll` kimi hadisə işləyicilərindən istifadə edir və bu callback-lərin tez çağrılmasının qarşısını almaq istəyirsinizsə, callback-in çağrılma sıxlığını aşağıdakı yollar ilə məhdudlaşdıra bilərsiniz:

- **throttle etmə**: yenilikləri vaxt tezliyinə görə seçmə (məsələn, [`_.throttle`](https://lodash.com/docs#throttle))
- **debounce etmə**: bir müddət fəaliyyətsizlik sonra yenilikləri əməl etmə (məsələn, [`_.debounce`](https://lodash.com/docs#debounce))
- **`requestAnimationFrame` ilə throttle etmə**: yenilikləri [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) əsasında seçmə (məsələn, [`raf-schd`](https://github.com/alexreardon/raf-schd))

`throttle` və `debounce` funksiyaslarının müqayisəsi üçün [bu görüntüyə baxın](http://demo.nimius.net/debounce_throttle/).

> Qeyd:
>
> `_.debounce`, `_.throttle` və `raf-schd` funksiyaları gecikən callback-ləri ləğv etmək üçün `cancel` funksiyası təmin edirlər. Siz bu funksiyanı `componentWillUnmount`-dan çağırmalı _və ya_ gecikən funksiyanın daxilində komponentin mount olunduğunu yoxlamalısınız.

#### Throttle {#throttle}

Throttle etmə, verilən vaxt çərçivəsində funksiyanın birdən çox çağrılmasının qarşısını alır. Aşağıdakı nümunədə "click" işləyicisinin bir saniyə ərzində birdən çox çağrılmasının qarşısı alınır.

```jsx
import throttle from 'lodash.throttle';

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickThrottled = throttle(this.handleClick, 1000);
  }

  componentWillUnmount() {
    this.handleClickThrottled.cancel();
  }

  render() {
    return <button onClick={this.handleClickThrottled}>Əlavə yüklə</button>;
  }

  handleClick() {
    this.props.loadMore();
  }
}
```

#### Debounce {#debounce}

Debounce ilə funksiyanın son çağırışından bir qədər vaxt keçmədən çağrılmasının qarşısı alınır. Bu metod, tez-tez göndərilən hadisənin (məsələn, skrol və ya klaviatur hadisələri) cavabı nəticəsində bahalı hesablama apardıqda faydalıdır. Aşağıdakı nümunədə anket sakəsi 250ms gecikmə ilə yazılır.

```jsx
import debounce from 'lodash.debounce';

class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 250);
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange}
        placeholder="Axtar..."
        defaultValue={this.props.value}
      />
    );
  }

  handleChange(e) {
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}
```

#### `requestAnimationFrame` ilə throttle etmə {#requestanimationframe-throttling}

[`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) funksiyası, göndərilən funksiyanı brauzerdə növbəyə salaraq render performansını artırmaq üçün bu funksiyanı optimal zamanda çağırır. `requestAnimationFrame` ilə növbələnən funksiya sonrakı kadrda çağrılacaq. Brauzer saniyəyə 60 kadrın olmasını (60 fps) təmin etmək üçün çox çalışacaq. Lakin, 60 fps təmin edilə bilmədikdə natural olaraq bir saniyəyə düşən kadrların sayı *məhdudlaşdırılacaq*. Məsələn, aparat yalnız 30 fps qəbul edə bilirsə, brauzer saniyəyə 30 kadr göstərəcək. Saniyəyə 60-dan çox yenilik etmənin qabağını almaq üçün `requestAnimationFrame` funksiyasını throttle etmək üçün istifadə etmək faydalıdır. Onsuzda, 100-dən çox yenilik edildikdə brauzerin icra edəcəyi işi istifadəçi görməyəcək.

>**Qeyd:**
>
>Bu texnika ilə bir kadrda dərc olunan ən sonuncu dəyər işlədiləcək. Bu optimizasiyanın işləməsini görmək üçün [`MDN-də`](https://developer.mozilla.org/en-US/docs/Web/Events/scroll) olan nümunəyə baxın.

```jsx
import rafSchedule from 'raf-schd';

class ScrollListener extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);

    // Yenilikləri planlaşdırmaq üçün yeni funksiya yaradın.
    this.scheduleUpdate = rafSchedule(
      point => this.props.onScroll(point)
    );
  }

  handleScroll(e) {
    // Skrol hadisəsi gəldikdə yeniliyi planlaşdırın.
    // Bir kadr zamanı çoxlu yenilik baş verdikdə yalnız sonuncu dəyər dərc olunacaq.
    this.scheduleUpdate({ x: e.clientX, y: e.clientY });
  }

  componentWillUnmount() {
    // Unmount edildiyi zaman bütün gələcək yenilikləri ləğv edin.
    this.scheduleUpdate.cancel();
  }

  render() {
    return (
      <div
        style={{ overflow: 'scroll' }}
        onScroll={this.handleScroll}
      >
        <img src="/my-huge-image.jpg" />
      </div>
    );
  }
}
```

#### Sürətin məhdudlaşdırılmasını test edin {#testing-your-rate-limiting}

Sürəti məhdudlaşan kodu test etdikdə vaxtı qabağa çəkmək qabiliyyətinin olması faydalı ola bilər. [`Jest`](https://facebook.github.io/jest/) işlədirsinizsə, vaxtı qabağa çəkmək üçün [`taymer moklarından`](https://facebook.github.io/jest/docs/en/timer-mocks.html) istifadə edə bilərsiniz. `requestAnimationFrame` throttle etməsindən istifadə etdikdə animasiya kadrlarını idarə etmək üçün [`raf-stub`](https://github.com/alexreardon/raf-stub) alətini faydalı ola bilər.

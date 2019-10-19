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

Hadisə işləyicisini valideyn komponentdən istifadə etdikdə funksiyanı komponent instansiyasına bind etmək lazımdır (aşağı bölməyə baxın).

### Funksiyanı komponent instansiyasına necə bind etmək olar? {#how-do-i-bind-a-function-to-a-component-instance}

Funksiyalardan `this.props` və `this.state` kimi atributların istifadəsinin qurulma addımından və sintaksisdən asılı olaraq bir neçə yolu var.

#### Konstruktorda Bind Etmək (ES2015) {#bind-in-constructor-es2015}

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

#### Klas Parametrləri (3-cü Mərhələ Təklifi) {#class-properties-stage-3-proposal}

```jsx
class Foo extends Component {
  // Qeyd: bu sintaksis experimentaldır və hələ standartlaşmayıb.
  handleClick = () => {
    console.log('Tıklama Hadisəsi Baş Verdi');
  }
  render() {
    return <button onClick={this.handleClick}>Tıkla</button>;
  }
}
```

#### Render-dən Bind Etmək {#bind-in-render}

```jsx
class Foo extends Component {
  handleClick() {
    console.log('Tıklama Hadisəsi Baş Verdi');
  }
  render() {
    return <button onClick={this.handleClick.bind(this)}>Tıkla</button>;
  }
}
```

>**Qeyd:**
>
>`Function.prototype.bind` funksiyanı render-dən çağrıldıqda komponentin hər render edilməsi zamanı yeni funksiya yaranacaq. Bunun performansa təsiri ola bilər (aşağıdakı bölmələrə baxın).

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
>Render-dən ox funksiyası işlədildikdə komponentin hər render edilməsi zamanı yeni funksiya yaranacaq. Bu, identiklik müqayisələrinin optimallaşdırılmasını sındıra bilər.

### Render funksiyalarında ox funksiyalarını işlətmək olar? {#is-it-ok-to-use-arrow-functions-in-render-methods}

Normalda, olar. Bu, callback funksiyalarına arqumentlər göndərməyin ən asan yoludur.

Performans problemləri olduqda optimizasiya edin!

### Binding Niyə Vacibdir? {#why-is-binding-necessary-at-all}

JavaScript-də bu iki kod bərabər **deyil**:

```js
obj.method();
```

```js
var method = obj.method;
method();
```

İkinci kod ilə birinci kodun eyni işləməsi üçün binding lazımdır.

React-də, adətən digər komponentlərə *göndərilən* funksiyaları bind etmək lazımdır. Məsələn, `<button onClick={this.handleClick}>` kodu `this.handleClick` funksiyasını göndərdiyindən bu funksiyanı bind edin. Lakin, `render` və ya lifecycle funksiyalarını bind etmək lazım deyil. Biz bu funksiyaları digər komponentlərə göndərmirik.

[Yehuda Katzın bu məqaləsində](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) binding-in nə olduğu və JavaScript-də funksiyaların necə işlədiyini haqqında izahatlar var.

### Niyə funksiya, komponent render edildiyi zamanı çağrılır? {#why-is-my-function-being-called-every-time-the-component-renders}

Funksiyanı komponentə göndərdikdə _bu funksiyanı çağırmayın_:

```jsx
render() {
  // Yanlışdır: handleClick funksiyası referans kimi göndərilmək əvəzinə çağrılır!
  return <button onClick={this.handleClick()}>Tıkla</button>
}
```

Əvəzinə, *funksiyanın özünü göndərin* (mötərizəsiz):

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

#### Nümunə: Arqumentlərin ox funksiyalarına göndərilməsi {#example-passing-params-using-arrow-functions}

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

#### Nümunə: Arqumentlərin data-atributlarına göndərilməsi {#example-passing-params-using-data-attributes}

Alternativ olaraq, DOM API-ından istifadə edərək hadisə işləyiciləri üçün lazım olan məlumatları saxlaya bilərsiniz. Böyük sayda elementləri optimallaşdırmaq və ya React.PureComponent yoxlamalarından asılı olan render ağacından istifadə etmək istəyirsinizsə, bu yanaşmadan istifadə edin.

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

### Funksiyanın tez-tez və ya eyni zamanda bir neçə dəfə çağrılmasının qarşısını necə ala bilərəm? {#how-can-i-prevent-a-function-from-being-called-too-quickly-or-too-many-times-in-a-row}

Əgər `onClick` və ya `onScroll` kimi hadisə işləyicilərindən istifadə edir və bu callback-lərin tez çağrılmasının qarşısını almaq istəyirsinizsə, callback-in çağrılmasının sürətini aşağıdakl yollar ilə məhdudlaşdıra bilərsiniz:

- **boğmaq (throttle)**: yeniliklərin vaxt tezliyinə görə seçin (məsələn, [`_.throttle`](https://lodash.com/docs#throttle))
- **debounce edin**: hərəkətsizlik olduqdan sonra yenilikləri dərc edin (məsələn, [`_.debounce`](https://lodash.com/docs#debounce))
- **`requestAnimationFrame` ilə boğmaq**: yenilikləri [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) əsasında seçin (məsələn, [`raf-schd`](https://github.com/alexreardon/raf-schd))

`throttle` və `debounce` funksiyaslarının müqayisəsi üçün [bu görüntüyə baxın](http://demo.nimius.net/debounce_throttle/).

> Qeyd:
>
> `_.debounce`, `_.throttle` və `raf-schd` funksiyaları gecikən callback-ləri ləğv etmək üçün `cancel` funksiyası təmin edirlər. Siz bu funksiyanı `componentWillUnmount`-dan çağırmalı _və ya_ gecikən funksiyanın daxilindən komponentin mount olunduğunu yoxlamalısınız.

#### Boğma {#throttle}

Boğma, verilən vaxt çərçivəsində funksiyanın birdən çox çağrılmasının qarşısını alır. Aşağıdakı nümunədə "click" işləyicisinin bir saniyə ərzində birdən çox çağrılmasının qarşısı alınır.

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
    // React hadisələri pool etdiyindən biz dəyəri debounce-dan əvvəl oxuyuruq.
    // Alternativ olaraq, `event.persist()` funksiyasını çağıraraq bütün hadisəni göndərmək mümkündür.
    // Əlavə məlumat üçün az.reactjs.org/docs/events.html#event-pooling səhifəsinə baxın.
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}
```

#### `requestAnimationFrame` ilə boğmaq {#requestanimationframe-throttling}

[`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) funksiyası, göndərilən funksiyanı brauzerdə növbəyə salaraq render performansını artırmaq üçün bu funksiyanı optimal zamanda çağırır. `requestAnimationFrame` ilə növbələnən funksiya sonrakı kadrda çağrılacaq. Brauzer saniyəyə 60 kadrın olmasını (60 fps) təmin etmək üçün çox çalışacaq. Lakin, 60 fps təmin edilə bilmədikdə natural olaraq bir saniyəyə düşən kadrların sayı *məhdudlaşdırılacaq*. Məsələn, aparat yalnız 30 fps qəbul edə bilirsə, brauzer saniyəyə 30 kadr göstərəcək. Saniyəyə 60-dan çox yenilik etmənin qabağını almaq üçün `requestAnimationFrame` funksiyasını boğma üçün istifadə etmək faydalıdır. Onsuzda, 100-dən çox yenilik edildikdə brauzerin icra edəcəyi işi istifadəçi görməyəcək.

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

Sürəti məhdudlaşan kodu test etdikdə vaxtı qabağa çəkmək qabiliyyətinin olması faydalı ola bilər. [`Jest`](https://facebook.github.io/jest/) işlədirsinizsə, vaxtı qabağa çəkmək üçün [`taymer moklarından`](https://facebook.github.io/jest/docs/en/timer-mocks.html) istifadə edə bilərsiniz. `requestAnimationFrame` boğmasından istifadə etdikdə animasiya kadrlarını idarə etmək üçün [`raf-stub`](https://github.com/alexreardon/raf-stub) alətini faydalı tapa bilərsiniz.

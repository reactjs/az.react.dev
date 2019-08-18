---
id: lifting-state-up
title: State-in Qaldırılması
permalink: docs/lifting-state-up.html
prev: forms.html
next: composition-vs-inheritance.html
redirect_from:
  - "docs/flux-overview.html"
  - "docs/flux-todo-list.html"
---

Bir çox zaman, bir neçə komponent eyni dəyişən məlumatdan istifadə etməli olurlar. Bu halda, paylaşılan state-i yaxın olan ana komponentə qaldırmağı tövsiyyə edirik. Gəlin bunun necə işlədiyinə baxaq.

Bu bölmədə, verilən temperaturda suyun qaynayacağını hesablayan temperatur kalkulyatoru düzəldəcəyik.

`BoilingVerdict` adlanan komponent ilə başlayaq. Bu kopmonent `celsius` temperaturunu prop kimi qəbul edib verilən temperaturda suyun qaynayacağını render edir:

```js{3,5}
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>Su qaynayacaq.</p>;
  }
  return <p>Su qaynamayacaq.</p>;
}
```

İndi biz `Calculator` adında komponent düzəldəcəyik. Bu komponent temperaturu daxil etmək üçün `<input>` render edir və anket sahəsinin dəyərini `this.state.temperature` state-ində saxlayır.

Əlavə olaraq, cari temperatur dəyəri üçün `BoilingVerdict`-i render edir.

```js{5,9,13,17-21}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Selsi ilə temperaturu daxil edin:</legend>
        <input
          value={temperature}
          onChange={this.handleChange} />
        <BoilingVerdict
          celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/ZXeOBm?editors=0010)

## İkinci Anket Sahəsinin Əlavə Edilməsi {#adding-a-second-input}

İndi yeni tələb Selsidən əlavə Farenheit əlavə edib bu iki temperatur dəyərini sinxron saxlamaqdır.

Bunun üçün biz `TemperatureInput` komponentini `Calculator`-dan ayıra edə bilərik. Biz bu komponentə `"c"` və ya `"f"` qəbul edən `scale` propu əlavə edirik:

```js{1-4,19,22}
const scaleNames = {
  c: 'Selsi',
  f: 'Farenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Temperaturu {scaleNames[scale]} ilə daxil et:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

İndi `Calculator` iki fərqli temperatur sahəsi render edə bilər:

```js{5,6}
class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c" />
        <TemperatureInput scale="f" />
      </div>
    );
  }
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/jGBryx?editors=0010)

Bizdə iki sahə olmasına baxmayaraq, temperaturu birində yenilədikdə o biri sahədə dəyər yenilənmir. Bu bizim bir tələbimizə ziddir: bu iki sahənin dəyəri sinxron saxlanmalıdır.

Əlavə olaraq, biz `BoilingVerdict` komponentini `Calculator`-dan render edə bilmirik. `Calculator`-un `TemperatureInput`-da yerləşən cari temperaturdan xəbəri yoxdur.

## Çevrilmə Funksiyalarının Yazılması {#writing-conversion-functions}

İlk öncə, biz Selsini to Farenheitə və əskinə çevirmələr üçün funksiyalar yazacağıq:

```js
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}
```

Bu iki funksiya rəqəmləri çevirirlər. İndi biz `temperature` mətn arqumentini və çevirmə funksiyasını arqument kimi qəbul edən və mətn qaytaran funksiya yazacağıq. Biz bir anket sahəsinin dəyəri ilə digər anket sahəsinin dəyərini hesablamaq üçün bu funksiyadan istifadə edəcəyik.

Etibarsız `temperature` dəyəri olduqda bu funksiya boş mətn qaytaracaq. Əks halda, nəticə 3-cü onluğa yuvarlaqlaşdırılacaq:

```js
function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

Məsələn, `tryConvert('abc', toCelsius)` boş mətn qaytarır. `tryConvert('10.22', toFahrenheit)` isə `'50.396'` qaytarır.

## State-in Qaldırılması {#lifting-state-up}

İndi, hər iki `TemperatureInput` komponenti dəyərlərləri müstəqil şəkildə lokal state-də saxlayırlar:

```js{5,9,13}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    // ...  
```

Lakin, biz bu iki anket sahəsinin dəyərinin bir-birindən asılı olmasını istəyirik. Biz Selsi sahəsini yeniləndikdə, Farenheit sahəsi çevrilmiş temperaturu göstərməli, Farenheit yeniləndikdə isə, Selsi sahəsi çevrilmiş temperaturu göstərməlidir.

React-də komponentlər arasında paylaşan state yaratmaq üçün, state-i yaxın ana komponentə köçürmək lazımdır. Biz bunu "state-in qaldırılması" adlandırırıq. Gəlin `TemperatureInput`-dan lokal state-i silib `Calculator`-a köçürək.

Paylaşan state `Calculator`-da yerləşdirildikdə, bu komponent hər iki anket sahəsi üçün cari temperaturun həqiqət mənbəyi olur. Bu komponent, hər iki anket sahəsinə bir-biri ilə uyğun olan dəyərin olmasını təlim edir. Hər iki `TemperatureInput`-un propları eyni ana `Calculator` komponentindən gəldiyindən, anket sahələri həmişə sinxronizasiyada olacaqlar.

Gəlin bunun işləməsinə addım addım baxaq.

İlk öncə, `TemperatureInput` komponentində `this.state.temperature`-ı `this.props.temperature`-a dəyişək. Gələcəkdə `Calculator`-dan `this.props.temperature` propunu göndərməyimizə baxmayaraq, hələki, iddia edək ki,  bu prop mövcuddur:

```js{3}
  render() {
    // Öncə: const temperature = this.state.temperature;
    const temperature = this.props.temperature;
    // ...
```

[propların yalnız oxuna bilən olduğunu](/docs/components-and-props.html#props-are-read-only) biz bilirik. `temperature` lokal state-də olduğu zaman, the `TemperatureInput` komponenti `this.setState()` çağıraraq bu state-i dəyişə bilər. Lakin, indi `temperature`-un valideyn komponentdən prop kimi gəldiyinə görə `TemperatureInput`-un bu dəyəri idarə edə bilmir.

React-də, komponenti "kontrol olunan" edərək bu problemi həll etmək olur. DOM `<input>` elementinin `value` və `onChange` propları qəbul etdiyi kimi, `TemperatureInput` xüsusi komponenti də  `temperature` və `onTemperatureChange` proplarını valideyn komponenti olan `Calculator`-dan qəbul edə bilər.

İndi, `TemperatureInput` temperaturu yeniləmək istədikdə temperature `this.props.onTemperatureChange` funksiyasını çağıra bilər:

```js{3}
  handleChange(e) {
    // Öncə: this.setState({temperature: e.target.value});
    this.props.onTemperatureChange(e.target.value);
    // ...
```

>Qeyd:
>
>Xüsusi komponentlərdə `temperature` və ya `onTemperatureChange` prop adlarının olmasının heç bir xüsusiyyəti yoxdur. Biz bu propları nə istəsək adlandıra bilərik. Adətən, prop adlarını konvensiya kimi `value` və `onChange` adlandırırlar.

Valideyn `Calculator` komponenti `onTemperatureChange` propunu `temperature` propu ilə birlikdə təmin edir. Bu komponent lokal state-i yeniləyərək dəyəri dəyişib hər iki anket sahəsini yeni dəyərlər ilə render edə bilir. Biz `Calculator`-un yeni tətbiqinə birazdan baxacağıq.

`Calculator`-da olan dəyişikliklərə keçmədən öncə, gəlin `TemperatureInput` komponentində etdiyimiz dəyişikliklərə baxaq. Bu komponentdən lokal state-i silib `this.state.temperature` oxumaq əvəzinə `this.props.temperature` propunu oxuyuruq. Dəyişiklik etmək üçün `this.setState()` çağırmaq əvəzinə `this.props.onTemperatureChange()` funksiyasını çağırırıq. Bu funksiya `Calculator` tərəfindən təmin edilir:

```js{8,12}
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Temperaturu {scaleNames[scale]} ilə daxil edin:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}
```

Gəlin indi `Calculator` komponentinə keçək.

Cari anket sahəsinin `temperature` və `scale` dəyərlərini lokal state-də saxlayacağıq. Bu, anketlərdən "qaldırdığımız state-dir." Bu state hər iki sahə üçün "həqiqət mənbəyidir". Bu məlumatlar, hər iki sahəni render etmək üçün lazımdır.

Məsələn, əgər Selsi sahəsinə 37 daxil etsəniz, `Calculator` komponentinin state-i aşağıdaki formada olacaq:

```js
{
  temperature: '37',
  scale: 'c'
}
```

Əgər biz Fahrenheit sahəsini 212-ə dəyişsək, `Calculator`-un state-i aşağıdaki formada olacaq:

```js
{
  temperature: '212',
  scale: 'f'
}
```

Biz hər iki dəyəri saxlaya bilərdik amma bu lazımsızdır. Yeni dəyişmiş sahənin dəyərini və təmsil etdiyi bölgünü saxlamaq bəsdir. Saxlanılan dəyər əsasında digər sahənin `temperature` and `scale` dəyərlərini hesablaya bilərik.

Dəyərlər eyni state əsasında hesablandığından sahələri sinxron saxlamaq mümkündür:

```js{6,10,14,18-21,27-28,31-32,34}
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/WZpxpz?editors=0010)

İndi hansı sahənin dəyişildiyindən asılı olmayaraq, `Calculator`-un `this.state.temperature` və `this.state.scale` state-ləri yenilənəcək. Bir sahə həmişə dəyəri olduğu kimi qəbul edir. O biri sahə isə həmişə bu sahənin dəyəri əsasında yenidən hesablanır.

Sahədə dəyişiklikər edildikdə nə baş verdiyinə yenidən baxaq:

* DOM `<input>`-unda göstərilən `onChange` funksiyası React tərəfindən çağrılır. Bizim halda, bu funksiya `TemperatureInput` komponentində olan `handleChange` funksiyasıdır.
* `TemperatureInput` komponentində olan `handleChange` funksiyası `this.props.onTemperatureChange()` funksiyasını lazımi dəyər ilə çağırır. `onTemperatureChange` daxil olmaqla, bu komponentin propları valideyn komponenti olan `Calculator` tərəfindən təmin edilir.
* Əvvəlki renderdə, Selsi `TemperatureInput` komponentinin `onTemperatureChange` propuna `Calculator` komponentinin `handleCelsiusChange` funksiyası göndərilir. Farenheit `TemperatureInput` komponentinin `onTemperatureChange` propuna isə `Calculator` komponentinin `handleFahrenheitChange` funksiyası göndərilir. Yenilənən anket sahəsinə uyğun göstərilən funksiya çağrılır.
* `Calculator` komponenti bu funksiyanın içərisində dəyişən anket sahəsinin dəyəri və miqyası ilə `this.setState()` çağıraraq React-ə özünü yenidən render etməyi istəyir.
* React, `Calculator` komponentinin `render` funksiyasını çağıraraq UI-ın necə görünəcəyini göstərir. Hər iki anket sahəsinin dəyəri cari temperatur və miqyas əsasında hesablanır. Temperatur çevrilməsi burada baş verir.
* React, fərdi `TemperatureInput` komponentlərinin `render` funksiyalarını `Calculator` tərəfindən göstərilən proplar əsasında çağırır. UI-ın necə olacağı göstərilir.
* React, Selsi temperaturu prop kimi göndərərək `BoilingVerdict` komponentinin `render` funksiyasını çağırır.
* React DOM, qaynama iddiası və anket sahəsinin dəyərləri əsasında DOM-u yeniləyir. Bizim dəyişdiyimiz anket sahəsi cari dəyəri qəbul edir. Digər anket sahəsi isə çevrilmədən sonra hesablanan temperaturu yeniləyir.

Hər yenilik eyni addımlardan keçərək anket sahələrini sinxron saxlayır.

## Nə Öyrəndik {#lessons-learned}

React applikasiyalarında dəyişən məlumat üçün həmiçə tək "həqiqət mənbəyi" olmalıdır. Adətən, ilk olaraq render olunmuş komponentə state əlavə edirik. Sonra, əgər digər komponentlərə bu dəyər lazımdırsa, state-i valideyn komponentlərə qaldırırıq. Fəqrli komponentlər arası state-i sinxron etmək əvəzinə [yuxarıdan aşağı məlumat axınından](/docs/state-and-lifecycle.html#the-data-flows-down) istifadə edin.

İki-yollu binding yanaşmasından fərqli olaraq state-i qaldırmaq yanaşması daha çox kodun yazılmasına səbəb olur. Amma bu yanaşma ilə baqları tapıb düzəltmək daha asandır. State həmişə hər hansı bir komponentdə "yaşadığından" və bu komponent state-i dəyişə bildiyindən, baqların əhatə sahəsi çox kiçilir. Əlavə olaraq, istifadəçi daxil olmasını rədd etmək və ya çevirmək üçün xüsusi məntiq tətbiq edə bilərsiniz.

Əgər nəsə həm proplardan həm də state-dən törənə bilərsə, bu state-də olmamalıdır. Məsələn, həm `celsiusValue` həm də `fahrenheitValue`-nu state-də saxlamaq əvəzinə, biz son dəyişən sahənin dəyərini və miqyasını `temperature` və `scale`-də saxlayırıq. Digər sahənin dəyəri `render()` funksiyasından cari dəyərin əsasında hesablana bilər. Bu yanaşma dəqiqliyi itirmədən digər sahənin dəyərini yuvarlaqlaşdırmağa imkan yaradır.

UI-da səhv gördüyünüz zaman, propları yoxlayıb ağacdan yuxarı qalxaraq state-i yeniləyən komponenti tapmaq üçün [React Proqramçı Alətlərindən](https://github.com/facebook/react-devtools) istifadə edə bilərsiniz. Bu alətlər baqların mənbəyini tapmağa imkan yaradır:

<img src="../images/docs/react-devtools-state.gif" alt="React Proqramçı Alətlərində State-in Yoxlanması" max-width="100%" height="100%">


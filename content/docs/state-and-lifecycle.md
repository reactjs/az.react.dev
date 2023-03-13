---
id: state-and-lifecycle
title: State and Lifecycle
permalink: docs/state-and-lifecycle.html
redirect_from:
  - "docs/interactivity-and-dynamic-uis.html"
prev: components-and-props.html
next: handling-events.html
---

<<<<<<< HEAD
Bu səhifə React komponentin state və lifecycle anlayışlarını təqdim edir. Ətraflı [komponent API kataloqu bu linkdə yerləşir](/docs/react-component.html).

[Əvvəlki bölümlərin birindən](/docs/rendering-elements.html#updating-the-rendered-element) işləyən saat nümunəsinə nəzər yetirək. [Elementlərin render edilməsində](/docs/rendering-elements.html#rendering-an-element-into-the-dom) biz UI dəyişməyin bir yolunu öyrəndik &ndash; `ReactDOM.render()` çağırmaqla:
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [State: A Component's Memory](https://beta.reactjs.org/learn/state-a-components-memory)
> - [Synchronizing with Effects](https://beta.reactjs.org/learn/synchronizing-with-effects)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

This page introduces the concept of state and lifecycle in a React component. You can find a [detailed component API reference here](/docs/react-component.html).

Consider the ticking clock example from [one of the previous sections](/docs/rendering-elements.html#updating-the-rendered-element). In [Rendering Elements](/docs/rendering-elements.html#rendering-an-element-into-the-dom), we have only learned one way to update the UI. We call `root.render()` to change the rendered output:
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

```js{10}
const root = ReactDOM.createRoot(document.getElementById('root'));
  
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  root.render(element);
}

setInterval(tick, 1000);
```

[**CodePen-də bax**](https://codepen.io/gaearon/pen/gwoJZk?editors=0010)

Bu bölümdə isə biz `Clock` komponentini inkapsulyasiya və təkrar istifadə etməyi öyrənəcəyik. Bu komponent öz taymerini quraşdıracaq və saniyədə bir dəfə özünü yeniləyəcək.

Bunun üçün əvvəlcə `Clock` komponentinə ayrılıqda nəzər yetirək: 

```js{5-8,13}
const root = ReactDOM.createRoot(document.getElementById('root'));

function Clock(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}.</h2>
    </div>
  );
}

function tick() {
  root.render(<Clock date={new Date()} />);
}

setInterval(tick, 1000);
```

[**CodePen-də bax**](https://codepen.io/gaearon/pen/dpdoYR?editors=0010)

Bu komponentin önəmli çatışmazlığı var. Taymeri quraşdırma və özünü hər saniyə yeniləmə `Clock` komponentinin daxilində olmalıdır.

Məqsədimiz bu komponenti elə reallaşdırmaqdır ki, komponent özü özünü yeniləməyi bilsin:

```js{2}
root.render(<Clock />);
```

Bunu yerinə yetirmək üçün `Clock` komponentinə "state" əlavə etmək lazımdır.

State prop-a bənzəyir, lakin komponent tərəfindən tam idarə olunur və yalnız onun daxilində əlçatandır.

## Funksiyanın sinifə çevrilməsi {#converting-a-function-to-a-class}

`Clock` kimi funksional komponenti sinif komponentinə  5 addımda çevirmək olar:

1. İlkin komponentlə adı eyni olan, `React.Component` sinfini genişləndirən [ES6 sinfi](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) yaradaq.

2. Bu sinfə `render()` adlı boş metod əlavə edək.

3. Funksiyanın kodunu `render()` metoduna köçürək.

4. `render()`-in içində `props`-u `this.props` ilə əvəzləyək.

5. Boş qalmış funksiyanı silək.

```js
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

[**CodePen-də bax**](https://codepen.io/gaearon/pen/zKRGpo?editors=0010)

Öncəliklə funksiya kimi təyin edilən `Clock` komponenti, indi sinif kimi təyin edilmişdir.

`render` metodu hər dəfə yeniləmə baş tutduqda çağırılacaq. Lakin eyni DOM düyünü daxilində `<Clock />` komponentini neçə dəfə istifadə etsək də, `Clock` sinfinin yalnız bir nüsxəsi istifadə olunacaq. Bu hal bizə lokal state və lifecycle kimi əlavə xüsusiyyətləri istifadə etmə imkanı verir.

## Sinfə lokal state əlavə edilməsi {#adding-local-state-to-a-class}

`date` prop-unu state-ə üç addımda çevirək:

1) `render()` metodunda `this.props.date`-i `this.state.date` ilə əvəz edək:

```js{6}
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```
2) `this.state` veriləninə ilkin dəyər təyin edən [sinif konstruktoru](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes#Constructor) əlavə edək:

```js{4}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Diqqət yetirin ki, `props` arqumenti baza konstruktora da ötürülür:

```js{2}
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }
```

Sinif komponentləri həmişə baza konstruktoru `props` arqumentini ötürərək çağırmalıdırlar.

3) `<Clock />` elementindən `date` prop-unu silək:

```js{2}
root.render(<Clock />);
```

Bir qədər sonra taymerin kodunu komponentə geri əlavə edəcəyik.

Yekun nəticə belədir:

```js{2-5,11,18}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

[**CodePen-də bax**](https://codepen.io/gaearon/pen/KgQpJd?editors=0010)

İndi isə `Clock` komponentində taymer quraşdıraq və özünü hər saniyə yeniləməsini təmin edək.

## Sinfə lifecycle metodlarının əlavə edilməsi {#adding-lifecycle-methods-to-a-class}

Tərkibində çox sayda komponent olan applikasiyalarda həmin komponentlər silinəndə, onların tutduğu resursların azad olunması olduqca önəmlidir.

Komponentin DOM-da ilk dəfə render olunmasına "mounting" deyilir. Bizim məqsədimiz hər dəfə "mounting" baş tutanda [taymeri quraşdırmaqdır.](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval)

Komponentin DOM-dan silinməsi isə React-da "unmounting" adlanır. Bu proses zamanı [taymeri yaddaşdan silmək](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/clearInterval) gərəkdir.

Mounting və unmounting zamanı istədiyimiz kodu icra edən metodları təyin edək:

```js{7-9,11-13}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Bu metodlara "lifecycle metodları" deyilir.

`componentDidMount()` metodu komponent DOM-da render olunduqdan dərhal sonra icra olunur. Taymeri quraşdırmaq üçün ən əlverişli yer buradır:

```js{2-5}
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

Diqqət yetirsək, taymerin ID-sini `this` də saxladığımızı görərsiniz (`this.timerID`).

`this.props` React tərəfindən quraşdırılır, `this.state`-in də xüsusi anlamı var. Bu ikisindən savayı sinfə hər hansı məlumat saxlamaq üçün məlumat axımında iştirak etməyən başqa verilənlər əlavə etmək olar (taymerin id-si kimi).

`componentWillUnmount()` metodunda taymeri yaddaşdan siləcəyik:

```js{2}
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```
Sonunda `tick()` metodunu yaradacağıq. Bu metodu `Clock` komponenti saniyədə bir dəfə çağıracaq.

`tick()` metodu `this.setState()` çağırmaqla komponentin lokal state-ni yeniləyəcək.

```js{18-22}
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
```

[**CodePen-də bax**](https://codepen.io/gaearon/pen/amqdNA?editors=0010)

İndi `Clock` hər saniyə dəyişir.

Gəlin bir daha hər şeyi təkrarlayaq və metodların çağırıldığı ardıcıllığa nəzər yetirək:

<<<<<<< HEAD
1) `<Clock />` komponenti `ReactDOM.render()` metoduna ötürüləndə React `Clock` sinfinin konstruktorunu çağırır. Bu komponent cari vaxtı göstərməlidir. Buna görə də `this.state`-i cari vaxt obyekti ilə inisializasiya edir. 
=======
1) When `<Clock />` is passed to `root.render()`, React calls the constructor of the `Clock` component. Since `Clock` needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.
>>>>>>> 19aa5b4852c3905757edb16dd62f7e7506231210

2) Daha sonra React `Clock` komponentinin `render()` metodunu çağırır. Belə React ekranda nə göstərmək lazım olduğunu öyrənir. Bundan da sonra DOM `Clock`-un render nəticəsinə uyğun olaraq yenilənir.

3) `Clock` render olunub DOM-a əlavə olunanda `componentDidMount()` lifecycle metodu React tərəfindən çağırılır. Metodun içərisində `Clock` komponenti brauzerə taymer quraşdırmağı əmr edir. Bu taymer saniyədə bir dəfə `tick()` metodunu çağıracaq.

4) Brauzer, gözləndiyi kimi, `tick()` metodunu hər saniyə çağırır. Bu metodun daxilində `Clock` komponenti,  cari vaxtı ötürməklə, `setState()` metodunu çağırır. `setState()`-in çağırılması React-ə state-in dəyişdiyini xəbər verir. React buna görə ekranda nə olmasını dəqiqləşdirmək üçün yenidən `render()` metodunu icra edir. `render()` metodunda `this.state.date` fərqli olduğundan, renderin nəticəsi fərqli vaxt göstərəcək. React DOM-u buna uyğun dəyişir.

5) `Clock` komponenti DOM-dan silinsə `componentWillUnmount()` lifecycle metodu React tərəfindən çağırılacaq, taymer dayandırılacaq.

## State-in düzgün istifadə edilməsi {#using-state-correctly}

`setState()` haqqında bilməli olduğumuz üç şey var.

### State-i birbaşa dəyişmək olmaz {#do-not-modify-state-directly}

Məsələn, bu kod komponenti yenidən render etməyəcək:

```js
// Yanlış
this.state.comment = 'Hello';
```

Əvəzinə `setState()` istifadə etmək lazımdır:

```js
// Düzgün
this.setState({comment: 'Hello'});
```

`this.state`-ə dəyər mənimsədilə biləcək yeganə yer konstruktordur.

### State-in yenilənməsi asinxron ola bilər {#state-updates-may-be-asynchronous}

React performansı təkmilləşdirmək üçün bir neçə `setState()` çağırışını qruplaşdıra bilər.

`this.props` və `this.state` asinxron dəyişilə bildiyi üçün, onların sonrakı dəyərini hesablayanda indiki dəyərinə etibar etmək olmaz.

Məsələn, bu kod counter-i yeniləməkdə iflasa uğraya bilər.

```js
// Yanlış
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

Bu problemi düzəltmək üçün, `setState()`-in obyekt yerinə funksiya qəbul edən ikinci formasını istifadə etmək olar. Həmin funksiya birinci arqument kimi state-in əvvəlki dəyərini, ikinci arqument kimi isə propların yeniləmə zamanındakı dəyərini qəbul edir:

```js
// Düzgün
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

Az öncəki misalda biz [arrow funksiyasını](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) istifadə etdik. Misal adi funksiyalar üçün də keçərlidir:

```js
// Düzgün
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  };
});
```

### State yeniləmələri birləşdirilir {#state-updates-are-merged}

`setState()` çağırılanda React ötürülən obyekti hazırki state-ə birləşdirir.

Misal üçün, state bir neçə sərbəst  veriləndən ibarət ola bilər:

```js{4,5}
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
```

Həmin verilənlər müstəqil olaraq `setState()` vasitəsi ilə yenilənə bilər:

```js{4,10}
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

Birləşdirmə dayazdır (shallow), yəni `this.setState({comments})` çağırılanda `this.state.posts`-u dəyişmir, amma `this.state.comments`-i tamamilə əvəz edir.

## Verilənlərin aşağı istiqamətdə axını {#the-data-flows-down}

Nə valideyn, nə də uşaq komponenti digər komponentin state-inin olub olmadığını bilməyə məcbur deyil. Həmin komponentin funksiya və ya sinif kimi təyin olmağı da onlar üçün önəmli deyil.

Məhz buna görə state lokal və ya inkapsulyasiya olunmuş adlanır. Yalnız məxsus olduğu komponent daxilində əlçatandır, digər komponentlər onu görmür.

Komponent öz state-ini uşaq komponentlərinə (aşağı istiqamətdə) props kimi ötürə bilər:

```js
<FormattedDate date={this.state.date} />
```

`FormattedDate` komponenti `date`-i props kimi qəbul edəcək. Lakin onun `Clock`-un state-i, `Clock`-un propları və ya manual olaraq daxil olduğundan xəbər tutmayacaq:

```js
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

[**CodePen-də bax**](https://codepen.io/gaearon/pen/zKRqNB?editors=0010)

Buna "yuxarıdan-aşağı" ("top-down") və ya "birtərəfli" ("unidirectional") verilənlər axını deyilir. Hər bir state bir komponentə məxsusdur. Həmin state-in törəmələri yalnız komponentlər ağacında "aşağıda" olan komponentlərə təsir göstərə bilər.

Əgər komponent ağacını prop-ların şəlaləsi kimi təsəvvür etsək, hər bir komponentin state-i şəlaləyə qovuşan yeni su mənbəsidir. Hansıki təsadüfi bir yerdə şəlaləyə bitişir, amma yenə də aşağı axır.

Bütün komponentlərin izolyasiya olduğunu göstərmək üçün tərkibində üç `<Clock>` olan `App` komponenti yaradaq:

```js{4-6}
function App() {
  return (
    <div>
      <Clock />
      <Clock />
      <Clock />
    </div>
  );
}
```

[**CodePen-də bax**](https://codepen.io/gaearon/pen/vXdGmd?editors=0010)

Hər bir `Clock` öz taymerini quraşdırır və sərbəst yenilənir.

React applikasiyalarında komponentin state-nin olub olmaması gələcəkdə dəyişə bilən daxili detal sayılır. State-i olan komponentlər state-i olmayan komponentlərin içində istifadə oluna bilər. Əks bəyanətdə doğrudur.

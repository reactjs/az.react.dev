---
id: react-without-es6
title: ES6-sız React
permalink: docs/react-without-es6.html
---

Normalda, React komponenti sadə JavaScript sinfi kimi təyin edilir:

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Salam, {this.props.name}</h1>;
  }
}
```

ES6 işlətmədikdə `create-react-class` modulundan istifadə edə bilərsiniz:


```javascript
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Salam, {this.props.name}</h1>;
  }
});
```

ES6 siniflərinin API-ı bəzi istinasları çıxmaqla `createReactClass()`-ın API-na bənzəyir.

## Təyin Edilməyən Propların Müəyyənləşdirilməsi {#declaring-default-props}

`defaultProps` parametri, funksiya və ES6 siniflərində komponentin parametri kimi təyin edilir:

```javascript
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Ayşən'
};
```

`createReactClass()` işlətdikdə isə təyin edilməyən propları qaytamaq üçün `getDefaultProps()` funksiyası təyin edilməlidir:

```javascript
var Greeting = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Ayşən'
    };
  },

  // ...

});
```

## İlkin State-in Təyin Edilməsi {#setting-the-initial-state}

ES6 siniflərində ilkin state-i təyin etmək üçün konstruktordan `this.state`-i təyin etmək kifayətdir:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```

`createReactClass()` funksiyasında isə ilkin state-i qaytaran `getInitialState` funksiyası təyin edilməlidir:

```javascript
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

## Avtomatik Binding {#autobinding}

ES6 sinifləri ilə təyin olunan React siniflərinin funksiyaları standart ES6 siniflərinin semantikası ilə eynidir. Bu deməkdir ki, sinif funksiyalarında `this` instansiyasını avtomatik bind edilmir. Bu səbəbdən, konstruktorda açıq formada `.bind(this)` yazmalısınız:

```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // Bu sətr vacibdir!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // `this.handleClick` sinfə bind olduğundan biz bu funksiyanı hadisə işləyicisi kimi işlədə bilərik.
    return (
      <button onClick={this.handleClick}>
        Salam de
      </button>
    );
  }
}
```

`createReactClass()` işlətdikdə isə bütün daxili funksiyalar avtomatik olaraq bind olunur:

```javascript
var SayHello = createReactClass({
  getInitialState: function() {
    return {message: 'Salam!'};
  },

  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Salam de
      </button>
    );
  }
});
```

<<<<<<< HEAD
Bu deməkdir ki, ES6 sinifləri hadisə işləyiciləri üçün əlavə kod tələb edir. Lakin, bu siniflər böyük applikasiyalarda daha tez işləyirlər.
=======
This means writing ES6 classes comes with a little more boilerplate code for event handlers, but the upside is slightly better performance in large applications.

If the boilerplate code is too unattractive to you, you may use [ES2022 Class Properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_instance_fields) syntax:
>>>>>>> b0ccb47f33e52315b0ec65edb9a49dc4910dd99c

Əgər bu əlavə kod sizin üçün çoxdursa **eksperimental** [Sinif Parametrləri](https://babeljs.io/docs/plugins/transform-class-properties/) sintaksis təklifini Babel-a qoşa bilərsiniz:

```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Salam!'};
  }
<<<<<<< HEAD
  // Xəbərdarlıq: Bu sintaksis eksperimentaldır!
  // Ox funksiyaları funksiyalar avtomatik bind olunur:
=======
  
  // Using an arrow here binds the method:
>>>>>>> b0ccb47f33e52315b0ec65edb9a49dc4910dd99c
  handleClick = () => {
    alert(this.state.message);
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Salam de
      </button>
    );
  }
}
```

<<<<<<< HEAD
Nəzərə alın ki, yuxarıda göstərilən sintaksis **eksperimentaldır**. Bu səbəbdən, bu sintaksis dəyişə bilər və ya verilən təklif dilin spesifikasiyasına çatmaya bilər.

Əgər problemsiz işləmək istəyirsinizsə sizdə bir neçə seçim var:
=======
You also have a few other options:
>>>>>>> b0ccb47f33e52315b0ec65edb9a49dc4910dd99c

* Konstruktordan funksiyaları bind edin.
* Ox funksiyalarından istifadə edin: `onClick={(e) => this.handleClick(e)}`.
* `createReactClass` funksiyasından istifadə edin.

## Miksinlər {#mixins}

>**Qeyd:**
>
>ES6, miksinlər dəstəklənmədən buraxılışa verildi. Bu səbəbdən, React-i ES6 sinifləri ilə istifadə etdikdə miksinlər dəstəklənmir.
>
>**Əlavə olaraq, miksinli kodlarda çoxlu problemlər tapdığımızdan [yeni kodda miksinlərin istifadəsini tövsiyə etmirik](/blog/2016/07/13/mixins-considered-harmful.html).**
>
>Bu bölmə yalnız arayış xarakteri daşıyır.

Bəzən, fərqli komponentlər eyni funksionallığı daşıya bilərlər. Bunlar [cross-cutting konsernlər](https://en.wikipedia.org/wiki/Cross-cutting_concern) adlandırılır. `createReactClass` bu konsernlər üçün köhnəlmiş `mixins` sistemindən istifadə etməyə icazə verir.

Miksinləri işlətməyin çox işlənən ssenarilərdən biri zaman intervalı ilə komponentin yenilənməsidir. `setInterval()` işlətmək asan olsa belə yaddaşı qorumaq üçün lazım olmadıqda intervalı ləğv etmək vacibdir. Komponentin yanandığı və ya dağıldığı zaman kodun icrası üçün React, [lifecycle funksiyaları](/docs/react-component.html#the-component-lifecycle) təmin edir. Gəlin, lifecycle funksiyalarından istifadə edərək komponent dağıldıqda ləğv edilən `setInterval()` funksiyası təmin edək.

```javascript
var SetIntervalMixin = {
  componentWillMount: function() {
    this.intervals = [];
  },
  setInterval: function() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
    this.intervals.forEach(clearInterval);
  }
};

var createReactClass = require('create-react-class');

var TickTock = createReactClass({
  mixins: [SetIntervalMixin], // Mixini istifadə et
  getInitialState: function() {
    return {seconds: 0};
  },
  componentDidMount: function() {
    this.setInterval(this.tick, 1000); // Mixinin funksiyasını çağır
  },
  tick: function() {
    this.setState({seconds: this.state.seconds + 1});
  },
  render: function() {
    return (
      <p>
        React {this.state.seconds} saniyə işləyir.
      </p>
    );
  }
});

const root = ReactDOM.createRoot(document.getElementById('example'));
root.render(<TickTock />);
```

Əgər komponent bir neçə miksindən istifadə edirsə və bu miksinlər eyni lifecycle funksiyalarını təyin edirsə (məsələn, komponent dağıldığı zaman bir neçə miksin təmizləmə işləri aparmaq istəyirsə) bütün lifecycle funksiyalarının çağırışı qarantiya olunacaq. Miksinlərdə təyin edilən metodlar, miksinlərin massivdə göstərildiyi sıra ilə çağrılacaq. Ən sonda, komponentin lifecycle metodları çağrılacaq.

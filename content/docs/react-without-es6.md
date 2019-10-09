---
id: react-without-es6
title: React Without ES6
permalink: docs/react-without-es6.html
---

Normalda React komponenti sadə JavaScript klası kimi təyin edilir:

```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Salam, {this.props.name}</h1>;
  }
}
```

ES6 işlətmirsinizsə, `create-react-class` modulundan istifadə edə bilərsiniz:


```javascript
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  render: function() {
    return <h1>Salam, {this.props.name}</h1>;
  }
});
```

ES6 klaslarının API-ı bəzi istinaslar ilə `createReactClass()`-ın API-na oxşardır.

## Təyin Edilməyən Propların Müəyyənləşdirilməsi {#declaring-default-props}

Funskiyalar və ES6 klaslarında `defaultProps` komponentin parametri kimi təyin edilir:

```javascript
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Ayşən'
};
```

`createReactClass()` funksiyasında isə, təyin edilməyən propları qaytaran `getDefaultProps()` funksiyasını təyin etməlisiniz:

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

ES6 klaslarında ilkin state-i təyin etmək üçün konstruktordan `this.state`-i təyin etmək kifayətdir:

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```

`createReactClass()` funksiyasında isə ilkin state-i qaytaran əlavə `getInitialState` funksiyasını təyin etməlisiniz:

```javascript
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

## Avtomatik Binding {#autobinding}

ES6 klasları ilə təyin olunan React klaslarının funskiyaları standart ES6 klaslarının semantikası ilə eynidir. Bu deməkdirki, klas funksiyaları `this` instansiyasını avtomatik bind etmirlər. Bu səbəbdən, konstruktorda açıq formada `.bind(this)` yazmalısınız:

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
    // `this.handleClick` klasa bind olduğundan biz bu funksiyanı hasidə işləyicisi kimi işlədə bilərik.
    return (
      <button onClick={this.handleClick}>
        Salam de
      </button>
    );
  }
}
```

`createReactClass()` funksiyasında isə bu lazım deyil. Çünki bu funksiya bütün daxili funksiyalarını avtomatik olaraq bind edir:

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

Bu deməkdirki ES6 klasları hadisə işləyiciləri üçün əlavə kod tələb edir. Lakin, bu klaslar böyük applikasiyalarda daha tez işləyirlər.

Əgər bu əlavə kod sizin üçün çoxdursa **eksperimental** [Klas Parametrləri](https://babeljs.io/docs/plugins/transform-class-properties/) sintaksis təklifini Babel-da qoşa bilərsiniz:


```javascript
class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Salam!'};
  }
  // Xəvərdarlıq: Bu sintaksis eksperimentaldır!
  // Burada ox işlətdikdə funksiyalar avtomatik bind olunur:
  handleClick = () => {
    alert(this.state.message);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Salam de
      </button>
    );
  }
}
```

Nəzərə alın ki, yuxarıda göstərilən sintaksis **eksperimentaldır**. Bu səbəbdən, bu sintaksis dəyişə bilər və ya təklif dilin spefikiasiyasına çatmaya bilər.

Əgər problemsiz işlətmək istəyirsinizsə sizdə bir neçə seçim var:

* Konstruktordan funskiyaları bind edin.
* Ox funksiyalarından istifadə edin: `onClick={(e) => this.handleClick(e)}`.
* `createReactClass` funksiyasından istifadə edin.

## Miksinlər {#mixins}

>**Qeyd:**
>
>ES6 miksinləri dəstəkləmədən buraxılışa verildi. Bu səbəbdən, React-i ES6 klasları ilə istifadə etdikdə miksinlər dəstəklənmir.
>
>**Əlavə olaraq miksinli kodlarda çoxlu problemlər tapdığımızdan, [yeni kodda miksinlərin istifadəsini tövsiyyə etmirik](/blog/2016/07/13/mixins-considered-harmful.html).**
>
>Bu bölmə yalnız arayış xarakteri daşıyır.

Bəzən, fərqli komponentlər eyni funksionallığı daşıya bilərlər. Bunlar [cross-cutting konsernlər](https://en.wikipedia.org/wiki/Cross-cutting_concern) adlandırılır. `createReactClass` bu konsernlər üçün köhnəlmiş `mixins` sistemindən istifadə etməyə icazə verir.

Bunun üçün çox işlənən ssenarilərdən biri, zaman intervalı ilə komponentin özünü yeniləməsidir. `setInterval()` işlətmək asaındır amma lazım olmadıqda yaddaşı qorumaq üçün intervalı ləğv etmək vacibdir. Komponent yarandıqda və ya dağıldıqda kod icra etmək üçün React [lifecycle funksiyaları](/docs/react-component.html#the-component-lifecycle) təmin edir. Gəlin lifecycle funksiyalarından istifadə edərək komponent dağıldıqda ləğv edilən `setInterval()` funksiyası təmin edək.

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

ReactDOM.render(
  <TickTock />,
  document.getElementById('example')
);
```

Əgər komponent bir neçə miksindən istifadə edirsə və bu miksinlər eyni lifecycle funksiyalarını təyin edirsə (məsələn, komponent dağıldığı zaman bir neçə mixin təmizləmə işləri aparmaq istəyirsə), bütün lifecycle funksiyalarının çağırışı qarantiya olunacaq. Miksinlərdə təyin edilən metodlar miksinlərin massivdə göstərildiyi sıra ilə çağrılacaq. Ən sonda, komponentin lifecycle metodları çağrılacaq.

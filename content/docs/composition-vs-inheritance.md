---
id: composition-vs-inheritance
title: Kompozisiya vs Varislik
permalink: docs/composition-vs-inheritance.html
redirect_from:
  - "docs/multiple-components.html"
prev: lifting-state-up.html
next: thinking-in-react.html
---

React-in çox güclü kompozisiya modeli olduğundan komponentlər arasında kodu paylaşa bilmək üçün varislik əvəzinə kompozisiyadan istifadə etməyi tövsiyyə edirik.

Bu bölmədə, React-ə yeni başlayan proqramçıların ilk yanaşmada varisliyə əl atdıqları problemləri nəzərə alıb, bu problemlərin kompozisiya ilə həllini göstərəcəyik.

## Saxlama {#containment}

Bəzi komponentlərin əvvəlcədən uşaqları haqqında məlumatları yoxdur. Bu vəziyyət daha çox ümumi konteynerlər təsvir edən `Sidebar` və ya `Dialog` kimi komponentlərdə baş verir.

Belə komponentlərin nəticəsinə uşaq komponentləri birbaşa göndərə bilmək üçün xüsusi `children` propundan istifadə etməyi tövsiyyə edirik:

```js{4}
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
```

`children` propundan istifadə etdikdə uşaqları komponentlərə JSX təqinin içərisindən göndərə bilərsiniz:

```js{4-9}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Xoş Gəlmisiniz
      </h1>
      <p className="Dialog-message">
        Kosmik gəmimizi ziyarət etdiyiniz üçün təşəkkür edirik!
      </p>
    </FancyBorder>
  );
}
```

**[CodePen-də sınayın](https://codepen.io/gaearon/pen/ozqNOV?editors=0010)**

`<FancyBorder>` JSX təqinin daxilində göndərilən bütün elementlər, `FancyBorder` komponentinin `children` propundan yerləşdirilir. `FancyBorder` `<div>`-də `{props.children}` render etdiyindən, göndərilən elementlər son nəticədə görünəcəklər.

Daha az işlənməsinə baxmayaraq, bəzən komponentə bir neçə "render yeri" lazım ola bilər. Bu hallarda `children` əvəzinə öz yaratdığınız konvensiyadan istifadə edin:

```js{5,8,18,21}
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/gwZOJp?editors=0010)

`<Contacts />` və `<Chat />` elementlərinin obyekt olduqlarından siz bu elementləri hər hansı bir məlumat kimi proplar ilə göndərə bilərsiniz. Bu yanaşma, başqa kitabxanalarda olan "yuvalar" (slots) konsepsiyasını yadınıza sala bilər. Lakin, React-də proplar ilə  nələri göndərə biləcəyinizə heç bir məhdudiyyət yoxdur.

## Xüsusiləşmə {#specialization}

Bəzən komponentlər digər kompontlərin "xüsusi halları" ola bilirlər. Məsələn, biz `WelcomeDialog` komponentinə `Dialog` komponentinin xüsusi halı kimi baxa bilərik.

React-də bu yanaşma da kompozisiya ilə tətbiq edilir. "Xüsusi" komponentlər "ümumi" komponentləri fərqli proplar ilə render edirlər:

```js{5,8,16-18}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Xoş Gəlmisiniz"
      message="Kosmik gəmimizi ziyarət etdiyiniz üçün təşəkkür edirik!" />
  );
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/kkEaOZ?editors=0010)

Klas ilə müəyyənləşdirilmiş komponentlərdə belə kompozisiya yaxşı işləyir:

```js{10,27-31}
function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Kəşfiyyat Proqramı"
              message="Sizə müraciət edək?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Məni Qeydə Alın!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Salam ${this.state.login}!`);
  }
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/gwZbYa?editors=0010)

## Bəs Varislik? {#so-what-about-inheritance}

Facebook-da, biz minlərlə komponent üçün React istifadə edirik və heç bir halda komponent varislik iyerarxiyası düzəltməyi tövsiyyə etmirik.

Kompozisiya və proplar, komponentin görünüş və davranışını açıq və təhlükəsiz şəkildə özəlləşdirməyə imkan yaradır. Nəzərə alın ki, komponentlər primitiv dəyərləri, React elementləri, və ya funksiyaları proplar kimi qəbul edə bilirlər.

Əgər sizə bir neçə komponentəd işlətmək üçün UI olmayan funksionallıq lazımdırsa, biz bu funksionallığı ayrı JavaScript moduluna çıxarmağı tövsiyyə edirik. Komponentlər bu modulu idxal edib modulda olan funksiyanı, obyekti, və ya klası varislik lazım olmadan istifadə edə bilərlər.

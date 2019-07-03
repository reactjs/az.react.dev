---
id: conditional-rendering
title: Şərti Render Etmə
permalink: docs/conditional-rendering.html
prev: handling-events.html
next: lists-and-keys.html
redirect_from:
  - "tips/false-in-jsx.html"
---

React-də siz ehtiyacınız olan davranışı ininkapsulyasiya edən fərqli komponentləri yarada bilərsiniz. Daha sonra, siz applikasiyanızın vəziyyətindən asılı olaraq bəzi komponentləri render edə bilərsiniz.

Şərti render etmə JavaScript-də işlədiyi kimi React-də işlənilir. Hazırki vəziyyəti təmsil etmək üçün elemetləri yaratmağa və React yenilənmələrini UI ilə uyğunlaşdırmaq üçün [`if`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else) və ya [şərti operator](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) kimi Javascript operatorlarını istifadə edin.

Bu iki komponentləri nəzərə alın:

```js
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

Biz, bu komponentlərin hansınısa təsvir edən  `Greeting` komponenti yaradacağıq.We'll create a `Greeting` component that displays either of these components depending on whether a user is logged in:

```javascript{3-7,11,12}
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[**CodePen-də yoxlayın**](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

Bu münunə `isLoggedIn` propunun dəyərindən asılı olaraq müxtəlif salamlama render edir.

### Element Dəyişənləri {#element-variables}

Siz elementləri saxlamaq üçün dəyişənləri istifadə edə bilərsiniz. Bu sizə nəticənin qalan hissəsini dəyişmədən komponentin bir hissəsini şərti olaraq render etməyə imkan verəcək.

Yeni iki komponentləri təmsil edən Logout və Login düymələrini nəzərə alın:

```js
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

Aşağıdakı müsalda biz `LoginControl` adlanan [state-li komponent](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) yaradacağıq.

Bu hazırki vəziyyəti nəzərə alaraq `<LoginButton />` və ya `<LogoutButton />` render edəcək. Bu həmçinin əvvəli misaldan olan `<Greeting />`-i render edəcək:

```javascript{20-25,29,30}
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[**CodePen-də yoxlayın**](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

While declaring a variable and using an `if` statement is a fine way to conditionally render a component, sometimes you might want to use a shorter syntax. There are a few ways to inline conditions in JSX, explained below.

### Inline If with Logical && Operator {#inline-if-with-logical--operator}

You may [embed any expressions in JSX](/docs/introducing-jsx.html#embedding-expressions-in-jsx) by wrapping them in curly braces. This includes the JavaScript logical `&&` operator. It can be handy for conditionally including an element:

```js{6-10}
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[**CodePen-də yoxlayın**](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

Bu işləyir çünki JavaScript-də `true && expression` həmişə `expression`-u qiymətləndirir və `false && expression` həmişə `false`-u qiIt works because in JavaScript, `true && expression` always evaluates to `expression`, and `false && expression` always evaluates to `false`.

Buna görə də, əgər şərt (vəziyyət) `true`-dursa, `&&`-dan sonrakı element nəticədə görünəcək. Əgər `false`-dursa, React onu nəzərə almır və ötür.

### Müvəqqəti If-Else Şərti Operator ilə {#inline-if-else-with-conditional-operator}

Elementlərin müvəqqəti şərti render edilməsi üçün digər bir üsul JavaScript-in şərti operatoru [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)istifadə etməkdir.

Aşağıdakı misalda biz bunu balaca mətn qutusunu şərti olaraq render etmək üçün istifadə etdik.

```javascript{5}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

Bu daha geniş tərkiblər üçün istifadə oluna bilər, amma daha az başa düşülən olur:

```js{5,7,9}
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

Javascript-də olduğu kimi, siz və sizin komandanızın oxuna bilən kimi müəyyənləşdirdiyinə əsasən müvafiq stili seçmək sizə bağlıdır. Həmçinin yadda saxlayın ki, şərtlər kompleksləşdiyi zaman [komponenti çıxarmaq](/docs/components-and-props.html#extracting-components) yaxşı üsuldur.

### Komponentin render edilməsinin qarşısını almaq {#preventing-component-from-rendering}

Nadir hallarda siz komponentin digər komponent tərəfindən render edildiyinə baxmayaraq, onun ozünü gizlətməsini istəyə bilərsiniz. Bunun üçün nəticəni render etməkdənsə, `null`-u qaytarın.

Aşağıdakı nümunədə `warn` adlanan propun dəyərindən asılı olaraq `<WarningBanner />` render olunur. Əgər propun dəyəri `false`-dursa, bu halda komponent render etmir:

```javascript{2-4,29}
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return (
    <div className="warning">
      Warning!
    </div>
  );
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showWarning: true};
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
```

[**CodePen-də yoxlayın**](https://codepen.io/gaearon/pen/Xjoqwm?editors=0010)

Returning `null` from a component's `render` method does not affect the firing of the component's lifecycle methods. For instance `componentDidUpdate` will still be called.

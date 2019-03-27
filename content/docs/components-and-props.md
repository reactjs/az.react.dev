---
id: components-and-props
title: Komponentlər və Proplar
permalink: docs/components-and-props.html
redirect_from:
  - "docs/reusable-components.html"
  - "docs/reusable-components-zh-CN.html"
  - "docs/transferring-props.html"
  - "docs/transferring-props-it-IT.html"
  - "docs/transferring-props-ja-JP.html"
  - "docs/transferring-props-ko-KR.html"
  - "docs/transferring-props-zh-CN.html"
  - "tips/props-in-getInitialState-as-anti-pattern.html"
  - "tips/communicate-between-components.html"
prev: rendering-elements.html
next: state-and-lifecycle.html
---

Komponentlər sizə UI-ı müstəqil, yenidən istifadə oluna bilən hissələrə bölməyə və hər bir hissə haqqında izolasiya olunmuş kimi düşünməyə imkan verir. Bu səhifə komponentlər haqqında ideya üçün girişi təmin edir. Siz [komponent API referansı haqqında ətraflı burada](/docs/react-component.html) məlumat tapa bilərsiniz.

Konseptual olaraq, komponentlər JavaScript funksiyalarına bənzəyir. Komponentlər özbaşına daxiletmələri ("proplar" adlanan) qəbul edir və ekranda nə olacağını təsvir edən React elementlərinə qayıdırlar.

## Funksiya və Klass Komponentlər {#function-and-class-components}

Komponenti müəyyən etməyin ən asan yolu JavaScript funksiyasını yazmaqdır:

```js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

Bu funksiya məlumatı olan tək "proplar" (parametrlər mənasını daşıyır) obyekt arqumentini qəbul etdiyi və React elementini qaytardigi üçün etibarlı React komponenti sayılır. Biz belə komponentləri JavaScript funksiyaları olduğu üçün "funksiya komponentləri" adlandırırıq. 

Siz komponenti müəyyən etmək üçün [ES6 class](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) istifadə edə bilərsiniz:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Yuxarıdakı iki komponent Reaact-ə nəzərən bərabərdirlər.

Klassların [digər bölmələrdə](/docs/state-and-lifecycle.html) müzakirə edəcəyimiz bəzi əlavə xüsusiyyətləri var. Ona qədər Classes have some additional features that we will discuss in the [next sections](/docs/state-and-lifecycle.html). Until then, we will use function components for their conciseness.

## Komponenti Render Etmək {#rendering-a-component}

Daha əvvəl biz yalnız DOM təqlərini təmsil edən React elementlərini qarşılaşdırırdıq:

```js
const element = <div />;
```

Buna baxmayaraq, elementlər developerlər tərəfindən yazılmış komponentləri təmsil edə bilər:

```js
const element = <Welcome name="Sara" />;
```

React developerlər tərəfindən yazılmış komponenti təmsil edən element gördükdə, o JSX atributlarını bu komponentə tək obyekt kimi ötürür. Biz bu obyekti "proplar" adlandırırıq.

Məsələn, bu kod this "Hello, Sara"-nı səhifədə belə render edir:

```js{1,5}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

Gəlin bu nümunədə baş verənləri qeyd edək:

1. Biz `ReactDOM.render()`-i `<Welcome name="Sara" />` elementi ilə çağırırıq.
2. React `Welcome` komponentini proplar kimi`{name: 'Sara'}`-i ilə çağırırıq.
3. Bizim `Welcome` komponentimiz `<h1>Hello, Sara</h1>` elementini nəticə kimi çağırır.
4. React DOM-u `<h1>Hello, Sara</h1>`-ə uyğunlaşlaq üçün effektli şəkildə DOM-u yeniləyir.

>**Qeyd:** Komponent adlarının həmişə böyük hərf ilə başlayın.
>
>React kiçik hərflərlə başlayan komponentlərə DOM təqləri kimi davranır. Məsələn, `<div />`, HTML div təqini təmsil edir, amma `<Welcome />` isə komponenti təmsil edir və `Welcome`-un əhatə olunmasını tələb edir.
>
>Bu adətin səbəbi haqqında ətraflı məlumat üçün [JSX In Depth](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) nəzərdən keçirin.

## Kompozisiya olunmuş Komponentlər{#composing-components}

Komponentlər onların nəticələrində digər komponentlərə istinad göstərə bilərlər. Bu bizə hər hansı bir detal səviyyəsi üçün eyni komponent abstraksiyasını istifadə etməyə imkan verir. React-də düymə, forma, dialoq və ekran ümumi şəkildə komponentlər kimi ifadə olunur.

Məsələn, biz `Welcome`-ı dəfələrlə render edən `App` komponentini yarada bilərik:

```js{8-10}
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

Adətən yeni React applikasiyalarının ən yuxarıda tək `App` komponenti olur. Buna baxmayaraq, əgər siz mövcud applikasiyalara React-i inteqrasiya etsəniz, Typically, new React apps have a single `App` component at the very top. However, if you integrate React into an existing app, you might start bottom-up with a small component like `Button` and gradually work your way to the top of the view hierarchy.

## Komponentlərin Çıxarılması {#extracting-components}

Komponentləri daha kiçik komponentlərə bölməyə çəkinməyin.

Məsələn, bu `Comment` komponentini nəzərə alın:

```js
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <img className="Avatar"
          src={props.author.avatarUrl}
          alt={props.author.name}
        />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components)

Bu `author` (obyekt), `text` (mətn), və `date`-i (məlumat) proplar kimi qəbul edir və sosial media saytında kommenti təsvir edir.

Bu komponent dəyişmək üçün çətin ola bilər This component can be tricky to change because of all the nesting, and it is also hard to reuse individual parts of it. Let's extract a few components from it.

First, we will extract `Avatar`:

```js{3-6}
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
```

The `Avatar` doesn't need to know that it is being rendered inside a `Comment`. This is why we have given its prop a more generic name: `user` rather than `author`.

We recommend naming props from the component's own point of view rather than the context in which it is being used.

We can now simplify `Comment` a tiny bit:

```js{5}
function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

Next, we will extract a `UserInfo` component that renders an `Avatar` next to the user's name:

```js{3-8}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}
```

This lets us simplify `Comment` even further:

```js{4}
function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
```

[](codepen://components-and-props/extracting-components-continued)

Extracting components might seem like grunt work at first, but having a palette of reusable components pays off in larger apps. A good rule of thumb is that if a part of your UI is used several times (`Button`, `Panel`, `Avatar`), or is complex enough on its own (`App`, `FeedStory`, `Comment`), it is a good candidate to be a reusable component.

## Props are Read-Only {#props-are-read-only}

Whether you declare a component [as a function or a class](#function-and-class-components), it must never modify its own props. Consider this `sum` function:

```js
function sum(a, b) {
  return a + b;
}
```

Such functions are called ["pure"](https://en.wikipedia.org/wiki/Pure_function) because they do not attempt to change their inputs, and always return the same result for the same inputs.

In contrast, this function is impure because it changes its own input:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React is pretty flexible but it has a single strict rule:

**All React components must act like pure functions with respect to their props.**

Of course, application UIs are dynamic and change over time. In the [next section](/docs/state-and-lifecycle.html), we will introduce a new concept of "state". State allows React components to change their output over time in response to user actions, network responses, and anything else, without violating this rule.

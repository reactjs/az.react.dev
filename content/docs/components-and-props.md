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

Konseptual olaraq, komponentlər JavaScript funksiyalarına bənzəyir. Komponentlər özbaşına daxiletmələri ("proplar" adlanan) qəbul edir və ekranda nə olacağını təsvir edən React elementlərini qaytarırlar.

## Funksiya və Klass Komponentlər {#function-and-class-components}

Komponenti müəyyən etməyin ən asan yolu JavaScript funksiyasını yazmaqdır:

```js
function Welcome(props) {
  return <h1>Salam, {props.name}</h1>;
}
```

Bu funksiya məlumatı olan tək "proplar" (parametrlər mənasını daşıyır) obyekt arqumentini qəbul etdiyi və React elementini qaytardığı üçün etibarlı React komponenti sayılır. Biz bu komponentlərin JavaScript funksiyaları olduğu üçün "funksiya komponentləri" adlandırırıq.

Siz komponenti müəyyən etmək üçün [ES6 klassından](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes) istifadə edə bilərsiniz:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Salam, {this.props.name}</h1>;
  }
}
```

Yuxarıdakı iki komponentlər React-ə nəzərən bərabərdirlər.

Klasların [digər bölmələrdə](/docs/state-and-lifecycle.html) müzakirə edəcəyimiz bəzi əlavə xüsusiyyətləri var. Ona qədər biz funksiya komponentlərini onların müxtəsərliyinə görə istifadə edəcəyik.

## Komponenti Render Etmək {#rendering-a-component}

Daha əvvəl biz yalnız DOM təqlərini təmsil edən React elementlərini qarşılaşdırırdıq:

```js
const element = <div />;
```

Buna baxmayaraq, elementlər developerlər tərəfindən yazılmış komponentləri təmsil edə bilərlər:

```js
const element = <Welcome name="Sara" />;
```

React developerlər tərəfindən yazılmış komponenti təmsil edən element gördükdə, o JSX atributlarını bu komponentə tək obyekt kimi ötürür. Biz bu obyekti "proplar" adlandırırıq.

Məsələn, aşağıdakı kod "Salam, Aysel" mətnini səhifədə render edir:

```js{1,5}
function Welcome(props) {
  return <h1>Salam, {props.name}</h1>;
}

const element = <Welcome name="Aysel" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://components-and-props/rendering-a-component)

Gəlin bu nümunədə baş verənləri qeyd edək:

1. Biz `ReactDOM.render()`-i `<Welcome name="Aysel" />` elementi ilə çağırırıq.
2. React `Welcome` komponentini proplar kimi`{name: 'Aysel'}`-i ilə çağırırıq.
3. Bizim `Welcome` komponentimiz `<h1>Salam, Aysel</h1>` elementini nəticə kimi çağırır.
4. React DOM-u `<h1>Salam, Aysel</h1>`-ə uyğunlaşdırmaq üçün effektli şəkildə DOM-u yeniləyir.

>**Qeyd:** Komponent adlarının həmişə böyük hərf ilə başlayın.
>
>React kiçik hərflərlə başlayan komponentlərə DOM təqləri kimi davranır. Məsələn, `<div />`, HTML div təqini təmsil edir, amma `<Welcome />` isə komponenti təmsil edir və `Welcome`-un əhatə olunmasını tələb edir.
>
>Bu adətin səbəbi haqqında ətraflı məlumat üçün [JSX Dərindən](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized) arayışını nəzərdən keçirin.

## Kompozisiya olunmuş Komponentlər{#composing-components}

Komponentlər öz nəticələrində digər komponentlərə istinad göstərə bilərlər. Bu bizə hər hansı bir detal səviyyəsi üçün eyni komponent abstraksiyasını istifadə etməyə imkan verir. React-də düymə, forma, dialoq və ekran ümumi şəkildə komponentlər kimi ifadə olunur.

Məsələn, biz `Welcome`-u dəfələrlə render edən `App` komponenti yarada bilərik:

```js{8-10}
function Welcome(props) {
  return <h1>Salam, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Aysel" />
      <Welcome name="Orxan" />
      <Welcome name="Cəmilə" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

[](codepen://components-and-props/composing-components)

Adətən yeni React applikasiyalarının ən yuxarıda tək `App` komponenti olur. Buna baxmayaraq, əgər siz mövcud applikasiyalara React-i inteqrasiya etsəniz, siz aşağıdan yuxarı `Button` kimi kiçik komponentlər ilə başlamalı olacaqsız və tədricən ierarxiyanın ən yuxarısına işləməlisiniz.

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

Bu komponent dəyişmək yerləşmə səbəbindən çətin ola bilər və bu komponentin individual hissələrinin yenidən istifadə olunmasıda çətindir. Gəlin bundan bir neçə komponenti xaric edək.

İlk olaraq, biz `Avatar` çıxaracağıq:

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

`Avatar`-ın `Comment`-in daxilində render olunduğunu bilməsi vacib deyil. Bu səbəbdən biz bunun propuna daha ümumi ad verə bilərik: `author` yerinə `user`.

Biz proplara ad verərkən istifadə olunan kontentə uyğun olaraq deyil, komponentlərin nəzərindən ad verməyi məsləhət görürük.

İndi biz `Comment`-i bir az sadələşdirə bilərik:

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

Daha sonra biz istifadəçi adının yanında yerləşən `Avatar`-ı render edən `UserInfo` komponentini xaric edirik:

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

Bu bizə `Comment`-i daha da sadələşdirməyə imkan verir:

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

Komponentlərin xaric edilməsi ilk öncə aşağı səviyyəli iş kimi görünə bilər, amma daha böyük applikasiyalarda  yenidən istifadə oluna bilən komponentlər paletinin olması yararlıdır. Məsləhət görülür ki, sizin bir neçə yerdə istifadə etdiyiniz (`Button`, `Panel`, `Avatar`), və ya təklildə mürəkkəb tərkibli (`App`, `FeedStory`, `Comment`) olan UI-ınızı yenidən istifadə oluna bilən komponent kimi istifadə edin.

## Proplar və Read-Only {#props-are-read-only}

Komponentin [funksiya və ya klas kimi](#function-and-class-components) bəyan edilməyinə baxmayaraq, komponent heç vaxt öz proplarını dəyişməməlidir. Bu `sum` funksiyasını nəzərə alın:

```js
function sum(a, b) {
  return a + b;
}
```

Bu növ funksiyalar ["pure"](https://en.wikipedia.org/wiki/Pure_function) adlanır, çünki onlar daxil olunmuş arqumentləri dəyişməyə cəhd etmir və həmişə eyni nəticəni eyni arqument üçün qaytarırlar.

Buna baxmayaraq, bu funksiya öz arqumentini dəyişdiyi üçün qarışıqdır:

```js
function withdraw(account, amount) {
  account.total -= amount;
}
```

React-in çevik olmağına baxmayaraq onun bir sərt qaydası var:

**Bütün React komponentləri öz proplarını nəzərə alaraq təmiz funksiya kimi davranmalıdırlar.**

Əlbəttə ki, applikasiyaların UI-ları dinamikdir və vaxt aşırı dəyişə bilir. [Növbəti Sessiyada](/docs/state-and-lifecycle.html), biz yeni "state" konsepsiyasını təqdim edəcəyik. State React komponentlərə onların nəticəsini istifadəçi fəaliyyətinə, şəbəkə cavablarına və digər fəaliyyətlərə cavab olaraq, heç bir qaydanı pozmamaq şərti ilə ara-sıra dəyişməyə icazə verir.

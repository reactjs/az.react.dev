---
id: glossary
title: Glossary of React Terms
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Tək səhifəli Applikasiya {#single-page-application}

Tək səhifəli applikasiya, tək HTML səhifəsi və applikasiyanın işləməyi üçün lazım olan bütün faylları (JavaScript və CSS kimi) yükləyir. Səhifəda baş verən hər bir interaksiya üçün serverə yenidən müraciət etmək lazım olmadığından səhifə heç zaman yeniden yüklənmir.

React-də tək səhifəli applikasiya düzəltmək zəruri deyil. Siz mövcud olan veb səhifələrin kiçik hissələrinə interaksiya əlavə etmək üçün React-dən istifadə edə bilərsiniz. React-də yazılmış kod, serverdə render edilmiş (məsələn PHP dili ilə) markup ilə və ya digər klient kitabxanaları ilə eyni zamanda mövcud ola bilər. Faktiki olaraq Facebook-da React bu formada işlədilir.

## ES6, ES2015, ES2016, və s {#es6-es2015-es2016-etc}

Bu akronimlər, ECMAScript Dilinin Spesifikasiya standartının (JavaScript bu standartın tətbiqidir) ən yeni versiyalarına istinad edir. ES6 versiyası (həmçinin ES2015 kimi də tanınır) keçmiş versiyalara bir çox yeniliklər əlavə edir: ox funksiyaları, klaslar, şablon hərfləri, `let` və `const`. Spesifik versiyalar haqqında məlumatlara [buradan](https://en.wikipedia.org/wiki/ECMAScript#Versions) baxa bilərsiniz.

## Kompilyatorlar {#compilers}

JavaScript kopilyatoru qəbul edilən Javascript kodunu digər Javascript formatına çevirir. Ən çox işlənən hal, ES6 sintaksisini köhnə brauzerlərin başa düşəcəyi sintaksisə çevirməkdir. React ilə işlədilən ən məşhur kompilyator [Babel-dır](https://babeljs.io/).

## Paketləmə Qurğuları {#bundlers}

Paketləmə Qurğuları ayrı modullarda (adətən yüzlərlə) yazılmış JavaScript və CSS kodlarının brauzerlər üçün optimallaşdırılmış halda olan bir neçə fayla birləşdirir. [Webpack](https://webpack.js.org/) and [Browserify](http://browserify.org/), React applikasiyalarında ən çox işlədilən paketləmə qurğularıdırlar.

## Paket  Menecerləri {#package-managers}

Paket Menecerləri layihənin asılı olduğu paketləri idarə etmək üçün alətlərdir. React applikasiyarında ən çox işlədilən paket menecerləri [npm](https://www.npmjs.com/) və [Yarn-dır](https://yarnpkg.com/). Bu iki paket menecer klienti eyni npm paket registry-sindən istifadə edirlər.

## CDN {#cdn}

CDN Kontent Çatdırılma Şəbəkəsidir (Content Delivery Network). CDN-lər dünyanın hər yerində yərləşən serverlər şəbəkəsindən kəç olunmuş statik kontenti çatdırır. 

## JSX {#jsx}

JSX JavaScript üçün sintaksis əlavəsidir. Bu dilin şablon dilinə oxşamasına baxmayaraq JavaScript-in bütün gücündən istifadə edə bilir. JSX, "React elementləri" adlanan sadə JavaScript obyektləri qaytaran `React.createElement()` funksiyalarına kompilyasiya edilir. JSX haqqında girişüçün [bu sənədlərə](/docs/introducing-jsx.html), dərindən dərslik üçün isə [bu sənədlərə](/docs/jsx-in-depth.html) baxın.

React DOM HTML atribut adları əvəzinə camelCase ad konvensiyasından istifadə edir. Məsələn, JSX-də `tabindex` `tabIndex`-ə çevrilir. Həmçinin `class` atributu JavaScript-in qorunan sözü olduğundan JSX-də `className` kimi yazılır:

```js
const name = 'Clementine';
ReactDOM.render(
  <h1 className="hello">Mənin adım: {name}!</h1>,
  document.getElementById('root')
);
```  

## [Elementlər](/docs/rendering-elements.html) {#elements}

React applikasiyalarının əsası React elementlərindən ibarətdir. Elementləri daha çox tanınan "komponentlər" konsepsiyası ilə çaşdırmaq olar. Element sizin ekranda nə görmək istədiyinizi təsvir edir. React elementləri dəyişməzdirlər.

```js
const element = <h1>Salam Dünya</h1>;
```

Adətən, elementlər bir başa işlədilmək əvəzinə komponentlərdən qaytarırırlar.

## [Komponentlər](/docs/components-and-props.html) {#components}

React komponentləri səhifəyə render ediləcək React elementi qaytaran kiçik və yenidən istifadə edilə bilən kod bloklarıdır. React komponentinin ən sadə forması React elementi qaytaran sadə JavaScript funksiyasıdır:

```js
function Welcome(props) {
  return <h1>Salam, {props.name}</h1>;
}
```

Komponentlər həmçinin ES6 klasladı da ola bilərlər:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Salam, {this.props.name}</h1>;
  }
}
```

Komponentlər funksionallıq əsasında parçalana bilər və digər komponenlərdə işlənə bilərlər. Komponentlər digər komponentlər, massivlər, mətnlən, və rəqəmlər qaytara bilərlər. Əgər UI-ın bir hissəsi bir neçə dəfə işlədilirsə (Button, Panel, Avatar) və ya UI təklikdə mürəkkəbdirsə (App, FeedStory, Comment), bu UI-ı yenidən işlədilə bilən komponent etmək olar. Komponent adları həmişə böyük hərf ilə başlamalıdırlar (`<wrapper/>` **yox** `<Wrapper/>`). Komponenləri render etmək haqqında əlavə məlumat üçün [bu sənədə](/docs/components-and-props.html#rendering-a-component) baxın. 

### [`props`](/docs/components-and-props.html) {#props}

`props` React komponenti üçün arqumentlərdir. Proplar ana komponentdən uşaq komponentə göndərilən məlumatlardır.

Nəzərə alın ki, `props` həmişə oxunabiləndir (readonly). Proplar heç bir formada dəyişdirilməməlidirlər:

```js
// Yanlış!
props.number = 42;
```

Əgər siz istifadəçi daxil olması və ya şəbəkə cavabı əsasında bir dəyəri dəyişmək istəyirsinizsə `state`-dən istifadə edin.

### `props.children` {#propschildren}

`props.children` bütün komponentlərdə mövcuddur. Bu komponentin açılma və bağlanma təqləri arasında olan konenti ehtiva edir. Məsələn:

```js
<Welcome>Salam Dünya!</Welcome>
```

`Salam Dünya!` mətni `Welcome` komponentinin `props.children` propunda yərləşdirilir:

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

Klas komponentlərində `this.props.children` dəyişənindən istifadə edin:

```js
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

Komponentdə hər hansı bir məlumat vaxt ilə dəyişirsə `state`-dən istifadə etmək lazımdır. Məsələn, `Checkbox` komponentina `isChecked` state-i və `NewsFeed` komponentinə şəbəkən yüklənmiş `fetchedPosts` state-i lazım ola bilər.

`state` və `props` arasındaki əsas fərq `props`-un ana komponentindən göndərilir. `state` isə komponentin daxilindən idarə edilir. Komponent `props`-u dəyişə bilmir. Amma `state`-i dəyişə bilir.

Dəyişən hər bir məlumat üçün, state-ə "yiyə duran" bir komponent olmalıdır. İki fərqli komponentin state-ini sinxronizasiya etməyin. Əvəzinə, state-i ən yaxın valideynə [qaldırıb](/docs/lifting-state-up.html) hər iki komponentə proplar kimi göndərin.

## [Lifecycle Methods](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Lifecycle methods are custom functionality that gets executed during the different phases of a component. There are methods available when the component gets created and inserted into the DOM ([mounting](/docs/react-component.html#mounting)), when the component updates, and when the component gets unmounted or removed from the DOM.

 ## [Controlled](/docs/forms.html#controlled-components) vs. [Uncontrolled Components](/docs/uncontrolled-components.html)

React has two different approaches to dealing with form inputs. 

An input form element whose value is controlled by React is called a *controlled component*. When a user enters data into a controlled component a change event handler is triggered and your code decides whether the input is valid (by re-rendering with the updated value). If you do not re-render then the form element will remain unchanged.

An *uncontrolled component* works like form elements do outside of React. When a user inputs data into a form field (an input box, dropdown, etc) the updated information is reflected without React needing to do anything. However, this also means that you can't force the field to have a certain value.

In most cases you should use controlled components.

## [Keys](/docs/lists-and-keys.html) {#keys}

A "key" is a special string attribute you need to include when creating arrays of elements. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside an array to give the elements a stable identity.

Keys only need to be unique among sibling elements in the same array. They don't need to be unique across the whole application or even a single component.

Don't pass something like `Math.random()` to keys. It is important that keys have a "stable identity" across re-renders so that React can determine when items are added, removed, or re-ordered. Ideally, keys should correspond to unique and stable identifiers coming from your data, such as `post.id`.

## [Refs](/docs/refs-and-the-dom.html) {#refs}

React supports a special attribute that you can attach to any component. The `ref` attribute can be an object created by [`React.createRef()` function](/docs/react-api.html#reactcreateref) or a callback function, or a string (in legacy API). When the `ref` attribute is a callback function, the function receives the underlying DOM element or class instance (depending on the type of element) as its argument. This allows you to have direct access to the DOM element or component instance.

Use refs sparingly. If you find yourself often using refs to "make things happen" in your app, consider getting more familiar with [top-down data flow](/docs/lifting-state-up.html).

## [Events](/docs/handling-events.html) {#events}

Handling events with React elements has some syntactic differences:

* React event handlers are named using camelCase, rather than lowercase.
* With JSX you pass a function as the event handler, rather than a string.

## [Reconciliation](/docs/reconciliation.html) {#reconciliation}

When a component's props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM. This process is called "reconciliation".

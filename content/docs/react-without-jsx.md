---
id: react-without-jsx
title: JSX-siz React
permalink: docs/react-without-jsx.html
---

<div class="scary">

> These docs are old and won't be updated. Go to [react.dev](https://react.dev/) for the new React docs.

</div>

React işlətmək üçün JSX quraşdırmaq tələb olunmur. Yaranma mühitində kompilyasiya prosesi quraşdırmaq istəmədikdə React-i JSX-siz işlətmək əlverişlidir.

JSX elementləri `React.createElement(component, props, ...children)` funksiyası üçün asan sintaksisdir. Bu səbəbdən, JSX-də mümkün olan bütün əməliyyatlar, sadə JavaScript ilə yazıla bilər.

Məsələn, JSX-də yazılmış kod:

```js
class Hello extends React.Component {
  render() {
    return <div>Salam {this.props.toWhat}</div>;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="Dünya" />);
```

JSX işlətməyən bu koda kompilyasiya olunur:

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Salam ${this.props.toWhat}`);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'Dünya'}, null));
```

JSX-in JavaScript-ə çevrilməsi haqqında əlavə nümunələr üçün [onlayn Babel kompilyatorundan](babel://jsx-simple-example) istifadə edə bilərsiniz.

Təmin olunan komponent mətn, `React.Component`-in alt sinfi və ya sadə funksiya ola bilər.

`React.createElement` ifadəsini çox yazmaqdan bezmisinizsə bu funksiyanı qısa adlı dəyişənə təyin edə bilərsiniz:

```js
const e = React.createElement;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e('div', null, 'Hello World'));
```

`React.createElement` funksiyasını qısaldılmış formada istifadə etmək React-i JSX-siz işlətmək üçün əlverişli ola bilər.

Alternativ olaraq, terser sintaksisi təmin edən [`react-hyperscript`](https://github.com/mlmorg/react-hyperscript) və [`hyperscript-helpers`](https://github.com/ohanhi/hyperscript-helpers) kimi cəmiyyət layihələrindən istifadə edə bilərsiniz.


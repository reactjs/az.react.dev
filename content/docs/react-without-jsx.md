---
id: react-without-jsx
title: JSX-siz React
permalink: docs/react-without-jsx.html
---

React işlətmək üçün JSX quraşdırmaq tələb olunmur. Yaranma mühitində kompilyasiya prosesi quraşdırmaq istəmədikdə React-i JSX-siz işlətmək əlverişlidir.

JSX elementləri `React.createElement(component, props, ...children)` funksiyası üçün asan sintaksisdir. Bu səbəbdən, JSX-də mümkün olan bütün əməliyyatlar, sadə JavaScript ilə yazıla bilər.

Məsələn, JSX-də yazılmış kod:

```js
class Hello extends React.Component {
  render() {
    return <div>Salam {this.props.toWhat}</div>;
  }
}

<<<<<<< HEAD
ReactDOM.render(
  <Hello toWhat="Dünya" />,
  document.getElementById('root')
);
=======
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Hello toWhat="World" />);
>>>>>>> 38bf76a4a7bec6072d086ce8efdeef9ebb7af227
```

JSX işlətməyən bu koda kompilyasiya olunur:

```js
class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Salam ${this.props.toWhat}`);
  }
}

<<<<<<< HEAD
ReactDOM.render(
  React.createElement(Hello, {toWhat: 'Dünya'}, null),
  document.getElementById('root')
);
=======
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Hello, {toWhat: 'World'}, null));
>>>>>>> 38bf76a4a7bec6072d086ce8efdeef9ebb7af227
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


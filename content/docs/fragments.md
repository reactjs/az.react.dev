---
id: fragments
title: Fraqmentlər
permalink: docs/fragments.html
prev: context.html
next: portals.html
---

React-də ümumi pattern çoxlu elementlərə komponentin qayıtması üçündür. Fraqmentlər sizə DOM-a nodelar əlavə etmədən uşaqların siyahısını qruplaşdırmağa imkan verir.

```js
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
```

Burada həmçinin onları bəyan etmək üçün yeni [qısa sintaksis](#short-syntax) var.

## Motivasiya {#motivation}

Komponentlərdə uşaqlar siyahısını qaytarmaq çox işlənən bir patterndir. React-in kod parçası misalına baxın:

```jsx
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
```

Render edilmiş HTML-in etibarlı olması üçün `<Columns />` çoxsaylı `<td>` elementlərinə qayıtmalı ola bilərlər. Əgər valideyn div `<Columns />`-un `render()`-inin daxilində istifadə olunubsa, onda nəticələnən HTML etibarsızdır.

```jsx
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
```

yekun `<Table />` nəticəsi:

```jsx
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
```

Fraqmentlər bu problemi həll edir.

## İstifadə {#usage}

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```

hansıki düzgün `<Table />` nəticəsi ilə yekunlaşacaq:

```jsx
<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```

### Qısa Sintaksis {#short-syntax}

Fraqmentləri bəyan etmək üçün yeni qısa sintaksis istifadə edə bilərsiniz. Bu boş təqlərə bənzəyir:

```jsx{4,7}
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
```

Siz `<></>` digər elementləri işlətdiyiniz üsulla istifadə edə bilərsiniz, yalnız bu açarları və atributları dəstəkləmir.

### Açarlı Fraqmentlər {#keyed-fragments}

Açıq `<React.Fragment>` sintaksisi ilə bəyan olunmuş fraqmentlərin açarları ola bilər. Buna misal kolleksiyanın fraqmentlər massivi ilə uzlaşdırılması ola bilər -- məsələn, təsvir siyahısının yaratmaq:

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // `key`-siz React açar xəbərdarlığı göndərəcək
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```

`key` tək atributdur ki, `Fragment`-ə ötürülə bilər. Gələcəkdə biz dəstək üçün hadisə işləyiciləri kimi əlavə atributlar əlavə edə bilərik. 

### Live Demo {#live-demo}

Siz yeni JSX fraqment sintaksisini [CodePen](https://codepen.io/reactjs/pen/VrEbjE?editors=1000) ilə yoxlaya bilərsiniz.

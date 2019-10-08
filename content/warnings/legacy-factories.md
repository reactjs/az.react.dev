---
title: React Element Zavodları və JSX Xəbərdarlığı
layout: single
permalink: warnings/legacy-factories.html
---

Komponenti sadə funksiya çağırışı ilə çağırdıqda bu xəbərdarlıq göstərilir. Bu formada komponentləri çağırmaq köhnəlib:

```javascript
var MyComponent = require('MyComponent');

function render() {
  return MyComponent({ foo: 'bar' });  // XƏBƏRDARLIQ
}
```

## JSX {#jsx}

React komponentlərinin bu formada birbaşa çağrılması dəstəklənmir. Əvəzinə [JSX istifadə edin](/docs/jsx-in-depth.html).

```javascript
var React = require('react');
var MyComponent = require('MyComponent');

function render() {
  return <MyComponent foo="bar" />;
}
```

## JSX-siz İstifadə {#without-jsx}

Əgər JSX istifadə etmək istəmirsinizsə və ya istifadə edə bilmirsinizsə komponenti çağırmamışdan öncə zavod ilə əhatə etməlisiniz:

```javascript
var React = require('react');
var MyComponent = React.createFactory(require('MyComponent'));

function render() {
  return MyComponent({ foo: 'bar' });
}
```

Əgər sizdə çoxlu funksiya çağırışları varsa bu kodu yenilmənənin asan yoludur.

## JSX-siz Dinamik Komponentlər {#dynamic-components-without-jsx}

Əgər komponent klasını dinamik mənbədən alırsınızsa dərhal çağrılacaq komponent üçün zavod yaratmaq lazımsız ola bilər. Əvəzinə elementi birbaşa yaradın:

```javascript
var React = require('react');

function render(MyComponent) {
  return React.createElement(MyComponent, { foo: 'bar' });
}
```

## Dərindən {#in-depth}

[Bu səbəbi NİYƏ etdiyimiz haqqında məlumat üçün bu yazını oxuyun.](https://gist.github.com/sebmarkbage/d7bce729f38730399d28)

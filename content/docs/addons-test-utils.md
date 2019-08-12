---
id: test-utils
title: Test Vasitələri
permalink: docs/test-utils.html
layout: docs
category: Reference
---

**İdxal Etmək**

```javascript
import ReactTestUtils from 'react-dom/test-utils'; // ES6
var ReactTestUtils = require('react-dom/test-utils'); // NPM ilə ES5
```

## İcmal {#overview}

`ReactTestUtils`, React komponentlərini öz seçdiyiniz freymvorklarda test etməyi asanlaşdırır. Javascript-i əziyyətsiz test etmək üçün, biz Facebook-da [Jest-dən](https://facebook.github.io/jest/) istifadə edirik. Jest-in veb səhifəsində olan [React dərsliyindən istifadə edərək](https://jestjs.io/docs/tutorial-react) Jest-dən istifadə etməyə başlayın.

> Qeyf:
>
> Biz [React Testing Library](https://testing-library.com/react) kitabxanasından istifadə etməyi tövsiyyə edirik. Bu kitabxana, son istifadəçilərin komponentləri istifadə etdiyi kimi testləri yazmağa təşviq edir və imkan yaradır.
>
> Alternativ olaraq, Airbnb-in test etmək üçün yaratdığı [Enzyme](https://airbnb.io/enzyme/) qurğusundan istifadə edə bilərsiniz. Bu qurğu React komponentləri asan şəkildə test etməyə imkan yaradır.

 - [`act()`](#act)
 - [`mockComponent()`](#mockcomponent)
 - [`isElement()`](#iselement)
 - [`isElementOfType()`](#iselementoftype)
 - [`isDOMComponent()`](#isdomcomponent)
 - [`isCompositeComponent()`](#iscompositecomponent)
 - [`isCompositeComponentWithType()`](#iscompositecomponentwithtype)
 - [`findAllInRenderedTree()`](#findallinrenderedtree)
 - [`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass)
 - [`findRenderedDOMComponentWithClass()`](#findrendereddomcomponentwithclass)
 - [`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag)
 - [`findRenderedDOMComponentWithTag()`](#findrendereddomcomponentwithtag)
 - [`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype)
 - [`findRenderedComponentWithType()`](#findrenderedcomponentwithtype)
 - [`renderIntoDocument()`](#renderintodocument)
 - [`Simulate`](#simulate)

## Arayış {#reference}

### `act()` {#act}

Komponenti iddialara hazırlamaq üçün, komponenti render edən və yeniləyən kodu `act()` çağışının içində yerləşdirin. Bu sizin testlərinizin React-in brauzerdə işlədiyi kimi icra edilməsinə imkan yaradır.

>Qeyd
>
>Əgər siz `react-test-renderer` işlədirsinizsə, bu kitabxana da sizə eyni formada işləyən `act` funksiyası ilə təmin edir.

Məsələn, fərz edək ki, bizim olan `Counter` komponentimiz var:

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.title = `${this.state.count} dəfə tıklamısınız`;
  }
  componentDidUpdate() {
    document.title = `${this.state.count} dəfə tıklamısınız`;
  }
  handleClick() {
    this.setState(state => ({
      count: state.count + 1,
    }));
  }
  render() {
    return (
      <div>
        <p>{this.state.count} dəfə tıklamısınız</p>
        <button onClick={this.handleClick}>
          Tıkla
        </button>
      </div>
    );
  }
}
```

Bu komponenti aşağıdaki formada test edə bilərik:

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('counter-i render və yeniləyir', () => {
  // İlk renderi və componentDidMount-u test et
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('You clicked 0 times');
  expect(document.title).toBe('You clicked 0 times');

  // İkinci renderi və componentDidUpdate-i render et
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('1 dəfə tıkladınız');
  expect(document.title).toBe('1 dəfə tıkladınız');
});
```


Yaddan çıxarmayın ki, DOM hadisələri yalnız DOM konteyneri `document`-ə əlavə olduqdan sonra göndərilir. Kodun uzunluğunu azaltmaq üçün [React Testing Library](https://testing-library.com/react) kimi köməkçi kitabxanalardan istifadə edə bilərsiniz.

- The [`Reseptlər`](/docs/recipes.html) sənədində `act()`-in işləməyi haqqında misallar ilə daha ətraflı məlumat var.

* * *

### `mockComponent()` {#mockcomponent}

```javascript
mockComponent(
  componentClass,
  [mockTagName]
)
```

Mok olunmuş komponent modulunu göndərərək komponentə əlavə metodlar əlavə edin. Bu sizə komponenti dummy React komponenti kimi işlətməyə imkan yaradır. Həmişə render etdiyinizdən fərqli olaraq, komponent təmin edilən uşaqları olan sadə `<div>`-ə (və ya `mockTagName`-də təyin edilmiş bir təqə) çevriləcək.

> Qeyd:
>
> `mockComponent()` köhnə API-dır. Biz [`jest.mock()`](https://facebook.github.io/jest/docs/en/tutorial-react-native.html#mock-native-modules-using-jestmock) işlətməyi tövsiyyə edirik.

* * *

### `isElement()` {#iselement}

```javascript
isElement(element)
```

`element` React elementi olduqda `true` qaytarır.

* * *

### `isElementOfType()` {#iselementoftype}

```javascript
isElementOfType(
  element,
  componentClass
)
```

`element` `componentClass` tipli React elementi olduqda `true` qaytarır.

* * *

### `isDOMComponent()` {#isdomcomponent}

```javascript
isDOMComponent(instance)
```

`instance` DOM komponenti olduqda (`<div>` və ya `<span>` kimi) `true` qaytarır.

* * *

### `isCompositeComponent()` {#iscompositecomponent}

```javascript
isCompositeComponent(instance)
```

`instance` xüsusi yaradılmış komponent olduqda (klas və ya funksiya komponentləri kimi) `true` qaytarır.

* * *

### `isCompositeComponentWithType()` {#iscompositecomponentwithtype}

```javascript
isCompositeComponentWithType(
  instance,
  componentClass
)
```

`instance` `componentClass` tipli React komponenti olduqda `true` qaytarır.

* * *

### `findAllInRenderedTree()` {#findallinrenderedtree}

```javascript
findAllInRenderedTree(
  tree,
  test
)
```

`tree`-də olan bütün komponentlərdən keçib bütün `test(component)` `true` olan komponentləri toplayın. Bu funksiya təklikdə faydalı deyil. Amma digər test qurğuları üçün baza kimi işlədilə bilər.

* * *

### `scryRenderedDOMComponentsWithClass()` {#scryrendereddomcomponentswithclass}

```javascript
scryRenderedDOMComponentsWithClass(
  tree,
  className
)
```

Klas adları `className` olan, render edilmiş komponent ağacında bütün DOM elementləri tapın.

* * *

### `findRenderedDOMComponentWithClass()` {#findrendereddomcomponentwithclass}

```javascript
findRenderedDOMComponentWithClass(
  tree,
  className
)
```

[`scryRenderedDOMComponentsWithClass()`](#scryrendereddomcomponentswithclass) kimi amma yalnız bir nəticə qatarır. Birdən çox nəticə olduqda istisna atır.

* * *

### `scryRenderedDOMComponentsWithTag()` {#scryrendereddomcomponentswithtag}

```javascript
scryRenderedDOMComponentsWithTag(
  tree,
  tagName
)
```

Təq adları `tagName` olan, render edilmiş komponent ağacında bütün DOM elementləri tapın.

* * *

### `findRenderedDOMComponentWithTag()` {#findrendereddomcomponentwithtag}

```javascript
findRenderedDOMComponentWithTag(
  tree,
  tagName
)
```

[`scryRenderedDOMComponentsWithTag()`](#scryrendereddomcomponentswithtag) kimi amma yalnız bir nəticə qatarır. Birdən çox nəticə olduqda istisna atır.

* * *

### `scryRenderedComponentsWithType()` {#scryrenderedcomponentswithtype}

```javascript
scryRenderedComponentsWithType(
  tree,
  componentClass
)
```

Tipi `componentClass` olan bütün komponentlərin instansiyalarını tapın.

* * *

### `findRenderedComponentWithType()` {#findrenderedcomponentwithtype}

```javascript
findRenderedComponentWithType(
  tree,
  componentClass
)
```

[`scryRenderedComponentsWithType()`](#scryrenderedcomponentswithtype) kimi amma yalnız bir nəticə qatarır. Birdən çox nəticə olduqda istisna atır.

***

### `renderIntoDocument()` {#renderintodocument}

```javascript
renderIntoDocument(element)
```

Documentdən ayrılmış DOM noduna React elementini render edin. **Bu funksiya DOM-dan asılıdır.** Bu funksiyanın eqvivalenti aşağıdaki koda bənzəyir:

```js
const domContainer = document.createElement('div');
ReactDOM.render(element, domContainer);
```

> Qeyd:
>
> React-i **idxal etməmişdən öncə** `window`, `window.document` və `window.document.createElement` obyektləri qlobal mövcud olmalıdırlar. Əks halda React, DOM-un mövcud olmamasını fikirləşəcək və `setState` kimi funksiyalar işləməyəcək.

* * *

## Digər Qurğular {#other-utilities}

### `Simulate` {#simulate}

```javascript
Simulate.{eventName}(
  element,
  [eventData]
)
```

Məcburi olmayan `eventData` hadisə məlumatları ilə DOM noda Hadisə göndərilməsini simulyasiya edin.

[React-in anladığı hər hadisə üçün](/docs/events.html#supported-events) `Simulate`-də funksiya var.

**Elementi tıklamaq**

```javascript
// <button ref={(node) => this.button = node}>...</button>
const node = this.button;
ReactTestUtils.Simulate.click(node);
```

**Daxil olma sahəsinin dəyərini dəyişmək və klaviaturda ENTER düyməsini tıklamaq.**

```javascript
// <input ref={(node) => this.textInput = node} />
const node = this.textInput;
node.value = 'giraffe';
ReactTestUtils.Simulate.change(node);
ReactTestUtils.Simulate.keyDown(node, {key: "Enter", keyCode: 13, which: 13});
```

> Qeyd
>
> Komponentdə işlətdiniz bütün hadisə parametrlərini özünüz təmin etməlisiniz (məsələn, keyCode, which, və s...). Çünki, React bu parametrləri sizin üçün yaratmır.

* * *

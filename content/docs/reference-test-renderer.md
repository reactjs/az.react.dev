---
id: test-renderer
title: Test Renderer
permalink: docs/test-renderer.html
layout: docs
category: Reference
---

**İdxal Etmə**

```javascript
import TestRenderer from 'react-test-renderer'; // ES6
const TestRenderer = require('react-test-renderer'); // npm ilə ES5
```

## İcmal {#overview}

Bu paket, React komponentlərini Javascript obyektlərinə render etmək üçün, DOM və ya nativ mobil mühitindən asılı olmayan React renderer-i təmin edir.

Bu paket, React DOM və ya React Native komponentinin, brauzer və ya [jsdom](https://github.com/tmpvar/jsdom) olmadan render etdiyi platform görünüş iyerarxiyasının snəpşotunu asan formada çəkməyə imkan yaradır.

Məsələn:

```javascript
import TestRenderer from 'react-test-renderer';

function Link(props) {
  return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
  <Link page="https://www.facebook.com/">Facebook</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'https://www.facebook.com/' },
//   children: [ 'Facebook' ] }
```

JSON ağacının kopiyasını yadda saxlayıb testlərdə bu ağacın dəyişdiyini yoxlamaq üçün Jest-in snəpşot test xüsusiyyətindən istifadə edə bilərsiniz. [Əlavə məlumat üçün bura baxın](https://jestjs.io/docs/en/snapshot-testing).

Həmçinin siz nəticənin üzərindən keçib lazım olan nodları tapa bilər və bu nodlar üzərində iddialarınızı yoxlaya bilərsiniz.

```javascript
import TestRenderer from 'react-test-renderer';

function MyComponent() {
  return (
    <div>
      <SubComponent foo="bar" />
      <p className="my">Salam</p>
    </div>
  )
}

function SubComponent() {
  return (
    <p className="sub">Sub</p>
  );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "sub"}).children).toEqual(['Sub']);
```

### TestRenderer {#testrenderer}

* [`TestRenderer.create()`](#testrenderercreate)
* [`TestRenderer.act()`](#testrendereract)

### TestRenderer instansiyası {#testrenderer-instance}

* [`testRenderer.toJSON()`](#testrenderertojson)
* [`testRenderer.toTree()`](#testrenderertotree)
* [`testRenderer.update()`](#testrendererupdate)
* [`testRenderer.unmount()`](#testrendererunmount)
* [`testRenderer.getInstance()`](#testrenderergetinstance)
* [`testRenderer.root`](#testrendererroot)

### TestInstance {#testinstance}

* [`testInstance.find()`](#testinstancefind)
* [`testInstance.findByType()`](#testinstancefindbytype)
* [`testInstance.findByProps()`](#testinstancefindbyprops)
* [`testInstance.findAll()`](#testinstancefindall)
* [`testInstance.findAllByType()`](#testinstancefindallbytype)
* [`testInstance.findAllByProps()`](#testinstancefindallbyprops)
* [`testInstance.instance`](#testinstanceinstance)
* [`testInstance.type`](#testinstancetype)
* [`testInstance.props`](#testinstanceprops)
* [`testInstance.parent`](#testinstanceparent)
* [`testInstance.children`](#testinstancechildren)

## Arayış {#reference}

### `TestRenderer.create()` {#testrenderercreate}

```javascript
TestRenderer.create(element, options);
```

Göndərilən React elementi ilə `TestRenderer` instansiyası yaradın. Bunun real DOM-dan istifadə etməməsinə baxmayaraq, iddialarımızı yoxlaya bilmək üçün komponent ağacı yenə də bütünlüklə yaddaşa render edilir. Qaytarılan instansiyanın funksiya və parametrləri aşağıda göstərilib.

### `TestRenderer.act()` {#testrendereract}

```javascript
TestRenderer.act(callback);
```

 `TestRenderer.act`, [`react-dom/test-utils`-də olan `act()` köməkçisi kimi](/docs/test-utils.html#act) iddialarınızı yoxlamaq üçün komponentləri hazırlayır. `act()`-in bu versiyasını `TestRenderer.create` və `testRenderer.update` çağırışlarını əhatə etmək üçün işlədin.

```javascript
import {create, act} from 'react-test-renderer';
import App from './app.js'; // Test edilən komponent

// komponenti render et
let root; 
act(() => {
  root = create(<App value={1}/>)
});

// ana komponentin üzərində iddaları yoxlayın
expect(root.toJSON()).toMatchSnapshot();

// fərqli proplar ilə yeniləyin
act(() => {
  root = root.update(<App value={2}/>);
})

// ana komponentin üzərində iddaları yoxlayın
expect(root.toJSON()).toMatchSnapshot();
```

### `testRenderer.toJSON()` {#testrenderertojson}

```javascript
testRenderer.toJSON()
```

Render edilmiş ağacı təmsil edən obyekti qaytarır. Render edilmiş ağac yalnız `<div>` və ya `<View>` kimi platform-spesifik nodlardan ibarətdir. Bu ağacda istifadəçi tərəfindən yaranmış komponentlər olmur. [Snəpşot testi üçün](https://facebook.github.io/jest/docs/en/snapshot-testing.html#snapshot-testing-with-jest) faydalıdır.

### `testRenderer.toTree()` {#testrenderertotree}

```javascript
testRenderer.toTree()
```

Render edilmiş ağacı təmsil edən obyekti qaytarır. `toJSON()`-dan fərqli olaraq bu funksiya istifadəçi tərəfindən yaranmış komponentləri də obyektə daxil edir. Siz test renderer üzərində öz test kitabxananızı yazmırsınızsa bu funksiya sizə lazım deyil.

### `testRenderer.update()` {#testrendererupdate}

```javascript
testRenderer.update(element)
```

Yaddaşda olan ağacı yeni ana elementi ilə yenidən render edin. Bu funksiya React-in anada yenilənməsini simulyasiya edir. Əgər yeni elementin tipi və açarı keçmiş elementinki ilə eynidirsə ağac yenilənəcək. Əks halda yeni ağac mount olunacaq.

### `testRenderer.unmount()` {#testrendererunmount}

```javascript
testRenderer.unmount()
```

Yaddaşda olan ağacı unmount edib uyğun lifecycle hadisələrini çağırın.

### `testRenderer.getInstance()` {#testrenderergetinstance}

```javascript
testRenderer.getInstance()
```

Əgər mövcuddursa, ana elementin instansiyasını qaytarın. Əgər ana element funksiya komponentidirsə bu funksiya işləməyəcək. Çünki funksiya komponentlərinin instansiyaları olmur.

### `testRenderer.root` {#testrendererroot}

```javascript
testRenderer.root
```

Ağacda olan spesifik nodlar haqqında iddiaları yaratmaq üçün faydalı olan ana "test instansiya" obyektini qaytarın. Siz bu instansiya ilə dərində olan digər "test instansiyalarını" tapa bilərsiniz.

### `testInstance.find()` {#testinstancefind}

```javascript
testInstance.find(test)
```

`test(testInstance)` `true` qaytaran tək test instansiyasını tapın. Əgər `test(testInstance)` yalnız tək instansiya üçün `true` qaytarmırsa bu funksiya istisna atacaq.

### `testInstance.findByType()` {#testinstancefindbytype}

```javascript
testInstance.findByType(type)
```

Təmin edilən `type` ilə tək test instansiyasını tapın. Əgər təmin edilən `type` ilə yalnız tək instansiya yoxdursa bu funksiya istisna atacaq.

### `testInstance.findByProps()` {#testinstancefindbyprops}

```javascript
testInstance.findByProps(props)
```

Təmin edilən `props` ilə tək test instansiyasını tapın. Əgər təmin edilən `props` ilə yalnız tək instansiya yoxdursa, bu funksiya istisna atacaq.

### `testInstance.findAll()` {#testinstancefindall}

```javascript
testInstance.findAll(test)
```

`test(testInstance)` `true` qaytaran bütün test instansiyalarını tapın.

### `testInstance.findAllByType()` {#testinstancefindallbytype}

```javascript
testInstance.findAllByType(type)
```

Təmin edilən `type` ilə bütün test instansiyalarını tapın.

### `testInstance.findAllByProps()` {#testinstancefindallbyprops}

```javascript
testInstance.findAllByProps(props)
```

Təmin edilən `props` ilə bütün test instansiyalarını tapın.

### `testInstance.instance` {#testinstanceinstance}

```javascript
testInstance.instance
```

Göstərilən test instansiyasına uyğun olan komponent. Funksiya komponentlərinin instansiyaları olmadığından bu yalnız klas komponentləri üçün mövcuddur. Verilən komponentin `this` dəyəri ilə uyğundur.

### `testInstance.type` {#testinstancetype}

```javascript
testInstance.type
```

Test instansiyasının komponent tipi. Məsələn, `<Button />` komponentinin tipi `Button`-dır.

### `testInstance.props` {#testinstanceprops}

```javascript
testInstance.props
```

Test instansiyasına uyğun gələn proplar. Məsələn, `<Button size="small" />` komponentinin `{size: 'small'}` propları var.

### `testInstance.parent` {#testinstanceparent}

```javascript
testInstance.parent
```

Test instansiyasının ana test instansiyası.

### `testInstance.children` {#testinstancechildren}

```javascript
testInstance.children
```

Test instansiyasının uşaq test instansiyaları.

## İdeyalar {#ideas}

Xüsusi mok refləri düzəltmək üçün `TestRenderer.create`-ə `createNodeMock` funksiyasını göndərə bilərsiniz.
`createNodeMock` cari elementi qəbul edir və mok ref obyekti qaytarır.
Bu ref-lərdən asılı olan komponentləri test etmək üçün faydalıdır.

```javascript
import TestRenderer from 'react-test-renderer';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.input = null;
  }
  componentDidMount() {
    this.input.focus();
  }
  render() {
    return <input type="text" ref={el => this.input = el} />
  }
}

let focused = false;
TestRenderer.create(
  <MyComponent />,
  {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        // fokus funksiyasını mok edin
        return {
          focus: () => {
            focused = true;
          }
        };
      }
      return null;
    }
  }
);
expect(focused).toBe(true);
```

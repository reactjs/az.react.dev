---
id: typechecking-with-proptypes
title: PropTypes ilə Tip Yoxlamaları
permalink: docs/typechecking-with-proptypes.html
redirect_from:
  - "docs/react-api.html#typechecking-with-proptypes"
---

> Qeyd:
>
> React v15.5-dən başlayaraq `React.PropTypes` fərqli paketə köçürülüb. Əvəzinə [`prop-types` kitabxanasını](https://www.npmjs.com/package/prop-types) yükləyin.
>
>Köhnə PropTypes çağırışlarını yeni kitabxana çağırışlarına avtomatik çevirmək üçün [codemod skriptindən](/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes) istifadə edə bilərsiniz.

Applikasiya böyüdükcə tip yoxlamaları ilə bir çox baqı tutmaq asanlaşır. Bəzi applikasiyalarda tam tip yoxlamaları üçün JavaScript artırmaları olan [Flow](https://flow.org/) və ya [TypeScript](https://www.typescriptlang.org/) alətlərindən istifadə etmək mümkündür. Bu alətləri işlətmədikdə React-in daxili tip yoxlaması qabiliyyərindən istifadə edə bilərsiniz. Komponent proplarının tiplərini yoxlamaq üçün tipləri xüsusi `propTypes` parametrinə təyin edin:

```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Salam, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```

Bu nümunədə sinif komponentindən istifadə edirik. Lakin, bu xüsusiyyət funksiya komponentlərinə və [`React.memo`](/docs/react-api.html#reactmemo) və ya [`React.forwardRef`](/docs/react-api.html#reactforwardref) ilə yaranan komponentlərə də tətbiq edilə bilər.

Məlumatın etibarlı olmasını yoxlamaq üçün `PropTypes` paketi bir neçə validator ixrac edir. Yuxarıdakı nümunədə `PropTypes.string` validatorundan istifadə edilir. Prop etibarsız dəyər ilə təmin edildikdə JavaScript konsolunda xəbərdarlıq göstəriləcək. Performans üçün `propTypes` yalnız development modunda yoxlanılır.

### PropTypes {#proptypes}

Aşağıdakı nümunədə fərqli validatorlar haqqında məlumat var:

```javascript
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // Propun spesifik JS tipi olmasını bildirə bilərsiniz.
  // Standart formada prop dəyərləri fakultativdir.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Render oluna bilən istənilən tip işlədilə bilər: rəqəmlər, mətnlər
  // və bu elementləri (və ya fraqmentləri) saxlayan massivlər.
  optionalNode: PropTypes.node,

  // React elementi.
  optionalElement: PropTypes.element,

  // React element tipi (məsələn, MyComponent).
  optionalElementType: PropTypes.elementType,
  
  // Propun sinif instansiyası olmasını da bildirə bilərsiniz.
  // Bu, JS-in instanceof operatorundan istifadə edir.
  optionalMessage: PropTypes.instanceOf(Message),

  // Propa enum kimi davranaraq
  // propun spesifik dəyərlər qəbul etməsini təmin edə bilərsiniz
  optionalEnum: PropTypes.oneOf(['Xəbərlər', 'Fotolar']),

  // Obyekt bir neçə tip ola bilər
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // Müəyyən tipin massivi
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // Müəyyən tipin parametrləri əsasında obyekt
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // Xüsusi formalı obyekt
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // Əlavə parametrlərdə xəbərdarlıq göstərən obyekt
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // Prop təyin edilmədikdə xəbərdarlıq göstərmək üçün
  // prop tipinə `isRequired` əlavə edin
  requiredFunc: PropTypes.func.isRequired,

  // Dəyər istənilən tipdə ola bilər
  requiredAny: PropTypes.any.isRequired,

  // Xüsusi validator yaratmaq da mümkündür. Validasiya uğursuz olduqda
  // Error obyekti qaytarılmalıdır. `console.warn` çağırmayın və ya istisna atmayın.
  // Əks halda bu validator `oneOfType`-ın daxilində işləməyəcək.
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // Həmçinin, `arrayOf` və `objectOf`-a xüsusi validator təmin etmək mümkündür.
  // Validasiya uğursuz olduqda Error obyekti qaytarılmalıdır.
  // Validator massiv və ya obyektin hər açarında çağrılacaq. Validatorun ilk
  // arqumenti massiv və ya obyekt, ikinci arqumenti isə cari
  // elementin açarıdır.
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```

### Yalnız Bir Uşaq Tələbi {#requiring-single-child}

`PropTypes.element` ilə komponentə yalnız bir uşağın göndərilməsini bildirmək olar.

```javascript
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    // Bu yalnız bir element ola bilər. Əks halda xəbardarlıq göstəriləcək.
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```

### Təyin Edilməyən Prop Dəyərləri {#default-prop-values}

Komponentin `defaultProps` parametrinə dəyərlər təyin edərək təyin edilməyən propların dəyərlərini müəyyənləşdirmək mümkündür:

```javascript
class Greeting extends React.Component {
  render() {
    return (
      <h1>Salam, {this.props.name}</h1>
    );
  }
}

// Təyin edilməyən propların müəyyənləşdirilməsi:
Greeting.defaultProps = {
  name: 'Yabançı'
};

<<<<<<< HEAD
// "Salam, Yabançı" render edir:
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```

[transform-class-properties](https://babeljs.io/docs/plugins/transform-class-properties/) kimi Babel çevirməsindən istifadə etdikdə `defaultProps` komponent sinfin statik parametri kimi təyin edilə bilər. Bu sintaksis hələ yekunlaşmayıb və brauzerdə işləməsi üçün kompilyasiya addımı lazımdır. Əlavə məlumat üçün [sinif sahələri təklifi](https://github.com/tc39/proposal-class-fields) haqqında oxuyun.
=======
// Renders "Hello, Stranger":
const root = ReactDOM.createRoot(document.getElementById('example')); 
root.render(<Greeting />);
```

Since ES2022 you can also declare `defaultProps` as static property within a React component class. For more information, see the [class public static fields](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields#public_static_fields). This modern syntax will require a compilation step to work within older browsers. 
>>>>>>> d4e42ab21f0cc7d8b79d1a619654e27c79e10af6

```javascript
class Greeting extends React.Component {
  static defaultProps = {
    name: 'yabançı'
  }

  render() {
    return (
      <div>Salam, {this.props.name}</div>
    )
  }
}
```

`this.props.name` propu valideyn komponent tərəfindən təyin edilmədikdə dəyərinin boş olmaması üçün `defaultProps`-da yerləşən dəyər istifadə ediləcək. `propTypes` tip yoxlaması `defaultProps` həll olunduqdan sonra yoxlanılacaq. Bu səbəbdən, tip yoxlamaları `defaultProps`-a da tətbiq ediləcək.

### Funksiya Komponentləri {#function-components}

Funksiya komponentlərindən istifadə edirsinizsə, PropTypes-ın düzgün tətbiq olunması üçün bəzi kiçik dəyişiklər etməyi tövsiyyə edirik.

Sizin aşağıdalı formalı komponentinizin olduğunu fikirləşək:

```javascript
export default function HelloWorldComponent({ name }) {
  return (
    <div>Salam, {name}</div>
  )
}
```

PropTypes əlavə etmək üçün komponenti ixrac etmədən öncə komponenti yaradın:

```javascript
function HelloWorldComponent({ name }) {
  return (
    <div>Salam, {name}</div>
  )
}

export default HelloWorldComponent
```

Sonra PropTypes-ı birbaşa `HelloWorldComponent` komponentində təyin edin:

```javascript
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return (
    <div>Salam, {name}</div>
  )
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}

export default HelloWorldComponent
```

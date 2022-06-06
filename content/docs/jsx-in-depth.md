---
id: jsx-in-depth
title: Dərindən JSX
permalink: docs/jsx-in-depth.html
redirect_from:
  - "docs/jsx-spread.html"
  - "docs/jsx-gotchas.html"
  - "tips/if-else-in-JSX.html"
  - "tips/self-closing-tag.html"
  - "tips/maximum-number-of-jsx-root-nodes.html"
  - "tips/children-props-type.html"
  - "docs/jsx-in-depth-zh-CN.html"
  - "docs/jsx-in-depth-ko-KR.html"
---

Fundamental olaraq JSX, `React.createElement(component, props, ...children)` funksiyası üçün asan başa düşülə bilən sintaksisdir. Göstərilən JSX kodu:

```js
<MyButton color="blue" shadowSize={2}>
  Tıkla
</MyButton>
```

aşağıdakı koda kompilyasiya olunur:

```js
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Tıkla'
)
```

Əgər uşaqlar yoxdursa, təqin özü bağlanan formasından istifadə etmək mümkündür. Göstərilən kod:

```js
<div className="sidebar" />
```

aşağıdakı koda kompilyasiya olunur:

```js
React.createElement(
  'div',
  {className: 'sidebar'}
)
```

Hər hansı bir JSX-in JavaScript-ə necə çevrildiyini yoxlamaq üçün [onlayn Babel kompilyatorundan](babel://jsx-simple-example) istifadə edə bilərsiniz.

## React Element Tipinin Müəyyənləşdirilməsi {#specifying-the-react-element-type}

JSX təqinin ilk hissəsi React elementinin tipini təyin edir.

Böyük hərf ilə yazılan tiplər JSX təqinin React komponentinə istinad etdiyini göstərir. Bu təqlər dəyişənin adından istifadə edərək kompilyasiya olunur. Bu səbəbdən `<Foo />` JSX ifadəsindən istifadə etdikdə `Foo` dəyişəni göstərilən scope-da olmalıdır.

### React Scope-da Olmalıdır {#react-must-be-in-scope}

JSX kodu `React.createElement` çağırışlarına kompilyasiya olduğundan `React` hər zaman JSX-in scope-unda olmalıdır.

JavaScript-in `React` və `CustomButton` dəyişənlərinə birbaşa istinad etmədiyinə baxmayaraq, aşağıdakı kodda hər iki idxalın olması vacibdir:

```js{1,2,5}
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

JavaScript paketləmə qurğusundan istifadə etmir və React-i `<script>` təqi ilə yükləyirsinizsə, React artıq `React` qlobal dəyişəni ilə scope-dadır.

### JSX Tipində Nöqtənin İstifadəsi {#using-dot-notation-for-jsx-type}

JSX-dən React Komponentinə nöqtə ilə istinad etmək mümkündür. Bu sintaksis bir moduldan bir neçə React komponentini ixrac etdikdə faydalı ola bilər. Məsələn, `MyComponents.DatePicker` komponentini JSX-dən birbaşa çağıra bilərsiniz:

```js{10}
import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Burada {props.color} rəngli tarix olduğunu fikirləşin.</div>;
  }
}

function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />;
}
```

### İstifadəçi Tərəfindən Təyin Edilən Komponentlər Böyük Hərf ilə Yazılmalıdır {#user-defined-components-must-be-capitalized}

Element tipi kiçik hərf ilə yazıldıqda `<div>` və ya `<span>` kimi daxili komponentlərə istinad edilir. Nəticədə, `React.createElement` funksiyasına `'div'` və ya `'span'` kimi mətnlər göndərilir. `<Foo />` formasında böyük hərf ilə yazılan tiplər `React.createElement(Foo)` funksiyasına kompilyasiya olunur və JavaScript faylında təyin edilən və ya modula idxal edilən komponentə istinad edilir.

Biz komponentlərin böyük hərf ilə yazılmasını tövsiyə edirik. Əgər sizdə kiçik hərf ilə başlayan komponent varsa, bu komponenti böyük hərf ilə yazılmış dəyişənə təyin edib yeni dəyişəni JSX-də işlədin.

Məsələn, aşağıdakı kod istədiyiniz kimi işləməyəcək:

```js{3,4,10,11}
import React from 'react';

// Yanlışdır! Bu komponent böyük hərf ilə yazılmalıdır:
function hello(props) {
  // Düzdür! <div>-in etibarlı HTML təq olduğundan bu təq göstərildiyi formada işlədilə bilər:
  return <div>Salam {props.toWhat}</div>;
}

function HelloWorld() {
  // Yanlışdır! <hello /> kiçik hərf ilə yazıldığından React bu elementin HTML təq olduğunu fikirləşir:
  return <hello toWhat="World" />;
}
```

Bunu düzəltmək üçün, `hello` funksiyasının adını `Hello`-a dəyişib `<Hello />` JSX çağırışından istifadə edəcəyik:

```js{3,4,10,11}
import React from 'react';

// Düzdür! Bu funksiya komponentdir deyə böyük hərf ilə yazılmalıdır:
function Hello(props) {
  // Düzdür! <div>-in etibarlı HTML təq olduğundan bu təq göstərildiyi formada işlədilə bilər:
  return <div>Salam {props.toWhat}</div>;
}

function HelloWorld() {
  // Düzdür! <Hello /> böyük hərf ilə yazılıb deyə React bunun komponent olduğunu fikirləşir.
  return <Hello toWhat="Dünya" />;
}
```

### Tipin İcmal Zamanı Təyin Edilməsi {#choosing-the-type-at-runtime}

React tipinə ifadə təyin etmək mümkün deyil. Əgər ifadəni element tipi kimi göstərmək istəyirsinizsə, bu ifadəni böyük hərf ilə yazılmış dəyişənə təyin edin. Bu, adətən prop əsasında fərqli komponent render etdikdə lazım olur:

```js{10,11}
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Yanlışdır! JSX tipi ifadə ola bilməz.
  return <components[props.storyType] story={props.story} />;
}
```

Bunu düzəltmək üçün ifadəni böyük hərf ilə başlayan dəyişənə təyin edəcəyik:

```js{10-12}
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // Düzdür! JSX tipi böyük hərf ilə yazılan dəyişən ola bilər.
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

## JSX-də Proplar {#props-in-jsx}

JSX-də propları bir neçə formada göstərmək olar.

### Proplar kimi JavaScript İfadələri {#javascript-expressions-as-props}

Propu `{}` ilə əhatə edərək istənilən JavaScript ifadəsini propa göndərmək mümkündür. Məsələn, aşağıdakı JSX-də:

```js
<MyComponent foo={1 + 2 + 3 + 4} />
```

`1 + 2 + 3 + 4` ifadəsinin hesablandığından `MyComponent` komponentində `props.foo`-nun dəyəri `10` olacaq.

`if` ifadələri və `for` tsikllar JavaScript ifadələri deyil. Bu səbəbdən, bu dəyişənləri JSX-də birbaşa istifadə etmək olmaz. Əvəzinə, bu blok kodlarını JSX-i əhatə edən kodda yaza bilərsiniz. Məsələn:

```js{3-7}
function NumberDescriber(props) {
  let description;
  if (props.number % 2 == 0) {
    description = <strong>cüt</strong>;
  } else {
    description = <i>tək</i>;
  }
  return <div>{props.number} {description} rəqəmdir</div>;
}
```

Digər bölmələrdə [şərtli render edilmə](/docs/conditional-rendering.html) və [tsikllar](/docs/lists-and-keys.html) haqqında məlumat ala bilərsiniz.

### Mətn Propları {#string-literals}

Mətnləri prop kimi göndərmək mümkündür. Aşağıdakı JSX ifadələri əvəz oluna bilər:

```js
<MyComponent message="salam dünya" />

<MyComponent message={'salam dünya'} />
```

Mətn göndərdikdə, mətnin dəyəri HTML "escape" olunmur. Aşağıdalı dəyərlər əvəz oluna bilər:

```js
<MyComponent message="&lt;3" />

<MyComponent message={'<3'} />
```

Bu davranışların fərqi vacib deyil. Bu sənəddə göstərilməsinin əsas səbəbi tamamlıq üçündür.

### Propun Dəyəri Göstərilmədikdə "True" Olur {#props-default-to-true}

Propa heç bir dəyər göndərilmədikdə bu dəyər `true` olur. Aşağıdakı ifadələr əvəz oluna bilər:

```js
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

Normalda, biz propa dəyərin *göndərilməməsini* tövsiyə etmirik. Çünki, bu dəyər [ES6 obyekt qısaltması ilə](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015) çaşdırıla bilər. `{foo}` ifadəsi, `{foo: true}` ifadəsinin yox `{foo: foo}` ifadəsinin qısaldılmış formasıdır. Bu davranışın burada olmasının səbəbi HTML davranışı ilə uyğunlaşmasından gəlir.

### Yayma Atributlar {#spread-attributes}

<<<<<<< HEAD
`props` obyekt formasında olduqda `...` "yayma" operatorundan istifadə edərək bu obyekti bütünlükdə JSX-ə göndərə bilərsiniz. Aşağıdakı iki komponent əvəz oluna bilər:
=======
If you already have `props` as an object, and you want to pass it in JSX, you can use `...` as a "spread" syntax to pass the whole props object. These two components are equivalent:
>>>>>>> 9a5bf3e1f1c151720b3ce383fdd9743d4038b71e

```js{7}
function App1() {
  return <Greeting firstName="Elçin" lastName="Məmmədov" />;
}

function App2() {
  const props = {firstName: 'Elçin', lastName: 'Məmmədov'};
  return <Greeting {...props} />;
}
```

<<<<<<< HEAD
Siz həmçinin komponentin udduğu propları seçib digər propları yayma operatoru ilə göndərə bilərsiniz.
=======
You can also pick specific props that your component will consume while passing all other props using the spread syntax.
>>>>>>> 9a5bf3e1f1c151720b3ce383fdd9743d4038b71e

```js{2}
const Button = props => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("tıklandı!")}>
        Salam Dünya!
      </Button>
    </div>
  );
};
```

Yuxarıdakı nümunədə `kind` propu udulub DOM-da olan `<button>` elementinə göndərilmir.
Bütün digər proplara `...other` obyekti ötürülərək komponenti əyilən edir. Gördüyünüz kimi bu komponent `onClick` və `children` proplarını göndərir.

Yayma atributlarını faydalı olmasına baxmayaraq, bu operator ilə lazımsız propları komponentlərə göndərmək və ya etibarsız HTML atributlarını DOM-a göndərmək asanlaşır. Bu sintaksisdən az istifadə etməyi tövsiyə edirik.

## JSX-də Uşaqlar {#children-in-jsx}

Açma və bağlama təqləri olan bütün JSX ifadələrində olan kontent xüsusi prop ilə ötürülür: `props.children`. Uşaqları göndərməyin bir neçə yolu var:

### Mətnlər ilə {#string-literals-1}

Açma və bağlama təqlərinin arasına mətn təyin etdikdə `props.children` mətn olacaq. Bu, bir çox daxili HTML elementləri üçün faydalıdır. Məsələn:

```js
<MyComponent>Salam Dünya!</MyComponent>
```

Bu, etibarlı JSX ifadəsidir. `MyComponent`-in `props.children` propu `"Salam Dünya!"` mətni olacaq. HTML-in "escape" olunmadığından JSX kodunu HTML-dəki kimi yaza bilərsiniz:

```html
<div>Bu kod eyni zamanda etibarlı HTML &amp; JSX-dir.</div>
```

JSX avtomatik olaraq boşluqları sətrin əvvəlindən və axırından silir. Əlavə olaraq, JSX boş sətrləri də silir. Təqlərə bitişik olan yeni sətrlər də silinir. Mətnin ortasında olan yeni sətrlər bir boşluq ilə əvəz olunur. Aşağıdakı bütün ifadələr eyni mətni render edir:

```js
<div>Salam Dünya</div>

<div>
  Salam Dünya
</div>

<div>
  Salam
  Dünya
</div>

<div>

  Salam Dünya
</div>
```

### JSX Uşaqları {#jsx-children}

Siz digər JSX elementlərini də uşaq kimi göndərə bilərsiniz. Bu, iç-içə olan komponentləri göstərmək üçün faydalıdır:

```js
<MyContainer>
  <MyFirstComponent />
  <MySecondComponent />
</MyContainer>
```

Fərqli tipli uşaqları bir yerdə işlətmək mümkündür. Yəni, mətnləri JSX uşaqları ilə birlikdə işlədə bilərsiniz. Bu, JSX-i HTML-ə oxşadan xüsusiyyətlərdən biridir. Aşağıdakı kod həm etibarlı JSX, həm də etibarlı HTML-dir:

```html
<div>
  Bu siyahıdır:
  <ul>
    <li>Element 1</li>
    <li>Element 2</li>
  </ul>
</div>
```

React komponenti elementlər massivi də qaytara bilir:

```js
render() {
  // Sihayı elementlərini əlavə element ilə əhatə etmək lazım deyil!
  return [
    // Açarları yaddan çıxarmayın :)
    <li key="A">Birinci element</li>,
    <li key="B">İkinci element</li>,
    <li key="C">Üçüncü element</li>,
  ];
}
```

### Uşaqlar kimi JavaScript İfadələri {#javascript-expressions-as-children}

Uşaqları `{}` ilə əhatə edərək istədiyiniz JavaScript ifadəsini uşaq kimi göndərə bilərsiniz. Məsələn, aşağıdakı ifadələr əvəz olunandır:

```js
<MyComponent>foo</MyComponent>

<MyComponent>{'foo'}</MyComponent>
```

Bu, adətən ixtiyari ölçüdə olan JSX ifadələri siyahısını render etmək üçün faydalıdır. Məsələn, aşağıdakı kod HTML siyahısı render edir:

```js{2,9}
function Item(props) {
  return <li>{props.message}</li>;
}

function TodoList() {
  const todos = ['finish doc', 'submit pr', 'nag dan to review'];
  return (
    <ul>
      {todos.map((message) => <Item key={message} message={message} />)}
    </ul>
  );
}
```

JavaScript ifadələri digər uşaq tipləri ilə birlikdə işlədilə bilər. Bu, mətn şablonlarını əvəz etmək üçün faydalıdır:

```js{2}
function Hello(props) {
  return <div>Salam {props.addressee}!</div>;
}
```

### Uşaqlar kimi Funksiyalar {#functions-as-children}

Normally, JSX-ə əlavə edilən JavaScript ifadələr mətnə, React elementinə, və ya bu tiplərin siyahısına hesablanır. Lakin, `props.children` propu başqa hər hansı prop kimi işədildiyindən, bu propa istənilən tipli məlumat göndərilə bilər (yalnız React-in render etmək üçün anladığı tipə yox). Məsələn, xüsusi komponent callback-i `props.children`-dan çağıra bilər:

```js{4,13}
// Uşaq callback-i numTimes qədər çağıraraq təkrarlanan komponent yaradır
function Repeat(props) {
  let items = [];
  for (let i = 0; i < props.numTimes; i++) {
    items.push(props.children(i));
  }
  return <div>{items}</div>;
}

function ListOfTenThings() {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>Elementin siyahıda yeri: {index}</div>}
    </Repeat>
  );
}
```

Xüsusi komponentin uşağına istənilən tipli məlumatı göndərmək olar. Vacib olan, React-in komponentin nəticəsindən yaranan elementi anlamasıdır. Uşaqların bu formada işlədilməsinin çox yayılmadığına baxmayaraq bu formada uşaqları işlədə bilərsiniz.

### Booleans, Null, və Undefined Nəzərə Alınmırlar {#booleans-null-and-undefined-are-ignored}

`false`, `null`, `undefined`, və `true` dəyərləri uşaqlar üçün etibarlıdır. Sadəcə olaraq, bu dəyərlər render olunmurlar. Aşağıdakı JSX ifadələri eyni markapı render edəcəklər:

```js
<div />

<div></div>

<div>{false}</div>

<div>{null}</div>

<div>{undefined}</div>

<div>{true}</div>
```

Bu, React elementlərini şərti render etmək üçün faydalıdır. Göstərilən JSX `showHeader` dəyişəni `true` olduqda `<Header />` komponentini render edir:

```js{2}
<div>
  {showHeader && <Header />}
  <Content />
</div>
```

Burada əsas istisna '0' rəqəmi kimi [bəzi "falsy" dəyərlərinin](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) React tərəfindən render edilməsidir. Məsələn, aşağıdakı nümunədə `props.messages` massivi boş olduqda '0' render edildiyi üçün istədiyiniz nəticəni ala bilməyəcəksiniz:

```js{2}
<div>
  {props.messages.length &&
    <MessageList messages={props.messages} />
  }
</div>
```

Bunu düzəltmək üçün `&&`-dən öncə olan ifadənin bolin olduğundan əmin olun:

```js{2}
<div>
  {props.messages.length > 0 &&
    <MessageList messages={props.messages} />
  }
</div>
```

Əksinə,`false`, `true`, `null`, və ya `undefined` dəyərlərinin nəticədə görunməyini istəyirsinizsə, [bu dəyərləri mətnə çevirməlisiniz](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#String_conversion):

```js{2}
<div>
  JavaScript dəyəri: {String(myVariable)}.
</div>
```

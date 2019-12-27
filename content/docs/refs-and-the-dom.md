---
id: refs-and-the-dom
title: Ref-lər və DOM
redirect_from:
  - "docs/working-with-the-browser.html"
  - "docs/more-about-refs.html"
  - "docs/more-about-refs-ko-KR.html"
  - "docs/more-about-refs-zh-CN.html"
  - "tips/expose-component-functions.html"
  - "tips/children-undefined.html"
permalink: docs/refs-and-the-dom.html
---

Ref-lər ilə render metodundan DOM-a və ya React elementlərinə istinad etmək mümkündür.

Normal React məlumat axınında valideyn komponentlərin uşaqlar ilə əlaqəsi üçün yeganə yol [proplardır](/docs/components-and-props.html). Uşaq komponenti dəyişmək üçün bu komponenti yeni proplar ilə render etmək lazımdır. Lakin, bəzi hallarda uşaq komponentini normal imperativ şəkildə məlumat axınından kənarda dəyişmək lazım olur. Dəyişiləcək uşaq komponenti React komponentinin instansiyası və ya DOM elementi ola bilər. React-də hər iki ssenari üçün çıxış yolu var.

### Ref-lərdən Nə Vaxt İstifadə Etmək Lazımdır {#when-to-use-refs}

Bir neçə ssenarilərdə ref-lərdən istifadə etmək faydalıdır:

* Fokusun, yazı seleksiyasının, və ya media ifasının idarə edilməsi.
* İmperativ animasiyaların çağırışı.
* 3-cü tərəfin DOM kitabxanaları ilə inteqrasiya edilməsi.

Deklarativ tətbiq edilə bilən əməliyyatlarda ref-lərdən istifadə etməkdən çəkinin.

Məsələn, `Dialog` komponentinə `open()` və ya `close()` metodlarını ifşa etmək əvəzinə bu komponentə `isOpen` propu göndərin.

### Ref-lərdən Çox İstifadə Etməyin {#dont-overuse-refs}

Applikasiyada "işləri həll etmək" üçün ref-lərdən istifadə etmək istəyə bilərsiniz. Əgər buna meyliniz varsa, state-in komponent iyerarxiyasına malik olması haqqda kritiki fikirləşin. Adətən, state-in iyerarxiyanın üst səviyyələrində yerləşdirilməsi aydın olur. Nümunələr üçün [State-in Qaldırılması](/docs/lifting-state-up.html) təlimatına baxın.

> Qeyd
>
> Aşağıdakı nümunələrdə React-in 16.3-cü versiyasında təqdim edilən `React.createRef()` API-ndan istifadə edilir. Əgər React-in əvvəlki versiyalarından istifadə edirsinizsə, [callback ref-lərindən](#callback-refs) istifadə etməyi tövsiyyə edirik.

### Ref-lərin Yaradılması {#creating-refs}

Ref-lər `React.createRef()` funksiyası ilə yaranaraq React elementlərinə `ref` atributu ilə qoşulur. Adətən, ref-lərin komponentin hər yerində istinad edilə bilməsi üçün komponent yarandılan zaman komponentin instansiya parametrinə təyin edilir.

```javascript{4,7}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

### Ref-lərin İstifadəsi {#accessing-refs}

Ref-i `render` funksiyasında olan elementə göndərdikdə noda göstərilən referansa ref-in `current` atributundan istinad etmək mümkündür.

```javascript
const node = this.myRef.current;
```

Ref-in dəyəri nodun tipinə görə dəyişir:

- `ref` atributunu HTML elementində işlətdikdə kontruktorda `React.createRef()` ilə yaradılan `ref` obyektinin `current` parametri DOM element obyektini qəbul edir.
- `ref` atributunu xüsusi klas komponentində işlətdikdə `ref` obyektinin `current` parametri mount olunan klasın instansiyasını qəbul edir.
- Funksiyaların instansiyaları olmadığından **`ref` atributunu funksiya komponentlərində işlətmək mümkün deyil**.

Aşağıdakı nümunələrdə bu tiplərin fərqləri göstəriləcək.

#### Ref-in DOM Elementinə Əlavə Edilməsi {#adding-a-ref-to-a-dom-element}

Aşağıdakı kodda DOM noduna referans etmək üçün `ref`-dən istifadə olunur:

```javascript{5,12,22}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // textInput DOM elementi üçün ref yarat
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // DOM API-ından istifadə edərək mətn anket sahəsinə fokus et
    // Qeyd: DOM noduna istinad edə bilmək üçün "current" parametrindən istifadə edirik
    this.textInput.current.focus();
  }

  render() {
    // React-ə <input> ref-ini konstruktorda yaratdığımız
    // `textInput` ilə əlaqələndirmək istədiyimizi bildiririk
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Mətn anket sahəsinə fokus et"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

Komponent mount olunduqda React `current` parametrini DOM elementi ilə təyin edəcək, unmount olunduqda isə bu parametri `null` ilə sıfırlayacaq. `ref` yenilikləri `componentDidMount` və ya `componentDidUpdate` lifecycle metodlarından öncə baş verir.

#### Ref-in Klas Komponentinə Əlavə Edilməsi {#adding-a-ref-to-a-class-component}

Yuxarıdakı `CustomTextInput` komponentini əhatə edərək mount olunan kimi tıklandığını simulyasiya etmək üçün bu komponentə ref qoşaraq daxilindəki `focusTextInput` funksiyasını əl ilə çağıra bilərik:

```javascript{4,8,13}
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />
    );
  }
}
```

Nəzərə alın ki, bu yalnız `CustomTextInput` komponentinin klas kimi təyin edildiyini zaman işləyir:

```js{1}
class CustomTextInput extends React.Component {
  // ...
}
```

#### Ref-lər və Funksiya Komponentləri {#refs-and-function-components}

Funksiyaların instansiyalarının olmadığından **Funksiya komponentlərində `ref` atributundan istifadə etmək mümkün deyil:**

```javascript{1,8,13}
function MyFunctionComponent() {
  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // Bu *işləməyəcək*!
    return (
      <MyFunctionComponent ref={this.textInput} />
    );
  }
}
```

Bu komponentə ref lazım olduqda komponenti klasa çevirin (state və ya lifecycle metodları lazım olduğu kimi).

Lakin, DOM elementi və ya klas komponentinə istinad edildiyi hallarda **funksiya komponentinin daxilindən `ref` atributunu işlətmək mümkündür**:

```javascript{2,3,6,13}
function CustomTextInput(props) {
  // ref-in buna istinad edə bilməsi üçün textInput burada təyin edildilməlidir
  let textInput = React.createRef();

  function handleClick() {
    textInput.current.focus();
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />
      <input
        type="button"
        value="Mətn anket sahəsinə fokus et"
        onClick={handleClick}
      />
    </div>
  );
}
```

### DOM Ref-lərinin Valideyn Komponentlərinə İfşa Edilməsi {#exposing-dom-refs-to-parent-components}

Bəzi nadir hallarda uşağın DOM noduna valideyn komponentdən istinad etmək lazım ola bilər. Bunun komponent inkapsulyasiyasını sındırdığından biz bunu tövsiyyə etmirik. Lakin, bu texnika ilə fokusu aktiv etmək və ya uşaq DOM nodunun ölçü və pozisiyalarını hesablamaq faydalı ola bilər.

[Ref-i uşaq komponentinə əlavə edə bildiyimizə](#adding-a-ref-to-a-class-component) baxmayaraq burada DOM nodu əvəzinə komponent instansiyasının əldə edildiyindən bu ideal həll olmaya bilər. Əlavə olaraq bunu funksiya komponentləri ilə işlətmək mümkün olmayacaq.

React-in 16.3-cü versiyasından başlayaraq biz bu hallar üçün [ref-lərin yönləndirilməsindən](/docs/forwarding-refs.html) istifadə edirik. **Ref yönləndirilməsi komponentə uşaq komponentinin ref-ini ifşa etməyə imkan yaradır**. Uşaq DOM nodunu valideyn komponentə ifşa etmək üçün detallı nümunə üçün [ref-lərin yönləndirilməsi sənədinə](/docs/forwarding-refs.html#forwarding-refs-to-dom-components) baxın.

Əgər React-in 16.2-dən aşağı versiyasını işlədir və ya ref yönləndirilməsindən daha çox azadlıq lazımdırsa, siz [bu alternativ yanaşmadan](https://gist.github.com/gaearon/1a018a023347fe1c2476073330cc5509) istifadə edərək ref-i fərqli adlı prop ilə göndərə bilərsiniz.

Biz, DOM nodlarının bu formada ifşa edilməsini tövsiyyə etmirik, amma bu çıxış yolu kimi faydalı ola bilər. Bu yanaşmanın işləməsi üçün uşaq komponentinə əlavə kodun əlavə olunacağını unutmayın. Əgər sizin uşaq komponentinin tətbiqi üzərində heç bir kontrolunuz yoxdursa, ən son yol kimi [`findDOMNode()`-dan](/docs/react-dom.html#finddomnode) istifadə edə bilərsiniz. Lakin, [`StrictMode`](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage) işlətdikdə bu funksiyanın istifadəsi mümkün deyil.

### Callback Ref-ləri {#callback-refs}

React ilə ref-ləri digər formada yaratmaq mümkündür. "Callback ref-ləri" adlanan bu ref-lər, ref-lərin yaradılması və silinməsi üçün daha çox kontrol təmin edir.

`createRef()` ilə yaranmış `ref` atributu göndərmək əvəzinə `createRef()` funksiya göndərilir. Bu funksiya arqumet kimi React komponent instansiyasını və ya HTML DOM elementini qəbul edir. 

Aşağıdakı nümunədə çox işlədilən ssenari tətbiq olunur: callback `ref`-dindən istifadə edərək DOM nodunun referansı instansiya parametrinə təyin edilir.

```javascript{5,7-9,11-14,19,29,34}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element;
    };

    this.focusTextInput = () => {
      // DOM API-ından istifadə edərək mətn anket sahəsinə fokus et
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // anket sahəsi mount olunduğu zaman avtomatik fokus et
    this.focusTextInput();
  }

  render() {
    // Callback `ref`-indən istifadə edərək mətn anket sahəsinin DOM elementini
    // instansiya sahəsinə (məsələn, this.textInput) təyin et.
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}
        />
        <input
          type="button"
          value="Mətn anket sahəsinə fokus et"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

Komponent mount olunduğu zaman React, `ref` callback-ini DOM elementi ilə, unmount olunduqda isə `null` ilə çağıracaq. Ref-lərin `componentDidMount` və ya `componentDidUpdate` çağrılmadan öncə yenilənməsi siğortalanır.

`React.createRef()` ilə yaranan obyekt ref-lərini komponentlər arasında göndərdiyimiz kimi callback ref-lərini də komponentlər arasında göndərmək mümkündür.

```javascript{4,13}
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}
      />
    );
  }
}
```

Yuxarıdakı nümunədə `Parent` komponenti ref callback-ini `CustomTextInput`-a `inputRef` propu ilə göndərir. `CustomTextInput` isə bu funksiyanı `<input>` elementinə xüsusi `ref` atributu ilə göndərir. Nəticədə, `Parent`-in `this.inputElement`-i `CustomTextInput`-da olan `<input>` elementinin DOM noduna istinad edəcək.

### Köhnə API: Mətn Ref-ləri {#legacy-api-string-refs}

Əgər React ilə çoxdandır işləyirsinizsə, sizə `ref`-in mətn olması (məsələn, `"textInput"` kimi) və DOM nodunun `this.refs.textInput` formada istifadə edilməsi olan köhnə API tanış gələ bilər. Mətn ref-lərinin [problemləri olduğundan](https://github.com/facebook/react/pull/8333#issuecomment-271648615), köhnə sayıldığından və *gələcək buraxılışlarda silinəcəyi ehtimal edildiyindən biz bu ref tipindən istifadə etməyi tövsiyyə etmirik. 

> Qeyd
>
> Əgər ref-lərdən istifadə etmək üçün `this.refs.textInput`-dan istifadə edirsinizsə, biz [callback pattern-indən](#callback-refs) və ya [`createRef` API-ından](#creating-refs) istifadə etməyi tövsiyyə edirik.

### Callback Ref-lərin Problemləri {#caveats-with-callback-refs}

`ref` callback-i eyni-sətrli funksiya kimi təyin edildikdə bu funksiya iki dəfə çağrılacaq: ilk öncə `null` ilə, sonra isə DOM elementi ilə. Bunun səbəbi, hər render zamanı funksiyanın yeni instansiyasının yaranması və React-in köhnə ref-i silib yenisini təyin etməsidir. Bu problemi həll etmək üçün `ref` callback-ini klas funksiyası kimi təyin edə bilərsiniz. Lakin, bir çox hallda bunun vacib olmadığını unutmayın.

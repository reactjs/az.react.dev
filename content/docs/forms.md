---
id: forms
title: Anketlər
permalink: docs/forms.html
prev: lists-and-keys.html
next: lifting-state-up.html
redirect_from:
  - "tips/controlled-input-null-value.html"
  - "docs/forms-zh-CN.html"
---

React-də HTML anket elementləri digər DOM elementlərindən fərqli işləyirlər. Çünki anket elementlərinin təbii şəkildə daxili vəziyyəti olur. Məsələn, gəlin sadə HTML-də yazılmış yalnız ad qəbul edən anketə baxaq:

```html
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Göndər" />
</form>
```

İstifadəçi bu anketi göndərdiyində cari səhifə yeni səhifəyə keçir. Bu standard HTML anket davranışıdır. Əgər siz React-də bu davranışı istəyirsinizsə əlavə heç nə etmək lazım deyil. Lakin, bir çox halda anketin göndərilməsini idarə edən və istifadəçinin daxil etdiyi məlumatlardan istifadə edə bilən funksiyanın olması əlverişlidir. Bu funksionallığı tətbiq etmək üçün "kontrol olunan komponentlərdən" istifadə edilir.

## Kontrol Olunan Komponentlər {#controlled-components}

HTML-də `<input>`, `<textarea>` və `<select>` kimi anket elementləri,. öz vəziyyətlərini saxlayır və istifadəçi daxil etməsi əsasında vəziyyəti yeniləyirlər. React-də isə dəyişən vəziyyət, komponentin state parametrində yerləşir və yalnız [`setState()`](/docs/react-component.html#setstate) ilə yenilənir.

Biz bu iki konsepsiyanı birləşdirib React state-ini "vahid həqiqət mənbəyi" edə bilərik. Nəticədə, anketi render edən React komponenti, sonrakı istifadəçi daxil etmələri əsasında anketdə nə baş verdiyini idarə edir. Dəyəri React tərəfindən idarə edilən anket sahə elementi "kontrol olunan komponent" adlanır.

Məsələn, əgər əvvəlki misalda istifadəçi anketi göndərdiyi zaman adı loq etmək istəyiriksə, anketi kontrol olunan komponent kimi yaza bilərik:

```javascript{4,10-12,24}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Göndərilən ad: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Ad:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Göndər" />
      </form>
    );
  }
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/VmmPgp?editors=0010)

Anket elementində `value` atributu təyin edildiyindən, anketin göstərdiyi dəyər həmişə `this.state.value` olacaq və React state-i anket üçün vahid həqiqə mənbəyi olacaq. `handleChange` hadisə işləyicisi hər klaviş tıklamasında çağrılıb React state-ini yenilədiyindən anket sahəsində göstərilən dəyər həmişə yeni olacaq.

Kontrol olunan komponentdə, hər state dəyişikliyi üçün uyğun olan idarə edici funksiya olur. Bu funksiya, istifadəçi daxil etməsinin dəyişməsini və təsdiq edilməsini asanlaşdırır. Məsələn, əgər yazılan adların böyük hərf ilə saxlanmasını istəyiriksə `handleChange` funksiyasını aşağıdaki kimi dəyişə bilərik:

```javascript{2}
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()});
}
```

## textarea Təqi {#the-textarea-tag}

HTML-də `<textarea>` elementinin yazısı uşaq tərəfindən təyin edilir:

```html
<textarea>
  Salam, bu yazı sahəsində yerləşən bir mətndir
</textarea>
```

React-də isə `<textarea>` üçün `value` atributundan istifadə edilir. Bu, `<textarea>` ilə bir-sətrli anket sahəsinin işləməsini uyğunlaşdırır:

```javascript{4-6,12-14,26}
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'Sevdiyiniz DOM elementi haqqında esse yazın.'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Göndərilən esse: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Esse:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Göndər" />
      </form>
    );
  }
}
```

Nəzərə alın ki, `this.state.value` konstruktorda inisializasiya olunduğundan yazı sahəsi hər hansı bir mətn ilə başlayacaq.

## select Təqi {#the-select-tag}

HTML-də drop-down siyahısı düzəltmək üçün `<select>`  işlədilir. Məsələn, aşağıda göstərilən HTML kodu dadlar üçün drop-down siyahısı düzəldir:

```html
<select>
  <option value="grapefruit">Qreypfrut</option>
  <option value="lime">Laym</option>
  <option selected value="coconut">Kokos</option>
  <option value="mango">Manqo</option>
</select>
```

Nəzərə alın ki, Kokos seçimində `selected` atributu olduğundan, bu seçim ilk seçilmiş olacaq. React-də `selected` atributu əvəzinə ana `select` təqinin `value` atributundan istifadə edilir. Kontrol olunan komponentdə yeniliyi yalnız bir yerdə təyin etmək əlverişlidir:

```javascript{4,10-12,24}
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coconut'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('Ən sevdiyiniz dad: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Sevdiyiniz dadı seçin:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Qreypfrut</option>
            <option value="lime">Laym</option>
            <option value="coconut">Kokos</option>
            <option value="mango">Manqo</option>
          </select>
        </label>
        <input type="submit" value="Göndər" />
      </form>
    );
  }
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/JbbEzX?editors=0010)

React, `<input type="text">`, `<textarea>` və `<select>` elementlərinin eyni formada işləməsini təmin edir. Kontrol olunan komponent tətbiq edə bilmək üçün bu elementlər `value` atributu qəbul edirlər.

> Qeyd
>
> `select` təqində bir neçə seçimi seçə bilmək üçün `value` atributuna massiv göndərə bilərsiniz:
>
>```js
><select multiple={true} value={['B', 'C']}>
>```

## Fayl daxil etmə Təqi {#the-file-input-tag}

HTML-də `<input type="file">` təqi istifadəçiyə bir və ya bir neçə faylı cihazın yaddaşından seçib serverə yükləməyə və ya [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) ilə JavaScript-də manipulyasiya etməyə icazə verir.

```html
<input type="file" />
```

Bu elementin dəyərinin yalnız oxuna bilən olduğundan, bu element React-də **kontrolsuz** komponent olur. [Gələcək sənədlərdə](/docs/uncontrolled-components.html#the-file-input-tag) bu və digər kontrolsuz komponentlərdən danışacağıq.

## Bir Neçə Daxil Olmanın İdarəsi {#handling-multiple-inputs}

Əgər bir neçə `input` elementini idarə etmək istəyirsinizsə hər elementə  `name` atributu əlavə edərək hadisə işləyicisinin `event.target.name` dəyəri əsasında hansı anket sahəsini yeniləyəcəyini müəyyənləşdirin.

Məsələn:

```javascript{15,18,28,37}
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Gedirsiniz:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Qonaqların sayı:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/wgedvV?editors=0010)

Nəzərə alın ki, lazım olan state açarını, verilən anket sahəsi adı əsasında yeniləmək üçün ES6 [hesablanmış parametr adı](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) sintaksisindən istifadə etmişik:

```js{2}
this.setState({
  [name]: value
});
```

Bu kodun ES5 eqvivalenti aşağıdaki formadadır:

```js{2}
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```

Əlavə olaraq `setState()` avtomatik olaraq [yarı state-i cari state-ə birləşdirdiyindən](/docs/state-and-lifecycle.html#state-updates-are-merged), biz bu funksiyanı yalnız dəyişən dəyərlər ilə çağıra bilirik.

## Null Dəyərli Daxil Olmanın İdarəsi {#controlled-input-null-value}

[Kontrol olunan komponentin](/docs/forms.html#controlled-components) `value` propunu təyin etdikdə istifadəçinin anket sahəsini dəyişməsini idarə edə bilərsiniz. Əgər `value` təyin edildiyindən asılı olmayaraq anket sahəsinin dəyəri dəyişə bilirsə, siz istəmədən `value`-nu `undefined` və `null` ilə təyin etmiş ola bilərsiniz.

Aşağıdaki kod bu problemi göstərir. (Anket sahəsi ilkin olaraq dəyişə bilmir amma bir zamandan sonra dəyişə bilir.)

```javascript
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);

```

## Kontrol Olunan Komponentlərə Alternativlər {#alternatives-to-controlled-components}

Hər bir məlumat dəyişikliyi üçün hadisə işləyicisi yazmaq və bütün daxil olma state-lərini React komponentindən keçirmək yorucu ola bilər. Mövcud kodu React-ə çevirdikdə və ya React applikasiyasını React olmayan kitabxana ilə inteqrasiya etdikdə bu problem xüsusi ilə yorucu ola bilər. Belə hallarda anket sahələrini başqa formada idarə etmək üçün [kontrolsuz komponentləri](/docs/uncontrolled-components.html) gözdən keçirin.

## Tam Yazılmış Həll {#fully-fledged-solutions}

Əgər sizə təsdiq etməsi olan, ziyarət edilən elementləri izləyə bilən və anket göndərməsini idarə edən tam həll lazımdırsa, ən populyar olan [Formik](https://jaredpalmer.com/formik) kitabxanasına baxın. Lakin bu kitabxana state-in idarə edilməsi və kontrol olunan komponentlərin prinsipləri əsasında düzəldilib. Bu səbəbdən bu konsepsiyaları öyrənməkdən çəkinməyin.

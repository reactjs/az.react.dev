---
id: uncontrolled-components
title: Kontrolsuz Komponentlər
permalink: docs/uncontrolled-components.html
---

Biz çox halda, anketləri tətbiq etmək üçün [kontrol olunan komponentlər](/docs/forms.html) işlətməyi tövsiyyə edirik. Kontrol olunan komponentlərdə anket məlumatları React komponenti tərəfindən idarə olunur. Buna alternativ kontrolsuz komponentlərdir. Bu komponentlərdə anket məlumatları DOM tərəfindən idarə olunur.

Kontrolsuz komponent yazmaq üçün bütün state yenilikləri üçün hadisə işləyiciləri yazmaq əvəzinə DOM-dan anket dəyərlərini almaq üçün [ref-dən istifadə edə bilərsiniz](/docs/refs-and-the-dom.html).

Məsələn, açağıdakı kodda kontrol olunmayan komponent birtək ad qəbul edir:

```javascript{5,9,18}
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('Göndərilən ad: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Ad:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Göndər" />
      </form>
    );
  }
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/WooRWa?editors=0010)

Kontrolsuz komponentlərdə həqiqət mənbəyi DOM-da saxlanır. Bu səbədən React və React olmayan kodları kontrol komponentlərdən istifadə edərək inteqrasiya etmək daha asandır. Tez kod yazmaq üçün kontrolsuz komponentlər daha az koda səbəb ola bilər. Əks halda, kontrol olunan komponentlərdən istifadə edin.

Əgər xüsusi vəziyyətdə hansı tipli komponenti işlətməyi bilmirsinizsə [kontrol olunan və kontrolsuz anket sahələrinin müqayisəsi yazını](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) faydalı tapa bilərsiniz.

### Təyin Olunmayan Dəyərlər {#default-values}

React-in render zamanı, anket elementlərinin `value` atribut dəyəri DOM dəyərlərininin üzərindən yazılacaq. Kontrolsuz komponentlərdə təyin olunmayan dəyərlərin React tərəfindən bildirilməsini, sonrakı yeniliklərin isə kontrolsuz olmasını istəyə bilərsiniz. Bu ssenari üçün `value` atributu yerinə `defaultValue` atributundan istifadə edə bilərsiniz.

```javascript{7}
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Ad:
        <input
          defaultValue="Kamal"
          type="text"
          ref={this.input} />
      </label>
      <input type="submit" value="Göndər" />
    </form>
  );
}
```

Eyni formada, `<input type="checkbox">` və `<input type="radio">` elementləri `defaultChecked`, `<select>` və `<textarea>` elementləri isə `defaultValue` atributlarını dəstəkləyirlər.

## Fayl anket sahəsi Təqi {#the-file-input-tag}

İstifadəçinin sistem yaddaşından bir və ya bir neçə faylı seçib serverə yükləmək və ya [Fayl API-ı](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) ilə JavaScript-də manipulyasiya etmək üçün HTML  `<input type="file">` təqindən istifadə edilir:

```html
<input type="file" />
```

`<input type="file" />` elementinin dəyəri yalnız istifadəçi (proqram tərəfindən mümkün deyil) tərəfindən təyin edilir. Bu səbəbdən, bu element React-də həmişə kontrolsuz komponentdir.

Bu fayllar ilə işləyə bilmək üçün Fayl API-ından istifadə edin. Aşağıdakı nümunədə, göndərmə işləyicisindən fayllar ilə işləyə bilmək üçün [DOM noduna ref](/docs/refs-and-the-dom.html) əlavə olunur:

`embed:uncontrolled-components/input-type-file.js`

[](codepen://uncontrolled-components/input-type-file)


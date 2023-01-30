---
id: uncontrolled-components
title: Kontrolsuz Komponentlər
permalink: docs/uncontrolled-components.html
---

<<<<<<< HEAD
Biz çox halda, anketləri tətbiq etmək üçün [kontrol olunan komponentlər](/docs/forms.html#controlled-components) işlətməyi tövsiyə edirik. Kontrol olunan komponentlərdə anket məlumatları React komponenti tərəfindən idarə olunur. Buna alternativ kontrolsuz komponentlərdir. Bu komponentlərdə anket məlumatları DOM tərəfindən idarə olunur.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [`<input>`](https://beta.reactjs.org/reference/react-dom/components/input)
> - [`<select>`](https://beta.reactjs.org/reference/react-dom/components/select)
> - [`<textarea>`](https://beta.reactjs.org/reference/react-dom/components/textarea)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

In most cases, we recommend using [controlled components](/docs/forms.html#controlled-components) to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

Kontrolsuz komponent işlətdikdə DOM-dan anket dəyərlərini almaq üçün hadisə işləyiciləri ilə state-i yeniləmək əvəzinə [ref-dən istifadə edə bilərsiniz](/docs/refs-and-the-dom.html).

Məsələn, aşağıdakı kodda kontrol olunmayan komponent tək ad qəbul edir:

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

Kontrolsuz komponentlərdə həqiqət mənbəyi DOM-da saxlanır. Bu səbədən, kontrolsuz komponentlər ilə React və React olmayan kodları inteqrasiya etmək daha asandır. Komponentlər kontrolsuz olduqda yazılmış kodun həcmi daha kiçik ola bilər. Əks halda, kontrol olunan komponentlərdən istifadə edin.

Əgər xüsusi ssenaridə hansı tipli komponenti işlətməyi bilmirsinizsə, [kontrol olunan və kontrolsuz anket sahələrinin müqayisəsi yazısını](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) faydalı tapa bilərsiniz.

### Təyin Olunmayan Dəyərlər {#default-values}

React-in render zamanı anket elementlərinin `value` atribut dəyəri DOM dəyərlərininin üzərindən yazılacaq. Kontrolsuz komponentlərdə təyin olunmayan dəyərlərin React tərəfindən bildirilməsini sonrakı yeniliklərin isə kontrolsuz olmasını istəyə bilərsiniz. Bu ssenari üçün `value` atributu yerinə `defaultValue` atributundan istifadə edə bilərsiniz. Komponent mount olunduqdan sonra `defaultValue` atributu dəyişdikdə DOM elementinin dəyəri yenilənməyəcək.

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

İstifadəçi tərəfindən seçilmiş fayllar üzərində əməliyyatlar üçün Fayl API-ından istifadə edin. Aşağıdakı nümunədə, göndərmə işləyicisindən fayllardan istifadə edə bilmək üçün [DOM noduna ref](/docs/refs-and-the-dom.html) əlavə olunur:

`embed:uncontrolled-components/input-type-file.js`

[](codepen://uncontrolled-components/input-type-file)


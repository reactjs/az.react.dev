---
id: render-props
title: Render Etmə Propları
permalink: docs/render-props.html
---

["render prop"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) termini React komponentləri arasında kod paylaşması üçün dəyəri funksiya olan propu istifadə etmək texnikasına istinad edir.

Render Etmə propu olan komponent React elementi qaytaran funksiya qəbul edir və öz render etmə məntiqi tətbiq etmək əvəzinə bu funksiyanı çağırır.

```jsx
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

Render Etmə propları işlədən kitabxanalara [React Router](https://reacttraining.com/react-router/web/api/Route/render-func), [Downshift](https://github.com/paypal/downshift) və [Formik](https://github.com/jaredpalmer/formik) daxildir.

Bu sənəddə, render etmə proplarının faydasından və bu texnikanın necə tətbiq edilməsindən danışacağıq.

## Problemləri Cross-Cut etmək üçün Render Etmə Proplarından istifadə edin {#use-render-props-for-cross-cutting-concerns}

Komponentlərin React-də kodları paylaşmaq üçün əsas vahid olmasına baxmayaraq bir komponentdə yerləşən state və ya davranışı digər komponentlər ilə paylaşmaq aydın olmaya bilər.

Məsələn, aşağıdakı komponent veb applikasiyada maus pozisiyasını izləyir:

```js
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        <h1>Mausu tərpədin!</h1>
        <p>Mausun cari pozisiyası: ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}
```

Kursoru ekranda tərpətdikdə yuxarıdakı komponent kursorun koordinatlarını (x, y) `<p>` elementinin daxilində göstərəcək.

İndi əsas sualımız: Bu davranışı digər komponentdə necə istifadə edə bilərəm? Digər sözlə, kursor pozisiyası digər komponentə lazım olduqda biz bu davranışı bu komponent ilə paylaşmaq üçün bu davranışı inkapsulyasiya edə bilərik?

Komponentlərin kod paylaşması üçün mexanizm olduğundan gəlin yuxarıdakı kodu refaktorinq edərək göstərilən davranışı inkapsulyasiya edən `<Maus>` komponent yaradaq.

```js
// <Mouse> komponenti bizə lazımolan davranışı inkapsulyasiya edir...
class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/* ...burada <p>-dən fərqli elementi necə render edə bilərəm? */}
        <p>Mausun cari pozisiyası: ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Mausu tərpədin!</h1>
        <Mouse />
      </div>
    );
  }
}
```

İndi, `<Mouse>` komponenti `mousemove` hadisələrinə qulaq asan və kursorun (x, y) pozisiyasını saxlayan bütün davranışları inkapsulyasiya edir. Lakin, bu komponent tam yenidən işlədilə bilən deyil.

Məsələn, fərz edək ki, bizdə mausu təqib edən pişik şəklini render edən `<Cat>` komponenti var. Biz, komponentin şəkli ekranın harasında yerləşdirməsi üçün komponentə mausun koordinatlarını `<Cat mouse={{ x, y }}>` propu ilə bildirmək istəyə bilərik.

İlk baxışda siz `<Cat>` komponentini *`<Mouse>`-un `render` funksiyasında* yerləşdirmək istəyə bilərsiniz:

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class MouseWithCat extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Biz burada <p>-in əvəzinə <Cat> işlədə bilərik... lakin,
          bu yanaşma ilə mausu işlədən hər komponent üçün <MouseWithSomethingElse>
          komponenti yaratmalı olacağıq. Bu səbədən, <MouseWithCat>
          komponenti yenidən işlədilə bilən deyil.
        */}
        <Cat mouse={this.state} />
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Mausu tərpədin!</h1>
        <MouseWithCat />
      </div>
    );
  }
}
```

Bu yanaşma bizim xüsusi ssenarimiz üçün işləyəcək. Lakin, biz hələ ki, davranışın yenidən işlədilə bilən formada inkapsulyasiya edilməsi məqsədinə çatmamışıq. İndi, maus pozisiyasını işlədən hər fərqli ssenari üçün yeni komponent yaradıb (yəni, `<MouseWithCat>`-in yenisini) bu ssenariyə lazım olan elementləri render etməliyik.

Render Etmə propu işlətdikdə isə biz bu problemə başqa formada yanaşa bilirik: `<Mouse>` komponentinə `<Cat>` komponenti əlavə edərək komponentin render edəcəyi nəticəni dəyişmək əvəzinə biz `<Mouse>` komponentinə nəyin render ediləcəyinin dinamik şəkildə müəyyən edilməsi üçün funksiya propu (render etmə propu) göndərəcəyik.

```js
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          <Mouse> komponentinin nəyi render edəcəyini statik şəkildə təmin etmək əvəzinə `render` propundan istifadə edərək nəyin render ediləcəyini dinamik şəkildə müəyyənləşdir.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Mausu tərpədin!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

İndi, `<Mouse>` kodunu kopiyalayıb yeni komponentin `render` funksiyasına xüsusi ssenarini əhatə edən məntiq əlavə etmək əvəzinə, biz `<Mouse>` komponentinin nəyi render edəcəyini `render` propuna dəyər göndərərək müəyyənləşdirəcəyik.

Konkret olaraq **render etmə propu komponentin nəyi render edəcəyini bilmək üçün istifadə edilən funksiya propudur.**

Bu texnika ilə paylaşmaq istədiyimiz davranışı paylaşmaq çox asanlaşır. Bu davranışı əldə etmək üçün kursorun cari koordinatları (x, y) əsasında nəyin render ediləcəyini `render` propuna göndərərək `<Mouse>` komponentini render edin.

[Yüksək dərəcəli komponentləri](/docs/higher-order-components.html) (HOC) render etmə propu istifadə edərək sadə komponent ilə yaratmağın mümkün olduğunu nəzərə alın. Məsələn, əgər `<Mouse>` komponenti əvəzinə `withMouse` HOC-i istifadə etmək istəyirsinizsə, bu HOC-ni render etmə propu istifadə edərək `<Mouse>` komponenti ilə asanlıqla düzəldə bilərsiniz:

```js
// Əgər hər hansı səbəbə görə HOC lazımdırsa, siz bu HOC-ni
// render propu istifadə edərək sadə komponent ilə asanlıqla yarada bilərsiniz!
function withMouse(Component) {
  return class extends React.Component {
    render() {
      return (
        <Mouse render={mouse => (
          <Component {...this.props} mouse={mouse} />
        )}/>
      );
    }
  }
}
```

Bu səbəbdən hər iki yanaşmanı render etmə propları ilə tətbiq edə bilərsiniz.

## `render`-dən Fərqli Propların İşlədilməsi {#using-props-other-than-render}

Pattern-in adının "render propları" olmasına baxmayaraq *bu pattern-i işlətmək üçün propun adı `render` olmamalıdır*. Faktiki olaraq [komponentin nəyi render edəcəyini bilmək üçün istifadə olunan *hər hansı* prop texniki olaraq "render propudur"](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce).

Yuxarıdakı nümunələrdə `render` işlətməyimizə baxmayaraq biz asanlıqla `children` propundan da istifadə edə bilərdik!

```js
<Mouse children={mouse => (
  <p>Mausun pozisiyası: {mouse.x}, {mouse.y}</p>
)}/>
```

Əlavəm olaraq `children` propunu JSX elementinin "atributları" siyahısında göstərmək lazım deyil. Əvəzinə, funksiyasnı birbaşa elementin *daxilinə* əlavə edə bilərsiniz!

```js
<Mouse>
  {mouse => (
    <p>Mausun pozisiyası: {mouse.x}, {mouse.y}</p>
  )}
</Mouse>
```

Siz [react-motion](https://github.com/chenglou/react-motion) kitabxanasının bu API-dan istifadə etdiyini görə bilərsiniz.

Bu texnikanın biraz qeyri-adi olduğundan bu formalı API düzəltdikdə `chldren`-in funksiya olduğunu `propTypes`-da təyin edin.

```js
Mouse.propTypes = {
  children: PropTypes.func.isRequired
};
```

## Xəbərdarlıqlar {#caveats}

### Render Etmə Proplarını React.PureComponent ilə işlətdikdə diqqətli olun {#be-careful-when-using-render-props-with-reactpurecomponent}

Render propu işlədilən zaman render prop funksiyasını `render` funksiyasında yaratdıqda [`React.PureComponent`-in](/docs/react-api.html#reactpurecomponent) faydaları sıfırlana bilər. Bunun səbəbi, hər `render` çağırışının render propu üçün yeni funksiya yaratdığından dayaz prop müqayisəsinin yeni proplar üçün həmişə `false` qaytarmasıdır.

Məsələn, yuxarıdakı `<Mouse>` komponentini `React.Component`-dən yox, `React.PureComponent`-dən genişləndirdikdə bizim nümunəmiz aşağıdakı kimi olacaq:

```js
class Mouse extends React.PureComponent {
  // Əvvəlki tətbiq ilə eynidir...
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Mausu tərpədin!</h1>

        {/*
          Bu, yaxşı fikir deyil! `render` propunun
          dəyəri hər render etmə zamanı fərqli olacaq.
        */}
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```

Bu nümunədə, `<MouseTracker>` hər dəfə render edildikdə bu `<Mouse render>` propunun dəyəri üçün yeni funksiya yaradacaq. Nəticədə `<Mouse>`-un `React.PureComponent`-dən genişləndirilməsi sıfırlanacaq!

Bu problemi həll etmək üçün siz propu instansiya metodu kimi təyin edə bilərsiniz:

```js
class MouseTracker extends React.Component {
  // İnstansiya metodu kimi təyin edildikdə `this.renderTheCat`
  // həmişə *eyni* funksiyaya istinad edəcək
  renderTheCat(mouse) {
    return <Cat mouse={mouse} />;
  }

  render() {
    return (
      <div>
        <h1>Mausu tərpədin!</h1>
        <Mouse render={this.renderTheCat} />
      </div>
    );
  }
}
```

Propun statik təyin edilməsi mümkün olmadıqda (məsələn, komponentin state və ya proplarından istifadə etmək lazım olduqda) `<Mouse>` komponentini `React.Component`-dən genişləndirmək lazımdır.

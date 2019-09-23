---
id: portals
title: Portals
permalink: docs/portals.html
---

Portallar, valideyn komponentin DOM iyerarxiyasından kənarda olan DOM noduna uşaqları render etməyə imkan yaradır.  

```js
ReactDOM.createPortal(child, container)
```

İlk arqument (`child`), element, mətn, və ya fraqment kimi [render oluna bilən React uşağıdır](/docs/react-component.html#render). İkinci arqument isə (`container`) DOM elementidir.

## İstifadəsi {#usage}

Normalda, komponentin render funksiyasından element qaytardıqda bu element ən yaxın valideyn nodunun uşağı kimi DOM-a əlavə olunur:

```js{4,6}
render() {
  // React yeni div-i DOM-a əlavə edir və uşaqları bu elementə render edir
  return (
    <div>
      {this.props.children}
    </div>
  );
}
```

Halbuki, bəzən uşağı DOM-da fərqli yerə əlavə etmək faydalı ola bilər:

```js{6}
render() {
  // React yeni div *yaratmaq* əvəzinə uşaqları `domNode` elementinə əlavə edir.
  // `domNode` DOM-un yerindən asılı olmayan etibarlı DOM nodudur.
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  );
}
```

Portalları işlətməyin tipik ssenarilərdən biri validayen komponentinin `overflow: hidden` və `z-index` stilləri olması, uşaq komponentinin isə vizual olaraq konteynerdən çıxmasıdır. Məsələn, dialoqlar, hoverkartlar, və ya tooltiplər.

> Qeyd:
>
> Portallar ilə işlədikdə [klaviatur fokusunu idarə etmək](/docs/accessibility.html#programmatically-managing-focus) çox vacib olur.
>
> Modal dialoqları hamının istifadə edə bilməsi üçün [WAI-ARIA Modal Praktikalarından](https://www.w3.org/TR/wai-aria-practices-1.1/#dialog_modal) istifadə edin.

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/yzMaBd)

## Portallarda Hadisə Event Bubblinqi {#event-bubbling-through-portals}

Portalın hər hansı bir yerdə olmasına baxmayaraq, bu element bütün hallarda normal React uşağıdır. Kontekst kimi xüsusiyyətlər uşaqın portalda olmasına baxmayaraq işləyəcək. Bunun səbəbi portalın *DOM ağacındakı* yerindən asılı olmayaraq *React ağacında eyni yerdə yerləşir*.

Bu həmçinin hadisə bubblinqinə də aiddir. Portalda baş verən hadisələr *React ağacında* olan valideyn komponentlərə (*DOM ağacında* valideyn olmamağına baxmayaraq) yayılacaq. Aşağıdaki HTML strukturuna baxaq:

```html
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

`#app-root`-da olan `Parent` komponenti `#modal-root`-da olan qonşu komponentdən bubble olunan və tutulmayan hadisəni tuta biləcək.

```js{28-31,42-49,53,61-63,70-71,74}
// Bu iki konteyner DOM-da qonşudurlar
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Portal elementi Modal-ın uşaqları mount edildikdən
    // sonra DOM-a əlavə olunacaq. Bu deməkdir ki, uşaqlar
    // ayrılmış DOM noduna mount olacaqlar. Əgər uşaq
    // komponent DOM ağacına dərhal qoşulmalı (məsələn, 
    // DOM nodu ölçmək üçün) və ya uşaqlarda `autoFocus`
    // işlədirsə, Modal-a state əlavə edərək, uşaqları
    // Model-in DOM ağacına əlavə edildiyi zaman render edin.
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Bu funksiya, Child komponentində düymə tıklandığı
    // zaman çağrılıb, düymənin DOM-da birbaşa uşaq olmasına
    // baxmayaraq Parent-in state-ini yeniləyəcək
    this.setState(state => ({
      clicks: state.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Brauzerin Developer Alətlərində
          düymənin onClick-i olan div-in
          uşağı olmadığına baxın.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // Bu düymədə onClick atributu təyin edilməyib deyə 
  // tıklamaq hadisəsi valideynə bubble olacaq
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(<Parent />, appRoot);
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/jGBWpE)

Portalda bubble olunmuş hadisəni valideyn komponentində tutulması, portallardan asılı olmayan daha əyilən abstraksiyaların tətbiqinə imkan yaradır. Məsələn, `<Modal />` komponenti render edildikdə, bu komponentin portallar ilə tətbiq edilməyindən asılı olmayaraq valideyn bubble olunmuş hadisələri tuta bilər.

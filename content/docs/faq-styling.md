---
id: faq-styling
title: Stilləmə və CSS
permalink: docs/faq-styling.html
layout: docs
category: FAQ
---

### Komponentlərə CSS Klaslarını Necə Əlavə Edə Bilərəm? {#how-do-i-add-css-classes-to-components}

Mətni `className` propuna göndərin:

```jsx
render() {
  return <span className="menu navigation-menu">Menyu</span>
}
```

CSS klaslarının proplar və ya state-dən asılı olması normaldır:

```jsx
render() {
  let className = 'menu';
  if (this.props.isActive) {
    className += ' menu-active';
  }
  return <span className={className}>Menyu</span>
}
```

>Məsləhət
>
>Əgər siz bu formalı kodu çox yazırsınızsa, [classnames](https://www.npmjs.com/package/classnames#usage-with-reactjs) paketi ilə bu kodu sadələşdirə bilərsiniz.

### Eyni-sətrli Stillər İşlədə Bilərəm? {#can-i-use-inline-styles}

Bəli, stilləmək üçün [bu sənədə](/docs/dom-elements.html#style) baxın.

### Eyni-sətrli Stillər Pisdir? {#are-inline-styles-bad}

CSS klasları eyni-sətrli stillərdən daha tez işləyir.

### CSS-in-JS Nədir? {#what-is-css-in-js}

CSS-in kənar fayllarda tərtib edilməsi əvəzinə JavaScript-də tərtib edilməsi "CSS-in-JS" adlanır. CSS-in-JS kitabxanalarının müqayisəsinə [buradan](https://github.com/MicheleBertoli/css-in-js) baxın.

_Nəzərə alın ki, bu funksionallıq React-in bir hissəsi deyil -- 3-cü tərəfli kitabxanalar tərəfindən təmin edilir._ React-in stillərin necə işləməsi haqqında fikri yoxdur; əgər şübhəlisinizsə stilləri ayrı `*.css` faylında yaradıb [`className`](/docs/dom-elements.html#classname) ilə istinas edilməsi yaxşı başlanğıc nöqtəsidir.

### React-də Animasiya Edə Bilərəm? {#can-i-do-animations-in-react}

React ilə animasiya icra etmək mümkündür. [React Transition Group](https://reactcommunity.org/react-transition-group/), [React Motion](https://github.com/chenglou/react-motion) və ya [React Spring](https://github.com/react-spring/react-spring) kimi kitabxanalara baxın.

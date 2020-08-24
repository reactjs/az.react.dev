---
id: faq-styling
title: Stilləmə və CSS
permalink: docs/faq-styling.html
layout: docs
category: FAQ
---

### Komponentlərə CSS siniflərini necə əlavə edə bilərəm? {#how-do-i-add-css-classes-to-components}

Sinifləri mətn formasında `className` propuna göndərin:

```jsx
render() {
  return <span className="menu navigation-menu">Menyu</span>
}
```

Adətən, CSS sinifləri proplar və ya state-dən asılı olur:

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
>Əgər yuxarıdakı formalı kodu çox yazırsınızsa, [classnames](https://www.npmjs.com/package/classnames#usage-with-reactjs) paketi ilə bu kodu sadələşdirə bilərsiniz.

### Sətirdaxili stillər işlədə bilərəm? {#can-i-use-inline-styles}

Bəli, stilləmək haqqında məlumat üçün [bu sənədə](/docs/dom-elements.html#style) baxın.

### Sətirdaxili stillər pisdir? {#are-inline-styles-bad}

CSS sinifləri sətirdaxili stillərdən daha performanslıdır.

### CSS-in-JS nədir? {#what-is-css-in-js}

<<<<<<< HEAD
CSS-in kənar fayllarda tərtib edilməsi əvəzinə JavaScript istifadə edərək tərtib edilməsi metodu "CSS-in-JS" adlanır. CSS-in-JS kitabxanalarının müqayisəsinə [buradan](https://github.com/MicheleBertoli/css-in-js) baxın.
=======
"CSS-in-JS" refers to a pattern where CSS is composed using JavaScript instead of defined in external files.
>>>>>>> d16f1ee7958b5f80ef790265ba1b8711d4f228d6

_Nəzərə alın ki, bu funksionallıq React-in bir hissəsi deyil. Bu, üçüncü tərəfli kitabxanalar tərəfindən təmin edilir._ React, stillərin necə işlənməsi haqqında heç bir fikir vermir. Əgər seçim edə bilmirsinizsə, başlanğıc nöqtəsi kimi stilləri ayrı `*.css` fayllarında yaradıb [`className`](/docs/dom-elements.html#classname) ilə istifadə edə bilərsiniz.

### React-də animasiya edə bilərəm? {#can-i-do-animations-in-react}

React ilə animasiya icra etmək mümkündür. [React Transition Group](https://reactcommunity.org/react-transition-group/), [React Motion](https://github.com/chenglou/react-motion) və ya [React Spring](https://github.com/react-spring/react-spring) kimi kitabxanalara baxın.

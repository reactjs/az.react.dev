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

CSS-in kənar fayllarda tərtib edilməsi əvəzinə JavaScript istifadə edərək tərtib edilməsi metodu "CSS-in-JS" adlanır.

_Nəzərə alın ki, bu funksionallıq React-in bir hissəsi deyil. Bu, üçüncü tərəfli kitabxanalar tərəfindən təmin edilir._ React, stillərin necə işlənməsi haqqında heç bir fikir vermir. Əgər seçim edə bilmirsinizsə, başlanğıc nöqtəsi kimi stilləri ayrı `*.css` fayllarında yaradıb [`className`](/docs/dom-elements.html#classname) ilə istifadə edə bilərsiniz.

### React-də animasiya edə bilərəm? {#can-i-do-animations-in-react}

<<<<<<< HEAD
React ilə animasiya icra etmək mümkündür. [React Transition Group](https://reactcommunity.org/react-transition-group/), [React Motion](https://github.com/chenglou/react-motion) və ya [React Spring](https://github.com/react-spring/react-spring) kimi kitabxanalara baxın.
=======
React can be used to power animations. See [React Transition Group](https://reactcommunity.org/react-transition-group/), [React Motion](https://github.com/chenglou/react-motion), [React Spring](https://github.com/react-spring/react-spring), or [Framer Motion](https://framer.com/motion), for example.
>>>>>>> d4e42ab21f0cc7d8b79d1a619654e27c79e10af6

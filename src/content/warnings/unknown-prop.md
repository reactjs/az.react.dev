---
<<<<<<< HEAD:content/warnings/unknown-prop.md
title: Tanınmayan Prop Xəbərdarlığı
layout: single
permalink: warnings/unknown-prop.html
---
DOM elementini React-in leqal DOM atribut/parametri kimi tanımadığı prop ilə render etdikdə unknown-prop xəbərdarlığı göstəriləcək. DOM elementlərində saxta propların olmadığından əmin olun.
=======
title: Unknown Prop Warning
---

The unknown-prop warning will fire if you attempt to render a DOM element with a prop that is not recognized by React as a legal DOM attribute/property. You should ensure that your DOM elements do not have spurious props floating around.
>>>>>>> f37ef36b070730ce8abd68860388179ed4284638:src/content/warnings/unknown-prop.md

Bu xəbərdarlığın göstərilməsinin bir neçə səbəbi ola bilər:

<<<<<<< HEAD:content/warnings/unknown-prop.md
1. `{...this.props}` və ya `cloneElement(element, this.props)` işlədirsiniz? Komponent öz proplarını birbaşa uşaq elementinə göndərdikdə (məsələn, [propların köçürülməsi](/docs/transferring-props.html)) xəbərdarlıq baş verə bilər. Propları uşaq komponentə köçürdükdə, ana komponent tərəfindən şərh edilməli propları yönləndirmədiyinizdən əmin olun.
=======
1. Are you using `{...props}` or `cloneElement(element, props)`? When copying props to a child component, you should ensure that you are not accidentally forwarding props that were intended only for the parent component. See common fixes for this problem below.
>>>>>>> f37ef36b070730ce8abd68860388179ed4284638:src/content/warnings/unknown-prop.md

2. DOM-da standart olmayan DOM atributundan istifadə etidkə (məsələn, xüsusi məlumatı təmsil etmək üçün) xəbərdarlıq baş verə bilər. Əgər standart DOM elementinə xüsusi atribut qoşmaq istəyirsinizsə, [MDN-də](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) göstərildiyi kimi xüsusi data atributlarından istifadə edin.

<<<<<<< HEAD:content/warnings/unknown-prop.md
3. Təyin edilən atributu React tanımır. Çox guman ki, bu atribut React-in gələcək versiyalarında əlavə ediləcək. Lakin, hal-hazırda React-in tanımadığı bütün atributlar silinir və render edilmir.

4. React komponentini böyük hərflə yazılmadıqda xəbərdarlıq baş verə bilər. React, kiçik hərf ilə yazılan komponentləri DOM təqləri kimi qəbul edir. Çünki, [React-in JSX çeviricisi böyük və kiçik hərf konvensiyasından istifadə edərək istifadəçi tərəfindən təyin edilən komponentləri və DOM təqlərini fəqrləndirir](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

---

Bunu düzəltmək üçün kompozit komponentə aid olan bütün proplar kompozit tərəfindən udulub və uşaq komponentlərə göndərilməməlidir. Məsələn:
=======
3. React does not yet recognize the attribute you specified. This will likely be fixed in a future version of React. React will allow you to pass it without a warning if you write the attribute name lowercase.

4. You are using a React component without an upper case, for example `<myButton />`. React interprets it as a DOM tag because React JSX transform uses the upper vs. lower case convention to distinguish between user-defined components and DOM tags. For your own React components, use PascalCase. For example, write `<MyButton />` instead of `<myButton />`.

---

If you get this warning because you pass props like `{...props}`, your parent component needs to "consume" any prop that is intended for the parent component and not intended for the child component. Example:
>>>>>>> f37ef36b070730ce8abd68860388179ed4284638:src/content/warnings/unknown-prop.md

**Pis:** Gözlənilməz `layout` propu `div` təqinə göndərilir.

```js
function MyDiv(props) {
  if (props.layout === 'horizontal') {
    // Pis! Çünki siz "layout" <div>-in başa düşmədiyi propdur.
    return <div {...props} style={getHorizontalStyle()} />
  } else {
    // Pis! Çünki siz "layout" <div>-in başa düşmədiyi propdur.
    return <div {...props} style={getVerticalStyle()} />
  }
}
```

<<<<<<< HEAD:content/warnings/unknown-prop.md
**Yaxşı:** Yayma operatoru ilə lazımlı dəyişəni proplardan ayırıb qalan propları digər dəyişəndə saxlamaq mümkündür.
=======
**Good:** The spread syntax can be used to pull variables off props, and put the remaining props into a variable.
>>>>>>> f37ef36b070730ce8abd68860388179ed4284638:src/content/warnings/unknown-prop.md

```js
function MyDiv(props) {
  const { layout, ...rest } = props
  if (layout === 'horizontal') {
    return <div {...rest} style={getHorizontalStyle()} />
  } else {
    return <div {...rest} style={getVerticalStyle()} />
  }
}
```

**Yaxşı:** Siz həmçinin propları yeni obyektə təyin edib, yeni obyektdən lazımsız açarları silə bilərsiniz. Əmin olun ki, orijinal `this.props` obyektindən açarları silmirsiniz. Bu obyekt dəyişməzdir.

```js
function MyDiv(props) {
  const divProps = Object.assign({}, props);
  delete divProps.layout;

  if (props.layout === 'horizontal') {
    return <div {...divProps} style={getHorizontalStyle()} />
  } else {
    return <div {...divProps} style={getVerticalStyle()} />
  }
}
```

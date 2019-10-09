---
title: Tanınmayan Prop Xəbərdarlığı
layout: single
permalink: warnings/unknown-prop.html
---
DOM elementini React-in leqal DOM atribut/parametri kimi tanımadığı prop ilə render etdikdə unknown-prop xəbərdarlığı göstəriləcək. DOM elementlərində saxta propların olmadığından əmin olun.

Bu xəbərdarlığın göstərilməsinin bir neçə səbəbi ola bilər:

1. `{...this.props}` və ya `cloneElement(element, this.props)` işlədirsiniz? Komponent öz proplarını birbaşa uşaq elementinə göndərdikdə (məsələn, [propların köçürülməsi](/docs/transferring-props.html)) xəbərdarlıq baş verə bilər. Propları uşaq komponentə köçürdükdə, ana komponent tərəfindən şərh edilməli propları yönləndirmədiyinizdən əmin olun.

2. DOM-da standart olmayan DOM atributundan istifadə etidkə (məsələn, xüsusi məlumatı təmsil etmək üçün) xəbərdarlıq baş verə bilər. Əgər standart DOM elementinə xüsusi atribut qoşmaq istəyirsinizsə, [MDN-də](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) göstərildiyi kimi xüsusi data atributlarından istifadə edin.

3. Təyin edilən atributu React tanımır. Çox guman ki, bu atribut React-in gələcək versiyalarında əlavə ediləcək. Lakin, hal-hazırda React-in tanımadığı bütün atributlar silinir və render edilmir.

4. React komponentini böyük hərflə yazılmadıqda xəbərdarlıq baş verə bilər. React, kiçik hərf ilə yazılan komponentləri DOM təqləri kimi qəbul edir. Çünki, [React-in JSX çeviricisi böyük və kiçik hərf konvensiyasından istifadə edərək istifadəçi tərəfindən təyin edilən komponentləri və DOM təqlərini fəqrləndirir](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

---

Bunu düzəltmək üçün kompozit komponentə aid olan bütün proplar kompozit tərəfindən udulub və uşaq komponentlərə göndərilməməlidir. Məsələn:

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

**Yaxşı:** Yayma operatoru ilə lazımlı dəyişəni proplardan ayırıb qalan propları digər dəyişəndə saxlamaq mümkündür.

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

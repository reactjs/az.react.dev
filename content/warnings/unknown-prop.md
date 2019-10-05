---
title: Unknown Prop Warning
layout: single
permalink: warnings/unknown-prop.html
---
DOM elementini React-in leqal DOM atribut/parametri kimi tanımadığı prop ilə render etdikdə unknown-prop xəbərdarlığı göstəriləcək. DOM elementlərində saxta propların olmadığından əmin olun.

Bu xəbərdarlığın göstərilməsinin bir neçə səbəbi ola bilər:

1. Siz `{...this.props}` və ya `cloneElement(element, this.props)` işlədirsiniz? Komponentiniz öz proplarını birbaşa uşaq elementinə göndərir (məsələn. [propların köçürülməsi](/docs/transferring-props.html)). Propları uşaq komponentə köçürdükdə, ana komponent tərəfindən şərh edilməli propları yönləndirmədiyinizdən əmin olun.

2. DOM-da standart olmayan DOM atributundan istifadə edirsiniz (məsələn xüsusi məlumatı təmsil etmək üçün). Əgər standart DOM elementinə xüsusi atribut qoşmaq istəyirsinizsə, [MDN-də](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) göstərildiyi kimi xüsusi data atributlarından istifadə edin.

3. React göstərilən atributu tanımır. Çox guman ki, bu atribut React-in gələcək versiyalarında əlavə ediləcək. Lakin, hal hazırda React bütün tanınmayan atributları silir. Bu səbəbdən, bu atributlar React applikasiyasında render edilməyəcək.

4. Siz React componentini böyük hərflə yazmırsınız. React kiçik hərf ilə yazılan komponentləri DOM təqləri kimi qəbul edir. Çünki, [React JSX çevirəni böyük və kiçik hərf konvensiyasından istifadə edərək istifadəçi tərəfindən təyin edilən komponentləri və DOM təqlərini fəqrləndirir](/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

---

Bunu düzəltmək üçün kompozit komponentə aid olan bütün proplar kompozit tərəfindən udulsun və uşaq komponentlərə göndərilməsin. Məsələn:

**Pis:** Gözlənilməz `layout` propu `div` təqinə göndərilir.

```js
function MyDiv(props) {
  if (props.layout === 'horizontal') {
    // Pis! Çünki siz "layout"-un <div>-in başa düşmədiyi prop olduğunu bilirsiniz.
    return <div {...props} style={getHorizontalStyle()} />
  } else {
    // Pis! Çünki siz "layout"-un <div>-in başa düşmədiyi prop olduğunu bilirsiniz.
    return <div {...props} style={getVerticalStyle()} />
  }
}
```

**Yaxşı:** Yama operatur ilə lazımlı dəyişəni proplardan ayırıb, qalan propları digər dəyişəndə saxlamaq mümkündür.

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

**Yaxşı:** Siz həmçinin propları yeni obyektə təyin edib, yeni obyektdən lazımsız açarları silə bilərsiniz. Əmin olun ki, orijinal `this.props` obyektindən açarları silmirsiniz. Bu obyekt dəyişə bilməyəndir.

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

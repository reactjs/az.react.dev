---
title: PropTypes-ı Çağırmamaq Xəbərdarlığı
layout: single
permalink: warnings/dont-call-proptypes.html
---

> Qeyd:
>
> React v15.5-dən başlayaraq `React.PropTypes` fərqli paketə köçürülüb. Əvəzinə [`prop-types` kitabxanasını](https://www.npmjs.com/package/prop-types) yükləyin.
>
>Köhnə PropTypes çağırışlarını yeni kitabxana çağırışlarına avtomatik çevirmək üçün [codemod skriptindən](/blog/2017/04/07/react-v15.5.0.html#migrating-from-react.proptypes) istifadə edə bilərsiniz.

React-in gələcək əsas versiyalarında PropTypes validasiyalarını tətbiq edən kodlar produksiyadan silinəcək. Bu baş verdikdə, PropType validasiya funksiyalarını əl ilə çağıran kodlar produksiya zamanı silinməyib xəta yaradacaq.

### PropTypes-ı təyin ətmək hələdə mümkündür {#declaring-proptypes-is-still-fine}

PropTypes-ın normal istifadəsi hələ də dəstəklənir:

```javascript
Button.propTypes = {
  highlighted: PropTypes.bool
};
```

Burada heç nə dəyişmir.

### PropTypes-ı birbaşa çağırmayın {#dont-call-proptypes-directly}

React komponentlərinin annotasiya edilməsindən əlavə işlər üçün PropTypes-ın işlədilməsi artıq dəstəklənmir:

```javascript
var apiShape = PropTypes.shape({
  body: PropTypes.object,
  statusCode: PropTypes.number.isRequired
}).isRequired;

// Dəstəklənmir!
var error = apiShape(json, 'response');
```

Əgər sizə PropTypes-ı bu formada işlətmək lazımdırsa PropTypes-ın forkunu yaratmağı ([bu](https://github.com/aackerman/PropTypes) [iki](https://github.com/developit/proptypes) paket kimi) tövsiyyə edirik.

Bu xəbərdarlığı düzəltmədikdə React 16-da yazılmış applikasiya produksiyada sınacaq.

### PropTypes-ı birbaşa çağırmadıqda bu xəbərdarlığı görürsünüzsə {#if-you-dont-call-proptypes-directly-but-still-get-the-warning}

Xəbərdarlıqdan yaranan stək izini yoxlayın. Siz bu formada PropTypes-ı birbaşa çağıran komponenti tapacaqsınız. Adətən, bu xəbədarlıq React-in PropTypes kitabxanasını əhatə edən 3-cü tərəfin yaratdığı PropTypes kitabxanasından yarana bilər. Məsələn:

```js
Button.propTypes = {
  highlighted: ThirdPartyPropTypes.deprecated(
    PropTypes.bool,
    'Use `active` prop instead'
  )
}
```

Bu ssenaridə `ThirdPartyPropTypes.deprecated` funksiyası `PropTypes.bool` funksiyasını çağırır. Bu pattern-in özlüyündə normaldır. Lakin bu pattern səhv müsbətin yaranması ilə nəticələnə bilər. Çünki React PropTypes-ı birbaşa çağırdığınızı fikirləşir. Sonrakı bölmədə `ThirdPartyPropTypes` kimi kitabxananın bu problemi necə düzəldəcəyini başa salacağıq. Əgər bu kitabxana sizə məxsus deyilsə kitabxana yaradıcısını bu problemi düzəltməsi üçün məlumatlandırın.

### 3-cü tərəfin PropTypes kitabxanasında səhv müsbətin düzəlişi {#fixing-the-false-positive-in-third-party-proptypes}

Əgər 3-cü tərəfin PropTypes kitabxanasının yaradıcısınızsa və istifadəçilərə mövcud React PropTypes-ı əhatə etməyə imkan yaradırsınızsa, istifadəçilər sizin kitabxananızı işlətdikdə bu xəbərdarlığı görə bilərlər. Bu xəbərdarlıq React-in əl ilə çağrılan PropTypes çağırışlarını aşkar etmək üçün [göndərdiyi](https://github.com/facebook/react/pull/7132) sonuncu "gizli" arqumenti görməməsindən baş verir.

Bu problemi aşağıdaki formada düzəldə bilərsiniz. Biz [react-bootstrap/react-prop-types](https://github.com/react-bootstrap/react-prop-types/blob/0d1cd3a49a93e513325e3258b28a82ce7d38e690/src/deprecated.js) paketindən `deprecated` funksiyasını misal kimi gətirəcəyik. Cari tətbiqdə yalnız `props`, `propName`, və `componentName` arqumentləri göndərilir:

```javascript
export default function deprecated(propType, explanation) {
  return function validate(props, propName, componentName) {
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        warning(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName);
  };
}
```

Səhv müsbəti düzəltmək üçün PropType-a **bütün** arqumentləri göndərdiyinizdən əmin olun. Bunu ES6-ın `...rest` sintaksisi ilə asan formada tətbiq etmək mümkündür:

```javascript
export default function deprecated(propType, explanation) {
  return function validate(props, propName, componentName, ...rest) { // ...rest-ə fikir verin
    if (props[propName] != null) {
      const message = `"${propName}" property of "${componentName}" has been deprecated.\n${explanation}`;
      if (!warned[message]) {
        warning(false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName, ...rest); // və burada
  };
}
```

Bu arqumentlərin əlavəsi xəbərdarlığı susduracaq.

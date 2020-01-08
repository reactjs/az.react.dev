---
title: Etibarsız Hook Çağırışı Xəbərdarlığı
layout: single
permalink: warnings/invalid-hook-call-warning.html
---

 Siz hər halda aşağıdakı xəta mesajını gördüyünüz üçün bu səhifədəsiniz:

 > Hooks can only be called inside the body of a function component.

Bu mesajı görməyinizin üç səbəbi var:

1. Sizdə React və React DOM-un **versiyaları uyğun gəlmir**.
2. Siz, **[Hookların Qaydalarına](/docs/hooks-rules.html) riayət etmirsiniz**.
3. Sizdə eyni applikasiyada **React-in bir neçə kopiyası var**.

Gəlin hər ssenariyə baxaq.

## React və React DOM versiyalarının uyğunsuzluğu {#mismatching-versions-of-react-and-react-dom}

Siz, `react-dom` (< 16.8.0) və ya `react-native`-in (< 0.59) dəstəklənməyən versiyalarını işlətmiş ola bilərsiniz. Bu paketlərin versiyalarını bilmək üçün applikasiya direktoriyasından `npm ls react-dom` və ya `npm ls react-native` əmrlərini çağırın. Bu əmr birdən çox versiya göstərdikdə sizdə digər problemlər yarana bilər (aşağıda izah olunub).

## Hookların Qaydalarına Riayət Edilməməsi {#breaking-the-rules-of-hooks}

Hookları yalnız **React-in funksiya komponentini render etdikdə** çağırmaq mümkündür:

* ✅ Hookları funksiya komponentinin gövdəsinin yuxarısından çağırın.
* ✅ Hookları [xüsusi Hookun](/docs/hooks-custom.html) gövdəsinin yuxarısından çağırın.

**Bu qaydalar haqqında əlavə məlumat üçün [Hookların Qaydaları](/docs/hooks-rules.html) səhifəsinə baxın.**

```js{2-3,8-9}
function Counter() {
  // ✅ Yaxşı: Funksiya komponentinin yuxarısındadır
  const [count, setCount] = useState(0);
  // ...
}

function useWindowWidth() {
  // ✅ Yaxşı: Xüsusi Hookun yuxarısındadır
  const [width, setWidth] = useState(window.innerWidth);
  // ...
}
```

Qarışıqlığın olmaması üçün Hookları aşağıdakı ssenarilərdə işlətmək **dəstəklənmir**:

* 🔴 Hookları sinif komponentlərindən çağırmayın.
* 🔴 Hookları hadisə işləyicilərindən çağırmayın.
* 🔴 Hookları `useMemo`, `useReducer` və ya `useEffect` Hooklara göndərilən funksiyalardan çağırmayın.

Bu qaydalara riayət etmədikdə yuxarıdakı xətanı görəcəksiniz.

```js{3-4,11-12,20-21}
function Bad1() {
  function handleClick() {
    // 🔴 Pis: hadisə işləyicisinin daxilindədir (həll etmək üçün Hooku bu funksiyadan çıxarın!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad2() {
  const style = useMemo(() => {
    // 🔴 Pis: useMemo-un daxilindədir (həll etmək üçün Hooku bu funksiyadan çıxarın!)
    const theme = useContext(ThemeContext);
    return createStyle(theme);
  });
  // ...
}

class Bad3 extends React.Component {
  render() {
    // 🔴 Pis: sinif komponentindədir
    useEffect(() => {})
    // ...
  }
}
```

Bu səhvlərin bəzilərini tutmaq üçün [`eslint-plugin-react-hooks` plaginindən](https://www.npmjs.com/package/eslint-plugin-react-hooks) istifadə edə bilərsiniz.

>Qeyd
>
>[Xüsusi Hooklardan](/docs/hooks-custom.html) digər Hookları çağırmaq *mümkündür* (bu, xüsusi Hookların əsas məqsədidir). Bunun işləməsinin səbəbi xüsusi Hookların da funksiya komponentinin render edildiyi zaman çağrılmasıdır.


## Dublikat React {#duplicate-react}

Hookların işləməsi üçün `react-dom` paketi ilə applikasiya kodu eyni versiyalı `react` modulunu idxal etməlidir.

`react` idxalları iki fərqli ixrac obyekti tapdıqda siz bu xəbərdarlığı görəcəksiniz. Bu, `react` paketinin **təsadüfən iki kopiyası olduqda** baş verir.

Paket idarə etməsi üçün Node işlətdikdə layihə direktoriyasından React-in versiyasını yoxlamaq üçün aşağıdakı əmri icra edə bilərsiniz:

    npm ls react

Sizdə React-in birdən çox versiyası olduqda bunun niyə olduğunun səbəbini tapıb asılılıqlar ağacını düzəltməlisiniz. Məsələn, işlətdiyiniz hər hansı bir kitabxana `react`-i asılılıq kimi (peer asılılıq əvəzinə) təyin edə bilər. Bu kitabxana düzələnə kimi bu problemi düzəltmək üçün həllərdən biri [Yarn resolutions](https://yarnpkg.com/lang/en/docs/selective-version-resolutions/)-dır.

Bu problemi debaq etmək üçün bəzi loqları əlavə edib development serverini yenidən başlada bilərsiniz:

```js
// Bunu node_modules/react-dom/index.js faylına əlavə edin
window.React1 = require('react');

// Bunu komponent faylına əlavə edin
require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);
```

Bu, `false` qaytardıqda sizdə React-in iki versiyasının olduğunu biləcəksiniz. Cəmiyyət üzvlərinin tapdığı səbəblərə [bu issue-dan](https://github.com/facebook/react/issues/13991) baxa bilərsiniz.

Bəzən `npm link` və ya ekvivalentini işlətdikdə bu problem ilə uzlaşa bilərsiniz. Bu ssenaridə paketləmə qurğusu React-in iki versiyasını "görür" — applikasiya direktoriyasında və kitabxana direktoriyasında. `myapp` və `mylib` direktoriyalarının qardaş direktoriyalar olduğunu fərz etsək düzəlişlərdən biri `mylib` direktoriyasından `npm link ../myapp/node_modules/react` əmrini çağırmaqdır. Bu əmr ilə kitabxanaya eyni React versiyasını işlətməyi təyin edə bilərsiniz.

>Qeyd
>
>Normalda, React-in bir neçə müstəqi kopiyası ola bilər (məsələn, applikasiya və 3-cü tərəfin yaratdığı vidcet başqa versiyalar işlədə bilər). Bunun sınmasının əsas səbəbi `require('react')` idxalının, komponent və `react-dom`-da React-in fərqli kopiyasını tapmasıdır.

## Digər Səbəblər {#other-causes}

Əgər yuxarıdakı heç bir həll işləmirsə, sizə kömək edə bilməmiz üçün [bu issue-ya](https://github.com/facebook/react/issues/13991) komment atın. Bu problemi göstərə bilərək kiçik nümunə yaradın. Bu nümunəni düzəltdikcə problemi tapmaq şansınız da artacaq.

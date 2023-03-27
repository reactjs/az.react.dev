---
<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
title: Etibarsız Hook Çağırışı Xəbərdarlığı
layout: single
permalink: warnings/invalid-hook-call-warning.html
---

 Siz hər halda aşağıdakı xəta mesajını gördüyünüz üçün bu səhifədəsiniz:
=======
title: Rules of Hooks
---

You are probably here because you got the following error message:
>>>>>>> e5fd79cdbb296b87cab7dff17c3b7feee5dba96b:src/content/warnings/invalid-hook-call-warning.md

<ConsoleBlock level="error">

Hooks can only be called inside the body of a function component.

</ConsoleBlock>

Bu mesajı görməyinizin üç səbəbi var:

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
1. Sizdə React və React DOM-un **versiyaları uyğun gəlmir**.
2. Siz, **[Hookların Qaydalarına](/docs/hooks-rules.html) riayət etmirsiniz**.
3. Sizdə eyni applikasiyada **React-in bir neçə kopiyası var**.
=======
1. You might be **breaking the Rules of Hooks**.
2. You might have **mismatching versions** of React and React DOM.
3. You might have **more than one copy of React** in the same app.
>>>>>>> e5fd79cdbb296b87cab7dff17c3b7feee5dba96b:src/content/warnings/invalid-hook-call-warning.md

Gəlin hər ssenariyə baxaq.

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
## React və React DOM versiyalarının uyğunsuzluğu {#mismatching-versions-of-react-and-react-dom}

Siz, `react-dom` (< 16.8.0) və ya `react-native`-in (< 0.59) dəstəklənməyən versiyalarını işlətmiş ola bilərsiniz. Bu paketlərin versiyalarını bilmək üçün applikasiya direktoriyasından `npm ls react-dom` və ya `npm ls react-native` əmrlərini çağırın. Bu əmr birdən çox versiya göstərdikdə sizdə digər problemlər yarana bilər (aşağıda izah olunub).

## Hookların Qaydalarına Riayət Edilməməsi {#breaking-the-rules-of-hooks}

Hookları yalnız **React-in funksiya komponentini render etdikdə** çağırmaq mümkündür:

* ✅ Hookları funksiya komponentinin gövdəsinin yuxarısından çağırın.
* ✅ Hookları [xüsusi Hookun](/docs/hooks-custom.html) gövdəsinin yuxarısından çağırın.

**Bu qaydalar haqqında əlavə məlumat üçün [Hookların Qaydaları](/docs/hooks-rules.html) səhifəsinə baxın.**
=======
## Breaking Rules of Hooks {/*breaking-rules-of-hooks*/}

Functions whose names start with `use` are called [*Hooks*](/reference/react) in React.

**Don’t call Hooks inside loops, conditions, or nested functions.** Instead, always use Hooks at the top level of your React function, before any early returns. You can only call Hooks while React is rendering a function component:

* ✅ Call them at the top level in the body of a [function component](/learn/your-first-component).
* ✅ Call them at the top level in the body of a [custom Hook](/learn/reusing-logic-with-custom-hooks).
>>>>>>> e5fd79cdbb296b87cab7dff17c3b7feee5dba96b:src/content/warnings/invalid-hook-call-warning.md

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

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
Qarışıqlığın olmaması üçün Hookları aşağıdakı ssenarilərdə işlətmək **dəstəklənmir**:

* 🔴 Hookları sinif komponentlərindən çağırmayın.
* 🔴 Hookları hadisə işləyicilərindən çağırmayın.
* 🔴 Hookları `useMemo`, `useReducer` və ya `useEffect` Hooklara göndərilən funksiyalardan çağırmayın.
=======
It’s **not** supported to call Hooks (functions starting with `use`) in any other cases, for example:

* 🔴 Do not call Hooks inside conditions or loops.
* 🔴 Do not call Hooks after a conditional `return` statement.
* 🔴 Do not call Hooks in event handlers.
* 🔴 Do not call Hooks in class components.
* 🔴 Do not call Hooks inside functions passed to `useMemo`, `useReducer`, or `useEffect`.
>>>>>>> e5fd79cdbb296b87cab7dff17c3b7feee5dba96b:src/content/warnings/invalid-hook-call-warning.md

Bu qaydalara riayət etmədikdə yuxarıdakı xətanı görəcəksiniz.

```js{3-4,11-12,20-21}
function Bad({ cond }) {
  if (cond) {
    // 🔴 Bad: inside a condition (to fix, move it outside!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad() {
  for (let i = 0; i < 10; i++) {
    // 🔴 Bad: inside a loop (to fix, move it outside!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad({ cond }) {
  if (cond) {
    return;
  }
  // 🔴 Bad: after a conditional return (to fix, move it before the return!)
  const theme = useContext(ThemeContext);
  // ...
}

function Bad() {
  function handleClick() {
    // 🔴 Pis: hadisə işləyicisinin daxilindədir (həll etmək üçün Hooku bu funksiyadan çıxarın!)
    const theme = useContext(ThemeContext);
  }
  // ...
}

function Bad() {
  const style = useMemo(() => {
    // 🔴 Pis: useMemo-un daxilindədir (həll etmək üçün Hooku bu funksiyadan çıxarın!)
    const theme = useContext(ThemeContext);
    return createStyle(theme);
  });
  // ...
}

class Bad extends React.Component {
  render() {
<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
    // 🔴 Pis: sinif komponentindədir
=======
    // 🔴 Bad: inside a class component (to fix, write a function component instead of a class!)
>>>>>>> e5fd79cdbb296b87cab7dff17c3b7feee5dba96b:src/content/warnings/invalid-hook-call-warning.md
    useEffect(() => {})
    // ...
  }
}
```

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
Bu səhvlərin bəzilərini tutmaq üçün [`eslint-plugin-react-hooks` plaginindən](https://www.npmjs.com/package/eslint-plugin-react-hooks) istifadə edə bilərsiniz.

>Qeyd
>
>[Xüsusi Hooklardan](/docs/hooks-custom.html) digər Hookları çağırmaq *mümkündür* (bu, xüsusi Hookların əsas məqsədidir). Bunun işləməsinin səbəbi xüsusi Hookların da funksiya komponentinin render edildiyi zaman çağrılmasıdır.
=======
You can use the [`eslint-plugin-react-hooks` plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) to catch these mistakes.

<Note>
>>>>>>> e5fd79cdbb296b87cab7dff17c3b7feee5dba96b:src/content/warnings/invalid-hook-call-warning.md

[Custom Hooks](/learn/reusing-logic-with-custom-hooks) *may* call other Hooks (that's their whole purpose). This works because custom Hooks are also supposed to only be called while a function component is rendering.

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
## Dublikat React {#duplicate-react}
=======
</Note>

## Mismatching Versions of React and React DOM {/*mismatching-versions-of-react-and-react-dom*/}

You might be using a version of `react-dom` (< 16.8.0) or `react-native` (< 0.59) that doesn't yet support Hooks. You can run `npm ls react-dom` or `npm ls react-native` in your application folder to check which version you're using. If you find more than one of them, this might also create problems (more on that below).

## Duplicate React {/*duplicate-react*/}
>>>>>>> e5fd79cdbb296b87cab7dff17c3b7feee5dba96b:src/content/warnings/invalid-hook-call-warning.md

Hookların işləməsi üçün `react-dom` paketi ilə applikasiya kodu eyni versiyalı `react` modulunu idxal etməlidir.

`react` idxalları iki fərqli ixrac obyekti tapdıqda siz bu xəbərdarlığı görəcəksiniz. Bu, `react` paketinin **təsadüfən iki kopiyası olduqda** baş verir.

Paket idarə etməsi üçün Node işlətdikdə layihə direktoriyasından React-in versiyasını yoxlamaq üçün aşağıdakı əmri icra edə bilərsiniz:

<TerminalBlock>

npm ls react

</TerminalBlock>

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

<<<<<<< HEAD:content/warnings/invalid-hook-call-warning.md
>Qeyd
>
>Normalda, React-in bir neçə müstəqi kopiyası ola bilər (məsələn, applikasiya və 3-cü tərəfin yaratdığı vidcet başqa versiyalar işlədə bilər). Bunun sınmasının əsas səbəbi `require('react')` idxalının, komponent və `react-dom`-da React-in fərqli kopiyasını tapmasıdır.

## Digər Səbəblər {#other-causes}
=======
<Note>

In general, React supports using multiple independent copies on one page (for example, if an app and a third-party widget both use it). It only breaks if `require('react')` resolves differently between the component and the `react-dom` copy it was rendered with.

</Note>

## Other Causes {/*other-causes*/}
>>>>>>> e5fd79cdbb296b87cab7dff17c3b7feee5dba96b:src/content/warnings/invalid-hook-call-warning.md

Əgər yuxarıdakı heç bir həll işləmirsə, sizə kömək edə bilməmiz üçün [bu issue-ya](https://github.com/facebook/react/issues/13991) komment atın. Bu problemi göstərə bilərək kiçik nümunə yaradın. Bu nümunəni düzəltdikcə problemi tapmaq şansınız da artacaq.

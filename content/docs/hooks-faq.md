---
id: hooks-faq
title: Hooklar FAQ
permalink: docs/hooks-faq.html
prev: hooks-reference.html
---

*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə sinif yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.

Bu səhifədə [Hooklar](/docs/hooks-overview.html) haqqında çox verilən suallar cavablandırılır.

<!--
  if you ever need to regenerate this, this snippet in the devtools console might help:

  $$('.anchor').map(a =>
    `${' '.repeat(2 * +a.parentNode.nodeName.slice(1))}` +
    `[${a.parentNode.textContent}](${a.getAttribute('href')})`
  ).join('\n')
-->

* **[Adaptasiya Strategiyası](#adoption-strategy)**
  * [Hooklar React-in hansı versiyalarında mövcuddur?](#which-versions-of-react-include-hooks)
  * [Bütün sinif komponentlərini yenidən yazmalıyam?](#do-i-need-to-rewrite-all-my-class-components)
  * [Siniflər ilə edə bilmədiyim nələri Hooklar ilə edə bilərəm?](#what-can-i-do-with-hooks-that-i-couldnt-with-classes)
  * [React biliklərimin nə qədəri eyni qalır?](#how-much-of-my-react-knowledge-stays-relevant)
  * [Nə işlətməliyəm -- Hooklar, siniflər və ya hər ikisinin qarışığı?](#should-i-use-hooks-classes-or-a-mix-of-both)
  * [Hooklar siniflərin bütün ssenarilərini əhatə edir?](#do-hooks-cover-all-use-cases-for-classes)
  * [Hooklar render proplarını və yüksək dərəcəli komponentləri əvəzləyir?](#do-hooks-replace-render-props-and-higher-order-components)
  * [Hooklar Redux connect() və React Router kimi populyar API-lara necə təsir edir?](#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router)
  * [Hooklar statik tiplər ilə işləyirlər?](#do-hooks-work-with-static-typing)
  * [Hooklar ilə komponentləri necə test edə bilərəm?](#how-to-test-components-that-use-hooks)
  * [Lint qaydaları nələri tətbiq edirlər?](#what-exactly-do-the-lint-rules-enforce)
* **[Siniflərdən Hooklara](#from-classes-to-hooks)**
  * [Lifecycle metodlarının Hooklar ilə uyğunluqları necədir?](#how-do-lifecycle-methods-correspond-to-hooks)
  * [Hooklar ilə məlumat yüklənməsini necə tətbiq edə bilərəm?](#how-can-i-do-data-fetching-with-hooks)
  * [İnstansiya dəyişənləri üçün Hook var?](#is-there-something-like-instance-variables)
  * [Bir və ya bir neçə state dəyişəni işlətməliyəm?](#should-i-use-one-or-many-state-variables)
  * [Effekti yalnız yenilik zamanı icra edə bilərəm?](#can-i-run-an-effect-only-on-updates)
  * [Keçmiş state və propları necə əldə edə bilərəm?](#how-to-get-the-previous-props-or-state)
  * [Niyə funksiya daxilində köhnə state və prop dəyərləri görürəm?](#why-am-i-seeing-stale-props-or-state-inside-my-function)
  * [getDerivedStateFromProps funksiyasını necə tətbiq edə bilərəm?](#how-do-i-implement-getderivedstatefromprops)
  * [forceUpdate kimi funksiya var?](#is-there-something-like-forceupdate)
  * [Funksiya komponentinə ref qoşa bilərəm?](#can-i-make-a-ref-to-a-function-component)
  * [DOM nodunu necə ölçə bilərəm?](#how-can-i-measure-a-dom-node)
  * [const [thing, setThing] = useState() nə deməkdir?](#what-does-const-thing-setthing--usestate-mean)
* **[Performans Optimallaşdırması](#performance-optimizations)**
  * [Yeniliklər olduqda effekti atlaya bilərəm?](#can-i-skip-an-effect-on-updates)
  * [Asılılıqlar siyahısına funksiyaları əlavə etməmək təhlükəsizdir?](#is-it-safe-to-omit-functions-from-the-list-of-dependencies)
  * [Effekt asılılıqları tez-tez dəyişdikdə nə etməliyəm?](#what-can-i-do-if-my-effect-dependencies-change-too-often)
  * [shouldComponentUpdate funksiyasını necə tətbiq edə bilərəm?](#how-do-i-implement-shouldcomponentupdate)
  * [Hesablamaları necə memoizasiya edə bilərəm?](#how-to-memoize-calculations)
  * [Bahalı obyektləri lazy formada necə yaratmaq mümkündür?](#how-to-create-expensive-objects-lazily)
  * [Render zamanı funksiyaların yaranması Hookları yavaşladır?](#are-hooks-slow-because-of-creating-functions-in-render)
  * [Callback-ləri göndərməkdən necə çəkinə bilərəm?](#how-to-avoid-passing-callbacks-down)
  * [useCallback-dən tez-tez dəyişən dəyəri necə oxuya bilərəm?](#how-to-read-an-often-changing-value-from-usecallback)
* **[Daxilində](#under-the-hood)**
  * [React, Hookları komponentlər ilə necə əlaqələndirir?](#how-does-react-associate-hook-calls-with-components)
  * [Hooklardan əvvəl nə var idi?](#what-is-the-prior-art-for-hooks)

## Adaptasiya Strategiyası {#adoption-strategy}

### Hooklar React-in hansı versiyalarında mövcuddur? {#which-versions-of-react-include-hooks}

16.8.0-dan başlayaraq aşağıdakı paketlərdə React Hooklarının stabil tətbiqi mövcuddur:

* React DOM
* React Native
* React DOM Server
* React Test Renderer
* React Shallow Renderer

Nəzərə alın ki, **Hookları aktivləşdirmək üçün bütün React paketlərinin versiyaları 16.8.0-dan yuxarı olmalıdır**. Paketləri (məsələn React DOM) yeniləməyi yaddan çıxardıqda Hooklar işləməyəcək.

Hooklar, [React Native 0.59-dan](https://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059) başlayaraq dəstəklənir.

### Bütün sinif komponentlərini yenidən yazmalıyam? {#do-i-need-to-rewrite-all-my-class-components}

Xeyr. React-dən sinifləri silmək haqqında [heç bir planımız](/docs/hooks-intro.html#gradual-adoption-strategy) yoxdur. Yenidən yazmalara həmişə imkan olmadığından və məhsulların dərc edilməsi dayandırılmadığından sinif komponentləri yaxın gələcəyə kimi dəstəklənəcək. Yeni kodları Hooklar ilə yazmağı tövsiyə edirik.

### Siniflər ilə edə bilmədiyim nələri Hooklar ilə edə bilərəm? {#what-can-i-do-with-hooks-that-i-couldnt-with-classes}

Hooklar ilə komponentlər arası funksional məntiqi paylaşmaq mümkündür. ["Xüsusi Hookların İstifadəsi"](/docs/hooks-custom.html) səhifəsində bu qabiliyyətlərdən danışılır. React core komandasının üzvünün yazdığı [bu məqalədə](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889) Hookların yaratdığı yeni imkanlar haqqında dərindən danışılır.

### React biliklərimin nə qədəri eyni qalır? {#how-much-of-my-react-knowledge-stays-relevant}

Hooklar ilə state, lifecycle, kontekst və ref-lər kimi React xüsusiyyətlərini birbaşa işlətmək mümkündür. Hooklar React-in işləmə prinsiplərini dəyişmirlər. Bu səbəbdən komponentlər, proplar və yuxarıdan aşağı məlumat axınından bilikli olmaq vacibdir.

Hookların öyrənmə əyriliyi var. Sənədlərdə nəsə çatışmırsa, [bizə issue yazın](https://github.com/reactjs/reactjs.org/issues/new) və biz sizə kömək etməyə çalışacağıq.

### Nə işlətməliyəm -- Hooklar, siniflər və ya hər ikisinin qarışığı? {#should-i-use-hooks-classes-or-a-mix-of-both}

Hazır olduğunuz zaman yeni komponentləri Hooklar ilə yazmağı tövsiyə edirik. Bunu etməmişdən öncə komandanızda hamının bu qərar ilə razılaşdığından və sənədlər ilə tanışlığı olduğundan əmin olun. Mövcud komponentləri yenidən yazmağı (məsələn, baqları düzəltmək üçün) planlaşdırmırsınızsa, mövcud sinifləri Hooklar ilə yenidən yazmağı tövsiyə etmirik.

<<<<<<< HEAD
Sinif *komponentlərindən* Hookları çağırmaq mümkün deyil. Lakin, eyni komponent ağacında sinif komponentlərini və Hooklar ilə funksiya komponentlərini birlikdə istifadə edə bilərsiniz. Komponentin sinif və ya Hooklar işlədən funksiya olması tətbiq detalıdır. Gələcəkdə React komponentlərini yazmağın əsas yolunun Hooklar olduğunu gözləyirik.
=======
You can't use Hooks *inside* a class component, but you can definitely mix classes and function components with Hooks in a single tree. Whether a component is a class or a function that uses Hooks is an implementation detail of that component. In the longer term, we expect Hooks to be the primary way people write React components.
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9

### Hooklar siniflərin bütün ssenarilərini əhatə edir? {#do-hooks-cover-all-use-cases-for-classes}

<<<<<<< HEAD
Bizim məqsədimiz Hooklar ilə siniflərin bütün ssenarilərini əhatə etməkdir. İndiki zamanda `getSnapshotBeforeUpdate` və `componentDidCatch` lifecycle metodları üçün Hookların heç bir ekvivalenti yoxdur. Lakin, bu metodları da Hooklar ilə yaza bilmək mümkün olacaq.
=======
Our goal is for Hooks to cover all use cases for classes as soon as possible. There are no Hook equivalents to the uncommon `getSnapshotBeforeUpdate`, `getDerivedStateFromError` and `componentDidCatch` lifecycles yet, but we plan to add them soon.
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9

Hookların hələ ki cavan olduğundan bəzi 3-cü tərəfin kitabxanaları ilə uyğun olmaya bilər.

### Hooklar render proplarını və yüksək dərəcəli komponentləri əvəzləyir? {#do-hooks-replace-render-props-and-higher-order-components}

Adətən, render proplar və yüksən dərəcəli komponentlər yalnız bir uşaq render edirlər. Belə ssenariləri Hooklar ilə əvəz etmək olar. Hər iki pattern-in öz yeri var (məsələn, virtual skrol edən komponentin `renderItem` propu və ya vizual konteyner komponentinin öz DOM strukturu ola bilər). Lakin, bir çox halda Hookları işlətmək bəs edir. Hookları işlətdikdə ağacdakı elementlərin sayı azalır.

### Hooklar Redux connect() və React Router kimi populyar API-lara necə təsir edir? {#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router}

İşlətdiyiniz eyni API-ları işlətməyə davam edə bilərsiniz.

React Redux v7.1.0-dən başlayaraq [Hookları dəstəkləyir](https://react-redux.js.org/api/hooks) və proqramçıları `useDispatch` və ya `useSelector` kimi Hooklar ilə təmin edir.

React Router-də v5.1-dən başlayaraq [Hooklar dəstəklənir](https://reacttraining.com/react-router/web/api/Hooks).

Gələcəkdə, digər kitabxanalar da Hookaları dəstəkləyə bilərlər.

### Hooklar statik tiplər ilə işləyirlər? {#do-hooks-work-with-static-typing}

Hooklar statik tiplər ilə dizayn olunublar. Hookların sadə funksiya olduğundan bunlara tip əlavə etmək yüksək dərəcəli komponentlər kimi pattern-lərə tip əlavə etməkdən daha asandır. Flow və TypeScript-in ən son React təriflərində React Hookları dəstəklənir.

Daha vacib olaraq xüsusi Hooklar ilə React API-ını tiplər ilə daha sərt şəkildə məhdudlaşdırmaq mümkündür. React sizə primitivləri verir. Lakin, siz bu primitivləri fərqli formada birləşdirə bilərsiniz.

### Hooklar işlədən React komponentlərini necə test etmək mümkündür? {#how-to-test-components-that-use-hooks}

React-in nöqteyi nəzərindən Hooklar işlədən komponent sadə komponentdir. Əgər test etmə həlliniz React-in daxili xüsusiyyətlərindən istifadə etmirsə, Hooklar ilə olan komponentləri sadə komponentlər kimi test edə bilərsiniz.

>Qeyd
>
>[Test Etmə Reseptlərində](/docs/testing-recipes.html) kopiyalaya biləcəyiniz bir neçə nümunə var.

Məsələn, gəlin aşağıdakı sayğac komponentinə baxaq:

```js
function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `${count} dəfə tıklandı`;
  });
  return (
    <div>
      <p>{count} dəfə tıklandı</p>
      <button onClick={() => setCount(count + 1)}>
        Tıkla
      </button>
    </div>
  );
}
```

Biz bu komponenti React DOM ilə test edəcəyik. Davranışın brauzer ilə uyğunlaşması üçün render etmə və yeniləmə kodlarını [`ReactTestUtils.act()`](/docs/test-utils.html#act) çağırışları ilə əhatə edəcəyik:

```js{3,20-22,29-31}
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render and update a counter', () => {
  // Test first render and effect
  act(() => {
    ReactDOM.render(<Counter />, container);
  });
  const button = container.querySelector('button');
  const label = container.querySelector('p');
  expect(label.textContent).toBe('0 dəfə tıklandı');
  expect(document.title).toBe('0 dəfə tıklandı');

  // Test second render and effect
  act(() => {
    button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(label.textContent).toBe('1 dəfə tıklandı');
  expect(document.title).toBe('1 dəfə tıklandı');
});
```

`act()` çağırışları effektləri də icra edəcək.

Xüsusi Hooku test etmək istədikdə testdə komponent yaradıb bu Hooku işlədə bilərsiniz. Sonra, yazdığınız komponenti test edə bilərsiniz.

Çox kod yazmamaq üçün komponentləri son istifadəçilərin işlətdiyi kimi test etmək fikri ilə dizayn olunmuş [React Testing Library](https://testing-library.com/react) kitabxanasından istifadə etməyi tövsiyə edirik.

Əlavə məlumat üçün [Test Etmə Reseptləri](/docs/testing-recipes.html) səhifəsinə baxın.

### [Lint qaydaları](https://www.npmjs.com/package/eslint-plugin-react-hooks) nələri tətbiq edirlər? {#what-exactly-do-the-lint-rules-enforce}

Baqları tez tuta bilmək üçün [Hookların qaydalarını](/docs/hooks-rules.html) tətbiq edən [ESLint plagini](https://www.npmjs.com/package/eslint-plugin-react-hooks) təmin edirik. Bu plagin, "`use`" ilə başlayan və dərhal sonrakı hərfi böyük hərf ilə yazılan funksiyanın Hook olduğunu ehtimal edir. Bu evristikanın əla olmadığını və bəzən saxta müsbətlərin yaratdığını bilirik. Lakin, ekosistem səviyyəsində konvesiya olmadıqda Hooklar yaxşı işləməyəcək. Uzun adlar işlətdikdə isə Hookların adaptasiyası və ya bu konvensiyanın tətbiqi yavaşlayacaq.

Bu qayda xüsusilə aşağıdakı nöqtələri tətbiq edir:

* Hook çağırışları `PascalCase` kimi yazılan funksiyaların (komponent olduğu ehtimal edilir) və ya digər `useSomething` funksiyasının (xüsusi Hook olduğu ehtimal edilir) daxilindən çağrılır.
* Hooklar hər render zamanı eyni sıra ilə çağrılır.

Burada əlavə evristikalar da var. Bu evristikalar saxta müsbətlər ilə baqların tapılmasının balansını saxlayaraq zaman ilə dəyişə bilərlər.

## Siniflərdən Hooklara {#from-classes-to-hooks}

### Lifecycle metodlarının Hooklar ilə uyğunluqları necədir? {#how-do-lifecycle-methods-correspond-to-hooks}

* `constructor`: Funksiya komponentlərinə konstruktor lazım deyil. Siz state-i [`useState`](/docs/hooks-reference.html#usestate) çağırışında inisializasiya edə bilərsiniz. Əgər ilkin state-in hesablanması bahalıdırsa, siz `useState` Hookuna funksiya göndərə bilərsiniz.

* `getDerivedStateFromProps`: [Render zamanı](#how-do-i-implement-getderivedstatefromprops) yenilik planlaşdırın.

* `shouldComponentUpdate`: [aşağıda göstərilən](#how-do-i-implement-shouldcomponentupdate) `React.memo` funksiyasına baxın.

* `render`: Bu, funksiya komponentinin gövdəsidir.

* `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`: Bu funksiyaların bütün kombinasiyalarını ([daha](#can-i-skip-an-effect-on-updates) [az](#can-i-run-an-effect-only-on-updates) işlədilən ssenarilər daxil olmaqla) [`useEffect` Hooku](/docs/hooks-reference.html#useeffect) ilə tətbiq edə bilərsiniz.

<<<<<<< HEAD
* `componentDidCatch` və `getDerivedStateFromError`: Bu funksiyaların Hook ekvivalenti yoxdur. Lakin, gəcələcəkdə bunları da funksiya komponentləri ilə əvəz etmək mümkün olacaq.
=======
* `getSnapshotBeforeUpdate`, `componentDidCatch` and `getDerivedStateFromError`: There are no Hook equivalents for these methods yet, but they will be added soon.
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9

### Hooklar ilə məlumat yüklənməsini necə tətbiq edə bilərəm? {#how-can-i-do-data-fetching-with-hooks}

Başlamaq üçün [kiçik demo-ya](https://codesandbox.io/s/jvvkoo8pq3) baxın. Hooklar ilə məlumat mübadiləsi haqqında əlavə məlumat üçün [bu məqaləni](https://www.robinwieruch.de/react-hooks-fetch-data/) oxuyun.

### İnstansiya dəyişənləri üçün Hook var? {#is-there-something-like-instance-variables}

Bəli! [`useRef()`](/docs/hooks-reference.html#useref) Hooku yalnız DOM referansları üçün işlədilmir. "ref" obyekti ümumi konteynerdir və bu obyektin `current` parametri sinfin instansiya parametri kimi mutasiya oluna bilən istənilən dəyəri saxlaya bilər.

Siz bu dəyəri `useEffect`-dən yeniləyə bilərsiniz:

```js{2,8}
function Timer() {
  const intervalRef = useRef();

  useEffect(() => {
    const id = setInterval(() => {
      // ...
    });
    intervalRef.current = id;
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  // ...
}
```

İnterval lazım olduqda ref lazım deyil (intervalın `id` dəyəri effektə lokal olacaq). Lakin, hadisə işləyicisindən intervalı təmizləmək lazım olduqda ref-lərdən istifadə edə bilərsiniz:

```js{3}
  // ...
  function handleCancelClick() {
    clearInterval(intervalRef.current);
  }
  // ...
```

Konseptual olaraq ref-lər sinfin instansiya dəyərlərinə bənzəyirlər. Əgər [lazy inisializasiya](#how-to-create-expensive-objects-lazily) edirsinizsə, ref-ləri render zamanı yeniləməyin. Bu, gözlənilməz davranışlara səbəb ola bilər. Əvəzinə, ref-ləri hadisə işləyicilərindən və effektlərdən yeniləyin.

### Bir və ya bir neçə state dəyişəni işlətməliyəm? {#should-i-use-one-or-many-state-variables}

Siniflər ilə tanışığınız olduqda `useState()` Hookunu bir dəfə çağırıb bütün state-i bir obyektdə saxlamaq istəyə bilərsiniz. Əgər istəyirsinizsə, bunu edə bilərsiniz. Aşağıdakı nümunədə maus hərəkətinin pozisiyası və ölçüsü lokal state-də saxlanır:

```js
function Box() {
  const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
  // ...
}
```

İstifadəçi mausu tərpətdikdə `left` və `top` dəyərlərini dəyişən məntiqi yazmaq üçün bu dəyərləri əvvəlki state ilə özümüz biləşdirməliyik:

```js{4,5}
  // ...
  useEffect(() => {
    function handleWindowMouseMove(e) {
      // "...state" yayması ilə width və height dəyərlərini itirməyəcəyimizdən əmin oluruq.
      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
    }
    // Qeyd: Bu tətbiq sadələşdirilib
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);
  // ...
```

State dəyişənini yenilədikdə state-də olan dəyər *əvəz olunur*. Bu, yenilənən dəyəri state obyekti ilə *birləşdirən* sinfin `this.setState` funksiyasından fərqlidir.

<<<<<<< HEAD
Əgər avtomatik birləşməni bəyənirsinizsə, state yeniliklərini state obyekti ilə birləşdirən `useLegacyState` adlı xüsusi Hook yarada bilərsiniz. Lakin, biz **state-i bir neçə state dəyişənlərinə parçalamağı tövsiyə edirik.**
=======
If you miss automatic merging, you could write a custom `useLegacyState` Hook that merges object state updates. However, **we recommend to split state into multiple state variables based on which values tend to change together.**
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9

Məsələn, biz komponent state-ini `position` və `size` obyektlərinə parçalayıb obyektləri biləşdirmədən `position` dəyərini yeni dəyər ilə əvəz edə bilərik:

```js{2,7}
function Box() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: 100, height: 100 });

  useEffect(() => {
    function handleWindowMouseMove(e) {
      setPosition({ left: e.pageX, top: e.pageY });
    }
    // ...
```

State dəyişənlərini parçalamağın başqa faydası da var. State-lər məntiq əsasında ayrıldıqda əlaqəli məntiqləri xüsusi Hooka ixrac etmək asanlaşır. Məsələn:

```js{2,7}
function Box() {
  const position = useWindowPosition();
  const [size, setSize] = useState({ width: 100, height: 100 });
  // ...
}

function useWindowPosition() {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  useEffect(() => {
    // ...
  }, []);
  return position;
}
```

`position` state dəyəri üçün olan `useState` çağırışınının və bu state üçün lazım olan effektin state-li məntiqi dəyişmədən xüsusi Hooka necə köçürüldüyünə fikir verin. Bütün state bir obyektdə yerləşdirildikdə state-ləri ixrac etmək çətinləşəcək.

Bütün state-ləri bir `useState` çağırışında saxlamaq və ya hər state üçün ayrı `useState` çağırışı işlətmək eyni nəticəni verəcəklər. Bu iki hədd arasında balans tapıb əlaqəli state-ləri müstəqil state dəyişənlərinə qruplaşdırdıqda komponentləri oxumaq asanlaşır. State məntiqi mürəkkəbləşdikdə xüsusi Hook və ya [reducer](/docs/hooks-reference.html#usereducer) işlətməyi tövsiyə edirik.

### Effekti yalnız yenilik zamanı icra edə bilərəm? {#can-i-run-an-effect-only-on-updates}

Bu çox nadir ssenaridir. Bu lazım olduqda ilk və ya sonrakı render etməni təyin etmək üçün boolin dəyəri saxlayan [mutasiya olunan ref](#is-there-something-like-instance-variables) saxlayıb, bu ref-in dəyərini effekt çağırışında yoxlayın. (Bunu çox elədiyinizi görürsünüzsə, bu məntiq üçün xüsusi Hook yarada bilərsiniz.)

### Keçmiş state və propları necə əldə edə bilərəm? {#how-to-get-the-previous-props-or-state}

İndiki zamanda, siz köhnə dəyərləri [ref-də](#is-there-something-like-instance-variables) saxlaya bilərsiniz:

```js{6,8}
function Counter() {
  const [count, setCount] = useState(0);

  const prevCountRef = useRef();
  useEffect(() => {
    prevCountRef.current = count;
  });
  const prevCount = prevCountRef.current;

  return <h1>İndi: {count}, əvvəl: {prevCount}</h1>;
}
```

Bu biraz çaşdırıcı ola bilər. Lakin, siz bunu xüsusi Hooka ixrac edə bilərsiniz:

```js{3,7}
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  return <h1>İndi: {count}, əvvəl: {prevCount}</h1>;
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
```

Bu məntiq ilə proplar, state və ya digər hesablanmış dəyərlər saxlana bilər.

```js{5}
function Counter() {
  const [count, setCount] = useState(0);

  const calculation = count + 100;
  const prevCalculation = usePrevious(calculation);
  // ...
```

Bu ssenarinin çox işlədildiyindən gələcəkdə React-ə `usePrevious` Hooku əlavə edə bilərik.

[Törənən state üçün tövsiyə olunan pattern-ə də](#how-do-i-implement-getderivedstatefromprops) baxın.

### Niyə funksiya daxilində köhnə state və prop dəyərləri görürəm? {#why-am-i-seeing-stale-props-or-state-inside-my-function}

Komponent daxilində olan bütün funksiyalar (hadisə işləyiciləri və effektlər daxil olmaqla) render zamanı yaranan bütün state və propları "görürlər." Məsələn, gəlin aşağıdakı koda baxaq:

```js
function Example() {
  const [count, setCount] = useState(0);

  function handleAlertClick() {
    setTimeout(() => {
      alert('Tıklandı: ' + count);
    }, 3000);
  }

  return (
    <div>
      <p>{count} dəfə tıklandı</p>
      <button onClick={() => setCount(count + 1)}>
        Tıkla
      </button>
      <button onClick={handleAlertClick}>
        Xəbərdarlığı göstər
      </button>
    </div>
  );
}
```

"Xəbərdarlığı göstər" düyməsini tıklayıb sayğacı artırdıqda xəbərdarlıqda **"Xəbərdarlığı göstər" tıklandığı zaman təyin edilən** `count` dəyişəninin dəyəri göstəriləcək. Bu, state və propların dəyişmədiyini fikirləşən kodlarda baqların qarşısını alır.

Əgər asinxron callback-dən *ən son* state-i oxumaq istəyirsinizsə, bu dəyəri [ref-də](/docs/hooks-faq.html#is-there-something-like-instance-variables) saxlayıb, mutasiya edib və oxuya bilərsiniz.

Ən sonda, köhnə state və ya propları görməyin səbəblərindən biri, "asılılıq massivi" optimallaşdırmasından istifadə etdikdə bütün asılılıqların təyin edilməməsidir. Məsələn, əgər effektin ikinci arqumentində `[]` massivi təyin edilib amma effektin daxilində `someProp` işlədilibsə, effektdə `someProp` dəyərinin ilkin propu "görünəcək". Bunu həll etmək üçün asılılıq massivini silmək və ya düzəltmək lazımdır. [Funksiyaları massivdə işlətmək](#is-it-safe-to-omit-functions-from-the-list-of-dependencies) və asılılıqları səhvən buraxmadan effektləri daha az icra etmək üçün [digər strategiyalar](#what-can-i-do-if-my-effect-dependencies-change-too-often) haqqında məlumat almaq üçün göstərilən linklərə baxın.

>Qeyd
>
>Biz, [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) paketinin [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) qaydasından istifadə etməyi tövsiyə edirik. Bu qayda, asılılıqların səhv təyin edildiyini göstərir və düzəliş təklif edir.

### `getDerivedStateFromProps` funksiyasını necə tətbiq edə bilərəm? {#how-do-i-implement-getderivedstatefromprops}

Bir çox halda [bunun lazım olmadığına](/blog/2018/06/07/you-probably-dont-need-derived-state.html) baxmayaraq lazım olan bəzi nadir hallarda (məsələn, `<Transition>` komponentini tətbiq etdikdə) state-i render etmə zamanı yeniləyə bilərsiniz. React, ilk render etmədən dərhal sonra komponenti yenilənmiş state ilə yenilədiyindən bu əməliyyat bahalı olmayacaq.

Aşağıdakı nümunədə biz `row` propunun əvvəlki dəyərini state dəyişənində saxlayaraq dəyərləri müqayisə edirik:

```js
function ScrollView({row}) {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [prevRow, setPrevRow] = useState(null);

  if (row !== prevRow) {
    // Son render etmədən sonra row dəyəri dəyişdiyindən isScrollingDown state-ini yenilə.
    setIsScrollingDown(prevRow !== null && row > prevRow);
    setPrevRow(row);
  }

  return `Aşağı skrol edilir: ${isScrollingDown}`;
}
```

Bu, ilk baxışda qəribə görünə bilər. Lakin, render etmə zamanı yeniləmə əməliyyatı `getDerivedStateFromProps` funksiyası ilə konseptual olaraq eynidir.

### forceUpdate kimi funksiya var? {#is-there-something-like-forceupdate}

Əgər yeni dəyər köhnə dəyər ilə eynidirsə, `useState` və `useReducer` Hookları [komponenti yeniləməyəcəklər](/docs/hooks-reference.html#bailing-out-of-a-state-update). State-i yerində dəyişib `setState` çağırdıqda yenidən render etmə baş verməyəcək.

Normalda, React-in lokal state-i mutasiya olunmur. Lakin, çıxış yolu kimi artan sayğac işlədərək yenidən render etməni məcbur edə bilərsiniz:

```js
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

  function handleClick() {
    forceUpdate();
  }
```

Bu həlli çalışdığınız qədər az işlədin.

### Funksiya komponentinə ref qoşa bilərəm? {#can-i-make-a-ref-to-a-function-component}

Adətən bunun lazım olmadığına baxmayaraq [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle) Hooku ilə bəzi imperativ metodları valideyn komponentdən istifadə edə bilərsiniz.

### DOM nodunu necə ölçə bilərəm? {#how-can-i-measure-a-dom-node}

DOM nodunun ölçüsünü və ya pozisiyasını hesablamaq üçün [callback ref-indən](/docs/refs-and-the-dom.html#callback-refs) istifadə edə bilərsiniz. Fərqli noda ref qoşulduqda React bu callback-i çağıracaq. Aşağıdakı [kiçik demo-ya](https://codesandbox.io/s/l7m0v5x4v9) baxın:

```js{4-8,12}
function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 ref={measuredRef}>Salam dünya</h1>
      <h2>Yuxarıdakı başlığın hündürlüyü: {Math.round(height)}px</h2>
    </>
  );
}
```

Obyekt ref-inin cari ref dəyərinə edilən *dəyişikliklər* haqqında xəbərdarlıq vermədiyindən bu nümunədə `useRef`-dən istifadə etmirik. Callback ref-i işlətdikdə [hesablanan nodun uşaq komponentdən göstərilməsinə baxmayaraq](https://codesandbox.io/s/818zzk8m78) (e.g. məsələn düymə tıklandıqda) dəyişikliklər valideyn komponentə bildirilir. Bu səbəbdən, biz hesablamaları yeniləyə bilirik.

`useCallback`-in asılılıqlar massivinə boş massivin (`[]`) göndərildiyinə fikir verin. Boş massivin ref callback-inin dəyişmədiyini və yenidən render etmələr zamanı eyni qaldığını siğortaladığından React bu funksiyanı lazımsız yerə çağırmayacaq.

Bu nümunədə `<h1>` komponentinin bütün render etmələr zamanı mövcud olduğundan callback ref-i yalnız komponent mount və unmount edildiyi zaman çağrılacaq. Əgər komponentin ölçüsü dəyişdiyi zaman bildirişli olmaq istəyirsinizsə, [`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) və ya bunun üzərində düzəlmiş 3-cü tərəfin Hookundan istifadə edə bilərsiniz.

İstədiyiniz zaman bu məntiqi xüsusi Hooka [ixrac edə bilərsiniz](https://codesandbox.io/s/m5o42082xy):

```js{2}
function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Salam dünya</h1>
      {rect !== null &&
        <h2>Yuxarıdakı başlığın hündürlüyü: {Math.round(rect.height)}px</h2>
      }
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
```


### `const [thing, setThing] = useState()` nə deməkdir? {#what-does-const-thing-setthing--usestate-mean}

Bu sintaksis ilə tanışlığınız yoxdursa, State Hook sənədində olan [izahatı](/docs/hooks-state.html#tip-what-do-square-brackets-mean) oxuyun.


## Performans Optimallaşdırması {#performance-optimizations}

### Yeniliklər olduqda effekti atlaya bilərəm? {#can-i-skip-an-effect-on-updates}

Bəli. [Effektlərin şərti icra olunması](/docs/hooks-reference.html#conditionally-firing-an-effect) səhifəsinə baxın. Yeniliklərin idarə olunmasının unudulmasının [baqlara səbəb olduğundan](/docs/hooks-effect.html#explanation-why-effects-run-on-each-update) biz bunu normal davranış kimi tətbiq etmirik.

### Asılılıqlar siyahısına funksiyaları əlavə etməmək təhlükəsizdir? {#is-it-safe-to-omit-functions-from-the-list-of-dependencies}

Ümumilikdə, xeyr.

```js{3,8}
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 Bu, problem yaradacaq (`doSomething` funksiyası `someProp` işlədir)
}
```

Effektdən kənarda olan funksiyaların hansı state və propları işlətdiyini yadda saxlamaq çətindir. Bu səbədən **effektdə işlədiləcək funksiyaları effektin *daxilində* yaratmağı tövsiyə edirik.** Bu həll ilə effektin komponent scope-unda olan hansı dəyərlərdən asılı olduğunu daha aydın görmək mümkündür:

```js{4,8}
function Example({ someProp }) {
  useEffect(() => {
    function doSomething() {
      console.log(someProp);
    }

    doSomething();
  }, [someProp]); // ✅ OK (effekt `someProp` propunu işlədir)
}
```

Əgər bu həll ilə komponent scope-undan heç bir dəyər işlətmiriksə, asılılıq massivini `[]` dəyər ilə təyin etmək problem yaratmayacaq:

```js{7}
useEffect(() => {
  function doSomething() {
    console.log('hello');
  }

  doSomething();
}, []); // ✅ OK. bu nümunədə komponent scope-unda olan *heç bir* dəyər işlədilmir
```

Aşağıda, fərqli ssenarilərdə işlədilən digər seçimlər də göstərilir.

>Qeyd
>
>Biz, [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) paketinin [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) qaydasından istifadə etməyi tövsiyə edirik. Bu qayda, asılılıqların səhv təyin edildiyini göstərir və düzəliş təklif edir.

Gəlin bunun niyə vacib olduğuna baxaq.

<<<<<<< HEAD
`useEffect`, `useMemo`, `useCallback` və ya `useImperativeHandle` Hooklarının son arqumentinə [asılılıqlar siyahısı](/docs/hooks-reference.html#conditionally-firing-an-effect) təyin etdikdə Hooka göndərilən funksiyanın işlətdiyi bütün React məlumat axınına aid olan dəyərlərin hamısı bu massivdə işlədilməlidir.
=======
If you specify a [list of dependencies](/docs/hooks-reference.html#conditionally-firing-an-effect) as the last argument to `useEffect`, `useMemo`, `useCallback`, or `useImperativeHandle`, it must include all values that are used inside the callback and participate in the React data flow. That includes props, state, and anything derived from them.
>>>>>>> 9fa6418ada9b24bdacf4cb1facbe69160d0740a9

Asılılıq massivindən **yalnız** funksiyanın daxilində (və ya bu funksiyanın çağırdığı funksiyaların daxilində) state, proplar və ya bu dəyərlərdən yaranmış dəyərlərə referans olmadıqda bu funksiyanı buraxmaq mümkündür. Aşağıdakı nümunədə baq var:

```js{5,12}
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  async function fetchProduct() {
    const response = await fetch('http://myapi/product' + productId); // productId propunu işlədir
    const json = await response.json();
    setProduct(json);
  }

  useEffect(() => {
    fetchProduct();
  }, []); // 🔴 Yanlış. `fetchProduct` funksiyası `productId` işlədir
  // ...
}
```

**Bunu düzəltmək üçün funksiyanı effektin _daxilinə_ köçürməyi tövsiyə edirik**. Bu həll ilə effektin hansı state və ya propları işlətdiyini bilmək asanlaşır və bu dəyərlərin həmişə təyin olunduğu siğortalanır:

```js{5-10,13}
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Funksiyanı effektin daxilinə köçürərək bu effektin hansı dəyərləri işlətdiyini görmək mümkündür.
    async function fetchProduct() {
      const response = await fetch('http://myapi/product' + productId);
      const json = await response.json();
      setProduct(json);
    }

    fetchProduct();
  }, [productId]); // ✅ Effektin productId propundan istifadə etdiyindən bu massiv etibarlıdır
  // ...
}
```

Bu kod ilə effektin daxilində lokal state yaradaraq lazımsız cavabları idarə etmək mümkündür:

```js{2,6,10}
  useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      const response = await fetch('http://myapi/product/' + productId);
      const json = await response.json();
      if (!ignore) setProduct(json);
    }

    fetchProduct();
    return () => { ignore = true };
  }, [productId]);
```

Funksiyanı effektin daxilinə əlavə etdiyimizdən artıq bu funksiyanı asılılıqlar massivinə əlavə etməməliyik.

>Məsləhət
>
>Hooklar ilə məlumat yüklənməsi haqqında əlavə məlumat almaq üçün [bu kiçik demo-ya](https://codesandbox.io/s/jvvkoo8pq3) və [bu məqaləyə](https://www.robinwieruch.de/react-hooks-fetch-data/) baxın.

**Əgər funksiyanı effektin daxilinə əlavə edə _bilmirsinizsə_, aşağıda göstərilə digər seçimlərə baxın:**

* **Funksiyanı komponentdən kənara köçürün**. Bu yol ilə funksiyanın heç bir state və ya proplardan asılı olmayacağı siğortalanır. Bu səbəbdən funksiyanı asılılıqlar massivinə əlavə etmək lazım deyil.
* Əgər çağırdığınız funksiya təmiz hesablamadırsa və render etmə zamanı çağrıla bilirsə, siz **bu funksiyanı effektin kənarından çağıra bilər** və effekti funksiyanın qaytardığı dəyərdən asılı edə bilərsiniz.
* Ən son variant kimi **funksiyanı effektin asılılıqlar massivinə əlavə edib _bu funksiyanın tətbiqini_** [`useCallback`](/docs/hooks-reference.html#usecallback) Hooku ilə əhatə edə bilərsiniz. Bu, funksiyanın **öz asılılıqları** dəyişməyənə kimi hər render zamanı eyni identikliyini saxlayağını təmin edir:

```js{2-5}
function ProductPage({ productId }) {
  // ✅ Render etmə zamanı funksiyanın dəyişməməsi üçün funksiyanı useCallback ilə əhatə edin
  const fetchProduct = useCallback(() => {
    // ... productId ilə nəsə et ...
  }, [productId]); // ✅ useCallback-in bütün asılılıqları təyin edilib

  return <ProductDetails fetchProduct={fetchProduct} />;
}

function ProductDetails({ fetchProduct }) {
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]); // ✅ Bütün useEffect asılılıqları təyin edilib
  // ...
}
```

Yuxarıdakı nümunədə funksiyanın asılılıqlar massivində **olduğuna** fikir verin. Bu asılılıq `ProductPage`-in `productId` propunda dəyişiklik olduqda `ProductDetails` komponentində yenidən yüklənmənin avtomatik icra olunmasını təmin edir.

### Effekt asılılıqları tez-tez dəyişdikdə nə etməliyəm? {#what-can-i-do-if-my-effect-dependencies-change-too-often}

Bəzən effetlərdə tez-tez dəyişən state işlədilə bilər. Bu səbəbdən, siz state-i effektin asılılıqlarından silmək istəyə bilərsiniz. Lakin, bu, baqlara səbəb olacaq:

```js{6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // Bu effet `count` state-indən asılıdır
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Baq: `count` state-i asılılıq kimi təyin edilməyib

  return <h1>{count}</h1>;
}
```

Boş asılılıqlar massivi (`[]`) effektin yalnız komponentin mount olunduğu zaman icra ediləcəyini bildirir. Lakin, yaratdığımız closure-da `count` state-inin dəyərinin `0` olduğundan `setInterval` callback-inin daxilində olan `count` dəyəri dəyişməyəcək. Hər keçən saniyədə intervalın callback-i `setCount(0 + 1)` funksiyasını çağıracaq və bu səbəbdən sayğac heç vaxt 1-dən yüksək olmayacaq.

`[count]` dəyərini asılılıqlar siyahısına əlavə etdikdə baqlar düzələcək. Lakin, interval hər dəyişiklik zamanı sıfırlanacaq. Effektiv olaraq `setInterval` təmizlənməmişdən qabaq yalnız bir dəfə icra olunacaq (`setTimeout` kimi). Bu, istədiyimiz nəticəni verməyə bilər. Bunu həll etmək üçün [`setState`-in funksional yeniləmə formasından istifadə edə bilərik](/docs/hooks-reference.html#functional-updates). Bu forma ilə *cari* state-i referans etmədən state-in *necə* dəyişəcəyini təyin etmək mümkündür:

```js{6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ Bu, `count` dəyişənindən asılı deyil
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Effetimiz komponent scope-unda olan heç bir dəyərdən istifadə etmir

  return <h1>{count}</h1>;
}
```

(`setCount` funksiyasının stabil olduğundan bu funksiyanı effektə asılılıq kimi əlavə etmək lazım deyil.)

İndi, `setInterval` callback-inin hər saniyə icra olunduğuna baxmayaraq `setCount`-un daxili funksiyası `count` dəyərinin (callback-də `c` adlanır) ən yeni dəyərini istifadə edir.

Daha mürəkkəb ssenarilərdə (məsələn, bir state-in başqa state-dən asılı olduğu hallar kimi) state yeniləməsi məntiqini [`useReducer` Hooku](/docs/hooks-reference.html#usereducer) ilə effektdən kənara çıxarın. Bunu etmək üçün [bu məqalədəki](https://adamrackis.dev/state-and-use-reducer/) nümunəyə baxın. Reducer funksiyasının komponentin daxilində təyin olunub komponentin proplarını oxumasına baxmayaraq **`useReducer`-in `dispatch` funksiyası həmişə stabil qalır.**

Ən son hallda, sinfin `this` dəyəri kimi bir dəyər işlətmək istəyirsinizsə, mutasiya oluna bilən dəyişəni saxlamaq üçün [ref-dən](/docs/hooks-faq.html#is-there-something-like-instance-variables) istifadə edin. Sonra, siz bu ref-i oxuya və dəyişə bilərsiniz. Məsələn:

```js{2-6,10-11,16}
function Example(props) {
  // Ən son propları ref-də saxla.
  const latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });

  useEffect(() => {
    function tick() {
      // Ən son propları ref-dən oxu
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // Bu effekt heç vaxt çağrılmır
}
```

Yalnız daha yaxşı alternativ olmadıqda bu yoldan istifadə edin. Əgər xüsusi bir pattern işləmirsə bizə nümunə ilə [issue göndərin](https://github.com/facebook/react/issues/new).

### `shouldComponentUpdate` funksiyasını necə tətbiq edə bilərəm? {#how-do-i-implement-shouldcomponentupdate}

Propları dayaz müqayisə etmək üçün funksiya komponentini `React.memo` ilə əhatə edin:

```js
const Button = React.memo((props) => {
  // your component
});
```

Bu funksiyas Hook deyil. Çünki, bunu Hooklar kimi kompozisiya etmək mümkün deyil. `React.memo` funksiyası `PureComponent` sinfinə oxşayır. Lakin, bu funksiya yalnız propları müqayisə edir. (Xüsusi müqayisə funksiyasını təyin etmək üçün ikinci arqument əlavə edə bilərsiniz. Bu funksiya keçmiş və yeni propları qəbul edir və true qaytardıqda yeniliyi buraxır.)

Müqayisə etmək üçün tək state yeniliyinin olmadığından `React.memo` funksiyası state-i müqayisə etmir. Lakin, siz uşaqları saf edə bilər, hətta [fərdi uşaqları `useMemo` ilə optimallaşdıra bilərsiniz](/docs/hooks-faq.html#how-to-memoize-calculations).

### Hesablamaları necə memoizasiya edə bilərəm? {#how-to-memoize-calculations}

[`useMemo`](/docs/hooks-reference.html#usememo) Hooku ilə "əvvəlki" hesablamanı saxlayaraq render etmələr arası hesablamaları kəş edə bilərsiniz:

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

Yuxarıdakı kodda `computeExpensiveValue(a, b)` funksiyası çağrılır. Lakin, `[a, b]` asılılıqları dəyişmədikdə `useMemo` ilə bu funksiya ikinci dəfə çağrılmayacaq və son çağırışın dəyəri qaytarılacaq.

`useMemo` Hookuna göndərilən funksiyanın render etmə zamanı çağrıldığını unutmayın. Bu funksiyada render etmə zamanı etmədiyiniz heç bir əməliyyatı etməyin. Məsələn, yan effektləri `useEffect` Hookunda işlədin, `useMemo`-da yox.

**`useMemo` Hookuna semantik qarantiya kimi yox performans optimallaşdırması kimi etibar edin.** Gələcəkdə, React, əvvəlki memoizasiya olunmuş dəyərləri "unudub" bu dəyərləri sonrakı render etmə zamanı yenidən hesablaya bilər (məsələn, ekranda görünməyən komponentləri yaddaşdan sildikdə). Kodunuzu bu Hooku işlətmədən yazın. Sonra, `useMemo` əlavə edərək performansı optimallaşdırın. (Dəyərin *heç vaxt* yenidən hesablanmaması lazımdırsa, siz ref-i [lazy formada inisializasiya](#how-to-create-expensive-objects-lazily) edə bilərsiniz.)

Rahatlıq üçün `useMemo` ilə uşağın bahalı yenidən render etməsini atlaya bilərsiniz:

```js
function Parent({ a, b }) {
  // Yalnız `a` dəyişdikdə yenidən render etmə baş verir:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Yalnız `b` dəyişdikdə yenidən render etmə baş verir:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

Nəzərə alın ki, Hookları [tsıkllardan çağırmaq mümkün olmadığından](/docs/hooks-rules.html) bu yanaşma tsıkl ilə işləmir. Lakin, siyahı elementi üçün ayrı komponent ixrac edib bu komponentdən `useMemo` çağıra bilərsiniz.

### Bahalı obyektləri lazy formada necə yaratmaq mümkündür? {#how-to-create-expensive-objects-lazily}

Asılılıqlar dəyişmədikdə `useMemo` ilə [bahalı hesablamaları memoizasiya](#how-to-memoize-calculations) etmək mümkündür. Lakin, bu Hook yalnız işarə kimi işlədilir və hesablamanın yenidən icra olmadığını *siğortalamır*. Amma, bəzən obyektin yalnız bir dəfə yaranmasını siğortalamaq lazım olur.

**İlkin state-i yaratmağın bahalı olması ilk ssenarilərdən biridir:**

```js
function Table(props) {
  // ⚠️ createRows() funksiyası hər render etmə zamanı çağrılır
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```

İlkin state-i hər dəfə hesablamamaq üçün `useState` Hookuna **funksiya** göndərə bilərik:

```js
function Table(props) {
  // ✅ createRows() funksiyası yalnız bir dəfə çağrılır
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```

React bu funksiyanı yalnız ilk render zamanı çağıracaq. [`useState` API arayışına](/docs/hooks-reference.html#usestate) baxın.

**Bəzən, `useRef()`-in ilkin dəyərini də yaratmaqdan çəkinmək istəyə bilərsiniz.** Məsələn, imperativ sinif instansiyasının yalnız bir dəfə yaranmasını təmin etmək istəyə bilərsiniz:

```js
function Image(props) {
  // ⚠️ yeni IntersectionObserver obyekti hər render etmə zamanı yaranır
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
```

`useRef` Hooku `useState` Hooku kimi xüsusi funksiya **qəbul etmir**. Əvəzinə, bu obyekti lazy formada yaradan funksiya yarada bilərsiniz:

```js
function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver obyekti lazy formada yaranır
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // Lazım olduqda getObserver() funksiyasını çağırın
  // ...
}
```

Bu həll ilə obyekt lazım olmayana kimi bu obyekti yaratmaya bilərsiniz. Əlavə olaraq Flow və ya TypeScript işlətdikdə rahatlıq üçün `getObserver()` funksiyasına null olmayan tip təyin edə bilərsiniz.


### Render zamanı funksiyaların yaranması Hookları yavaşladır? {#are-hooks-slow-because-of-creating-functions-in-render}

Xeyr. Modern brauzerlərdə extremal ssenarilər istisna olmaqla closure-ları siniflər ilə müqayisə etdikdə əhəmiyyətli performans fərqi olmur.

Əlavə olaraq, Hookların dizaynı bir neçə formada daha səmərəlidir:

* Hooklar ilə siniflərdə olan sinif instansiyalarının yaranması və hadisə işləyicilərinin konstruktorda bind edilməsi ağırlıqlarından çəkinmək mümkündür.

* **Hookların idiomatik kodu ilə komponent ağacında** yüksək dərəcəli komponentlər, render etmə propları və kontekst işlədən kodlarda olduğu kimi **dərin nesting-lər etmək lazım deyil.** React, daha kiçik komponent ağaclarında daha az iş görür.

Adətən, React-də eyni sətrli funksiyaların performansı ilə bağlı qayğılar hər render etmə zamanı göndərilən callback-lərin uşaq komponentlərində `shouldComponentUpdate` optimallaşdırmasını sındırmasından gəlir. Hooklar ilə bu problemi üç tərəfdən düzəltmək mümkündür.

* [`useCallback`](/docs/hooks-reference.html#usecallback) Hooku ilə yenidən render etmələr arasında eyni callback-ə refaransı saxlayaraq `shouldComponentUpdate`-in düzgün işləməsini təmin etmək mümkündür:

    ```js{2}
    // `a` və ya `b` dəyişməyənə kimi funksiya dəyişməyəcək
    const memoizedCallback = useCallback(() => {
      doSomething(a, b);
    }, [a, b]);
    ```

* [`useMemo`](/docs/hooks-faq.html#how-to-memoize-calculations) Hooku ilə fərdi uşaq komponentlərinin yenilənməsini idarə edib Pure komponentlərə ehtiyacı azaltmaq mümkündür.

* Ən sonda [`useReducer`](/docs/hooks-reference.html#usereducer) Hooku ilə callback-ləri dərinə göndərməyi azaltmaq mümkündür (aşağıdakı bölmədə izah edilir).

### Callback-ləri göndərməkdən necə çəkinə bilərəm? {#how-to-avoid-passing-callbacks-down}

Biz, proqramçıların callback-ləri əl ilə komponent ağacının hər dərəcəsinə göndərilməsini sevmədiyini bilirik. Bunun daha açıq göründüyünə baxmayaraq bu, çox iş kimi görünə bilir.

Böyük ağaclarda alternativ kimi [`useReducer`](/docs/hooks-reference.html#usereducer)-in `dispatch` funksiyasını kontekst ilə göndərməyi tövsiyə edirik:

```js{4,5}
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // Qeyd: `dispatch` funksiyası render etmələr arasında dəyişmir
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```

`TodosApp`-in ağacının daxilində olan bütün uşaqlar `dispatch` funksiyasından istifadə edib əməliyyatları `TodosApp`-ə göndərə bilərlər:

```js{2,3}
function DeepChild(props) {
  // Əməliyyat icra etmək istədikdə `dispatch` funksiyasını kontekstdən ala bilərik.
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'salam' });
  }

  return (
    <button onClick={handleClick}>Todo əlavə et</button>
  );
}
```

Bu yanaşma ilə callback-ləri daha rahat idarə edə bilər (callback-ləri yönləndirmək lazım deyil) və callback problemini tam aradan qaldıra bilərik. Dərin yeniləmə əməliyyatları üçün `dispatch` funksiyasını bu formada göndərməyi tövsiyə edirik.

Nəzərə alın ki, applikasiya *state-ini* proplar (daha açıq formada) və ya kontekst (dərin yeniləmələr üçün daha rahatdır) ilə göndərə bilərsiniz. Əgər state-i kontekst ilə göndərirsinizsə, iki fərqli kontekst tipindən istifadə edin -- `dispatch` funksiyası konteskti heç vaxt dəyişmədiyindən bu funksiyanı işlədən komponentlər yenidən render edilməyəcəklər. Yalnız, applikasiya state-i lazım olduqda komponentlər yeniden render ediləcəklər.

### `useCallback`-dən tez-tez dəyişən dəyəri necə oxuya bilərəm? {#how-to-read-an-often-changing-value-from-usecallback}

>Qeyd
>
>Biz, fərdi callback-ləri proplar ilə göndərmək əvəzinə [`dispatch` funksiyasını kontekst ilə göndərməyi](#how-to-avoid-passing-callbacks-down) tövsiyə edirik. Aşağıdakı yanaşma bütünlük və çıxış yolu məqsədi ilə göstərilib.
>
>Əlavə olaraq, bu pattern-in [konkurrent modunda](/blog/2018/03/27/update-on-async-rendering.html) problemlər yarada biləcəyini unutmayın. Biz, gələcəkdə daha erqonomik alternativlər təmin etməyi planlayırıq. Lakin, indiki zamanda callback-in dəyəri dəyişdikdə callback-i yeniləmək ən təhlükəsiz yoldur.

Bəzi nadir ssenarilərdə callback-i [`useCallback`](/docs/hooks-reference.html#usecallback) ilə memoizasiya etmək lazım olur. Lakin, daxili funksiyanın tez-tez yenidən yarandığından memoizasiya işləmir. Əgər memoizasiya etdiyiniz funksiya hadisə işləyicisidirsə və render etmə zamanı işlədilmirsə, [ref-i instansiya dəyişəni kimi istifadə edərək](#is-there-something-like-instance-variables) ən son dəyəri bu ref-ə əl ilə yaza bilərsiniz:

```js{6,10}
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text; // Ref-ə yaz
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // Ref-dən oxu
    alert(currentText);
  }, [textRef]); // handleSubmit funksiyasını [text] asılılığı əlavə etdikdə yenidən yaranmasının qarşısını al

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```

Bunun çaşdırıcı pattern olmasına baxmayaraq siz bu formalı çıxış yolu optimallaşdırması tətbiq edə bilərsiniz. Bunu xüsusi Hooka ixrac etdikdə funksiyanı işlətmək asanlaşa bilər:

```js{4,16}
function Form() {
  const [text, updateText] = useState('');
  // Will be memoized even if `text` changes:
  const handleSubmit = useEventCallback(() => {
    alert(text);
  }, [text]);

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}

function useEventCallback(fn, dependencies) {
  const ref = useRef(() => {
    throw new Error('Render etmə zamanı hadisə işləyicisini çağırmaq mümkün deyil.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}
```

Hər iki halda biz **bu pattern-i işlətməyi tövsiyə etmirik.** Bu yanaşma yalnız bütünlük üçün göstərilib. Əvəzinə, [callback-ləri dərinə göndərməkdən çəkinmək ən yaxşı yoldur](#how-to-avoid-passing-callbacks-down).


## Daxilində {#under-the-hood}

### React, Hookları komponentlər ilə necə əlaqələndirir? {#how-does-react-associate-hook-calls-with-components}

React, cari render olunan komponenti izləyir. [Hookların Qaydalarına](/docs/hooks-rules.html) görə Hookların yalnız React komponentlərindən çağrıldığını (və ya React komponentlərindən çağrılan xüsusi Hooklardan çağrıldığını) bilirik.

React-də, hər komponent ilə əlaqəli "yaddaş sahələrinin" daxili siyahısı mövcuddur. Bu sahələr məlumat saxlamaq üçün sadə JavaScript obyektləridir. `useState()` kimi Hook çağrıldıqda bu Hook cari daxili sahəni oxuyur (və ya ilk render etmə zamanı inisializasiya edir) və pointer-i sonrakı sahəyə köçürür. Bu səbəbdən, `useState` çağırışlarının müstəqil lokal state-lərinin olması mümkündür.

### Hooklardan əvvəl nə var idi? {#what-is-the-prior-art-for-hooks}

Hooklar bir neçə mənbələrdən yaranan fikirlərin sintezidir:

* [react-future](https://github.com/reactjs/react-future/tree/master/07%20-%20Returning%20State) reposunda olan funksional API-lar ilə etdiyimiz köhnə eksperimentlər.
* [Rayn Florensin](https://github.com/ryanflorence) [Reactions Component](https://github.com/reactions/component) eksperimenti daxil olmaqla React cəmiyyətinin render prop API-ları ilə etdiyi eksperimentlər.
* [Dominik Qannaveyin](https://github.com/trueadm) render proplarının asan sintaksisi üçün [`adopt` açarı](https://gist.github.com/trueadm/17beb64288e30192f3aa29cad0218067) təklifi.
* [DisplayScript-də](http://displayscript.org/introduction.html) dəyişən və state sahələrinin saxlanması.
* ReasonReact-də olan [Reducer komponentləri](https://reasonml.github.io/reason-react/docs/en/state-actions-reducer.html).
* Rx-də olan [Abunəliklər](http://reactivex.io/rxjs/class/es6/Subscription.js~Subscription.html).
* Multicore OCaml-da olan [Cəbr (Algebraic) effektləri](https://github.com/ocamllabs/ocaml-effects-tutorial#2-effectful-computations-in-a-pure-setting).

Hookların orijinal dizaynını [Sebastian Markbåge](https://github.com/sebmarkbage) kəşf edib. Sonra, bu dizayn [Endryu Klark](https://github.com/acdlite), [Sofi Alpert](https://github.com/sophiebits), [Dominik Qannavey](https://github.com/trueadm) və React komandasının digər üzləri tərəfindən təmizləndi.

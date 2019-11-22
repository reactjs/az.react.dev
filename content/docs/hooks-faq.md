---
id: hooks-faq
title: Hooks FAQ
permalink: docs/hooks-faq.html
prev: hooks-reference.html
---

*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə klas yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.

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
  * [Bütün klas komponentlərini yenidən yazmalıyam?](#do-i-need-to-rewrite-all-my-class-components)
  * [Klaslar ilə edə bilmədiyim nələri Hooklar ilə edə bilərəm?](#what-can-i-do-with-hooks-that-i-couldnt-with-classes)
  * [React biliklərimin nə qədəri eyni qalır?](#how-much-of-my-react-knowledge-stays-relevant)
  * [Nə işlətməliyəm -- Hooklar, klaslar və ya hər ikisinin qarışığı?](#should-i-use-hooks-classes-or-a-mix-of-both)
  * [Hooklar klasların bütün ssenarilərini əhatə edir?](#do-hooks-cover-all-use-cases-for-classes)
  * [Hooklar render proplarını və yüksək dərəcəli komponentləri əvəzləyir?](#do-hooks-replace-render-props-and-higher-order-components)
  * [Hooklar Redux connect() və React Router kimi populyar API-lara necə təsir edir?](#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router)
  * [Hooklar statik tiplər ilə işləyirlər?](#do-hooks-work-with-static-typing)
  * [Hooklar ilə komponentləri necə test edə bilərəm?](#how-to-test-components-that-use-hooks)
  * [Lint qaydaları nələri tətbiq edirlər?](#what-exactly-do-the-lint-rules-enforce)
* **[Klaslardan Hooklara](#from-classes-to-hooks)**
  * [Lifecycle metodlarının Hooklar ilə uyğunluqları necədir?](#how-do-lifecycle-methods-correspond-to-hooks)
  * [Hooklar ilə məlumat yüklənməsini necə tətbiq edə bilərəm?](#how-can-i-do-data-fetching-with-hooks)
  * [İnstansiya dəyişənləri üçün Hook var?](#is-there-something-like-instance-variables)
  * [Bir və ya bir neçə state dəyişəni işlətməliyəm?](#should-i-use-one-or-many-state-variables)
  * [Effekti yalnız yenilik zamanı icra edə bilərəm?](#can-i-run-an-effect-only-on-updates)
  * [Keçmiş props və state-i necə əldə edə bilərəm?](#how-to-get-the-previous-props-or-state)
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
  * [Bahalı obyektləri lazy formada necə yarada bilərəm?](#how-to-create-expensive-objects-lazily)
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

Nəzərə alin ki, **Hookları aktivləşdirmək üçün bütün React paketlərinin versiyaları 16.8.0-dan yuxarı olmalıdır**. Paketləri (məsələn React DOM) yeniləməyi yaddan çıxardıqda Hooklar işləməyəcək.

Hooklar, [React Native 0.59-dan](https://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059) başlayaraq dəstəklənir.

### Bütün klas komponentlərini yenidən yazmalıyam? {#do-i-need-to-rewrite-all-my-class-components}

Xeyir. React-dən klasları silmək üçün [heç bir plan](/docs/hooks-intro.html#gradual-adoption-strategy) yoxdur. Yenidən yazmalara həmişə imkan olmadığından və məhsulların dərc edilməsi dayandırılmadığından klas komponentləri yaxın gələcəyə kimi dəstəklənəcək. Yeni kodu Hooklar ilə işlətməyi tövsiyyə edirik.

### Klaslar ilə edə bilmədiyim nələri Hooklar ilə edə bilərəm? {#what-can-i-do-with-hooks-that-i-couldnt-with-classes}

Hooklar ilə komponentlər arası funksional məntiqi paylaşmaq mümkündür. ["Xüsusi Hookların İstifadəsi"](/docs/hooks-custom.html) səhifəsində bu qabilliyətlərdən danışılır. React core komandasının üzvünün yazdığı [bu məqalədə](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889) Hookların yaratdığı yeni imkanlar haqqında dərindən danışılır.

### React biliklərimin nə qədəri eyni qalır? {#how-much-of-my-react-knowledge-stays-relevant}

Hooklar ilə state, lifecycle, kontekst, və ref-lər kimi React xüsusiyyətlərini daha birbaşa işlətmək olur. Hooklar, React-in işləmə prinsiplərini dəyişmirlər. Bu səbəbdən komponentlər, proplar və yuxarıdan aşağı məlumat axınından bilikli olmaq vacibdir.

Hookların özünün öyrənmə əyriliyi var. Sənədlərdə nəsə çatışmırsa, [bizə issue yazın](https://github.com/reactjs/reactjs.org/issues/new) və biz sizə kömək etməyə çalışacağıq.

### Nə işlətməliyəm -- Hooklar, klaslar və ya hər ikisinin qarışığı? {#should-i-use-hooks-classes-or-a-mix-of-both}

Hazır olduğunuz zaman yeni komponentləri Hooklar ilə yazmağı tövsiyyə edirik. Bunu etməmişdən öncə komandada hamının bu qərar ilə razılaşdığından və sənədlər ilə tanışlığı olduğundan əmin olun. Mövcud klasları yenidən yazmağı (məsələn, baqları düzəltmək üçün) planlaşdırmırsınızsa, mövcud klasları Hooklar ilə yenidən yazmağı tövsiyyə etmirik.

Hookları klas komponentlərinin *daxilindən* istifadə etmək olmaz. Lakin, eyni ağacda klas və Hooklar ilə funksiya komponentlərini istifadə edə bilərsiniz. Komponentin klas və ya Hooklar ilə işlədən funksiya olması tətbiq detalıdır. Gələcəkdə React komponentlərini yazmağın əsas yolunun Hooklar olduğunu gözləyirik.

### Hooklar klasların bütün ssenarilərini əhatə edir? {#do-hooks-cover-all-use-cases-for-classes}

Bizim məqsədimiz Hooklar ilə klasların bütün ssenarilərini əhatə etməkdir. İndiki zamanda `getSnapshotBeforeUpdate` və `componentDidCatch` lifecycle metodları üçün Hookların heç bir ekvivalenti yoxdur. Lakin, bu metodları da Hooklar ilə yaza biləcəyik.

Hookların hələ ki cavan olduğundan bəzi 3-cü tərəfin kitabxanaları ilə uyğun olmaya bilər.

### Hooklar render proplarını və yüksək dərəcəli komponentləri əvəzləyir? {#do-hooks-replace-render-props-and-higher-order-components}

Adətən, render proplar və yüksən dərəcəli komponentlər yalnız bir uşaq render edirlər. Belə ssenariləri Hooklar ilə əvəz etmək olar. Hər iki pattern-in öz yeri var (məsələn, virtual skrol edən komponentin `renderItem` propu və ya vizual konteyner komponentinin öz DOM strukturu ola bilər). Lakin, bir çox halda Hookları işlətmək bəz edir. Hookları işlətdikdə ağacdakı elementlərin sayı azalır.

### Hooklar Redux connect() və React Router kimi populyar API-lara necə təsir edir? {#what-do-hooks-mean-for-popular-apis-like-redux-connect-and-react-router}

İşlətdiyiniz eyni API-ları işlətməyə davam edə bilərsiniz.

React Redux v7.1.0-dən başlayaraq [Hookları dəstəkləyir](https://react-redux.js.org/api/hooks) və proqramçıları `useDispatch` və ya `useSelector` kimi Hooklar ilə təmin edir.

React Router v5.1-dən başlayaraq [Hookları dəstəkləyir](https://reacttraining.com/react-router/web/api/Hooks).

Gələcəkdə, digər kitabxanalar da Hookaları dəstəkləyə bilər.

### Hooklar statik tiplər ilə işləyirlər? {#do-hooks-work-with-static-typing}

Hooklar statik tiplər ilə dizayn olunublar. Hookların sadə funksiya olduğundan bunlara tip əlavə etmək yüksək dərəcəli komponentlər kimi pattern-lərə tip əlavə etməkdən daha asandır. Ən son Flow və TypeScritp React tərifləri React Hooklarını dəstəkləyir.

Daha vacib olaraq xüsusi Hooklar ilə React API-ını tiplər ilə daha sərt şəkildə məhdudlaşdırmaq mümkündür. React sizə primitivləri verir. Lakin, siz bu primitivləri fərqli formada billəşdirə bilərsiniz.

### Hooklar işlədən React komponentlərini necə test etmək mümkündür? {#how-to-test-components-that-use-hooks}

React-in nöqteyi nəzərindən Hooklar işlədən komponent sadə komponentdir. Əgər test etmə həlliniz React-in daxili xüsusiyyətlərindən istifadə etmirsə, Hooklar ilə olan komponentləri adi komponentlər kimi test edə bilərsiniz.

>Qeyd
>
>[Test Etmə Reseptlərində](/docs/testing-recipes.html) kopiyalaya biləcəyiniz bir neçə nümunə var.

Məsələn, gəlin bu sayğac komponentinə baxaq:

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

Biz bu komponenti React DOM ilə test edəcəyik. Davranışın brauzer ilə uyğunlaşması üçün biz render etmə və yeniləmə kodunu [`ReactTestUtils.act()`](/docs/test-utils.html#act) çağırışlarına əlavə edəcəyik:

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

Xüsusi Hooku test etmək istəyirsinizsə, testdə komponent yaradıb bu Hooku işlədə bilərsiniz. Sonra, yazdığınız komponenti test edə bilərsiniz.

Çox kod yazmamaq üçün komponentləri son istifadəçilərin işlətdiyi kimi test etmək fikri ilə dizayn olunmuş [React Testing Library](https://testing-library.com/react) kitabxanasından istifadə etməyi tövsiyyə edirik.

Əlavə məlumat üçün [Test Etmə Reseptləri](/docs/testing-recipes.html) səhifəsinə baxın.

### [Lint qaydaları](https://www.npmjs.com/package/eslint-plugin-react-hooks) nələri tətbiq edirlər? {#what-exactly-do-the-lint-rules-enforce}

Baqları tez tuta bilmək üçün [Hookların qaydalarını](/docs/hooks-rules.html) tətbiq edən [ESLint plagini](https://www.npmjs.com/package/eslint-plugin-react-hooks) təmin edirik. Bu plagin, "`use`" ilə başlayan və dərhal sonrakı hərfi böyük hərf ilə yazlıan funksiyanın Hook olduğunu ehtimal edir. Bu evristikanın əla olmadığını və bəzən səhv-positivlərin olacağını bilirik. Lakin, ekosistem səviyyəsində konvesiya olmadıqda Hooklar yaxşı işləməyəcək. Uzun adlar ilə də Hookların adaptasiyası və ya konvensiyanın təqibini yavaşladacaq.

Xüsusilə bu qayda aşağıdakı nöqtələri tətbiq edir:

* Hookların çağırışları `PascalCase` kimi yazılan funksiyalarının (komponent olduğu ehtimal edilir) və ya digər `useSomething` funksiyasının (xüsusi Hook olduğu ehtimal edilir) daxilindən çağrılır.
* Hooklar hər render zamanı eyni sıra ilə çağrılırlar.

Burada əlavə evristikalar da var. Bu evristikalar saxta müsbətlər ilə baqların tapılmasının balansını saxalayaraq zaman ilə dəyişə bilərlər.

## Klaslardan Hooklara {#from-classes-to-hooks}

### Lifecycle metodlarının Hooklar ilə uyğunluqları necədir? {#how-do-lifecycle-methods-correspond-to-hooks}

* `constructor`: Funksiya komponentlərinə konstruktor lazım deyil. Siz state-i [`useState`](/docs/hooks-reference.html#usestate) çağırışında inisializasiya edə bilərsiniz. Əgər ilkin state-in hesablanması bahalıdırsa, siz `useState` Hookuna funksiya göndərə bilərsiniz.

* `getDerivedStateFromProps`: [Render zamanı](#how-do-i-implement-getderivedstatefromprops) yenilik planlaşdırın.

* `shouldComponentUpdate`: [aşağıda](#how-do-i-implement-shouldcomponentupdate) `React.memo` funksiyasına baxın.

* `render`: Bu, funksiya komponentinin gövdəsidir.

* `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`: Bu funksiyaların bütün kombinasiyalarını [`useEffect` Hooku](/docs/hooks-reference.html#useeffect) ilə ([daha](#can-i-skip-an-effect-on-updates) [az](#can-i-run-an-effect-only-on-updates) işlənən ssenarilər daxil olmaqla) tətbiq edə bilərsiniz.

* `componentDidCatch` və `getDerivedStateFromError`: Bu funksiyaların üçün Hook ekvivalenti yoxdur. Lakin, gəcələcəkdə bunları da funksiya komponentləri ilə əvəz etmək mümkün olacaq.

### Hooklar ilə məlumat yüklənməsini necə tətbiq edə bilərəm? {#how-can-i-do-data-fetching-with-hooks}

Başlamaq üçün [kiçik demo-ya](https://codesandbox.io/s/jvvkoo8pq3) baxın. Hooklar ilə məlumat mübadiləsi haqqında əlavə məlumat üçün [bu məqaləni](https://www.robinwieruch.de/react-hooks-fetch-data/) oxuyun.

### İnstansiya dəyişənləri üçün Hook var? {#is-there-something-like-instance-variables}

Bəli! [`useRef()`](/docs/hooks-reference.html#useref) Hooku yalnız DOM referansları üçün işlədilmir. "ref" obyekti ümumi konteynerdir və bu obyektin `current` parametri klasın instansiya parametri kimi mutasiya oluna bilən istənilən dəyəri saxlaya bilər.

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

Konseptual olaraq ref-lər klasın instansiya dəyərlərinə bənzəyirlər. [Lazy inisializasiya](#how-to-create-expensive-objects-lazily) edirsinizsə, ref-ləri render zamanı yeniləməyin. Bu, gözlənilməz davranışlara səbəb ola bilər. Əvəzinə, ref-ləri hadisə işləyicilərindən və effektlərdən yeniləyin.

### Bir və ya bir neçə state dəyişəni işlətməliyəm? {#should-i-use-one-or-many-state-variables}

Klaslar işlətmisinizsə, `useState()` Hookunu bir dəfə çağırıb bütün state-i bir obyektdə saxlamaq istəyə bilərsiniz. Əgər istəyirsinizsə, bunu edə bilərsiniz. Aşağıdakı nümunədə maus hərətinin pozisiyası və ölçüsü lokal state-də saxlanır:

```js
function Box() {
  const [state, setState] = useState({ left: 0, top: 0, width: 100, height: 100 });
  // ...
}
```

İstifadəçi mausu tərpətdikdə `left` və `top` dəyərlərini dəyişən məntiqu yazmaq üçün bu dəyərləri əvvəlki state ilə özümüz biləşdirməliyik:

```js{4,5}
  // ...
  useEffect(() => {
    function handleWindowMouseMove(e) {
      // "...state" yayması ilə" width və height dəyərlərini itirməyəcəyimizdən əmin oluruq.
      setState(state => ({ ...state, left: e.pageX, top: e.pageY }));
    }
    // Qeyd: Bu tətbiq sadələşdirilib
    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => window.removeEventListener('mousemove', handleWindowMouseMove);
  }, []);
  // ...
```

State dəyişənini yenilədikdə state-də olan dəyər *əvəz olunur*. Bu, yenilənən dəyəri state obyekti ilə *birləşdirən* klasın `this.setState` funksiyasından fərqlidir.

Əgər avtomatik birləşməni bəyənirsinizsə, state yeniliklərini state obyekti ilə birləşdirən `useLegacyState` adlı xüsusi Hook yarada bilərsiniz. Lakin, biz **state-i bir neçə state dəyişənlərinə parçalamağı tövsiyyə edirik.**

Məslən, biz komponent state-ini `position` və `size` obyektlərinə parçalayıb obyektləri biləşdirmədən `position` dəyərini yeni dəyər ilə əvəz edə bilərik:

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

`position` state dəyəri üçün olan `useState` çağırışını və bu state üçün lazım olan effekti state-li məntiqi dəyişmədən xüsusi Hooka necə köçürdüyümüzə fikir verin. Bütün state bir obyektdə olduqda state-ləri ixrac etmək daha çətin olacaqdı.

Bütün state-ləri bir `useState` çağırışında saxlamaq və ya hər state üçün ayrı `useState` çağırışı işlətmək eyni nəticəya çıxacaqlar. Bu iki ekstremlər arasında balans tapıb əlaqəli state-ləri müstəqil state dəyişənlərinə qruplaşdırdıqda komponentləri oxumaq asanlaşır. State məntiqi mürəkkəbləşdirkdə xüsusi Hook və ya [reducer](/docs/hooks-reference.html#usereducer) işlətməyi tövsiyyə edirik.

### Effekti yalnız yenilik zamanı icra edə bilərəm? {#can-i-run-an-effect-only-on-updates}

Bu çox nadir ssenaridir. Bu lazım olduqda ilk və ya sonrakı render etməni təyin etmək üçün boolin dəyəri saxlayan [mutasiya olunan ref](#is-there-something-like-instance-variables) saxlayıb, bu ref-in dəyərini effekt çağırışında yoxlayın. (Bunu çox elədiyinizi görürsünüzsə, bu məntiq üçün xüsusi Hook yarada bilərsiniz.)

### Keçmiş props və state-i necə əldə edə bilərəm? {#how-to-get-the-previous-props-or-state}

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

Bu, biraz çaşdırıcı ola bilər. Lakin, siz bunu xüsusi Hooka ixrac edə bilərsiniz:

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

Bu ssenarinin çox işlədildiyindən gələcəkdə React-də `usePrevious` Hooku ola bilər.

[Törənən state üçün tövsiyyə olunan pattern-ə də](#how-do-i-implement-getderivedstatefromprops) baxın.

### Niyə funksiya daxilində köhnə state və prop dəyərləri görürəm? {#why-am-i-seeing-stale-props-or-state-inside-my-function}

Komponent daxilində olan bütün funksiyalar (hadisə işləyiciləri və effektlər daxil olmaqla) render zamanı yaranan bütün state və propları "görürlər." Məsələn, aşağıdakı kimi koda baxaq:

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

"Xəbərdarlığı göstər" düyməsini tıklayıb sayqacı artırdıqda xəbərdarlıqda **"Xəbərdarlığı göstər" tıklandığı zaman təyin edilən** `count` dəyişəninin dəyəri göstəriləcək. Bu, state və propların dəyişmədiyini fikirləşən kodlarda baqların qarşısını alır.

Əgər asinxron callback-dən *ən son* state-i oxumaq istəyirsinizsə, bu dəyəri [ref-də](/docs/hooks-faq.html#is-there-something-like-instance-variables) saxlayıb, mutasiya edib və oxuya bilərsiniz.

Ən sonda, köhnə state və ya propları görməyin səbəblərindən biri "asılılıq massivi* optimallaşdırmasından istifadə etdikdə bütün asılılıqların təyin edilməməsidir. Məsələn, əgər effektin ikinci arqumentində `[]` massivi təyin edilib amma effektin daxilində `someProp` işlədilibsə, effektdə `someProp` dəyərinin ilkin propu "görünəcək*. Bunu həll etmək üçün asılılıq massivini silmək və ya düzəltmək lazımdır. [Funksiyaları massivdə işlətmək](#is-it-safe-to-omit-functions-from-the-list-of-dependencies) və asılılıqları səhvən buraxmadan effektləri daha az icra etmək üçün [digər strategiyalar](#what-can-i-do-if-my-effect-dependencies-change-too-often) haqqında məlumat almaq üçün göstərilən linklərə baxın.

>Qeyd
>
>Biz, [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) paketinin [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) qaydasından istifadə etməyi tövsiyyə edirik. Bu qayda, asılılıqların səhv göstərildiyini göstərir və düzəliş təklif edir.

### `getDerivedStateFromProps` funksiyasını necə tətbiq edə bilərəm? {#how-do-i-implement-getderivedstatefromprops}

Bir çox halda [bunun lazım olmadığına](/blog/2018/06/07/you-probably-dont-need-derived-state.html) baxmayaraq lazım olan bəzi nadir hallarda (məsələn, `<Transition>` komponentini tətbiq etdikdə) siz state-i render etmə zamanı yeniləyə bilərsiniz. React, ilk renderdən dərhal sonra komponenti yenilənmiş state ilə yenilədiyindən bu əməliyyat bahalı olmayacaq.

Aşağıdakı nümunədə biz `row` propunun əvvəlki dəyərini state dəyişənində saxlayaraq dəyərləri müqayisə edirik:

```js
function ScrollView({row}) {
  let [isScrollingDown, setIsScrollingDown] = useState(false);
  let [prevRow, setPrevRow] = useState(null);

  if (row !== prevRow) {
    // Son render etmədən sonra row dəyəri dəyişdiyindən isScrollingDown state-ini yenilə.
    setIsScrollingDown(prevRow !== null && row > prevRow);
    setPrevRow(row);
  }

  return `Aşağı sckrol edilir: ${isScrollingDown}`;
}
```

İlk baxışda bu qəribə görünə bilər. Lakin, render etmə zamanı yeniləmə əməliyyatı `getDerivedStateFromProps` funksiyası ilə konseptual olaraq eynidir.

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

Adətən bunun lazım olmadığına baxmayaraq [`useImperativeHandle`](/docs/hooks-reference.html#useimperativehandle) Hooku ilə bəzi imperativ metodları valideyn komponentə göstərə bilərsiniz.

### DOM nodunu necə ölçə bilərəm? {#how-can-i-measure-a-dom-node}

DOM nodunun ölçüsünü və ya pozisiyasını hesablamaq üçün [callback ref-dən](/docs/refs-and-the-dom.html#callback-refs) istifadə edə bilərsiniz. Fərqli noda ref qoşulduqda React callback-i çağıracaq. Bu, [kiçik demo-ya](https://codesandbox.io/s/l7m0v5x4v9) baxın:

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

`useCallback`-in asılılıqlar massivinə `[]` göndərildiyində fikir verin. Boş massivi, ref callback-inin dəyişmədiyini və yenidən render etmələr zamanı eyni qaldığını siğortaladığından React, bu funksiyanı lazımsız yerə çağırmayacaq.

İstədiyiniz zaman bu məntiqi xüsusi Hooka [ixrac edə bilərsiniz](https://codesandbox.io/s/m5o42082xy):

```js{2}
function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h1 ref={ref}>Salam dünya</h1>
      {rect !== null &&
        <h2>uxarıdakı başlığın hündürlüyü: {Math.round(rect.height)}px</h2>
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

Ümumilikdə, xeyir.

```js{3,8}
function Example({ someProp }) {
  function doSomething() {
    console.log(someProp);
  }

  useEffect(() => {
    doSomething();
  }, []); // 🔴 Bu problem yaradacaq (`doSomething` funksiyası `someProp` işlədir)
}
```

Effektdən kənarda olan funksiyaların hansı state və propları işlətdiyini yadda saxlamaq çətindir. Bu səbədən **effektdə işlədiləcək funksiyaları effektin *daxilində* yaratmağı tövsiyyə edirik.** Bu həll ilə komponent effektin komponent scope-unda olan hansı dəyərlərdən asılı olduğunu daha aydın görmək mümkündür:

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
}, []); // ✅ OK. bu nümunədə komponent scope-unda olan *heç bir* dəyəri işlətmirik
```

Ssenaridən asılı olaraq aşağıda digər seçimlər də göstərilir.

>Qeyd
>
>Biz, [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) paketinin [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) qaydasından istifadə etməyi tövsiyyə edirik. Bu qayda, asılılıqların səhv göstərildiyini göstərir və düzəliş təklif edir.

Gəlin bunun niyə vacib olduğuna baxaq.

`useEffect`, `useMemo`, `useCallback` və ya `useImperativeHandle` Hooklarının son arqumentinə [asılılıqlar siyahısı](/docs/hooks-reference.html#conditionally-firing-an-effect) təyin etdikdə Hooka göndərilən funksiyanın işlətdiyi bütün React məlumat axınına aid olan dəyərlərin hamısı bu massivdə işlədilməlidir.

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

**Bunu düzəltmək üçün funksiyanı effektin _daxilinə_ köçürməyi tövsiyyə edirik**. Bu həll ilə effektin hansı state və ya proplar işlətdiyini bilmək asanlaşır və bu dəyərlərin həmişə təyin olunduğu siğortalanır:

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

* **Funksiyanı komponentdən kənarda köçürün**. Bu yol ilə funksiyanın heç bir state və ya proplardan asılı olmayacağı qarantiyalanır. Bu səbəbdən funksiyanı asılılıqlar massivinə əlavə etmək mümkün deyil.
* Əgər çağırdığınız funksiya təmiz hesablamadırsa və render etmə zamanı çağrıla bilirsə, siz **bu funkisyanı effektin kənarından çağıra bilər** və effekti funksiyanın qaytardığı dəyərdən asılı edə bilərsiniz.
* Ən son variant kimi **funksiyanı effektin asılılıqlar massivinə əlavə edib _bu funksiyanın tətbiqini_** [`useCallback`](/docs/hooks-reference.html#usecallback) Hooku ilə əhatə edə bilərsiniz. Bu, funksiyanın **öz asılılıqları** dəyişməyənə kimi hər render zamanı yeni funksiyanın olmayacağını təmin edir:

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

Yuxarıdakı nümunədə funksiyanın asılılıqlar massivində **olduğuna** fikir verin. Bu, `ProductPage`-in `productId` propunda olan dəyişikliyin `ProductDetails` komponentində yenidən yüklənməni avtomatik icra edir.

### What can I do if my effect dependencies change too often? {#what-can-i-do-if-my-effect-dependencies-change-too-often}

Sometimes, your effect may be using state that changes too often. You might be tempted to omit that state from a list of dependencies, but that usually leads to bugs:

```js{6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // This effect depends on the `count` state
    }, 1000);
    return () => clearInterval(id);
  }, []); // 🔴 Bug: `count` is not specified as a dependency

  return <h1>{count}</h1>;
}
```

The empty set of dependencies, `[]`, means that the effect will only run once when the component mounts, and not on every re-render. The problem is that inside the `setInterval` callback, the value of `count` does not change, because we've created a closure with the value of `count` set to `0` as it was when the effect callback ran. Every second, this callback then calls `setCount(0 + 1)`, so the count never goes above 1.

Specifying `[count]` as a list of dependencies would fix the bug, but would cause the interval to be reset on every change. Effectively, each `setInterval` would get one chance to execute before being cleared (similar to a `setTimeout`.) That may not be desirable. To fix this, we can use the [functional update form of `setState`](/docs/hooks-reference.html#functional-updates). It lets us specify *how* the state needs to change without referencing the *current* state:

```js{6,9}
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1); // ✅ This doesn't depend on `count` variable outside
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ Our effect doesn't use any variables in the component scope

  return <h1>{count}</h1>;
}
```

(The identity of the `setCount` function is guaranteed to be stable so it's safe to omit.)

Now, the `setInterval` callback executes once a second, but each time the inner call to `setCount` can use an up-to-date value for `count` (called `c` in the callback here.)

In more complex cases (such as if one state depends on another state), try moving the state update logic outside the effect with the [`useReducer` Hook](/docs/hooks-reference.html#usereducer). [This article](https://adamrackis.dev/state-and-use-reducer/) offers an example of how you can do this. **The identity of the `dispatch` function from `useReducer` is always stable** — even if the reducer function is declared inside the component and reads its props.

As a last resort, if you want something like `this` in a class, you can [use a ref](/docs/hooks-faq.html#is-there-something-like-instance-variables) to hold a mutable variable. Then you can write and read to it. For example:

```js{2-6,10-11,16}
function Example(props) {
  // Keep latest props in a ref.
  let latestProps = useRef(props);
  useEffect(() => {
    latestProps.current = props;
  });

  useEffect(() => {
    function tick() {
      // Read latest props at any time
      console.log(latestProps.current);
    }

    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []); // This effect never re-runs
}
```

Only do this if you couldn't find a better alternative, as relying on mutation makes components less predictable. If there's a specific pattern that doesn't translate well, [file an issue](https://github.com/facebook/react/issues/new) with a runnable example code and we can try to help.

### `shouldComponentUpdate` funksiyasını necə tətbiq edə bilərəm? {#how-do-i-implement-shouldcomponentupdate}

Propları dayaz müqayisə etmək üçün funksiya komponentini `React.memo` ilə əhatə edin:

```js
const Button = React.memo((props) => {
  // your component
});
```

Bu Hook deyil. Çünki, bunu Hooklar kimi kompozisiya etmək mümkün deyil. `React.memo` funksiyası `PureComponent` klasına oxşayır. Lakin, bu funksiya yalnız propları müqayisə edir. (Xüsusi müqayisə funksiyasını təyin etmək üçün ikinci arqument əlavə edə bilərsiniz. Bu funksiya keçmiş və yeni propları qəbul edir və true qaytardıqda yeniliyi buraxır.)

Müqayisə etmək üçün tək state yeniliyinin olmadığından `React.memo` funksiyası state-i müqayisə etmir. Lakin, siz uşaqları saf edə bilər, hətta [fərdi uşaqları `useMemo` ilə optimallaşdıra bilərsiniz](/docs/hooks-faq.html#how-to-memoize-calculations).

### How to memoize calculations? {#how-to-memoize-calculations}

The [`useMemo`](/docs/hooks-reference.html#usememo) Hook lets you cache calculations between multiple renders by "remembering" the previous computation:

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

This code calls `computeExpensiveValue(a, b)`. But if the dependencies `[a, b]` haven't changed since the last value, `useMemo` skips calling it a second time and simply reuses the last value it returned.

Remember that the function passed to `useMemo` runs during rendering. Don't do anything there that you wouldn't normally do while rendering. For example, side effects belong in `useEffect`, not `useMemo`.

**You may rely on `useMemo` as a performance optimization, not as a semantic guarantee.** In the future, React may choose to "forget" some previously memoized values and recalculate them on next render, e.g. to free memory for offscreen components. Write your code so that it still works without `useMemo` — and then add it to optimize performance. (For rare cases when a value must *never* be recomputed, you can [lazily initialize](#how-to-create-expensive-objects-lazily) a ref.)

Conveniently, `useMemo` also lets you skip an expensive re-render of a child:

```js
function Parent({ a, b }) {
  // Only re-rendered if `a` changes:
  const child1 = useMemo(() => <Child1 a={a} />, [a]);
  // Only re-rendered if `b` changes:
  const child2 = useMemo(() => <Child2 b={b} />, [b]);
  return (
    <>
      {child1}
      {child2}
    </>
  )
}
```

Note that this approach won't work in a loop because Hook calls [can't](/docs/hooks-rules.html) be placed inside loops. But you can extract a separate component for the list item, and call `useMemo` there.

### How to create expensive objects lazily? {#how-to-create-expensive-objects-lazily}

`useMemo` lets you [memoize an expensive calculation](#how-to-memoize-calculations) if the dependencies are the same. However, it only serves as a hint, and doesn't *guarantee* the computation won't re-run. But sometimes you need to be sure an object is only created once.

**The first common use case is when creating the initial state is expensive:**

```js
function Table(props) {
  // ⚠️ createRows() is called on every render
  const [rows, setRows] = useState(createRows(props.count));
  // ...
}
```

To avoid re-creating the ignored initial state, we can pass a **function** to `useState`:

```js
function Table(props) {
  // ✅ createRows() is only called once
  const [rows, setRows] = useState(() => createRows(props.count));
  // ...
}
```

React will only call this function during the first render. See the [`useState` API reference](/docs/hooks-reference.html#usestate).

**You might also occasionally want to avoid re-creating the `useRef()` initial value.** For example, maybe you want to ensure some imperative class instance only gets created once:

```js
function Image(props) {
  // ⚠️ IntersectionObserver is created on every render
  const ref = useRef(new IntersectionObserver(onIntersect));
  // ...
}
```

`useRef` **does not** accept a special function overload like `useState`. Instead, you can write your own function that creates and sets it lazily:

```js
function Image(props) {
  const ref = useRef(null);

  // ✅ IntersectionObserver is created lazily once
  function getObserver() {
    if (ref.current === null) {
      ref.current = new IntersectionObserver(onIntersect);
    }
    return ref.current;
  }

  // When you need it, call getObserver()
  // ...
}
```

This avoids creating an expensive object until it's truly needed for the first time. If you use Flow or TypeScript, you can also give `getObserver()` a non-nullable type for convenience.


### Are Hooks slow because of creating functions in render? {#are-hooks-slow-because-of-creating-functions-in-render}

No. In modern browsers, the raw performance of closures compared to classes doesn't differ significantly except in extreme scenarios.

In addition, consider that the design of Hooks is more efficient in a couple ways:

* Hooks avoid a lot of the overhead that classes require, like the cost of creating class instances and binding event handlers in the constructor.

* **Idiomatic code using Hooks doesn't need the deep component tree nesting** that is prevalent in codebases that use higher-order components, render props, and context. With smaller component trees, React has less work to do.

Traditionally, performance concerns around inline functions in React have been related to how passing new callbacks on each render breaks `shouldComponentUpdate` optimizations in child components. Hooks approach this problem from three sides.

* The [`useCallback`](/docs/hooks-reference.html#usecallback) Hook lets you keep the same callback reference between re-renders so that `shouldComponentUpdate` continues to work:

    ```js{2}
    // Will not change unless `a` or `b` changes
    const memoizedCallback = useCallback(() => {
      doSomething(a, b);
    }, [a, b]);
    ```

* The [`useMemo`](/docs/hooks-faq.html#how-to-memoize-calculations) Hook makes it easier to control when individual children update, reducing the need for pure components.

* Finally, the [`useReducer`](/docs/hooks-reference.html#usereducer) Hook reduces the need to pass callbacks deeply, as explained below.

### How to avoid passing callbacks down? {#how-to-avoid-passing-callbacks-down}

We've found that most people don't enjoy manually passing callbacks through every level of a component tree. Even though it is more explicit, it can feel like a lot of "plumbing".

In large component trees, an alternative we recommend is to pass down a `dispatch` function from [`useReducer`](/docs/hooks-reference.html#usereducer) via context:

```js{4,5}
const TodosDispatch = React.createContext(null);

function TodosApp() {
  // Note: `dispatch` won't change between re-renders
  const [todos, dispatch] = useReducer(todosReducer);

  return (
    <TodosDispatch.Provider value={dispatch}>
      <DeepTree todos={todos} />
    </TodosDispatch.Provider>
  );
}
```

Any child in the tree inside `TodosApp` can use the `dispatch` function to pass actions up to `TodosApp`:

```js{2,3}
function DeepChild(props) {
  // If we want to perform an action, we can get dispatch from context.
  const dispatch = useContext(TodosDispatch);

  function handleClick() {
    dispatch({ type: 'add', text: 'hello' });
  }

  return (
    <button onClick={handleClick}>Add todo</button>
  );
}
```

This is both more convenient from the maintenance perspective (no need to keep forwarding callbacks), and avoids the callback problem altogether. Passing `dispatch` down like this is the recommended pattern for deep updates.

Note that you can still choose whether to pass the application *state* down as props (more explicit) or as context (more convenient for very deep updates). If you use context to pass down the state too, use two different context types -- the `dispatch` context never changes, so components that read it don't need to rerender unless they also need the application state.

### How to read an often-changing value from `useCallback`? {#how-to-read-an-often-changing-value-from-usecallback}

>Note
>
>We recommend to [pass `dispatch` down in context](#how-to-avoid-passing-callbacks-down) rather than individual callbacks in props. The approach below is only mentioned here for completeness and as an escape hatch.
>
>Also note that this pattern might cause problems in the [concurrent mode](/blog/2018/03/27/update-on-async-rendering.html). We plan to provide more ergonomic alternatives in the future, but the safest solution right now is to always invalidate the callback if some value it depends on changes.

In some rare cases you might need to memoize a callback with [`useCallback`](/docs/hooks-reference.html#usecallback) but the memoization doesn't work very well because the inner function has to be re-created too often. If the function you're memoizing is an event handler and isn't used during rendering, you can use [ref as an instance variable](#is-there-something-like-instance-variables), and save the last committed value into it manually:

```js{6,10}
function Form() {
  const [text, updateText] = useState('');
  const textRef = useRef();

  useEffect(() => {
    textRef.current = text; // Write it to the ref
  });

  const handleSubmit = useCallback(() => {
    const currentText = textRef.current; // Read it from the ref
    alert(currentText);
  }, [textRef]); // Don't recreate handleSubmit like [text] would do

  return (
    <>
      <input value={text} onChange={e => updateText(e.target.value)} />
      <ExpensiveTree onSubmit={handleSubmit} />
    </>
  );
}
```

This is a rather convoluted pattern but it shows that you can do this escape hatch optimization if you need it. It's more bearable if you extract it to a custom Hook:

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
    throw new Error('Cannot call an event handler while rendering.');
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

In either case, we **don't recommend this pattern** and only show it here for completeness. Instead, it is preferable to [avoid passing callbacks deep down](#how-to-avoid-passing-callbacks-down).


## Under the Hood {#under-the-hood}

### How does React associate Hook calls with components? {#how-does-react-associate-hook-calls-with-components}

React keeps track of the currently rendering component. Thanks to the [Rules of Hooks](/docs/hooks-rules.html), we know that Hooks are only called from React components (or custom Hooks -- which are also only called from React components).

There is an internal list of "memory cells" associated with each component. They're just JavaScript objects where we can put some data. When you call a Hook like `useState()`, it reads the current cell (or initializes it during the first render), and then moves the pointer to the next one. This is how multiple `useState()` calls each get independent local state.

### What is the prior art for Hooks? {#what-is-the-prior-art-for-hooks}

Hooks synthesize ideas from several different sources:

* Our old experiments with functional APIs in the [react-future](https://github.com/reactjs/react-future/tree/master/07%20-%20Returning%20State) repository.
* React community's experiments with render prop APIs, including [Ryan Florence](https://github.com/ryanflorence)'s [Reactions Component](https://github.com/reactions/component).
* [Dominic Gannaway](https://github.com/trueadm)'s [`adopt` keyword](https://gist.github.com/trueadm/17beb64288e30192f3aa29cad0218067) proposal as a sugar syntax for render props.
* State variables and state cells in [DisplayScript](http://displayscript.org/introduction.html).
* [Reducer components](https://reasonml.github.io/reason-react/docs/en/state-actions-reducer.html) in ReasonReact.
* [Subscriptions](http://reactivex.io/rxjs/class/es6/Subscription.js~Subscription.html) in Rx.
* [Algebraic effects](https://github.com/ocamllabs/ocaml-effects-tutorial#2-effectful-computations-in-a-pure-setting) in Multicore OCaml.

[Sebastian Markbåge](https://github.com/sebmarkbage) came up with the original design for Hooks, later refined by [Andrew Clark](https://github.com/acdlite), [Sophie Alpert](https://github.com/sophiebits), [Dominic Gannaway](https://github.com/trueadm), and other members of the React team.

---
id: hooks-reference
title: Hookların API Arayışı
permalink: docs/hooks-reference.html
prev: hooks-custom.html
next: hooks-faq.html
---

*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə sinif yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.

Bu səhifədə React-in daxili Hooklarının API-ları təsvir edilir.

Əgər Hooklara yeni başlamısınızsa, [icmal səhifəsindən](/docs/hooks-overview.html) başlamağı tövsiyə edirik. Əlavə olaraq, [çox verilən suallar](/docs/hooks-faq.html) bölməsindən faydalı məlumatlar ala bilərsiniz.

- [Əsas Hooklar](#basic-hooks)
  - [`useState`](#usestate)
  - [`useEffect`](#useeffect)
  - [`useContext`](#usecontext)
- [Əlavə Hooklar](#additional-hooks)
  - [`useReducer`](#usereducer)
  - [`useCallback`](#usecallback)
  - [`useMemo`](#usememo)
  - [`useRef`](#useref)
  - [`useImperativeHandle`](#useimperativehandle)
  - [`useLayoutEffect`](#uselayouteffect)
  - [`useDebugValue`](#usedebugvalue)

## Əsas Hooklar {#basic-hooks}

### `useState` {#usestate}

```js
const [state, setState] = useState(initialState);
```

State dəyəri və bu dəyəri yeniləmək üçün funksiya qaytarır.

İlk render zamanı qaytarılan state (`state`) ilk arqumentə göndərilən dəyərə (`initialState`) bərabərdir.

`setState` funksiyası state-i yeniləmək üçün işlədilir. Bu funksiya yeni state dəyəri qəbul edir və komponenti yeniden render etmə sırasına əlavə edir.

```js
setState(newState);
```

Sonrakı render etmələr zamanı `useState` funksiyasından qaytarılan dəyər ən yeni state dəyəri olacaq.

>Qeyd
>
>React, `setState` funksiyasının identikliyinin stabil olduğunu və yenidən render etmələr zamanı dəyişmədiyini siğortalayır. Bu səbəbdən, bu funksiyanı `useEffect` və ya `useCallback` Hooklarının asılılıq siyahısına əlavə etmək lazım deyil.

#### Funksional yeniliklər {#functional-updates}

Yeni state-i əvvəlki state əsasında hesablamaq üçün `setState` funksiyasına yeniləmə funksiya göndərə bilərsiniz. Bu funksiya, əvvəlki state dəyərini arqument kimi qəbul edir və yenilənəcək dəyəri qaytarır. Aşağıdakı sayğac nümunəsində `setState` funksiyasının hər iki (funksiya və sadə) forması göstərilir:

```js
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Say: {count}
      <button onClick={() => setCount(initialCount)}>Sıfırla</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

"+" və "-" düymələri tıklandıqda yeniliyin əvvəlki state-dən asılı olduğundan bu düymələrdə yeniləmə funksiyasının funksional formasından istifadə edilir. Lakin, "Sıfırla" düyməsi sayğacın dəyərini ilkin dəyərə qaytardığından bu düymədə yeniləmə funksiyasının sadə formasından istifadə edilir.

Yeniləmə funksiyası cari dəyərə bərabər olan dəyər qaytardıqda sonrakı yenidən render etmə əməliyyatı tamamilə atlanacaq.

> Qeyd
>
> Sinif komponentlərində olan `setState` funksiyasından fərqli olaraq `useState` Hooku yeni obyektləri köhnə state-ə birləşdirmir. Siz, funksiya formasından və obyekt yayma sintaksisindən istifadə edərək sinif komponentlərində olan state davranışını tətbiq edə bilərsiniz:
>
> ```js
> const [state, setState] = useState({});
> setState(prevState => {
>   // Burada Object.assign funksiyası da işləyəcək
>   return {...prevState, ...updatedValues};
> });
> ```
>
> Bunu, `useReducer` Hooku işlədərək də tətbiq etmək mümkündür. Bu Hook, bir neçə sub-dəyərdən asılı state obyektlərini idarə etmək üçün daha uyğundur.

#### İlkin state-in "lazy" təyini {#lazy-initial-state}

`initialState` arqumenti yalnız ilk render zamanı işlədilir. Bu dəyər sonrakı render etmələr zamanı işlədilmir. Əgər ilkin state bahalı hesablamanın nəticəsidirsə, ilkin dəyərə yalnız ilkin render zamanı çağrılan funksiya göndərə bilərsiniz:

```js
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

#### State yeniliyini atlamaq {#bailing-out-of-a-state-update}

Əgər State Hooku cari dəyərinə bərabər dəyər ilə yenilənirsə, React, uşaqları render etmədən və effektləri çağırmadan bu yeniliyi atlayacaq. (React, [`Object.is` müqayisə alqoritmindən](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) istifadə edir.)

Nəzərə alın ki, React, yeniliyi atlamadan öncə spesifik komponenti render edə bilər. Bu davranışdan narahat olmaq lazım deyil. Çünki, React lazımsız yerə ağacın "dərinliyinə" getməyəcək. Əgər render zamanı bahalı hesablamalar edirsinizsə bu hesablamaları `useMemo` Hooku ilə optimallaşdıra bilərsiniz.

### `useEffect` {#useeffect}

```js
useEffect(didUpdate);
```

İmperativ və ola bilsin effektli kod ehtiva edən funksiya qəbul edir.

Mutasiyalar, abunəliklər, taymerlər, loqqinqlər və digər yan effektlərini funksiya komponentinin əsas gövdəsindən (digər sözlə React-in _render fazası_) çağırmaq olmaz. Bu, qarışıq baqlara və UI-da uyğunsuzluqlara səbəb ola bilər.

Əvəzinə `useEffect` Hookundan istifadə edin. `useEffect`-ə göndərilən funksiya, render olunan komponent ekranda göründükdən sonra çağrılacaq. Effektlərə React-in funksional dünyasından imperativ dünyaya açılan qapı kimi baxın.

Normalda, effektlər hər render əməliyyatından sonra icra edilir. Lakin, effektləri [yalnız müəyyən dəyərlər dəyişəndə](#conditionally-firing-an-effect) icra etmək mümkündür.

#### Effektin təmizlənməsi {#cleaning-up-an-effect}

Adətən, abunəlik və ya taymer kimi effektlər yarandıqda bu effektlər komponentlər silinmədən öncə təmizlənməlidir. `useEffect`-ə göndərilən funksiya təmizləmə funksiyası qaytararaq təmizlik işlərini icra edə bilər. Məsələn, abunəlik düzəltmək üçün:

```js
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    // Abunəliyi sil
    subscription.unsubscribe();
  };
});
```

Yaddaş sızmalarının qabağını almaq üçün təmizləmə funksiyası komponent silinməmişdən öncə çağrılır. Əlavə olaraq, əgər komponent bir neçə dəfə render olunursa (normalda belə olur), **köhnə effekt yeni effekt icra olunmamışdan öncə silinəcək**. Göstərdiyimiz nümunədə hər yeniləmədən sonra yeni abunəlik yaranır. Effektlərin hər yenilik zamanı çağrılmaması üçün sonrakı bölməyə baxın.

#### Effektlərin icra zamanı {#timing-of-effects}

`componentDidMount` və `componentDidUpdate` metodlarından fərqli olaraq `useEffect`-ə göndərilən funksiya brauzer rənglənməsindən **sonra** (təxira salınmış hadisə ilə) çağrılır. Bu səbəbə görə bir çox yan effetlərdən (abunəlik və hadisə işləyiciləri kimi) istifadə etmək mümkündür. Çünki, bu işlərinin çoxu səhifənin brauzer ilə render edilməsinin qarşısını almamalıdır.

Lakin, bütün effektlər təxirə salına bilmir. Məsələn, istifadəçinin vizual uyğunsuzluğu görməməsi üçün istifadəçinin dərhal görəcəyi DOM mutasiyası sonrakı rənglənmədən öncə sinxron çağrılmalıdır. (Bu fərq, passiv və ya aktiv hadisə dinləyiciləri ilə konseptual olaraq eynidir.) Bu tip effektlər üçün React-də[`useLayoutEffect`](#uselayouteffect) adlı əlavə Hook mövcuddur. Bu Hookun imzası `useEffect` ilə eynidir. Bu iki Hook arasındakı əsas fərq effektlərin nə zaman çağrılması ilə əlaqəlidir.

`useEffect` çağırışının brauzer rəngləndikdən sonraya təxirə salınmasına baxmayaraq bu Hookun yeni render etmədən öncə çağrılmasına zəmanat verilir. React həmişə yeni yenilik olmadan öncə köhnə render effektlərini çağıracaq.

#### Effektin şərti çağrılması {#conditionally-firing-an-effect}

Normalda, effektlər hər render etmə zamanı çağrılırlar. Belə olduqda effektin asılılıqlarından biri dəyişdikdə effekt yenidən yaranacaq.

Lakin, əvvəlki bölmədə olan abunəlik nümunəsində olduğu kimi hallarda bu davranış tez-tez baş verə bilər. Biz, hər yenilikdən sonra abunəlik yaratmalı deyilik. Abunəliyi yalnız `source` propu dəyişdikdə yaratmaq bəsdir.

Bunu tətbiq etmək üçün `useEffect` Hookunun ikinci arqumentinə effektin asılı olduğu dəyərləri massiv şəklində göndərə bilərik. Bizim yeni nümunəmiz aşağıdakı formada olacaq:

```js
useEffect(
  () => {
    const subscription = props.source.subscribe();
    return () => {
      subscription.unsubscribe();
    };
  },
  [props.source],
);
```

İndi, yeni abunəlik yalnız `props.source` dəyişdikdə yaranacaq.

>Qeyd
>
>Bu optimallaşmadan istifadə etdikdə massivdə **effektin istifadə etdiyi vaxt ilə dəyişən və komponent scope-unda olan (state və proplar kimi) bütün dəyərləri təyin edin**. Əks halda, kodunuz əvvəlki render etmələr zamanından qalan köhnə dəyərləri görəcək. [Funksiyaların necə idarə edilməsi](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) və [massiv dəyərləri tez-tez dəyişdikdə](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) nə ediləcəyi haqqda əlavə məlumat üçün göstərilən linklərə baxın.
>
>Əgər effekti bir dəfə çağırıb və bir dəfə təmizləmək (mount və unmount zamanı) istəyirsinizsə, ikinci arqumentə boş massiv (`[]`) göndərə bilərsiniz. Bu, React-ə effektin *heç bir* state və ya proplardan asılı olmadığını və bu səbəbdən heç bir zaman çağrılmayacağını bildirir. Bu xüsusi ssenari deyil -- asılılıqlar massivi bu formada işləyir.
>
>Effektə boş massiv (`[]`) göndərdikdə effektdə olan state və proplar hər zaman ilkin dəyəri saxlayacaqlar. İkinci arqumentə `[]` massivi göndərməyin `componentDidMount` və `componentWillUnmount` metodlarını işlətməyə yaxın olmasına baxmayaraq effektlərin tez-tez çağrılmasının qabağını almaq üçün [daha yaxşı](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [həllər](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) var. Əlavə olaraq, React-in `useEffect` çağırışlarını brauzer rənglənməsindən sonraya kimi təxirə saldığını və bu səbəbdən əlavə işin problem olmadığını unutmayın.
>
>
>Biz, [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) paketinin [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) qaydasından istifadə etməyi tövsiyə edirik. Bu qayda, səhv təyin edilən asılılıqları göstərir və düzəliş təklif edir.

Asılılıqlar massivi effekt funksiyasına arqument kimi göndərilmir. Lakin, konseptual olaraq bu asılılıqlar effektdə işlədilən dəyərləri təmsil edirlər. Bu səbəbdən effektdə olan hər bir dəyər asılılıqlar massivində də olmalıdır. Gələcəkdə, bu massiv daha təkmilləşmiş kompilyator ilə avtomatik təyin edilə bilər.

### `useContext` {#usecontext}

```js
const value = useContext(MyContext);
```

Kontekst obyekti qəbul edir (`React.createContext`-dan qaytarılan dəyər) və kontekstin cari dəyərini qaytarır. Cari kontekst dəyəri ağacda komponentə ən yaxın olan `<MyContext.Provider>`-in `value` propu ilə müəyyən edilir.

Komponentə yaxın olan `<MyContext.Provider>` yeniləndikdə bu komponent yenidən render edilərir və Hookun dəyəri `MyContext` provayderinin yeni `value` dəyəri ilə yenilənir.

`useContext` Hookunun arqumentinin *kontekst obyekti* olduğunu unutmayın:

 * **Düzgün:** `useContext(MyContext)`
 * **Yanlış:** `useContext(MyContext.Consumer)`
 * **Yanlış:** `useContext(MyContext.Provider)`

`useContext`-i çağıran komponent kontekst dəyəri dəyişdikdə hər zaman yenidən render olunacaq. Əgər komponentin render edilməsi bahalıdırsa, [memoizasiyadan istifadə edərək komponenti optimallaşdıra bilərsiniz](https://github.com/facebook/react/issues/15156#issuecomment-474590693).

>Məsləhət
>
>Əgər Hooklardan öncə kontekst API-ı ilə tanışlığınız varsa, `useContext(MyContext)` Hooku sinifdə `static contextType = MyContext` dəyişəni və ya `<MyContext.Consumer>` komponenti ilə eynidir.
>
>`useContext(MyContext)` Hooku yalnız kontekst dəyərini *oxumağa* və kontekstin dəyişikliklərinə abunə olmağa imkan yaradır. Kontekstə dəyər *təmin etmək üçün* ağacda komponentdən yuxarıda `<MyContext.Provider>` əlavə etmək lazımdır.

**Context.Provider ilə nümunə**

```js{31-36}
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      Mən tema konteksti əsasında stillənmişən!
    </button>
  );
}
```

Bu nümunə, [Kontekst sənədində](/docs/context.html) olan nümunənin Hooklar üçün dəyişdirilmiş formasıdır. Kontekst sənədindən Kontekst haqqında əlavə məlumat ala bilərsiniz.

## Əlavə Hooklar {#additional-hooks}

Bu bölmədə göstərilən Hooklar, ya əvvəlki bölmədə göstərilən əsas Hookların fərqli variantlarıdır, ya da xüsusi kənar ssenariləri əhatə etmək üçündür. Bu Hookları indi öyrənmək vacib deyil.

### `useReducer` {#usereducer}

```js
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

[`useState`](#usestate) üçün alternativ. `(state, action) => newState` formalı reducer tipi qəbul edir, cari state və `dispatch` metodu qaytarır. (Redux ilə tanışlığınız varsa, bunun necə işlədiyini bilirsiniz.)

Bir neçə sub-dəyərlərdən və ya əvvəlki state-dən asılı olan mürəkkəb state məntiqi olduqda `useReducer` işlətmək `useState` işlətməkdən daha üstündür. Əlavə olaraq, [callback-lər əvəzinə `dispatch`-i göndərməyin mümkün olduğundan](/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down) `useReducer` ilə dərində yeniliklər edən komponentlərin performansını optimallaşdırmaq mümkündür.

Aşağıdakı nümunədə [`useState`](#usestate) bölməsində olan sayğac nümunəsinin reducer ilə yazılmış forması göstərilir:

```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Say: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

>Qeyd
>
>React, `dispatch` funksiyasının identikliyinin stabil olmasını və render etmələr arasında dəyişmədiyini siğortalayır. Bu səbəbdən, bu funksiyanı `useEffect` və ya `useCallback` Hooklarının asılılıq siyahısına əlavə etmək lazım deyil.

#### İlkin state-in təyin edilməsi {#specifying-the-initial-state}

`useReducer` state-ini iki formada inisializasiya etmək mümkündür. Ssenaridən asılı olaraq istənilən formadan istifadə edə bilərsiniz. Ən sadə yol ilkin state-i ikinci arqument kimi göndərməkdir:

```js{3}
  const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
  );
```

>Qeyd
>
>React, Redux ilə populyarlaşan `state = initialState` arqument konvensiyasından istifadə etmir. İlkin dəyərin proplardan asılı ola bildiyindən bu dəyər Hook çağırışından təyin edilir. Əgər Redux-ın davranışını təqlid etmək istəyirsinizsə, `useReducer(reducer, undefined, reducer)` çağıra bilərsiniz. Lakin, biz bunu tövsiyə etmirik.

#### Lazy inisializasiya {#lazy-initialization}

Əlavə olaraq, ilkin state-i lazy formada yarada bilərsiniz. Bunun üçün `init` funksiyasını üçüncü arqumentə göndərin. İlkin state `init(initialArg)`-a bərabər olacaq.

Bu funksiya ilə ilkin state-i reducer-dən kənara ixrac etmək mümkündür. Bu, fəaliyyət (action) əsasında state-i sıfırlamaq üçün də faydalıdır:

```js{1-3,11-12,19,24}
function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}

function Counter({initialCount}) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  return (
    <>
      Say: {state.count}
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Sıfırla
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

#### Dispatch-i atlamaq {#bailing-out-of-a-dispatch}

Reducer Hookundan qaytarılan dəyər cari state dəyəri ilə eynidirsə, React, uşaqları render etmədən və effektləri çağırmadan bu yeniliyi atlayacaq. (React, [`Object.is` müqayisə alqoritmindən](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) istifadə edir.)

Nəzərə alın ki, React, dispatch-i atlamadan öncə spesifik komponenti render edə bilər. Bu davranışdan narahat olmaq lazım deyil. Çünki, React lazımsız yerə ağacın "dərinliyinə" getməyəcək. Əgər render zamanı bahalı hesablamalar edirsinizsə, bu hesablamaları `useMemo` Hooku ilə optimallaşdıra bilərsiniz.

### `useCallback` {#usecallback}

```js
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

[Memoizasiya olunmuş](https://en.wikipedia.org/wiki/Memoization) callback qaytarır.

Eyni sətrli callback və asılılıqlar massivi göndərin. `useCallback` Hooku callback-in memoizasiya olunmuş versiyasını qaytarır və bu callback yalnız asılılıqlar dəyişdikdə yenilənir. Bu Hook, uşaq komponentlərdə referans bərabərliyi əsasında render etmələrin qarşısını almaq üçün (məsələn, `shouldComponentUpdate`) faydalıdır.

`useCallback(fn, deps)` funksiyası `useMemo(() => fn, deps)` funksiyasına bərabərdir.

> Qeyd
>
> Asılılıqlar massivi funksiyaya arqument kimi göndərilmir. Lakin, konseptual olaraq bu asılılıqlar effektdə işlədilən dəyərləri təmsil edirlər. Bu səbəbdən funksiyada olan hər bir dəyər asılılıqlar massivində də olmalıdır. Gələcəkdə, bu massiv daha təkmilləşmiş kompilyator ilə avtomatik təyin edilə bilər.
>
> Biz, [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) paketinin [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) qaydasından istifadə etməyi tövsiyə edirik. Bu qayda, səhv təyin edilən asılılıqları göstərir və düzəliş təklif edir.

### `useMemo` {#usememo}

```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

[Memoizasiya olunan](https://en.wikipedia.org/wiki/Memoization) dəyər qaytarır.

"Yaranma" funksiyası və asılılıqlar massivi göndərin. `useMemo` Hooku memoizasiya olunan dəyəri yalnız asılılıqlar dəyişdikdə yenidən hesablayır. Bu optimallaşdırma hər render etmə zamanı lazımsız bahalı hesablamaları atlamaq üçün faydalıdır.

`useMemo`-ya göndərilən funksiyanın render zamanı çağrıldığını unutmayın. Normalda render zamanı etmədiyiniz əməliyyatları burada da etməyin. Məsələn, yan effektlər `useMemo`-da yox `useEffect`-də icra olunmalıdır.

Asılılıq massivi göndərilmədikdə hər render etmə zamanı yeni dəyər hesablanacaq.

**`useMemo` Hookuna semantik siğorta kimi yox performans optimallaşdırması kimi baxın.** Gələcəkdə, React bəzi əvvəlki memoizasiya olunan dəyəri "unudub" sonrakı renderdə bu dəyəri yenidən hesablaya bilər (məsələn, ekrandan görünməyən komponentləri yaddaşdan silərək). Bu səbəbdən, həmişə kodu elə yazın ki, `useMemo`-suz da işləsin. Sonra, performansı optimallaşdırmaq üçün bu Hooku əlavə edin.

> Qeyd
>
> Asılılıqlar massivi funksiyaya arqument kimi göndərilmir. Lakin, konseptual olaraq bu asılılıqlar effektdə işlədilən dəyərləri təmsil edirlər. Bu səbəbdən funksiyada olan hər bir dəyər asılılıqlar massivində də olmalıdır. Gələcəkdə, bu massiv daha təkmilləşmiş kompilyator ilə avtomatik təyin edilə bilər.
>
> Biz, [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) paketinin [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) qaydasından istifadə etməyi tövsiyə edirik. Bu qayda, səhv təyin edilən asılılıqları göstərir və düzəliş təklif edir.

### `useRef` {#useref}

```js
const refContainer = useRef(initialValue);
```

`useRef` Hooku `.current` parametri göndərilən arqument (`initialValue`) ilə inisializasiya olunan və mutasiya oluna bilən ref obyekti qaytarır. Qaytarılan obyekt komponentin ömrü boyu mövcud olacaq.

Bu Hookun çox işlədilən ssenarilərindən biri uşaq komponentdən imperativ istifadə etməkdir:

```js
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` dəyəri mount olunuş mətn anket sahəsi elementinə referens edir
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Anket sahəsini fokusla</button>
    </>
  );
}
```

Mahiyyətcə `useRef` Hooku, `.current` parametrində mutasiya oluna bilən dəyər saxlayan "qutudur."

Sizin ref-lər ilə [DOM-dan istifadə etmək](/docs/refs-and-the-dom.html) əməliyyatı ilə tanışlığınız ola bilər. Ref obyektini `<div ref={myRef} />` formada React-ə göndərdikdə React bu ref obyektinin `.current` parametrinə müvafiq DOM nodunu təyin edəcək.

Lakin, `useRef()` Hooku yalnız `ref` attributu üçün faydalı deyil. Bu Hook ilə siniflərdə olan instansiya sahələri kimi [dəyişə bilən dəyəri saxlamaq mümkündür](/docs/hooks-faq.html#is-there-something-like-instance-variables).

Bunun işləməsinin səbəbi `useRef()` Hookunun sadə JavaScript obyekti yaratmasıdır. `useRef()` işlətmək ilə `{current: ...}` obyektini yaratmağın əsas fərqi `useRef`-in render etmələr arası eyni obyekti qaytarmasıdır.

`useRef`-in dəyəri dəyişdikdə *heç bir* bildirişin edilmədiyini unutmayın. `.current` parametrini dəyişdikdə yenidən render etmə baş vermir. React-in DOM noduna ref əlavə etməsi və ya silməsi üçün [callback ref-indən](/docs/hooks-faq.html#how-can-i-measure-a-dom-node) istifadə edə bilərsiniz.


### `useImperativeHandle` {#useimperativehandle}

```js
useImperativeHandle(ref, createHandle, [deps])
```

`useImperativeHandle` Hooku valideyn komponentdə olan `ref`-i özəlləşdirmək üçün faydalıdır. Həmişə dediyimiz kimi `ref`-lər ilə imperativ kod yazmaqdan çəkinin. `useImperativeHandle` Hookunu [`forwardRef`](/docs/react-api.html#reactforwardref) ilə işlətməyi tövsiyə edirik:

```js
function FancyInput(props, ref) {
  const inputRef = useRef();
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} ... />;
}
FancyInput = forwardRef(FancyInput);
```

Yuxarıdakı nümunədə `<FancyInput ref={inputRef} />` komponentini render edən valideyn komponenti `inputRef.current.focus()` funksiyasını çağıra biləcək.

### `useLayoutEffect` {#uselayouteffect}

Bu funksiyanın imzasının `useEffect` ilə eyni olduğuna baxmayaraq bu Hook bütün DOM mutasiyalarından sonra sinxron icra edilir. Bu funksiyanı DOM-dan şablonu oxumaq və sinxron yenidən render etmək üçün istifadə edin. `useLayoutEffect` ilə planlaşdırılan yeniliklər brauzer rəngləməsindən öncə icra edilərək.

Vizual yenilikləri blok etməmək üçün standart `useEffect` Hookundan istifadə edin.

> Məsləhət
>
> Sinif komponent kodunu Hooklara miqrasiya edirsinizsə, `useLayoutEffect`-in `componentDidMount` və `componentDidUpdate` metodlar ilə eyni fazada icra edildiyini nəzərə alın. Lakin, **biz `useEffect` ilə başlamağı** və problem yarandıqda `useLayoutEffect` işlətməyi tövsiyə edirik.
>
>Serverdə render edildikdə JavaScript yüklənənə kimi *nə* `useLayoutEffect` nə də `useEffect` icra oluna bilər. Bu səbəbdən, server ilə render edilən komponentdə `useLayoutEffect` olduqda React xəbərdarlıq göstərir. Bunu həll etmək üçün ya məntiqi `useEffect` Hookuna köçürün (əgər effekt ilk render zamanı vacib deyilsə) ya da komponenti klient render edənə kimi gecikdirin (əgər `useLayoutEffect` çağrılana kimi HTML sınmış göstərilirsə).
>
>Server tərəfindən render edildiyi zaman şablon effekti işlədən komponenti render etməmək üçün komponenti `showChild && <Child />` formada şərti render edin və komponenti göstərməyi `useEffect(() => { setShowChild(true); }, [])` formada təxirə salın. Bu yol ilə komponent hidrasiya olunmamışdan öncə sınıq görünməyəcək.

### `useDebugValue` {#usedebugvalue}

```js
useDebugValue(value)
```

React DevTools-da xüsusi Hooklar üçün etiket göstərmək üçün `useDebugValue` Hookundan istifadə edə bilərsiniz.

Məsələn, ["Xüsusi Hookların Yaradılması"](/docs/hooks-custom.html) səhifəsində olan `useFriendStatus` Hookuna baxaq:

```js{6-8}
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // DevTools-da bu Hookun yanında etiket göstərin
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? '̄Online' : 'Offline');

  return isOnline;
}
```

> Məsləhət
>
> Hər xüsusi Hooka debaq dəyəri əlavə etməyi tövsiyə etmirik. Bu funksiya ən çox paylaşılan kitabxanaların xüsusi Hookları üçün faydalıdır.

#### Debaq dəyərlərinin formatını təxirə salın {#defer-formatting-debug-values}

Bəzi hallarda, göstəriləcək dəyəri format etmək bahalı əməliyyat ola bilər. Əlavə olaraq, xüsusi Hook, DevTools-dan yoxlanmayana kimi bu dəyəri hesablamaq mənasız ola bilər.

Bu səbəbdən, `useDebugValue` Hooku format funksiyasını fakultativ arqument kimi qəbul edir. Bu funksiya yalnız Hooklar yoxlandıqda çağrılır. Bu funksiya debaq dəyərini arqument kimi qəbul edir və format olunmuş dəyəri qaytarır.

Məsələn, `Date` dəyəri qaytaran xüsusi Hookdan `toDateString` funksiyasını lazımsız yerə çağırmamaq üçün aşağıdakı formatlayıcı funksiyadan istifadə etmək mümkündür:

```js
useDebugValue(date, date => date.toDateString());
```

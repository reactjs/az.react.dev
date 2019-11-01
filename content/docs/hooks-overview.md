---
id: hooks-overview
title: Hooklar Bir Baxışda
permalink: docs/hooks-overview.html
next: hooks-state.html
prev: hooks-intro.html
---

*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə klas yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.

Hooklar [geriyə uyğundurlar](/docs/hooks-intro.html#no-breaking-changes). Bu səhifədə təcrübəli React istifadəçiləri üçün Hookların icmalı göstərilir. Bu icmal çox tez tempdədir. Çaşdıqda, aşağıdakı formada göstərilən sarı qutulara baxın:

>Detallı İzahat
>
>React-ə Hookları niyə əlavə etdiyimiz haqqda məlumat üçün [Motivasiya](/docs/hooks-intro.html#motivation) bölməsinə baxın.

**↑↑↑ Hər bölmə bu formalı sarı qutu ilə bitəcək.** Bu qutular, detallı məlumatlar üçün linklər təmin edəcəklər.

## 📌 State Hooku {#state-hook}

Bu nümunədə sayğac render edilir. Düymə tıklandıqda dəyər atrır:

```js{1,4,5}
import React, { useState } from 'react';

function Example() {
  // "count" adlı yeni state yarat
  const [count, setCount] = useState(0);

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

Burada, `useState` *Hookdir* (bu haqqda birazdan danışacağıq). Funksiya komponentinə lokal state əlavə etmək üçün bu komponentin daxilin daxilindən Hooku çağırırıq. React, render etmələr arasında state-i qoruyacaq. `useState` Hooku cüt qaytarır: *cari* state dəyəri və state-i yeniləmək üçün funksiya. Bu funksiyanı hadisə işləyicisi kimi yerlərdən çağırmaq mümkündür. Bu funksiya klasda olan `this.setState` funksiyasına oxşayır. Lakin, bu funksiya köhnə və yeni state-i birləşdirmir. ([State Hookunun İstifadəsi](/docs/hooks-state.html) səhifəsində `useState` və `this.state` funksiyalarını müqayisə edirik.)

`useState` funksiyasının tək arqumenti ilkin state-dir. Yuxarıdakı nümunədə sayğacın sıfırdan başladığından ilkin state `0`-dır. Nəzərə alın ki, `this.state`-dən fərqli olaraq Hookun state-i obyekt olmamalıdır (istəsəniz obyekt istifadə edə bilərsiniz. İlkin state arqumenti yalnız ilk render zamanı işlədilir.

#### Bir Neçə State Dəyişənini Təyin Edin {#declaring-multiple-state-variables}

State Hookunu bir komponentdə bir neçə dəfə işlətmək mümkündür:

```js
function ExampleWithManyStates() {
  // Bir neçə state dəyişəni təyin et!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banan');
  const [todos, setTodos] = useState([{ text: 'Hookları Öyrən' }]);
  // ...
}
```

[Massiv destrukturlaşması](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring) sintaksisindən istifadə edərək `useState` Hookunu çağırdıqda state dəyişənlərinə fərqli adlar verə bilərik. Bu adlar `useState` API-nın bir parçası deyil. Əvəzinə, `useState` çağırışlarını bir neçə dəfə işlətdikdə, React bu çağırışlarının sıralarının eyni olacağını ehtimal. Bunun niyə işlədiyi və nə zaman faydalı olması haqqında danışacağıq.

#### Hook Nədir? {#but-what-is-a-hook}

React state-inə və lifecycle xüsusiyyətlərini funksiya komponentlərindən istifadə etmək üçün Hooklar istifadə olunur. Hookları daxilində işlətmək mümkün deyil. Lakin, siz React-i klaslarsız istifadə edə bilərsiniz. (Biz, mövcud komponentləri bir dəfəya funksiya komponentlərinə çevirməyi [tövsiyyə etmirik](/docs/hooks-intro.html#gradual-adoption-strategy). Lakin, siz yeni komponentləri Hooklar ilə yaza bilərsiniz.)

React, `useState` kimi hazır Hooklar təmin edir. Siz öz Hooklarınızı da yaradıq state-li davranışları fərqli komponentlər arasında paylaşa bilərsiniz. İlk olaraq, hazır Hooklara baxacağıq.

>Detallı İzahat
>
>State Hooku haqqında əlavə məlumat üçün buna hərs olunmuş səhifəyə baxın: [State Hookunun İstifadəsi](/docs/hooks-state.html).

## ⚡️ Effect Hooku {#effect-hook}

Sizin məlumatları yükləmək, abunəliklər, və ya DOM-u əl ilə dəyişmək kimi əməliyyatları React komponentlərindən icra etdiyinizi ehtimal edirik. Bu əməliyyatlar render zamanı icra edilə bilmədiyindən və digər komponentlərə təsir edə bildiyindən biz bu əməliyyatları "yan effektlər" (qısacası "effektlər") adlandırırıq.

`useEffect` adlanan Effect Hooku ilə funksiya komponentindən yan effektləri icra edə bilirsiniz. Bu funksiya, tək API altında React klaslarında olan `componentDidMount`, `componentDidUpdate` və `componentWillUnmount` funksiyalarını birləşdirir. ([Effect Hookunun İstifadəsi](/docs/hooks-effect.html) səhifəsində `useEffect` və bu lifecycle funksiyalarını müqayisə edirik.)

Aşağıdakı nümunədə, React ilə DOM yeniləndikdən sonra komponent, dokument başlığını yeniləyir:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount və componentDidUpdate funksiyalarına bənzərdir:
  useEffect(() => {
    // Brauzer API-ı ilə dokument başlığını yeniləyin
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

`useEffect` çağrıldıqda yeniliklər DOM-da köçürüldükdən sonra React, "effektƏ funksiyasını icra edəcək. Effektlərin komponent daxilində təyin olunduğundan komponentin proplar və state-indən istifadə edə bilir. Normalda, ilk render etmə *daxil olmaqla* effektlər hər render etmədən sonra icra olunur. ([Effect Hookunun İstifadəsi](/docs/hooks-effect.html) səhifəsində `useEffect` və bu lifecycle funksiyalarını müqayisə edirik.)

Effektlər fakutativ olaraq funksiya qaytararaq "təmizlik" işini təyin edə bilərlər. Aşağıdakı nümunədə, komponent, effektdən istifadə edərək dostun onlayn statusuna abunə olur və təmizlik işi kimi abunəliyi silir:

```js{10-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Yüklənir...';
  }
  return isOnline ? 'Onlayn' : 'Oflayn';
}
```

Bu nümunədə, Komponent unmount olunduğu zaman `ChatAPI`-ından abunəlik silinəcək. Əlavə olaraq, sonrakı render etmələr zamanı effekt yenidən icra olunmadan öncə də təmizlik işi icra olunacaq. (`ChatAPI`-a göndərilən `props.friend.id` dəyəri dəyişmədikdə [yenidən abunə olmağı atlamaq](/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects) mümkündür.)

`useState` ilə olduğu kimi komponentdə birdən çox effekt çağırışı ola bilər:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `${count} dəfə tıklandı`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }
  // ...
```

Hooklar ilə bir-birindən asılı olan yan effektləri (məsələn, abunəliyi əlavə edib silmək) lifecycle metodları əsasında ayırmaq əvəzinə bir yerdə saxlamaq mümkündür.

>Detallı İzahat
>
>Effect Hooku haqqında əlavə məlumat üçün buna hərs olunmuş səhifəyə baxın: [Effect Hookunun İstifadəsi](/docs/hooks-effect.html).

## ✌️ Hookların Qaydaları {#rules-of-hooks}

Hookların JavaScript funksiyaları olmasına baxmayaraq əlavə iki qaydaya fikir vermək lazımdır:

* Hookları yalnız **komponentin yuxarısında yaradın**. Hookları tsikllar, şərtlər və ya funksiya daxilindən çağırmayın.
* Hookları yalnız **React funksiya komponentlərindən** çağırın. Hookları sadə JavaScript funksiyalarından çağırmayın. (Hookları əlavə bir yerdə də yaratmaq olar -- öz Hooklarınızı yaratdıqda. Bu haqqda birazdan öyrənəcəyik.)

Bu qaydaları avtomatik tətbiq etmək üçün [linter plagini](https://www.npmjs.com/package/eslint-plugin-react-hooks) təmin edirik. İlk baxışda, bu qaydalar məhudlaşdırıcı və ya çaşdırı ola bilər. Lakin, Hookların düzgün işləməsi üçün bu qaydalar çox vacibdir.

>Detallı İzahat
>
>Bu qaydalar haqqında əlavə məlumat üçün buna həsr olunmuş səhifəyə baxın: [Hookların Qaydaları](/docs/hooks-rules.html).

## 💡 Xüsusi Hookların Düzəldilməsi {#building-your-own-hooks}

Bəzən, state-li məntiqi komponentlər arasında paylaşmaq istəyə bilərik. Normalda, bu problemi həll etmək üçün iki həll var idi: [yüksək dərəcəli komponentlər](/docs/higher-order-components.html) və [render propları](/docs/render-props.html). Xüsusi Hooklar ilə komponent ağacına komponent əlavə etmədən bu məntiq parçalarını paylaşa bilərsiniz.

Bu səhifənin əvvəlində, dostun onlayn statusuna abunə olmaq üçün `useState` və `useEffect` Hooklarını çağıran `FriendStatus` komponenti yaratdıq. Gəlin, abunəlik məntiqini digər komponentdə işlədək.

İlk olaraq, mövcud məntiqi `useFriendStatus` adlı xüsusi Hooka köçürək:

```js{3}
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

Bu Hook, `friendID` dəyərini arqument kimi qəbul edib dostun onlayn statusunu qaytarır.

İndi, biz bu Hooku bir neçə komponentdə istifadə edə bilərik:


```js{2}
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Onlayn' : 'Oflayn';
}
```

```js{2}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'yaşıl' : 'qara' }}>
      {props.friend.name}
    </li>
  );
}
```

Bu komponentlərin state-ləri tam ayrılır. Xüsusi Hooklar ilə state yox, *State-li məntiq* paylaşılır. Faktiki olaraq, hər Hook *çağırışının* ayrılmış state-i olduğundan eyni Hooku bir komponentdə bir neçə dəfə istifadə edə bilərsiniz.

Xüsusi Hooklar xüsusiyyət olmaq əvəzinə konvensiyadır. Biz, "`use`" ilə başlayan və digər Hookları çağıran funksiyaları Xüsusi Hooklar adlandırırıq. Təmin etdiyimiz linter plagini `useSomething` ad konvensiya əsasında Hooklarda olan baqları tapa bilir.

Xüsusi Hooklar ilə anket idarəsi, animasiya, deklarativ abunəlik, taymerlər və digər ssenariləri əhatə etmək mümkündür.

>Detallı İzahat
>
>Xüsusi Hooklar haqqında əlavə məlumat üçün buna həsr olunmuş səhifəyə baxın: [Xüsusi Hookların Düzəldilməsi](/docs/hooks-custom.html).

## 🔌 Digər Hooklar {#other-hooks}

Bu iki əsas Hookdan əlavə React-də bir neçə az işlədilən amma faydalı olan Hooklar var. Məsələn, [`useContext`](/docs/hooks-reference.html#usecontext) Hooku ilə React kontekstinə komponentlər yaratmadan abunə olmağa imkan yaradır:

```js{2,3}
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

[`useReducer`](/docs/hooks-reference.html#usereducer) Hooku ilə mürəkkəb komponentlərdə lokal state-i reducer-lər ilə yaratmaq mümkündür:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

>Detallı İzahat
>
>React-də olan bütün Hooklar haqqında əlavə məlumat üçün buna həsr olunmuş səhifəyə baxın: [Hookların API Arayışı](/docs/hooks-reference.html).

## Sonrakı Addımlar {#next-steps}

Phew, bu tez oldu! Əgər Hooklar haqqında anlaşılmaz hissələr qaldısa, bu haqqda sonrakı səhifələrdən detallı məlumat üçün [State Hooku](/docs/hooks-state.html) sənədi ilə başlayaraq sonrakı səhifələrə baxa bilərsiniz.

Əlavə olaraq [Hookların API arayışı](/docs/hooks-reference.html) və [Hooklar FAQ](/docs/hooks-faq.html) səhifələrinə baxa bilərsiniz.

Əlavə olaraq Hookları *niyə* əlavə etdiyimizin izahatı və applikasiyanı yenidən yazmadan Hooklar ilə klas komponentlərini eyni zamanda necə istifadə edilməsi haqqda məlumat almaq üçün [giriş səhifəsinə](/docs/hooks-intro.html) baxın.

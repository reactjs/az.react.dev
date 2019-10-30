---
id: hooks-overview
title: Hooklara Giriş
permalink: docs/hooks-overview.html
next: hooks-state.html
prev: hooks-intro.html
---

*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə klas yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.

Hooklar [geriyə uyğundurlar](/docs/hooks-intro.html#no-breaking-changes). Bu səhifədə təcrübəli React istifadəçiləri üçün Hookların icmalı göstərilir. Bu icmal çox tez tempdədir. Çaşdıqda, aşağıdakı formada göstərilən sarı qutulara baxın:

>Detallı İzahat
>
>React-ə Hookları niyə etdiyimiz haqqda məlumat üçün [Motivasiya](/docs/hooks-intro.html#motivation) bölməsinə baxın.

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

## ✌️ Rules of Hooks {#rules-of-hooks}

Hooks are JavaScript functions, but they impose two additional rules:

* Only call Hooks **at the top level**. Don’t call Hooks inside loops, conditions, or nested functions.
* Only call Hooks **from React function components**. Don’t call Hooks from regular JavaScript functions. (There is just one other valid place to call Hooks -- your own custom Hooks. We'll learn about them in a moment.)

We provide a [linter plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) to enforce these rules automatically. We understand these rules might seem limiting or confusing at first, but they are essential to making Hooks work well.

>Detailed Explanation
>
>You can learn more about these rules on a dedicated page: [Rules of Hooks](/docs/hooks-rules.html).

## 💡 Building Your Own Hooks {#building-your-own-hooks}

Sometimes, we want to reuse some stateful logic between components. Traditionally, there were two popular solutions to this problem: [higher-order components](/docs/higher-order-components.html) and [render props](/docs/render-props.html). Custom Hooks let you do this, but without adding more components to your tree.

Earlier on this page, we introduced a `FriendStatus` component that calls the `useState` and `useEffect` Hooks to subscribe to a friend's online status. Let's say we also want to reuse this subscription logic in another component.

First, we'll extract this logic into a custom Hook called `useFriendStatus`:

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

It takes `friendID` as an argument, and returns whether our friend is online.

Now we can use it from both components:


```js{2}
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```js{2}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

The state of these components is completely independent. Hooks are a way to reuse *stateful logic*, not state itself. In fact, each *call* to a Hook has a completely isolated state -- so you can even use the same custom Hook twice in one component.

Custom Hooks are more of a convention than a feature. If a function's name starts with "`use`" and it calls other Hooks, we say it is a custom Hook. The `useSomething` naming convention is how our linter plugin is able to find bugs in the code using Hooks.

You can write custom Hooks that cover a wide range of use cases like form handling, animation, declarative subscriptions, timers, and probably many more we haven't considered. We are excited to see what custom Hooks the React community will come up with.

>Detailed Explanation
>
>You can learn more about custom Hooks on a dedicated page: [Building Your Own Hooks](/docs/hooks-custom.html).

## 🔌 Other Hooks {#other-hooks}

There are a few less commonly used built-in Hooks that you might find useful. For example, [`useContext`](/docs/hooks-reference.html#usecontext) lets you subscribe to React context without introducing nesting:

```js{2,3}
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

And [`useReducer`](/docs/hooks-reference.html#usereducer) lets you manage local state of complex components with a reducer:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```

>Detailed Explanation
>
>You can learn more about all the built-in Hooks on a dedicated page: [Hooks API Reference](/docs/hooks-reference.html).

## Next Steps {#next-steps}

Phew, that was fast! If some things didn't quite make sense or you'd like to learn more in detail, you can read the next pages, starting with the [State Hook](/docs/hooks-state.html) documentation.

You can also check out the [Hooks API reference](/docs/hooks-reference.html) and the [Hooks FAQ](/docs/hooks-faq.html).

Finally, don't miss the [introduction page](/docs/hooks-intro.html) which explains *why* we're adding Hooks and how we'll start using them side by side with classes -- without rewriting our apps.

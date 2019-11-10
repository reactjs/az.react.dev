---
id: hooks-custom
title: Xüsusi Hookların Düzəldilməsi
permalink: docs/hooks-custom.html
next: hooks-reference.html
prev: hooks-rules.html
---

*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə klas yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.

Xüsusi Hookları düzəldərək komponent məntiqini yenidən istifadə oluna bilən funksiyalara ixrac etmək mümkündür.

[Effect Hookunun İstifadəsini](/docs/hooks-effect.html#example-using-hooks-1) öyrəndiyimiz zaman çat applikasiyasında dostun onlayn və ya oflayn olduğunu mesaj ilə göstərmək üçün istifadə olunan komponentə baxdıq:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

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

Gəlin, kontakt siyahısının olduğunu və onlayn istifadəçiləri yaşıl rəngdə göstərmək istədiyimizi fərz edək. Yuxarıdakı kodu `FriendListItem` komponentinə kopiyalaya bilərik. Lakin, bu ideal olmayacaq:

```js{4-15}
import React, { useState, useEffect } from 'react';

function FriendListItem(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

Əvəzinə, biz eyni məntiqi `FriendStatus` və `FriendListItem` komponentləri arasında paylaşmaq istəyirik.

React-də state-li məntiqi komponentlər arasında paylaşmaq üçün iki məşhur üsul var: [render propları](/docs/render-props.html) və [yüksək dərəcəli komponentlər](/docs/higher-order-components.html). Bu sənəddə, Hooklar ilə komponent ağacına yeni komponentlər əlavə etmədən bir çox problemi necə həll edə biləcəyimizə baxacağıq.

## Xüsusi Hookun İxracı {#extracting-a-custom-hook}

İki JavaScript funksiyası arasında məntiq paylaşmaq istədikdə bu məntiqi üçüncü funksiyaya ixrc edirik. Komponent və Hookların funksiya olduğundan eyni məntiq bu primitivlərə də aiddir!

**Adı "`use`" ilə başlayan və digər Hookları çağıran JavaScript funksiyası xüsusi Hook adlanır.** Məsələn, aşağıdakı `useFriendStatus` funksiyası bizim ilk xüsusi Hookumuzdur:

```js{3}
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

Bu funksiyada heç bir yenilik yoxdur -- yuxarıdakı komponentlərdə olan məntiq bura köçürülüb. Komponentdə olduğu kimi xüsusi Hooklarda olan digər Hook çağırışlarını şərtsiz və funksiyanın yuxarısında yazın.

React komponentindən fərqli olaraq xüsusi Hookun xüsusi imzası olmamalıdır. Arqument kimi nə qəbul edəcəyinə və nə qaytaracağına (əgər qaytaracaqsa) biz qərar veririk. Digər sözlə, bu sadə funksiyadır. [Hookların qaydalarının](/docs/hooks-rules.html) bu funksiyaya tətbiq olunması üçün bu funksiyanın adı `use` ilə başlamalıdır.

`useFriendStatus` Hookunun məqsədi dostun statusuna abunə olmaqdır. Bu səbəbdən, bu Hook, arqument kimi `friendID` dəyərini qəbul edir və dostun onlayn olmasını qaytarır:

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

İndi, gəlin xüsusi Hookumuzu işlədək.

## Xüsusi Hookun İşlədilməsi {#using-a-custom-hook}

Başlanğıcda, məqsədimiz kopiyalanmış məntiqi `FriendStatus` və `FriendListItem` komponentlərindən silmək idi. Hər iki komponent dostun onlayn olmasını bilmək istəyir.

Bu məntiqi `useFriendStatus` Hookuna ixrac etdiyimizdən biz bu Hooku *işlədə bilərik:*

```js{2}
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Yüklənir...';
  }
  return isOnline ? 'Onlayn' : 'Oflayn';
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

**Bu kod orijinal nümunələr ilə eynidir?** Bəli, bu kod tam olaraq eyni işləyir. Yaxından baxdıqda, davranışa heç bir dəyişiklik etmədiyimizi görəcəksiniz. Sadəcə olaraq iki funksiya arasında olan ümumu kodu ayrı funksiyaya ixrac etdik. **Xüsusi Hooklar, React xüsusiyyəti deyil, əvəzinə Hookların dizaynını izləyərək yaranan konvensiyadır.**

**Xüsusi Hookları “`use`” başlayan adlar ilə adlandırım?** Xahiş edirik ki, belə edəsiniz. Bu konvensiya çox vacibdir. Ad belə belə olmadıqda [Hookların qaydalarının](/docs/hooks-rules.html) pozulmasını avtomatik olaraq yoxlaya bilməyəcəyik. Çünki, hansı funksiyaların daxilində Hookların olduğunu bilməyəcəyik.

**İki komponent eyni Hookun state-ini paylaşır?** Xeyr. Xüsusi Hookların *state-li məntiqi* (məsələn, abunəlik quraşdırıb cari dəyərini yadda saxlamaq kimi) paylaşmaq üçün mexaniz olmasına baxmayaraq xüsusi Hooku çağrıldıqda state və effektlər təcrid olunur.

**Xüsusi Hook ilə state necə paylaşılmır?** Hər Hook *çağırışı* təcrid olunmuş state yaradır. `useFriendStatus` Hookunu birbaşa çağırdığımızdan React-in perspektivindən baxdıqda komponentlər `useState` və `useEffect` Hooklarını çağırırlar. [Əvvəl](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) [öyrəndiyimiz kimi](/docs/hooks-state.html#tip-using-multiple-state-variables) bir komponentdən `useState` və `useEffect` Hooklarını bir neçə dəfə çağıra bilərik.

### Məsləhət: Hooklar Arasında Məlumatları Göndər {#tip-pass-information-between-hooks}

Hookların funksiya olduğundan biz Hooklar arasında məlumat göndərə bilərik.

Bubu göstərmək üçün çat nümunəmizə yeni komponent əlavə edəcəyik. Bu çat mesajını qəbul edəcək istifadəçini seçən komponent, istifadəçinin onlayn olacağını göstərir:

```js{8-9,13}
const friendList = [
  { id: 1, name: 'Aysel' },
  { id: 2, name: 'Aynur' },
  { id: 3, name: 'Nazim' },
];

function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);

  return (
    <>
      <Circle color={isRecipientOnline ? 'green' : 'red'} />
      <select
        value={recipientID}
        onChange={e => setRecipientID(Number(e.target.value))}
      >
        {friendList.map(friend => (
          <option key={friend.id} value={friend.id}>
            {friend.name}
          </option>
        ))}
      </select>
    </>
  );
}
```

Cari seçilmiş dost ID-ini `recipientID` adlı state dəyişənində saxlayır, istifadəçi `<select>` seçicisindən fərqli dostu seçdikdə isə bu state-i yeniləyirik.

`useState` çağırışı ilə `recipientID` state dəyişəninin ən yeni dəyərini aldığımızdan bu dəyəri xüsusi `useFriendStatus` Hookuna arqument kimi göndərə bilərik:

```js
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```

Bunun ilə biz *cari seçilmiş* dostun onlayn olduğunu bilirik. Fərqli dost seçib `recipientID` state dəyişənini yenilədikdə `useFriendStatus` Hooku köhnə dostun onlayn statusundan abunəliyi silib yeni seçilmiş dostun onlayn statusuna abunə olacaq.

## `useYourImagination()` {#useyourimagination}

Custom Hooks offer the flexibility of sharing logic that wasn't possible in React components before. You can write custom Hooks that cover a wide range of use cases like form handling, animation, declarative subscriptions, timers, and probably many more we haven't considered. What's more, you can build Hooks that are just as easy to use as React's built-in features.

Try to resist adding abstraction too early. Now that function components can do more, it's likely that the average function component in your codebase will become longer. This is normal -- don't feel like you *have to* immediately split it into Hooks. But we also encourage you to start spotting cases where a custom Hook could hide complex logic behind a simple interface, or help untangle a messy component.

For example, maybe you have a complex component that contains a lot of local state that is managed in an ad-hoc way. `useState` doesn't make centralizing the update logic any easier so you might prefer to write it as a [Redux](https://redux.js.org/) reducer:

```js
function todosReducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, {
        text: action.text,
        completed: false
      }];
    // ... other actions ...
    default:
      return state;
  }
}
```

Reducers are very convenient to test in isolation, and scale to express complex update logic. You can further break them apart into smaller reducers if necessary. However, you might also enjoy the benefits of using React local state, or might not want to install another library.

So what if we could write a `useReducer` Hook that lets us manage the *local* state of our component with a reducer? A simplified version of it might look like this:

```js
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    const nextState = reducer(state, action);
    setState(nextState);
  }

  return [state, dispatch];
}
```

Now we could use it in our component, and let the reducer drive its state management:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

The need to manage local state with a reducer in a complex component is common enough that we've built the `useReducer` Hook right into React. You'll find it together with other built-in Hooks in the [Hooks API reference](/docs/hooks-reference.html).

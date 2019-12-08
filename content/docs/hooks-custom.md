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

Eyni məntiqi iki JavaScript funksiyası arasında paylaşmaq üçün bu məntiq üçüncü funksiyaya ixrac edilir. Komponent və Hookların JavaScript funksiyaları olduğundan eyni yanaşma bu primitivlərə də aiddir!

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

React komponentindən fərqli olaraq xüsusi Hookun xüsusi imzası olmamalıdır. Hookun arqument kimi nə qəbul etdiyinə və nə qaytardığına (əgər qaytaracaqsa) özümüz qərar veririk. Digər sözlə, bu sadə JavaScript funksiyasıdır. [Hookların qaydalarının](/docs/hooks-rules.html) bu funksiyaya tətbiq olunması üçün bu funksiyanın adı `use` ilə başlamalıdır.

Dostun statusuna abunə olmaq `useFriendStatus` Hookunun əsas məqsədidir. Bu səbəbdən, bu Hook `friendID` dəyərini arqument kimi qəbul edərək dostun onlayn olmasını qaytarır:

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  return isOnline;
}
```

İndi, xüsusi Hookumuzu işlətməyin vaxtıdır.

## Xüsusi Hookun İşlədilməsi {#using-a-custom-hook}

Başlanğıcda, məqsədimiz kopiyalanmış məntiqi `FriendStatus` və `FriendListItem` komponentlərindən silmək idi. Hər iki komponentdə dostun onlayn olmasını bilmək lazımdır.

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

**Bu kod orijinal nümunələr ilə eynidir?** Bəli, bu kod tam olaraq eyni işləyir. Yaxından baxdıqda, davranışa heç bir dəyişiklik etmədiyimizi görəcəksiniz. Sadəcə olaraq iki funksiya arasında olan ümumu kodu ayrı funksiyaya ixrac etdik. **Xüsusi Hooklar React-in xüsusiyyəti deyil, əvəzinə Hookların dizaynını izləyərək yaranmış konvensiyadır.**

**Xüsusi Hookları “`use`” ilə başlayan adlar ilə adlandırmaq lazımdır?** Xahiş edirik ki, belə edəsiniz. Bu konvensiya çox vacibdir. Hookun adı bu formada olmadıqda [Hookların qaydalarının](/docs/hooks-rules.html) pozulması avtomatik olaraq yoxlanmayacaq. Çünki, hansı funksiyaların daxilində Hookların olduğunu bilməyəcəyik.

**İki komponent eyni Hookun state-ini paylaşır?** Xeyr. Xüsusi Hookların *state-li məntiqi* (məsələn, abunəlik quraşdırıb cari dəyərini yadda saxlamaq kimi) paylaşmaq üçün mexanizm olmasına baxmayaraq xüsusi Hooku çağrıldıqda state və effektlər çağrılan komponentə təcrid olunur.

**Xüsusi Hook ilə state necə paylaşılmır?** Hər Hook *çağırışı* təcrid olunmuş state yaradır. React-in perspektivindən baxdıqda `useFriendStatus` Hookunu birbaşa çağırdıqda komponentlər `useState` və `useEffect` Hooklarını çağırırlar. [Əvvəl](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) [öyrəndiyimiz kimi](/docs/hooks-state.html#tip-using-multiple-state-variables) bir komponentdən `useState` və `useEffect` Hooklarını bir neçə dəfə çağıra bilərik.

### Məsləhət: Hooklar Arasında Məlumatları Göndər {#tip-pass-information-between-hooks}

Hookların funksiya olduğundan biz Hooklar arasında məlumat göndərə bilərik.

Bunu göstərmək üçün çat nümunəsinə yeni komponent əlavə edəcəyik. Bu komponent çat mesajını qəbul edən istifadəçini seçərək bu istifadəçinin onlayn olduğunu göstərir:

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

Bu komponent, cari seçilmiş dost ID-sini `recipientID` adlı state dəyişənində saxlayır, istifadəçi `<select>` seçicisindən fərqli dostu seçdikdə isə bu state-i yeniləyir.

`useState` çağırışı ilə `recipientID` state dəyişəninin ən yeni dəyərini aldığımızdan bu dəyəri xüsusi `useFriendStatus` Hookuna arqument kimi göndərə bilərik:

```js
  const [recipientID, setRecipientID] = useState(1);
  const isRecipientOnline = useFriendStatus(recipientID);
```

Bu formada *cari seçilmiş* dostun onlayn olduğunu bilmək mümkündür. Fərqli dost seçib `recipientID` state dəyişənini yenilədikdə `useFriendStatus` Hooku köhnə dostun onlayn statusundan abunəliyi silib yeni seçilmiş dostun onlayn statusuna yeni abunəlik yaradacaq.

## `useYourImagination()` {#useyourimagination}

Xüsusi Hooklar ilə məntiqləri paylaşmaq mümkündür. Xüsusi Hooklar ilə anket idarəsi, animasiya, deklarativ abunəliklər, taymerlər və bizim nəzərə almadığımız digər ssenariləri əhatə etmək mümkündür. Əlavə olaraq, yaratdığınız Hookları React xüsusiyyətləri kimi rahat işlədə bilərsiniz.

Abstraksiyaları öncədən əlavə etməkdən çəkinin. Funksiya komponentləri ilə çox problemləri həll etmək olur deyə standart funksiya komponentinin kodu daha uzun olacaq. Bu normaldır. Məntiqi dərhal ayırmaq *lazım deyil.* Lakin, xüsusi Hook ilə mürəkkəb məntiqi sadə interfeys arxasında gizlədə biləcəyiniz halları axtarmağı və qarışıq komponentləri sadələşdirməyi tövsiyyə edirik.

Məsələn, sizdə çoxlu lokal state-dən istifadə edən mürəkkəb komponent ola bilər. `useState` ilə yeniləmə məntiqini mərkəzləşdirmək çətin olduğundan bu state-ləri [Redux](https://redux.js.org/) reducer-i ilə işlədə bilərsiniz:

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

Reducer-ləri ayrılıqda test etmək və reducer-lər ilə mürəkkəb yeniləmə məntiqini böyütmək daha rahatdır. Lazım olduqda, bir reducer-i bir neçə kiçik reducer-lərə də parçalaya bilərsiniz. Lakin, React-in lokal state-inin faydalarını bəyənə bilər və ya digər kitabxana yükləmək istəməyə bilərsiniz.

Komponentin *lokal* state-ini reducer ilə idarə etmək üçün `useReducer` Hooku yaza bilərik. Sadə formada bu funksiya aşağıdakı formada olacaq:

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

İndi, biz bu Hooku öz komponentimizdə istifadə edə bilər və reducer ilə state-i idarə edə bilərik:

```js{2}
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  function handleAddClick(text) {
    dispatch({ type: 'add', text });
  }

  // ...
}
```

Mürəkkəb komponentdə lokal state-i reducer ilə idarə etməyin çox lazım olduğundan biz `useReducer` Hookunu React-ə əlavə etmişik. Bu və digər daxili Hooklar haqqında əlavə məlumat almaq üçün [Hookların API arayışı](/docs/hooks-reference.html) sənədinə baxa bilərsiniz.

---
id: hooks-rules
title: Hookların Qaydaları
permalink: docs/hooks-rules.html
next: hooks-custom.html
prev: hooks-effect.html
---

*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə sinif yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.

Hookların sadə JavaScript funksiyaları olmasına baxmayaraq bu funksiyaları işlətdikdə iki qaydaya riayət etmək lazımdır. Bu qaydaları avtomatik tətbiq etmək üçün [linter plagini](https://www.npmjs.com/package/eslint-plugin-react-hooks) təmin edirik:

### Hookları Yalnız Ən Yuxarıdan Çağırın {#only-call-hooks-at-the-top-level}

<<<<<<< HEAD
**Hookları tsikllar, şərtlər, və ya digər funksiyalardan çağırmayın.** Əvəzinə, Hookları hər zaman React funksiyasının ən yuxarısında yazın. Bu qaydaya riayət edərək komponent render edildikdə Hookların eyni sıra ilə çağrıldığını siğortalıyırsınız. Bu sıraya görə React, `useState` və `useEffect` çağırışlarının vəziyyətini qoruya bilir. (Əgər maraqlanırsınızsa, bunun dərindən izahatı haqqında [aşağıda](#explanation) danışacağıq.)
=======
**Don't call Hooks inside loops, conditions, or nested functions.** Instead, always use Hooks at the top level of your React function, before any early returns. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That's what allows React to correctly preserve the state of Hooks between multiple `useState` and `useEffect` calls. (If you're curious, we'll explain this in depth [below](#explanation).)
>>>>>>> abcf0358d43caa0772e599949458df9e6578489a

### Hookları Yalnız React Funksiyalarından Çağırın {#only-call-hooks-from-react-functions}

**Hookları sadə JavaScript funksiyalarından çağırmayın.** Əvəzinə:

* ✅ Hookları React komponentlərindən çağıra bilərsiniz.
* ✅ Hookları xüsusi Hooklardan çağıra bilərsiniz (Xüsusi hooklar haqqında sonrakı səhifədə [öyrənə bilərsiniz](/docs/hooks-custom.html)).

Bu qaydaya riayət edərək komponentdə olan state-li məntiqin kodda olduğunu görə bilirsiniz.

## ESLint Plagini {#eslint-plugin}

Biz bu iki qaydanın tətbiq edilməsi üçün [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) adlı plagin təmin edirik. Siz bu plagini aşağıdakı formada layihənizə əlavə edə bilərsiniz:

This plugin is included by default in [Create React App](/docs/create-a-new-react-app.html#create-react-app).

```bash
npm install eslint-plugin-react-hooks --save-dev
```

```js
// ESLint konfiqurasiyanız
{
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    // ...
    "react-hooks/rules-of-hooks": "error", // Hook qaydalarını yoxlayın
    "react-hooks/exhaustive-deps": "warn" // Effekt asılılıqlarını yoxlayın
  }
}
```

**[Xüsusi hookların yazılmasını bilmək üçün](/docs/hooks-custom.html) sonrakı səhifəyə keçə bilərsiniz.** Bu səhifədə, bu iki qaydanın səbəbini başa salacağıq.

## İzahat {#explanation}

Biz bir komponentdə bir neçə State və ya Effect Hookunun istifadə edilməsini [əvvəlki bölmələrdə öyrəndik](/docs/hooks-state.html#tip-using-multiple-state-variables):

```js
function Form() {
  // 1. "name" state dəyişəni işlədin
  const [name, setName] = useState('Abbas');

  // 2. Anketi qorumaq üçün effekt istifadə edin
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. "surname" state dəyişəni işlədin
  const [surname, setSurname] = useState('Qəhrəmanov');

  // 4. Səhifə başlığını yeniləmək üçün effekt istifadə edin
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```

React hansı state-in hansı `useState` çağırışına aid olduğunu haradan bilir? **React, Hookların çağırış sırasına etibar edir**. Bizim nümunədə, Hook çağırışlarının sırası hər render zamanı eyni qalır:

```js
// ------------
// İlk render
// ------------
useState('Abbas')          // 1. "name" state dəyişənini 'Abbas' ilə inisializasiya edin
useEffect(persistForm)     // 2. Anketi qorumaq effekt əlavə edin
useState('Qəhrəmanov')     // 3. "surname" state dəyişənini 'Qəhrəmanov' ilə inisializasiya edin
useEffect(updateTitle)     // 4. Səhifə başlığını yeniləmək üçün effekt əlavə edin

// -------------
// Second render
// -------------
useState('Abbas')          // 1. "name" state dəyişənini oxuyun (arqument artıq işlədilmir)
useEffect(persistForm)     // 2. Anketi qoruyan effekti əvəz edin
useState('Qəhrəmanov')     // 3. "surname" state dəyişənini oxuyun (arqument artıq işlədilmir)
useEffect(updateTitle)     // 4. Səhifə başlığını yeniləmək üçün effekti əvəz edin

// ...
```

Hook çağırışlarının sırasının eyni qaldığından React, eyni state-i lokal dəyişənə təyin edə bilir. Hook çağırışını şərtin daxilində yazdıqda nə baş verir (məsələn, `persistForm` effekti)?

```js
  // 🔴 Hooku şərt daxilində işlədərək birinci qaydanı pozuruq
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```

İlk render üçün `name !== ''` şərti `true`-a bərabər olduğundan biz bu Hooku çağırırıq. Lakin, istifadəçi anket sahəsini sildikdə sonrakı render zamanı verilən şərt `false`-a bərabər olur. İndi, render zamanı Hooku atladığımızdan Hook çağırışlarının sırası dəyişir:

```js
useState('Abbas')           // 1. "name" state dəyişənini oxuyun (arqument artıq işlədilmir)
// useEffect(persistForm)   // 🔴 Hook atlandı!
useState('Qəhrəmanov')      // 🔴 2 (3 yox). "surname" state dəyişəni oxunmadı
useEffect(updateTitle)      // 🔴 3 (4 yox). Effekt əvəz olunmadı
```

React, `useState` Hook çağırışından nə qaytarılacağını bilmir. React, əvvəlki render zamanı olduğu kimi ikinci Hookun `persistForm` effektinə uyğun gəldiyini gözləyir. Bu nöqtədən sonra atlanan Hookdan sonra gələn Hookların sırası bir növbə arxaya gedəcək. Bu, baqlara səbəb olacaq.

**Bu səbəbdən Hooklar komponentlərin yuxarısında çağrılmalıdır.** Əgər effekti şərti çağırmaq istəyiriksə, bu şərti, Hookun *daxilinə* əlavə etməliyik:

```js
  useEffect(function persistForm() {
    // 👍 Birinci qaydanı pozmuruq
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```

**Nəzərə alın ki, [təmin olunan lint qaydasını](https://www.npmjs.com/package/eslint-plugin-react-hooks) işlətdikdə bu problem linter xətası qaytaracaq və sizə bu haqqda fikirləşməməyə imkan yaradacaq.** Buna baxmayaraq, indi Hookların *niyə* belə işlədiyini bilirsiniz.

## Sonrakı Addımlar {#next-steps}

Biz indi [xüsusi Hookların yazılmasını](/docs/hooks-custom.html) öyrənə bilərik! Xüsusi Hooklar ilə React-in təmin etdiyi Hookları bir yerə yığıb öz abstraksiyanızı yarada bilər və fərqli komponentlər arasında işlənən eyni state-li məntiqi paylaşa bilərsiniz.

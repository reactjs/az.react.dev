---
id: hooks-intro
title: Hooklara Giriş
permalink: docs/hooks-intro.html
next: hooks-overview.html
---

*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə klas yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // "count" adlı state dəyişəni yaradın
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

İlk öyrənəcəyimiz "Hook" yeni `useState` funksiyasıdır. Lakin, bu nümunə sadəcə icmal üçündür. Nəsə anlaşılmırsa narahat olmayın!

**Hooklar haqqında öyrənmək üçün [sonrakı səhifəyə](/docs/hooks-overview.html) baxın.** Bu səhifədə, Hookları React-ə niyə əlavə etdiyimizi izah edəcək və Hooklar ilə applikasiya yazmaq üçün faydalarından danışacağıq.

>Qeyd
>
>Hookları dəstəkləyən ilk buraxılış React 16.8.0-dır. Yenilədiyiniz zaman, React DOM daxil olmaqla bütün paketləri yeniləməyi unutmayın.
>Hooklar React Native-in [0.59-cu buraxılışından](https://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059) dəstəklənir.

## Video Giriş {#video-introduction}

React Conf 2018-də Sofi Alpert və Dan Abramov, Hookları tanıtdı. Rayn Florens isə applikasiyanı necə Hooklar ilə refaktorinq etmək haqqında danışdı. Videoya buradan baxa bilərsiniz:

<br>

<iframe width="650" height="366" src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen></iframe>

## Pozucu Dəyişikliklər Yoxdur {#no-breaking-changes}

Davam etmədən öncə aşağıdakı qeydləri nəzərə alın:

* **Hooklar tam fakultativdir.** Heç bir mövcud kodu yenidən yazmadan Hookları sınaya bilərsiniz. Əgər Hookları öyrənmək və ya işlətmək istəmirsinizsə, Hooklar kodunuzu köhnə üsulda yazmağa davam edə bilərsiniz.
* **100% geriyə uyğundur.** Hooklarda heç bir pozucu dəyişiklik yoxdur.
* **İndi mövcuddur.** Hooklar v16.8.0-dan başlayaraq mövcuddur.

**React klaslarını silmək haqqında heç bir planımız yoxdur.** Bu səhifənin [aşağı bölməsində](#gradual-adoption-strategy) Hookların tədrici adaptasiya stategiyası haqqında məlumat ala bilərsiniz.

**Hooklar, bildiyiniz React konsepsiyalarını əvəz etmir.** Əvəzinə, Hooklar ilə bildiyiniz React konsepsiyalarını (proplar, state, kontekst, ref-lər, və lifecycle) daha düz API ilə istifadə edə bilərsiniz. Sonra göstərəcəyimiz kimi Hooklar ilə bu xüsusiyyətləri daha güclü formada kombinə etmək mümkündür.

**Hookları öyrənmək istəyirsinizsə, [birbaşa sonrakı səhifəyə atlayın!](/docs/hooks-overview.html)** Əgər Hookların niyə əlavə olunduğu haqqda məlumat almaq və mövcud applikasiyaları yenidən yazmadan Hookları necə istifadə edəyəcimizi bilmək istəyirsinizsə, bu səhifəni oxumağa davam edin.

## Motivasiya {#motivation}

Hooklar, son beş ildə on minlərlə komponenti yazdığımız zaman qarşılaşdığımız bir çox bir-birindən asılı olmayan problemləri həll edir. React-i öyrənirsinizsə, hər gün işlədirsinizsə və ya oxşar komponent modeli əsasında qurulmuş fərqli kitabxanaya üstünlük verirsinizsə, siz bu problemlər ilə qarşılaşmısınız.

### State-li məntiqi komponentlər arası paylaşmaq çətindir {#its-hard-to-reuse-stateful-logic-between-components}

React ilə paylaşıa bilən davranışları komponentə "qoşmaq" mümkün deyil (məsələn, qlobla store-a qoşulmaq). React ilə işlədiyiniz zaman bu problemləri həə etmək üçün [render propları](/docs/render-props.html) və [yüksək dərəcəli komponentlər](/docs/higher-order-components.html) yollar ilə tanış olmusunuz. Lakin, bu yolları işlətdikdə komponentlərin strukturunu dəyişmək lazım olur. Bu yolu tətbiq etmək vaxt alır və kodu izləməyi çətinləşdirir. Normal React applikasiyasına React DevTools-dan baxdıqda çox gümanki komponentləri əhatə edən provayderlər, istehlakçılar, yüksək dərəcəli komponentlər, render propları və digər abstraksiyaların yaratdığı "əhatə cəhənnəmi" ilə qarşılaşacaqsınız. Bu əhatə komponentlərini [DevTools-dan filtr etməyin mümkün olduğuna baxmayaraq](https://github.com/facebook/react-devtools/pull/503) burada daha dərin problemin olduğunu göstərir: React-dən state-li məntiqi paylaşmaq üçün daha yazşı primitiv lazımdır.

Hooklar ilə state-li məntiqi komponentdən ixrac edib müstəqil test edə bilmək və yenidən istifadə edə bilmək mümkündür. **Hooklar ilə komponetn iyerarxiyasını dəyişmədən state-li məntiqi paylaşmaq mümkündür.** Bu, Hookların komponentlər arasında və ya cəmiyyətdə paylaşılmasını asanlaşdırır.

Biz bu haqqda [Xüsusi Hooklar](/docs/hooks-custom.html) bölməsində daha ətraflı danışacağıq.

### Mürəkkəb komponentləri başa düşmək çətindir {#complex-components-become-hard-to-understand}

We've often had to maintain components that started out simple but grew into an unmanageable mess of stateful logic and side effects. Each lifecycle method often contains a mix of unrelated logic. For example, components might perform some data fetching in `componentDidMount` and `componentDidUpdate`. However, the same `componentDidMount` method might also contain some unrelated logic that sets up event listeners, with cleanup performed in `componentWillUnmount`. Mutually related code that changes together gets split apart, but completely unrelated code ends up combined in a single method. This makes it too easy to introduce bugs and inconsistencies.

In many cases it's not possible to break these components into smaller ones because the stateful logic is all over the place. It's also difficult to test them. This is one of the reasons many people prefer to combine React with a separate state management library. However, that often introduces too much abstraction, requires you to jump between different files, and makes reusing components more difficult.

To solve this, **Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data)**, rather than forcing a split based on lifecycle methods. You may also opt into managing the component's local state with a reducer to make it more predictable.

We'll discuss this more in [Using the Effect Hook](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns).

### Classes confuse both people and machines {#classes-confuse-both-people-and-machines}

In addition to making code reuse and code organization more difficult, we've found that classes can be a large barrier to learning React. You have to understand how `this` works in JavaScript, which is very different from how it works in most languages. You have to remember to bind the event handlers. Without unstable [syntax proposals](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/), the code is very verbose. People can understand props, state, and top-down data flow perfectly well but still struggle with classes. The distinction between function and class components in React and when to use each one leads to disagreements even between experienced React developers.

Additionally, React has been out for about five years, and we want to make sure it stays relevant in the next five years. As [Svelte](https://svelte.dev/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/), and others show, [ahead-of-time compilation](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) of components has a lot of future potential. Especially if it's not limited to templates. Recently, we've been experimenting with [component folding](https://github.com/facebook/react/issues/7323) using [Prepack](https://prepack.io/), and we've seen promising early results. However, we found that class components can encourage unintentional patterns that make these optimizations fall back to a slower path. Classes present issues for today's tools, too. For example, classes don't minify very well, and they make hot reloading flaky and unreliable. We want to present an API that makes it more likely for code to stay on the optimizable path.

To solve these problems, **Hooks let you use more of React's features without classes.** Conceptually, React components have always been closer to functions. Hooks embrace functions, but without sacrificing the practical spirit of React. Hooks provide access to imperative escape hatches and don't require you to learn complex functional or reactive programming techniques.

>Examples
>
>[Hooks at a Glance](/docs/hooks-overview.html) is a good place to start learning Hooks.

## Gradual Adoption Strategy {#gradual-adoption-strategy}

>**TLDR: There are no plans to remove classes from React.**

We know that React developers are focused on shipping products and don't have time to look into every new API that's being released. Hooks are very new, and it might be better to wait for more examples and tutorials before considering learning or adopting them.

We also understand that the bar for adding a new primitive to React is extremely high. For curious readers, we have prepared a [detailed RFC](https://github.com/reactjs/rfcs/pull/68) that dives into motivation with more details, and provides extra perspective on the specific design decisions and related prior art.

**Crucially, Hooks work side-by-side with existing code so you can adopt them gradually.** There is no rush to migrate to Hooks. We recommend avoiding any "big rewrites", especially for existing, complex class components. It takes a bit of a mindshift to start "thinking in Hooks". In our experience, it's best to practice using Hooks in new and non-critical components first, and ensure that everybody on your team feels comfortable with them. After you give Hooks a try, please feel free to [send us feedback](https://github.com/facebook/react/issues/new), positive or negative.

We intend for Hooks to cover all existing use cases for classes, but **we will keep supporting class components for the foreseeable future.** At Facebook, we have tens of thousands of components written as classes, and we have absolutely no plans to rewrite them. Instead, we are starting to use Hooks in the new code side by side with classes.

## Çox Verilən Suallar {#frequently-asked-questions}

Hooklar haqqında ümumi sualları cavablandırmaq üçün [Hooklar FAQ səhifəsini](/docs/hooks-faq.html) yaratdıq.

## Sonrakı Addımlar {#next-steps}

Bu səhifənin sonunda Hookların hansı problemləri həll etdiyi haqqda ümumi ideyanız olacaq. Lakin, bir çox detallar hələ də aydın olmaya bilər. Narahat olmayın! **[Sonrakı səhifədə](/docs/hooks-overview.html) Hookları nümunələrə baxaraq öyrənəcəyik.**

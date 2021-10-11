---
id: hooks-intro
title: Hooklara Giriş
permalink: docs/hooks-intro.html
next: hooks-overview.html
---

*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə sinif yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.

```js{4,5}
import React, { useState } from 'react';

function Example() {
  // "count" adlı state dəyişəni yaradın
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Tıklandı: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Tıkla
      </button>
    </div>
  );
}
```

İlk öyrənəcəyimiz "Hook" yeni `useState` funksiyasıdır. Lakin, bu nümunə sadəcə icmal üçündür. Nəsə anlaşılmırsa narahat olmayın!

**Hooklar haqqında öyrənmək üçün [sonrakı səhifəyə](/docs/hooks-overview.html) baxın.** Bu səhifədə, Hookların React-ə əlavə edilməsinin səbəbini izah edəcək və Hookların applikasiya yazmaq üçün faydalarından danışacağıq.

>Qeyd
>
>React 16.8.0 versiyası Hookları dəstəkləyən ilk buraxılışdır. Paketləri yenilədiyiniz zaman React DOM daxil olmaqla bütün paketləri yeniləməyi unutmayın.
>React Native-in [0.59-cu buraxılışından](https://reactnative.dev/blog/2019/03/12/releasing-react-native-059) başlayaraq Hooklar dəstəklənir.

## Video Giriş {#video-introduction}

React Conf 2018-də Sofi Alpert və Dən Abramov Hookları tanıtdı. Rayn Florens isə applikasiyanı necə Hooklar ilə refaktorinq etmək haqqında danışdı. Videoya buradan baxa bilərsiniz:

<br>

<iframe width="650" height="366" src="//www.youtube.com/embed/dpw9EHDh2bM" frameborder="0" allowfullscreen></iframe>

## Pozucu Dəyişikliklər Yoxdur {#no-breaking-changes}

Davam etmədən öncə aşağıdakı qeydləri nəzərə alın:

* **Hooklar tam fakultativdir.** Heç bir mövcud kodu yenidən yazmadan Hookları sınaya bilərsiniz. Əgər Hookları öyrənmək və ya işlətmək istəmirsinizsə, kodunuzu köhnə üsulla yazmağa davam edə bilərsiniz.
* **100% geriyə uyğundur.** Hooklarda heç bir pozucu dəyişiklik yoxdur.
* **İndi mövcuddur.** Hooklar v16.8.0-dan başlayaraq mövcuddur.

**React siniflərini silmək haqqında heç bir planımız yoxdur.** Bu səhifənin [aşağı bölməsində](#gradual-adoption-strategy) Hookların tədrici adaptasiya stategiyası haqqında məlumat ala bilərsiniz.

**Hooklar, bildiyiniz React konsepsiyalarını əvəz etmir.** Əvəzinə, Hooklar ilə bildiyiniz React konsepsiyalarını (proplar, state, kontekst, ref-lər və lifecycle) daha düz API ilə istifadə edə bilərsiniz. Sonrakı bölmələrdə göstərəcəyimiz kimi Hooklar ilə bu xüsusiyyətləri daha güclü formada kombinə etmək mümkündür.

**Hookları öyrənmək istəyirsinizsə, [sonrakı səhifəyə atlayın!](/docs/hooks-overview.html)** Əgər Hookların niyə əlavə olunduğu haqqda məlumat almaq və mövcud applikasiyaları yenidən yazmadan Hookları necə istifadə ediləcəyini bilmək istəyirsinizsə, bu səhifəni oxumağa davam edin.

## Motivasiya {#motivation}

Hooklar, son beş ildə on minlərlə komponenti yazdığımız zaman qarşılaşdığımız bir-birindən asılı olmayan bir çox problemləri həll etmək üçün tətiq olunub. Əgər React-i öyrənir, hər gün işlədir və ya oxşar komponent modeli əsasında qurulmuş fərqli kitabxanaya üstünlük verirsinizsə, siz bu problemlər ilə qarşılaşmısınız.

### State-li məntiqi komponentlər arası paylaşmaq çətindir {#its-hard-to-reuse-stateful-logic-between-components}

React ilə paylaşıla bilən davranışları komponentə "qoşmaq" mümkün deyil (məsələn, qlobal store-a qoşulmaq). Bu problemləri həll etmək üçün [render propları](/docs/render-props.html) və [yüksək dərəcəli komponentlər](/docs/higher-order-components.html) kimi həllər ilə tanış olmusunuz. Lakin, bu həlləri işlətdikdə komponentlərin strukturunu dəyişmək lazım olur. Bunu tətbiq etmək vaxt alır və kod izləməsini çətinləşdirir. Çox gümanki, React DevTools-dan normal React applikasiyasını izlədikdə komponentləri əhatə edən provayderlər, istehlakçılar, yüksək dərəcəli komponentlər, render propları və digər abstraksiyaların yaratdığı "əhatə cəhənnəmi" ilə qarşılaşacaqsınız. Bu əhatə komponentlərini [DevTools-dan filtr etməyin mümkün olduğuna baxmayaraq](https://github.com/facebook/react-devtools/pull/503) burada daha dərin problemin olduğunu göstərir: state-li məntiqi paylaşmaq üçün React-ə daha yaxşı primitiv lazımdır.

Hooklar ilə state-li məntiqi komponentdən ixrac edib müstəqil test edə bilmək və yenidən istifadə edə bilmək mümkündür. **Hooklar ilə komponent iyerarxiyasını dəyişmədən state-li məntiqi paylaşmaq mümkündür.** Bu, Hookların komponentlər arasında və ya cəmiyyətdə paylaşılmasını asanlaşdırır.

[Xüsusi Hooklar](/docs/hooks-custom.html) səhifəsində bu haqqda daha ətraflı danışacağıq.

### Mürəkkəb komponentləri başa düşmək çətindir {#complex-components-become-hard-to-understand}

Bir çox zaman, komponentlərin sadə başlamasına baxmayaraq böyüyərək state-li məntiq və yan effektlər qarışıqlığı ilə rastlaşmışıq. Sinif komponentlərində hər lifecyle funksiyasına bir-biri ilə əlaqəli olmayan məntiqlər yerləşdirilirdi. Məsələn, `componentDidMount` və `componentDidUpdate` funksiyalarında məlumat yükləməsi məntiqindən əlavə `componentDidMount` funksiyasında əvvəlki əməliyyata aidiyyatı olmayan hadisə işləyicilərini quraşdıran məntiq, `componentWillUnmount` funksiyasında isə bu hadisə işləyicilərini silən təmizlik əməliyyatları ola bilər. Bir-birinə aid olan kodlar parçalanır, bir-birinə aid olmayan kodlar isə eyni funksiyada yığılır. Bu, baq və uyğunsuzluqların şansını artırır.

State-li məntiqin hər yerdə olduğundan bir çox ssenaridə bu komponentləri kiçik hissələrə ayırmaq mümkün olmur. Əlavə olaraq komponentləri test etmək çətinləşir. Bu, React-i kənar state idarəsi kitabxanası ilə işlətməyin səbəblərindən biridir. Lakin, kənar state idarəsi kitabxanaları istifadə etdikdə abstraksiya çoxalır, bir neçə fayl arasında atlamaq məcburiyyəti yaranır və komponentlərin yenidən istifadəsi çətinləşir.

Bu problemləri həll etmək üçün **Hooklar ilə komponentin bir-biri ilə əlaqəli bloklarını (məsələn, abunəliyin quraşdırılması və ya məlumatın yüklənməsi)** lifecycle metodları arasında parçalamaq əvəzinə **kiçik funksiyalara ayırmaq mümkündür**. Əlavə olaraq, reducer ilə komponentin lokal state-ini idarə etmək mümkündür.

[Effekt Hookunun İstifadəsi](/docs/hooks-effect.html#tip-use-multiple-effects-to-separate-concerns) səhifəsində bu haqqda daha ətraflı danışacağıq.

### Siniflər həm insanları həm də maşınları çaşdırır {#classes-confuse-both-people-and-machines}

Siniflər, kodun yenidən istifadəsini və kod təşkilini çətinləşdirməsindən əlavə React-i öyrənmək üçün böyük baryer yaradır. Sinifləri anlamaq üçün JavaScript-də `this`-in necə işlədiyini (digər dillərdə `this`-in işləməsindən fərqlidir) anlamaq lazımdır. Hadisə işləyicilərini bind etməyi unutmamaq lazımdır. Stabil olmayan [sintaksis təklifini](https://babeljs.io/docs/en/babel-plugin-transform-class-properties/) işlətmədikdə kodun oxunuşu çətinləşir. Proqramçıların proplar, state və yuxarıdan aşağı məlumat axınını öyrənməkdə heç bir problem yaşamadıqlarına baxmayaraq sinifləri anlamaqda çətinlik çəkirlər. React-də funksiya və sinif komponentlərinin fərqi və hansı komponent tipini işlətmək hətta təcrübəli React proqramçılarında fikir müxtəlifliyi yaradır.

Əlavə olaraq, React artıq beş ildir ki mövcuddur və biz bunun gələcək beş ildə də müvafiq qalmasını istəyirik. [Svelte](https://svelte.dev/), [Angular](https://angular.io/), [Glimmer](https://glimmerjs.com/) və digər kitabxanaların göstərdiyi kimi komponentlərin [öncədən kompilyasiyasının](https://en.wikipedia.org/wiki/Ahead-of-time_compilation) və şablon ilə məhdudlaşmamasının gələcəkdə böyük potensiyalı var. Bu yaxınlarda, [Prepack](https://prepack.io/) ilə [komponenent qatlanmasını (folding)](https://github.com/facebook/react/issues/7323) eksperiment etməyə başlayaraq erkən nəticələrin ümidli olduğunu görürük. Lakin, sinif komponentləri istənilməz pattern-ləri təşviq edərək bu optimallaşdırmaları etibarsız edə bilir. Siniflər bugünün alətləri üçün də problemlər yaradır. Məsələn, siniflər minimallaşdırmanı pisləşdirir və isti yüklənməni etibarsız edir. Biz, kodun optimallaşa bilən yolda olması üçün yeni API təqdim etmək istəyirik.

Bu problemləri həll edə bilmək üçün **Hooklar ilə React xüsusiyyətlərini sinifsiz istifadə edə bilərsiniz.** Konseptual olaraq React komponentləri hər zaman funksiyalara daha yaxın olublar. Hooklar ilə React-in praktiki ruhunu fəda etmədən funksiyaları işlədə bilirik. Hooklar ilə mürəkkəb funksional və ya reaktiv proqramlaşdırma texnikalarına ehtiyac olmadan imperativ çıxış yollarından istifadə etmək mümkündür.

>Nümunələr
>
>Hookları öyrənmək üçün [Hookların İcmalı](/docs/hooks-overview.html) bölməsindən başlamağı tövsiyə edirik.

## Tədrici Adaptasiya Strategiyası {#gradual-adoption-strategy}

>**Qısacası, React-dən sinifləri silmək üçün heç bir planımız yoxdur.**

React proqramçıları üçün məhsulların buraxılışını etmək hər yeni çıxan API-ı öyrənməkdən daha vacibdir. Hookların çox yeni olduğundan nümunələri və dərslikləri gözləmək daha faydalı ola bilər.

Həmçinin, biz React-ə yeni primitivin əlavə edilməsinin çox böyük dəyişiklik olduğunu bilirik. Maraqlanan oxuyucular üçün biz [detallı RFC](https://github.com/reactjs/rfcs/pull/68) təqdim edirik. Bu RFC-də motivasiyamız haqqında daha detallı danışır və xüsusi dizayn qərarından və buna aid olan resursları paylaşırıq.

<<<<<<< HEAD
**Hooklar ilə mövcud kodu eyni zamanda işlədə bildiyinizdən Hookları yavaş-yavaş adaptasiya edə bilərsiniz.** Hooklara miqrasiya etmək üçün tələsməyin. Biz, "böyük yenidən kod yazılmalarını," xüsusilə də mövcud mürəkkəb siniflərin yenidən yazılmalarını tövsiyə etmirik. "Hooklar ilə fikirləşmək" üçün baxışımızı dəyişməliyik. Bizim təcrübəmiz göstərir ki, Hookları yeni və kritiki olmayan komponentlərdə praktika edərək komandada hamının Hookları işlətməkdə rahat olması ən yaxşı nəticəni verir. Hookları sınadıqdan sonra müsbət və ya mənfi fikirlərinizi [bizə göndərin](https://github.com/facebook/react/issues/new).
=======
**Crucially, Hooks work side-by-side with existing code so you can adopt them gradually.** There is no rush to migrate to Hooks. We recommend avoiding any "big rewrites", especially for existing, complex class components. It takes a bit of a mind shift to start "thinking in Hooks". In our experience, it's best to practice using Hooks in new and non-critical components first, and ensure that everybody on your team feels comfortable with them. After you give Hooks a try, please feel free to [send us feedback](https://github.com/facebook/react/issues/new), positive or negative.
>>>>>>> 9b3c3f4e613440baf2e2f1775be65dac8c08ab5f

Hooklar ilə siniflərdə olan bütün metodları əhatə etmək istəməyimizə baxmayaraq **uzaq gələcəyə kimi sinif komponentlərini dəstəkləmək istəyirik.** Facebook-da bizim siniflər ilə yazılmış on minlərlə komponentlərimiz var və bizim bu komponentləri yenidən yazmağa heç bir planımız yoxdur. Əvəzinə, biz yeni kodları siniflər ilə yanaşı Hooklar ilə yazırıq.

## Çox Verilən Suallar {#frequently-asked-questions}

Hooklar haqqında ümumi sualları cavablandırmaq üçün [Hooklar FAQ səhifəsini](/docs/hooks-faq.html) yaratdıq.

## Sonrakı Addımlar {#next-steps}

Bu səhifənin sonunda Hookların hansı problemləri həll etdiyi haqqda ümumi fikriniz olacaq. Lakin, bir çox detallar hələ də aydın olmaya bilər. Narahat olmayın! **[Sonrakı səhifədə](/docs/hooks-overview.html) nümunələrə baxaraq Hookları öyrənəcəyik.**

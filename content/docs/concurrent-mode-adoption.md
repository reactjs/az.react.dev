---
id: concurrent-mode-adoption
title: Konkurrent Rejiminə Uyğunlaşma (Eksperimental)
permalink: docs/concurrent-mode-adoption.html
prev: concurrent-mode-patterns.html
next: concurrent-mode-reference.html
---

<style>
.scary > blockquote {
  background-color: rgba(237, 51, 21, 0.2);
  border-left-color: #ed3315;
}
</style>

<div class="scary">

>Xəbərdarlıq:
>
<<<<<<< HEAD
>Bu səhifədə **stabil buraxılışlarda [mövcud olmayan](/docs/concurrent-mode-adoption.html) eksperimental xüsusiyyətlərdən danışılır**. Produksiya applikasiyalarında eksperimental qurulmalardan istifadə etməyin. Buradakı xüsusiyyətlər React-in bir hissəsi olana kimi xəbərdarlıq verilmədən əhəmiyyətli dərəcədə dəyişilə bilər.
>
>Bu sənədlər erkən yoxlamaq istəyən və maraqlanan insanlar üçün yönəldilib. **Əgər React-ə yeni başlayırsınızsa, burada danışılan xüsusiyyətlərdən narahat olmayın** -- bu xüsusiyyətləri indi öyrənmək lazım deyil.

>Caution:
=======
>This page was about experimental features that aren't yet available in a stable release. It was aimed at early adopters and people who are curious.
>
>Much of the information on this page is now outdated and exists only for archival purposes. **Please refer to the [React 18 Alpha announcement post](/blog/2021/06/08/the-plan-for-react-18.html
) for the up-to-date information.**
>>>>>>> a08e1fd4b574a4d2d55e292af9eb01d55a526303
>
>Before React 18 is released, we will replace this page with stable documentation.

</div>

- [Quraşdırma](#installation)
  - [Bu Eksperimental Buraxılış Kimin Üçündür?](#who-is-this-experimental-release-for)
  - [Konkurrent Rejimini Aktivləşdirmək](#enabling-concurrent-mode)
- [Nəyi Gözləyin](#what-to-expect)
  - [Miqrasiya Addımı: Blok Rejimi](#migration-step-blocking-mode)
  - [Niyə Bu Qədər Rejim Var?](#why-so-many-modes)
  - [Xüsusiyyətlərin Müqayisəsi](#feature-comparison)

## Quraşdırma {#installation}

Konkurrent Rejimi yalnız React-in [eksperimental qurulmalarında](/blog/2019/10/22/react-release-channels.html#experimental-channel) mövcuddur. Bunu yükləmək üçün aşağıdakı əmri icra edin:

```
npm install react@experimental react-dom@experimental
```

**Eksperimental qurulmalarda semantik versiya siğortaları mövcud deyil.**  
Hər bir `@experimental` buraxılışda API-lar əlavə oluna bilər, dəyişə bilər, hətta silinə bilər.

**Eksperimental buraxılışlarda pozucu dəyişikliklər tez-tez olur.**

Bu qurulmaları şəxsi layihənizdə və ya fərqli budaqda sınaya bilərsiniz. Lakin, biz bu qurulmaları produksiyada işlətməyi tövsiyyə etmirik. Facebook-da bu qurulmalar produksiyada istifadə edilir. Lakin, baqlar baş verdikdə biz bu baqları düzəldirik. Sizə xəbərdarlıq edildi!

### Bu Eksperimental Buraxılış Kimin Üçündür? {#who-is-this-experimental-release-for}

Bu buraxılış əsasən erkən yoxlayıcılar, kitabxana müəllifləri və maraqlanan insanlar üçündür.

Biz bu kodu produksiyada işlədirik (və bizim üçün işləyir), amma bu buraxılışda baqlar və catışmayan xüsusiyyətlər, buraxılışın sənədlərində isə boşluqlar var. Biz, Konkurrent Rejimində nəyin sındığını bilib bu xüsusiyyəti rəsmi stabil buraxılışına daha yaxşı hazırlamaq istəyirik.

### Konkurrent Rejimini Aktivləşdirmək {#enabling-concurrent-mode}

Normalda, biz React-ə yeni xüsusiyyət əlavə etdikdə siz bu xüsusiyyəti dərhal işlədə bilirsiniz. Fraqmentlər, Kontekst və Hooklar belə xüsusiyyətlərin nümunələridir. Mövcud kodu dəyişmədən bu kodlardan istifadə etmək mümkündür.

Konkurrent Rejimi isə fərqlidir. Bu rejimdə React-in işləməsində semantik dəyişikliklər edilir. Əks halda, bu rejim ilə gələn [yeni xüsusiyyətləri](/docs/concurrent-mode-patterns.html) dəstəkləmək *mümkün olmayacaqdı*. Bu səbəbdən, buradakı xüsusiyyətləri ayrı-ayrı dərc etmək əvəzinə yeni "rejimin" altında qruplaşdırdıq.

Konkurrent Rejimini yalnız xüsusi alt ağacda aktivləşdirmək mümkün deyil. Əvəzinə, bu rejimi `ReactDOM.render()` funksiyasını çağırdığınız yerdən aktivləşdirməlisiniz.

**Bu, Konkurrent Rejimini bütün `<App />` ağacı üçün aktivləşdirəcək:**

```js
import ReactDOM from 'react-dom';

// Əvvəl aşağıdakı funksiya çağırışı olduğu yerdə:
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// Konkurrent Rejimini aşağıdakı funksiya ilə aktivləşdirə bilərsiniz:

ReactDOM.unstable_createRoot(
  document.getElementById('root')
).render(<App />);
```

>Qeyd:
>
>`createRoot` kimi Konkurrent Rejimi API-ları yalnız React-in eksperimental buraxılışlarında mövcuddur.

Konkurrent Rejimi aktiv olduqda [əvvəl "təhlükəli" kimi işarələnmiş](/blog/2018/03/27/update-on-async-rendering.html) lifecycle metodları təhlükəli olub daha çox baqlara səbəb olurlar. Applikasiyanız [Strikt Rejimi](/docs/strict-mode.html) ilə işləmirsə, Konkurrent Rejimindən istifadə etməyi tövsiyyə etmirik.

## Nəyi Gözləyin  {#what-to-expect}

Əgər sizin çoxlu 3-cü tərəfin paketlərindən istifadə edən böyük applikasiyanız varsa, bu applikasiyada Konkurrent Rejimindən dərhal istifadə edə biləcəyinizi gözləməyin. **Məsələn, biz Facebook-un yeni səhifəsi üçün Konkurrent Rejimini aktivləşdirmişik, amma bu rejimi köhnə sayt üçün aktivləşdirməyi planlaşdırmırıq.** Bunun səbəbi bizim köhnə səhifəmizdə "təhlükəli" lifecycle metodlarından, Konkurrent Rejimi ilə uyğun olmayan 3-cü tərəfin kitabxanalarından və həllərindən istifadə edilir.

Bizim təcrübəmiz göstərir ki, kənar state idarəsi həllərindən asılı olmayan və idiomatik React həllərindən istifadə edən kodları Konkurrent Rejimində icra etmək asandır. Biz, çox yaranan problemlər və bu problemlərin həlləri haqqında gələcək həftələrdə danışacağıq.

### Miqrasiya Addımı: Blok Rejimi {#migration-step-blocking-mode}

Köhnə kodları Konkurrent Rejiminə keçirmək çox çətin ola bilər. Bu səbəbdən biz React-in eksperimental buraxılışlarında yeni "Blok Rejimini" də dəstəkləyirik. Bu rejimdən istifadə etmək üçün `createRoot` funksiyasını `createBlockingRoot` funksiyası ilə əvəz edin. Bu rejimdə Konkurrent Rejiminin yalnız *kiçik hissəsi* dəstəklənir, amma bu rejim React-in indiki işlədiyi vaxta daha yaxın olub yaxşı miqrasiya addımı kimi xidmət göstərir.

Xülasə:

* **Köhnə Rejim:** `ReactDOM.render(<App />, rootNode)`. Bu, React applikasiyalarının bugünki işləmə rejimi ilə eynidir. Bu rejimi yaxın gələcəkdə silmək marağımız yoxdur. Lakin, bu rejim ilə yeni xüsusiyyətlər dəstəklənməyəcək.
* **Blok Rejimi:** `ReactDOM.createBlockingRoot(rootNode).render(<App />)`. Bu eksperimental rejim Konkurrent Rejiminin kiçik hissəsindən istifadə etmək istəyənlər üçün ilkin miqrasiya addımı rolunu oynayır.
* **Konkurrent Rejimi:** `ReactDOM.createRoot(rootNode).render(<App />)`. Bu rejim hələki eksperimentaldır. Gələcəkdə stabilləşdikdən sonra biz bunu React-in standart rejimi etmək istəyirik. Bu rejimdə React-in *bütün* xüsusiyyətləri dəstəklənəcək.

### Niyə Bu Qədər Rejim Var? {#why-so-many-modes}

Biz, böyük pozucu dəyişikliklər etmək əvəzinə [tədrici miqrasiya strategiyasına](/docs/faq-versioning.html#commitment-to-stability) üstünlük veririk.

Praktikada, biz bir çox Köhnə Rejimdə olan applikasiyaların ən azından Blok Rejiminə keçə bilməsini gözləyirik. Bu fraqmentasiya bütün rejimləri dəstəkləmək istəyən kitabxanalar üçün əsəbləşdirici ola bilər. Lakin, ekosistemi yavaş-yavaş Köhnə rejimdən uzaqlaşdırmaq ekosistemdə olan böyük kitabxanaların problemlərini də (məsələn, [şablonu oxuduqda çaşdırıcı Suspense davranışları](https://github.com/facebook/react/issues/14536) və [stabil dəstələnmənin siğortalanmaması](https://github.com/facebook/react/issues/15080) kimi) *həll edəcək*. Blok və Konkurrent Rejimlərində mövcud olmayan bəzi baqları Köhnə Rejimdə semantikanı dəyişmədən düzəltmək mümkün deyil.

Siz, Blok Rejiminin Konkurrent Rejiminin aşağı salınmış versiyası olduğunu fikirləşə bilərsiniz. **Nəticədə, gələcəkdə bütün rejimlər birləşəcək və fərqli rejimlər haqqında fikirləşmək lazım olmayacaq.** Lakin, indiki zamanda fərqli rejimlər ilə miqrasiya etmək asanlaşacaq.

### Xüsusiyyətlərin Müqayisəsi {#feature-comparison}

<style>
  #feature-table table { border-collapse: collapse; }
  #feature-table th { padding-right: 30px; }
  #feature-table tr { border-bottom: 1px solid #eee; }
</style>

<div id="feature-table">

|   |Köhnə Rejim  | Blok Rejimi  | Konkurrent Rejimi  |
|---  |---  |---  |---  |
|[Mətn Ref-ləri](/docs/refs-and-the-dom.html#legacy-api-string-refs)  |✅  |🚫**  |🚫**  |
|[Köhnə Kontekst](/docs/legacy-context.html) |✅  |🚫**  |🚫**  |
|[findDOMNode](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)  |✅  |🚫**  |🚫**  |
|[Suspense](/docs/concurrent-mode-suspense.html#what-is-suspense-exactly) |✅  |✅  |✅  |
|[SuspenseList](/docs/concurrent-mode-patterns.html#suspenselist) |🚫  |✅  |✅  |
|Suspense SSR + Hidrasiya |🚫  |✅  |✅  |
|Proqressiv Hidrasiya  |🚫  |✅  |✅  |
|Seçilmiş Hidrasiya  |🚫  |🚫  |✅  |
|Kooperativ Multitasking |🚫  |🚫  |✅  |
|Bir neçə setState-lərin avtomatik dəstələnməsi     |🚫* |✅  |✅  |
|[Prioritet ilə Render Etmə](/docs/concurrent-mode-patterns.html#splitting-high-and-low-priority-state) |🚫  |🚫  |✅  |
|[Kəsilə Bilən Ön Render Etmə](/docs/concurrent-mode-intro.html#interruptible-rendering) |🚫  |🚫  |✅  |
|[useTransition](/docs/concurrent-mode-patterns.html#transitions)  |🚫  |🚫  |✅  |
|[useDeferredValue](/docs/concurrent-mode-patterns.html#deferring-a-value) |🚫  |🚫  |✅  |
|[Suspense-lərin Göstərilməsi "Qatarı"](/docs/concurrent-mode-patterns.html#suspense-reveal-train)  |🚫  |🚫  |✅  |

</div>

\*: Köhnə Rejimdə React tərəfindən idarə olunan hadisələrin dəstələnməsi mümkündür. Lakin, bu yalnız bir brauzer tapşırığı ilə idarə oluna bilir. React olmayan hadisələr üçün `unstable_batchedUpdates` funksiyasından istifadə etmək lazımdır. Blok Rejimi və Konkurrent Rejimində isə bütün `setState`-lər dəstələnir.

\*\*: Təkmilləşmə zamanı xəbərdarlıqlar göstəriləcək.

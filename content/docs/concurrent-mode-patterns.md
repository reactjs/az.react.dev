---
id: concurrent-mode-patterns
title: Konkurrent UI Həlləri (Eksperimental)
permalink: docs/concurrent-mode-patterns.html
prev: concurrent-mode-suspense.html
next: concurrent-mode-adoption.html
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
>Bu səhifədə **stabil buraxılışlarda [mövcud olmayan](/docs/concurrent-mode-adoption.html) eksperimental xüsusiyyətlərdən danışılır**. Produksiya applikasiyalarında eksperimental qurulmalardan istifadə etməyin. Buradakı xüsusiyyətlər React-in bir hissəsi olana kimi xəbərdarlıq verilmədən əhəmiyyətli dərəcədə dəyişilə bilər.
>
>Bu sənədlər erkən yoxlamaq istəyən və maraqlanan insanlar üçün yönəldilib. **Əgər React-ə yeni başlayırsınızsa, burada danışılan xüsusiyyətlərdən narahat olmayın** -- bu xüsusiyyətləri indi öyrənmək lazım deyil. Məsələn, əgər sizə bugün işləyən məlumat yüklənməsi dərsliyi lazımdırsa, [bu məqaləni](https://www.robinwieruch.de/react-hooks-fetch-data/) oxuyun.

</div>

Adətən, state-i yenilədikdə dəyişiklikləri ekranda dərhal görmək istəyirik. Applikasiyanı istifadəçi daxil etməsini tez cavablandırmasını istədiyimizdən bu fikir məntiqli gəlir. Lakin, bəzi ssenarilərdə **yeniliyin ekranda görünməsini gecikdirmək istəyə bilərik**.

Məsələn, bir səhifədən digər səhifəyə keçid etdiyimiz zaman yeni səhifəyə aid olan heç bir kod və ya məlumat yüklənmədiyi hallda yükləmə göstəricisi ilə boş səhifənin görünməsi əsəbləşdirici ola bilər. Biz, əvvəlki ekranda daha uzun qalmaq istəyə bilərik. Tarix boyu bu həlli React-də düzəltmək çətin olub. Lakin, Konkurrent Modundan bunu həll etmək üçün yeni alətlər əlavə olunub.

- [Keçidlər](#transitions)
  - [setState-i Keçid ilə Əhatə Etmək](#wrapping-setstate-in-a-transition)
  - [Yükləmə Göstəricini Əlavə Etmək](#adding-a-pending-indicator)
  - [Dəyişiklikləri Nəzərdən Keçirmək](#reviewing-the-changes)
  - [Yeniliklər Harada Baş Verir?](#where-does-the-update-happen)
  - [Keçidlər Hər Yerdədir](#transitions-are-everywhere)
  - [Keçidləri Dizayn Sisteminə Əlavə Etmək](#baking-transitions-into-the-design-system)
- [Üç Addım](#the-three-steps)
  - [Sadə: Qayıtmış → Skelet → Tam](#default-receded-skeleton-complete)
  - [Üstünlük Verilən: Yükləmə → Skelet → Tam](#preferred-pending-skeleton-complete)
  - [Lazy Xüsusiyyətləri `<Suspense>` ilə Əhatə Edin](#wrap-lazy-features-in-suspense)
  - [Suspense-lərin Göstərilməsi “Qatarı”](#suspense-reveal-train)
  - [Yükləmə Göstəricisini Gecikdirmək](#delaying-a-pending-indicator)
  - [Xülasə](#recap)
- [Digər Həllər](#other-patterns)
  - [Yüksək və Açağı Priooritetli State-ləri Parçalamaq](#splitting-high-and-low-priority-state)
  - [Dəyəri Gecikdirmək](#deferring-a-value)
  - [SuspenseList](#suspenselist)
- [Sonrakı Addımlar](#next-steps)

## Keçidlər {#transitions}

Gəlin [Məlumat Yüklənməsi üçün Suspense]((/docs/concurrent-mode-suspense.html)) səhifəsindəki [nümunəyə](https://codesandbox.io/s/infallible-feather-xjtbu) yenidən baxaq.

Activ profaylı dəyişmək üçün "Sonrakı" düyməsini tıkladıqda mövcud səhifənin məlumatları dərhal itir və biz bütün səhifə üçün yükləmə göstəricisini görürük. Biz bunu "istənilməz" yükləmə vəziyyəti adlandırırıq. **Yeni səhifəyə keçməmişdən öncə yükləmə göstəricisini göstərməyib bəzi kontentin yüklənməsini gözləmək daha yaxşı olardı.**

Bunu həll etmək üçün React-ə `useTransition()` adlı Hook əlavə etmişik.

Bu Hooku üç addım ilə işlətmək mümkündür.

İlk olaraq Konkurrent Modunu işlətdiyimizi bilməliyik. Biz, [Konkurrent Moduna uyğunlaşma](/docs/concurrent-mode-adoption.html) haqqında sonrakı səhifələrdə danışacağıq, amma bu səhifədə bu xüsusiyyətin işləməsi üçün `ReactDOM.render()` əvəzinə `ReactDOM.createRoot()`-un işlədilməsinin kifayət etdiyini bilməmiz bəsdir:

```js
const rootElement = document.getElementById("root");
// Konkurrent Modundan İstifadə Et
ReactDOM.createRoot(rootElement).render(<App />);
```

Sonrakı səhifədə React-dən `useTransition` Hookunu idxal edəcəyik:

```js
import React, { useState, useTransition, Suspense } from "react";
```

Ən sonda, bu Hooku `App` komponentində işlədəcəyik:

```js{3-5}
function App() {
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000
  });
  // ...
```

**Bu funksiya təklikdə heç nə etmir.** Biz, bu Hookun qaytardığı dəyərlər əsasında state keçidini quraşdırmalıyıq. `useTransition` Hooku iki dəyər qaytarır:

* `startTransition` funksiyadır. Bu funksiya ilə *hansı* state yeniliyini təxirə salmaq istədiyimizi bildirəcəyik.
* `isPending` bulin dəyərdir. Bu dəyər keçidin proqresdə olduğunu bildirir.

Biz, bu iki dəyəri aşağı bölmədə işlədəyəcik.

`useTransition` Hookuna konfiqurasiya obyekti göndərdiyimizə fikir verin. `timeoutMs` parametri **keçidin bitməsi üçün nə qədər gözləməyin lazım olduğunu** təyin edir. Məsələn, `{timeoutMs: 3000}` obyekti göndərdikdə "sonrakı profaylın yüklənməsi 3 saniyədən çox çəkdikdə böyük spinner-i göstərməyi, əks halda isə cari ekranda olan məlumatları göstərməyi" bildiririk.

### setState-i Keçid ilə Əhatə Etmək {#wrapping-setstate-in-a-transition}

"Sonrakı" düyməsinin hadisə işləyicisi cari profaylı dəyişmək üçün state-i yeniləyir:

```js{4}
<button
  onClick={() => {
    const nextUserId = getNextId(resource.userId);
    setResource(fetchProfileData(nextUserId));
  }}
>
```

Biz, state yeniliyini `startTransition` funksiyası ilə əhatə edəcəyik. Biz, bu formada **React-in state yeniliyini gecikdirməsində heç bir problemin olmadığını** bildiririk:

```js{3,6}
<button
  onClick={() => {
    startTransition(() => {
      const nextUserId = getNextId(resource.userId);
      setResource(fetchProfileData(nextUserId));
    });
  }}
>
```

**[CodeSandbox sınayın](https://codesandbox.io/s/musing-driscoll-6nkie)**

"Sonrakı" düyməsini bir neçə dəfə tıklayın. Bunun fərqli işlədiyinə fikir verin. **Tıklama zamanı dərhal boş ekran görmək əvəzinə cari səhifəni görəcəksiniz.** Məlumat yükləndiyi zaman React sonrakı səhifəyə keçid edəcək.

API cavabı 5 saniyə çəkdikdə biz React-in gözləmədən əl çəkdiyini və 3 saniyə sonra yeni səhifəyə keçdiyini [görəcəyik](https://codesandbox.io/s/relaxed-greider-suewh). Bunun səbəbi bizim `useTransition()` Hookuna `{timeoutMs: 3000}` obyektini göndərməmizdir. Məsələn, `{timeoutMs: 60000}` obyekti göndərsəydik React 1 dəqiqə gözləyəcəkdi.

### Yükləmə Göstəricini Əlavə Etmək {#adding-a-pending-indicator}

[Əvvəlki nümunədə](https://codesandbox.io/s/musing-driscoll-6nkie) nəyinsə düzgün işləmədiyini görə bilərsiniz. Əlbəttə ki, "pis" yükləmə vəziyyətinin olmaması yaxşıdır. **Lakin, proqresin olmaması üçün heç bir göstəricinin olmaması lap pisdir!** "Next" düyməsini tıkladıqda heç nəyin baş verməməsi applikasiyanın sınması hissini verir.

`useTransition()` çağırışı iki dəyər qaytarır: `startTransition` və `isPending`.

```js
  const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });
```

State yeniliklərini əhatə etmək üçün artıq `startTransition` funksiyasından istifadə etdik. İndi, `isPending` dəyərindən də istifadə edəcəyik. Bizim **keçidin bitməsini gözlədiyimizi** bilməmiz üçün React bizə bu bolin dəyərini qaytarır. Bu dəyərdən istifadə edərək nəyinsə baş verdiyini göstərəcəyik:

```js{4,14}
return (
  <>
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          const nextUserId = getNextId(resource.userId);
          setResource(fetchProfileData(nextUserId));
        });
      }}
    >
      Sonrakı
    </button>
    {isPending ? " Yüklənir..." : null}
    <ProfilePage resource={resource} />
  </>
);
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/jovial-lalande-26yep)**

İndi daha yaxşı oldu! "Sonrakı" düyməsini tıkladıqda düymənin bir neçə dəfə tıklanmaması üçün bu düyməni deaktivasiya edirik. Yeni "Yüklənir..." yazısı ilə də istifadəçiyə applikasiyanın donmadığını bildiririk.

### Dəyişiklikləri Nəzərdən Keçirmək {#reviewing-the-changes}

Gəlin, [orijinal nümunədən](https://codesandbox.io/s/infallible-feather-xjtbu) buraya kimi hansı dəyişikliklərin edildiyini nəzərdən keçirək:

```js{3-5,9,11,14,19}
function App() {
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000
  });
  return (
    <>
      <button
        disabled={isPending}
        onClick={() => {
          startTransition(() => {
            const nextUserId = getNextId(resource.userId);
            setResource(fetchProfileData(nextUserId));
          });
        }}
      >
        Sonrakı
      </button>
      {isPending ? " Yüklənir..." : null}
      <ProfilePage resource={resource} />
    </>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/jovial-lalande-26yep)**

Bu keçidi əlavə etmək üçün yalnız yeddi sətir kod əlavə etdik:

* `useTransition` Hookunu idxal edərək state-i yeniləyən kodda işlətdik.
* `{timeoutMs: 3000}` obyektini göndərərək React-ə cari ekranda ən çox üç saniyə gözləməsini bildirdik.
* State yeniliklərini `startTransition` ilə əhatə edərək React-ə bu yeniliyi gecikdirməyin problem olmadığını bildirdik.
* `isPending`-dən istifadə edəcərək state keçidinin proqresdə bildirdik və düyməni deaktivasiya etdik.

Nəticədə, "Sonrakı" düyməni tıkladıqda "istənilməz" yükləmə vəziyyətinə dərhal keçid edilmir. Əvəzinə, cari ekranda qalaraq proqres bu səhifədə göstərilir.

### Yeniliklər Harada Baş Verir? {#where-does-the-update-happen}

Bunun tətbiqi heç də çətin deyildi. Lakin, bunun necə işləmədiyini fikirləşdikdə biraz çaşdırıcı ola bilər. State-i təyin etdikdə nəticəni niyə dərhal görmürük? Sonrakı `<ProfilePage>` *harada* render olunur?

Aydındır ki, `<ProfilePage>`-in hər iki "versiyası" eyni zamanda mövcuddur. Əvvəlki səhifəni gördüyümüzdən və hətta burada proqres göstəricisi göstərdiyimizdən bu səhifənin mövcud olduğunu bilirik. Yeni versiyanı gözlədiyimizdən bu veresiyanın *haradasa* olduğunu bilirik!

**Eyni komponentin hər iki versiyası eyni zamanda necə mövcud ola bilər?**

Bu Konkurrent Modun əsasıdır. Biz, [əvvəlki bölmədə dediyimiz kimi](/docs/concurrent-mode-intro.html#intentional-loading-sequences) bu, React-in state yeniliyinin fərqli "budaqda" işləməsinə bənzəyir. Bunu fərqli formada konseptuallaşdırmaq üçün `startTransition` ilə əhatə olunmuş state yeniliyinin *"fərqli dünyada"* (elmi fantastika filmlərində olduğu kimi) render edildiyini fikirləşin. Biz, bu dünyanı birbaşa "görə" bilmirik, amma bu dünyada nəyinsə baş verdiyinin siqnalını (`isPending`) ala bilirik. Yenilik hazır olduqda "dünyalar" birləşir və biz nəticəni ekranda görürük!

Bu [nümunə](https://codesandbox.io/s/jovial-lalande-26yep) ilə oynayıb bunun baş verdiyini təsəvvür edin.

Əlbəttə ki, kompyuterinizdə bütün proqramların eyni zamanda icra olunmasının illuziya olduğu kimi ağacın hər iki versiyasının *eyni zamanda* render edilməsi də illuziyadır. Əməliyyat sistemi fərqli applikasiyalar arasında çox tez keçidlər edir. Eyni formada, React də ekranda gördüyünüz ağac ilə "hazırlanan" sonrakı ağac arasında keçidlər edir.

`useTransition` kimi API ilə bu mexanizmin necə tətbiq olunduğu haqqında fikirləşmək əvəzinə istənilən istifadəçi təcübəsinə fokuslana bilərsiniz. Amma yenə də, `startTransition` ilə əhatə olunan yeniliklərin digər "budaq" və ya "dünyada" olduğunu fikirləşmək faydalı ola bilər.

### Keçidlər Hər Yerdədir {#transitions-are-everywhere}

[Suspense sənədində](/docs/concurrent-mode-suspense.html) öyrəndiyimiz kimi gözlənilən məlumatı hazır olmayan istənilən komponent "dayandırıla" bilər. Biz, ağacın fərqli yerlərində `<Suspense>` sərhədləri əlavə edərək bunu dəstəkləyə bilərik. Lakin, bu həmişə bəs olmaya bilər.

Gəlin, bir profayl olan [Suspense nümunəsinə](https://codesandbox.io/s/frosty-hermann-bztrp) qayıdaq. İndi, bu nümunədə məlumat bir dəfə yüklənir. Server yeniliklərini yoxlamaq üçün "Yenidən Yüklə" düyməsi əlavə edəcəyik.

İlk cəhdimiz belə ola bilər:

```js{6-8,13-15}
const initialResource = fetchUserAndPosts();

function ProfilePage() {
  const [resource, setResource] = useState(initialResource);

  function handleRefreshClick() {
    setResource(fetchUserAndPosts());
  }

  return (
    <Suspense fallback={<h1>Profayl yüklənir...</h1>}>
      <ProfileDetails resource={resource} />
      <button onClick={handleRefreshClick}>
        Yenidən Yüklə
      </button>
      <Suspense fallback={<h1>Yazılar yüklənir...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/boring-shadow-100tf)**

Bu nüunədə, biz məlumat yükləməsini yükləmə zamanı *və* "Yenidən Yüklə" tıklandığı zaman başladırıq. Aşağıda olan Komponentlər yeni məlumatı oxuya bilmək üçün `fetchUserAndPosts()` funksiyasının nəticəsini state-də saxlayırıq.

[Bu nümunədə](https://codesandbox.io/s/boring-shadow-100tf) "Yenidən Yüklə" düyməsinin işlədiyini görürük. `<ProfileDetails>` və `<ProfileTimeline>` komponentləri yeni məlumatı təmsil edən yeni `resource` propunu qəbul edir və nəticə olmadığı zaman "dayandırılırlar" (və fallback görünür). Cavab yükləndiyi zaman yenilənən yazıları görürük (saxta API bu nəticələri 3 saniyədən bir əlavə edir).

Lakin, istifadəçi təcrübəsi çox pisdir. Biz səhifəni gəzdiyimiz zaman bu səhifə yükləmə vəziyyətinə dəyişdi (elə bilki bu səhifə ilə interaksiya edirdik). Bu çaşdırıcıdır. **Əvvəki variantlarda olduğu kimi istənilməz yükləmə vəziyyətini görməmək üçün biz state yeniliyini keçid ilə əhatə edəcəyik:**

```js{2-5,9-11,21}
function ProfilePage() {
  const [startTransition, isPending] = useTransition({
    // Fallback-dən əvvəl 10 saniyə gözlə
    timeoutMs: 10000
  });
  const [resource, setResource] = useState(initialResource);

  function handleRefreshClick() {
    startTransition(() => {
      setResource(fetchProfileData());
    });
  }

  return (
    <Suspense fallback={<h1>Profayl yüklənir...</h1>}>
      <ProfileDetails resource={resource} />
      <button
        onClick={handleRefreshClick}
        disabled={isPending}
      >
        {isPending ? "Yenidən yüklənir..." : "Yenidən Yüklə"}
      </button>
      <Suspense fallback={<h1>Yazılar yüklənir...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/sleepy-field-mohzb)**

Bu daha yaxşı oldu! "Yenidən Yüklə" düyməsi tıxlandıqda biz səhifədən ayrılmırıq. Nəyinsə yükləndiyini "sətrdaxili" görürük. Məlumat hazır olduqda isə məlumatları göstəririk.

### Keçidləri Dizayn Sisteminə Əlavə Etmək {#baking-transitions-into-the-design-system}

İndi, `useTransition`-a ehtiyacın *çox* olduğunu görə bilərsiniz. İstifadəçinin interaksiya etdiyi elementi təsadüfən gizlətməmək üçün komponenti dayandıra bilən hər hansı bir düymə və interaksiyanı `useTransition` ilə əhatə etmək lazımdır.

Bu, komponentlər arasında çoxlu təkrarlanan koda səbəb ola bilər. Buna görə **biz `useTransition` Hookunu applikasiyanızın *dizayn sistemi* komponentinə əlavə etməyi tövsiyyə edirik**. Məsələn, biz keçid məntiqini `<Button>` komponentinə ixrac edə bilərik:

```js{7-9,20,24}
function Button({ children, onClick }) {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 10000
  });

  function handleClick() {
    startTransition(() => {
      onClick();
    });
  }

  const spinner = (
    // ...
  );

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isPending}
      >
        {children}
      </button>
      {isPending ? spinner : null}
    </>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/modest-ritchie-iufrh)**

*Hansı* state-in yeniləndiyi düyməni maraqlandırmır. Burada `onClick` hadisə işləyicisində baş verə bilən *istənilən* state yenilikləri keçid ilə əhatə olunur. `<Button>` düyməsinin keçidi quraşdırdığından `<ProfilePage>` komponentində bu keçidləri tətbiq etmək lazım deyil:

```js{4-6,11-13}
function ProfilePage() {
  const [resource, setResource] = useState(initialResource);

  function handleRefreshClick() {
    setResource(fetchProfileData());
  }

  return (
    <Suspense fallback={<h1>Profayl yüklənir...</h1>}>
      <ProfileDetails resource={resource} />
      <Button onClick={handleRefreshClick}>
        Yenidən yüklə
      </Button>
      <Suspense fallback={<h1>Yazılar yüklənir...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/modest-ritchie-iufrh)**

Düymə tıklandıqda keçid başlanır və daxilində `props.onClick()` çağrılır. Bu callback `<ProfilePage>` komponentində `handleRefreshClick` funksiyasını çağırır. Biz, yeni məlumatı yükləməyə başlayırıq, amma keçidin daxilində olduğumuzdan və `useTransition`-a göndərilən 10 saniyə bitmədiyindən fallback göstərilmir. Keçidin proqresdə olduğundan düymədə sətrdaxili yüklənmə göstəricisi göstərilir.

Konkurrent Modunun komponentlərin izolyasiyasını və modulyarlığını itirmədən yaxşı istifadəçi təcrübəsi yaratdığını görə bilərik. React keçidləri koordinasiya edir.

## Üç Addım {#the-three-steps}

Biz yeniliyin keçdiyi vizual vəziyyətlərdən danışdıq. Bu bölmədə bu vəziyyətlərə ad verib aralarındakı irəliləmələrdən danışacağıq.

<br>

<img src="../images/docs/cm-steps-simple.png" alt="Üç addım" />

Ən sonda **Tam** (Complete) vəziyyətinə çatırıq. Biz, ən axırda bu vəziyyətə çatmaq istəyirik. Bu, məlumatın artıq yüklənmədiyi və sonrakı ekranın tam render olunması halını təmsil edir.

Lakin, ekran Tam olmamışdan öncə bizə bəzi məlumat və ya kodları yükləmək lazım ola bilər. Sonrakı ekranda olduqda amma bəzi hissələr tam yüklənmədikdə biz bu vəziyyəti **Skelet** (Skeleton) adlandırırıq.

Skelet vəziyyətinə çatmaq üçün iki əsas yol var. Biz bu iki yol arasında olan fərqləri nümunələr ilə göstərəcəyik.

### Sadə: Qayıtmış → Skelet → Tam {#default-receded-skeleton-complete}

[Bu nümunədə](https://codesandbox.io/s/prod-grass-g1lh5) "Open Profile" düyməsini tıklayın. Siz bir neçə vizual vəziyyətləri bir-bir görəcəksiniz:

* **Qayıtmış** (Receded): Çox qısa anlıq `<h1>Loading the app...</h1>` görünüşünü görəcəksiniz.
* **Skelet:** `<ProfilePage>` komponentini `<h2>Loading posts...</h2>` görünüşü ilə görəcəksiniz.
* **Tam:** Fallback-i olmayan `<ProfilePage>` komponentini görəcəksiniz. Burada bütün məlumatlar yüklənir.

Qayıtmış və Skelet vəziyyətlərini necə ayırmaq olar? **̇Qayıtmış** vəziyyətində istifadəçinin "bir addım arxaya" getdiyi hiss olunur. **Skelet** vəziyyətində isə daha çox kontent göstərmək üçün istifadəçinin  "bir addım irəliyə" getdiyi hiss olunur.

Bu nümunədə biz `<HomePage>` komponentindən başlayırıq:

```js
<Suspense fallback={...}>
  {/* əvvəlki ekran */}
  <HomePage />
</Suspense>
```

Düyməni tıkladıqdan sonra React sonrakı ekranı render etməyə başlayacaq:

```js
<Suspense fallback={...}>
  {/* sonrakı ekran */}
  <ProfilePage>
    <ProfileDetails />
    <Suspense fallback={...}>
      <ProfileTimeline />
    </Suspense>
  </ProfilePage>
</Suspense>
```

Həm `<ProfileDetails>`, həm də `<ProfileTimeline>` komponentlərinin render olunması üçün məlumat lazımdır. Bu səbəbdən bu komponentlər dayandırılırlar:

```js{4,6}
<Suspense fallback={...}>
  {/* sonrakı ekran */}
  <ProfilePage>
    <ProfileDetails /> {/* dayandırılır! */}
    <Suspense fallback={<h2>Yazılar yüklənir...</h2>}>
      <ProfileTimeline /> {/* dayandırılır! */}
    </Suspense>
  </ProfilePage>
</Suspense>
```

Komponent dayandırıldıqdan sonra React, ən yaxın fallback-i göstərəcək. Amma, `<ProfileDetails>` komponentinə ən yaxın fallback ən yuxarı səviyyədədir:

```js{2,3,7}
<Suspense fallback={
  // <ProfileDetails> komponentinə görə burada fallback görəcəyik
  <h1>Applikasiya yüklənir...</h1>
}>
  {/* sonrakı ekran */}
  <ProfilePage>
    <ProfileDetails /> {/* dayandırılır! */}
    <Suspense fallback={...}>
      <ProfileTimeline />
    </Suspense>
  </ProfilePage>
</Suspense>
```

Bu səbəbdən düyməni tıkladıqda "bir addım geriyə getdiyimizi" hiss edirik. Əvvəl faydalı kontent (`<HomePage />`) göstərən `<Suspense>` sərhədi fallback-ə (`<h1>Applikasiya yüklənir...</h1>`) "qayıtmağa" məcbur oldu. Biz addımı **Qayıtmış** vəziyyət adlandırırıq.

Məlumat yükləndikcə React render etməni təkrar edəcək və `<ProfileDetails>` komponenti uğurla render ediləcək. İndi, biz **Skelet** vəziyyətinə çatırıq. Biz əskik hissəli səhifəni görürük:

```js{6,7,9}
<Suspense fallback={...}>
  {/* sonrakı ekran */}
  <ProfilePage>
    <ProfileDetails />
    <Suspense fallback={
      // <ProfileTimeline> komponentinə görə bu fallback-i görürük
      <h2>Yazılar yüklənir...</h2>
    }>
      <ProfileTimeline /> {/* dayandırılır! */}
    </Suspense>
  </ProfilePage>
</Suspense>
```

Ən axırda, hər iki komponent yüklənir və biz **Tam** vəziyyətinə çatırıq.

Bu (Qayıtmış → Skelet → Tam) standart ssenaridir. Lakin, Qayıtmış vəziyyətin mövcud məlumatları "gizlətdiyindən" bu vəziyyət xoş deyil. Bu səbəbdən React bizə `useTransition` Hookundan istifadə edərək fərqli ardıcıllıqdan (**Yükləmə** → Skelet → Tam) istifadə etməyə imkan yaradır.

### Üstünlük Verilən: Yükləmə → Skelet → Tam {#preferred-pending-skeleton-complete}

`useTransition` işlətdikdə biz köhnə səhifədə "qalıb" proqres göstərici göstərə bilirik. Biz bu addımı **Yükləmə** (Pending) vəziyyəti adlandırırıq. Mövcud kontentin itmədiyindən və səhifənin interaktiv qaldığından bu vəziyyət Qayıtmış vəziyyətindən daha yaxşıdır.

Bu vəziyyətlərin fərqini görmək üçün aşağıdakı nümunələri müqayisə edin:

* Sadə: [Qayıtmış → Skelet → Tam](https://codesandbox.io/s/prod-grass-g1lh5)
* **Üstünlük Verilən: [Yükləmə → Skelet → Tam](https://codesandbox.io/s/focused-snow-xbkvl)**

Bu iki nümunə arasında olan əsas fərq ilk nümunədə sadə `<button>` elementlərinin, ikinci nümunədə isə `useTransition` işlədən `<Button>` komponentlərinin işlədilməsidir.

### Lazy Xüsusiyyətləri `<Suspense>` ilə Əhatə Edin {#wrap-lazy-features-in-suspense}

[Bu nümunəni](https://codesandbox.io/s/nameless-butterfly-fkw5q) açın. Düyməni tıkladıqda, irəli getmədən öncə Yüklənə vəziyyətini görəcəksiniz. Bu keçid yaxşı istifadəçi təcrübəsi yaradır.

İndi, profayl səhifəsinə istifadəçi haqqında maraqlı faktların siyahısı xüsusiyyətini əlavə edəcəyik:

```js{8,13-25}
function ProfilePage({ resource }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h2>Yazılar yüklənir...</h2>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <ProfileTrivia resource={resource} />
    </>
  );
}

function ProfileTrivia({ resource }) {
  const trivia = resource.trivia.read();
  return (
    <>
      <h2>Maraqlı Faktlar</h2>
      <ul>
        {trivia.map(fact => (
          <li key={fact.id}>{fact.text}</li>
        ))}
      </ul>
    </>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/focused-mountain-uhkzg)**

İndi, "Open Profile" düyməsini tıkladıqda nəyinsə düzgün işləmədini görəcəksiniz. Keçidin tamamlanması üçün yeddi saniyə gözləmək lazımdır! Bunun səbəbi bizim trivia API-ımızın yavaş işləməsidir. Fərz edək ki, API-ı tezləşdirmək mümkün deyil. Bu məhdudiyyət ilə istifadəçi təcrübəsini necə yaxşılaşdırmaq olar?

Yükləmə vəziyyətində çox gözləmək istəmədikdə ilk intuisiya kimi `useTransition`-da `timeoutMs` parametrini kiçik dəyərə (məsələn, `3000`) dəyişməkdir. Bunu [bu nümunədə](https://codesandbox.io/s/practical-kowalevski-kpjg4) yoxlaya bilərsiniz. Bu dəyişiklik ilə uzanan Yükləmə vəziyyətindən qaçmaq mümkündür, amma bizdə hələdə göstərə biləcəyimiz faydalı məlumat yoxdur!

Bunu həll etməyin daha sadə yolu var. **Keçidi qısaltmaq əvəzinə yavaş komponentini** `<Suspense>` ilə əhatə edərək **keçiddən "ayıra" bilərik**:

```js{8,10}
function ProfilePage({ resource }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h2>Yazıları yüklənir...</h2>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense fallback={<h2>Maraqlı Faktlar yüklənir...</h2>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/condescending-shape-s6694)**

Bu bizə maraqlı fikir göstərir. React, Skelet vəziyyətinə getməyə üstünlük verir. Hər yerdə uzun vaxtlı keçidlər işlətsək belə, React, Qayıtmış vəziyyətində olmamaq üçün Yükləmə vəziyyətində lazım olandan çox qalmayacaq.

**Əgər xüsusiyyət sonrakı ekranın vacib hissəsini təşkil etmirsə, bu komponenti lazy yükləmək üçün `<Suspense>` ilə əhatə edin.** Bu formada, biz kontentin qalanını ən tez zamanda göstərə bilərik. Əksinə, əgər ekranı komponentsiz göstərməyin *mənası yoxdursa* (məsələn, nümunəmizdə olan `<ProfileDetails>` komponenti kimi), bu komponenti `<Suspense>` ilə əhatə *etməyin*. Keçidlər bu komponentin hazır olmasını "gözləyəcəklər."

### Suspense-lərin Göstərilməsi “Qatarı” {#suspense-reveal-train}

Bəzən, sonrakı ekranda olduğumuz zaman fərqli `<Suspense>` sərhədlərini "açan" məlumatlar çox tez aralıqla gəlirlər. Məsələn, iki fərqli sorğu cavabı 1000ms və 1050ms-dan sonra hazır ola bilərlər. Bir saniyə gözlədikdən sonra əlavə 50ms gözləmək heç nəyi dəyişməyəcək. Bu səbəbdən, React, `<Suspense>` sərhədlərini vaxtaşırı gələn "qatar" kimi planlaşdıraraq göstərir. Bu, şablon çirklənmələrini və istifadəçiyə təqdim olunan vizual dəyişiklikləri azaldır.

Siz, bunun nümunəsinə [bu linkdən](https://codesandbox.io/s/admiring-mendeleev-y54mk) baxa bilərsiniz. "Yazılar" və "maraqlı faktların" cavablarının gəlməsi arasında 100ms fərq var. React, bu cavabları bitişdirərək Suspense sərhədlərini birilikdə "göstərir". 

### Yükləmə Göstəricisini Gecikdirmək {#delaying-a-pending-indicator}

`Button` komponenti tıklanan kimi Yükləmə vəziyyətinin göstəricisi dərhal göstəriləcək:

```js{2,13}
function Button({ children, onClick }) {
  const [startTransition, isPending] = useTransition({
    timeoutMs: 10000
  });

  // ...

  return (
    <>
      <button onClick={handleClick} disabled={isPending}>
        {children}
      </button>
      {isPending ? spinner : null}
    </>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/floral-thunder-iy826)**

Bu, bəzi işlərin başladığını istifadəçiyə bildirir. Lakin, əgər keçik qısadırsa (məsələn, 500ms-dən tez) bu yayındırıcı ola bilər və keçidin *yavaş* olduğunu bildirə bilər.

Bunu həll etməyin yollarından biri *yükləmə göstəricisini* gec göstərməkdir:

```css
.DelayedSpinner {
  animation: 0s linear 0.5s forwards makeVisible;
  visibility: hidden;
}

@keyframes makeVisible {
  to {
    visibility: visible;
  }
}
```

```js{2-4,10}
const spinner = (
  <span className="DelayedSpinner">
    {/* ... */}
  </span>
);

return (
  <>
    <button onClick={handleClick}>{children}</button>
    {isPending ? spinner : null}
  </>
);
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/gallant-spence-l6wbk)**

Bu dəyişiklik ilə Yükləmə vəziyyətində olmamıza baxmayaraq 500ms keçənə istifadəçiyə heç bir bildiriş etmirik. API cavabları gec gəldikdə bunun xeyiri olmaya bilər. Lakin, API tez olduqda [əvvəlki](https://codesandbox.io/s/thirsty-liskov-1ygph) və [sonrakı](https://codesandbox.io/s/hardcore-http-s18xr) nəticələri müqayisə edin. Kodları dəyişmədiyimizə baxmayaraq "çox tez" yükləmə vəziyyətini gizlədərək diqqəti gecikdirməyə yönləndirməyib hiss olunan performansı artırırıq.

### Xülasə {#recap}

Öyrəndiyimiz əsas məqamlar:

* Standart formada yükləmə ardıcıllığı Qayıtmış → Skelet → Tam formasındadır.
* Qayıtmış vəziyyət mövcud kontenti gizlətdiyindən yaxşı deyil.
* `useTransition`-dan istifadə edərək Yükləmə vəziyyətini göstərə bilərik. Bu, sonrakı ekran hazır olana kimi bizi əvvəlki ekranda saxlayacaq.
* Əgər hər hansı bir komponentin keçidi yavaşlatmasını istəmiriksə, bu komponenti `<Suspense>` sərhədi ilə əhatə edə bilərik.
* Hər komponentdə `useTransition` çağırmağın əvəzinə bu Hooku dizayn sisteminə əlavə edə bilərik.

## Other Patterns {#other-patterns}

Transitions are probably the most common Concurrent Mode pattern you'll encounter, but there are a few more patterns you might find useful.

### Splitting High and Low Priority State {#splitting-high-and-low-priority-state}

When you design React components, it is usually best to find the "minimal representation" of state. For example, instead of keeping `firstName`, `lastName`, and `fullName` in state, it's usually better keep only `firstName` and `lastName`, and then calculate `fullName` during rendering. This lets us avoid mistakes where we update one state but forget the other state.

However, in Concurrent Mode there are cases where you might *want* to "duplicate" some data in different state variables. Consider this tiny translation app:

```js
const initialQuery = "Hello, world";
const initialResource = fetchTranslation(initialQuery);

function App() {
  const [query, setQuery] = useState(initialQuery);
  const [resource, setResource] = useState(initialResource);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    setResource(fetchTranslation(value));
  }

  return (
    <>
      <input
        value={query}
        onChange={handleChange}
      />
      <Suspense fallback={<p>Loading...</p>}>
        <Translation resource={resource} />
      </Suspense>
    </>
  );
}

function Translation({ resource }) {
  return (
    <p>
      <b>{resource.read()}</b>
    </p>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/brave-villani-ypxvf)**

Notice how when you type into the input, the `<Translation>` component suspends, and we see the `<p>Loading...</p>` fallback until we get fresh results. This is not ideal. It would be better if we could see the *previous* translation for a bit while we're fetching the next one.

In fact, if we open the console, we'll see a warning:

```
Warning: App triggered a user-blocking update that suspended.

The fix is to split the update into multiple parts: a user-blocking update to provide immediate feedback, and another update that triggers the bulk of the changes.

Refer to the documentation for useTransition to learn how to implement this pattern.
```

As we mentioned earlier, if some state update causes a component to suspend, that state update should be wrapped in a transition. Let's add `useTransition` to our component:

```js{4-6,10,13}
function App() {
  const [query, setQuery] = useState(initialQuery);
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition({
    timeoutMs: 5000
  });

  function handleChange(e) {
    const value = e.target.value;
    startTransition(() => {
      setQuery(value);
      setResource(fetchTranslation(value));
    });
  }

  // ...

}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/zen-keldysh-rifos)**

Try typing into the input now. Something's wrong! The input is updating very slowly.

We've fixed the first problem (suspending outside of a transition). But now because of the transition, our state doesn't update immediately, and it can't "drive" a controlled input!

The answer to this problem **is to split the state in two parts:** a "high priority" part that updates immediately, and a "low priority" part that may wait for a transition.

In our example, we already have two state variables. The input text is in `query`, and we read the translation from `resource`. We want changes to the `query` state to happen immediately, but changes to the `resource` (i.e. fetching a new translation) should trigger a transition.

So the correct fix is to put `setQuery` (which doesn't suspend) *outside* the transition, but `setResource` (which will suspend) *inside* of it.

```js{4,5}
function handleChange(e) {
  const value = e.target.value;
  
  // Outside the transition (urgent)
  setQuery(value);

  startTransition(() => {
    // Inside the transition (may be delayed)
    setResource(fetchTranslation(value));
  });
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/lively-smoke-fdf93)**

With this change, it works as expected. We can type into the input immediately, and the translation later "catches up" to what we have typed.

### Deferring a Value {#deferring-a-value}

By default, React always renders a consistent UI. Consider code like this:

```js
<>
  <ProfileDetails user={user} />
  <ProfileTimeline user={user} />
</>
```

React guarantees that whenever we look at these components on the screen, they will reflect data from the same `user`. If a different `user` is passed down because of a state update, you would see them changing together. You can't ever record a screen and find a frame where they would show values from different `user`s. (If you ever run into a case like this, file a bug!)

This makes sense in the vast majority of situations. Inconsistent UI is confusing and can mislead users. (For example, it would be terrible if a messenger's Send button and the conversation picker pane "disagreed" about which thread is currently selected.)

However, sometimes it might be helpful to intentionally introduce an inconsistency. We could do it manually by "splitting" the state like above, but React also offers a built-in Hook for this:

```js
import { useDeferredValue } from 'react';

const deferredValue = useDeferredValue(value, {
  timeoutMs: 5000
});
```

To demonstrate this feature, we'll use [the profile switcher example](https://codesandbox.io/s/musing-ramanujan-bgw2o). Click the "Next" button and notice how it takes 1 second to do a transition.

Let's say that fetching the user details is very fast and only takes 300 milliseconds. Currently, we're waiting a whole second because we need both user details and posts to display a consistent profile page. But what if we want to show the details faster?

If we're willing to sacrifice consistency, we could **pass potentially stale data to the components that delay our transition**. That's what `useDeferredValue()` lets us do:

```js{2-4,10,11,21}
function ProfilePage({ resource }) {
  const deferredResource = useDeferredValue(resource, {
    timeoutMs: 1000
  });
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline
          resource={deferredResource}
          isStale={deferredResource !== resource}
        />
      </Suspense>
    </Suspense>
  );
}

function ProfileTimeline({ isStale, resource }) {
  const posts = resource.posts.read();
  return (
    <ul style={{ opacity: isStale ? 0.7 : 1 }}>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/vigorous-keller-3ed2b)**

The tradeoff we're making here is that `<ProfileTimeline>` will be inconsistent with other components and potentially show an older item. Click "Next" a few times, and you'll notice it. But thanks to that, we were able to cut down the transition time from 1000ms to 300ms.

Whether or not it's an appropriate tradeoff depends on the situation. But it's a handy tool, especially when the content doesn't change noticeably between items, and the user might not even realize they were looking at a stale version for a second.

It's worth noting that `useDeferredValue` is not *only* useful for data fetching. It also helps when an expensive component tree causes an interaction (e.g. typing in an input) to be sluggish. Just like we can "defer" a value that takes too long to fetch (and show its old value despite others components updating), we can do this with trees that take too long to render.

For example, consider a filterable list like this:

```js
function App() {
  const [text, setText] = useState("hello");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="App">
      <label>
        Type into the input:{" "}
        <input value={text} onChange={handleChange} />
      </label>
      ...
      <MySlowList text={text} />
    </div>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/pensive-shirley-wkp46)**

In this example, **every item in `<MySlowList>` has an artificial slowdown -- each of them blocks the thread for a few milliseconds**. We'd never do this in a real app, but this helps us simulate what can happen in a deep component tree with no single obvious place to optimize.

We can see how typing in the input causes stutter. Now let's add `useDeferredValue`:

```js{3-5,18}
function App() {
  const [text, setText] = useState("hello");
  const deferredText = useDeferredValue(text, {
    timeoutMs: 5000
  });

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="App">
      <label>
        Type into the input:{" "}
        <input value={text} onChange={handleChange} />
      </label>
      ...
      <MySlowList text={deferredText} />
    </div>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/infallible-dewdney-9fkv9)**

Now typing has a lot less stutter -- although we pay for this by showing the results with a lag.

How is this different from debouncing? Our example has a fixed artificial delay (3ms for every one of 80 items), so there is always a delay, no matter how fast our computer is. However, the `useDeferredValue` value only "lags behind" if the rendering takes a while. There is no minimal lag imposed by React. With a more realistic workload, you can expect the lag to adjust to the user’s device. On fast machines, the lag would be smaller or non-existent, and on slow machines, it would be more noticeable. In both cases, the app would remain responsive. That’s the advantage of this mechanism over debouncing or throttling, which always impose a minimal delay and can't avoid blocking the thread while rendering.

Even though there is an improvement in responsiveness, this example isn't as compelling yet because Concurrent Mode is missing some crucial optimizations for this use case. Still, it is interesting to see that features like `useDeferredValue` (or `useTransition`) are useful regardless of whether we're waiting for network or for computational work to finish.

### SuspenseList {#suspenselist}

`<SuspenseList>` is the last pattern that's related to orchestrating loading states.

Consider this example:

```js{5-10}
function ProfilePage({ resource }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h2>Loading posts...</h2>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense fallback={<h2>Loading fun facts...</h2>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/proud-tree-exg5t)**

The API call duration in this example is randomized. If you keep refreshing it, you will notice that sometimes the posts arrive first, and sometimes the "fun facts" arrive first.

This presents a problem. If the response for fun facts arrives first, we'll see the fun facts below the `<h2>Loading posts...</h2>` fallback for posts. We might start reading them, but then the *posts* response will come back, and shift all the facts down. This is jarring.

One way we could fix it is by putting them both in a single boundary:

```js
<Suspense fallback={<h2>Loading posts and fun facts...</h2>}>
  <ProfileTimeline resource={resource} />
  <ProfileTrivia resource={resource} />
</Suspense>
```

**[Try it on CodeSandbox](https://codesandbox.io/s/currying-violet-5jsiy)**

The problem with this is that now we *always* wait for both of them to be fetched. However, if it's the *posts* that came back first, there's no reason to delay showing them. When fun facts load later, they won't shift the layout because they're already below the posts.

Other approaches to this, such as composing Promises in a special way, are increasingly difficult to pull off when the loading states are located in different components down the tree.

To solve this, we will import `SuspenseList`:

```js
import { SuspenseList } from 'react';
```

`<SuspenseList>` coordinates the "reveal order" of the closest `<Suspense>` nodes below it:

```js{3,11}
function ProfilePage({ resource }) {
  return (
    <SuspenseList revealOrder="forwards">
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h2>Loading posts...</h2>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense fallback={<h2>Loading fun facts...</h2>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </SuspenseList>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/black-wind-byilt)**

The `revealOrder="forwards"` option means that the closest `<Suspense>` nodes inside this list **will only "reveal" their content in the order they appear in the tree -- even if the data for them arrives in a different order**. `<SuspenseList>` has other interesting modes: try changing `"forwards"` to `"backwards"` or `"together"` and see what happens.

You can control how many loading states are visible at once with the `tail` prop. If we specify `tail="collapsed"`, we'll see *at most one* fallback at the time. You can play with it [here](https://codesandbox.io/s/adoring-almeida-1zzjh).

Keep in mind that `<SuspenseList>` is composable, like anything in React. For example, you can create a grid by putting several `<SuspenseList>` rows inside a `<SuspenseList>` table.

## Next Steps {#next-steps}

Concurrent Mode offers a powerful UI programming model and a set of new composable primitives to help you orchestrate delightful user experiences.

It's a result of several years of research and development, but it's not finished. In the section on [adopting Concurrent Mode](/docs/concurrent-mode-adoption.html), we'll describe how you can try it and what you can expect.

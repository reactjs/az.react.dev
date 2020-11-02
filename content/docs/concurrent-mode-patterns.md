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

Adətən, state-i yenilədikdə dəyişiklikləri ekranda dərhal görmək istəyirik. Applikasiyanın istifadəçi daxil etməsini tez cavablandırmasını istədiyimizdən bu fikir məntiqli gəlir. Lakin, bəzi ssenarilərdə **yeniliyin ekranda görünməsini gecikdirmək istəyə bilərik**.

Məsələn, bir səhifədən digər səhifəyə keçid etdiyimiz zaman yeni səhifəyə aid olan heç bir kod və ya məlumat yüklənmədiyi halda yükləmə göstəricisi ilə boş səhifənin görünməsi əsəbləşdirici ola bilər. Bu səbəbdən əvvəlki ekranda daha uzun qalmaq istəyə bilərik. Tarix boyu bu həllin React-də tətbiqi çətin olub. Lakin, bunu həll etmək üçün Konkurrent Rejiminə yeni alətlər əlavə olunub.

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
  - [Yüksək və Aşağı Priooritetli State-ləri Parçalamaq](#splitting-high-and-low-priority-state)
  - [Dəyəri Gecikdirmək](#deferring-a-value)
  - [SuspenseList](#suspenselist)
- [Sonrakı Addımlar](#next-steps)

## Keçidlər {#transitions}

Gəlin [Məlumat Yüklənməsi üçün Suspense]((/docs/concurrent-mode-suspense.html)) səhifəsindəki [nümunəyə](https://codesandbox.io/s/infallible-feather-xjtbu) yenidən baxaq.

Aktiv profaylı dəyişmək üçün "Sonrakı" düyməsini tıkladıqda mövcud səhifənin məlumatları dərhal itir və biz bütün səhifə üçün yükləmə göstəricisini göstərilir. Biz bunu "istənilməz" yükləmə vəziyyəti adlandırırıq. **Yeni səhifəyə keçməmişdən öncə yükləmə göstəricisini göstərməyib bəzi kontentin yüklənməsini gözləmək daha yaxşı istifadəçi təcrübəsi yarada bilər.**

Bunu həll etmək üçün React-ə `useTransition()` adlı Hook əlavə etmişik.

Bu Hooku üç addım ilə işlətmək mümkündür.

İlk olaraq Konkurrent Rejimini işlətdiyimizi bilməliyik. Biz, [Konkurrent Rejiminə uyğunlaşma](/docs/concurrent-mode-adoption.html) haqqında sonrakı səhifələrdə danışacağıq, amma bu səhifədə bu xüsusiyyətin işləməsi üçün `ReactDOM.render()` əvəzinə `ReactDOM.createRoot()` işlətmək kifayət edir:

```js
const rootElement = document.getElementById("root");
// Konkurrent Rejimindən İstifadə Et
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

**[CodeSandbox-da sınayın](https://codesandbox.io/s/musing-driscoll-6nkie)**

"Sonrakı" düyməsini bir neçə dəfə tıklayın. Bunun fərqli işlədiyinə fikir verin. **Tıklama zamanı dərhal boş ekran görmək əvəzinə cari səhifəni görəcəksiniz.** Məlumat yükləndiyi zaman sonrakı səhifəyə keçid ediləcək.

API cavabı 5 saniyə çəkdikdə biz React-in gözləmədən əl çəkərək 3 saniyə sonra yeni səhifəyə keçdiyini [görəcəyik](https://codesandbox.io/s/relaxed-greider-suewh). Bunun səbəbi bizim `useTransition()` Hookuna `{timeoutMs: 3000}` obyektini göndərməmizdir. Məsələn, `{timeoutMs: 60000}` obyekti göndərsəydik React, bir dəqiqə gözləyəcəkdi.

### Yükləmə Göstəricini Əlavə Etmək {#adding-a-pending-indicator}

[Əvvəlki nümunədə](https://codesandbox.io/s/musing-driscoll-6nkie) nəyinsə düzgün işləmədiyini görə bilərsiniz. Əlbəttə ki, "pis" yükləmə vəziyyətinin olmaması yaxşıdır. **Lakin, proqresin olmaması üçün heç bir göstəricinin olmaması lap pisdir!** "Sonrakı" düyməsini tıkladıqda heç nəyin baş verməməsi applikasiyanın sınması hissini verir.

`useTransition()` çağırışı iki dəyər qaytarır: `startTransition` və `isPending`.

```js
  const [startTransition, isPending] = useTransition({ timeoutMs: 3000 });
```

State yeniliklərini əhatə etmək üçün artıq `startTransition` funksiyasından istifadə etdik. İndi, `isPending` dəyərindən də istifadə edəcəyik. Bizim **keçidin bitməsini gözlədiyimizi** bilməmiz üçün React bizə bu bulin dəyərini qaytarır. Bu dəyərdən istifadə edərək məlumatın yükləndiyini göstərəcəyik:

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

<<<<<<< HEAD
* `useTransition` Hookunu idxal edərək state-i yeniləyən komponentdə işlətdik.
* `{timeoutMs: 3000}` obyektini göndərərək React-ə cari ekranda ən çox üç saniyə gözləməsini bildirdik.
* State yeniliklərini `startTransition` ilə əhatə edərək React-ə bu yeniliyi gecikdirməyin problem olmadığını bildirdik.
* `isPending`-dən istifadə edəcərək state keçidinin proqresdə olduğunu bildirdik və düyməni deaktivasiya etdik.
=======
* We've imported the `useTransition` Hook and used it in the component that updates the state.
* We've passed `{timeoutMs: 3000}` to stay on the previous screen for at most 3 seconds.
* We've wrapped our state update into `startTransition` to tell React it's okay to delay it.
* We're using `isPending` to communicate the state transition progress to the user and to disable the button.
>>>>>>> 30baecf59de28a8cd3c91a2cd878e3822f864061

Nəticədə, "Sonrakı" düyməni tıkladıqda "istənilməz" yükləmə vəziyyətinə dərhal keçid edilmir. Əvəzinə, proqres cari ekranda qalaraq göstərilir.

### Yeniliklər Harada Baş Verir? {#where-does-the-update-happen}

Bunun tətbiqi heç də çətin deyildi. Lakin, bunun necə işlədiyini fikirləşdikdə biraz çaşdırıcı ola bilər. State-i təyin etdikdə nəticəni niyə dərhal görmürük? Sonrakı `<ProfilePage>` *harada* render olunur?

Aydındır ki, `<ProfilePage>`-in hər iki "versiyası" eyni zamanda mövcuddur. Əvvəlki səhifəni gördüyümüzdən və hətta burada proqres göstəricisi göstərdiyimizdən bu səhifənin mövcud olduğunu bilirik. Yeni versiyanı gözlədiyimizdən bu versiyanın *mövcud* olduğunu bilirik!

**Eyni komponentin hər iki versiyası eyni zamanda necə mövcud ola bilər?**

Bu Konkurrent Rejiminin əsasıdır. Biz, [əvvəlki bölmədə dediyimiz kimi](/docs/concurrent-mode-intro.html#intentional-loading-sequences) bu, React-in state yeniliyinin fərqli "budaqda" işləməsinə bənzəyir. Bunu fərqli formada konseptuallaşdırmaq üçün `startTransition` ilə əhatə olunmuş state yeniliyinin *"fərqli dünyada"* (elmi fantastika filmlərində olduğu kimi) render edildiyini fikirləşin. Biz, bu dünyanı birbaşa "görə" bilmirik, amma bu dünyada nəyinsə baş verdiyinin siqnalını (`isPending`) ala bilirik. Yenilik hazır olduqda "dünyalar" birləşir və biz nəticəni ekranda görürük!

Göstərilən [nümunə](https://codesandbox.io/s/jovial-lalande-26yep) ilə oynayıb bunun baş verdiyini təsəvvür edin.

Əlbəttə ki, kompyuterinizdə bütün proqramların eyni zamanda icra olunmasının illüziya olduğu kimi ağacın hər iki versiyasının *eyni zamanda* render edilməsi də illüziyadır. Əməliyyat sistemi fərqli applikasiyalar arasında çox tez keçidlər edir. Eyni formada, React də ekranda gördüyünüz ağac ilə "hazırlanan" sonrakı ağac arasında keçidlər edir.

`useTransition` kimi API ilə bu mexanizmin necə tətbiq olunduğu haqqında fikirləşmək əvəzinə istifadəçi təcübəsinə fokuslana bilərsiniz. Amma yenə də, `startTransition` ilə əhatə olunan yeniliklərin digər "budaq" və ya "dünyada" olduğunu fikirləşmək faydalı ola bilər.

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

Bu nümunədə, biz yükləmə zamanı *və* "Yenidən Yüklə" tıklandığı zaman məlumat yükləməsini başladırıq. Suspense-in altında olan komponentlərin yeni məlumatı oxuya bilmələri üçün `fetchUserAndPosts()` funksiyasının nəticəsini state-də saxlayırıq.

[Bu nümunədə](https://codesandbox.io/s/boring-shadow-100tf) "Yenidən Yüklə" düyməsinin işlədiyini görürük. `<ProfileDetails>` və `<ProfileTimeline>` komponentləri yeni məlumatı təmsil edən yeni `resource` propunu qəbul edir və nəticə olmadığı zaman "dayandırılırlar" (fallback göstərilir). Cavab yükləndiyi zaman yenilənən yazıları görürük (saxta API bu nəticələri 3 saniyədən bir əlavə edir).

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

Bu daha yaxşı oldu! İndi, "Yenidən Yüklə" düyməsi tıklandıqda səhifədən dəyişmir. Nəyinsə yükləndiyi "sətrdaxili" göstərilir. Yeni məlumatlar yalnız hazır olduqda göstərilir.

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

*Hansı* state-in yenilənməsi düymə komponentini maraqlandırmır. Burada `onClick` hadisə işləyicisində baş verə bilən *istənilən* state yenilikləri keçid ilə əhatə olunur. `<Button>` düyməsinda keçidin quraşdırıldığından `<ProfilePage>` komponentində bu keçidləri tətbiq etmək lazım deyil:

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

Düymə tıklandıqda keçid başlanır və daxilindən `props.onClick()` çağrılır. Bu callback, `<ProfilePage>` komponentində `handleRefreshClick` funksiyasını çağırır. Biz, yeni məlumatı yükləməyə başlayırıq, amma keçidin daxilində olduğumuzdan və `useTransition`-a göndərilən 10 saniyə bitmədiyindən fallback göstərilmir. Keçidin proqresdə olduğundan düymədə sətrdaxili yüklənmə göstəricisi göstərilir.

Konkurrent Rejiminin komponentlərin izolyasiyasını və modulyarlığını itirmədən yaxşı istifadəçi təcrübəsi yaratdığını görə bilərik. React keçidləri koordinasiya edir.

## Üç Addım {#the-three-steps}

Biz yeniliyin keçdiyi vizual vəziyyətlərdən danışdıq. Bu bölmədə bu vəziyyətlərə ad verib aralarındakı irəliləmələrdən danışacağıq.

<br>

<img src="../images/docs/cm-steps-simple.png" alt="Üç addım" />

Ən sonda **Tam** (Complete) vəziyyətinə çatırıq. Biz, ən axırda bu vəziyyətə çatmaq istəyirik. Bu, məlumatın artıq yükləndiyini və sonrakı ekranın tam render olunması halını təmsil edir.

Lakin, ekran Tam olmamışdan öncə bizə bəzi məlumat və ya kodları yükləmək lazım ola bilər. Biz, sonrakı ekranda olunması və məlumatların tam yüklənməməsi vəziyyətini **Skelet** (Skeleton) adlandırırıq.

Skelet vəziyyətinə çatmaq üçün iki əsas yol var. Biz bu iki yol arasında olan fərqləri nümunələr ilə göstərəcəyik.

### Sadə: Qayıtmış → Skelet → Tam {#default-receded-skeleton-complete}

[Bu nümunədə](https://codesandbox.io/s/prod-grass-g1lh5) "Open Profile" düyməsini tıklayın. Siz bir neçə vizual vəziyyətləri bir-bir görəcəksiniz:

* **Qayıtmış** (Receded): Çox qısa anlıq `<h1>Loading the app...</h1>` görünüşünü görəcəksiniz.
* **Skelet:** `<ProfilePage>` komponentini `<h2>Loading posts...</h2>` görünüşü ilə görəcəksiniz.
* **Tam:** Fallback-i olmayan `<ProfilePage>` komponentini görəcəksiniz. Burada bütün məlumatlar yüklənir.

Qayıtmış və Skelet vəziyyətlərini necə ayırmaq olar? **Qayıtmış** vəziyyətində istifadəçinin "bir addım arxaya" getdiyi hiss olunur. **Skelet** vəziyyətində isə daha çox kontent göstərmək üçün istifadəçinin  "bir addım irəliyə" getdiyi hiss olunur.

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

Komponent dayandırıldıqdan sonra ən yaxın fallback göstəriləcək. Amma, `<ProfileDetails>` komponentinə ən yaxın fallback ən yuxarı səviyyədədir:

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

Bu səbəbdən düyməni tıkladıqda "bir addım geriyə getdiyimizi" hiss edirik. Əvvəl faydalı kontent (`<HomePage />`) göstərən `<Suspense>` sərhədi `<h1>Applikasiya yüklənir...</h1>` fallback-inə "qayıtmağa" məcbur oldu. Biz bu addımı **Qayıtmış** vəziyyət adlandırırıq.

Məlumat yükləndikcə React render etməni təkrar edəcək və `<ProfileDetails>` komponenti uğurla render ediləcək. İndi, biz **Skelet** vəziyyətinə çataraq əskik hissəli səhifə görürük:

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

[Bu nümunəni](https://codesandbox.io/s/nameless-butterfly-fkw5q) açın. Düyməni tıkladıqda, irəli getmədən öncə Yükləmə vəziyyətini görəcəksiniz. Bu keçid yaxşı istifadəçi təcrübəsi yaradır.

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

"Open Profile" düyməsini tıkladıqda nəyinsə düzgün işləmədiyi hiss olunur. Keçidin tamamlanması üçün yeddi saniyə gözləmək lazımdır! Bunun səbəbi bizim trivia API-ımızın yavaş işləməsidir. Fərz edək ki, API-ı tezləşdirmək mümkün deyil. Bu məhdudiyyət ilə istifadəçi təcrübəsini necə yaxşılaşdırmaq olar?

Yükləmə vəziyyətində çox gözləmək istəmədikdə ilk intuisiya kimi `useTransition`-da `timeoutMs` parametrini kiçik dəyərə (məsələn, `3000`) dəyişməkdir. Bunu [bu nümunədə](https://codesandbox.io/s/practical-kowalevski-kpjg4) yoxlaya bilərsiniz. Bu dəyişiklik ilə uzanan Yükləmə vəziyyətindən qaçmaq mümkündür, amma bizim hələdə göstərə biləcəyimiz faydalı məlumat yoxdur!

Bunu həll etməyin daha sadə yolu var. **Keçidi qısaltmaq əvəzinə yavaş yüklənən komponenti** `<Suspense>` ilə əhatə edərək **keçiddən "ayıra" bilərik**:

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

Bəzən, sonrakı ekranda olduğumuz zaman fərqli `<Suspense>` sərhədlərini "açan" məlumatlar çox tez aralıqla gəlirlər. Məsələn, iki fərqli sorğu cavabı 1000ms və 1050ms-dən sonra hazır ola bilərlər. Bir saniyə gözlədikdən sonra əlavə 50ms gözləmək heç nəyi dəyişməyəcək. Bu səbəbdən, React, `<Suspense>` sərhədlərini vaxtaşırı gələn "qatar" kimi planlaşdıraraq göstərir. Bu, şablon çirklənmələrini və istifadəçiyə təqdim olunan vizual dəyişiklikləri azaldır.

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

Bu, bəzi işlərin başlandığını istifadəçiyə bildirir. Lakin, keçik qısa olduqda (məsələn, 500ms-dən tez) bu görünüş yayındırıcı ola bilər və keçidin *yavaş* olduğunu bildirə bilər.

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

Bu dəyişiklik ilə Yükləmə vəziyyətində olmamıza baxmayaraq 500ms keçənə kimi istifadəçiyə heç bir bildiriş etmirik. API cavabları gec gəldikdə bunun xeyiri olmaya bilər. Lakin, API tez olduqda [əvvəlki](https://codesandbox.io/s/thirsty-liskov-1ygph) və [sonrakı](https://codesandbox.io/s/hardcore-http-s18xr) nəticələri müqayisə edin. Kodları dəyişmədiyimizə baxmayaraq "çox tez" yükləmə vəziyyətini gizlədərək diqqəti gecikdirməyə yönləndirməyib hiss olunan performansı artırırıq.

### Xülasə {#recap}

Öyrəndiyimiz əsas məqamlar:

* Standart yükləmə ardıcıllığı Qayıtmış → Skelet → Tam formasındadır.
* Qayıtmış vəziyyət mövcud kontenti gizlətdiyindən yaxşı deyil.
* `useTransition`-dan istifadə edərək Yükləmə vəziyyətini göstərə bilərik. Bu, sonrakı ekran hazır olana kimi bizi əvvəlki ekranda saxlayacaq.
* Əgər hər hansı bir komponentin keçidi yavaşlatmasını istəmiriksə, bu komponenti `<Suspense>` sərhədi ilə əhatə edə bilərik.
* Hər komponentdə `useTransition` çağırmağın əvəzinə bu Hooku dizayn sisteminə əlavə edə bilərik.

## Digər Həllər {#other-patterns}

Keçidlərin ən çox işləniləcək Konkurrent Rejimi həlli olmasına baxmayaraq digər həllər də sizin üçün faydalı ola bilər.

### Yüksək və Aşağı Priooritetli State-ləri Parçalamaq {#splitting-high-and-low-priority-state}

React komponentlərini dizayn etdikdə state-in "minimal təsvirini" tapmaq faydalıdır. Məsələn, state-də `firstName`, `lastName` və `fullName` saxlamaq əvəzinə  `firstName` və `lastName` saxlayıb render zamanı `fullName`-i hesablamaq daha effektivdir. Bu yanaşma ilə bir state-i yeniləyib o biri state-i yeniləməyi yaddan çıxarmaq kimi xətaların qarşısının alınması asanlaşır.

Lakin, Konkurrent Rejimi işlətdikdə bəzən məlumatları "dublikat" etmək *faydalı ola bilər*. Aşağıdakı kiçik tərcümə applikasiyasına baxın:

```js
const initialQuery = "Salam dünya";
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
      <Suspense fallback={<p>Yüklənir...</p>}>
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

**[CodeSandbox-da sınayın](https://codesandbox.io/s/brave-villani-ypxvf)**

Anket sahəsinə mətn daxil etdikdə `<Translation>` komponenti dayandırılır və yeni nətiələri alana kimi `<p>Yüklənir...</p>` fallback-i göstərilir. Bu ideal deyil. Yeni məlumat yükləndiyi zaman *əvvəlki* tərcüməni görməyimiz daha faydalı ola bilər.

Faktiki olaraq konsolu açdıqda aşağıdakı xəbərdarlığı görəcəyik:

```
Warning: App triggered a user-blocking update that suspended.

The fix is to split the update into multiple parts: a user-blocking update to provide immediate feedback, and another update that triggers the bulk of the changes.

Refer to the documentation for useTransition to learn how to implement this pattern.
```

Əvvəl qeyd etdiyimiz kimi yenilik zamanı komponent dayandırılırsa state yeniliyini keçid ilə əhatə etmək faydalıdır. Gəlin, komponentimizə `useTransition` əlavə edək:

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

**[CodeSandbox-da sınayın](https://codesandbox.io/s/zen-keldysh-rifos)**

İndi, anket sahəsinə nəsə yazın. Nəsə səhv işləyir! Anket sahəsi çox gec yenilənir.

Biz birinci problemi həll etdik (keçid artıq yenilənmir). Amma, keçidə görə state, dərhal yenilənmədiyindən anket sahəsini idarə edə bilmir!

Bunu həll etməyin yolu **state-i iki hissəyə parçalamaqdır:** dərhal yenilənən "yüksək prioritetli" hissə və keçidi gözləyən "aşağı prioritetli" hissə.

Bizim nümunəmizdə artıq iki state dəyişəni var. Anket sahəsinin dəyəri `query` state-ində, tərcümə dəyəri isə `resource` dəyərində saxlanılır. Biz, `query` state-ində baş verən yenilikləri dərhal görmək, `resource` state-ində baş verən dəyişikliklərin isə (yəni yeni tərcümənin yüklənməsi) keçidi icra etməsini istəyirik.

Bunu həll etməyin düzgün yolu `setQuery` (dayandırılmayan) funksiyasını keçiddən *kənarda* çağırmaq, `setResource` (dayandırılan) funksiyasını isə keçidin *daxilindən* çağrımaqdır.

```js{4,5}
function handleChange(e) {
  const value = e.target.value;
  
  // Keçiddən kənarda (təcili)
  setQuery(value);

  startTransition(() => {
    // Keçidin daxilində (gecikdirilə bilər)
    setResource(fetchTranslation(value));
  });
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/lively-smoke-fdf93)**

Bu dəyişiklik ilə davranış istədiyimiz kimi işləyir. Biz anket sahəsinə dərhal yaza bilirik və tərcümə məlumatları yazdığımız ilə sinxronizə olur.

### Dəyəri Gecikdirmək {#deferring-a-value}

Normalda, React həmişə stabil UI render edir. Aşağıdakı koda baxın:

```js
<>
  <ProfileDetails user={user} />
  <ProfileTimeline user={user} />
</>
```

React, ekrada gördüyümüz komponentlərin həmişə `user` məlumatını göstərəcəyini siğortalayır. State yenili nəticəsində komponentlərə fərqli `user` dəyəri göndərildikdə hər iki komponentin dəyişdiyini görəcəksiniz. Siz, ekranda fərqli `user` göstərən kadr tapa bilməzsiniz. (Bu problem ilə qarşılaşmısınızsa, bizə baq göndərin!)

Bu, bir çox halda məntiqlidir. Stabil olmayan UI, istifadəçiləri çaşdıra bilər. (Məsələn, messencerin "Göndər" düyməsi ilə danışıq seçici panel fərqli seçilmiş mövzu göstərdikdə çaşdırıcı ola bilər.)

Lakin, bəzən qəsdən stabilsizlik təqdim etmək faydalı ola bilər. Yuxarıdakı nümunədəki kimi state-i iki yerə "parçalayaraq" buna nail olmaq olar. Lakin, React-də bunun üçün hazır Hook var:

```js
import { useDeferredValue } from 'react';

const deferredValue = useDeferredValue(value, {
  timeoutMs: 5000
});
```

Bu xüsusiyyəti nümayiş edə bilmək üçün biz [profayl dəyişdirən nümunəsinə](https://codesandbox.io/s/musing-ramanujan-bgw2o) baxacağıq. "Sonrakı" düyməsini tıkladıqda keçidin 1 saniyə çəkdiyinə fikir verin.

Fərz etdək ki, istifadəçi detallarının yüklənməsi çox tezdir (məsələn, 300ms). İndiki zamanda bizə həm istifadəçi detallarının, həm də yazıların hazır olması lazım olduğundan biz bir saniyə gözləyirik. Bəs biz istifadəçi detallarını tez göstərmək istəsək nə etməliyik?

Əgər stabilliyə fəda etmək istəyiriksə, biz **keçidləri gecikdirən komponentlərə köhnə məlumatlar göndərə bilərik**. `useDeferredValue()` ilə bunu etmək mümkündür:

```js{2-4,10,11,21}
function ProfilePage({ resource }) {
  const deferredResource = useDeferredValue(resource, {
    timeoutMs: 1000
  });
  return (
    <Suspense fallback={<h1>Profayl yüklənir...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Yazılar yüklənir...</h1>}>
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

**[CodeSandbox-da sınayın](https://codesandbox.io/s/vigorous-keller-3ed2b)**

Burada kompromis, `<ProfileTimeline>` komponentinin digər komponentlərdən fərqli məlumatı göstərməsi və köhnə məlumatı göstərməsinə meylli olmasıdır. "Sonrakı" düyməsini bir neçə dəfə tıklasanız bu davranışı görəcəksiniz. Lakin, bunun sayəsində biz keçid vaxtını 1000ms-dən 300ms-ə düşürə bildik.

Bunun düzgün kompromis olmasını bimək vəziyyətdən asılıdır. Lakin, elementlərin kontentləri nəzərə çarpan dərəcədə dəyişmədikdə və istifadəçinin bir saniyə ərzində köhnə versiyaya baxdığını anlamadıqda bu alət faydalı ola bilər.

`useDeferredValue` Hookunun *yalnız* məlumat yükləməsi üçün faydalı olmadığını nəzərinizə çatdırmaq istəyirik. Bu, bahalı komponent ağacına görə interaksiyanın (anket sahəsinə daxil etmə kimi) yavaşlamasının qarşısını da ala bilər. Gec yüklənən dəyəri "gecikdirdiyimiz" kimi (və digər komponentlər yeniləndiyindən asılı olmayaraq köhnə dəyəri göstərdiyimiz kimi) biz yavaş render olunan ağacları da gecikdirə bilərik.

Məsələn, filtr oluna bilən siyahı nümunəsinə baxın:

```js
function App() {
  const [text, setText] = useState("salam");

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="App">
      <label>
        Anket sahəsinə daxil edin:{" "}
        <input value={text} onChange={handleChange} />
      </label>
      ...
      <MySlowList text={text} />
    </div>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/pensive-shirley-wkp46)**

Bu nümunədə, **`<MySlowList>`-də olan hər element, sistem tredini (thread) bir neçə millisaniyə yavaşladır**. Biz bunu real applikasiyada heç vaxt etmərik, amma bu nümunə ilə optimallaşması aydın olmayan dərin komponent ağaclarında baş verən yavaşlatmanı simulyasiya edə bilirik.

Anket sahəsinə yazı daxil etdikdə yavaşlamanı görə bilirik. Gəlin, indi `useDeferredValue` Hookundan istifadə edək:

```js{3-5,18}
function App() {
  const [text, setText] = useState("salam");
  const deferredText = useDeferredValue(text, {
    timeoutMs: 5000
  });

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <div className="App">
      <label>
        Anket sahəsinə daxil edin:{" "}
        <input value={text} onChange={handleChange} />
      </label>
      ...
      <MySlowList text={deferredText} />
    </div>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/infallible-dewdney-9fkv9)**

İndi, daxil etmənin daha az yavaşladığını görəcəyik. Burada kompromis, nəticələrin gec göstərilməsidir.

Bu, debounce etmədən necə fərqlənir? Bizim nümunəmizdə sabit saxta yavaşlama var (80 elementin hərəsində 3ms). Bu səbəbdən tezliyindən asılı olmayaraq yavaşlama həmişə baş verəcək. Lakin, `useDeferredValue` Hookunun dəyəri yalnız render etmə uzun vaxt çəkdikdə "gecikməyə başlayacaq." React tərəfindən minimal yavaşlama tətbiq olunmur. Real ssenarilərdə yavaşlama istifadəçi qurğusundan asılıdır. Tez maşınlarda yavaşlama kiçik və ya mövcud olmayacaq. Yavaş maşınlarda isə yavaşlama daha çox nəzərə çarpacaq. Hər iki halda applikasiya responsiv olacaq. Bu mexanizmin minimal gecikdirmə tətbiq edən debounce etmə və ya throttle etmə kimi mexanizmlərdən üstünlüyü budur.

Responsivliyin artdığına baxmayaraq bu ssenari üçün Konkurrent Rejimində olan lazımi optimallaşdırmaların işlədilməyindən bu nümunə elə də yaxşı deyil. Amma yenə də `useDeferredValue` (və ya `useTransition`) kimi xüsusiyyətlərin şəbəkə cavabının gəlməsini və ya hesablama işinin bitməsini gözləmək kimi əməliyyatlarda faydalı olduğunu bilmək yaxşıdır.

### SuspenseList {#suspenselist}

Yükləmə vəziyyətlərini orkestrasiya etmək üçün ən sonuncu həll `<SuspenseList>`-dir.

Aşağıdakı nümunəyə baxın:

```js{5-10}
function ProfilePage({ resource }) {
  return (
    <>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h2>Yazılar yüklənir...</h2>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense fallback={<h2>Maraqlı faktlar yüklənir...</h2>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/proud-tree-exg5t)**

Bu nümunədə, API çağırışı zamanları qarışdırılıb. Bu səhifəni hər dəfə yenidən yüklədikdə bəzən yazıların birinci gəldiyini, bəzən də "maraqlı faktların" birinci gəldiyini görəcəksiniz.

Bu bizə problem yaradır. Maraqlı faktlar üçün cavab birinci gəldikdə bu faktları `<h2>Yazılar yüklənir...</h2>` fallback-inin aşağısında görəcəyik. Bu faktları oxuduğumuz zaman *yazılar* hazır olduqda isə bütün faktları aşağı düşəcək. Bu çaşdırıcıdır.

Bunu həll etməyin yollarından biri hər iki komponenti bir sərhad ilə əhatə etməkdik:

```js
<Suspense fallback={<h2>Yazılar və maraqlı faktlar yüklənir...</h2>}>
  <ProfileTimeline resource={resource} />
  <ProfileTrivia resource={resource} />
</Suspense>
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/currying-violet-5jsiy)**

İndi, hər iki komponentin *hazır olmasını* gözləmək lazımdır. Lakin, *yazılar* birinci hazır olduqda bunu göstərməyi gecikdirmək lazım deyil. Maraqlı faktlar gec yükləndikdə yazıların render olunduğundan şablon aşağı düşməyəcək.

Yükləmə vəziyyətləri komponent ağacının fərqli dərinliklərində olduqda Promise-ləri xüsusi formada birləşdirmək kimi digər yolları tətbiq etmək çox çətin ola bilər.

Bunu həll etmək üçün `SuspenseList` komponentini idxal edəcəyik:

```js
import { SuspenseList } from 'react';
```

`<SuspenseList>` komponenti ən yaxın `<Suspense>` nodlarının "göstərmə sırasını" idarə etməyə imkan yaradır:

```js{3,11}
function ProfilePage({ resource }) {
  return (
    <SuspenseList revealOrder="forwards">
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h2>Yazılar yüklənir...</h2>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
      <Suspense fallback={<h2>Maraqlı faktlar yüklənir...</h2>}>
        <ProfileTrivia resource={resource} />
      </Suspense>
    </SuspenseList>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/black-wind-byilt)**

`revealOrder="forwards"` parametri deməkdir ki, bu siyahının daxilində olan ən yaxın `<Suspense>` nodları **məlumat gəlməsinin sırasından asılı olmayaraq ağacda olduğu kimi göstəriləcək**. `<SuspenseList>` komponentinin digər rejimları da var: parametri `"forwards"` dəyərindən `"backwards"` və ya `"together"` dəyərinə dəyişib nə baş verdiyinə baxın.

Eyni zamanda yükləmə vəziyyətilərinin sayını `tail` propu ilə idarə edə bilərsiniz. `tail="collapsed"` propu təyin etdikdə eyni zamanda *ən çox bir* fallback göstəriləcək. Siz buna [buradan](https://codesandbox.io/s/adoring-almeida-1zzjh) baxa bilərsiniz.

`<SuspenseList>`-in React komponentləri kimi kompozisiya edilə biləcəyini unutmayın. Məsələn, siz bir neçə `<SuspenseList>` sıralarını `<SuspenseList>` cədvəlinə əlavə edərək qrid yarada bilərsiniz.

## Sonrakı Addımlar {#next-steps}

Konkurrent Rejimi ilə çox güclü UI proqramlaşdırma modeli və yaxşı istifadəçi təcrübələri orkestrasiya etmək üçün kompozisiya oluna bilən primitivlər təqdim edilir.

Bu həll, bir neçə ildə etdiyimiz tədqiqat və təkmilləşmənin nəticəsidir, amma bunun üzərində hələ də işlər gedir. [Konkurrent Rejiminə Uyğunlaşma](/docs/concurrent-mode-adoption.html) bölməsində bu xüsusiyyətləri necə sınamaq və nəyə gözləyə biləcəyiniz haqqında danışacağıq.

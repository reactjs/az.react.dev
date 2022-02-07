---
id: concurrent-mode-suspense
title: Məlumat Yüklənməsi üçün Suspense (Eksperimental)
permalink: docs/concurrent-mode-suspense.html
prev: concurrent-mode-intro.html
next: concurrent-mode-patterns.html
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
>Bu sənədlər erkən yoxlamaq istəyən və maraqlanan insanlar üçün yönəldilib. **Əgər React-ə yeni başlayırsınızsa, burada danışılan xüsusiyyətlərdən narahat olmayın** -- bu xüsusiyyətləri indi öyrənmək lazım deyil. Məsələn, əgər sizə bugün işləyən məlumat yüklənməsi dərsliyi lazımdırsa, [bu məqaləni](https://www.robinwieruch.de/react-hooks-fetch-data/) oxuyun.
=======
>This page was about experimental features that aren't yet available in a stable release. It was aimed at early adopters and people who are curious.
>
>Much of the information on this page is now outdated and exists only for archival purposes. **Please refer to the [React 18 Alpha announcement post](/blog/2021/06/08/the-plan-for-react-18.html
) for the up-to-date information.**
>
>Before React 18 is released, we will replace this page with stable documentation.
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20

</div>

React 16.6-dan başlayaraq bəzi kodları "yükləmək" və yüklənmə vəziyyətini (məsələn, spinner) deklarativ şəkildə təyin etmək üçün `<Suspense>` komponenti əlavə olundu:

```jsx
const ProfilePage = React.lazy(() => import('./ProfilePage')); // lazy şəkildə yüklənir

// Profayl yüklənənə kimi spinner göstərin
<Suspense fallback={<Spinner />}>
  <ProfilePage />
</Suspense>
```

Məlumat Yüklənməsi üçün Suspense `<Suspense>`-dən istifadə edərək **məlumat daxil olmaqla başqa maddələri də "gözləməyə"** imkan yaradan yeni xüsusiyyətdir. Bu səhifədə məlumat yüklənməsi ssenarisindən danışacağıq, amma Suspense ilə şəkillər, skriptlər və digər asinxron işləri də gözləmək mümkündür.

- [Tam Olaraq Suspense Nədir?](#what-is-suspense-exactly)
  - [Suspense Nə Deyil?](#what-suspense-is-not)
  - [Suspense ilə Nə Etmək Mümkündür?](#what-suspense-lets-you-do)
- [Suspense-in Praktikada İşlədilməsi](#using-suspense-in-practice)
  - [Relay İşlətmədikdə Nə Etməliyəm?](#what-if-i-dont-use-relay)
  - [Kitabxana Müəllifləri üçün](#for-library-authors)
- [Ənənəvi Yanaşmalar vs Suspense](#traditional-approaches-vs-suspense)
  - [Yanaşma 1: Render Zamanı Yükləmək (Suspense-dən istifadə edilmir)](#approach-1-fetch-on-render-not-using-suspense)
  - [Yanaşma 2: Yüklədikdən Sonra Render Etmək (Suspense-dən istifadə edilmir)](#approach-2-fetch-then-render-not-using-suspense)
  - [Yanaşma 3: Yükləndikcə Render Etmək (Suspense ilə)](#approach-3-render-as-you-fetch-using-suspense)
- [Yükləməni Tez Başlayın](#start-fetching-early)
  - [Bunun Üzərində hələ də İş Gedir](#were-still-figuring-this-out)
- [Suspense və Ötmə Şərtləri](#suspense-and-race-conditions)
  - [useEffect ilə Ötmə Şərtləri](#race-conditions-with-useeffect)
  - [componentDidUpdate ilə Ötmə Şərtləri](#race-conditions-with-componentdidupdate)
  - [Problem](#the-problem)
  - [Suspense ilə Ötmə Şərtlərinin Həlli](#solving-race-conditions-with-suspense)
- [Xətaların İdarə Olunması](#handling-errors)
- [Sonrakı Addımlar](#next-steps)

## Tam Olaraq Suspense Nədir? {#what-is-suspense-exactly}

Suspense, komponentlərinizin render olunmamışdan öncə nəyisə "gözləməsinə" imkan yaradır. [Aşağıdakı nümunədə](https://codesandbox.io/s/frosty-hermann-bztrp) iki kompontent asinxron API çağırışlarının bəzi məlumatları yükləməsini gözləyir:

```js
const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Profayl yüklənir...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Yazılar yüklənir...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // İstifadəçi məlumatlarının yüklənməsindən asılı olmayaraq bu məlumatları oxu
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Yazıların yüklənməsindən asılı olmayaraq bu məlumatları oxu
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[CodeSandbox-da Sınayın](https://codesandbox.io/s/frosty-hermann-bztrp)**

Bu nümayiş tizerdir və hələ ki tam anlaşılmırsa narahat olmayın. Biz, aşağıda bunun necə işlədiyi haqqda danışacağıq. Suspense-in bir *mexanizm* olduğunu və nümunədə olan `fetchProfileData()` və ya `resource.posts.read()` kimi API-ların vacib olmadığını yaddan çıxarmayın. Əgər maraqlanırsınızsa, siz bu funksiyaların təriflərini [sandbox-da](https://codesandbox.io/s/frosty-hermann-bztrp) tapa bilərsiniz.

<<<<<<< HEAD
Suspense məlumat yüklənməsi kitabxanası deyil. Bu, **məlumat kitabxanalarının** React-ə **komponentin oxuduğu məlumatın hazır olmadığını** bildirməsi üçün **mexanizmdır**. Bu mexanizm zamanı React, komponentlərin hazır olmasını gözləyir və UI-ı cari vəziyyət əsasında yeniləyir. Biz, Facebook-da Relay və bunun [yeni Suspense inteqrasiyasından](https://relay.dev/docs/en/experimental/step-by-step) istifadə edirik. Biz, Apollo kimi digər kitabxanaların da eyni formalı inteqrasiyalar təmin edəcəyini gözləyirik.
=======
Suspense is not a data fetching library. It's a **mechanism for data fetching libraries** to communicate to React that *the data a component is reading is not ready yet*. React can then wait for it to be ready and update the UI. At Facebook, we use Relay and its [new Suspense integration](https://relay.dev/docs/getting-started/step-by-step-guide/). We expect that other libraries like Apollo can provide similar integrations.
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20

Biz gələcəkdə Suspense-in komponentlərdən asinxron məlumatları oxumaq üçün (məlumatın haradan gəldiyi vacib deyil) əsas yol olacağına niyyət edirik.

### Suspense Nə Deyil? {#what-suspense-is-not}

Suspense-in bu problemlər üçün mövcud yanaşmalardan çox fərqləndiyindən bu haqqda ilk dəfə oxuduqda səhv anlayışlara səbəb ola bilər. Gəlin, bəzi anlaşılmazlıqlara aydınlıq gətirək:

 * **Bu, məlumat yüklənməsinin tətbiqi deyil.** Bu mexanizm, sizin GraphQL, REST və ya digər məlumat formatı, ötürücüsü və ya protokolu işlətməniz haqqında heç nə fərz etmir.

<<<<<<< HEAD
 * **Bu, klientdə işlətmək üçün hazır deyil.** `fetch` və ya Relay-i Suspense ilə əvəzləmək mümkün deyil. Lakin, Suspense ilə inteqrasiya olmuş kitabxanalardan (məsələn, [Relay-in yeni API-ları](https://relay.dev/docs/en/experimental/api-reference)) istifadə etmək mümkündür.
=======
 * **It is not a ready-to-use client.** You can't "replace" `fetch` or Relay with Suspense. But you can use a library that's integrated with Suspense (for example, [new Relay APIs](https://relay.dev/docs/api-reference/relay-environment-provider/)).
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20

 * **Bu, məlumat yüklənməsini görünüş təbəqəsinə qoşmur.** Suspense ilə yüklənmə vəziyyətlərini göstərməyin mümkün olduğuna baxmayaraq bu mexanizm şəbəkə məntiqlərini React komponentlərinə bağlamır.

### Suspense ilə Nə Etmək Mümkündür? {#what-suspense-lets-you-do}

Suspense-in mənası nədir? Buna cavab verməyin bir neçə yolu var:

* **Bu, məlumat yüklənməsi kitabxanalarını React ilə dərindən inteqrasiya edilməsinə imkan yaradır.** Əgər məlumat yüklənməsi kitabxanasında Suspense dəstəklənirsə, bu kitabxanaları React komponentlərindən istifadə etmək natural olacaq.

* **Bu, niyyətli dizayn olunmuş yükləmə vəziyyətlərini orkestrasiya etməyə imkan yaradır.** Bu mexanizm, məlumatın _necə_ yükləndiyi haqqında heç nə demir, amma applikasiyanın vizual yükləmə ardıcıllığını yaxından idarə etməyə imkan yaradır.

* **Bu, sizə ötmə şərtlərindən qaçınmağa kömək edir.** Asinxron kod, hətta `await` işlədildiyi zaman xətalara meyllidir. Suspense işlətdikdə məlumatların artıq yüklənmiş olduğu və *sinxron* oxunduğu hiss olunur.

## Suspense-in Praktikada İşlədilməsi {#using-suspense-in-practice}

<<<<<<< HEAD
Biz, Facebook-da yalnız Relay-in Suspense inteqrasiyasını işlətmişik. **Əgər başlamaq üçün praktiki bələdçi axtarırsınızsa, [Relay Sənədlərinə](https://relay.dev/docs/en/experimental/step-by-step) baxın!** Burada, produksiyada yaxşı nəticələr göstərən pattern-lər göstərilib.
=======
At Facebook, so far we have only used the Relay integration with Suspense in production. **If you're looking for a practical guide to get started today, [check out the Relay Guide](https://relay.dev/docs/getting-started/step-by-step-guide/)!** It demonstrates patterns that have already worked well for us in production.
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20

**Bu səhifədəki nümunələrdə Relay əvəzinə "saxta" API tətbiqlərindən istifadə olunur.** Bu, sizin GraphQL ilə tanışlığınız olmadığı hallda sizin bu anlayışları başa düşmənizi asanlaşdırır. Lakin, bu sənəddə Suspense ilə "düzgün" applikasiyanın yazılması haqqında danışılmır. Bu səhifədə daha çox anlayışlardan danışılır və Suspense-in *niyə* müəyyən formada işlədiyi və hansı problemləri həll etdiyi haqqda məlumatlar verilir.

### Relay İşlətmədikdə Nə Etməliyəm? {#what-if-i-dont-use-relay}

Əgər Relay işlətmirsinizsə, applikasiyanızda Suspense-i istifadə etmək üçün gözləməli olacaqsınız. İndiki zamanda, produksiyada yoxladığımız yeganə tətbiq Relay-dir və bunun işlədiyindən əminik.

Gələcək bir neçə ayda çox kitabxanaların Suspense API-ları buraxılışa çıxarılacaq. **Əgər API daha stabil olduqda öyrənməyə qayıtmaq istəyirsinizsə, hələlik mövcud işlərə fikir verməyib Suspense ekosistemi daha da yetişdikdə geri qayıda bilərsiniz.**

Siz, məlumat kitabxanası üçün özünüzün inteqrasiyasını da yaza bilərsiniz.

### Kitabxana Müəllifləri üçün {#for-library-authors}

Biz, cəmiyyətin digər kitabxanalar üzərində çoxlu eksperimentlər etməsini gözləyirik. Bizim məlumat yüklənməsi kitabxanalarının müəllifləri üçün vacib bir qeydimiz var.

Texniki mümkün olduğuna baxmayaraq Suspense, komponent render edildiyi zaman məlumatın yüklənməsini başlatmaq üçün nəzərdə *tutulmayıb*. Əksinə Suspense ilə komponentlərə *artıq yüklənmiş* məlumatları "gözləməsini" bildirmək mümkündür. **[Konkurrent Rejimi və Suspense ilə Əla İstifadəçi Təcrübələrinin Düzəldilməsi](/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html) bloq yazısında bunun niyə vacib olduğu və bu pattern-in praktikada tətbiqi haqqında danışılır.**

<<<<<<< HEAD
Əgər şəlalələrin qabağını kəsmək üçün həlliniz yoxdursa, render etmədən öncə yüklənməni üstün tutan API-lardan istifadə etməyi tövsiyyə edirik. Dəqiq nümunə üçün [Relay Suspense API-ının](https://relay.dev/docs/en/experimental/api-reference#usepreloadedquery) öncədən yükləməni necə tətbiq etdiyinə baxın. Bizim bu haqqda mesajımız hər zaman dəyişib. Məlumat Yüklənməsi üçün Suspense-in eksperimental olduğundan bizim produksiyada olan istifadədə öyrəndiklərimiz və problem sahəsində anlayışlarımız əsasında tövsiyyələrimizin vaxt ilə dəyişəcəyini gözləyə bilərsiniz.
=======
Unless you have a solution that helps prevent waterfalls, we suggest to prefer APIs that favor or enforce fetching before render. For a concrete example, you can look at how [Relay Suspense API](https://relay.dev/docs/api-reference/use-preloaded-query/) enforces preloading. Our messaging about this hasn't been very consistent in the past. Suspense for Data Fetching is still experimental, so you can expect our recommendations to change over time as we learn more from production usage and understand the problem space better.
>>>>>>> 20f0fe280f3c122df7541256b983c46e21e33b20

## Ənənəvi Yanaşmalar vs Suspense {#traditional-approaches-vs-suspense}

Biz populyar məlumat yükləmələri yanaşmalarından danışmadan Suspense-i təqdim edə bilərdik. Lakin, belə etdikdə Suspense-in hansı problemləri həll etdiyini, bu problemləri həll etməyin niyə faydalı olduğunu və Suspense-in mövcud həllərdən necə fərqləndiyini görmək çətinləşəcək.

Bu səbəbdən, biz Suspense-ə mövcud yanaşmaların növbəti məntiqi kimi baxırıq:

* **Render Zamanı Yükləmək (məsələn, `useEffect`-də `fetch` çağırışı):** Komponentləri render etməyə başlayın. Hər komponent öz effekt və lifecycle metodlarında məlumat yükləməsini icra edə bilər. Bu yanaşma adətən "şəlalələrə" səbəb olur.
* **Yüklədikdən Sonra Render Etmək (məsələn, Suspense-siz Relay):** Sonrakı səhifə üçün məlumat yükləməsini ən tez zamanda başlayın. Məlumat hazır olduqda yeni səhifəni render edin. Məlumat gələnə kimi heç nə edə bilmirik.
* **Yükləndikcə Render Etmək (məsələn, Suspense ilə Relay):** Sonrakı səhifəni, lazım olan məlumatları yükləməyə başladıqdan *dərhal sonra (şəbəkə cavabı gəlməmişdən öncə)* render etməyə başlayın. Məlumat gəldikdə React, məlumatlardan asılı olan komponentləri render etməyə cəhd edir. Bütün komponentlər üçün məlumatlar hazır olduqda komponentlər render edilir.

>Qeyd
>
>Bu, sadələşdirilmiş icmaldır. Praktiki həllərdə bir neçə yanaşmanın kombinasiyasından istifadə edilir. Amma, biz yenə də bu yanaşmaların kompromislərini müqayisə etmək üçün bunlara ayrılıqda baxacağıq.

Bu yanaşmaları müqayisə etmək üçün biz hər bir yanaşma ilə profayl səhifəsi tətbiq edəcəyik.

### Yanaşma 1: Render Zamanı Yükləmək (Suspense-dən İstifadə Edilmir) {#approach-1-fetch-on-render-not-using-suspense}

İndiki zamanda React applikasiyalarından məlumat yükləmək üçün effektdən istifadə olunur:

```js
// Funksiya komponentində:
useEffect(() => {
  fetchSomething();
}, []);

// Sinif komponentində:
componentDidMount() {
  fetchSomething();
}
```

Biz bu yanaşmanı "fetch-on-render" (render zamanı yükləmək) adlandırırıq, çünki bu yanaşmada məlumat yüklənməsi komponent ekranda render olunandan *sonra* başlayır. Bu, "şəlalə" adlı problemə səbəb olur.

Gəlin, aşağıdakı `<ProfilePage>` və `<ProfileTimeline>` komponentlərinə:

```js{4-6,22-24}
function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then(u => setUser(u));
  }, []);

  if (user === null) {
    return <p>Profayl yüklənir...</p>;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline />
    </>
  );
}

function ProfileTimeline() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts().then(p => setPosts(p));
  }, []);

  if (posts === null) {
    return <h2>Yazılar yüklənir...</h2>;
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/fragrant-glade-8huj6)**

Bu kodu icra edib konsoldakı loqları izlədikdə aşağıdakı ardıcıllığı görəcəksiniz:

1. İstifadəçi məlumatlarını yükləməyə başlayırıq
2. Gözləyirik...
3. İstifadəçi məlumatlarını yükləməyi bitiririk
4. Yazıları yükləməyi başlayırıq
5. Gözləyirik...
6. Yazıları yükləməyi bitiririk

İstifadəçi məlumatlarının yüklənməsi üç saniyə çəkdikdə, biz yazıların yükləmənməsini üç saniyə sonra *başlayacağıq*! Bu "şəlalə adlanır": paralel icra olunmalı əməliyyatların istənilməz *ardıcıl* olması.

Məlumatların render zamanı yükləndiyi kodlarda şəlalələrin olması normaldır. Bu problemləri həll etmək mümkündür, amma məhsul böyüdükcə proqramçılar bu problemdən qaçınan həllərdən istifadə etmək istəyirlər.

### Yünaşma 2: Yüklədikdən Sonra Render Etmək (Suspense-dən istifadə edilmir) {#approach-2-fetch-then-render-not-using-suspense}

Bəzi kitabxanalar məlumat yüklənməsini mərkəzləşdirərək şəlalələrin qarşısını ala bilirlər. Məsələn, bu problemi həll etmək üçün Relay, komponentə lazım olan məlumatları statik analiz oluna bilən *fraqmentlərə* ayırır və bu fraqmentləri tək sorğuya birləşdirir.

Bu sənəddə sizin Relay-dən anlayışınızın olduğunu fərz etmədiyimizdən biz nümunələrdə Relay-dən istifadə etməyəcəyik. Əvəzinə, biz, məlumat yüklənmə əməliyyatlarını birləşdirərək Relay-in işləməsinə bənzər nümunə yazacağıq:

```js
function fetchProfileData() {
  return Promise.all([
    fetchUser(),
    fetchPosts()
  ]).then(([user, posts]) => {
    return {user, posts};
  })
}
```

Bu nümunədə  `<ProfilePage>` komponenti hər iki sorğunu gözləyir, amma bu sorğuları eyni zamanda başladır:

```js{1,2,8-13}
// Məlumat yükləməsini ən tez zamanda başladın
const promise = fetchProfileData();

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    promise.then(data => {
      setUser(data.user);
      setPosts(data.posts);
    });
  }, []);

  if (user === null) {
    return <p>Profayl yüklənir...</p>;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline posts={posts} />
    </>
  );
}

// Uşaq komponentdə məlumat yüklənməsi icra olunmur
function ProfileTimeline({ posts }) {
  if (posts === null) {
    return <h2>Yazılar yüklənir...</h2>;
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/wandering-morning-ev6r0)**

Bu nümunədə, hadisə ardıcıllığı aşağıdakı formada olacaq:

1. İstifadəçi məlumatlarını yükləməyə başlayırıq
2. Yazıları yükləməyə başlayırıq
3. Gözləyirik...
4. İstifadəçi məlumatlarını yükləməyi bitiririk
5. Yazıları yükləməyi bitiririk

Biz əvvəlki şəbəkə "şəlaləsini" həll edik, amma təsadüfən fərqli problem yaratdıq. Biz, `Promise.all()`-dan istifadə edərək `fetchProfileData`-da yüklənən *bütün* məlumatları gözləyirik. Bu səbəbdən, yazılar yüklənməyənə kimi profayl detallarını render edilmir. Biz, hər iki məlumatı gözləməliyik.

Əlbəttə ki, bu nümunəyə düzəliş etmək mümkündür. Biz, `Promise.all()` çağırışını silib hər iki Promise-i ayrılıqda gözləyə bilərik. Lakin, komponent ağacı böyüdükcə və məlumat strukturları mürəkkəbləşdikcə, bu yanaşma proqressiv olaraq çətinləşəcək. Məlumat ağacının ixtiyari hissələri olmadıqda və ya köhnəldikdə etibarlı komponentlərin yazılması çətinləşir. Bu səbəbdən, yeni səhifə üçün lazım olan bütün məlumatları yüklədikdən *sonra* render etməni başlamaq daha praktikidir.

### Yanaşma 3: Yükləndikcə Render Etmək (Suspense ilə) {#approach-3-render-as-you-fetch-using-suspense}

Əvvəlki nümunədə, biz məlumatları `setState`-i çağırmamışdan öncə yükləyirdik:

1. Məlumatları yüklə
2. Məlumatları yükləməyi bitir
3. Render etməni başla

Suspense ilə isə biz məlumatları yükləməyə başladıqdan sonrakı addımların yerlərini dəyişirik:

1. Məlumatları yüklə
2. **Render etməni başla**
3. **Məlumatları yükləməyi bitir**

**Suspense istifadə etdikdə render etməni başlamaq üçün sorğunun cavabını gözləmək lazım deyil.** Faktiki olaraq, biz render etməni şəbəkə sorğusundan *dərhal sonra* başladırıq:

```js{2,17,23}
// Bu, Promise deyil. Bu, Suspense inteqrasiyasından gələn xüsusi obyektdir.
const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Profayl yüklənir...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Yazılar yüklənir...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // İstifadəçi məlumatları yüklənməsə belə bunu oxumağa başlayın
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Yazılar yüklənməsə belə bunu oxumağa başlayın
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/frosty-hermann-bztrp)**

`<ProfilePage>` komponentini ekranda render etdikdə aşağıdakı ardıcıllıq baş verəcək:

1. Biz, `fetchProfileData()` funksiyasında sorğuları başlatdıq. Bu funksiya Promise qaytarmaq əvəzinə xüsusi "resurs" qaytardı. Realistik nümunədə, bu funksiya kitabxananın Suspense inteqrasiyasından təmin olunacaq (məsələn, Relay kimi).
2. React, `<ProfilePage>` komponentini render etməyə çalışır. Bu komponent uşaqlar kimi `<ProfileDetails>` və `<ProfileTimeline>` komponentlərini qaytarır.
3. React, `<ProfileDetails>` komponentini render etməyə başlayır. Bu komponent `resource.user.read()` funksiyasını çağırır. Hələ ki, heç bir məlumatın yüklənmədiyindən bu komponent "dayandırılır" (suspends). React, bu komponenti render etməyi buraxaraq ağacda olan digər komponentləri render etməyə çalışır.
4. React, `<ProfileTimeline>` komponentini render etməyə çalışır. Bu komponent `resource.posts.read()` funksiyasını çağırır. Yenə də, hələ ki, heç bir məlumatın yüklənmədiyindən bu komponent "dayandırılır". React, bu komponenti render etməyi buraxaraq ağacda olan digər komponentləri render etməyə çalışır.
5. Render edilmək üçün cəhd edilməyən komponent qalmadı. `<ProfileDetails>` komponenti dayandırıldığından React, bu komponentə ən yaxın olan `<Suspense>` komponentinin `fallback` propunu çağırır: `<h1>Profayl yüklənir...</h1>`. İndi, bizim məsələmiz bitir.

Bu `resource` obyekti hələ ki mövcud olmayan amma vaxt ilə yüklənəcək məlumatı təmsil edir. `read()` funksiyasını çağırdıqda ya məlumat qəbul edilir, yada ki komponent "dayandırılır".

**Daha çox məlumat mövcud olmağa başladıqca React, render etməni təkrarlayaraq hər dəfə ağacda daha da "dərini" render edə biləcək.** `resource.user` yükləndikdən sonra, `<ProfileDetails>` komponenti uğurla render ediləcək və `<h1>Profayl yüklənir...</h1>` fallback-i lazım olmayacaq. Ən sonda, bütün məlumatlar alınacaq və ekranda heç bir fallback görünməyəcək.

Bu mexanizmin maraqlı təsiri var. Biz bütün məlumat tələblərini bir sorğuda göndərən GraphQL klienti işlətsək belə, *biz cavablar geldikcə kontenti daha da tez göstərə bilirik*. Bizim *yüklədikcə* render etdiyimizdən (əvvəlki, yüklədikdən *sonra* render etməkdən fərqli olaraq) sorğu cavabında `user` məlumatı `posts` məlumatından tez gəldikdə biz sorğu cavabı bitməmişdən öncə xarici `<Suspense>` sərhədini "aça" bilirik. Biz əvvəl bunu gözdən qaçırmış ola bilərdik, amma yükləmədən sonra render etmək yanaşmasında da yükləmək və render etmək arasında şəlalə var idi. Suspense-in bu şəlalədən əziyyət çəkmədiyindən Relay kimi kitabxanalar bundan istifadə edə bilirlər.

Nəzərə alın ki, biz komponentlərdən `if (...)` "yüklənir" yoxlamalarını sildik. Bu, ağırlıq gətirən kodları silməkdən əlavə çevik dizayn dəyişikliklərini də sadələşdirir. Məsələn, biz profayl məlumatlarının və yazıların eyni zamanda göstərilməsini istədikdə, bu komponentlər arasında olan `<Suspense>` sərhədlərini silə bilər və ya komponentlərə *öz* `<Suspense>` sərhədlərini verərək bir birindən ayıra bilərik. Suspense, yükləmə vəziyyətlərini dəyişməyə imkan yaradır və kodda böyük dəyişikliklər etmədən bu vəziyyətləri ardıcıllaşdıra bilir.

## Yükləməni Tez Başlayın {#start-fetching-early}

Əgər məlumat yükləməsi kitabxanası üzərində işləyirsinizsə, Yükləmə Zamanı Render Etmədə çox vacib bir məqamın olduğunu unutmayın. **Məlumat yükləməsini render etmədən _öncə_ başladın.** Aşağıdakı nümunəyə yaxından baxın:

```js
// Yükləməni tez başladın!
const resource = fetchProfileData();

// ...

function ProfileDetails() {
  // İstifadəçi məlumatlarını oxumağa çalışın
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/frosty-hermann-bztrp)**

Bu nümunədəki `read()` çağırışının yükləməni *başlatmadığına* fikir verin. Bu funksiya, *artıq yüklənmiş* məlumatları oxumağa çalışır. Suspense ilə tez işləyən applikasiyalar yaratmaq üçün bu fərq çox vacibdir. Biz, məlumat yüklənməsini komponent render olmağa başlayana kimi gecikdirmək istəmirik. Məlumat yüklənməsi kitabxanası müəllifi kimi yükləmə əməliyyatı başlamayana kimi `resource` obyektindən istifadə etməni saxlaya bilərsiniz. Bu qayda, bu səhifədə göstərilən nümunələrdə işlədilən "fake API-da" tətbiq edilir.

Siz, obyektin "yuxarı səviyyədə" yüklənməsinin praktiki olmadığını düşünə bilərsiniz. Məsələn, digər profaylın səhifəsinə keçid etdikdə nə etmək lazımdır? Siz yükləməni proplar əsasında tətbiq etmək istəyə bilərsiniz. Bu məsələləri həll etmək üçün **məlumat yükləməsini hadisə işləyicilərindən başladın**. Aşağıdakı nümunədə istifadəçi səhifələri arasında naviqasiya edilir:

```js{1,2,10,11}
// İlkin yükləmə: ən tez zamanda
const initialResource = fetchProfileData(0);

function App() {
  const [resource, setResource] = useState(initialResource);
  return (
    <>
      <button onClick={() => {
        const nextUserId = getNextId(resource.userId);
        // Sonrakı yükləmə: İstifadəçi tıklamanı etdiyi zaman
        setResource(fetchProfileData(nextUserId));
      }}>
        Next
      </button>
      <ProfilePage resource={resource} />
    </>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/infallible-feather-xjtbu)**

Bu yanaşmadan istifadə etdikdə biz **kod və məlumatları eyni zamanda yükləyə bilirik**. Səhifələr arasında naviqasiya etdikdə məlumatı yükləmək üçün səhifənin kodunun yüklənməsini gözləmək lazım deyil. Biz, kod və məlumatları eyni zamanda yükləməyə (link tıklandığı zaman) başladıqda daha yaxşı istifadəçi təcrübəsi təmin edə bilirik.

Bu yanaşma ilə sonrakı ekrandə *nəyin* render ediləcəyi sualı çıxır. Bunu həll etməyin bir neçə yolu var (məsələn, məlumat yükləməsini routing həllinə yaxınlaşdırmaq). Məlumat yükləməsi kitabxanası üzərində işlədiyiniz zaman bunun necə həll edilməsi və niyə vacib olduğu haqqda məlumat almaq üçün [Konkurrent Rejimi və Suspense ilə Əla İstifadəçi Təcrübələrinin Düzəldilməsi](/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html) yazısına baxın.

### Bunun Üzərində hələ də İş Gedir {#were-still-figuring-this-out}

Suspense təklikdə çox əyilən və çoxlu limitləri olmayan mexanizmdir. Lakin, şəlalələrin yaranmamasını təmin etmək üçün istifadəçi kodunda limitlər olmalıdır. Bunu siğortalamaq üçün bir neçə yol var. Bizim araşdırdığımız bəzi suallar var:

* Məlumat yükləməsini tez etməyin çətin olduğunu bilirik. Şəlalələrin olmaması fikri ilə bunu sadələşdirmək mümkündür?
* Səhifə üçün məlumat yüklədiyimiz zaman bu səhifədən **tez şəkildə keçmək üçün** API-a əlavə məlumatlar əlavə etmək olar?
* Sorğu cavabının ömrü nə qədər olmalıdır? Kəş qlobal yoxsa lokal olmalıdır? Kəşi kim idarə edir?
* Lazy-formada olan API-ları Proksilər ilə hər yerə `read()` çağırışları yazmadan ifadə etmək mümkündür?
* GraphQL sorğularının kompozisiyasının ixtiyari Suspense məlumatında ekvivalenti necə olmalıdır?

Relay-in bu sualların bəzilərinə cavabı var. Bunu etməyin birdən çox yolu var. Biz, React cəmiyyətinin gələcəyi yeni ideaları görməyə hazırıq.

## Suspense və Ötmə Şərtləri {#suspense-and-race-conditions}

Ötmə şərtləri, icra olunan kod haqqında səhv fərziyyələrə görə yaranan baqlardır. Bu baqlar, `useEffect` Hooku və ya `componentDidUpdate` kimi sinif lifecycle metodlarından çağrılan məlumat yükləmələrində tez-tez yaranır. Suspense burada bizə kömək edə bilər.

Bu problemi göstərə bilmək üçün `<ProfilePage>` komponentini və **profayllar arasında keçid** edə bilmək üçün düymə render edən yuxarı səviyyəli `<App>` komponentinə baxın:

```js{9-11}
function getNextId(id) {
  // ...
}

function App() {
  const [id, setId] = useState(0);
  return (
    <>
      <button onClick={() => setId(getNextId(id))}>
        Sonrakı
      </button>
      <ProfilePage id={id} />
    </>
  );
}
```

Gəlin, fərqli məlumat yükləmə strateqiyalarının bu tələbi necə həll etdiyini müqayisə edək.

### `useEffect` ilə Ötmə Şərtləri {#race-conditions-with-useeffect}

İlk olaraq, "effekt zamanı yükləmə" nümunəsinin orijinal versiyasına baxacağıq. Bu kodda `id` parametrini `<ProfilePage>` komponentindən `fetchUser(id)` və `fetchPosts(id)` funksiyalarına göndərəcəyik:

```js{1,5,6,14,19,23,24}
function ProfilePage({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then(u => setUser(u));
  }, [id]);

  if (user === null) {
    return <p>Profayl yüklənir...</p>;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline id={id} />
    </>
  );
}

function ProfileTimeline({ id }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts(id).then(p => setPosts(p));
  }, [id]);

  if (posts === null) {
    return <h2>Yazılar yüklənir...</h2>;
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/nervous-glade-b5sel)**

`id` dəyişdikdə effektin yenidən icra olunması üçün effekt asılılıqlarını `[]` massivdən `[id]` massivinə dəyişdiyimizə fikir verin. Əks halda, biz yeni məlumatı yükləyə bilməyəcəkdik.

Bu kodu icra etdikdə, ilk baxışda kodun normal işlədiyini görəcəyik. Lakin, biz "saxta API" tətbiqində gecikmə vaxtını qarışdırdıqda və "Sonrakı" düyməsini tez-tez tıkladıqda konsol loqlarında nəyinsə səhv işlədiyini görəcəyik. **Profaylı fərqli ID-ə dəyişdikdə bəzən köhnə profayl sorğularının cavabları "geri qayıda" bilər. Bu səbəbdən profayl nəticəsində fərqli ID-nin nəticələri görünə bilər.**

Bu problemi həll etmək mümkündür (Köhnə sorğuları saymamaq və ya ləqv etmək üçün effekt təmizləməsindən istifadə edə bilərsiniz). Lakin, bu intutiv deyil və debaq etməni çətinləşdirə bilir.

### `componentDidUpdate` ilə Ötmə Şərtləri {#race-conditions-with-componentdidupdate}

Bu problemin `useEffect` və ya Hooklara xas olduğunu fikirləşə bilərsiniz. Kodu siniflərə çevirdikdə `async` / `await` kimi əlverişli sintaksisdən istifadə etdikdə bu problem düzələcək?

Gəlin bunu yoxlayaq:

```js
class ProfilePage extends React.Component {
  state = {
    user: null,
  };
  componentDidMount() {
    this.fetchData(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }
  async fetchData(id) {
    const user = await fetchUser(id);
    this.setState({ user });
  }
  render() {
    const { id } = this.props;
    const { user } = this.state;
    if (user === null) {
      return <p>Profayl yüklənir...</p>;
    }
    return (
      <>
        <h1>{user.name}</h1>
        <ProfileTimeline id={id} />
      </>
    );
  }
}

class ProfileTimeline extends React.Component {
  state = {
    posts: null,
  };
  componentDidMount() {
    this.fetchData(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }
  async fetchData(id) {
    const posts = await fetchPosts(id);
    this.setState({ posts });
  }
  render() {
    const { posts } = this.state;
    if (posts === null) {
      return <h2>Yazılar yüklənir...</h2>;
    }
    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    );
  }
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/trusting-clarke-8twuq)**

Bu kodu oxumaq çox asandır.

Təəssüf ki, sinif və ya `async` / `await` sintaksisini işlətmək bizim problemimizi həll etmədi. Bu versiyada da eyni səbəblərə görə eyni ötmə şərtləri mövcuddur.

### Problem {#the-problem}

React komponentlərinin öz "lifecycle"-ları var. Bu komponentlər istənilən zaman yeni proplar qəbul edə bilər və ya state-i yeniləyə bilər. Lakin, asinxron sorğuların da özünə məxsus "lifecycle"-ları var. Bu, sorğular çağrıldığı zaman başlayır və cavab alındığı zaman bitir. Bu iki fərqli prosesi düz vaxtda "sinxronlaşdırmaq" çətindir.

### Suspense ilə Ötmə Şərtlərinin Həlli {#solving-race-conditions-with-suspense}

Gəlin nümunəmizi Suspense ilə yenidən yazaq:

```js
const initialResource = fetchProfileData(0);

function App() {
  const [resource, setResource] = useState(initialResource);
  return (
    <>
      <button onClick={() => {
        const nextUserId = getNextId(resource.userId);
        setResource(fetchProfileData(nextUserId));
      }}>
        Sonrakı
      </button>
      <ProfilePage resource={resource} />
    </>
  );
}

function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<h1>Profayl yüklənir...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Yazılar yüklənir...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails({ resource }) {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/infallible-feather-xjtbu)**

Əvvəki Suspense nümunəsində yalnız bir `resource` obyekti olduğundan biz bu dəyişəni modula qlobal yerdə saxlayırdıq. İndi bizdə bir neçə resursun olduğundan biz bu obyekti `<App>` komponentinin state-inə köçürdük:

```js{4}
const initialResource = fetchProfileData(0);

function App() {
  const [resource, setResource] = useState(initialResource);
```

İndi, "Sonrakı" düyməsini tıkladıqda, `<App>` komponenti sonrakı profayl üçün sorğunu başladır və *bu obyekti* `<ProfilePage>` komponentinə göndərir:

```js{4,8}
  <>
    <button onClick={() => {
      const nextUserId = getNextId(resource.userId);
      setResource(fetchProfileData(nextUserId));
    }}>
      Sonrakı
    </button>
    <ProfilePage resource={resource} />
  </>
```

İndi, **state-i təyin etmək üçün sorğu cavabını gözləmirik. Bunun əksini edirik: sorğunu başlayan kimi state-i təyin edir və komponenti render edirik**. Bizdə məlumat olduqda React, `<Suspense>`-in daxilində olan komponentləri lazımi kontent ilə "doldurur."

Bu kodu oxumaq asandır, amma əvvəlki versiyalardan fərqli olaraq Suspense versiyasında ötmə şərtləri problemi yoxdur. Bunun niyə olduğunu fikirləşə bilərsiniz. Biz, Suspense ilə *vaxtdan* çox fikirləşməməliyik. Ötmə şərtləri olan orijinal kod nümunəsində state-i *düzgün zamanda* təyin etmək lazım idi. Əks halda məlumatlar səhv göstəriləcəkdi. Lakin. Suspense ilə biz state-i *dərhal* təyin etdiyimizdən burada problemin yaranması çətinləşir.

## Xətaların İdarə Olunması {#handling-errors}

Promise-lər ilə kod yazdıqda xətaları `catch()` funksiyasında tutmaq lazım idi. Suspense işlətikdə isə Promise-ləri *gözləmədiyimizdən* nə etmək lazımdır?

Suspense ilə yükləmə xətalarını və render xətalarını eyni formada idarə edirik. Xətaları tutmaq üçün komponentlərdən yuxarıda [xəta sərhədləri](/docs/error-boundaries.html) render edirik.

İlk olaraq, layihəmiz boyu işlətmək üçün xəta sərhədi təyin edəcəyik:

```js
// İndiki zamanda Xəta sərhədləri sinif olmalıdırlar.
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

Bu komponenti ağacın istənilən yerinə əlavə edərək xətaları tuta bilirik:

```js{5,9}
function ProfilePage() {
  return (
    <Suspense fallback={<h1>Profayl yüklənir...</h1>}>
      <ProfileDetails />
      <ErrorBoundary fallback={<h2>Yazıları yükləmək mümkün olmadı.</h2>}>
        <Suspense fallback={<h1>Yazılar yüklənir...</h1>}>
          <ProfileTimeline />
        </Suspense>
      </ErrorBoundary>
    </Suspense>
  );
}
```

**[CodeSandbox-da sınayın](https://codesandbox.io/s/adoring-goodall-8wbn7)**

Bu sərhəddə həm render etmə xətaları, həm də Suspense məlumat yükləməsi zamanı yaranan xatalar tutulur. Biz, istədiyimiz qədər xəta sərhədi əlavə edə bilərik, amma bu sərhədlərin yenini [niyyətli seçməyi](https://aweary.dev/fault-tolerance-react/) tövsiyyə edirik.

## Sonrakı Addımlar {#next-steps}

Biz Məlumat Yükləməsi üçün Suspense-in əsaslarını əhatə etdik! Əsas olaraq Suspense-in *niyə* belə işlədiyini anladıq və bu mexanizmin məlumat yükləməsi sahəsinə necə daxil olduğunu gördük.

Suspense ilə bir çox sualı cavablandırırıq, amma bunun ilə yeni suallar da yaranır:

* Hər hansı bir komponent "dayandırıldıqda" applikasiya donmalıdır? Bunun qarşısını necə almaq olar?
* Yükləmə göstəricisini komponent ağacının yuxarısından fərqli yerdə göstərmək istədikdə nə etməliyik?
* Qısa zaman çərçivəsində səhv UI göstərmək *istədikdə* bunu etmək mümkündür?
* Spinner göstərmək əvəzinə cari ekranı "qaraldan" vizual effekt əlavə edə bilərik?
* [Ən sonuncu Suspense nümunəsində](https://codesandbox.io/s/infallible-feather-xjtbu) "Sonrakı" düyməsini tıkladıqda niyə xəbərdarlıq göstərilir?

Bu suallara cavab vermək üçün [Konkurrent UI Həlləri](/docs/concurrent-mode-patterns.html) bölməsinə baxın.

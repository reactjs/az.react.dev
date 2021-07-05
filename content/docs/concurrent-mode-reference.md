---
id: concurrent-mode-reference
title: Konkurrent Rejiminin API Arayışı (Eksperimental)
permalink: docs/concurrent-mode-reference.html
prev: concurrent-mode-adoption.html
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
=======
>This page was about experimental features that aren't yet available in a stable release. It was aimed at early adopters and people who are curious.
>
>Much of the information on this page is now outdated and exists only for archival purposes. **Please refer to the [React 18 Alpha announcement post](/blog/2021/06/08/the-plan-for-react-18.html
) for the up-to-date information.**
>
>Before React 18 is released, we will replace this page with stable documentation.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

</div>

Bu səhifədə [Konkurrent Rejiminin](/docs/concurrent-mode-intro.html) API arayışı göstərilir. Təlimatlı giriş axtarırsınızsa, [Konkurrent UI Həlləri](/docs/concurrent-mode-patterns.html) səhifəsinə baxın.

**Qeyd: Bu sənəd cəmiyyət üçün İcmal rolunu daşıyır və ən son stabil versiya deyil. Bu səhifədəki API-lara gələcəkdə dəyişikliklər edilər bilər. Öz riskiniz ilə oxuyun!**

- [Konkurrent Rejimini Aktivləşdirmək](#concurrent-mode)
    - [`createRoot`](#createroot)
- [Suspense](#suspense)
    - [`Suspense`](#suspensecomponent)
    - [`SuspenseList`](#suspenselist)
    - [`useTransition`](#usetransition)
    - [`useDeferredValue`](#usedeferredvalue)

## Konkurrent Rejimini Aktivləşdirmək {#concurrent-mode}

### `createRoot` {#createroot}

```js
ReactDOM.createRoot(rootNode).render(<App />);
```

`ReactDOM.render(<App />, rootNode)` çağırışını əvəz edərək Konkurrent Rejimin aktivləşdirir.

Konkurrent Rejimi haqqında əlavə məlumat üçün [Konkurrent Rejimi sənədlərinə](/docs/concurrent-mode-intro.html) baxın.

## Suspense API {#suspense}

### `Suspense` {#suspensecomponent}

```js
<Suspense fallback={<h1>Yüklənir...</h1>}>
  <ProfilePhoto />
  <ProfileDetails />
</Suspense>
```

`Suspense`, komponentlərin render olunmamışdan öncə "gözləməsinə" imkan yaradır və gözləmə zamanı fallback göstərir.

<<<<<<< HEAD
Bu nümunədə `ProfileDetails` komponenti məlumat yükləyən asinxron API sorğusunun cavabını gözləyir. `ProfileDetails` və `ProfilePhoto` komponentlərinin gözləndiyi müddətdə `Yüklənir...` fallback-i göstəriləcək. Nəzərinizə çatdırmaq istəyirik ki, `<Suspense>`-in daxilində olan bütün komponentlər yüklənməyənə kimi fallback göstəriləcək.
=======
In this example, `ProfileDetails` is waiting for an asynchronous API call to fetch some data. While we wait for `ProfileDetails` and `ProfilePhoto`, we will show the `Loading...` fallback instead. It is important to note that until all children inside `<Suspense>` have loaded, we will continue to show the fallback.
>>>>>>> 0bb0303fb704147452a568472e968993f0729c28

`Suspense` komponenti iki prop qəbul edir:
* **fallback** propu yükləmə göstərici üçündürdür. Bu fallback, `Suspense` komponentinin bütün uşaqları yüklənənə kimi göstərilir.
* **unstable_avoidThisFallback** propu bulin dəyər qəbul edir. Bu, React-ə ilkin yükləmə zamanı bu sərhədi göstərməməsini bildirir. Bu propun gələcək buraxılışlarda silinməsi şansı çoxdur.

### `<SuspenseList>` {#suspenselist}

```js
<SuspenseList revealOrder="forwards">
  <Suspense fallback={'Yüklənir...'}>
    <ProfilePicture id={1} />
  </Suspense>
  <Suspense fallback={'Yüklənir...'}>
    <ProfilePicture id={2} />
  </Suspense>
  <Suspense fallback={'Yüklənir...'}>
    <ProfilePicture id={3} />
  </Suspense>
  ...
</SuspenseList>
```

`SuspenseList` komponenti dayandırıla bilən komponnetlərin göstərilmə sırasını orkestrasiya etməyə imkan yaradır.

Bir neçə komponent fərqli məlumatları yükləmək istədikdə sorğu cavabları fərqli zamanlarda gələ bilər. Lakin, bu elementləri `SuspenseList` ilə əhatə etdikdə əvvəlki elementlər hazır olmayana kimi sonrakı elementlər göstərilməyəcək (bu sıranı dəyişmək mümkündür).

`SuspenseList` komponenti iki prop qəbul edir:
* **revealOrder (forwards, backwards, together)** propu ilə `SuspenseList` uşaqlarının hansı sıra ilə göstəriləcəyi təyin edilir.
  * `together` prop dəyəri komponentlərin bir-bir göstərilməsi əvəzinə *hamısını* birdən göstərilməsini bildirir.
* **tail (collapsed, hidden)** propu ilə `SuspenseList`-də olan elementlərin necə göstəriləcəyi təyin edilir. 
    * Normalda, `SuspenseList`, siyahıda olan bütün fallback-ləri göstərəcək.
    * `collapsed` dəyəri yalnız sonrakı fallback-i göstərməyi bildirir.
    * `hidden` dəyəri təyin edildikdə yüklənməkdə olan komponentlərin fallback-ləri gizlədiləcək.

Nəzərə alın ki, `SuspenseList` yalnız ən yaxın `Suspense` və `SuspenseList` uşaqlarına təsir edir. Bu komponent bir səviyyədən aşağıda olan sərhədləri axtarmır. Lakin, qrid düzəltmək `SuspenseList` komponentlərini bir-birinin daxilində render etmək mümkündür.

### `useTransition` {#usetransition}

```js
const SUSPENSE_CONFIG = { timeoutMs: 2000 };

const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);
```

`useTransition` Hooku ilə *yeni ekrana keçməmişdən öncə* kontenti gözləyərək istənilməyən yükləmə vəziyyətlərindən qaçınmaq mümkündür. Bu, komponentlərə sonrakı render etmələr olana kimi yavaş yüklənən məlumat yükləməsi yeniliklərini gecikdirərək vacib yenilikləri dərhal render etməyə imkan yaradır.

`useTransition` Hooku iki elementli massiv qaytarır.
* Callback qəbul edən `startTransition` funksiyası ilə React-ə hansı state-i gecikdirməyi bildiririk.
* `isPending` bulin dəyəri keçidin proqresdə olduğunu bildirir.

**Əgər hər hansı bir state yeniliyi ilə komponent dayandırılırsa, bu state yeniliyini keçid ilə əhatə etmək tövsiyyə olunur.**

```js
const SUSPENSE_CONFIG = { timeoutMs: 2000 };

function App() {
  const [resource, setResource] = useState(initialResource);
  const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);
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
      <Suspense fallback={<Spinner />}>
        <ProfilePage resource={resource} />
      </Suspense>
    </>
  );
}
```

Bu nümunədə, biz məlumat yükləməsini `startTransition` ilə əhatə etdik. Bu, profaylı dərhal yükləməyə imkan yaradaraq sonrakı profayl səhifəsinin və bu səhifə ilə əlaqəli `Spinner` komponentinin render edilməsini 2 saniyə (`timeoutMs`-də təyin edilən vaxt) gecikdirir.

`isPending` bulini React-ə komponentin keçiddə olduğunu bildirir. Biz bu dəyər ilə əvvəlki profayl səhifəsində yükləmə göstərici göstərə bilərik.

**Keçidlər haqqında ətraflı məlumat üçün [Konkurrent UI Həlləri](/docs/concurrent-mode-patterns.html#transitions) səhifəsinə baxın.**

#### useTransition Konfiqurasiyası {#usetransition-config}

```js
const SUSPENSE_CONFIG = { timeoutMs: 2000 };
```

`useTransition` Hooku `timeoutMs` parametri ilə **fakultativ Suspense konfiqurasiyası** obyekti qəbul edir. Bu vaxt dəyəri (millisaniyə ilə) ilə React-ə sonrakı ekrana (yuxarıdakı nümunədə göstərilən yeni Profayl Səhifəsi) keçməyi nə qədər gözləməsini bildiririk.

**Qeyd: Biz Suspense Konfiqurasiyasını fərqli modullar arasında paylaşmağı tövsiyyə edirik.**


### `useDeferredValue` {#usedeferredvalue}

```js
const deferredValue = useDeferredValue(value, { timeoutMs: 2000 });
```

Dəyərin ən çox `timeoutMs` qədər gecikən versiyasını qaytarır.

Bu, istifadəçi interaksiyası əsasında dərhal render edilən məlumat və məlumat yükləməsi zamanı gözlənilən məlumat olduqda interfeysi responsiv saxlamaq üçün istifadə edilir.

Bunun üçün yaxşı nümunə anket sahəsidir.

```js
function App() {
  const [text, setText] = useState("salam");
  const deferredText = useDeferredValue(text, { timeoutMs: 2000 }); 

  return (
    <div className="App">
      {/* Cari dəyəri anket sahəsinə göndərin */}
      <input value={text} onChange={handleChange} />
      ...
      {/* Lakin, siyahı lazım olduqda əsl dəyərdən "gec" gələ bilər */}
      <MySlowList text={deferredText} />
    </div>
  );
 }
```

Biz bu şəkildə `input` sahəsinin dəyərini dərhal göstərərək səhifənin responsiv olduğunu hiss etdirə bilərik. Eyni zamanda render etmənin baş verməsi üçün `MySlowList` komponenti `timeoutMs` parametri əsasında yeniləməni 2 saniyə gecikdirərək cari mətn dəyəri fonda render edir.

**Dəyərlərin gecikdirilməsi haqqında əlavə məlumat üçün [Konkurrent UI Həlləri](/docs/concurrent-mode-patterns.html#deferring-a-value) səhifəsinə baxın.**

#### useDeferredValue Konfiqurasiyası {#usedeferredvalue-config}

```js
const SUSPENSE_CONFIG = { timeoutMs: 2000 };
```

`useDeferredValue` Hooku `timeoutMs` parametri ilə **fakultativ Suspense konfiqurasiyası** obyekti qəbul edir. Bu vaxt dəyəri (millisaniyə ilə) React-ə dəyərin nə qədər gecikdirilməsinə imkan verməsini bildirir.

Şəbəkə və ya istifadəçi qurğusu icazə verdikdə React gecikməni qısaltmağa çalışacaq.

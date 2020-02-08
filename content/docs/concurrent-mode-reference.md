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
>Bu səhifədə **stabil buraxılışlarda [mövcud olmayan](/docs/concurrent-mode-adoption.html) eksperimental xüsusiyyətlərdən danışılır**. Produksiya applikasiyalarında eksperimental qurulmalardan istifadə etməyin. Buradakı xüsusiyyətlər React-in bir hissəsi olana kimi xəbərdarlıq verilmədən əhəmiyyətli dərəcədə dəyişilə bilər.
>
>Bu sənədlər erkən yoxlamaq istəyən və maraqlanan insanlar üçün yönəldilib. **Əgər React-ə yeni başlayırsınızsa, burada danışılan xüsusiyyətlərdən narahat olmayın** -- bu xüsusiyyətləri indi öyrənmək lazım deyil.

</div>

Bu səhifədə [Konkurrent Rejiminin](/docs/concurrent-mode-intro.html) API arayışı göstərili. Təlimatlı giriş axtarırsınızsa, [Konkurrent UI Həlləri](/docs/concurrent-mode-patterns.html) səhifəsinə baxın.

**Qeyd: Bu Cəmiyyət üçün İcmal rolunu daşıyır və ən son stabil versiya deyil. Gələcəkdə buradakı API-lara dəyişikliklər edilər bilər. Öz riskiniz ilə oxuyun!**

- [Konkurrent Rejimini Aktivləşdirmək](#concurrent-mode)
    - [`createRoot`](#createroot)
    - [`createBlockingRoot`](#createblockingroot)
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

### `createBlockingRoot` {#createblockingroot}

```js
ReactDOM.createBlockingRoot(rootNode).render(<App />)
```

`ReactDOM.render(<App />, rootNode)` çağırışını əvəz edərək [Blok Rejimini](/docs/concurrent-mode-adoption.html#migration-step-blocking-mode) aktivləşdirir.

Konkurrent Rejimini istifadə etdikdə React-in işləməsində semantik dəyişikliklər baş verir. Bu deməkdir ki, siz Konkurrent Rejimi yalnız bir neçə komponentdə istifadə edə bilməzsiniz. Bu səbəbdən bəzi applikasiyaları birbaşa Konkurrent Rejiminə miqrasiay etmək mümkün olmaya bilər.

Blok Rejimində Konkurrent Rejiminin xüsusiyyətlərinin kiçik hissəsi mövcuddur. Bu rejim, birbaşa miqrasiya edə bilməyən applikasiyalar üçün vasitəçi rolunu oynayır.

## Suspense API {#suspense}

### `Suspense` {#suspensecomponent}

```js
<Suspense fallback={<h1>Yüklənir...</h1>}>
  <ProfilePhoto />
  <ProfileDetails />
</Suspense>
```

`Suspense`, komponentlərin render olunmamışdan öncə "gözləməsinə" imkan yaradarır və gözləmə vaxtı fallback komponenti göstərir.

Bu nümunədə, `ProfileDetails` komponenti məlumat yükləyən asinxron API sorğusunun cavabını gözləyir. `ProfileDetails` və `ProfilePhoto` komponentləri gözləyənənə kimi `Yüklənir...` fallback-i göstəriləcək. Nəzərinizə çatdırmaq istəyirik ki, `<Suspense>`-in daxilindəki bütün komponentlər yüklənməyənə kimi fallback göstəriləcək.

`Suspense` komponenti iki prop qəbul edir:
* **fallback** prop yükləmə göstərici üçündür. Bu fallback, `Suspense` komponentinin bütün uşaqları yüklənənə kimi göstərilir.
* **unstable_avoidThisFallback** bulin dəyər qəbul edir. Bu, React-ə ilkin yükləmə zamanı bu sərhədi göstərməməsini bildirir. Bu propun gələcək buraxılışlarda silinməsi şansı çoxdur.

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

Bir neçə komponent fərqli məlumatları yükləmək istədikdə sorğu cavabları fərqli zamanlarda gələ bilər. Lakin, bu elementləri `SuspenseList` ilə əhatə etdikdə əvvəlki elementlər hazır olmayana kimi sonrakı elementləri göstərməyəcək (bu sıranı dəyişmək mümkündür).

`SuspenseList` komponenti iki prop qəbul edir:
* **revealOrder (forwards, backwards, together)** propu ilə `SuspenseList` uşaqlarının hansı sıra ilə göstəriləcəyi təyin edilir.
  * `together` prop dəyəri komponentlərin bir-bir göstərilməsi əvəzinə *hamısını* birdən göstərilməsini bildirir.
* **tail (collapsed, hidden)** propu ilə `SuspenseList`-də olan elementlərin necə göstəriləcəyi təyin edilir. 
    * Normalda, `SuspenseList`, siyahıda olan bütün fallback-ləri göstərəcək.
    * `collapsed` dəyəri yalnız sonrakı fallback-i göstərməyi bildirir.
    * `hidden` yüklənməkdə olan komponentlərin fallback-lərini gizlədir.

Nəzərə alın ki, `SuspenseList` yalnız ən yaxın `Suspense` və `SuspenseList` uşaqlarına təsir edir. Bu komponent bir səviyyədən aşağıda olan sərhədləri axtarmır. Lakin, qrid düzəltmək `SuspenseList` komponentlərini bir-birinin daxilində render etmək mümkündür.

### `useTransition` {#usetransition}

```js
const SUSPENSE_CONFIG = { timeoutMs: 2000 };

const [startTransition, isPending] = useTransition(SUSPENSE_CONFIG);
```

`useTransition` Hooku ilə *yeni ekrana keçməmişdən öncə* kontenti gözləyərək istənilməyən yükləmə vəziyyətlərindən qaçınmaq mümkündür. Bu, komponentlərə sonrakı render etmələr olana kimi yavaş yüklənən məlumat yükləməsi yeniliklərini gecikdirərək vacib yenilikləri dərhal render etməyə imkan yaradır.

`useTransition` Hooku iki elementi olan massiv qaytarır.
* Callback qəbul edən `startTransition` funksiyası ilə React-ə hansı state-i gecikdirməyi bildiririk.
* `isPending` bulin dəyəri keçidin bitməsinin gözləndiyini bildirir.

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
        Next
      </button>
      {isPending ? " Yüklənir..." : null}
      <Suspense fallback={<Spinner />}>
        <ProfilePage resource={resource} />
      </Suspense>
    </>
  );
}
```

Bu kodda, bir məlumat yükləməsini `startTransition` ilə əhatə etdik. Bu, bizə profaylı dərhal yükləməyə imkan yaradaraq sonrakı profayl səhifəsinin və bu səhifə ilə əlaqəli `Spinner` komponentinin render edilməsini 2 saniyə (`timeoutMs`-də təyin edilən vaxt) gecikdirir.

`isPending` bulini React-ə komponentin keçiddə olduğunu bildirir. Biz bu dəyər ilə əvvəlki profayl səhifəsində yükləmə göstərici göstərə bilərik.

**Keçidlər haqqında ətraflı məlumat üçün [Konkurrent UI Həlləri](/docs/concurrent-mode-patterns.html#transitions) səhifəsinə baxın.**

#### useTransition Konfiqurasiyası {#usetransition-config}

```js
const SUSPENSE_CONFIG = { timeoutMs: 2000 };
```

`useTransition` Hooku `timeoutMs` parametri ilə **fakultativ Suspense Konfiqurasiyası** obyekti qəbul edir. Bu vaxt dəyəri (millisaniyə ilə) ilə React-ə sonrakı ekrana (yuxarıdakı nümunədə göstərilən yeni Profayl Səhifəsi) keçməyi nə qədər gözləməsini bildiririk.

**Qeyd: Biz Suspense Konfiqurasiyasını fərqli modullar arasında paylaşmağı tövsiyyə edirik.**


### `useDeferredValue` {#usedeferredvalue}

```js
const deferredValue = useDeferredValue(value, { timeoutMs: 2000 });
```

Dəyərin ən çox `timeoutMs` qədər gecikən versiyasını qaytarır.

Bu, istifadəçi interaksiyası əsasında dərhal render edilən məlumat və məlumat yükləməsi zamanı gözlənilən məlumat olduqda interfeysi responsiv saxlamaq üçün istifadə edilir.

Bunun üçün yaxşı nümunəd anket sahəsidir.

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

Biz bu şəkildə `input` sahəsinin dəyərini dərhal göstərərək səhifənin responsiv olduğunu hiss etdirə bilərik. Eyni zamanda render etmənin baş verməsi üçün `MySlowList` komponenti `timeoutMs` parametri əsasında yeniləməni 2 saniyə gecikdirir. Bu zaman, cari dəyər fonda saxlanılır.

**Dəyərlərin gecikdirilməsi haqqında əlavə məlumat üçün [Konkurrent UI Həlləri](/docs/concurrent-mode-patterns.html#deferring-a-value) səhifəsinə baxın.**

#### useDeferredValue Konfiqurasiyası {#usedeferredvalue-config}

```js
const SUSPENSE_CONFIG = { timeoutMs: 2000 };
```

`useDeferredValue` `timeoutMs` parametri ilə **fakultativ Suspense Konfiqurasiyası** obyekti qəbul edir. Bu vaxt dəyəri (millisaniyə ilə) React-ə dəyərin nə qədər gecikdirilməsinə imkan verməsini bildirir.

Şəbəkə və ya istifadəçi qurğusu icazə verdikdə React gecikməni qısaltmağa çalışacaq.

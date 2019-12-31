---
id: profiler
title: Profayler API-ı
layout: docs
category: Reference
permalink: docs/profiler.html
---

React applikasiyasının hansı tezlikdə render edilməsini və render edilmənin "qiymətini" ölçmək üçün `Profiler`-dən istifadə edilir.
Bu alət applikasiyanın yavaş işləyən və [memoizasiya kimi optimallaşdırmalardan faydalana bilən](https://reactjs.org/docs/hooks-faq.html#how-to-memoize-calculations) hissələrini tapmaq üçün işlədilir.

> Qeyd:
>
> Profayl etmə əməliyyatı applikasiyaya ağırlığı verə bilər. Lakin, bu xüsusiyyətlər **[produksiya qurulmasında](https://reactjs.org/docs/optimizing-performance.html#use-the-production-build) söndürülür**.
>
> Produksiyada profayl edə bilmək üçün React-də profayl etməyə imkan yaradan produksiya qurulması var.
> Bu qurulma haqqında əlavə məlumat üçün [fb.me/react-profiling](https://fb.me/react-profiling) səhifəsinə baxın.

## İstifadəsi {#usage}

React ağacının istənilən yerini profayl edə bilmək üçün istənilən yerə Profayler əlavə etmək mümkündür.
Bu komponent iki prop qəbul edir: `id` (mətn) və `onRender` callback-i (funksiya). `onRender` callback-i ağacda olan həs hansı bir komponent, yeniliyi "commit" etdiyi zaman çağrılır.

Məsələn, `Navigation` komponentini və uşaqlarını profayl etmək üçün:

```js{3}
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```

Applikasiyanın fərqli hissələrini profayl etmək üçün bir neçə `Profiler` komponentindən istifadə etmək mümkündür:

```js{3,6}
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Profiler id="Main" onRender={callback}>
      <Main {...props} />
    </Profiler>
  </App>
);
```

Eyni ağaca bir neçə `Profiler` komponenti əlavə etmək mümkündür:

```js{2,6,8}
render(
  <App>
    <Profiler id="Panel" onRender={callback}>
      <Panel {...props}>
        <Profiler id="Content" onRender={callback}>
          <Content {...props} />
        </Profiler>
        <Profiler id="PreviewPane" onRender={callback}>
          <PreviewPane {...props} />
        </Profiler>
      </Panel>
    </Profiler>
  </App>
);
```

> Qeyd
>
> `Profiler`-in yüngül komponent olduğuna baxmayaraq bu komponenti yalnız lazım olduqda işlədin. Bu komponentin hər istifadəsi CPU və yaddaşa ağırlıq verə bilər.

## `onRender` Callback-i {#onrender-callback}

`Profiler` komponenti `onRender` funksiyası propunu tələb edir.
Profayl olunan ağacda hər hansı bir komponent, yeniliyi "commit" etdikdə bu funksiya çağrılır.
Bu funksiyanın render edilən elementi və render zamanını təsvir edən parametrləri var.

```js
function onRenderCallback(
  id, // commit olunan Profayler ağacının "id" propu
  phase, // "mount" (ağac yeni əlavə edildikdə) və ya "update" (yenidən render edildikdə)
  actualDuration, // Commit olunan yeniliyi render etmək üçün sərf olunan zaman
  baseDuration, // memoizasiyasız bütün ağacın render olunmasına sərf olunan zaman
  startTime, // Yeniliyi render etmənin başlama vaxtı
  commitTime, // Yeniliyin commit olunma vaxtı
  interactions // Bu yeniliyə aid olan interaksiyalar siyahısı
) {
  // Render vaxtlarını aqreqat və ya loq edin...
}
```

Gəlin hər arqumentə ayrılıqda baxaq:

* **`id: string`** - 
Commit olunan Profayler ağacının "id" propu.
Bir neçə profayler işlədildikdə ağacın hansı hissəsinin commit olunduğunu müəyyənləşdirmək üçün işlədilir.

* **`phase: "mount" | "update"`** -
Ağacın ilk dəfə mount olunmasını, və ya proplar, state, və ya hooklar əsasında yenidən render edildiyini müəyyənləşdirir.

* **`actualDuration: number`** -
Cari yenilik üçün `Profiler`-i və uşaqlarını render etmək üçün sərf olunan zaman.
Bu dəyər ağacın memoizasiyadan necə istifadə etdiyini göstərir (məsələn, [`React.memo`](/docs/react-api.html#reactmemo), [`useMemo`](/docs/hooks-reference.html#usememo), [`shouldComponentUpdate`](/docs/hooks-faq.html#how-do-i-implement-shouldcomponentupdate)).
İdeal olaraq, uşaqların spesifik prop dəyişikləri əsasında yeniləndiyini nəzərə alsaq bu dəyər ilkin mount-dan sonra kəskin azalmalıdır.

* **`baseDuration: number`** -
`Profiler` ağacında olan bütün komponentlərin render olunduğu ən sonuncu renderə sərf olunan zaman.
Bu dəyər renderin ən pis qiymətini hesablayır (məsələn, ilkin mount zamanı və ya memoizasiyasız ağac).

* **`startTime: number`** -
Cari yeniliyi render etmənin başlama vaxtı.

* **`commitTime: number`** -
Cari yeniliyin commit olunduğu vaxt.
Bu dəyər commit-də olan bütün profaylerlər arasında paylaşılır (lazım olduqda bu dəyəri qruplamaq olar).

* **`interactions: Set`** -
Yeniliyin planlaşdırılmasına səbəb olan ["interaksiyaların"](https://fb.me/react-interaction-tracing) siyahısı (məsələn, `render` və ya `setState` çağrıldıqda).

> Qeyd
>
> Yenilikləri müəyyənləşdirmək üçün interaksiyalardan istifadə edə bilərsiniz. Lakin, bu API hələ ki, eksperimentaldır.
>
> Əlavə məlumat üçün [fb.me/react-interaction-tracing](https://fb.me/react-interaction-tracing) səhifəsinə baxın.

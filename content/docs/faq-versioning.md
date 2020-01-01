---
id: faq-versioning
title: Versiya Qaydaları
permalink: docs/faq-versioning.html
layout: docs
category: FAQ
---

React-də [semantik versiyalamaq (semver)](https://semver.org/) prinsiplərindən istifadə edir.

Bu deməkdirki, **x.y.z** formatlı versiyada:

* **Kritiki baqlar düzəldildikdə** **z** rəqəmini dəyişərək (məsələn, 15.6.2-dən 15.6.3-ə) **yamaq (patch) buraxılış** dərc edilir.
* **Yeni xüsusiyyətlər əlavə edildikdə** və ya **kritiki olmayan düzəlişlər edildikə** **y** rəqəmini dəyişərək (məsələn, 15.6.2-dən 15.7.0-a) **kiçik (minor) buraxılış** dərc edilir.
* **Pozucu dəyişiklik edildikdə** **x** rəqəmini dəyişərək (məsələn, 15.6.2-dən 16.0.0-a) **böyük (major) buraxılış** dərc edilir.

Böyük buraxılışlarda yeni xüsusiyyətlər, istənilən buraxılışda isə baq düzəlişləri ola bilər.

Ən çox dərc edilən buraxılışlar kiçik buraxılışlardır.

Bu versiya qaydaları Next və Eksperimental kanallarda olan ön buraxılışları ehtiva etmir. [Ön buraxılışlar üçün buradan oxuyun.](/docs/release-channels.html)

### Pozucu Dəyişikliklər {#breaking-changes}

Pozucu dəyişikliklər hamı üçün narahatçılıq yaratdığından biz böyük buraxılışların sayını çox az dərc etməyə çalışırıq. Məsələn, 2016-cı ilin Aprel ayında React 15, 2019-cu ilin Sentyabr ayında React 16 dərc edilib. React 17-nin isə 2019-dan tez dərc edilməsi gözlənilmir.

Əvəzinə, biz yeni xüsusiyyətləri kiçik versiyalarda dərc edirik. Bu deməkdirki, adının uyğun olmamasına baxmayaraq, kiçik buraxılışlar böyük buraxılışlardan daha maraqlı olur.

### Stabilliyə Öhdəlik {#commitment-to-stability}

React, zaman ilə yeniləndikcə biz yeni xüsusiyyətlərdən istifadə etmək cəhdini asanlaşdırmağa çalışırıq. İmkan olduqca, biz köhnə API-ların işləməsini qorumağa çalışırıq (köhnə API-ı fərqli paketdə dərc etmək lazım gəldikdə belə). Məsələn, [miksinlərin işlədilməsinin illərlə tövsiyə edilmədiyinə](/blog/2016/07/13/mixins-considered-harmful.html) baxmayaraq miksinlər [create-react-class](/docs/react-without-es6.html#mixins) paketində dəstəklənir və bir çox köhnə, stabil layihələrdə istifadə edilir.

React, milyondan çox proqramçı (kollektiv olaraq milyondan çox komponenti) tərəfindən istifadə edilir. Facebook-un kodu təklikdə 50.000 React komponentindən ibarətdir. Bu səbəbdən, React-in yeni versiyalara yenilənməsini mümkün qədər asanlaşdırmalıyıq. Miqrasiya yolu göstərilmədən böyük dəyişikliklər edilərsə istifadəçilər köhnə versiyalarda qalacaqlar. Biz, bu yeniləmə yollarını Facebook-da yoxlayırıq. Əgər bizim 10 nəfərdən az proqramçıdan ibarət olan komandamız 50.000+ komponenti yeniləyə bilirsə, biz bu yeniliklərin React-i istifadə edən proqramçılar üçün idarə oluna biləcəyini ümid edirik. Bir çox ssenaridə, hər open-source buraxılışında komponent sintaksisini yeniləmək üçün [avtomatlaşmış skriptlər](https://github.com/reactjs/react-codemod) ehtiva edirik.

### Xəbərdarlıqlar ilə Tədrici Yeniləmələr {#gradual-upgrades-via-warnings}

React-in development qurmaları əlavə xəbərdarlıqlar ehtiva edir. Gələcək pozucu dəyişikliklərə hazırlıq üçün mümkün olduğu qədər xəbərdarlıqlar əlavə olunur. Bu yol ilə applikasiyanızın ən son buraxılışında xəbərdarlıq olmadıqda applikasiya React-in gələcək böyük buraxılışına hazır olacaq. Bu, applikasiyanı komponent-komponent yeniləməyə imkan yaradır.

Development xəbədarlıqları applikasiyanın icra davranışına təsir etmir. Bu səbəbdən, applikasiyanın development və produksiya qurulmalarının eyni işləməsindən əmin ola bilərsiniz. Produksiya qurulmasında xəbərdarlıqlar loq olunmur və produksiya qurulması daha səmərəli işləyir. (Əgər sizdə produksiya kodu səmərəli işləmirsə və ya xəbərdarlıqlar görünürsə, bizə issue təqdim edin.)

### Nələr Pozucu Dəyişiklikdir? {#what-counts-as-a-breaking-change}

Adətən, aşağıdakı dəyişikliklərə böyük versiya artımı *etmirik*:

* **Development xəbərdarlıqlarına.** Bu yeniliklərin produksiya davranışlarına təsir etmədiyindən biz böyük versiyalar arası yeni xəbərdarlıqlar əlavə edə bilər və ya mövcud xəbərdarlıqları dəyişə bilərik. Faktiki olaraq, proqramçıları gələcək pozucu dəyişiklər haqqında məlumatları bu formada çatdırırıq.
* **`unstable_` adı ilə başlayan API-lara.** Bu API-lar eksperimental xüsusiyyətlər üçün işlədilir. Biz, bu xüsusiyyətlərin API-larından tam əmin deyilik. Bu xüsusiyyətləri `unstable_` prefiksi ilə dərc edərək daha tez iterasiya edə bilir və stabil API-a daha tez çata bilirik.
* **React-in alfa və kanari versiyalarına.** React-in yeni xüsusiyyətlərini tez yoxlaya bilmək üçün React-in alfa versiyasını dərc edirik. Lakin, alfa zamanı öyrəndiklərimiz əsasında dəyişiklər etmək lazımdır. Nəzərə alin ki, bu versiyaları işlətdikdə API-lar dəyişə bilər.
* **Sənədsiz API-lara və daxili strukturlara.** `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` və ya `__reactInternalInstance$uk43rzhitjg` kimi parametrləri işlətdikdə heç bir qarantiya yoxdur. Bu zaman öz başınasınız.

Bu qanun, praqmatik olmaq üçün dizayn olunub. Biz, sizin üçün baş ağrıları yaratmaq istəmirik. Göstərilən dəyişikliklər üçün böyük versiya artdıqda daha çox böyük versiya artımlarına və cəmiyyətə daha çox versiya problemləri yaranmasına səbəb ola bilər. Bu, həmçinin bizim React üzərində etdiyimiz proqresimi yavaşladacaq.

Bu siyahıda olan dəyişiklik cəmiyyətdə böyük problem yaradacaqsa, biz bu dəyişiklik üçün tədrici miqrasiya yolu təmin etməyə çalışacağıq.

### Kiçik Buraxılışda Yeni Xüsusiyyət Yoxdursa, Niyə Yamaq Buraxılışı Deyil? {#minors-versus-patches}

Kiçik buraxılışda yeni xüsusiyyət olmaya bilər. [Semver buna icazə verir](https://semver.org/#spec-item-7). Semver qeyd edir ki, **"bağlı kodda təkminləşmələr və ya funksionallıqlar təqdim edildikdə [kiçik versiyadan] istifadə etmək olar. Kiçik versiyada yamaq dərəcəli dəyişikliklər də ola bilər."**

Bu buraxılışların yamaq versiyasında olmaması sualı yaranır.

React-ə (və ya hər hansı bir proqram təminatına) dəyişikliik etdikdə gözlənilməz problemlərin yaranması riksi artır. Yamaq versiyada baq düzəldikdə yeni baqın yaranması ssenarisini fikirləşin. Bu, proqramçılar üçün pozucu olaraq gələcək yamaq versiyalara etibarı azaldacaq. Praktikada nadir hallarda rast gəlinən baqı düzəltdikdə bu ssenari daha acınacaqlı olur.

React buraxılışlarını baqsız dərc edilməsi haqqında bizim yaxşı avtoritetimiz var. Lakin, proqramçılar yamaq buraxılışların problemsiz adaptasiyasını ehtimal etdiklərindən buraxılışların etibarlılıq dərəcəsi daha yüksək olmalıdır.

Bu səbəblərdən, biz, yamaq buraxılışlarını yalnız kritiki baqları və təhlükəsizlik zəifliklərini düzəltmək üçün işlədirik.

Buraxılışda vacib olmayan dəyişikliklər olduqda (daxili kod refaktorinqləri, tətbiq detallarına dəyişikliklər, performans təkminləşmələri, və ya kiçik baq düzəlişləri), yeni xüsusiyyətin mövcudluğundan asılı olmayaraq kiçik versiya artırılacaq.

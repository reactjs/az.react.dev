---
id: faq-versioning
title: Versiya Qaydaları
permalink: docs/faq-versioning.html
layout: docs
category: FAQ
---

React [semantik versiyalamaq (semver)](https://semver.org/) prinsiplərindən istifadə edir.

Bu deməkdirki, **x.y.z** formatlı versiyada:

* **Kritiki baqlar düzəldildikdə** **z** rəqəmini dəyişərək (məsələn, 15.6.2-dən 15.6.3-ə) **yamaq (patch) buraxılış** dərc edilir.
* **Yeni xüsusiyyətlər əlavə edildikdə** və ya **kritiki olmayan düzəlişlər edildikə** **y** rəqəmini dəyişərək (məsələn, 15.6.2-dən 15.7.0-a) **kiçik (minor) buraxılış** dərc edilir.
* **Pozucu dəyişiklik edildikdə** **x** rəqəmini dəyişərək (məsələn, 15.6.2-dən 16.0.0-a **böyük (major) buraxılış** dərc edilir.

Böyük buraxılışlarda yeni xüsusiyyətlər, istənilən buraxılışda isə baq düzəlişləri ola bilər.

Kiçik buraxılışlar ən çox dərc edilir.

### Pozucu Dəyişikliklər {#breaking-changes}

Pozucu dəyişikliklər hamı üçün narahatçılıq yaratdığından biz böyük buraxılışların sayını çox az dərc etməyə çalışırıq. Məsələn, React 16 Aprel 2016-ci ildə, React 16 Sentyabr 2019-cu ildə dərc edilib. React 17-in isə 2019-dan tez dərc edilməsi gözlənilmir.

Əvəzinə, biz yeni xüsusiyyətləri kiçik versiyalarda dərc edirik. Bu deməkdirki, adının uyğun olmamasına baxmayaraq, kiçik buraxılışlar böyük buraxılışlardan daha maraqlı olur.

### Stabilliyə Öhdəlik {#commitment-to-stability}

React zaman ilə yeniləndikcə biz yeni xüsusiyyətlərdən istifadə etmək cəhdini asanlaşdırmağa çalışırıq. İmkan olduqca, biz köhnə API-ların işləməsini qorumağa çalışırıq, hətta bu, köhnə API-ı fərqli paketdə dərc edilməsidirsə. Məsələn, [miksinlərin işlədilməsinin illərlə tövsiyyə edilmədiyinə](/blog/2016/07/13/mixins-considered-harmful.html) baxmayaraq miksinlər [create-react-class](/docs/react-without-es6.html#mixins) paketində dəstəklənir və bir çox köhnə, stabil layihələrdə istifadə edilir.

React, milyondan çox proqramçı (kollektiv olaraq milyondan çox komponenti) tərəfindən istifadə edilir. Facebook-un kod təklikdə 50.000-dən React komponentindən ibarətdir. Bu səbəbdən, React-in yeni versiyalara yenilənməsini mümkün qədər asanlaşdırmalıyıq. Miqrasiya yolu göstərilmədən böyük dəyişikliklər etdikdə istifadəçilər köhnə versiyalarda qalacaqlar. Biz bu yeniləmə yollarını Facebook-da yoxlayırıq. Əgər bizim 10 nəfərdən az proqramçıdan ibarət olan komandamız 50.000+ komponenti yeniləyə bilirsə, biz bu yeniliklərin React-i istifadə edən hamı üçün idarə oluna bilindiyini ümid edirik. Bir çox ssenaridə, biz komponent sintaksisini yeniləmək üçün [avtomatlaşmış skriptləri](https://github.com/reactjs/react-codemod) hər open-source buraxılışda ehtiva edirik.

### Xəbərdarlıqlar ilə Tədrici Yeniləmələr {#gradual-upgrades-via-warnings}

React-in development qurmaları əlavə xəbərdarlıqlar ehtiva edir. Gələcək pozucu dəyişikliklərə hazırlıq üçün mümkün olduğu qədər xəbərdarlıqlar əlavə edirik. Bu yol ilə applikasiyanızın ən son buraxılışında xəbərdarlıq olmadıqda applikasiya React-in gələcək böyük buraxılışına hazır olacaq. Bu, applikasiyanızı komponent-komponent yeniləməyə imkan yaradır.

Development xəbədarlıqları applikasiyanın icra davranışına təsir etmir. Bu, applikasiyanın development və produksiya qurulmalarında eyni işləyəcəyindən əmin ola bilərsiniz. Produksiya qurulmasında xəbərdarlıqlar loq olunmur və produksiya qurulması daha səmərəli işləyir. (Əgər sizdə səmərəli işləmirsə və ya xəbərdarlıqlar görünürsə, bizə issue təqdim edin.)

### Nələr Pozucu Dəyişiklikdir? {#what-counts-as-a-breaking-change}

Adətən, aşağıdakı dəyişikliklərə böyük versiya artımı *etmirik*:

* **Development xəbərdarlıqlarına.** Bu yeniliklərin produksiya davranışlarına təsir etmədiyindən biz böyük versiyalar arası yeni xəbərdarlıqlar əlavə edə bilər və ya mövcud xəbərdarlıqları dəyişə bilərik. Faktiki olaraq, biz gələcək pozucu dəyişiklər haqqında proqramçıları bu formada xəbərdar edirik.
* **`unstable_` adı ilə başlayan API-lara.** Bu API-lar eksperimental xüsusiyyətlər üçün işlədilir. Biz bu xüsusiyyətlərin API-larından tam əmin deyilik. Bu xüsusiyyətləri `unstable_` prefiksi ilə dərc edərək biz daha tez iterasiya edə bilir və stabil API-a daha tez çata bilirik.
* **React-in alfa və kanari versiyaların.** React-in yeni xüsusiyyətlərini tez yoxlaya bilmək üçün React-in alfa versiyasını dərc edirik. Lakin, alfa zamanı öyrəndiklərimiz əsasında dəyişiklər etmək lazımdır. Nəzərə alin ki, bu versiyaları işlətdikdə stabil versiyadan öncə API-lar dəyişə bilər.
* **Sənədsiz API-lara və daxili məlumat strukturlarına.** `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` və ya `__reactInternalInstance$uk43rzhitjg` kimi parametrləri işlətdikdə heç bir qarantiya yoxdur. Bu zaman öz başınasınız.

Bu qanun praqmatik olmaq üçün dizayn olunub. Biz sizin üçün baş ağrıları yaratmaq istəmirik. Göstərilən hər dəyişiklik üçün böyük versiyanı artırdıqda biz daha çox böyük versiyalar yaradıb cəmiyyətə daha çox versiya problemləri yaradacaqdıq. Bu, həmçinin bizim React üzərində etdiyimiz proqresimi yavaşladacaq.

Bu siyahıda olan dəyişiklik cəmiyyətdə böyük problem yaradacaqsa, biz bu dəyişiklik üçün tədrici miqrasiya yolu təmin etməyə çalışacağıq.

### If a Minor Release Includes No New Features, Why Isn't It a Patch? {#minors-versus-patches}

It's possible that a minor release will not include new features. [This is allowed by semver](https://semver.org/#spec-item-7), which states **"[a minor version] MAY be incremented if substantial new functionality or improvements are introduced within the private code. It MAY include patch level changes."**

However, it does raise the question of why these releases aren't versioned as patches instead.

The answer is that any change to React (or other software) carries some risk of breaking in unexpected ways. Imagine a scenario where a patch release that fixes one bug accidentally introduces a different bug. This would not only be disruptive to developers, but also harm their confidence in future patch releases. It's especially regrettable if the original fix is for a bug that is rarely encountered in practice.

We have a pretty good track record for keeping React releases free of bugs, but patch releases have an even higher bar for reliability because most developers assume they can be adopted without adverse consequences.

For these reasons, we reserve patch releases only for the most critical bugs and security vulnerabilities.

If a release includes non-essential changes — such as internal refactors, changes to implementation details, performance improvements, or minor bugfixes — we will bump the minor version even when there are no new features.

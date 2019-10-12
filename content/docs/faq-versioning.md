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

### Gradual Upgrades via Warnings {#gradual-upgrades-via-warnings}

Development builds of React include many helpful warnings. Whenever possible, we add warnings in preparation for future breaking changes. That way, if your app has no warnings on the latest release, it will be compatible with the next major release. This allows you to upgrade your apps one component at a time.

Development warnings won't affect the runtime behavior of your app. That way, you can feel confident that your app will behave the same way between the development and production builds -- the only differences are that the production build won't log the warnings and that it is more efficient. (If you ever notice otherwise, please file an issue.)

### What Counts as a Breaking Change? {#what-counts-as-a-breaking-change}

In general, we *don't* bump the major version number for changes to:

* **Development warnings.** Since these don't affect production behavior, we may add new warnings or modify existing warnings in between major versions. In fact, this is what allows us to reliably warn about upcoming breaking changes.
* **APIs starting with `unstable_`.** These are provided as experimental features whose APIs we are not yet confident in. By releasing these with an `unstable_` prefix, we can iterate faster and get to a stable API sooner.
* **Alpha and canary versions of React.** We provide alpha versions of React as a way to test new features early, but we need the flexibility to make changes based on what we learn in the alpha period. If you use these versions, note that APIs may change before the stable release.
* **Undocumented APIs and internal data structures.** If you access internal property names like `__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED` or `__reactInternalInstance$uk43rzhitjg`, there is no warranty.  You are on your own.

This policy is designed to be pragmatic: certainly, we don't want to cause headaches for you. If we bumped the major version for all of these changes, we would end up releasing more major versions and ultimately causing more versioning pain for the community. It would also mean that we can't make progress in improving React as fast as we'd like.

That said, if we expect that a change on this list will cause broad problems in the community, we will still do our best to provide a gradual migration path.

### If a Minor Release Includes No New Features, Why Isn't It a Patch? {#minors-versus-patches}

It's possible that a minor release will not include new features. [This is allowed by semver](https://semver.org/#spec-item-7), which states **"[a minor version] MAY be incremented if substantial new functionality or improvements are introduced within the private code. It MAY include patch level changes."**

However, it does raise the question of why these releases aren't versioned as patches instead.

The answer is that any change to React (or other software) carries some risk of breaking in unexpected ways. Imagine a scenario where a patch release that fixes one bug accidentally introduces a different bug. This would not only be disruptive to developers, but also harm their confidence in future patch releases. It's especially regrettable if the original fix is for a bug that is rarely encountered in practice.

We have a pretty good track record for keeping React releases free of bugs, but patch releases have an even higher bar for reliability because most developers assume they can be adopted without adverse consequences.

For these reasons, we reserve patch releases only for the most critical bugs and security vulnerabilities.

If a release includes non-essential changes — such as internal refactors, changes to implementation details, performance improvements, or minor bugfixes — we will bump the minor version even when there are no new features.

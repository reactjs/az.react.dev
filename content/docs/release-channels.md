---
id: release-channels
title: Buraxılış Kanalları
permalink: docs/release-channels.html
layout: docs
category: installation
prev: cdn-links.html
next: hello-world.html
---

React, çiçəklənən open source cəmiyyətinin göndərdiyi baq hesabatlarına, açdığı pull request-lərə və [təqdim etdiyi RFC-lərə](https://github.com/reactjs/rfcs) arxalanır. Rəyləri təşviq etmək üçün biz buraxılmamış xüsusiyyətlər üçün React-in xüsusi qurulmalarını paylaşırıq.

> Bu sənəddə olan məlumatlar freymvorklar, kitabxanalar və digər developer alətləri üzərində işləyən proqramçılar üçün daha uyğundur. İstifadəçilər üçün applikasiyalar yazan proqramçılar bizim ön buraxılış kanallarımızda baş verən problemlərdən narahat olmamalıdırlar.

React-in hər buraxılış kanalı xüsusi ssenari üçün dizayn olunub:

<<<<<<< HEAD
- [**Latest**](#latest-channel) (Ən Yeni) kanalı React-in stabil, semver buraxılışları üçün işlədilir. React-i NPM-dən yüklədikdə bu kanalda olan qurulmanı əldə edirsiniz. Siz bugünki gündə bu kanaldan istifadə edirsiniz. **İstifadəçilər üçün applikasiyalar yazdıqda bu kanaldan istifadə edin.**
- [**Next**](#next-channel) (Sonrakı) kanalı React kod reposunun master qolunu izləyir. Bu kanalda olan buraxılışların sonrakı kiçik semver buraxılışı üçün buraxılış kandidatı olduğunu fikirləşin. React və 3-cü tərəfin layihələrinin arasında inteqrasiya testi etmək üçün bu kanaldan istifadə edin.
- [**Experimental**](#experimental-channel) (Eksperimental) kanalında stabil buraxılışlarda olmayan eksperimental API-lar və xüsusiyyətlər mövcuddur. Bu kanalın buraxılışları da master qolunu izləyirlər. Lakin, bu kanalda olan buraxılışlarda əlavə xüsusiyyət nişanları yandırılıb. Qarşıda gələn xüsusiyyətləri buraxılmamışdan öncə yoxlamaq üçün bu kanaldan istifadə edin.

Bütün buraxılışların NPM-ə dərc olunmasına baxmayaraq yalnız Latest kanalının buraxılışları [semantik versiyalama](/docs/faq-versioning.html) qaydalarından istifadə edirlər. Ön buraxılışların (Next və Experimental kanallarında olan) versiyaları kontentin həşindən yaranırlar. Məsələn, Next buraxılışı `0.0.0-1022ee0ec` formada, Experimental buraxılışı isə `0.0.0-experimental-1022ee0ec` formada versiyalanır.
=======
- [**Latest**](#latest-channel) is for stable, semver React releases. It's what you get when you install React from npm. This is the channel you're already using today. **Use this for all user-facing React applications.**
- [**Next**](#next-channel) tracks the main branch of the React source code repository. Think of these as release candidates for the next minor semver release. Use this for integration testing between React and third party projects.
- [**Experimental**](#experimental-channel) includes experimental APIs and features that aren't available in the stable releases. These also track the main branch, but with additional feature flags turned on. Use this to try out upcoming features before they are released.

All releases are published to npm, but only Latest uses [semantic versioning](/docs/faq-versioning.html). Prereleases (those in the Next and Experimental channels) have versions generated from a hash of their contents and the commit date, e.g. `0.0.0-68053d940-20210623` for Next and `0.0.0-experimental-68053d940-20210623` for Experimental.
>>>>>>> 7994045415a9066f8663ee5403e874edbb4c5f83

**Latest kanalı istifadəçilər üçün yazılmış applikasiyaları dəstəkləyən tək rəsmi buraxılış kanalıdır**. Next və Experimental buraxılışları test etmə üçün təmin edilir. Bu buraxılışlar arasında davranışların dəyişməyəcəyinə heç bir siğorta yoxdur. Biz bu buraxılışlarda Latest kanalında olan buraxılışlar üçün işlətdiyimiz semver protokulundən istifadə etmirik.

Stabil buraxılışlar üçün istifadə etdiyimiz registry-yə ön buraxılışları dərc edərək NPM iş axınını dəstəkləyən bir çox alətdən ([unpkg](https://unpkg.com) və [CodeSandbox](https://codesandbox.io) kimi) istifadə edə bilirik.

### Latest Kanalı {#latest-channel}

Latest Kanal React-in stabil buraxılışları üçün istifadə edilir. Bu kanal, NPM-də olan `latest` təqə uyğundur. Real istifadəçilər üçün dərc edilən React applikasiyaları üçün bu kanaldan istifadə etməyi tövsiyə edirik.

**Əgər hansı kanaldan istifadə edəcəyinizi bilmirsinizsə, Latest kanalından istifadə edin.** Əgər React proqramçısınızsa, siz artıq bu kanaldan istifadə edirsiniz.

Latest kanalında dərc olunan yeniliklərin son dərəcədə stabil olacağını gözləyə bilərsiniz. Bu kanalda olan buraxılışlar semantik versiya sxemini izləyirlər. Bizim stabillik və inkremental miqrasiya üçün öhdəmiz haqqında əlavə məlumat almaq üçün [versiya qaydaları](/docs/faq-versioning.html) sənədini oxuyun.

### Next Kanalı {#next-channel}

<<<<<<< HEAD
Next Kanalı React reposunun master qolunu izləyən ön buraxılış kanalıdır. Biz, Next kanalında olan ön buraxılışları Latest kanalı üçün buraxılış kandidatları kimi işlədirik. Next kanalının Latest kanalının superset-i olduğunu və tez-tez yeniləndiyini fikirləşin.
=======
The Next channel is a prerelease channel that tracks the main branch of the React repository. We use prereleases in the Next channel as release candidates for the Latest channel. You can think of Next as a superset of Latest that is updated more frequently.
>>>>>>> 7994045415a9066f8663ee5403e874edbb4c5f83

Next və Latest kanallarının ən yeni buraxılışları arasında olan fərqin dərəcəsi iki kiçik semver buraxılışının arasında olan fərqin dərəcəsinə bərabərdir. Lakin, **Next kanalı semantik versiyalama sxemindən istifadə etmir.** Next kanalında olan ardıcıl buraxılışlar arasında sına bilən dəyişikliklərin olacağını gözləyin.

**Ön buraxılışları istifadəçi applikasiyalarında istifadə etməyin.**

<<<<<<< HEAD
Next buraxılışları NPM-də `next` təqi ilə dərc olunurlar. Bu buraxılışların versiyaları qurulma kontentinin həşi əsasında yaranır. Məsələn, `0.0.0-1022ee0ec`.
=======
Releases in Next are published with the `next` tag on npm. Versions are generated from a hash of the build's contents and the commit date, e.g. `0.0.0-68053d940-20210623`.
>>>>>>> 7994045415a9066f8663ee5403e874edbb4c5f83

#### Next Kanalının İnteqrasiya Testi üçün İstifadəsi {#using-the-next-channel-for-integration-testing}

Next kanalı React və digər layihələr arasında inteqrasiya testlərini dəstəkləmək üçün dizayn olunub.

React-də olan bütün dəyişikliklər, dərc olunmadan öncə geniş daxili test etmədən keçirlər. Lakin, React ekosistemində çoxlu mühit və konfiqurasiyaların olduğundan biz bunların hamısını test edə bilmirik.

Əgər siz 3-cü tərəfin React freymvorkunun, kitabxanasının və ya oxşar infrasuktur tipli layihəsinin müəllifisinizsə, siz test dəstinizi React-in ən yeni dəyişiklikləri ilə icra edərək bizə React-i sizin istifadəçiləriniz üçün stabil saxlamağa kömək edə bilərsiniz. Əgər maraqlanırsınızsa, aşağıdakı addımları təqib edin:

- Üstünlük verdiyiniz continuous inteqration platformunda cron iş quraşdırın. Cron işlər [CircleCI](https://circleci.com/docs/2.0/triggers/#scheduled-builds) və [Travis CI](https://docs.travis-ci.com/user/cron-jobs/) platformalarında dəstəklənirlər.
- Cron işində, NPM-də `next` təqindən istifadə edərək React paketlərini Next kanalında olan ən yeni buraxılış ilə yeniləyin. NPM ilə:

  ```
  npm update react@next react-dom@next
  ```

  Yarn ilə:

  ```
  yarn upgrade react@next react-dom@next
  ```
- Test dəstinizi yenilənən paketlər ilə icra edin.
- Əgər testlər keçdisə, əla! Layihənizin React-in sonrakı kiçik versiyası ilə işləyəcəyindən əmin ola bilərsiniz.
- Nəsə sındıqda, [issue yaradaraq](https://github.com/facebook/react/issues) bizə xəbər verin.

Bu iş axınını işlədən layihələrdən biri Next.js-dir. Nümunə kimi, bu layihənin [CircleCI konfiqurasiyasına](https://github.com/zeit/next.js/blob/c0a1c0f93966fe33edd93fb53e5fafb0dcd80a9e/.circleci/config.yml) baxa bilərsiniz.

### Experimental Kanalı {#experimental-channel}

<<<<<<< HEAD
Next kanalında olduğu kimi Experimental kanalı da React reposunun master qolunu izləyən ön buraxılış kanalıdır. Lakin Next-dən fərqli olaraq Experimental buraxılışlarda geniş buraxılış üçün hazır olmayan əlavə xüsusiyyətlər və API-lar mövcuddur.
=======
Like Next, the Experimental channel is a prerelease channel that tracks the main branch of the React repository. Unlike Next, Experimental releases include additional features and APIs that are not ready for wider release.
>>>>>>> 7994045415a9066f8663ee5403e874edbb4c5f83

Adətən, Next-ə edilən yeniliyə müvafiq Experimental yenilik də edilir. Bu yeniliklər eyni kod tətfişi əsasındadır. Lakin, bu buraxılışlar fərqli xüsusiyyət nişanları ilə qurulurlar.

Experimental buraxılışlar Next və Latest buraxılışlarından tam fərqli ola bilərlər. **İstifadəçilər üçün applikasiyalarda Experimental buraxılışlardan istifadə etməyin.**  Experimental kanalın buraxılışları arasında tez-tez sınan dəyişiklərinin olacağını gözləyin.

<<<<<<< HEAD
Experimental buraxılışlar NPM-də `experimental` təqi ilə dərc olunurlar. Bu buraxılışların versiyaları qurulma kontentinin həşi əsasında yaranır. Məsələn, `0.0.0-experimental-1022ee0ec`.
=======
Releases in Experimental are published with the `experimental` tag on npm. Versions are generated from a hash of the build's contents and the commit date, e.g. `0.0.0-experimental-68053d940-20210623`.
>>>>>>> 7994045415a9066f8663ee5403e874edbb4c5f83

#### Experimental Buraxılışına Nələr Daxildir? {#what-goes-into-an-experimental-release}

Hamı üçün dərc olunmağa hazır olmayan və yekunlaşana kimi kəskin dəyişə bilən xüsusiyyətlər eksperimentaldır. Bəzi eksperimentlər heç vaxt yekunlaşmaya bilər. Eksperimentlərin olmasının səbəbi təklif edilən dəyişikliklərin canlılığının yoxlanılmasıdır.

Məsələn, Hooklar elan ediləndə eksperimental kanal olsa idi, bu xüsusiyyət Latest kanalında olmaqdan həftələrlə öncə Experimental kanalında dərc olunacaqdı.

Sizin üçün experimental kanala qarşı inteqrasiya testlərini icra etmək faydalı ola bilər. Bu sizdən asılıdır. Lakin, Experimental buraxılışların Next buraxılışlarından daha da az stabil olduğunu unutmayın. **Biz Experimental buraxılışlar arasında heç bir stabilliyi siğortalamırıq.**

#### Eksperimental Xüsusiyyətlər Haqqında Haradan Öyrənə Bilərəm? {#how-can-i-learn-more-about-experimental-features}

Eksperimental xüsusiyyətlər sənədləşmiş olmaya bilərlər. Adətən, eksperimentlər Next və ya Latest kanallarına daxil olmayana kimi sənədləşdirilmir.

Əgər xüsusiyyət sənədləşməyibsə, bu xüsusiyyətin [RFC-si](https://github.com/reactjs/rfcs) ola bilər.

Yeni eksperimentləri elan etməyə hazır olduqda biz bunları [React bloqunda](/blog) dərc edəcəyik. Lakin, bu demək deyil ki, biz hər eksperimenti elan edəcəyik.

<<<<<<< HEAD
Dəyişikliklərin əhatəli siyahısını görmək üçün bizim ictimati GitHub repomuzun [tarixinə](https://github.com/facebook/react/commits/master) istinad edə bilərsiniz.
=======
You can always refer to our public GitHub repository's [history](https://github.com/facebook/react/commits/main) for a comprehensive list of changes.
>>>>>>> 7994045415a9066f8663ee5403e874edbb4c5f83

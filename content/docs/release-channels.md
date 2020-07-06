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

- [**Latest**](#latest-channel) (Ən Yeni) kanalı React-in stabil, semver buraxılışları üçün işlədilir. React-i NPM-dən yüklədikdə bu kanalda olan qurulmanı əldə edirsiniz. Siz bugünki gündə bu kanaldan istifadə edirsiniz. **İstifadəçilər üçün applikasiyalar yazdıqda bu kanaldan istifadə edin.**
- [**Next**](#next-channel) (Sonrakı) kanalı React kod reposunun master qolunu izləyir. Bu kanalda olan buraxılışların sonrakı kiçik semver buraxılışı üçün buraxılış kandidatı olduğunu fikirləşin. React və 3-cü tərəfin layihələrinin arasında inteqrasiya testi etmək üçün bu kanaldan istifadə edin.
- [**Experimental**](#experimental-channel) (Eksperimental) kanalında stabil buraxılışlarda olmayan eksperimental API-lar və xüsusiyyətlər mövcuddur. Bu kanalın buraxılışları da master qolunu izləyirlər. Lakin, bu kanalda olan buraxılışlarda əlavə xüsusiyyət nişanları yandırılıb. Qarşıda gələn xüsusiyyətləri buraxılmamışdan öncə yoxlamaq üçün bu kanaldan istifadə edin.

Bütün buraxılışların NPM-ə dərc olunmasına baxmayaraq yalnız Latest kanalının buraxılışları [semantik versiyalama](/docs/faq-versioning.html) qaydalarından istifadə edirlər. Ön buraxılışların (Next və Experimental kanallarında olan) versiyaları kontentin həşindən yaranırlar. Məsələn, Next buraxılışı `0.0.0-1022ee0ec` formada, Experimental buraxılışı isə `0.0.0-experimental-1022ee0ec` formada versiyalanır.

**Latest kanalı istifadəçilər üçün yazılmış applikasiyaları dəstəkləyən tək rəsmi buraxılış kanalıdır**. Next və Experimental buraxılışları test etmə üçün təmin edilir. Bu buraxılışlar arasında davranışların dəyişməyəcəyinə heç bir siğorta yoxdur. Biz bu buraxılışlarda Latest kanalında olan buraxılışlar üçün işlətdiyimiz semver protokulundən istifadə etmirik.

Stabil buraxılışlar üçün istifadə etdiyimiz registry-yə ön buraxılışları dərc edərək NPM iş axınını dəstəkləyən bir çox alətdən ([unpkg](https://unpkg.com) və [CodeSandbox](https://codesandbox.io) kimi) istifadə edə bilirik.

### Latest Kanalı {#latest-channel}

Latest Kanal React-in stabil buraxılışları üçün istifadə edilir. Bu kanal, NPM-də olan `latest` təqə uyğundur. Real istifadəçilər üçün dərc edilən React applikasiyaları üçün bu kanaldan istifadə etməyi tövsiyə edirik.

**Əgər hansı kanaldan istifadə edəcəyinizi bilmirsinizsə, Latest kanalından istifadə edin.** Əgər React proqramçısınızsa, siz artıq bu kanaldan istifadə edirsiniz.

Latest kanalında dərc olunan yeniliklərin son dərəcədə stabil olacağını gözləyə bilərsiniz. Bu kanalda olan buraxılışlar semantik versiya sxemini izləyirlər. Bizim stabillik və inkremental miqrasiya üçün öhdəmiz haqqında əlavə məlumat almaq üçün [versiya qaydaları](/docs/faq-versioning.html) sənədini oxuyun.

### Next Kanalı {#next-channel}

Next Kanalı React reposunun master qolunu izləyən ön buraxılış kanalıdır. Biz, Next kanalında olan ön buraxılışları Latest kanalı üçün buraxılış kandidatları kimi işlədirik. Next kanalının Latest kanalının superset-i olduğunu və tez-tez yeniləndiyini fikirləşin.

Next və Latest kanallarının ən yeni buraxılışları arasında olan fərqin dərəcəsi iki kiçik semver buraxılışının arasında olan fərqin dərəcəsinə bərabərdir. Lakin, **Next kanalı semantik versiyalama sxemindən istifadə etmir.** Next kanalında olan ardıcıl buraxılışlar arasında sına bilən dəyişikliklərin olacağını gözləyin.

**Ön buraxılışları istifadəçi applikasiyalarında istifadə etməyin.**

Next buraxılışları NPM-də `next` təqi ilə dərc olunurlar. Bu buraxılışların versiyaları qurulma kontentinin həşi əsasında yaranır. Məsələn, `0.0.0-1022ee0ec`.

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

Next kanalında olduğu kimi Experimental kanalı da React reposunun master qolunu izləyən ön buraxılış kanalıdır. Lakin Next-dən fərqli olaraq Experimental buraxılışlarda geniş buraxılış üçün hazır olmayan əlavə xüsusiyyətlər və API-lar mövcuddur.

Adətən, Next-ə edilən yeniliyə müvafiq Experimental yenilik də edilir. Bu yeniliklər eyni kod tətfişi əsasındadır. Lakin, bu buraxılışlar fərqli xüsusiyyət nişanları ilə qurulurlar.

Experimental buraxılışlar Next və Latest buraxılışlarından tam fərqli ola bilərlər. **İstifadəçilər üçün applikasiyalarda Experimental buraxılışlardan istifadə etməyin.**  Experimental kanalın buraxılışları arasında tez-tez sınan dəyişiklərinin olacağını gözləyin.

Experimental buraxılışlar NPM-də `experimental` təqi ilə dərc olunurlar. Bu buraxılışların versiyaları qurulma kontentinin həşi əsasında yaranır. Məsələn, `0.0.0-experimental-1022ee0ec`.

#### Experimental Buraxılışına Nələr Daxildir? {#what-goes-into-an-experimental-release}

Hamı üçün dərc olunmağa hazır olmayan və yekunlaşana kimi kəskin dəyişə bilən xüsusiyyətlər eksperimentaldır. Bəzi eksperimentlər heç vaxt yekunlaşmaya bilər. Eksperimentlərin olmasının səbəbi təklif edilən dəyişikliklərin canlılığının yoxlanılmasıdır.

Məsələn, Hooklar elan ediləndə eksperimental kanal olsa idi, bu xüsusiyyət Latest kanalında olmaqdan həftələrlə öncə Experimental kanalında dərc olunacaqdı.

Sizin üçün experimental kanala qarşı inteqrasiya testlərini icra etmək faydalı ola bilər. Bu sizdən asılıdır. Lakin, Experimental buraxılışların Next buraxılışlarından daha da az stabil olduğunu unutmayın. **Biz Experimental buraxılışlar arasında heç bir stabilliyi siğortalamırıq.**

#### Eksperimental Xüsusiyyətlər Haqqında Haradan Öyrənə Bilərəm? {#how-can-i-learn-more-about-experimental-features}

Eksperimental xüsusiyyətlər sənədləşmiş olmaya bilərlər. Adətən, eksperimentlər Next və ya Latest kanallarına daxil olmayana kimi sənədləşmirlər.

Əgər xüsusiyyət sənədləşməyibsə, bu xüsusiyyətin [RFC-si](https://github.com/reactjs/rfcs) ola bilər.

Yeni eksperimentləri elan etməyə hazır olduqda biz bunları [React bloqunda](/blog) dərc edəcəyik. Lakin, bu demək deyil ki, biz hər eksperimenti elan edəcəyik.

Dəyişikliklərin əhatəli siyahısını görmək üçün bizim ictimati GitHub repomuzun [tarixinə](https://github.com/facebook/react/commits/master) istinad edə bilərsiniz.

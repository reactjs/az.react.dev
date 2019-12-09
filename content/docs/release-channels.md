---
id: release-channels
title: Buraxılış Kanalları
permalink: docs/release-channels.html
layout: docs
category: installation
---

React, çiçəklənən open source cəmiyyətin göndərdiyi baq hesabatlarına, açdığı pull request-lərə və [təqdim etdiyi RFC-lərə](https://github.com/reactjs/rfcs) arxalanır. Rəyləri təşviq etmək üçün biz buraxılmamış xüsusiyyətlər üçün React-in xüsusi qurulmalarını paylaşırıq.

> Bu sənəd, freymvorklar, kitabxanalar və digər developer alətləri üzərində işləyən proqramçılar üçün daha uyğundur. İstifadəçilər üçün applikasiyalar yazan proqramçılar bizim ön buraxılış kanallarımızda baş verən problemlərdən narahat olmamalıdırlar.

React-in hər buraxılış kanalını xüsusi ssenari üçün dizayn olunub:

- [**Latest**](#latest-channel) (Ən Yeni) kanalı React-in stabil, semver buraxılışları üçün işlədilir. React-i NPM-dən yüklədikdə bu kanalda olan qurulmanı əldə edirsiniz. Siz bügün bu kanaldan istifadə edirsiniz. **İstifadəçilər üçün applikasiyaları yazdıqda bu kanaldan istifadə edin.**
- [**Next**](#next-channel) (Sonrakı) kanal React kod reposunun master qolunu izləyir. Bu kanalda olan buraxılışların sonrakı kiçik semver buraxılışı üçün buraxılış kandidatı olduğunu fikirləşin. React və 3-cü tərəfin layihələrin arasını inteqrasiya test etmək üçün bu kanaldan istifadə edin.
- [**Experimental**](#experimental-channel) (Eksperimental) kanalında stabil buraxılışlarda olmayan eksperimental API-lar və xüsusiyyətlər mövcuddur. Bu kanalın buraxılışları da master qolunu izləyirlər. Lakin, bu kanalda olan buraxılışlarda əlavə xüsusiyyət flaqları yandırılıb. Qarşıda gələn xüsusiyyətləri buraxılmamışdan öncə yoxlamaq üçün bu kanaldan istifadə edin.

Bütün buraxılışların NPM-ə dərc olunmasına baxmayaraq [semantik versiyalama](/docs/faq-versioning.html) qaydalarından yalnız Latest kanalın buraxılışları istifadə edirlər. Ön buraxılışların (Next və Experimental kanallarında olan) versiyaları kontentin həşindən yaranırlar. Məsələn, Next buraxılış `0.0.0-1022ee0ec` formada, Experimental buraxılış isə `0.0.0-experimental-1022ee0ec` formada versiyalanır.

**Ən Yeni kanalı istifadəçilər üçün yazılmış applikasiyaları dəstəkləyən tək rəsmi buraxılış kanalıdır**. Sonrakı və Experimental buraxılışları test etmə üçün təmin edilir. Bu buraxılışlar arasında davranışların dəyişməyəcəyinə heç bir siğorta yoxdur. Biz bu buraxılışlarda Ən Son kanaldakı buraxılışlar üçün işlətdiyimiz semver protokulundən istifadə etmirik.

Stabil buraxılışlar üçün istifadə etdiyimiz registry-yə ön buraxılışları dərc edərək NPM iş axının dəstəkləyən bir çox alətdən ([unpkg](https://unpkg.com) və [CodeSandbox](https://codesandbox.io) kimi) istifadə edə bilirik.

### Latest Kanal {#latest-channel}

Latest Kanal React-in stabil buraxılışları üçün istifadə edilir. Bu kanal, NPM-də olan `latest` təqə uyğundur. Real istifadəçilər üçün dərc edilən React applikasiyaları üçün bu kanaldan istifadə etməyi tövsiyyə edirik.

**Əgər hansı kanaldan istifadə edəcəyinizi bilmirsinizsə, Latest kanaldan istifadə edin.** Əgər React proqramçısınızsa, siz artıq bu kanaldan istifadə edirsiniz.

Latest kanalında dərc olunan yeniliklərin son dərəcədə stabil olacağını gözləyə bilərsiniz. Bu kanalda olan buraxılışlar semantik versiya sxemini izləyirlər. Bizim stabillik və inkremental miqrasiya üçün öhdəmiz haqqında əlavə məlumat almaq üçün [versiya qaydaları](/docs/faq-versioning.html) sənədini oxuyun.

### Next Kanalı {#next-channel}

Next Kanalı React reposunun master qolunu izləyən ön buraxılış kanalıdır. Biz, Next kanalında olan ön buraxılışları Latest kanalı üçün buraxılış kandidatları kimi işlədirik. Next kanalının Latest kanalının superset-i olduğunu və tez-tez yeniləndiyini fikirləşin.

Next və Latest kanallarının ən yeni buraxılışları arasında olan fərqin dərəcəsi iki kiçik semver buraxılışının arasında olan fərqin dərəcəsinə bərabərdir. Lakin, **Next kanalı semantik versiyalamaqdan istifadə etmir.** Next kanalında olan ardıcıl buraxılışlar arasında sına bilən dəyişikliklərin olacağını gözləyin.

**Ön buraxılışları istifadəçi applikasiyalarında istifadə etməyin.**

Next buraxılışları NPM-də `next` təqi ilə dərc olunurlar. Bu buraxılışların versiyaları qurulmanın kontentinin həşi əsasında yaranır. Məsələn, `0.0.0-1022ee0ec`.

#### Next Kanalının İnteqrasiya Testi üçün İstifadəsi {#using-the-next-channel-for-integration-testing}

Next kanalı React və digər layihələr arasında inteqrasiya testlərini dəstəkləmək üçün dizayn olunublar.

React-də olan bütün dəyişikliklər dərc olunmadan öncə geniş daxili test etmədən keçirlər. Lakin, React ekosistemində çoxlu mühit və konfiqurasiyaların olduğundan biz bunların hamısını test edə bilmirik.

Əgər siz 3-cü tərəfin React freymvorkunun, kitabxanasının və ya oxçar infrasuktur tipli layihənin müəllifisinizsə, siz test dəstinizi React-in ən yeni dəyişiklikləri ilə icra edərək bizə React-i sizin istifadəçiləriniz üçün stabil saxlamağa kömək edə bilərsiniz. Əgər maraqlanırsınızsa, aşağıdakı addımları təqib edin:

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

Adətən, Next-ə edilən yeniliyə müvafiq Experimental yenilik də edilir. Bu yeniliklər eyni kod ətfişi əsasındadır. Lakin, bu buraxılışlar fərqli xüsusiyyət flaqları ilə qurulurlar.

Experimental buraxılışlar Next və Latest buraxılışlarından tam fərqli ola bilərlər. **İstifadəçilər üçün applikasiyalarda Experimental buraxılışlardan istifadə etməyin.**  Experimental kanalın buraxılışları arasında tez-tez sınan dəyişiklərinin olacağını gözləyin.

Experimental buraxılışlar NPM-ə `experimental` təqi ilə dərc olunurlar. Bu buraxılışların versiyaları qurumun kontentinin həşi əsasında yaranır. Məsələn, `0.0.0-experimental-1022ee0ec`.

#### What Goes Into an Experimental Release? {#what-goes-into-an-experimental-release}

Experimental features are ones that are not ready to be released to the wider public, and may change drastically before they are finalized. Some experiments may never be finalized -- the reason we have experiments is to test the viability of proposed changes.

For example, if the Experimental channel had existed when we announced Hooks, we would have released Hooks to the Experimental channel weeks before they were available in Latest.

You may find it valuable to run integration tests against Experimental. This is up to you. However, be advised that Experimental is even less stable than Next. **We do not guarantee any stability between Experimental releases.**

#### How Can I Learn More About Experimental Features? {#how-can-i-learn-more-about-experimental-features}

Experimental features may or may not be documented. Usually, experiments aren't documented until they are close to shipping in Next or Stable.

If a feature is not documented, they may be accompanied by an [RFC](https://github.com/reactjs/rfcs).

We will post to the [React blog](/blog) when we're ready to announce new experiments, but that doesn't mean we will publicize every experiment.

You can always refer to our public GitHub repository's [history](https://github.com/facebook/react/commits/master) for a comprehensive list of changes.

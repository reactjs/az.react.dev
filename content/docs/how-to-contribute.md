---
id: how-to-contribute
title: Necə İştirak Etmək
layout: contributing
permalink: docs/how-to-contribute.html
next: codebase-overview.html
redirect_from:
  - "contributing/how-to-contribute.html"
  - "tips/introduction.html"
---

React, Facebook-un aktiv təkmilləşmədə olan və [facebook.com](https://www.facebook.com)-da olan bütün istifadəçilər tərəfindən yüklənilən ilk open source layihələrdən biridir. Biz, bu layihədə iştirak etməyin asan və şəffaf olması üzərində işləyirik. Lakin, biz hələdə istəyimizə tam çatmamışıq. Arzu edirik ki, bu sənəd iştirak etmək prosesini aydınlaşdırır və sizin bəzi suallarınızı cavablandırılır.

<<<<<<< HEAD
### [Davranış Qaydaları](https://github.com/facebook/react/blob/master/CODE_OF_CONDUCT.md) {#code-of-conduct}

Facebook, [Contributor Covenant](https://www.contributor-covenant.org/)-ı öz Davranış Qaydaları kimi adaptasiya etdiyindən biz layihə iştirakçılarının bu qaydalara riayət edəcəyini gözləyirik. Hansı hərəkətlərin dözülüb dözülməyəcəyini anlamaq üçün [bütün mətni](https://github.com/facebook/react/blob/master/CODE_OF_CONDUCT.md) oxumağınız xahiş olunur.
=======
### [Code of Conduct](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md) {#code-of-conduct}

Facebook has adopted the [Contributor Covenant](https://www.contributor-covenant.org/) as its Code of Conduct, and we expect project participants to adhere to it. Please read [the full text](https://github.com/facebook/react/blob/main/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

### Açıq Təkmilləşmə {#open-development}

React üzərində işlənilən bütün işlər [GitHub-da](https://github.com/facebook/react) baş verir. Həm core komandanın üzvlərinin, həm də xarici iştirakçıların pull request-ləri eyni rəy prosesindən keçirilir.

### Semantik Versiyalama {#semantic-versioning}

React, [semantik versiyalamadan](https://semver.org/) istifadə edir. Biz, pəç versiyalarında kritiki baq düzəlişlərini, kiçik versiyalarda yeni xüsusiyyətləri, böyük versiyalarda isə pozucu dəyişiklikləri dərc edirik. Pozucu dəyişiklik olduqda istifadəçilərin gəcələk dəyişikliklərdən xəbəri olmasını və öz kodlarını öncədən miqrasiya etmələri üçün biz kiçik versiyalarda köhnəlmə xəbərdarlıqları əlavə edirik. Bizim stabilliyə və inkremental miqrasiyaya öhdəliyimiz haqqında məlumat almaq üçün [bizim versiya qaydalarımızı](/docs/faq-versioning.html) oxuyun.

<<<<<<< HEAD
Hər bir mühüm dəyişiklik [changelog faylında](https://github.com/facebook/react/blob/master/CHANGELOG.md) sənədləşdirilir.
=======
Every significant change is documented in the [changelog file](https://github.com/facebook/react/blob/main/CHANGELOG.md).
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

### Branch Orqanizasiyası {#branch-organization}

<<<<<<< HEAD
Bütün dəyişiklikləri [`master branch`-inə](https://github.com/facebook/react/tree/master) göndərin. Biz təkmilləşmə və gələcək buraxılışlar üçün ayrı branch-lər işlətmirik. Biz, `master`-in hər zaman yaxşı formada qalması və bütün testlərin keçməsi üçün əlimizdən gələni edirik.

`master`-ə çatan kod ən yeni stabil versiya buraxılışı ilə işləməlidir. Burada, əlavə xüsusiyyətlər ola bilər. Lakin, pozucu dəyişikliklər ola bilməz. Biz `master`-dən istədiyimiz zaman yeni kiçik versiya dərc edə bilməliyik.
=======
Submit all changes directly to the [`main branch`](https://github.com/facebook/react/tree/main). We don't use separate branches for development or for upcoming releases. We do our best to keep `main` in good shape, with all tests passing.

Code that lands in `main` must be compatible with the latest stable release. It may contain additional features, but no breaking changes. We should be able to release a new minor version from the tip of `main` at any time.
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

### Xüsusiyyət Flaqları {#feature-flags}

<<<<<<< HEAD
`master` branch-ini buraxılışa hazır vəziyyətdə saxlaya bilmək üçün bütün pozucu dəyişikliklər və eksperimental xüsusiyyətlər "xüsusiyyət flaqı" ilə gizlədilir.

Xüsusiyyət flaqları [`packages/shared/ReactFeatureFlags.js`](https://github.com/facebook/react/blob/master/packages/shared/ReactFeatureFlags.js) faylında təyin edilir. React-in fərqli qurulmaları fərqli xüsusiyyət flaqlarını aktiv edir. Məsələn, React Native qurulması React DOM qurulmasından fərqli konfiqurasiyada olunur. Bu flaqları [`packages/shared/forks`](https://github.com/facebook/react/tree/master/packages/shared/forks) direktoriyasından tapa bilərsiniz. Xüsusiyyət flaqlarına Flow ilə statik tiplər əlavə edilir. Bu səbəbdən, lazımi faylların yenilənməsini təsdiqləmək üçün `yarn flow` əmrindən istifadə edə bilərsiniz.
=======
To keep the `main` branch in a releasable state, breaking changes and experimental features must be gated behind a feature flag.

Feature flags are defined in [`packages/shared/ReactFeatureFlags.js`](https://github.com/facebook/react/blob/main/packages/shared/ReactFeatureFlags.js). Some builds of React may enable different sets of feature flags; for example, the React Native build may be configured differently than React DOM. These flags are found in [`packages/shared/forks`](https://github.com/facebook/react/tree/main/packages/shared/forks). Feature flags are statically typed by Flow, so you can run `yarn flow` to confirm that you've updated all the necessary files.
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

React-in qurma sistemi React-i dərc etməmişdən öncə deaktiv edilmiş bütün xüsusiyyətləri siləcək. Continuous integration işi hər commit-dən sonra paket ölçüsünü yoxlayır. Siz ölçüdə baş verən dəyişiklik əsasında xüsusiyyətin düzgün gizlədildiyindən əmin ola bilərsiniz.

### Baqlar {#bugs}

#### Bilinən Problemləri Haradan Tapmaq Olar {#where-to-find-known-issues}

Biz açıq baqlar üçün [GitHub Issues-dan](https://github.com/facebook/react/issues) istifadə edirik. Biz bu baqlara yaxından baxır və daxili düzəlişin üzərində işləndiyini zaman bunu göstərməyə çalışırıq. Yeni issue əlavə etmədən öncə probleminizin artıq mövcud olmadığından əmin olun.

#### Yeni Problemlərin Göndərilməsi {#reporting-new-issues}

Baqınızın düzəldilməsinin ən yaxşı yolu baq üçün kiçik demo göstərməkdir. Başlanğıc üçün bu [JSFiddle şablonundan](https://jsfiddle.net/Luktwrdm/) istifadə edə bilərsiniz.

#### Təhlükəsizlik Baqları {#security-bugs}

Təhlükəsizlik baqlarının təhlükəsiz şəkildə bildirilməsi üçün Facebook-un [bounty proqramı](https://www.facebook.com/whitehat/) var. Bunu nəzərə alaraq xahiş edirik ki, təhlükəsizlik baqlarını açıq issue kimi göndərməyin. Baqları səhifədə göstərilən proses ilə göndərin.

### Bizimlə Əlaqə {#how-to-get-in-touch}

* IRC: [freenode-da #reactjs](https://webchat.freenode.net/?channels=reactjs)
* [Müzakirə Forumları](/community/support.html#popular-discussion-forums)

Əgər sizə React ilə bağlı kömək lazımdırsa, bizim [React istifadəçilərindən ibarət olan Discord çat platformasında yerləşən cəmiyyətimizə](https://www.reactiflux.com/) müraciət edə bilərsiniz.

### Dəyişikliyi Təklif Edin {#proposing-a-change}

Açıq API-ı dəyişmək və ya tətbiqə kiçik olmayan dəyişikliklər etmək istəyirsinizsə, biz [issue göndərməyi](https://github.com/facebook/react/issues/new) tövsiyyə edirik. Burada, təklifiniz üzərində çox zəhmət çəkmədən öncə bir razılığa gəlməyimiz mümkündür.

Əgər baq düzəlişi edirsinizsə, yalnız PR göndərə bilərsiniz. Lakin, biz yenə də nəyi düzəltdiyiniz haqqında issue göndərməyi tövsiyyə edirik. Bu, sizin düzəlişinizi qəbul etmədiyimiz amma yenə də problemi izləmək istədiyimiz hallar üçün faydalıdır.

### İlk Pull Request {#your-first-pull-request}

İlk Pull Request-iniz üzərində işləyirsiniz? Bunu necə etmək haqqında öyrənmək istəyirsinizsə, göstərilən pulsuz video seriyasına baxa bilərsiniz:

<<<<<<< HEAD
**[Github-da Yerləşən Open Source Layihələrdə Necə İştirak Etmək Olar](https://app.egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)**
=======
**[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)**
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

Sizi bizim iştirak etmək prosesimiz ilə tanış etmək üçün məhdudlu əhatə dairəsi olan baqlardan ibarət **[yaxşı ilk problemlər](https://github.com/facebook/react/issues?q=is:open+is:issue+label:"good+first+issue")** siyahımıza baxmağı tövsiyyə edirik.

Problemi düzəltmək istədiyiniz zaman kiminsə düzəliş üzərində işlədiyini bilmək üçün kommentləri oxuyun. Əgər düzəliş üzərində heç kim işləmirsə, bunun üzərində işləmək istədiyinizi komment ilə bildirin ki, başqaları sizin zəhmətinizin kopiyasını etməsinlər.

Əgər kimsə problemi götürdükdən sonra iki həftə ərzində heç bir yenilik etməyibsə, siz bu issue-nu özünüzə götürə bilərsiniz. Lakin, yenə də bunun üzərində işləmək istədiyinizi komment ilə bildirməyi unutmayın.

### Pull Request-in Göndərilməsi {#sending-a-pull-request}

Pull request-ləri core komandası izləyir. Biz, sizin pull request-inizə baxıb ya PR-ı biləşdirəcək, ya bu PR-a dəyişikliklərin ediləcəyini bildirəcək, yada ki bu PR-ı izahatlı bağlayacağıq. API dəyişiklikləri olduqda biz Facebook.com-da daxili düzəlişlər etməli ola bilərik. Bu səbəbdən bu biraz vaxt ala bilər. Biz yeniliklər verməyə və proses zamanı rəylərimi bildirməyə çalışacağıq.

**Pull request göndərməmişdən öncə** aşağıdakı addımları atmağınızı xahiş edirik:

<<<<<<< HEAD
1. [repo-nu](https://github.com/facebook/react) fork edib `master`-dən branch yaradın.
2. Repo-nun ana direktoriyasından `yarn` əmrini çağırın.
3. Əgər baq düzəlişi etmisinizsə və ya test edilməli kod əlavə etmisinizsə, testlər əlavə edin!
4. Test dəstinin uğurlu keçdiyindən əmin olun (`yarn test`). Məsləhət: Təkmilləşmə zamanı `yarn test --watch TestName` formalı əmr çağırmaq faydalıdır.
5. Testləri produksiya mühitində yoxlamaq üçün `yarn test --prod` əmrini icra edin.
6. Əgər sizə debaqqer lazımdırsa, `yarn debug-test --watch TestName` əmrini icra edin, `chrome://inspect` səhifəsini açın və "Inspect" düyməsini tıklayın.
7. Kodunuzu [prettier](https://github.com/prettier/prettier) ilə format edin (`yarn prettier`).
8. Kodunuzun lint olduğundan əmin olun (`yarn lint`). Məsləhət: yalnız dəyişən faylları yoxlamaq üçün `yarn linc` əmrini icra edin.
9. [Flow](https://flowtype.org/) tip yoxlamalarını icra edin (`yarn flow`).
10. CLA-i doldurun (əgər etməmisinizsə).
=======
1. Fork [the repository](https://github.com/facebook/react) and create your branch from `main`.
2. Run `yarn` in the repository root.
3. If you've fixed a bug or added code that should be tested, add tests!
4. Ensure the test suite passes (`yarn test`). Tip: `yarn test --watch TestName` is helpful in development.
5. Run `yarn test --prod` to test in the production environment.
6. If you need a debugger, run `yarn debug-test --watch TestName`, open `chrome://inspect`, and press "Inspect".
7. Format your code with [prettier](https://github.com/prettier/prettier) (`yarn prettier`).
8. Make sure your code lints (`yarn lint`). Tip: `yarn linc` to only check changed files.
9. Run the [Flow](https://flowtype.org/) typechecks (`yarn flow`).
10. If you haven't already, complete the CLA.
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

### İştirakçı Lisenziyası Müqaviləsi (CLA) {#contributor-license-agreement-cla}

Pull request-i qəbul edə bilməmiz üçün CLA-ı imzalamanız lazımdır. Siz bunu bir dəfə etməlisiniz. Əgər Facebook-un digər open source layihəsində imzalamısınızsa, sizə yenidən imzalamaq lazım deyil. Əgər pull request-i ilk dəfə göndərirsinizsə, CLA-i doldurduğunuzu bizə bildirin ki, biz müqaviləni sizin Github istifadəçi adınız ilə yoxlaya bilək.

**[CLA-i buradan doldurun.](https://code.facebook.com/cla)**

### İştirak Etmək üçün Ön Şərtlər {#contribution-prerequisites}

<<<<<<< HEAD
* [Node](https://nodejs.org)-un v8.0.0+ versiyasını və [Yarn](https://yarnpkg.com/en/)-ın v1.2.0+ versiyasını yükləyin.
* [JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html)-i yükləyin.
* `gcc`-in yükləndiyinizdən və ya lazım olduqda kompilyatoru yükləməkdə probleminizin olmadığından əmin olun. Bəzi asılılıqlara kompilyasiya addımı lazım ola bilər. macOS-da Xcode Command Line Tools-u yükləmək bəsdir. Ubuntu-da `apt-get install build-essential` əmri ilə lazımi paketləri yükləyə bilərsiniz. Digər Linux disto-larında buna oxşar əmrlər var. Windows-da bir neçə əlavə addım etmək lazımdır. Əlavə məlumat üçün [`node-gyp`-nin yükləmə təlimatlarına baxın](https://github.com/nodejs/node-gyp#installation).
* Git ilə tanışlığınız olmalıdır.
=======
* You have [Node](https://nodejs.org) installed at LTS and [Yarn](https://yarnpkg.com/en/) at v1.2.0+.
* You have [JDK](https://www.oracle.com/technetwork/java/javase/downloads/index.html) installed.
* You have `gcc` installed or are comfortable installing a compiler if needed. Some of our dependencies may require a compilation step. On OS X, the Xcode Command Line Tools will cover this. On Ubuntu, `apt-get install build-essential` will install the required packages. Similar commands should work on other Linux distros. Windows will require some additional steps, see the [`node-gyp` installation instructions](https://github.com/nodejs/node-gyp#installation) for details.
* You are familiar with Git.
>>>>>>> 3ff6fe871c6212118991ffafa5503358194489a0

### Təkmilləşmə İş Axını {#development-workflow}

React-i clone etdikdən sonra `yarn` əmrini çağıraraq asılılıqları yükləyin.
Bundan sonra bir neçə əmri icra edə bilərsiniz:

* `yarn lint` kod stilini yoxlayır.
* `yarn linc` əmri `yarn lint` əmrinə bənzəyir, amma yalnız branch-də dəyişən faylları yoxladığından daha tez işləyir.
* `yarn test` bütün test dəstini yoxlayır.
* `yarn test --watch` interaktiv test gözətçisini başladır.
* `yarn test --prod` əmri, testləri produksiya mühitində icra edir. Bu əmr `yarn test` əmri ilə eyni parametrləri dəstəkləyir.
* `yarn test <pattern>` fayl adları uyğun gələn testləri icra edir.
* `yarn debug-test` əmri debaqqeri olan `yarn test` əmridir. `chrome://inspect` səhifəsini açıb "Inspect" düyməsini tıklayın.
* `yarn flow` əmri [Flow](https://flowtype.org/) tip yoxlamalarını başladır.
* `yarn build` əmri bütün paketləri saxlayan `build` direktoriyasını yaradır.
* `yarn build react/index,react-dom/index --type=UMD` əmri React və ReactDOM üçün UMD qurmalarını yaradır.

Dəyişikliyiniz zamanı heç bir reqressiyaların olmaması üçün `yarn test` (və ya yuxarıdakı variasiyalarını) icra etməyi tövsiyyə edirik. Lakin, React qurulmasını real layihədə işlətmək də faydalı ola bilər.

İlk öncə, `yarn build` əmrini icra edin. Bu, qurulan paketləri `build` direktoriyasında, npm paketlərini isə `build/packages` direktoriyasında yaradacaq.

Dəyişiklikləri yoxlamağın ən asan yolu `yarn build react/index,react-dom/index --type=UMD` əmrini çağırıb `fixtures/packaging/babel-standalone/dev.html` səhifəsini açmaqdır. Bu fayl, `build` direktoriyasında olan `react.development.js` faylından istifadə edir.

Dəyişiklikləri mövcud React layihəsində sınamaq istədikdə `build/node_modules/react/umd/react.development.js`, `build/node_modules/react-dom/umd/react-dom.development.js` və digər qurulma məhsullarını applikasiyaya köçürüb stabil versiyalar əvəzinə bu versiyaları işlədin.

Əgər layihənizdə React-i npm-dən yükləyirsinizsə, siz `react` və `react-dom` asılılıqlarını silib `yarn link` ilə bu asılılıqlar lokal `build` direktoriyasına yönləndirin. Nəzərə alın ki, **qurulma zamanı `--type=UMD` əvəzinə `--type=NODE` parametrindən istifadə etməlisiniz. Əlavə olaraq `scheduler` paketini də quraşdırmalısınız:

```sh
cd ~/path_to_your_react_clone/
yarn build react/index,react/jsx,react-dom/index,scheduler --type=NODE

cd build/node_modules/react
yarn link
cd build/node_modules/react-dom
yarn link

cd ~/path/to/your/project
yarn link react react-dom
```

`yarn build` əmrini React direktoriyasında icra etdikdə yeni versiyalar layihənin `node_modules` direktoriyasında görünəcək. Siz, layihənizi bu dəyişikliklər ilə yenidən qurun.

Əgər hər hansı bir paket əskikdirsə (məsələn, layihənizdə `react-dom/server` işlədirsinizsə), siz `yarn build` ilə tam qurulma əməliyyatını icra edə bilərsiniz. Nəzərə alın ki `yarn build` əmrini parametrlərsiz icra etdikdə bu əmr uzun zaman çəkə bilər.

Biz, yeni xüsusiyyətlər üçün pull request-də testlərin olmasını tələb edirik. Bu yol ilə, biz gələcəkdə sizin kodunuzun sınmayacağını təmin edə bilirik.

### Stil Təlimatları {#style-guide}

Biz, [Prettier](https://prettier.io/) adlı avtomatik kod format edicisindən istifadə edirik.
Kodunuza etdiyiniz dəyişikliklərdən sonra `yarn prettier` əmrini çağırın.

Sonra, kodunuzda olan bir çox problemləri tuta biləcək.
Kod stilinini statusunu yoxlamaq üçün `yarn linc` əmrini icra edin.

Lakin, bəzi stilləri linter tutmaya bilər. Əgər nədənsə əmin deyilsinizsə, [Airbnb-nin Stil Təlimatlarına](https://github.com/airbnb/javascript) baxın.

### Kommentlər üçün Sorğu (RFC) {#request-for-comments-rfc}

Baq düzəlişləri və sənəd təkmilləşdirmələri daxil olmaqla bir çox dəyişiklikləri normal Github pull request iş axını ilə tətbiq edib yoxlamaq mümkündür.

Lakin, bəzi dəyişikliklərin daha böyük ola bildiyindən biz bunların xüsusi dizayn prosesindən keçməsini və React core komandasında razılıq yaratmasını istəyə bilərik.

"RFC" (ingiliscə, request for comments; kommentlər üçün sorğu) prosesi yeni xüsusiyyətlərin layihəyə daxil olması üçün ardıcıl və idarə olunan yoldur. Siz, ["rfcs" repo-sunda](https://github.com/reactjs/rfcs) iştirak edə bilərsiniz.

### Lisenziya {#license}

React layihəsində iştirak etdikdə siz bütün tövfələrinizin MIT lisenziyası ilə lisenziyalanması ilə razılaşırsınız.

### Sırada Nə Var? {#what-next}

Kodun necə orqanizə olduğu haqqda öyrənmək üçün [sonrakı bölməni](/docs/codebase-overview.html) oxuyun.

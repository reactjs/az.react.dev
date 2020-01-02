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

React, Facebook-un aktiv təkmilləşmədə olan və [facebook.com](https://www.facebook.com)-da olan hamı üçün işlədilən ilk open source layihələrdən biridir. Biz, bu layihədə iştirak etməyin asan və şəffaf olması üzərində işləyirik. Lakin, biz hələdə istədiyimizə çatmamışıq. Arzu edirik ki, bu sənəd iştirak etmək prosesini aydınlaşdırır və sizin bəzi suallarınızı cavablandırılır.

### [Davranış Qaydaları](https://github.com/facebook/react/blob/master/CODE_OF_CONDUCT.md) {#code-of-conduct}

Facebook, [Contributor Covenant](https://www.contributor-covenant.org/)-ı öz Davranış Qaydaları kimi adaptasiya edib və biz layihə iştirakçılarının bu qaydalara riayət edəcəyini gözləyirik. Hansı hərəkətlərin dözülüb dözülməyəcəyini anlamaq üçün [bütün mətni](https://github.com/facebook/react/blob/master/CODE_OF_CONDUCT.md) ozumağınız xahiş olunur.

### Açıq Təkmilləşmə {#open-development}

React-də baş verən bütün işlər [GitHub-da](https://github.com/facebook/react) baş verir. Həm core komandanın üzvlərinin, həm də xarici iştirakçıların pull request-ləri eyni rəy prosesindən keçir.

### Semantik Veresiyalama {#semantic-versioning}

React, [semantik versiyalamadan](https://semver.org/) istifadə edir. Biz, pəç versiyalarda kritiki baq düzəlişlərini, kiçik versiyalarda yeni xüsusiyyətləri və böyük versiyalarda pozucu dəyişiklikləri dərc edirik. Pozucu dəyişiklik olduqda, istifadəçilərin gəcələk dəyişikliklərdən xəbəri olmasını və öz kodlarını öncədən miqrasiya etmələri üçün biz kiçik versiyalarda köhnəlmə xəbərdarlıqları əlavə edirik. Bizim stabilliyə və inkremental miqrasiyaya öhdəliyimiz haqqında məlumat üçün [bizim versiya qaydalarımızı](https://reactjs.org/docs/faq-versioning.html) oxuyun.

Every significant change is documented in the [changelog file](https://github.com/facebook/react/blob/master/CHANGELOG.md).

### Branch Orqanizasiyası {#branch-organization}

Bütün dəyişiklikləri [`master branch`-inə](https://github.com/facebook/react/tree/master) göndərin. Biz təkmilləşmə və gələcək buraxılışlar üçün ayrı branch-lər işlətmirik. Biz, `master`-in hər zaman yaxşı formada qalması və bütün testlərin keçməsi üçün əlimizdən gələni edirik.

`master`-ə çatan kod ən yeni stabil versiya buraxılış ilə işləməlidir. Burada, əlavə xüsusiyyətlər ola bilər. Lakin, pozucu dəyişikliklər ola bilməz. Biz `master`-dən istədiyimiz zaman yeni kiçik versiya dərc edə bilməliyik.

### Xüsusiyyət Flaqları {#feature-flags}

`master` branch-ini buraxılışa hazır vəziyyətdə saxlaya bilmək üçün bütün pozucu dəyişikliklər və eksperimental xüsusiyyətlər "xüsusiyyət flaqı" ilə gizlənirlər.

Xüsusiyyət flaqları [`packages/shared/ReactFeatureFlags.js`](https://github.com/facebook/react/blob/master/packages/shared/ReactFeatureFlags.js) faylda təyin edilir. React-in fərqli qurulmaları fərqli xüsusiyyət flaqlarını aktiv edir. Məsələn, React Native qurulması React DOM qurulmasından fərqli konfiqurasiya olunur. Bu flaqları [`packages/shared/forks`](https://github.com/facebook/react/tree/master/packages/shared/forks) direktoriyadan tapa bilərsiniz. Xüsusiyyət flaqlarına Flow ilə statik tiplər əlavə edilir. Bu səbəbdən, lazımi faylların yenilənməsini təsdiqləmək üçün `yarn flow` əmrindən istifadə edə bilərsiniz.

React-in qurma sistemi bütün deaktik edilmiş xüsusiyyətləri dərc etməmişdən öncə siləcək. Continuous integration işi hər commit-dən sonra paket ölçüsünü yoxlayır. Siz ölçüdə baş verən dəyişiklik əsasında xüsusiyyətin düzgün gizlədildiyindən əmin ola bilərsiniz.

### Baqlar {#bugs}

#### Bilinən Problemləri Haradan Tapmaq Olar {#where-to-find-known-issues}

Biz açıq baqlar üçün [GitHub Issues-dan](https://github.com/facebook/react/issues) istifadə edirik. Biz bu baqlara yazından baxir və daxili düzəlişin üzərində işləndiyini zaman bunu göstərməyə çalışırıq. Yeni issue əlavə etmədən öncə sizin probleminizin olmadığından əmin olun.

#### Yeni Problemlərin Göndərilməsi {#reporting-new-issues}

Baqınızın düzəldilməsinin ən yaxşı yolu kiçildilmiş test göstərməkdir. Başlanğıc üçün bu [JSFiddle şablonundan](https://jsfiddle.net/Luktwrdm/) istifadə edin.

#### Təhlükəsizlik Baqları {#security-bugs}

Təhlükəsizlik baqlarının təhlükəsiz şəkildə bildirilməsi üçün Facebook-un [bounty proqramı](https://www.facebook.com/whitehat/) var. Bunu nəzərə alaraq xahiş edirik ki, təhlükəsizlik baqlarını açıq issue kimi göndərməyin. Problemi səhifədə göstərilən proses ilə göndərin.

### Bizimlə Əlaqə {#how-to-get-in-touch}

* IRC: [freenode-da #reactjs](https://webchat.freenode.net/?channels=reactjs)
* [Müzakirə Forumları](https://reactjs.org/community/support.html#popular-discussion-forums)

Əgər sizə React-dən kömək lazımdırsa, bizim [React istifadəçilərindən ibarət olan Discord çat platformasında yerləşən cəmiyyətimiz](https://www.reactiflux.com/) var.

### Dəyişikliyi Təklif Edin {#proposing-a-change}

Açıq API-ı dəyişmək və ya tətbiqə kiçik olmayan dəyişikliklər etmək istəyirsinizsə, biz [issue göndərməyi](https://github.com/facebook/react/issues/new) tövsiyyə edirik. Burada, təklifiniz üzərində çox zəhmət çəkmədən öncə bir razılığa gəlməyimiz mümkündür.

Əgər baq düzəlişi deirsinizsə, yalnız PR göndərə bilərsiniz. Lakin, biz yenə də nəyi düzəltdiyiniz haqqında issue göndərməyi tövsiyyə edirik. Bu, sizin düzəlişinizi qəbul etmədiyimiz amma yenə də problemi işləmək istədiyimiz hallar üçün faydalıdır.

### İlk Pull Request-iniz {#your-first-pull-request}

İlk Pull Request-iniz üzərində işləyirsiniz? Bunu necə etmək haqqında aşağıda göstərilən pulsuz video seriyasından istifadə edə bilərsiniz:

**[Github-da Yerləşən Open Source Layihələrdə Necə İştirak Etmək Olar](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)**

Sizi bizim iştirak etmək prosesimiz ilə tanış etmək üçün məhdudlu scope-u olan baqlardan ibarət **[yaxşı ilk problemlər](https://github.com/facebook/react/issues?q=is:open+is:issue+label:"good+first+issue")** siyahımıza baxmağı tövsiyyə edirik.

Problemi düzəltmək istədiyiniz zaman kiminsə düzəliş üzərində işlədiyini bilmək üçün kommentləri oxuyun. Əgər düzəliş üzərində heç kim işləmirsə, bunun üzərində işləyəcəyiniz komment ilə bildirin ki, başqaları sizin zəhmətinizin kopiyasını etməsinlər.

Əgər kimsə problemi götürür, amma iki həftə ərzində heç bir yenilik etmirsə, bu issue-nu özünüzə götürə bilərsiniz. Lakin, yenə də komment işləyəcəyiniz haqqda komment yazmağı unutmayın.

### Pull Request-in Göndərilməsi {#sending-a-pull-request}

Pull request-ləri core komandası işləyir. Biz, sizin pull request-inizə baxıb ya PR-ı biləşdirəcək, ya bu PR-a dəyişikliklərin ediləcəyini bildirəcək, yada ki bu PR-ı izahatlı bağlayacağıq. API dəyişiklikləri olduqda biz Facebook.com-da daxili düzəlişlər etməli ola bilərik. Bu səbəbdən bu biraz vaxt ala bilər. Biz yeniliklər verməyə və proses zamanı rəylərimi bildirməyə çalışacağıq.

**Pull request göndərməmişdən öncə,** aşağıdakı addımları atmağınızı xahiş edirik:

1. [repo-nu](https://github.com/facebook/react) fork edib branch-inizi `master`-dən yaradın.
2. Repo-nun ana direktoriyasından `yarn` əmrini çağırın.
3. Əgər baq düzəlişi etmisinizsə və ya test edilməli kod əlavə etmisinizsə, testlər əlavə edin!
4. Test dəstinin keçdiyindən əmin olun (`yarn test`). Məsləhət: Təkmilləşmə zamanı `yarn test --watch TestName` formalı əmr çağırmaq faydalıdır.
5. Testləri produksiya mühitində yoxlamaq üçün `yarn test-prod` əmrini icra edin. Bu əmr, `yarn test` ilə eyni parametrləri dəstəkləyir.
6. Əgər sizə debaqqer lazımdırsa, `yarn debug-test --watch TestName` əmrini icra edin, `chrome://inspect` səhifəsini açın və "Inspect" düyməsini tıklayın.
7. Kodunuzu [prettier](https://github.com/prettier/prettier) ilə format edin (`yarn prettier`).
8. Kodunuzun lint olduğundan əmin olun (`yarn lint`). Məsləhət: yalnız dəyişən faylları yoxlamaq üçün `yarn linc` əmrini icra edin.
9. [Flow](https://flowtype.org/) tip yoxlamalarını icra edin (`yarn flow`).
10. CLA-ı doldurun (əgər etməmisinizsə).

### Contributor License Agreement (CLA) {#contributor-license-agreement-cla}

In order to accept your pull request, we need you to submit a CLA. You only need to do this once, so if you've done this for another Facebook open source project, you're good to go. If you are submitting a pull request for the first time, just let us know that you have completed the CLA and we can cross-check with your GitHub username.

**[Complete your CLA here.](https://code.facebook.com/cla)**

### Contribution Prerequisites {#contribution-prerequisites}

* You have [Node](https://nodejs.org) installed at v8.0.0+ and [Yarn](https://yarnpkg.com/en/) at v1.2.0+.
* You have `gcc` installed or are comfortable installing a compiler if needed. Some of our dependencies may require a compilation step. On OS X, the Xcode Command Line Tools will cover this. On Ubuntu, `apt-get install build-essential` will install the required packages. Similar commands should work on other Linux distros. Windows will require some additional steps, see the [`node-gyp` installation instructions](https://github.com/nodejs/node-gyp#installation) for details.
* You are familiar with Git.

### Development Workflow {#development-workflow}

After cloning React, run `yarn` to fetch its dependencies.
Then, you can run several commands:

* `yarn lint` checks the code style.
* `yarn linc` is like `yarn lint` but faster because it only checks files that differ in your branch.
* `yarn test` runs the complete test suite.
* `yarn test --watch` runs an interactive test watcher.
* `yarn test <pattern>` runs tests with matching filenames.
* `yarn test-prod` runs tests in the production environment. It supports all the same options as `yarn test`.
* `yarn debug-test` is just like `yarn test` but with a debugger. Open `chrome://inspect` and press "Inspect".
* `yarn flow` runs the [Flow](https://flowtype.org/) typechecks.
* `yarn build` creates a `build` folder with all the packages.
* `yarn build react/index,react-dom/index --type=UMD` creates UMD builds of just React and ReactDOM.

We recommend running `yarn test` (or its variations above) to make sure you don't introduce any regressions as you work on your change. However it can be handy to try your build of React in a real project.

First, run `yarn build`. This will produce pre-built bundles in `build` folder, as well as prepare npm packages inside `build/packages`.

The easiest way to try your changes is to run `yarn build react/index,react-dom/index --type=UMD` and then open `fixtures/packaging/babel-standalone/dev.html`. This file already uses `react.development.js` from the `build` folder so it will pick up your changes.

If you want to try your changes in your existing React project, you may copy `build/dist/react.development.js`, `build/dist/react-dom.development.js`, or any other build products into your app and use them instead of the stable version. If your project uses React from npm, you may delete `react` and `react-dom` in its dependencies and use `yarn link` to point them to your local `build` folder:

```sh
cd ~/path_to_your_react_clone/build/node_modules/react
yarn link
cd ~/path_to_your_react_clone/build/node_modules/react-dom
yarn link
cd /path/to/your/project
yarn link react react-dom
```

Every time you run `yarn build` in the React folder, the updated versions will appear in your project's `node_modules`. You can then rebuild your project to try your changes.

We still require that your pull request contains unit tests for any new functionality. This way we can ensure that we don't break your code in the future.

### Style Guide {#style-guide}

We use an automatic code formatter called [Prettier](https://prettier.io/).
Run `yarn prettier` after making any changes to the code.

Then, our linter will catch most issues that may exist in your code.
You can check the status of your code styling by simply running `yarn linc`.

However, there are still some styles that the linter cannot pick up. If you are unsure about something, looking at [Airbnb's Style Guide](https://github.com/airbnb/javascript) will guide you in the right direction.

### Introductory Video {#introductory-video}

You may be interested in watching [this short video](https://www.youtube.com/watch?v=wUpPsEcGsg8) (26 mins) which gives an introduction on how to contribute to React.

#### Video highlights: {#video-highlights}
- [4:12](https://youtu.be/wUpPsEcGsg8?t=4m12s) - Building and testing React locally
- [6:07](https://youtu.be/wUpPsEcGsg8?t=6m7s) - Creating and sending pull requests
- [8:25](https://youtu.be/wUpPsEcGsg8?t=8m25s) - Organizing code
- [14:43](https://youtu.be/wUpPsEcGsg8?t=14m43s) - React npm registry
- [19:15](https://youtu.be/wUpPsEcGsg8?t=19m15s) - Adding new React features

For a realistic overview of what it _feels_ like to contribute to React for the first time, check out [this entertaining ReactNYC talk](https://www.youtube.com/watch?v=GWCcZ6fnpn4).

### Request for Comments (RFC) {#request-for-comments-rfc}

Many changes, including bug fixes and documentation improvements can be implemented and reviewed via the normal GitHub pull request workflow.

Some changes though are "substantial", and we ask that these be put through a bit of a design process and produce a consensus among the React core team.

The "RFC" (request for comments) process is intended to provide a consistent and controlled path for new features to enter the project. You can contribute by visiting the [rfcs repository](https://github.com/reactjs/rfcs).

### License {#license}

By contributing to React, you agree that your contributions will be licensed under its MIT license.

### What Next? {#what-next}

Read the [next section](/docs/codebase-overview.html) to learn how the codebase is organized.

---
id: create-a-new-react-app
title: Yeni React Applikasiyası Yarat
permalink: docs/create-a-new-react-app.html
redirect_from:
  - "docs/add-react-to-a-new-app.html"
prev: add-react-to-a-website.html
next: cdn-links.html
---

Ən yaxşı istifadəçi və developer təcrübəsi üçün inteqrasiya olunmuş toolchain-dən istifadə edin.

Bu səhifə göstərilən məsələləri həll etməyə kömək edən React toolchain-lərindən danışır:

* Çoxlu fayllara və komponenlərə böyümə.
* NPM-dən kitabxanaların işlədilməsi.
* Çox yaranan səhvlərin erkən tapılması.
* Development-də CSS və JS-in canlı redaktə edilməsi.
* Production üçün nəticənin optimallaşdırılması.

Bu səhifədə tövsiyyə olunan toolchain-lər **başlamaq üçün konfiqurasiya tələb etmir**.

## Size Toolchain Lazım Olmaya Bilər {#you-might-not-need-a-toolchain}

Əgər siz yuxarıda göstərilən problemlər ilə qarşılaşmırsınızsa və ya JavaScript  alətlərindən istifadə etmək istəmirsinizsə [React-i `<script>` təqi ilə HTML səhifəsinə əlavə etməyi](/docs/add-react-to-a-website.html) (fakultativ olaraq [JSX ilə](/docs/add-react-to-a-website.html#optional-try-react-with-jsx)) tövsiyyə edirik.

Bu həmçinin **React-i mövcud veb səhifəsinə əlavə etməyin ən asan yoludur.** Siz hər zaman faydalı gördüyünüz halda daha böyük toolchain əlavə edə bilərsiniz!

## Tövsiyyə Edilən Toolchain-lər {#recommended-toolchains}

React komandası əsasən aşağıdaki həlləri tövsiyyə edir:

- Əgər **React-i öyrənirsinizsə** və ya **[tək-səhifəli](/docs/glossary.html#single-page-application) applikasiya yaradırsınızsa,** [Create React App-dən](#create-react-app) istifadə edin.
- Əgər **Node.js ilə server tərəfindən render edilmiş veb səhifə yaradırsınızsa** try [Next.js-dən](#nextjs) istifadə edin.
- Əgər **statik kontent əsasında qurulmuş veb səhifə yaradırsınızsa,** [Gatsby-dən](#gatsby) istifadə edin.
- Əgər **komponent kitabxanası yaradırsınızsa** və ya **mövcud koda inteqrasiya edirsinizsə**, [Daha Elasktik Toolchain-lərdən](#more-flexible-toolchains) istifadə edin.

### Create React App {#create-react-app}

[Create React App](https://github.com/facebookincubator/create-react-app), **React-i öyrənmək üçün** və React-də **yeni [tək-səhifəli](/docs/glossary.html#single-page-application) applikasiya** yaratmaq üçün çox rahat mühit təmin edir.

Bu sizə ən son JavaScript xüsusiyyətlərini istifadə etmək üçün development mühiti yaradır, yaxşı developer təcrübəsi ilə proqramçıları təmin edir, və applikasiyanı produksiya üçün optimallaşdırır. Bu toolchain Node >= 8.10 və npm >= 5.6 tələb edir. Layihə yaratmaq üçün aşağıdaki əmri icra edin:

```bash
npx create-react-app my-app
cd my-app
npm start
```

>Qeyd
>
>İlk sətrdəki `npx` səhv deyil -- bu [npm 5.2+ ilə gələn paket icra edən alətdir](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

Create React App backend məntiqi və ya verilənlər bazası idarə etmir; bu yalnız frontend üçün yaranma konveyeri yaradır. Siz bunu istədiyiniz backend ilə işlədə bilərsiniz. Pərdə arxasında bu toolchain-in [Babel](https://babeljs.io/) və [webpack](https://webpack.js.org/) işlətməsinə baxmayaraq siz bu alətlər haqqında heç nə bilməyə bilərsiniz.

Applikasiyanı produksiyaya yerləşdirməya hazır olduqda, `npm run build` əmri  applikasiyanın produksiya üçün optimallaşmış versiyasını `build` direktoriyasında yaradacaq. Create React App haqqında əlavə məlumat üçün [README faylınını](https://github.com/facebookincubator/create-react-app#create-react-app--) və ya [İstifadəçi Dərsliyini](https://facebook.github.io/create-react-app/) oxuyun.

### Next.js {#nextjs}

React-də **statik və server ilə render edilmiş applikasiyaları** yaratmq üqçün populyar və yüngül freymvorklardan biri [Next.js-dir](https://nextjs.org/). Bu freymvork **stilləmə və routing həlləri ilə** hazır gəlir. Bu toolchain server mühitində [Node.js](https://nodejs.org/) işlətdiyinizi fərz edir.

Next.js haqqında əlavə məlumat üçün [rəsmi dərsliyə](https://nextjs.org/learn/) baxın.

### Gatsby {#gatsby}

React-də **statik veb səhifə** yaratmaq üçün ən yaxşı yol [Gatsby](https://www.gatsbyjs.org/) işlətməkdir. Bu toolchain React komponentlərindən istifadə edir. Lakin son nəticədə əvvəlcədən render olunmuş HTML və CSS faylları yaradaraq ən təz yükləmə sürətinin olacağını qarantiyalayır.

Gatsby haqqında öyrənmək üçün [rəsmi sənədlərinə](https://www.gatsbyjs.org/docs/) və [start kitlər qalereyasına](https://www.gatsbyjs.org/docs/gatsby-starters/) baxın.

### Daha Elastik Toolchain-lər {#more-flexible-toolchains}

Ağağıda göstərilən toolchain-lər daha çox seçim və elasiklik təklif edirlər. Biz bunları daha təcrübəli istifadəçilərə tövsiyyə edirik:

- **[Neutrino](https://neutrinojs.org/)** [webpack-in](https://webpack.js.org/) gücünü əvvəlcədən hazırlanmış şablonların sadəliyi ilə birləşdirir. Bu alət, [React applikasiyaları](https://neutrinojs.org/packages/react/) və [React komponentləri](https://neutrinojs.org/packages/react-components/) üçün şablonlar təmin edir.

- **[nwb](https://github.com/insin/nwb)** [React komponentlərini npm-ə dərc etməyi üçün](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#developing-react-components-and-libraries-with-nwb) asanlaşdırır. Bu aləti React applikasiyalarında [işlətmək də](https://github.com/insin/nwb/blob/master/docs/guides/ReactApps.md#developing-react-apps-with-nwb) mümkündür.

- **[Parcel](https://parceljs.org/)** [React ilə işlənə bilən](https://parceljs.org/recipes.html#react) çevik və sıfır konfiqurasiyalı veb applikasiya paketləyənidir.

- **[Razzle](https://github.com/jaredpalmer/razzle)** konfiqurasiya tələb etməyən server ilə render etmə freymvorkdur. Bu framevork Next.js-dən daha elastikdir.

## Sıfırdan Toolchain Yaratmaq {#creating-a-toolchain-from-scratch}

JavaScript yaratma toolchain-u aşağıdaki elementlərdən ibarətdir:

* [Yarn](https://yarnpkg.com/) və ya [npm](https://www.npmjs.com/) kimi **paket meneceri**. Bu sizə paketlərdən ibarət olan çox böyük ekosistemdən faydlanmağa və paketləri yükləməyə və ya yeniləməyə icazə verir.

* [webpack](https://webpack.js.org/) və ya [Parcel](https://parceljs.org/) kimi **paketləmə qurğuları**. Bu sizə modulyar kod yazmağa və modulları kiçik paketlərə paketləyib yükləmə zamanını optimallaşdırmağa imkan yaradır.

* [Babel](https://babeljs.io/) kimi **kompilyator**. Bu sizə köhnə brauzerlərdə işləyən modern JavaScript kodu yazmağa imkan yaradır.

Əgər öz JavaScript toolchain-ini quraşdırmağa üstünlük verirsinizsə, Create React App-in bəzi funksiyalarını yenidən yaradan [bu yazını oxuyun](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658).

Xüsusi toolchain-in [produksiya üçün düzgün quraşdırıldığından](/docs/optimizing-performance.html#use-the-production-build) əmin olun.

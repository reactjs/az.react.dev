---
id: create-a-new-react-app
title: Yeni React Applikasiyası Yarat
permalink: docs/create-a-new-react-app.html
redirect_from:
  - "docs/add-react-to-a-new-app.html"
prev: add-react-to-a-website.html
next: cdn-links.html
---

Ən yaxşı istifadəçi və developer təcrübəsi üçün inteqrasiya olunmuş toolchain istifadə edin.

Bu səhifə, göstərilən məsələləri həll etməyə kömək edən React toolchain-lərindən danışır:

* Çoxlu fayllara və komponentlərə böyümə.
* NPM-dən kitabxanaların işlədilməsi.
* Çox yaranan səhvlərin erkən tapılması.
* Development-də CSS və JS-in canlı redaktə edilməsi.
* Produksiya üçün nəticənin optimallaşdırılması.

Bu səhifədə tövsiyyə olunan toolchain-lər **heç bir konfiqurasiya tələb etmir**.

## Sizə Toolchain Lazım Olmaya Bilər {#you-might-not-need-a-toolchain}

Əgər yuxarıda göstərilən problemlər ilə qarşılaşmır və ya JavaScript alətlərindən istifadə etmək istəmirsinizsə [React-i HTML səhifəsinə `<script>` təqi ilə əlavə etməyi](/docs/add-react-to-a-website.html) (fakultativ olaraq [JSX ilə](/docs/add-react-to-a-website.html#optional-try-react-with-jsx)) tövsiyyə edirik.

Bu, **React-i mövcud veb səhifəsinə əlavə etməyin ən asan yoludur.** Siz, faydalı gördüyünüz halda istədiyiniz zaman daha böyük toolchain əlavə edə bilərsiniz!

## Tövsiyyə Edilən Toolchain-lər {#recommended-toolchains}

React komandası əsasən aşağıdaki həlləri tövsiyyə edir:

- **React-i öyrənmək** və ya **[tək-səhifəli](/docs/glossary.html#single-page-application) applikasiya yaratmaq üçün** [Create React App-dən](#create-react-app) istifadə edin.
- **Node.js ilə server tərəfindən render edilmiş veb səhifə yaratmaq üçün** [Next.js-dən](#nextjs) istifadə edin.
- **Statik kontent əsasında qurulmuş veb səhifə yaratmaq üçün** [Gatsby-dən](#gatsby) istifadə edin.
- **Komponent kitabxanası yaratmaq** və ya **mövcud koda React inteqrasiya etmək üçün** [Daha Elasktik Toolchain-lərdən](#more-flexible-toolchains) istifadə edin.

### Create React App {#create-react-app}

[Create React App](https://github.com/facebookincubator/create-react-app), **React-i öyrənmək** və React-də **yeni [tək-səhifəli](/docs/glossary.html#single-page-application) applikasiya** yaratmaq üçün çox rahat mühit təmin edir.

Bu alət ən son JavaScript xüsusiyyətlərini istifadə etmək üçün development mühiti yaradır, yaxşı developer təcrübəsi ilə proqramçıları təmin edir, və applikasiyanı produksiya üçün optimallaşdırır. Bu aləti işlətmək üçün Node >= 8.10 və npm >= 5.6 tələb edilir. Layihə yaratmaq üçün göstərilən əmri icra edin:

```bash
npx create-react-app my-app
cd my-app
npm start
```

>Qeyd
>
>İlk sətrdə yazılan `npx` səhv deyil -- bu [npm 5.2+ ilə gələn paket icra edən alətdir](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).

Create React App backend məntiqi və ya verilənlər bazası idarə etmir; bu yalnız frontend üçün yaratma konveyeri (build pipeline) yaradır. Siz bunu istədiyiniz backend ilə işlədə bilərsiniz. Bu toolchain pərdə arxasında [Babel](https://babeljs.io/) və [webpack](https://webpack.js.org/) işlədir. Lakin siz bu alətlər haqqında heç nə bilməyə bilərsiniz.

Applikasiyanı produksiyaya yerləşdirməya hazır olduqda `npm run build` əmri, applikasiyanın produksiya üçün optimallaşmış versiyasını `build` direktoriyasında yaradacaq. Create React App haqqında əlavə məlumat üçün [README faylınını](https://github.com/facebookincubator/create-react-app#create-react-app--) və ya [İstifadəçi Dərsliyini](https://facebook.github.io/create-react-app/) oxuyun.

### Next.js {#nextjs}

React-də **statik və server ilə render edilmiş applikasiyalar** yaratmaq üçün populyar və yüngül freymvorklardan biri [Next.js-dir](https://nextjs.org/). Bu freymvork **stilləmə və routing həlləri ilə** hazır gəlir. Bu toolchain server mühitində [Node.js](https://nodejs.org/) işlətdiyinizi fərz edir.

Next.js haqqında əlavə məlumat üçün [rəsmi dərsliyə](https://nextjs.org/learn/) baxın.

### Gatsby {#gatsby}

React-də **statik veb səhifə** yaratmaq üçün ən yaxşı yol [Gatsby](https://www.gatsbyjs.org/) işlətməkdir. Bu toolchain React komponentlərindən istifadə edir. Lakin son nəticədə əvvəlcədən render olunmuş HTML və CSS faylları yaradaraq ən təz yükləmə sürətinin olacağını qarantiyalayır.

Gatsby haqqında öyrənmək üçün [rəsmi sənədlərə](https://www.gatsbyjs.org/docs/) və [start kitlər qalereyasına](https://www.gatsbyjs.org/docs/gatsby-starters/) baxın.

### Daha Elastik Toolchain-lər {#more-flexible-toolchains}

Aşağıda göstərilən toolchain-lər daha çox seçim və elastiklik təklif edirlər. Biz bu alətləri daha təcrübəli istifadəçilərə tövsiyyə edirik:

- **[Neutrino](https://neutrinojs.org/)** aləti [webpack-in](https://webpack.js.org/) gücünü əvvəlcədən hazırlanmış şablonların sadəliyi ilə birləşdirir. Bu alət, [React applikasiyaları](https://neutrinojs.org/packages/react/) və [React komponentləri](https://neutrinojs.org/packages/react-components/) üçün şablonlar təmin edir.

- **[nwb](https://github.com/insin/nwb)** [React komponentlərini npm-ə dərc etməyi](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#developing-react-components-and-libraries-with-nwb) asanlaşdırır. Bu aləti React applikasiyalarında [işlətmək də](https://github.com/insin/nwb/blob/master/docs/guides/ReactApps.md#developing-react-apps-with-nwb) mümkündür.

- **[Parcel](https://parceljs.org/)** [React ilə işlənə bilən](https://parceljs.org/recipes.html#react) çevik və sıfır konfiqurasiyalı veb applikasiya paketləyənidir.

- **[Razzle](https://github.com/jaredpalmer/razzle)** konfiqurasiya tələb etməyən server ilə render etmə freymvorkdur. Bu framevork Next.js-dən daha elastikdir.

## Sıfırdan Toolchain Yaratmaq {#creating-a-toolchain-from-scratch}

JavaScript yaratma toolchain-i aşağıdaki elementlərdən ibarətdir:

* [Yarn](https://yarnpkg.com/) və ya [npm](https://www.npmjs.com/) kimi **paket meneceri**. Bu mecerlər paketlərdən ibarət olan çox böyük ekosistemdən faydalanmağa və paketləri yükləməyə və ya yeniləməyə imkan yaradır.

* [webpack](https://webpack.js.org/) və ya [Parcel](https://parceljs.org/) kimi **paketləmə qurğuları**. Bu qurğular modulyar kodun yazılmasına və modulları kiçik paketlərə paketləyib yükləmə zamanını optimallaşdırılmasına imkan yaradır.

* [Babel](https://babeljs.io/) kimi **kompilyator**. Bu kompilyator ilə köhnə brauzerlərdə işləyən modern JavaScript kodu yazmaq mümkündür.

Əgər öz JavaScript toolchain-inizi quraşdırmağa üstünlük verirsinizsə Create React App-in bəzi funksiyalarını yenidən tətbiq edən [bu yazını oxuyun](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658).

Xüsusi toolchain-in [produksiya üçün düzgün quraşdırıldığından](/docs/optimizing-performance.html#use-the-production-build) əmin olun.

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
- Əgər **komponent kitabxanası yaradırsınızsa** və ya **mövcud koda inteqrasiya edirsinizsə**, [Daha Əyilgən Toolchain-lərdən](#more-flexible-toolchains) istifadə edin.

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

[Next.js](https://nextjs.org/) is a popular and lightweight framework for **static and server‑rendered applications** built with React. It includes **styling and routing solutions** out of the box, and assumes that you're using [Node.js](https://nodejs.org/) as the server environment.

Learn Next.js from [its official guide](https://nextjs.org/learn/).

### Gatsby {#gatsby}

[Gatsby](https://www.gatsbyjs.org/) is the best way to create **static websites** with React. It lets you use React components, but outputs pre-rendered HTML and CSS to guarantee the fastest load time.

Learn Gatsby from [its official guide](https://www.gatsbyjs.org/docs/) and a [gallery of starter kits](https://www.gatsbyjs.org/docs/gatsby-starters/).

### More Flexible Toolchains {#more-flexible-toolchains}

The following toolchains offer more flexibility and choice. We recommend them to more experienced users:

- **[Neutrino](https://neutrinojs.org/)** combines the power of [webpack](https://webpack.js.org/) with the simplicity of presets, and includes a preset for [React apps](https://neutrinojs.org/packages/react/) and [React components](https://neutrinojs.org/packages/react-components/).

- **[nwb](https://github.com/insin/nwb)** is particularly great for [publishing React components for npm](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#developing-react-components-and-libraries-with-nwb). It [can be used](https://github.com/insin/nwb/blob/master/docs/guides/ReactApps.md#developing-react-apps-with-nwb) for creating React apps, too. 

- **[Parcel](https://parceljs.org/)** is a fast, zero configuration web application bundler that [works with React](https://parceljs.org/recipes.html#react).

- **[Razzle](https://github.com/jaredpalmer/razzle)** is a server-rendering framework that doesn't require any configuration, but offers more flexibility than Next.js.

## Creating a Toolchain from Scratch {#creating-a-toolchain-from-scratch}

A JavaScript build toolchain typically consists of:

* A **package manager**, such as [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/). It lets you take advantage of a vast ecosystem of third-party packages, and easily install or update them.

* A **bundler**, such as [webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/). It lets you write modular code and bundle it together into small packages to optimize load time.

* A **compiler** such as [Babel](https://babeljs.io/). It lets you write modern JavaScript code that still works in older browsers.

If you prefer to set up your own JavaScript toolchain from scratch, [check out this guide](https://blog.usejournal.com/creating-a-react-app-from-scratch-f3c693b84658) that re-creates some of the Create React App functionality.

Don't forget to ensure your custom toolchain [is correctly set up for production](/docs/optimizing-performance.html#use-the-production-build).

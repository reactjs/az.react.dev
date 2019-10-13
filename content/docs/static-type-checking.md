---
id: static-type-checking
title: Statik Tip Yoxlamaları
permalink: docs/static-type-checking.html
---

[Flow](https://flow.org/) və [TypeScript](https://www.typescriptlang.org/) statik tip yoxlayıcıları kod icra olunmamışdan öncə bəzi problemləri tapa bilir. Bu alətlər avtomatik tamamlama kimi xüsusiyyətləri əlavə edərək proqramçı iş axının təkmiləşdirir. Bu səbəbdən, böyük kodlarda `PropTypes` əvəzinə Flow və ya Typescript işlətməyi tövsiyyə edirik.

## Flow {#flow}

[Flow](https://flow.org/) JavaScript kodu üçün statik tip yoxlayıcısıdır. Bu alət Facebook tərəfindən yaradılıb və React ilə çox işlənilir. Bu, sizə dəyişənləri, funksiyaları və React komponentlərini xüsusi tip sintaksisi ilə annotasiya edərək xətaları tez tutmağa imkan yaradır. Əsasları öyrənmək üçün [Flow-a giriş](https://flow.org/en/docs/getting-started/) sənədini oxuya bilərsiniz.

Flow-nu işlətmək üçün:

* Flow-nu layihə asılılığı kimi əlavə edin.
* Kompilyasiya edilən kodda Flow sintaksisinin silindiyindən əmin olun.
* Tip annotasiyalarını əlavə edin və Flow-nu çağıraraq bu tipləri yoxlayın.

Aşağıda bu addımlar detallı başa salınır.

### Flow=nu Layihəyə Əlavə Et {#adding-flow-to-a-project}

İlk olaraq, terminaldan layihə direktoriyasına naviqasiya edin. Sonra, aşağıdakı əmri icra edin:

[Yarn](https://yarnpkg.com/) işlədirsinizsə:

```bash
yarn add --dev flow-bin
```

[npm](https://www.npmjs.com/) işlədirsinizsə:

```bash
npm install --save-dev flow-bin
```

Bu əmr layihənizə Flow-un ən son versiyasını yükləyir.

İndi, `flow` əmrini `package.json` faylının  `"scripts"` bölməsinə əlavə edin:

```js{4}
{
  // ...
  "scripts": {
    "flow": "flow",
    // ...
  },
  // ...
}
```

Ən sonda, aşağıdakı əmri icra edin:

[Yarn](https://yarnpkg.com/) işlədirsinizsə:

```bash
yarn run flow init
```

[npm](https://www.npmjs.com/) işlədirsinizsə:

```bash
npm run flow init
```

Bu əmr Flow konfiqurasiya faylı yaradacaq. Bu faylı reponuza commit edin.

### Flow Sintaksisinin Kompilyasiya Olunan Koddan Silinməsi {#stripping-flow-syntax-from-the-compiled-code}

Flow, tip annotasiyaları üçün JavaScript dilini xüsusi sintaksis ilə artırır. Lakin, brauzerlərin bu sintaksisdən xəbəri olmadığından bu sintaksisin brauzerə göndərilən, kompilyasiya olunan JavaScript paketində olmadığından əmin olmalıyıq.

Bunu etməyin yolu JavaScript-i kompilyasiya etmək üçün işlətdiyiniz alətlərdən asılıdır.

#### Create React App {#create-react-app}

Əgər layihəniz [Create React App](https://github.com/facebookincubator/create-react-app) ilə qurulubsa, təbrik edirik! Flow annotasiyaları kompilyasiya zamanı silindiyindən heç nə etmək lazım deyil.

#### Babel {#babel}

>Qeyd:
>
>Bu təlimatlar Create React App istifadəçiləri üçün *nəzərdə tutulmayıb*. Create React App-in Babel işlətdiyinə baxmayaraq Flow-nu anlaması artıq konfiqurasiya olunub. Yalnız Create React App *işlətmədikdə* bu bölmədə olan təlimatları təqib edin.

Layihəyə Babel əl ilə quraşdırıldıqda, Flow üçün xüsusi preset yükləmək lazımdır.

Yarn işlədirsinizsə:

```bash
yarn add --dev @babel/preset-flow
```

npm işlədirsinizsə:

```bash
npm install --save-dev @babel/preset-flow
```

Sonra, `flow` presetini [Babel konfiqurasiyasına](https://babeljs.io/docs/usage/babelrc/) əlavə edin. Məsələn, Babel-ı `.babelrc` faylı ilə konfiqurasiya etdikdə, fayl aşağıdakı formada ola bilər:

```js{3}
{
  "presets": [
    "@babel/preset-flow",
    "react"
  ]
}
```

Bu, kodunuzda Flow sintaksisi işlətməyə imkan yaradacaq.

>Qeyd:
>
>Flow, `react` presetini işlədilməsini tələb etmir. Lakin, adətən bu iki preset birlikdə işlənir. Flow təklikdə JSX sintaksisini anlayır.

#### Digər Qurulmalar {#other-build-setups}

Create React App və ya Babel işlətmədikdə [flow-remove-types](https://github.com/flowtype/flow-remove-types) paketindən istifadə edərək tip annotasiyalarını silə bilərsiniz.

### Flow-un İcrası {#running-flow}

Yuxarıdakı təlimatları sıra ilə təqib etmisinizsə, artıq Flow-nu işlədə biləcəksiniz.

Yarn işlədirsinizsə:
```bash
yarn flow
```

npm işlədirsinizsə:

```bash
npm run flow
```

Əmrin nəticəsində aşağıdakı formada mesaj görəcəksiniz:

```
No errors!
✨  Done in 0.17s.
```

### Flow Tip Annotasiyalarının Əlavəsi {#adding-flow-type-annotations}

Adətən, Flow, yalnız göstərilən annotasiya olan faylları yoxlayır:

```js
// @flow
```

Adətən bu annotasiya faylın tam üstündə əlavə olunur. Bəzi fayllara bu annotasiyanı əlavə edib `yarn flow` və ya `npm run flow` əmrlərini icra edərək Flow-nun səhv tapdığına baxın.

Annotasiyanın olmasından asılı olmayaraq Flow-nun *bütün* faylları yoxlaması üçün [bu parametrdən](https://flow.org/en/docs/config/options/#toc-all-boolean) istifadə edə bilərsiniz. Bu parametr mövcud layihələr üçün çox səhv göstərdiyindən çətin ola bilər. Lakin, yeni layihədə tipləri Flow ilə annotasiya etmək istəyirsinizsə, bu parametrdən istifadə etmək faydalı ola bilər.

İndi Flow tam işləyir! Flow haqqında əlavə məlumat üçün aşağıdakı resurslara baxın:

* [Flow Sənədləri: Tip Annotasiyaları](https://flow.org/en/docs/types/)
* [Flow Sənədləri: Redaktorlar](https://flow.org/en/docs/editors/)
* [Flow Sənədləri: React](https://flow.org/en/docs/react/)
* [Flow ilə Lintinq](https://medium.com/flow-type/linting-in-flow-7709d7a7e969)

## TypeScript {#typescript}

[TypeScript](https://www.typescriptlang.org/), Microsoft tərəfindən yaranmış proqramlaşdırma dilidir. Bu dil JavaScript-in üzərindən qurulub və öz kompilyatoru ilə gəlir. TypeScript tipli dil olduğundan xətalar və baqlar qurulma zamanı tutula bilir. React ilə TypeScript işlətməyi haqqında [buradan](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter) oxuya bilərsiniz.

TypeScript işlətmək üçün:
* TypeScript-i layihə asılılığı kimi əlavə edin.
* TypeScript kompilyator parametrlərini konfiqurasiya edin
* Düzgün fayl genişləmnəsindən istifadə edin
* İşlədilən kitabxanalar üçün tip tərifləri əlavə edin

Gəlin, bu addımlara detallı baxaq.

### Create React App ilə TypeScript-in İşlədilməsi {#using-typescript-with-create-react-app}

Create React App ilə TypeScript konfiqurasiyasız işləyir.

TypeScript dəstəkləyən **yeni layihə** üçün aşağıdakı əmri icra edin:

```bash
npx create-react-app my-app --typescript
```

TypeScript-i **mövcud Create React App layihəsinə də** əlavə edə bilərsiniz. [Sənədlərə baxın](https://facebook.github.io/create-react-app/docs/adding-typescript).

>Qeyd:
>
>Create React App işədirsinizsə, **bu səhifənin qalanının üzərindən atlaya bilərsiniz**. Burada, TypeScript-in əl ilə qurulması izah edilir. Buradakı təlimatlar Create React App istifadəçilərinə şamil edilmir.

### Layihəyə TypeScript Əlavə Etmək {#adding-typescript-to-a-project}

Proses, terminaldan aşağıdakı əmri icra etmək ilə başlayır.

[Yarn](https://yarnpkg.com/) işlədirsinizsə:

```bash
yarn add --dev typescript
```

[npm](https://www.npmjs.com/) işlədirsinizsə:

```bash
npm install --save-dev typescript
```

Təbrik edirik! Siz layihənizə TypeScript-in ən sonuncu versiyasını yüklədiniz. TypeScript-i yüklədikdə `tsc` əmrindən istifadə edə bilirik. Konfiqurasiya etməkdən öncə `package.json` faylının "scripts" bölməsinə `tsc` əmrini əlavə edin:

```js{4}
{
  // ...
  "scripts": {
    "build": "tsc",
    // ...
  },
  // ...
}
```

### TypeScript Kompilyatorunun Konfiqurasiyası {#configuring-the-typescript-compiler}

Kompilyatora nə etdiyiniz demədikdə bizim üçün heç bir xeyri olmayacaq. Bu qaydalar `tsconfig.json` adlı xüsusi faylda teyin edilir. Faylı yaratmaq üçün aşağıdakı əmrləri icra edin.

[Yarn](https://yarnpkg.com/) işlədirsinizsə:

```bash
yarn run tsc --init
```

[npm](https://www.npmjs.com/) işlədirsinizsə:

```bash
npx tsc --init
```

Yeni yaranmış `tsconfig.json` faylında bir çox parametrlər ilə kompilyatoru konfiqurasiya etmək mümkündür. Parametrlərin dərin izahatı üçün [bu sənədə](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) baxın.

Bir çox parametrin arasından `rootDir` və `outDir` parametrinə baxaq. Kompilyator typescript fayllarını qəbul edib javascript faylları yaratmalıdır. Lakin, biz mənbə faylları və yaranmış nəticələri qarışdırmaq istəmirik.

Biz bunu iki addım ilə həll edəcəyik:

* İlk olaraq, layihə strukturunu aşağıdakı formada düzəldəcəyik. Bütün mənbə fayllarını `src` direktoriyasında saxlayacağıq.

```
├── package.json
├── src
│   └── index.ts
└── tsconfig.json
```

* Sonra, mənbə fayllarının və yaranacaq nəticənin harada olduğunu kompilyatora göstərəcəyik.

```js{6,7}
// tsconfig.json

{
  "compilerOptions": {
    // ...
    "rootDir": "src",
    "outDir": "build"
    // ...
  },
}
```

Əla! İndi "build" skriptini icra etdikdə kompilyator yaranacaq javascript faylları `build/` direktoriyasına əlavə edəcək. [TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter/blob/master/tsconfig.json) paketi, başlamaq üçün yaxşı qaydalar olan `tsconfig.json` faylı təmin edir.

Adətən, yaranmış javascript faylını mənbə kontrolunda (source control) saxlamağı tövsiyyə etmirik. Bu səbəbdən, `build/` direktoriyasını `.gitignore`-a əlavə edin.

### Fayl genişləmələri {#file-extensions}

Adətən React komponentləri `.js` faylında saxlanılır. TypeScript-də isə iki fayl geniləməsi var:

Standart fayl genişləməsi `.ts`-dir. `.tsx` isə `JSX` olan fayllar üçün istifadə edilir.

### TypeScript-in İcra Olunması {#running-typescript}

Yuxarıdakı təlimatları sıra ilə təqib etmisinizsə, artıq TypeScript-i işlədə biləcəksiniz.

Yarn işlədirsinizsə:

```bash
yarn build
```

npm işlədirsinizsə:

```bash
npm run build
```

Əgər nəticə görmürsünzüsə, TypeScript əməliyyatı uğurla başa çatdı.

### Tip Tərifləri {#type-definitions}

To be able to show errors and hints from other packages, the compiler relies on declaration files. A declaration file provides all the type information about a library. This enables us to use javascript libraries like those on npm in our project. 

There are two main ways to get declarations for a library:

__Bundled__ - The library bundles its own declaration file. This is great for us, since all we need to do is install the library, and we can use it right away. To check if a library has bundled types, look for an `index.d.ts` file in the project. Some libraries will have it specified in their `package.json` under the `typings` or `types` field.

__[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)__ - DefinitelyTyped is a huge repository of declarations for libraries that don't bundle a declaration file. The declarations are crowd-sourced and managed by Microsoft and open source contributors. React for example doesn't bundle its own declaration file. Instead we can get it from DefinitelyTyped. To do so enter this command in your terminal.

```bash
# yarn
yarn add --dev @types/react

# npm
npm i --save-dev @types/react
```

__Local Declarations__
Sometimes the package that you want to use doesn't bundle declarations nor is it available on DefinitelyTyped. In that case, we can have a local declaration file. To do this, create a `declarations.d.ts` file in the root of your source directory. A simple declaration could look like this:

```typescript
declare module 'querystring' {
  export function stringify(val: object): string
  export function parse(val: string): object
}
```

You are now ready to code! We recommend to check out the following resources to learn more about TypeScript:

* [TypeScript Documentation: Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)
* [TypeScript Documentation: Migrating from Javascript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
* [TypeScript Documentation: React and Webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)

## Reason {#reason}

[Reason](https://reasonml.github.io/) is not a new language; it's a new syntax and toolchain powered by the battle-tested language, [OCaml](https://ocaml.org/). Reason gives OCaml a familiar syntax geared toward JavaScript programmers, and caters to the existing NPM/Yarn workflow folks already know.

Reason is developed at Facebook, and is used in some of its products like Messenger. It is still somewhat experimental but it has [dedicated React bindings](https://reasonml.github.io/reason-react/) maintained by Facebook and a [vibrant community](https://reasonml.github.io/docs/en/community.html).

## Kotlin {#kotlin}

[Kotlin](https://kotlinlang.org/) is a statically typed language developed by JetBrains. Its target platforms include the JVM, Android, LLVM, and [JavaScript](https://kotlinlang.org/docs/reference/js-overview.html). 

JetBrains develops and maintains several tools specifically for the React community: [React bindings](https://github.com/JetBrains/kotlin-wrappers) as well as [Create React Kotlin App](https://github.com/JetBrains/create-react-kotlin-app). The latter helps you start building React apps with Kotlin with no build configuration.

## Other Languages {#other-languages}

Note there are other statically typed languages that compile to JavaScript and are thus React compatible. For example, [F#/Fable](https://fable.io/) with [elmish-react](https://elmish.github.io/react). Check out their respective sites for more information, and feel free to add more statically typed languages that work with React to this page!

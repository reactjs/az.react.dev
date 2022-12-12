---
id: static-type-checking
title: Statik Tip Yoxlamaları
permalink: docs/static-type-checking.html
---

[Flow](https://flow.org/) və [TypeScript](https://www.typescriptlang.org/) statik tip yoxlayıcıları ilə kod icra olunmamışdan öncə bəzi problemlərin tapılması mümkündür. Əlavə olaraq, bu alətlər avtomatik tamamlama kimi xüsusiyyətlər əlavə edərək proqramçı iş axının təkmiləşdirir. Bu səbəbdən, böyük kodlarda `PropTypes` əvəzinə Flow və ya Typescript işlətməyi tövsiyə edirik.

## Flow {#flow}

[Flow](https://flow.org/), JavaScript kodu üçün statik tip yoxlayıcısıdır. Bu alət, Facebook tərəfindən yaradılıb və React ilə çox işlənilir. Bu, dəyişənləri, funksiyaları və React komponentlərini xüsusi tip sintaksisi ilə annotasiya edərək xətaların tez tutulmasına imkan yaradır. Əsasları öyrənmək üçün [Flow-a giriş](https://flow.org/en/docs/getting-started/) sənədini oxuya bilərsiniz.

Flow-nu işlətmək üçün:

* Flow-nu layihə asılılığı kimi əlavə edin.
* Kompilyasiya edilən kodda Flow sintaksisinin silindiyindən əmin olun.
* Tip annotasiyalarını əlavə edib Flow-nu çağıraraq bu tipləri yoxlayın.

Bu addımlar aşağıdalı bölmələrdə detallı başa salınır.

### Flow-nu Layihəyə Əlavə Et {#adding-flow-to-a-project}

İlk olaraq, terminaldan layihə direktoriyasına naviqasiya edin. Sonra, aşağıdakı əmri icra edin:

[Yarn](https://yarnpkg.com/) işlədirsinizsə:

```bash
yarn add --dev flow-bin
```

[npm](https://www.npmjs.com/) işlədirsinizsə:

```bash
npm install --save-dev flow-bin
```

Bu əmr, Flow-un ən son versiyasını layihəyə yükləyir.

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

Yaranan Flow konfiqurasiya faylını reponuza commit edin.

### Flow Sintaksisinin Kompilyasiya Olunan Koddan Silinməsi {#stripping-flow-syntax-from-the-compiled-code}

Flow, tip annotasiyaları üçün JavaScript dilinə xüsusi sintaksis əlavə edir. Lakin, brauzerlərin bu sintaksisı anlamadığından, bu sintaksis brauzerə göndərilən, kompilyasiya olunan JavaScript paketindən silinməlidir.

Bu sintaksisin silinməsi JavaScript-i kompilyasiyası edən alətdən asılıdır.

#### Create React App {#create-react-app}

Əgər layihəniz [Create React App](https://github.com/facebookincubator/create-react-app) ilə qurulubsa, təbrik edirik! Kompilyasiya zamanı Flow annotasiyaları silinəcək.

#### Babel {#babel}

>Qeyd:
>
>Bu təlimatlar Create React App istifadəçiləri üçün *nəzərdə tutulmayıb*. Create React App-in Babel işlətdiyinə baxmayaraq Flow-nu addımı artıq konfiqurasiya olunub. Bu bölmədə olan təlimatları Create React App *işlətmədikdə* təqib edin.

Layihəyə Babel əl ilə quraşdırıldıqda Flow üçün xüsusi preset yükləmək lazımdır.

Yarn işlədirsinizsə:

```bash
yarn add --dev @babel/preset-flow
```

npm işlədirsinizsə:

```bash
npm install --save-dev @babel/preset-flow
```

Sonra, `flow` presetini [Babel konfiqurasiyasına](https://babeljs.io/docs/usage/babelrc/) əlavə edin. Məsələn, Babel-ı `.babelrc` faylı ilə konfiqurasiya etdikdə fayl aşağıdakı formada ola bilər:

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
>Flow, `react` presetinin işlədilməsini tələb etmir. Lakin, adətən bu iki preset birlikdə işlənilir. Flow təklikdə JSX sintaksisini anlayır.

#### Digər Qurulmalar {#other-build-setups}

Create React App və ya Babel işlətmədikdə [flow-remove-types](https://github.com/flowtype/flow-remove-types) paketindən istifadə edərək tip annotasiyalarını silə bilərsiniz.

### Flow-nun İcrası {#running-flow}

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

Normalda, Flow yalnız aşağıdakı annotasiya olan faylları yoxlayır:

```js
// @flow
```

Adətən, bu annotasiya faylın tam yuxarısına əlavə olunur. Bu annotasiyanı bəzi fayllara əlavə edib `yarn flow` və ya `npm run flow` əmrlərini icra edərək Flow-nun səhv tapdığına baxın.

Annotasiyanın olmasından asılı olmayaraq Flow-nun *bütün* faylları yoxlaması üçün [bu parametrdən](https://flow.org/en/docs/config/options/#toc-all-boolean) istifadə edə bilərsiniz. Bu parametr mövcud layihələr üçün çox səhv göstərdiyindən ağır ola bilər. Lakin, yeni layihədə tipləri Flow ilə annotasiya etmək istəyirsinizsə, bu parametrdən istifadə etmək faydalı ola bilər.

İndi Flow tam işləyir! Flow haqqında əlavə məlumat üçün aşağıdakı resurslara baxın:

* [Flow Sənədləri: Tip Annotasiyaları](https://flow.org/en/docs/types/)
* [Flow Sənədləri: Redaktorlar](https://flow.org/en/docs/editors/)
* [Flow Sənədləri: React](https://flow.org/en/docs/react/)
* [Flow ilə Lintinq](https://medium.com/flow-type/linting-in-flow-7709d7a7e969)

## TypeScript {#typescript}

[TypeScript](https://www.typescriptlang.org/), Microsoft tərəfindən yaranmış proqramlaşdırma dilidir. JavaScript-in üzərindən qurulmuş bu dilin öz kompilyatoru var. TypeScript, tipli dil olduğundan xətalar və baqlar qurulma zamanı tutula bilir. React ilə TypeScript işlətmək haqqında [buradan](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter) oxuya bilərsiniz.

TypeScript işlətmək üçün:

* TypeScript-i layihə asılılığı kimi əlavə edin.
* TypeScript kompilyator parametrlərini konfiqurasiya edin.
* Düzgün fayl genişləmnəsindən istifadə edin.
* İşlədilən kitabxanalar üçün tip tərifləri əlavə edin.

Gəlin, bu addımlara detallı baxaq.

### Create React App ilə TypeScript-in İşlədilməsi {#using-typescript-with-create-react-app}

TypeScript, Create React App-də konfiqurasiyasız işləyir.

TypeScript dəstəkləyən **yeni layihə** üçün aşağıdakı əmri icra edin:

```bash
npx create-react-app my-app --template typescript
```

TypeScript-i **mövcud Create React App layihəsinə də** əlavə edə bilərsiniz. [Sənədlərə baxın](https://facebook.github.io/create-react-app/docs/adding-typescript).

>Qeyd:
>
>Create React App işədirsinizsə, **bu səhifənin qalanının üzərindən atlaya bilərsiniz**. Burada, TypeScript-in əl ilə qurulması izah edilir. Buradakı təlimatlar Create React App istifadəçilərinə şamil edilmir.

### Layihəyə TypeScript Əlavə Etmək {#adding-typescript-to-a-project}

Typescript-i aşağıdakı əmri icra edərək yükləyin.

[Yarn](https://yarnpkg.com/) işlədirsinizsə:

```bash
yarn add --dev typescript
```

[npm](https://www.npmjs.com/) işlədirsinizsə:

```bash
npm install --save-dev typescript
```

Təbrik edirik! Siz, layihənizə TypeScript-in ən sonuncu versiyasını yüklədiniz. TypeScript paketi `tsc` əmri ilə gelir. Konfiqurasiya etməkdən öncə `package.json` faylının "scripts" bölməsinə `tsc` əmrini əlavə edin:

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

Kompilyatorun nə edəcəyini demədikdə Typescript-in heç bir xeyri olmayacaq. Bu qaydalar `tsconfig.json` adlı xüsusi faylda təyin edilir. Faylı yaratmaq üçün aşağıdakı əmrləri icra edin.

[Yarn](https://yarnpkg.com/) işlədirsinizsə:

```bash
yarn run tsc --init
```

[npm](https://www.npmjs.com/) işlədirsinizsə:

```bash
npx tsc --init
```

Yeni yaranmış `tsconfig.json` faylında olan parametrlər ilə kompilyatoru konfiqurasiya etmək mümkündür. Parametrlərin dərin izahatı üçün [bu sənədə](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) baxın.

Əsas `rootDir` və `outDir` parametlərinə baxaq. Kompilyator, typescript fayllarını qəbul edib javascript faylları yaratmalıdır. Lakin, biz mənbə fayllarını və yaranmış nəticələri qarışdırmaq istəmirik.

Bunu iki addım ilə həll edəcəyik:

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

Əla! İndi "build" skriptini icra etdikdə kompilyator yaranacaq javascript faylları `build/` direktoriyasına əlavə edəcək. [TypeScript React Starter](https://github.com/Microsoft/TypeScript-React-Starter/blob/master/tsconfig.json) paketi başlamaq üçün yaxşı qaydalar olan `tsconfig.json` faylı təmin edir.

Adətən, yaranmış javascript faylarını mənbə kontrolunda (source control) saxlamağı tövsiyə etmirik. Bu səbəbdən, `build/` direktoriyasını `.gitignore`-a əlavə edin.

### Fayl genişləmələri {#file-extensions}

Normalda, React komponentləri `.js` faylında saxlanılır. TypeScript-də iki fayl genişləməsindən istifadə edir:

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

Kompilyator, deklarasiya fayllarından istifadə edərək digər paketlərin annotasiyalarını və tip xətalarını göstərir. Deklarasiya faylı kitabxana haqqında bütün tip məlumatlarını təmin edir. Bu, layihədə npm ilə işlədilən javascript kitabxanalarının istifadəsinə imkan yaradır. 

Kitabxana deklarasiyalarını əldə etməyin iki yolu var:

__Paket ilə gələn__ - Kitabxana, deklarasiya faylı ilə paketlənir. Belə olduqda, kitabxananı yükləyib dərhal işlədə bilərsiniz. Kitabxana tiplərinin olduğunu bilmək üçün layihədə `index.d.ts` faylına baxın. Bu fayl, bəzi kitabxanalarda `package.json` faylının `typings` və ya `types` bölməsində göstərilir.

__[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)__ - deklarasiya faylı paket ilə gəlməyən kitabxanalar üçün DefinitelyTyped reposundan istifadə edə bilərsiniz. Bu repoda olan deklarasiyalar cəmiyyət tərəfindən əlavə edilir və Microsoft və digər open-source əməkdaşları tərəfindən idarə olunur. Məsələn, React, deklarasiya fayllarını paketləmir. Əvəzinə, tipləri DefinitelyTyped reposundan almaq mümkündür. Tipləri əlavə etmək üçün aşağıdakı əmri terminalda icra edin.

```bash
# yarn
yarn add --dev @types/react

# npm
npm i --save-dev @types/react
```

__Lokal Deklarasiyalar__

Bəzən, işlədilən paketdə və ya DefinitelyTyped reposunda tip deklarasiyaları olmaya bilər. Bu halda, deklarasiyaları lokal faylda göstərmək lazımdır. Bunu edə bilmək üçün, ana direktoriyada `declarations.d.ts` faylı yaradın. Sadə deklarasiya aşağıdakı formada olur:

```typescript
declare module 'querystring' {
  export function stringify(val: object): string
  export function parse(val: string): object
}
```

İndi TypeScript ilə kod yaza bilərsiniz! TypeScript haqqında əlavə məlumat üçün aşağıdakı resurslara baxın:

<<<<<<< HEAD
* [TypeScript Sənədləri: Əsas Tiplər](https://www.typescriptlang.org/docs/handbook/basic-types.html)
* [TypeScript Sənədləri: Javascript-dən Miqrasiya](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
* [TypeScript Sənədləri: React və Webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
=======
* [TypeScript Documentation: Everyday Types](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html)
* [TypeScript Documentation: Migrating from JavaScript](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)
* [TypeScript Documentation: React and Webpack](https://www.typescriptlang.org/docs/handbook/react-&-webpack.html)
>>>>>>> c883f623d597852b49f9314bb8133442ef9d3298

## ReScript {#rescript}

<<<<<<< HEAD
[Reason](https://reasonml.github.io/) yeni bir dil deyil. Bu, [OCaml](https://ocaml.org/) ilə işləyən yeni sintaksis və toolchain-dir. Reason, OCaml dilini JavaScript proqramçılarının başa düşəcəyi sintaksis ilə təmin edir. Əlavə olaraq, bu alət ilə bildiyimiz mövcud NPM/Yarn iş axınlarından istifadə etmək mümkündür.

Reason, Facebook tərəfindən yaradılıb və Messenger kimi məhsullarda istifdə olunur. Bu alət eksperimentaldır. Lakin, bu alətin Facebook və [canlı cəmiyyət](https://reasonml.github.io/docs/en/community.html) tərəfindən saxlanan [React binding-ləri](https://reasonml.github.io/reason-react/) var.
=======
[ReScript](https://rescript-lang.org/) is a typed language that compiles to JavaScript. Some of its core features are  guaranteed 100% type coverage, first-class JSX support and [dedicated React bindings](https://rescript-lang.org/docs/react/latest/introduction) to allow integration in existing JS / TS React codebases.

You can find more infos on integrating ReScript in your existing JS / React codebase [here](https://rescript-lang.org/docs/manual/latest/installation#integrate-into-an-existing-js-project).
>>>>>>> c883f623d597852b49f9314bb8133442ef9d3298

## Kotlin {#kotlin}

[Kotlin](https://kotlinlang.org/), JetBrains tərəfindən düzəldilmiş statik tipli yazılan dildir. Bu dilin hədəf platforması JVM, Android, LLVM, və [JavaScript-dir](https://kotlinlang.org/docs/reference/js-overview.html). 

JetBrains, React cəmiyyəti üçün bir neçə alət düzəldir və saxlayır: [React binding-ləri](https://github.com/JetBrains/kotlin-wrappers) və [Create React Kotlin App](https://github.com/JetBrains/create-react-kotlin-app). Create React Kotlin App paketi, qurulma konfiqurasiyası olmadan React applikasiyalarının yaradılmasına imkan yaradır.

## Digər Dillər {#other-languages}

Nəzərə alın ki, JavaScript-ə kompilyasiya olunan (bu səbəbdən, React ilə işləyə bilən) digər statik tipli yazılan dillər də mövcuddur: [F#/Fable](https://fable.io/) və [elmish-react](https://elmish.github.io/react). Əlavə məlumat üçün bu paketlərin səhifələrinə baxın. React ilə işləyən statik tipli dil bilirsinizə, yeni dili bu səhifəyə əlavə etməkdən çəkinməyin!

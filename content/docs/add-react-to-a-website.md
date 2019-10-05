---
id: add-react-to-a-website
title: Səhifəyə React Əlavə Et
permalink: docs/add-react-to-a-website.html
redirect_from:
  - "docs/add-react-to-an-existing-app.html"
prev: getting-started.html
next: create-a-new-react-app.html
---

İstədiyiniz qədər az və ya çox React işlədin.

React tədrici adaptasiya ilə dizayn olunub. Siz **istədiyiniz qədər az və ya çox React işlədə bilərsiniz**. Siz mövcud səhifəyə bir az interktivlik əlavə etmək istəyə bilərsiniz. React komponentləri bunun üçün çox yaxşıdır.

Veb səhifələrin əksəriyyəti tək səhifəli applikasiya deyil və olmamalıdırlar. React-i **bir neçə sətr kod ilə və heç bir yaranma alətindən istifadə etmədən** veb səhifənin kiçik bir hissəsində sınayın. Sonra, React-in varlığını yavaş yavaş genişləndirə bilər və ya bir neçə dinamik vidcet üçün saxlaya bilərsiniz.

---

- [React-i Bir Dəqiqəyə Əlavə Et](#add-react-in-one-minute)
- [Fakultativ: React-i JSX-də Sına](#optional-try-react-with-jsx) (paketləmə qurğusu lazım deyil!)

## React-i Bir Dəqiqəyə Əlavə Et {#add-react-in-one-minute}

Bu bölmədə, React-i mövcud veb səhifəyə necə əlavə edəcəyimizi göstərəcəyik. Buradakı misalları öz veb səhifənizdə yoxlaya bilər və ya boş HTML faylı yaradıb praktika edə bilərsiniz.

Burada çətin alətlər və ya yükləmə tələbləri olmayacaq -- **bu bölməni bitirmək üçün sizə yalnız internet və bir dəqiqə vaxt lazımdır.**

Fakultativ: [Tam nümunəni yüklə (2KB zip olunmuş formada)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)

### Addım 1: HTML-ə DOM Konteyneri Əlavə Et {#step-1-add-a-dom-container-to-the-html}

İlk olaraq, redaktə ediləcək HTML səhifəsini açın. React-də render ediləcək komponentin harada yerləşdirilməsi üçün boş `<div>` təqi əlavə edin. Məsələn:

```html{3}
<!-- ... mövcud HTML ... -->

<div id="like_button_container"></div>

<!-- ... mövcud HTML ... -->
```

Biz `<div>` təqinə unikal `id` HTML atributu verdik. Göstərilən ID ilə elementi JavaScript kodda taparaq React komponentini bu elementə render etmək mümkün olacaq.

>Məsləhət
>
>Siz bunun kimi "konteyner" `<div>`-ini `<body>` təqinin **istənilən yerində** yerləşdirə bilərsiniz. Bir səhifədə istədiyiniz qədər müstəqil DOM konteynerləri yerləşdirmək mümkündür. Bu elementlər adətən boş olurlar. React bu elementin daxilində olan bütün kontenti öz markapı ilə əvəzləyəcək.

### Addım 2: Script Təqləri Əlavə Et {#step-2-add-the-script-tags}

İndi, `</body>` təqi bağlanmamışdan dərhal öncə üç `<script>` təqi əlavə edin:

```html{5,6,9}
  <!-- ... digər HTML ... -->

  <!-- React-i Yüklə. -->
  <!-- Qeyd: yerləşdirmə (deployment) zamanı, "development.js"-i "production.min.js" ilə əvəzləyin. -->
  <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>

  <!-- React komponentini yüklə. -->
  <script src="like_button.js"></script>

</body>
```

İlk iki təq React-i, üçüncü təq isə bizim komponentimizi yükləyəcək.

### Addım 3: React Komponenti Yarat {#step-3-create-a-react-component}

HTML faylının yanında `like_button.js` faylı yaradın.

Bu **[starter kodunu](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** yeni yaratdığınız fayla köçürün.

>Məsləhət
>
>Bu kod, `LikeButton` adlı React komponenti təyin edir. Bunu başa düşmürsünüzsə narahat olmayın -- biz React-in əsas blokları haqqında [dərslikdə](/tutorial/tutorial.html) və [əsas konsepsiyalarda](/docs/hello-world.html) danışacağıq. İndi əsas məqsəd, kodu ekranda görməkdir!

**[Starter kodundandan sonra](https://cdn.rawgit.com/gaearon/0b180827c190fe4fd98b4c7f570ea4a8/raw/b9157ce933c79a4559d2aa9ff3372668cce48de7/LikeButton.js)** `like_button.js` faylının sonuna iki sətr əlavə edin:

```js{3,4}
// ... Köçürdüyünüz starter kodu ...

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```

Bu iki sətr kod, HTML-ə əlavə etdiyimiz `<div>` elementini tapacaq və "Like" düyməsi olan React komponentini bu elementin içərisində render edəcək. 

### Hamısı Budur! {#thats-it}

Burada 4-cü addım yoxdur. **Siz veb səhifənizə ilk React komponentinin əlavə etdiniz.**

React-in inteqrasiyasına dair digər məsləhətlər üçün sonrakı bölmələrə baxın.

**[Tam nümunə koduna buradan baxın](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605)**

**[Tam nümunəni yükləyin (2KB zipped)](https://gist.github.com/gaearon/6668a1f6986742109c00a581ce704605/archive/f6c882b6ae18bde42dcf6fdb751aae93495a2275.zip)**

### Məsləhət: Komponenti Yenidən İşlədin {#tip-reuse-a-component}

Adətən, React komponentləri HTML səhifəsinin bir neçə yerində istifadə edilir. Aşağıdakı nümunədə "Like" düyməsi fəqrli məlumatlar ilə üç dəfə göstərilir:

[Tam nümunə koduna buradan baxın](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda)

[Tam nümunəni yükləyin (2KB zip olunmuş formada)](https://gist.github.com/gaearon/faa67b76a6c47adbab04f739cba7ceda/archive/9d0dd0ee941fea05fd1357502e5aa348abb84c12.zip)

>Qeyd
>
>Bu strategiya React ilə işlənilən hissələrinin bir birindən ayrı olduğu halda faydalıdır. React kodunun daxilində [komponent kompozisiyasından istifadə etmək](/docs/components-and-props.html#composing-components) daha faydalıdır.

### Məsləhət: Produksiya üçün JavaScript-i Minifikasiya Edin {#tip-minify-javascript-for-production}

Veb səhifəni produksiyaya yerləşdirmədən öncə, minifikasiya olunmamış JavaScript-in səhifəni çox yavaşladacağından xəbərdar olun.

Əgər applikasiya skriptlərini minifikasiya edirsinizsə, yüklənmiş HTML-in `production.min.js` ilə bitən React versiyasını yüklədikdə **saytınız produksiya üçün hazır olacaq**:

```js
<script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>
```

Əgər skriptlər üçün minifikasiya addımı yoxdursa, [bunu quraşdırmağın yollarından biri buradadır](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3).

## Fakultativ: React-i JSX ilə Sınayın {#optional-try-react-with-jsx}

Yuxarıdakı numünələrdə, biz yalnız brauzerlərdə nativ dəstəklənən xüsusiyyətlərdən istifadə etdik. Bu səbəbdən React-in render etməsi üçün funksiya çağırışından istifadə etdik:

```js
const e = React.createElement;

// "Like" <button> göstər
return e(
  'button',
  { onClick: () => this.setState({ liked: true }) },
  'Like'
);
```

Lakin, React [JSX](/docs/introducing-jsx.html) işlətməyə icazə verir:

```js
// "Like" <button> göstər
return (
  <button onClick={() => this.setState({ liked: true })}>
    Like
  </button>
);
```

Göstərilən kod parçaları eynidir. **JSX-in [tam fakultativ olmasına baxmayaraq](/docs/react-without-jsx.html)** bir çox adam React və digər kitabxanalar ilə UI kodu yazdıqda JSX-i faydalı görürlər.

[Bu onlayn konverterdən](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3) JSX-i qurdalaya bilərsiniz.

### JSX-i Tez Sına {#quickly-try-jsx}

JSX-i sınamağın ən tez yolu səhifəyə `<script>` təqi əlavə etməkdir:

```html
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
```

İndi, `type="text/babel"` atributunu `<script>` təqlərinə əlavə edərək JSX-dən istifadə edə bilərsiniz. [JSX işlədilən HTML faylını](https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html) yükləyib JSX-i yoxlaya bilərsiniz.

Öyrənmək və ya sadə demolar yaratmaq üçün bu yol normaldır. Lakin, JSX-i bu formada işlətdikdə veb səhifəsi yavaşlayır və **səhifə produksiya üçün əlverişli olmur**. İrəli getmək üçün hazır olduqda eyni əlavə edilən `<script>` təqini və `type="text/babel"` atributlarını silin. Sonrakı bölmədə JSX preprosessorundan istifadə edərək bütün `<script>` təqlərini avtomatik olaraq JavaScript-ə çevirəcəyik.

### Layihəyə JSX Əlavə Et {#add-jsx-to-a-project}

Layihəyə JSX əlavə etmək üçün paketləmə və ya development server kimi mürəkkəb alətlər lazım deyil. JSX əlavə etmək **CSS preprosessor əlavə etmək kimidir.** Yeganə tələb kompüterdə [Node.js](https://nodejs.org/)-in quraşdırılmış olmasıdır.

Terminaldan layihə direktoriyasına gedərək aşağıdakı iki əmri icra edin:

1. **Addım 1:** `npm init -y` əmrini icra edin (Əgər bu əmr uğursuz başa çatırsa [bu düzəlişdən](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d) istifadə edin)
2. **Addım 2:** `npm install babel-cli@6 babel-preset-react-app@3` əmrini icra edin

>Məsləhət
>
>Biz **NPM-i yalnız JSX preprosessorunu yükləmək üçün işlədirik.** Bu aləti başqa yerlədə işlətməyəcəyik. Həm React həm də applikasiya kodu dəyişiklik edilmədən `<script>` təqləri kimi qala bilərlər.

Təbrik Edirik! Siz layihənizə **produksiyaya hazır JSX quruluşu** əlavə etdiniz.


### JSX Preprosessorunu İcra Et {#run-jsx-preprocessor}

`src` adlı direktoriya yaradaraq aşağıdaki əmri icra edin:

```
npx babel --watch src --out-dir . --presets react-app/prod 
```

>Qeyd
>
>`npx` səhv deyil -- bu [NPM 5.2+ ilə gələn paket icra edən alətdir](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b).
>
>Əgər "You have mistakenly installed the `babel` package" xəta mesajını görürsünüzsə [əvvəlki addımı](#add-jsx-to-a-project) qaçırmış ola bilərsiniz. Əvvəlki addımı eyni direktoriyada çağıraraq bu əmri təkrarlayın.

Bu əmrin bitməsini gözləməyin -- bu əmr JSX üçün avtomatik gözətçi başladır.

İndi, **[JSX başlama kodu ilə](https://cdn.rawgit.com/gaearon/c8e112dc74ac44aac4f673f2c39d19d1/raw/09b951c86c1bf1116af741fa4664511f2f179f0a/like_button.js)** `src/like_button.js` faylı yaratdıqda, gözətçi brauzerlərə uyğun sadə JavaScript kodu ilə çevrilmiş `like_button.js` faylı yaradacaq. Mənbə faylını JSX ilə dəyişdikdə, çevrilmə yenidən icra olunacaq.

Bonus olaraq, bu sizə köhnə brauzerləri sındırmadan klaslar kimi modern JavaScript sintaksisininin xüsusiyyətləsindən istifadə etməyə imkan yaradır. Bizim işlətdiyimiz alətin adı Babel-dir. Siz bu alət haqqında əlavə məlumat üçün [bu alətin sənədlərinə](https://babeljs.io/docs/en/babel-cli/) baxa bilərsiniz.

Quraşdırma alətləri ilə işləməyə öyrəşdiyinizi hiss etdikdə və bu alətlərin daha çox iş görməsini istədikdə, populyar və asan işlənə bilən toolchain-lərə [sonrakı bölmədən](/docs/create-a-new-react-app.html) baxa bilərsiniz. Əgər lazım deyilsə, script təqləri işlətmək bəs edəcək!

---
id: tutorial
title: "Dəsrlik: React-ə Giriş"
layout: tutorial
sectionid: tutorial
permalink: tutorial/tutorial.html
redirect_from:
  - "docs/tutorial.html"
  - "docs/why-react.html"
  - "docs/tutorial-ja-JP.html"
  - "docs/tutorial-ko-KR.html"
  - "docs/tutorial-zh-CN.html"
---

Bu dərslik heç bir mövcud React biliyini təxmin etmir.

## Dərsliyi Başlamazdan Əvvəl {#before-we-start-the-tutorial}

Bu dərslikdə biz kiçik bir oyun yazacağıq. **Siz oyun yazmadığınızdan bunu ötürmək istəyə bilərsiniz -- amma buna bir şans verin.** Bu dərslikdə öyrənəcəyiniz metodlar React applikasiyaları yazmaq üçün əsasdır və bu metodları mənimsəmək sizə React-i dərindən başa düşməyə kömək edəcək.

>Məsləhət
>
>Bu dərslik **praktika ilə öyrənməyə** üstünlük verənlər üçün nəzərdə tutulmuşdur. Əgər siz konsepsiyaları sıfırdan öyrənməyə üstünlük verirsinizsə, bizim [pillə-pillə təlimatımızı](/docs/hello-world.html) nəzərdən keçirin. Bu dərslik və göstərilən təlimat bir-birini tamamlaya bilər.

Bu dərslik bir neçə bölməyə bölünmüşdür:

* [Dərslik üçün Qurulma](#setup-for-the-tutorial) bu dərsliyi izləmək üçün **başlanğıc nöqtəsidir.**
* [İcmal](#overview) React-in **əsaslarını** öyrədəcək: komponentlər, proplar, və state.
* [Oyunu Tamamlamaq](#completing-the-game) React təkmilləşdirilməsi üçün **ən çox işlənən metodları** öyrədəcək.
* [Zaman Səyahətinin Əlavəsi](#adding-time-travel) React-in unikal gücləri haqqında **dərin məlumatlar** verəcək.

Bu dərslikdən dəyər almaq üçün bütün bölmələri bir dəfəyə tamamlamaq vacib deyil. Çalışın mümkün qədər çox bölmədən keçəsiniz -- hətta bir və ya iki bölmədə olsa.

Dərslikdə irəliləyərkən kodları copy-paste etmək normaldır amma biz kodları əl ilə yazmağınızı tövsiyyə edirik. Bu sizə əzələ yaddaşı yaratmağa və daha güclü anlamağa kömək edəcək.

### Biz nə düzəldirik? {#what-are-we-building}

Bu dərslikdə biz React ilə interaktiv "X O oyununu" düzəltməyi göstərəcəyik.

Bizim düzəltdiyimizə buradan baxa bilərsiniz: **[Son Nəticəyə](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**. Əgər kod sizə aydın deyilsə və ya sintaksis sizə tanış deyilsə, narahat olmayın! Bu dərsliyin məqsədi sizə React və onun sintaksisini anlamağa kömək etməkdir.

Dərsliyi başlamamışdan qabaq oyuna baxmağınızı tövsiyyə edirik. Bu oyunun diqqət edəcəyiniz xüsusiyyətlərindən biri oyun taxtasının sağında çıxan nömrələnmiş siyahıdır. Bu siyahı oyunda baş vermiş bütün hərəkətlərin tarixçəsidir və bu siyahı oyun davam etdikcə yenilənir.

Oyun ilə tanış olduqdan sonra oyun səhifəsini bağlaya bilərsiniz. Biz bu dərslikdə sadə bir şablon ilə başlayacağıq. Sonraki addım sizi oyunu yazmağa hazır etməkdir.

### Ön şərtlər {#prerequisites}

Biz sizin HTML və Javascript ilə tanışlığınızı təxmin edirik amma siz başqa proqramlaşdırma dilindən gəlirsinizsə belə davam edə bilərsiniz. Biz sizin proqramlaşdırma konsepsiyaları ilə (funskiyalar, objectlər, massivlər, və daha az dərəcədə, klasslar) tanışlığınızı təxmin edirik.

Əgər sizə Javascriptə baxmaq lazımdırsa, biz [bu təlimatı](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) oxumağınızı tövsiyyə edirik. Qeyd edirikki, biz həmçinin bəzi ES6 (Javascriptin yeni versiyası) xüsusiyyətlərindən istifadə edirik. Bu dərslikdə, biz [arrow funskiyaları](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), [klaslar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let), and [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) operatorlarından istifadə edirik. Siz [Babel REPL](babel://es5-syntax-example) istifadə edərək ES6 kodunun nəyə kompilyasiya olunduğunu görə bilərsiniz.

## Dərslik üçün Qurulma {#setup-for-the-tutorial}

Bu dərsliyi iki yol ilə tamamlamaq olar: siz kodu brauzerdə yaza və ya kompyuterinizdə lokal təkminləşmə mühiti yarada bilərsiniz.

### Seçim 1: Brauzerdə Kodu Yaz {#setup-option-1-write-code-in-the-browser}

Bu başlamaq üçün ən tez yoldur!

İlk olaraq, bu **[Başlama Kodunu](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)** yeni təbdə açın. Yeni təb sizə boş "X O oyun" taxtası və React kodu göstərəcək. Biz bu dərslikdə React kodu üstündə işləyəcəyik.

Siz indi ikinci opsiyanından ötüb, [İcmal](#overview) bölməsinə keçə bilərsiniz.

### Seçim 2: Lokal Təkminləşmə Mühiti {#setup-option-2-local-development-environment}

Bu tam istəyə bağlı və bu dərslik üçün məcburi deyil!

<br>

<details>

<summary><b>Məcburi Deyil: Üstünlük verdiyiniz kod redaktoru ilə lokal qurulmasının təlimatları</b></summary>

Bu qurulma daha çox vaxt tələb edir amma sizə bu dərsliyi seçdiyiniz redaktor ilə tamamlamağa icazə verir. İzləmək üçün addımlar:

1. Əmin olunki [Node.js](https://nodejs.org/en/) son versiyası qurulub.
2. Yeni layihə yaratmaq üçün [Create React App qurulma təlimatlarını](/docs/create-a-new-react-app.html#create-react-app) izləyin.

```bash
npx create-react-app my-app
```

3. Yeni layihənin `src/` direktoriyasından bütün faylları silin.

> Qeyd:
>
> **Bütün `src` direktoriyasını yox, yalnız daxilindəki faylları silin.**. Biz standart faylları bu layihədəki nümunələr ilə əvəz edəcəyik.

```bash
cd my-app
cd src

# Əgər Mac və ya Linux işlədirsinizsə:
rm -f *

# Əgər Windows işlədirsinizsə:
del *

# Layihə direktoriyasına geri qayıdın:
cd ..
```

4. `index.css` adlı faylı `src/` direktoriyasına [bu CSS kodu](https://codepen.io/gaearon/pen/oWWQNa?editors=0100) ilə əlavə edin.

5. `index.js` adlı faylı `src/` directoriyasına [bu JS kodu](https://codepen.io/gaearon/pen/oWWQNa?editors=0010) ilə əlavə edin.

6. `src/` directoriyasında olan `index.js` faylının ən yuxarısınz aşağıdalı üç sətri əlavə edin:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
```

İndi, əgər siz layihə direktoriyasından `npm start` icra etsəniz və brauzerdə `http://localhost:3000` səhifəni açsanız, boş "X O oyunu" taxtası.

Editorunuz üçün sintaks seçilməsini konfiqurasiya etmək üçün [bu təlimatları](https://babeljs.io/docs/editors/) izləməniz tövsiyyə olunur.

</details>

### Kömək, Mən İlişmişəm!

Əgər ilişmisinizsə, [cəmiyyətimizin dəstək resurslarını](/community/support.html) nəzərdən keçirin. Xüsusisən, [Reactiflux Chat](https://discord.gg/0ZcbPKXt5bZjGY5n) kömək almaq üçün ən tez yoldur. Əgər siz cavab almırsınızsa və ya siz yenədə ilişmisinizsə, xahiş olunur bizə İssue göndərin və biz sizə kömək etməyə cəhd edəcəyik.

## İcmal {#overview}

İndi sizdə hər şey qurulub deyə gəlin of React haqqında məlumat alaq!

### React Nədir? {#what-is-react}

React UI yaratmaq üçen deklarativ, səmərəli, və elastik Javascript kitabxanasıdır. Bu kitabxana sizə "komponent" adlanan balaca və sərbəst kod hissələrinin birləşməsi ilə kompleks UI yaratmağa icazə verir.

React-də bir neçə növ komponent var amma gelin `React.Component` subklassından yaranan komponentlər ilə başlayaq:

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>{this.props.name} üçün alış-veriş siyahısı</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}

// İşlətmə nümunəsi: <ShoppingList name="Rufat" />
```

Biz bu maraqlı XML-a oxşar təqlərdən sonra danışacağıq. Biz komponentlərdən istifadə edərək React-ə ekranda nə görmək istədiyimizi deyiril. Məlumat dəyişəndə React səmərəli şəkildə komponentləri yeniləyir və yenidən render edir.

Yuxarıdakı nümunədə, ShoppingList bir **React komponent klassı** və ya **React komponent növüdür**. Komponent `props` ("properties" sözünün qısa yazılışı) adında parametrlər qəbul edir və görünüş üçün iyerarxiyalı formada `render` funskiyasından qaytarır.

`render` funskiyası nə görmək istədiyinizin *məzmununu* qaytarır. React bu məzmun əsasında nəticəni göstərirş. Xesusi ilə, `render` **React elementi** (nə render edilməyinin yüngül məzmunu) qaytarır. Əksər React proqramçıları "JSX" adında xüsusi sintaksis işlədir. Bu sintaksik belə iyerarxiyalı strukturların yazılışını asalaşdırır. `<div />` sintaksisi qurulma zamanı `React.createElement('div')`-ə çevrilir. Yuxarıdalı nümunənin JSX-siz aşağıdakı formada yazılır:

```javascript
return React.createElement('div', {className: 'shopping-list'},
  React.createElement('h1', /* ... h1 children ... */),
  React.createElement('ul', /* ... ul children ... */)
);
```

[Genişləndirilmiş versiyanı izləyin.](babel://tutorial-expanded-version)

Əgər sizə maraqlıdırsa, `createElement()` [API arayışında](/docs/react-api.html#createelement) daha detallı izah edilir. Biz bu dərslikdə `createElement()` əvəzinə JSX-dən istifadə etməyə davam edəcəyik.

JSX, Javascriptin bütün gücü ilə gəlir. Siz *hər hansı* Javascript ifadəsini JSX-də fiqur mötərizənin içərisindən çağıra bilərsiniz. Hər React elementi bir sadə Javascript obyekti obyektidir. Siz bu obyekti dəyişənə təyin edə bilər və ya applikasiyanızda funskiyalara və s. göndərə bilərsiniz.

Yuxarıdalı nümunədə, `ShoppingList` komponenti yalnız hazır qurulmuş DOM komponentlərini (`<div />` və `<li />`) render edir. Amma siz başqa xüsusi komponentləri belə biləşdirə bilərsiniz. Məsələn, siz yuxarıdakı alqı satqı listini `<ShoppingList />` kimi işlədə bilərsiniz. Hər React komponenti inkapsulasiya olunub deyə siz bu komponentləri bir birindən asılı olmayacaq şəkildə istifadə edə bilərsiniz. Bu xüsusiyyət sade komponentlərdən komplex UI-lar yaratmağa icazə verir.

## Başlanğıc Kodunun Yoxlanması {#inspecting-the-starter-code}

Əgər siz bu dərsliyi **brauzerdə** edəcəksinizsə bu kodu yeni təbdə açın: **[Başlanğıc Kodu](https://codepen.io/gaearon/pen/oWWQNa?editors=0010)**. Əgər siz bu dərsliyi **lokalda** edəcəksinizsə, layihə direktoriyasında olan `src/index.js` faylını açın (siz bu fayla [qurulma](#setup-option-2-local-development-environment) bölməsində əl gəzdirmisiniz).

Başlağıc Kodu sizin yazacağınız üçün baza kodudur. Biz CSS stilləri təmin etmişikki siz diqqətini yalnız React-i öyrənməyə və "X O oyunu" yazmağa yönləndirəsiniz.

Koda yaxından baxdığınızda, üç React komponentin olacağını görəcəksiniz:

* Square
* Board
* Game

 Square komponent tək bir `<button>` və Board komponenti 9 ədəd kvadrat render edir. Game komponenti Board elə belə  dəyərlər ilə render edir. Biz bu dəyərləri gələcək bölmələrdə dəyişəcəyik. İndiki zamanda bu kodda interaktiv komponent yoxdur.

### Məlumatı Proplar ilə göndərmək {#passing-data-through-props}

Gəlin Board komponentindən Square komponentinə məlumat göndərək.

Board-un `renderSquare` funskiyasında, Square-ə `value` propu əlavə edin:

```js{3}
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Square-in `render` funskiyasında məlumatı göstərmək üçün `{/* TODO */}` kodunu `{this.props.value}` ilə əvəz edin:

```js{5}
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

Öncə:

![React Devtools](../images/tutorial/tictac-empty.png)

Sonra: Siz kvadratlarda rəqəmləri görməlisiniz.

![React Devtools](../images/tutorial/tictac-numbers.png)

**[Bu nöqtəyə kimi olan bütün kod](https://codepen.io/gaearon/pen/aWWQOG?editors=0010)**

Təbriklər! Siz valideyn olan Board komponentindən "propu" uçaq olan Square komponentinə göndərdiniz. React-də məlumat axınını propların göndərilməsi ilə baş verir -- valideyndən uşağa doğru.

### İnteraktiv Komponentin Yaradılması {#making-an-interactive-component}

Gəlin, Square komponentinə tıklandığı zaman kvadratı "X" ilə dolduraq.

İlk öncə Square komponentindəki `render()` funskiyasında olan "button" təqini aşağıdakı koda çevirin:

```javascript{4}
class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={function() { alert('click'); }}>
        {this.props.value}
      </button>
    );
  }
}
```

Əgər indi biz Square-ə tıklasaq, brauzerdə "click" yazısı ilə xəbərdarlıq alacağıq.

>Qeyd
>
>Yazmanı qısaltmaq və [`this`-in baş qarışdırıcı işləmə prinsipinindən](https://yehudakatz.com/2011/08/11/understanding-javascript-function-invocation-and-this/) kənar olmaq üçün, biz buradakı və sonrakı hadisə işləyicilərində [arrow funskiyalası sintaksisindən istifadə edəcəyik](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions):
>
>```javascript{4}
>class Square extends React.Component {
>  render() {
>    return (
>      <button className="square" onClick={() => alert('click')}>
>        {this.props.value}
>      </button>
>    );
>  }
>}
>```
>
>Diqqət edinki biz `onClick` propuna *funskiya* göndəririk: `onClick={() => alert('click')}`. Bu xəbərdarlığın yalnız düymənin klikləndiyi vaxt çıxmasını təmin edir. `() =>`-nu yaddan çıxarıb birbaşa `onClick={alert('click')}` yazmaq tez tez edilən bir səhvlədən biridir. Səhv formada yazdıqda, komponentin hər renderindən sonra (məsələn dəyişiklikdən sonra baş verən yenidən render) xəbərdarlıq göstəriləcək (tıklamaqdan asılı olmayaraq).

Sıradakı addımda, biz Square komponentinin tılandığını yadda saxlamaq və "X" işarəsi ilə doldurmaq istəyirik. komponentlər "yadda saxlamaq" üçün **state-dən** istifadə edirlər.

React komponentlərinin state-ləri olması üçün klas konstrukturunda `this.state`-dən istifadə edilir. `this.state` yalnız onu müəyyənləşdirən React komponentinə privat olmalıdır. Gəlin Square-in cari dəyərini `this.state`-də saxlayaq və Square tıklanarkən bu dəyəri dəyişək.

İlk olaraq state-i inisializasiya etmək üçün klasa konstruktor əlavə edək:

```javascript{2-7}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => alert('click')}>
        {this.props.value}
      </button>
    );
  }
}
```

>Qeyd
>
>[JavaScript klaslarında](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), subklasın konstrukturunu tətbiq etdikdə mütləq `super`-dən istifadə etmək lazımdır. Konstrukturu olan bütün React komponentləri `super(props)` funskiya çağırışı ilə başlamalıdır.

Biz Square komponentinin cari state-inin dəyərini tıklamadan sonra göstərmək üçün, Square-in `render` funskiyasından istifadə edəcəyik:

* `<button>` təqində `this.props.value`-nu `this.state.value` ilə əvəz et.
* the `() => alert()` hadisə işləyicisini `() => this.setState({value: 'X'})` ilə əvəz et.
* Oxunaqlığı artirmaq üçün `className` və `onClick` proplarını ayrı sətrlərdə yazın.

Bu dəyişikliklərdən sonra Square-in `render` funskiyasından qaytarılan `<button>` təqi aşağıdakı koda oxşamalıdır:

```javascript{12-13,15}
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

Square komponentinin `render` funskiyasında olan `onClick` işləyicisində `this.setState` çağırmaq ilə biz React-ə `<button>` tıklananda komponenti yenidən render etməyi deyirik. Yeniləmədən sonra, Square-in `this.state.value` dəyəri `'X'` olacaq və bu səbəbdən biz oyun taxtasında `X` görəcəyik. Hər hansı bir Square-i tıklayanda, `X` görünəcək.

Komponentdən `setState` çağırdıqda, React avtomaik olaraq komponentin içinsəki uşaq komponentləridə  yeniləyir.

**[Bu nöqtəya kimi olan bütün kod](https://codepen.io/gaearon/pen/VbbVLg?editors=0010)**

### Developer Alətləri {#developer-tools}

[Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) və [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) üçün olan React DevTools Genişlənməsi, React komponent iyerarxiyasını brauzerin developer alətlərindən gözdən keçirməyə imkan yaradır.

<img src="../images/tutorial/devtools.png" alt="React Devtools" style="max-width: 100%">

React DevTools sizə React komponentlərinin state və proplarına baxmağa icazə verir.

React DevTools-u qurduqdan sonra, siz səhifədə hər hansi bir elementə sağ düymə ilə tıklayıb, "Inspect"-ə tıklayıb developer alətlərini açın. React DevTools developer alətlərinin ən son təbində "React" adı ilə görünəcək.

*Qeyd edinki CodePen-də işləməsi üçün əlavə bir neçə əlavə addım etmək lazımdır:**

1. Login edin ve ya qeydiyyatdan keçib emailınızı təsdiq edin (spamin qarşısını almaq üçün lazımdır).
2. "Fork" düyməsini tıklayın.
3. "Change View" düyməsini tıklayıb "Debug mode" seçin.
4. Yeni açılan təbdə brauzerin developer alətlərində React təbi olacaq.

## Oyunu Tamamlamaq {#completing-the-game}

Indi bizdə "X O oyununun" əsas blokları hazırdı. Oyunu tamamlamaq üçün biz "X" və "O"nun sıra ilə yerləşdirilməsini düzəltməli və oyunun sonunda qalibi müəyyənləşdirməliyik.

### State-in Qaldırılması {#lifting-state-up}

İndi, hər Square komponenti oyunun vəziyyətini saxlayır. Qalibi təyin etmək üçün biz bu 9 kvadratın dəyərini bir yerdə saxlamalıyıq.

Biz Board komponentinin hər Square komponentdən Square-in state-ini istəməsini fikirləşə bilərik. Bunun React-da mümkün olmasına baxmayaraq, biz bu yol ilə getməyi tövsiyyə etmirik. Çünki bele üsulla yazılan kodu başa düşmək və refaktor etmək çətinləşir və baqların şansı artır. Bunu duzəltməyin ən yaxşı yolu oyunun state-ini hissə-hissə hər Square komponentdə saxlamaq əvəzinə bütünlüklə Board komponentində saxlamaqdır. Board komponenti hər Square-ə nə göstərəcəyini, [Square-ə rəqəm göndərdiyimiz kimi](#passing-data-through-props), prop ilə göndərə bilər.

**Çoxlu uşaqdan məlumat yığması və ya iki uşaq komponentin bir biri ilə kommunikasiya etməsi üçün, paylaşılan state-i valideyn komponentində bəyan edin. Valideyn komponent bu state-i  uşaq komponentlərə proplar vasisəti ilə göndərə bilər. Bu metod uşaq komponentlər və valideyn komponentlər arasındakı məlumatları sinxron saxlayır.**

React komponentlərini refaktor etdikdə, state-i valideyn komponentə qaldırmaq çox işlənən praktikadır. Gəlin bu metodu sınayaq. Biz Board komponentinə konstruktor əlavə edib Board-un başlanğıc state-inə 9 ədəd `null` olan massiv əlavə edəcəyik. Bu 9 ədəd `null` 9 ədəd kvadrat üçündür:

```javascript{2-7}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Sonrakı oyunçu: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

Kvadratları doldurduqda, oyun taxtasının vəziyyəti belə formada olacaq:

```javascript
[
  'O', null, 'X',
  'X', 'X', 'O',
  'O', null, null,
]
```

Board-un `renderSquare` funskiyası indi belə görsənir:

```javascript
  renderSquare(i) {
    return <Square value={i} />;
  }
```

Bu dərsliyi başlayanda, biz hər Square-də 0-dan 8-ə kimi rəqəmləri göstərmək üçün Board-dan [`value` propunu göndərdik](#passing-data-through-props). Əvvəlki başqa bir bölmədə isə biz rəqəmləri [Square-in daxili state-indən istifadə edərək](#making-an-interactive-component) "X" ilə əvəz etdik. Bu səbəbdən Square komponenti Board-dan göndərilən `value` propunu saymır.

Biz yenidən propu göndərmək mexanizmindən istifadə edəcəyik. Board komponentindən hər Square-ə kvadratın dəyərini göndərəcəyik (`'X'`, `'O'`, və ya `null`). Biz artıq `squares` massivini Board-un konstrukturunda yaratmışıq və indi biz `renderSquare` funskiyasından bu massivi oxuyacağıq:

```javascript{2}
  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }
```

**[Bu nöqtəyə kimi olan bütün kod](https://codepen.io/gaearon/pen/gWWQPY?editors=0010)**

İndi hər Square `value` propundan bu dəyərlərdən birini alacaq: `'X'`, `'O'`, və ya `null` (boş kvadrat).

İndi biz Square tıklananda nə olacağını dəyişməliyik. Board komponenti kvadratların dəyərlərini özündə saxlayır. Bu səbəbdən biz Square komponentinə Board-un state-ini dəyişməsini bildirməliyik. State, yarandığı komponentə (bu misalda Board komponentinə) privat olduğundan, biz Square komponentindən Board-un state-ini dəyişə bilmirik.

Board-un state-inin privatlığının saxlanması üçün biz Board-dan Square-ə funskiya göndərəcəyik. Bu funskiya Square tıklananda çağrılacaq. Board-un `renderSquare` funskiyasını aşağıdakına dəyişəcəyik:

```javascript{5}
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
```

>Qeyd
>
>Biz oxumanı artırmaq üçün qaytarılan elementi bir neçə sətrdə yazdıq və Javascriptin `return`-dən sonra nöqtə vergül qoyub kodumuzu sındırmaması üçün qaytarılan komponenti mötərizəyə saldıq.

İndi biz Board-dan Square-ə iki prop göndəririk: `value` və `onClick`. `onClick` propu funksiyadır və Square tıklananda çağrılacaq. Square komponentinə aşağıdakı dəyişiklikləri edəcəyik:

* Square-in `render` funskiyasında `this.state.value`-nu `this.props.value` ilə əvəz edəcəyik
* Square-in `render` funskiyasında `this.setState()`-i `this.props.onClick()` ilə əvəz edəcəyik
* Square state saxlamadığından `constructor`-u Square-dən siləcəyik

Bu dəyişikliklərdən sonra, Square komponenti belə olacaq:

```javascript{1,2,6,8}
class Square extends React.Component {
  render() {
    return (
      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}
```

Square tıklandıqda Board-un təmin etdiyi `onClick` funksiyası çağrılır. Bu prosesin icmalı:

1. DOM qurulan `<button>` komponentinin `onClick` propu React-ə tıklama hadisəsi üçün hadisə qəbuledicisi qurmasını deyir.
2. Düymə tıklandığı zaman, React, Square-in `render()` funskiyasında olan `onClick` hadisə işləyicisini çağırır.
3. Bu hadisə işləyicisi `this.props.onClick()` funskiyasını çağırır. Square-in `onClick` propu Board tərəfindən müəyyənləşdirilib.
4. Board-un Square-ə `onClick={() => this.handleClick(i)}` göndərməsindən, Square tıklandığında `this.handleClick(i)` funskiyasını çağırır.
5. Biz `handleClick()` funksiyasını hələ tətbiq etmədiyimizdən bizim kod çökür.

>Qeyd
>
>DOM `<button>` elementinin qurulmuş komponent olduğundan, bu elementin `onClick` atributunun React-a xüsusi mənasi var. Square kimi xüsusi komponentlər üçün bu atributu adlandırmaq sizdən asılıdır. Biz Square-in `onClick` propunu və ya Board-un `handleClick` funskiyasını başqa cürədə adlandıra bilərdik. React-də, hadisələr üçün `on[Event]` və hadisə işləyiciləri üçün `handle[Event]` adları işlətmək adətdir.

Square-i tıkladıqda, `handleClick` funskiyasının olmadığından bizə xəta gələcək. Gəlin indi bu funksiyanı Board klasında tətbiq edək:

```javascript{9-13}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Sonrakı oyunçu: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[Bu nöqtəyə kimi olan bütün kod](https://codepen.io/gaearon/pen/ybbQJX?editors=0010)**

Bu dəyişikliklərdən sonra, biz Square-ə tıklayaraq oyun taxtasını doldura bilirk. Amma indi oyunun vəziyyəti Square komponentlərdə individual yerləşmək əvəzinə Board komponentində saxlanır. Board-un state-i dəyişdikdə bütün komponentlər avtomatik yenidən render olunurlar. Bütün kvadratların vəziyyətlərini Board komponentində saxlamaq ilə biz gələcəkdə oyunun qalibinidə müəyyənləşdirə biləcəyik.

Square komponentində state olmadığından, bütün Square komponentləri Board komponentindən dəyərləri alir və tıklandığı zaman Board komponentinə xəbər verir. React terminalogiyasında, Square komponentləri **kontrol olunan komponentlər** adlanırlar. Board komponentinin bu komponentlər üzərində tam kontrolu var.

Qeydə alinki biz `handleClick` funskiyasında mövcud `squares` massivini dəyişmək əvəzinə `.slice()` funskiyasını çağırıb massivin kopiyasını düzəldirik. Gələn bölmədə biz `squares`-in kopiyasını çıxarmağın səbəbini izah edəcəyik.

### Dəyişməzlik Niyə Vacibdir {#why-immutability-is-important}

Əvvəli kod nümunəsində, biz mövcud massivi dəyişmək əvəzinə `.slice()` operatoru ilə `squares` massivinin kopiyasının çıxarmağı tövsiyyə etdik. Bu bölmədə biz dəyişməzlik (immutability) və dəyişməzliyi öyrənməyin niyə vacib olduğunu müzakirə edəcəyik.

Normalda məlumatı iki yol ilə dəyişmək olur. Birinci yanaşma məlumatın dəyərlərini birbaşa dəyişməklə məlumatı *mutasiya etməkdir*. İkinci yanaşma isə mövcud məlumatı dəyişiklər ilə olan kopiyası ilə əvəz etməkdir.

#### Məlumatı Mutasiya ilə Dəyişmək {#data-change-with-mutation}
```javascript
var player = {score: 1, name: 'Orxan'};
player.score = 2;
// player {score: 2, name: 'Orxan'} bərabərdir
```

#### Məlumatı Mutasiyasız Dəyişmək {#data-change-without-mutation}
```javascript
var player = {score: 1, name: 'Orxan'};

var newPlayer = Object.assign({}, player, {score: 2});
// player dəyişməyib, amma newPlayer {score: 2, name: 'Orxan'} bərabərdir

// Əgər siz obyekt yayma sintaksisindən istifadə edirsinizsə, siz belə yaza bilərsiniz:
// var newPlayer = {...player, score: 2};
```

Son nəticənin eyni olmasına baxmayaraq məlumatı mutasiya etmədən dəyişdikdə aşağıdakı faydalardan yararlanırıq.

#### Kompleks Xüsusiyyətlər Sadələşir {#complex-features-become-simple}

Dəyişməməzlik kompleks xüsusiyyətlərin tətbiqini çox asanlaşdırır. Bu dərslikdə biz "X O oyununun" tarixçəsinin icmalını və əvvəlki gedişlərə qayıda bilmək üçün "zaman səyahəti" tətbiq edəcəyik. Bu xüsusiyyət yalnız oyunlara xas deyil. Bir çox applikasiyaların tələblərində hərəkətləri geri qaytarmaq və ya qabağa çəkmək olur. Məlumatın birbaşa dəyişməyindən çəkinməklə biz oyunun tarixçəsini saxlaya bilir və saxladığımız tarixçədən istifadə edə bilərik.

#### Dəyişikliklərin Aşkar Edilməsi {#detecting-changes}

Mutasiya olunmuş obyektlərin birbaşa dəyişildiyindən, bu dəyişikliklərin aşkar edilməsi çətindir. Dəyişikliyi tapmaq üçün mutasiya olunmuş obyekt, əvvəlki kopiyaları ilə müqayisə edilməlidir. Bu müqayisə üçün bütün obyekt iyerarxiyası yoxlanmalıdır.

Mutasiya olunmamış obyektlərdə dəyişiklikləri aşkar etmək xeyli dərəcədə asandır. Əgər dəyişməz obyektin referansı əvvəki obyektin referansından fərqlidirsə, bu obyekt dəyişmişdir.

#### React-də Yenidən Render Etməyin Aşkarlanması {#determining-when-to-re-render-in-react}

Dəyişməzliyin əsas faydası React-da bizə _təmiz komponentlərin_ yaranmasına kömək etməsidir. Mutasiya olunmamış məlumatlar ilə biz dəyişikliyin olduğunu asan formada aşkar edə bilərik. Bu tapıntı ilə komponentin yenidən olduğunu müəyyən edə bilərik.

`shouldComponentUpdate()` və *təmiz komponentlər* haqqında öyrənmək üçün [Performansın Optimallaşdırılması](/docs/optimizing-performance.html#examples) səhifəsini oxuya bilərsiniz.

### Funksional Komponentlər {#function-components}

Biz indi Square-i **funskional komponentə** çevirəcəyik.

React-də, **funskional komponentlər** komponentlərin sadə formada yazılması üçündür. Bu komponentlərin state-i olmur; yalnız `render` funksiyası olur. `React.Component`-dən törənən klas yazmaq əvəzinə, biz `props` qəbul edən və nəyi render etməyi qaytaran funksiya yaradırıq. Funksional komponentləri yazmaq klas komponentləri yazmaqdan daha az yorucudur. Bir çox komponent belə formada yazıla bilər.

Square klasını aşağıdakı funskiya ilə əvəz edin:

```javascript
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
```

Biz `this.props`-u işlətdiyimiz hər iki yerdə `props` ilə əvəz etdik.

**[Bu nöqtəyə kimi olan bütün kod](https://codepen.io/gaearon/pen/QvvJOv?editors=0010)**

>Qeyd
>
>Biz Square-i funskional komponentə çevirdikdə, həmçinin `onClick={() => this.props.onClick()}` propunu daha qısa `onClick={props.onClick}`-a (**Hər iki** tərəfdəki mötərizələrin olmamasını qeyd edin) çevirdik. Klas olduqda, biz düzgün `this` işlədə bilmək üçün ox funskiyası işlətmişdik. Amma funskional komponentdə `this` bizə lazım deyil.

### Sıranı Gözlə {#taking-turns}

Biz "X O oyununda" tam aydın ola defekti düzəltməliyik: "O"-lar oyun taxtasında işarələnə bilmirlər.

Biz ilk gedişi "X" ilə qeyd edək. Bu ilkin dəyər üçün biz Board-un konstrukturunda başlanğıc state-i dəyişməliyik:

```javascript{6}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
```

Hər zaman oyunçu hərəkət etdikdə, `xIsNext` (bulin) kimin sonrakı addımı atdığını müəyyənləşdirmək üçün çevriləcək. `xIsNext`-in dəyərini çevirmək üçün gəlin `handleClick` funskiyasını yeniləyək:

```javascript{3,6}
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Bu dəyişiklikdə, "X"-lər və "O"-lar sıralarını gözləyə bilərlər. Əlavə olaraq Board-un `render` funksiyasındakı "status" mətnində kimin sonrakı addımı atacağınıda göstərək:

```javascript{2}
  render() {
    const status = 'Sonrakı oyunçu: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      // kodun qalanı dəyişməyib
```

Bütün dəyişiklikləri etdikdən sonra Board komponenti belə görünəcək:

```javascript{6,11-16,29}
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = 'Sonrakı oyunçu: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

**[Bu nöqtəyə kimi olan bütün kod](https://codepen.io/gaearon/pen/KmmrBy?editors=0010)**

### Qalibi Bəyan Et {#declaring-a-winner}

Biz indi kimin sonrakı addımı atacağını bildiyimizdən, gəlin oyununu qalibini və ya oyunda heç bir gedişin qalmadığını göstərək. Qalibi tapmaq üçün aşağıdakı köməkçi funskiyanı faylın sonuna əlavə edə bilərik:

```javascript
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```

Biz Board-un `render` funskiyasında oyunçunun qazandığını yoxlamaq üçün `calculateWinner(squares)` funskiyasını çağıracağıq. Əgər oyunçu qalib olubsa, biz "Qalib: X" və ya "Qalib: O" formalı mətn göstərəcəyik. Board-un `render` funskiyasındakı `status`-u aşağıdakı formada dəyişəcəyik:

```javascript{2-8}
  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Qalib: ' + winner;
    } else {
      status = 'Sonrakı oyunçu: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      // kodun qalanı dəyişməyib
```

İndi Board-un `handleClick` funksiyasını dəyişərək kvadratın boş olmadığında və ya kiminsə qalib olduğunda funksiyadan tez qaytarıb tıklamanı iqnor edək:

```javascript{3-5}
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }
```

**[Bu nöqtəyə kimi olan bütün kod](https://codepen.io/gaearon/pen/LyyXgK?editors=0010)**

Təbriklər! Sizdə indi işləyən "X O oyunu" var. Və siz həmçinin React-in əsaslarını öyrəndiniz. Bu səbəbdən *siz* yəqinki əsl qalibsiniz.

## Adding Time Travel {#adding-time-travel}

As a final exercise, let's make it possible to "go back in time" to the previous moves in the game.

### Storing a History of Moves {#storing-a-history-of-moves}

If we mutated the `squares` array, implementing time travel would be very difficult.

However, we used `slice()` to create a new copy of the `squares` array after every move, and [treated it as immutable](#why-immutability-is-important). This will allow us to store every past version of the `squares` array, and navigate between the turns that have already happened.

We'll store the past `squares` arrays in another array called `history`. The `history` array represents all board states, from the first to the last move, and has a shape like this:

```javascript
history = [
  // Before first move
  {
    squares: [
      null, null, null,
      null, null, null,
      null, null, null,
    ]
  },
  // After first move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, null,
    ]
  },
  // After second move
  {
    squares: [
      null, null, null,
      null, 'X', null,
      null, null, 'O',
    ]
  },
  // ...
]
```

Now we need to decide which component should own the `history` state.

### Lifting State Up, Again {#lifting-state-up-again}

We'll want the top-level Game component to display a list of past moves. It will need access to the `history` to do that, so we will place the `history` state in the top-level Game component.

Placing the `history` state into the Game component lets us remove the `squares` state from its child Board component. Just like we ["lifted state up"](#lifting-state-up) from the Square component into the Board component, we are now lifting it up from the Board into the top-level Game component. This gives the Game component full control over the Board's data, and lets it instruct the Board to render previous turns from the `history`.

First, we'll set up the initial state for the Game component within its constructor:

```javascript{2-10}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

Next, we'll have the Board component receive `squares` and `onClick` props from the Game component. Since we now have a single click handler in Board for many Squares, we'll need to pass the location of each Square into the `onClick` handler to indicate which Square was clicked. Here are the required steps to transform the Board component:

* Delete the `constructor` in Board.
* Replace `this.state.squares[i]` with `this.props.squares[i]` in Board's `renderSquare`.
* Replace `this.handleClick(i)` with `this.props.onClick(i)` in Board's `renderSquare`.

The Board component now looks like this:

```javascript{17,18}
class Board extends React.Component {
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

We'll update the Game component's `render` function to use the most recent history entry to determine and display the game's status:

```javascript{2-11,16-19,22}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
```

Since the Game component is now rendering the game's status, we can remove the corresponding code from the Board's `render` method. After refactoring, the Board's `render` function looks like this:

```js{1-4}
  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
```

Finally, we need to move the `handleClick` method from the Board component to the Game component. We also need to modify `handleClick` because the Game component's state is structured differently. Within the Game's `handleClick` method, we concatenate new history entries onto `history`.

```javascript{2-4,10-12}
  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
    });
  }
```

>Note
>
>Unlike the array `push()` method you might be more familiar with, the `concat()` method doesn't mutate the original array, so we prefer it.

At this point, the Board component only needs the `renderSquare` and `render` methods. The game's state and the `handleClick` method should be in the Game component.

**[View the full code at this point](https://codepen.io/gaearon/pen/EmmOqJ?editors=0010)**

### Showing the Past Moves {#showing-the-past-moves}

Since we are recording the tic-tac-toe game's history, we can now display it to the player as a list of past moves.

We learned earlier that React elements are first-class JavaScript objects; we can pass them around in our applications. To render multiple items in React, we can use an array of React elements.

In JavaScript, arrays have a [`map()` method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) that is commonly used for mapping data to other data, for example:

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(x => x * 2); // [2, 4, 6]
``` 

Using the `map` method, we can map our history of moves to React elements representing buttons on the screen, and display a list of buttons to "jump" to past moves.

Let's `map` over the `history` in the Game's `render` method:

```javascript{6-15,34}
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
```

**[View the full code at this point](https://codepen.io/gaearon/pen/EmmGEa?editors=0010)**

For each move in the tic-tac-toes's game's history, we create a list item `<li>` which contains a button `<button>`. The button has a `onClick` handler which calls a method called `this.jumpTo()`. We haven't implemented the `jumpTo()` method yet. For now, we should see a list of the moves that have occurred in the game and a warning in the developer tools console that says:

>  Warning:
>  Each child in an array or iterator should have a unique "key" prop. Check the render method of "Game".

Let's discuss what the above warning means.

### Picking a Key {#picking-a-key}

When we render a list, React stores some information about each rendered list item. When we update a list, React needs to determine what has changed. We could have added, removed, re-arranged, or updated the list's items.

Imagine transitioning from

```html
<li>Alexa: 7 tasks left</li>
<li>Ben: 5 tasks left</li>
```

to

```html
<li>Ben: 9 tasks left</li>
<li>Claudia: 8 tasks left</li>
<li>Alexa: 5 tasks left</li>
```

In addition to the updated counts, a human reading this would probably say that we swapped Alexa and Ben's ordering and inserted Claudia between Alexa and Ben. However, React is a computer program and does not know what we intended. Because React cannot know our intentions, we need to specify a *key* property for each list item to differentiate each list item from its siblings. One option would be to use the strings `alexa`, `ben`, `claudia`. If we were displaying data from a database, Alexa, Ben, and Claudia's database IDs could be used as keys.

```html
<li key={user.id}>{user.name}: {user.taskCount} tasks left</li>
```

When a list is re-rendered, React takes each list item's key and searches the previous list's items for a matching key. If the current list has a key that didn't exist before, React creates a component. If the current list is missing a key that existed in the previous list, React destroys the previous component. If two keys match, the corresponding component is moved. Keys tell React about the identity of each component which allows React to maintain state between re-renders. If a component's key changes, the component will be destroyed and re-created with a new state.

`key` is a special and reserved property in React (along with `ref`, a more advanced feature). When an element is created, React extracts the `key` property and stores the key directly on the returned element. Even though `key` may look like it belongs in `props`, `key` cannot be referenced using `this.props.key`. React automatically uses `key` to decide which components to update. A component cannot inquire about its `key`.

**It's strongly recommended that you assign proper keys whenever you build dynamic lists.** If you don't have an appropriate key, you may want to consider restructuring your data so that you do.

If no key is specified, React will present a warning and use the array index as a key by default. Using the array index as a key is problematic when trying to re-order a list's items or inserting/removing list items. Explicitly passing `key={i}` silences the warning but has the same problems as array indices and is not recommended in most cases.

Keys do not need to be globally unique; they only need to be unique between components and their siblings.


### Implementing Time Travel {#implementing-time-travel}

In the tic-tac-toe game's history, each past move has a unique ID associated with it: it's the sequential number of the move. The moves are never re-ordered, deleted, or inserted in the middle, so it's safe to use the move index as a key.

In the Game component's `render` method, we can add the key as `<li key={move}>` and React's warning about keys should disappear:

```js{6}
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
```

**[View the full code at this point](https://codepen.io/gaearon/pen/PmmXRE?editors=0010)**

Clicking any of the list item's buttons throws an error because the `jumpTo` method is undefined. Before we implement `jumpTo`, we'll add `stepNumber` to the Game component's state to indicate which step we're currently viewing.

First, add `stepNumber: 0` to the initial state in Game's `constructor`:

```js{8}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }
```

Next, we'll define the `jumpTo` method in Game to update that `stepNumber`. We also set `xIsNext` to true if the number that we're changing `stepNumber` to is even:

```javascript{5-10}
  handleClick(i) {
    // this method has not changed
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // this method has not changed
  }
```

We will now make a few changes to the Game's `handleClick` method which fires when you click on a square.

The `stepNumber` state we've added reflects the move displayed to the user now. After we make a new move, we need to update `stepNumber` by adding `stepNumber: history.length` as part of the `this.setState` argument. This ensures we don't get stuck showing the same move after a new one has been made.

We will also replace reading `this.state.history` with `this.state.history.slice(0, this.state.stepNumber + 1)`. This ensures that if we "go back in time" and then make a new move from that point, we throw away all the "future" history that would now become incorrect.

```javascript{2,13}
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }
```

Finally, we will modify the Game component's `render` method from always rendering the last move to rendering the currently selected move according to `stepNumber`:

```javascript{3}
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // the rest has not changed
```

If we click on any step in the game's history, the tic-tac-toe board should immediately update to show what the board looked like after that step occurred.

**[View the full code at this point](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**

### Wrapping Up {#wrapping-up}

Congratulations! You've created a tic-tac-toe game that:

* Lets you play tic-tac-toe,
* Indicates when a player has won the game,
* Stores a game's history as a game progresses,
* Allows players to review a game's history and see previous versions of a game's board.

Nice work! We hope you now feel like you have a decent grasp on how React works.

Check out the final result here: **[Final Result](https://codepen.io/gaearon/pen/gWWZgR?editors=0010)**.

If you have extra time or want to practice your new React skills, here are some ideas for improvements that you could make to the tic-tac-toe game which are listed in order of increasing difficulty:

1. Display the location for each move in the format (col, row) in the move history list.
2. Bold the currently selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.
6. When no one wins, display a message about the result being a draw.

Throughout this tutorial, we touched on React concepts including elements, components, props, and state. For a more detailed explanation of each of these topics, check out [the rest of the documentation](/docs/hello-world.html). To learn more about defining components, check out the [`React.Component` API reference](/docs/react-component.html).

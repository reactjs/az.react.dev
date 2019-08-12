---
id: glossary
title: React Terminlərinin Lüğəti
layout: docs
category: Reference
permalink: docs/glossary.html

---

## Tək səhifəli Applikasiya {#single-page-application}

Tək səhifəli applikasiya, tək HTML səhifəsi və applikasiyanın işləməyi üçün lazım olan bütün faylları (JavaScript və CSS kimi) yükləyir. Səhifəda baş verən hər bir interaksiya üçün serverə yenidən müraciət etmək lazım olmadığından səhifə heç zaman yeniden yüklənmir.

React-də tək səhifəli applikasiya düzəltmək zəruri deyil. Siz mövcud olan veb səhifələrin kiçik hissələrinə interaksiya əlavə etmək üçün React-dən istifadə edə bilərsiniz. React-də yazılmış kod, serverdə render edilmiş (məsələn PHP dili ilə) markup ilə və ya digər klient kitabxanaları ilə eyni zamanda mövcud ola bilər. Faktiki olaraq Facebook-da React bu formada işlədilir.

## ES6, ES2015, ES2016, və s {#es6-es2015-es2016-etc}

Bu akronimlər, ECMAScript Dilinin Spesifikasiya standartının (JavaScript bu standartın tətbiqidir) ən yeni versiyalarına istinad edir. ES6 versiyası (həmçinin ES2015 kimi də tanınır) keçmiş versiyalara bir çox yeniliklər əlavə edir: ox funksiyaları, klaslar, şablon hərfləri, `let` və `const`. Spesifik versiyalar haqqında məlumatlara [buradan](https://en.wikipedia.org/wiki/ECMAScript#Versions) baxa bilərsiniz.

## Kompilyatorlar {#compilers}

JavaScript kopilyatoru qəbul edilən Javascript kodunu digər Javascript formatına çevirir. Ən çox işlənən hal, ES6 sintaksisini köhnə brauzerlərin başa düşəcəyi sintaksisə çevirməkdir. React ilə işlədilən ən məşhur kompilyator [Babel-dır](https://babeljs.io/).

## Paketləmə Qurğuları {#bundlers}

Paketləmə Qurğuları ayrı modullarda (adətən yüzlərlə) yazılmış JavaScript və CSS kodlarının brauzerlər üçün optimallaşdırılmış halda olan bir neçə fayla birləşdirir. [Webpack](https://webpack.js.org/) and [Browserify](http://browserify.org/), React applikasiyalarında ən çox işlədilən paketləmə qurğularıdırlar.

## Paket  Menecerləri {#package-managers}

Paket Menecerləri layihənin asılı olduğu paketləri idarə etmək üçün alətlərdir. React applikasiyarında ən çox işlədilən paket menecerləri [npm](https://www.npmjs.com/) və [Yarn-dır](https://yarnpkg.com/). Bu iki paket menecer klienti eyni npm paket registry-sindən istifadə edirlər.

## CDN {#cdn}

CDN Kontent Çatdırılma Şəbəkəsidir (Content Delivery Network). CDN-lər dünyanın hər yerində yərləşən serverlər şəbəkəsindən kəç olunmuş statik kontenti çatdırır. 

## JSX {#jsx}

JSX JavaScript üçün sintaksis əlavəsidir. Bu dilin şablon dilinə oxşamasına baxmayaraq JavaScript-in bütün gücündən istifadə edə bilir. JSX, "React elementləri" adlanan sadə JavaScript obyektləri qaytaran `React.createElement()` funksiyalarına kompilyasiya edilir. JSX haqqında girişüçün [bu sənədlərə](/docs/introducing-jsx.html), dərindən dərslik üçün isə [bu sənədlərə](/docs/jsx-in-depth.html) baxın.

React DOM HTML atribut adları əvəzinə camelCase ad konvensiyasından istifadə edir. Məsələn, JSX-də `tabindex` `tabIndex`-ə çevrilir. Həmçinin `class` atributu JavaScript-in qorunan sözü olduğundan JSX-də `className` kimi yazılır:

```js
const name = 'Clementine';
ReactDOM.render(
  <h1 className="hello">Mənin adım: {name}!</h1>,
  document.getElementById('root')
);
```  

## [Elementlər](/docs/rendering-elements.html) {#elements}

React applikasiyalarının əsası React elementlərindən ibarətdir. Elementləri daha çox tanınan "komponentlər" konsepsiyası ilə çaşdırmaq olar. Element sizin ekranda nə görmək istədiyinizi təsvir edir. React elementləri dəyişməzdirlər.

```js
const element = <h1>Salam Dünya</h1>;
```

Adətən, elementlər bir başa işlədilmək əvəzinə komponentlərdən qaytarırırlar.

## [Komponentlər](/docs/components-and-props.html) {#components}

React komponentləri səhifəyə render ediləcək React elementi qaytaran kiçik və yenidən istifadə edilə bilən kod bloklarıdır. React komponentinin ən sadə forması React elementi qaytaran sadə JavaScript funksiyasıdır:

```js
function Welcome(props) {
  return <h1>Salam, {props.name}</h1>;
}
```

Komponentlər həmçinin ES6 klasladı da ola bilərlər:

```js
class Welcome extends React.Component {
  render() {
    return <h1>Salam, {this.props.name}</h1>;
  }
}
```

Komponentlər funksionallıq əsasında parçalana bilər və digər komponenlərdə işlənə bilərlər. Komponentlər digər komponentlər, massivlər, mətnlən, və rəqəmlər qaytara bilərlər. Əgər UI-ın bir hissəsi bir neçə dəfə işlədilirsə (Button, Panel, Avatar) və ya UI təklikdə mürəkkəbdirsə (App, FeedStory, Comment), bu UI-ı yenidən işlədilə bilən komponent etmək olar. Komponent adları həmişə böyük hərf ilə başlamalıdırlar (`<wrapper/>` **yox** `<Wrapper/>`). Komponenləri render etmək haqqında əlavə məlumat üçün [bu sənədə](/docs/components-and-props.html#rendering-a-component) baxın. 

### [`props`](/docs/components-and-props.html) {#props}

`props` React komponenti üçün arqumentlərdir. Proplar ana komponentdən uşaq komponentə göndərilən məlumatlardır.

Nəzərə alın ki, `props` həmişə oxunabiləndir (readonly). Proplar heç bir formada dəyişdirilməməlidirlər:

```js
// Yanlış!
props.number = 42;
```

Əgər siz istifadəçi daxil olması və ya şəbəkə cavabı əsasında bir dəyəri dəyişmək istəyirsinizsə `state`-dən istifadə edin.

### `props.children` {#propschildren}

`props.children` bütün komponentlərdə mövcuddur. Bu komponentin açılma və bağlanma təqləri arasında olan konenti ehtiva edir. Məsələn:

```js
<Welcome>Salam Dünya!</Welcome>
```

`Salam Dünya!` mətni `Welcome` komponentinin `props.children` propunda yərləşdirilir:

```js
function Welcome(props) {
  return <p>{props.children}</p>;
}
```

Klas komponentlərində `this.props.children` dəyişənindən istifadə edin:

```js
class Welcome extends React.Component {
  render() {
    return <p>{this.props.children}</p>;
  }
}
```

### [`state`](/docs/state-and-lifecycle.html#adding-local-state-to-a-class) {#state}

Komponentdə hər hansı bir məlumat vaxt ilə dəyişirsə `state`-dən istifadə etmək lazımdır. Məsələn, `Checkbox` komponentina `isChecked` state-i və `NewsFeed` komponentinə şəbəkən yüklənmiş `fetchedPosts` state-i lazım ola bilər.

`state` və `props` arasındaki əsas fərq `props`-un ana komponentindən göndərilir. `state` isə komponentin daxilindən idarə edilir. Komponent `props`-u dəyişə bilmir. Amma `state`-i dəyişə bilir.

Dəyişən hər bir məlumat üçün, state-ə "yiyə duran" bir komponent olmalıdır. İki fərqli komponentin state-ini sinxronizasiya etməyin. Əvəzinə, state-i ən yaxın valideynə [qaldırıb](/docs/lifting-state-up.html) hər iki komponentə proplar kimi göndərin.

## [Lifecycle Metodları](/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class) {#lifecycle-methods}

Komponentin fəqli fazalarında icra edilən funksiyalar lifecycle metodlarıdır. Komponentin yarandığı və DOM-ə ləavə edildiyi ([mount edilmə](/docs/react-component.html#mounting)), komponentin yeniləndiyi və komponentin unmount edildiyi və DOM-dan silindiyi funksiyalar mövcuddur.

 ## [Kontrol Olunan](/docs/forms.html#controlled-components) və [Kontrol Olunmayan](/docs/uncontrolled-components.html) Komponentlər

React-də Anket sahələrini idarə etmək üçün ide iki cür yanaşma mövcuddur.

Dəyəri React tərəfindən kontorl edilən anket sahəsi elementi **kontrol olunan komponentdir**. İstifadəçi kontrol olunan komponentə məlumat daxil etdikdə, dəyişən hadisə işləyicisi çağrılacaq. Sizin kodunuz, daxil olunan dəyəri yoxlayıb yenilənmiş dəyəri render edir. Əgər siz yenidən render etməsəniz anket elementi dəyişməz qalacaq.

*Kontrol olunmayan komponentləri* React-dən kənarda işləyən anket elementləri ilə eyni formada işləyirlər. İstifadəçi anket sahəsinə (input, dropdown və s) məlumat daxil etdikdə React-dən asılı olmayaraq yenilənmiş dəyər anket sahəsində əks olunacaq. Bu deməkdirki, siz sahədə müəyyən bir dəyərin olmasını məcbur edə bilmirsiniz.

Bir çox hallarda kontrol olunan komponent işlətməyi tövsiyyə edirik.

## [Açarlar](/docs/lists-and-keys.html) {#keys}

Elementlər massivi düzəltdikdə "key" (açar) adlanan xüsusi mətn atributunu elementlərə daxil etməlisiniz. Açarlar React-ə hansı elementlərin yeniləndiyini, əlavə edildiyini silindiyini müəyyən etməyə kömək edir. Açarlar massivdə olan elementlərə göndərilməlidir.

Açarlar yalnız yeni massivdə olan elementlərdə unikal olmalıdırlar. Bu açarlar bütün applikasiyada və ya tək komponentdə belə unikal olmamalıdırlar.

Açarlara `Math.random()` kimi dəyərlər göndərməyin. Yenidən render etmələr zamanı açarların "sabit identikliyi" olması vacibdir. Bu dəyərlərdən istifadə edərək React, elementlərin əlavə edildiyini, silindiyini, və ya yerini dəyişdiyini müəyyən edə bilər. İdeal olaraq açarlar, gələn məlumatın sabit identiklikləri ilə (məsələn `post.id`) uyğun olmalıdırlar.

## [Ref-lər](/docs/refs-and-the-dom.html) {#refs}

React hər hansı komponentə qoşula bilən xüsusi bir atribut dəstəkləyir. `ref` atributu, [`React.createRef()` funksiyası](/docs/react-api.html#reactcreateref), tərəfindən yaradılan obyekt, callback funksiyası və ya mətn (köhnə API-dır) qəbul edir. `ref` atributu callback funksiyası olduqda, bu funksiya qoşulan DOM elementi və ya klas instansiyası (elementin tipindən asılı olaraq) arqument kimi qəbul edir. Qəbul edilən DOM elementindən və ya komponent instansiyasından bir başa istifadə edə bilər.

ref-ləri hər yerdə işlətməyin. Əgər applikasiyanızda normal funksiyalar üçün ref-lərdən istifadə etdiyinizi görürsünüzsə [yuxarıdan aşağı məlumat axını](/docs/lifting-state-up.html) ilə tanış olun.

## [Hadisələr](/docs/handling-events.html) {#events}

Hadisələrin React elementlərində idarə edilməsində bəzi sintaktik fərqlər var:

* React hadisə işləyiciləri kiçik hərflə yazılmaq əvəzinə camelCase ilə yazılırlar.
* JSX işlətdikdə hadisə işləyicilərinə mətn əvəzinə funksiya göndərilir.

## [Rekonsilyasiya](/docs/reconciliation.html) {#reconciliation}

Komponentin propları və ya state-i dəyişdikdə, React qaytarılan element ilə əvvəlki render edilmiş elementi müqayisə edərək DOM yeniliyinin lazım olduğunu müəyyənləşdirir. Əgər yeni element ilə keçmiş element eyni deyilsə React DOM-u yeniləyəcək. Bu proses  "rekonsilyasiya" adlanır.

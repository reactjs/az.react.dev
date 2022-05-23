---
id: optimizing-performance
title: Performansın Optimallaşdırılması
permalink: docs/optimizing-performance.html
redirect_from:
  - "docs/advanced-performance.html"
---

Daxildə, React, bir neçə ağıllı texnikadan istifadə edərək UI-ı yeniləmək üçün ağır DOM əməliyyatlarının sayını azaldır. Bir çox applikasiyada performansı xüsusi optimallaşdırmadan React-dən istifadə etdikdə itifadəçi interfeysi tez işləyəcək. Buna baxmayaraq React applikasiyasını tezləşdirməyin bir neçə yolu var.

## Produksiya Qurulmasından İstifadə Edin {#use-the-production-build}

React applikasiyalarında performans problemləri olduqda minimallaşdırılmış produksiya qurulmasının istifadə edildiyindən əmin olun.

Normalda, React-də faydalı xəbərdarlıqlar var. Bu xəbərdarlıqlar development zamanı faydalıdır. Lakin, bu xəbərdarlıqlar React-i böyüdür və yavaşladır. Bu səbəbdən, applikasiyanı yerləşdirdikdə produksiya versiyasının istifadəsindən əmin olun.

Qurulma prosesinin düzgün işlədiyindən əmin olmadıqda [Chrome üçün React Developer Alətlərindən](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) istifadə edin. Produksiya modunda olan React səhifəsini ziyarət etdikdə alətin ikonu tünd fonda olacaq:

<img src="../images/docs/devtools-prod.png" style="max-width:100%" alt="React-in produksiya versiyasını işlədən səhifədə React DevTools ikonu">

Development modunda olan React səhifəsini ziyarət etdikdə isə alətin ikonu qırmızı fonda olacaq:

<img src="../images/docs/devtools-dev.png" style="max-width:100%" alt="React-in development versiyasını işlədən səhifədə React DevTools ikonu">

Applikasiyanı yazdıqda development modundan istifadə edin. Applikasiyanı istifadəçilər üçün yerləşdirdikdə isə produksiya modundan istifadə edin.

Applikasiyanın produksiya üçün qurulması üçün aşağıdakı təlimatlara baxın.

### Create React App {#create-react-app}

Layihə [Create React App](https://github.com/facebookincubator/create-react-app) üzərində qurulduqda aşağıdakı əmri icra etmək kifayətdir:

```
npm run build
```

Bu, applikasiyanın produksiya versiyasını layihənin `build/` direktoriyasında yaradacaq.

Bunun yalnız produksiya zamanı işlədildiyini unutmayın. Normal development üçün `npm start` əmrindən istifadə edin.

### Tək Fayl Qurulmaları {#single-file-builds}

Biz, React və React DOM-un produksiyaya hazır versiyalarını tək fayl ilə təmin edirik:

```html
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
```

Produksiya üçün yalnız `.production.min.js` ilə bitən faylların uyğun olduğunu unutmayın.

### Brunch {#brunch}

Ən səmərəli Brunch produksiya qurulması üçün [`terser-brunch`](https://github.com/brunch/terser-brunch) plaginini yükləyin:

```
# npm işlədirsinizsə
npm install --save-dev terser-brunch

# Yarn işlədirsinizsə
yarn add --dev terser-brunch
```

Produksiya qurulması yaratmaq üçün `build` əmrinə `-p` arqumenti əlavə edin:

```
brunch build -p
```

Bunun yalnız produksiya zamanı işlədildiyini unutmayın. `-p` arqumentini və ya plagini development zamanı işlətməyin. Çünki, bu, qurulma əməliyyatını çox yavaşladacaq və React-in faydalı xəbərdarlıqlarını gizlədəcək.

### Browserify {#browserify}

Ən səmərəli Browserify produksiya qurulması üçün bir neçə plagin yükləmək lazımdır:

```
# npm işlədirsinizsə
npm install --save-dev envify terser uglifyify 

# Yarn işlədirsinizsə
yarn add --dev envify terser uglifyify 
```

Produksiya qurulması yaratmaq üçün aşağıdakı çevirmələri əlavə edin **(sıra vacibdir)**:

* [`envify`](https://github.com/hughsk/envify) çevirməsi düzgün produksiya mühitinin təyin edilməsini siğortalayır. Bunu qlobal edin (`-g`).
* [`uglifyify`](https://github.com/hughsk/uglifyify) çevirməsi development idxallarını silir. Bunu qlobal edin (`-g`).
* Sonda, nəticlənənən paket [`terser`-ə](https://github.com/terser-js/terser) korlanmaq üçün (mangling) göndərilir ([səbəbini buraxan oxuyun](https://github.com/hughsk/uglifyify#motivationusage)).

Məsələn:

```
browserify ./index.js \
  -g [ envify --NODE_ENV production ] \
  -g uglifyify \
  | terser --compress --mangle > ./bundle.js
```

Bunun yalnız produksiya zamanı işlədildiyini unutmayın. Bu plaginləri development zamanı işlətməyin. Çünki, bu, qurulma əməliyyatını çox yavaşladacaq və React-in faydalı xəbərdarlıqlarını gizlədəcək.

### Rollup {#rollup}

Ən səmərəli Rollup qurulması üçün bəzi plaginləri yükləmək lazımdır:

```bash
# npm işlədirsinizsə
npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser

# Yarn işlədirsinizsə
yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser
```

Produksiya qurulması yaratmaq üçün aşağıdakı plaginləri əlavə edin **(sıra vacibdir)**:

* [`replace`](https://github.com/rollup/rollup-plugin-replace) plagini düzgün produksiya mühitinin təyin edilməsini siğortalayır.
* [`commonjs`](https://github.com/rollup/rollup-plugin-commonjs) plagini Rollup-da CommonJS-in işlədilməsinə imkan yaradır.
* [`terser`](https://github.com/TrySound/rollup-plugin-terser) plagini son paketi kompresləyir və korlayır (mangles).

```js
plugins: [
  // ...
  require('rollup-plugin-replace')({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  require('rollup-plugin-commonjs')(),
  require('rollup-plugin-terser')(),
  // ...
]
```

Tam qurulma konfiqurasiyası üçün [bu gist-ə baxın](https://gist.github.com/Rich-Harris/cb14f4bc0670c47d00d191565be36bf0).

Bunun yalnız produksiya zamanı işlədildiyini unutmayın. Development zamanı `terser` və ya `replace` plaginini `'production'` dəyəri ilə tətbiq etməyin. Çünki, bu, qurulma əməliyyatını çox yavaşladacaq və React-in faydalı xəbərdarlıqlarını gizlədəcək.

### webpack {#webpack}

>**Qeyd:**
>
>Create React App işlədirsinizsə, [yuxarıdakı təlimatlara baxın](#create-react-app).<br>
>Bu bölmə, webpack-in birbaşa konfiqurasiyası üçün uyğundur.

Webpack v4+ versiyasının produksiya modu yazılmış kodu avtomatik minimallaşdıracaq.

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ /* burada parametlər əlavə edə bilərsiniz */ })],
  },
};
```

Əlavə məlumat üçün [webpack sənədlərinə](https://webpack.js.org/guides/production/) baxın.

Bunun yalnız produksiya zamanı işlədildiyini unutmayın. `TerserPlugin` plaginini development zamanı işlətməyin. Çünki, bu, qurulma əməliyyatını çox yavaşladacaq və React-in faydalı xəbərdarlıqlarını gizlədəcək.

## DevTools Profayleri ilə Komponentlərin Profayl Edilməsi {#profiling-components-with-the-devtools-profiler}

`react-dom` 16.5+ və `react-native` 0.57+ versiyalarında React DevTools Profaylerin DEV modunda daha inkişaf etmiş qabiliyyətləri var.
Profaylerin icmalına ["React Profayler ilə Tanışlıq"](/blog/2018/09/10/introducing-the-react-profiler.html) bloq yazısından baxa bilərsiniz.
Profaylerin video izahatına [Youtube-dan](https://www.youtube.com/watch?v=nySib7ipZdk) baxa bilərsiniz.

React DevTools yükləməmisinizsə, aşağıdakı linklərə baxın:

- [Chrome Brauzer Artımı](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Firefox Brauzer Artımı](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)
- [Bağımsız Nod Paketi](https://www.npmjs.com/package/react-devtools)

> Qeyd
>
> `react-dom`-un produksiyada profayl edilməsi `react-dom/profiling` paketində mövcuddur.
> Bu paketin istifadəsi üçün [fb.me/react-profiling](https://fb.me/react-profiling) səhifəsinə baxın.

> Qeyd
>
<<<<<<< HEAD
> React 17-dən öncə biz standart Chrome brauzerinin performans təbi ilə [User Timing API-dan](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) istifadə edərək komponentlərin sürətini ölçürdük.
> Daha detallı məlumat üçün [Ben Şvarzın məqaləsini](https://calibreapp.com/blog/react-performance-profiling-optimization) oxuyun.
=======
> Before React 17, we use the standard [User Timing API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) to profile components with the chrome performance tab.
> For a more detailed walkthrough, check out [this article by Ben Schwarz](https://calibreapp.com/blog/react-performance-profiling-optimization).
>>>>>>> 3aac8c59848046fb427aab4373a7aadd7069a24c

## Böyük Siyahıların Virtuallaşdırılması {#virtualize-long-lists}

<<<<<<< HEAD
Applikasiya böyük siyahılı məlumatlar (100-lərlə və ya 1000-lərlə sətrdən ibarət) render etdikdə "windowing" adlı texnikadan istifadə etməyi tövsiyə edirik. Bu texnika ilə məlumatın yalnız kiçik hissəsi render olunaraq komponentlərin yenidən render edilməsi və yeni DOM nodların yaranması zamanını kəskin şəkildə azaldır.
=======
If your application renders long lists of data (hundreds or thousands of rows), we recommend using a technique known as "windowing". This technique only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created.
>>>>>>> 3aac8c59848046fb427aab4373a7aadd7069a24c

[react-window](https://react-window.now.sh/) və [react-virtualized](https://bvaughn.github.io/react-virtualized/) paketləri populyar windowing kitabxanalarıdır. Bu kitabxanalar siyahılar, qridlər, və cədvəllər göstərmək üçün bir neçə komponent təmin edirlər. Applikasiyanın xüsusi istifadəsinə uyğun olan windowing lazım olduqda [Twitter-in yolu ilə gedərək](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3) öz windowing komponentinizi yarada bilərsiniz.

## Rekonsilyasiyadan Çəkinmək {#avoid-reconciliation}

React, render olunan UI-ın daxili təmsilini yaradır və saxlayır. Bu təmsilə komponentlərdən qaytarılan React elementləri daxildir. Bu təmsil, lazım olmadıqda DOM nodlarının yaranmasını və istifadəsini azaltmağa imkan yaradır. DOM nodlarındə edilən əməliyyatlar, sadə JavaScript obyektlərində edilən əməliyyatlardan çox yavaşdır. Bu daxili təmsilin "virtual DOM" adlanmasına baxmayaraq eyni təmsil React Native-də də işlənilir.

Komponent propları və ya state-i dəyişdikdə yeni element ilə köhnə render olunmuş element müqayisə olunur. Elementlər eyni olmadıqda DOM yenilənir.

Yalnız dəyişən DOM nodların yenilənməsinə baxmayaraq yenidən render etmə əməliyyatı zaman çəkə bilər. Bir çox ssenaridə bu problem deyil. Lakin, yavaşlama nəzərə çarpan olduqda `shouldComponentUpdate` lifecycle funksiyasını (bu funksiya yenidən render etmə prosesi başlamamışdan öncə çağrılır) tətbiq edərək sürəti çoxalda bilərsiniz. Bu funksiyanın standart tətbiqi `true` qaytarır. Bu zaman, yeniləmələr React tərəfindən icra olunur:

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

Əgər bildiyiniz bəzi situasiyalarda komponent yenilənməməlidirsə, `shouldComponentUpdate` funksiyasından `false` qaytara bilərsiniz. `false` qaytarıldıqda yenilənən komponentin `render()` funksiyası daxil olmaqla render etmə prosesi buraxılacaq.

Bir çox ssenaridə `shouldComponentUpdate()` funksiyasını əl ilə yazmaq əvəzinə komponenti [`React.PureComponent`](/docs/react-api.html#reactpurecomponent) sinfindən gənişləndirə bilərsiniz. Bu, `shouldComponentUpdate()` funksiyasında cari və əvvəlki proplar və state-in dayaz müqayisə edilməsinə bərabərdir.

## shouldComponentUpdate Funksiyası Fəaliyyətdə {#shouldcomponentupdate-in-action}

Aşağıda komponentlər ağacı göstərilib. Hər komponentdə `SCU` dəyəri `shouldComponentUpdate` funksiyasından qaytarılan dəyəri, `vDOMEq` isə render olunan elementlərin bərabər olduğunu göstərir.  Yumrunun rəngi komponentin rekonsilyasiya olacağını göstərir.

<figure><img src="../images/docs/should-component-update.png" style="max-width:100%" /></figure>

C2-nin `shouldComponentUpdate` funksiyasının `false` qaytardığından C2 komponenti render edilmir. Bu səbəbdən, C4 və C5-in `shouldComponentUpdate` funksiyası çağrılmır.

C1 və C3-ün `shouldComponentUpdate` funksiyasının `true` qaytardığından komponentlərin bütün uşaqları yoxlanılır. C6-nın `shouldComponentUpdate` funksiyasının `true` qaytardığından və render olunan elementlərin eyni olmadığından DOM yenilənməli olur.

Ən sonuncu maraqlı komponent C8-dir. React bu komponenti render etməli olur. Lakin, qaytarılan React elementlərin əvvəlki render olunan elementlər ilə eyni olduğundan, DOM yenilənmir.

Nəzərə alın ki, React yalnız C6 üçün DOM-u yeniləyir. C8-də elementlər müqayisə edildikdən sonra DOM yenilənmir. C2 və C7-də isə `shouldComponentUpdate` funksiyasının `false` qaytardığından elementlərin müqayisəsi əməliyyatı baş vermir. Nəticədə, `render` funksiyası çağrılmır.

## Nümunələr {#examples}

Əgər komponent yalnız `props.color` və ya `state.count` dəyişənləri dəyişdikdə yenilənirsə, bunu `shouldComponentUpdate` ilə yoxlaya bilərsiniz:

```javascript
class CounterButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Tıklama sayı: {this.state.count}
      </button>
    );
  }
}
```

Bu kodda, `shouldComponentUpdate` funksiyası `props.color` və ya `state.count` dəyərlərinin dəyişdiyini yoxlayır. Dəyərlər dəyişmədikdə komponent yenilənmir. Komponent mürəkkəbləşdikdə `props` və `state`-in bütün dəyərlərini eyni formada "dayaz müqayisə" edərək komponentin yenilənməsini müəyyənləşdirə bilərsiniz. Bu müqayisə prinsipinin çox işlədildiyindən bunun üçün React-də faydalı sinif var: `React.PureComponent`. Aşağıdakı kod, yuxarıdakı kodun daha sadə formasıdır:

```js
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
```

Bir çox halda `shouldComponentUpdate` əvəzinə `React.PureComponent`-dən istifadə edə bilərsiniz. Bu sinif, proplar və state-i dayaz müqayisə edir. Bu səbəbdən, bu sinfi dayaz müqayisə ilə tam yoxlana bilməyən mürəkkəb dəyərləri yoxlamaq üçün istifadə etməyin.

Daha mürəkkəb məlumat strukturlarının dayaz müqayisəsi problem yarada bilər. Məsələn, vergül ilə ayrılmış sözləri render etmək üçün `ListOfWords` komponentinin və siyahıya söz əlavə etmək üçün `WordAdder` komponentinin olduğunu fikirləşin. Aşağıdakı kod düzgün *işləməyəcək*:

```javascript
class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(',')}</div>;
  }
}

class WordAdder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ['marklar']
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Bu bölmə səhvdir və baqlara səbəb olacaq
    const words = this.state.words;
    words.push('marklar');
    this.setState({words: words});
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick} />
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}
```

`PureComponent` sinfi `this.props.words` propunu sadə müqayisə edəcək. `WordAdder` komponentinin `handleClick` funksiyası `words` massivini mutasiya etdiyindən massivdəki sözlərin fərqli olmasına baxmayaraq `this.props.words` propu eyni qalacaq. Bu səbəbdən, yeni sözlərin render edilməli olmasına baxmayaraq `ListOfWords`  komponenti yenilənməyəcək.

## Məlumatları Mutasiya Etməməyin Gücü {#the-power-of-not-mutating-data}

Bu problemi həll etməyin ən asan yolu props və state-in dəyərlərini mutasiya etməməkdir. Məsələn, `handleClick` metodu `concat` funksiyası ilə yazıla bilər:

```javascript
handleClick() {
  this.setState(state => ({
    words: state.words.concat(['marklar'])
  }));
}
```

ES6-ın massivlər üçün [yayma sintaksisi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) ilə də massivə elementi əlavə etmək mümkündür. Create React App işlədirsinizsə bu sintaksis işləyəcək.

```js
handleClick() {
  this.setState(state => ({
    words: [...state.words, 'marklar'],
  }));
};
```

Siz, həmçinin obyektlərin mutasiya olunmaması üçün kodu dəyişə bilərsiniz. Məsələn, `colormap` obyektinin olduğunu və bu obyektin `colormap.right` dəyərini `'mavi'`-yə dəyişmək istədiyimizi fərz edək:

```js
function updateColorMap(colormap) {
  colormap.right = 'mavi';
}
```

Orijinal obyekti mutasiya etməmək üçün [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) funksiyasından istifadə edə bilərsiniz:

```js
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'mavi'});
}
```

İndi, `updateColorMap` funksiyası köhnə obyekti mutasiya etmək əvəzinə yeni obyekt qaytarır. `Object.assign` ES6-da işləyir və polifil tələb edir.

[Yayma sintaksisi](https://github.com/sebmarkbage/ecmascript-rest-spread) ilə də obyektləri mutasiyasız yeniləmək mümkündür:

```js
function updateColorMap(colormap) {
  return {...colormap, right: 'mavi'};
}
```

Bu xüsusiyyət JavaScript-də ES2018-də əlavə olunub. 

Create React App işlətdikdə `Object.assign` funksiyası və obyekt yayma sintaksisi işləcəyək.

Dərin obyektlərin mutasiyasız yenilənməsi çətin ola bilər. Bu problem ilə qarşılaşdıqda [Immer](https://github.com/mweststrate/immer) və ya [immutability-helper](https://github.com/kolodny/immutability-helper) kitabxanalarına baxın. Bu kitabxanalar mutasiyasızlığın faydalarını itirmədən rahat oxuna bilən kodun yazılmasına imkan yaradır.

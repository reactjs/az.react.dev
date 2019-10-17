---
id: optimizing-performance
title: Performansın Optimallaşdırılması
permalink: docs/optimizing-performance.html
redirect_from:
  - "docs/advanced-performance.html"
---

Daxildə, React, bir neçə ağıllı texnikadan istifadə edərək UI-ı yeniləmək üçün ağır DOM əməliyyatlarının sayını azaldır. Bir çox applikasiyada, performansı xüsusi optimallaşdırmadan React istifadə etdikdə tez itifadəçi interfeysi olacaq. Buna baxmayaraq React applikasiyasını tezləşdirməyin bir neçə yolu var.

## Produksiya Qurulmasından İstifadə Edin {#use-the-production-build}

React applikasiyalarında performans problemləri olduqda, minimallaşdırılmış produksiya qurulmasından istifadə etdiyinizdən əmin olun.

Normalda, React-də faydalı xəbərdarlıqlar var. Bu xəbərdarlıqlar development zamanı faydalıdır. Lakin, bu xəbərdarlıqlar React-i böyüdür və yavaşladır. Bu səbəbdən, applikasiyanı yerləşdirdikdə produksiya versiyasınını istifadəsindən əmin olun.

Qurulma prosesinin düzgün işlədiyindən əmin olmadıqda [Chrome üçün React Developer Alətlərindən](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) istifadə edin. Produksiya modunda olan React səhifəsini ziyarət etdikdə alətin ikonunun tünd fonu olacaq:

<img src="../images/docs/devtools-prod.png" style="max-width:100%" alt="React-in produksiya versiyasını işlədən səhifədə React DevTools ikonu">

Development modunda olan React səhifəsini ziyarət etdikdə alətin ikonunun qırmızı fonu olacaq:

<img src="../images/docs/devtools-dev.png" style="max-width:100%" alt="React-in development versiyasını işlədən səhifədə React DevTools ikonu">

Applikasiyanı düzəltmə zamanı development modundan istifadə edilməsi, istifadəçilər üçün yerləşdirilmə zamanı isə produksiya modunda istifadə edilməsi gözlənilir.

Applikasiyanın produksiya üçün düzəldilməsi üçün aşağıdakı təlimatlara baxın.

### Create React App {#create-react-app}

Layihə [Create React App](https://github.com/facebookincubator/create-react-app) ilə düzəldilibsə, aşağıdakı əmri icra edin:

```
npm run build
```

Bu, layihənin `build/` direktoriyasında applikasiyanın produksiya versiyasını yaradacaq.

Bunun yalnız produksiya zamanı işlədilməsini unutmayın. Normal development üçün, `npm start` əmrindən istifadə edin.

### Tək Fayl Qurulmaları {#single-file-builds}

Biz, React və React DOM-un produksiyaya hazır versiyalarını tək fayl ilə təmin edirik:

```html
<script src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

Yalnız `.production.min.js` ilə bitən faylların produksiya üçün uyğun olduğunu unutmayın.

### Brunch {#brunch}

Ən səmərəli Brunch produksiya qurulması üçün [`terser-brunch`](https://github.com/brunch/terser-brunch) plaginin yükləyin:

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

Bunun yalnız produksiya zamanı işlədilməsini unutmayın. Development zamanı `-p` arqumentini və ya plagini tətbiq etməyin. Çünki, bu, qurulma əməliyyatını çox yavaşladacaq və React-in faydalı xəbərdarlıqlarını gizlədəcək.

### Browserify {#browserify}

Ən səmərəli Browserify produksiya qurulması üçün bir neçə plagin yükləyin:

```
# npm işlədirsinizsə
npm install --save-dev envify terser uglifyify 

# Yarn işlədirsinizsə
yarn add --dev envify terser uglifyify 
```

Produksiya qurulması yaratmaq üçün aşağıdakı çevirmələri əlavə edin **(sıralama vacibdir)**:

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

Bunun yalnız produksiya zamanı işlədilməsini unutmayın. Development zamanı bu plaginləri tətbiq etməyin. Çünki, bu, qurulma əməliyyatını çox yavaşladacaq və React-in faydalı xəbərdarlıqlarını gizlədəcək.

### Rollup {#rollup}

Ən səmərəli Browserify Rollup qurulması üçün bir neçə plagin yükləyin:

```bash
# npm işlədirsinizsə
npm install --save-dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser

# Yarn işlədirsinizsə
yarn add --dev rollup-plugin-commonjs rollup-plugin-replace rollup-plugin-terser
```

Produksiya qurulması yaratmaq üçün aşağıdakı plaginləri əlavə edin **(sıralama vacibdir)**:

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

Tam qurulma üçün [bu gist-ə baxın](https://gist.github.com/Rich-Harris/cb14f4bc0670c47d00d191565be36bf0).

Bunun yalnız produksiya zamanı işlədilməsini unutmayın. Development zamanı `terser` və ya `replace` plaginini `'production'` dəyəri ilə tətbiq etməyin. Çünki, bu, qurulma əməliyyatını çox yavaşladacaq və React-in faydalı xəbərdarlıqlarını gizlədəcək.

### webpack {#webpack}

>**Qeyd:**
>
>Create React App işlədirsinizsə [yuxarıdalı təlimatlara baxın](#create-react-app).<br>
>Bu bölmə, webpack-i birbaşa konfiqurasiyası üçün uyğundur.

Webpack v4+ versiyası produksiya modundan kodu avtomatik minimallaşdıracaq.

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({ /* burada əlavə parametlər əlavə edə bilərsiniz */ })],
  },
};
```

Əlavə məlumat üçün [webpack sənədlərinə](https://webpack.js.org/guides/production/) baxın.

Bunun yalnız produksiya zamanı işlədilməsini unutmayın. Development zamanı `TerserPlugin` plaginini tətbiq etməyin. Çünki, bu, qurulma əməliyyatını çox yavaşladacaq və React-in faydalı xəbərdarlıqlarını gizlədəcək.

## Chrome Performans Təbi ilə Komponentləri Profayl Edilməsi {#profiling-components-with-the-chrome-performance-tab}

**development** modunda komponentlərin necə mount edildiyini, yeniləndiyini, və unmount edildiyini, dəstəklənən brauzerlərin performans alətləri ilə görüntülüyə bilərsiniz. Məsələn:

<center><img src="../images/blog/react-perf-chrome-timeline.png" style="max-width:100%" alt="Chrome qrafikində React komponentləri" /></center>

Chrome-da edə bilmək üçün:

1. Müvəqqəti olaraq **React DevTools xüsusi olmaqla bütün Chrome artırmalarını söndürün**. Artırmalar nəticənin səhv göstərilməsinə səbəb ola bilər!

2. Applikasiyanın development modunda olduğundan əmin olun.

3. Chrome DevTools-un **[Performans](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/timeline-tool)** təbinə daxil olun və **Record** düyməsini tıklayın.

4. Profayl etmək istədiyiniz əməliyyatları icra edin. 20 saniyədən çox rekord etməyin. Əks halda Chrome ilişə bilər.

5. Rekord etməni saxlayın.

6. React hadisələri **User Timing** adı altında qruplanacaqlar.

Daha ətraflı izahat üçün [Ben Şvarsın məqaləsini oxuyun](https://calibreapp.com/blog/2017-11-28-debugging-react/).

Nəzərə alin ki, **rəqəmələr nisbidir. Produksiya zamanı komponentlər daha tez işləyəcək**. Bu, lazımsız UI-ın səhvən yeniləndiyini və UI yeniliklərinin hansl dərinlikdə və tezlikdə olduğunu görməyə imkan yaradacaq.

İndiki zamanda, bu xüsusiyyəti dəstəkləyən brauzerlər Chrome, Edge, və IE-dır. Lakin, bizim [User Timing API-ından](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) istifadə etdiyimizsən bu xüsusiyyətin daha çox brauzerdə işləyəcəyini gözləyirik.

## DevTools Profayleri ilə Komponentləri Profayl Edilməsi {#profiling-components-with-the-devtools-profiler}

`react-dom` 16.5+ və `react-native` 0.57+ versiyalarında React DevTools Profaylerin DEV modda daha inkişaf etmiş qabiliyyətləri var.
Profaylerin icmalına ["Introducing the React Profiler"](/blog/2018/09/10/introducing-the-react-profiler.html) bloq yazısından baxa bilərsiniz.
Profaylerin video izahatına [Youtube-dan](https://www.youtube.com/watch?v=nySib7ipZdk) baxa bilərsiniz.

React DevTools yükləməmisinizsə, aşağıdakı linklərdən baxa bilərsiniz:

- [Chrome Brauzer Artımı](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
- [Firefox Brauzer Artımı](https://addons.mozilla.org/en-GB/firefox/addon/react-devtools/)
- [Bağımsız Nod Paketi](https://www.npmjs.com/package/react-devtools)

> Qeyd
>
> `react-dom`-un produksiyada profayl edilməsi `react-dom/profiling` paketində mövcuddur.
> Bu paketin istifadəsi üçün [fb.me/react-profiling](https://fb.me/react-profiling) səhifəsinə baxın.

## Böyük Siyahıların Virtuallaşdırılması {#virtualize-long-lists}

Applikasiya böyük siyahılı məlumatlar (100-lərlə və ya 1000-lərlə sətrdən ibarət) render etdikdə "windowing" adlı texnikadan istifadə etməyi tövsiyyə edirik. Bu texnika ilə məlumatın yalnız kiçik hissəsi render olunaraq komponentlərin yenidən render edilməsi və yeni DOM nodların yaranması zamanını kəskin şəkildə azaldır.

[react-window](https://react-window.now.sh/) və [react-virtualized](https://bvaughn.github.io/react-virtualized/) paketlər populyar windowing kitabxanalarıdır. Bu kitabxanalar siyahılar, qridlər, və cədvəllər göstərmək üçün bir neçə komponent təmin edirlər. Applikasiyanın xüsusi istifadəsinə uyğun olan windowing lazım olduqda, [Twitter-in etdiyi kimi](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3) öz windowing komponentinizi yarada bilərsiniz.

## Rekonsilyasidan Çəkinmək {#avoid-reconciliation}

React, render olunan UI-ın daxili təmsilini yaradır və saxlayır. Bu təmsilə komponentlərdən qaytarılan React elementləri daxildir. Bu təmsil, React-ə lazım olmadıqda DOM nodların yaranmasını və istifadəsini azaldır. Çünki, DOM nodlarındə edilən əməliyyatlar, sadə JavaScript obyektlərində edilən əməliyyatlardan yavaşdır. Bu daxili təmsilin "virtual DOM" adlanmasına baxmayaraq, eyni təmsil React Native-də də işlənilir.

Komponent propları və ya state-i dəyişdikdə yeni element ilə köhnə render olunmuş element müqayisə olunur. Elementlər eyni olmadıqda React, DOM-u yeniləyir.

Yalnız dəyişən DOM nodların yenilənməsinə baxmayaraq, yenidən render etmə əməliyyatı zaman çəkə bilər. Bir çox ssenaridə bu problem deyil. Lakin, yavaşlama nəzərə çarpan olduqda `shouldComponentUpdate` lifecycle funksiyasını (bu funksiya yenidən render etmə prosesi başlamamışdan öncə çağrılır) tətbiq edərək sürəti çoxalda bilərsiniz. Bu funksiyanın standart tətbiqi `true` qaytarır. Bu zaman, yeniləməni hər zaman React icra edir:

```javascript
shouldComponentUpdate(nextProps, nextState) {
  return true;
}
```

Əgər bildiyiniz bəzi situasiyalarda komponent yenilənməməlidirsə, `shouldComponentUpdate` funksiyasından `false` qaytara bilərsiniz. `false` qaytarıldıqda yeninən komponentin `render()` funksiyası daxil olmaqla render etmə prosesi buraxılacaq.

Bir çox ssenaridə `shouldComponentUpdate()` funksiyasını əl ilə yazmaq əvəzinə komponenti [`React.PureComponent`](/docs/react-api.html#reactpurecomponent) klasından gənişləndirə bilərsiniz. Bu, `shouldComponentUpdate()` funksiyasında cari və əvvəlki proplar və state-in dayaz müqayisə edilməsinə bərabərdir.

## shouldComponentUpdate In Action {#shouldcomponentupdate-in-action}

Aşağıda komponentlər ağacı göstərilib. Hər komponentdə `SCU` dəyəri `shouldComponentUpdate` funksiyasından qaytarılan dəyəri, `vDOMEq` isə render olunan elementlərin bərabər olduğunu göstərir. Ən sonda, yumrunun rəngi komponentin rekonsilyasiya olacağını göstərir.

<figure><img src="../images/docs/should-component-update.png" style="max-width:100%" /></figure>

C2-nin `shouldComponentUpdate` funksiyası `false` qaytardığından React, C2 komponentini render etmir. Bu səbəbdən, C4 və C5-in `shouldComponentUpdate` funksiyası çağrılmır.

C1 və C3-ün `shouldComponentUpdate` funksiyası `true` qaytardığından React, komponentlərin bütün uşaqlarını yoxlayır. C6-nın `shouldComponentUpdate` funksiyası `true` qaytardığından və render olunan elementlərin eyni olmadığından React, DOM-u yeniləməli olur.

Ən sonuncu maraqlı komponent C8-dir. React bu komponenti render etməli olur. Lakin, qaytarılan React elementlərin əvvəlki render olunan elementlər ilə eyni olduğundan, DOM yenilənmir.

Nəzərə alın ki, React yalnız C6 üçün DOM-u yeniləyir. C8-də elementləri müqayisə etdikdən sonra DOM yenilənmir. C2 və C7-də isə `shouldComponentUpdate` funksiyasın `false` qaytardığından elementlərin müqayisəsi əməliyyatı baş vermir. Nəticədə, `render` funksiyası çağrılmır.

## Nümunələr {#examples}

Əgər komponent yalnız `props.color` və ya `state.count` dəyişənləri dəyişdikdə yenilənirsə `shouldComponentUpdate` ilə bunu yoxlaya bilərsiniz:

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
        Tıklanma sayı: {this.state.count}
      </button>
    );
  }
}
```

Bu kodda, `shouldComponentUpdate` funksiyası `props.color` və ya `state.count` dəyərlərin dəyişdiyini yoxlayır. Dəyərlər dəyişmədikdə komponent yenilənmir. Komponent mürəkkəbləşdikdə eyni formada `props` və `state`-in bütün dəyərlərini "dayaz müqayisə" edərək komponentin yenilənməsini müəyyənləşdirə bilərsiniz. Bu müqayisə prinsipin çox işlədildiyindən React bunun üçün faydalı klas təmin edir: Komponenti `React.PureComponent` klasından genişləndirin. Aşağıdakı kod, yuxarıdakı kodun daha sadə formasıdır:

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

Bir çox halda `shouldComponentUpdate` əvəzinə `React.PureComponent`-dən istifadə edə bilərsiniz. Burada yalnız dayaz müqayisə edildiyindən bu klas ilə proplar və ya state-in dayaz müqayisə zamanı yoxlanmadığı dəyərlər üçün istifadə etməyin.

Daha mürəkkəb məlumat strukturlarında dayaz müqayisə problem yarada bilər. Məsələn, vergül ilə ayrılmış sözləri render etmək üçün `ListOfWords` komponentin və siyahıya söz əlavə etmək üçün `WordAdder` komponentinin olduğunu fikirləşin. Aşağıdakı kod düzgün *işləməyəcək*:

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

`PureComponent` klası `this.props.words` propunu sadə müqayisə edəcək. `WordAdder` komponentinin `handleClick` funksiyası `words` massivini mutasiya etdiyindən massivdəki sözlərin fərqli olmasına baxmayaraq `this.props.words` propu eyni olacaq. Bu səbəbdən, yeni sözlərin render edilməli olmasına baxmayaraq `ListOfWords`  komponenti yenilənməyəcək.

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

Siz, həmçinin obyektlərin mutasiya olunmaması üçün kodu dəyişə bilərsiniz. Məsələn, `colormap` obyektinin olduğunu və bu obyektin `colormap.right` dəyərinin `'mavi'`-yə çevirmək istədiyimizi fərz edək:

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

İndi `updateColorMap` funksiyası köhnə obyekti mutasiya etmək əvəzinə yeni obyekt qaytarır. `Object.assign` ES6-da işləyir. Lakin polifil tələb edir.

ES6-ın obyektlər üçün [yayma sintaksisi](https://github.com/sebmarkbage/ecmascript-rest-spread) ilə də obyektləri mutasiyasız yeniləmək mümkündür:

```js
function updateColorMap(colormap) {
  return {...colormap, right: 'mavi'};
}
```

Create React App işlətdikdə `Object.assign` funksiyası və obyekt yayma sintaksisi işləcəyək.

Dərin obyektlərin mutasiyasız yenilənməsi çətin ola bilər. Bu problem ilə qarşılaşdıqda [Immer](https://github.com/mweststrate/immer) və ya [immutability-helper](https://github.com/kolodny/immutability-helper) kitabxanalarına baxın. Bu kitabxanalar rahat mutasiyasızlığın faydalarını itirmədən rahat oxuna bilən kod yazmağa imkan yaradır.

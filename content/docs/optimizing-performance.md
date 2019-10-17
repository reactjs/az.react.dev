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

## Chrome Performans Təbi ilə Komponentləri Profayl Etmək {#profiling-components-with-the-chrome-performance-tab}

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

## DevTools Profayleri ilə Komponentləri Profayl Etmək {#profiling-components-with-the-devtools-profiler}

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

Bir çox ssenaridə `shouldComponentUpdate()` funksiyasını əl ilə yazmaq əvəzinə komponenti [`React.PureComponent`](/docs/react-api.html#reactpurecomponent) klasından gənişləndirə bilərsiniz. Bu, `shouldComponentUpdate()` funksiyasında cari və əvvəlki proplar və state-i müqayisə etməyə bərabərdir.

## shouldComponentUpdate In Action {#shouldcomponentupdate-in-action}

Here's a subtree of components. For each one, `SCU` indicates what `shouldComponentUpdate` returned, and `vDOMEq` indicates whether the rendered React elements were equivalent. Finally, the circle's color indicates whether the component had to be reconciled or not.

<figure><img src="../images/docs/should-component-update.png" style="max-width:100%" /></figure>

Since `shouldComponentUpdate` returned `false` for the subtree rooted at C2, React did not attempt to render C2, and thus didn't even have to invoke `shouldComponentUpdate` on C4 and C5.

For C1 and C3, `shouldComponentUpdate` returned `true`, so React had to go down to the leaves and check them. For C6 `shouldComponentUpdate` returned `true`, and since the rendered elements weren't equivalent React had to update the DOM.

The last interesting case is C8. React had to render this component, but since the React elements it returned were equal to the previously rendered ones, it didn't have to update the DOM.

Note that React only had to do DOM mutations for C6, which was inevitable. For C8, it bailed out by comparing the rendered React elements, and for C2's subtree and C7, it didn't even have to compare the elements as we bailed out on `shouldComponentUpdate`, and `render` was not called.

## Examples {#examples}

If the only way your component ever changes is when the `props.color` or the `state.count` variable changes, you could have `shouldComponentUpdate` check that:

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
        Count: {this.state.count}
      </button>
    );
  }
}
```

In this code, `shouldComponentUpdate` is just checking if there is any change in `props.color` or `state.count`. If those values don't change, the component doesn't update. If your component got more complex, you could use a similar pattern of doing a "shallow comparison" between all the fields of `props` and `state` to determine if the component should update. This pattern is common enough that React provides a helper to use this logic - just inherit from `React.PureComponent`. So this code is a simpler way to achieve the same thing:

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

Most of the time, you can use `React.PureComponent` instead of writing your own `shouldComponentUpdate`. It only does a shallow comparison, so you can't use it if the props or state may have been mutated in a way that a shallow comparison would miss.

This can be a problem with more complex data structures. For example, let's say you want a `ListOfWords` component to render a comma-separated list of words, with a parent `WordAdder` component that lets you click a button to add a word to the list. This code does *not* work correctly:

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
    // This section is bad style and causes a bug
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

The problem is that `PureComponent` will do a simple comparison between the old and new values of `this.props.words`. Since this code mutates the `words` array in the `handleClick` method of `WordAdder`, the old and new values of `this.props.words` will compare as equal, even though the actual words in the array have changed. The `ListOfWords` will thus not update even though it has new words that should be rendered.

## The Power Of Not Mutating Data {#the-power-of-not-mutating-data}

The simplest way to avoid this problem is to avoid mutating values that you are using as props or state. For example, the `handleClick` method above could be rewritten using `concat` as:

```javascript
handleClick() {
  this.setState(state => ({
    words: state.words.concat(['marklar'])
  }));
}
```

ES6 supports a [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) for arrays which can make this easier. If you're using Create React App, this syntax is available by default.

```js
handleClick() {
  this.setState(state => ({
    words: [...state.words, 'marklar'],
  }));
};
```

You can also rewrite code that mutates objects to avoid mutation, in a similar way. For example, let's say we have an object named `colormap` and we want to write a function that changes `colormap.right` to be `'blue'`. We could write:

```js
function updateColorMap(colormap) {
  colormap.right = 'blue';
}
```

To write this without mutating the original object, we can use [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method:

```js
function updateColorMap(colormap) {
  return Object.assign({}, colormap, {right: 'blue'});
}
```

`updateColorMap` now returns a new object, rather than mutating the old one. `Object.assign` is in ES6 and requires a polyfill.

There is a JavaScript proposal to add [object spread properties](https://github.com/sebmarkbage/ecmascript-rest-spread) to make it easier to update objects without mutation as well:

```js
function updateColorMap(colormap) {
  return {...colormap, right: 'blue'};
}
```

If you're using Create React App, both `Object.assign` and the object spread syntax are available by default.

When you deal with deeply nested objects, updating them in an immutable way can feel convoluted. If you run into this problem, check out [Immer](https://github.com/mweststrate/immer) or [immutability-helper](https://github.com/kolodny/immutability-helper). These libraries let you write highly readable code without losing the benefits of immutability.

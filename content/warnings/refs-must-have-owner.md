---
title: Ref-lərin Sahibləri Olması Xəbərdarlığı
layout: single
permalink: warnings/refs-must-have-owner.html
---

Siz aşağıdakı xəta mesajlarına görə buradasınız:

*React 16.0.0+*
> Warning:
>
> Element ref was specified as a string (myRefName) but no owner was set. You may have multiple copies of React loaded. (details: https://fb.me/react-refs-must-have-owner).

*React-in əvvəlki versiyalarında*
> Warning:
>
> addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded.

Bunun adətən üç səbəbi var:

- `ref`-i funksiya komponentinə qoşursunuz.
- Komponentin render() funksiyasından kənarda yaranan elementə mətn `ref`-i qoşursunuz.
- Layihənizd React-in konfliktdə olan bir neçə versiyası yüklənib (məsələn, səhv qurulmuş NPM paketinə görə).

## Funksiya Komponentlərinə Ref-lər {#refs-on-function-components}

Əgər `<Foo>` funksiya komponentidirsə, bu komponentə ref əlavə etmək olmaz:

```js
// Əgər Foo funksiyadırsa, işləməyəcək!
<Foo ref={foo} />
```

Əgər komponentə ref əlavə etmək lazımdırsa, bu komponenti ilk olaraq klasa çevirin. Və ya komponentlər üçün ümümiyyətlə ref işlətməyin. Çünki bu [nadir hallarda lazımdır](/docs/refs-and-the-dom.html#when-to-use-refs).

## Render Funksiyasından Kənarda Mətn Ref-ləri {#strings-refs-outside-the-render-method}

Adətən sahibi olmayan komponentə (yəni digər komponentin `render` funksiyasından əlavə edilməyən) `ref` əlavə etdikdə xəbədarlıq baş verir. Məsələn, aşağıdaki kod işləməyəcək:

```js
// İşləmir!
ReactDOM.render(<App ref="app" />, el);
```

Bu komponenti ref-i saxlayan valideyn komponentdən render edin. Alternativ olaraq callback ref-indən istifadə edə bilərsiniz:

```js
let app;
ReactDOM.render(
  <App ref={inst => {
    app = inst;
  }} />,
  el
);
```

Bu yolu işlətməmişdən öncə [sizə ref-lərin tam lazım olmasından](/docs/refs-and-the-dom.html#when-to-use-refs) əmin olun.

## React-in Bir Neçə Kopiyası {#multiple-copies-of-react}

Bower asılılıqların duplikasiyalarını silə bilir. NPM isə bunu etmir. Əgər siz ref-lər ilə işləmirsinizsə problem ref-lərdə olmaya bilər. Layihədə React-in bir neçə kopiyasının yükləməsindən problem yarana bilər. Bəzən, 3-cü tərəfin modulunu NPM ilə yüklədikdə, bu modul React-in fərqli kopiyasını yükləyə bilər. Bu səbəbdən problemlər yarana bilər.

Əgər NPM işlədirsinizsə `npm ls` və ya `npm ls react` əmrləri nə baş verdiyinə aydınlıq gətirə bilər.

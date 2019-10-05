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

*earlier versions of React*
> Warning:
>
> addComponentAsRefTo(...): Only a ReactOwner can have refs. You might be adding a ref to a component that was not created inside a component's `render` method, or you have multiple copies of React loaded.

Bunun adətən üç səbəbi var:

- Siz `ref`-i funksiya komponentinə əlavə edirsiniz.
- Siz `ref`-i komponentin render() funksiyasından kənarda yaranan elementə əlavə edirsiniz.
- Sizdə React-in bir neçə (konfliktdə olan) versiyası yüklənib (məsələn, səhv qurulmuş NPM paketinə görə).

## Funkisya Komponentlərinə Ref-lər {#refs-on-function-components}

Əgər `<Foo>` funksiya komponentidirsə, siz buna ref əlavə edə bilməzsiniz:

```js
// Foo funkisyadırsa, bu işləməyəcək!
<Foo ref={foo} />
```

Əgər komponentə ref əlavə etmək lazımdırsa, bu komponenti ilk olaraq klasa çevirin. Və ya komponentlər üçün ümümiyyətlə ref işlətməyin. Çünki bu [nadir hallarda lazımdır](/docs/refs-and-the-dom.html#when-to-use-refs).

## Render Funksiyasından Kənarda Mətn Ref-ləri {#strings-refs-outside-the-render-method}

Bu adətən ref-i sahibi olmayan komponentə (yəni digər komponentin `render` funksiyasından əlavə edilməyən) əlavə etdikdə baş verir. Məsələn, bu işləməyəcək:

```js
// İşləmir!
ReactDOM.render(<App ref="app" />, el);
```

Bu komponenti ref-i saxlayan digər komponentdə render edin. Alternativ olaraq, callback ref-indən istifadə edə bilərsiniz:

```js
let app;
ReactDOM.render(
  <App ref={inst => {
    app = inst;
  }} />,
  el
);
```

Bu yolu işlətməmişdən öncə [ref-lərin sizə tam lazım olmasından](/docs/refs-and-the-dom.html#when-to-use-refs) əmin olun.

## React-in Bir Neçə Kopiyası {#multiple-copies-of-react}

Bower asılılıqların duplikasiyalarını silə bilir. NPM isə bunu etmir. Əgər siz ref-lər ilə işləmirsinizsə, problem ref-lərdə olmaya bilər. Problem layihədə bir neçə React kopiyasının yükləməsindən ola bilər. Bəzən, 3-cü tərəfin modulunu NPM ilə yüklədikdə, bu modul React-in fərqli kopiyasını yükləyə bilər. Bu səbəbdən problemlər yarana bilər.

Əgər NPM işlədirsinizsə `npm ls` və ya `npm ls react` sizə nə baş verdiyini göstərə bilər.

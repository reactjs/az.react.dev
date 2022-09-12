---
id: hello-world
title: Salam Dünya
permalink: docs/hello-world.html
prev: cdn-links.html
next: introducing-jsx.html
---

Ən qısa React nümunəsi belə görsənir:

<<<<<<< HEAD
```js
ReactDOM.render(
  <h1>Salam Dünya!</h1>,
  document.getElementById('root')
);
=======
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<h1>Hello, world!</h1>);
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6
```

Bu kod, səhifədə "Salam Dünya!" başlığını yazır.

**[Try it on CodePen](https://codepen.io/gaearon/pen/rrpgNB?editors=1010)**

Onlayn redaktoru açmaq üçün yuxarıda qeyd olunan linkə keçid edin. Bu redaktorda dəyişiklik etməkdən çəkinməyin. və nəticənin necə olacağına baxın. Bu təlimatda olan bir çox səhifədə buna bənzər redaktə oluna bilən nümunələr görəcəksiniz.

## Təlimatı necə oxumaq lazımdır {#how-to-read-this-guide}

Təlimatda, React-in fundamental blokları haqqında bəhs edəcəyik: element və komponent. Onları yaxşı mənimsədikdən sonra, kiçik təkrar istifadə oluna bilən bloklardan kompleks applikasiyalar yarada biləcəksiniz.

>Məsləhət
>
>Bu təlimat **addım-addım öyrənməyi** tərcih edən insanlar üçün nəzərdə tutulub. Əgər siz praktika edərək öyrənməyi tərcih edirsinizsə, [praktiki dərsliyi](/tutorial/tutorial.html) nəzərdən keçirin. Bu təlimatlar bir-birini tamamlayır.

Bu sənəd, React-in əsas konseptlərini addım-addım öyrənmək üçün ilk hissədir. Sağdakı siyahıda bütün sənədlər ilə tanış ola bilərsiniz. Siz bu sənədi mobildə cihazdan oxuyursunuzsa yuxarı sağda olan düymədən istifadə edərək siyahını görə bilərsiniz.

Bu təlimatda olan hər bir sənəd, bir əvvəlki sənədlərdə öyrəndiyimiz biliklərə əsaslanır. **React-in böyük hissəsini öyrənə bilmək üçün siyahıda olan “Əsas Konseptlər” bölməsini göstərilmiş sırada oxuyun.** Misal üçün [“JSX-ə giriş”](/docs/introducing-jsx.html) bu sənəddən sonrakı hissədir.

## Bilik Səviyyəsi Haqqında Fərziyyələrimiz {#knowledge-level-assumptions}

React bir Javascript kitabxanısıdır. Bu səbəbdən sizin Javascript programlaşdırma dilinin əsaslarını bildiyinizi güman edirik. **Əgər siz bu sahədə biliklərinizə güvənmirsinizsə [JavaScript sənədlərinini oxumağı](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) məsləhət görürük.** Bunun 30 dəqiqə və ya bir saat çəkə biləcəyinə baxmayaraq, siz həm React-i həm Javascript-i eyni vaxtda öyrənmək məcburiyyətində qalmayacaqsınız.

>Qeyd
>
<<<<<<< HEAD
>Təlimatda zaman zaman Javascript-in yeni sintaksisindən istifadə olunur. Əgər spon illərdə Javascript ilə işləməmisinizsə, [bu üç nöqtə](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c) sənədlərin böyük hissəsini anlamağınıza yardım edəcək.
=======
>This guide occasionally uses some newer JavaScript syntax in the examples. If you haven't worked with JavaScript in the last few years, [these three points](https://gist.github.com/gaearon/683e676101005de0add59e8bb345340c) should get you most of the way.
>>>>>>> c7d858947f832d1ba4e78caebc391fd964ff6de6

## Gəlin başlayaq! {#lets-get-started}

Aşağı skrol edərək, [təlimatın növbəti hissəsi](/docs/introducing-jsx.html) linkini görəcəksiniz.


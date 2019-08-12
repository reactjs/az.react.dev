---
id: error-boundaries
title: Xəta Sərhədləri
permalink: docs/error-boundaries.html
---

Keçmişdə, komponent daxilində baş verən Javascript xətaları, React-in daxili vəziyyətini korlayıb, sonrakı renderlərdə [kriptik](https://github.com/facebook/react/issues/6895) [xətalar](https://github.com/facebook/react/issues/8579) [göstərirdi](https://github.com/facebook/react/issues/4026). Bu xətaların həmişə applikasiya kodunda əvvəlki xətalara görə baş verməyinə baxmayaraq, React bu xətaların komponent daxilində idarəsi üçün və bu xətalardan bərpa olunmaq üçün heç bir mexanizm təmin etmirdi.

## Xəta Sərhədlərinin Təqdim Edilməsi {#introducing-error-boundaries}

UI-ın bir hissəsində baş verən Javascript xətası bütün applikasiyanı sındırmamalıdır. Bu problemin React-də həll olunması üçün, React 16 "xəta sərhədi" adında yeni bir konsepsiya təqdim edir.

Xəta sərhədləri **uşaq komponent ağacında baş verən Javascript xətaları tutan, bu xətaları qeydiyyata alan və xəta olduqda fallback UI göstərən** bir React komponentidir. Xəta sərhədləri render zamanı, lifecycle metodlarında, və bütün altında olan ağacdakı konstruktorlarda baş verən xətaları tutur.

> Qeyd
>
> Xəta sərhədləri aşağıda baş verən xətaları **tutmur**:
>
> * Hadisə işləyicilərində ([daha ətraflı](#how-about-event-handlers))
> * Asinxron kod (məsələn `setTimeout` və ya  `requestAnimationFrame` callback-ləri)
> * Serverdə render edilməsi zamanı
> * Xəta sərhədinin daxilində atılan xətalar (uşaqda atılmağın yerinə)

Klass komponenti göstərilən [`static getDerivedStateFromError()`](/docs/react-component.html#static-getderivedstatefromerror) və ya [`componentDidCatch()`](/docs/react-component.html#componentdidcatch) lifecycle metodlarının birini (və ya hər ikisini)  tətbiq etdikdə xəta sərhədinə çevrilir. `static getDerivedStateFromError()` funskiyasını xəta atıldıqdan sonra fallback UI render etmək üçün işlədin. `componentDidCatch()` funskiyasını xətaları qeydiyyata almaq üçün işlədin.

```js{7-10,12-15,18-21}
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Gələn renderdə UI göstərmək üçün state-i yeniləyin.
    return { hasError: true };
  }

<<<<<<< HEAD
  componentDidCatch(error, info) {
    // Siz həmçinin xətaları, xəta hesabat servislərində qeydiyyata ala bilərsiniz
    logErrorToMyService(error, info);
=======
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
>>>>>>> ddbd064d41d719f9ec0c2f6a4227f797a5828310
  }

  render() {
    if (this.state.hasError) {
      // Siz hər hansı bir fallback UI render edə bilərsiniz
      return <h1>Bir şey yalnış getdi.</h1>;
    }

    return this.props.children; 
  }
}
```

Sonra siz bunu normal komponent kimi işlədə bilərsiniz:

```js
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

Xəta sərhədləri komponentlər üçün Javascript-in `catch {}` bloku kimi işləyirlər. Yalnız klas komponentləri xəta sərhədləri ola bilər. Praktikada, bir çox zaman, siz xəta sərhədi komponentini bir dəfə tətbiq edib bütün applikasiya zamanı işlətmək istəyərsiniz.

Qeyd edək ki, **xəta sərhədləri yalnız altındakı ağacda olan komponentlərin xətalarını tuta bilir**. Xəta sərhədi daxilində baş verən xətanı tuta bilmir. Əgər xəta sərhədin xəta mesajını render edə bilmirsə, xəta bu komponentin yuxarısında olan ən yaxın xəta sərhədinə yayılacaq. Javascriptin catch {} funskiyasıda bunun kimi işləyir.

## Canlı Demo {#live-demo}

[React 16-da](/blog/2017/09/26/react-v16.0.html) [xəta sərhədinin yaranması və işlənməsi misalına](https://codepen.io/gaearon/pen/wqvxGa?editors=0010) baxın.


## Xəta Sərhədlərini Harada Yerləşdirək {#where-to-place-error-boundaries}

Xəta sərhədlərinin zənginliyi / əhatəsi sizdən asılıdır. Siz ən yuxarıda olan route komponentlərini əhatə edib, server tərəfində işlənilən freymvorklardakı kimi, "Bir şey yalnış getdi" mesajını istifadəçiyə göstərə bilərsiniz. Siz həmçinin fərdi vidcetlərini xəta sərhədləri ilə əhatə edib xətaların bütün applikasiyanı sındırmasından qoruya bilərsiniz.

## Tutulmamış Xətalar üçün Yeni Davranış {#new-behavior-for-uncaught-errors}

Bu dəyişikliyin vacib bir təsiri var. **React 16-dan başlayaraq, xəta sərhədində tutulmayan xətalar, React komponent ağacının bütünlüklə DOM-dan çıxarılmasına səbəb olacaq.**

Biz bu qərarı müzakirə etdik və bizim təcrübəmizdən korlanmış UI-ı yerində saxlamaq, bu UI-ı bütün silməkdən daha pisdir. Məsələn, Messenger kimi bir məhsulda, sınmış UI-ı göstərmək, kiminsə yalnış adama mesaj göndərməsinə səbəb ola bilər. Eyniliklə, ödəmə applikasiyasının yalnız dəyər göstərməsi heç nə göstərməsindən daha pisdir.

Bu dəyişikliklə siz React 16-a miqrasiya etdikdə, sizin applikasiyanızda əvvəl fikir vermədiyiniz mövcud xətaların üstünü aça biləcəksiniz. Xəta sərhədlərini əlavə etməklə bir şey yalnış getdikdə daha yaxşı istifadəçi təcrübəsi yarada bilərsiniz.

Məsələn, Facebook Messenger sidebar-ı, məlumat panelini, chat yazılarını, və mesaj daxil etməsini ayrılıqda xəta sərhədləri ilə əhətə edir. Əgər hər hansı bir UI sahəsində bir komponent sınırsa, applikasiyanın qalanı interaktiv qalır.

Biz həmçinin sizin Javascript xəta servislərindən (və ya özünüz düzəldin) istifadə etməyi tövsiyyə edirik. Bu servislər ilə production-da baş verən xətaları tapıb, bu xətaları düzədə bilərsiniz.

## Komponent Stek İzləri {#component-stack-traces}

React 16 render zamanı baş verən bütün xətaları, applikasiya təsadüfən bu xətaları udsa belə, development zamanı brauzerin konsoluna yazır. Xəta mesajı və Javascript stekindən əlavə, həmçinin React 16 həmçinin komponent stek izlərini göstərir. İndi siz xətanın komponent ağacında dəqiq harada baş verdiyini görə bilərsiniz:

<img src="../images/docs/error-boundaries-stack-trace.png" style="max-width:100%" alt="Xətanın Error Boundary komponenti tərəfindən tutulması">

Siz komponentin stek izində fayl adlarını və sətir nömrələrini də görə bilərsiniz. Bu [Create React App](https://github.com/facebookincubator/create-react-app) layihələrində birbaşa işləyir:

<img src="../images/docs/error-boundaries-stack-trace-line-numbers.png" style="max-width:100%" alt="Xətanın Error Boundary komponenti tərəfindən sətir nömrələri ilə tutulması">

Əgər siz Create React App istifadə etmirsinizsə, siz [bu plugini](https://www.npmjs.com/package/babel-plugin-transform-react-jsx-source) əllə Babel konfiqurasiyasına əlavə edə bilərsiniz. Qeyd edək ki, bu yalnız development zamanı işlətmək üçündür və **production-də söndürülməlidir**.

> Qeyd
>
> Komponent adları stek izlərində [`Function.name`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name) parametrindən asılıdır. Əgər siz bu parametri nativ formada dəstəkləməyən köhnə brauzerləri və cihazları dəstəkləyirsinizsə (məsələn IE 11), `Function.name` polifilini (məsələn [`function.name-polyfill`](https://github.com/JamesMGreene/Function.name)) paketlənmiş applikasiyanıza əlavə edin. Alternativ olaraq, siz açıq şəkildə `displayName` parametrini bütün komponentlərdə təyin edə bilərsiniz.

## Bəs try/catch? {#how-about-trycatch}

`try` / `catch` əladır amma yalnız imperativ kod ilə işləyir:

```js
try {
  showButton();
} catch (error) {
  // ...
}
```

Lakin, React komponentlər deklarativdirlər və **nəyin** render olunacağını müəyyənləşdirirlər:

```js
<Button />
```

Xəta sərhərləri React-in deklarativ təbiətini saxlayır və sizin gözlədiyiniz kimi davranırlar. Məsələn, əgər xəta, ağacın dərinliyində olan komponentin `componentDidUpdate` funskiyasında `setState`-ə görə baş versə belə, React yenədə xətanı ən yaxın xəta sərhədinə yayacaq.

## Bəs Hadisə İşləyiciləri? {#how-about-event-handlers}

Xəta sərhədləri hadisə işləyicilərində baş verən xətaları **tutmur**.

React-ə hadisə işləyicilərində baş verən xətaların bərpası üçün, xəta sərhədlərindən istifadə etməsi lazım deyil. Render və lifecycle metodlarından fərqli olaraq, hadisə işləyiciləri render zamanı baş vermir. Bu səbəbdən, əgər bu işləyicilər xəta atırlarsa, React yenə də ekranda nə göstərəcəyini bilir.

Əgər sizə hadisə işləyicilərində yeni xətanı tutmaq lazımdırsa, normal Jacascript `try` / `catch` ifadəsindən istifadə edin:

```js{9-13,17-20}
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    try {
      // Xəta atması üçün nəsə edin
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Xəta tutuldu.</h1>
    }
    return <div onClick={this.handleClick}>Tıkla</div>
  }
}
```

Qeyd edək ki, yuxarıdakı nümunə normal Javascript davranışını göstərir və xəta sərhədindən istifadə etmir.

## React 15-dən ad dəyişiklikləri {#naming-changes-from-react-15}

React 15 xəta sərhədlərini fərqli funskiya adı ilə çox məhdudiyyətli formada dəstəkləyirdi: `unstable_handleError`. Bu funksiya artıq işləmir və siz React 16 betadan başlayaraq bunu `componentDidCatch` ilə əvəz etməlisiniz.

Bu dəyişiklik üçün, biz kodunuzun avtomatik miqrasiyası üçün [codemod](https://github.com/reactjs/react-codemod#error-boundaries) təmin etmişik.

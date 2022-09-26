---
id: introducing-jsx
title: JSX-ə giriş
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Bu dəyişən bəyannaməsini nəzərdən keçirin:

```js
const element = <h1>Salam dünya!</h1>;
```

Bu məzəli təq sintaksisi nə bir sətrdir(string), nə də HTML.

Bu JSX adlanır və JavaScript üçün sintaksis əlavəsidir. İstifadəçi interfeysinin görünməsi üçün React ilə istifadə etməyi məsləhət görürük. JSX şablon dilini sizə xatırlada bilər, lakin JavaScript-in tam funksionallığından istifadə imkanı yaradır.

JSX React "elementləri"-ni yaradır. Bunları [sonrakı bölmə](/docs/rendering-elements.html) daxilində DOM-da göstərməyi tədbiq edəcəyik. Aşağıda, siz başlamağınız üçün lazım olan JSX əsaslarını tapa bilərsiniz.

### Niyə JSX? {#why-jsx}

Reakt, applikasiyasının işləmə məntiqinin digər Uİ məntiqləri ilə birləşdirildiyini: hadisələrin necə idarə olunduğunu, state-in zamanla necə dəyişdiyini və göstərilən məlumatların necə nümayiş olunacağına dair məsələləri əhatə edir.

Fərqli fayllarda markup və məntiq quraraq *texnologiyaları* süni şəkildə ayırmaq əvəzinə React [*problemləri* ayıraraq](https://en.wikipedia.org/wiki/Separation_of_concerns) hər ikisini ehtiva edən "komponentlər" adlandırılan birləşmələrlə reallaşdırdı. [Növbəti bölmədə](/docs/components-and-props.html) komponentlərə geri qayıdacağıq, lakin JS-də markup qurmaqda hələ rahat deyilsinizsə, [bu](https://www.youtube.com/watch?v=x7cQ3mrcKaY) sizi əksinə razı sala bilər.

React JSX-i istifadə etməyi [tələb etmir](/docs/react-without-jsx.html), amma bir çoxları bunu Javascript içərisində Uİ ilə işləyən zaman faydalı hesab edir. Həmçinin React-a daha çox faydalı səhv və xəbərdarlıq mesajları göstərməyə də imkan verir. 

Burdan yola çıxaraq, gəlin başlayaq!

### JSX-də ifadələr yerləşdirmə {#embedding-expressions-in-jsx}

Aşağıdakı misalda `name` adlı bir dəyişən elan edirik və onu JSX daxilində fiqurlu mötərizə ilə istifadə edirik:

```js{1,2}
<<<<<<< HEAD
const name = 'Səbuhi Qurbanov';
const element = <h1>Salam, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
=======
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
>>>>>>> e3073b03a5b9eff4ef12998841b9e56120f37e26
```

JSX daxilində fiqurlu mötərizə içərisində istənilən [JavaScript ifadəsi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) istifadə edə bilərsiniz. Misal üçün. `2+2`, `user.firstName`, və ya `formatName(user)`, hər biri doğru(valid) Javascript ifadəsidir.

Aşağıdakı misalda, `formatName(user)` JavaScript funksiyasını çağırmanın nəticəsini `<h1>` elementinin daxilinə yerləşdiririk.

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Orxan',
  lastName: 'Hacıyev'
};

const element = (
  <h1>
    Salam, {formatName(user)}!
  </h1>
);
```

**[Try it on CodePen](https://codepen.io/gaearon/pen/PGEjdG?editors=1010)**

JSX-i kodun rahat oxunması üçün bir neçə sətirə bölürük. Bunun tələb olunmamasına baxmayaraq, [avtomatik olaraq nöqtəli vergüllərin yerləşdirilməsinin](https://stackoverflow.com/q/2846283) qarşısını almaq üçün onu mötərizədə saxlamağı məsləhət görürük

### JSX həmçinin ifadədir {#jsx-is-an-expression-too}

Kompilyasiya edildikdən sonra, JSX ifadələri adi JavaScript funksiyalarına və JavaScript obyektlərinə çevrilir.

Bu o deməkdir ki, JSX daxilində siz `if` və `for` ifadələrindən istifadə edərək onları dəyişənlərə bərabər edə və onları funksiyadan çağıra bilərik:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Salam, {formatName(user)}!</h1>;
  }
  return <h1>Salam, qərib insan.</h1>;
}
```

### JSX-lə Atributları Bildirmək {#specifying-attributes-with-jsx}

Simli literalları dırnaq açaraq bildirə bilərsiniz: 

```js
const element = <a href="https://www.reactjs.org"> link </a>;
```

Həmçinin fiqurlu mötərizələrdən istifadə edərək Javascript ifadəsini atribut kimi bildirə bilərsiniz:

```js
const element = <img src={user.avatarUrl}></img>;
```

Javascript ifadələrini atribut kimi bildirərkən bunu dırnaq içində etməyin. Dırnaq açaraq yalnız simli(string) atributları və ya fiqurlu mötərizələrdən istifadə edərək ifadələri bildirə bilərsiniz, lakin bunu eyni atributda etməyin.

>**Xəbərdarlıq:**
>
>JSX Javasript-ə HTML-dən daha yaxın olduğundan React DOM xüsusiyyət adlarından standart HTML atributlarının əvəzinə `camelCase`-dən istfadə edərək işlədir.
>
>Misal üçün, `class` JSX-də [`className`](https://developer.mozilla.org/en-US/docs/Web/API/Element/className)-ə çevrilir, və `tabindex` [`tabIndex`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/tabIndex)-ə çevrilir.

### Uşaqları JSX ilə ifadə etmək {#specifying-children-with-jsx}

Əgər tag daxilində başqa tag yoxdursa onu dərhal XML kimi `/>`-lə bağlaya bilərsiniz:

```js
const element = <img src={user.avatarUrl} />;
```


JSX tag daxilində başqa taglar ehtiva edə bilər:

```js
const element = (
  <div>
    <h1>Salam!</h1>
    <h2>Sizi görməyə şadıq.</h2>
  </div>
);
```

### JSX Enjeksiyon hücumlarını qarşısını alır {#jsx-prevents-injection-attacks}

JSX-də istifadəçi girişini yerləşdirə bilərsiniz:

```js
const title = response.potentiallyMaliciousInput;
// Bu təhlükəsizdir:
const element = <h1>{title}</h1>;
```

React DOM JSX daxilində yerləşdirilmiş bütün ifadələri [escape](https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) edir, yəni təhlükəsiz vəziyyət gətirir. Beləliklə, tətbiqinizdə açıq şəkildə yazılmayan heç bir ifadə enjektə edilə bilməz. Hər şey `render`-dən öncə simli(string)-ə çevrilir və bu [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) hücumlarının qarşısını alır.

### JSX Obyektləri təmsil edir {#jsx-represents-objects}

Babel JSX-i `React.createElement()` çağıraraq kompayl edir.

Bu iki ifadə identikdir:

```js
const element = (
  <h1 className="greeting">
    Salam dünya!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Salam dünya!'
);
```

`React.createElement()` bir neçə yoxlama edərək sizə bug-sız kod yazmağa kömək edir, lakin əsasən aşağıda qeyd oluna kimi obyekt yaradır:

```js
// Qeyd: Burada göstərilən struktur sadələşdirilib
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Salam dünya!'
  }
};
```

Bu obyektlər "React element"-ləri adlandırılır. Siz onları ekranda görmək istədiklərinizin təsviri kimi düşünə bilərsiniz. React bu obyektləri oxuyur və onları DOM qurmaq və aktiv saxlamaq üçün istifadə edir.

Sonrakı bölmədə DOM-a Reakt elementlərini render edilməyini araşdıracayıq.

Biz, [sonrakı bölmədə](/docs/rendering-elements.html) React elementlərinin DOM-a render edilməsinə baxacağıq. 

>**Məsləhət:**
>
>ES6 və JSX kodlarının daha düzgün seçilməsi üçün editorunuzda ["Babel" language definition](https://babeljs.io/docs/en/next/editors)-dan istifadə etməyi məsləhət görürük.

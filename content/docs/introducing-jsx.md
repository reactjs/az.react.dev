---
id: introducing-jsx
title: JSX-ə giriş
permalink: docs/introducing-jsx.html
prev: hello-world.html
next: rendering-elements.html
---

Bu dəyişən bəyannaməni nəzərdən keçirin:

```js
const element = <h1>Hello, world!</h1>;
```

Bu məzəli tag sintaksisi nə bir simlidir(string), nə də HTML.

Bu JSX adlanır və JavaScript üçün sintaksis əlavəsidir. İstifadəçi interfeysinin görünməsi üçün React ilə istifadə etməyi məsləhət görürük. JSX şablon dilini sizə xatırlata bilər, lakin JavaScript-in tam funksionallığını istifadə imkanı yaradır.

JSX React "elementləri"-ni yaradır. Bunları [sonrakı bölmə] (/docs/rendering-elements.html) daxilində DOM-da göstərməyi tədbiq edəcəyik. Aşağıda, siz başlamağınız üçün lazım olan JSX əsaslarını tapa bilərsiniz.

### Niyə JSX? {#why-jsx}

Reakt, aplikasiynın işləmə məntiqinin digər UI məntiqləri ilə birləşdirildiyini: hadisələrin(events) necə idarə olunduğunu, state-in zamanla necə dəyişdiyini və göstərilən məlumatların necə nümayiş olunacağına dair reallığı əhatə edir.

Fərqli fayllarda markup və məntiq quraraq * texnologiyaları * süni şəkildə ayırmaq əvəzinə React [hər ikisini ehtiva edən "komponentlər" adlandırılan birləşmələrlə](https://en.wikipedia.org/wiki/Separation_of_concerns) reallaşdırdı. [Növbəti bölmədə](/docs/components-and-props.html) komponentlərə geri qayıdacağıq, lakin JS-də markup qurmaqda hələ rahat deyilsinizsə, [bu](https://www.youtube.com/watch?v=x7cQ3mrcKaY) bu sizi əksinə razı sala bilər.

React JSX-i istifadə etməyi [tələb etmir](/docs/react-without-jsx.html), amma bir çoxları bunu Javascript içərisində Uİ ilə işləyən zaman faydalı hesab edir. Həmçinin React-a daha çox faydalı səhv və xəbərdarlıq mesajları göstərməyə də imkan verir. 

Burdan yola çıxaraq, gəlin başlayaq!

### JSX-də ifadələr yerləşdirmə {#embedding-expressions-in-jsx}

Aşağıdakı misalda `name` adlı bir dəyişən elan edirik və onu JSX daxilində fiqurlu mötərizə ilə istifadə edirik:

```js{1,2}
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

JSX daxilində fiqurlu mötərizə içərisində istənilən [JavaScript ifadəsi](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions) istifadə edə bilərsiniz. Misal üçün. `2+2`, `user.firstName`, və ya `formatName(user)`, hər biri doğru(valid) Javascript ifadəsidir.

Aşağıdakı misalda, `formatName(user)` JavaScript funksiyasını çağırmanın nəticəsini `<h1>` elementinin daxilinə yerləşdirrik.

```js{12}
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

[](codepen://introducing-jsx)

JSX-i kodun rahat oxunması üçün bir neçə sətirə bölürük. Bunun tələb olunmamasına baxmayaraq, [avtomatik olaraq nöqtəli vergüllərin yerləşdirilməsinin](http://stackoverflow.com/q/2846283) qarşısını almaq üçün onu mötərizədə saxlamağı məsləhət görürük

### JSX həmçinin ifadədir {#jsx-is-an-expression-too}

Kompilyasiya edilrikdən sonra, JSX ifadələri adi JavaScript funksiyalarına və JavaScript obyektlərinə çevrilir.

Bu o deməkdir ki, JSX daxilində siz `if` və `for` ifadələrindən istifadə edərək onları dəyişənlərə bərabər edə və onları funksiyadan çağıra bilərik:

```js{3,5}
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}
```

### JSX-lə Atributları Bildirmək {#specifying-attributes-with-jsx}

Simli literalları dırnaq açaraq bildirə bilərsiniz: 

```js
const element = <div tabIndex="0"></div>;
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

### Uşaqları(children) JSX ilə ifadə etmək {#specifying-children-with-jsx}

Əgər tag daxilində başqa tag yoxdursa onu dərhal XML kimi `/>`-lə bağlaya bilərsiniz:

```js
const element = <img src={user.avatarUrl} />;
```


JSX tag daxilində başqa taglar ehtiva edə bilər:

```js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
```

### JSX Enjeksiyon hücumlarını qarşısını alır{#jsx-prevents-injection-attacks}

JSX-də istifadəçi girişini yerləşdirə bilərsiniz:

```js
const title = response.potentiallyMaliciousInput;
// This is safe:
const element = <h1>{title}</h1>;
```

React DOM JSX daxilində yerləşdirilmiş bütün ifadələri [escapes](http://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-on-html) edir, yəni təhlükəsiz vəziyyət gətirir. Beləliklə, tətbiqinizdə açıq şəkildə yazılmayan heç bir ifadə enjektə edilə bilməz. Hər şey `render`-dən öncə simli(string)-ə çevrilir və bu [XSS (cross-site-scripting)](https://en.wikipedia.org/wiki/Cross-site_scripting) hücumlarının qarşısını alır.

### JSX Obyektləri təmsil edir {#jsx-represents-objects}

Babel JSX-i `React.createElement()` çağıraraq kompayl edir.

Bu iki ifadə identikdir:

```js
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```

```js
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

`React.createElement()` bir neçə yoxlama edərək sizə bug-sız kod yazmağa kömək edir, lakin əsasən aşağıda qeyd oluna kimi obyekt yaradır:

```js
// Note: this structure is simplified
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
};
```

Bu obyektlər "React element"-ləri adlandırılır. Siz onları ekranda görmək istədiklərinizin təsviri kimi düşünə bilərsiniz. React bu obyektləri oxuyur və onları DOM qurmaq və aktiv saxlamaq üçün istifadə edir.

Sonrakı bölmədə DOM-a Reakt elementlərini render edilməyini araşdıracayıq.


>**Məsləhət:**
>
>ES6 və JSX kodlarının daha yaxşı seçilməsi üçün editorunuzda ["Babel" language definition](http://babeljs.io/docs/editors)-dan istifadə etməyi məsləhət görürük. Bu səhifədə qeyd olunanla uyğunlaşan  [Oceanic Next](https://labs.voronianski.com/oceanic-next-color-scheme/) rəngləndirməsindən istifadə olunur.

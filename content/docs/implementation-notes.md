---
id: implementation-notes
title: Tətbiq Qeydləri
layout: contributing
permalink: docs/implementation-notes.html
prev: codebase-overview.html
next: design-principles.html
redirect_from:
  - "contributing/implementation-notes.html"
---

Bu bölmə, [stack rekonsilyatoru](/docs/codebase-overview.html#stack-reconciler) haqqında tətbiq qeydlərinin yığımıdır.

Bu səhifə çox texnikidir və React-in açıq API-ı və React-in necə core, render edici qurğular və rekonsilyatora ayrıldığı haqqında anlayışınızın olduğunu ehtimal edir. Əgər React kodu ilə tanışlığınız yoxdursa, ilk öncə [Kodun İcmalı](/docs/codebase-overview.html) bölməsini oxuyun.

Bu səhifədə [React komponentləri, instansiyaları və elementləri](/blog/2015/12/18/react-components-elements-and-instances.html) arasında olan fərqlərdən xəbərinizin olduğu ehtimal edilir.

Stack rekonsilyatoru React 15 və əvvəli buraxılışlarında işlədilirdi. Bu rekonsilyatorun kodu [src/renderers/shared/stack/reconciler](https://github.com/facebook/react/tree/15-stable/src/renderers/shared/stack/reconciler) direktoriyasında saxlanılır.

### Video: React-in Sıfırdan Yazılması {#video-building-react-from-scratch}

[Paul O'Şannesinin](https://twitter.com/zpao) [React-in sıfırdan yazılması haqqında danışığı](https://www.youtube.com/watch?v=_MAD4Oly9yg) bizim bu sənədi yazmamıza ilham verdi.

Bu sənəddə və göstərilən danışıqda olan detallar real kodun sadələşmiş formasıdır. Bunun səbəbi sizin bu konsepsiyaları daha yaxşı başa düşməniz üçündür.

### İcmal {#overview}

Rekonsilyatorun açıq API-ı yoxdur. React DOM və React Native kimi [Render edici qurğular](/docs/codebase-overview.html#renderers) rekonsilyatordan istifadə edərək proqramçılar tərəfindən yazılan React komponentləri əsasında istifadəçi intereysini effektiv şəkildə yeniləyirlər.

### Rekursiv Proses şəklində Mount Edilmə {#mounting-as-a-recursive-process}

Gəlin komponentin ilk dəfə mount edilməsinə baxaq:

```js
const root = ReactDOM.createRoot(rootEl);
root.render(<App />);
```

<<<<<<< HEAD
React DOM, `<App />` elementini rekonsilyatora göndərir. `<App />`-in React elementi (yəni, *nəyin* render ediləcəyinin təsviri) olduğunu yaddan çıxarmayın. Siz, bunun sadə obyekt olduğunu fikirləşə bilərsiniz:
=======
`root.render` will pass `<App />` along to the reconciler. Remember that `<App />` is a React element, that is, a description of *what* to render. You can think about it as a plain object:
>>>>>>> 822330c3dfa686dbb3424886abce116f20ed20e6

```js
console.log(<App />);
// { type: App, props: {} }
```

Rekonsilyator `App`-in sinif və ya funksiya olduğunu yoxlayır.

Əgər `App` funksiyadırsa, render olunan elementi almaq üçün rekonsilyator `App(props)` funksiyasını çağıracaq.

Əgər `App` sinifdirsə, rekonsilyator `App` obyektini `new App(props)` işlədərək yaradacaq, obyektin `componentWillMount()` lifecycle funksiyasını çağıracaq, və render olunan elementi almaq üçün obyektin `render()` funksiyasını çağıracaq.

Hər iki halda rekonsilyator `App`-in "render etdiyi" elementi tapacaq.

Bu proses rekursivdir. `App` `<Greeting />`-i render edə bilər, `Greeting` `<Button />`-u render edə bilər, və s. Rekonsilyator hər komponentin nəyi render etdiyini öyrənmək üçün istifadəçi tərəfindən yaradılan komponenləri bir-bir yoxlayır.

Siz bu prosesi aşağıdakı pseudokod kimi görə bilərsiniz:

```js
function isClass(type) {
  // React.Component alt siniflərində bu flaq var
  return (
    Boolean(type.prototype) &&
    Boolean(type.prototype.isReactComponent)
  );
}

// Bu funksiya React elementi qəbul edir (yəni, <App />)
// və mount olunan ağacı təmsil edən DOM və ya Native nodu qaytarır.
function mount(element) {
  var type = element.type;
  var props = element.props;

  // Biz, type dəyişənini funksiya kimi çağıraraq və ya
  // instansiya yaradıb obyektin render() funksiyasını çağıraraq
  // render olunan elementi müəyyənləşdiririk.
  var renderedElement;
  if (isClass(type)) {
    // Komponent sinfi
    var publicInstance = new type(props);
    // Propları təyin et
    publicInstance.props = props;
    // Lazım olduqda lifecycle funksiyalarını çağır
    if (publicInstance.componentWillMount) {
      publicInstance.componentWillMount();
    }
    // render()-i çağıraraq render olunan elementi müəyyənləşdir
    renderedElement = publicInstance.render();
  } else {
    // Komponent funksiyası
    renderedElement = type(props);
  }

  // Komponentin qaytardığı elementin digər komponent ola bildiyindən
  // bu funksiya rekursiv olmalıdır
  return mount(renderedElement);

  // Qeyd: Bu tətbiq tam deyil və sonsuza qədər rekursiya edəcək!
  // Bu funksiya yalnız <App /> və ya <Button /> kimi elementlər ilə işləyir.
  // Bu funksiya <div /> və ya <p /> kimi elementlər ilə işləmir.
}

var rootEl = document.getElementById('root');
var node = mount(<App />);
rootEl.appendChild(node);
```

>**Qeyd:**
>
>Bu *yalnız* pseudokoddur. Bu, real tətbiqə bənzəmir. Əlavə olaraq, biz rekursiyanı dayandırmamışıq deyə burada stək daşacaq.

Gəlin, yuxarıdakı nümunədə olan ideaları təkrarlayaq:

* React elementləri komponent tipini (məsələn, `App`) və proplarını təmsil edən sadə obyektlərdir.
* İstifadəçi tərəfindən düzələn komponentlər (məsələn, `App`) həm sinif həm də funksiya ola bilər və digər elementlərə də "render edilə" bilərlər.
* "Mount Edilmə" əməliyyatı yuxarı səviyyədə olan React elementi (məsələn, `<App />`) əsasında DOM və ya Nativ ağacı yaradan rekursiv prosesdir.

### Sahib Elementlərin Mount Edilməsi {#mounting-host-elements}

Əgər mount edilmə zamanı ekranda heç nə göstərilmirsə, bu proses faydasız olardı.

React elementləri istifadəçi tərəfindən yaradılan ("kompozit") komponentlərdən əlavə platformaya spesifik ("sahib" və ya "host") komponentləri də təmsil edə bilər. Məsələn, `Button` komponenti render zamanı `<div />` elementini qaytara bilər.

Sahib elementlərin `type` parametri mətn şəklində olur:

```js
console.log(<div />);
// { type: 'div', props: {} }
```

Sahib elementlərin istifadəçi kodu olmur.

Rekonsilyator sahib element ilə qarşılaşdıqda elementin mount edilməsi üçün render edici qurğuya göndərir. Məsələn, React DOM brauzerdə DOM nodunu yaradır.

Sahib elementin uşaqları olduqda rekonsilyator yuxarıdakı alqoritm ilə elementləri rekursiv şəkildə mount edir. Burada uşaqların sahib (`<div><hr /></div>` kimi), kompozit (`<div><Button /></div>` kimi) və ya hər ikisi olmasının fərqi yoxdur.

Uşaq komponentlərdə istehsal olunan DOM nodları ana DOM noduna əlavə olunacaq və bütün DOM strukturu rekursiv şəkildə yığılacaq.

>**Qeyd:**
>
>Rekonsilyator DOM-dan azaddır. Mount olunan nəticə (bəzən kodda "mount image" adlanır) render edici qurğudan asılıdır. Bu nəticə DOM nodu (React DOM), mətn (React DOM Server) və nativ görünüşü təmsil edən rəqəm (React Native) ola bilər.

Biz yuxarıdakı koda sahib elementləri əlavə etdikdə bizim kodumuz aşağıdakı formada olacaq:

```js
function isClass(type) {
  // React.Component alt siniflərində bu flaq var
  return (
    Boolean(type.prototype) &&
    Boolean(type.prototype.isReactComponent)
  );
}

// Bu funksiya yalnız kompozit tipli elementlər ilə işləyir.
// Yəni, bu funksiya <App /> və <Button /> elementləri ilə işləyir, <div /> ilə işləmir.
function mountComposite(element) {
  var type = element.type;
  var props = element.props;

  var renderedElement;
  if (isClass(type)) {
    // Komponent sinfi
    var publicInstance = new type(props);
    // Propları təyin et
    publicInstance.props = props;
    // Lazım olduqda lifecycle funksiyalarını çağır
    if (publicInstance.componentWillMount) {
      publicInstance.componentWillMount();
    }
    renderedElement = publicInstance.render();
  } else if (typeof type === 'function') {
    // Komponent funksiyası
    renderedElement = type(props);
  }

  // Bu funksiya rekursivdir lakin biz sahib elementinə (məsələn, <div />) çatdıqda
  // rekursiya dayanacaq:
  return mount(renderedElement);
}

// Bu funksiya yalnız sahib elementlər üçündür.
// Yəni, bu funksiya <div /> və <p /> kimi elementlər ilə işləyir, <App /> ilə yox.
function mountHost(element) {
  var type = element.type;
  var props = element.props;
  var children = props.children || [];
  if (!Array.isArray(children)) {
    children = [children];
  }
  children = children.filter(Boolean);

  // Bu kod bloku rekonsilyatorda olmamalıdır.
  // Fərqli render edici qurğularda nodlar fərqli formada inisializasiya olunur.
  // Məsələn, React Native qurğusu iOS və Android görünüşləri yaradır.
  var node = document.createElement(type);
  Object.keys(props).forEach(propName => {
    if (propName !== 'children') {
      node.setAttribute(propName, props[propName]);
    }
  });

  // Uşaqları mount et
  children.forEach(childElement => {
    // Uşaqlar həm sahib (məsələn, <div />) həm də kompozit (məsələn, <Button />) ola bilərlər.
    // Biz həmçinin bu elementləri rekursiv şəkildə mount edə bilərik:
    var childNode = mount(childElement);

    // Bu kod da render edici qurğuya aiddir.
    // Qurğudan asılı olaraq dəyişir:
    node.appendChild(childNode);
  });

  // Mount nəticəsi kimi DOM nodunu qaytar.
  // Rekursiya burada bitir.
  return node;
}

function mount(element) {
  var type = element.type;
  if (typeof type === 'function') {
    // İstifadəçi tərəfindən yazılan komponentlər
    return mountComposite(element);
  } else if (typeof type === 'string') {
    // Platformaya xas komponentlər
    return mountHost(element);
  }
}

var rootEl = document.getElementById('root');
var node = mount(<App />);
rootEl.appendChild(node);
```

Bunun işlək olmasına baxmayaraq bu tətbiq rekonsilyatorun əsl tətbiqindən çox fərqlənir. Burada yeniliklər hələki dəstəklənmir.

### Daxili İnstansiyalar ilə Tanışlıq {#introducing-internal-instances}

React-in əsas xüsusiyyətlərindən biri bütün elementlərin yenidən render olunduğundan baxmayaraq DOM-un yenidən yaradılmaması və state-in sıfırlanmamasıdır:

```js
<<<<<<< HEAD
ReactDOM.render(<App />, rootEl);
// Eyni DOM nodlarını işlədəcək:
ReactDOM.render(<App />, rootEl);
=======
root.render(<App />);
// Should reuse the existing DOM:
root.render(<App />);
>>>>>>> 822330c3dfa686dbb3424886abce116f20ed20e6
```

Lakin, bizim tətbiqimiz yalnız ilkin ağacı mount etməyi bilir. Bizim tətbiqimizin `publicInstance`-lar və ya DOM `node`-ların hansı komponentlərə uyğun olduğu kimi lazımi məlumatlardan xəbəri olmadığından biz bu ağacın üstündə yeniliklər edə bilmirik.

Stack rekonsilyatoru `mount` funksiyasını sinif metodu edərək bu problemi həll edir. Bu yanaşmanın çatışmazlıqları olduğundan biz [proqresdə olan rekonsilyatorun yenidən yazılmasında](/docs/codebase-overview.html#fiber-reconciler) bu həllə əks istiqamətdə gedirik. Buna baxmayaraq indiki zamanda rekonsilyator belə işləyir.

Biz, fərqli `mountHost` və `mountComposite` funksiyaları əvəzinə iki sinif yaradacağıq: `DOMComponent` və `CompositeComponent`.

Hər iki sinfin `element` qəbul edən konstruktoru və mount olunan nodu qaytaran `mount()` funksiyası var. Biz, yuxarı səviyyəli `mount()` funksiyasını düzgün sinif instansiyası qaytaran zavod ilə əvəzləyəcəyik:

```js
function instantiateComponent(element) {
  var type = element.type;
  if (typeof type === 'function') {
    // İstifadəçi tərəfindən təyin edilən komponentlər
    return new CompositeComponent(element);
  } else if (typeof type === 'string') {
    // Platformaya xas olan komponentlər
    return new DOMComponent(element);
  }  
}
```

İlk olaraq gəlin `CompositeComponent` sinfinin tətbiqinə baxaq:

```js
class CompositeComponent {
  constructor(element) {
    this.currentElement = element;
    this.renderedComponent = null;
    this.publicInstance = null;
  }

  getPublicInstance() {
    // Kompozit komponentlərdə sinif instansiyasını ifşa et.
    return this.publicInstance;
  }

  mount() {
    var element = this.currentElement;
    var type = element.type;
    var props = element.props;

    var publicInstance;
    var renderedElement;
    if (isClass(type)) {
      // Komponent sinfi
      publicInstance = new type(props);
      // Propları təyin edin
      publicInstance.props = props;
      // Lazım olan lifecycle metodlarını çağır
      if (publicInstance.componentWillMount) {
        publicInstance.componentWillMount();
      }
      renderedElement = publicInstance.render();
    } else if (typeof type === 'function') {
      // Komponent funksiyası
      publicInstance = null;
      renderedElement = type(props);
    }

    // Açıq instansiyanı təyin et
    this.publicInstance = publicInstance;

    // Element əsasında uşağın daxili instansiyasını yarat
    // <div /> və ya <p /> kimi elementlər üçün DOMComponent,
    // <App /> və ya <Button /> kimi elementlər üçün isə CompositeComponent olacaq:
    var renderedComponent = instantiateComponent(renderedElement);
    this.renderedComponent = renderedComponent;

    // Render nəticəsini mount et
    return renderedComponent.mount();
  }
}
```

Bu, əvvəlki `mountComposite()` tətbiqindən çox da fərqli deyil, amma indi yeniliklər üçün sinifdə `this.currentElement`, `this.renderedComponent` və `this.publicInstance` kimi dəyişənlər saxlanılır.

Nəzərə alın ki, `CompositeComponent`-in instansiyası istifadəçi tərəfindən verilən `element.type`-ın instansiyası ilə eyni deyil. `CompositeComponent` sinfi rekonsilyatorun tətbiq detalıdır və istifadəçi bunu heç vaxt görmür. İstifadəçi tərəfindən təyin edilən sinif `element.type`-dan oxunulur, `CompositeComponent` isə bu oxunan element üçün instansiya yaradır.

Çaşqınlıqdan qaçınmaq üçün biz `CompositeComponent` və `DOMComponent` siniflərinin instansiyalarını "daxili instansiyalar" adlandıracağıq. Bu instansiyaların mövcud olmasının səbəbi sinfin daxilində məlumatlar saxlaya bilməyimiz üçün lazımdır. Bu instansiyalardan yalnız render edici qurğuların və rekonsilyatorun xəbəri var.

Biz, istifadəçi tərəfindən təyin olunan siniflərin instansiyalarını "açıq instansiyalar" adlandırırıq. Açıq instansiyaya xüsusi komponentin `render()` funksiyasında gördüyünüz `this` dəyəri aiddir.

`DOMComponent` sinfinin `mount()` funksiyası ilə əvəzlənən `mountHost()` funksiyası aşağıdakı kimidir:

```js
class DOMComponent {
  constructor(element) {
    this.currentElement = element;
    this.renderedChildren = [];
    this.node = null;
  }

  getPublicInstance() {
    // DOM komponentlərində yalnız DOM nodunu ifşa et.
    return this.node;
  }

  mount() {
    var element = this.currentElement;
    var type = element.type;
    var props = element.props;
    var children = props.children || [];
    if (!Array.isArray(children)) {
      children = [children];
    }

    // DOM-u yaradıb saxla
    var node = document.createElement(type);
    this.node = node;

    // Atributları təyin et
    Object.keys(props).forEach(propName => {
      if (propName !== 'children') {
        node.setAttribute(propName, props[propName]);
      }
    });

    // Uşaqları yaradıb saxlayın.
    // Hər bir uşaq element tipinin mətn və ya funksiya olması əsasında
    // DOMComponent ya da CompositeComponent ola bilər.
    var renderedChildren = children.map(instantiateComponent);
    this.renderedChildren = renderedChildren;

    // Mount olunan zaman qaytarılan DOM nodlarını yığın
    var childNodes = renderedChildren.map(child => child.mount());
    childNodes.forEach(childNode => node.appendChild(childNode));

    // Mount nəticəsində qaytarılan DOM nodu
    return node;
  }
}
```

`mountHost()`-u refaktorinq etdikdən sonra əsas dəyişiklik daxili DOM komponentinin insansiyasında `this.node` və `this.renderedChildren` dəyişənlərinin saxlanmasıdır. Biz bu dəyişənlərdən istifadə edərək gələcəkdə dağılmayan yenilikləri tətbiq edə biləcəyik.

Nəticədə kompozit və sahib instansiyaları daxili uşaq instansiyalarına yol göstərirlər. Bunu görüntüləyə bilmək üçün gəlin nümunəyə baxaq. Əgər `<App>` funksiya komponenti `<Button>` sinif komponentini, `Button` sinfi isə `<div>` elementini render edirsə, daxili instansiya aşağıdakı formada olacaq:

```js
[object CompositeComponent] {
  currentElement: <App />,
  publicInstance: null,
  renderedComponent: [object CompositeComponent] {
    currentElement: <Button />,
    publicInstance: [object Button],
    renderedComponent: [object DOMComponent] {
      currentElement: <div />,
      node: [object HTMLDivElement],
      renderedChildren: []
    }
  }
}
```

Siz DOM-da yalnız `<div>` elementini görəcəksiniz. Lakin, daxili instansiya ağacında həm kompozit, həm də sahib instansiyaları saxlanılır.

Kompozit daxili instansiyalarında aşağıdakı maddələr saxlanılır:

* Cari element.
* Element tipi sinif olduqda bu sinfin açıq instansiyası.
* Render olunan tək daxili instansiya. Bu instansiya `DOMComponent` və ya `CompositeComponent` ola bilər.

Sahib daxili instansiyalarında aşağıdakı maddələr saxlanılır:

* Cari element.
* DOM nodu.
* Bütün uşaq instansiyaları. Hər uşaq instansiyası `DOMComponent` və ya `CompositeComponent` ola bilər.

Əgər mürəkkəb applikasiyada daxili ağacın necə strukurlaşdığını görməkdə çətinlik çəkirsinizsə, [React DevTools](https://github.com/facebook/react-devtools) sizə təxmini strukturu göstərə bilər. Bu alətdə sahib instansiyaları boz rəngdə, kompozit instansiyaları isə bənövşəyi rəngdə göstərilir:

 <img src="../images/docs/implementation-notes-tree.png" width="500" style="max-width: 100%" alt="React DevTools ağacı" />

<<<<<<< HEAD
Refaktorinqı tamamlamaq üçün biz konteyner noduna bütün ağacı mount edən funksiyanı (`ReactDOM.render()` kimi) təqdim edəcəyik. Bu funksiya `ReactDOM.render()` kimi açıq instansiyanı qaytarır:
=======
To complete this refactoring, we will introduce a function that mounts a complete tree into a container node and a public instance:
>>>>>>> 822330c3dfa686dbb3424886abce116f20ed20e6

```js
function mountTree(element, containerNode) {
  // Yuxarı səviyyədə olan daxili instansiyanı yaradın
  var rootComponent = instantiateComponent(element);

  // Yuxarı səviyyədə olan komponenti konteynerə mount edin
  var node = rootComponent.mount();
  containerNode.appendChild(node);

  // Komponentin təmin etdiyi açıq instansiyanı qaytarın
  var publicInstance = rootComponent.getPublicInstance();
  return publicInstance;
}

var rootEl = document.getElementById('root');
mountTree(<App />, rootEl);
```

### Unmount Edilmə {#unmounting}

İndi bizdə uşaqları və DOM nodlarını saxlayan daxili instansiyaların olduğundan biz unmount edilmə əməliyyatını tətbiq edə bilərik. Kompozit komponentlər üçün unmount çağırışları lifecycle metodunu çağırır və rekursiyaya davam edir.

```js
class CompositeComponent {

  // ...

  unmount() {
    // Lazım olduqda lifecycle metodunu çağırın
    var publicInstance = this.publicInstance;
    if (publicInstance) {
      if (publicInstance.componentWillUnmount) {
        publicInstance.componentWillUnmount();
      }
    }

    // Tək render olunmuş elementi unmount edin
    var renderedComponent = this.renderedComponent;
    renderedComponent.unmount();
  }
}
```

`DOMComponent` sinfi isə hər uşağa unmount edilməsini bildirir:

```js
class DOMComponent {

  // ...

  unmount() {
    // Bütün uşaqları unmount edin
    var renderedChildren = this.renderedChildren;
    renderedChildren.forEach(child => child.unmount());
  }
}
```

Praktikada, unmount olunan DOM komponentlərində olan hadisə işləyiciləri və kəşlər də silinir. Bu sənədi sadə saxlamaq üçün biz bu detallara baxmayacağıq.

Biz, `unmountTree(containerNode)` adlı yuxarı səviyyəli funksiya əlavə edə bilərik. Bu funksiya `ReactDOM.unmountComponentAtNode()` funksiyasına bənzəyir:

```js
function unmountTree(containerNode) {
  // DOM nodundan daxili instansiyanı oxu:
  // (Bunun hələki işləmədiyindən biz bu dəyəri saxlamaq üçün mountTree() funksiyasını dəyişəcəyik.)
  var node = containerNode.firstChild;
  var rootComponent = node._internalInstance;

  // Ağacı unmount edib konteyneri təmizləyin
  rootComponent.unmount();
  containerNode.innerHTML = '';
}
```

Bunun işləməsi üçün biz DOM nodundan daxili ana instansiyasını oxumalıyıq. Biz, `mountTree()` funksiyasını dəyişib ana DOM noduna `_internalInstance` parametri əlavə edəcəyik. Əlavə olaraq, biz `mountTree()` funksiyasına mövcud ağacı dağıtmasını bildirəcəyik:

```js
function mountTree(element, containerNode) {
  // Mövcud ağacı dağıdın
  if (containerNode.firstChild) {
    unmountTree(containerNode);
  }

  // Yuxarı səviyyədəki komponentin daxili instansiyasını yaradın
  var rootComponent = instantiateComponent(element);

  // Yuxarı səviyyədəki komponenti konteynerə mount edin
  var node = rootComponent.mount();
  containerNode.appendChild(node);

  // Daxili instansiyaya referansı saxlayın
  node._internalInstance = rootComponent;

  // Təmin olunan açıq instansiyanı qaytarın
  var publicInstance = rootComponent.getPublicInstance();
  return publicInstance;
}
```

İndi, `unmountTree()` funksiyasını icra etdikdə və ya `mountTree()` funksiyasını bir neçə dəfə çağırdıqda köhnə ağac silinəcək və komponentlərin `componentWillUnmount()` lifecycle metodu çağrılacaq.

### Yeniləmə {#updating}

Əvvəlki bölmədə unmount edilmə əməliyyatını tətbiq etdik. Lakin, hər propun bütün ağacı mount və ya unmount etməsi React-i faydasız edə bilər. Rekonsilyatorun məqsədi DOM və state-i mümkün olduğu qədər saxlamaq üçün mövcud instansiyalardan istifadə etməkdir:

```js
var rootEl = document.getElementById('root');

mountTree(<App />, rootEl);
// Mövcud DOM-dan istifadə etməlidir:
mountTree(<App />, rootEl);
```

Biz daxili instansiyanın kontraktına yeni funksiya əlavə edəcəyik. `mount()` və `unmount()` funksiyalarından əlavə olaraq, `DOMComponent` və `CompositeComponent` siniflərində `receive(nextElement)` adlı metod tətbiq edəcəyik:

```js
class CompositeComponent {
  // ...

  receive(nextElement) {
    // ...
  }
}

class DOMComponent {
  // ...

  receive(nextElement) {
    // ...
  }
}
```

Bu funksiya `nextElement`-də olan məlumatlar əsasında komponenti (və uşaqlarını) ən yeni məlumatlar ilə yeniləyəcək.

Adətən, kodun bu hissəsi "virtual DOM diffing" adlanır. Lakin, əslində alqoritm daxili ağacda rekursiv olaraq gəzərək hər daxili intansiyaya yeniliyi qəbul etdirir.

### Kompozit Komponentlərin Yenilənməsi {#updating-composite-components}

Kompozit komponent yeni element qəbul etdikdə `componentWillUpdate()` lifecycle funksiyası çağrılır.

Sonra, biz komponenti yeni proplar ilə yenidən render edir və sonrakı render olunan elementi qəbul edirik:

```js
class CompositeComponent {

  // ...

  receive(nextElement) {
    var prevProps = this.currentElement.props;
    var publicInstance = this.publicInstance;
    var prevRenderedComponent = this.renderedComponent;
    var prevRenderedElement = prevRenderedComponent.currentElement;

    // Elementin *özünü* yeniləyin
    this.currentElement = nextElement;
    var type = nextElement.type;
    var nextProps = nextElement.props;

    // render()-in sonrakı nəticəsini tapın
    var nextRenderedElement;
    if (isClass(type)) {
      // Komponent sinfi
      // Lazım olduqda komponent lifecycle metodlarını çağırın
      if (publicInstance.componentWillUpdate) {
        publicInstance.componentWillUpdate(nextProps);
      }
      // Propları yeniləyin
      publicInstance.props = nextProps;
      // Yenidən render edin
      nextRenderedElement = publicInstance.render();
    } else if (typeof type === 'function') {
      // Komponent funksiyası
      nextRenderedElement = type(nextProps);
    }

    // ...
```

İndi, gəlin render olunan elementin `type` parametrinə baxaq. Əgər elementin son render zamanı `type` parametri dəyişməyibsə, komponenti yerində yeniləmək mümkündür.

Məsələn, əgər komponent ilk olaraq `<Button color="red" />`, ikinci dəfə isə `<Button color="blue" />` şəkildə olursa, biz mövcud daxili intansiyaya yeni elementi `receive()` funksiyası ilə qəbul etməsini bildirə bilərik:

```js
    // ...

    // Render olunan elementin tipi dəyişməyibsə,
    // mövcud komponent instansiyasını yenidən işlədib funksiyadan çıxın.
    if (prevRenderedElement.type === nextRenderedElement.type) {
      prevRenderedComponent.receive(nextRenderedElement);
      return;
    }

    // ...
```

Lakin, sonrakı render olunan elementin `type` parametri əvvəlki render olunanın parametrindən fərqlidirsə, biz daxili instansiyanı yeniləyə bilməyəcəyik. Məsələn, `<button>` elementi `<input>`-a çevrilə bilməz.

Əvəzinə, biz mövcud daxili instansiyanı unmount edib render olunan elementin tipi əsasında yeni element render etməliyik. Məsələn, əvvəl `<button />` kimi render olunan komponent sonradan `<input />` kimi render edilirsə, aşağıdakı proses baş verir:

```js
    // ...

    // Əgər bu nöqtəyə çatmışıqsa, köhnə komponenti mount edib
    // yenisini mount edərək nodları əvəzləyəcəyik

    // Əvəz olunacaq köhnə nodu tapın
    var prevNode = prevRenderedComponent.getHostNode();

    // Köhnə uşağı unmount edib yeni uşağı mount edin
    prevRenderedComponent.unmount();
    var nextRenderedComponent = instantiateComponent(nextRenderedElement);
    var nextNode = nextRenderedComponent.mount();

    // Uşağa yeni referansı təyin edin
    this.renderedComponent = nextRenderedComponent;

    // Köhnə nodu yeni nod ilə əvəz edin
    // Qeyd: Bu kod render edici qurğuya aiddir və
    // ideal mühitdə CompositeComponent-dən kənarda olmalıdır:
    prevNode.parentNode.replaceChild(nextNode, prevNode);
  }
}
```

Kompozit komponentə yeni element gəldikdə rekonsilyator ya render olunan daxili instansiyaya yenilik göndərə bilər, ya da mövcud elementi unmount edib yeni element ilə əvəz edə bilər.

Əlavə olaraq, elementin `key` parametri dəyişdiyi zaman komponentin yeni element qəbul etmək əvəzinə yenidən mount ediləcək. Bu sənədin artıq mürəkkəb olduğundan biz bu sənəddə `key` parametrinin işlədilməsi kimi mürəkkəb əməliyyatdan danışmayacağıq.

Nəzərə alın ki, platformaya xas olan nodu tapıb yeniləmək üçün daxili instansiya kontraktına `getHostNode()` adlı funksiya əlavə etmək lazımdır. Bu funksiyanın tətbiqi hər iki sinif üçün sadədir:

```js
class CompositeComponent {
  // ...

  getHostNode() {
    // Render olunan komponentə bu nodu təyin etməsini bildirin.
    // Bu funksiya kompozit komponentləri rekursiv olaraq gəzəcək.
    return this.renderedComponent.getHostNode();
  }
}

class DOMComponent {
  // ...

  getHostNode() {
    return this.node;
  }  
}
```

### Sahib Komponentlərin Yenilənməsi {#updating-host-components}

`DOMComponent` kimi Sahib komponentlərin yenilənməsi fərqli formada tətbiq olunur. Bu komponentlər element qəbul etdikdə platformaya xas olan görünüşləri yeniləməlidirlər. Məsələn, React DOM-da DOM atributları yenilənir:

```js
class DOMComponent {
  // ...

  receive(nextElement) {
    var node = this.node;
    var prevElement = this.currentElement;
    var prevProps = prevElement.props;
    var nextProps = nextElement.props;    
    this.currentElement = nextElement;

    // Köhnə atributları silin.
    Object.keys(prevProps).forEach(propName => {
      if (propName !== 'children' && !nextProps.hasOwnProperty(propName)) {
        node.removeAttribute(propName);
      }
    });
    // Yeni atributları təyin edin.
    Object.keys(nextProps).forEach(propName => {
      if (propName !== 'children') {
        node.setAttribute(propName, nextProps[propName]);
      }
    });

    // ...
```

Atributları yenilədikdən sonra sahib komponentlər uşaqları da yeniləməlidirlər. Kompozit komponentlərdən fərqli olaraq sahib komponentlərdə birdən çox uşaq ola bilər.

Aşağıdakı sadələşmiş nümunədə daxili instansiyaların massivindən istifadə edərək massivin hər elementinin qəbul etdiyi `type` parametrinin eyni olmasından asılı olaraq yeniləyəcək və ya əvəzləyəcəyik. Əsl rekonsilyatorda `key` parametri əsasında elementlərin sırası da izlənilir, amma biz bu mövzunu bu sənəddə danışmayacağıq.

Biz, uşaqların DOM əməliyyatlarını massivə yığıb bu əməliyyatları dəstə şəklində icra edəcəyik:

```js
    // ...

    // Bunlar React elementlərinin massivləridir:
    var prevChildren = prevProps.children || [];
    if (!Array.isArray(prevChildren)) {
      prevChildren = [prevChildren];
    }
    var nextChildren = nextProps.children || [];
    if (!Array.isArray(nextChildren)) {
      nextChildren = [nextChildren];
    }
    // Bunlar daxili instansiyaların massivləridir:
    var prevRenderedChildren = this.renderedChildren;
    var nextRenderedChildren = [];

    // Uşaqların üzərindən iterasiya etdiyimiz zaman bu əməliyyatları massivə əlavə edəcəyik.
    var operationQueue = [];

    // Qeyd: Aşağıdakı bölmə həddindən artıq çox sadələşdirilib!
    // Burada yerlərin dəyişikliyi, uşaqlarda boşluqların olması və ya açarlar yoxlanılmır.
    // Bu nümunədə axının icmalı göstərildiyindən detallı xüsusiyyətlər göstərilmir.

    for (var i = 0; i < nextChildren.length; i++) {
      // Bu uşağın mövcud daxili instansiyasını qəbul etməyə çalışın
      var prevChild = prevRenderedChildren[i];

      // Bu indeksdə daxili instansiya olmadıqda
      // uşaq, massivin sonuna əlavə olunacaq. Yeni daxili
      // instansiya yaradıb mount edərək yeni noddan istifadə edin
      if (!prevChild) {
        var nextChild = instantiateComponent(nextChildren[i]);
        var node = nextChild.mount();

        // Nodun əlavə olunacağını bildirin
        operationQueue.push({type: 'ADD', node});
        nextRenderedChildren.push(nextChild);
        continue;
      }

      // Elementin tipləri eyni olduqda instansiyanı yeniləmək mümkündür.
      // Məsələn, <Button size="small" /> yenilənərək
      // <Button size="large" /> elementinə çevrilə bilər,
      // amma <App /> elementinə çevrilə bilməz.
      var canUpdate = prevChildren[i].type === nextChildren[i].type;

      // Əgər mövcud instansiyanı yeniləyə bilmiriksə, instansiya unmount edilməli
      // və yeni instansiya yerinə mount edilməlidir.
      if (!canUpdate) {
        var prevNode = prevChild.getHostNode();
        prevChild.unmount();

        var nextChild = instantiateComponent(nextChildren[i]);
        var nextNode = nextChild.mount();

        // Nodların əvəzlənəcəyini bildirin
        operationQueue.push({type: 'REPLACE', prevNode, nextNode});
        nextRenderedChildren.push(nextChild);
        continue;
      }

      // Əgər mövcud daxili instansiyanı yeniləyə biliriksə,
      // yeni elementləri qəbul edərək bu elementlərin
      // yenilənəcəyini bildirin
      prevChild.receive(nextChildren[i]);
      nextRenderedChildren.push(prevChild);
    }

    // Ən sonda mövcud olmayan elementləri silin:
    for (var j = nextChildren.length; j < prevChildren.length; j++) {
      var prevChild = prevRenderedChildren[j];
      var node = prevChild.getHostNode();
      prevChild.unmount();

      // Nodun silinməsini bildirin
      operationQueue.push({type: 'REMOVE', node});
    }

    // Render olunan uşaqların siyahısını yenilənən versiya ilə əvəzləyin.
    this.renderedChildren = nextRenderedChildren;

    // ...
```

Ən son addımda DOM əməliyyatlarını icra edin. Əsl rekonsilyatorda sıralamaların tətbiq edildiyindən əsl kod daha da mürəkkəbdir:

```js
    // ...

    // Əməliyyat növbəsini emal edin.
    while (operationQueue.length > 0) {
      var operation = operationQueue.shift();
      switch (operation.type) {
      case 'ADD':
        this.node.appendChild(operation.node);
        break;
      case 'REPLACE':
        this.node.replaceChild(operation.nextNode, operation.prevNode);
        break;
      case 'REMOVE':
        this.node.removeChild(operation.node);
        break;
      }
    }
  }
}
```

İndi, sahib komponentlərin yenilənməsi işləyəcək.

### Yuxarı Səviyyəli Yeniləmələr {#top-level-updates}

`CompositeComponent` və `DOMComponent` siniflərində `receive(nextElement)` metodunu tətbiq etdikdən sonra yuxarı səviyyəli `mountTree()` funksiyasında element tipinin eyni olduğu zaman yeniləyici funksiyadan istifadə etməsini bildirəcəyik:

```js
function mountTree(element, containerNode) {
  // Mövcud ağacın olduğunu yoxlayın
  if (containerNode.firstChild) {
    var prevNode = containerNode.firstChild;
    var prevRootComponent = prevNode._internalInstance;
    var prevElement = prevRootComponent.currentElement;

    // Əgər mümkündürsə, mövcud ana komponentdən istifadə edin
    if (prevElement.type === element.type) {
      prevRootComponent.receive(element);
      return;
    }

    // Əks halda mövcud ağacı silin
    unmountTree(containerNode);
  }

  // ...

}
```

İndi, `mountTree()` funksiyasını eyni ağac ilə çağırdıqda mövcud element silinməyəcək:

```js
var rootEl = document.getElementById('root');

mountTree(<App />, rootEl);
// Reuses the existing DOM:
mountTree(<App />, rootEl);
```

React-in daxili sadələşmiş formada belə işləyir.

### Biz Nələri Əhatə Etmədik {#what-we-left-out}

Bu sənəddəki kod əsl kodun sadələşmiş formasıdır. Biz aşağıdakı xüsusiyyətlərdən danışmadıq:

* Komponentlər `null` render edə bilirlər və rekonsilyator massivlərdə və render olunmuş nəticədə "boş dəliklər" ilə də işləyə bilir.

* Rekonsilyator, elementlərin `key` atributunu oxuyaraq massivdə olan elementlərin hansı daxili instansiyalara aid olduğunu təyin edə bilir. React-in tətbiqinin mürəkkəbliyinin böyük hissəsi bunun ilə əlaqəlidir.

* Kompozit və sahib instansiya siniflərindən əlavə "mətn" və "boş" komponentlər də mövcuddur. Bu komponentlər mətn nodlarını və `null` render edildikdə "boş dəlikləri" təmsil edirlər.

* Render edici qurğular sahib instansiya sinfini rekonsilyatora göndərmək üçün [inyeksiyadan](/docs/codebase-overview.html#dynamic-injection) istifadə edirlər. Məsələn, React DOM qurğusu rekonsilyatora daxili sahib instansiyasının tətbiqi üçün `ReactDOMComponent` sinfindən istifadə etməyi bildirir.

* Uşaqların siyahısını yeniləmək üçün işlədilən məntiq `ReactMultiChild` adlı miksində saxlanılır. Bu miksin, React DOM və React Native-in daxili sahib instansiya siniflərinin tətbiqində işlədilir.

* Rekonsilyatorda kompozit komponentlərdə istifadə edilən `setState()` funksiyası da tətbiq edilir. Hadisə işləyicilərində çağrılan yeniləmələr dəstələnərək tək yeniləmə əməliyyatında icra olunur.

* Rekonsilyator, kompozit və sahib komponentlərə ref-lərin qoşulub silinməsini də icra edir.

* DOM hazır olduqdan sonra çağrılan `componentDidMount()` və `componentDidUpdate()` kimi lifecycle metodları "callback növbələrinə" yığılaraq tək dəstədə icra olunurlar.

* Cari yenilik haqqında olan məlumatlar "tranzaksiya" adlı daxili obyektdə yerləşdirilir. Tranzaksiyalar, gözlənilən lifecycle metodlarını, xəbərdarlıqlar üçün cari DOM-da olan dəyişiklikləri və yeniləməyə aid olan digər "qlobal" məlumatları saxlamaq üçün faydalıdır. Əlavə olaraq tranzaksiyalar React-in yeniləmələrdən sonra "təmizləmə işlərini" aparacağını təmin edir. Məsələn, React DOM-un təmin etdiyi tranzaksiya sinfi yenilikdən sonra anket sahəsinin vəziyyətini bərpa edir.

### Koda Atlamaq {#jumping-into-the-code}

* [`ReactMount`](https://github.com/facebook/react/blob/83381c1673d14cd16cf747e34c945291e5518a86/src/renderers/dom/client/ReactMount.js) sinfində bu sənəddə olan `mountTree()` və `unmountTree()` kimi funksiyalar saxlanılır. Bu funksiyalar yuxarı səviyyəli komponentlərin mount və unmount olunmasını icra edirlər. Bu funksiyaların React Native analoqu [`ReactNativeMount`](https://github.com/facebook/react/blob/83381c1673d14cd16cf747e34c945291e5518a86/src/renderers/native/ReactNativeMount.js) faylında saxlanılır.
* [`ReactDOMComponent`](https://github.com/facebook/react/blob/83381c1673d14cd16cf747e34c945291e5518a86/src/renderers/dom/shared/ReactDOMComponent.js) sinfi bu sənəddə olan `DOMComponent` sinfini bildirir. Burada React DOM render edici qurucusunu sahib komponent sinfi tətbiq olunur. Bu sinfin React Native analoqu [`ReactNativeBaseComponent`](https://github.com/facebook/react/blob/83381c1673d14cd16cf747e34c945291e5518a86/src/renderers/native/ReactNativeBaseComponent.js) sinfidir.
* [`ReactCompositeComponent`](https://github.com/facebook/react/blob/83381c1673d14cd16cf747e34c945291e5518a86/src/renderers/shared/stack/reconciler/ReactCompositeComponent.js) sinfi bu sənəddə olan `CompositeComponent` sinfini bildirir. Burada istifadəçi tərəfindən çağrılan komponentlər üzərində işlənilir və bu komponentlərin state-i saxlanılır.
* [`instantiateReactComponent`](https://github.com/facebook/react/blob/83381c1673d14cd16cf747e34c945291e5518a86/src/renderers/shared/stack/reconciler/instantiateReactComponent.js) funksiyasında elementi yaratmaq üçün lazım olan düzgün daxili instansiya sinfi seçilir. Bu funksiya bu sənəddə olan `instantiateComponent()` funksiyasının ekvivalentidir.

* [`ReactReconciler`](https://github.com/facebook/react/blob/83381c1673d14cd16cf747e34c945291e5518a86/src/renderers/shared/stack/reconciler/ReactReconciler.js) sinfi `mountComponent()`, `receiveComponent()` və `unmountComponent()` funksiyalarını əhatə edir. Burada daxili instansiyaların tətbiqləri çağrılır. Əlavə olaraq, burada daxili instansiyalar arasında paylaşılan kodların tətbiqləri saxlanılır.

* [`ReactChildReconciler`](https://github.com/facebook/react/blob/83381c1673d14cd16cf747e34c945291e5518a86/src/renderers/shared/stack/reconciler/ReactChildReconciler.js) sinfində elementlərin `key` parametrindən asılı olaraq uşaqların mount edilməsi, yenilənməsi və unmounting edilməsi tətbiq olunur.

* [`ReactMultiChild`](https://github.com/facebook/react/blob/83381c1673d14cd16cf747e34c945291e5518a86/src/renderers/shared/stack/reconciler/ReactMultiChild.js) sinfində uşaqların əlavə edilməsi, silinməsi və sıralanması kimi əməliyyatları üçün render edici qurğudan müstəqil olan əməliyyat növbələnməsi tətbiq olunur.

* Köhnə səbəblərə görə React kodunda `mount()`, `receive()` və `unmount()` funksiyalarının `mountComponent()`, `receiveComponent()` və `unmountComponent()` kimi adlandırıldığına baxmayaraq bu funksiyalarda elementlər qəbul edilir.

* Daxili instansiyaların parametrləri altdan xətt ilə başlayır (məsələn, `_currentElement`). Bu dəyişənlər kodda yalnız oxuna bilən açıq sahələr kimi qəbul olunur.

### Gələcək İstiqamətlər {#future-directions}

Stack rekonsilyatorunun sinxron olması və işləri hissələrə parçalaya bilməməsi kimi məhdudiyyətləri var. Bu səbəbdən biz [tam fərqli arxitektura ilə](https://github.com/acdlite/react-fiber-architecture) tətbiq olunan [yeni Fiber rekonsilyatoru](/docs/codebase-overview.html#fiber-reconciler) üzərində işləyirik. Gələcəkdə biz stack rekonsilyatorunu bu yeni rekonsilyator ilə əvəzləmək istəyirik. Lakin, bizim buna çatmamız üçün hələ vaxt lazımdır.

### Sonrakı Addımlar {#next-steps}

React təkmilləşməsində istifadə etdiyimiz rəhbər prinsiplər haqqında məlumat almaq üçün [sonrakı bölməyə](/docs/design-principles.html) baxın.

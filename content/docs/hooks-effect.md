---
id: hooks-state
title: Effect Hookunun İstifadəsi
permalink: docs/hooks-effect.html
next: hooks-rules.html
prev: hooks-state.html
---

<<<<<<< HEAD
*Hooklar* React 16.8-ə əlavə olunan yenilikdir. Hooklar ilə sinif yazmadan state və ya digər React xüsusiyyətlərindən istifadə edə bilərsiniz.
=======
> Try the new React documentation.
> 
> These new documentation pages teach modern React and include live examples:
>
> - [Synchronizing with Effects](https://beta.reactjs.org/learn/synchronizing-with-effects)
> - [You Might Not Need an Effect](https://beta.reactjs.org/learn/you-might-not-need-an-effect)
> - [`useEffect`](https://beta.reactjs.org/reference/react/useEffect)
>
> The new docs will soon replace this site, which will be archived. [Provide feedback.](https://github.com/reactjs/reactjs.org/issues/3308)

*Hooks* are a new addition in React 16.8. They let you use state and other React features without writing a class.
>>>>>>> 5647a9485db3426d62b5a8203f4499c01bcd789b

Funksiya komponentlərindən yan effektləri icra etmək üçün *Effect Hookundan* istifadə edilir:

```js{1,6-10}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // componentDidMount və componentDidUpdate funksiyasına bərabərdir:
  useEffect(() => {
    // Brauzer API-ı ilə dokument başlığını yeniləyin
    document.title = `${count} dəfə tıklandı`;
  });

  return (
    <div>
      <p>{count} dəfə tıklandı</p>
      <button onClick={() => setCount(count + 1)}>
        Tıkla
      </button>
    </div>
  );
}
```

Bu kod parçası [əvvəlki səhifədə olan sayğac nümunəsi əsasında](/docs/hooks-state.html) yazılıb. Biz əvvəlki nümunəyə yeni xüsusiyyət əlavə etdik: dokument başlığını tıklama sayı ilə yenilənir.

Məlumat yüklənməsi, abunəliyin qurulması və React komponentlərindən DOM-un əl ilə dəyişilməsi kimi əməliyyatlar yan effektlərdir. Bu əməliyyatları "yan effektlər" (və ya "effektlər") adlandırdığınızdan asılı olmayaraq siz bu əməliyyatları icra etmisiniz.

>Məsləhət
>
>Əgər sizin React sinif lifecycle metodları ilə tanışlığınız varsa, `useEffect` hookuna `componentDidMount`, `componentDidUpdate` və `componentWillUnmount` funksiyalarının birləşməsi kimi baxa bilərsiniz.

React komponentlərində iki cür yan effektlər var: təmizlik tələb edən və etməyən effektlər. Gəlin bu fərqə datallı baxaq.

## Təmizlik Tələb Etməyən Effektlər {#effects-without-cleanup}

Bəzən, **React-in DOM-u yeniləməsindən sonra əlavə kod icra etmək** lazım olur. Məlumat yüklənməsi, əl ilə DOM mutasiyaları və logginq kimi əməliyyatlar təmizlik tələb etmirlər. Çünki, biz bu əməliyyatları icra edib bu əməliyyatlar haqqında unuda bilərik. Gəlin bu yan effektlərin yazılmasına sinif və Hooklarda baxaq.

### Siniflər Nümunəsi {#example-using-classes}

React sinif komponentlərində `render` funksiyasından yan effektlər olmamalıdır. Çünki, bu funksiya yan effektlərin olması üçün çox tezdir. Biz, adətən yan effektləri DOM yeniləndikdən *sonra* icra etmək istəyirik.

Bu səbəbdən, biz yan effektləri `componentDidMount` və `componentDidUpdate` funksiyalarından icra edirik. Gəlin əvvəlki sayğac nümunəsini sinif komponentləri ilə yazaq:

```js{9-15}
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    document.title = `${count} dəfə tıklandı`;
  }

  componentDidUpdate() {
    document.title = `${count} dəfə tıklandı`;
  }

  render() {
    return (
      <div>
        <p>{count} dəfə tıklandı</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Tıkla
        </button>
      </div>
    );
  }
}
```

**Sinfin lifecycle funksiyaları arasında dublikat kodun olduğuna** fikir verin.

Adətən biz eyni yan effekti komponentin yarandığı və ya yeniləndiyindən asılı olmayaraq icra etmək istəyirik. Konseptual olaraq biz bu effektləri hər renderdən sonra icra etmək istəyirik. Lakin, React sinif komponentlərində belə funksiya yoxdur. Biz yan effekt funksiyasını çıxara bilərik. Lakin, bu funksiya yenə də iki yerdən çağrılmalıdır.

Gəlin eyni məntiqi `useEffect` Hooku ilə yazaq.

### Hooklar Nümunəsi {#example-using-hooks}

Gəlin səhifənin yuxarısında göstərilən nümunəyə dərindən baxaq:

```js{1,6-8}
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `${count} dəfə tıklandı`;
  });

  return (
    <div>
      <p>{count} dəfə tıklandı</p>
      <button onClick={() => setCount(count + 1)}>
        Tıkla
      </button>
    </div>
  );
}
```

**`useEffect` nə edir?** Biz, bu hooku çağıraraq React-ə komponentin render etmədən sonra əlavə əməliyyat etməsini bildiririk. React, göndərilən funksiyanı (bu bizim "effektimizdir") yadda saxlayır və DOM yeniliklərindən sonra çağırır. Bu effektdə, dokument başlığını yenilənir. Lakin, məlumat yüklənməsi və ya digər imperativ API-lardan istifadə etmək də mümkündür.

**`useEffect` funksiyası niyə komponent daxilindən çağrılır?** `useEffect` hooku komponent daxilində olduqda `count` state dəyişənindən (və ya hər hansı propdan) istifadə etmək mümkündür. Bu dəyişənləri oxumaq üçün xüsusi API lazım deyil. Çünki, bu dəyişənlər funksiyanın scope-undadır. Hooklar JavaScript closure-larını ehtiva edir və JavaScript-in həll etdiyi problem üçün xüsusi React API-nın əlavəsinin qabağını alır.

**`useEffect` hər render etmədən sonra icra olunur?** Bəli! Bu effekt həm ilk render etmədən sonra həm də hər yenilikdən sonra icra olunur ([Bunu dəyişmək haqqda](#tip-optimizing-performance-by-skipping-effects) bu səhifənin sonrakı bölmələrində danışacağıq). Effektlərin "mount olunma" və "yenilənmədən" sonra icra olunmasını fikirləşmək əvəzinə "render etmədən sonra" icra olunduğunu fikirləşin. React, effektlər çağrıldıqda DOM-un yeniləndiyini siğortalayır.

### Detallı İzahat {#detailed-explanation}

Effektlər haqqında daha ətraflı biliyimiz olduğu üçün aşağıdakı sətirlər anlaşılacaq:

```js
function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `${count} dəfə tıklandı`;
  });
}
```

`count` state dəyişənini yaratdıqdan sonra React-ə effekt istifadə etdiyimizi bildiririk. `useEffect` Hookuna funksiya göndəririk. Gondərilən funksiya bizim *effektimizdir*. Effektin daxilində `document.title` brauzer API-ından istifadə edərək dokument başlığını yeniləyirik. `count` dəyişəninin funksiyanın scope-unda olduğundan bu dəyişəni effektin daxilindən istifadə edə bilirik. Komponent render edildikdən sonra göndərilən effekt yadda saxlanır və DOM yeniləndikdən sonra icra olunur. Bu əməliyyat hər render zamanı baş verir.

Təcrübəli JavaScript proqramçıları `useEffect` Hookuna göndərilən funksiyanın hər render zamanı fərqli olduğunu görəcəklər. Bu qəsdən belədir. Faktiki olaraq yeni funksiyanın yaranmasına görə `count` dəyəri köhnəlmir. Hər dəfə render zamanı köhnə effekt silinir və _yeni_ effekt planlaşdırılır. Bu yol ilə effektlər hər render etmə əməliyyatının bir hissəsi olurlar. Bunun niyə faydalı olduğunu [bu səhifədə olan sonrakı bölmələrdə](#explanation-why-effects-run-on-each-update) göstərəcəyik.

>Məsləhət
>
>`componentDidMount` və ya `componentDidUpdate` funksiyalarından fərqli olaraq `useEffect` ilə planlaşdırılan effektlər brauzerin ekranı yeniləməsini blok etmirlər. Bu səbəbdən applikasiya daha tez işləyir. Effektlərin əksəriyyəti sinxron baş verməməlidir. Bəzi nadir hallarda sinxron effektlər lazım olduqda (məsələn, şablonun ölçülməsi kimi əməliyyatlar üçün) `useEffect` Hooku ilə eyni API-ı olan [`useLayoutEffect`](/docs/hooks-reference.html#uselayouteffect) Hookundan istifadə edin.

## Təmizlik Tələb Edən Effektlər {#effects-with-cleanup}

Əvvəlki bölmədə təmizlik tələb etməyən yan effektlərə baxdıq. Lakin, bəzi effektlərə təmizlik işləri lazımdır. Məsələn, kənar məlumat mənbəsinə **abunəlik quraşdırmaq** lazım ola bilər. Bu ssenaridə, yaddaş sızmasının qabağını almaq üçün effektləri təmizləmək lazımdır! Gəlin təmizlik əməliyyatına sinif və Hooklarda baxaq.

### Siniflər Nümunəsi {#example-using-classes-1}

React sinfi istifadə etdikdə abunələr `componentDidMount` funksiyasında qurulur və `componentWillUnmount` funksiyasında silinir. Məsələn, dostların onlayn statusuna abunəlik yaradan `ChatAPI` modulunun olduğunu fikirləşək. Aşağıdakı nümunədə bu abunəlik sinif ilə qurulur və göstərilir:

```js{8-26}
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return 'Yüklənir...';
    }
    return this.state.isOnline ? 'Onlayn' : 'Oflayn';
  }
}
```

Nəzərə alın ki, `componentDidMount` və `componentWillUnmount` funksiyaları bir-birini əks etdirməlidir. Lifecycle metodları işlətdikdə eyni effektə aid olan kodlar parçalanmalıdır.

>Qeyd
>
>Bu kodun düzgün işləməsi üçün `componentDidUpdate` funksiyasının lazım olduğuna fikir verə bilərsiniz. Biz indi bunu nəzərə almayıb bu səhifənin [gələcək bölməsində](#explanation-why-effects-run-on-each-update) bu məsələyə qayıdacağıq.

### Hooklar Nümunəsi {#example-using-hooks-1}

Gəlin bu komponenti Hooklar ilə yazaq.

Bu effekti təmizləmək üçün fərqli effektin lazım olduğunu fikirləşə bilərsiniz. Lakin, abunəliyi əlavə etmək və silmək əməliyyatlarının bir-birinə aid olduğundan `useEffect` Hooku bu əməliyyatları bir yerdə saxlamaq məntiqi ilə dizayn olunub. Effekt funksiyası funksiya qaytardıqda təmizlik zamanı qaytarılan funksiya React tərəfindən çağrılacaq:

```js{6-16}
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Effektin necə təmizləndiyini göstərin:
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Yüklənir...';
  }
  return isOnline ? 'Onlayn' : 'Oflayn';
}
```

**Effektdən niyə funksiya qaytardıq?** Bu, effektlər üçün fakultativ təmizləmə mexanizmidir. Hər effekt özünü təmizləmək üçün funksiya qaytara bilər. Bu mexanizm bizə abunəliyi yaratmaq və silməyi bir yerdə saxlamağa imkan yaratdığından eyni effektin bir parçası olurlar!

**React, effekti nə zaman təmizləyir?** Komponent unmount olunduqda təmizlik işlərini icra olunur. Lakin, əvvəlki bölmələrdən öyrəndiyimiz kimi effektlər hər render zamanı çağrılırlar. Bu səbəbdən React-də yeni effekt icra edilmədən öncə əvvəlki render zamanı icra olunan effekt də təmizləyir. [Bunun baqların qabağını kəsməyə necə kömək etdiyini](#explanation-why-effects-run-on-each-update) və [performans problemləri yarandıqda bu davranışdan necə imtina edildiyi haqqda](#tip-optimizing-performance-by-skipping-effects) sonrakı bölmələrdə danışacağıq.

>Qeyd
>
>Effektdən adlı funksiya qaytarmaq məcburi deyil. Biz bu funksiyanın məqsədini başa salmaq üçün bu funksiyanı `cleanup` adlandırdıq. Lakin, siz ox funksiyası və ya bu funksiyanı fərqli adlandıra bilərsiniz.

## Təkrar {#recap}

`useEffect` Hookundan istifadə edərək komponent render edildikdən sonra fəqrli yan effektlərin planlaşdırılmasını öyrəndik. Təmizlik lazım olan effektlər funksiya qaytarırlar:

```js
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Təmizlik fazası olmayan effektlər isə heç nə qaytarmırlar.

```js
  useEffect(() => {
    document.title = `${count} dəfə tıklandı`;
  });
```

Effect Hooku ilə hər iki ssenari tək API altında yazılır.

-------------

**Effect Hookunun necə işlədiyi haqqda anlayışınızın olduğunu və ya bu məlumatların çox olduğunu fikirləşirsinizsə, [Hookların Qaydaları](/docs/hooks-rules.html) səhifəsinə atlaya bilərsiniz.**

-------------

## Effektləri İşlətmək üçün Məsləhətlər {#tips-for-using-effects}

İndi, biz təcrübəli React istifadəçilərin maraqlana biləcəyi `useEffect`-in bəzi məqamlarına dərindən baxacağıq. Özünüzü bu məqamlara indi baxmağa məcbur etməyin. Effect Hooku haqqında əlavə məlumat almaq üçün hər zaman bu səhifəyə qayıda bilərsiniz.

### Məsləhət: Problemləri Ayırmaq üçün Bir Neçə Effekt İşlədin {#tip-use-multiple-effects-to-separate-concerns}

Hookların [Motivasiyası](/docs/hooks-intro.html#complex-components-become-hard-to-understand) bölməsində sinif lifecycle metodlarında bir-birinə aid olmayan kodların olmasını və bir-birinə aid olan kodların bir neçə funksiya arasında bölündüyünü qeyd etdik. Gəlin, sayğac və dost statusu göstəricisi nümunələrində olan məntiqləri birləşdirən komponentə baxaq:

```js
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `${this.state.count} dəfə tıklandı`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `${this.state.count} dəfə tıklandı`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

`document.title` məntiqinin `componentDidMount` və `componentDidUpdate` funksiyaları arasında parçalandığına fikir verin. Abunəlik məntiqi də `componentDidMount` və `componentWillUnmount` funksiyaları arasında parçalanır. `componentDidMount` funksiyasında hər iki tapşırığın kodu var.

Bu problemi Hooklar ilə necə həll etmək olar? [*State* Hookunun birdən çox işlədilməsi kimi](/docs/hooks-state.html#tip-using-multiple-state-variables) siz bir neçə effektdən istifadə edə bilərsiniz. Bu bizə bir-birindən asılı olmayan məntiqləri fərqli effektlərdə saxlamağa imkan yaradır:

```js{3,8}
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = `${count} dəfə tıklandı`;
  });

  const [isOnline, setIsOnline] = useState(null);
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

**Hooklar ilə kodları həll etdikləri tapşırıqlar əsasında parçalamaq mümkündür**. React, komponentdə yaranan *hər* effekti sıralaması əsasında tətbiq edəcək.

### İzahat: Effektlər Niyə Hər Yenilikdən Sonra İcra Olunurlar {#explanation-why-effects-run-on-each-update}

Siniflərə öyrəşmisinizsə, effekt təmizləməsinin niyə yalnız komponent silindikdən sonra yox hər render etmədən sonra icra olunduğu sizi maraqlandıra bilər. Gəlin, bu dizayn ilə az baqlı komponentlər düzəltdiyinə praktiki nümunə ilə baxaq.

[Bu səhifənin əvvəlki bölməsində](#example-using-classes-1) dostun onlayn olub olmamasını göstərən `FriendStatus` komponentinə baxdıq. Bizim sinfimiz `this.props`-dan `friend.id` dəyərini oxuyub komponent mount olunduqdan sonra dost statusu resursuna abunə olur və unmount edildikdə abunəliyi silir:

```js
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

Komponent ekranda göstərildikdən sonra **`friend` propu dəyişdikdə** nə baş verir? Komponentimiz fərqli dostun onlayn statusunu göstərməyə davam edəcək. Bu baqdır. Əlavə olaraq, komponentin yanlış dost ID-indən istifadə etdiyindən unmount zamanı yaddaş sızması və ya applikasiya qəzası baş verəcək.

Sinif komponentində bu ssenarini dəstəkləmək üçün `componentDidUpdate` funksiyası əlavə etməliyik:

```js{8-19}
  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate(prevProps) {
    // Köhnə friend.id-nin abunəliyini silin
    ChatAPI.unsubscribeFromFriendStatus(
      prevProps.friend.id,
      this.handleStatusChange
    );
    // Yeni friend.id-ni abunə edin
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
```

React applikasiyalarında baqların ümumi mənbələrindən biri `componentDidUpdate` funksiyasının düzgün yazılmamasıdır.

İndi, gəlin eyni məntiqə Hooklar ilə baxaq:

```js
function FriendStatus(props) {
  // ...
  useEffect(() => {
    // ...
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

Yuxarıdakı effektdə baq olmayacaq. (Lakin, biz bu funksiyaya heç bir yenilik əlavə etmədik.)

`useEffect` Hookunun yenilikləri idarə etdiyindən yenilikləri dəstəkləmək üçün heç bir xüsusi kod yazmaq lazım deyil. Bu hook, yeni effektləri tətbiq etmədən öncə köhnə effektləri təmizləyir. Bunu göstərmək üçün komponentin zaman ilə yaratdığı abunəlik və abunəliyin silinməsi ardıcıllığına baxaq:

```js
// { friend: { id: 100 } } propu ilə mount olunduqda
ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // İlk effekti icra olunur

// { friend: { id: 200 } } propu ilə yeniləndikdə
ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Köhnə effekt təmizlənir
ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Sonrakı effekt icra olunur

// { friend: { id: 300 } } propu ilə yeniləndikdə
ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Köhnə effekt təmizlənir
ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Sonrakı effekt icra olunur

// Unmount
ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Sonuncu effekt təmizlənir
```

Bu davranış ilə ardıcıllıq təmin olunur və sinif komponentlərində yeniləmə məntiqinin olmamasında yaranan baqların qarşısını alır.

### Məsləhət: Effektləri Buraxaraq Performansın Optimallaşdırılması {#tip-optimizing-performance-by-skipping-effects}

Bəzi hallarda, hər render etmədən sonra köhnə effeklərin təmizlənib yeni effektlərin tətbiqi performans problemləri yarada bilər. Sinif komponentlərində bu problemləri həll etmək üçün `componentDidUpdate` funksiyasına `prevProps` və ya `prevState` əsasında əlavə müqayisə bloku əlavə edirik:

```js
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    document.title = `${this.state.count} dəfə tıklandı`;
  }
}
```

Bu tələbin çox işləndiyindən biz bu müqayisəni `useEffect` Hook API-ına əlavə etdik. Bəzi dəyərlər render etmələr zamanı dəyişmədikdə React-ə effektin tətbiq edilməsini *buraxmağını* bildirmək mümkündür. Bunun üçün `useEffect`-in ikinci fakultativ arqumentinə massiv göndəririk:

```js{3}
useEffect(() => {
  document.title = `${count} dəfə tıklandı`;
}, [count]); // "count" dəyəri dəyişdikdə effekti icra edin
```

Yuxarıdakı nümunədə `[count]` massivini ikinci arqument kimi göndəririk. Bu nə deməkdir? Əgər `count` `5`-ə bərabər olduqda və bizim komponentimiz `count` `5`-ə bərabər olaraq yenidən render etdikdə React əvvəlki renderdə olan `[5]` dəyərini sonrakı renderdə olan `[5]` dəyəri ilə müqayisə edəcək. Massivdə olan bütün elementlərin bərabər olduğundan (`5 === 5`) React effekti buraxacaq. Bu, optimallaşdırma əməliyyatıdır.

`count` dəyəri `6`-a bərabər olduqda, React əvvəlki render olan `[5]` massivini sonrakı renderdə olan `[6]` massivi ilə müqayisə edəcək. Bu zaman `5 !== 6` bərabər olmadığından React yeni effekti tətbiq edəcək. Massivdə bir neçə ədəd element olduqda hər hansı bir element fərqlidirsə yeni effekt icra olunacaq.

Bu mexanizm təmizlik əməliyyatı olan effektlərdə də işlənir:

```js{10}
useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };
}, [props.friend.id]); // props.friend.id dəyişdikdə yenidən abunəlik et
```

Gələcəkdə ikinci arqument qurulma çevrilməsi tərəfindən avtomatik əlavə oluna bilər.

>Qeyd
>
>Bu optimallaşdırmanı istifadə etdikdə **effektdə işlədilən və zaman ilə dəyişən bütün komponent scope-unda olan dəyərləri (proplar və state kimi) təyin edin**. Əks halda, kodunuz əvvəlki renderdə olan köhnə dəyərlərə istinad edəcək. [Funksiyalar ilə necə işləmək](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) və [massiv dəyişdikdə nə etmək](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often) haqqında FAQ-nu oxuya bilərsiniz.
>
>Effekti bir dəfə icra edib və bir dəfə silmək üçün (mount və unmount zamanı) ikinci arqumentə boş massiv (`[]`) göndərin. Bu, React-ə effektin heç bir prop və ya state dəyərindən asılı olmadığını bildirərək effektin yenidən icrasını dayandırır. Bu, xüsusi ssenari deyil. Asılılıqlar massivi bu formada işləyir.
>
>Boş massiv (`[]`) göndərdikdə effektdə olan proplar və state ilkin dəyəri saxlayacaqlar. İkinci arqument kimi `[]` massivi göndərməyin `componentDidMount` və `componentWillUnmount` modelinə uyğun olmasına baxmayaraq effektlərin çox icra olunmasının qabağını almaq üçün [daha yaxşı](/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies) [həllər var](/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often). Əlavə olaraq, `useEffect` Hooku yalnız brauzer səhifəni çəkdikdən sonra çağrıldığından əlavə işin böyük problem olmadığını yaddan çıxarmayın.
>
>[`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks#installation) paketi ilə gələn [`exhaustive-deps`](https://github.com/facebook/react/issues/14920) qaydasını işlətməyi tövsiyə edirik. Bu paket, səhv göstərilən asılılıqları göstərir və səhvləri düzəltmək üçün düzəlişlər təklif edir.

## Sonrakı Addımlar {#next-steps}

Təbrik Edirik! Bunun çox uzun səhifə olmasına baxmayaraq effektlər haqqında olan sualların əksəriyyətinə cavab verdiyimizi arzulayırıq. Siz, State Hook və Effect Hookları öyrəndiniz. Bu iki Hookdan istifadə edərək *bir çox* məsələni həll edə bilərsiniz. Bu Hooklar siniflərdə olan bir çox ssenarini əhatə edirlər. Əgər bu Hooklar sizin ssenarinizi əhatə etmirsə sizin üçün [digər Hooklar](/docs/hooks-reference.html) faydalı ola bilər.

Əlavə olaraq [Motivasiyada](/docs/hooks-intro.html#motivation) qeyd edildiyi kimi Hookların problemləri necə həll etdiyini görməyə başlayırıq. Biz, effekt təmizləmələrinin `componentDidUpdate` və `componentWillUnmount` funksiyalarında kod dublikatı etdiyini, bir-birinə aid olan kodları bir yerə gətirdiyiniz, və baqların çəkindiyini gördük. Biz həmçinin fərqli effektləri məqsədlərinə görə ayırmağı (siniflər ilə mümkün deyildi) gördük.

Bu nöqtədən sonra sizi Hookların necə işlədiyi maraqlandıra bilər. React, render etmələr arası `useState` çağırışının hansı state dəyərinə aid olduğunu haradan bilir? React, hər yenilikdə köhnə və yeni effektləri necə uyğunlaşdırır? **Sonrakı səhifədə [Hookların Qaydaları](/docs/hooks-rules.html) haqqında danışacağıq**. **Bu qaydalar Hookların işləməsi üçün çox vacibdir.**

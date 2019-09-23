---
id: higher-order-components
title: Yüksək Dərəcəli Komponentlər
permalink: docs/higher-order-components.html
---

Yüksək dərəcəli komponentlər (Higher-Order Component, HOC) React-də komponent məntiqini yenidən istifadə etmənin qabaqcıl texnikasıdır. HOC-lər özlüyündə React API-ın bir parçası deyil, React-in kompozisiyalı təbiətindən ortaya çıxan modeldir.

Qısacası, **yüksək dərəcəli komponent bir komponenti parametr olaraq qəbul edib, yeni bir komponent qaytaran funksiyadır.**

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

Adi komponent propları UI-a çevirir, yüksək dərəcəli komponent isə komponenti başqa bir komponentə çevirir.

HOC-lər üçüncü tərəf React kitabxanalarında yayğındır, məsələn Redux-ın [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect)-i və ya Relay-in [`createFragmentContainer`](http://facebook.github.io/relay/docs/en/fragment-container.html)-i kimi.

Bu sənəddə yüksək dərəcəli komponentlərin niyə faydalı olduğunu və necə yazılacağını müzakirə edəcəyik.

## HOC-lərin Cross-Cutting Concern-lər Üçün İstifadəsi {#use-hocs-for-cross-cutting-concerns}

> **Qeyd**
>
> Əvvəllər cross-cutting concern-ləri ələ almaq üçün mixin-ləri təklif etdik. İndi isə, mixin-lərin xeyirindən daha çox ziyanı olduğunu anladıq. Mixin-ləri niyə ləğv etdiyimiz və mövcud komponentlərinizi necə dəyişə biləcəyiniz haqqında buradan [oxuyun](/blog/2016/07/13/mixins-considered-harmful.html).

Komponentlər React-də kodu yenidən istifadə etmənin əsasıdır. Ancaq, bəzi problemlərin ənənəvi komponentlərlə həll oluna bilmədiyini görəcəyik.

Məsələn, gəlin xarici mənbədən aldığı yorumlar siyahısını render edən `CommentList` komponentinə baxaq:

```js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" qlobal məlumatlar mənbəyidir
      comments: DataSource.getComments()
    };
  }

  componentDidMount() {
    // Dəyişikliklərə abunə olma
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Dinləyicini təmizləmə
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    // Məlumat mənbəyi dəyişdikdə komponentin state-i yenilənir
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}
```

İndi isə, bənzər formada, tək bloq yazısına abunə olan yeni komponent yazaq:

```js
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}
```

`CommentList` və `BlogPost` eyni deyil — `DataSource` üzərində müxtəlif metodları çağırırlar və müxtəlif nəticələri render edirlər. Ancaq, əksər hissələri oxşardır:

- Mount zamanı dəyişiklik dinləyicisini `DataSource`-a əlavə edir.
- Məlumat qaynağı dəyişdikdə dinləyici içərisindən `setState`-i çağırır.
- Unmount zamanı dəyişiklik dinləyicisini silir.

Təsəvvür edin ki, böyük bir applikasiyada `DataSource`-a abunə olma və `setState`-i çağırma dəsti hər dəfə təkrarlanacaq. Bizə bu məntiqin bir yerdə müəyyən edərək, bir çox komponent arasında istifadəyə imkan verən abstraksiya lazımdır. Burada yüksək dərəcəli komponentlər üzə çıxır.

`CommentList` və `BlogPost` kimi komponentləri birbaşa yazmaq yerinə, bunları yaradan və `DataSource`-a abunə edən funksiya yaza bilərik. Bu funksiya abunə olduğu məlumatı prop kimi qəbul edən uşaq komponentini arqument kimi qəbul edəcək. Gəlin bu funksiyanı `withSubscription` adlandıraq:

```js
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);
```

Birinci parametr əhatə olunacaq komponent, ikinci parametr isə `DataSource` və cari proplar əsasında məlumatları qəbul edən funksiyadır.

`CommentListWithSubscription` və `BlogPostWithSubscription` render edildiyi zaman, `CommentList` və `BlogPost`-a ən aktual məlumatları (`DataSource`-dan alınan) `data` propu ilə ötürürük:

```js
// Bu funksiya komponent qəbul edir...
function withSubscription(WrappedComponent, selectData) {
  // ...və başqa bir komponenti qaytarır...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... hansı ki, dəyişikliklərə abunə olur...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ... və əhatə olunmuş komponenti yeni məlumatlarla render edir!
      // Geri qalan propların necə ötürüldüyünə diqqət edin
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

Qeyd edək ki, HOC qəbul etdiyi komponenti dəyişdirmir və ya davranışını kopiyalamır (varislik ilə), bunun yerinə HOC orijinal komponenti konteyner komponenti ilə *əhatə edərək* *tərtib edir*. HOC yan təsiri olmayan təmiz funksiyadır.

Vəssalam! Əhatə olunmuş komponent konteynerin bütün propları ilə birlikdə yeni `data` propunu alaraq nəticəni render edir. HOC məlumatların necə istifadə edildiyi ilə, əhatə olunmuş komponent isə məlumatın haradan gəldiyi ilə maraqlanmırlar.

`withSubscription` normal funksiya olduğundan, istədiyiniz qədər arqument əlavə edə bilərsiniz. Məsələn, HOC-i əhatə olunmuş komponentdən daha da təcrid etmək üçün `data` propunun adının konfiqurasiyalı olmasını istəyə bilərik. Yəni, `shouldComponentUpdate`-i və ya məlumat mənbəyini konfiqurasiya edən bir arqument əlavə edə bilərik. Bunlar hamısı mümkündür, çünki HOC komponentin necə təyin olunduğuna tam nəzarət edir.

Komponentlər arasında olduğu kimi, `withSubscription` ilə əhatə olunmuş komponent arasındakı müqavilə tamamilə prop əsasındadır. Bu, əhatə olunmuş komponentə eyni propu təmin etdikcə bir HOC-i fərqli birinə dəyişdirməyi asanlaşdırır. Məsələn, bu məlumat əldə edən kitabxananı dəyişdirdiyinizdə faydalı ola bilər.

## Orijinal Komponenti Dəyişdirməyin. Kompozisiya İstifadə Edin. {#dont-mutate-the-original-component-use-composition}

HOC içərisində komponentin prototipini dəyişdirməkdən (və ya başqa bir şəkildə dəyişdirməkdən) uzaq olun.

```js
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Cari proplar: ', this.props);
    console.log('Sonrakı proplar: ', nextProps);
  };
  // Orijinal əhatə olunacaq komponenti geri qaytarmamağımız, dəyişikliyin işarəsidir.
  return InputComponent;
}

// EnhancedComponent hər dəfə yeni proplar aldığında konsola yazacaqdır
const EnhancedComponent = logProps(InputComponent);
```

Bununla bağlı bir neçə problem var. Bunlardan biri, `InputComponent`-in `EnhancedComponent`-dən ayrı istifadə oluna bilməməsidir. Daha əhəmiyyətlisi, `EnhancedComponent`-i başqa HOC ilə əhatə etmək istəsəniz, və bu HOC *də* komponentin `componentWillReceiveProps`-nu dəyişsə, ilk HOC-in funksionallığı ləğv ediləcəkdir! Üstəlik, bu tip HOC-lər funksiya komponentləri (lifecycle metodlarına sahib olmayan komponentlər) ilə işləməyəcəkdir.

Dəyişiklik edən HOC-lər sızıntılı bir abstraksiyadır. İstehlakçı digər HOC-lərlə münaqişənin qarşısını almaq üçün bu HOC-in nə dəyişdiyini bilməlidir.

Dəyişiklik etmə əvəzinə, HOC-lər, qəbul olunmuş komponenti konteyner komponenti ilə əhatə edərək kompozisiyadan istifadə etməlidir:

```js
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Cari proplar: ', this.props);
      console.log('Sonrakı proplar: ', nextProps);
    }
    render() {
      // Komponent dəyişilmədən konteynerə qoyulur. Əla!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

Bu HOC, dəyişiklik edən əvvəlki HOC ilə eyni funksiyaya malikdir, lakin dəyişiklik edən HOC-in problemlərinə sahib deyil. Klas və funksiya komponentləri ilə bərabər dərəcədə yaxşı işləyəcəkdir. Təmiz bir funksiya olduğundan, digər HOC-lərlə, hətta özü ilə də tərtib edilə bilər.

HOC-lər ilə **konteyner komponentləri** adlı pattern arasında oxşarlıq görmüş ola bilərsiniz. Konteyner komponentlərinin köməyi ilə əsasən ümumi funksionallığı şəxsi funksionallıqdan ayırırıq. Konteynerlər, state-i və ya məlumata abunə olmanı və propları UI-ı render edən komponentlərə ötürməni idarə edir. HOC-lər tətbiqinin bir hissəsi olaraq konteynerlərdən istifadə edirlər. HOC-ləri parametrləşdirilmiş konteyner yaradıcısı olaraq düşünə bilərsiniz.

## Konvensiya: Əhatə Olunmuş Komponentə Geri Qalan Propları Ötürün {#convention-pass-unrelated-props-through-to-the-wrapped-component}

HOC komponentə xüsusiyyətlər əlavə edir ancaq ilkin məqsədini dəyişdirməməlidir. HOC-dən qaytarılan komponentin əhatə olunmuş komponent ilə bənzər interfeysə sahib olacağı gözlənilir.

HOC-lər funksionallıqları ilə əlaqəsi olmayan propları əhatə etdikləri komponentlərə ötürməlidirlər. Əksər HOC-lərin aşağdakına bənzər render metodu var:

```js
render() {
  // HOC-ə məxsus olan, ötürülməyəcək propların süzülməsi
  const { extraProp, ...passThroughProps } = this.props;

  // Əhatə olunmuş komponent üçün olan yeni proplar. Bunlar əsasən state dəyərləri və ya 
  // instansiya metodlarıdır.
  const injectedProp = someStateOrInstanceMethod;

  // Propların əhatə olunmuş komponentə ötürülməsi
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );
}
```

Bu konvensiya HOC-lərin mümkün qədər çevik və təkrar istifadəli olmasını təmin edir.

## Konvensiya: Tərtib Edilə Bilmə Dərəcəsini Artırmaq {#convention-maximizing-composability}

Bütün HOC-lər eyni görünmürlər. Bəzən yalnız əhatə olunacaq komponenti arqument kimi qəbul edirlər:

```js
const NavbarWithRouter = withRouter(Navbar);
```

Adətən, HOC-lər əlavə arqumentlər qəbul edirlər. Relay-dən bir nümunədə komponentin məlumat asılılığını təyin etmək üçün konfiqurasiya obyekti istifadə olunur:

```js
const CommentWithRelay = Relay.createContainer(Comment, config);
```

HOC çağırmanın ən yayğın yolu belə görünür:

```js
// React Redux-dan olan `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

*Təəccübləndiniz?* Bunu bir-birindən ayırsaq, nələrin baş verdiyini görmək daha asand olacaq.

```js
// connect başqa funksiyanı qaytaran funksiyadır
const enhance = connect(commentListSelector, commentListActions);

// Geri qaytarılmış funksiya HOC-dir, hansı ki komponenti 
// Redux store-a qoşaraq qaytarır
const ConnectedComment = enhance(CommentList);
```
Başqa sözlə, `connect` yüksək dərəcəli komponenti qaytaran yüksək dərəcəli funskiyadır!

Bu forma çaşdırıcı və ya lazımsız görünə bilər, lakin faydalı xassəyə malikdir. `connect` funksiyasından geri qaytarılan HOC tək arqumentlidir və `Component => Component` imzasına sahibdir. Qaydış növü ilə giriş növü eyni olan funksiyaları birlikdə tərtib etmək çox asandır.

```js
// Bunu etmək əvəzinə...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... köməkçi birləşmə funksiyasından istifadə edə bilərsiniz
// compose(f, g, h) ilə (...args) => f(g(h(...args))) eynidir
const enhance = compose(
// Bunlar hər ikisi HOC-dir və tək arqument qəbul edirlər
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

(Bunun sayəsində `connect` və digər genişləyən HOC funksionallığı eksperimental JavaScript dekorativləri olaraq istifadə edilə bilər.)

`compose` köməkçi funksiyası bir çox üçüncü tərəf kitabxanalar tərəfindən təmin edilir, lodash daxil olmaqla ([`lodash.flowRight`](https://lodash.com/docs/#flowRight) kimi), [Redux](https://redux.js.org/api/compose), və [Ramda](https://ramdajs.com/docs/#compose).

## Konvensiya: Asan Dibaq Etmək üçün Görüntüləmə Adı Əlavə Edin{#convention-wrap-the-display-name-for-easy-debugging}

HOC tərəfindən yaradılan konteyner komponentləri digər komponentlər kimi [React Developer Tools](https://github.com/facebook/react-devtools)-da görünür. Dibaqı asanlaşdırmaq üçün HOC tərəfindən yaradılan komponentlərə özəl ad vermək olar.

Ən çox yayılmış texnika əhatə olunmuş komponentin adını sarmaqdır. Yəni, yüksək dərəcəli komponentiniz `withSubscription` adlanırsa və əhatə olunan komponentin adı `CommentList`-dirsə, görüntüləmə adı olaraq `WithSubscription(CommentList)` istifadə edirik:

```js
function withSubscription(WrappedComponent) {
  class WithSubscription extends React.Component {/* ... */}
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```


## Xəbərdarlıqlar {#caveats}

Yüksək dərəcəli komponentlərlə işlədikdə ilk baxışda görünməyən bir neçə problemlərlə rastlaşa bilərsiniz.

### HOC-ləri Render Metodu Daxilində İstifadə Etməyin {#dont-use-hocs-inside-the-render-method}

React-in fərqlilik alqoritmi (reconciliation adlanır) mövcud alt ağacın yeniləməsini və ya onun atıblıb, yenisinin mount edilməsini təyin etmək üçün komponent şəxsiyyətindən istifadə edir. `render`-dən geri qaytarılmış komponent əvvəlki renderdəki komponentlə eynidirsə (`===`), React rekursiv olaraq alt ağacı yenisi ilə fərqləndirərək yeniləyir. Əgər komponentlər bərabər deyillərsə, əvvəlki alt ağac tamamilə unmount edilərək yenisilə əvəz edilir.

Normalda bu bizi maraqlandırmır. Ancaq HOC-lər üçün vacibdir, çünki bu komponentin render metodu daxilində HOC tətbiq etmənin necə problemli olduğunu bildirir:

```js
render() {
  // Hər renderdə EnhancedComponent-in yeni versiyası yaranır
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // Bu, bütün alt ağacın hər dəfə unmount və yenidən mount edilməsinə səbəb olur!
  return <EnhancedComponent />;
}
```

Buradakı problem yalnız performansla bağlı deyil. Bir komponenti yenidən mount etmə bu komponentin state-ni və bütün uşaqlarının state-ni itirməsinə səbəb olur.

Bunun əvəzinə, HOC-ləri komponent tərifi xaricində tətbiq edin. Bu yolla komponent şəxsiyəti qalıcı olacaqdır və React yenidən render etdikdə eyni komponent ilə müqayisə edəcəkdir.

Bəzi nadir hallarda HOC-i dinamik olaraq istifadə etmək istəsəniz, bunu komponentin lifecycle metodları və ya konstruktoru içərisində edə bilərsiniz.

### Statik Metodlar Kopiyalanmalıdır {#static-methods-must-be-copied-over}

Bəzən React komponentində statik metod təyin etmək faydalıdır. Məsələn, Relay konteynerləri GraphQL fraqmentlərinin tərtibini asanlaşdırmaq üçün statik `getFragment` metodunu istifadəyə verirlər.

Bir komponentə HOC tətbiq etdiyiniz zaman orijinal komponent konteyner komponenti ilə əhatə olunur. Bununla yeni komponent orijinal komponentin statik metodlarından heç birinə sahib olmur.

```js
// Statik metod təyin etmə
WrappedComponent.staticMethod = function() {/*...*/}
// HOC tətbiq etmə
const EnhancedComponent = enhance(WrappedComponent);

// Genişləndirilmiş komponentin statik metodu yoxdur
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

Bunu həll etmək üçün konteynerə metodları kopiyalaya bilərik:

```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Kopiyalanacaq metod dəqiq bilinməlidir :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

Ancaq bu, hansı metodların kopiyalanacağını dəqiq bilməyimizi tələb edir. Bütün React-ə aid olmayan statik metodları avtomatik olaraq kopiyalamaq üçün [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) istifadə edə bilərsiniz:

```js
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

Digər mümkün həll, statik metodları komponentdən ayrıca ixrac etməkdir.

```js
// Bunun yerinə ...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...metod ayrıca ixrac edilir...
export { someFunction };

// ...və istehlakcı modulunda hər ikisini import edilir
import MyComponent, { someFunction } from './MyComponent.js';
```

### Ref-lər Ötürülmür {#refs-arent-passed-through}

Yüksək dərəcəli komponentlər üçün konvensiya, bütün propları əhatə edilən komponentə ötürməkdir, ref-lər xaric. Bunun səbəbi, `ref` həqiqi prop deyil, məsələn, `key` də həqiqi prop deyil, və bunlar xüsusi olaraq React tərəfindən idarə olunurlar. Ref-i HOC-in nəticəsi olan komponentin elementinə əlavə etsəniz, ref əhatə edən komponentə deyil də, iyerarxiyaya ən yaxın olan konteyner komponentinin instansiyasına işarə edəcəkdir.

Bu problemin həlli `React.forwardRef` API-ı (React 16.3-ə əlavə olundu) istifadə etməkdir. [Bu barədə daha çox məlumatı ref-lərin yönlendirmesi bölməsindən əldə edə bilərsiniz](/docs/forwarding-refs.html).

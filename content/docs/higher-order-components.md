---
id: higher-order-components
title: Yüksək Dərəcəli Komponentlər
permalink: docs/higher-order-components.html
---

Yüksək dərəcəli komponentlər (Higher-Order Component, HOC) React-da komponent məntiqini yenidən istifadə etmənin qabaqcıl bir texnikasıdır. HOC-lar özlüyündə React API-ın bir parçası deyil, React-ın kompozisiyalı təbiətindən ortaya çıxan bir modeldir.

Qısacası, **yüksək dərəcəli komponent bir komponenti parametr olaraq qəbul edib, yeni bir komponent döndərən funksiyadır.**

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

Adi komponent propları UI-a çevirir, yüksək dərəcəli komponent isə bir komponenti başqa bir komponentə çevirir.

HOC-lar üçüncü tərəf React kitabxanalarında yayğındır, məsələn Redux-ın [`connect`](https://github.com/reduxjs/react-redux/blob/master/docs/api/connect.md#connect)-i və ya Relay-in [`createFragmentContainer`](http://facebook.github.io/relay/docs/en/fragment-container.html)-i kimi.

Bu sənəddə yüksək dərəcəli komponentlərin niyə faydalı olduğunu və necə yazılacağını müzakirə edəcəyik.

## HOC-ların cross-cutting concern-lər üçün istifadəsi {#use-hocs-for-cross-cutting-concerns}

> **Qeyd**
>
> Əvvəllər cross-cutting concern-ləri ələ almaq üçün mixin-ləri təklif etdik. Sonra isə, mixin-lərin xeyirindən daha çox ziyanı olduğunu anladıq. Mixin-ləri niyə ləğv etdiyimiz və mövcud komponentlərinizi necə dəyişə biləcəyiniz haqqında burdan [oxuyun](/blog/2016/07/13/mixins-considered-harmful.html).

Komponentlər Reakt-da kodu yenidən istifadə etmənin əsasıdır. Ancaq, bəzi problemlərin ənənəvi komponentlərlə həll oluna bilmədiyini görəcəyik.

Məsələn, deyək ki `CommentList` komponenti xarici mənbəydən aldığı yorumlar siyahısını render edir:

```js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // "DataSource" burda qlobal məlumatlar mənbəyidir
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

Sonra isə, bənzər bir nümunədə, bir blog yazısına abunə olmaq üçün başqa bir komponent yazırıq:

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

- Mount etmədə bir dəyişiklik dinləyicisini `DataSource`-a əlavə etmə.
- Dinləyici içərisində veri qaynağı dəyişdikdə `setState`-i çağırma.
- Unmount etmədə dəyişiklik dinləyicisini silmə.

Təsəvvür edin, böyük bir applikasiyada `DataSource`-a abunə olma və `setState`-i çağırma dəsti hər dəfə təkrarlanacaq. Bizə bu məntiqin bir yerdə müəyyən edərək, bir çox komponent arasında istifadəyə imkan verən bir abstraksiya lazımdır. Burda yüksək dərəcəli komponentlər üzə çıxır.

`CommentList` və `BlogPost` kimi komponentləri birbaşa yazmaq yerinə, bunları yaradan və `DataSource`-a abunə edən bir funksiya yaza bilərik. Bu funksiya arqument olaraq komponent qəbul edəcək və bu komponentə məlumatları prop olaraq ötürəcək. Gəlin bu funksiyanı `withSubscription` adlandıraq:

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

Birinci parametr əhatə olunacax komponentdir, ikinci parametr isə `DataSource`-u və cari propları qəbul edərək məlumatları döndərən bir funksiyadır.

`CommentListWithSubscription` və `BlogPostWithSubscription` render edildiyi zaman, `CommentList`-ə və `BlogPost`-a `data` prop olaraq ən aktual məlumatları (`DataSource`-dan alınan) ötürürük:

```js
// Bu funksiya bir komponent qəbul edir...
function withSubscription(WrappedComponent, selectData) {
  // ...və başqa bir komponenti döndərir...
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

Qeyd edək ki, HOC qəbul etdiyi komponenti dəyişdirmir və ya davranışını kopyalamır (varislik ilə), bunun yerinə HOC orijinal komponenti bir konteyner komponenti ilə *əhatə edərək* *tərtib edir*. HOC yan təsiri olmayan bir təmiz funksiyadır.

Vəssalam! Əhatə olunmuş komponent konteynerin bütün propları ilə birlikdə yeni prop `data`-nı da alaraq nəticəni render edir. HOC məlumatların necə istifadə edildiyi ilə, əhatə olunmuş komponent isə məlumatın haradan gəldiyi ilə maraqlanmırlar.

`withSubscription` normal bir funksiya olduğundan, istədiyiniz qədər arqument əlavə edə bilərsiniz. Məsələn, HOC-u əhatə olunmuş komponentdən daha da təcrid etmək üçün `data` propının adını konfiqurasiyalı olmasını istəyə bilərik. Yani, `shouldComponentUpdate`-i və ya məlumat mənbəyini konfiqurasiya edən bir arqument əlavə edə bilərik. Bunlar hamısı mümkündür, çünki HOC komponentin necə təyin olunduğuna tam nəzarət edir.

Komponentlər arasında olduğu kimi, `withSubscription` ilə əhatə olunmuş komponent arasındakı müqavilə tamamilə prop əsasındadır. Bu, əhatə olunmuş komponentə eyni propu təmin etdikcə bir HOC-u fərqli birinə dəyişdirməyi asanlaşdırır. Məsələn, bu məlumat əldə edən kitabxananı dəyişdirdiyinizdə faydalı ola bilər.

## Orijinal komponenti dəyişdirməyin. Kompozisiya istifadə edin. {#dont-mutate-the-original-component-use-composition}

HOC içərisində komponentin prototipini dəyişdirməkdən (və ya başqa bir şəkildə dəyişdirməkdən) uzax olun.

```js
function logProps(InputComponent) {
  InputComponent.prototype.componentWillReceiveProps = function(nextProps) {
    console.log('Current props: ', this.props);
    console.log('Next props: ', nextProps);
  };
  // Orijinal əhatə olunacax komponenti geri döndərməməyimiz, deyişikliyin bir işarətidir.
  return InputComponent;
}

// EnhancedComponent hər dəfə yeni proplar aldığında konsola yazacaxdır
const EnhancedComponent = logProps(InputComponent);
```

Bununla bağlı bir neçə problem var. Bunlardan biri, `InputComponent`-nin `EnhancedComponent`-dən ayrı istifadə oluna bilməməsidir. Daha əhəmiyyətlisi, `EnhancedComponent`-i başqa bir HOC ilə əhatə etmək istəsəniz, və bu HOC *da* komponentin `componentWillReceiveProps`-nu dəyişsə, ilk HOC-un funksionallığı ləğv ediləcəkdir! Üstəlik, bu tip HOC-lar funksiya komponentləri (lifecycle metodlarına sahib olmayan komponentlər) ilə işləməyəcəkdir.

Dəyişiklik edən HOC-lar sızıntılı bir abstraksiyadır. İstehlakçı digər HOC-larla münaqişənin qarşısını almaq üçün bu HOC-un nə dəyişdiyini bilməlidir.

Dəyişiklik etmə əvəzinə, HOC-lar tərtibləmədən (kompozisiya) istifadə etməlidirlər, komponenti bir konteyner komponenti ilə əhatə edərək:

```js
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentWillReceiveProps(nextProps) {
      console.log('Current props: ', this.props);
      console.log('Next props: ', nextProps);
    }
    render() {
      // Komponent dəyişilmədən bir konteynerə qoyulur. Əla!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

Bu HOC, dəyişiklik edən əvvəlki HOC ilə eyni funksiyaya malikdir, lakin dəyişiklik edən HOC-un problemlərinə sahib deyil. Klas və funksiya komponentləri ilə bərabər dərəcədə yaxşı işləyir. Təmiz bir funksiya olduğundan, digər HOC-larla, hətta özü ilə də tərtib edilə bilər.

HOC-lar ilə **konteyner komponentləri** adlı bir pattern arasında oxşarlıq görmüş ola bilərsiniz. Konteyner komponentlərinin köməyi ilə əsasən ümumi funksiyanallığı şəxsi funksiyanallıqdan ayırırıq. Konteynerlər, state-i və ya məlumata abunə olmanı və propları UI-ı render edən komponentlərə ötürməni idarə edir. HOC-lar tətbiqinin bir hissəsi olaraq konteynerlərdən istifadə edirlər. HOC-ları parametrləşdirilmiş konteyner yaradıcısı olaraq düşünə bilərsiniz.

## Konvensiya: Əhatə olunmuş komponentə geri qalan propları ötürün {#convention-pass-unrelated-props-through-to-the-wrapped-component}

HOC komponentə xüsusiyyətlər əlavə edir ancaq ilkin məqsədini dəyişdirməməlidir. HOC-dan döndərilən komponentin əhatə olunmuş komponent ilə bənzər bir interfeysə sahib olacağı gözlənilir.

HOC-lar funksionallıqları ilə əlaqəsi olmayan propları əhatə etdikləri komponentlərə ötürməlidirlər. Əksər HOC-ların aşağdakına bənzər bir render metodu var:

```js
render() {
  // HOC-a məxsus olan, ötürülməyəcək propların süzülməsi
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

Bu konvensiya HOC-ların mümkün qədər çevik və təkrar istifadəli olmasını təmin edir.

## Konvensiya: Tərtib edilə bilmə dərəcəsini artırmaq {#convention-maximizing-composability}

Bütün HOC-lar eyni görünmürlər. Bəzən sadəcə bir dənə arqument qəbul edirlər, əhatə olunacax komponenti:

```js
const NavbarWithRouter = withRouter(Navbar);
```

Adətən, HOC-lar əlavə arqumentlər qəbul edirlər. Relay-dən bir nümunədə bir komponentin məlumat asılılığını təyin etmək üçün bir konfiqurasiya obyekti istifadə olunur:

```js
const CommentWithRelay = Relay.createContainer(Comment, config);
```

HOC çağırmanın ən yayığın yolu belə görünür:

```js
// React Redux-dan olan `connect`
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);
```

*Təəccübləndiniz?* Bunu bir-birindən ayırsax, nələrin baş verdiyini görmək daha asand olacax.

```js
// connect başqa bir funksiyanı döndərən bir funksiyadır
const enhance = connect(commentListSelector, commentListActions);

// Geri döndərilmiş funksiya HOC-dur, hansı ki komponenti Redux store-a qoşaraq döndərir
const ConnectedComment = enhance(CommentList);
```
Başqa sözlə, `connect` yüksək dərəcəli komponenti döndərən yüksək dərəcəli funskiyadır!

Bu forma çaşdırıcı və ya lazımsız görünə bilər, lakin faydalı bir xassəyə malikdir. `connect` funksiyasından geri döndərilən HOC tək arqumentlidir və `Component => Component` imzasına sahibdir. Dönüş növü ilə giriş növü eyni olan funksiyaları birlikdə tərtib etmək çox asandır.

```js
// Bunu etmək əvəzinə...
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// ... köməkçi birləşmə funksiyasından istifadə edə bilərsiniz
// compose(f, g, h) ilə (...args) => f(g(h(...args))) eynidir
const enhance = compose(
// Bunlar hər ikisi HOC-dur və tək arqument qəbul edirlər
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

(Bunun sayəsində `connect` və digər genişləyən HOC funksionallığı eksperimental JavaScript dekorativləri olaraq istifadə edilə bilər.)

`compose` köməkçi funksiyası bir çox üçüncü tərəf kitabxanalar tərəfindən təmin edilir, lodash daxil olmaqla ([`lodash.flowRight`](https://lodash.com/docs/#flowRight) kimi), [Redux](https://redux.js.org/api/compose), və [Ramda](https://ramdajs.com/docs/#compose).

## Konvensiya: Asan dibaq etmək üçün görüntüləmə adı əlavə edin {#convention-wrap-the-display-name-for-easy-debugging}

HOC tərəfindən yaradılan konteyner komponentləri digər komponentlər kimi [React Developer Tools](https://github.com/facebook/react-devtools)-da görünür. Dibaqı asanlaşdırmaq üçün HOC tərəfindən yaradılan komponentlərə özəl ad vermək olar.

Ən çox yayılmış texnika əhatə olunmuş komponentin adını sarmaqdır. Yani, yüksək dərəcəli komponentiniz `withSubscription` adlanırsa və əhatə olunan komponentin adı `CommentList`-dirsə, görüntüləmə adı olaraq `WithSubscription(CommentList)` istifadə edirik:

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

### HOC-ları render metodunun içərisində istifadə etməyin {#dont-use-hocs-inside-the-render-method}

React-ın fərqlilik alqoritmi (reconciliation adlanır) mövcud alt ağacın yeniləməsini və ya onun atıblıb, yenisinin mount edilməsini təyin etmək üçün komponent şəxsiyyətindən istifadə edir. `render`-dən geri döndərilmiş komponent əvvəlki render-dəki komponentlə eynidirsə (`===`), React rekursiv olaraq alt ağacı yenisi ilə fərqləndirərək yeniləyir. Əgər komponentlər bərabər deyillərsə, əvvəlki alt ağac tamamilə unmount edilərək yenisiylə əvəz edilir.

Normalda bu bizi maraxlandırmır. Ancaq HOC-lar üçün vacibdir, çünki bu komponentin render metodu daxilində bir HOC tətbiq etmənin necə problemli olduğunu bildirir:

```js
render() {
  // Hər render EnhancedComponent-in yeni bir versiyasını yaradır
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // Bu, bütün alt ağacın hər dəfə unmount və yenidən mount edilməsinə səbəb olur!
  return <EnhancedComponent />;
}
```

Buradakı problem yalnız performansla bağlı deyil. Bir komponenti yenidən mount etmə bu komponentin state-ni və bütün uşaqlarının state-ni itirməsinə səbəb olur.

Bunun əvəzinə, HOC-ları komponent tərifi xaricində tətbiq edin. Bu yolla komponent şəxsiyəti qalıcı olacaxdır və React yenidən render etdikdə eyni komponent ilə müqayisə edəcəkdir.

Bəzi nadir hallarda bir HOC-u dinamik olaraq istifadə etmək istəsəniz, bunu komponentin lifecycle metodları və ya konstruktoru içərisində edə bilərsiniz.

### Statik metodlar kopyalanmalıdır {#static-methods-must-be-copied-over}

Bəzən bir React komponentində statik bir metod təyin etmək faydalıdır. Məsələn, Relay konteynerləri GraphQL fraqmentlərinin tərtibini asanlaşdırmaq üçün statik `getFragment` metodunu istifadəyə verirlər.

Bir komponentə HOC tətbiq etdiyiniz zaman orijinal komponent bir konteyner komponenti ilə əhatə olunur. Bununla yeni komponent orijinal komponentin statik metodlarından heç birinə sahib olmur.

```js
// Statik bir metod təyin etmə
WrappedComponent.staticMethod = function() {/*...*/}
// HOC tətbiq etmə
const EnhancedComponent = enhance(WrappedComponent);

// Genişləndirilmiş komponentin statik metodu yoxdur
typeof EnhancedComponent.staticMethod === 'undefined' // true
```

Bunu həll etmək üçün konteynerə metodları kopyalaya bilərik:

```js
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // Kopyalayacaq metod dəqiq bilməlidir :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

Ancaq bu, hansı metodların kopyalanacağını dəqiq bilməyimizi tələb edir. Bütün react-a aid olmayan statik metodları avtomatik olaraq kopyalamaq üçün [hoist-non-react-statics](https://github.com/mridgway/hoist-non-react-statics) istifadə edə bilərsiniz:

```js
import hoistNonReactStatic from 'hoist-non-react-statics';
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

Digər mümkün bir həll, statik metodları komponentdən ayrıca export etməkdir.

```js
// Bunun yerinə ...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...metod ayrıca export edilir...
export { someFunction };

// ...və istehlakcı modulunda hər ikisini import edilir
import MyComponent, { someFunction } from './MyComponent.js';
```

### Ref-lər ötürülmür {#refs-arent-passed-through}

Yüksək dərəcəli komponentlər üçün konvensiya, bütün propları əhatə edilən komponentə ötürməkdir, ref-lər xaric. Bunun səbəbi, `ref` həqiqi bir prop deyil, məsələn, `key` də həqiqi bir prop deyil, və bunlar xüsusi olaraq React tərəfindən idarə olunurlar. Ref-i HOC-un nəticəsi olan bir komponentin elementinə əlavə etsəniz, ref əhatə edən komponentə deyil də, iyerarxiyaya ən yaxın olan konteyner komponentinin instansiyasına işarə edəcəkdir.

Bu problemin həlli `React.forwardRef` API-ı (React 16.3-ə əlavə olundu) istifadə etməkdir. [Bu barədə daha çox məlumatı ref-lərin yönlendirmesi bölməsindən əldə edə bilərsiniz](/docs/forwarding-refs.html).

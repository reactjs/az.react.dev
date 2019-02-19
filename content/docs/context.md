---
id: context
title: Kontekst
permalink: docs/context.html
---

Kontext məlumatları komponent ağacının hər səviyyəsində proplar göndərmədən məlumatları komponentlərə ötürməyə təmin edir.

Standart React applikasiyasında, məlumat yuxarıdan aşağı (valideyndən uşağa) proplar vasitəsi ilə göndərilir. Lakin bir çox komponentin istifadə etdiyi bəzi prop tiplərinin (məsələn dil seçimi, UI şablonun) bu prop tiplərinin göndərilməsi çox yorucu və çətin ola bilər. Kontext, dəyərlərin bir komponentlər arasında, komponent ağaçının hər səviyyəsində prop göndərmədən paylaşmasını təminat edir.

- [Nə Zaman Kontekst İşlətmək Lazımdır](#when-to-use-context)
- [Kontekst İşlətməkdən Əvvəl](#before-you-use-context)
- [API](#api)
  - [React.createContext](#reactcreatecontext)
  - [Context.Provider](#contextprovider)
  - [Class.contextType](#classcontexttype)
  - [Context.Consumer](#contextconsumer)
- [Misallar](#examples)
  - [Dinamik Kontekst](#dynamic-context)
  - [Konteksti Bir Birindən Keçən Komponentdən Yeniləmək](#updating-context-from-a-nested-component)
  - [Bir Neçə Kontekstin İstehlakı](#consuming-multiple-contexts)
- [Xəbərdarlıqlar](#caveats)
- [Köhnə API](#legacy-api)

## Nə Zaman Kontekst İşlətmək Lazımdır {#when-to-use-context}

Kontekst "qlobal" qəbul olunan məlumatları (məsələn avtorizasiya olunmush istifadəçi, şablon, və ya seçilmiş dil) React komponentlər ağacında paylaşmaq üçün nəzərdə tutulmuşdur. Məsələn, aşağıdakı kodda biz Button komponentini dəyişmək üçün "theme" propunu bütün komponentlərdən bir bir göndəririk:

`embed:context/motivation-problem.js`

Kontekst işlətdikdə isə, biz propları ara elementlərdən göndərməyə bilərik:

`embed:context/motivation-solution.js`

## Kontekst İşlətməkdən Əvvəl {#before-you-use-context}

Kontekst əsasən məlumatın fərqli səviyyələrdə yerləşən *bir neçə* komponent tərəfindən işlənməsi üçündür. Bunu hər yerdə işlətməyin çünki komponentin yenidən istifadəsini çətinləşdirir.

**Əgər siz propları bir neçə səviyyədə göndərmək istəmirsinizsə, [komponent kompozisiyası](/docs/composition-vs-inheritance.html) kontekstdən daha sadə həlldir.**

Misal üçün, gəlin `user` və `avatarSize` proplarını mövcud olan `Page` komponentindan bir neçə səviyyədə göndərərkki, dərində olan `Link` və `Avatar` komponentləri bu propları oxuya bilsinlər:

```js
<Page user={user} avatarSize={avatarSize} />
// ... render edirs ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... render edir ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... render edir ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

Əgər `user` və `avatarSize` propları yalnız `Avatar` komponenti tərəfindən işlənəcəksə, bu propların bütün səviyyələrdə göndərilməsi lazımsızdır. Əgər `Avatar` komponentinə yeni proplar lazım olsa, siz yenə lazım olan propları bütün ara komponentlərdən keçirməlisiniz.

Bu problemi **kontekstsiz** həll etməyin yolu [`Avatar` komponentinin özünü göndərməkdir](/docs/composition-vs-inheritance.html#containment). Bu zaman, ara komponentlərin `user` və `avatarSize` proplarını bilməsi lazım deyil:

```js
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// Biz bizdə aşağıdakı var
<Page user={user} />
// ... render edir ...
<PageLayout userLink={...} />
// ... render edir ...
<NavigationBar userLink={...} />
// ... render edir ...
{props.userLink}
```

Bu dəyişiklik ilə, yalnız ən yuxarıda olan Page komponenti, `Link` və `Avatar` komponentlərinin `user` və `avatarSize` proplarını işlətməyini bilir.

Bu *kontrolun inversiyası* applikasiyada göndərilən propların sayını azaldaraq və ana komponentlərə daha çox kontrol verərək, bir neçə ssenaridə kodunuzu daha təmiz edir. Lakin, bu metod hər ssenari üçün düzgün seçim deyil: mürəkkəbiliyi komponent ağacında yüksək olan komponentlərə göndərdikdə, bu yuxarı səviyyəli komponentləri daha çətinləşdirir və aşağı səviyyəli komponentlərin daha əyilgən olmasını məcbur edir.

Siz komponentdə bir uşaq göstərməyə məhdud deyilsiniz. Siz bir neçə uşağı, hətta uşaqlar üçün bir neçə "yuvada" edə bilərsiniz ([burada sənələşmişdir](/docs/composition-vs-inheritance.html#containment)):

```js
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```

Bu metod, uşaqları yaxın valideyndən ayırmaq üçün kifayətdir. Əgər uşaq komponent, render etməzdən öncə valideyn ilə kommunikasiya qurmalıdırsa, siz [render proplardan](/docs/render-props.html) istifadə edə bilərsiniz.

Lakin, bəzən eyni məlumatlar komponent ağacında fərqli səviyyələrdə bir neçə komponent tərəfindən işlədilə bilməlidirlər. Kontekst belə məlumatları və bu məlumatlarda olan dəyişiklikləri, bütün aşağısında olan komponentlərə "yayımlaya" bilir. Bir çox nümunələrdə kontekst işlətmək alternativlərdən daha sadə ola bilər (dilin seçimi, şablon, məlumat keşi).


## API {#api}

### `React.createContext` {#reactcreatecontext}

```js
const MyContext = React.createContext(defaultValue);
```

Creates a Context object. When React renders a component that subscribes to this Context object it will read the current context value from the closest matching `Provider` above it in the tree.

The `defaultValue` argument is **only** used when a component does not have a matching Provider above it in the tree. This can be helpful for testing components in isolation without wrapping them. Note: passing `undefined` as a Provider value does not cause consuming components to use `defaultValue`.

### `Context.Provider` {#contextprovider}

```js
<MyContext.Provider value={/* some value */}>
```

Every Context object comes with a Provider React component that allows consuming components to subscribe to context changes.

Accepts a `value` prop to be passed to consuming components that are descendants of this Provider. One Provider can be connected to many consumers. Providers can be nested to override values deeper within the tree.

All consumers that are descendants of a Provider will re-render whenever the Provider's `value` prop changes. The propagation from Provider to its descendant consumers is not subject to the `shouldComponentUpdate` method, so the consumer is updated even when an ancestor component bails out of the update.

Changes are determined by comparing the new and old values using the same algorithm as [`Object.is`](//developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description). 

> Note
> 
> The way changes are determined can cause some issues when passing objects as `value`: see [Caveats](#caveats).

### `Class.contextType` {#classcontexttype}

```js
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /* perform a side-effect at mount using the value of MyContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* render something based on the value of MyContext */
  }
}
MyClass.contextType = MyContext;
```

The `contextType` property on a class can be assigned a Context object created by [`React.createContext()`](#reactcreatecontext). This lets you consume the nearest current value of that Context type using `this.context`. You can reference this in any of the lifecycle methods including the render function.

> Note:
>
> You can only subscribe to a single context using this API. If you need to read more than one see [Consuming Multiple Contexts](#consuming-multiple-contexts).
>
> If you are using the experimental [public class fields syntax](https://babeljs.io/docs/plugins/transform-class-properties/), you can use a **static** class field to initialize your `contextType`.


```js
class MyClass extends React.Component {
  static contextType = MyContext;
  render() {
    let value = this.context;
    /* render something based on the value */
  }
}
```

### `Context.Consumer` {#contextconsumer}

```js
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```

A React component that subscribes to context changes. This lets you subscribe to a context within a [function component](/docs/components-and-props.html#function-and-class-components).

Requires a [function as a child](/docs/render-props.html#using-props-other-than-render). The function receives the current context value and returns a React node. The `value` argument passed to the function will be equal to the `value` prop of the closest Provider for this context above in the tree. If there is no Provider for this context above, the `value` argument will be equal to the `defaultValue` that was passed to `createContext()`.

> Note
> 
> For more information about the 'function as a child' pattern, see [render props](/docs/render-props.html).

## Examples {#examples}

### Dynamic Context {#dynamic-context}

A more complex example with dynamic values for the theme:

**theme-context.js**
`embed:context/theme-detailed-theme-context.js`

**themed-button.js**
`embed:context/theme-detailed-themed-button.js`

**app.js**
`embed:context/theme-detailed-app.js`

### Updating Context from a Nested Component {#updating-context-from-a-nested-component}

It is often necessary to update the context from a component that is nested somewhere deeply in the component tree. In this case you can pass a function down through the context to allow consumers to update the context:

**theme-context.js**
`embed:context/updating-nested-context-context.js`

**theme-toggler-button.js**
`embed:context/updating-nested-context-theme-toggler-button.js`

**app.js**
`embed:context/updating-nested-context-app.js`

### Consuming Multiple Contexts {#consuming-multiple-contexts}

To keep context re-rendering fast, React needs to make each context consumer a separate node in the tree. 

`embed:context/multiple-contexts.js`

If two or more context values are often used together, you might want to consider creating your own render prop component that provides both.

## Caveats {#caveats}

Because context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider's parent re-renders. For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for `value`:

`embed:context/reference-caveats-problem.js`


To get around this, lift the value into the parent's state:

`embed:context/reference-caveats-solution.js`

## Legacy API {#legacy-api}

> Note
> 
> React previously shipped with an experimental context API. The old API will be supported in all 16.x releases, but applications using it should migrate to the new version. The legacy API will be removed in a future major React version. Read the [legacy context docs here](/docs/legacy-context.html).
 

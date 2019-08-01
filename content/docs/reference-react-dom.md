---
id: react-dom
title: ReactDOM
layout: docs
category: Reference
permalink: docs/react-dom.html
---

Əgər siz React-i `<script>` təqi ilə yükləyirsinizsə, yüksək dərəcəli API-lar `ReactDOM` qlobal dəyişənindən istifadə edilə bilərlər. Əgər siz NPM ilə ES6 işlədirsinizsə, siz `import ReactDOM from 'react-dom'` yaza bilərsiniz. Əgər siz NPM ile ES5 işlədirsinizsə, siz `var ReactDOM = require('react-dom')` yaza bilərsiniz.

## İcmal {#overview}

`react-dom` paketi applikasiyanızın ən yüksək dərəcəsində DOMa-a aid olan metodlar ilə və React modelindən kanara çıxmaq üçün metodlar ilə təmin edir. Sizin komponentlərinizin əksəriyyəti bu modulu işlətməməlidir.

- [`render()`](#render)
- [`hydrate()`](#hydrate)
- [`unmountComponentAtNode()`](#unmountcomponentatnode)
- [`findDOMNode()`](#finddomnode)
- [`createPortal()`](#createportal)

### Brauzer Dəstəyi {#browser-support}

React bütün populyar brauzerləri (Internet Explorer 9 və yuxarı daxil olmaqla) dəstəkləyir. IE 9 və IE 10 kimi köhnə brauzerlər üçün [bəzi polifillər lazım ola bilər.](/docs/javascript-environment-requirements.html)

> Qeyd
>
> Biz ES5 metodları dəstəkləməyən köhnə brauzerləri dəstəkləmir. Amma bir çox applikasiyalar [es5-shim and es5-sham](https://github.com/es-shims/es5-shim) kimi polifillər səhifəyə yüklənəndə köhnə brauzerlərdə işləyirlər. Siz bu yolu seçirsinizsə biz sizə kömək edə bilmərik.

* * *

## Arayış {#reference}

### `render()` {#render}

```javascript
ReactDOM.render(element, container[, callback])
```

Render a React element into the DOM in the supplied `container` and return a [reference](/docs/more-about-refs.html) to the component (or returns `null` for [stateless components](/docs/components-and-props.html#functional-and-class-components)).

If the React element was previously rendered into `container`, this will perform an update on it and only mutate the DOM as necessary to reflect the latest React element.

If the optional callback is provided, it will be executed after the component is rendered or updated.

> Note:
>
> `ReactDOM.render()` controls the contents of the container node you pass in. Any existing DOM elements inside are replaced when first called. Later calls use React’s DOM diffing algorithm for efficient updates.
>
> `ReactDOM.render()` does not modify the container node (only modifies the children of the container). It may be possible to insert a component to an existing DOM node without overwriting the existing children.
>
> `ReactDOM.render()` currently returns a reference to the root `ReactComponent` instance. However, using this return value is legacy
> and should be avoided because future versions of React may render components asynchronously in some cases. If you need a reference to the root `ReactComponent` instance, the preferred solution is to attach a
> [callback ref](/docs/more-about-refs.html#the-ref-callback-attribute) to the root element.
>
> Using `ReactDOM.render()` to hydrate a server-rendered container is deprecated and will be removed in React 17. Use [`hydrate()`](#hydrate) instead.

* * *

### `hydrate()` {#hydrate}

```javascript
ReactDOM.hydrate(element, container[, callback])
```

Same as [`render()`](#render), but is used to hydrate a container whose HTML contents were rendered by [`ReactDOMServer`](/docs/react-dom-server.html). React will attempt to attach event listeners to the existing markup.

React expects that the rendered content is identical between the server and the client. It can patch up differences in text content, but you should treat mismatches as bugs and fix them. In development mode, React warns about mismatches during hydration. There are no guarantees that attribute differences will be patched up in case of mismatches. This is important for performance reasons because in most apps, mismatches are rare, and so validating all markup would be prohibitively expensive.

If a single element's attribute or text content is unavoidably different between the server and the client (for example, a timestamp), you may silence the warning by adding `suppressHydrationWarning={true}` to the element. It only works one level deep, and is intended to be an escape hatch. Don't overuse it. Unless it's text content, React still won't attempt to patch it up, so it may remain inconsistent until future updates.

If you intentionally need to render something different on the server and the client, you can do a two-pass rendering. Components that render something different on the client can read a state variable like `this.state.isClient`, which you can set to `true` in `componentDidMount()`. This way the initial render pass will render the same content as the server, avoiding mismatches, but an additional pass will happen synchronously right after hydration. Note that this approach will make your components slower because they have to render twice, so use it with caution.

Remember to be mindful of user experience on slow connections. The JavaScript code may load significantly later than the initial HTML render, so if you render something different in the client-only pass, the transition can be jarring. However, if executed well, it may be beneficial to render a "shell" of the application on the server, and only show some of the extra widgets on the client. To learn how to do this without getting the markup mismatch issues, refer to the explanation in the previous paragraph.

* * *

### `unmountComponentAtNode()` {#unmountcomponentatnode}

```javascript
ReactDOM.unmountComponentAtNode(container)
```

Mount olunmuş React komponenti DOM-dan silir və bütün aid olan hadisə işləyicilərini və state-i təmizləyir. Əgər konteynerə heç bir komponent mount edilməyibsə bu funksiyanı çağırdıqda heç nə baş vermir. Bu funksiya komponent unmount edildikdə `true`, unmount edilməyə komponent olmadıqda isə `false` qaytarır.

* * *

### `findDOMNode()` {#finddomnode}

> Note:
>
> `findDOMNode` is an escape hatch used to access the underlying DOM node. In most cases, use of this escape hatch is discouraged because it pierces the component abstraction. [It has been deprecated in `StrictMode`.](/docs/strict-mode.html#warning-about-deprecated-finddomnode-usage)

```javascript
ReactDOM.findDOMNode(component)
```
If this component has been mounted into the DOM, this returns the corresponding native browser DOM element. This method is useful for reading values out of the DOM, such as form field values and performing DOM measurements. **In most cases, you can attach a ref to the DOM node and avoid using `findDOMNode` at all.**

When a component renders to `null` or `false`, `findDOMNode` returns `null`. When a component renders to a string, `findDOMNode` returns a text DOM node containing that value. As of React 16, a component may return a fragment with multiple children, in which case `findDOMNode` will return the DOM node corresponding to the first non-empty child.

> Note:
>
> `findDOMNode` only works on mounted components (that is, components that have been placed in the DOM). If you try to call this on a component that has not been mounted yet (like calling `findDOMNode()` in `render()` on a component that has yet to be created) an exception will be thrown.
>
> `findDOMNode` cannot be used on function components.

* * *

### `createPortal()` {#createportal}

```javascript
ReactDOM.createPortal(child, container)
```

Portal yaradır. Portallar [DOM komponenti iyerarxiyası kənarında olan DOM noduna uşaqları render etmək üçün](/docs/portals.html) yol ilə təmin edir.

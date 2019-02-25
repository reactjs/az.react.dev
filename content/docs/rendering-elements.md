---
id: rendering-elements
title: Elementlərin Renderi
permalink: docs/rendering-elements.html
redirect_from:
  - "docs/displaying-data.html"
prev: introducing-jsx.html
next: components-and-props.html
---

Elementlər React applikasiyasının ən kiçik tərkib hissəsidir.

Element ekranda nə görmək istədiyinizi təsvir edir:

```js
const element = <h1>Hello, world</h1>;
```

Brauzerin DOM elementlərindən fərqli olaraq, React elementləri adi obyektlərdir və onların yaradılması daha az resurs tələb edir. DOM-un React elementləri ilə eyni olmasını təmin etməyi isə React DOM öz üzərinə götürür.

>**Qeyd:**
>
>Elementlər daha geniş tanınmış "komponentlər" anlayışı ilə qarışdıra bilər. Komponentlər mövzusuna [növbəti səhifədə](/docs/components-and-props.html) giriş edəcəyik. Elementlər komponentlərin tərkib hissəsidir və irəliyə keçmədən bu hissəni oxumağı tövsiyyə edirik.

## DOM-da Elementlərin Renderi {#rendering-an-element-into-the-dom}

Deyək ki HTML faylinizda hardasa `<div>` elementi var:

```html
<div id="root"></div>
```

We call this a "root" DOM node because everything inside it will be managed by React DOM.

Applications built with just React usually have a single root DOM node. If you are integrating React into an existing app, you may have as many isolated root DOM nodes as you like.

To render a React element into a root DOM node, pass both to `ReactDOM.render()`:

`embed:rendering-elements/render-an-element.js`

[](codepen://rendering-elements/render-an-element)

It displays "Hello, world" on the page.

## Updating the Rendered Element {#updating-the-rendered-element}

React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object). Once you create an element, you can't change its children or attributes. An element is like a single frame in a movie: it represents the UI at a certain point in time.

With our knowledge so far, the only way to update the UI is to create a new element, and pass it to `ReactDOM.render()`.

Consider this ticking clock example:

`embed:rendering-elements/update-rendered-element.js`

[](codepen://rendering-elements/update-rendered-element)

It calls `ReactDOM.render()` every second from a [`setInterval()`](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) callback.

>**Note:**
>
>In practice, most React apps only call `ReactDOM.render()` once. In the next sections we will learn how such code gets encapsulated into [stateful components](/docs/state-and-lifecycle.html).
>
>We recommend that you don't skip topics because they build on each other.

## React Only Updates What's Necessary {#react-only-updates-whats-necessary}

React DOM compares the element and its children to the previous one, and only applies the DOM updates necessary to bring the DOM to the desired state.

You can verify by inspecting the [last example](codepen://rendering-elements/update-rendered-element) with the browser tools:

![DOM inspector showing granular updates](../images/docs/granular-dom-updates.gif)

Even though we create an element describing the whole UI tree on every tick, only the text node whose contents has changed gets updated by React DOM.

In our experience, thinking about how the UI should look at any given moment rather than how to change it over time eliminates a whole class of bugs.

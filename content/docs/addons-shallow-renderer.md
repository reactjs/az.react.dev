---
id: shallow-renderer
title: Dayaz Render Etmə
permalink: docs/shallow-renderer.html
layout: docs
category: Reference
---

**İdxal Etmək**

```javascript
import ShallowRenderer from 'react-test-renderer/shallow'; // ES6
var ShallowRenderer = require('react-test-renderer/shallow'); // npm ilə ES5
```

## İcmal {#overview}

React-də unit testlər yazmaq üçün Dayaz Render Etmə faydalıdır. Dayaz render etmə, komponenti "bir dərəcə dərinlikdə" render etməyə imkan yaradır. Bu halda, uşaq komponentlərin davranışından narahat olmayaraq (yaranıb render etmirlər), siz komponentin nə qaytardığı haqqında iddaları yoxlaya bilərsiniz. Burada DOM-a tələbat yoxdur.

Məsələn, əgər sizdə aşağıdakı komponent varsa:

```javascript
function MyComponent() {
  return (
    <div>
      <span className="heading">Başlıq</span>
      <Subcomponent foo="bar" />
    </div>
  );
}
```

Siz iddiaları aşağıdakı formada edə bilərsiniz:

```javascript
import ShallowRenderer from 'react-test-renderer/shallow';

// in your test:
const renderer = new ShallowRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

expect(result.type).toBe('div');
expect(result.props.children).toEqual([
  <span className="heading">Başlıq</span>,
  <Subcomponent foo="bar" />
]);
```

Dayaz render etmənin bəzi məhdudiyyətləri var. Hal-hazırda ref-lər dəstəklənmir.

> Qeyd:
>
> Biz həmçinin Enzyme-ın [Dayaz Render Etmə API-na](https://airbnb.io/enzyme/docs/api/shallow.html) baxmağınızı tövsiyyə edirik. Bu sizə eyni funksionallıq üzərindən  yuxarı dərəcəli API təmin edir.

## Arayış {#reference}

### `shallowRenderer.render()` {#shallowrendererrender}

Siz shallowRenderer-ə komponenti render etmək üçün və komponentin nəticəsini idxal etmək üçün bir "yer" kimi baxa bilərsiniz.

`shallowRenderer.render()` [`ReactDOM.render()`-ə](/docs/react-dom.html#render) bənzəyir amma DOM tələb etmir və komponentləri yalnız bir dərəcə dərinliyə kimi render edir. Bu metod, sizə komponentləri uşaqların tətbiqindən təcrid olunmuş şəkildə test etməyə imkan yaradır.

### `shallowRenderer.getRenderOutput()` {#shallowrenderergetrenderoutput}

`shallowRenderer.render()` çağrıldıqdan sonra `shallowRenderer.getRenderOutput()`-dan istifadə edərək dayaz render etmənin nəticəsini əldə edə bilərsiniz.

Nəticəni əldə etdikdən sonra nəticə haqqında iddiaları yoxlaya bilərsiniz.

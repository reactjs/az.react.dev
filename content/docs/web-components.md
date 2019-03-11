---
id: web-components
title: Veb Komponentlər
permalink: docs/web-components.html
redirect_from:
  - "docs/webcomponents.html"
---

React və [Veb Komponentlər](https://developer.mozilla.org/en-US/docs/Web/Web_Components) müxtəlif problemləri həll etmək üçün qurulub. Veb Komponentlərin yenidən istifadə olunması üçün inkapsulyasiya dəstəklədiyi halda React DOM-u sizin məlumatlarınız ilə sinxronlaşdıran deklarativ kitabxana təmin edir. Hər iki məqsəd tamamlayıcıdırlar. Developer kimi siz Veb komponentlərinizdə React istifadə edə bilər və ya React-də Veb Komponentlər istifadə edə bilərsiniz, və ya hər ikisini.

React istifadə edənlərin çoxu Veb Komponentlər istifadə etmir, amma siz istifadə etmək istiyə bilərsiniz. Xüsusilə, əgər siz Veb Komponentlərin istifadəsi üçün yazılmış üçüncü tərəf UI komponentləri istifadə edirsinizsə.

## React-də Veb Komponentlərin İstifadəsi {#using-web-components-in-react}

```javascript
class HelloMessage extends React.Component {
  render() {
    return <div>Hello <x-search>{this.props.name}</x-search>!</div>;
  }
}
```

> Qeyd:
>
> Veb Komponentlər çox vaxt imperativ API-nı göstərir. Məsələn, `video` Veb Komponenti `play()` və `pause()` funksiyalarını göstərə bilər. Veb Komponentin interaktiv API-sinə daxil olmaq üçün siz DOM node-a birdəfəlik əlaqəyə girən ref işlətməli olacaqsınız. Əgər siz üçüncü tərəf Veb Komponentlərini istifadə edirsinizsə ən yaxşı çıxış yolu sizin Veb komponentinizə əhatə edən funksiyasını daşıyan rolunu oynayan React komponenti yazmaqdır. 
>
> Veb komponentlər tərəfindən yayılmış hadisələr React render ağacından düngün ötməyə bilər.
> Siz React komponentlərinizdə bu hadisələri idarə etmək üçün əllə (manually) hadisə işləyicilərini qoşmalısınız.

Bir ümumi çaşqınlıq odur ki, Veb Komponentlər "className" əvəzinə "class" işlədirlər. 

```javascript
function BrickFlipbox() {
  return (
    <brick-flipbox class="demo">
      <div>front</div>
      <div>back</div>
    </brick-flipbox>
  );
}
```

## Sizin Veb Komponentlərinizdə React-in İşlənməsi {#using-react-in-your-web-components}

```javascript
class XSearch extends HTMLElement {
  connectedCallback() {
    const mountPoint = document.createElement('span');
    this.attachShadow({ mode: 'open' }).appendChild(mountPoint);

    const name = this.getAttribute('name');
    const url = 'https://www.google.com/search?q=' + encodeURIComponent(name);
    ReactDOM.render(<a href={url}>{name}</a>, mountPoint);
  }
}
customElements.define('x-search', XSearch);
```

>Qeyd:
>
>Bu kod klasları Babel ilə çevirsəniz **işləməyəcək**. [Bu problemə](https://github.com/w3c/webcomponents/issues/587) müzakirə üçün baxın.
>Bu problemi həll etmək üçün veb komponentinizi yükləməmişdən öncə [custom-elements-es5-adapter](https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs)-i daxil edin. 

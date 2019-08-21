---
id: lists-and-keys
title: Siyahı və Açarlar
permalink: docs/lists-and-keys.html
prev: conditional-rendering.html
next: forms.html
---

Gəlin JavaScript-də siyahıları çevirməyə yenidən baxaq.

Aşağıdaki kodda [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) funksiyasından istifadə edib rəqəmlər (`numbers`) massivinindəki dəyərləri iki dəfə artırırıq. `map()`-dən qaytarılan yeni massivi `doubled` dəyişəninə təyin edib bu massivi çap edirik:

```javascript{2}
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
console.log(doubled);
```

Bu kod konsola `[2, 4, 6, 8, 10]` çap edir.

React-də, massivləri [elementlər](/docs/rendering-elements.html) siyahısına çevirmək eyni formada icra olunur.

### Bir Neçə Komponentin Render Edilməsi {#rendering-multiple-components}

Siz elementlər kolleksiyaları yaradıb, bu kolleksiyaları fiqur mötərizəsindən istifadə edərək [JSX-ə daxil edə bilərsiniz](/docs/introducing-jsx.html#embedding-expressions-in-jsx).

Aşağıdaki kodda, [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) funksiyasından istifadə edərək `numbers` massivindən keçirik. Biz massivin hər bəndi üçün `<li>` elementi qaytarırıq. Ən sonda, qaytarılan elementlər massivini `listItems` dəyişəninə təyin edirik:

```javascript{2-4}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li>{number}</li>
);
```

`listItems` massivini `<ul>` elementinə daxil edərək siyahını [DOM-a render edirik](/docs/rendering-elements.html#rendering-an-element-into-the-dom):

```javascript{2}
ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('root')
);
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/GjPyQr?editors=0011)

Bu kod 1-dən 5-ə kimi rəqəmləri nöqtəli siyahıda göstərir.

### Sadə Siyahı Komponenti {#basic-list-component}

Adətən siyahılar [komponentin](/docs/components-and-props.html) daxilindən render edilir.

Əvvəkli nümunəni redaktə edib, `numbers massivi qəbul edən və elementlər siyahısı render edən komponentə çevirə bilərik.

```javascript{3-5,7,13}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

Bu kodu icra etdikdə, siyahı elementlərinin açarları olması haqqında xəbərdarlıq göstəriləcək. Elementlər siyahısı düzəltdikdə, xüsusi mətn atributu olan "key" (açar) atributunu daxil etməlisiniz. Gələcək bölmədə bu atributun əhəmiyyətindən danışacağıq.

Gəlin `numbers.map()`-in daxilində olan siyahı elementlərinə `key` atrubutunu təyin edib açar əskikliyini düzəldək.

```javascript{4}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/jrXYRR?editors=0011)

## Açarlar {#keys}

React-də açarlar ilə elementlərin dəyişdiyini, əlavə edildiyini və ya silindiyini müəyyənləşdirmək mümkündür. Massivdə olan elementlərə sabit identiklik verə bilmək üçün hər elementə açar verilməlidir:

```js{3}
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```

Açarı seçməyin ən yaxşı yolu, elementi siyahıda olan digər elementlərdən unikal şəkildə fəqrləndirən mətn seçmək. Adətən, məlumatda olan ID-lər açar kimi işlənilir:

```js{2}
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```

Əgər sizdə render olunan elementlər üçün sabit ID yoxdursa, son çarə kimi elementin massiv indeksini açar kimi istifadə edə bilərsiniz:

```js{2,3}
const todoItems = todos.map((todo, index) =>
  // Yalnız sabit ID olmadıqda indeskdən istifadə edin
  <li key={index}>
    {todo.text}
  </li>
);
```

Elementlərin sırası dəyişirsə, massiv indekslərini açar kimi işlətməyi tövsiyyə etmirik. Bu performansa ziyan vura və komponent state-ində problemlər yarada bilər. [İndeksi açar kimi işlədikdə yaranan problemlər haqqında dərin izahat üçün](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) Robin Pokorninin məqaləsini oxuyun. Əgər siyahı elementlərinə açıq formada açar təyin edilmədikdə, React massiv indekslərini açar kimi işlədəcək.

Əlavə məlumat üçün [açarların vacibliyi haqqında dərin izahatı](/docs/reconciliation.html#recursing-on-children) sənədini oxuya bilərsiniz.

### Açarlı Komponentlərin Çıxarılması {#extracting-components-with-keys}

Açarlar yalnız daxil olduğu massivin kontekstində məntiqlidir.

Məsələn, `ListItem` komponentini [çıxardıqda](/docs/components-and-props.html#extracting-components), açarları `ListItem` komponentlərində yerləşən `<li>` elementi əvəzinə `<ListItem />` elementlərinə təyin edin.

**Nümunə: Açarın Səhv İstifadəsi**

```javascript{4,5,14,15}
function ListItem(props) {
  const value = props.value;
  return (
    // Səhv! Burada açar təyin etmək lazım deyil:
    <li key={value.toString()}>
      {value}
    </li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Səhv! Açar burada təyin edilməlidir:
    <ListItem value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**Nümunə: Açarın Düzgün İstifadəsi**

```javascript{2,3,9,10}
function ListItem(props) {
  // Düzdür! Burada açar təyin etmək lazım deyil:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // Düzdür! Açar massivin daxilində təyin edilməlidir.
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/ZXeOGM?editors=0010)

`map()` çağırışının daxilində olan elementlərdə açarlarının olması yaxşı qaydadır.

### Qonşular Arasında olan Açarlar Unikal Olmalıdır {#keys-must-only-be-unique-among-siblings}

Massivdə olan açarlar qonşu elementlər arasında unikal olmalıdırlar. Lakin, bu açarlar bütün applikasiyada unikal olmamalıdırlar. Biz iki fərqli massivdə eyni açarları istifadə edə bilərik:

```js{2,5,11,12,19,21}
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Salam Dünya', content: 'React-i Öyrənməyə Xoş Gəlmisiniz!'},
  {id: 2, title: 'Yükləmə', content: 'npm ilə React-i ilə yükləyə bilərsiniz.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/NRZYGN?editors=0010)

Açarlar React üçün işarə kimi işlədilir. Açarlar komponentlərə göndərilmir. Əgər sizə açarda göndərilən dəyər komponentdə lazımdırsa, bu dəyəri fərqli ad ilə prop kimi göndərin:

```js{3,4}
const content = posts.map((post) =>
  <Post
    key={post.id}
    id={post.id}
    title={post.title} />
);
```

Yuxarıdaki nümunədə, `Post` komponenti `props.id`-ni oxuya bilir. Lakin, `props.key`-i oxuya bilmir.

### map() Funksiyasını JSX-ə daxil edin {#embedding-map-in-jsx}

Yuxarıdaki nümunələrdə, biz massivləri ayrı `listItems` dəyişəninə təyin edib, bu dəyişəni JSX-ə daxil edirdik:

```js{3-6}
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <ListItem key={number.toString()}
              value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}
```

JSX fiqur mötərizənin içərisində [hər bir ifadəni daxil etməyə](/docs/introducing-jsx.html#embedding-expressions-in-jsx) icazə verdiyindən biz `map()`-in nəticəsini eyni sətrdə JSX-ə daxil edə bilərik:

```js{5-8}
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
}
```

[**CodePen-də sınayın**](https://codepen.io/gaearon/pen/BLvYrB?editors=0010)

Bu stilin təmiz kod ilə nəticələnməsinə baxmayaraq, bu stili çox istifadə etmək ziyanlı ola bilər. JavaScript-də olduğu kimi, oxunuşu artırmaq üçün dəyəri dəyişəndə çıxarmaq etmək sizdən asılıdır. Əgər `map()` çağırışının gövdəsi çox iç-içədirsə, [komponenti çıxarmaq](/docs/components-and-props.html#extracting-components) yaxşı fikir ola bilər.

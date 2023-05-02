---
title: Yükləmək
---

<Intro>

React has been designed from the start for gradual adoption. Ehtiyacınız olan qədər az və ya çox React istifadə edə bilərsiniz. React-i yoxlamaq, HTML səhifəyə bəzi interaktivlik əlavə etmək, ya da ki kompleks React applikasiyaya başlamaq olsun   Whether you want to get a taste of React, add some interactivity to an HTML page, or start a complex React-powered app, this section will help you get started.

</Intro>

<YouWillLearn isChapter={true}>

* [React layihəyə necə başlamaq olar ?](/learn/start-a-new-react-project)
* [Mövcud bir layihəyə React-i necə əlavə etmək olar ?](/learn/add-react-to-an-existing-project)
* [Editor-u necə quraşdırmaq olar ?](/learn/editor-setup)
* ["React Developer Tools"-u necə yükləmək olar ?](/learn/react-developer-tools)

</YouWillLearn>

## React-i yoxla {/*try-react*/}

React ilə başlamaq üçün heç bir şey yükləməyinizə ehtiyac yoxdur. Bu sandbox-da yoxlaya bilərsiniz!

<Sandpack>

```js
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

export default function App() {
  return <Greeting name="world" />
}
```

</Sandpack>

You can edit it directly or open it in a new tab by pressing the "Fork" button in the upper right corner.

Most pages in the React documentation contain sandboxes like this. Outside of the React documentation, there are many online sandboxes that support React: for example, [CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), or [CodePen.](https://codepen.io/pen?&editors=0010&layout=left&prefill_data_id=3f4569d1-1b11-4bce-bd46-89090eed5ddb)

### Lokalda yoxlayın {/*try-react-locally*/}

Kompüterinizdə localda yoxlamaq üçün, [Bu HTML səhifəni yükləyin.](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html) Əvvəlcə editorunuzda açın sonra isə browserinizdə açın ardıcıl olaraq!

## Yeni React layihəyə başlayın {/*start-a-new-react-project*/}

Əgər bütün applikasyiyanı tamamilə React ilə kodlaşdırmaq istəyirsinizsə, [Yeni React layihəyə başlayın.](/learn/start-a-new-react-project)

## Mövcud layihənizə Reacti əlavə edin {/*add-react-to-an-existing-project*/}

Əgər mövcud tətbiqinizdə və ya saytınızda React istifadə etməyi sınamaq istəyirsinizsə, [React-i mövcud layihənizə əlavə edin.](/learn/add-react-to-an-existing-project)

## Növbəti addımlar {/*next-steps*/}

Hər gün rast gələcəyiniz ən mühüm React konseptlərinə bir tur üçün [Qısa Başlanğıc](/learn) təlimatlarına yönəlin.



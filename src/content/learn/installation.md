---
title: Yükləmək
---

<Intro>

React freymvorku tədrici adaptasiya fikri ilə dizayn olunub. Ehtiyacınız olan qədər az və ya çox React istifadə edə bilərsiniz. Bu hissə sizə React-i yoxlamaq, HTML səhifəyə bəzi interaktivlik əlavə etmək və s. kimi işlərdə yol göstərəcəkdir. Həmçinin kompleks React applikasiyaya başlamaq üçündə bu hissə sizə başlamağa kömək edəcəkdir.

</Intro>

<YouWillLearn isChapter={true}>

* [React layihəyə necə başlamaq olar?](/learn/start-a-new-react-project)
* [Mövcud bir layihəyə React-i necə əlavə etmək olar?](/learn/add-react-to-an-existing-project)
* [Editor-u necə quraşdırmaq olar?](/learn/editor-setup)
* ["React Developer Tools"-u necə yükləmək olar?](/learn/react-developer-tools)

</YouWillLearn>

## React-i yoxla {/*try-react*/}

React ilə başlamaq üçün heç bir şey yükləməyinizə ehtiyac yoxdur. Bu sandbox-da yoxlaya bilərsiniz!

<Sandpack>

```js
function Greeting({ad }) {
  return <h1>Salam, {ad}</h1>;
}

export default function App() {
  return <Greeting ad="dünya" />
}
```

</Sandpack>

Siz onun birbaşa üzərində işləyə bilərsiniz və ya sağ üst küncdən "Fork" düyməsini klikləyərək yeni bir tab-da aça bilərsiniz.

React dokumentasiyasında əks olunan çox səhifələrdə belə sandbokslar mövcuddur. React dokumentasiyasının xaricində, bir çox sandboks React-i dəstəkləyir: məsələn,
[CodeSandbox](https://codesandbox.io/s/new), [StackBlitz](https://stackblitz.com/fork/react), yaxud [CodePen.](https://codepen.io/pen?&editors=0010&layout=left&prefill_data_id=3f4569d1-1b11-4bce-bd46-89090eed5ddb)

### Lokalda yoxlayın {/*try-react-locally*/}

Kompüterinizdə lokalda yoxlamaq üçün, [Bu HTML səhifəni yükləyin.](https://gist.githubusercontent.com/gaearon/0275b1e1518599bbeafcde4722e79ed1/raw/db72dcbf3384ee1708c4a07d3be79860db04bff0/example.html) Ardıcıl olaraq əvvəlcə editorunuzda, sonra isə browserinizdə açın!

## Yeni React layihəyə başlayın {/*start-a-new-react-project*/}

Əgər bütün applikasyiyanı tamamilə React ilə kodlaşdırmaq istəyirsinizsə, [Yeni React layihəyə başlayın.](/learn/start-a-new-react-project)

## Mövcud layihənizə React-i əlavə edin {/*add-react-to-an-existing-project*/}

Əgər mövcud tətbiqinizdə və ya saytınızda React istifadə etməyi sınamaq istəyirsinizsə, [React-i mövcud layihənizə əlavə edin.](/learn/add-react-to-an-existing-project)

## Növbəti addımlar {/*next-steps*/}

Hər gün rast gələcəyiniz ən mühüm React konseptlərinə baxmaq üçün [Qısa Başlanğıc](/learn) təlimatlarına yönəlin.



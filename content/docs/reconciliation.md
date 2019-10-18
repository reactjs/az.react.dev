---
id: reconciliation
title: Rekonsilyasiya
permalink: docs/reconciliation.html
---

Hər komponent yeniliyində dəyişiklər haqqda fikirləşməmək üçün React deklarativ API təmin edir. Bu API applikasiyaların yazılmasını asanlaşdırır. Lakin, React-in daxilində nə baş verdiyi aydın olmaya bilər. Bu məqalədə, komponent yeniliklərinin proqnozlaşdırıla bilən olması və applikasiyalarda tez işləməsi üçün React-in "fərqlilik" (diffing) alqoritmində etdiyimiz seçimləri izah edəcəyik.

## Motivasiya {#motivation}

React-də, hər hansı bir zamanda `render()` funksiyası React elementlər ağacı yaradır. Sonrakı state və ya props yeniliklərində isə `render()` funksiyası fərqli React elementlər ağacı qaytarır. Sonra, React, UI-ı yeni ağaca uyğun etmək üçün səmərəli yeniləmə yolu axtarır.

Ən az əməliyyat ilə bir ağacı digər ağaca çevirmək üçün bir neçə algoritm var. Lakin [ən yaxşı algoritmin](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf) mürəkkəbliyi O(n<sup>3</sup>)-dur ("n" ağacda olan elementlərin sayıdır).

Bu alqoritmi React-də işlətdikdə 1000 elementi render etmək üçün bir milyard müqayisə əməliyyatı etməliyik. Bu çox bahalı əməliyyatdır. Bu səbəbdən, React, iki fərziyyə əsasında evristik O(n) alqoritmi tətbiq edir:

1. İki fərqli tipli element fərqli ağac yaradır.
2. Fərqli renderlər zamanı uşaq elementlərin stabil qalması üçün proqramçı `key` propundan istifadə edə bilər.

Bu fərziyyələr bütün praktiki ssenarilər üçün etibarlıdır.

## Fərqlilik Alqoritmi {#the-diffing-algorithm}

İki komponent ağacı müqayisə edildikdə ilk öncə ana elementlər müqayisə olunur. Bu davranış, ana elementlərin tipindən asılı olaraq fərqlənir.

### Fəqrli Tiplərin Elementləri {#elements-of-different-types}

Ana elementlərin fərqli tipi olduqda React, köhnə ağacı sökərək sıfırdan yeni ağac düzəldir. Element `<a>`-dan `<img>`-ə, `<Article>`-dan `<Comment>`-ə və ya `<Button>`-dan `<div>`-ə dəyişdikdə tam yenidən düzəlmə baş verəcək.

Ağac dağıldıqda bütün köhnə DOM nodlar dağılır. Komponent instansiyalarının `componentWillUnmount()` funksiyaları çağrılır. Yeni ağac düzəldikdə DOM-a yeni DOM nodları əlavə olunur. Komponent instansiyalarında `componentWillMount()`, sonra `componentDidMount()` funksiyası çağrılır. Köhnə ağac ilə bağlı bütün state-lər silinir.

Ana komponentin daxilində olan bütün komponentlər də unmount olunur və dağıdılır. Məsələn, aşağıdakı kodu fərqləndirdikdə:

```xml
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```

Köhnə `Counter` dağıdılır və yeni element mount olunur.

### Eyni Tipli DOM Elementləri {#dom-elements-of-the-same-type}

Eyni tipli React DOM elementlərini müqayisə etdikdə hər iki elementin DOM nodları saxlanılaraq yalnız DOM atributları yenilənir. Məsələn:

```xml
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```

Bu iki element müqayisə edildikdə yalnız DOM nodunun `className` atributu dəyişilir.

`style` atributunu dəyişdikdə yalnız dəyişən stil parametrləri yenilənir. Məsələn:

```xml
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />
```

Bu iki elementi fərqləndirdikdə yalnız `color` stili dəyişilir. `fontWeight` stili eyni qalır.

DOM nodu fərqləndirildikdən sonra eyni əməliyyatlar uşaq elementlərdə tətbiq olunur.

### Eyni Tipli Komponent Elementləri {#component-elements-of-the-same-type}

Komponent yeniləndikdə komponent instansiyası eyni qalaraq renderlər arası state saxlanılır. Komponentin yeni elementə uyğunlaşması üçün komponent instansiyasının propları yenilənir, və komponent instansiyasından `componentWillReceiveProps()` və `componentWillUpdate()` funksiyaları çağrılır.

Sonra, `render()` funksiyası çağrılaraq fərqlənmə alqoritmi əvvəlki və sonrakı nəticələri fərqləndirir.

### Uşaqların Fərqlənməsi {#recursing-on-children}

Normalda, DOM nodun uşaqlarını fərqləndirdikdə React, hər iki uşaq siyahısının üzərindən tsikl edərək fərqlilik olduqda mutasiya əməliyyatını yaradır.

Məsələn, uşaqların sonuna yeni element əlavə edildikdə ağacın yenisinə çevrilməsi səmərəli işləyir:

```xml
<ul>
  <li>birinci</li>
  <li>ikinci</li>
</ul>

<ul>
  <li>birinci</li>
  <li>ikinci</li>
  <li>üçüncü</li>
</ul>
```

React, `<li>birinci</li>` və `<li>ikinci</li>` ağacları uyğunlaşdırdıqdan sonra `<li>üçüncü</li>` ağacı əlavə edəcək.

Tətbiq sadə olduqda əvvələ yeni element əlavə edildikdə performans pis olacaq. Məsələn, aşağıdakı ağacı yenisinə çevirmək səmərəli işləmir:

```xml
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

`<li>Duke</li>` və `<li>Villanova</li>` ağaclarını saxlamaq əvəzinə React bütün uşaqları mutasiya edəcək. Bu səmərəsizlik problem yarada bilər.

### Açarlar {#keys}

Bu problemi həll etmək üçün React-də `key` atributu var. Uşaqlarda açarlar olduqda React, orijinal ağacı yeni ağac ilə uyğunlaşdırmaq üçün açarlardan istifadə edir. Məsələn, yuxarıdakı pis işləyən nümunəyə `key` əlavə edərək çevirməni səmərəli etmək mümkündür:

```xml
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

İndi, React `'2014'` açarlı elementin yeni olduğunu `'2015'` və `'2016'` açarlı elementlərin isə yerinin dəyişdiyini bilir.

Praktikada, açarın tapılması çətin deyil. Göstərdiyiniz elementin unikal ID-si ola bilər. Yəni, açar gələn məlumatda artıq ola bilər:

```js
<li key={item.id}>{item.name}</li>
```

Unikal ID olmadıqda modelə yeni ID parametri əlavə edə bilər və ya kontentin hissələrini həş edərək açar yarada bilərsiniz. Açarlar yalnız qonşu elementlərdə unikal olmalıdır. Bütün applikasiyada unikal olmamalıdır.

Ən son variantda massiv elementin indeksini açar kimi göndərə bilərsiniz. Elementlərin yeri dəyişmədikdə indekslər yaxşı işləyəcək. Lakin, yer dəyişmələri yavaş olacaq.

İndekslər açar kimi işlədildikdə yer dəyişmələri komponent vəziyyətində problemlər yarada bilər. Komponent instansiyaları açar əsasında yenilənərək yenidən işlədilir. İndeks açar kimi işlədildikdə elementin yerini dəyişməsi komponenti yeniləyəyir. Nəticədə, kontrolsuz anket sahələri kimi dəyərlər üçün komponent vəziyyəti qarışa bilər və istənilməz formada yenilənə bilər.

İndeksləri açar kimi işlətdikdə yaranan problemlər üçün [CodePen nümunəsinə](codepen://reconciliation/index-used-as-key) baxın. [Bu nümunədə isə](codepen://reconciliation/no-index-used-as-key) indekslər açar kimi işlədilmədikdə yer dəyişmələr, çeşidləmələr, və əvvələ əlavə edilmə problemlərinin həlli göstərilir.

## Kompromislər {#tradeoffs}

Rekonsilyasiya alqoritminin tətbiq detalı olduğunu unutmayın. React hər əməliyyatda bütün applikasiyanı render edə bilər. Sonda, nəticə eyni qalacaq. Bu kontekstdə yenidən render etmə bütün komponentlərin `render` funksiyasının çağrılması deməkdir. Bu demək deyil ki, React, komponentləri unmount edib yenidən mount edəcək. Dəyişikliklər, əvvəlki bölmələrdə göstərilən qaydalar əsasında tətbiq ediləcək.

Biz hər zaman çox işlənən ssenariləri tezləşdirmək üçün heuristikanı yeniləyirik. Cari tətbiqdə ağacın qonşular arasında yerini dəyişdiyini bilmək mümkündür. Lakin, ağacın başqa yerə köçürüldüyünü bilmirik. Bu halda, alqoritm bütün ağacı yenidən render edəcək.

Rekonsilyasiyanın heuristikalardan asılı olduğundan fərziyyələr yerinə yetirilmədikdə performans pisləşəcək.

1. Alqoritm fərqli komponent tiplərinin ağaclarını uyğunlaşdırmayacaq. Eyni nəticəli iki komponenti tez-tez əvəz edirsinizsə, bu komponentləri eyni tipli etmək daha faydalı ola bilər. Praktikada, biz bunun problem olmadığını görürük.

2. Açarlar stabil, proqnozlaşdırıla bilən və unikal olmalıdır. Stabil olmayan açarlar (məsələn `Math.random()` ilə yaranan) komponent intansiyalarının və DOM nodların yenidən yaranmasına səbəb olacaq. Bu, performansa ziyan vurmasına və uşaqların komponent vəziyyətini itirməsinə səbəb ola bilər.

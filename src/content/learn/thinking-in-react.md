---
title: Thinking in React
---

<Intro>

React, applikasiya dizayni ve quruluşuna baxışınızı dəyişə bilər. React ilə istifadəçi interfeysləri quraşdırdıqda, ilk öncə interfeysi *komponent* adlı kiçik hissələrə ayrılırsınız. Sonra isə, hər komponentin vizual vəziyyətini təsvir edirsiniz. Ən sonda, məlumatın komponentlər arasından axması üçün, komponentləri bir-birinə qoşursunuz. Bu dərslikdə, React ilə axtarışı olan məhsul məlumat cədvəli düzəldəcəyik.

</Intro>

## Mokap ilə başlayaq {/*start-with-the-mockup*/}

Fikirləşinki bizdə artıq həm JSON APİ var, həm də dizaynerdən mokap var.

JSON APİ-dan qaytarılan məlumat aşağıdakı formadadır:

```json
[
  { category: "Meyvələr", price: "1 AZN", stocked: true, name: "Alma" }, { category: "Meyvələr", price: "1 AZN", stocked: true, name: "Əjdaha meyvəsi" },
  { category: "Meyvələr", price: "2 AZN", stocked: false, name: "Marakuya" },
  { category: "Tərəvəzlər", price: "2 AZN", stocked: true, name: "İspanaq" },
  { category: "Tərəvəzlər", price: "4 AZN", stocked: false, name: "Balqabaq" },
  { category: "Tərəvəzlər", price: "1 AZN", stocked: true, name: "Noxud" }
]
```

Mokap aşağıdakı şəkildə göstərilib.

<img src="/images/docs/s_thinking-in-react_ui.png" width="300" style={{margin: '0 auto'}} />

Normalda React ilə istifadəçi interfeysi yaratmaq üçün aşağıdakı beş addım təqib edilir.

## Addım 1: İnterfeysi komponent iyerarxiyasına parçalayın {/*step-1-break-the-ui-into-a-component-hierarchy*/}

Mokapda olan bütün komponent və subkomponentlərin ətrafında qutular çəkərək bu qutuları adlandırın. Əgər dizayner ilə işləyirsinizsə, dizaynerdən tövsiyyə alın! Çünki, dizayner artıq bu komponentləri dizayn proqramında adlandırmış ola bilər. 

İxtisasınızdan asılı olaraq, dizaynı fərqli formada komponentlərə ayıra bilərsiniz:

* **Programlaşdırma**--Yeni funksiya və ya obyekti yaratdıqda işlətdiyiniz eyni texnikalardan istifadə edin. Bu texnikalardan biri [tək sorumluluq ilkəsidir](https://en.wikipedia.org/wiki/Single_responsibility_principle) -- bir komponent yalnız bir iş ilə məşqul olmalıdır. Əgər komponent böyüyürsə, bu komponenti kiçik subkomponentlərə ayırmaq lazımdır. 
* **CSS**--CSS klas selektorlarının nə üçün düzəldildiyini nəzərə alın. (However, components are a bit less granular.)
* **Dizayn**--Dizayn təbəqələrini nəcür təşkil edildiyini nəzərə alın.

Yaxşı structurda olan JSON-un komponent strukturuna təbii uyuşdurulduğunu görə bilərsiniz. Çünki, normalda Uİ və məlumat modellərinin informasiya arxitekturu eynidir (yəni eyni formadadır). İstifadəçi interfeysini məlumat modelinin bir hissəsinə uyğunlaşdırılan komponentlərə ayılrın.

Bu ekranda beş komponent var:

<FullWidth>

<CodeDiagram flip>

<img src="/images/docs/s_thinking-in-react_ui_outline.png" width="500" style={{margin: '0 auto'}} />

1. `FilterableProductTable` (boz) Bütün applikasiyanı göstərir.
2. `SearchBar` (mavi) İstifadəçinin daxil etdiyi mətn qutusunu göstərir.
3. `ProductTable` (lavanda) Sihayını göstərir və istifadəçinin daxil etdiyi axtarış əsasında filtr edir.
4. `ProductCategoryRow` (yaşıl) hər kateqoriya üçün başlıq göstərir.
5. `ProductRow`	(sarı) hər məhsul üçün sıranı göstərir.

</CodeDiagram>

</FullWidth>

`ProductTable` (lavanda) komponentində cədvəlin başlığı (Ad və Qiymət başlıqlarını ehtiva edən) ayrıca komponent deyil. Bunun ayrı komponent olub-olmaması sizin istəyinizdən asılıdır. Bu nümunədə, başlığın `ProductTable` komponentinin siyahısında olduğundan biz bunu komponentə ayırmırıq. Amma, əgər başlıq böyüyərək mürəkkəbləşsə (məsələn, çeşidləmə əlavə olunsa), bunu `ProductTableHeader` adlı komponentə ayırmaq olar.

Mokapdakı komponentləri müəyyən etdikdən sonra, bu komponetləri iyerarxiyaya ayırın. Diger komponetin daxilinda olan komponentləri iyerarxiyada uşaq komponent kimi göstərilir:

* `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
        * `ProductCategoryRow`
        * `ProductRow`

## Addım 2: React ilə mokapın statik versiyasını düzəldin {/*step-2-build-a-static-version-in-react*/}

İyerarxiyamızı müəyyən etdikdən sonra, gəlin aplikasiyamızı düzəldək. Ən asan yol kimi, biz interaktivlik olmadan, məlumat modelini Uİ ilə render edəcəyik! Aplikasiyanın statik versiyasını yaradıb, interaktivliyi sonradan əlavə etmək adətən iş prosesini asanlaşdırır. Statik versiyanın düzəldilməsi fikirləşmək tələb etmir, amma interaktivlik əlavə etmək çoxlu fikirləşmək tələb edir. 

Məlumat modelini render edən aplikasiyanın statik versiyasını düzəltmək üçün digər [komponentlərdən](/learn/your-first-component) istifadə edən və məlumatı [proplar](/learn/passing-props-to-a-component) ilə göndərən komponentlər yaradın. Məlumatı valideyn komponentdən uşaq komponentə öturmək üçün proplardan istifadə olunur. (Əgər [state-dən](/learn/state-a-components-memory) anlayışınız varsa, statik versiya üçün state-dən istifadə etməyin. State, yalnız interaktivlik, yəni məlumatın dəyişməsi üçün işlədilir. Biz aplikssiyanın statik versiyasını düzəldirik deyə, bizə state-dən istifadə etmək lazım deyil.)

Siz komponentləri iyerarxiyada yuxarıda olan komponentlərdən (məsələn `FilterProductTable`) və ya iyerarxiyada dərində olan komponentlərdən (məsələn `ProductRow`) başlayaraq düzəldə bilərsiniz. Sadə nümumələrdə komponentləri yuxarıdan aşağı, böyük layihələrdə isə aşağıdan yuxarı düzəltmək asandır.

<Sandpack>

```jsx src/App.js
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Ad</th>
          <th>Qiymət</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Axtar..." />
      <label>
        <input type="checkbox" />
        {' '}
        Yalnız inventarda olan məhsulları göstər
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {category: "Meyvələr", price: "1 AZN", stocked: true, name: "Alma"},
  {category: "Meyvələr", price: "1 AZN", stocked: true, name: "Əjdaha meyvəsi"},
  {category: "Meyvələr", price: "1 AZN", stocked: false, name: "Marakuya"},
  {category: "Tərəvəzlər", price: "2 AZN", stocked: true, name: "İspanaq"},
  {category: "Tərəvəzlər", price: "4 AZN", stocked: false, name: "Balqabaq"},
  {category: "Tərəvəzlər", price: "1 AZN", stocked: true, name: "Noxud"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 10px;
}
td {
  padding: 2px;
  padding-right: 40px;
}
```

</Sandpack>

(Əgər bu kod ürküdücü görünürsə, [Tez başlama](/learn/) səhifəsindən başlayın!)

Komponentləri düzəldikdən sonra, sizdə məlumat modelini render edən və çoxlu istifadə oluna bilən komponentləriniz olacaq. Indiki aplikasiyanın statik olduğundan, bu komponentlər yalnız JSX qaytarırlar. İyerarxiyada ən yuxarıda olan komponent (`FilterableProductTable`) məlumat modelini prop kimi qəbuil edir. Məlumatın iyerarxiyada yuxarıda olan komponentlərdən dərində olan komponentlərə göndərildiyindən bu texnikaya _bir tərəfli məlumat axını_ kimi istinad edilir.

<Pitfall>

Buraya kimi siz state dəyərlərindən istifadə etməməlisiniz. Biz buna sonrakı addımlarda baxacağıq!

</Pitfall>

## Addım 3: Uİ vəziyyətinin minimal amma tam təsvirini tapın {/*step-3-find-the-minimal-but-complete-representation-of-ui-state*/}

İstifadəçi interfeysini interaktiv etmək üçün, istifadəçilərə məlumat modelini dəyişməyə imkan verməliyik. Bunun üçün *state-dən* istifadə edəcəyik.

Aplikasiyanın, dəyişən məlumatın minimum dəstini yadda saxlamasına state kimi istinad edin. State-i quraşdırdıqda ən vacib prinsiplərdən biri [DRY (Don't Repeat Yourself).](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) prinsipidir. Aplikasiyanın ən minimum lazım olan state-ini müəyyən edib qalan bütün dəyərləri yerində hesablayın. Məsələn, alış-veriş siyahısını düzəltdikdə, siyahı üçün maddələr massivini state-də saxlaya bilərsiniz. Amma, sihayıda olan maddələrin sayını bilmək üçün bu sayı state-də saxlamaq əvəzinə massivin uzunluğunu oxuyun.

Gəlin nümunəmizdə olan bütün məlumatlara baxaq:

1. Məhsulların orijinal siyahısı
2. İstifadəçinin daxil etdiyi axtarış mətni
3. Çekboksun dəyəri
4. Filtr olunmuş məhsulların siyahısı

Bu məlumatlardan hansı state-dir? State olmayanları müəyyən edin:

* Dəyər zaman ilə dəyişir? Əgər **dəyişmirsə** bu state deyil.
* Dəyər **valideyndən ötürülür?** Əgər ötürülürsə, bu state deyil.
* Dəyəri komponentdə olan mövcud state və proplardan **hesablamaq mümkündür?** Əgər mümkündürsə, bu *qəti* olaraq state deyil!

Qalan bütün məlumatlar state-dir.

Gəlin məlumatlara yenidən baxaq:

1. Məhsulların orijinal siyahısı **proplar ilə qəbul olunduğundan state deyil** 
2. Axtarış mətni istifadəçi tərəfindən dəyişdirildiyi və digər məlumatlardan hesablana bilmədiyi üçün state-dir.
3. Çekboksun dəyəri istifadəçi tərəfindən dəyişdirildiyi və digər məlumatlardan hesablana bilmədiyi üçün state-dir.
4. Filtr olunmuş məhsulların siyahısı, orijinal məhsulların siyahısını axtarış mətni və çekboks dəyəri əsasında **filtr olunaduğundan state deyil**

Burada yalnız axtarış mətni və çekboksun dəyəri state-dir! Əla!

<DeepDive>

#### Proplar və ya State {/*props-vs-state*/}

React-də iki tip məlumat "modeli" var: proplar və state. Bu anlayışlar bir-birindən çox fərqlənirlər:

* [**Proplar** funksiyaya ötürülən arqumentlər kimidir](/learn/passing-props-to-a-component). Proplar ilə məlumatı valideyn komponentdən uşağa göndərək komponentin görünüşünü dəyişir. Məsələn, `Form` komponenti `Button` komponentinə `color` propu göndərə bilər.
* [**State** isə komponentin yaddaşı kimidir.](/learn/state-a-components-memory) State, komponentdə bəzi məlumatları saxlamağa və interaksiya əsasında bu məlumatı dəyişməyə imkan yaradır. Məsələn, `Button` komponenti `isHovered` state-i saxlaya bilər.

Proplar ilə state-in çox fərqli olmasına baxmayaraq adətən birlikdə işləyirlər. Valideyn komponenti state-də dəyişə bilən məlumatı saxlayaraq uşaq komponentlərə bu state-in dəyərini proplar ilə göndərə bilər. İlk oxunuşda bu fərq tam aydın olmaya bilər amma zaman və praktika ilə bu fərq aydın olacaq!

</DeepDive>

## Addım 4: State-in harada saxlandığını müəyyən edin {/*step-4-identify-where-your-state-should-live*/}

Aplikasiyanın minimal state məlumatını müəyyən etdikdən sonra, biz bu state-i dəyişə bilən və ya *sahibi* olan komponenti müəyyən etməliyik. Yadınızdan çıxarmayınki, React, _bir tərəfli məlumat axınından_ istifadə edərək məlumatları həmişə valideyn komponentdən uşaq komponentinə göndərir. Hansı komponentin hansı state-in sahibi olduğu ilk baxışdan aydın olmaya bilər. Əgər bu anlayış sizin üçün yenidirsə, state-in sahibini müəyyənləşdirmək çətin ola bilər. Amma aşağıdakı addımlardan istifadə edərək bunu müəyyənləşdirə bilərsiniz!

Aplikasiyada olan state-in hər parçası üçün:

1. Bu state əsasında render edən *bütün* komponentləri müəyyən edin.
2. Bu komponentlərə ortaq olan ən yaxın valideyn komponentini tapın. Bu valideyn, müəyyən olunan bütün komponentlərdən yuxarıdır.
3. State-in harada saxlandığına qərar verin:
    1. Adətən, state-i ortaq valideyndə saxlaya bilərsiniz.
    2. State-i ortaq valideyndən yuxarıda olan komponentlərdən birindədə saxlamaq olar.
    3. Əgər state-i saxlamaq üçün məntiqli komponent tapa bilmirsinizsə, state-i saxlayan yeni komponent yaradıb bu komponenti ortaq valideynən yuxarıda elavə edin.

Biz, keçən addımda iki state müəyyən etdik: axtarış mətni və çekboksun dəyəri. Bu nümunədə, bu iki state-in həmişə birlikdə olduğundan bu state-ləri eyni yerdə saxlayacağıq.

Gəlin əvvəlki strategiyadan istifadə edərək state-in saxlanacağı yeri tapaq:

<<<<<<< HEAD
1. **State-dən istifadə edən komponentləri müəyyən edək:**
    * `ProductTable` komponenti state əsasında (axtarış mətni və çekboks dəyəri) məhsulların siyahısını filtr etməlidir.
    * `SearchBar` komponenti state-i göstərməlidir (axtarış mətni və çekboks dəyəri)
2. **Bu komponentlərin ortaq valideynini tapın:** Bu komponentlərin paylaşdığı valideyn `FilterableProductTable` komponentidir.
3. **State-in harada saxlanacağına qərar verin**: Biz filtr mətnini və çekboks dəyərini `FilterableProductTable` komponentində saxlayacağıq.
=======
1. **Identify components that use state:**
    * `ProductTable` needs to filter the product list based on that state (search text and checkbox value). 
    * `SearchBar` needs to display that state (search text and checkbox value).
2. **Find their common parent:** The first parent component both components share is `FilterableProductTable`.
3. **Decide where the state lives**: We'll keep the filter text and checked state values in `FilterableProductTable`.
>>>>>>> 9467bc58868e66c53ca9385c8531dcf7b02178c2

State dəyərləri `FilterableProductTable` komponentində saxlanacaq. 

Komponentə state-i [`useState()` Hooku](/reference/react/useState) ilə əlavə edin. Hooklar, React ilə danışmaq üçün quraşdırılmış xüsusi funksiyalardır. `FilterableProductTable` komponentinin ən yuxarısında iki ədə state dəyişəni yaradıb ilkin dəyərini müəyyən edin:

```js
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);  
```

Then, pass `filterText` and `inStockOnly` to `ProductTable` and `SearchBar` as props:

```js
<div>
  <SearchBar 
    filterText={filterText} 
    inStockOnly={inStockOnly} />
  <ProductTable 
    products={products}
    filterText={filterText}
    inStockOnly={inStockOnly} />
</div>
```

Aplikasiyanın necə işləyəcəyini artıq görməyə başlayacaqsınız. Aşağıdakı sandbox kodunda `filterText` state-inin ilkin dəyərini `useState('')`-dan `useState('meyvə')`-a dəyişərək həm axtarış anket xanasının həmdə cədvəlin dəyişdiyini görəcəksiniz:

<Sandpack>

```jsx src/App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Ad</th>
          <th>Qiymət</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Axtar..."/>
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} />
        {' '}
        Yalnız inventarda olan məhsulları göstər
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Meyvələr", price: "1 AZN", stocked: true, name: "Alma"},
  {category: "Meyvələr", price: "1 AZN", stocked: true, name: "Əjdaha meyvəsi"},
  {category: "Meyvələr", price: "1 AZN", stocked: false, name: "Marakuya"},
  {category: "Tərəvəzlər", price: "2 AZN", stocked: true, name: "İspanaq"},
  {category: "Tərəvəzlər", price: "4 AZN", stocked: false, name: "Balqabaq"},
  {category: "Tərəvəzlər", price: "1 AZN", stocked: true, name: "Noxud"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding-top: 5px;
}
td {
  padding: 2px;
}
```

</Sandpack>

Hələ ki, anketi dəyişmək mümkün deyil. Dəyişmənin işləməməsinin səbəbi sandbox-dakı konsol xətasında göstərilib:

<ConsoleBlock level="error">

You provided a \`value\` prop to a form field without an \`onChange\` handler. This will render a read-only field.

Siz anket xanasına \`onChange\` işləyicisi təmin etmədən \`value\` propu təyin etmisiniz. Bu, yalnız oxuna bilən xana render edəcək.

</ConsoleBlock>

Yuxarıdakı sandbox-da, `ProductTable` və `SearchBar` komponentləri `filterText` və `inStockOnly` proplarını oxuyaraq cədvəli, anket xanasını, və çekboksu render edirlər. Məsələn, `SearchBar` komponenti anket xanasına dəyəri aşağıdakı formada ötürür:

```js {1,6}
function SearchBar({ filterText, inStockOnly }) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="Search..."/>
```

Amma, biz istifadəçinin mətn daxil etmək kimi əməliyyatlarına cavab vermək üçün kod yazmamışıq. Sonuncu addımda biz bunu tətbiq edəcəyik.


## Addım 5: Tərs məlumat axını əlavə et {/*step-5-add-inverse-data-flow*/}

Hal-hazırda aplikasiya, proplar və state-i iyerarxiyada yuxarıdan aşağı göndərərək düzgün render edilir. İstifadəçi əməliyyatı esasında state-i dəyişmək üçün isə biz məlumatı əks istiqamətdə göndərməliyik: iyerarxiyada dərində olan anket komponentləri `FilterableProductTable` komponentində olan state-i yeniləməlidir.

React-də bu məlumat axınının xüsusi tətbiq olunmalıdır. Yuxarıdakı nümunədə axtarıq xanasına mətn daxil etdikdə və ya çekboksu aktivləşdirdikdə React-in bizim əməlliyatlarımızı saymamasını görəcəksiniz. Bu qəsdən belədir. `<input value={filterText} />` yazdıqda, biz `input` elementinin `value` propunun həmişə `FilterableProductTable` komponentindən gələn `filterText` state-ə bərabər olduğunu bildiririk. `filterText` state-inin dəyəri dəyişmədiyindən, anket xanası heç vaxt dəyişmir.

Biz istəyirikki, istifadəçi anketə dəyişiklik etdikdə state-i bu dəyişiklikləri əks etdirməsi üçün yeniləməliyik. Bu state-in `FilterableProductTable` komponentində saxlandığından, `setFilterText` və `setInStockOnly` funksiyalarını yalnız bu komponent çağıra bilər. `SearchBar` komponentindən `FilterableProductTable` komponentinin state-ini yeniləmək üçün, biz bu state yeniləyən funksiyaları `SearchBar` komponentinə göndərməliyik:

```js {2,3,10,11}
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
```

`SearchBar` komponentində `onChange` hadisə işləyicisi əlavə edərək valideyn komponentin state-ini dəyişəcəyik:

```js {4,5,13,19}
function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Axtar..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
```

İndi bizim aplikasiyamız tam işləyir!

<Sandpack>

```jsx src/App.js
import { useState } from 'react';

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly} 
        onFilterTextChange={setFilterText} 
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Ad</th>
          <th>Qiymət</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} placeholder="Search..." 
        onChange={(e) => onFilterTextChange(e.target.value)} />
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        Yalnız inventarda olan məhsulları göstər
      </label>
    </form>
  );
}

const PRODUCTS = [
  {category: "Meyvələr", price: "1 AZN", stocked: true, name: "Alma"},
  {category: "Meyvələr", price: "1 AZN", stocked: true, name: "Əjdaha meyvəsi"},
  {category: "Meyvələr", price: "1 AZN", stocked: false, name: "Marakuya"},
  {category: "Tərəvəzlər", price: "2 AZN", stocked: true, name: "İspanaq"},
  {category: "Tərəvəzlər", price: "4 AZN", stocked: false, name: "Balqabaq"},
  {category: "Tərəvəzlər", price: "1 AZN", stocked: true, name: "Noxud"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
```

```css
body {
  padding: 5px
}
label {
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
}
th {
  padding: 4px;
}
td {
  padding: 2px;
}
```

</Sandpack>

Hadisələri işlətmək və state-i yeniləmək haqqında daha çox məlumat almaq üçün [İnteraksivlik əlavə et](/learn/adding-interactivity) bölməsinə baxın.

## Buradan hara getmək olar {/*where-to-go-from-here*/}

Bu, React ilə komponent və aplikasiyaları düzətmək üçün necə fikirləmək lazım olması ilə bağlı qısa giriş idi. Siz indi bu dərslik ilə [yeni React layihəsi başlada bilər](/learn/installation) və ya [sintaksis haqqında daha ətraflı məlumat ala bilərsiniz](/learn/describing-the-ui).

---
id: thinking-in-react
title: React ilə Düşünmək
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

Bizim fikrimizcə böyük və tez işləyən Javascript Veb applikasiyaları yazmaq üçün React ən yaxşı yollardan biridir. React Facebook-da və Instagram-da çox yaxşı scale edir.

React-in ən yaxşı hissələrindən biri applikasiyanı yaza-yaza sizi xüsusi formada fikirləşməyə məcbur etməsidir. Bu sənəddə, React-dən istifadə edərək axtarıla bilən məhsulların məlumat cədvəlini yaratmaq üçün düşüncə prosesindən danışacağıq.

## Mok ilə Başlamayın {#start-with-a-mock}

Fikirləşək ki, bizdə JSON API və dizaynerin verdiyi mokap. Mokap aşağıdaki şəkildə göstərilib:

![Mokap](../images/blog/thinking-in-react-mock.png)

JSON API aşağıdaki formada məlumat qaytarır:

```
[
  {category: "İdman Əşyaları", price: "49.99 AZN", stocked: true, name: "Futbol"},
  {category: "İdman Əşyaları", price: "9.99 AZN", stocked: true, name: "Beysbol"},
  {category: "İdman Əşyaları", price: "29.99 AZN", stocked: false, name: "Basketbol"},
  {category: "Electronika", price: "99.99 AZN", stocked: true, name: "iPod Touch"},
  {category: "Electronika", price: "399.99 AZN", stocked: false, name: "iPhone 5"},
  {category: "Electronika", price: "199.99 AZN", stocked: true, name: "Nexus 7"}
];
```

## Addım 1: UI-ı Komponent İyerarxiyasına Parçalayın {#step-1-break-the-ui-into-a-component-hierarchy}

İlk öncə, mokda olan hər komponentin (və subkomponentin) ətrafında kvadratlar çəkib, bu kvadratları adlandırın. Əgər dizayner ilə işləyirsinizsə, o bu hissəni artıq düzəltmiş ola bilər. Dizayneriniz ilə danışın! Onun Photoshop-da adlandırdığı   layer-lər sizin React komponentləriniz ola bilər!

UI bölməsinin komponent olduğunu necə müəyyənləşdiririk? Yeni obyekt və ya funksiya üçün işlətdiyiniz texnikadan istifadə edin. Bu texnikalardan biri [vahid məsuliyyət prinsipidir](https://en.wikipedia.org/wiki/Single_responsibility_principle). Bu prinsip deyir ki, ideal olaraq komponent yalnız bir iş ilə məşqul olmalıdır. Əgər komponent boyüyürsə, bu komponent daha kiçik komponentlərə parçalanmalıdır.

Bir çox zaman istifadəçiyə JSON məlumatı göndərildiyindən, model düzgün qurulubsa, UI (və nəticədə komponent strukturu) bu modelə rahat map ola biləcək. Bunun səbəbi UI və məlumat modelinin eyni *informasiya arxitekturasından istifadə etməsidir*. Komponentləri məlumat modelinin hissələrinə uyğunlaşdırmaq fikri ilə UI-ı komponentlərə parçalayın.

![Komponent sxemi](../images/blog/thinking-in-react-components.png)

Bu sxemdə, applikasiyamızın beş komponentdən ibarət olduğunu görəcəksiniz. Hər komponentin təmsil etdiyi məlumatı kursiv ilə yazmışıq.

  1. **`FilterableProductTable` (narıncı):** bütün nümunə üçün konteynerdir
  2. **`SearchBar` (mavi):** *istifadəçi daxil etməsini* qəbul edir
  3. **`ProductTable` (yaşıl):** *istifadəçi daxil etməsi* əsasında *məlumat kolleksiyasını* göstərir və filtr edir
  4. **`ProductCategoryRow` (firuzə):** hər *kateqoriya* üçün başlıq göstərir
  5. **`ProductRow` (qırmızı):** hər *məhsul* üçün sıranı göstərir

`ProductTable` komponentinə baxdıqda, "Name" və "Price" başlıqlarını saxlayan cədvəl başlığının komponent olmadığını görəcəksiniz. Biz bu yola üstünlük vermişik. Bu hissənin komponent olması və ya olmaması haqqında mübahisə aparmaq olar. Məsələn, bizim fikrimizcə, bu başlıqlar *məlumat kolleksiyasının* bir hissəsidir deyə, bu bölgü `ProductTable`-ın məsuliyyətində olmalıdır. Lakin, başlıq mürəkkəbləşdikdə (məsələn, başlıqlara sortlaşdırma funksionallığı əlavə edildikdə), bu bölgünü `ProductTableHeader` komponentinə çıxarmaq məntiqli olar.

Mokapda olan komponentləri müəyyənləşdirdikdən sonra, bu komponentləri iyerarxiyaya düzə bilərik. Hər hansı bir komponentin daxilində olan komponentlər iyerarxiyada valideyn komponentin uşaq komponentləri olmalıdır:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## Addım 2: Statik Versiyasını React-də Düzəldin {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen"><a href="https://codepen.io/gaearon/pen/BwWzwm">React ilə Düşünmək: Addım 2</a> Pen-ini <a href="https://codepen.io">CodePen-də</a> sınayın.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Komponent iyerarxiyasının olduqdan sonra, applikasiyamızı düzəldə bilərik. Başlamaq üçün ən asan yol, məlumat modeli əsasında UI-ı, interaksiya olmadan render etməkdir. Statik versiyanı düzəltmək çox yazmaq amma az fikirləşmək, interaktivlik əlavə etmək isə çox fikirləşmək amma az yazmaq tələb etdiyindən, bu iki prosesi ayırmaq faydalıdır.

Məlumat modelini render edən applikasiyanın statik versiyasını düzəltmək üçün digər komponentlərdən istifadə edən komponentlər düzəldib məlumatı *proplar* ilə göndərmək lazımdır. Valideyndən uşaqlara məlumatı *proplar* ilə göndərmək olur. Əgər  *state* konsepsiyasından xəbəriniz varsa, statik versiyanı düzəltmək üçün **state-dən istifadə etməyin**. State yalnız interaktivlik (yəni zaman ilə dəyişən məlumatlar) üçün lazımdır. İndi, applikasiyanın statik versiyasını düzəltdiyimizdən, bizə state-dən istifadə etmək lazım deyil.

Siz komponentləri aşağıdan yuxarı və ya yuxarıdan aşağı formada düzəldə bilərsiniz. Bu deməkdir ki, iyerarxiyada üstdə (məsələn, `FilterableProductTable`) və ya altda olan komponentlərdən (məsələn, `ProductRow`) başlamaq olar. Sadə nümunələrdə yuxarıdan aşağı yazmaq daha asandır. Böyük layihələrdə isə aşağıdan yuxarı gedib komponentləri düzəltdikcə test etmək daha asandır.

Bu addımın sondunda, məlumat modelini render edən və yenidən istifadə edilə bilən komponentlər kitabxanamız olacaq. Applikasiyanın statik versiyası olduğundan, komponentlərin yalnız `render()` funksiyaları olacaq. İyerarxiyada üstdə olan `FilterableProductTable` komponenti, məlumat modelini prop kimi qəbul edəcək. Əgər siz məlumat modelini dəyişib `ReactDOM.render()` funksiyasını yenidən çağırsanız, UI yenilənəcək. UI-ın necə yeniləndiyini görüb harada dəyişikliklərin lazım olduğunu görə biləcəksiniz. React-in **bir tərəfli məlumat axını** (həmçinin *bir tərəfli binding* adlanır) hər şeyin modulyar və tez olmasına imkan yaradır.

Bu addımı icra etmək üçün komək lazımdırsa [React sənədlərinə](/docs/) baxın.

### Qısa İnterlyud: Props və ya State {#a-brief-interlude-props-vs-state}

React-də iki tip məlumat "modeli" var: proplar və state. Bu iki "model" arasındaki fərqi başa düşmək vacibdir. Əgər bunların fərqini bilmirsinizsə [React-in rəsmi sənədlərini](/docs/state-and-lifecycle.html)  gözdən keçirin. Əlavə olaraq, [FAQ: State və Proplar arasında fərq nədir?](/docs/faq-state.html#what-is-the-difference-between-state-and-props) sənədə baxın.

## Addım 3: Minimal (amma tam) UI Vəziyyətinin Təsvirini Müəyyənləşdirin {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

UI-ı interaktiv etmək üçün məlumat modelində dəyişikliklər edə bilməlisiniz. React-də bu dəyişikliklər, **state** ilə icra olunur.

Applikasiyanı düzgün qurmaq üçün ilk öncə applikasiyaya lazım olan dəyişən state-i müəyyənləşdirmək lazımdır. Burada ən vacib məqam [DRY-dır: *Özünüzü Yenidən Təkrarlamayın (Don't Repeat Yourself)*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Applikasiyaya lazım olan ən minimum state-i tapıb qalan bütün dəyərli lazım olduqda hesablayın. Məsələn, əgər TODO siyahısı düzəldirsinizsə, TODO elementləri olan massivi saxlayın. Lakin, elementlərin sayını ayrıca state-də saxlamayın. TODO elementlərinin sayını bilmək üçün, massivdən sayı götürün.

Applikasiyada olan bütün məlumatlar haqqında fikirləşək. Bizdə aşağıdaki məlumatlar var:

  * Məhsulların orijinal siyahısı
  * İstifadəçinin daxil etdiyi axtarış mətni
  * Çekboksun dəyəri
  * Məhsulların filtr olunmuş siyahısı

Gəlin siyahıya baxıb state olacaq məlumatları müəyyənləşdirək. Hər məlumat parçası üçün aşağıdaki üç sualı verin:

  1. Bu məlumat valideyndən proplar ilə gəlir? Əgər gəlirsə, bu state deyil.
  2. Bu məlumat zaman ilə dəyişir? Əgər dəyişmirsə, bu state deyil.
  3. Bu məlumatı digər state və ya proplar əsasında hesablamaq mümkündür? Əgər mümkündürsə, bu state deyil.

Məhsulların orijinal siyahısı proplar ilə göndərildiyindən, bu state deyil. Axtarış mətni və çekboks dəyəri zaman ilə dəyişdiyindən və digər dəyərlərdən hesablanıb törənə bilmədiyindən, bu məlumatlar state olmalıdır. Filtr olunmuş məhsullar siyahısı məhsulların orijinal siyahısı, axtarış mətni və çekboks dəyəri əsasında hesablana bildiyindən, bu məlumat state olmamalıdır.

State aşağıdaki siyahıda göstərilib:

  * İstifadəçinin daxil etdiyi axtarış mətni
  * Çekboksun dəyəri

## Addım 4: State-in Harada Yaşayacağını Müəyyənləşdirin {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen"><a href="https://codepen.io/gaearon/pen/qPrNQZ">React ilə Düşünmək: Addım 4</a> Pen-ini <a href="https://codepen.io">CodePen-də</a> sınayın.</p>

Biz applikasiyaya lazım olan minimum state-i müəyyənləşdirdik. İndi biz dəyişən və ya state-i *saxlayan* komponenti müəyyənləşdirməliyik.

Yadda saxlayın: React həmişə komponent iyerarxiyasının bir tərəfli məlumat axınından ibarətdir. Hansı komponentin state-i saxlaması ilk zamanlar aydın olmaya bilər. **Yeni başlayanlar üçün state-in yerini müəyyənləşdirmək ən çətin hissələrdən biri olduğundan,** aşağıdaki addımlardan istifadə etməyi tövsiyyə edirik.

Applikasiyada olan hər state parçası üçün:

  * State əsasında render edən komponentləri müəyyənləşdirin.
  * Müştərək sahib komponenti (State lazım olan bütün komponentlərin iyerarxiyada üstündə olan tək komponent) tapın.
  * State-i Müştərək sahib komponent və ya iyerarxiyada daha üstdə olan digər komponent saxlamalıdır.
  * Əgər state-i saxlayan komponent tapa bilmirsinizsə, state-i saxlamaq üçün yeni komponent yaradıb, iyerarxiyada müştərək sahib komponentdən üstdə yerləşdirin.

Applikasiyamız üçün bu strategiyaya yenidən baxaq:

  * `ProductTable` komponenti state əsasında məhsullar siyahısını filtr etməlidir. `SearchBar` isə axtarış mətnini və çekboks dəyərini göstərməlidir.
  * `FilterableProductTable` müştərək sahib komponentdir.
  * Filtr mətninin və çekboks dəyərinin `FilterableProductTable` komponentində yerləşdirilməsi məntiqlidir.

Biz state-in `FilterableProductTable` komponentində saxlanmasına qərar verdik. İlkin olaraq, applikasiyanın ilkin state-ini təmsil etmək üçün `FilterableProductTable`-ın `constructor`-una `this.state = {filterText: '', inStockOnly: false}` instansiya parametri əlavə edin. Sonra, `filterText` və `inStockOnly` state-lərini `ProductTable` və `SearchBar` komponentlərinə prop kimi göndərin. Ən sonda, bu proplar əsasında `ProductTable`-da məhsulları filter edin və `SearchBar`-da anket sahələrinin dəyərlərini təyin edin.

Artıq applikasiyanın necə işləyəcəyini görmək mümkündür: `filterText`-i `"ball"` mətni ilə dəyişib applikasiyanı yeniləyin. Məlumat cədvəlinin düzgün yeniləndiyini görəcəksiniz.

## Addım 5: Tərs Məlumat Axını Əlavə Edin {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="React ilə Düşünmək: Addım 5" class="codepen"><a href="https://codepen.io/gaearon/pen/LzWZvb">React ilə Düşünmək: Addım 5</a> Pen-ini <a href="https://codepen.io">CodePen-də</a> sınayın.</p>

Biz iyerarxiyada aşağı axını olan proplar və state-in əsasında render edən applikasiya yaratmışıq. İndi bizə əks istiqamətdə məlumat axını lazımdır: iyerarxiyanın dərinliklərində olan anket komponentləri `FilterableProductTable` komponentində state-i yeniləyə bilməlidir.

React, proqramın necə işlədiyini aydın etmək üçün üçün bu məlumat axının açıq göstərir. Bu səbəbdən, standart iki-tərəfli məlumat axını ilə müqayisədə daha çox kod yazılmalıdır.

Əgər anket sahəsinə yazı yazdıqda və ya çekboksu çek etdikdə, daxil etdiyiniz dəyərlər sayılmayacaq. Səbəb, `input` elementinin `value` propunun həmişə `FilterableProductTable` komponentindən göndərilən `state`-ə bərabər olmasıdır.

Gəlin nə baş verəcəyi haqqda fikirləşək. İstifadəçi anket sahələrini yenilədikdə, yeni dəyərlər state-də əks olunmalıdır. Komponentlər yalnız öz state-lərini yeniləməlidir. Bu səbəbdən, `FilterableProductTable` komponenti `SearchBar` komponentinə state-i yenilənməsi üçün callback-lər göndərəcək. Biz anket sahələrinin `onChange` hadisəsindən istifadə edərək dəyişiklikləri əks etdirə bilərik. `FilterableProductTable` tərəfindən göndərilən callback-lər `setState()` funksiyasını çağırıb applikasiyanı yeniləyəcəklər.

## Son {#and-thats-it}

Arzulayırıq ki, bu sənəd sizə React-də komponentlər və applikasiyalar yaratmaq üçün ideyalar verəcək. Yazdığınız kod standart kod yazmalarından biraz uzun ola bilər. Lakin, yadda saxlayın ki, kod, yazıldığından qat-qat çox oxunur. Belə modulyar və açıq kodu oxumaq daha asandır. Böyük komponentlər kitabxanaları yazdıqda, bu modulyarlığı və açıqlığı qiymətləndirəcəksiniz. Əlavə olaraq komponentləri yenidən istifadə edərək sətrlərinizi azalda biləcəksiniz. :)

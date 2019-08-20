---
id: thinking-in-react
title: React ilə Düşünmək
permalink: docs/thinking-in-react.html
redirect_from:
  - 'blog/2013/11/05/thinking-in-react.html'
  - 'docs/thinking-in-react-zh-CN.html'
prev: composition-vs-inheritance.html
---

Bizim fikrimizcə böyük və tez işləyən Javascript Veb applikasiyaları yazmaq üçün React ən yaxşı yollardan biridir. React bizim üçün Facebook-da və Instagram-da çox yaxşı scale edib.

React-in ən yaxşı hissələrindən biri applikasiyanı yaza-yaza sizi necə formada fikirləşməyə məcbur etməsidir. Bu sənəddə, React-dən istifadə edərək axtarıla bilən məhsulların məlumat cədvəlini yaratmaq üçün düşüncə prosesindən danışacağıq.

## Mok ilə Başlamayın {#start-with-a-mock}

Fikirləşək ki, designerin verdiyi mokap və JSON API bizdə var. Mokap aşağıdaki şəkildə göstərilib:

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

## Addım 1: UI Komponent İyerarxiyasına Parçalayın {#step-1-break-the-ui-into-a-component-hierarchy}

İlk öncə, mokda olan hər komponent-in (və subkomponent-in) ətrafında kvadratlar çəkib, bu kvadratları adlandırın. Əgər dizayner ilə işləyirsinizsə, o bu hissəni artıq düzəltmiş ola bilər. Dizayneriniz ilə danışın! Onun Photoshop-da adlandırdığı   layer-lər sizin React komponentləriniz ola bilər!

Bəz hansı hissənin ayrı komponent olmasını necə bilirik? Yeni obyekt və ya funksiya üçün işlətdiyiniz texnikadan istifadə edin. Bu texnikalardan biri [vahid məsuliyyət prinsipidir](https://en.wikipedia.org/wiki/Single_responsibility_principle). Bu prinsip deyir ki, ideal olaraq komponent yalnız bir iş ilə məşqul olmalıdır. Əgər komponent boyüyürsə, bu komponent daha kiçik komponentlərə parçalanmalıdır.

Bir çox zaman istifadəçiyə JSON məlumatı göstərdiyinizdən, modeliniz düzgün qurulubsa, UI-nız (və nəticədə komponent strukturunuz) bu modelə rahat map ola biləcək. Bunun səbəbi UI və məlumat modelinin eyni *informasiya arxitekturasından istifadə etməsidir*. Hər komponenti məlumat modelinin bir hissəsinə uyğunlaşdırmaq fikri ilə UI-ı komponentlərə parçalayın.

![Komponent sxemi](../images/blog/thinking-in-react-components.png)

Bu sxemdə, bizim applikasiyamızın beş kompoentdən ibarət olduğunu görəcəksiniz. Hər komponentin təmsil etdiyi məlumatı italik ilə yazmışıq.

  1. **`FilterableProductTable` (narıncı):** bütün nümunəni üçün konteynerdir
  2. **`SearchBar` (mavi):** *istifadəçi daxil etməsini* qəbul edir
  3. **`ProductTable` (yaşıl):** *istifadəçi daxil etməsi* əsasında *məlumat kolleksiyasını* göstərir və filter edir
  4. **`ProductCategoryRow` (firuzə):** hər *kateqoriya* üçün başlığı göstərir
  5. **`ProductRow` (qırmızı):** hər *məhsul* üçün sıranı göstərir

`ProductTable` komponentinə baxdıqda, "Name" və "Price" başlıqlarını saxlayan cədvəl başlığının komponent olmadığını görəcəksiniz. Bu bizim seçdiyimiz yoldur və bu hissənin komponent olması və ya olmaması haqqında mübahisə aparmaq olar. Məsələn bizim bu hissəni `ProductTable`-da saxlamağımızın səbəbi, bu hissənin *data kolleksiyasının* bir hissəsi olduğundan `ProductTable`-ın məsulliyəti olmasıdır. Lakin, əgər başlıq mürəkkəbləşsə (məsələn, biz başlıqlara sort etmək funksionallığı əlavə etsək), bu hissəni ayrı `ProductTableHeader` komponentinə əlavə etmək məntiqli olar.

Mokapda olan komponentləri müəyyənləşdirdikdən sonra, gəlin bu komponentləri iyerarxiyada düzək. Hər hansı bir komponentin daxilində olan komponentlər iyerarxiyada valideyn komponentlərin uşaq komponentləri olmalıdırlar:

  * `FilterableProductTable`
    * `SearchBar`
    * `ProductTable`
      * `ProductCategoryRow`
      * `ProductRow`

## Addım 2: Statik Versiyasını React-də Düzəldin {#step-2-build-a-static-version-in-react}

<p data-height="600" data-theme-id="0" data-slug-hash="BwWzwm" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen"><a href="https://codepen.io/gaearon/pen/BwWzwm">React ilə Düşünmək: Addım 2</a> Pen-ini <a href="https://codepen.io">CodePen-də</a> sınayın.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Bizdə komponent iyerarxiyasının oldğundan, gəlin applikasiyamızı düzəldək. İlk öncə məlumat modeli əsasında UI-ı interaksiya olmadan render etmək başlamaq üçün ən asan yoldur. Statik versiyanı düzəltmək çox yazmaq amma az fikirləşmək, interaktivlik əlavə etmək isə çox fikirləşmək amma az yazmaq tələb etdiyindən, bu iki prosesi ayırmaq faydalıdır.

Məlumat modelini render edən applikasiyanın statik versiyasını düzəltmək üçün digər komponentlərdən istifadə edən komponentlər düzəldib məlumatı *proplar* ilə göndərmək lazımdır. Valideyndən uşaqlara məlumatı *proplar* ilə göndərmək olur. Əgər  *state* konsepsiyasından xəbəriniz varsa, statik versiyanı düzəltmək üçün **state-dən istifadə etməyin**. State yalnız interaktivlik (yəni zaman ilə dəyişən məlumatlar) üçün lazımdır. İndi biz applikasiyanın statik versiyasını düzəltdiyimizdən, sizə state-dən istifadə etmək lazım deyil.

Siz komponentləri aşağıdan yuxarı və ya yuxarıdan aşağı düzəldə bilərsiniz. Bu deməkdir ki, siz iyerarxiyada yuxara olan komponentlərdən (məsələn, `FilterableProductTable`) və ya aşağıda olan komponentlərdən (məsələn, `ProductRow`) başlaya bilərsiniz. Sadə nümunələrdə, yuxarıdan aşağı yazmaq daha asandır. Böyük layihələrdə isə aşağıdan yuxarı gedib komponentləri düzəldə düzəldə test etmək daha asandır.

Bu addımın sondunda, məlumat modelini render edən, yenidən istifadə edilə bilən komponentlər kitabxananız olacaq. Applikasiyanın statik versiyası olduğundan, komponentlərin yalnız `render()` funksiyaları olacaq. İyerarxiyada üstdə olan komponent (`FilterableProductTable`) məlumat modelini prop kimi qəbul edəcək. Əgər siz məlumat modelini dəyişib `ReactDOM.render()` funksiyasını yenidən çağırsanız, UI yenilənəcək. UI-ın necə yeniləndiyini və hara dəyişikliklər etməin lazım olduğunu görə biləcəksiniz. React-in **bir tərəfli məlumat axını** (*bir tərəfli binding*-də adlanır) hər şeyin modulyar və tez olmasına imkan yaradır.

Bu addımı icra etmək üçün komək lazımdırsa [React sənədlərinə](/docs/) baxın.

### Qısa İnterlyud: Props və ya State {#a-brief-interlude-props-vs-state}

React-də iki tip məlumat "modeli" var: proplar və state. Bu iki "model" arasındaki fərqi başa düşmək vacibdir. Əgər bunların fərqini bilmirsinizsə [React-in rəsmi sənədlərini](/docs/state-and-lifecycle.html)  gözdən keçirin. Əlavə olaraq [FAQ: State və Proplar arasında fərq nədir?](/docs/faq-state.html#what-is-the-difference-between-state-and-props) sənədə baxın.

## Addım 3: Minimal (amma tam) UI Vəziyyətinin Təsvirin Müəyyənləşdirin {#step-3-identify-the-minimal-but-complete-representation-of-ui-state}

UI-ı interaktiv etmək üçün, məlumat modelində dəyişikliklər edə bilməlisiniz. React-də bu, **state** ilə icra olunur.

Applikasiyanı düzgün qurmaq üçün, ilk öncə applikasiyaya lazım olan dəyişən state-i müəyyənləşdirmək lazımdır. Burada ən vacib məqam [DRY-dır: *Özünüzü Yenidən Təkrarlamayın (Don't Repeat Yourself)*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). Applikasiyaya lazım olan ən minimum state-i tapıb qalan bütün dəyərli lazım olduqda hesablayın. Məsələn, əgər TODO siyahısı düzəldirsinizsə, TODO elementləri olan massivi saxlayın. Lakin, elementlərin sayını ayrıca state-də saxlamayın. TODO elementlərinin sayını bilmək üçün, massivdən sayı götürün.

Applikasiyada olan bütün məlumatları haqqında fikirləşək. Bizdə aşağıdaki məlumatlar var:

  * Məhsulların orijinal siyahısı
  * İstifadəçinin daxil etdiyi axtarış mətni
  * Çekboksun dəyəri
  * Məhsulların filter olunmuş siyahısı

Gəlin bu məlumatlara baxıb hansının state olacağını müəyyənləşdirək. Hər məlumat parçası ümün aşağıdaki üç sualı verin:

  1. Bu məlumat valideyndən proplar ilə gəlir? Əgər belədirsə bu state deyil.
  2. Bu məlumat zaman ilə dəyişir? Əgər dəyişmirsə, bu state deyil.
  3. Bu məlumatı digər state və ya proplar əsasında hesablamaq olar? Əgər olarsa, bu state deyil.

Məhsulların orijinal siyahısı proplar ilə göndərildiyindən, bu state deyil. Axtarış məti və çekboks dəyəri zaman ilə dəyişdiyindən və heç nədən hesablanıb törənə bilmədiyindən, state-dir. Filter olunmuş siyahı məhsulların orijinal siyahısı, axtarış mətni və çekboks dəyəri əsasında hesablana bildiyindən, bu state deyil.

State aşağıdaki iki siyahıda göstərilib:

  * İstifadəçinin daxil etdiyi axtarış mətni
  * Çekboksun dəyəri

## Addım 4: State-in Harada Yaşayacağını Müəyyənləşdirin {#step-4-identify-where-your-state-should-live}

<p data-height="600" data-theme-id="0" data-slug-hash="qPrNQZ" data-default-tab="js" data-user="lacker" data-embed-version="2" class="codepen"><a href="https://codepen.io/gaearon/pen/qPrNQZ">React ilə Düşünmək: Addım 4</a> Pen-ini <a href="https://codepen.io">CodePen-də</a> sınayın.</p>

Biz applikasiyaya lazım olan minimum state-i müəyyənləşdirdik. İndi bizə hansı komponentin dəyişdiyini və ya bu state-i *saxladığını* müəyyənləşdirməliyik.

Yadınızda saxlayın: React həmişə komponent iyerarxiyasında bir tərəfli məlumat axınından ibarətdir. Hansı komponentin state-i saxlaması ilk zamanlar aydın olmaya bilər. **Yeni başlayanlar üçün bu ən çətin hissələrdən biri olduğundan,** aşağıdaki addımlardan istifadə edərək bunu müəyyənləşdirin:

Applikasiyada olan hər state parçası üçün:

  * Bu state əsasında render edən komponentləri müəyyənləşdirin.
  * Müştərək sahib komponenti tapın (State lazım olan bütün komponentlərin iyerarxiyada üstündə olan tək komponent).
  * Müştərək sahib komponent və ya iyerarxiyada daha üstdə olan digər komponent state-i saxlamalıdır.
  * Əgər state-i saxlayan komponent tapa bilmirsinizsə, yalnız state-i saxlamaq üçün yeni komponent yaradıb, bu komponenti iyerarxiyada müştərək sahib komponentdən üstdə yerləşdirin.

Applikasiyamız üçün bu strategiyaya yenidən baxaq:

  * `ProductTable` state əsasında məhsullar siyahısını filter etməlidir. `SearchBar` isə axtarış mətnini və çekboks state-ini göstərməlidir.
  * `FilterableProductTable` müştərək sahib komponentdir.
  * Filter mətninin və çekboks dəyərinin `FilterableProductTable` komponentində yaşaması məntiqlidir.

Biz state-in `FilterableProductTable` komponentində saxlanmasına qərar verdik. İlk öncə, `FilterableProductTable`-in `constructor`-una applikasiyanın ilkin state-ini təmsil etməsi üçün `this.state = {filterText: '', inStockOnly: false}` instansiya parametri əlavə edin. Sonra, `filterText` və `inStockOnly` state-lərini `ProductTable` və `SearchBar` komponentlərinə prop kimi göndərik. Ən sonda, bu proplar əsasında `ProductTable`-da məhsulları filter edin və `SearchBar`-da anket sahələrinin dəyərlərini təyin edin.

Siz applikasiyanızın necə işləyəcəini görə bilərsiniz: `filterText`-i `"ball"` mətni ilə dəyişib applikasiyanı yeniləyin. Məlumat cədvəlinin düzgün yeniləndiyini görəcəksiniz You'll see that the data table is updated correctly.

## Addım 5: Tərs Məlumat Axını Əlavə Edin {#step-5-add-inverse-data-flow}

<p data-height="600" data-theme-id="0" data-slug-hash="LzWZvb" data-default-tab="js,result" data-user="rohan10" data-embed-version="2" data-pen-title="React ilə Düşünmək: Addım 5" class="codepen"><a href="https://codepen.io/gaearon/pen/LzWZvb">React ilə Düşünmək: Addım 5</a> Pen-ini <a href="https://codepen.io">CodePen-də</a> sınayın.</p>

Biz iyerarxiyada aşağı axını olan proplar və state-in əsasında render edən applikasiya yaratmışıq. İndi bizə əks istiqmətdə məlumat axını lazımdır: iyerarxiyanın dərinliklərində olan anket komponentləri `FilterableProductTable` komponentində state-i yeniləyə bilməlidir.

React proqramın necə işlədiyini anlaya bilmək üçün bu məlumat axının açıq göstərir. Lakin, standart iki-tərəfli məlumat axınından daha çox yazmaq tələb edir.

Əgər siz anket sahəsinə yazı yazsanız və ya çekboksu çek etmək istəsəniz, sizin daxil etdiyiniz dəyərlər sayılmayacaq. Bunun səbəbi  `input`-un `value` propunun həmişə `FilterableProductTable` komponentindən göndərilən `state`-ə bərabər olmasıdır.

Gəlin nə baş verməsi haqqında fikirləşək. İstifadəçi anket sahələrini yenilədikdə, state bu yeni dəyərlərli əks etməlidir. Komponentlər yalnız öz state-lərini yeniləməlir. Bu səbəbdən `FilterableProductTable` `SearchBar` komponentinə state-i yenilənməsi üçün callback-lər göndərəcək. Biz anket sahələrinin `onChange` hadisəsindən istifadə edərək dəyişiklikləri əks etdirə bilərik. `FilterableProductTable` tərəfindən göndərikən callback-lər `setState()` funksiyasını çağırıb applikasiyanı yeniləyəcəklər.

## Son {#and-thats-it}

Arzulayırıq ki, bu sənəd sizə React-də komponentlər və applikasiyalar yaratmaq üçün ideyalar verəcək. Kodun standart yazmaqdan biraz çox uzun olmasına baxmayaraq, yadda saxlayın ki, kod həmişə yazıldığından qat-qat çox oxunur. Belə modulyar və açıq kodu oxumaq daha asandır. Böyük komponentlər kitabxanaları yazdıqda, bu modulyarlığı və açıqlığı qiymətləndirəcəksiniz. Əlavə olaraq kodu yenidən istifadə etmək ilə liniyalarınızı azalda biləcəksiniz. :)

---
id: design-principles
title: Dizayn Əsasları
layout: contributing
permalink: docs/design-principles.html
prev: implementation-notes.html
redirect_from:
  - "contributing/design-principles.html"
---

React-in nə etdiyini, nə etmədiyini və inkişaf fəlsəfəsinin nə olduğunu daha yaxşı təsəvvür edə bilməyiniz üçün bu sənədi yazdıq. Cəmiyyətin iştirak etdiyini görməkdən məmnun olsaq da, bu və ya digər əsasların birini pozan yolu seçmə ehtimalımız aşağıdır.

>**Qeyd:**
>
>Bu sənəd React mövzusunda güclü anlayışınızın olduğunu tələb edir. Burada React komponentlərinin və ya applikasiyalarının deyil, *React-in öz* dizayn əsasları təsvir edilir.
>
>React ilə tanış olmaq üçün [React ilə Düşünmək](/docs/thinking-in-react.html) bölməsini oxuyun.

### Kompozisiya {#composition}

React-in əsas xüsusiyyəti komponentlərin kompozisiyasıdır. Fərqli insanlar tərəfindən yazılan komponentlər birlikdə yaxşı işləməlidirlər. Kod bazasında dəyişiklik dalğası yaratmadan bir komponentə funksionallıq əlavə edə bilməniz bizim üçün vacibdir.

Məsələn, komponentə, ona bağlı olan komponentlərdən heç birini dəyişdirmədən bir növ lokal state əlavə etmək mümkün olmalıdır. Həmçinin, zəruri hallarda hər hansı bir komponentə inisializasiya və sökmə kodunu əlavə etmək də mümkün olmalıdır.

Komponentlərdə state və ya lifecycle metodlarının istifadəsi ilə bağlı "pis" bir şey yoxdur. Hər hansı bir güclü xüsusiyyət kimi, bunlar ehtiyatla istifadə edilməlidirlər. Bu xüsusiyyətləri aradan qaldırmaq niyyətimiz yoxdur. Əksinə, biz bu funsksiyaların React-i faydalı edən əsas mexanizmlərdən biri olduğunu düşünürük. Gələcəkdə [daha çox funksional proqramlaşdırma patternlərini](https://github.com/reactjs/react-future/tree/master/07%20-%20Returning%20State) əlavə edə bilərik, lakin həm lokal state, həm də lifecycle metodları bu modelin bir hissəsi olacaqdır.

Komponentlər tez-tez "sadə funksiyalar" kimi təsvir olunurlar, lakin fikrimizcə, faydalı olmaq üçün daha artığı olmalıdırlar. React-də komponentlər kompozisiya etmə davranışını təsvir edirlər və buna render etmə, lifecycle və state daxildir. [Relay](https://facebook.github.io/relay/) kimi bəzi xarici kitabxanalar komponentlərə məlumat asılılığını izah etmək kimi digər vəzifələr əlavə edirlər. Bu fikirlərin bir və ya digər şəkildə React-ə düşə biləcəyi mümkündür.

### Ümumi Abstraksiya {#common-abstraction}

Ümumiyyətlə, istifadəçi applikasiyalarında tətbiq oluna biləcək [xüsusiyyətlərin əlavə edilməsinə qarşıyıq](https://www.youtube.com/watch?v=4anAwXYqLG8). Applikasiyanızı faydasız kitabxana kodu ilə şişirtmək istəmirik. Ancaq bu qaydanın istisnaları var.

Məsələn, React lokal state və ya lifecycle metodlarını dəstəkləməsəydik, proqramçılar bunun üçün xüsusi abstraksiyalar yaradardılar. Bir neçə rəqabətli abstraksiya olduqda React bu xüsusiyyətlərdən heç birini tətbiq və ya istifadə edə bilməz. React ən aşağı ümumi məxrəc ilə işləməlidir.

Buna görə bəzən React-in özünə xüsusiyyətlər əlavə edirik. Bir çox komponentin müəyyən xüsusiyyəti uyğunsuz və ya effektiv olmayan şəkildə tətbiq etdiyini gördükdə, bu xüsusiyyəti React-də tətbiq edə bilərik. Bu cür dəyişikliklərə ciddiliklə yanaşırıq. Bunu edərkən, abstraksiya səviyyəsinin yüksəldilməsinin bütün ekosistemə xeyir verdiyinə əmin oluruq. State, lifecycle metodları və brauzerlər arası hadisələrin normallaşdırılması bunun yaxşı nümunələridir. 

Həmişə cəmiyyət ilə belə təkmilləşdirmə təkliflərini müzakirə edirik. Bu müzakirələrin bəzilərini React tapşırıq izləyicisində, ["big picture"](https://github.com/facebook/react/issues?q=is:open+is:issue+label:"Type:+Big+Picture") etiketi altında tapa bilərsiniz.

### Çıxış Qapıları {#escape-hatches}

React-i Facebook-da yazılan məhsulların tələbatı əsasında təkmilləşdirdiyimizdən biz React-ə praqmatik yanaşırıq. Funksional proqramlaşdırma kimi bəzi az populyar paradiqmalardan təsirlənsə də, layihənin məqsədi müxtəlif səviyyəli təcrübə və bacarıqlara sahib geniş çeşidli proqramçılar üçün əlçatan olmaqdır.

Bəyənmədiyimiz nümunəni aradan qaldırmaq istəyiriksə, istifadəsinin bütün mövcud hallarını nəzərdən keçirmək və aradan qaldırmadan əvvəl [alternativlər barədə cəmiyyətə məlumat vermək](/blog/2016/07/13/mixins-considered-harmful.html) məsuliyyətimizdir. Applikasiyaların qurulması üçün faydalı olan bəzi patternləri deklarativ şəkildə ifadə etmək çətindirsə, bunun üçün [imperativ API təmin edirik](/docs/more-about-refs.html). Bir çox applikasiyada lazımlı hesab etdiyimiz xüsusiyyətlər üçün mükəmməl API tapa bilmiriksə, sonradan asan silə biləcəyimiz [müvəqqəti, qismən işləyən bir API](/docs/legacy-context.html) təmin edirik. Bu gələcək təkmilləşdirmələr üçün açıq qapı buraxır.

### Sabitlik {#stability}

API sabitliyini qiymətləndiririk. Facebook-da React istifadə edən 50 mindən çox komponentimiz var. [Twitter](https://twitter.com/) və [Airbnb](https://www.airbnb.com/) daxil olmaqla bir çox digər şirkətlər də React istifadə edirlər. Buna görə, adətən ictimai API-ı və ya davranışları dəyişdirməkdən çəkinirik.

Ancaq sabitliyin "heç bir şey dəyişmir" mənasının şişirdirildiyini düşünürük. Çox tez durğunluğa çevrilir. Bunun yerinə, "bu, istehsalda çox istifadə olunur və dəyişiklik halı üçün açıq (mümkun qədər avtomatlaşdırılmış) miqrasiya planı var" mənasındaki sabitliyə üstünlük veririk.

Bir patterni aradan qaldırmadan əvvəl onun Facebook tərəfindən necə istifadə edildiyini öyrənirik və bununla bağlı köhnəlmə xəbərdarlıqlarını əlavə edirik. Bu, dəyişikliklərin təsir miqyasını qiymətləndirməyə imkan verir. Bəzən həyata keçirməyə başlamağın hələ tez olduğunu və kod bazasının hazır vəziyyətə gətirmək üçün strategiya düşünməli olduğumuzu görərək dəyişikliyi ləğv edirik.

Dəyişikliyin o qədər də böyük olmadığına və bütün istifadə halları üçün miqrasiyanın mümkün olduğuna əminiksə, köhnəlmə xəbərdarlığını open source cəmiyyətinə təqdim edirik. Facebook xaricində React istifadəçiləri ilə yaxından əlaqədəyik və populyar open source layihələrini izləyirik, və bu köhnəlmələri aradan qaldırmaqda onlara yol göstəririk.

Facebook-dakı React kod bazasının genişliyini nəzərə alaraq, Facebook-un müvəffəqiyyətli daxili miqrasiyası digər şirkətlərin də problem yaşamayacağının göstəricisidir. Bununla belə, bəzən insanlar ağlımıza gəlməyən istifadə hallarını qeyd edirlər və bu hallarda onlar üçün çıxış yollarını əlavə edirik və ya yanaşmamızı yenidən nəzərdən keçiririk.

Səbəbsiz yerə aradan qaldırma etmirik. Köhnəlmə xəbərdarlıqlarının bəzən məyusluğa səbəb olduğunu bilirik, lakin bunlar bizim və cəmiyyətdəki bir çox insanların dəyərli hesab etdikləri inkişafa və yeni imkanlara yol açırlar.

Məsələn, React 15.2.0-da [naməlum DOM propları barədə xəbərdarlıq](/warnings/unknown-prop.html) əlavə etdik. Bununla bir çox layihəyə toxunduq. Lakin bu xəbərdarlığı düzəltmək vacibdir, çünkü bu düzəlişlə React-ə [xüsusi atributların](https://github.com/facebook/react/issues/140) dəstəyini təqdim edə bilərik. Əlavə etdiyimiz hər köhnəlmə xəbərdarlığının arxasında bunun kimi bir səbəb var.

Köhnəlmə ilə bağlı xəbərdarlıq əlavə edərkən, yalnız [növbəti böyük versiyada davranış dəyişlikləri edirik](/blog/2016/02/19/new-versioning-scheme.html) və mövcud böyük versiyanın axırına qədər köhnəlmiş kodu saxlayırıq. Bir çox təkrarlanan əl işi varsa, dəyişikliyin çoxunu avtomatlaşdıran [codemod](https://www.youtube.com/watch?v=d0pOgY8__JM) skriptini yayırıq. Codemod skriptləri kütləvi kod bazasına girmədən irəliləməyimizə imkan verir və bunu istifadə etməyinizi tövsiyə edirik.

Dərc edilmiş codemod skriptlərini [react-codemod](https://github.com/reactjs/react-codemod) repo-sunda tapa bilərsiniz.

### Qarşılıqlı Əlaqə {#interoperability}

Mövcud sistemlərlə qarşılıqlı əlaqəyə və tədrici adaptasiyaya yüksək dəyər veririk. Facebook-da React-də yazılmayan bir çox kod var. Sayt, XHP qarışığından olan server tərəfi komponent sistemini, React-dən əvvəl gələn daxili UI kitabxanalarını və React-in özünü istifadə edir. Hər hansı bir komandanın kiçik xüsusiyyət üçün kodlarının hamısını yenidən yazmadan [React istifadə etməyə başlaya bilməsi](https://www.youtube.com/watch?v=BF58ZJ1ZQxY) bizim üçün vacibdir.

Buna görə React, dəyişkən modellərlə işləmək üçün çıxış yolları təmin edir və digər UI kitabxanaları ilə birlikdə yaxşı işləməyə çalışır. Mövcud imperativ UI-ı deklarativ komponentə və ya əksinə əhatə edə bilərsiniz. Bu tədrici adaptasiya üçün çox vacibdir.

### Planlaşdırma {#scheduling}

Komponentlər funksiya kimi təsvir olunsa da, React istifadə edərkən birbaşa çağırılmır. Hər bir komponent [nəyin render ediləcəyinin təsvirini](/blog/2015/12/18/react-components-elements-and-instances.html#elements-describe-the-tree) qaytarır. Bu təsvirə həm `<LikeButton>` kimi istifadəçi tərəfindən yazılmış komponentlər, həm də `<div>` kimi platformaya məxsus komponentlər daxil ola bilər. Gələcək bir nöqtədə `<LikeButton>`-ı "açma" və komponentlərin render nəticələrinə görə, UI ağacını rekursiv olaraq dəyişmə React-dən asılıdır.

Bu incə, lakin güclü fərqdir. Funksiya komponentini çağırmadığınıza və çağırmanı React-ə verdiyinizə görə, React lazım olduqda çağırmanı gecikdirmə gücünə sahib olur. Hal-hazırki tətbiqdə React ağacı rekursiv olaraq gəzir və bir keçiddə bütün yenilənən ağacın render funksiyalarını çağırır. Ancaq gələcəkdə [kadrların azalmasının qarşısını almaq üçün bəzi yeniləmələrin təxirə salınması](https://github.com/facebook/react/issues/6170) başlaya bilər.

Bu, React-in dizaynında çox danışılan mövzudur. Bəzi populyar kitabxanalar yeni məlumatlar ortaya çıxdıqda hesablamalar aparan “push” yanaşmasını tətbiq edirlər. React, əksinə, hesablamalar tələb olunana qədər gecikdirilə bilən “pull” yanaşmasına üstünlük verir.

React ümumi məlumat emalı kitabxanası deyil. Istifadəçi interfeysi yaratmaq üçün kitabxanadır. Düşünürük ki, applikasiya hansı hesablamaların aktual olduğunu və hansıların olmadığını bilməlidir.

Element ekrandan kənarda olduqda bununla əlaqəli hər hansı bir məntiqi təxirə sala bilərik. Gələn məlumatlar kardların yenilənməsindən təz gəldikdə bu yenilikləri birləşdirib dəstələr ilə icra edə bilərik. Kadrların azalmasının qarşısını almaq üçün istifadəçi ilə qarşılıqlı əlaqədən yaranan işləri (məsələn, düymə tıklama animasiyasını) daha az əhəmiyyətli arxada baş verən işlərdən üstün tuta bilərik (məsələn, şəbəkədən yüklənmiş komponenti göstərmədən).

Bunun hələ həyata keçirilmədiyini bilin. Bununla birlikdə, bu sərbəstlik planlaşdırmaya niyə nəzarət etməyi seçdiyimizi və `setState()` funksiyasının niyə asinxron şəkildə işlədiyini göstərir. Konseptual olaraq, biz bunu "bir yeniləmənin planlaşdırılması" kimi düşünürük.

İstifadəçilərə [Funksional Reaktiv Proqramlaşdırmada](https://en.wikipedia.org/wiki/Functional_reactive_programming) ümumi olan "push" paradiqmasının istifadəsinə icazə versəydik, planlaşdırmaya nəzarət etməyimiz daha çətin olardı. Biz "birləşdirici" koda sahib olmaq istəyirik.

React üçün əsas məqsəd React-ə qayıtmadan əvvəl yerinə yetirilən istifadəçi kodunun az olmasıdır. Bu, React-in UI bilikləri əsasında React-ə işlərin planlaşdırılması və bölünməsi qabiliyyətini verir.

Kollektivdə React-in "Planlaşdırıcı" adlandırılması lazım olduğuna dair daxili zarafat var, çünki React tamamilə "reaktiv" olmaq istəmir.

### Təkmilləşdirmə Təcrübəsi {#developer-experience}

Yaxşı təkmilləşdirmə təcrübəsi təmin etmək bizim üçün vacibdir.

<<<<<<< HEAD
Məsələn, dəstəklədiyimiz [React DevTools](https://github.com/facebook/react/tree/master/packages/react-devtools) brauzer genişlənməsindən istifadə edərək Chrome və Firefox-da React komponentləri ağacını görə bilərsiniz. Tez-tez eşidirik ki, bu həm Facebook mühəndislərinin, həm də cəmiyyətin işini yaxşılaşdırır.
=======
For example, we maintain [React DevTools](https://github.com/facebook/react/tree/main/packages/react-devtools) which let you inspect the React component tree in Chrome and Firefox. We have heard that it brings a big productivity boost both to the Facebook engineers and to the community.
>>>>>>> 47adefd30c46f486428d8231a68e639d62f02c9e

Əlavə olaraq, biz proqramçılar üçün faydalı xəbərdarlıqlar verməyə çalışırıq. Məsələn, təqləri brauzer üçün anlaşılmaz şəkildə yerləşdirsəniz və ya API-da yazılım xətası etsəniz, React bunun xəbərdarlığını edir. Xəbərdarlıqlar və əlaqəli yoxlamalar React-in təkmilləşdirmə versiyasının produksiyasından daha yavaş olması səbəbidir.

React-in Facebook-da necə istifadə olunduğunu izləmək bizə, ən çox yayılmış səhvləri müəyyənləşdirməyə, anlamağa və əvvəlcədən onların qarşısını almağa kömək edir. Yeni xüsusiyyətlər əlavə etdikdə, ümumi səhvləri qabaqcadan görməyə və bu barədə xəbərdarlıqlar etməyə çalışırıq.

Hər zaman təkmilləşdirmə təcrübəsinin daha əlverişli yollarını axtarırıq, buna görə fikirlərinizi müzakirə etməkdən və irəliləyiş gətirən qatqıları qəbul etməkdən məmnunuq.

### Dibaq Etmə {#debugging}

Bir şey səhv olarsa, kod bazasında səhvin mənbəyini tapmaq mümkün olmalıdır. React-də buna state və proplar kömək edir.

Ekranda bir şeyin səhv olduğunu görsəniz, React DevTools açaraq render etməyə cavabdeh olan komponenti tapa bilər və sonra, prop və state-in düzgünlüyünü yoxlaya bilərsiniz. Bunlarda xəta yoxdursa, demək problem komponentin `render()` funksiyasında və ya `render()`-dən çağırılan başqa funksiyadadır. Belecə problem təcrid olunur.

State səhvdirsə, problemin bu fayldakı `setState()` çağırışlarından birində qaynaqlanır. Bunu tapmaq və düzəltmək nisbətən asandır, çünki adətən bir faylda yalnız bir neçə `setState()` çağırışı olur.

Proplar səhvdirsə, inspektorda ağacı üstən aşağı doğru keçərək səhv propları ötürən ilk komponenti axtarırıq.

React üçün hər hansı bir UI-ın qurulma məlumatlarının cari state və proplar" şəklində izlənə bilmə qabiliyyəti çox vacibdir. Dizaynımızdakı aydın məqsədlərdən biri, state-in closure-larda və kombinatorlarda "itməməsini" və birbaşa React-də olmasını təmin etməkdir.

UI dinamik olmasına baxmayaraq inanırıq ki, propların və state-in sinxron `render()` funksiyası dibaq etməni darıxdırıcı, lakin sonlu bir prosesə çevirir. Bu məhdudiyyəti React-də saxlamaq istərdik, halbuki, bu animasiyalar kimi bəzi mürəkkəb istifadə hallarını çətinləşdirir.

### Konfiqurasiya {#configuration}

İcra müddəti zamanı təyin edilən qlobal konfiqurasiya parametrlərinin problemli olduğunu hesab edirik.

Məsələn, bəzən bizdən `React.configure(options)` və ya `React.register(component)` kimi bir funksiyanı həyata keçirmək istənilir. Ancaq bu çox sayıda problemlərə səbəb olur və biz bunlar üçün uyğun həll yollarını bilmirik.

Belə bir funksiya üçüncü tərəf komponent kitabxanasından çağrıldıqda nə baş verəcək? Bir React applikasiyası digər React applikasiyasından render olunduqda və bu applikasiyaların konfiqurasiyaları uyğun olmadıqda nə baş verməlidir? Üçüncü tərəfin komponenti müəyyən bir konfiqurasiyaya ehtiyacı olduğunu necə bildirə bilər? Düşünürük ki, qlobal konfiqurasiya kompozisiya ilə yaxşı işləmir. Kompozisiyanın React-in əsas hissəsi olduğundan biz kodda qlobal konfiqurasiya imkanları təmin etmirik.

Lakin, biz qurulma zamanı bəzi qlobal konfiqurasiyalar təmin edirik. Məsələn, tərtib və istehsal üçün fərqli qurulmalar təqdim edirik. Gələcəkdə [profilli qurulma da əlavə edə bilərik](https://github.com/facebook/react/issues/6627) və digər qurulma bayraqlarını nəzərdən keçirməyə açığıq.

### DOM Xaricində {#beyond-the-dom}

React-in dəyərini bizə daha az baqlı və yaxşı kompozisiya edilə bilən komponentləri yazmağa imkan verməsində görürük. React-in orijinal render etmə hədəfi DOM-dur. Lakin, [React Native](https://reactnative.dev/) də həm Facebook, həm də cəmiyyət üçün vacibdir.

Render edici qurğulardan müstəqil olmaq React-in dizaynının vacib məhdudiyyətidir. Bu, daxili təsvirlərə ağırlıq əlavə edə bilər. Digər tərəfdən, nüvə üzərində edilən dəyişikliklər bütün platformalara təsir edə bilir.

Vahid proqramlaşdırma modelinin olması mühəndis komandlarının platformalar əvəzinə məhsullar ətrafında yaradılmasına imkan verdiyindən bu kompromisə getməyə dəyər.

### Tətbiq {#implementation}

Biz, mümkün olduğu qədər zərif API-lar təmin etməyə çalışırıq. Lakin, biz tətbiqin zərif olmasından narahat deyilik. Həqiqi dünya mükəmməl olmaqdan uzaqdır və istifadəçinin çirkli kodu yazmaması üçün biz bəzi hallarda kodu kitabxanada saxlamağa üstünlük veririk. Yeni kodu qiymətləndirdiyimiz zaman düzgün tətbiqinə, fəaliyyətinə və tərtibinin asanlığına baxırıq. Zəriflik ikincidir.

Ağıllı koddan çox darıxdırıcı koda üstünlük veririk. Kod birdəfəlik istifadə olunur və tez-tez dəyişir. Buna görə, kodda [tamamilə zəruri olmadığı təqdirdə yeni daxili abstraksiyaları təqdim etməmək vacibdir](https://youtu.be/4anAwXYqLG8?t=13m9s). Ətrafda asan hərəkət etdirilə bilən, dəyişdirlməsi və silməsi asan olan ətraflı kodu, vaxtından əvvəl abstraksiya edilmiş və dəyişdirilməsi çətin olan zərif koddan üstün tuturuq.

### Alətlər üçün Optimallaşdırma {#optimized-for-tooling}

Çox istifadə olunan bəzi API-ların uzun adları var. Məsələn, `didMount()` və ya `onMount()` əvəzinə `componentDidMount()` istifadə edirik. Bu [qəsdəndir](https://github.com/reactjs/react-future/issues/40#issuecomment-142442124). Məqsəd, kitabxananın qarşılıqlı əlaqə nöqtələrinə aydınlıq gətirməkdir.

Facebook kimi böyük kod bazasında müəyyən API-ların istifadəsini axtara bilmək çox vacibdir. Nadir hallarda istifadə edilməli olan müxtəlif uzun adları xüsusilə qiymətləndiririk. Məsələn, `dangerouslySetInnerHTML`-in nəzərdən qaçması çətindir.

Kritik dəyişikliklər etmək üçün [codemod skriptlərindən](https://www.youtube.com/watch?v=d0pOgY8__JM) asılı olduğumuzdan axtarışın optimallaşdırılması da vacibdir. Kod bazasında böyük, avtomatlaşdırılmış dəyişikliklərin asan və təhlükəsiz olmasını istəyirik və bənzərsiz uzun adlar buna kömək edir. Eynilə, bənzərsiz adlar React [istifadə qaydalarının](https://github.com/yannickcr/eslint-plugin-react) yazılmasını asanlaşdırır və potensial səhv pozitivləri aradan qaldırır.

[JSX](/docs/introducing-jsx.html) oxşar rol oynayır. React-in işləməsi üçün tələb olunmasa da, bunu həm estetik, həm də praqmatik səbəblərdən Facebook-da geniş istifadə edirik.

Kod bazamızda JSX, alətlərə React element ağacı ilə işlədiklərinin birmənalı işarəsini verir. Bu qurulma müddəti optimallaşdırmalara imkan verir. Məsələn, [sabit elementlərin qaldırılmasına](https://babeljs.io/docs/en/babel-plugin-transform-react-constant-elements/), istifadə qaydalarının və daxili codemod komponentinin istifadəsinə və [JSX mənbəyinin xəbərdarlıqlara daxil edilməsinə](https://github.com/facebook/react/pull/6771) imkan verir.

### Facebook-da React İstifadəsi {#dogfooding}

Cəmiyyətin qaldırdığı problemləri həll etmək üçün əlimizdən gələni edirik. Ancaq, Facebook-da qarşılaşdığımız problemlərə daha çox üstünlük veririk. Bəlkə də mənasız səslənə bilər, amma düşünürük ki, cəmiyyətin React-ə güvənməsinin əsas səbəbi budur.

İntensiv daxili istifadə, React-in sabah yox olmayacağına inam verir. Facebook-da problemləri həll etmək üçün React yaradıldı. Bu, şirkətə maddi iş dəyərini gətirir və bir çox məhsulunda istifadə olunur. [Məhsulumuzu istifadə etməmiz](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) layihə ilə bağlı görmə qabiliyyətimizi aydın və irəligörüşlü edir.

Bu, cəmiyyətin qaldırdığı məsələləri göz ardı edəcəyimiz demək deyil. Məsələn, React-ə [veb komponentlər](/docs/webcomponents.html) və [SVG](https://github.com/facebook/react/pull/6243) üçün dəstək əlavə etdik, baxmayaraq ki, onları daxili istifadə etmirik. [Problemlərinizi fəal şəkildə izləyirik](https://github.com/facebook/react/issues/2686) və əlimizdən gələni qədər [aradan qaldırırıq](/blog/2016/07/11/introducing-reacts-error-code-system.html). Cəmiyyət React-i bizim üçün xüsusi edən şeydir və biz də geri töhfə verməkdən şərəf duyuruq.

Facebook-da bir çox open source layihəni yayımlayaraq başa düşdük ki, eyni anda hamını xoşbəxt etmək cəhdi zəif inkişaf etmiş ümumi layihələrin yaranmasına səbəb olur. Əksinə, kiçik auditoriya seçib ona diqqəti yönəltməyin müsbət nəticə verdiyini gördük. React ilə etdiyimiz tam olaraq budur. Və bu günə qədər Facebook məhsul qruplarının qarşılaşdığı problemlərin həlli open source cəmiyyətinə yaxşı təsir bağışlayır.

Bu yanaşmanın mənfi tərəfi odur ki, bəzən Facebook komandaları ilə əlaqəli olmayan şeylərə, məsələn, "başlamaq" təcrübəsinə kifayət qədər diqqət ayırmırıq. Bunu yaxşı bilirik və əvvəllər open source layihələrində etdiyimiz səhvləri etmədən cəmiyyətdəki hər kəsə fayda gətirəcək şəkildə necə inkişaf edəcəyimizi düşünürük.

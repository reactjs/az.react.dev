---
id: concurrent-mode-intro
title: Konkurrent Moda Giriş (Eksperimental)
permalink: docs/concurrent-mode-intro.html
next: concurrent-mode-suspense.html
---

<style>
.scary > blockquote {
  background-color: rgba(237, 51, 21, 0.2);
  border-left-color: #ed3315;
}
</style>

<div class="scary">

>Xəbərdarlıq:
>
>Bu səhifədə **stabil buraxılışlarda [mövcud olmayan](/docs/concurrent-mode-adoption.html) eksperimental xüsusiyyətlərdən danışılır**. Produksiya applikasiyalarında eksperimental qurulmalardan istifadə etməyin. Buradakı xüsusiyyətlər React-in bir hissəsi olana kimi xəbərdarlıq verilmədən əhəmiyyətli dərəcədə dəyişilə bilər.
>
>Bu sənədlər erkən yoxlamaq istəyən və maraqlanan proqramçılar üçün yönəldilib. **Əgər React-ə yeni başlayırsınızsa, burada danışılan xüsusiyyətlərdən narahat olmayın** -- bu xüsusiyyətləri indi öyrənmək lazım deyil.

</div>

Bu səhifə Konkurrent Modunun nəzəri icmalını təqdim edir. **Daha praktik giriş üçün növbəti bölümləri nəzərdən keçirin:**

* [Məlumat Yüklənməsi üçün Suspense](/docs/concurrent-mode-suspense.html), React komponentlərində məlumat yükləmək üçün yeni bir mexanizmi təsvir edir.
* [Konkurrent UI Həlləri](/docs/concurrent-mode-patterns.html), Konkurrent Modu və Suspense ilə mümkün olan bəzi UI nümunələrini göstərir.
* [Konkurrent Rejiminə Uyğunlaşma](/docs/concurrent-mode-adoption.html), layihənizdə Konkurrent Modu necə sınaya biləcəyinizi izah edir.
* [Konkurrent Rejiminin API Arayışı](/docs/concurrent-mode-reference.html), eksperimental qurulmalarda mövcud olan yeni API sənədləridir.

## Konkurrent Modu Nədir? {#what-is-concurrent-mode}

Konkurrent Modu, React applikasiyalarına responsive qalmağa və istifadəçinin cihaz imkanlarına və şəbəkə sürətinə düzgün cavab verməyə kömək edən yeni xüsusiyyətlər toplusudur.

Bu xüsusiyyətlər hələ də eksperimentaldır və dəyişə bilərlər. Bunlar sabit React buraxılışının bir hissəsi deyillər və ancaq eksperimental qurulma ilə bunu sınamaq olar.

## Bloklama ilə Kəsilə Bilən Render Etmənin Müqayisəsi {#blocking-vs-interruptible-rendering}

**Konkurrent Modu izah etmək üçün versiya nəzarətini metafora kimi istifadə edəcəyik.** Bir komandada işləyirsinizsə, böyük ehtimal Git kimi bir versiya nəzarət sisteminə sahibsiniz və branch-lərdən istifadə edirsiniz. İşlədiyiniz branch hazır olduqda, işinizi əsas branch-ə (master) birləşdirə bilərsiniz və digər proqramçılar bunu pull edə bilərlər.

Versiya nəzarətinin mövcudluğundan əvvəl, işləmə axını çox fərqli idi. Branch anlayışı yox idi. Bəzi sənədləri redaktə etmək istədiyinizdə, hər kəsə işinizi qurtarana qədər həmin sənədlərə toxunmamasını deməliydiniz. Bir sənəddə kimsəylə eyni vaxtda işləyə bilməzdiniz, sözün əsl mənasında onlar tərəfindən **bloklana** bilərdiniz.

Bu, React daxil olmaqla, UI kitabxanalarının bu gün necə işlədiyini göstərir. Bunlar, yeni DOM nodunu yaratma və komponentlərin içərisindəki kodu işlətmə daxil olmaqla, bir yeniləməni render etməyə başladıqdan sonra bu işi dayandıra bilməzlər. Biz bu yanaşmanı "bloklayan render etmə" adlandıracağıq.

Konkurrent Modunda render etmə bloklanmır, kəsilə bilir. Bu istifadəçi təcrübəsini inkişaf etdirir və bundan əvvəl mümkün olmayan yeni xüsusiyyətlərə yol açır. [Növbəti](/docs/concurrent-mode-suspense.html) [bölümlərdəki](/docs/concurrent-mode-patterns.html) konkret nümunələrə baxmadan əvvəl yeni xüsusiyyətləri ümumi olaraq gözdən keçirdəcəyik.

### Kəsilə Bilən Render Etmə {#interruptible-rendering}

Filtrlənə bilən bir məhsul siyahısına təsvir edin. Siyahını filtr etmək üçün klaviatur düyməsinə basdığınızda kəkələmə effektini hiss etmisiniz? Çox güman ki, məhsul siyahısını yeniləmək üçün bəzi işlər qaçınılmaz olacaqdır. Məsələn, yeni DOM nodlarını yaratmaq və ya brauzer ilə elementləri yerləşdirmək. Ancaq bu işi nə *vaxt* və *necə* icra etdiyimiz böyük rol oynayır.

Kəkələmənin ümumi bir həll yolu girdini "debounce" etməkdir. Debounce etmə zamanı yalnız istifadəçi yazmağı dayandırdıqdan *sonra* siyahını yeniləyirik. Ancaq yazarkən UI yeniləməməsi bəzən məyusluğa səbəb ola bilər. Alternativ olaraq, girdini "throttle" edə bilərik və siyahını müəyyən bir maksimum tezliklə yeniləyə bilərik. Lakin daha zəif cihazlarda yenə də kəkələmə baş verəcək. Hər iki yanaşma, debounce və throttle etmə, standartdan aşağı istifadəçi təcrübəsi yaradır.

Kəkələmənin səbəbi sadədir, render etmə başladıqdan sonra onu kəsmək olmaz. Beləliklə, brauzer düyməni basdıqdan dərhal sonra mətn girişini yeniləyə bilmir. Bir UI kitabxanası (məsələn, React kimi) testlər zamanı nə qədər yaxşı görünürsə görünsün, render etmə zamanı bloklama istifadə edərsə, komponentlərinizdəki müəyyən bir iş həmişə kəkələnməyə səbəb olacaqdır. Və çox vaxt bunun asan bir həll yolu yoxdur.

**Konkurrent Modu bu təməl məhdudiyyəti kəsilə bilən render etmə ilə aradan qaldırır.** Bu o deməkdir ki, istifadəçi başqa bir düyməni basdıqda React brauzerin mətn girişini yeniləməsinə mane olmayacaqdır. Bunun əvəzinə, React brauzerin girişi yeniləməsinə icazə verə bilər və sonra yenilənmiş siyahını *yaddaşda* render etməyə davam edə bilər. Render etmə başa çatdıqda React DOM-u yeniləyir və dəyişikliklər ekranda əks olunur.

Fikir olaraq, React-in hər yeniləməni bir "branch"-də hazırladığını düşünə bilərsiniz. Branch-lərdə işdən imtina və ya onların arasında keçid edə bildiyiniz kimi, Konkurrent Modunda React daha vacib bir işi görmək üçün davam edən bir yeniləməni kəsə bilər və sonra əvvəl etdiyi işə qayıda bilər. Bu üsul, video oyunlarında [ikiqat buffer etməni](https://wiki.osdev.org/Double_Buffering) xatırlata bilər.

Konkurrent Modu üsulu UI-da debounce və throttle etmə ehtiyacını azaldır. Render etmə kəsilə bilən olduğu üçün, React kəkələmənin qarşısını almaq üçün işləri süni şəkildə *təxirə salmağa* ehtiyac duymur. Dərhal render etmə başlaya bilər, ancaq responsivliyə cavab vermək üçün lazım olduqda bu iş dayandırılır.

### Qəsdən Yükləmə Ardıcıllığı {#intentional-loading-sequences}

Bundan əvvəl dedik ki, Konkurrent Modu, "branch üzərində" işləmək kimi bir şeydir. Branch-lər yalnız qısamüddətli düzəlişlər üçün deyil, həm də uzun müddət xüsusiyyətlər üçün də faydalıdır. Bəzən bir xüsusiyyət üzərində işlədikdə master-ə merge ediləbilməsi üçün “kifayət qədər yaxşı vəziyyətdə” olması bir neçə həftə çəkə bilər. Versiya nəzarət sistemi metaforamızın bu tərəfi də render etməyə aiddir.

Bir applikasiyada iki ekran arasında naviqasiya etdiyimizi düşünün. Bəzən yeni ekranda istifadəçiyə "kifayət qədər yaxşı" yükləmə vəziyyətini göstərmək üçün yetəri qədər yüklənmiş koda və məlumata sahib olmaya bilər. Boş bir ekrana və ya böyük bir yükləmə hərəkətinə keçid təəccübləndirici ola bilər. Bununla yanaşı, çox vaxt lazımlı kodun və məlumatların yüklənməsi uzun çəkmir. **React köhnə ekranda bir az daha uzun qala bilsə və yeni ekranı nümayiş etdirmədən əvvəl "pis yükləmə vəziyyətini" "atsa", daha yaxşı olmazmı?**

Bunu etmək mümkün olsa da, təşkil etmək çətindir. Konkurrent Moduna bu xüsusiyyət daxildir. Əvvəlcə React yeni ekranı yaddaşda hazırlamağa başlayır - və ya metaforamızın dediyi kimi "fərqli bir branch-də". Beləliklə, React daha çox məzmun yükləyə bilməsi üçün DOM-u yeniləmədən əvvəl gözləyə bilər. Konkurrent Modunda React-ə köhnə ekranı tam interaktiv və yükləmə göstəricisi ilə göstərəcəyimizi deyə bilərik. Yeni ekran hazır olduqda React bizi buna apara bilər.

### Konkurrentlik {#concurrency}

Yuxarıdakı iki nümunəni nəzərdən keçirərək Konkurrent Modu bunları necə birləşdirdiyini görək. **Konkurrent Modunda React *eyni vaxtda* bir neçə state yeniləməsi üzərində işləyə bilər** - branch-lərin fərqli komanda üzvlərinin müstəqil işləməsinə imkan verdiyi kimi:

* CPU ilə əlaqəli yeniləmələr üçün (məsələn, DOM nodlarının yaradılması və komponent kodunun işlədilməsi kimi) konkurrentlik, daha vacib yeniləmənin başlamış render etməni "kəsə" biləcəyi deməkdir.

* IO ilə əlaqəli yeniləmələr üçün (məsələn, şəbəkədən kodu və ya məlumatı yükləmək kimi) konkurrentlik, bütün məlumatları yüklənmədən əvvəl React-in yaddaşda render etməyə başlaya biləcəyi və boş yükləmə vəziyyətlərinin atlatıla biləcəyi deməkdir.

Əhəmiyyətli olan React-in *istifadə* üsul eynidır. Komponentlər, state və proplar kimi anlayışlar eyni şəkildə işləyirlər. Ekranı yeniləmək istədikdə state-i dəyişirsiniz.

React yeniləmənin nə qədər "təcili" olduğuna qərar vermək üçün evristikadan istifadə edir və hər bir interaksiya üçün istədiyiniz istifadəçi təcrübəsini bir neçə kod sətri ilə düzəltməyə imkan verir.

## Tədqiqatı İstehsalata Qoymaq {#putting-research-into-production}

Konkurrent Modunun xüsusiyyətləri ətrafında ümumi bir mövzu var. **Bu mövzunun vəzifəsi İnsan-Kompüter İnteraksiya nəticələrini real UI-lara inteqrasiya etməyə köməkdir.**

Məsələn, tədqiqatlar göstərir ki, ekranlar arasında keçid zamanı çoxlu aralıq yükləmə vəziyyətinin göstərilməsi keçidin daha *yavaş* olduğunun hissiyatını verir. Buna görə Konkurrent Modu qəfil və çox tez-tez yenilənmələrin qarşısını almaq üçün yeni yükləmə vəziyyətlərini sabit  "cədvəldə" göstərir.

Eynilə, tədqiqatlardan bilirik ki, hover və mətn daxil etmə kimi inteqrasiyaların çox qısa bir müddət ərzində idarə edilməsi lazımdır, lakin klik və səhifə keçidləri gecikmə hissi vermədən bir az daha gözləyə bilərlər. Konkurrent Modunun daxildə istifadə etdiyi fərqli "prioritetlər", insanın qavrayış tədqiqatındakı inteqrasiya kateqoriyalarına uyğundur.

İstifadəçi təcrübəsinə güclü diqqət yetirən komandalar bəzən oxşar problemləri birdəfəlik həll yolu ilə həll edirlər. Lakin, bu həllərin saxlanılması çətin olduğundan nadirən uzun müddət qorunurlar. Konkurrent Modu ilə məqsədimiz UI tədqiqat nəticələrini abstraksiyanın özünə çevirmək və onlardan istifadə üçün idiomatik yollar təmin etməkdir. Bir UI kitabxanası olaraq React bunun üçün çox uyğun gəlir.

## Növbəti Addımlar {#next-steps}

İndi Konkurrent Modunun nə olduğunu bilirsiniz!

Növbəti səhifələrdə müəyyən mövzular haqqında daha çox məlumat əldə edəcəksiniz:

* [Məlumat Yüklənməsi üçün Suspense](/docs/concurrent-mode-suspense.html), React komponentlərində məlumat yükləmək üçün yeni bir mexanizmi təsvir edir.
* [Konkurrent UI Həlləri](/docs/concurrent-mode-patterns.html), Konkurrent Modu və Suspense ilə mümkün olan bəzi UI nümunələrini göstərir.
* [Konkurrent Rejiminə Uyğunlaşma](/docs/concurrent-mode-adoption.html), layihənizdə Konkurrent Modu necə sınaya biləcəyinizi izah edir.
* [Konkurrent Rejiminin API Arayışı](/docs/concurrent-mode-reference.html), eksperimental qurulmalarda mövcud olan yeni API sənədləridir.

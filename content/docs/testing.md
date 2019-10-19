---
id: testing
title: Test Etmənin İcmalı
permalink: docs/testing.html
redirect_from:
  - "community/testing.html"
next: testing-recipes.html
---

Digər JavaScript kodları test etdiyiniz kimi React komponentlərini test edə bilərsiniz.

React komponentlərini test etməyin bir neçə üsulu var. Geniş formada bu üsullar iki kateqoriyaya ayrılırlar:

* Sadə test mühitində **komponent ağaclarını test edərək** nəticənin təsdiq edilməsi.
* **Bütün applikasiyanın** real brauzer mühitində icra edilməsi (başqa adla “end-to-end” testləri).

Bu sənədlərdə ilk üsul üçün test strateqiyalarından danışacağıq. End-to-end testlərin möhüm iş axınlarında olan reqressiyalar üçün faydalı olmasına baxmayaraq bu testlər React testləri ilə maraqlanmırlar. Bu səbəbdən, end-to-end testlər bu bölmənin əhatə dairəsindən kənardadır.

### Kompromislər {#tradeoffs}

Test etmə alətlərini seçdikdə biz neçə kompromisdən fikirləşin:

* **İterasiya sürəti və ya real mühit:** Bəzi alətlər dəyişikliyin edilməsi və nəticənin görünməsini tezləşdirir, amma brauzer davranışlarını düzgün modelləşdirmir. Digər alətlər isə real brauzer mühitindən istifadə edir, amma iterasiya sürətini azaldır və davamlı inteqrasiya serverlərində problem yaradırlar.
* **Mokların həcmi:** Komponentlər ilə işlədikdə "vahid" (unit) və "inteqrasiya" testlərini tam ayırmaq çətinləşir. Əgər anket ilə işləyirsinizsə, anketin testi düymələri də yoxlamalıdır? Yoxsa düymə komponentinin öz test dəsti olmalıdır? Düyməni refaktorinq etdikdə anket testi sınmalıdır?

Fərqli komandalar və produktlar bu suallara fərqli cavablandırırlar.

### Tövsiyə Olunan Alətlər {#tools}

**[Jest](https://facebook.github.io/jest/)** JavaScript test icra edicisi [`jsdom`-dan](/docs/testing-environments.html#mocking-a-rendering-surface) istifadə edərək DOM-un istifadəsinə imkan yaradır. jsdom-un brauzerin təxmini simulyasiyası olmasına baxmayaraq React komponentlərini test etmək üçün bəs edir. Jest, sürətli iterasiya sürəti təmin edir. Əlavə olaraq, bu alətin [modulları](/docs/testing-environments.html#mocking-modules) və [taymerləri](/docs/testing-environments.html#mocking-timers) mok etmək kimi xüsusiyyətləri ilə kodun icrasını daha çox idarə etmək mümkündür.

**[React Testing Library](https://testing-library.com/react)**, React komponentlərini tətbiq detallarından asılı olmadan test etmək üçün köməkçi funksiyalar təmin edir. Bu yanaşma ilə refaktorinq çox asanlaşır və imkanlılıq üçün ən yaxşı praktikaların istifadə edilməsi məcbur olunur. Bu alətin, uşaqları render etmədən komponentlərin "dayaz" render edilməsi üçün heç bir yol təmin etmədiyinə baxmayaraq Jest kimi render icra edicisi ilə uşaq komponentləri [mok edərək](/docs/testing-recipes.html#mocking-modules) eyni nəticəyə çatmaq mümkündür.

### Daha Ətraflı {#learn-more}

Bu bölmə iki səhifəyə ayrılıb:

- [Reseptlər](/docs/testing-recipes.html): React komponentlərini test etmək üçün çox işlədilən üslublar.
- [Mühitlər](/docs/testing-environments.html): React komponentləri üçün test mühiti quraşdırdıqda nələrə fikir vermək.

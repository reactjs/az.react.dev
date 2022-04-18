---
id: testing-environments
title: Test Etmə Mühitləri
permalink: docs/testing-environments.html
prev: testing-recipes.html
---

<!-- This document is intended for folks who are comfortable with JavaScript, and have probably written tests with it. It acts as a reference for the differences in testing environments for React components, and how those differences affect the tests that they write. This document also assumes a slant towards web-based react-dom components, but has notes for other renderers. -->

Bu sənəddə mühitə təsir edə bilən amillərdən və bəzi ssenarilər üçün tövsiyələrdən danışacağıq.

### Test icra ediciləri {#test-runners}

[Jest](https://jestjs.io/), [mocha](https://mochajs.org/) və [ava](https://github.com/avajs/ava) kimi test işləyiciləri test dəstlərinin sadə JavaScript kimi yazılmasına və bu testlərin development prosesinin bir hissəsi kimi icra edilməsinə imkan yaradır. Əlavə olaraq, test dəstləri davamlı inteqrasiyanın bir hissəsi kimi icra oluna bilir.

- Jest test icra edicisi React layihələri ilə çox uyğundur. Bu alət ilə [modul](#mocking-modules) və [taymerlərin](#mocking-timers) mok edilməsi və [`jsdom`](#mocking-a-rendering-surface) kimi xüsusiyyətləri dəstəkləyir. **Create React App işlətdikdə [əlavə konfiqurasiya etmədən](https://facebook.github.io/create-react-app/docs/running-tests) Jest-dən istifadə edə bilərsiniz.**
- [mocha](https://mochajs.org/#running-mocha-in-the-browser) kimi kitabxanalar real brauzer mühitlərində yaxşı işləyir. Bu kitabxanalar əsl brauzer mühitindən asılı olan testlər üçün faydalı ola bilər.
- Bir neçə səhifə arasında olan axını test etmək üçün end-to-end testlər işlənilir. Bu testlər üçün [fərqli quraşdırma](#end-to-end-tests-aka-e2e-tests) lazımdır.

### Render sahəsinin mok edilməsi {#mocking-a-rendering-surface}

Adətən, testlər brauzer kimi real render sahəsi olmayan mühitlərdə icra olunurlar. Bu mühitlər üçün brauzeri [`jsdom`](https://github.com/jsdom/jsdom) (Node.js-də işləyən yüngül brauzer tətbiqi) ilə simulyasiya etməyi tövsiyə edirik.

Bir çox halda, jsdom normal brauzer kimi işləyir. Lakin, bu alətin [şablon və naviqasiya kimi](https://github.com/jsdom/jsdom#unimplemented-parts-of-the-web-platform) xüsusiyyətləri yoxdur. Buna baxmayaraq, bu alət ilə hər test üçün yeni brauzerin açılmasının lazım olmadığından əksər veb əsaslı komponentlərin test edilməsi sürətli olacaq. Əlavə olaraq, bu alətin testlər ilə eyni sistem prosesində işlədiyindən render olunan DOM-u yoxlayıb təsdiq edə bilərsiniz.

Real brauzerdə olduğu kimi jsdom ilə istifadəçi interaksiyalarını yoxlamaq mümkündür: testlər ilə hadisələri DOM nodlara göndərib bu hadisələrdən yaranan yan effektləri təsdiq edə bilirik [<small>(nümunə)</small>](/docs/testing-recipes.html#events).

UI testlərinin böyük hissəsi göstərilən formada yazıla bilər: Jest icra edicisindən istifadə edib `act()` köməkçisindən [<small>(nümunə)</small>](/docs/testing-recipes.html) istifadə edərək istifadəçi interaksiyalarını brauzer hadisələri kimi göndərib UI-ı jsdom-a render etmək.

Brauzer spesifik davranışları test edən və şablon və real daxil olmalar kimi nativ brauzer davranışlarından asılı olan kitabxana yazdıqda [mocha](https://mochajs.org/) kimi freymvorkdan istifadə edə bilərsiniz.

DOM-un simulyasiya _oluna bilmədiyi_ mühitdə (məsələn, Node.js-dən React Native komponentlərini test etdikdə) elementlər ilə interaksiyaları simulyasiya etmək üçün [hadisə simulyasiya köməkçilərindən](/docs/test-utils.html#simulate) istifadə edə bilərsiniz. Alternativ olaraq, [`@testing-library/react-native`](https://testing-library.com/docs/react-native-testing-library/intro) kitabxanasında olan `fireEvent` köməkçisindən istifadə edə bilərsiniz.

[End-to-end testləri](#end-to-end-tests-aka-e2e-tests) icra etmək üçün [Cypress](https://www.cypress.io/), [puppeteer](https://github.com/GoogleChrome/puppeteer) və [webdriver](https://www.seleniumhq.org/projects/webdriver/) alətləri faydalıdır.

### Funksiyaların mok edilməsi {#mocking-functions}

Testlər yazdıqda test mühitində ekvivalenti olmayan kod parçalarını mok etmək lazım ola bilər (məsələn, Node.js-də `navigator.onLine` statusu yoxlamaq kimi). Testlər ilə bəzi funksiyaları "spy" edib testin digər hissələrinin bu funksiyalar ilə necə işlədiyini müşahidə etmək mümkündür. Bu funksiyaları mok edərək test mühitinə uyğun versiyalarını düzəltmək faydalıdır.

Bu, xüsusilə məlumat yüklənməsi üçün faydalıdır. Real API nöqtələrindən məlumatların yüklənməsi testləri yavaşladır deyə testləri "saxta" məlumat ilə yazmaq daha sərfəlidir [<small>(nümunə)</small>](/docs/testing-recipes.html#data-fetching). Əlavə olaraq, saxta məlumat qəbul edən testləri proqnozlaşdırmaq asanlaşır. [Jest](https://jestjs.io/) və [sinon](https://sinonjs.org/) kimi kitabxanalar ilə funksiyaları mok etmək mümkündür. End-to-end testlərdə şəbəkəni mok etmək daha çətin olur. Lakin, bu testlərdə real API nöqtələrindən istifadə etmək daha faydalıdır.

### Modulların mok edilməsi {#mocking-modules}

Bəzi komponentlər test mühitində yaxşı işləməyən modullardan istifadə edə bilər və ya testlər üçün vacib olmaya bilərlər. Bu modulları uyğun əvəzetmələr ilə mok etmək faydalı ola bilər [<small>(nümunə)</small>](/docs/testing-recipes.html#mocking-modules).

Node.js-də Jest kimi icra edicilərdə [modulların mok edilməsi dəstəklənir](https://jestjs.io/docs/en/manual-mocks). Siz, həmçinin [`mock-require`](https://www.npmjs.com/package/mock-require) kimi kitabxanalardan istifadə edə bilərsiniz.

### Taymerlərin mok edilməsi {#mocking-timers}

Komponentlər `setTimeout`, `setInterval` və ya `Date.now` kimi funksiyalardan istifadə edə bilərlər. Test mühitlərində bu funksiyaları, zamanı əl ilə "qabağa çəkə bilən" əvəzetmələri ilə mok etmək faydalı ola bilər. Bu, testlərin tez işləməsinə imkan yaradır! Taymerlərdən asılı olan testlər eyni çağrılma sırasını qoruyaraq daha tez həll olunacaq [<small>(nümunə)</small>](/docs/testing-recipes.html#timers). [Jest](https://jestjs.io/docs/en/timer-mocks), [sinon](https://sinonjs.org/releases/v7.3.2/fake-timers/) və [lolex](https://github.com/sinonjs/lolex) kimi freymvorklar taymerləri mok etməyə imkan yaradır.

Bəzən, taymerləri mok etmək lazım olmaya bilər. Məsələn, bəzən animasiyaları və ya vaxta həssas olan (API sürəti məhdudlaşdırıcısı kimi) API nöqtələri ilə interaksiyaları test etikdə taymerlərin mok edilməsi faydasız ola bilər. Taymerləri mok edən kitabxanalar, mokları hər test/test dəsti üçün aktivləşdirməyə və ya ləğv etməyə imkan yaradır. Bu səbəbdən, siz hər testin necə işləyəcəyini idarə edə bilərsiniz.

### End-to-end testlər {#end-to-end-tests-aka-e2e-tests}

Biznesiniz üçün kritiki olan uzun axınları (məsələn, registrasiya və ya ödəmələr kimi) test etmək üçün end-to-end testlər faydalıdır. Bu testlərdə applikasiyanın brauzerdə render edilməsi, məlumatların real API-dan yüklənməsi, sessiya və kukilərdən istifadə və linklər arasında naviqasiyalar test edilir. Əlavə olaraq, DOM vəziyyəti üzərində iddialardan əlavə gələn məlumatlar (məsələn, yeniliklərin database-ə yazılmasının yoxlanılması) da test edilir.

<<<<<<< HEAD
Belə ssenarilər üçün [Cypress](https://www.cypress.io/) kimi freymvorklardan və ya [puppeteer](https://github.com/GoogleChrome/puppeteer) kimi kitabxanalardan istifadə edərək fərqli linklərə naviqasiya edib yalnız brauzer yan effektlərini yox, backend yan effektlərini də test edə bilərsiniz.
=======
In this scenario, you would use a framework like [Cypress](https://www.cypress.io/), [Playwright](https://playwright.dev) or a library like [Puppeteer](https://pptr.dev/) so you can navigate between multiple routes and assert on side effects not just in the browser, but potentially on the backend as well.
>>>>>>> 07dbd86ca421c262157af673a2584a40fd3b2450

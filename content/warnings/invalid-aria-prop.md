---
title: Etibarsız ARIA Propu Xəbərdarlığı
layout: single
permalink: warnings/invalid-aria-prop.html
---

DOM elementini Web Accessibility Initiative (WAI) Accessible Rich Internet Application (ARIA) [spesifikasiyasında](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties) olmayan aria-* propu ilə render etdikdə invalid-aria-prop xəbərdarlığı göstəriləcək.

1. Əgər etibarlı prop işlətdiyinizi fikirləşirsinizsə sözün hərflərlə tələffüzünə diqqət yetirin. Adətən, `aria-labelledby` və `aria-activedescendant` propları səhv tələffüz olunurlar.

<<<<<<< HEAD
2. Təyin edilən atributu React tanımır. Çox guman ki, bu atribut React-in gələcək versiyalarında əlavə ediləcək. Lakin, hal-hazırda React-in tanımadığı bütün atributlar silinir və render edilmir.
=======
2. React does not yet recognize the attribute you specified. This will likely be fixed in a future version of React.
>>>>>>> 5e9d673c6bc1530c901548c0b51af3ad3f91d594

---
title: Etibarsız ARIA Propu Xəbərdarlığı
layout: single
permalink: warnings/invalid-aria-prop.html
---

DOM elementini Web Accessibility Initiative (WAI) Accessible Rich Internet Application (ARIA) [spesifikasiyasında](https://www.w3.org/TR/wai-aria-1.1/#states_and_properties) olmayan aria-* propu ilə render etdikdə invalid-aria-prop xəbərdarlığı göstəriləcək.

1. Əgər etibarlı prop işlətdiyinizi fikirləşirsinizsə, sözün hərflərlə tələffüzünə diqqət yetirin. `aria-labelledby` və `aria-activedescendant` propları adətən səhv tələffüz olunurlar.

2. React göstərilən atributu tanımır. Çox guman ki, bu atribut React-in gələcək versiyalarında əlavə ediləcək. Lakin, hal hazırda React bütün tanınmayan atributları silir. Bu səbəbdən, bu atributlar React applikasiyasında render edilməyəcək.
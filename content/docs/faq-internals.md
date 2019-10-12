---
id: faq-internals
title: Virtual DOM və React-in Daxili
permalink: docs/faq-internals.html
layout: docs
category: FAQ
---

### Virtual DOM Nədir? {#what-is-the-virtual-dom}

UI-ın ideal və ya "virtual" təmsilinin yaddaşda saxlanılması və ReactDOM kimi kitabxananın bu strukturu "real" DOM ilə sinxronlaşdırılması konsepsiyası virtual DOM (VDOM) adlanır. Sinxronizasiya prosesi [rekonsilyasiya](/docs/reconciliation.html) adlanır.

Bu yanaşma, React-in deklarativ API olmasına imkan yaradır: React-də state yenilikləri baş verdikdə React, DOM-u state-ə uyğunlaşdırır. Bu, atribut manipulyasiyası, hadisə işləyiciləri, və DOM-un əl ilə yenilənməsi kimi əməliyyatları abstraktlaşdırır. Əks təqdirdə, bu əməliyyatları öz applikasiyanızda tətbiq etməlisiniz.

"Virtual DOM-un" spesifik texnologiya yox, daha çox pattern olmasına görə adamlar bu adı fərqli fikirləri izah etmək üçün işlədirlər. React dünyasında, "virtual DOM" terminologiyası [React elementləri](/docs/rendering-elements.html) ilə əlaqəlidir. Bunun səbəbi, React elementlərinin istifadəçi interfeysini təqdim etməsidir. Lakin, əlavə olaraq, React, komponent ağacı haqqında əlavə məlumat saxlamaq üçün "fiber" adlı daxili obyektlərdən istifadə edir. Bu obyektlər React-də "virtual DOM" tətbiqinin bir hissəsi kimi də qəbul edilə bilər.

### Shadow DOM Virtual DOM ilə Eynidir? {#is-the-shadow-dom-the-same-as-the-virtual-dom}

Yox, bunlar fərqli konsepsiyalardır. Shadow DOM, dəyişənlər və CSS-i veb komponentlərdə scope etmək üçün istifadə edilən brauzer texnologiyasıdır. Virtual DOM isə brauzer API-ları üzərində JavaScript kitabxanaları tərəfindən tətbiq edilmiş konsepsiyadır.

### "React Fiber" Nədir? {#what-is-react-fiber}

React 16-da işlədilən rekonsilyasiya mexanizminin adı Fiber-dir. Bu mexanizm virtual DOM-un inkremental render edilməsinə imkan yaradır. Əlavə məlumat üçün [bu linkə baxın](https://github.com/acdlite/react-fiber-architecture).

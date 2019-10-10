---
id: faq-internals
title: Virtual DOM və Daxili
permalink: docs/faq-internals.html
layout: docs
category: FAQ
---

### Virtual DOM Nədir? {#what-is-the-virtual-dom}

UI-ın ideal və ya "virtual" təmsilinin yaddaşda saxlanması və bu ReactDOM kimi kitabxananın bu strukturu "real" DOM ilə sinxronlaşdırılması konsepsiyası virtual DOM (VDOM) adlanır. Sinxronizasiya prosesi [rekonsilyasiya](/docs/reconciliation.html) adlanır.

Bu yanaşma React-in deklarativ API olmasına imkan yaradır: React-ə hansı state-in dəyişdiyini dedikdə React DOM-u state-ə uyğunlaşdırır. Bu, atribut manipulyasiyası, hadisə işləyiciləri, və DOM-un əl ilə yeniləməsi kimi əməliyyatları abstraktlaşdırır. Əks təqdirdə, siz bu əməliyyatları öz applikasiyanızda tətbiq etməlisiniz.

"virtual DOM-un" spesifik texnologiya yox, daha çox pattern olmasına görə adamlar bu adı fərqli fikirləri izah etmək işlədirlər. React dünyasınad, "virtual DOM" terminologiyası [React elementləri](/docs/rendering-elements.html) ilə əlaqəlidir. Bunun səbəbi, React elementlərinin istifadəçi interfeysini təqdim etməsidir. Lakin, əlavə olaraq, React komponent ağacı haqqında əlavə məlumat saxlamaq üçün "fiber" adlı daxili obyektlərdən istifadə edir. Bu obyektlər, React-də "virtual DOM" tətbiqinin bir hissəsi kimi də qəbul edilə bilər.

### Shadow DOM Virtual DOM ilə Eynidir? {#is-the-shadow-dom-the-same-as-the-virtual-dom}

Yox, bunlar fərqli konsepsiyalardır. Shadow DOM, dəyişənlədi və CSS-i veb komponentlərdə scope etmək üçün istifadə edilən brauzer texnologiyasıdır. Virtual DOM isə brauzer API-ları üzərində, JavaScript kitabxanaları tərəfindən tətbiq edilmiş konsepsiyadır.

### "React Fiber" Nədir? {#what-is-react-fiber}

React 16-də işlədilən rekonsilyasiyasiya mexanizminin adıdır. Bu mexanizmin əsas məqsədi, virtual DOM-un inkremental render edilməsinə imkan yaratmasıdır. Əlavə məlumat üçün [bu linkən baxın](https://github.com/acdlite/react-fiber-architecture).

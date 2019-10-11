---
id: faq-structure
title: Fayl Strukturu
permalink: docs/faq-structure.html
layout: docs
category: FAQ
---

### React layihələrini hansı formada struktur etmək tövsiyyə olunur? {#is-there-a-recommended-way-to-structure-react-projects}

React, faylları hansı direktoriyalara yerləşdirmək haqqında heç bir fikir daşımır. Lakin, ekosistemdə bir neçə populyar yanaşma var.

#### Xüsusiyyətlər və ya Naviqasiya əsasında Qruplamaq {#grouping-by-features-or-routes}

Layihələri struktur etməyin bir yolu CSS, JS və testləri xüsusiyyət və ya naviqasiya əsasında qruplaşmasıdır.

```
common/
  Avatar.js
  Avatar.css
  APIUtils.js
  APIUtils.test.js
feed/
  index.js
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  FeedAPI.js
profile/
  index.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
  ProfileAPI.js
```

"Xüsusiyyət" sözünün universal mənası yoxdur. Bu səbəbdən, xüsusiyyətin dərəcəsini seçmək sizdən asılıdır. Əgər yuxarı direktoriyalar siyahısını çıxara bilmirsinizsə, produkt istifadəçilərinə bu produktun hansı əsas hissələrdən ibarət olduğunu soruşa bilər və istifadəçilərin fikir modeli əsasında plan qura bilərsiniz.

#### Fayl Tipi əsasında Qruplamaq {#grouping-by-file-type}

Layihələri struktur etməyin başqa yolu oxşar faylları bir yerdə qrup etməkdir:

```
api/
  APIUtils.js
  APIUtils.test.js
  ProfileAPI.js
  UserAPI.js
components/
  Avatar.js
  Avatar.css
  Feed.js
  Feed.css
  FeedStory.js
  FeedStory.test.js
  Profile.js
  ProfileHeader.js
  ProfileHeader.css
```

Bəziləri daha dərinə gedərək applikasiyada rolundan asılı olaraq komponentləri fərqli direktoriyalara ayırırlar. Məsələn, [Atomik Dizayn](http://bradfrost.com/blog/post/atomic-web-design/) bu prinsip üzərində yaranmış metodologiyalardan biridir. Belə metodologiyaları sərt qanunlar kimi yox, faydarlı nümunələr kimi işlətməyin daha produktiv olduğunu unutmayın.

#### Çox iç-içə direktoriya yaratmaqdan çəkinin {#avoid-too-much-nesting}

JavaScript layihələrində dərin direktoriya strukturları yaratmağın çoxlu problemləri var. Dərin stukturlar olduqda fayllar arasında nisbi idxallar yazmaq və fayllar dəyişdikdə bu idxalları yeniləmək çətinləşir. Əgər sizdə dərin struktur etməyin səbəbi yoxdursa, bir layihədə üç-dört səviyyədən dərin direktoriya strukturları etməyin. Əlbəttə ki, bu bir tövsiyyədir və sizin layihənizə dəxli olmaya bilər.

#### Bu haqda çox fikirləşməyin {#dont-overthink-it}

Yeni layihə başlayırsınızsa, fayl strukturu seçməyə [beş dəqiqədən çox zaman ayırmayın](https://en.wikipedia.org/wiki/Analysis_paralysis). Yuxarıda göstərilən hər hansı bir yanaşmanı seçib (və ya öz strukturunuzu düzəldib) kod yazmağa başlayın! Böyük ehtimalla, real kod yazdıqdan sonra seçdiyiniz yanaşmanı dəyişmək istəyəcəksiniz.

Əgər bu seçimdə ilişmisinizsə, bütün faylları bir direktoriyada saxlayın. Vaxt keçdikcə, applikasiya böyüdükcə bəzi faylları ayırmaq istəyəcəksiniz. Bu zaman hansı faylları birlikdə redaktə etdiyiniz haqqında məlumatınız olacaq. Adətən, birlikdə çox dəyişən faylları bir birinə yaxın saxlamaq yaxşı fikirdir. Bu prinsipin adı "kolokasiyadır".

Layihələr böyüdükcə yuxarıdakı yanaşmaların bir neçəsinin kombinasiyasından istifadə edilir. Bu səbəbdən, əvvəldən düzgün yanaşma seçmək vacib deyil.

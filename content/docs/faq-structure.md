---
id: faq-structure
title: Fayl Strukturu
permalink: docs/faq-structure.html
layout: docs
category: FAQ
---

### React layihələrini hansı formada struktur etmək tövsiyə olunur? {#is-there-a-recommended-way-to-structure-react-projects}

React, faylları hansı direktoriyalara yerləşdirmək haqqında heç bir fikir daşımır. Lakin, ekosistemdə bir neçə populyar yanaşma var.

#### Xüsusiyyətlər və ya naviqasiyalar əsasında qruplamaq {#grouping-by-features-or-routes}

CSS, JS və testləri xüsusiyyət və ya naviqasiya əsasında qruplaşdıraraq layihələri struktur etmək populyar yanaşmalardan biridir.

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

"Xüsusiyyət" sözünün universal mənası yoxdur. Bu səbəbdən, xüsusiyyətin dərəcəsini seçmək sizdən asılıdır. Əgər üst direktoriyalar siyahısını çıxara bilmirsinizsə, məhsulun əsas hissələrini istifadəçilərdən soruşaraq istifadəçilərin fikir modeli əsasında plan qura bilərsiniz.

#### Fayl tipi əsasında qruplamaq {#grouping-by-file-type}

Oxşar faylları bir yerdə qruplaşdıraraq layihələri struktur etməyin başqa yoludur:

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

Bəzi proqramçılar daha dərinə gedərək applikasiyada olan roldan asılı olaraq komponentləri fərqli direktoriyalara ayırırlar. Məsələn, [Atomik Dizayn](http://bradfrost.com/blog/post/atomic-web-design/) bu prinsip üzərində yaranmış metodologiyalardan biridir. Belə metodologiyaları sərt qanunlar kimi yox, faydarlı nümunələr kimi işlətməyin daha produktiv olduğunu unutmayın.

#### Çox iç-içə direktoriya yaratmaqdan çəkinin {#avoid-too-much-nesting}

JavaScript layihələrində dərin direktoriya strukturları yaratmağın çoxlu problemləri var. Dərin strukturlar olduqda fayllar arasında nisbi idxallar yazmaq və fayllar köçürüldükdə bu idxalları yeniləmək çətinləşir. Əgər dərin struktur yaratmağın xüsusi səbəbi yoxdursa, strukturu üç-dört səviyyədən dərin etməkdən çəkinin. Əlbəttə ki, bu sadəcə bir tövsiyədir. Bu yanaşmanın sizin layihənizə dəxli olmaya bilər.

#### Bu haqda çox fikirləşməyin {#dont-overthink-it}

Yeni layihə başladıqda fayl strukturu seçməyə [beş dəqiqədən çox zaman ayırmayın](https://en.wikipedia.org/wiki/Analysis_paralysis). Yuxarıda göstərilən hər hansı bir yanaşmanı seçib (və ya öz strukturunuzu düzəldib) kod yazmağa başlayın! Böyük ehtimalla, real kod yazdıqdan sonra seçdiyiniz yanaşmanı dəyişmək istəyəcəksiniz.

Əgər seçim edə bilmirsinizsə, bütün faylları bir direktoriyada saxlayın. Vaxt keçdikcə, applikasiya böyüdükcə bəzi faylları ayırmaq istəyəcəksiniz. Bu zaman, hansı faylları birlikdə redaktə etdiyiniz haqqda məlumatınız olacaq. Adətən, birlikdə çox dəyişən faylları bir birinə yaxın saxlamaq yaxşı fikirdir. Bu prinsipin adı "kolokasiyadır".

Layihələr böyüdükcə yuxarıdakı yanaşmaların bir neçəsinin kombinasiyasından istifadə edilir. Bu səbəbdən, əvvəldən düzgün yanaşma seçmək vacib deyil.

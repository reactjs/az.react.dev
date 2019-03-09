---
id: forwarding-refs
title: Ref-lərin Yönləndirilməsi
permalink: docs/forwarding-refs.html
---

Ref-in yönləndirilməsi avtomatik [ref](/docs/refs-and-the-dom.html) komponentin içindən onun bir uşağına ötürülməsi texnikasıdır. Bu çox vaxt applikasiyadakı komponentlər üçün vacib deyil. Lakin, bu bəzi növ komponentlər üçün faydalı ola bilər, xüsusilə yenidən istifadə olunan komponent kitabxanalarında. Çox vaxt rast gələn ssenarilər aşağıda qeyd olunub.

## DOM komponentlərə ref-lərin yönləndirilməsi {#forwarding-refs-to-dom-components}

Təbii `button` DOM elementini render edən `FancyButton` komponentini nəzərə alın:
`embed:forwarding-refs/fancy-button-simple.js`

React komponentlərin tətbiq detallarını, əlavə olaraq onların render edilmiş nəticəsini gizlədir. Digər komponentlər `FancyButton` istifadə etməklə daxili `button` DOM elementi üçün [ref-i əldə etmək üçün](/docs/refs-and-the-dom.html) **adətən lazım deyil**. Bu yaxşıdır, çünki bu elementlərin bir-birinin DOM strukturlarından çox arxayın olmağı qarşısını alır.

Buna baxmayaraq, belə inkapsulyasiyası `FeedStory` və ya `Comment` kimi applikasiya-səviyyəli komponentlər üçün arzuolunandır, bu `FancyButton` və ya `MyTextInput`kimi yüksək dərəcəli yenidən istifadə edilə bilən "leaf" komponentlər üçün əlverişsiz ola bilər. Bu komponentlər applikasi boyunca bənzər bir şəkildə müntəzən DOM  button` və `input` kimi istifadə edilməyə meyillidir və onların DOM node-larına fokus, seçmə və ya animasiyalar üçün girişi qaçılmazdır.

**Ref-in yönləndirilməsi opt-in xüsusiyyətdir ki, bəzi komponentlərin qəbul etdikləri `ref`-i görürüb və daha aşağı (başqa sözlə "yönləndirir") uşağa ötürməyə icazə verir.**

Aşağıdakı nümunədə `FancyButton` ona ötürülmüş `ref`-i əldə etmək üçün `React.forwardRef` istifadə edir və sonra onu render edən DOM `button` yönləndirir:

`embed:forwarding-refs/fancy-button-simple-ref.js`

Bu yolla `FancyButton` istifadə edən komponentlər `button` DOM node-a ref-i əldə edə bilərlər və əgər ehhtiyac varsa daxil ola bilərlər-birdəfəlik DOM `button` istifadə edilən haldakı kimi.

Yuxarıdakı misalın addım-addım izahatına burada baxa bilərsiniz:

1. Biz `React.createRef` çağıraraq [React ref](/docs/refs-and-the-dom.html) yaradırıq və onu `ref` dəyişənə təyin edirik.
2. Biz `ref`-imizi `<FancyButton ref={ref}>` ötürərək, onu JSX atributu kimi təyin edirik.
3. React `ref`-i `(props, ref) => ...` funksiyasına ikinci arqument kimi `forwardRef` içində ötürür.
4. Biz bu `ref` arqumentini `<button ref={ref}>` ötürərək onu onu JSX atributu kimi təyin edirik. 
5. Nə vaxt ki, ref qoşulub, `ref.current` `<button>` DOM node-u göstərəcək. 

>Qeyd
>
>İkinci `ref` arqumenti yalnız siz komponenti `React.forwardRef` ilə çağırışı ilə təyin etdikdə mövcud olacaqdır. Müntəzəm funksiya və ya klas komponentləri `ref` arqumentini qəbul etmir və ref prop-larda da əlçatan deyil. 
>
>Ref-in yönləndirilməsi DOM komponentləri ilə limitli deyildir. Siz həmçinin ref-ləri klas komponentləri nümunələrinə yönləndir bilərsiniz. 

## Komponent Kitabxana saxlayıcıları üçün qeyd {#note-for-component-library-maintainers}

**Komponent kitabxanasında `forwardRef` istifadə etdikdə siz onu sına bilən dəyişkən kimi saxlamalı və öz kitabxananızın yeni böyük versiyasını yayımlanalısınız.** Bu çox gümanki sizin kitabxananızın gözlənilən fərqli  davranışı olduğu üçündür (hansı ref-lərin təyin edilldiyi, və hansı növlərin ixrac edildiri kimi) və bu keçmiş davranışdan asılı olan applikasiyaları və digər kitabxanaları sındıra bilər. 

Şərti şəkildə `React.forwardRef` mövcud olduqğu zaman tətbiq etmək bəzi səbəblərə görə məsləhət görülmür: bu sizin kitabxananızın davranışını dəyişir və React-in özünü apqreyd etdikdə sizin istifadəçilərinizin applikasiyaları sına bilər.

## Yüksək qaydada komponentlərdə ref-lərin yönləndirilməsi {#forwarding-refs-in-higher-order-components}

Bu metod [yüksək qaydada komponentlər](/docs/higher-order-components.html) (higher-order components və ya HOCs) ilə xüsusilə faydalı ola bilər. Gəlin konsola komponent prop-larını qeydiyyatını edən HOC-un misalı ilə başlayaq:
`embed:forwarding-refs/log-props-before.js`

"logProps" HOC bütün `props`-ı onu əhatə edən koponentdən keçirir, beləliklə render edilmiş nəticə eyni olacaq. Misal üçün, biz bu HOC-u bizim "fancy button" komponentimizə keçən bütün prop-ları qeydiyyata almaq üçün istifadə edə bilərik:
`embed:forwarding-refs/fancy-button.js`

Yuxarıdakı nümunədə bir xəbərdarlıq var: ref-lər ötməyəcəklər. Bunun səbəbi `ref`-in prop olmamağıdır. `key` kimi bu React-də fərqli işlənir. Əgər siz HOC-a ref əlavə etsəniz, ref əhatə olunmuş koponenti deyi, ən xarici konteyner komponentə müraciət edəcək.

Bu deməkdir ki, `FancyButton` komponentimiz üçün əzərdə tutulmuş ref-lər faktiki olaraq `LogProps` komponentinə qoşulacaq:
`embed:forwarding-refs/fancy-button-ref.js`

Xoşbəxtlikdən, biz  `React.forwardRef` API istifadə edərək açıq şəkildə ref-ləri `FancyButton` daxili komponentinə yönləndirə bilərik. `React.forwardRef` render funksiyasını qəbul edir hansı ki, `props` və `ref` parametrlərini qəbul edir (receive) və React node-u qaytarır. Məsələn:
`embed:forwarding-refs/log-props-after.js`

## DevTools-da xüsusi adların göstərilməsi {#displaying-a-custom-name-in-devtools}

`React.forwardRef` render funksiyasını qəbul edir. React DevTools bu funksiyanı ref-in yönləndirilməsi komponenti üçün nə göstərildiyini müəyyən etməsi üçün istifadə edir.

Misal üçün, növbəti komponent DevTools-da "*ForwardRef*" kimi görünəcək:

`embed:forwarding-refs/wrapped-component.js`

Əgər siz render funksiyasını adlandırsanız, DevTools da onun adını əlavə edəcək (məsələn "*ForwardRef(myFunction)*"):

`embed:forwarding-refs/wrapped-component-with-function-name.js`

Siz hətta funksiyaların `displayName` parametrlərini əhatə etdiyiniz komponenti daxil etmək üçün quraşdıra bilərsiniz:

`embed:forwarding-refs/customized-display-name.js`

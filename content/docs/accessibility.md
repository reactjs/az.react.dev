---
id: accessibility
title: İmkanlılıq
permalink: docs/accessibility.html
---

## Niyə İmkanlılıq?

Veb imkanlılığı (və ya [**a11y**](https://en.wiktionary.org/wiki/a11y)) hər kəs tərəfindən istifadə oluna biləcək dizayn edilmiş səhifə adlandırılır. İmkanlılıq dəstəyi köməkçi texnologiyaların interperasiyası üçün vacib amildir.

React daha çox standart HTML metodlarının istifadə etməklə hər kəs üçün imkanlı veb səhifə yaratmağı dəstəkləyir.

## Normativlər və Təlimatlar

### VKİT

[Veb Kontent İmkanlılıq Təlimatları](https://www.w3.org/WAI/intro/wcag) əsasında siz əlilliyi olan şəxslərin istifadə edəcəyi veb səhifə hazırlaya bilərsiniz. 

Aşağıdakı siyahılar VKİT haqqında icmalı təqdim edir:

- [Wuhcag tərəfində VKİT siyahısı](https://www.wuhcag.com/wcag-checklist/)
- [WebAIM tərəfində VKİT siyahısı](https://webaim.org/standards/wcag/checklist)
- [A11Y Layihəsi tərəfində VKİT siyahısı](https://a11yproject.com/checklist.html)

### VİT-İZİA

[Veb İmkanlılığı Təşəbbüsü - İmkanlı Zəngin İnternet Applikasiyaları](https://www.w3.org/WAI/intro/aria) (Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)) sənədinə tamamilə imkanlı JavaScript vicetlərini yaratmaq üçün metodlar daxildir.

Qeyd etmək lazımdır ki, bütün `aria-*` HTML atributları JSX-də dəstəklənir. React-də əksər DOM parametrlərinin və atributlarının camelCased olmasına baxmayaraq, `aria-*` atributları sadə HTML olduğundan mütləq şəkildə hyphen-cased (həmçinin kebab-cased, lisp-cased, və s. kimi tanınır) olmalıdırlar.

```javascript{3,4}
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

## Semantik HTML
Veb applikasiyasında imkanlılıq ideyasının əsasını Semantik HTML təşkil edir. Veb səhifədə imkanlılığı birdəfəlik yaradan amillərdən biri məlumatın mənasını gücləndirmək üçün müxtəlif HTML elementlərinin istifadəsidir.

- [MDN HTML elementlərinə istinad](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)


React kodunun işləməsi üçün biz JSX-ə `<div>` elementini əlavə etməklə, xüsusilə siyahı (`<ol>`, `<ul>` və `<dl>`) və HTML `<table>` istifadə edilən yerlərdə, bəzən HTML semantiklərini qırırıq. Bu halda biz çoxsaylı elementləri qruplaşdırmaq üçün [React Fraqmentlərini](/docs/fragments.html) istifadə etməliyik.

Məsələn,

```javascript{1,5,8}
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```

Siz başqa tip elementlərdəki kimi maddələr kolleksiyasını fraqmentlər massivi ilə uzlaşdıra bilərsiniz:

```javascript{6,9}
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Kolleksiyaları uzlaşdırarkən fraqmentlərin `key` propu olmalıdır
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

Alətləriniz dəstəklədiyi halda, Fraqment təqində heç bir parametrlərə ehtiyac olmadıqda [qısa sintaksisi](/docs/fragments.html#short-syntax) istifadə edə bilərsiniz:

```javascript{3,6}
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

Əlavə məlumat üçün [Fraqment sənədləşməsini](/docs/fragments.html) nəzərdən keçirin.

## İmkanlı Anketlər

### Markalanma
Hər bir HTML anket kontrolu, məsələn `<input>` və `<textarea>`, imkanlı şəkildə markalanmalıdır. Ekran oxucularına datəsvir edilməsi üçün biz təsviri markaları təmin etməliyik.

Aşağıdakı vəsaitlər bizə bunu necə etməyi göstərir:

- [W3C bizə elementlərin markalanmasını öyrədir](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAIM bizə elementlərin markalanmasını öyrədir](https://webaim.org/techniques/forms/controls)
- [Paciello Group imkanlı adları izah edir](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Bu standart HTML praktikalarının birbaşa React-də istifadə olunacağına baxmayaraq, `for` atributu JSX-də `htmlFor` kimi yazıldığını nəzərə alın:

```javascript{1}
<label htmlFor="namedInput">Ad:</label>
<input id="namedInput" type="text" name="name"/>
```

### İstifadəçiyə xətalar haqqında bildirilmək 

Xəta vəziyyəti hər bir istifadəçi üçün başa düşülən olmalıdır. Aşağıdakı linklər ekran oxucularına da xəta mətnlərinin necə ifşa edilə biləcəyini göstərir:

- [W3C istifadəçi bidirişlərini nümayiş edir](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM anket yoxlamasını nəzərdən keçirir](https://webaim.org/techniques/formvalidation/)

## Fokus Nəzarəti

Əmin olun ki, sizin veb applikasiyanız yalnız klaviatur ilə idarə oluna bilər:

- [WebAIM klaviatur imkanlılığı haqqında danışır](https://webaim.org/techniques/keyboard/)

### Klaviatur fokusu və fokus konturu

Klaviatur fokusu DOM-da yerləşən klaviaturdən daxiletməni qəbul etmək üçün seçilmiş cari elementə yönləndirilir. Aşağıdakı nümunədə göstərildiyi kimi biz hər yerdə fokus konturunu belə görürük:

<img src="../images/docs/keyboard-focus.png" alt="Seçilmiş link ətrafında mavi klaviatur fokus konturu." />

Bu konturu CSS (məsələn, `outline: 0` yazdıqda) ilə yalnız onu başqa bir fokusu göstərən tətbiq ilə əvəz edəcəyiniz halda silin.

### Lazım olan kontentə ötmək üçün mexanizmlər

Öz növbəsində applikasiyada klaviatur naviqasiyasına kömək etmək və sürətləndirmək üçün istifadəçilərə naviqasiya bölməsində ötmə mexanizmini təmin edin.

Skiplinks və ya Naviqasiya Ötmə Linkləri (Skip Navigation Links) yalnız klaviatur istifadəçiləri səhifə ilə qarşılıqlı təsirə girdikdə görünən gizli linklərdir. Onları daxili səhifə anker təqləri və bəzi stillər ilə tətbiq etmək çox asandır:

- [WebAIM - Naviqasiya Ötmə Linkləri](https://webaim.org/techniques/skipnav/)

Həmçinin, səhifənin sahələrini sərhədləmək üçün `<main>` və `<aside>` kimi istiqamət verən element və rolları istifadə edin. Beləki, köməkçi texnologiyalar istifadəçiyə həmin bölmələrə tez keçməyə imkan verir.

İmkanlılığı təkmilləşdirmək üçün bu elemetlərin istifadəsi haqqında ətraflı məlumat burada ala bilərsiniz:

- [Imkanlı Landmarklar](https://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Proqram yolu ilə fokusun idarə edilməsi 

Bizim React applikasiyalarımız icra müddətində davamlı şəkildə HTML DOM-u modifikasi edir, bəzən bu klaviatur fokusunun itməsi və ya gözlənilməz elementin keçməsinə gətirir. Bunu təmir etmək üçün biz proqram yolu ilə klaviatur fokusunu düzgün istiqamətdə dümsükləməliyik. Məsələn, modal pəncərə bağlandıqdan sonra klaviatur fokusu modal pəncərəni açan düyməyə geri qayıtmalıdır.

MDN Web Docs buna nəzər keçirib və bizim necə [Klaviatur ilə Naviqasiya oluna bilən JavaScript Vidcetləri](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets) yarada biləcəyimiz haqqında məlumat verir.

React-də fokus qurmaq üçün biz [Ref üçün DOM elementlərindən](/docs/refs-and-the-dom.html) istifadə edə bilərik.

Bunu istifadə etməklə biz ilk öncə JSX klas komponentində element üçün ref yaradırıq:

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // textInput DOM elementini saxlamaq üçün ref yaradın
    this.textInput = React.createRef();
  }
  render() {
  // instansiya sahə parametrində (məsələn, this.textInput) mətn daxiletmə DOM elementinin
  // referansı saxlamaq üçün `ref`-i istifadə edin.
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```

Daha sonra biz bunu komponentimizdə istənilər yerə fokus edə bilərik:

 ```javascript
 focus() {
   // İşlənməmiş DOM API-nı istifadə edərək mətn daxiletməsini aydın şəkildə fokuslayın
   // Qeyd: biz DOM node-u oxumaq üçün "current"-ə daxil oluruq 
   this.textInput.current.focus();
 }
 ```

Bəzən valideyn komponent fokusu uşaq komponentdəki elementə təyin etməlidir. Biz bunu uşaq komponentin [valideynin refini uşağın DOM noduna](/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components), valideyn komponentdən xüsusi prop vasitəsi ilə göndərərək DOM reflərini expose edə bilərik.

```javascript{4,12,16}
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}

// İndi siz lazım olduqda fokusu qura bilərsiz.
this.inputElement.current.focus();
```

Komponentləri genişləndirmək üçün HOC istifadə edərkən, React-in `forwardRef` funksiyasını istifadə edərək əhatə edən komponentə [ref-i yönləndirmək](/docs/forwarding-refs.html) məsləhət görülür. Əgər üçüncü tərəf HOC ref-i yonləndirmirsə, yuxarıdakı şablon hələdə alternativ plan kimi istifadə oluna bilər.

[React-aria-modal](https://github.com/davidtheclark/react-aria-modal) yaxşı fokus idarəçiliyin misalıdır. Bu tam imkanlı modal pəncərəsinin nisbətən nadir misalıdır. Bu, ilkin fokusu, ləğv etmə düyməsinin üzərinə fokuslamasından (klaviatur istifadəçisini təsadüfəni şəkildə uğurlu əməliyyatı aktivləşdirməyin qarşısını alır) və klaviatur fokusunun modalın daxilində tutmasından əlavə, həm də ilkin olaraq modalı açan elementə fokusu qaytarır.

>Qeyd:
>
>Bunun çox vacib imkanlılıq xüsusiyyəti olmasına baxmayaraq, bu həm də məntiqi şəkildə istifadə olunmalı texnologiyadır. Bu texnologiyanı istifadəçilərin applikasiyaları necə istifadə etmək istədiklərini əvvəlcədən bilmək üçün yox, klaviatur fokusunun axınını düzəltmək üçün istifadə edin. 

## Maus və kursor hadisələri

Əmin olun ki, bütün funksionallıq maus və ya kursor hadisəsi ilə göstərilib və yalnız klaviatur istifadə etməklə də giriş edilə bilər. Kursor cihazından asılı olaraq siz klaviatur istifadəçilərinin applikasiyanı istifadə edə bilməyəcəyi müxtəlif ssenarilərlə üzləşəcəksiniz.

Bunu təsvir etmək üçün gəlin tıklamaq hadisəsinin səbəb olduğu sınmış imkanlılığın məhsuldar misalına baxaq. Bu, istifadəçinin açılmış popoveri elementin xaricində tıklamaqla qeyri-aktiv edə bilən tıklamaq şablonunun xaricindədir.

<img src="../images/docs/outerclick-with-mouse.gif" alt="Kənara tıklamaq patternası ilə tətbiq olunmuş və maus ilə idarə olunan bağlama hərəkətinin işlədiyinin göstərməsi." />

Bu adətən `click` hadisəsini popoveri bağlayan `window` obyektinə qoşmaqla həyata keçirilir:

```javascript{12-14,26-30}
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Opsiya seçin</button>
        {this.state.isOpen ? (
          <ul>
            <li>Seçim 1</li>
            <li>Seçim 2</li>
            <li>Seçim 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

Bu kursor cihazı (məsələn, maus) olan istifadəçilər üçün yaxşı işləyə bilər, amma yalnız klaviatur ilə fəaliyyət göstərdikdə sınmış funksionallığa gətirir. Çünki növbəti elementə dəyişdikdə `window` obyekti heç vaxt `click` hadisəsini qəbul etmir. Bu istifadəçilərə sizin applikasiyanı istifadə etməyə qadağa edən, aydın olmayan funksionallığa gətirib çıxarır.

<img src="../images/docs/outerclick-with-keyboard.gif" alt="Kənara tıklamaq patternası ilə tətbiq olunmuş və klaviatur ilə idarə olunan popover siyahısını açan toggle düyməsinin popoverin blur zamanı bağlanmamasını və ekrandakı başqa elementlərin üstünü bağlamasını göstərməsi." />

<<<<<<< HEAD
Eyni funksionallıq `onBlur` və `onFocus` kimi uyğun hadisə işləyicisini istifadə etməklə əldə edilə bilər:
=======
The same functionality can be achieved by using appropriate event handlers instead, such as `onBlur` and `onFocus`:
>>>>>>> 2d9c2785dd9bd1d2876dd2c5b1e3bc233b115f3e

```javascript{19-29,31-34,37-38,40-41}
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // Biz popoveri növbəti tıklamada setTimeout istifadə etməklə bağlayırıq.
  // Bu vacibdir çunki biz ilk öncə yoxlamalıyıq ki, 
  // yayğın hadisə yeni fokus hadisəsindən öncə işə 
  // düşdüyü zaman elementin digər uşağın fokusunu qəbul etsin.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // Əgər uşaq fokusu qəbul edirsə popoveri bağlamayın.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React yayğın və fokus hadisələrini
    // valideyndə qabartmaqla bizə kömək edir.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Opsiyanı seçin
        </button>
        {this.state.isOpen ? (
          <ul>
            <li>Seçim 1</li>
            <li>Seçim 2</li>
            <li>Seçim 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```
Bu kod həm kursor cihazı, həm də klaviaturda işləyir. Həmçinin, ekran oxucusu istifadəçilərini dəstəkləmək üçün əlavə olunmuş `aria-*` proplarına diqqət yetirin. Sadəlik üçün popover opsiyasının qarşılıqlı təsiri olan `arrow key` aktivləşdirmək üçün klavitur hadisələri həyata keçirilmir.

<img src="../images/docs/blur-popover-close.gif" alt="Popover siyahısı həm maus ,həm də klaviatur istifadəçiləri üçün düzgün bağlanır." />

Bu yalnız kursor və maus hadisələrindən asılı olmağın klaviatur istifadəçiləri üçün funksionallığın sınmasına səbəb olacağını göstərən ssenarilərdən biridir. Həmişə klaviatur ilə test edərkən klaviatur xəbərdarlıq hadisələr işləyicilərinin köməkliyi ilə düzəldilə bilən problemlı sahələr dərhal üzə çıxaracaqdır.

## Daha Kompleks Vidcetlər

Daha kompleks istifadəçi təcrübəsi, daha az imkanlılıq demək deyil. Halbuki imkanlılıq ən rahatlıqla əldə etməyin yolu HTML-ə ən yaxın şəkildə kodlaşdırmaqdır, hətta ən kompleks vidcetlər imkanlı şəkildə kodlaşdırıla bilər. 

Burada biz [ARIA Rolları](https://www.w3.org/TR/wai-aria/#roles), eləcə də [ARIA Vəziyyətləri və Parametrləri](https://www.w3.org/TR/wai-aria/#states_and_properties) haqqında bilikləri tələb edirik. Yuxarıdakı xüsusiyyətlər JSX-də tamamilə dəstəklənən və bizə tamamilə imkanlı, yüksək funksional React komponentləri qurmağa imkan verən HTML atributları ilə doludur. 


Hər növ vidcetin xüsusi dizayn "patterni" var və bu vidcet növlərindən müəyyən bir şəkildə istifadəçilər və istifadəçi agentləri tərəfindən işləndiyi gözlənilir:

- [WAI-ARIA Yazma Təcrübələri - Pattern və Vidcetlərin Dizayn edilməsi](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA Nümunələri](https://heydonworks.com/practical_aria_examples/)
- [Inclusive Components](https://inclusive-components.design/)

## Nəzərə Alınmalı Digər Məqamlar

### Dilin təyin olunması

Ekran oxuyucularının düzgun səs xarakteristikalarını seçməsi üçün səhifə mətnlərinin dilini təyin edin:

- [WebAIM - Sənəd Dili](https://webaim.org/techniques/screenreader/#language)

### Sənədin başlığının təyin olunması

Cari səhifənin məzmununu düzgün təsvir etmək üçün sənədin `<title>` hissəsini düzgün təyin edin, belə ki bu istifadəçinin cari səhifənin məzmunu haqqında xəbərdar olduğunu təmin edir:

- [WCAG - Sənədin Başlığının tələblərinin Başa düşülməsi](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

Biz bunu React-də [React Sənəd Başlığı Komponentindən](https://github.com/gaearon/react-document-title) istifadə edərək qura bilərik.

### Rəng Kontrastı

Əmin olun ki, veb səhifənizdəki oxuna bilən bütün yazıları kifayət qədər rəng konstrastına malikdir ki, zəif görmə problemi olan istifadəçilər üçün maksimum oxuna biləndir:

- [WCAG - Rəng Kontrastı tələblərinin başa düşülməsi](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Rəng Kontrastı haqqında hər şey və niyə biz bu haqda yenidən düşünməliyik](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - Rəng Kontrastı nədir](https://a11yproject.com/posts/what-is-color-contrast/)

Sizə veb səhifənizdəki bütün mümkün hallarda düzgün rəng kombinasiyasını əllə hesablamaq yorucu ola bilər. Bunun əvəzinə siz [bütün imkanlı rəng paletini Colorable ilə hesablaya bilərsiniz](https://jxnblk.com/colorable/).

Aşağıda qeyd olunmuş aXe and WAVE alətlərinə rəng kontrastı testləri də daxil edir və bu testlər sizə kontrast xətalarından hesabat verir..

Əgər kontrast testləmə bacarıqlarını genişləndirmək istəyirsinizsə aşağıdakı alətləri istifadə edə bilərsiniz:

- [WebAIM - Rəng Kontrastı Yoxlayıcısı](https://webaim.org/resources/contrastchecker/)
- [The Paciello Group - Rəng Kontrastı Təhlil Edicisi](https://www.paciellogroup.com/resources/contrastanalyser/)

## Development və Test Etmə Alətləri

İmkanlı veb applikasiyaların yaradılmasına kömək etmək üçün istifadə edə biləcəyimiz çöxlu sayda alətlər var.

### Klaviatur

Test üçün ən asan və ən vacib xanalardan biri sizin bütün veb səhifəniz təkcə klaviatur ilə istifadə oluna bilməsidir. Siz bunu belə edə bilərsiz:

1. Mausunuzu çıxarın.
2. Baxmaq üçün `Tab` və `Shift+Tab` istifadə edin.
3. Elementləri aktivləşdirmək üçün `Enter` istifadə edin.
4. Lazım olan yerlərdə klaviaturun üzərində ox olan klavişin menus və dropdown kimi bəzi elementlər ilə qarşılıqlı əlaqəyə girməsi üçün istifadə edin.

### Development köməyi

Biz bəzi imkanlılıq xüsusiyyətlərinə birdəfəlik JSX kodumuzda baxa bilərik. Çox vaxt ARIA rolları, vəziyyəti və parametrləri JSX anlayan IDE-lərin "intellisense" yoxlamalarında göstərilir. Həmçinin biz aşağıdakı alətlərdən də istifadə edə bilərik:

#### eslint-plugin-jsx-a11y

ESLint plugini olan [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) sizin JSX-izdə imkanlılıqla bağlı problemlərlə əlaqədar AST linting rəyini təmin edir. Çoxlu IDE-lar sizi bu tapıntıları birdəfəlik kod analitikasında və mənbə kod pəncərəsində inteqrasiya etməyə icazə verir.

[Creat React App](https://github.com/facebookincubator/create-react-app)-də plugin bir hissəsi aktivləşdirilmiş qaydalar ilə mövcuddur. Əgər siz daha çox imkanlılıq qaydalarını açmaq istəyirsinizsə, siz layihənizin kökündə aşağıdakı kontent ilə `.eslintrc` faylı yarada bilərsiniz:

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### İmkanlılığın brauzerdə test edilməsi

Bir sıra əlatlər mövcuddur ki, sizin brauzerinizdə veb səhifələrin imkanlılıq auditlərini işlədə bilərsiniz.
Zəhmət olmasa, onları burada qeyd olunmuş digər imkanlılıq yoxlamaları ilə birlikdə istifadə edin, necə ki onlar yalnız sizin HTML-inizin texniki imkanlılığını yoxlaya bilirlər. 

#### aXe, aXe-core və react-axe

Deque Systems sizin applikasiyalarınızın avtomatlaşdırılmış və iki tərəfli açıq imkanlılıq testləri üçün [aXe-core](https://github.com/dequelabs/axe-core) təklif edir. Bu modul Selenium üçün inteqrasiyaları daxil edir.

[The Accessibility Engine](https://www.deque.com/products/axe/) və ya aXe, `aXe-core`-da qurulmuş imkanlılıq inspektoru brauzer proqram əlavəsidir.

Siz həmçinin development və debaqlaşdırma zamanı bu imkanlılıq tapıntılarını birdəfəlik konsula hesabat vermək üçün [react-axe](https://github.com/dylanb/react-axe) modulunu istifadə edə bilərsiniz.

#### WebAIM WAVE

[Veb İmkanlılıq Məlumat Qiymətləndirmə Aləti](https://wave.webaim.org/extension/) digər bir brauzer imkanlılıq proqram əlavəsidir.

#### İmkanlılıq daxiletmələri və İmkanlılıq Ağacı

[İmkanlılıq Ağacı](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) DOM ağacının bir hissəsidir ki, ekran oxucuları kimi köməkçi texnologiyalara göstərilməli hər bir DOM elementi üçün imkanlı obyektləri daxil edir.

Bəzi brauzerlərdə biz asanlıqla imkanlılıq ağacındakı hər bir element üçün imkanlılıq informasiyasına baxa bilərik:

- [Firefox-da İmkanlılıq İnspektorunun İstifadəsi](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Chrome-da İmkanlılıq İnspektorunun Aktivləşdirilməsi](https://gist.github.com/marcysutton/0a42f815878c159517a55e6652e3b23a)
- [OS X Safari-də İmkanlılıq İnspektorunun İstifadəsi](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Ekran Oxucuları

Ekran oxucusu ilə test etmək sizin imkanlılıq testlərinizə daxil olmalıdır.

Zəhmət olmasa nəzərə alın ki, brauzer / ekran oxucusu kombinasiyası vacibdir. Sizin applikasiyanızı ekran oxucusunun seçdiyi brauzer üzərindən yoxlamağınız tövsiyyə olunur.

### Tez-tez İstifadə olunan Ekran Oxucuları

#### Firefox-da NVDA

[NonVisual Desktop Access](https://www.nvaccess.org/) və ya NVDA geniş şəkildə istifadə olunan open source Windows-un oxucusudur.

NVDA-nı ən əlverişli üsulla istifadə etmək üçün təlimatlar aşağıdakı kimidir:

- [WebAIM - Veb İmkanlılığı hesablamaq üçün NVDA-nın istifadəsi](https://webaim.org/articles/nvda/)
- [Deque - NVDA Klaviatur qısayolları](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### Safari-də VoiceOver

VoiceOver Apple cihazlarında istifadə olunan inteqrasiya olunmuş ekran oxucusudur.

VoiceOver-in aktivləşdirilməsi və istifadəsi ilə bağlı təlimatlar aşağıdakı kimidir:

- [WebAIM - Veb İmkanlılığı hesablamaq üçün VoiceOver-in istifadəsi](https://webaim.org/articles/voiceover/)
- [Deque - OS X Klaviatur qısayolları üçün VoiceOver](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [Deque - iOS qısayolları üçün VoiceOver](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### Internet Explorer-də JAWS

[Job Access With Speech](https://www.freedomscientific.com/Products/software/JAWS/) və ya JAWS, Windows-da məhsuldar istifadə olunan ekran oxucusudur.

JAWS-ı ən əlverişli üsulla istifadə etmək üçün təlimatlar aşağıdakı kimidir:

- [WebAIM - Veb İmkanlılığı hesablamaq üçün JAWS-ın istifadəsi](https://webaim.org/articles/jaws/)
- [Deque - JAWS Klaviatur qısayolları](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### Digər Ekran Oxucuları

#### Google Chrome-da ChromeVox

[ChromeVox](https://www.chromevox.com/) Crome Books-a integrasiya olunmuş ekran oxucusudur və [proqram əlavəsi kimi](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) Google Chrome üçün mövcuddur.

ChromeVox-dan ən əlverişli üsulla istifadə etmək üçün təlimatlar aşağıdakı kimidir:

- [Google Chromebook Help - Qurulmuş Ekran Oxucusunun İstifadəsi](https://support.google.com/chromebook/answer/7031755?hl=en)
- [ChromeVox Klassik Klaviatur Qısayollarının istinadı](https://www.chromevox.com/keyboard_shortcuts.html)

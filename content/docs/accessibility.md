---
id: accessibility
title: İmkanlılıq
permalink: docs/accessibility.html
---

## Niyə İmkanlılıq?

Veb imkanlılığı ( və ya [**a11y**](https://en.wiktionary.org/wiki/a11y)) hər kəs tərəfindən istifadə oluna biləcək dizayn edilmiş sayt adlandırılır. İmkanlılıq dəstəyi köməkçi texnologiyaların interperasiyası üçün vacib amildir.

React daha çox standart HTML metodlarının istifadə etməklə hər kəs üçün imkanlı veb sayt yaratmağı dəstəkləyir.

## Normativlər və Təlimatlar

### VKİT

[Veb Kontent İmkanlılıq Təlimatları](https://www.w3.org/WAI/intro/wcag) əsasında siz əlilliyi olan şəxslərin istifadə edəcəyi veb site hazırlaya bilərsiniz. 

Aşağıdakı siyahılar VKİT haqqında icmal təqdim edir:

- [Wuhcag tərəfində VKİT siyahısı](https://www.wuhcag.com/wcag-checklist/)
- [WebAIM tərəfində VKİT siyahısı](http://webaim.org/standards/wcag/checklist)
- [A11Y Layihəsi tərəfində VKİT siyahısı](http://a11yproject.com/checklist.html)

### VİT-İZİA

[Veb İmkaqnlılığı Təşəbbüsü - İmkanlı Zəngin İnternet Applikasiyaları](https://www.w3.org/WAI/intro/aria) ( Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA)) sənədinə tamamilə imkanlı JavaScript vicetlərini yaratmaq üçün metodlar daxildir.

Qeyd etmək lazımdır ki, bütün `aria-*` HTML atributları JSX-də dəstəklənir. React-da əksər DOM paramertlərinin və atributlarının cameCased olmasına baxmayaraq, bu atributlar mütləq şəkildə sadə HTML-ə daxil olduqda hyphen-cased (həmçinin kebab-cased, lisp-cased, və s. kimi tanınır) olmalıdırlar.

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
Veb applikasiyasında imkanlılıq ideyasının əsasını Semantik HTML təşkil edir. Veb səhifədə imkanlılığı birdəfəlik yaradan amillərdən biri məlumatın mənasini gücləndirmək üçün müxtəlif HTML elementlərinin istifadəsidir.

- [MDN HTML elementlərinə istinad](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

React kodun işləməsi üçün biz JSX-ə `<div>` elementini əlavə etməklə, xüsusilə siyahı (`<ol>`, `<ul>` və `<dl>`) və HTML `<table>` istifadə edərkən, bəzən biz HTML semantiklərini kəsirik.

Bu halda biz çoxsaylı elementləri qruplaşdırmaq üçün [React Fraqmentlərini](/docs/fragments.html) istifadə etməliyik.

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
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

Alətləriniz dəstəklədiyi halda, Fraqment təqində heç bir parametrlərə ehtiyac olmadıqda isə [qısa sintaksis](/docs/fragments.html#short-syntax) istifadə edə bilərsiniz:

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

Əlavə məlumat üçün [Fraqmen sənədləşməsini](/docs/fragments.html) nəzərdən keçirin.

## İmkanlı Anketlər

### Markalanma
Hər bir HTML anket kontrolu, məsələn `<input>` və `<textarea>`, imkanlı şəkildə markalanmalıdır. Biz təsviri markaları təmin etməliyik hansı ki, ekran oxucularına da təsvir edilir.

Aşağıdakı vəsaitlər bizə bunu necə etməyi göstərir:

- [W3C bizə elementlərin markalanmasını öyrədir](https://www.w3.org/WAI/tutorials/forms/labels/)
- [WebAIM bizə elementlərin markalanmasını öyrədir](http://webaim.org/techniques/forms/controls)
- [Paciello Grup imkanlı adları izah edir](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

Bu standart HTML praktikalarının birbaşa React-da istifadə olunacağına baxmayaraq, `for` atributu JSX-də `htmlFor` kimi yazıldığını nəzərə alın:

```javascript{1}
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

### İstifadəçiyə xətalar barəsində bildirilməsi 

Xəta vəziyyəti hər bir istifadəçi üçün başa düşülən olmalıdır. Aşağıdakı link ekran oxucularına da xəta mətnlərinin necə ifşa edilə biləcəyini göstərir:

- [W3C istifadəçi bidirişlərini nüayiş edir](https://www.w3.org/WAI/tutorials/forms/notifications/)
- [WebAIM anket yoxlamasını nəzərdən keçirir](http://webaim.org/techniques/formvalidation/)

## Fokus Nəzarəti

Əmin olun ki, sizin veb applikasiyanız yalnız klaviatur ilə idarə oluna bilir:

- [WebAIM klaviatur imkanlılığı haqqında danışır](http://webaim.org/techniques/keyboard/)

### Klaviatur fokusu və fokus konturu

Klaviatur fokusu DOM-da yerləşən cari elementə yönləndirilir hansı ki, klaviaturdən daxiletməni qəbul etməsi üçün seçilmişdir. Aşağıdakı nümunədə göstərildiyi kimi biz hər herdə fokus konturu belə görürük:

<img src="../images/docs/keyboard-focus.png" alt="Blue keyboard focus outline around a selected link." />

Bu konturu CSS (məsələn `outline: 0` yazdıqda) ilə yalnız onu başqa bir fokusu göstərən tətbiq (implementation) ilə əvəz edəcəyiniz halda silin.

### Lazım olan kontentə ötmək üçün mexanizmlər

Öz növbəsində applikasiyada klaviatura naviqasiyasına kömək edib və sürətləndirmək üçün istifadəçilərə naviqasiya bölməsini ötmə mexanizmini təmin edin.

Skiplinks və ya Naviqasiya Ötmə Linkləri (Skip Navigation Links) gizli linkləridir ki, yalnız klaviatura istifadəçiləri səhifə ilə qarşılıqlı təsirə girdikdə görünür. Onları daxili sahifə anker təqləri və bəzi üslübları tətbiq etmək çox asandı:

- [WebAIM - Naviqasiya Ötmə Linkləri](http://webaim.org/techniques/skipnav/)

Həmçinin  səhifənin sahələrini sərhədləmək üçün `<main>` və `<aside>` kimi istiqamət verən element və rolları istifadə edin. Beləki, köməkçi texnologiyalar istifadəçiyə həmin bölmələrə tez hərəkət etməyə imkan verir.

İmkanlılığı təkmilləşdirmək üçün bu elemetlərin istifadəsi haqqında ətraflı məlumat burada:

- [Accessible Landmarks](http://www.scottohara.me/blog/2018/03/03/landmarks.html)

### Proqram yolu ilə fokusun idarə edilməsi 

Bizim React applikasiyalarımız runtime müddətində davamlı şəkildə HTML DOM-u modifikasi edir, bəzən bu klaviatur fokusunun itməsi və ya gözlənilməz elementin qurulmasına gətirir. Bunu təmir etmək üçün biz proqram yolu ilə klaviatur fokusunu düzgün istiqamətdə dümsükləməliyik. Məsələn, klaviatur fokusunu modal pəncərəni açan düymə ilə geri qaytardıqdan sonra modal pəncərə bağlanır.

MDN Web Docs buna nəzər salır və bizim necə [Klaviatur ilə Naviqasiya oluna bilən JavaScript Vidcetləri](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets) yarada biləcəyimizi təsvir edir.

Fokusu React üzərinə qurmaq üçün biz [Ref üçün DOM elementləri](/docs/refs-and-the-dom.html) istifadə edə bilərik.

Bunu istifadə etməklə biz ilk öncə JSX komponent klassında element üçün ref yaradırıq:

```javascript{4-5,8-9,13}
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Create a ref to store the textInput DOM element
    this.textInput = React.createRef();
  }
  render() {
  // Use the `ref` callback to store a reference to the text input DOM
  // element in an instance field (for example, this.textInput).
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
   // Explicitly focus the text input using the raw DOM API
   // Note: we're accessing "current" to get the DOM node
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

// Now you can set focus when required.
this.inputElement.current.focus();
```

Komponentləri genişləndirmək üçün HOC istifadə edərkən, React-in `forwardRef` funksiyasını istifadə edərək əhatə edən komponentə [ref-i yönləndirmək](/docs/forwarding-refs.html)məsləhət görülür. Əgər üçüncü tərəf HOC-u ref-i yonləndirmirsə, yuxarıdakı şablon hələdə alternativ plan kimi istifadə oluna bilər.

[React-aria-modal](https://github.com/davidtheclark/react-aria-modal) yaxşı fokus idarəçilik misalıdır. Bu tam rabitəli imkanlı modal pəncərənin nisbətən nadir misalıdır. Bu yalnız ilkin fokusu ləğv etmə düyməsinin üzərinə fokuslayır (klaviatur istifadəçisini təsadüfəni şəkildə uğurlu əməliyyatı aktivləşdirməyin qarşısını alır) və klaviatur fokusunu modalın daxilində tutur, həm də ilkin olaraq modalı açan elementə fokusu sıfırlayır.

>Qeyd:
>
>Halbuki bu çox vacib imkanlılıq xüsusiyyətidir, bu həm də məntiqi şəkildə istifadə olunmalı texnologiyadır. Bu texnologiyanı klaviatur fokusunun axininin düzəltmək üçün istifadə edin, istifadəçilərin applikasiyaları necə istifadə etək istədiklərini yoxlamaq və əvvəlcədən bilmək üçün yox.

## Maus və kursor hadisələri

Əmin olun ki, bütün funksionallıq maus və ya kursor hadisəsi ilə göstərilib və yalnız klaviatur istifadə etməklə də giriş edilə bilər. Kursor cihazından asılı olaraq siz müxtəlif ssenarilərlə üzləşəcəksiz harada ki klaviatur istifadəçiləri applikasiyanı istifadə edə bilməyəcəklər.

Bunu təsvir etmək üçün gəlin  tıklamaq hadisəsinin səbə olduğu sınmış imkanlılığın məhsuldar misalına baxaq. Bu tıklamaq şablonunun xaricindədir, hardakı istifadəçi açılmış popover-i elementin xaricində tıklamaqla qeyri-aktiv edə bilər.

<img src="../images/docs/outerclick-with-mouse.gif" alt="A toggle button opening a popover list implemented with the click outside pattern and operated with a mouse showing that the close action works." />

Bu adətən `click` hadisəsini popover-i bağlayan `window` obyektinə qoşmaqla həyata keçirilir:

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
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

Bu kursor cihazı (məsələn, maus) olan istifadəçilər üçün yaxşı işləyə bilər, amma yalnız klaviatur ilə fəaliyyət göstərmək sınmiş funksionallığa gətirir. Bu da növbəti elementə dəyişdikdə `window` obyekti heç vaxt `click` hadisəsini qəbul etmir. Bu aydın olmayan funksionallığı agətirib çıxarır hansı ki istifadəçilərə sizin applikasiyanı istifadə etməyə qadağa edir.

<img src="../images/docs/outerclick-with-keyboard.gif" alt="A toggle button opening a popover list implemented with the click outside pattern and operated with the keyboard showing the popover not being closed on blur and it obscuring other screen elements." />

Eyni funksionallıq `onBlur` və `onFocus` kimi uyğun hadisə işləyicisini istifadə etməklə əldə edilə bilər:

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

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React assists us by bubbling the blur and
    // focus events to the parent.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>
        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```
Bu kod həm kursor cihazı, həm də klaviatur istifadəçiləri üçün funksionallığı göstərir. Həmçinin, ekran oxucusu istifadəçilərini dəstəkləmək üçün əlavə olunmuş `aria-*` prop-larına diqqət yetirin. Sadəlik üçün popover opsiyasının qarşılıqlı təsiri olan `arrow key` aktivləşdirmək üçün klavitur hadisələri həyata keçirilmir.

<img src="../images/docs/blur-popover-close.gif" alt="A popover list correctly closing for both mouse and keyboard users." />

Bu yalnız kursor və maus hadisələrindən asılı olmağın klaviatur istifadəçiləri üçün funksionallığın sınmasına səbəb olacağını göstərən ssenarilərdən biridir. Həmişə klaviatur ilə test edərkən problemlı sahələri dərhal üzə çıxaracaq, hansılar ki klaviatur xəbərdarlıq hadisələr işləyicilərinin köməkliyi ilə düzəldilə bilər.

## Daha Kompleks Vidcetlər

Daha kompleks istifadəçi təcrübəsi, daha az amkanlılıq demək deyil. Halbuki imkanlılıq ən rahatlıqla əldə etməyin yolu HTML-ə ən yaxın şəkildə kodlaşdırmaqdır, hətta ən kompleks vidcetlər imkanlı şəkildə kodlaşdırıla bilər. 

Burada biz [ARIA Rolları](https://www.w3.org/TR/wai-aria/#roles), eləcə də [ARIA Vəziyyətləri və Parametrləri](https://www.w3.org/TR/wai-aria/#states_and_properties) haqqında bilikləri tələb edirik. 

Yuxarıdakı xüsusiyyətlər HTML atributları ilə doludur, hansı ki JSX-də tamamilə dəstəklənir və bizə tamamilə imkanlı, yüksək funksional React komponentləri qurmağa imkan verir.

Hər bir növ vidcetlər xüsusi dizayn "patterni" var və müəyyən bir şəkildə istifadəçilər və istifadəçi agentləri tərəfindən işlədiyi gözlənilir:

- [WAI-ARIA Yazma Təcrübələri - Pattern və Vidcetlərin Dizayn ediləsi](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
- [Heydon Pickering - ARIA Nümunələri](http://heydonworks.com/practical_aria_examples/)
- [Inclusive Components](https://inclusive-components.design/)

## Nəzərə Alınmalı Digər Məqamlar

### Dilin təyin olunması

Indicate the human language of page texts as screen reader software uses this to select the correct voice settings:

- [WebAIM - Document Language](http://webaim.org/techniques/screenreader/#language)

### Sənədin başlığının təyin olunması

Cari səhifənin məzmuunu düzgün təsvir etmək üçün sənədin `<title>` hissəsini düzgün təyin edin, belə ki bu istifadəçinin cari səhifənin məzmunu haqqında xəbərdar olduğuna təmin edir:

- [WCAG - Sənədin Başlığının tələblərinin Başa düşülməsi](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-title.html)

Biz bunu React-da [React Sənəd Başlığı Komponenti](https://github.com/gaearon/react-document-title) istifadə edərək qura bilərik.

### Rəng Kontrastı

Əmin olun ki, ver səhifənizdəki  oxuna bilən bütün yazıların kifayət qədər rəng k 

Ensure that all readable text on your website has sufficient color contrast to remain maximally readable by users with low vision:

- [WCAG - Understanding the Color Contrast Requirement](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
- [Everything About Color Contrast And Why You Should Rethink It](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/)
- [A11yProject - What is Color Contrast](http://a11yproject.com/posts/what-is-color-contrast/)

It can be tedious to manually calculate the proper color combinations for all cases in your website so instead, you can [calculate an entire accessible color palette with Colorable](http://jxnblk.com/colorable/).

Both the aXe and WAVE tools mentioned below also include color contrast tests and will report on contrast errors.

If you want to extend your contrast testing abilities you can use these tools:

- [WebAIM - Color Contrast Checker](http://webaim.org/resources/contrastchecker/)
- [The Paciello Group - Color Contrast Analyzer](https://www.paciellogroup.com/resources/contrastanalyser/)

## Development and Testing Tools

There are a number of tools we can use to assist in the creation of accessible web applications.

### The keyboard

By far the easiest and also one of the most important checks is to test if your entire website can be reached and used with the keyboard alone. Do this by:

1. Plugging out your mouse.
1. Using `Tab` and `Shift+Tab` to browse.
1. Using `Enter` to activate elements.
1. Where required, using your keyboard arrow keys to interact with some elements, such as menus and dropdowns.

### Development assistance

We can check some accessibility features directly in our JSX code. Often intellisense checks are already provided in JSX aware IDE's for the ARIA roles, states and properties. We also
have access to the following tool:

#### eslint-plugin-jsx-a11y

The [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y) plugin for ESLint provides AST linting feedback regarding accessibility issues in your JSX. Many
IDE's allow you to integrate these findings directly into code analysis and source code windows.

[Create React App](https://github.com/facebookincubator/create-react-app) has this plugin with a subset of rules activated. If you want to enable even more accessibility rules,
you can create an `.eslintrc` file in the root of your project with this content:

  ```json
  {
    "extends": ["react-app", "plugin:jsx-a11y/recommended"],
    "plugins": ["jsx-a11y"]
  }
  ```

### Testing accessibility in the browser

A number of tools exist that can run accessibility audits on web pages in your browser. Please use them in combination with other accessibility checks mentioned here as they can only
test the technical accessibility of your HTML.

#### aXe, aXe-core and react-axe

Deque Systems offers [aXe-core](https://github.com/dequelabs/axe-core) for automated and end-to-end accessibility tests of your applications. This module includes integrations for Selenium.

[The Accessibility Engine](https://www.deque.com/products/axe/) or aXe, is an accessibility inspector browser extension built on `aXe-core`.

You can also use the [react-axe](https://github.com/dylanb/react-axe) module to report these accessibility findings directly to the console while developing and debugging.

#### WebAIM WAVE

The [Web Accessibility Evaluation Tool](http://wave.webaim.org/extension/) is another accessibility browser extension.

#### Accessibility inspectors and the Accessibility Tree

[The Accessibility Tree](https://www.paciellogroup.com/blog/2015/01/the-browser-accessibility-tree/) is a subset of the DOM tree that contains accessible objects for every DOM element that should be exposed
to assistive technology, such as screen readers.

In some browsers we can easily view the accessibility information for each element in the accessibility tree:

- [Using the Accessibility Inspector in Firefox](https://developer.mozilla.org/en-US/docs/Tools/Accessibility_inspector)
- [Activate the Accessibility Inspector in Chrome](https://gist.github.com/marcysutton/0a42f815878c159517a55e6652e3b23a)
- [Using the Accessibility Inspector in OS X Safari](https://developer.apple.com/library/content/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)

### Screen readers

Testing with a screen reader should form part of your accessibility tests.

Please note that browser / screen reader combinations matter. It is recommended that you test your application in the browser best suited to your screen reader of choice.

### Commonly Used Screen Readers

#### NVDA in Firefox

[NonVisual Desktop Access](https://www.nvaccess.org/) or NVDA is an open source Windows screen reader that is widely used.

Refer to the following guides on how to best use NVDA:

- [WebAIM - Using NVDA to Evaluate Web Accessibility](http://webaim.org/articles/nvda/)
- [Deque - NVDA Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/nvda-keyboard-shortcuts)

#### VoiceOver in Safari

VoiceOver is an integrated screen reader on Apple devices.

Refer to the following guides on how activate and use VoiceOver:

- [WebAIM - Using VoiceOver to Evaluate Web Accessibility](http://webaim.org/articles/voiceover/)
- [Deque - VoiceOver for OS X Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts)
- [Deque - VoiceOver for iOS Shortcuts](https://dequeuniversity.com/screenreaders/voiceover-ios-shortcuts)

#### JAWS in Internet Explorer

[Job Access With Speech](http://www.freedomscientific.com/Products/Blindness/JAWS) or JAWS, is a prolifically used screen reader on Windows.

Refer to the following guides on how to best use JAWS:

- [WebAIM - Using JAWS to Evaluate Web Accessibility](http://webaim.org/articles/jaws/)
- [Deque - JAWS Keyboard Shortcuts](https://dequeuniversity.com/screenreaders/jaws-keyboard-shortcuts)

### Digər Ekran Oxucuları

#### Google Chrome-da ChromeVox

[ChromeVox](http://www.chromevox.com/) Crome books-a integrasiya olunmuş ekran oxucusudur və is an integrated screen reader on Chromebooks and is available [as an extension](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=en) for Google Chrome.

Refer to the following guides on how best to use ChromeVox:

- [Google Chromebook Help - Use the Built-in Screen Reader](https://support.google.com/chromebook/answer/7031755?hl=en)
- [ChromeVox Classic Keyboard Shortcuts Reference](http://www.chromevox.com/keyboard_shortcuts.html)

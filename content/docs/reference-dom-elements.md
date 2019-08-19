---
id: dom-elements
title: DOM Elementləri
layout: docs
category: Reference
permalink: docs/dom-elements.html
redirect_from:
  - "docs/tags-and-attributes.html"
  - "docs/dom-differences.html"
  - "docs/special-non-dom-attributes.html"
  - "docs/class-name-manipulation.html"
  - "tips/inline-styles.html"
  - "tips/style-props-value-px.html"
  - "tips/dangerously-set-inner-html.html"
---

Performans üçün və brauzerlər arası uyğunluqlar üçün React brauzerdən müstəqil DOM sistemi tətbiq edir. Biz bu fürsətdən istifadə edərək brauzer DOM-unun tətbiqində olan bəzi problemləri düzəltdik.

React-də bütün DOM parametrləri və atributları (hadisə işləyiciləri daxil olmaqla) camelCase formatında olmalıdır. Məsələn `tabindex` HTML atributu React-də `tabIndex` atributuna uyğun gəlir. İstisnalar `aria-*` və `data-*` atributlarıdır: bu atributlar kiçik hərf ilə yazılmalıdır. Məsələn, siz `aria-label` atributunu `aria-label` kimi saxlaya bilərsiniz.

## Atributlar arasında Fərqlər {#differences-in-attributes}

Bir neçə atributun işləməsi React və HTML-də fərqlidir:

### checked {#checked}

`checked` atributu `checkbox` və ya `radio` tipli `<input>` komponentlərində dəstəklənir. Siz bu atribut ilə komponentin seçildiyini təyin edə bilərsiniz. Bu kontrol edilən komponent düzəltmək üçün faydalıdır. `defaultChecked` kontrol edilməyən ekvivalentidir. Bu, komponentin ilk mount-da seçildiyini təyin etmək üçün istifadə olunur.

### className {#classname}

CSS klası təyin etmək üçün `className` atributundan istifadə edin. Bu, bütün normal DOM və SVG elementlərinə (`<div>`, `<a>` və başqaları) aiddir.

Əgər siz React-i Veb Komponentlər ilə işlədirsinizsə (nadir haldır) `class` atributu işlədin.

### dangerouslySetInnerHTML {#dangerouslysetinnerhtml}

React-də `dangerouslySetInnerHTML` brauzerin DOM-unda `innerHTML` atributunu əvəzləyir. Adətən, təsadüfən istifadəçiləri [kros-səhifə scriptləri (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting) hücumlarına ifşa etməyini asanlaşdırdığından koddan HTML təyin etmək risklidir. Bu səbəbdən HTML-i birbaşa React-ə təyin etmək üçün siz `dangerouslySetInnerHTML` yazıb `__html` açarı olan obyekt göndərməlisiniz ki, bunun təhlükəli olduğunu yada salasınız. Məsələn:

```js
function createMarkup() {
  return {__html: 'Birinci &middot; İkinci'};
}

function MyComponent() {
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}
```

### htmlFor {#htmlfor}

`for`-un Javascript-də qorunan söz olduğundan, React elementləri `htmlFor` işlədirlər.

### onChange {#onchange}

`onChange` hadisəsi gözlədiyiniz kimi davranır: anket sahəsi dəyişdikdə bu hadisə atılır. Brauzerdə olan mövcud davranışın səhv olduğundan və React-in istifadəçi daxil etməsinin atdığı hadisədən real zamanda asılı olduğundan biz bilərəkdən brauzerdə olan mövcud davranışı işlətmirik.

### selected {#selected}

`selected` atribut `<option>` komponentlərində dəstəklənir. Siz bunun ilə komponentin seçildiyini təyin edə bilərsiniz. Bu kontrol edilən komponentlər düzəltmək üçün faydalıdır.

### style {#style}

>Qeyd
>
>Sənədlərdə bəzi misalların `style`-ı rahatlıq üçün işlətdiyinə baxmayaraq, **`style` atributunu elementləri stilləşdirmək üçün əsas həll kimi işlətməyi tövsiyyə etmirik.** Bir çox halda kənar CSS stil cədvəlində (stylesheet) olan klaslara referans etmək üçün [`className`](#classname) işlətməyi tövsiyyə edirik. `style` ən çox React applikasiyalarında render zamanı dinamik hesablanmış stilləri əlavə etmək üçün işlənilir. [FAQ: Stilləşdirmək və CSS](/docs/faq-styling.html) sənədinə baxın.

`style` atributu CSS mətn əvəzinə camelCased parametrləri olan Javascript obyekti qəbul edir. Bu Javascriptin DOM `style` parametri ilə uyğundur, daha səmərəlidir və istifadəçini XSS-dən qoruyur. Məsələn:

```js
const divStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldComponent() {
  return <div style={divStyle}>Salam Dünya!</div>;
}
```

Nəzərə alın ki, stillər avtomatik prefikslənmirlər. Keçmiş brauzerləri dəstəkləmək üçün müvafiq stil parametrlərini təyin edin:

```js
const divStyle = {
  WebkitTransition: 'all', // 'W'-nin böyük hərf olduğuna fikir verin
  msTransition: 'all' // 'ms' yeganə kiçik hərfli vendor prefiksidir
};

function ComponentWithTransition() {
  return <div style={divStyle}>Bu bütün brauzerlərdə işləyəcək</div>;
}
```

JS-də DOM nodlarının parametrlərini oxumaq ilə uyğun olması üçün (məsələn `node.style.backgroundImage`) stil açarları camelCased olmalıdır. [`ms`-dən başqa](https://www.andismith.com/blogs/2012/02/modernizr-prefixed/) bütün vendor prefikslər ilk hərfi böyük hərflə başlamalıdırlar. Bu səbəbdən `WebkitTransition`-da böyük hərfli "W" var.

React avtomatik olaraq "px" şəkilçisini bəzi ədədi eyni sətrli stil parametrlərinə əlavə edəcək. Əgər sizə "px"-dən fərqli vahidlər lazımdırsa dəyəri lazım olan vahid ilə mətn formasında göstərin. Məsələn:

```js
// Stilin nəticəsi: '10px'
<div style={{ height: 10 }}>
  Salam Dünya!
</div>

// Stilin nəticəsi: '10%'
<div style={{ height: '10%' }}>
  Salam Dünya!
</div>
```

Bütün stil parametrləri piksel mətnlərinə çevrilmirlər. Bəziləri vahidsiz qalırlar (məsələn `zoom`, `order`, `flex`). Vahidsiz parametrlərin siyahısını [bu linkdən](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59) görə bilərsiniz.

### suppressContentEditableWarning {#suppresscontenteditablewarning}

Normalda bu xəbərdarlıq, uşağı olan elementin `contentEditable` atributu olduğu halda göstərilir. Çünki bu işləməyəcək. Bu atribut bu xəbərdarlığı gizlədir. [Draft.js](https://facebook.github.io/draft-js/) kimi `contentEditable`-ı əl ilə idarə edən kitabxana düzəltmirsinizsə bu atributdan istifadə etməyin.

### suppressHydrationWarning {#suppresshydrationwarning}

Server React render etdikdə normalda server və klient fərqli kontent render edirsə xəbərdarlıq atılır. Amma bəzi nadir hallarda klient və server kontentinin uyğun olduğunu qarantiyalamaq çətindir. Məsələn tarixlərin server və klientdə fərqli olması gözlənilir.

Əgər `suppressHydrationWarning` `true`-dursa React, elementlər arasında və atributlar arasında fərqliliklər haqqında xəbərdarlıq etməyəcək. Bu, yalnız bir dərəcə dərinlikdə işləyir və yalnız çıxış yolu kimi işlətmək üçün nəzərdə tutulub. Bunu çox işlətməyin. Hidrasiya haqqında əlavə məlumat üçün [`ReactDOM.hydrate()` sənədinə](/docs/react-dom.html#hydrate) baxın.

### value {#value}

`value` atributu `<input>` və `<textarea>` komponentləri tərəfindən dəstəklənir. Bu atributdan istifadə edərək komponentin dəyərini təyin edə bilərsiniz. Bu kontrol edilən komponentlər yaratmaq üçün faydalıdır. `defaultValue` kontrol edilməyən ekvivalentidir. Bu, komponentin ilk mount-da seçildiyini təyin etmək üçün istifadə olunur.

## Dəstəklənən bütün HTML Atributları {#all-supported-html-attributes}

React 16-dan başlayaraq, bütün standart [və ya xüsusi](/blog/2017/09/08/dom-attributes-in-react-16.html) DOM atributları tam dəstəklənir.

React həmişə DOM üçün Javascript əsaslı API təmin edib. React komponentlərin həm xüsusi, həm də DOM-a aid propları qəbul etdiyindən React, DOM API-ları kimi `camelCase`  konvensiyasından istifadə edir:

```js
<div tabIndex="-1" />      // node.tabIndex DOM API-ı kimi
<div className="Button" /> // node.className DOM API-ı kimi
<input readOnly={true} />  // node.readOnly DOM API-ı kimi
```

Yuxarıda göstərilmiş xüsusi hallar istisna olmaqla bu proplar uyğun olan HTML atributlarına bənzər formada işləyirlər.

React-in dəstəklədiyi bəzi DOM atributları:

```
accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap
```

Eyni formada, bütün SVG atributları da tam dəstəklənir:

```
accentHeight accumulate additive alignmentBaseline allowReorder alphabetic
amplitude arabicForm ascent attributeName attributeType autoReverse azimuth
baseFrequency baseProfile baselineShift bbox begin bias by calcMode capHeight
clip clipPath clipPathUnits clipRule colorInterpolation
colorInterpolationFilters colorProfile colorRendering contentScriptType
contentStyleType cursor cx cy d decelerate descent diffuseConstant direction
display divisor dominantBaseline dur dx dy edgeMode elevation enableBackground
end exponent externalResourcesRequired fill fillOpacity fillRule filter
filterRes filterUnits floodColor floodOpacity focusable fontFamily fontSize
fontSizeAdjust fontStretch fontStyle fontVariant fontWeight format from fx fy
g1 g2 glyphName glyphOrientationHorizontal glyphOrientationVertical glyphRef
gradientTransform gradientUnits hanging horizAdvX horizOriginX ideographic
imageRendering in in2 intercept k k1 k2 k3 k4 kernelMatrix kernelUnitLength
kerning keyPoints keySplines keyTimes lengthAdjust letterSpacing lightingColor
limitingConeAngle local markerEnd markerHeight markerMid markerStart
markerUnits markerWidth mask maskContentUnits maskUnits mathematical mode
numOctaves offset opacity operator order orient orientation origin overflow
overlinePosition overlineThickness paintOrder panose1 pathLength
patternContentUnits patternTransform patternUnits pointerEvents points
pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits
r radius refX refY renderingIntent repeatCount repeatDur requiredExtensions
requiredFeatures restart result rotate rx ry scale seed shapeRendering slope
spacing specularConstant specularExponent speed spreadMethod startOffset
stdDeviation stemh stemv stitchTiles stopColor stopOpacity
strikethroughPosition strikethroughThickness string stroke strokeDasharray
strokeDashoffset strokeLinecap strokeLinejoin strokeMiterlimit strokeOpacity
strokeWidth surfaceScale systemLanguage tableValues targetX targetY textAnchor
textDecoration textLength textRendering to transform u1 u2 underlinePosition
underlineThickness unicode unicodeBidi unicodeRange unitsPerEm vAlphabetic
vHanging vIdeographic vMathematical values vectorEffect version vertAdvY
vertOriginX vertOriginY viewBox viewTarget visibility widths wordSpacing
writingMode x x1 x2 xChannelSelector xHeight xlinkActuate xlinkArcrole
xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlns xmlnsXlink xmlBase
xmlLang xmlSpace y y1 y2 yChannelSelector z zoomAndPan
```

Kiçik hərf istifadə etdiyiniz müddətdə siz xüsusi atributlar da işlədə bilərsiniz.

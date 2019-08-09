---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

Bu arayış React-in Hadisə Sisteminin bir hissəsini yaradan `SyntheticEvent`-i əhatə edir. Əlavə məlumat üçün [Hadisələrin Emal Edilməsi](/docs/handling-events.html) sənədinə baxın.

## İcmal {#overview}

Hadisə işləyiciləri React-ə `SyntheticEvent`-in instansiyaları kimi ötürüləcək. `SyntheticEvent` bütün brauzerlərdə eyni olan brauzerin nativ hadisəsini əhatə edən obyektdir. Bunun interfeysi `stopPropagation()` və `preventDefault()` daxil olmaqla brauzerin nativ hadisəsi interfeysi ilə eynidir. Brauzerlərin Hadisələrinin özünəməxsus tətbiqindən fərqli olaraq `SyntecticEvent` bütün brauzerlərdə eyni formada işləməyir.

Əgər sizə hər hansı səbəbə görə brauzerin hadisəsi lazımdırsa, `nativeEvent` atributundan istifadə edin. Hər bir `SyntheticEvent` obyektinin aşağıda göstərilən atributları var:

```javascript
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
DOMEventTarget target
number timeStamp
string type
```

> Qeyd:
>
> v0.14-cı versiyadan başlayaraq, hadisə işləyicilərindən `false` qaytardıqda hadisə  yayılması dayandırılmayacaq. Bunun əvəzinə `e.stopPropagation()` və ya `e.preventDefault()` çağrılmalıdır.

### Hadisə Pulinqı {#event-pooling}

`SyntheticEvent` pul olunur. Bu deməkdir ki, hadisə callback-i çağrıldıqdan sonra `SyntheticEvent` obyekti yenidən işlədiləcək və bütün parametrləri sıfırlanacaq.
Bunun səbəbi performans ilə bağlıdır. Bu səbəbdən siz hadisəni asinxron formada işlədə bilməzsiniz.

```javascript
function onClick(event) {
  console.log(event); // => sıfırlanmış obyekt.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Aşağıdaki işləməyəcək. this.state.clickEvent yalnız null dəyəri saxlayacaq.
  this.setState({clickEvent: event});

  // Siz yenə də hadisə parametrlərini ixrac edə biləcəksiniz.
  this.setState({eventType: event.type});
}
```

> Qeyd:
>
> Əgər hadisə parametrlərini asinxron formada işlətmək istəyirsinizsə, siz hadisədə `event.persist()` funksiyasını çağırmalısınız. Bu funksiya sintetik hadisəni puldan siləcək və istifadəçi kodunda hadisəyə referans saxlamağa icazə verəcək.

## Dəstəklənən Hadisələr {#supported-events}

Bütün brauzerlərdə eyni parametrlərinin olması üçün, React hadisələri normallaşdırır.

Hadisə işləyiciləri hadisə tərəfindən bubbling fazasında çağrılır. Hadisə işləyicisini capture fazasında qeyd etmək üçün hadisə adının sonuna `Capture` mətnini əlavə edin. Məsələn, capture fazasında tıklama hadisəsini qeyd etmək üçün `onClick` əvəzinə `onClickCapture` işlətməlisiniz.

- [Clipboard Hadisələri](#clipboard-events)
- [Kompozisiya Hadisələri](#composition-events)
- [Klaviatur Hadisələri](#keyboard-events)
- [Fokus Hadisələri](#focus-events)
- [Anket Hadisələri](#form-events)
- [Maus Hadisələri](#mouse-events)
- [Pointer Hadisələri](#pointer-events)
- [Seleksiya Hadisələri](#selection-events)
- [Toxunuş Hadisələri](#touch-events)
- [UI Hadisələri](#ui-events)
- [Wheel Hadisələri](#wheel-events)
- [Media Hadisələri](#media-events)
- [Şəkil Hadisələri](#image-events)
- [Animasiya Hadisələri](#animation-events)
- [Keçid Hadisələri](#transition-events)
- [Digər Hadisələr](#other-events)

* * *

## Arayış {#reference}

### Clipboard Hadisələri {#clipboard-events}

Hadisə adları:

```
onCopy onCut onPaste
```

Parametrlər:

```javascript
DOMDataTransfer clipboardData
```

* * *

### Kompozisiya Hadisələri {#composition-events}

Hadisə adları:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Parametrlər:

```javascript
string data

```

* * *

### Klaviatur Hadisələri {#keyboard-events}

Hadisə adları:

```
onKeyDown onKeyPress onKeyUp
```

Parametrlər:

```javascript
boolean altKey
number charCode
boolean ctrlKey
boolean getModifierState(key)
string key
number keyCode
string locale
number location
boolean metaKey
boolean repeat
boolean shiftKey
number which
```

`key` parametri [DOM-un 3-cü səviyyəli Hadisələr spesifikasiyasında](https://www.w3.org/TR/uievents-key/#named-key-attribute-values) olan bütün dəyərləri qəbul edə bilər.

* * *

### Fokus Hadisələri {#focus-events}

Hadisə adları:

```
onFocus onBlur
```

Fokus hadisələri yalnız anketlərdə yox, React DOM-da olan bütün elementlərdə də işləyirlər.

Parametrlər:

```javascript
DOMEventTarget relatedTarget
```

* * *

### Anket Hadisələri {#form-events}

Hadisə adları:

```
onChange onInput onInvalid onSubmit
```

onChange hadisəsi haqqında əlavə məlumat üçün [Anketlər](/docs/forms.html) sənədinə baxın.

* * *

### Maus Hadisələri {#mouse-events}

Hadisə adları:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

`onMouseEnter` və `onMouseLeave` hadisələri siravi bubbling əvəzinə çıxan elementdən daxil olan elementə yayılırlar. Əlavə olaraq bu hadisələrin capture fazası yoxdur.

Parametrlər:

```javascript
boolean altKey
number button
number buttons
number clientX
number clientY
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
number pageX
number pageY
DOMEventTarget relatedTarget
number screenX
number screenY
boolean shiftKey
```

* * *

### Pointer Hadisələri {#pointer-events}

Hadisə adları:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

`onPointerEnter` və `onPointerLeave` hadisələri siravi bubbling əvəzinə çıxan elementdən daxil olan elementə yayılırlar. Əlavə olaraq bu hadisələrin capture fazası yoxdur.


Parametrlər:

[W3 spesifikasiyasında](https://www.w3.org/TR/pointerevents/) müəyyənləşdirildiyi kimi, pointer hadisələri [Maus Hadisələrini](#mouse-events) aşağıdakı parametrlər ilə genişləndirirlər:

```javascript
number pointerId
number width
number height
number pressure
number tangentialPressure
number tiltX
number tiltY
number twist
string pointerType
boolean isPrimary
```

Brauzer dəstəyi haqqında qeyd:

Pointer hadisələri bütün brauzerlər tərəfindən dəstəklənmirlər (bu sənədin yazıldığı zamanda yalnız Chrome, Firefox, Edge, və Internet Explorer bu hadisələri dəstəkləyir). React bilərəkdən digər brauzerlər üçün polifil dəstəkləmir. Bunun səbəni polifilin `react-dom` paketini ölçüsünü çox böyütməsidir.

Əgər sizin applikasiyanıza pointer hadisələri lazımdırsa biz 3-cü tərəfli pointer hadisəsi polifili işlətməyi tövsiyyə edirik.

* * *

### Seleksiya Hadisələri {#selection-events}

Hadisə adları:

```
onSelect
```

* * *

### Toxunuş Hadisələri {#touch-events}

Hadisə adları:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Parametrlər:

```javascript
boolean altKey
DOMTouchList changedTouches
boolean ctrlKey
boolean getModifierState(key)
boolean metaKey
boolean shiftKey
DOMTouchList targetTouches
DOMTouchList touches
```

* * *

### UI Hadisələri {#ui-events}

Hadisə adları:

```
onScroll
```

Parametrlər:

```javascript
number detail
DOMAbstractView view
```

* * *

### Wheel Hadisələri {#wheel-events}

Hadisə adları:

```
onWheel
```

Parametrlər:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### Media Hadisələri {#media-events}

Hadisə adları:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### Şəkil Hadisələri {#image-events}

Hadisə adları:

```
onLoad onError
```

* * *

### Animasiya Hadisələri {#animation-events}

Hadisə adları:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

Parametrlər:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### Keçid Hadisələri {#transition-events}

Hadisə adları:

```
onTransitionEnd
```

Parametrlər:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### Digər Hadisələr {#other-events}

Hadisə adları:

```
onToggle
```

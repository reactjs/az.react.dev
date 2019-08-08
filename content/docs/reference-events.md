---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

Bu arayış React-in Hadisə Sisteminin bir hissəsini yaradan `SyntheticEvent`-i əhatə edir. Əlavə məlumat üçün [Hadisələrin Emal Edilməsi](/docs/handling-events.html) sənədinə baxın.

## İcmal {#overview}

Sizin hadisə işləyicilərin Your event handlers will be passed instances of `SyntheticEvent`-in instansiyaları kimi ötürüləcək. `SyntheticEvent` bütün brauzerlərdə uyğun olan brauzerin nativ hadisəsini əhatə edən obyektdir. Bunun interfeysi `stopPropagation()` və `preventDefault()` daxil olmaqla brauzerin nativ hadisəsi interfeysi ilə eynidir. Brauzerlərin Hadisənin özünəməxsus tətbiqindən fərqli olaraq `SyntecticEvent`-in bütün brauzerlərdə eyni formada işləməsidir.

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
> v0.14-cı versiyadan başlayaraq, hadisə işləyicilərindən `false` qaytardıqda hadisə  yayılması dayandırılmayacaq. Bunun əvəzinə `e.stopPropagation()` və ya `e.preventDefault()` çağrılmalıdırlar.

### Event Pooling {#event-pooling}

`SyntheticEvent` pul olunur. Bu deməkdir ki, hadisə callback-i çağrıldıqdan sonra `SyntheticEvent` obyekti yenidən işlədiləcək və bütün parametrləri sıfırlanacaq.
Bunun səbəbi performans ilə bağlıdır.
Bu səbəbdən siz hadisəni asinxron formada işlədər bilməzsiniz.

```javascript
function onClick(event) {
  console.log(event); // => sıfırlanmış obyekt.
  console.log(event.type); // => "click"
  const eventType = event.type; // => "click"

  setTimeout(function() {
    console.log(event.type); // => null
    console.log(eventType); // => "click"
  }, 0);

  // Bu işləməyəcək. this.state.clickEvent yalnız null dəyərləri saxlayacaq.
  this.setState({clickEvent: event});

  // Siz yenə də hadisə parametrlərini ixrac edə biləcəksiniz.
  this.setState({eventType: event.type});
}
```

> Qeyd:
>
> Əgər siz hadisə parametrlərini asinxron formada işlətmək istəyirsinizsə, siz hadisədə `event.persist()` funksiyasını çağırmalısınız. Bu funksiya sintetik hadisəni puldan siləcək və istifadəçi kodunda hadisəyə referans saxlamaya icazə verəcək.

## Dəstəklənən Hadisələr {#supported-events}

Bütün brauzerlərdə eyni parametrlərinin olması üçün React hadisələri normallaşdırır.

Hadisə işləyiciləri hadisə tərəfindən bubbling fazasında çağrılır. Hadisə işləyicisini capture fazasında qeyd etmək üçün hadisə adının sonuna `Capture` mətnini əlavə edin. Məsələn, capture fazasında tıklama hadisəsini qeyd etmək üçün `onClick` əvəzinə `onClickCapture` işlətməlisiniz.

- [Clipboard Hadisələri](#clipboard-events)
- [Kompozisiya Hadisələri](#composition-events)
- [Klaviatur Hadisələri](#keyboard-events)
- [Fokus Hadisələri](#focus-events)
- [Anket Hadisələri](#form-events)
- [Maus Hadisələri](#mouse-events)
- [Pointer Hadisələri](#pointer-events)
- [Selection Hadisələri](#selection-events)
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

### Clipboard Events {#clipboard-events}

Event names:

```
onCopy onCut onPaste
```

Properties:

```javascript
DOMDataTransfer clipboardData
```

* * *

### Composition Events {#composition-events}

Event names:

```
onCompositionEnd onCompositionStart onCompositionUpdate
```

Properties:

```javascript
string data

```

* * *

### Keyboard Events {#keyboard-events}

Event names:

```
onKeyDown onKeyPress onKeyUp
```

Properties:

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

The `key` property can take any of the values documented in the [DOM Level 3 Events spec](https://www.w3.org/TR/uievents-key/#named-key-attribute-values).

* * *

### Focus Events {#focus-events}

Event names:

```
onFocus onBlur
```

These focus events work on all elements in the React DOM, not just form elements.

Properties:

```javascript
DOMEventTarget relatedTarget
```

* * *

### Form Events {#form-events}

Event names:

```
onChange onInput onInvalid onSubmit
```

For more information about the onChange event, see [Forms](/docs/forms.html).

* * *

### Mouse Events {#mouse-events}

Event names:

```
onClick onContextMenu onDoubleClick onDrag onDragEnd onDragEnter onDragExit
onDragLeave onDragOver onDragStart onDrop onMouseDown onMouseEnter onMouseLeave
onMouseMove onMouseOut onMouseOver onMouseUp
```

The `onMouseEnter` and `onMouseLeave` events propagate from the element being left to the one being entered instead of ordinary bubbling and do not have a capture phase.

Properties:

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

### Pointer Events {#pointer-events}

Event names:

```
onPointerDown onPointerMove onPointerUp onPointerCancel onGotPointerCapture
onLostPointerCapture onPointerEnter onPointerLeave onPointerOver onPointerOut
```

The `onPointerEnter` and `onPointerLeave` events propagate from the element being left to the one being entered instead of ordinary bubbling and do not have a capture phase.

Properties:

As defined in the [W3 spec](https://www.w3.org/TR/pointerevents/), pointer events extend [Mouse Events](#mouse-events) with the following properties:

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

A note on cross-browser support:

Pointer events are not yet supported in every browser (at the time of writing this article, supported browsers include: Chrome, Firefox, Edge, and Internet Explorer). React deliberately does not polyfill support for other browsers because a standard-conform polyfill would significantly increase the bundle size of `react-dom`.

If your application requires pointer events, we recommend adding a third party pointer event polyfill.

* * *

### Selection Events {#selection-events}

Event names:

```
onSelect
```

* * *

### Touch Events {#touch-events}

Event names:

```
onTouchCancel onTouchEnd onTouchMove onTouchStart
```

Properties:

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

### UI Events {#ui-events}

Event names:

```
onScroll
```

Properties:

```javascript
number detail
DOMAbstractView view
```

* * *

### Wheel Events {#wheel-events}

Event names:

```
onWheel
```

Properties:

```javascript
number deltaMode
number deltaX
number deltaY
number deltaZ
```

* * *

### Media Events {#media-events}

Event names:

```
onAbort onCanPlay onCanPlayThrough onDurationChange onEmptied onEncrypted
onEnded onError onLoadedData onLoadedMetadata onLoadStart onPause onPlay
onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend
onTimeUpdate onVolumeChange onWaiting
```

* * *

### Image Events {#image-events}

Event names:

```
onLoad onError
```

* * *

### Animation Events {#animation-events}

Event names:

```
onAnimationStart onAnimationEnd onAnimationIteration
```

Properties:

```javascript
string animationName
string pseudoElement
float elapsedTime
```

* * *

### Transition Events {#transition-events}

Event names:

```
onTransitionEnd
```

Properties:

```javascript
string propertyName
string pseudoElement
float elapsedTime
```

* * *

### Other Events {#other-events}

Event names:

```
onToggle
```

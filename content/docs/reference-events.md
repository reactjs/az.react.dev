---
id: events
title: SyntheticEvent
permalink: docs/events.html
layout: docs
category: Reference
---

Bu arayış React-in Hadisə Sisteminin bir hissəsini yaradan `SyntheticEvent`-i əhatə edir. Əlavə məlumat üçün [Hadisələrin Emal Edilməsi](/docs/handling-events.html) sənədinə baxın.

## İcmal {#overview}

Hadisə işləyiciləri React-ə `SyntheticEvent`-in instansiyaları kimi ötürüləcək. `SyntheticEvent` bütün brauzerlərdə eyni olan brauzerin nativ hadisəsini əhatə edən obyektdir. Bunun interfeysi `stopPropagation()` və `preventDefault()` daxil olmaqla brauzerin nativ hadisəsi interfeysi ilə eynidir. Brauzerlərin Hadisələrinin özünəməxsus tətbiqindən fərqli olaraq `SyntecticEvent` bütün brauzerlərdə eyni formada işləmir.

Əgər sizə hər hansı səbəbə görə brauzerin nativ hadisəsi lazımdırsa, `nativeEvent` atributundan istifadə edin. Sintetik hadisələr brauzerin nativ hadisələri ilə tam qarşılaşmırlar. Məsələn, `onMouseLeave` hadisəsinin `event.nativeEvent` obyekti `mouseout` hadisəsinə istinad edir. Hər bir `SyntheticEvent` obyektinin aşağıda göstərilən atributları var:

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
void persist()
DOMEventTarget target
number timeStamp
string type
```

> Qeyd:
>
<<<<<<< HEAD
> v0.14-cü versiyadan başlayaraq, hadisə işləyicilərindən `false` qaytardıqda hadisə  yayılması dayandırılmayacaq. Bunun əvəzinə `e.stopPropagation()` və ya `e.preventDefault()` çağrılmalıdır.

### Hadisə Pulinqi {#event-pooling}

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

  // Aşağıdakı işləməyəcək. this.state.clickEvent yalnız null dəyəri saxlayacaq.
  this.setState({clickEvent: event});

  // Siz yenə də hadisə parametrlərini ixrac edə biləcəksiniz.
  this.setState({eventType: event.type});
}
```
=======
> As of v17, `e.persist()` doesn't do anything because the `SyntheticEvent` is no longer [pooled](/docs/legacy-event-pooling.html).
>>>>>>> 4fc709d0576d0f0f1f8ea8b6bb341a12944b5510

> Qeyd:
>
<<<<<<< HEAD
> Əgər hadisə parametrlərini asinxron formada işlətmək istəyirsinizsə, siz hadisədə `event.persist()` funksiyasını çağırmalısınız. Bu funksiya sintetik hadisəni puldan silərək istifadəçi kodunda hadisəyə referans saxlamağa imkan yaradacaq.

## Dəstəklənən Hadisələr {#supported-events}

Bütün brauzerlərdə eyni parametrlərinin olması üçün, React hadisələri normallaşdırır.

Hadisə işləyiciləri hadisə tərəfindən bubbling fazasında çağrılır. Hadisə işləyicisini Capture fazasında qeyd etmək üçün hadisə adının sonuna `Capture` mətnini əlavə edin. Məsələn, Capture fazasında tıklama hadisəsini qeyd etmək üçün `onClick` əvəzinə `onClickCapture` işlətməlisiniz.

- [Clipboard Hadisələri](#clipboard-events)
- [Kompozisiya Hadisələri](#composition-events)
- [Klaviatur Hadisələri](#keyboard-events)
- [Fokus Hadisələri](#focus-events)
- [Anket Hadisələri](#form-events)
- [Ümumi Hadisələr](#generic-events)
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
=======
> As of v0.14, returning `false` from an event handler will no longer stop event propagation. Instead, `e.stopPropagation()` or `e.preventDefault()` should be triggered manually, as appropriate.

## Supported Events {#supported-events}

React normalizes events so that they have consistent properties across different browsers.

The event handlers below are triggered by an event in the bubbling phase. To register an event handler for the capture phase, append `Capture` to the event name; for example, instead of using `onClick`, you would use `onClickCapture` to handle the click event in the capture phase.

- [Clipboard Events](#clipboard-events)
- [Composition Events](#composition-events)
- [Keyboard Events](#keyboard-events)
- [Focus Events](#focus-events)
- [Form Events](#form-events)
- [Generic Events](#generic-events)
- [Mouse Events](#mouse-events)
- [Pointer Events](#pointer-events)
- [Selection Events](#selection-events)
- [Touch Events](#touch-events)
- [UI Events](#ui-events)
- [Wheel Events](#wheel-events)
- [Media Events](#media-events)
- [Image Events](#image-events)
- [Animation Events](#animation-events)
- [Transition Events](#transition-events)
- [Other Events](#other-events)
>>>>>>> 4fc709d0576d0f0f1f8ea8b6bb341a12944b5510

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

```js
DOMEventTarget relatedTarget
```

#### onFocus {#onfocus}

The `onFocus` event is called when the element (or some element inside of it) receives focus. For example, it's called when the user clicks on a text input.

```javascript
function Example() {
  return (
    <input
      onFocus={(e) => {
        console.log('Focused on input');
      }}
      placeholder="onFocus is triggered when you click this input."
    />
  )
}
```

#### onBlur {#onblur}

The `onBlur` event handler is called when focus has left the element (or left some element inside of it). For example, it's called when the user clicks outside of a focused text input.

```javascript
function Example() {
  return (
    <input
      onBlur={(e) => {
        console.log('Triggered because this input lost focus');
      }}
      placeholder="onBlur is triggered when you click this input and then you click outside of it."
    />
  )
}
```

#### Detecting Focus Entering and Leaving {#detecting-focus-entering-and-leaving}

You can use the `currentTarget` and `relatedTarget` to differentiate if the focusing or blurring events originated from _outside_ of the parent element. Here is a demo you can copy and paste that shows how to detect focusing a child, focusing the element itself, and focus entering or leaving the whole subtree.

```javascript
function Example() {
  return (
    <div
      tabIndex={1}
      onFocus={(e) => {
        if (e.currentTarget === e.target) {
          console.log('focused self');
        } else {
          console.log('focused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus entered self');
        }
      }}
      onBlur={(e) => {
        if (e.currentTarget === e.target) {
          console.log('unfocused self');
        } else {
          console.log('unfocused child', e.target);
        }
        if (!e.currentTarget.contains(e.relatedTarget)) {
          // Not triggered when swapping focus between children
          console.log('focus left self');
        }
      }}
    >
      <input id="1" />
      <input id="2" />
    </div>
  );
}
```

* * *

### Anket Hadisələri {#form-events}

Hadisə adları:

```
onChange onInput onInvalid onReset onSubmit 
```

onChange hadisəsi haqqında əlavə məlumat üçün [Anketlər](/docs/forms.html) sənədinə baxın.

* * *

### Ümumi Hadisələr {#generic-events}

Hadisə adları names:

```
onError onLoad
```

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

Əgər sizin applikasiyanıza pointer hadisələri lazımdırsa biz 3-cü tərəfli pointer hadisəsi polifili işlətməyi tövsiyə edirik.

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

<<<<<<< HEAD
Parametrlər:
=======
>Note
>
>Starting with React 17, the `onScroll` event **does not bubble** in React. This matches the browser behavior and prevents the confusion when a nested scrollable element fires events on a distant parent.

Properties:
>>>>>>> 4fc709d0576d0f0f1f8ea8b6bb341a12944b5510

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

[English Version](https://github.com/reactjs/az.reactjs.org/blob/master/style-guide.md)

# Stil Təlimatları

Bu repoda göstərilən qaydalar **bütün** dillər üçün etibarlıdır.

## Başlıq ID-ləri

Bütün başlıqların açıq formada aşağıda göstərilən kimi ID-ləri var:

```md
## React-i Sınayın {#try-react}
```

Bu ID-ləri tərcümə **etməyin**! Bu ID-lər naviqasiya üçün işlədilir və sənədə kənardan istinad edildiyində naviqasiya sınacaq:

```md
Əlavə məlumat üçün [başlanğıc bölməyə](/getting-started#try-react) baxın.
```

✅ Edin:

```md
## React-i Sına {#try-react}
```

❌ Etməyin:

```md
## React-i Sına {#react-sına}
```

Bu yuxarıdakı linki sındıracaq.

## Kod Bloklarında olan Mətnlər

Kod Blocklarında, şərhlərdən başqa mətnləri tərcümə etməyin. Əlavə olaraq, mətnlərdə olan yazıları tərcümə edə bilərsiniz. Lakin əmin olun ki, koda istinad edən mətnləri tərcümə etmirsiniz!

Nümunə:
```js
// Example
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

✅ DO:

```js
// Nümunə
const element = <h1>Salam dünya</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

❌ DON'T:

```js
// Nümunə
const element = <h1>Salam dünya</h1>;
// "root" element ID-dir.
// TƏRCÜMƏ ETMƏ
ReactDOM.render(element, document.getElementById('kök'));
```

❌ DEFINITELY DON'T:

```js
// Nümunə
const element = <h1>Salam dünya</h1>;
ReactDOM.render(element, dokument.idəGörəElementSeç('kök'));
```

## Kənar Linlər

Əgər kənar link [MDN] və ya [Vikipedia] kimi saytlarda olan məqaləyə istinad edirsə və bu məqalənin Azərbaycan dilində əməlli tərcüməsi varsa, Azərbaycan dilində olan məqaləni istifadə edin.

[MDN]: https://developer.mozilla.org/en-US/
[Vikipedia]: https://en.wikipedia.org/wiki/Main_Page

Nümunə:

```md
React elementləri [immutable](https://en.wikipedia.org/wiki/Immutable_object).
```

✅ OK:

```md
React elementləri [dəyişilməzdir](https://az.wikipedia.org/wiki/Dəyişilməz_obyekt).
```

Ekvivalent tərcüməsi olmayan linkləri (Stack Overflow, YouTube videoları, və s) İngilis dilində saxlayın.
---
id: faq-ajax
title: AJAX və API-lar
permalink: docs/faq-ajax.html
layout: docs
category: FAQ
---

### AJAX çağırışını nə cür edə bilərəm? {#how-can-i-make-an-ajax-call}

React ilə istədiyiniz Ajax kitabxanasını işlədə bilərsiniz. Populyar kitabxanalar: [Axios](https://github.com/axios/axios), [jQuery AJAX](https://api.jquery.com/jQuery.ajax/), və brauzerə qurulmuş [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

### Komponent lifecycle-nın hansı mərhələsində Ajax çağırışı etməliyəm? {#where-in-the-component-lifecycle-should-i-make-an-ajax-call}

Ajax çağırışından gələn bütün məlumatları [`componentDidMount`](/docs/react-component.html#mounting) lifecycle funksiyasından tətbiq etməlisiniz. Bunun səbəbi, məlumat alındıqda `setState` ilə komponenti yeniləmək imkanının olmasıdır.

### Nümunə: AJAX nəticələrinin lokal state-ə yazılması {#example-using-ajax-results-to-set-local-state}

Aşağıdakı komponent `componentDidMount`-dan Ajax çağırışı edərək lokal komponent state-nin doldurulmasını göstərir. 

Nümunədəki API belə bir JSON obyekti qaytarır:

```
{
  "items": [
    { "id": 1, "name": "Almalar",  "price": "2 AZN" },
    { "id": 2, "name": "Şəftəlilər", "price": "5 AZN" }
  ] 
}
```

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Qeyd: komponentlərdə olan aktual xətaları udmamaq üçün
        // AJAX xətəlarını `catch()` blokunda tutmaq əvəzinə burada
        // tutmaq vacibdir.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Xəta: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Yüklənir...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    }
  }
}
```

Here is the equivalent with [Hooks](https://reactjs.org/docs/hooks-intro.html): 

```js
function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://api.example.com/items")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.items);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {items.map(item => (
          <li key={item.name}>
            {item.name} {item.price}
          </li>
        ))}
      </ul>
    );
  }
}
```

---
id: testing-recipes
title: Test Etmə Reseptləri
permalink: docs/testing-recipes.html
prev: testing.html
next: testing-environments.html
---

React komponentləri üçün çox işlədilən test etmə nümunələri.

> Qeyd:
>
> Bu səhifədə [Jest](https://jestjs.io/) test icra edicisinin istifadə edildiyi fərz edilir. Fərqli test icra edicisindən istifadə edirsinizsə, API-ı dəyişmək lazım ola bilər. Lakin, həllin ümumilikdə forması eyni qalacaq. Test etmə mühitini quraşdırmaq üçün [Test Etmə Mühitləri](/docs/testing-environments.html) səhifəsinə baxın.

Bu sahifədə əsasən funksiya komponentlərindən istifadə edəcəyik. Lakin, burada göstərilən test etmə strategiyalarının tətbiq detallarından asılı olmadığından eyni testlər sinif komponnetlərində də işləyəcək.

- [Quraşdırma/Sökülmə](#setup--teardown)
- [`act()`](#act)
- [Render Etmə](#rendering)
- [Məlumatların Yüklənməsi](#data-fetching)
- [Modulların Mok Edilməsi](#mocking-modules)
- [Hadisələr](#events)
- [Taymerlər](#timers)
- [Snəpşotların Test Edilməsi](#snapshot-testing)
- [Bir Neçə Render Etmə Qurğuları](#multiple-renderers)
- [Nəsə Çatışmır?](#something-missing)

---

### Quraşdırma/Sökülmə {#setup--teardown}

DOM hadisələrinin düzgün işləməsi üçün testdə React ağacını `document`-ə qoşulan DOM elementinə render etmək lazımdır. Test bitdikdə isə ağacı `document`-dən silmək istəyirik.

Adətən, bu əməliyyatlar, `beforeEach` və `afterEach` bloklarından icra olunur. Bu bloklar hər test zamanı çağrılıb effektlərin hər test üçün ayrılmasına imkan yaradır:

```jsx
import { unmountComponentAtNode } from "react-dom";

let container = null;
beforeEach(() => {
  // DOM elementini render hədəfi kimi təyin edin 
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Test bitdikdə təmizlik işləri aparın
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
```

Siz fərqli yol ilə də bunu edə bilərsiniz. Lakin, _testin uğursuz olduğuna baxmayaraq_ təmizlik işi icra olunmalıdır. Əks halda, testlər "sızıcı" olub bir-birinin davranışlarına təsir edə bilir. Bu səbəbdən, testlərin debaq edilməsi çətinləşə bilər.

---

### `act()` {#act}

UI testlər yazdıqda render etmə, istifadəçi hadisələri və ya məlumat yüklənməsi kimi tapşırıqlar istifadəçi interfeysi ilə interaksiya "vahidi" kimi nəzərə alına bilər. Bu "vahidlərə" aid bütün yeniliklərin iddiaların təsdiqindən öncə emal edilib DOM-a tətbiq edilməsi üçün `react-dom/test-utils` paketində köməkçi [`act()`](/docs/test-utils.html#act) funksiyası təmin olunur:

```js
act(() => {
  // Komponentləri render et
});
// İddiaları təsdiq et
```

Bu köməkçi funksiya, testləri real istifadəçilərin applikasiyanı istifadə etməsinə yaxınlaşdırır. Bu bölmədə olan bütün nümunələrdə davranışları siğortalamaq üçün `act()` köməkçisindən istifadə edirik.

`act()` köməkçisinin birbaşa istifadəsi verbose ola bilər. Bu köməkçini hər dəfə yazmamaq üçün köməkçi funksiyalarını `act()` ilə əhatə edən [React Testing Library](https://testing-library.com/react) kimi kitabxanalardan istifadə edə bilərsiniz.

> Qeyd:
>
> `act` köməkçisinin adı [Arrange-Act-Assert](http://wiki.c2.com/?ArrangeActAssert) pattern-indən gəlir.

---

### Render Etmə {#rendering}

Komponentin verilən proplar əsasında düzgün render edildiyini yoxlaya bilərsiniz. Prop əsasında mesaj render edən komponentə baxaq:

```jsx
// hello.js

import React from "react";

export default function Hello(props) {
  if (props.name) {
    return <h1>Salam, {props.name}!</h1>;
  } else {
    return <span>Salam, qərib insan</span>;
  }
}
```

Bu komponent üçün testi aşağıdakı formada yaza bilərik:

```jsx{24-27}
// hello.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Hello from "./hello";

let container = null;
beforeEach(() => {
  // DOM elementini render hədəfi kimi təyin edin
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Test bitdikdə təmizlik işləri aparın
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(<Hello />, container);
  });
  expect(container.textContent).toBe("Salam, qərib insan");

  act(() => {
    render(<Hello name="İlkin" />, container);
  });
  expect(container.textContent).toBe("Salam, İlkin!");

  act(() => {
    render(<Hello name="Cəmilə" />, container);
  });
  expect(container.textContent).toBe("Salam, Cəmilə!");
});
```

---

### Məlumatların Yüklənməsi {#data-fetching}

Testlərdə real API işlətmək əvəzinə sorğuları dummy məlumat ilə mok edə bilərsiniz. Məlumat yüklənməsini "saxta" məlumat ilə mok etdikdə backend-dən asılılığın olmadığından testlərin API-a görə uğursuz başa çatmasının qarşısı alınır və testlərin sürəti artır. Qeyd: Applikasiyanın bütünlükdə işləməsini yoxlamaq üçün bəzi testlərdə ["end-to-end"](/docs/testing-environments.html#end-to-end-tests-aka-e2e-tests) freymvorkundan istifadə edə bilərsiniz.

```jsx
// user.js

import React, { useState, useEffect } from "react";

export default function User(props) {
  const [user, setUser] = useState(null);

  async function fetchUserData(id) {
    const response = await fetch("/" + id);
    setUser(await response.json());
  }

  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);

  if (!user) {
    return "yüklənir...";
  }

  return (
    <details>
      <summary>{user.name}</summary>
      Yaş: <strong>{user.age}</strong>
      <br />
      Adres: {user.address}
    </details>
  );
}
```

Yuxarıdakı komponenti aşağıdakı formada test edə bilərik:

```jsx{23-33,44-45}
// user.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import User from "./user";

let container = null;
beforeEach(() => {
  // DOM elementini render hədəfi kimi təyin edin
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Test bitdikdə təmizlik işləri aparın
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const fakeUser = {
    name: "Joni Baez",
    age: "32",
    address: "123, Charming Avenue"
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser)
    })
  );

  // Həll olunan promise-ləri tətbiq etmək üçün act-in asinxron versiyasından istifadə edin
  await act(async () => {
    render(<User id="123" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
  expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
  expect(container.textContent).toContain(fakeUser.address);

  // Testlərin tam ayrılması üçün moku silin
  global.fetch.mockRestore();
});
```

---

### Modulların Mok Edilməsi {#mocking-modules}

Bəzi modullar test mühitində yaxşı işləməyə bilər və ya test üçün vacib olmaya bilər. Modulları dummy əvəzetmələri ilə mok edərək testlərin yazılmasını asanlaşdıra bilərsiniz.

3-cü tərəfin `GoogleMap` komponentindən istifadə edən `Contact` komponentinə baxaq:

```jsx
// map.js

import React from "react";

import { LoadScript, GoogleMap } from "react-google-maps";
export default function Map(props) {
  return (
    <LoadScript id="script-loader" googleMapsApiKey="YOUR_API_KEY">
      <GoogleMap id="example-map" center={props.center} />
    </LoadScript>
  );
}

// contact.js

import React from "react";
import Map from "./map";

export default function Contact(props) {
  return (
    <div>
      <address>
        {props.name} ilə{" "}
        <a data-testid="email" href={"mailto:" + props.email}>
          email
        </a>
        və ya <a data-testid="site" href={props.site}>
          veb səhifə
        </a> ilə əlaqə saxlayın.
      </address>
      <Map center={props.center} />
    </div>
  );
}
```

Bu komponenti testlərdə yükləmək istəmədikdə asılılığı dummy komponentə mok edib testləri icra edə bilərik:

```jsx{10-18}
// contact.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Contact from "./contact";
import MockedMap from "./map";

jest.mock("./map", () => {
  return function DummyMap(props) {
    return (
      <div data-testid="map">
        {props.center.lat}:{props.center.long}
      </div>
    );
  };
});

let container = null;
beforeEach(() => {
  // DOM elementini render hədəfi kimi təyin edin
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Test bitdikdə təmizlik işləri aparın
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render contact information", () => {
  const center = { lat: 0, long: 0 };
  act(() => {
    render(
      <Contact
        name="Joni Baez"
        email="test@example.com"
        site="http://test.com"
        center={center}
      />,
      container
    );
  });

  expect(
    container.querySelector("[data-testid='email']").getAttribute("href")
  ).toEqual("mailto:test@example.com");

  expect(
    container.querySelector('[data-testid="site"]').getAttribute("href")
  ).toEqual("http://test.com");

  expect(container.querySelector('[data-testid="map"]').textContent).toEqual(
    "0:0"
  );
});
```

---

### Hadisələr {#events}

Biz, real DOM hadisələrini DOM elementlərinə göndərib nəticəni təsdiq etməyi tövsiyə edirik. `Toggle` adlı komponentə baxaq:

```jsx
// toggle.js

import React, { useState } from "react";

export default function Toggle(props) {
  const [state, setState] = useState(false);
  return (
    <button
      onClick={() => {
        setState(previousState => !previousState);
        props.onChange(!state);
      }}
      data-testid="toggle"
    >
      {state === true ? "Söndür" : "Yandır"}
    </button>
  );
}
```

Bunun üçün testləri aşağıdakı kimi yaza bilərsiniz:

```jsx{13-14,35,43}
// toggle.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Toggle from "./toggle";

let container = null;
beforeEach(() => {
  // DOM elementini render hədəfi kimi təyin edin
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Test bitdikdə təmizlik işləri aparın
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("changes value when clicked", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Toggle onChange={onChange} />, container);
  });

  // düymə elementini tapıb bəzi düymə tıklamaları edin
  const button = document.querySelector("[data-testid=toggle]");
  expect(button.innerHTML).toBe("Yandır");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onChange).toHaveBeenCalledTimes(1);
  expect(button.innerHTML).toBe("Söndür");

  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(onChange).toHaveBeenCalledTimes(6);
  expect(button.innerHTML).toBe("Yandır");
});
```

Fərqli DOM elementləri və parametrləri haqqında [MDN-dən](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) oxuya bilərsiniz. Nəzərə alın ki, hadisənin React dinləyicisinə çatması üçün hər hadisəyə `{ bubbles: true }` parametri əlavə edin. Əks halda, React, hadisələri avtomatik olaraq kök elementə.

> Qeyd:
>
> Hadisələrin çağrılması üçün React Testing Library kitabxanasında [daha qısa köməkçi funksiyası](https://testing-library.com/docs/dom-testing-library/api-events) var.

---

### Taymerlər {#timers}

Hər hansı bir işin gələcəkdə icra edilməsi üçün kodda `setTimeout` kimi taymer funksiyalarından istifadə edilə bilər. Aşağıdakı nümunədə, çox seçimli panel, seçim gözləyir və 5 saniyə ərzində seçim edilmədikdə vaxt bitir:

```jsx
// card.js

import React, { useEffect } from "react";

export default function Card(props) {
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      props.onSelect(null);
    }, 5000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [props.onSelect]);

  return [1, 2, 3, 4].map(choice => (
    <button
      key={choice}
      data-testid={choice}
      onClick={() => props.onSelect(choice)}
    >
      {choice}
    </button>
  ));
}
```

[Jest-in taymer moklarından](https://jestjs.io/docs/en/timer-mocks) istifadə edərək bu komponentin fəqrli vəziyyətlərini test edə bilərik.

```jsx{7,31,37,49,59}
// card.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Card from "./card";

let container = null;
beforeEach(() => {
  // DOM elementini render hədəfi kimi təyin edin
  container = document.createElement("div");
  document.body.appendChild(container);
  jest.useFakeTimers();
});

afterEach(() => {
  // Test bitdikdə təmizlik işləri aparın
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  jest.useRealTimers();
});

it("should select null after timing out", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });

  // zamanı 100ms qabağa çəkin
  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  // sonra, zamanı 5 saniyə qabağa çəkin
  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).toHaveBeenCalledWith(null);
});

it("should cleanup on being removed", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });

  act(() => {
    jest.advanceTimersByTime(100);
  });
  expect(onSelect).not.toHaveBeenCalled();

  // applikasiyanı unmount edin
  act(() => {
    render(null, container);
  });

  act(() => {
    jest.advanceTimersByTime(5000);
  });
  expect(onSelect).not.toHaveBeenCalled();
});

it("should accept selections", () => {
  const onSelect = jest.fn();
  act(() => {
    render(<Card onSelect={onSelect} />, container);
  });

  act(() => {
    container
      .querySelector("[data-testid='2']")
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onSelect).toHaveBeenCalledWith(2);
});
```

Siz saxta taymerlərin işləməsini istənilən testdə aktivləşdirə bilərsiniz. Yuxarıdakı nümunədə, `jest.useFakeTimers()` funksiyasını çağıraraq saxta taymerləri aktivləşdirdik. Bu taymerlərin əsas üstünlüyü testlərin beş saniyə gözləməməsi və komponentin daha qarışıq olmamasıdır.

---

### Snəpşotların Test Edilməsi {#snapshot-testing}

Jest kimi freymvorklarda [`toMatchSnapshot` / `toMatchInlineSnapshot`](https://jestjs.io/docs/en/snapshot-testing) funksiyalarından istifadə edərək məlumatların "snəpşotunu" saxlamaq mümkündür. Bu funksiyalar ilə render olunan komponentin nəticəsini "yadda saxlayıb" bu komponentdə olan dəyişikliyin snəpşotda da olmasını siğortalaya bilərik.

Aşağıdakı nümunədə, komponenti render edib render olunan HTML-i eynisətrli snapşot kimi yadda saxlamadan öncə [`pretty`](https://www.npmjs.com/package/pretty) paketi ilə format edirik:

```jsx{29-31}
// hello.test.js, again

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import pretty from "pretty";

import Hello from "./hello";

let container = null;
beforeEach(() => {
  // DOM elementini render hədəfi kimi təyin edin
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Test bitdikdə təmizlik işləri aparın
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render a greeting", () => {
  act(() => {
    render(<Hello />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... Jest tərəfindən avtomatik doldurulur ... */

  act(() => {
    render(<Hello name="Jenny" />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... Jest tərəfindən avtomatik doldurulur ... */

  act(() => {
    render(<Hello name="Margaret" />, container);
  });

  expect(
    pretty(container.innerHTML)
  ).toMatchInlineSnapshot(); /* ... Jest tərəfindən avtomatik doldurulur ... */
});
```

Snapşot işlətmək əvəzinə xüsusi iddialar etmək daha faydalıdır. Bu testlərin tətbiq detallarından asılı olub tez-tez sındığından komandalar snəpşot testlərindən bezə bilərlər. [Bəzi uşaq komponentləri mok edərək](#mocking-modules) snapşotların ölçüsünü azaldıb bu faylların kod icmalında oxunmasını artıra bilərik.

---

### Bir Neçə Render Etmə Qurğuları {#multiple-renderers}

<<<<<<< HEAD
Bəzi nadir hallarda, bir neçə render etmə qurğusundan istifadə edən komponenti render edə bilərsiniz. Məsələn, hər hansı bir kontenti render etmək üçün uşaq komponentdə `ReactDOM.render`-dən istifadə edən komponentdə `react-test-renderer`-dən istifadə edərək snapşot testləri icra edə bilərsiniz. Bu ssenaridə, hər render etmə qurğusuna məxsus `act()` ilə yenilikləri əhatə edə bilərsiniz.
=======
In rare cases, you may be running a test on a component that uses multiple renderers. For example, you may be running snapshot tests on a component with `react-test-renderer`, that internally uses `render` from `react-dom` inside a child component to render some content. In this scenario, you can wrap updates with `act()`s corresponding to their renderers.
>>>>>>> 664dd5736287e01a4557cd03c9a8736682911b34

```jsx
import { act as domAct } from "react-dom/test-utils";
import { act as testAct, create } from "react-test-renderer";
// ...
let root;
domAct(() => {
  testAct(() => {
    root = create(<App />);
  });
});
expect(root).toMatchSnapshot();
```

---

### Nəsə Çatışmır? {#something-missing}

Əgər hər hansı ümumi ssenari əhatə olunmayıbsa, sənədlər səhifəsinin [issue tracker-indən](https://github.com/reactjs/reactjs.org/issues) bizə yazın.

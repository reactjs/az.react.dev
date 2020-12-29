---
id: legacy-event-pooling
title: Hadisə Pulinqı
permalink: docs/legacy-event-pooling.html
---

>Qeyd
>
>Bu səhifə yalnız React 16 və köhnə versiyaları və React Native üçün münasibdir.
>
>React 17 vebdə event pulinqından **istifadə etmir**.
>
>React 17-dəki bu dəyişiklik haqqında əlavə məlumat almaq üçün [bu bloq yazısını oxuyun](/blog/2020/08/10/react-v17-rc.html#no-event-pooling).

[`SyntheticEvent`](/docs/events.html) obyektləri pul olunurlar. Bu deməkdir ki, hadisə callback-i çağrıldıqdan sonra `SyntheticEvent` obyekti yenidən işlədiləcək və bütün parametrləri sıfırlanacaq. Məsələn, aşağıdakı kod işləməyəcək:

```javascript
function handleChange(e) {
  // Hadisə obyekti yenidən işlənir deyə bu işləməyəcək.
  setTimeout(() => {
    console.log(e.target.value); // Çox gecdir!
  }, 100);
}
```

Hadisə işləyicisi icra olunduqdan sonra hadisənin dəyərlərini oxuya bilmək üçün `e.persist()` funksiyasını çağırmaq lazımdır:

```javascript
function handleChange(e) {
  // React-in hadisə parametrlərini sıfırlarmasının qarşısını alır:
  e.persist();

  setTimeout(() => {
    console.log(e.target.value); // İşləyəcək
  }, 100);
}
```

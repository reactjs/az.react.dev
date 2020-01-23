---
id: concurrent-mode-suspense
title: Məlumat Yüklənməsi üçün Suspense (Eksperimental)
permalink: docs/concurrent-mode-suspense.html
prev: concurrent-mode-intro.html
next: concurrent-mode-patterns.html
---

<style>
.scary > blockquote {
  background-color: rgba(237, 51, 21, 0.2);
  border-left-color: #ed3315;
}
</style>

<div class="scary">

>Caution:
>
>Bu səhifədə **stabil buraxılışlarda [mövcud olmayan](/docs/concurrent-mode-adoption.html) eksperimental xüsusiyyətlərdən danışılır**. Produksiya applikasiyalarında eksperimental qurulmalardan istifadə etməyin. Buradakı xüsusiyyətlər React-in bir hissəsi olana kimi xəbərdalıqsız əhəmiyyətli dərəcədə dəyişilə bilər.
>
>Bu sənədlər erkən məniməyənlən və maraqlanan insanlar üçün yönəldilib. **Əgər React-ə yeni başlayırsınızsa, buradakı xüsusiyyətlərdən narahat olmayın** -- bu xüsusiyyətləri indi öyrənmək lazım deyil. Məsələn, əgər sizə bugün işləyən məlumat yüklənməsi dərsliyi lazımdırsa, [bu məqaləni](https://www.robinwieruch.de/react-hooks-fetch-data/) oxuyun.

</div>

React 16.6-dan başlayaraq bəzi kodların "yüklənib" və yüklənmə vəziyyətini (məsələn, spinner) deklarativ şəkildə təyin etmək üçün `<Suspense>` komponenti əlavə olundu:

```jsx
const ProfilePage = React.lazy(() => import('./ProfilePage')); // lazy şəkildə yüklənir

// Profayl yüklənənə kimi spinner göstərin
<Suspense fallback={<Spinner />}>
  <ProfilePage />
</Suspense>
```

Məlumat Yüklənməsi üçün Suspense `<Suspense>`-dən istifadə edərək **məlumat daxil olmaqla başqa maddələri də "gözləməyə"** imkan yaradan yeni xüsusiyyətdir. Bu səhifədə məlumat yüklənməsi ssenarisindən danışacağıq, amma Suspense ilə şəkillər, skriptlər və digər asinxron işləri də gözləmək mümkündür.

- [Tam Olaraq Suspense Nədir?](#what-is-suspense-exactly)
  - [Suspense Nə Deyil?](#what-suspense-is-not)
  - [Suspense ilə Nə Etmək Mümkündür](#what-suspense-lets-you-do)
- [Suspense-in Praktikada İşlədilməsi](#using-suspense-in-practice)
  - [Realy İşlətmədikdə Nə Olacaq?](#what-if-i-dont-use-relay)
  - [Kitabxana Müəllifləri üçün](#for-library-authors)
- [Ənənəvi Yanaşmalar vs Suspense](#traditional-approaches-vs-suspense)
  - [Yanaşma 1: Render zamanı Yükləmək (Suspense-dən istifadə edilmir)](#approach-1-fetch-on-render-not-using-suspense)
  - [Yanaşma 2: Yüklədikdən sonra Render Etmək (Suspense-dən istifadə edilmir)](#approach-2-fetch-then-render-not-using-suspense)
  - [Approach 3: Yükənən zaman Render Etmək (Suspense ilə)](#approach-3-render-as-you-fetch-using-suspense)
- [Yükləməni Tez Başlayın](#start-fetching-early)
  - [Biz Bunun Üstündə İşləyirik](#were-still-figuring-this-out)
- [Suspense və Ötmə Şərtləri](#suspense-and-race-conditions)
  - [useEffect ilə Ötmə Şərtləri](#race-conditions-with-useeffect)
  - [componentDidUpdate ilə Ötmə Şərtləri](#race-conditions-with-componentdidupdate)
  - [Problem](#the-problem)
  - [Ötmə Şərtlərinin Suspense ilə Həlli](#solving-race-conditions-with-suspense)
- [Xətaların İdarə Olunması](#handling-errors)
- [Sonrakı Addımlar](#next-steps)

## Tam Olaraq Suspense Nədir? {#what-is-suspense-exactly}

Suspense, komponentlərinizin render olunmamışdan öncə nəyisə "gözləməsinə" imkan yaradır. [Aşağıdakı nümunədə](https://codesandbox.io/s/frosty-hermann-bztrp) iki kompontnt asinxron API çağırışlarının bəzi məlumatları yükləməsini gözləyir:

```js
const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Profayl yüklənir...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Yazılar yüklənir...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // İstifadəçi məlumatlarının yüklənməsindən asılı olmayaraq bu məlumatları oxu
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Yazıların yüklənməsindən asılı olmayaraq bu məlumatları oxu
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[CodeSandbox-da Sınayın](https://codesandbox.io/s/frosty-hermann-bztrp)**

Bu nümayiş tizerdir və hələ ki tam anlaşılmırsa narahat olmayın. Biz, aşağıda bunun necə işlədiyi haqqda danışacağıq. Suspense-in bir *mexanizm* olduğunu və nümunədə olan `fetchProfileData()` və ya `resource.posts.read()` kimi API-ların vacib olmadığını yaddan çıxarmayın. Əgər maraqlanırsınızsa, siz bu funksiyaların təriflərini [sandbox-da](https://codesandbox.io/s/frosty-hermann-bztrp) tapa bilərsiniz.

Suspense məlumat yüklənməsi kitabxanası deyil. Bu, **məlumat kitabxanalarının** React-ə **komponentin oxuduğu məlumatın hazır olmadığını** bildirməsi üçün **mexanizmdır**. Bu mexanizm zamanı React, komponentlərin hazır olmasını gözləyir və UI-ı cari vəziyyət əsasında yeniləyir. Biz, Facebook-da Relay və bunun [yeni Suspense inteqrasiyasından](https://relay.dev/docs/en/experimental/step-by-step) istifadə edirik. Biz, Apollo kimi digər kitabxanaların da eyni formalı inteqrasiyalar təmin edəcəyini gözləyirik.

Biz gələcəkdə Suspense-in komponentlərdən asinxron məlumatları oxumaq üçün (məlumatın haradan gəldiyi vacib deyil) əsas yol olacağına niyyət edirik.

### Suspense Nə Deyil {#what-suspense-is-not}

Suspense-in bu problemlər üçün mövcud yanaşmalardan çox fərqləndiyindən bu haqqda ilə dəfə oxuduqda səhv anlayışlara səbəb ola bilər. Gəlin, bəzi anlaşılmazlıqlara aydınlıq gətirək:

 * **Bu, məlumat yüklənməsinin tətbiqi deyil.** Bu mexanizm, sizin GraphQL, REST və ya digər məlumat formatı, ötürücüsü və ya protokolu işlətməniz haqqında heç nə fərz etmir.

 * **Bu, klientdə işlətmək üçün hazır deyil.** `fetch` və ya Relay-i Suspense ilə əvəzləmək mümkün deyil. Lakin, Suspense ilə inteqrasiya olmuş kitabxanalardan (məsələn, [Relay-in yeni API-ları](https://relay.dev/docs/en/experimental/api-reference)) istifadə etmək mümkündür.

 * **Bu mexanizmdə məlumat yüklənməsini görünüş təbəqəsinə qoşmur.** Suspense ilə yüklənmə vəziyyətlərini göstərməyin mümkün olduğuna baxmayaraq bu mexanizm şəbəkə məntiqlərini React komponentlərinə bağlamır.

### Suspense ilə Nə Etmək Mümkündür {#what-suspense-lets-you-do}

Suspense-in mənası nədir? Buna dörd yol ilə cavab vermək olar:

* **Bu, məlumat yüklənməsi kitabxanalarını React ilə dərindən inteqrasiya edilməsinə imkan yaradır.** Əgər məlumat yüklənməsi kitabxanasında Suspense dəstəklənirsə, bu kitabxanaları React komponentlərindən istifadə etmək natural olacaq.

* **Bu, niyyətli dizayn olunmuş yükləmə vəziyyətlərini orkestrasiya etməyə imkan yaradır.** Bu mexanizm, məlumatın _necə_ yükləndiyi haqqında heç nə demir, amma applikasiyanın vizual yükləmə ardıcıllığını yaxından idarə etməyə imkan yaradır.

* **Bu, sizə ötmə şərtlərindən qaçınmağa kömək edirs.** Hətta `await` olduqda belə asinxron kod xətalara meyllidir. Suspense işlətdikdə məlumatların artıq yüklənmiş olduğu və *sinxron* oxunduğu hiss olunur.

## Suspense-in Praktikada İşlədilməsi {#using-suspense-in-practice}

Biz, Facebook-da yalnız Relay-in Suspense inteqrasiyasını işlətmişik. **Əgər başlamaq üçün praktiki bələdçi axtarırsınızsa, [Relay Sənədlərinə](https://relay.dev/docs/en/experimental/step-by-step) baxın!** Burada, produksiyada yaxşı nəticələr göstərən pattern-lər göstərilib.

**Bu səhifədəki nümunələrdə Relay əvəzinə "saxta" API tətbiqlərindən istifadə olunur.** Bu, sizin GraphQL ilə tanışılığınız olmadığı hallda sizin bu anlayışları başa düşmənizi asanlaşdırır. Lakin, bu sənəddə Suspense ilə "düzgün" applikasiyanın yazılması haqqında danışılmır. Bu səhifədə daha çox anlayışlardan danışılır və sizə Suspense-in *niyə* müəyyən formada işləməsini və hansı problemləri həll etməsini görmənizə kömək etməyə.

### What If I Don't Use Relay? {#what-if-i-dont-use-relay}

If you don't use Relay today, you might have to wait before you can really try Suspense in your app. So far, it's the only implementation that we tested in production and are confident in.

Over the next several months, many libraries will appear with different takes on Suspense APIs. **If you prefer to learn when things are more stable, you might prefer to ignore this work for now, and come back when the Suspense ecosystem is more mature.**

You can also write your own integration for a data fetching library, if you'd like.

### For Library Authors {#for-library-authors}

We expect to see a lot of experimentation in the community with other libraries. There is one important thing to note for data fetching library authors.

Although it's technically doable, Suspense is **not** currently intended as a way to start fetching data when a component renders. Rather, it lets components express that they're "waiting" for data that is *already being fetched*. **[Building Great User Experiences with Concurrent Mode and Suspense](/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html) describes why this matters and how to implement this pattern in practice.**

Unless you have a solution that helps prevent waterfalls, we suggest to prefer APIs that favor or enforce fetching before render. For a concrete example, you can look at how [Relay Suspense API](https://relay.dev/docs/en/experimental/api-reference#usepreloadedquery) enforces preloading. Our messaging about this hasn't been very consistent in the past. Suspense for Data Fetching is still experimental, so you can expect our recommendations to change over time as we learn more from production usage and understand the problem space better.

## Traditional Approaches vs Suspense {#traditional-approaches-vs-suspense}

We could introduce Suspense without mentioning the popular data fetching approaches. However, this makes it more difficult to see which problems Suspense solves, why these problems are worth solving, and how Suspense is different from the existing solutions.

Instead, we'll look at Suspense as a logical next step in a sequence of approaches:

* **Fetch-on-render (for example, `fetch` in `useEffect`):** Start rendering components. Each of these components may trigger data fetching in their effects and lifecycle methods. This approach often leads to "waterfalls".
* **Fetch-then-render (for example, Relay without Suspense):** Start fetching all the data for the next screen as early as possible. When the data is ready, render the new screen. We can't do anything until the data arrives.
* **Render-as-you-fetch (for example, Relay with Suspense):** Start fetching all the required data for the next screen as early as possible, and start rendering the new screen *immediately — before we get a network response*. As data streams in, React retries rendering components that still need data until they're all ready.

>Note
>
>This is a bit simplified, and in practice solutions tend to use a mix of different approaches. Still, we will look at them in isolation to better contrast their tradeoffs.

To compare these approaches, we'll implement a profile page with each of them.

### Approach 1: Fetch-on-Render (not using Suspense) {#approach-1-fetch-on-render-not-using-suspense}

A common way to fetch data in React apps today is to use an effect:

```js
// In a function component:
useEffect(() => {
  fetchSomething();
}, []);

// Or, in a class component:
componentDidMount() {
  fetchSomething();
}
```

We call this approach "fetch-on-render" because it doesn't start fetching until *after* the component has rendered on the screen. This leads to a problem known as a "waterfall".

Consider these `<ProfilePage>` and `<ProfileTimeline>` components:

```js{4-6,22-24}
function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser().then(u => setUser(u));
  }, []);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline />
    </>
  );
}

function ProfileTimeline() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts().then(p => setPosts(p));
  }, []);

  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/fragrant-glade-8huj6)**

If you run this code and watch the console logs, you'll notice the sequence is:

1. We start fetching user details
2. We wait...
3. We finish fetching user details
4. We start fetching posts
5. We wait...
6. We finish fetching posts

If fetching user details takes three seconds, we'll only *start* fetching the posts after three seconds! That's a "waterfall": an unintentional *sequence* that should have been parallelized.

Waterfalls are common in code that fetches data on render. They're possible to solve, but as the product  grows, many people prefer to use a solution that guards against this problem.

### Approach 2: Fetch-Then-Render (not using Suspense) {#approach-2-fetch-then-render-not-using-suspense}

Libraries can prevent waterfalls by offering a more centralized way to do data fetching. For example, Relay solves this problem by moving the information about the data a component needs to statically analyzable *fragments*, which later get composed into a single query.

On this page, we don't assume knowledge of Relay, so we won't be using it for this example. Instead, we'll write something similar manually by combining our data fetching methods:

```js
function fetchProfileData() {
  return Promise.all([
    fetchUser(),
    fetchPosts()
  ]).then(([user, posts]) => {
    return {user, posts};
  })
}
```

In this example,  `<ProfilePage>` waits for both requests but starts them in parallel:

```js{1,2,8-13}
// Kick off fetching as early as possible
const promise = fetchProfileData();

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    promise.then(data => {
      setUser(data.user);
      setPosts(data.posts);
    });
  }, []);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline posts={posts} />
    </>
  );
}

// The child doesn't trigger fetching anymore
function ProfileTimeline({ posts }) {
  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/wandering-morning-ev6r0)**

The event sequence now becomes like this:

1. We start fetching user details
2. We start fetching posts
3. We wait...
4. We finish fetching user details
5. We finish fetching posts

We've solved the previous network "waterfall", but accidentally introduced a different one. We wait for *all* data to come back with `Promise.all()` inside `fetchProfileData`, so now we can't render profile details until the posts have been fetched too. We have to wait for both.

Of course, this is possible to fix in this particular example. We could remove the `Promise.all()` call, and wait for both Promises separately. However, this approach gets progressively more difficult as the complexity of our data and component tree grows. It's hard to write reliable components when arbitrary parts of the data tree may be missing or stale. So fetching all data for the new screen and *then* rendering is often a more practical option.

### Approach 3: Render-as-You-Fetch (using Suspense) {#approach-3-render-as-you-fetch-using-suspense}

In the previous approach, we fetched data before we called `setState`:

1. Start fetching
2. Finish fetching
3. Start rendering

With Suspense, we still start fetching first, but we flip the last two steps around:

1. Start fetching
2. **Start rendering**
3. **Finish fetching**

**With Suspense, we don't wait for the response to come back before we start rendering.** In fact, we start rendering *pretty much immediately* after kicking off the network request:

```js{2,17,23}
// This is not a Promise. It's a special object from our Suspense integration.
const resource = fetchProfileData();

function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/frosty-hermann-bztrp)**

Here's what happens when we render `<ProfilePage>` on the screen:

1. We've already kicked off the requests in `fetchProfileData()`. It gave us a special "resource" instead of a Promise. In a realistic example, it would be provided by our data library's Suspense integration, like Relay.
2. React tries to render `<ProfilePage>`. It returns `<ProfileDetails>` and `<ProfileTimeline>` as children.
3. React tries to render `<ProfileDetails>`. It calls `resource.user.read()`. None of the data is fetched yet, so this component "suspends". React skips over it, and tries rendering other components in the tree.
4. React tries to render `<ProfileTimeline>`. It calls `resource.posts.read()`. Again, there's no data yet, so this component also "suspends". React skips over it too, and tries rendering other components in the tree.
5. There's nothing left to try rendering. Because `<ProfileDetails>` suspended, React shows the closest `<Suspense>` fallback above it in the tree: `<h1>Loading profile...</h1>`. We're done for now.

This `resource` object represents the data that isn't there yet, but might eventually get loaded. When we call `read()`, we either get the data, or the component "suspends".

**As more data streams in, React will retry rendering, and each time it might be able to progress "deeper".** When `resource.user` is fetched, the `<ProfileDetails>` component will render successfully and we'll no longer need the `<h1>Loading profile...</h1>` fallback. Eventually, we'll get all the data, and there will be no fallbacks on the screen.

This has an interesting implication. Even if we use a GraphQL client that collects all data requirements in a single request, *streaming the response lets us show more content sooner*. Because we render-*as-we-fetch* (as opposed to *after* fetching), if `user` appears in the response earlier than `posts`, we'll be able to "unlock" the outer `<Suspense>` boundary before the response even finishes. We might have missed this earlier, but even the fetch-then-render solution contained a waterfall: between fetching and rendering. Suspense doesn't inherently suffer from this waterfall, and libraries like Relay take advantage of this.

Note how we eliminated the `if (...)` "is loading" checks from our components. This doesn't only remove boilerplate code, but it also simplifies making quick design changes. For example, if we wanted profile details and posts to always "pop in" together, we could delete the `<Suspense>` boundary between them. Or we could make them independent from each other by giving each *its own* `<Suspense>` boundary. Suspense lets us change the granularity of our loading states and orchestrate their sequencing without invasive changes to our code.

## Start Fetching Early {#start-fetching-early}

If you're working on a data fetching library, there's a crucial aspect of Render-as-You-Fetch you don't want to miss. **We kick off fetching _before_ rendering.** Look at this code example closer:

```js
// Start fetching early!
const resource = fetchProfileData();

// ...

function ProfileDetails() {
  // Try to read user info
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/frosty-hermann-bztrp)**

Note that the `read()` call in this example doesn't *start* fetching. It only tries to read the data that is **already being fetched**. This difference is crucial to creating fast applications with Suspense. We don't want to delay loading data until a component starts rendering. As a data fetching library author, you can enforce this by making it impossible to get a `resource` object without also starting a fetch. Every demo on this page using our "fake API" enforces this.

You might object that fetching "at the top level" like in this example is impractical. What are we going to do if we navigate to another profile's page? We might want to fetch based on props. The answer to this is **we want to start fetching in the event handlers instead**. Here is a simplified example of navigating between user's pages:

```js{1,2,10,11}
// First fetch: as soon as possible
const initialResource = fetchProfileData(0);

function App() {
  const [resource, setResource] = useState(initialResource);
  return (
    <>
      <button onClick={() => {
        const nextUserId = getNextId(resource.userId);
        // Next fetch: when the user clicks
        setResource(fetchProfileData(nextUserId));
      }}>
        Next
      </button>
      <ProfilePage resource={resource} />
    </>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/infallible-feather-xjtbu)**

With this approach, we can **fetch code and data in parallel**. When we navigate between pages, we don't need to wait for a page's code to load to start loading its data. We can start fetching both code and data at the same time (during the link click), delivering a much better user experience.

This poses a question of how do we know *what* to fetch before rendering the next screen. There are several ways to solve this (for example, by integrating data fetching closer with your routing solution). If you work on a data fetching library, [Building Great User Experiences with Concurrent Mode and Suspense](/blog/2019/11/06/building-great-user-experiences-with-concurrent-mode-and-suspense.html) presents a deep dive on how to accomplish this and why it's important.

### We're Still Figuring This Out {#were-still-figuring-this-out}

Suspense itself as a mechanism is flexible and doesn't have many constraints. Product code needs to be more constrained to ensure no waterfalls, but there are different ways to provide these guarantees. Some questions that we're currently exploring include:

* Fetching early can be cumbersome to express. How do we make it easier to avoid waterfalls?
* When we fetch data for a page, can the API encourage including data for instant transitions *from* it?
* What is the lifetime of a response? Should caching be global or local? Who manages the cache?
* Can Proxies help express lazy-loaded APIs without inserting `read()` calls everywhere?
* What would the equivalent of composing GraphQL queries look like for arbitrary Suspense data?

Relay has its own answers to some of these questions. There is certainly more than a single way to do it, and we're excited to see what new ideas the React community comes up with.

## Suspense and Race Conditions {#suspense-and-race-conditions}

Race conditions are bugs that happen due to incorrect assumptions about the order in which our code may run. Fetching data in the `useEffect` Hook or in class lifecycle methods like `componentDidUpdate` often leads to them. Suspense can help here, too — let's see how.

To demonstrate the issue, we will add a top-level `<App>` component that renders our `<ProfilePage>` with a button that lets us **switch between different profiles**:

```js{9-11}
function getNextId(id) {
  // ...
}

function App() {
  const [id, setId] = useState(0);
  return (
    <>
      <button onClick={() => setId(getNextId(id))}>
        Next
      </button>
      <ProfilePage id={id} />
    </>
  );
}
```

Let's compare how different data fetching strategies deal with this requirement.

### Race Conditions with `useEffect` {#race-conditions-with-useeffect}

First, we'll try a version of our original "fetch in effect" example. We'll modify it to pass an `id` parameter from the `<ProfilePage>` props to `fetchUser(id)` and `fetchPosts(id)`:

```js{1,5,6,14,19,23,24}
function ProfilePage({ id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(id).then(u => setUser(u));
  }, [id]);

  if (user === null) {
    return <p>Loading profile...</p>;
  }
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline id={id} />
    </>
  );
}

function ProfileTimeline({ id }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts(id).then(p => setPosts(p));
  }, [id]);

  if (posts === null) {
    return <h2>Loading posts...</h2>;
  }
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/nervous-glade-b5sel)**

Note how we also changed the effect dependencies from `[]` to `[id]` — because we want the effect to re-run when the `id` changes. Otherwise, we wouldn't refetch new data.

If we try this code, it might seem like it works at first. However, if we randomize the delay time in our "fake API" implementation and press the "Next" button fast enough, we'll see from the console logs that something is going very wrong. **Requests from the previous profiles may sometimes "come back" after we've already switched the profile to another ID -- and in that case they can overwrite the new state with a stale response for a different ID.**

This problem is possible to fix (you could use the effect cleanup function to either ignore or cancel stale requests), but it's unintuitive and difficult to debug.

### Race Conditions with `componentDidUpdate` {#race-conditions-with-componentdidupdate}

One might think that this is a problem specific to `useEffect` or Hooks. Maybe if we port this code to classes or use convenient syntax like `async` / `await`, it will solve the problem?

Let's try that:

```js
class ProfilePage extends React.Component {
  state = {
    user: null,
  };
  componentDidMount() {
    this.fetchData(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }
  async fetchData(id) {
    const user = await fetchUser(id);
    this.setState({ user });
  }
  render() {
    const { id } = this.props;
    const { user } = this.state;
    if (user === null) {
      return <p>Loading profile...</p>;
    }
    return (
      <>
        <h1>{user.name}</h1>
        <ProfileTimeline id={id} />
      </>
    );
  }
}

class ProfileTimeline extends React.Component {
  state = {
    posts: null,
  };
  componentDidMount() {
    this.fetchData(this.props.id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.fetchData(this.props.id);
    }
  }
  async fetchData(id) {
    const posts = await fetchPosts(id);
    this.setState({ posts });
  }
  render() {
    const { posts } = this.state;
    if (posts === null) {
      return <h2>Loading posts...</h2>;
    }
    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    );
  }
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/trusting-clarke-8twuq)**

This code is deceptively easy to read.

Unfortunately, neither using a class nor the `async` / `await` syntax helped us solve this problem. This version suffers from exactly the same race conditions, for the same reasons.

### The Problem {#the-problem}

React components have their own "lifecycle". They may receive props or update state at any point in time. However, each asynchronous request *also* has its own "lifecycle". It starts when we kick it off, and finishes when we get a response. The difficulty we're experiencing is "synchronizing" several processes in time that affect each other. This is hard to think about.

### Solving Race Conditions with Suspense {#solving-race-conditions-with-suspense}

Let's rewrite this example again, but using Suspense only:

```js
const initialResource = fetchProfileData(0);

function App() {
  const [resource, setResource] = useState(initialResource);
  return (
    <>
      <button onClick={() => {
        const nextUserId = getNextId(resource.userId);
        setResource(fetchProfileData(nextUserId));
      }}>
        Next
      </button>
      <ProfilePage resource={resource} />
    </>
  );
}

function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails({ resource }) {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/infallible-feather-xjtbu)**

In the previous Suspense example, we only had one `resource`, so we held it in a top-level variable. Now that we have multiple resources, we moved it to the `<App>`'s component state:

```js{4}
const initialResource = fetchProfileData(0);

function App() {
  const [resource, setResource] = useState(initialResource);
```

When we click "Next", the `<App>` component kicks off a request for the next profile, and passes *that* object down to the `<ProfilePage>` component:

```js{4,8}
  <>
    <button onClick={() => {
      const nextUserId = getNextId(resource.userId);
      setResource(fetchProfileData(nextUserId));
    }}>
      Next
    </button>
    <ProfilePage resource={resource} />
  </>
```

Again, notice that **we're not waiting for the response to set the state. It's the other way around: we set the state (and start rendering) immediately after kicking off a request**. As soon as we have more data, React "fills in" the content inside `<Suspense>` components.

This code is very readable, but unlike the examples earlier, the Suspense version doesn't suffer from race conditions. You might be wondering why. The answer is that in the Suspense version, we don't have to think about *time* as much in our code. Our original code with race conditions needed to set the state *at the right moment later*, or otherwise it would be wrong. But with Suspense, we set the state *immediately* -- so it's harder to mess it up.

## Handling Errors {#handling-errors}

When we write code with Promises, we might use `catch()` to handle errors. How does this work with Suspense, given that we don't *wait* for Promises to start rendering?

With Suspense, handling fetching errors works the same way as handling rendering errors -- you can render an [error boundary](/docs/error-boundaries.html) anywhere to "catch" errors in components below.

First, we'll define an error boundary component to use across our project:

```js
// Error boundaries currently have to be classes.
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

And then we can put it anywhere in the tree to catch errors:

```js{5,9}
function ProfilePage() {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails />
      <ErrorBoundary fallback={<h2>Could not fetch posts.</h2>}>
        <Suspense fallback={<h1>Loading posts...</h1>}>
          <ProfileTimeline />
        </Suspense>
      </ErrorBoundary>
    </Suspense>
  );
}
```

**[Try it on CodeSandbox](https://codesandbox.io/s/adoring-goodall-8wbn7)**

It would catch both rendering errors *and* errors from Suspense data fetching. We can have as many error boundaries as we like but it's best to [be intentional](https://aweary.dev/fault-tolerance-react/) about their placement.

## Next Steps {#next-steps}

We've now covered the basics of Suspense for Data Fetching! Importantly, we now better understand *why* Suspense works this way, and how it fits into the data fetching space.

Suspense answers some questions, but it also poses new questions of its own:

* If some component "suspends", does the app freeze? How to avoid this?
* What if we want to show a spinner in a different place than "above" the component in a tree?
* If we intentionally *want* to show an inconsistent UI for a small period of time, can we do that?
* Instead of showing a spinner, can we add a visual effect like "greying out" the current screen?
* Why does our [last Suspense example](https://codesandbox.io/s/infallible-feather-xjtbu) log a warning when clicking the "Next" button?

To answer these questions, we will refer to the next section on [Concurrent UI Patterns](/docs/concurrent-mode-patterns.html).

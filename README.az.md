# az.reactjs.org

Bu repo-da [az.reactjs.org](https://az.reactjs.org/) səhifəsinin mənbə kodu yerləşir.

## Getting started

### Prerequisites

1. Git
1. Node: 8.4.0 və ya yuxarı hər hansı 8.x versiyası
1. Yarn: [Quraşdırma təlimatları üçün Yarn səhifəsinə](https://yarnpkg.com/lang/en/docs/install/) baxın
1. repo-nun forku (hər hansı kontribusiya üçün)
1. [az.reactjs.org reposunun](https://github.com/reactjs/az.reactjs.org) lokal maşında klonu

### Quraşdırma

1. Layihə direktosiyasına daxil olmaq üçün `cd az.reactjs.org` yazın
1. Veb Səhifənin npm asılılıqlarını yükləmək üçün `yarn` yazın

### Lokal İstifadə

1. `yarn dev` yazaraq hot-reload olan təkminləşdirmə serverini başladın ([Gatsby](https://www.gatsbyjs.org) ilə işləyir)
1. `open http://localhost:8000` yazaraq səhifəni sevdiyiniz brauzerdə açın

## Kontribusiya

### Qaydalar

Sənədlər fərqli ton və məqsəd ilə yazılmış bir neçə bölməyə bölünüblər. Əgər siz birdən çox cümlə yazmaq istəyirsinizsə uyğun bölməyə aid [kontribusiya qaydaları ilə](https://github.com/reactjs/az.reactjs.org/blob/master/CONTRIBUTING.md#guidelines-for-text) tanış olun.

### Branch yaradın

1. `az.reactjs.org` repo-su olan lokal directoriyadan `git checkout master` çağırın
1. Ən yeni kodun olduğundan əmin olmaq üçün `git pull origin master` yazın
1. Branch yaratmaq üçün `git checkout -b the-name-of-my-branch` (`the-name-of-my-branch`-i uyğun ad ilə dəyişin) yazın

### Dəyişikliklər edin

1. "Lokal İstifadə" təlimatlarına baxın
1. Faylları yaddaşa yazın və brauzerdə yoxlayın
  1. `src`-da React komponentlərə olan dəyişikliklər hot-reload edəcək
  1. Changes to markdown files in `content`-də olan markdown fayllarına olan dəyişikliklər hot-reload edəcək
  1. Pluginlər işə işləyirsinizsə `.cache` direktoriyasını silib serveri restart edin

### Dəyişiklikləri yoxlayın

1. Əgər mümkündürsə, vizual dəyişiklikləri bütün sıravi mobil və desktop brauzerlərinin ən yeni versiyalarında yoxlayın.
1. Layihə direktoriyasından `yarn check-all` çağırın. (Bu Prettier, ESLint, və Flow çağıracaq.)

### Push edin

1. `git add -A && git commit -m "My message"` (`My message`-i commit mesajı ilə dəyişin. Məsələn, `Fix header logo on Android`) çağıraraq dəyişiklikləri stage və commit edin
1. `git push my-fork-name the-name-of-my-branch`
1. [az.reactjs.org repo-suna](https://github.com/reactjs/az.reactjs.org) baxdıqda push etdiyiniz branch-ləri görəcəksiniz.
1. GitHub-ın təlimatlarını tətbiq edin.
1. Əgər mümkündürsə, vizual dəyişikliklərin skrinşotlarını daxil edin. Digərlərinin sizin dəyişiklikləri görə bilməsi üçün PR yaranan kimi Netlify səhifəsi avtomatik olaraq düzəldiləcək.

## Tərcümə

Əgər `az.reactjs.org` tərcümə etmək istəyirsinizsə, [isreacttranslatedyet.com](https://www.isreacttranslatedyet.com/) səhifəsində olan indiki tərcümə səylərinə baxın.

## Problemləri Aradan Qaldlrmaq

- `yarn reset` çağıraraq lokal kəçi təmizləyin

## Lisenziya

[az.reactjs.org](https://az.reactjs.org/) səhifəsinə yüklənən konten CC-BY-4.0 ilə lisenziya olunub. Lisenziyanı[LICENSE-DOCS.md](https://github.com/open-source-explorer/reactjs.org/blob/master/LICENSE-DOCS.md) faylından tapa bilərsiniz.

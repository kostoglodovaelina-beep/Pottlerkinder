# Pottlerkinder — handoff для следующего чата Figma Make AI

## Зачем нужен этот файл

Это рабочая карта проекта для нового агента ChatGPT / Figma Make AI. Прочитай её **до любых правок**. Пользователь перенесёт весь репозиторий в новый Make-проект и хочет продолжить разработку без повторного анализа сайта с нуля.

Нельзя удалять, переписывать или упрощать существующую структуру без прямой просьбы пользователя. Это работающий интернет-магазин, а не демонстрационный макет.

---

## Что это за проект

**Pottlerkinder** — немецкий интернет-магазин одежды, подарков и персонализированной печати. В нём есть:

- главная маркетинговая страница, каталог и страницы товаров;
- собственная дизайн-студия для нанесения текста и изображений на одежду, кружки, шопперы и головные уборы;
- корзина и переход в реальный Shopify Checkout;
- личный кабинет Shopify Customer Account;
- правовые страницы для немецкого магазина;
- деплой фронтенда и serverless API на Vercel.

Язык интерфейса — немецкий. Пользователь обычно пишет задачи по-русски.

---

## Технологии и запуск

- React 19 + TypeScript + Vite 8.
- Tailwind CSS v4, но большая часть существующего визуального стиля находится в `src/index.css`.
- Основной экран и почти вся логика: `src/App.tsx`.
- Точка входа: `src/main.tsx` → `src/App.tsx`, CSS: `src/index.css` и `src/forbidden-modal.css`.
- Пакеты: `react`, `react-dom`, `react-icons`, `react-colorful`.
- Разработка: `pnpm dev`; production-проверка: `pnpm build`.
- В Make Vite dev server обычно уже запущен: не запускай второй без необходимости.

В приложении **нет React Router**. Роутинг вручную реализован внизу `src/App.tsx` через `window.location.pathname`. Ссылки должны вести обычным `href`, а не разрушать этот подход.

Ключевые маршруты:

| URL | Назначение |
| --- | --- |
| `/` | главная |
| `/katalog` | каталог Shopify |
| `/katalog/:handle` | страница одного Shopify-товара |
| `/warenkorb` | корзина |
| `/designer` | дизайн-студия |
| `/account` | Shopify customer account |
| `/agb`, `/datenschutz`, `/impressum`, `/versandkosten`, `/rueckgabe-umtausch`, `/widerrufsbelehrung`, `/zahlung` | юридические и сервисные страницы |

`vercel.json` делает SPA fallback. Он обязан остаться, иначе прямой вход на `/designer` или `/katalog/:handle` сломается:

```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

---

## Внешние системы и переменные окружения

### Shopify

Shopify — источник реального каталога, товаров, вариантов, стока, корзины, checkout и customer accounts.

Серверные API находятся в `api/`:

| Файл | Назначение |
| --- | --- |
| `api/_shopify.js` | безопасная обвязка Shopify Admin и Storefront GraphQL, обработка ошибок |
| `api/products.js` | публичный для фронтенда каталог активных продаваемых товаров |
| `api/cart.js` | Shopify Storefront Cart API: create/get/add/update/remove/detach |
| `api/customer-account.js` | OAuth/PKCE Shopify Customer Account, профиль, адреса, заказы |
| `api/admin/products.js` | защищённый административный endpoint; не открывать в браузер без Bearer secret |

В Vercel должны быть настроены, но **никогда не записывай значения в код, git или этот файл**:

```text
SHOPIFY_STORE_DOMAIN
SHOPIFY_STOREFRONT_ACCESS_TOKEN
SHOPIFY_ADMIN_ACCESS_TOKEN
# либо вместо предыдущего Admin token:
SHOPIFY_CLIENT_ID
SHOPIFY_CLIENT_SECRET
SHOPIFY_API_VERSION                # необязательна, по умолчанию 2026-07
POTTLER_ADMIN_SECRET               # для /api/admin/products
VITE_SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID
SHOPIFY_CUSTOMER_ACCOUNT_CALLBACK_URL
```

`SHOPIFY_CUSTOMER_ACCOUNT_CALLBACK_URL` сейчас должен указывать на production callback вида:

```text
https://pottlerkinder.vercel.app/api/customer-account?action=callback
```

При переносе в другой Vercel-проект нужно изменить этот URL в Shopify Customer Account app и в Vercel environment variables. Иначе авторизация личного кабинета не вернётся на сайт.

### Vercel

- Vercel подключён к GitHub и делает деплой при push.
- API находятся в папке `/api`, это Vercel Functions.
- Изображения должны быть обычными файлами репозитория. Раньше Git LFS ломал build (`git lfs pull` без корректного remote). Не добавляй `git lfs pull` в Build Command и не возвращай LFS filter для этих assets.
- Обычная команда сборки: `pnpm build`.

---

## Каталог и Shopify-варианты

Каталог загружается из Shopify через `/api/products`. Товары должны быть `ACTIVE`, а вариант — доступным для продажи; отслеживаемые варианты с нулевым остатком отфильтровываются сервером.

В `src/App.tsx`:

- `shopifyCatalogProduct()` приводит ответ Shopify к UI-модели;
- `useShopifyCatalog()` загружает каталог/страницу товара;
- `SHOPIFY_CATEGORY_MAP`, `SHOPIFY_GENDER_MAP`, `SHOPIFY_SUBCATEGORY_MAP` и `SHOPIFY_COLORS` связывают Shopify tags/options с фильтрами и swatches;
- `CatalogPage`, `ProductPage`, `ShopifyProductPage`, `CatalogAddToCartButton` отвечают за каталог и товар.

В Shopify для корректной карточки рекомендуется:

- заполнить title, handle, описание, Product type, featured image и media;
- использовать варианты с опциями `Size` / `Größe` и `Color` / `Farbe`;
- применять существующие tags для пола, категории и подкатегории;
- указывать реальный inventory и `availableForSale`.

Не возвращай тестовый товар в код: раньше его временно добавляли для проверки и затем полностью удалили.

---

## Корзина: важнейшая текущая архитектура

Корзина должна быть синхронизирована между:

- кнопкой в каталоге;
- кнопкой на странице товара с выбранными размером и цветом;
- счётчиком и drawer в Header;
- полной страницей `/warenkorb`;
- Shopify Checkout.

Источник истины — Shopify cart. В браузере cart ID хранится как:

```text
localStorage["pottlerkinder-cart-id"]
```

Верх `src/App.tsx` содержит общий in-memory store:

```ts
cartSubscribers
sharedCart
sharedCartRequest
publishCart(cart)
cartHasVariant(cart, variantId)
cartWithoutLine(cart, lineId)
cartWithLineQuantity(cart, lineId, quantity)
```

`useShopifyCart()` используется в Header, CatalogPage, ProductPage, SalePage и CartPage. Он дедуплицирует начальное `get`-запрашивание: сколько бы компонентов ни смонтировалось, нужен один запрос к корзине, а не по одному на компонент.

После `create/add/update/remove` обязательно вызывай `publishCart(response.cart)`. Именно это обновляет все кнопки одновременно:

- текущий вариант в Shopify-корзине → зелёная кнопка/надпись `HINZUGEFÜGT` или `IM WARENKORB`;
- варианта нет → красная кнопка `IN DEN WARENKORB`;
- удаление или смена количества сначала оптимистично обновляет интерфейс, затем подтверждается Shopify; при ошибке UI возвращается к предыдущей корзине.

Не добавляй `refreshCart()` в `onClick` открытия drawer: ранее это создавало лишние запросы. Не делай предварительный отдельный Storefront query для проверки стока перед каждой cart mutation: Shopify cart mutation уже возвращает `userErrors`, и это ускорено в `api/cart.js`.

`api/cart.js` получает `quantityAvailable`, поэтому контролы `− / +` ограничивают количество доступным стоком. Серверная cart mutation — окончательная защита от стока/доступности.

---

## Дизайн-студия `/designer`

`DesignerStudio` расположен в `src/App.tsx` примерно после строки 7000. Это большой, чувствительный stateful компонент. Не переписывай его целиком.

Он умеет:

- выбрать товар: hoodie, t-shirt, polo, sweatshirt, shirt, `Tasse Two Tone`, shopper, headwear;
- выбрать пол, размер, модель, цвет и сторону `front/back`;
- добавить одну картинку на сторону и до двух текстовых слоёв;
- перемещать, масштабировать, вращать объект и текст; менять шрифт/цвет/яркость/контраст;
- показывать review перед переходом в корзину;
- хранить разные макеты лицевой и задней стороны;
- undo/redo (до 10 состояний);
- сохранять draft в localStorage и сами изображения в IndexedDB.

Ключи хранилища:

```text
localStorage["pottlerkinder-designer-draft-v1"]
localStorage["pottlerkinder-copyright-upload-confirmed"]
IndexedDB: pottlerkinder-designer-images / images
```

Пользовательские изображения не должны храниться как base64 в React dependencies / localStorage: это раньше вызывало React error о меняющемся массиве dependencies и большие данные. Сейчас изображение сразу показывается через `URL.createObjectURL`, а IndexedDB используется лишь для восстановления после обновления страницы.

### Авторские права и запрещённые темы

Перед первой загрузкой собственного изображения открывается диалог `URHEBERRECHT BESTÄTIGEN`. После подтверждения сразу должен открываться системный file picker. Browser запоминает согласие по ключу `pottlerkinder-copyright-upload-confirmed`; повторно не спрашивать.

Подсказка `VERBOTENE THEMEN` открывает отдельный modal. Его текст касается торговых марок, авторских прав, экстремизма, ненависти, насилия, эротического контента, терроризма, наркотиков, суицида, государственной/коммерческой тайны и т. п. Не удаляй этот блок без явной просьбы.

### Модели, assets и печатные области

Все мокапы лежат в `src/assets/designer/`, сгруппированы по товару, полу и стороне. Для массовых наборов используются `import.meta.glob`, поэтому нельзя заменять их строковыми путями `/src/...` — production Vite тогда может сломать asset URL.

`PRINT_ZONE_POSITIONS` — статичный справочник в `App.tsx`. Координаты заданы в процентах (`x`, `y`, `width`, `height`) и разделены ключом:

```text
productId:gender:model:side
```

Пример: `"shirt:FRAUEN:STANDARD:back"`.

Пользователь вручную отстроил эти области и попросил закрепить их. Они одинаковы для всех цветов одной модели. Не возвращай UI редактирования print zone без прямой просьбы пользователя; не меняй координаты случайно.

Текущие специальные решения:

- задник женской рубашки Sol's исправлялся по третьему фото поставщика; нижние надписи/мусор на заднике были удалены из asset без изменения самой рубашки;
- у женской рубашки область печати на заднике намеренно совпадает с передней областью женского hoodie;
- `Tasse Two Tone`: собственные цветные мокапы в `src/assets/designer/mug/two-tone/`; визуальная логика включает белый корпус, цветной верх/ручку, разметку трёх печатных секторов и центральную пунктирную зону печати;
- shopper и mug — one-size товары без выбора gender.

---

## Цена, доставка и правовые страницы

Цена товара — цена из Shopify. Стоимость печати `+4,99 €` добавляется в дизайнере **только если на соответствующей стороне действительно есть изображение или текст**. Если пользователь очистил сторону, стоимость этой стороны должна исчезнуть. Не копируй контент с front на back или наоборот автоматически.

Во всех видимых товарных ценах используется `PriceLegalNote()`:

```text
inkl. MwSt., zzgl. Versandkosten [1]
```

`Versandkosten` — кликабельная кнопка, которая открывает `ShippingCostsDialog`; текущая ставка в интерфейсе: **6,15 €**, бесплатная доставка от **85,00 €**. Сумма корзины рассчитывает доставку с теми же значениями.

Правовые страницы — объект `LEGAL_PAGES` в `App.tsx`. Они обёрнуты в `PageShell`, но сам текст расположен в серьёзном белом документе на мягком светлом фоне. Не делай их отдельным "пустым белым экраном" без сайта.

Файлы-источники, добавленные пользователем, находятся в `src/imports/`:

- `Allgemeine_Gesch_ftsbedingungen.docx`
- `DATENSCHUTZERKL_RUNG.docx`
- `IMPRESSUM.docx`
- `POTTLERKINDER_R_CKGABE_und_UMTAUSCH.docx`
- `VERSAND.docx`
- `WIDERRUFSBELEHRUNG.docx`

Опубликованный текст должен сохранять смысл именно этих документов. Везде на опубликованном сайте перевозчики сейчас единообразно: **DHL / GLS** (не Deutsche Post).

Это не юридическая консультация: при запуске магазина пользователь должен сверить реальные платежи, cookie/analytics, Widerrufsformular и Shopify Checkout с немецким юристом или Legal-Tech сервисом.

---

## Визуальный язык и UX

- Главный сайт: тёмный, индустриальный Ruhrpott/streetwear стиль, красный акцент, контрастная типографика (`Oswald`, `Montserrat`, `Inter`).
- Страницы юридических документов: белая документная карточка, чёрный текст, спокойная читабельная верстка, при этом Header/Footer сайта остаются.
- Кнопки добавления в корзину: красные по умолчанию, зелёные для уже добавленной конкретной вариации.
- Не уменьшай юридическую строку цены до нечитаемого размера. Это особенно важно в каталоге, карточке товара, конструкторе и корзине.
- Пользователь часто просит профессиональную UX/UI-полировку. Сохраняй существующий дизайн и делай локальные аккуратные правки, а не масштабные стилистические переписывания.

---

## Недавние выполненные задачи

1. Каталог переведён на данные Shopify и добавлены карточки/страницы товаров.
2. Подключены корзина Shopify, checkout и Shopify Customer Account.
3. Исправлена Shopify inventory scope ошибка для `quantityAvailable` и ограничение количества в UI.
4. Изображения Vercel больше не требуют LFS; команда build — `pnpm build`.
5. Ссылки бренда и логотипа ведут на `/`; дизайн-студия открывается по `/designer`.
6. Сделаны legal/footer страницы и юридическое отображение цен.
7. Дизайн-студия получила устойчивую загрузку изображений, сохранение черновика, copyright confirmation, modal запрещённых тем, review и многочисленные мокапы/печать.
8. Координаты print zones зафиксированы для всех моделей/цветов.
9. Убраны тестовые товары из кода.
10. Последняя техническая работа: корзина сделана общей для всех поверхностей UI, удалены лишние cart validation requests и focus-reloads каталога, добавлены optimistic remove/update с rollback.

---

## Как безопасно продолжать работу

1. Сначала прочитай `AGENTS.md`, затем этот файл, затем только нужные части `src/App.tsx`/`src/index.css`.
2. Сохраняй ручные изменения пользователя: проверяй `git status --short` перед правками.
3. Для поиска используй `rg`; не переписывай огромный `App.tsx` полностью ради небольшой задачи.
4. Для текстовых правок применяй patch; не удаляй assets и не запускай destructive git-команды без явной просьбы.
5. При изменениях UI проверяй desktop и mobile. При архитектурных/API правках запускай `pnpm build`.
6. Не выводи секреты из Vercel, Shopify или `.env` в чат/файлы/логи.
7. Если Vercel API отдаёт 500, сначала проверить environment variables и Vercel logs, затем конкретный `api/*.js` endpoint. Не делать Shopify Admin token публичным.

---

## Готовое первое сообщение новому агенту

Скопируй и отправь вместе с проектом:

> Прочитай `AGENTS.md` и `src/imports/PROJECT_HANDOFF_FOR_NEXT_CHAT.md` полностью перед началом работы. Это рабочий React/Vite магазин Pottlerkinder с Shopify и Vercel, а не прототип. Сохрани архитектуру, существующий дизайн и все текущие связи. Не добавляй тестовые товары, не возвращай Git LFS и не меняй печатные области без моей прямой просьбы. Сначала коротко подтверди, что понял проект, затем продолжай мои следующие задачи локальными безопасными правками.

---

## Что обычно будет нужно дальше

- Полировка UX/UI по конкретным комментариям пользователя.
- Добавление и корректная категоризация реальных товаров в Shopify.
- Проверка production-поведения Shopify cart/checkout после деплоя.
- Финальная юридическая верификация немецких документов и cookie consent с учётом реально подключённых сервисов.
- Возможно, будущая оптимизация bundle: текущий production JS около 510 kB gzip ~159 kB; Vite предупреждает о chunk >500 kB. Делать code splitting только аккуратно и после отдельной задачи, потому что DesignerStudio большой и stateful.

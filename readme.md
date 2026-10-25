# Vefforritun 1, 2026: Verkefni 5, Uppskriftaleit

Útgáfa 0.1.

## Markmið

- Forrita á móti DOM, Document Object Model.
- Forrita á móti API með fetch.
- Hugsa um mismunandi stöður í viðmóti („loading“, villur, tóma)
- Lesa gögn úr JSON.
- Nota hluti til að skipuleggja kóða.
- Nota Vite.

## Lýsing

Útfæra skal uppskriftaleit í vafra sem notar [TheMealDB](https://www.themealdb.com/api.php). Notandi getur leitað að uppskriftum eftir nafni (á ensku), fengið lista af niðurstöðum með myndum og skoðað hverja uppskrift fyrir sig.

## Virkni

### Viðmót

1. Þegar síða er opnuð er sýnd fyrirsögnin „Uppskriftaleit“ og leitarform með textareit og takka „Leita“.
2. Ef leitað er án leitarorðs eru birt skilaboð um að slá þurfi inn leitarorð.
3. Á meðan leitað er eru birt skilaboð um að verið sé að leita.
4. Niðurstöður eru birtar sem listi
5. hver uppskrift hefur litla mynd og titil
6. mynd og titill eru hlekkur á uppskriftina
7. Ef engar niðurstöður finnast eru birt skilaboð um það.
8. Þegar smellt er á uppskrift er farið á `?id=<id>` og uppskriftin sótt og birt með:
   - nafni,
   - mynd,
   - lista af hráefnum með magni,
   - leiðbeiningum.
9. Á uppskriftarsíðu er hlekkur „Til baka“ sem fer aftur á forsíðu.
10. Ef villa kemur upp við að sækja gögn eru birt skilaboð um það í viðmóti.

**Allt viðmót skal búa til með JavaScript. Engu skal bæta við í `index.html`**.

### Tenging við API

Nota skal útgáfu 1 af API (sem er ekki frábær) sem er aðgengileg á `https://www.themealdb.com/api/json/v1/1/`

Notuð er útgáfa 1 af API með ókeypis prófunarlykli `1`, grunnslóðin er `https://www.themealdb.com/api/json/v1/1/`:

- `search.php?s=<leitarstrengur>` leitar að uppskriftum eftir nafni, t.d. [`search.php?s=bread`](https://www.themealdb.com/api/json/v1/1/search.php?s=bread).
- `lookup.php?i=<id>` sækir allar upplýsingar um uppskrift, t.d. [`lookup.php?i=53308`](https://www.themealdb.com/api/json/v1/1/lookup.php?i=53308).

Bæði skila hlut með `meals` fylki, eða `{ "meals": null }` ef ekkert fannst eða `{"meals":"Invalid ID"}` ef ógilt ID.

Í svari þarf að taka titil, mynd, lýsingu og hráfefni.

Myndir eru gefnar í `strMealThumb`

Hráefni eru gefin í `strIngredient1` til `strIngredient20` og magn í `strMeasure1` til `strMeasure20`, ónotuð gildi eru tómir strengir eða `null`. Þetta er ekki þægilegt í notkun en í vefþjónustukalli skal sameina þetta í einn lista sem er síðan notaður þegar efni eru birt í viðmóti.

### Leitarniðurstöður

Notandi skal geta slegið inn leitarorð í formi og fengið leitarniðurstöður frá API með kalli í API. Dæmi um kall í https://www.themealdb.com/api/json/v1/1/search.php?s=bread skilar efni í JSON formi (dæmi í `search.json`).

Birta skal heiti uppskriftar (`title`) og skal það vera hlekkur til að skoða uppskriftina nánar (með `id`). Hægt er að nota query string til að senda auðkenni uppskriftar áfram, t.d. `?id=28560`, þá er hægt að nota `URLSearchParams` til að sækja það:

```js
const id = new URLSearchParams(window.location.search).get('id');
```

### Stök uppskrift

Þegar smellt er á staka uppskrift í leitarniðurstöðum skal birta nánari upplýsingar um uppskriftina. Nota skal `lookup.php?i=<id>` til að sækja gögn um uppskriftina. Dæmi um kall í https://www.themealdb.com/api/json/v1/1/lookup.php?i=53308 skilar efni í JSON formi (dæmi í `lookup.json`).

### Mismunandi stöður í svari

Í forritinu skal gera ráð fyrir mismunandi stöðum sem geta komið upp:

- Bið eftir svari frá vefþjónustu, nota skal `sleep` fall sem gefið er til að bíða ef notandi slær inn `slow` sem hluta af leitarstreng.
- Villa við að sækja gögn frá vefþjónustu, nota skal `error` fall sem gefið er til að herma eftir villu ef notandi slær inn `error` sem hluta af leitarstreng.
- Gögn koma til baka frá vefþjónustu:
  - Tómt svar / engar niðurstöður
  - Gögn koma til baka með niðurstöðum
  - Villa kemur upp við vinnslu svars

Nota skal gefinn kóða í `src/lib/helpers.js` til að herma eftir þessum stöðum, sjá skjölun í skrá.

### Skjölun

Skjölun á kóða notar [`jsdoc`](https://jsdoc.app/) en er takmörkuð, bæta skal við skjölun í samræmi við það sem gefið er í grunninum, sjá nánar í skrám.

## Grunnur

Gefinn er grunnur með lausn:

- Inni í `src` möppu eru:
  - `index.html` skrá
  - `styles.css` með algjöru grunn útliti
  - `scripts.js` með grunn og skjölun.
  - `lib/helpers.js` með grunn og skjölun.
  - `lib/elements.js` með hjálparföllum sem má nota.
- `.gitignore` skrá sem hunsar viðeigandi skrár og möppur.
- `package.json` skrá með NPM scripts og dependency á Vite.
- `package-lock.json` skrá.

Ekki þarf að breyta neinu í `index.html` skrá eða `styles.css`.

Vite og eslint er uppsett í grunninum, sjá `package.json` fyrir nánari upplýsingar.

Skjölun notar [`jsdoc`](https://jsdoc.app/).

### Vite

Notað er [Vite](https://vite.dev/) til að keyra verkefnið í þróun og útbúa keyrsluútgáfu:

- `npm run dev` keyrir þróunarþjón.
- `npm run build` útbýr keyrsluútgáfu í `dist/`.
- `npm run preview` keyrir keyrsluútgáfu úr `dist/`.

### Uppsetning á grunn

Til að byrja að vinna verkefnið er hægt að sækja það frá GitHub:

```bash
# Inni í möppu sem á að geyma verkefnið
git clone https://github.com/vefforritun/vef1-2026-v5.git
# eða ef ssh uppsett
git clone git@github.com:vefforritun/vef1-2026-v5.git

# Förum inn í möppu
cd vef1-2026-v5

# Sækjum öll dependency með NPM
npm install

# Keyrum NPM script fyrir development
npm run dev
```

Áður en skilað er þarf að breyta remote í þitt eigið repo:

```bash
git remote remove origin
git remote add origin <slóð á þitt GitHub repo>
```

## Takmarkanir

Ekki skal nota `innerHTML`, búa skal til element með `document.createElement` (eða `el` hjálparfallinu) og setja texta með `textContent`.

Aðskiljið samskipti við API frá viðmóti í `lib/api.js` og `lib/meals.js`.

Nota skal klasa (`class`) að minnsta kosti til að vinna kall í API, sjá dæmi í gefnu efni.

Staðfesta skal að gögn frá API séu á réttu formi áður en þau eru notuð. Einnig skal taka saman innihaldsefni og fjölda í eina gagnatýpu.

## eslint

Þegar skipunin `npm run lint` er keyrð eiga **engar villur** að koma fram.

## GitHub og Netlify uppsetning

Setja skal verkefnið upp á GitHub og skila með slóð á repo.

Tengja skal GitHub við Netlify þannig að hver breyting í GitHub keyri inn nýja útgáfu á Netlify.

Gefið er `.gitignore` skjal sem verður að nota, við viljum ekki að þær skrár og möppur sem eru tilgreindar þar fari inn á GitHub.

## Mat

- 10% – Grunnviðmót útfært.
- 20% – Tenging við API útfærð.
- 20% – Leitarniðurstöður birtar.
- 20% – Stök uppskrift birt.
- 10% – Einingar og klasar/hlutir notaðir í útfærslu.
- 10% – Föll skjöluð með jsdoc.
- 10% – Verkefni sett upp GitHub og á Netlify; engar eslint villur

## Sett fyrir

Verkefni sett fyrir í fyrirlestri 26. október.

## Skil

Skila skal í Canvas, sjá skiladag í Canvas.

Skilaboð skulu innihalda bæði:

- Slóð á GitHub repo fyrir verkefnið. Dæmatímakennurum skal hafa verið boðið í repo, notendanöfn þeirra eru:
  - `AsdisVal`
  - `kristinfrida`
  - `osk`
- Slóð á verkefni keyrandi á Netlify, sett sem athugasemd við skil á Canvas.

Athugið að það er **ekki nóg** að eingöngu setja athugasemd, skila þarf verkefni sérstaklega. Verkefnum sem ekki er skilað fá ekki einkunn.

## Aðstoð

Leyfilegt er að ræða, og vinna saman að verkefni en **skrifið ykkar eigin lausn**. Ef tvær eða fleiri lausnir eru mjög líkar þarf að færa rök fyrir því, annars munu allir hlutaðeigandi hugsanlega fá 0 fyrir verkefnið.

Ekki er heimilt að nota stór mállíkön til að vinna verkefni í námskeiðinu, [sjá nánar um notkun](https://github.com/vefforritun/vef1-2026/blob/main/mallikon.md).

## Verkefni og einkunn

Sett verða fyrir fimm minni verkefni sem gilda 3% hvert, samtals 15% af lokaeinkunn.

Sett verða fyrir tvö hópverkefni þar sem hvort um sig gildir 5%, samtals 10% af lokaeinkunn.

---

Nýjustu útgáfu af verkefni má [nálgast á GitHub](https://github.com/vefforritun/vef1-2026-v5).

## Útgáfusaga

| Útgáfa | Lýsing        |
| ------ | ------------- |
| 0.1    | Fyrsta útgáfa |

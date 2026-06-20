# Yeşil Değer — Keynote

> **Sürdürülebilirlik Gayrimenkulün Yeni Finansal Göstergesi**
> Sinem Yedikardaşlar · SAsya's Gayrimenkul Strateji Kurucusu
> Emlak Konut Anahtar Fikirler Zirvesi 2026

Sahnede gösterilmek üzere tasarlanmış, premium, veri destekli, animasyonlu bir
keynote sunum uygulaması. React + Vite + TypeScript + Framer Motion ile geliştirildi.
Her slayt tam ekran **16:9** ve her çözünürlükte birebir aynı görünecek şekilde
ölçeklenir.

---

## Hızlı başlangıç

```bash
npm install
npm run dev      # http://localhost:5173
```

Üretim derlemesi ve önizleme:

```bash
npm run build
npm run preview
```

---

## Sunum kontrolleri

| Tuş / Eylem            | İşlev                                  |
| ---------------------- | -------------------------------------- |
| `→` / `Space` / `PageDown` | Sonraki slayt                      |
| `←` / `PageUp`         | Önceki slayt                           |
| `Home` / `End`         | İlk / son slayt                        |
| `N`                    | Konuşmacı notlarını aç / kapat         |
| `F`                    | Tam ekran                              |
| `#7` (URL)             | Doğrudan 7. slayta git (derin bağlantı)|

Sağ alttaki butonlardan da gezinilebilir ve **Notlar** paneli açılabilir.
Sahnede `F` ile tam ekrana geçip ok tuşlarıyla ilerlemeniz önerilir.

---

## Proje yapısı

```
src/
  theme.ts                 Renk paleti, tipografi, sahne ölçüsü (1920x1080), easing
  data/slides.json         TÜM slayt verisi: title, subtitle, visualDirection,
                           chartType, animationDirection, speakerNotes
  components/
    Deck.tsx               Sunum denetleyici: klavye, ilerleme, notlar paneli, geçişler
    StageScaler.tsx        16:9 sahneyi ekrana ölçekler (letterbox)
    StageBackground.tsx    Ortak premium arka plan (neon ışık, grid, skyline)
    SlideShell.tsx         Standart slayt iskeleti (arka plan + içerik + stagger)
    motion.ts              Paylaşılan animasyon varyantları (fadeUp, stagger, ...)
    primitives.tsx         Kicker, Title, Grad, Support, GlassCard, CountUp,
                           NeonLine, TrendArrow, ImageSlot, Pill
    charts.tsx             Özel koyu-dashboard grafikler (BeforeAfterBars, Donut,
                           KpiCard, FlowDiagram, PaybackTimeline)
    slides/
      SlidesA.tsx          Slayt 1–9
      SlidesB.tsx          Slayt 10–18
      SlidesC.tsx          Slayt 19–26
      index.tsx            Slayt kayıt defteri (id → component)
  assets/sasyas-logo.png   SAsya's logosu
```

Yeni slayt eklemek / düzenlemek: ilgili `SlidesX.tsx` içindeki component'i değiştirin
ve metin/konuşmacı notunu `data/slides.json` üzerinden güncelleyin.

---

## Görseller (asset alanları)

Premium fotoğraflar henüz yok; bunun yerine **karanlık overlay ve açıklamalı asset
isimleriyle** kurumsal görünümlü görsel alanları kullanıldı. Gerçek bir fotoğraf
eklemek için:

1. Dosyayı `public/assets/` içine koyun (ör. `ford-model-t-black.jpg`).
2. İlgili `ImageSlot`'a `src` verin:
   ```tsx
   <ImageSlot asset="asset: ford-model-t-black.jpg" src="/assets/ford-model-t-black.jpg" ... />
   ```
   Karanlık overlay ve kenar etiketleri otomatik korunur.

### Önerilen asset listesi

| Slayt | Asset adı                                | İçerik                                   |
| ----- | ---------------------------------------- | ---------------------------------------- |
| 3     | `ford-model-t-black.jpg`                 | Ford'un ilk seri üretim siyah otomobili  |
| 5     | `premium-residential-aerial.jpg`         | Nitelikli konut sitesi (yurt dışı)       |
| 6     | `young-family-dreaming.jpg`              | Genç aile, hayalindeki eve bakıyor       |
| 9     | `netherlands-social-housing-retrofit.jpg`| Hollanda sosyal konut / prefabrik cephe  |
| 22    | `empire-state-night.jpg`                 | Empire State Building, etkileyici gece   |

> Tüm görseller premium, gerçekçi ve yüksek çözünürlüklü olmalı; koyu temayla
> bütünleşmesi için overlay zaten uygulanır.

---

## Tasarım dili

- **Renk:** derin lacivert (`#071A3A`/`#09295C`), SAsya's mavisi (`#1667D9`/`#1E73E8`),
  sürdürülebilirlik yeşili (`#23D18B`), neon yeşil (`#7CFFB2`), buz beyazı (`#F5F8FF`),
  kahverengi iskonto amber'i (`#B47A3C` — logodaki altın taçla uyumlu).
- **Tipografi:** başlıklar Space Grotesk / Sora, metinler Inter (hepsi `@fontsource`
  ile pakete gömülü; internet olmadan da çalışır).
- **Animasyon:** fade + hafif yukarı hareket, neon line-draw, sayı count-up, grafik
  reveal, yörünge/orbit beliriş, yukarı/aşağı ok animasyonları, final split-screen.
  Tümü kontrollü ve sahneye uygun; `prefers-reduced-motion` desteklenir.

Tüm metrikler konuşma metninden alınmıştır (Bakanlık · Türkiye Bina Sektörü
Karbonsuzlaşma Yol Haritası dahil).

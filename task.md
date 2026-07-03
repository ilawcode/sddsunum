# Turkcell Ibarelerini Kaldirma Task Listesi

## Durum (degisim branch)

- `degisim` branch uzerinde, amblem/SVG haric tum metin ibare degisiklikleri uygulandi.
- Bu dosyada referans amacli olarak eski `Turkcell` ibareleri listelenmeye devam ediyor.

## Kapsam

- Amaç: Sunumun Turkcell tarafindan hazirlanmis gibi gorunmesine neden olan tum `Turkcell` / `TURKCELL` ibarelerini kaldirmak.
- Bu asamada sunum dosyalarinda degisiklik yapilmayacak; once bu task listesi kontrol edilecek.
- Format, renk paleti, layout, slayt sirasi, tablo yapilari ve anlatim akisi degistirilmeyecek.
- Degisiklikler metin/etiket seviyesinde tutulacak.

## Degismeyecek Alanlar

- CSS renk degiskenleri, mevcut sari/lacivert renkler ve gorsel format.
- HTML/JS component yapisi ve slayt yerlesimleri.
- BMAD, OpenSpec, SDD egitim icerigi.
- Slayt sayisi ve navigasyon yapisi.

## Planlanan Degisiklikler

| Dosya | Mevcut ifade | Onerilen ifade | Not |
| --- | --- | --- | --- |
| `index.html` | `Turkcell Akademi` | `Akademi` | Ust header marka metni. |
| `index.html` | `© 2026 Turkcell Akademi` | `© 2026 Akademi` | Sol menü alt bilgisi. |
| `index.html` | `Turkcell Akademi senaryosu — kurulum → analiz → PRD akışı` | `Akademi senaryosu — kurulum → analiz → PRD akışı` | BMAD demo banner metni. |
| `index.html` | `Turkcell Mobil gamer ek paket ekranı · propose → apply → archive` | `Mobil uygulama gamer ek paket ekranı · propose → apply → archive` | OpenSpec demo banner metni. |
| `content.js` | `Turkcell Akademi Eğitmen Portalı` | `Akademi Eğitmen Portalı` | Senaryo 1 adi. |
| `content.js` | `Turkcell Mobil — Gamer Ek Paket Ekranı` | `Mobil Uygulama — Gamer Ek Paket Ekranı` | Senaryo 2 adi. |
| `app.js` | `Turkcell Akademi eğitmen portalı projesinde...` | `Akademi eğitmen portalı projesinde...` | BMAD kurulum aciklamasi. |
| `app.js` | `turkcell-akademi-egitmen-portali` | `akademi-egitmen-portali` | Terminal simülasyon proje slug'i. |
| `app.js` | `Proje: Turkcell Akademi Eğitmen Portalı` | `Proje: Akademi Eğitmen Portalı` | BMAD help terminal ciktisi. |
| `app.js` | `Keşif: Turkcell Mobil — gamer segmenti` | `Keşif: Mobil Uygulama — gamer segmenti` | OpenSpec terminal ciktisi. |
| `app.js` | `Senaryo: Turkcell Akademi Eğitmen Portalı` | `Senaryo: Akademi Eğitmen Portalı` | BMAD terminal ilk gecmis metni. |
| `app.js` | `SDD Eğitimi — BMAD Simülasyonu (Turkcell Akademi)` | `SDD Eğitimi — BMAD Simülasyonu (Akademi)` | BMAD yeniden baslatma metni. |
| `app.js` | `Senaryo: Turkcell Mobil — Gamer Ek Paket Ekranı` | `Senaryo: Mobil Uygulama — Gamer Ek Paket Ekranı` | OpenSpec terminal ilk gecmis metni. |
| `presentation.js` | `aria-label="Turkcell"` | `aria-label="Akademi"` | Logo erisilebilirlik etiketi; gorunur format degismez. |
| `presentation.js` | `TURKCELL` | `AKADEMI` | Logo icindeki gorunur sirket ibaresi. |
| `presentation.js` | `TURKCELL GENERAL` | `GENEL` | Gizlilik/siniflandirma etiketi. |
| `presentation.js` | `Turkcell Akademi · ...` | `Akademi · ...` | Slayt footer sol metni. |
| `presentation.js` | `Turkcell Akademi © 2026` | `Akademi © 2026` | Slayt footer varsayilan metni. |
| `presentation.js` | `Referans: TURKCELL_SUNUM_FORMATI` | *(kaldir)* | Kapak slayti referans metni. Yerlesim bozulmasin diye bos `span` birakilabilir. |
| `presentation.js` | `Turkcell Akademi Eğitmen Portalı — kurulum → analiz → PRD` | `Akademi Eğitmen Portalı — kurulum → analiz → PRD` | Demo cagrisi kart metni. |
| `styles.css` | `/* Turkcell Akademi slayt şablonu — TURKCELL_SUNUM_FORMATI */` | `/* Akademi slayt şablonu — SUNUM_FORMATI */` | Sadece yorum satiri; gorsel degisiklik yok. |

## Kontrol Gerektiren Nokta

- `presentation.js` ve `index.html` icindeki sari/lacivert amblem SVG olarak duruyor. Bu listede yalnizca `Turkcell` metin ibareleri kaldirilacak sekilde planlandi. Amblem gorsel olarak da kaldirilsin veya degistirilsin istenirse, format bozulmadan ayrica ele alinmali.

## Uygulama Sonrasi Kontrol

- `rg -n -i "turkcell|TURKCELL" --glob '!task.md' .` ile kalan ibare kontrolu yapilacak (task listesi haric).
- Tarayicida sunum acilip header, footer, kapak, demo banner ve terminal simülasyon metinleri kontrol edilecek.
- Renk/format degismedigi gorsel olarak dogrulanacak.

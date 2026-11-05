# ACS local font bundle — sources and verification

Downloaded on **2026-11-05** from the official Google Fonts CSS API using a modern browser User-Agent. The downloaded files are variable WOFF2 fonts; the CSS integration declares the requested application range `400 700` for both families.

## Source URLs and versions

- Google Fonts CSS API request: <https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Source+Sans+3:wght@400;600;700&display=swap>
- Sora WOFF2 source, Google Fonts CDN version **v17**:
  - latin: <https://fonts.gstatic.com/s/sora/v17/xMQ9uFFYT72X5wkB_18qmnndmSdSnh2BAfO5mnuyOo1lfiQwV6-x.woff2>
  - latin-ext: <https://fonts.gstatic.com/s/sora/v17/xMQ9uFFYT72X5wkB_18qmnndmSdSnh2BAfO5mnuyOo1lfiQwWa-xsaQ.woff2>
- Source Sans 3 WOFF2 source, Google Fonts CDN version **v20**:
  - latin: <https://fonts.gstatic.com/s/sourcesans3/v20/nwpStKy2OAdR1K-IwhWudF-R3w8aZQ.woff2>
  - latin-ext: <https://fonts.gstatic.com/s/sourcesans3/v20/nwpStKy2OAdR1K-IwhWudF-R3wEaZfrc.woff2>
- Official Google Fonts repository directories:
  - Sora: <https://github.com/google/fonts/tree/main/ofl/sora>
  - Source Sans 3: <https://github.com/google/fonts/tree/main/ofl/sourcesans3>

The `unicode-range` values in `../../src/styles/fonts-acs.css` are copied from the corresponding Google Fonts CSS API response. The requested Portuguese precomposed characters (`ã õ ç á é í ó ú ê â`) are in the official `latin` range and are present in each family’s local `*-latin.woff2`; `latin-ext` is retained as a separate official subset for its own range.

## Installed files and SHA-256

- `sora-latin.woff2` — 25,284 bytes — `811e11966d29f3a01fcb19b087b61ac067d380665a55aebb7fcdf2cda95e4a93`
- `sora-latin-ext.woff2` — 12,156 bytes — `08e1ba85bcb55277782f56766af09467dfe18cbeea49704203100c5797ac4cc5`
- `source-sans-3-latin.woff2` — 28,872 bytes — `19143dca075972bc84e3fd9eab7416dd40cc565dccb2435a044bdfabe060c7d5`
- `source-sans-3-latin-ext.woff2` — 60,088 bytes — `a85a7459bdb3cdc1136751e151a506bae653fc29ada3ca86237477df6f1b59e6`
- `OFL-1.1-Sora.txt` — 4,385 bytes — `ba0b9729c9428ba79a0459ab8ec575791b51509dbec213e383d0316d37fec299`
- `OFL-1.1-Source-Sans-3.txt` — 4,579 bytes — `09746787287a289323b0ec3cff4d1a4a801331b82b7207c1e186f5d26619a392`

## Licenses

Both font projects are distributed under the **SIL Open Font License, Version 1.1**. The complete license texts are included locally as `OFL-1.1-Sora.txt` and `OFL-1.1-Source-Sans-3.txt`.

- Sora license source: <https://raw.githubusercontent.com/google/fonts/main/ofl/sora/OFL.txt>
- Source Sans 3 license source: <https://raw.githubusercontent.com/google/fonts/main/ofl/sourcesans3/OFL.txt>

## fontTools validation

Validated with **fontTools 4.66.0** (`python3 -m fontTools` tooling and `fontTools.ttLib.TTFont`): all four files parse as WOFF2/OpenType fonts and contain a `fvar` `wght` axis. The axes reported by the files are Sora `400–800` and Source Sans 3 `200–900`; the local CSS intentionally exposes only the requested `400–700` range.

The following Unicode code points were confirmed in both `*-latin.woff2` files: `U+00E3` (ã), `U+00F5` (õ), `U+00E7` (ç), `U+00E1` (á), `U+00E9` (é), `U+00ED` (í), `U+00F3` (ó), `U+00FA` (ú), `U+00EA` (ê), and `U+00E2` (â).

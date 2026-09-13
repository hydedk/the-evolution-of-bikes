# Nye hjemmesidebilleder

Nye billeder, der skal optimeres af Astro, placeres i denne mappe eller en
passende undermappe. Originalerne i projektets øvrige billedarkiv må ikke
flyttes eller ændres.

Importér billedet i den relevante `.astro`-side, og brug den fælles komponent:

```astro
---
import OptimizedImage from '../../components/OptimizedImage.astro';
import bicycleImage from '../../assets/bikes/eksempel/original.jpg';
---

<figure>
  <OptimizedImage
    src={bicycleImage}
    alt="Beskrivende alt-tekst"
  />
  <figcaption>Billedtekst og eventuel kreditering.</figcaption>
</figure>
```

Komponenten genererer responsive bredder og leverer AVIF og WebP med en
passende fallback. Angiv `loading="eager"` og `fetchpriority="high"` kun til
sidens vigtigste billede over folden.

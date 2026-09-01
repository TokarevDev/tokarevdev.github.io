# Oleksandr Tokarev — Unity Portfolio

Source for [tokarevdev.github.io](https://tokarevdev.github.io/), a focused Unity Developer and C# Gameplay Programmer portfolio.

The site is intentionally limited to two deep engineering case studies:

1. **2D Asteroids Survival** — the lead case: custom fixed-step physics, explicit dependency boundaries, Zenject composition roots, validated JSON configuration, transactional object pooling, desktop/mobile input strategies, and playable Windows/Android builds.
2. **Last Seed Survivor** — modular Unity 6 mobile combat, ScriptableObject-driven rewards, segmented enemy lifecycle, pooled runtime entities, responsive portrait UI, and deterministic Editor balance validation.

## Site principles

- English is the default language, with complete Russian and Ukrainian localization.
- Architectural claims are connected to public source, playable builds, gameplay media, or measurable system evidence.
- Technology terms are presented in context: Unity, C#, gameplay programming, SOLID, dependency injection, object pooling, ScriptableObjects, Unity Profiler, Android, Windows, UGUI, and async lifecycle management.
- CV links remain disabled until the revised CV is ready.
- GitHub Pages publishes only the public `main` branch.

## Local validation

The site is static and has no build step.

```bash
node scripts/validate-site.mjs
```

The validator checks local references, inline script syntax, localization completeness, removed-project references, and prohibited tenure wording.

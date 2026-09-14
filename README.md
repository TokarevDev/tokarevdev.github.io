# Oleksandr Tokarev — Unity Portfolio

Source for [tokarevdev.github.io](https://tokarevdev.github.io/), a focused Unity Developer and C# Gameplay Programmer portfolio.

The site is intentionally limited to two source-backed engineering case studies:

1. **Last Seed Survivor** — an architecture-first Unity 6 mobile auto-shooter with engine-free domain state, Zenject composition roots, explicit frame orchestration, transactional pooled lifecycles, failure-safe reward and ad operations, automated project validation, deterministic balance tooling, and mobile performance baselines.
2. **2D Asteroids Survival** — a complete Unity survival game with custom fixed-step physics, explicit dependency boundaries, Zenject composition roots, validated JSON configuration, transactional object pooling, desktop/mobile input strategies, and playable Windows/Android builds.

## Site principles

- English is the default language, with complete Russian and Ukrainian localization.
- Project media supports keyboard/touch carousels, click-to-zoom viewing, and a persistent back-to-top control.
- Responsive breakpoints keep navigation, case-study grids, media, controls, and typography usable on mobile screens.
- Architectural claims are connected to public source, playable builds, gameplay media, or measurable validation evidence.
- Technology terms are presented in context: Unity, C#, gameplay programming, SOLID/SRP, dependency injection, Zenject, SignalBus, custom fixed-step physics, validated JSON, ScriptableObjects, object pooling, Unity Test Framework, Unity Profiler, Android, Windows, UGUI, and async lifecycle management.
- Hardware performance and release-readiness claims remain separate from Editor regression baselines.
- CV links remain disabled until the revised CV is ready.
- GitHub Pages publishes only the public `main` branch.

## Local validation

The site is static and has no build step.

```bash
node scripts/validate-site.mjs
```

The validator checks local references, inline script syntax, localization completeness, removed-project references, and prohibited tenure wording.

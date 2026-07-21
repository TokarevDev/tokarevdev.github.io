# Oleksandr Tokarev Portfolio

Source for my Unity Developer / C# Gameplay Programmer portfolio:

https://tokarevdev.github.io/

The site presents my Unity Developer / C# Gameplay Programmer portfolio, current CV, gameplay media, public GitHub repositories, Google Play release, WebGL prototypes, and downloadable PC builds.

## Focus

- Unity Developer / C# Gameplay Programmer positioning backed by nearly 3 years of hands-on project work since September 2023
- Shipped Android game on Google Play as the first portfolio proof
- End-to-end solo ownership across architecture, implementation, profiling, debugging, build preparation, release, and post-release support
- Gameplay systems, UI/UGUI flow, save/load, progression, rewards, ads, and build preparation
- Android, PC, and WebGL projects with source, gameplay media, and playable/downloadable builds
- Measured mobile optimization: approximately 30 FPS to stable 60 FPS on older hardware, with adaptive 90/120 FPS validated on supported devices
- Deterministic balance validation: 4,000 battles per cycle across four behavior scenarios, with zero detected combat-logic failures in repeated runs
- Production architecture toolkit: SOLID/SRP, MVVM, Assembly Definitions, composition roots, Zenject/DI, ScriptableObjects, UniTask, async/await, cancellation, and lifecycle-safe cleanup
- Git/GitHub, ClickUp, task tracking, collaborative planning, and reviewable public source code
- Fully remote employment or B2B availability from Finland
- Recruiter-first information hierarchy: strengths and production practices before the two strongest case studies
- Secondary multiplayer/WebGL/PC prototypes moved into a collapsed archive after the contact section

## Featured Projects

### Emoji Battle

Released Android game on Google Play. Built in Unity 6 and C# during a 3-month independent development cycle, with full player-loop ownership, three Strategy Pattern AI modes, progression, persistence, UGUI, Unity Ads, Android publishing, and optimization from about 30 FPS to stable 60 FPS on older devices.

Google Play: https://play.google.com/store/apps/details?id=com.sd7gamestudio.emojibattle
Source code: https://github.com/TokarevDev/Emoji_Battle

### Last Seed Survivor

Current Unity 6 2D mobile auto-shooter/survival project focused on modular combat, ScriptableObject-driven rewards, pooled projectiles and enemy segments, runtime stat modifiers, and a deterministic one-click test that runs 4,000 battles per cycle.

Source code: https://github.com/TokarevDev/Force_of_Nature_Last_Seed

### 2D Asteroids Survival

Compact Unity 2022 LTS architecture sample demonstrating Assembly Definition boundaries, Zenject dependency injection and SignalBus, UniTask scene flow, MVVM-style UI separation, Input System abstraction, ScriptableObject configuration, and prewarmed projectile/asteroid pools.

Source code: https://github.com/TokarevDev/2D_Asteroids_Survival

## Public Code Samples

- Emoji Battle - shipped Google Play game and complete mobile player loop
- Last Seed Survivor - modular combat, pooling, reward systems, segmented enemies, and deterministic balance validation
- 2D Asteroids Survival - compact architecture and lifecycle code-review sample

## Build Downloads

Large PC build archives are stored as static split parts under `assets/builds/` and reconstructed by `download-build.html` in the browser. This avoids GitHub's per-file size limits while keeping downloads available from the public portfolio.

## Repository Notes

This is a static GitHub Pages site. There is no build step. Open `index.html` directly or serve the folder with any local static server.

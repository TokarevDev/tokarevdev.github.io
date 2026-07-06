# Oleksandr Tokarev Portfolio

Source for my Unity C# developer portfolio:

https://tokarevdev.github.io/

The site presents my Unity C# developer portfolio, CV, gameplay media, public GitHub repositories, Google Play release, WebGL prototypes, and downloadable PC builds.

## Focus

- Unity C# Developer / C# Gameplay Programmer positioning
- Shipped Android game on Google Play as the first portfolio proof
- Gameplay systems, UI/UGUI flow, save/load, progression, rewards, ads, and build preparation
- Android, PC, and WebGL projects with source, gameplay media, and playable/downloadable builds
- Performance-aware Unity implementation: object pooling, cached references, Profiler-minded iteration, and clear runtime boundaries
- STAR/CARE-style value proof for the main portfolio projects

## Featured Projects

### Emoji Battle

Released Android game on Google Play. Built in Unity 6 and C#, taken from prototype to public mobile release with turn-based gameplay, AI strategies, progression, persistence, popups, ads, and Android publishing workflow.

Google Play: https://play.google.com/store/apps/details?id=com.sd7gamestudio.emojibattle  
Source code: https://github.com/TokarevDev/Emoji_Battle

### Last Seed Survivor

Current Unity 6 2D mobile auto-shooter/survival project focused on modular combat, ScriptableObject-driven rewards, pooled projectiles, segmented enemy behavior, balance tooling, and Android release preparation.

Source code: https://github.com/TokarevDev/Force_of_Nature_Last_Seed

## Build Downloads

Large PC build archives are stored as static split parts under `assets/builds/` and reconstructed by `download-build.html` in the browser. This avoids GitHub's per-file size limits while keeping downloads available from the public portfolio.

## Repository Notes

This is a static GitHub Pages site. There is no build step. Open `index.html` directly or serve the folder with any local static server.

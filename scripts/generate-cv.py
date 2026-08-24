from pathlib import Path
import shutil

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
PRIMARY_OUTPUT = ASSETS / "Oleksandr_Tokarev_Unity_Developer_CV.pdf"
COMPATIBILITY_OUTPUTS = (
    ASSETS / "Oleksandr_Tokarev_Unity_Developer.pdf",
    ASSETS / "Oleksandr_Tokarev_Unity_Developer_CV_2026_07.pdf",
)

NAVY = colors.HexColor("#183B56")
DARK = colors.HexColor("#202020")
MUTED = colors.HexColor("#575757")


def register_fonts() -> None:
    font_dir = Path("C:/Windows/Fonts")
    pdfmetrics.registerFont(TTFont("Arial", font_dir / "arial.ttf"))
    pdfmetrics.registerFont(TTFont("Arial-Bold", font_dir / "arialbd.ttf"))


def build_styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=base["Normal"],
            fontName="Arial-Bold",
            fontSize=23,
            leading=24,
            textColor=NAVY,
            spaceAfter=0,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=base["Normal"],
            fontName="Arial-Bold",
            fontSize=13.5,
            leading=14.5,
            textColor=DARK,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=base["Normal"],
            fontName="Arial",
            fontSize=9.6,
            leading=12,
            textColor=MUTED,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=base["Normal"],
            fontName="Arial-Bold",
            fontSize=10.8,
            leading=12,
            textColor=NAVY,
            spaceBefore=4.5,
            spaceAfter=1.5,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["Normal"],
            fontName="Arial",
            fontSize=9.35,
            leading=11.7,
            textColor=DARK,
            alignment=TA_LEFT,
        ),
        "compact": ParagraphStyle(
            "Compact",
            parent=base["Normal"],
            fontName="Arial",
            fontSize=9.2,
            leading=11.3,
            textColor=DARK,
            spaceAfter=0,
        ),
        "experience_title": ParagraphStyle(
            "ExperienceTitle",
            parent=base["Normal"],
            fontName="Arial-Bold",
            fontSize=9.5,
            leading=11.5,
            textColor=DARK,
            spaceBefore=2.5,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=base["Normal"],
            fontName="Arial",
            fontSize=9.2,
            leading=11.2,
            textColor=MUTED,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["Normal"],
            fontName="Arial",
            fontSize=9.15,
            leading=11.25,
            leftIndent=11,
            firstLineIndent=-7,
            textColor=DARK,
            spaceAfter=1,
        ),
    }


def add_footer(canvas, document) -> None:
    canvas.saveState()
    canvas.setFont("Arial", 7.2)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(7.55 * inch, 0.22 * inch, "Oleksandr Tokarev | Unity Developer | 2026")
    canvas.restoreState()


def build_cv() -> None:
    register_fonts()
    styles = build_styles()
    document = SimpleDocTemplate(
        str(PRIMARY_OUTPUT),
        pagesize=letter,
        rightMargin=0.52 * inch,
        leftMargin=0.74 * inch,
        topMargin=0.40 * inch,
        bottomMargin=0.34 * inch,
        title="Unity Developer CV",
        author="Oleksandr Tokarev",
        subject="Unity Developer and C# Gameplay Programmer resume",
        keywords=(
            "Unity, C#, Gameplay Programmer, Independent Game Development, Android, UGUI, "
            "ScriptableObjects, Physics2D, Google Play, Performance Optimization"
        ),
    )

    story = [
        Paragraph("OLEKSANDR TOKAREV", styles["name"]),
        Paragraph("UNITY DEVELOPER | C# GAMEPLAY PROGRAMMER", styles["role"]),
        Paragraph("Finland | Fully remote | Employment or B2B", styles["contact"]),
        Paragraph(
            '<a href="mailto:otokarevdev@gmail.com" color="#183B56">otokarevdev@gmail.com</a> | '
            '<a href="https://tokarevdev.github.io/" color="#183B56">Portfolio</a> | '
            '<a href="https://github.com/TokarevDev" color="#183B56">GitHub</a> | '
            '<a href="https://www.linkedin.com/in/oleksandr-tokarev/" color="#183B56">LinkedIn</a>',
            styles["contact"],
        ),
        Paragraph("SUMMARY", styles["section"]),
        Paragraph(
            "Unity Developer based in Finland with 3+ years of independent C# gameplay development "
            "experience across Android, PC, and WebGL. Solo-developed and shipped an Android game on "
            "Google Play, owning architecture, implementation, profiling, debugging, build preparation, "
            "and release. Builds maintainable, performance-aware C# systems with SOLID/SRP, dependency "
            "injection, Assembly Definitions, ScriptableObjects, UniTask, and clear runtime/presentation boundaries.",
            styles["body"],
        ),
        Paragraph("TECHNICAL SKILLS", styles["section"]),
        Paragraph('<font color="#183B56">Core Competencies:</font> gameplay programming, software engineering, systems architecture, problem solving, debugging, performance optimization, project delivery', styles["compact"]),
        Paragraph('<font color="#183B56">Programming / Engine:</font> C#, Unity 2022 LTS, Unity 6, MonoBehaviour lifecycle, UGUI, Input System, Physics2D, DOTween, URP', styles["compact"]),
        Paragraph('<font color="#183B56">Gameplay Systems:</font> turn-based combat, AI strategies, progression, save/load, reward systems, weapons, runtime stat modifiers', styles["compact"]),
        Paragraph('<font color="#183B56">Architecture:</font> SOLID/SRP, MVVM, Zenject, dependency injection, composition root, Assembly Definitions, services, events, ScriptableObjects', styles["compact"]),
        Paragraph('<font color="#183B56">Async / Lifecycle:</font> UniTask, async/await, CancellationToken, lifecycle-bound cancellation, subscription and resource cleanup', styles["compact"]),
        Paragraph('<font color="#183B56">Performance / Optimization:</font> Unity Profiler, GC allocation profiling, object pooling, cached references, mobile frame-time optimization', styles["compact"]),
        Paragraph('<font color="#183B56">Multiplayer / Workflow:</font> Netcode for GameObjects, UGS Relay, Lobby, Auth, RPCs, NetworkVariables, Git/GitHub, ClickUp, task tracking, collaborative planning', styles["compact"]),
        Paragraph("PROFESSIONAL EXPERIENCE", styles["section"]),
        Paragraph('Independent Unity Developer | <font color="#183B56">Personal and Published Projects</font>', styles["experience_title"]),
        Paragraph("2023 - Present | Finland | Solo developer", styles["meta"]),
        Paragraph("- Delivered playable builds for 3 platforms - Android, PC, and WebGL - including a multiplayer prototype using UGS Relay, Lobby, and Netcode for GameObjects; resolved cross-platform build, scene, prefab, UI, and runtime integration issues.", styles["bullet"]),
        Paragraph('Emoji Battle | <font color="#183B56">Google Play release | Sep 2025 - Feb 2026</font>', styles["experience_title"]),
        Paragraph("- Shipped 1 complete Android game to Google Play within a 3-month independent development cycle; owned the full player loop, progression, save data, UGUI flow, Unity Ads, store preparation, and post-release support.", styles["bullet"]),
        Paragraph("- Implemented 3 distinct AI difficulty modes through the Strategy Pattern, separating decision logic from board rendering and lobby UI.", styles["bullet"]),
        Paragraph("- Improved performance on older Android devices from approximately 30 FPS to a stable 60 FPS and validated adaptive 90/120 FPS targets on supported devices by reducing UI draw calls and separating gameplay from presentation logic.", styles["bullet"]),
        Paragraph('Last Seed Survivor | <font color="#183B56">Mobile 2D auto-shooter | Mar 2026 - Present</font>', styles["experience_title"]),
        Paragraph("- Engineered modular combat, weapons, runtime stat modifiers, Physics2D enemies, and ScriptableObject-driven reward selection with rarity and DPS-aware tuning.", styles["bullet"]),
        Paragraph("- Optimized high-density combat with pooled projectiles, pooled enemy segments, and cached references; built a one-click deterministic test that runs 4,000 battles per cycle across 4 player-behavior scenarios, with zero detected combat-logic failures in repeated runs.", styles["bullet"]),
        Paragraph('<font color="#183B56">Stack:</font> Unity 6, C#, UGUI, ScriptableObjects, Physics2D, Input System, DOTween, URP, object pooling, custom balance simulations', styles["meta"]),
        Paragraph("EDUCATION", styles["section"]),
        Paragraph("Xamk - South-Eastern Finland University of Applied Sciences | Online, Finland", styles["body"]),
        Paragraph("Introduction to Video Games Creation - Flexible Modular Open UAS Studies, 1-35 ECTS | Jul 2026 - Dec 2026", styles["meta"]),
        Paragraph("LANGUAGES", styles["section"]),
        Paragraph("English - Intermediate (B1, improving) | Russian - Native | Ukrainian - Native", styles["meta"]),
        Spacer(1, 1),
    ]

    document.build(story, onFirstPage=add_footer, onLaterPages=add_footer)
    for output in COMPATIBILITY_OUTPUTS:
        shutil.copyfile(PRIMARY_OUTPUT, output)


if __name__ == "__main__":
    build_cv()

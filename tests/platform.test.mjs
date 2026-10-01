import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const rootDir = process.cwd();

const moduleCache = new Map();

function loadTsModule(relPath) {
  const fullPath = path.resolve(rootDir, relPath);
  if (moduleCache.has(fullPath)) {
    return moduleCache.get(fullPath);
  }

  const source = fs.readFileSync(fullPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  });

  const moduleObj = { exports: {} };
  moduleCache.set(fullPath, moduleObj.exports);

  const customRequire = (id) => {
    if (id.startsWith("@/")) {
      const base = path.join("src", id.slice(2));
      const mapped = fs.existsSync(path.resolve(rootDir, base + ".ts"))
        ? base + ".ts"
        : base + ".tsx";
      return loadTsModule(mapped);
    }
    if (id.startsWith("./") || id.startsWith("../")) {
      const base = path.resolve(path.dirname(fullPath), id);
      const resolved = fs.existsSync(base + ".ts") ? base + ".ts" : base + ".tsx";
      return loadTsModule(path.relative(rootDir, resolved));
    }
    return require(id);
  };

  const wrapper = vm.runInNewContext(
    `(function(exports, require, module, __filename, __dirname) { ${transpiled.outputText}\n})`,
    {
      process,
      console,
      Map,
      Set,
      Date,
      Math,
      JSON,
      Object,
      Array,
      String,
      Number,
      Boolean,
      RegExp,
      Float32Array,
      Uint8Array,
    }
  );
  wrapper(moduleObj.exports, customRequire, moduleObj, fullPath, path.dirname(fullPath));
  moduleCache.set(fullPath, moduleObj.exports);
  return moduleObj.exports;
}

function getAllSourceFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const full = path.join(dirPath, file);
    if (fs.statSync(full).isDirectory()) {
      getAllSourceFiles(full, arrayOfFiles);
    } else if (/\.(ts|tsx|css)$/.test(file)) {
      arrayOfFiles.push(full);
    }
  }
  return arrayOfFiles;
}

test("1. Project Loading & GitHub Audit Completeness", () => {
  const { projects, githubRepositoryInventory } = loadTsModule("src/data/portfolio.ts");

  assert.equal(projects.length, 12, "Expected 12 verified portfolio projects");

  const slugs = projects.map((p) => p.slug);
  assert.ok(slugs.includes("alpha-coach"), "Alpha Coach must be present");
  assert.ok(slugs.includes("for-sale"), "For Sale must be present");
  assert.ok(slugs.includes("endless-chase"), "Endless Chase must be present");
  assert.ok(slugs.includes("webhunt"), "WebHunt must be present");
  assert.ok(slugs.includes("gacks-ai"), "Gacks AI must be present");
  assert.ok(slugs.includes("bm-forex-hub"), "BM Forex Hub must be present");
  assert.ok(slugs.includes("leavoyage-resort"), "LE-VOYAGE Resort must be present");

  const alphaCoach = projects.find((p) => p.slug === "alpha-coach");
  assert.equal(alphaCoach.repositoryUrl, "https://github.com/gackstonew-lgtm/Alpha-Coach");
  assert.equal(alphaCoach.liveUrl, "https://alpha-coach-pi.vercel.app/");

  const forSale = projects.find((p) => p.slug === "for-sale");
  assert.equal(forSale.repositoryUrl, "https://github.com/gackstonew-lgtm/For-Sale");
  assert.equal(forSale.liveUrl, "https://for-sale-three.vercel.app/");

  assert.equal(githubRepositoryInventory.length, 14, "All 14 public GitHub repositories must be audited");
  const gacksDevRepo = githubRepositoryInventory.find((r) => r.name === "GacksDev");
  assert.equal(gacksDevRepo.classification, "excluded");
  assert.equal(gacksDevRepo.approved, false);

  const wifiBypassRepo = githubRepositoryInventory.find((r) => r.name === "Wifi-Bypass");
  assert.equal(wifiBypassRepo.classification, "experimental");
  assert.equal(wifiBypassRepo.approved, false);
});

test("2. Project Filtering & Category Integrity", () => {
  const { projects } = loadTsModule("src/data/portfolio.ts");

  const fintechProjects = projects.filter(
    (p) => p.filterCategories?.includes("FinTech") || p.comparison?.fintech
  );
  assert.ok(
    fintechProjects.some((p) => p.slug === "alpha-coach"),
    "Alpha Coach must appear under FinTech filter"
  );
  assert.ok(
    fintechProjects.some((p) => p.slug === "bm-forex-hub"),
    "BM Forex Hub must appear under FinTech filter"
  );

  const fullStackProjects = projects.filter((p) =>
    p.filterCategories?.includes("Full-Stack")
  );
  assert.ok(
    fullStackProjects.some((p) => p.slug === "for-sale"),
    "For Sale must appear under Full-Stack filter"
  );
});

test("3. Project Details, Case Studies, Architecture Diagrams & Comparison Fields", () => {
  const { projects } = loadTsModule("src/data/portfolio.ts");

  for (const project of projects) {
    assert.ok(project.problem && project.problem.length > 10, `Missing problem statement for ${project.slug}`);
    assert.ok(Array.isArray(project.architecture) && project.architecture.length >= 2, `Missing architecture list for ${project.slug}`);
    assert.ok(project.caseStudy, `Missing caseStudy for ${project.slug}`);
    assert.ok(Array.isArray(project.architectureDiagram) && project.architectureDiagram.length >= 3, `Expected >=3 architecture nodes for ${project.slug}`);
    assert.ok(project.comparison, `Missing comparison matrix entry for ${project.slug}`);
  }
});

test("4. Grounded AI Copilot Query Engine & Technology Radar", () => {
  const intelligence = loadTsModule("src/lib/intelligence.ts");
  const {
    answerPortfolioQuery,
    technologyRadarData,
  } = intelligence;

  const alphaReply = answerPortfolioQuery("How does Alpha Coach work?");
  assert.ok(alphaReply.answer.includes("Alpha Coach"));
  assert.ok(alphaReply.matchedProjects.some((p) => p.slug === "alpha-coach"));

  const forSaleReply = answerPortfolioQuery("Tell me about For Sale marketplace");
  assert.ok(forSaleReply.answer.includes("For Sale"));
  assert.ok(forSaleReply.matchedProjects.some((p) => p.slug === "for-sale"));

  assert.ok(technologyRadarData.length >= 12, "Technology Radar should contain verified stack entries");
  assert.equal(intelligence.buildDependencyGraph, undefined, "buildDependencyGraph must be removed");
  assert.equal(intelligence.getEngineeringTimeline, undefined, "getEngineeringTimeline must be removed");
  assert.equal(intelligence.generateResumeForRole, undefined, "generateResumeForRole must be removed");
});

test("5. Security Rate Limiting & Input Sanitization", () => {
  const { checkRateLimit, sanitizeInput } = loadTsModule("src/lib/security.ts");

  const dirty = "  <script>alert('xss')</script>Hello   ";
  const clean = sanitizeInput(dirty, 100);
  assert.ok(!clean.includes("<") && !clean.includes(">"), "Angle brackets must be stripped");

  const r1 = checkRateLimit("test-bucket-ip", 2, 60_000);
  const r2 = checkRateLimit("test-bucket-ip", 2, 60_000);
  const r3 = checkRateLimit("test-bucket-ip", 2, 60_000);
  assert.equal(r1.allowed, true);
  assert.equal(r2.allowed, true);
  assert.equal(r3.allowed, false, "Third request within window must be rate-limited");
});

test("6. Light Design System & Zero-Gradient Enforcement", () => {
  const srcFiles = getAllSourceFiles(path.join(rootDir, "src"));
  const gradientRegex = /bg-gradient-|linear-gradient|radial-gradient|conic-gradient|createLinearGradient|createRadialGradient/i;

  for (const file of srcFiles) {
    const content = fs.readFileSync(file, "utf8");
    assert.ok(
      !gradientRegex.test(content),
      `Strict zero-gradient policy violated in ${path.relative(rootDir, file)}`
    );
  }

  const globalsCss = fs.readFileSync(path.join(rootDir, "src/app/globals.css"), "utf8");
  assert.ok(globalsCss.includes("--background: 40 14% 97%"), "Light porcelain background token must be active");
  assert.ok(globalsCss.includes("prefers-reduced-motion: reduce"), "Reduced motion accessibility rule must be present");
});

test("7. Global 3D Vector Network Visualization Architecture & Responsive Scaling", () => {
  const { getResponsiveNodeCount } = loadTsModule("src/components/GlobalNetworkBackground.tsx");

  // Responsive viewport scaling on standard 8-core machine
  assert.equal(getResponsiveNodeCount(1920, 8), 68, "Large desktop (>=1440px) should use 68 nodes");
  assert.equal(getResponsiveNodeCount(1280, 8), 54, "Standard laptop (>=1024px) should use 54 nodes");
  assert.equal(getResponsiveNodeCount(768, 8), 38, "Tablet (>=768px) should use 38 nodes");
  assert.equal(getResponsiveNodeCount(375, 8), 24, "Mobile (<768px) should use 24 nodes");

  // Low-power CPU core reduction (<= 2 cores)
  const lowPowerMobile = getResponsiveNodeCount(375, 2);
  assert.ok(lowPowerMobile < 24 && lowPowerMobile >= 16, "Low-power CPU cores should scale node count down gracefully");

  // Verify single global mounting in RootLayout and non-blocking pointer events
  const rootLayout = fs.readFileSync(path.join(rootDir, "src/app/layout.tsx"), "utf8");
  assert.ok(
    rootLayout.includes("<GlobalNetworkBackground"),
    "GlobalNetworkBackground must be mounted once in src/app/layout.tsx"
  );

  const networkComponent = fs.readFileSync(
    path.join(rootDir, "src/components/GlobalNetworkBackground.tsx"),
    "utf8"
  );
  assert.ok(
    networkComponent.includes('aria-hidden="true"') &&
      networkComponent.includes("pointer-events-none"),
    "GlobalNetworkBackground must be aria-hidden and pointer-events-none"
  );
  assert.ok(
    networkComponent.includes("prefers-reduced-motion: reduce") &&
      networkComponent.includes("visibilitychange"),
    "GlobalNetworkBackground must respect prefers-reduced-motion and pause when tab is hidden"
  );
  assert.ok(
    networkComponent.includes("min-h-[100dvh]") &&
      networkComponent.includes("ResizeObserver") &&
      networkComponent.includes("pointermove"),
    "GlobalNetworkBackground must enforce 100dvh full-screen coverage, ResizeObserver, and unified Pointer Events"
  );
});

test("8. TypingText Moderate Speed (22-38 CPS), 3.5s Duration Cap, Zero-CLS Grid Sizing & Accessibility", () => {
  const {
    computeTypingMetrics,
    TYPING_MIN_CPS,
    TYPING_MAX_CPS,
    TYPING_DEFAULT_CPS,
    TYPING_DEFAULT_MAX_DURATION_MS,
    TYPING_STAGGER_STEP_MS,
  } = loadTsModule("src/components/TypingText.tsx");

  assert.equal(TYPING_MIN_CPS, 22);
  assert.equal(TYPING_MAX_CPS, 38);
  assert.equal(TYPING_DEFAULT_CPS, 30);
  assert.equal(TYPING_DEFAULT_MAX_DURATION_MS, 3500);
  assert.ok(
    TYPING_STAGGER_STEP_MS >= 150 && TYPING_STAGGER_STEP_MS <= 250,
    "Stagger step must be in the calm 150–250ms range"
  );

  // Short heading: uses target moderate speed (22–38 cps)
  const shortMetrics = computeTypingMetrics("Gackstone Baraka", 26, 3500);
  assert.equal(shortMetrics.textLength, 16);
  assert.equal(shortMetrics.effectiveCps, 26);
  assert.ok(
    shortMetrics.estimatedDurationMs >= 500 &&
      shortMetrics.estimatedDurationMs <= 900,
    "Short heading should type at calm moderate pace (~615ms)"
  );

  // Long paragraph: capped at maxDurationMs (3500ms) and accelerates only as needed
  const longText =
    "Designing and shipping production web applications, trading analytics platforms, autonomous AI workflows, native Android systems, and observable cloud infrastructure.";
  const longMetrics = computeTypingMetrics(longText, 30, 3500);
  assert.equal(
    longMetrics.estimatedDurationMs,
    3500,
    "Long text must be capped at maxDurationMs (3500ms)"
  );
  assert.ok(
    longMetrics.effectiveCps > 38,
    "Long text must accelerate effective CPS only as needed to meet the 3.5s cap"
  );

  const typingSource = fs.readFileSync(
    path.join(rootDir, "src/components/TypingText.tsx"),
    "utf8"
  );
  assert.ok(
    typingSource.includes("IntersectionObserver") &&
      typingSource.includes("requestAnimationFrame") &&
      typingSource.includes("aria-label") &&
      typingSource.includes('aria-hidden="true"'),
    "TypingText must use IntersectionObserver, requestAnimationFrame, aria-label, and aria-hidden overlay"
  );
});

test("9. Ambient Blue Glow Drift Multi-Layer Motion, Single Root Instance & Reduced Motion", () => {
  const { computeAmbientGlowTransform } = loadTsModule(
    "src/components/GlobalNetworkBackground.tsx"
  );

  // Reduced motion must freeze the glow at its default position
  const staticGlow = computeAmbientGlowTransform(42, 1920, 1080, 0.5, -0.5, true);
  assert.equal(staticGlow.tx, 0);
  assert.equal(staticGlow.ty, 0);
  assert.equal(staticGlow.scale, 1);
  assert.equal(staticGlow.opacity, 1);

  // Active drift over time must vary smoothly, stay within viewport bounds, and keep scale in [0.9, 1.15]
  const g1 = computeAmbientGlowTransform(10, 1440, 900, 0, 0, false);
  const g2 = computeAmbientGlowTransform(28, 1440, 900, 0, 0, false);
  assert.notEqual(g1.tx, g2.tx, "Ambient glow X must drift continuously over time");
  assert.notEqual(g1.ty, g2.ty, "Ambient glow Y must drift continuously over time");
  assert.ok(
    g1.scale >= 0.9 && g1.scale <= 1.15 && g2.scale >= 0.9 && g2.scale <= 1.15,
    "Ambient glow scale breathing must stay within [0.9, 1.15]"
  );
  assert.ok(
    g1.opacity >= 0.85 && g1.opacity <= 1.0,
    "Ambient glow opacity variation must remain within a few percent"
  );

  // Verify Hero.tsx no longer duplicates the ambient glow and GlobalNetworkBackground owns the single instance
  const heroSource = fs.readFileSync(path.join(rootDir, "src/components/Hero.tsx"), "utf8");
  assert.ok(
    !heroSource.includes("blur-[90px]"),
    "Per-page static blue glow must be removed from Hero.tsx"
  );

  const networkSource = fs.readFileSync(
    path.join(rootDir, "src/components/GlobalNetworkBackground.tsx"),
    "utf8"
  );
  assert.ok(
    networkSource.includes("bg-accent/[0.07]") &&
      networkSource.includes("will-change-transform") &&
      networkSource.includes("translate3d("),
    "GlobalNetworkBackground must render and animate the single persistent ambient blue glow via translate3d"
  );
});

test("10. Uniform Blue-Noise Dot Distribution, Per-Dot Independent Motion & Zero Central Cluster", () => {
  const {
    generateUniformDotField,
    getResponsiveDotFieldConfig,
  } = loadTsModule("src/components/GlobalNetworkBackground.tsx");

  // Device-class scaling by widening cell spacing: desktop > laptop > tablet > mobile
  const desktopCfg = getResponsiveDotFieldConfig(1920, 1080, 8);
  const laptopCfg = getResponsiveDotFieldConfig(1280, 800, 8);
  const tabletCfg = getResponsiveDotFieldConfig(768, 1024, 8);
  const mobileCfg = getResponsiveDotFieldConfig(375, 812, 8);

  assert.ok(
    desktopCfg.totalDots > laptopCfg.totalDots &&
      laptopCfg.totalDots > tabletCfg.totalDots &&
      tabletCfg.totalDots > mobileCfg.totalDots,
    "Total dot count must scale down cleanly across desktop > laptop > tablet > mobile via cell spacing"
  );

  // Verify uniform distribution across all 4 quadrants and center vs periphery (zero central bunching)
  const field = generateUniformDotField(1440, 900, 8);
  assert.ok(field.count > 400, "Desktop uniform dot field should contain a fine scatter of dots");
  assert.ok(field.normX instanceof Float32Array, "Positions must be stored in Float32Array");
  assert.ok(field.freqX1 instanceof Float32Array, "Per-dot frequencies must be stored in Float32Array");

  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;
  let centerSumR = 0;
  let centerN = 0;
  let outerSumR = 0;
  let outerN = 0;
  let maxAbsX = 0;
  let maxAbsY = 0;

  for (let i = 0; i < field.count; i++) {
    const nx = field.normX[i];
    const ny = field.normY[i];
    const r = field.baseRadius[i];

    if (nx >= 0 && ny >= 0) q1++;
    else if (nx < 0 && ny >= 0) q2++;
    else if (nx < 0 && ny < 0) q3++;
    else q4++;

    const dist = Math.hypot(nx, ny);
    if (dist < 0.5) {
      centerSumR += r;
      centerN++;
    } else {
      outerSumR += r;
      outerN++;
    }

    maxAbsX = Math.max(maxAbsX, Math.abs(nx));
    maxAbsY = Math.max(maxAbsY, Math.abs(ny));

    // Verify neighboring dots have independent, decorrelated motion parameters
    if (i > 0) {
      assert.ok(
        field.freqX1[i] !== field.freqX1[i - 1] &&
          field.phaseX1[i] !== field.phaseX1[i - 1],
        "Neighboring dots must have independent frequencies and phases"
      );
    }
  }

  // All 4 screen quadrants must have balanced density (within 15% of average quadrant count)
  const avgQ = field.count / 4;
  for (const qCount of [q1, q2, q3, q4]) {
    assert.ok(
      Math.abs(qCount - avgQ) / avgQ < 0.15,
      "All four screen quadrants must have uniform dot density"
    );
  }

  // Average dot size in center vs outer regions must be statistically identical (no radial size cluster)
  const avgCenterR = centerSumR / centerN;
  const avgOuterR = outerSumR / outerN;
  assert.ok(
    Math.abs(avgCenterR - avgOuterR) < 0.15,
    "Dot size variation must be random across the screen, not clustered in the center"
  );

  // Overscan beyond all four viewport edges (> 1.05)
  assert.ok(
    maxAbsX > 1.05 && maxAbsY > 1.05,
    "Dots must extend into overscan (>1.05) beyond all four viewport edges"
  );

  // Verify group sway and connecting line code are completely absent
  const networkSource = fs.readFileSync(
    path.join(rootDir, "src/components/GlobalNetworkBackground.tsx"),
    "utf8"
  );
  assert.ok(
    !networkSource.includes("globalSwayX") &&
      !networkSource.includes("clusterBreath") &&
      !networkSource.includes("ctx.lineTo") &&
      !networkSource.includes("ctx.stroke("),
    "Group sway, cluster breathing, and line drawing code must be completely removed"
  );
});

test("11. Feature Removal & Portfolio Simplification Integrity", () => {
  // 1. Deleted files must not exist
  assert.equal(
    fs.existsSync(path.join(rootDir, "src/components/SelectedWork.tsx")),
    false,
    "SelectedWork.tsx must be deleted"
  );
  assert.equal(
    fs.existsSync(path.join(rootDir, "src/components/CommandPalette.tsx")),
    false,
    "CommandPalette.tsx must be deleted"
  );

  // 2. Home page must not reference SelectedWork and must re-number sections cleanly (01, 02, 03)
  const homeSource = fs.readFileSync(path.join(rootDir, "src/app/page.tsx"), "utf8");
  assert.ok(!homeSource.includes("SelectedWork"), "Home page must not import or render SelectedWork");
  assert.ok(homeSource.includes("03 • Project Consultation"), "Home CTA must be numbered 03");

  // 3. Header must not contain Search / Ctrl K or open-command-palette
  const headerSource = fs.readFileSync(path.join(rootDir, "src/components/Header.tsx"), "utf8");
  assert.ok(
    !headerSource.includes("Ctrl K") &&
      !headerSource.includes("open-command-palette") &&
      !headerSource.includes("Command Search"),
    "Header must not contain Search / Ctrl K button or command palette trigger"
  );

  // 4. Portfolio page must contain only the project cards grid without filters, modes, comparison, or resume generator
  const portfolioSource = fs.readFileSync(
    path.join(rootDir, "src/app/portfolio/page.tsx"),
    "utf8"
  );
  assert.ok(
    !portfolioSource.includes("project-comparison") &&
      !portfolioSource.includes("resume-generator") &&
      !portfolioSource.includes("Client Mode") &&
      !portfolioSource.includes("Engineering Mode") &&
      !portfolioSource.includes("inspectedProject"),
    "Portfolio page must only render the project cards grid without extra tools or modals"
  );

  // 5. Engineering page must keep 7-step process and Technology Radar while removing the 6 listed features
  const engineeringSource = fs.readFileSync(
    path.join(rootDir, "src/app/engineering/page.tsx"),
    "utf8"
  );
  assert.ok(
    engineeringSource.includes("Engineering Process") &&
      engineeringSource.includes("tech-radar"),
    "Engineering page must retain the 7-step Engineering Process and Technology Radar"
  );
  assert.ok(
    !engineeringSource.includes("dependency-graph") &&
      !engineeringSource.includes("architecture-visualizer") &&
      !engineeringSource.includes("observability-lab") &&
      !engineeringSource.includes("ai-lab") &&
      !engineeringSource.includes("developer-playground") &&
      !engineeringSource.includes("#timeline"),
    "Engineering page must not contain any of the 6 removed tools"
  );

  // 6. Floating AI Copilot must still be mounted in layout.tsx
  const layoutSource = fs.readFileSync(path.join(rootDir, "src/app/layout.tsx"), "utf8");
  assert.ok(!layoutSource.includes("CommandPalette"), "RootLayout must not mount CommandPalette");
  assert.ok(layoutSource.includes("<AICopilot />"), "RootLayout must keep floating AICopilot");
});




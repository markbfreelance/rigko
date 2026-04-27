import { Icon } from "@iconify/react";
import StepBlock, { Substeps } from "../_components/step-block";
import Callout from "../_components/callout";
import PartsChecklist from "../_components/parts-checklist";
import FailuresAccordion from "../_components/failures-accordion";
import DiagramAirflow from "../_components/diagram-airflow";
import DiagramMobo from "../_components/diagram-mobo";
import type { TocItem } from "../_components/toc-rail";

export const TOC: TocItem[] = [
  { id: "preflight", label: "Pre-flight checklist", number: "00" },
  { id: "step-01", label: "Prep the bench", number: "01" },
  { id: "step-02", label: "CPU + cooler", number: "02" },
  { id: "step-03", label: "RAM + M.2", number: "03" },
  { id: "step-04", label: "Mount the board", number: "04" },
  { id: "step-05", label: "PSU + cables", number: "05" },
  { id: "step-06", label: "GPU + storage", number: "06" },
  { id: "step-07", label: "Front-panel headers", number: "07" },
  { id: "step-08", label: "First POST", number: "08" },
  { id: "post-boot", label: "Powered on. Now what.", number: "09" },
  { id: "failures", label: "Common failures", number: "!!" },
  { id: "up-next", label: "Up next", number: "→" },
];

const CHECKLIST = [
  { label: "CPU (LGA1700 / AM5)", hint: "Match your motherboard socket exactly" },
  { label: "Motherboard", hint: "B650 or B760 hits the budget sweet spot" },
  { label: "RAM — 2× 16GB DDR5", hint: "Buy as a kit, not two singles" },
  { label: "NVMe SSD — 1TB Gen4", hint: "Gen4 fits all 2026 boards; Gen5 is overkill for most" },
  { label: "Case (mid-tower ATX)", hint: "Tecware Forge M, Montech AIR 903, NZXT H5 Flow" },
  { label: "PSU (650W+ Gold)", hint: "ATX 3.1 if you're going RTX 50-series" },
  { label: "CPU cooler", hint: "Tower air cooler beats budget AIOs in PH humidity" },
  { label: "Thermal paste", hint: "Most coolers ship with a pre-applied pad — verify" },
  { label: "GPU (optional for now)", hint: "iGPU works for first boot; install card later" },
  { label: "AVR — 1500VA min", hint: "Cheapest insurance you'll buy. Non-negotiable in PH." },
  { label: "Anti-static wrist strap", hint: "Or just touch the case chassis often" },
  { label: "Phillips #2 screwdriver, magnetized", hint: "₱150 at any hardware store" },
];

const FAILURES = [
  {
    symptom: "Fans spin, but no display.",
    causes: [
      "RAM not seated fully — push until both clips snap.",
      "Wrong DIMM slots — most boards want A2/B2.",
      "Display cable in motherboard HDMI instead of GPU.",
      "GPU power cables not fully clicked in.",
    ],
    fix: "Reseat RAM in A2/B2, plug monitor into the GPU's HDMI/DP, double-check the 8-pin or 12V-2x6 connector. 9 out of 10 first builds: RAM.",
  },
  {
    symptom: "Nothing happens when you press power.",
    causes: [
      "Front-panel power switch wired to the wrong header pins.",
      "PSU switch on the back is set to 0.",
      "24-pin or 8-pin CPU cable not seated.",
    ],
    fix: "Flip the PSU rocker to 1. Re-check the front-panel block against your motherboard manual — POWER_SW is usually pins 6 and 8. Short those two pins with a screwdriver to test the PSU.",
  },
  {
    symptom: "POSTs once, then reboots in a loop.",
    causes: [
      "EXPO/XMP enabled on a fresh CMOS without memory training.",
      "CPU drawing too much power for a stock board profile.",
      "Loose 8-pin EPS connector under load.",
    ],
    fix: "Clear CMOS, boot at JEDEC speeds first, then enable EXPO once you're stable. If using a 13900K/7950X-class chip, set PPT/PL1 to manufacturer spec.",
  },
  {
    symptom: "Boot drive isn't detected.",
    causes: [
      "M.2 SSD not screwed down — it's tilted out of the slot.",
      "Wrong M.2 slot — secondary slot disabled by BIOS default.",
      "BIOS boot order not pointing at the new drive.",
    ],
    fix: "Power down. Open the case. Press the M.2 stick flat, fasten the standoff screw. In BIOS → Boot, set your NVMe as #1.",
  },
  {
    symptom: "Random shutdowns under load.",
    causes: [
      "PSU undersized or low-quality.",
      "Voltage sag from a brownout your AVR didn't catch.",
      "CPU thermal throttle — pump or fan not spinning.",
    ],
    fix: "Run HWInfo64 during a stress test. If CPU > 95°C → reseat cooler. If PSU rails sag → upgrade or add an AVR. If the wall voltage drifts < 200V → that's a Meralco problem, not yours.",
  },
];

export default function BuildYourFirstPcContent() {
  return (
    <article className="max-w-3xl">
      {/* Pre-flight */}
      <section id="preflight" className="scroll-mt-32 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-black text-[#c2000b] font-black text-xs border-2 border-[#c2000b]/40">
            00
          </span>
          <span className="text-[10px] font-mono text-[#c2000b] font-black uppercase tracking-[0.3em]">
            Step_00 // Pre-flight
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black dark:text-white mb-3 leading-tight">
          Lay every part on the table
        </h2>
        <p className="text-sm md:text-base font-mono text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Before you touch a screwdriver: confirm every part exists, every
          cable is in its bag, and every manual is open in a tab. The number
          one cause of midnight build failures is a missing standoff.
        </p>

        <PartsChecklist items={CHECKLIST} storageKey="rigko-guide-first-pc" />

        <Callout variant="ph-note" title="220V/60Hz reality">
          PSUs sold in the Philippines are usually auto-ranging (100–240V),
          but double-check the sticker. If yours has a manual{" "}
          <code className="text-[#c2000b]">115/230</code> switch, set it to{" "}
          <strong>230</strong>. Plug straight into an AVR, never into an
          extension cord daisy-chained off a fridge.
        </Callout>
      </section>

      {/* Step 1 */}
      <StepBlock
        number="01"
        id="step-01"
        title="Prep the bench"
        goal="A clean, static-safe workspace that won't eat your screws."
      >
        <Substeps
          items={[
            "Clear a hard table — not your bed, not the carpet. Static and soft surfaces are how motherboards die.",
            "Lay the motherboard box flat. You'll build the CPU+RAM+cooler on top of it before the case.",
            "Put every screw bag in a magnetized cup or saucer. Group by part: case screws, M.2 screws, fan screws.",
            "Open the motherboard manual. You'll reference it three times in the next hour.",
          ]}
        />

        <Callout variant="warning" title="Don't open the CPU yet">
          The CPU box is the last thing you open. Pins on Intel boards and
          contacts on AM5 chips bend if you sneeze near them.
        </Callout>
      </StepBlock>

      {/* Step 2 */}
      <StepBlock
        number="02"
        id="step-02"
        title="Drop in the CPU + cooler"
        goal="Seat the chip, paste it once, mount the cooler — never lift it after."
      >
        <Substeps
          items={[
            "Lift the CPU socket lever. On AM5/LGA1700, the retention bracket flips up too.",
            "Align the gold triangle on the CPU corner with the triangle on the socket. Drop it in — never push.",
            "Lower the bracket and the lever. The lever is supposed to feel resistant. That's normal.",
            "Apply thermal paste — one pea-sized blob in the center. Stop second-guessing the pattern; pressure spreads it.",
            "Mount the cooler straight down. Tighten the four screws in an X-pattern, two turns each, until they bottom out.",
          ]}
        />

        <DiagramMobo />

        <Callout variant="tip" title="Pre-applied paste counts">
          Most stock coolers (and 80% of aftermarket towers in PH boxes) ship
          with paste already on. If yours does, skip step 4 — adding more
          makes contact worse.
        </Callout>
        <Callout variant="warning" title="Don't overtighten standoffs">
          If a screw stops turning easily, stop. Crushed coolers crack
          motherboards. The cooler is tight enough when each screw has bottomed
          out and there's no wiggle.
        </Callout>
      </StepBlock>

      {/* Step 3 */}
      <StepBlock
        number="03"
        id="step-03"
        title="RAM + M.2 SSD"
        goal="Two sticks, two clicks. One screw for the SSD."
      >
        <Substeps
          items={[
            "Open the clips on DIMM slots A2 and B2 (the second and fourth slots from the CPU).",
            "Match the notch on the RAM stick to the notch on the slot. Press straight down on both ends — listen for the click.",
            "Unscrew the M.2 standoff. Lay your NVMe SSD into the slot at a 30° angle.",
            "Press it flat and screw the standoff back down. Don't force the screw — finger-tight is enough.",
            "If your board ships an M.2 heatsink, peel the blue plastic film off the thermal pad before clamping it on.",
          ]}
        />

        <Callout variant="ph-note" title="EXPO/XMP — not yet">
          Don't enable memory profiles until first boot succeeds. We turn on
          EXPO in the BIOS step, not now.
        </Callout>
      </StepBlock>

      {/* Step 4 */}
      <StepBlock
        number="04"
        id="step-04"
        title="Mount the board in the case"
        goal="Standoffs aligned, I/O shield in, board screwed down without a flex."
      >
        <Substeps
          items={[
            "Count the standoffs in the case. Match them to the holes on your motherboard. Add or remove as needed — extra standoffs short the board.",
            "Snap the rear I/O shield into the case from the inside. There's only one orientation; the cutouts match your board's I/O.",
            "Lower the board onto the standoffs at a slight angle so the I/O ports clear the shield.",
            "Start screws in opposite corners. Snug, not torqued. Then fill in the rest in a star pattern.",
          ]}
        />

        <Callout variant="warning" title="The I/O shield is not optional">
          Skip the I/O shield and the board sits crooked, USB ports misalign,
          and ground continuity is gone. Always install it first.
        </Callout>
      </StepBlock>

      {/* Step 5 */}
      <StepBlock
        number="05"
        id="step-05"
        title="PSU + the cable rats' nest"
        goal="Power delivered. Cables routed behind the tray. No spaghetti."
      >
        <Substeps
          items={[
            "Mount the PSU with its fan facing the case's bottom vent. The vent has a dust filter — pull it out and rinse it monthly.",
            "Connect the 24-pin ATX to the motherboard. It only fits one way; don't force it.",
            "Connect the 8-pin (or 8+4) EPS to the top-left of the board. This is CPU power — the build won't POST without it.",
            "Run every cable behind the motherboard tray. Use the case's velcro straps if it has them, zip-ties if it doesn't.",
            "Leave the GPU power cable dangling for now — we install the card next.",
          ]}
        />

        <Callout variant="pro" title="Modular vs. semi-modular">
          Modular PSUs cost ~₱500 more in PH but save you from coiling 4 unused
          cables behind the tray. Worth it for first builders.
        </Callout>
      </StepBlock>

      {/* Step 6 */}
      <StepBlock
        number="06"
        id="step-06"
        title="GPU + extra storage"
        goal="Card seated, latched, fed. SATA drives mounted if you have them."
      >
        <Substeps
          items={[
            "Remove the rear PCIe slot covers that align with your GPU's bracket. Two slots for most modern cards.",
            "Open the PCIe x16 latch on the motherboard.",
            "Lower the GPU straight down into the slot. Press until the latch clicks shut.",
            "Screw the GPU bracket to the rear of the case. Two screws, snug.",
            "Plug the 8-pin (or 12V-2x6) power cable into the GPU. Push until you feel the click — half-seated cables melt.",
          ]}
        />

        <DiagramAirflow />

        <Callout variant="warning" title="12V-2x6 / 12VHPWR seating">
          For RTX 40/50-series cards: ensure the 12V-2x6 connector clicks
          fully. Look down the side — there should be no gap and no yellow
          stripe visible. Half-seated connectors have melted in real builds.
        </Callout>
      </StepBlock>

      {/* Step 7 */}
      <StepBlock
        number="07"
        id="step-07"
        title="Front-panel headers"
        goal="Power button, reset, USB, audio — all wired to the right pins."
      >
        <Substeps
          items={[
            "Find the F_PANEL block on the motherboard, usually bottom-right corner.",
            "Match each tiny 2-pin header against the diagram in your motherboard manual: PWR_SW, RESET_SW, HDD_LED, PWR_LED.",
            "Polarity matters for LEDs (white = ground), but doesn't matter for switches.",
            "Plug in front USB 3.0 (the big blue 19-pin block) and front audio (HD_AUDIO) — these only fit one way.",
            "Plug in any case fan headers to CHA_FAN1, CHA_FAN2, etc. The CPU cooler fan goes to CPU_FAN.",
          ]}
        />

        <Callout variant="tip" title="Use the manual, not your memory">
          Even seasoned builders pull out the manual for the F_PANEL block.
          The pinout differs per board and per generation — never wing it.
        </Callout>
      </StepBlock>

      {/* Step 8 */}
      <StepBlock
        number="08"
        id="step-08"
        title="First POST"
        goal="Lights on. BIOS screen visible. No magic smoke."
      >
        <Substeps
          items={[
            "Plug in the AVR. Plug the PSU into the AVR. Flip the PSU rocker to 1.",
            "Connect the monitor to your GPU's HDMI/DP — not the motherboard's, unless you have an iGPU and skipped the GPU step.",
            "Plug in keyboard and mouse via USB.",
            "Press the case's power button. Listen — fans should spin, no continuous beeps.",
            "Hit DEL or F2 repeatedly to enter the BIOS. If you see the BIOS — congratulations, you have a PC.",
          ]}
        />

        <Callout variant="tip" title="If it doesn't POST">
          Don't panic. Don't reseat everything blindly. Skip down to the{" "}
          <a href="#failures" className="text-[#c2000b] underline">
            Common Failures
          </a>{" "}
          accordion below — symptoms map to fixes there.
        </Callout>
      </StepBlock>

      {/* Post-boot */}
      <section
        id="post-boot"
        className="scroll-mt-32 py-10 border-t-2 border-dashed border-black/10 dark:border-white/10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-600 text-white font-black text-xs">
            ✓
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-[0.3em]">
            Powered_On // Now what
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black dark:text-white mb-3 leading-tight">
          Don&apos;t close the case yet.
        </h2>
        <p className="text-sm md:text-base font-mono text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          You&apos;re in BIOS. The build is alive. Resist the urge to install
          Windows in the next 30 seconds — burn through this checklist first.
        </p>

        <ul className="space-y-2 mb-6">
          {[
            "Verify all RAM is detected (e.g., 32GB shown, not 16GB).",
            "Verify the NVMe SSD shows up in the storage list.",
            "Set fan curves: CPU fan to PWM, case fans to silent below 50°C.",
            "Enable EXPO (AMD) or XMP (Intel). Save & exit. Reboot once.",
            "Update BIOS only if your board doesn't recognize the CPU at all. Otherwise, skip it.",
            "Create a Rufus USB on another machine: download the latest Windows 11 ISO, write it.",
            "Boot from USB → install Windows on your NVMe.",
            "Install chipset drivers FIRST, then GPU drivers, then Wi-Fi/audio. In that order.",
          ].map((line, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm font-mono text-gray-700 dark:text-gray-300"
            >
              <Icon
                icon="lucide:check-circle-2"
                className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
              />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        <Callout variant="ph-note" title="First stress test">
          Run Cinebench R23 for 10 minutes. If your CPU stays under 90°C and
          there are no crashes, the build is stable. Above 95°C? Reseat the
          cooler — usually too much paste, not too little.
        </Callout>
      </section>

      {/* Failures */}
      <section
        id="failures"
        className="scroll-mt-32 py-10 border-t-2 border-dashed border-black/10 dark:border-white/10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#c2000b] text-white font-black text-xs">
            !!
          </span>
          <span className="text-[10px] font-mono text-[#c2000b] font-black uppercase tracking-[0.3em]">
            Common_Failures
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black dark:text-white mb-3 leading-tight">
          Five things that go wrong on first builds.
        </h2>
        <p className="text-sm font-mono text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
          We&apos;ve answered every one of these on Discord at least 200
          times. Tap a symptom to see the fix.
        </p>
        <FailuresAccordion items={FAILURES} />
      </section>

      {/* Up next */}
      <section
        id="up-next"
        className="scroll-mt-32 py-10 border-t-2 border-dashed border-black/10 dark:border-white/10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[10px] font-mono text-[#c2000b] font-black uppercase tracking-[0.3em]">
            → Up_Next
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black dark:text-white mb-3 leading-tight">
          Read these next.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          <UpNextCard
            href="/guides/bios-first-boot"
            number="G_06"
            title="BIOS First-Boot Checklist"
            body="The eight switches that turn raw silicon into the speed you actually paid for."
          />
          <UpNextCard
            href="/guides/windows-clean-install"
            number="G_07"
            title="Windows: Clean Install"
            body="Rufus USB, debloat script, driver order. No fluff, no telemetry."
          />
        </div>
      </section>
    </article>
  );
}

function UpNextCard({
  href,
  number,
  title,
  body,
}: {
  href: string;
  number: string;
  title: string;
  body: string;
}) {
  return (
    <a
      href={href}
      className="group flex flex-col rounded-2xl border border-dashed border-black/15 dark:border-white/10 p-4 hover:border-[#c2000b]/50 transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-mono text-[#c2000b] font-black uppercase tracking-[0.3em]">
          {number}
        </span>
        <span className="text-[8px] font-mono text-gray-500 uppercase tracking-[0.3em] ml-auto">
          Drafting //
        </span>
      </div>
      <h4 className="text-base font-black uppercase tracking-tight text-black dark:text-white mb-1 group-hover:text-[#c2000b] transition-colors">
        {title}
      </h4>
      <p className="text-xs font-mono text-gray-600 dark:text-gray-400 leading-relaxed">
        {body}
      </p>
    </a>
  );
}

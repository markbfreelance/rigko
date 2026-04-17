"use client";

export default function BackgroundTerminalText() {
  return (
    <>
      {/* Background blurry terminal text (Left) */}
      <div className="absolute top-20 left-4 md:left-12 text-[#8b0000] opacity-30 blur-[2px] text-sm md:text-base leading-relaxed pointer-events-none hidden lg:block z-0 select-none font-mono">
        <div>Regional Relay:</div>
        <br />
        <div>172.16.253.1 (PH_MNL)</div>
        <div className="ml-4">&gt; Node_G: ONLINE</div>
        <div className="ml-4">&gt; Node_H: ONLINE</div>
        <br />
        <div className="text-[#c2000b] opacity-60">-- RIGKO_CORE INITIALIZED --</div>
        <br />
        <br />
        <div>Hardware Channels:</div>
        <br />
        <div>SATA 6Gb/s</div>
        <div className="ml-4">&gt; CPU_SOCKET: READY</div>
        <div className="ml-4">&gt; GPU_SLOT: READY</div>
        <br />
        <div>Memory:</div>
        <br />
        <div>DDR5 6000MT/s</div>
        <div className="ml-4">&gt; DIMM_A1: ACTIVE</div>
        <div className="ml-4">&gt; DIMM_B1: ACTIVE</div>
        <div className="ml-4">&gt; UNALLOCATED_CACHE</div>
      </div>

      {/* Background blurry terminal text (Right) */}
      <div className="absolute bottom-20 right-4 md:right-12 text-[#8b0000] opacity-30 blur-[3px] text-sm md:text-base leading-relaxed pointer-events-none hidden lg:block z-0 select-none text-right font-mono">
        <div>ASSET &nbsp;&nbsp;&nbsp; ___ INDEXED.</div>
        <div>ASSET &nbsp;&nbsp;&nbsp; ___ INDEXED.</div>
        <div>ASSET &nbsp;&nbsp;&nbsp; ___ INDEXED.</div>
        <div>ASSET &nbsp;&nbsp;&nbsp; ___ INDEXED.</div>
        <div>ASSET &nbsp;&nbsp;&nbsp; ___ INDEXED.</div>
        <div>ASSET &nbsp;&nbsp;&nbsp; ___ INDEXED.</div>
        <div>ASSET &nbsp;&nbsp;&nbsp; ___ INDEXED.</div>
        <div>ASSET &nbsp;&nbsp;&nbsp; ___ INDEXED.</div>
        <br />
        <div>tech@rigko_core:~# _</div>
      </div>
    </>
  );
}

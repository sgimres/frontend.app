<script lang="ts">
  import { fly, scale } from "svelte/transition";

  const sshCommand = "ssh eth0.top";
  let copied = $state(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(sshCommand);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<div class="w-full max-w-lg z-10 mb-12 px-4">
  <div class="rounded-2xl border border-base-300 bg-base-200 shadow-2xl overflow-hidden">
    <div class="flex items-center gap-2 px-4 py-3 border-b border-base-300 bg-base-300/50">
      <div class="flex gap-1.5">
        <div class="w-3 h-3 rounded-full bg-error/80"></div>
        <div class="w-3 h-3 rounded-full bg-warning/80"></div>
        <div class="w-3 h-3 rounded-full bg-success/80"></div>
      </div>
      <span class="text-xs text-base-content/50 ml-2 font-mono uppercase tracking-widest font-bold">terminal</span>
    </div>

    <div class="flex items-center justify-between px-6 py-6">
      <code class="text-base-content text-sm md:text-base font-mono flex items-center">
        <span class="text-success font-bold mr-2">$</span>
        {sshCommand}
        <span class="inline-block w-2.5 h-5 ml-1 bg-success/80 animate-pulse"></span>
      </code>

      <div class="relative ml-4 flex-shrink-0">
        {#if copied}
          <div class="absolute inset-0 pointer-events-none">
            {#each Array(8) as _, i}
              <div
                class="absolute w-1 h-1 bg-success rounded-full"
                style="left: 50%; top: 50%;"
                in:fly={{
                  x: (Math.random() - 0.5) * 80,
                  y: (Math.random() - 0.5) * 80,
                  duration: 600,
                  opacity: 0,
                }}
              ></div>
            {/each}
          </div>
        {/if}

        <button
          onclick={handleCopy}
          class="p-2.5 rounded-xl text-base-content/40 hover:text-success hover:bg-success/10 transition-colors duration-200 cursor-pointer"
          aria-label="Copy SSH command"
        >
          {#key copied}
            {#if copied}
              <div in:scale={{ duration: 200 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-success"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
            {:else}
              <div in:scale={{ duration: 200 }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              </div>
            {/if}
          {/key}
        </button>
      </div>
    </div>
  </div>
  <p class="text-center mt-4 text-base-content/40 text-sm italic">
    Run this in your terminal to explore my portfolio via SSH
  </p>
</div>

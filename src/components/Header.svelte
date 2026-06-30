<script lang="ts">
  import { fly } from "svelte/transition";

  let { theme, toggleTheme }: { theme: "dark" | "light"; toggleTheme: () => void } = $props();

  const letters = [
    { char: "P", color: "text-primary" },
    { char: "O", color: "text-secondary" },
    { char: "R", color: "text-accent" },
    { char: "T", color: "text-warning" },
    { char: "F", color: "text-error" },
    { char: "O", color: "text-info" },
    { char: "L", color: "text-success" },
    { char: "I", color: "text-primary" },
    { char: "O", color: "text-secondary" },
  ];
</script>

<div class="text-center z-10 mb-16 relative w-full">
  <div class="absolute top-[-40px] right-0 z-20">
    <button onclick={toggleTheme} class="btn btn-circle btn-ghost cursor-pointer">
      {#key theme}
        <div in:fly={{ y: -10, duration: 200 }} out:fly={{ y: 10, duration: 200 }}>
          {#if theme === "dark"}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          {/if}
        </div>
      {/key}
    </button>
  </div>

  <h1 class="text-7xl md:text-9xl font-black flex justify-center tracking-tighter uppercase cursor-default select-none">
    {#each letters as l}
      <span class="{l.color} inline-block hover:scale-110 hover:-translate-y-1 transition-transform duration-200">
        {l.char}
      </span>
    {/each}
  </h1>
  <p class="mt-8 text-xl md:text-2xl text-slate-400 font-medium">
    My portfolio, but make it <span class="text-accent font-mono">terminal</span>.
  </p>
</div>

<script lang="ts">
  import { fly, scale } from "svelte/transition";

  let liked = $state(false);
</script>

<footer class="text-center z-10 space-y-4 mb-20 w-full flex flex-col items-center">
  <div class="flex justify-center mb-4">
    <button
      onclick={() => (liked = !liked)}
      class="relative p-4 rounded-full hover:bg-error/5 transition-colors group cursor-pointer"
    >
      {#key liked}
        <div in:scale={{ duration: 300 }}>
          {#if liked}
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-error"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          {:else}
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-base-content/40 group-hover:text-error transition-colors"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          {/if}
        </div>
      {/key}

      {#if liked}
        <div class="absolute inset-0 pointer-events-none">
          {#each Array(6) as _, i}
            <div
              class="absolute top-1/2 left-1/2"
              in:fly={{
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * -150,
                duration: 1000,
                opacity: 0,
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-error"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
          {/each}
        </div>
      {/if}
    </button>
  </div>

  <h3 class="text-4xl font-bold tracking-tight">
    Thanks for <span class="text-success">visiting</span>
  </h3>

  <p class="text-base-content/50 max-w-md mx-auto leading-relaxed">
    Whether you browsed here or SSH'd in, I appreciate you stopping by.
    <br />
    <span class="text-success font-mono mt-4 block text-sm">// more projects coming soon</span>
  </p>

  <div class="flex justify-center items-center gap-6 mt-16 text-sm text-base-content/40 font-medium">
    <p class="cursor-default transition-colors hover:text-info">
      Built with <span class="text-info">(Go + Wish) | (Svelte + Vite)</span>
    </p>
    <span class="w-1.5 h-1.5 bg-base-300 rounded-full"></span>
    <a href="https://github.com" class="flex items-center gap-2 hover:text-base-content transition-colors group">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:rotate-12 transition-transform"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
      GitHub
    </a>
  </div>
</footer>

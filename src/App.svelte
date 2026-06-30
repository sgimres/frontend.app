<script lang="ts">
  import { fly, fade } from "svelte/transition";
  import BackgroundShapes from "./components/BackgroundShapes.svelte";
  import FloatingParticles from "./components/FloatingParticles.svelte";
  import CursorGlow from "./components/CursorGlow.svelte";
  import Header from "./components/Header.svelte";
  import Terminal from "./components/Terminal.svelte";
  import Guestbook from "./components/Guestbook.svelte";
  import Footer from "./components/Footer.svelte";

  let theme = $state<"dark" | "light">("dark");
  let showFullGuestbook = $state(false);

  function toggleTheme() {
    theme = theme === "dark" ? "light" : "dark";
  }

  $effect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  });
</script>

<div class="h-screen w-full relative bg-base-100 text-base-content overflow-hidden">
  <BackgroundShapes />
  <FloatingParticles />
  <CursorGlow />

  {#if !showFullGuestbook}
    <div
      transition:fade={{ duration: 300 }}
      class="h-full w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory relative z-10 scroll-smooth"
    >
      <div class="max-w-6xl mx-auto px-4 md:px-8">
        <section class="h-screen flex flex-col items-center justify-center w-full snap-start">
          <Header {theme} {toggleTheme} />
          <Terminal />
          <div class="mt-12 text-base-content/40 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/></svg>
          </div>
        </section>

        <section class="h-screen flex flex-col items-center justify-center w-full snap-start">
          <Guestbook onViewAll={() => (showFullGuestbook = true)} />
        </section>

        <section class="h-screen flex flex-col items-center justify-center w-full snap-start">
          <Footer />
        </section>
      </div>
    </div>
  {:else}
    <div in:fly={{ x: 100, duration: 300 }} class="h-full w-full overflow-y-auto relative z-10">
      <Guestbook isFullPage onViewAll={() => (showFullGuestbook = false)} />
    </div>
  {/if}
</div>

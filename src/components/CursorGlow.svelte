<script lang="ts">
  import { spring } from "svelte/motion";

  let mouseX = spring(0, { damping: 20, stiffness: 100 });
  let mouseY = spring(0, { damping: 20, stiffness: 100 });

  function handleMouseMove(e: MouseEvent) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  }
</script>

<svelte:window onmousemove={handleMouseMove} />

<div
  class="fixed inset-0 pointer-events-none z-50 overflow-hidden"
  style="background: radial-gradient(circle 150px at {$mouseX}px {$mouseY}px, rgba(168, 85, 247, 0.15), transparent 80%);"
></div>

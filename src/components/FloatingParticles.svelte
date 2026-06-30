<script lang="ts">
  const colors = ["bg-primary", "bg-secondary", "bg-accent", "bg-info", "bg-success", "bg-warning", "bg-error"];

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: colors[Math.floor(Math.random() * colors.length)],
    xDelta: Math.random() * 100 - 50,
    yDelta: Math.random() * 100 - 50,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }));
</script>

<div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
  {#each particles as p (p.id)}
    <div
      class="absolute rounded-full opacity-20 {p.color}"
      style="width: {p.size}px; height: {p.size}px; left: {p.x}%; top: {p.y}%; --x: {p.xDelta}px; --y: {p.yDelta}px; animation: float {p.duration}s ease-in-out {p.delay}s infinite;"
    ></div>
  {/each}
</div>

<style>
  :global {
    @keyframes float {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
      50% { transform: translate(var(--x), var(--y)) scale(1.5); opacity: 0.4; }
    }
  }
</style>

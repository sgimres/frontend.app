<script lang="ts">
  let positions = $state<{ top: string; left: string }[]>([]);

  function generatePositions() {
    return Array.from({ length: 3 }, () => ({
      top: `${Math.floor(Math.random() * 70) + 10}%`,
      left: `${Math.floor(Math.random() * 70) + 10}%`,
    }));
  }

  $effect(() => {
    positions = generatePositions();
    const interval = setInterval(() => {
      positions = generatePositions();
    }, 10000);
    return () => clearInterval(interval);
  });
</script>

<div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
  {#if positions.length > 0}
    <svg
      width="100" height="100" viewBox="0 0 100 100"
      class="shape1 absolute blur-[1px]"
      style="top: {positions[0]?.top}; left: {positions[0]?.left};"
    >
      <circle cx="50" cy="50" r="40" class="draw1 stroke-info fill-none" stroke-width="2" stroke-linecap="round" stroke-dasharray="251" />
    </svg>

    <svg
      width="120" height="120" viewBox="0 0 120 120"
      class="shape2 absolute blur-[1px]"
      style="top: {positions[1]?.top}; left: {positions[1]?.left};"
    >
      <rect x="10" y="10" width="100" height="100" rx="20" class="draw2 stroke-secondary fill-none" stroke-width="2" stroke-linecap="round" stroke-dasharray="366" />
    </svg>

    <svg
      width="110" height="110" viewBox="0 0 110 110"
      class="shape3 absolute blur-[1px]"
      style="top: {positions[2]?.top}; left: {positions[2]?.left};"
    >
      <path d="M 55 10 L 100 95 L 10 95 Z" class="draw3 stroke-primary fill-none" stroke-width="2" stroke-linecap="round" stroke-dasharray="250" />
    </svg>
  {/if}
</div>

<style>
  .shape1 { animation: shape1 12s ease-in-out infinite; }
  .shape2 { animation: shape2 15s ease-in-out infinite; }
  .shape3 { animation: shape3 18s ease-in-out infinite; }
  .draw1 { animation: draw1 8s ease-in-out infinite; }
  .draw2 { animation: draw2 10s ease-in-out 2s infinite; }
  .draw3 { animation: draw3 12s ease-in-out 4s infinite; }

  @keyframes shape1 {
    0%, 100% { transform: translateY(0) translateX(0); }
    50% { transform: translateY(20px) translateX(10px); }
  }
  @keyframes shape2 {
    0%, 100% { transform: translateY(0) rotate(15deg); }
    50% { transform: translateY(-30px) rotate(25deg); }
  }
  @keyframes shape3 {
    0%, 100% { transform: rotate(-10deg) scale(1); }
    50% { transform: rotate(10deg) scale(1.05); }
  }
  @keyframes draw1 {
    0%, 100% { stroke-dashoffset: 251; opacity: 0; }
    25%, 75% { stroke-dashoffset: 0; opacity: 1; }
  }
  @keyframes draw2 {
    0%, 100% { stroke-dashoffset: 366; opacity: 0; }
    25%, 75% { stroke-dashoffset: 0; opacity: 1; }
  }
  @keyframes draw3 {
    0%, 100% { stroke-dashoffset: 250; opacity: 0; }
    25%, 75% { stroke-dashoffset: 0; opacity: 1; }
  }
</style>

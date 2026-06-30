<script lang="ts">
  import { fly } from "svelte/transition";
  import { getEntries, type GuestbookEntry } from "$lib/guestbook.remote";

  let {
    isFullPage = false,
    onViewAll,
  }: {
    isFullPage: boolean;
    onViewAll?: () => void;
  } = $props();

  const promise = getEntries();

  let search = $state("");

  const borderColors = [
    "border-primary",
    "border-secondary",
    "border-accent",
    "border-success",
    "border-warning",
    "border-error",
    "border-info",
  ];

  function formatDate(dateString: string) {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  }

  function matchesSearch(entry: GuestbookEntry, q: string) {
    return !q || entry.name.toLowerCase().includes(q) || entry.description.toLowerCase().includes(q);
  }
</script>

{#await promise}
  {#if isFullPage}
    <div class="w-full max-w-6xl mx-auto py-20 px-6">
      <div class="overflow-x-auto bg-base-200/50 backdrop-blur-md rounded-2xl border border-base-300 shadow-2xl">
        <table class="table table-lg w-full text-base-content">
          <thead>
            <tr class="border-b border-base-300 text-base-content/50 uppercase tracking-wider text-xs">
              <th class="bg-transparent font-bold">#</th>
              <th class="bg-transparent font-bold">User</th>
              <th class="bg-transparent font-bold">Message</th>
              <th class="bg-transparent font-bold">Date</th>
            </tr>
          </thead>
          <tbody>
            {#each Array(6) as _, i (i)}
              <tr class="border-b border-base-300/50">
                <td><div class="skeleton h-4 w-4 bg-base-300"></div></td>
                <td><div class="skeleton h-4 w-24 bg-base-300"></div></td>
                <td><div class="skeleton h-4 w-full bg-base-300"></div></td>
                <td><div class="skeleton h-4 w-32 bg-base-300"></div></td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  {:else}
    <div class="w-full z-10 mt-12 px-2">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each Array(6) as _, i (i)}
          <div class="skeleton h-32 w-full bg-base-200 rounded-xl border border-base-300"></div>
        {/each}
      </div>
    </div>
  {/if}
{:then entries}
  {#if isFullPage}
    {@const filtered = entries.filter((e) => matchesSearch(e, search.toLowerCase()))}
    <div class="w-full max-w-6xl mx-auto py-20 px-6">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div class="flex items-center gap-4">
          <button onclick={onViewAll} class="btn btn-ghost btn-circle cursor-pointer" aria-label="Back">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h1 class="text-4xl font-black flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Guestbook
            </h1>
            <p class="text-base-content/50 mt-1 font-mono uppercase tracking-widest text-xs">
              {entries.length} signatures in database
            </p>
          </div>
        </div>

        <div class="relative group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <input
            type="text"
            placeholder="Search signatures..."
            bind:value={search}
            class="input input-bordered pl-12 w-full md:w-72 bg-base-200 border-base-300 focus:border-primary rounded-xl"
          />
        </div>
      </div>

      <div class="overflow-x-auto bg-base-200/50 backdrop-blur-md rounded-2xl border border-base-300 shadow-2xl">
        <table class="table table-lg w-full text-base-content">
          <thead>
            <tr class="border-b border-base-300 text-base-content/50 uppercase tracking-wider text-xs">
              <th class="bg-transparent font-bold">#</th>
              <th class="bg-transparent font-bold">User</th>
              <th class="bg-transparent font-bold">Message</th>
              <th class="bg-transparent font-bold">Date</th>
            </tr>
          </thead>
          <tbody>
            {#each filtered as entry, i (entry.id)}
              <tr
                in:fly={{ x: -10, duration: 300, delay: i * 50 }}
                class="border-b border-base-300/50 hover:bg-base-200 transition-colors group cursor-default"
              >
                <th class="text-base-content/40 font-mono text-xs font-medium">{entry.id}</th>
                <td class="font-bold">
                  <span class="text-info font-mono">{entry.name}</span>
                </td>
                <td class="text-base-content/80 max-w-md break-words">
                  {entry.description}
                </td>
                <td class="text-base-content/40 text-xs font-mono">
                  {formatDate(entry.created_at)}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>

        {#if filtered.length === 0}
          <div class="py-20 text-center">
            <p class="text-base-content/50 italic font-medium">No signatures matching "{search}"</p>
          </div>
        {/if}
      </div>
    </div>
  {:else}
    <div class="w-full z-10 mt-12 px-2">
      <div class="flex items-center gap-2 mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <h2 class="text-2xl font-bold">Guestbook</h2>
        <span class="badge badge-outline text-base-content/40 font-medium">{entries.length} signs</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each entries.slice(0, 6) as entry, i (entry.id)}
          <div
            in:fly={{ y: 30, duration: 500, delay: i * 50 }}
            class="group card bg-base-200 backdrop-blur-sm border {borderColors[i % borderColors.length]} p-5 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:scale-[1.02]"
          >
            <div class="flex justify-between items-start mb-3">
              <span class="text-info font-mono text-sm font-bold">{entry.name}</span>
            </div>
            <p class="text-base-content/80 text-sm leading-relaxed line-clamp-3 font-medium">{entry.description}</p>
          </div>
        {/each}
      </div>

      <div class="mt-12 flex flex-col items-center gap-4">
        <button
          onclick={onViewAll}
          class="btn btn-outline btn-md rounded-xl px-12 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          View All {entries.length} Signatures
        </button>
        <p class="text-sm text-base-content/40 font-mono font-medium">
          <span class="text-accent">ssh</span> in to leave your mark
        </p>
      </div>
    </div>
  {/if}
{:catch error}
  {#if isFullPage}
    <div class="w-full max-w-6xl mx-auto py-20 px-6 text-center">
      <div class="p-12 bg-base-200/50 backdrop-blur-md rounded-2xl border border-base-300 shadow-2xl">
        <p class="text-error font-bold text-lg">Failed to load guestbook</p>
        <p class="text-base-content/50 mt-2 text-sm">{error.message}</p>
      </div>
    </div>
  {:else}
    <div class="w-full z-10 mt-12 px-2 text-center">
      <p class="text-error font-bold">Failed to load guestbook</p>
    </div>
  {/if}
{/await}

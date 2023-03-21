<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { ADDON_URL } from '$lib/addon/addon';
  import { logout } from '$lib/auth/auth';
  import { ChevronLeft } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { fly } from 'svelte/transition';

  let showModal = false;

  export let username: string | undefined;

  let backTo = false;

  afterNavigate((url) => {
    backTo = window.location.pathname !== '/';
  });
</script>

<div
  class="w-full z-50 fixed backdrop-blur-lg flex justify-between items-center p-4"
>
  <div class="flex space-x-8 items-center">
    <a href="/" class="flex items-center space-x-2 select-none">
      <img src="/favicon.svg" alt="cubr.io" class="w-10" />
      <h3 class="text-2xl">cubr.io</h3>
    </a>
    {#if backTo}
      <a
        href="/"
        class="flex items-center space-x-2 select-none opacity-50 hover:opacity-75"
      >
        <Icon src={ChevronLeft} size="16" />
        <span>Renders</span>
      </a>
    {/if}
  </div>
  {#if username}
    <div class="flex space-x-3 items-center">
      <button
        class="w-8 h-8 rounded-full overflow-hidden"
        style="background: url('https://ui-avatars.com/api/?background=random&name={username}'); background-size: cover;"
        on:click={() => (showModal = true)}
      />
    </div>
  {/if}
</div>

<svelte:window
  on:keydown={(e) => {
    if (e.key === 'Escape' && showModal) {
      e.preventDefault();
      showModal = false;
    }
  }}
/>

<div
  class="z-50 w-full h-full fixed inset-0 {showModal
    ? 'pointer-events-auto'
    : 'pointer-events-none'}"
  on:click={() => (showModal = false)}
/>
{#if showModal}
  <div
    class="z-[51] fixed flex flex-col top-16 right-4 w-64 backdrop-blur-lg rounded-lg overflow-hidden border border-std"
    in:fly={{ y: 10, duration: 100 }}
    on:click={() => (showModal = false)}
  >
    <div class="flex flex-col text-center bg-black bg-opacity-20 p-2">
      <a href="/support" class="btn-menu"> Support </a>
      <a href="/billing" class="btn-menu"> Billing </a>
      <a href={ADDON_URL} class="btn-menu">
        <span> Download Addon </span>
      </a>
      <button class="btn-menu" on:click={logout}> Sign Out </button>
    </div>
  </div>
{/if}

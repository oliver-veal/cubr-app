<script>
  import Header from '$lib/header/Header.svelte';
  import { page } from '$app/stores';
  import '../app.css';
</script>

<svelte:head>
  <title>{$page.status} - Cubr</title>
</svelte:head>

<Header username={''} />

<div class="w-full min-h-screen p-8 flex flex-col justify-center items-center">
  <h1>{$page.status}</h1>
  <h2>{$page.error?.message}</h2>
</div>

<script lang="ts">
  import '../../app.css';
</script>

<svelte:head>
  <title>Cubr</title>
</svelte:head>

<div
  class="fixed top-0 left-0 right-0 w-full p-4 flex items-center justify-between backdrop-blur-lg z-40"
>
  <a href="/signin" class="flex items-center space-x-2 select-none">
    <img src="/favicon.svg" alt="Cubr" class="w-10" />
    <h3 class="text-2xl">cubr.io</h3>
  </a>
</div>

<div
  class="absolute top-0 left-0 right-0 h-[750px] w-full overflow-hidden -z-50 pointer-events-none"
>
  <div
    class="absolute top-0 left-1/2 my-0 mx-auto w-[1000px] h-[500px] -z-10 blur-[150px] -translate-y-[250px] -translate-x-[50%] fade-in"
    style="background: url('/render.png') center center; background-size: cover;"
  />
</div>

<div
  class="w-full min-h-screen flex flex-col items-center justify-center py-16"
>
  <slot />
</div>

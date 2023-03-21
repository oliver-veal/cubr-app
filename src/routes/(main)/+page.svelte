<script lang="ts">
  import Container from '$lib/layout/Container.svelte';
  import Onboarding from './Onboarding.svelte';
  import RenderList from './RenderList.svelte';

  export let data: import('./$types').PageData;

  $: show_onboarding = !(data.onboarding.card && data.onboarding.addon);
</script>

{#if show_onboarding}
  <Onboarding data={data.onboarding} />
{/if}

<Container>
  <RenderList {data} />
</Container>

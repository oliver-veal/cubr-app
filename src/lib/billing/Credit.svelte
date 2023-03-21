<script lang="ts">
  import type { Invoice } from '$lib/api/client';
  import { currencyFormatter as cf } from '$lib/render/formatter';
  import { Loader } from '@steeze-ui/feather-icons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { load_credit, load_invoices } from '$lib/load/load';
  import { onDestroy, onMount } from 'svelte';

  let loading = true;

  let upcoming: Invoice;
  let balance: number;

  let interval: NodeJS.Timer;

  const load = async () => {
    const invoices = await load_invoices();
    const b = await load_credit();

    if (invoices) {
      upcoming = invoices.Upcoming;
    }

    balance = b;
    loading = false;
  };

  onMount(async () => {
    await load();
    interval = setInterval(load, 1000 * 15);
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  const applied_credit = (i: Invoice | undefined) => {
    return (i?.AmountDue || 0) / 100 - (i?.Total || 0) / 100;
  };

  $: credit = Math.abs(balance) / 100 + applied_credit(upcoming);
</script>

{#if loading}
  <Icon src={Loader} theme="solid" class="w-6 animate-spin" />
{:else}
  {cf(credit)}
{/if}

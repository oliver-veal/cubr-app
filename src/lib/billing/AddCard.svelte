<script lang="ts">
  import { openCheckoutSession } from '$lib/billing/billing';
  import { CreditCard } from '@steeze-ui/heroicons';
  import { Loader } from '@steeze-ui/feather-icons';
  import { Icon } from '@steeze-ui/svelte-icon';

  let disabled = false;
</script>

<button
  {disabled}
  class="w-full sm:w-[180px] relative btn space-x-2"
  on:click={async () => {
    disabled = true;
    await openCheckoutSession();
    disabled = false;
  }}
>
  {#if disabled}
    <Icon src={Loader} theme="solid" class="w-6 animate-spin" />
  {:else}
    <Icon src={CreditCard} theme="solid" class="w-6" />
  {/if}
  <span> Add Card </span>
</button>

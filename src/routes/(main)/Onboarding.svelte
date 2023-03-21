<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { ADDON_URL } from '$lib/addon/addon';
  import { supabase } from '$lib/api/supabase';
  import AddCard from '$lib/billing/AddCard.svelte';
  import type { Database } from '$lib/database.types';
  import {
    ArrowTopRightOnSquare,
    CheckCircle,
    ChevronDown,
    DocumentArrowDown,
  } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import type { Onboarding } from './+page';

  export let data: Onboarding;

  const channel = supabase.channel('onboarding:*');
  channel
    .on<Database['public']['Tables']['onboarding']['Row']>(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'onboarding',
      },
      (payload) => {
        const { new: record, eventType } = payload;
        if (eventType === 'UPDATE') {
          if (data.user_id === record.user_id) {
            data = record;
          }
        }
      }
    )
    .subscribe();

  let show_instructions = false;
</script>

<section class="w-full flex flex-col items-center bg-[#0B0B0B] py-16 px-4">
  <div class="w-full max-w-5xl flex flex-col items-center space-y-8">
    <h1>Welcome to Cubr 👋</h1>

    <p class="text-center">
      Getting set up is easy and takes 2 minutes.
      <br />
      Complete the two steps below to get started with your first render.
    </p>

    <div
      class="{!data.addon &&
        'bg-white bg-opacity-5'} card max-w-2xl flex-col space-y-4"
    >
      <div
        class="flex flex-col space-y-4 sm:space-x-10 sm:space-y-0 sm:flex-row"
      >
        <div class="w-full flex flex-col space-y-2">
          <div class="w-full flex items-center justify-between">
            <h3>Install Addon</h3>
            {#if data.addon}
              <Icon src={CheckCircle} theme="mini" class="w-7 text-primary" />
            {/if}
          </div>
          {#if !data.addon}
            <p class="text-white text-opacity-75">
              The Cubr Addon makes it easy to render your blend files in the
              cloud.
            </p>

            <button
              class="flex space-x-2 text-primary"
              on:click={() => (show_instructions = !show_instructions)}
            >
              {show_instructions ? 'Hide' : 'Show'} Instructions
            </button>
          {/if}
        </div>

        {#if !data.addon}
          <div class="flex items-center justify-center">
            <a href={ADDON_URL} class="w-full sm:w-[180px] btn space-x-2">
              <Icon src={DocumentArrowDown} theme="solid" class="w-6" />
              <span>Download</span>
            </a>
          </div>
        {/if}
      </div>
    </div>

    {#if show_instructions && !data.addon}
      <div
        class="rounded-lg overflow-hidden w-full flex items-center justify-center"
      >
        <!-- svelte-ignore a11y-media-has-caption -->
        <video
          src="/install.mp4"
          class="w-full h-full"
          autoplay
          loop
          controls
          muted
        />
      </div>
    {/if}

    <div
      class="{!data.card &&
        'bg-white bg-opacity-5'} card max-w-2xl flex-col space-y-4"
    >
      <div
        class="flex flex-col space-y-4 sm:space-x-10 sm:space-y-0 sm:flex-row justify-between"
      >
        <div class="w-full flex flex-col space-y-2">
          <div class="w-full flex items-center justify-between">
            <h3>Add a Card</h3>
            {#if data.card}
              <Icon src={CheckCircle} theme="mini" class="w-7 text-primary" />
            {/if}
          </div>
          {#if !data.card}
            <p class="text-white text-opacity-75">
              It's free to get started and you will not be charged until you
              have used your free credit. Keep track of your usage on the
              billing page.
            </p>

            <a
              href="https://cubr.io/pricing#faqs"
              target="_blank"
              class="primary flex space-x-2"
            >
              <span> See our FAQs for more information </span>
              <Icon src={ArrowTopRightOnSquare} theme="solid" class="w-4" />
            </a>
          {/if}
        </div>

        {#if !data.card}
          <div class="flex items-center justify-center">
            <AddCard />
          </div>
        {/if}
      </div>
    </div>

    {#if data.card && data.addon}
      <button on:click={() => invalidateAll()} class="btn btn-primary">
        Complete
      </button>
    {/if}
  </div>
</section>

<script lang="ts">
  import { supabase } from '$lib/api/supabase.js';
  import Credit from '$lib/billing/Credit.svelte';
  import type { Database } from '$lib/database.types';
  import {
    currencyFormatter,
    shortDateFormatter,
  } from '$lib/render/formatter.js';
  import ProgressBar from '$lib/render/ProgressBar.svelte';
  import StatusBadge from '$lib/render/StatusBadge.svelte';
  import type { Render } from '$lib/render/types.js';
  import { displayResolution, timeElapsed } from '$lib/render/util.js';
  import { Camera, Clock, Image } from '@steeze-ui/feather-icons';
  import { Film } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import { onMount } from 'svelte';

  export let data: import('./$types').PageData;
  let renders: Render[] = data.renders;

  const channel = supabase.channel('renders:*');
  channel
    .on<Database['public']['Tables']['renders']['Row']>(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'renders',
      },
      (payload) => {
        const { new: record, eventType } = payload;
        if (eventType === 'INSERT') {
          renders = [record, ...renders];
        } else if (eventType === 'UPDATE') {
          renders = renders.map((render) => {
            if (render.id === record.id) {
              return record;
            }
            return render;
          });
        }
      }
    )
    .subscribe();

  let interval: NodeJS.Timer;
  let elapsed: Record<string, string> = {};
  for (const render of renders) {
    elapsed[render.id] = timeElapsed(render.start_time, render.end_time);
  }

  onMount(() => {
    interval = setInterval(() => {
      for (const render of renders) {
        elapsed[render.id] = timeElapsed(render.start_time, render.end_time);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });
</script>

<section class="relative w-full flex flex-col justify-center">
  <div class="flex pb-2 px-4 border-b border-std items-center justify-between">
    <h2>Renders</h2>
    <div class="flex flex-col justify-end">
      <p class="text-white text-opacity-75">Credit Remaining</p>
      <h3 class="h-8 text-end flex justify-end">
        <Credit />
      </h3>
    </div>
  </div>
  <div class="w-full flex flex-col overflow-hidden">
    {#if renders.length === 0}
      <div class="w-full p-8 text-center text-white text-opacity-75">
        <p>Cloud Renders you start from Blender will show up here.</p>
        <a
          href="https://www.youtube.com/watch?v=nDVIjEorsaA"
          target="_blank"
          class="primary">Help me get started</a
        >
      </div>
    {/if}
    {#each renders as r}
      <a
        href="/render/{r.id}"
        class="w-full flex flex-col justify-center space-y-2 py-4 px-4 border-b border-std group"
      >
        <div class="w-full flex space-x-2 items-center justify-between">
          <div class="w-full flex space-x-2 items-center min-w-0">
            <h3
              class="whitespace-nowrap overflow-hidden text-ellipsis flex-shrink"
            >
              {r.file_name}
            </h3>
            <span class="badge-grey">v{r.file_version}</span>
          </div>
          <StatusBadge status={r.status} />
        </div>
        {#if r.status === 'running'}
          <ProgressBar progress={r.progress || 0} />
        {/if}
        <div class="flex w-full justify-between space-x-2">
          <div class="flex space-x-2 sm:space-x-4">
            <div class="flex space-x-1 items-center">
              {#if r.animation}
                <Icon src={Film} class="w-4 h-4 opacity-50" />
                <small>{r.frame_start}-{r.frame_end}</small>
              {:else}
                <Icon src={Image} class="w-4 h-4 opacity-50" />
                <small>{r.frame_start}</small>
              {/if}
            </div>

            <div class="flex space-x-1 items-center">
              <Icon src={Camera} class="w-4 h-4 opacity-50" />
              <small>{displayResolution(r.settings)}</small>
            </div>

            <div class="flex space-x-1 items-center">
              <Icon src={Clock} class="w-4 h-4 opacity-50" />
              <small>{shortDateFormatter(new Date(r.requested_time))}</small>
            </div>
          </div>
          <div class="flex space-x-2">
            <div class="px-2 rounded-lg badge">
              <p>
                {elapsed[r.id] || '0s'}
              </p>
            </div>
            <div class="px-2 rounded-lg badge">
              <p>
                {currencyFormatter(r.cost_billed || 0)}
              </p>
            </div>
          </div>
        </div>
      </a>
    {/each}
  </div>
</section>

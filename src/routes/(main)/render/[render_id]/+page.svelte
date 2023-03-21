<script lang="ts">
  import { PUBLIC_FRAMES_URL } from '$env/static/public';
  import { supabase } from '$lib/api/supabase';
  import type { Database } from '$lib/database.types';
  import { currencyFormatter } from '$lib/render/formatter';
  import ProgressBar from '$lib/render/ProgressBar.svelte';
  import StatusBadge from '$lib/render/StatusBadge.svelte';
  import { isDone, timeElapsed } from '$lib/render/util';
  import { Loader } from '@steeze-ui/feather-icons';
  import { CloudArrowDown } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import download from 'downloadjs';
  import { onMount } from 'svelte';
  import type { Frame } from '$lib/render/types';
  import Sidebar from './Sidebar.svelte';

  export let data: import('./$types').PageData;

  let render = data.render!;
  let frames = data.frames!;

  onMount(() => {
    const render_chan = supabase
      .channel('render:' + render.id)
      .on<Database['public']['Tables']['renders']['Row']>(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'renders',
          filter: `id=eq.${render.id}`,
        },
        (payload) => {
          const { new: record, eventType } = payload;
          if (eventType === 'UPDATE') {
            render = record;
          }
        }
      )
      .subscribe();

    const frame_chan = supabase
      .channel('frames:' + render.id)
      .on<Database['public']['Tables']['frames']['Row']>(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'frames',
          filter: `render_id=eq.${render.id}`,
        },
        (payload) => {
          const { new: record, eventType } = payload;
          if (eventType !== 'UPDATE') return;
          frames = frames.map((frame) => {
            if (frame.frame === record.frame) {
              return record as unknown as Frame;
            }
            return frame;
          });
        }
      )
      .subscribe();

    return () => {
      render_chan.unsubscribe();
      frame_chan.unsubscribe();
    };
  });

  $: framesPending = frames.filter((f) => f.status === 'pending').length;
  $: framesRendering = frames.filter((f) => f.status === 'running').length;
  $: framesComplete = frames.filter((f) => f.status === 'complete').length;
  $: framesFailed = frames.filter((f) => f.status === 'failed');

  let interval: NodeJS.Timer;
  let elapsed = timeElapsed(render.start_time, render.end_time);

  onMount(() => {
    interval = setInterval(() => {
      elapsed = timeElapsed(render.start_time, render.end_time);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  const downloadFrame = async (frame: number) => {
    const url =
      PUBLIC_FRAMES_URL + `/frame/${render.file_id}/${render.id}/${frame}`;

    let res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${data.session?.access_token}`,
      },
    });

    if (res.status !== 200) {
      console.error('Failed to download frame: ' + res.status);
      return;
    }

    let blob = await res.blob();
    download(blob, `${frame}.png`, 'image/png');
  };
</script>

<div
  class="w-full min-h-screen flex justify-center space-x-4 lg:space-x-8 px-4"
>
  <div class="w-full max-w-4xl flex flex-col space-y-8">
    <section class="w-full flex flex-col justify-center space-y-8">
      <div class="w-full flex space-x-2 items-center justify-between min-w-0">
        <h1 class="whitespace-nowrap overflow-hidden text-ellipsis flex-shrink">
          {render.file_name}
        </h1>
        <StatusBadge status={render.status} />
      </div>
      {#if render.status === 'running'}
        <ProgressBar progress={render.progress || 0} />
      {/if}
      <div class="grid grid-cols-2 gap-4">
        <div class="flex justify-center badge rounded-2xl">
          <div class="flex flex-col justify-center p-4">
            <h3 class="leading-4">{elapsed}</h3>
            <span class="text-sm">Elapsed</span>
          </div>
        </div>

        <div class="flex justify-center badge rounded-2xl">
          <div class="flex flex-col justify-center p-4">
            <h3 class="leading-4">
              {currencyFormatter(render.cost_billed || 0)}
            </h3>
            <span class="text-sm">Billed</span>
          </div>
        </div>
      </div>
    </section>

    <div class="w-full flex lg:hidden">
      <Sidebar {frames} {render} />
    </div>

    <section class="w-full flex flex-col justify-center space-y-4 pb-16">
      <h2>Frames</h2>

      <hr class="w-full border-std" />

      {#if framesFailed.length > 0}
        <div
          class="w-full flex justify-between items-center rounded-2xl bg-white bg-opacity-10 text-red p-4"
        >
          <span class="text-sm">FAILED</span>
          <h3 class="text-2xl">{framesFailed.length}</h3>
        </div>

        <div class="w-full flex flex-wrap gap-4">
          {#each framesFailed as frame}
            <div
              class="relative w-[130px] aspect-video bg-red bg-opacity-20 rounded-lg overflow-hidden flex items-center justify-center"
            >
              <h3>{frame.frame}</h3>
            </div>
          {/each}
        </div>
      {/if}

      {#if !isDone(render.status)}
        <div class="flex flex-col sm:flex-row gap-4">
          <div
            class="w-full flex justify-between items-center rounded-2xl badge-grey p-4"
          >
            <span class="text-sm">PENDING</span>
            <h3 class="text-2xl">{framesPending}</h3>
          </div>
          <div
            class="w-full flex justify-between items-center rounded-2xl badge-primary p-4"
          >
            <span class="text-sm">RENDERING</span>
            <h3 class="text-2xl">{framesRendering}</h3>
          </div>
          <div
            class="w-full flex justify-between items-center rounded-2xl badge-green p-4"
          >
            <span class="text-sm">DONE</span>
            <h3 class="text-2xl">{framesComplete}</h3>
          </div>
        </div>
      {/if}

      <div class="w-full flex flex-wrap gap-4">
        {#each frames as frame}
          {#if frame.status !== 'failed'}
            {#if frame.status === 'complete'}
              <button
                class="group relative w-[130px] aspect-video bg-green bg-opacity-20 rounded-lg overflow-hidden flex items-center justify-center bg-cover bg-center bg-no-repeat"
                on:click={async () => {
                  frame.downloading = true;
                  try {
                    await downloadFrame(frame.frame);
                  } catch (e) {
                    console.error(e);
                  }
                  frame.downloading = false;
                }}
                disabled={frame.downloading}
                style="background-image: url({`${PUBLIC_FRAMES_URL}/thumbnail/${render.file_id}/${render.id}/${frame.frame}`});"
              >
                <div
                  class="hidden group-hover:block absolute inset-0 bg-black bg-opacity-20 text-white"
                >
                  <div
                    class="absolute top-0 right-0 flex items-start justify-end p-2"
                  >
                    {#if frame.downloading}
                      <Icon
                        src={Loader}
                        theme="solid"
                        class="w-6 animate-spin"
                      />
                    {:else}
                      <Icon src={CloudArrowDown} theme="solid" class="w-6" />
                    {/if}
                  </div>
                  <div
                    class="absolute inset-0 flex justify-center items-center"
                  >
                    <h3>{frame.frame}</h3>
                  </div>
                </div>
              </button>
            {:else}
              <div
                class="group relative w-[130px] h-[73px] rounded-lg bg-opacity-10 overflow-hidden flex items-center justify-center"
                class:bg-white={frame.status === 'pending' ||
                  frame.status === 'canceled'}
                class:bg-primary={frame.status === 'running'}
                class:bg-red={frame.status === 'failed'}
              >
                {#if frame.status === 'running'}
                  <div
                    class="absolute inset-0 bg-primary bg-opacity-50 rounded-lg transition-all"
                    style="width: {frame.progress}%;"
                  />
                {/if}
                <div
                  class="hidden group-hover:flex absolute inset-0 justify-center items-center "
                  class:text-red={frame.status === 'failed'}
                  class:text-primary={frame.status === 'running'}
                >
                  <h3>{frame.frame}</h3>
                </div>
              </div>
            {/if}
          {/if}
        {/each}
      </div>
    </section>
  </div>

  <div class="w-full max-w-[333px] hidden lg:flex">
    <Sidebar {frames} {render} />
  </div>
</div>

<script lang="ts">
  import CancelRender from '$lib/render/CancelRender.svelte';
  import DownloadZip from '$lib/render/DownloadZip.svelte';
  import type { Frame, Render, RenderSettings } from '$lib/render/types.js';
  import { displayResolution, isDone } from '$lib/render/util.js';

  export let render: Render;
  export let frames: Frame[];

  $: framesComplete = frames.filter((f) => f.status === 'complete').length;

  let settings = render.settings as unknown as RenderSettings;
</script>

<div class="w-full flex flex-col sm:flex-row lg:flex-col gap-8 lg:space-y-8">
  {#if !isDone(render.status) || framesComplete > 0}
    <div class="w-full flex flex-col space-y-4 rounded-lg ">
      <h2>Quick Actions</h2>
      <hr class="w-full border-std" />
      <div class="flex flex-col w-full space-y-4">
        {#if isDone(render.status)}
          {#if framesComplete > 0}
            <DownloadZip
              render_id={render.id}
              file_id={render.file_id}
              {frames}
            />
          {/if}
        {:else}
          <CancelRender render_id={render.id} />
        {/if}
      </div>
    </div>
  {/if}
  <div class="w-full flex flex-col space-y-4 rounded-lg">
    <h2>Render Settings</h2>
    <hr class="w-full border-std" />

    <div class="w-full grid grid-cols-2 gap-4">
      <div class="flex flex-col">
        <small>File Version</small>
        <div class="flex">
          <small class="badge-grey">v{render.file_version}</small>
        </div>
      </div>
      <div class="flex flex-col">
        <small>Type</small>
        <h3>{render.animation ? 'Animation' : 'Still'}</h3>
      </div>
      <div class="flex flex-col">
        <small>Boost</small>
        <h3 class="capitalize">{render.slices}x</h3>
      </div>
      <div class="flex flex-col">
        <small>Engine</small>
        <h3 class="capitalize">{settings.engine?.toLowerCase()}</h3>
      </div>
      {#if render.settings}
        {#if render.animation}
          <div class="flex flex-col">
            <small>Frame Range</small>
            <h3>
              {settings.frame_start} - {settings.frame_end}
            </h3>
          </div>
        {:else}
          <div class="flex flex-col">
            <small>Frame</small>
            <h3>{settings.frame_current}</h3>
          </div>
        {/if}

        <div class="flex flex-col">
          <small>Resolution</small>
          <h3>
            {displayResolution(settings)}
          </h3>
        </div>
        <div class="flex flex-col">
          <small>Samples</small>
          <h3>{settings.samples}</h3>
        </div>
      {/if}
    </div>
  </div>
</div>

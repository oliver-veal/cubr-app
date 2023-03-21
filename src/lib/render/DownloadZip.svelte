<script lang="ts">
  import { PUBLIC_FRAMES_URL } from '$env/static/public';
  import { Loader } from '@steeze-ui/feather-icons';
  import { CloudArrowDown } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import download from 'downloadjs';
  import JSZip from 'jszip';
  import type { Frame } from './types.js';

  export let render_id: String;
  export let file_id: String;
  export let frames: Frame[];

  $: completed_frames = frames.filter((f) => f.status === 'complete');

  let disabled = false;
  let frames_downloaded = 0;

  const downloadZip = async () => {
    disabled = true;
    frames_downloaded = 0;

    try {
      const zip = new JSZip();
      const folder = zip.folder('frames');

      const promises = frames.map(async (frame) => {
        if (frame.status === 'complete') {
          let res = await fetch(
            `${PUBLIC_FRAMES_URL}/frame/${file_id}/${render_id}/${frame.frame}`,
            {
              credentials: 'include',
            }
          );
          if (res.ok) {
            let blob = await res.blob();
            folder?.file(`${frame.frame}.png`, blob);
            frames_downloaded++;
          }
        }
      });

      await Promise.all(promises);

      let content = await zip.generateAsync({ type: 'blob' });
      download(content, 'frames.zip', 'application/zip');
    } catch (e) {
      console.error(e);
    }

    disabled = false;
  };
</script>

<button {disabled} class="relative btn space-x-4" on:click={downloadZip}>
  {#if disabled}
    <Icon src={Loader} theme="solid" class="w-6 animate-spin" />
    <span>
      Downloaded {frames_downloaded}/{completed_frames.length} Frames</span
    >
  {:else}
    <Icon src={CloudArrowDown} theme="solid" class="w-6" />
    <span> Download All Frames</span>
  {/if}
</button>

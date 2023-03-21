<script lang="ts">
  import { PUBLIC_RENDER_URL } from '$env/static/public';
  import { cubr } from '$lib/api/cubr';

  export let render_id: string;

  const cancelRender = async () => {
    try {
      let res = await fetch(PUBLIC_RENDER_URL + `/render/${render_id}/cancel`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${cubr.client.request.config.TOKEN}`,
        },
      });
      let json = await res.json();

      if (res.status !== 200) {
        console.log('Failed to cancel render: ' + json);
      }

      if (json['error']) {
        console.log('Failed to cancel render: ' + json['message']);
      }

      console.log('Cancelled render');
    } catch (e) {
      console.error(e);
    }
  };
</script>

<button class="btn btn-red" on:click={cancelRender}> Cancel Render </button>

<script lang="ts">
  import type { ApiError } from '$lib/api/client';
  import { cubr } from '$lib/api/cubr';

  export let data: import('./$types').PageData;

  let success = data.user_id !== '';
  let denied = data.denied;

  const allow = async () => {
    if (data.session === null) return;

    const { access_token, refresh_token } = data.session;

    try {
      await cubr.client.addon.addonConfirmAuth(data.token, {
        access_token,
        refresh_token: refresh_token || '',
      });
      success = true;
    } catch (e) {
      console.log((e as ApiError).message);
    }
  };

  const deny = async () => {
    try {
      await cubr.client.addon.addonDenyAuth(data.token);
      denied = true;
    } catch (e) {
      console.log((e as ApiError).message);
    }
  };
</script>

<div class="w-full h-full flex flex-col items-center justify-center pt-8">
  <div class="w-full max-w-lg flex flex-col space-y-8 p-8">
    {#if success}
      <h2 class="w-full text-center">Successfully logged in.</h2>
      <p class="w-full text-center">You may now close this window.</p>
    {:else if denied}
      <h2 class="w-full text-center">Sign in denied.</h2>
      <p class="w-full text-center">You may now close this window.</p>
    {:else}
      <h2>Allow Cubr Blender Addon to access your account?</h2>
      <p>
        Verify that the pairing code below matches the one shown in the Blender
        Addon.
      </p>
      <div
        class="w-full flex justify-center bg-white bg-opacity-20 py-2 rounded-lg"
      >
        <p>{data.code}</p>
      </div>
      <div class="w-full flex justify-center space-x-4">
        <button class="btn" on:click={deny}>Deny access</button>
        <button class="btn btn-primary" on:click={allow}>Allow access</button>
      </div>
    {/if}
  </div>
</div>

<script lang="ts">
  import { supabase } from '$lib/api/supabase';
  import Header from '$lib/header/Header.svelte';
  import { intercom } from '$lib/intercom.js';
  import { onMount } from 'svelte';
  import '../../app.css';
  import type { LayoutData } from './$types';
  import { setFramesCookie } from './+layout';

  export let data: LayoutData;

  $: user = data?.session?.user;

  intercom.load();
  intercom.boot(data?.session.user);

  onMount(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!session) {
        return;
      }
      data.session = session;
      await setFramesCookie(session?.access_token!, fetch);
    });

    return () => {
      subscription.unsubscribe();
      intercom.shutdown();
    };
  });
</script>

<svelte:head>
  <title>Cubr</title>
</svelte:head>

<Header username={user?.user_metadata?.full_name || user?.email} />

<div
  class="w-full min-h-screen flex flex-col items-center pt-[72px] pb-8 space-y-16"
>
  <slot />
</div>

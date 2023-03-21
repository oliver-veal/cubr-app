<script lang="ts">
  import { goto } from '$app/navigation';
  import Google from '$lib/logo/Google.svelte';
  import { supabase } from '$lib/api/supabase';
  import type { AuthError } from '@supabase/supabase-js';
  import { page } from '$app/stores';

  let form: HTMLFormElement;

  let formError: AuthError | null = null;

  const handleSubmit = async (event: any) => {
    // @ts-ignore
    const data = new FormData(form);

    const email = data.get('email') as string;
    const password = data.get('password') as string;

    const {
      error,
      data: { user },
    } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      formError = error;
    }

    if (user) {
      const return_url = $page.url.searchParams.get('return_url');
      if (return_url) goto(return_url);
      else goto('/');
    }
  };
</script>

<div class="fixed top-4 right-4 z-50">
  <a href="/signup" class="btn">Sign up</a>
</div>

<div class="w-full flex flex-col items-center justify-center p-4">
  <div class="w-full flex flex-col max-w-md space-y-20">
    <h1 class="text-[2.5rem]">Sign in</h1>

    <div class="w-full flex flex-col space-y-8">
      <Google />

      <div class="flex space-x-2 items-center">
        <hr class="border-b border-std flex-grow" />
        <b>or</b>
        <hr class="border-b border-std flex-grow" />
      </div>

      <form
        method="post"
        class="flex flex-col space-y-8"
        on:submit|preventDefault={handleSubmit}
        bind:this={form}
      >
        <div class="flex flex-col space-y-2">
          <label for="email" class="font-bold">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>

        <div class="flex flex-col space-y-2">
          <label for="password" class="font-bold">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <a href="/recover" class="primary">I forgot my password</a>

        {#if formError?.message}
          <p class="text-red"><b>Error</b> {formError?.message}</p>
        {/if}

        <button type="submit" class="btn btn-primary">Sign in</button>
      </form>
    </div>

    <p class="w-full text-center">
      Don't have an account? <a href="/signup" class="primary">Sign Up</a>
    </p>
  </div>
</div>

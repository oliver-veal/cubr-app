<script lang="ts">
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/api/supabase';
  import type { AuthError } from '@supabase/supabase-js';

  let form: HTMLFormElement;

  let formError: AuthError | null = null;

  const handleSubmit = async (event: any) => {
    // @ts-ignore
    const data = new FormData(form);

    const password = data.get('password') as string;

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      formError = error;
    } else {
      goto('/recover/password/success');
    }
  };

  // get email from user_email cookie
  const email =
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('user_email='))
      ?.split('=')[1] || '';
</script>

<div class="w-full flex flex-col items-center justify-center space-y-20 p-4">
  <h1 class="text-[2.5rem]">Password recovery</h1>

  <div class="w-full flex flex-col max-w-md space-y-20">
    <div class="w-full flex flex-col space-y-8">
      <form
        method="post"
        class="flex flex-col space-y-8"
        on:submit|preventDefault={handleSubmit}
        bind:this={form}
      >
        <p>Email: <b>{email}</b></p>
        <div class="flex flex-col space-y-2">
          <label for="password" class="font-bold">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="New password"
          />
        </div>

        {#if formError?.message}
          <p class="text-red"><b>Error</b> {formError?.message}</p>
        {/if}

        <button type="submit" class="btn btn-primary">Continue</button>
      </form>
    </div>
  </div>
</div>

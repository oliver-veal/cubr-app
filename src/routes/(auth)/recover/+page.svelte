<script lang="ts">
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/api/supabase';
  import type { AuthError } from '@supabase/supabase-js';

  let form: HTMLFormElement;

  let formError: AuthError | null = null;

  const handleSubmit = async (event: any) => {
    // @ts-ignore
    const data = new FormData(form);

    const email = data.get('email') as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/recover/password',
    });

    if (error) {
      formError = error;
    } else {
      document.cookie = `user_email=${email}; path=/; max-age=86400`;
      goto('/recover/success');
    }
  };
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
        <div class="flex flex-col space-y-2">
          <label for="email" class="font-bold">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>

        {#if formError?.message}
          <p class="text-red"><b>Error</b> {formError?.message}</p>
        {/if}

        <button type="submit" class="btn btn-primary">Continue</button>
      </form>
    </div>

    <p class="w-full text-center">
      <a href="/signin" class="primary">Back to Sign In</a>
    </p>
  </div>
</div>

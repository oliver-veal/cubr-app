<script lang="ts">
  import { goto } from '$app/navigation';
  import Google from '$lib/logo/Google.svelte';
  import { supabase } from '$lib/api/supabase';
  import type { AuthError } from '@supabase/supabase-js';

  let form: HTMLFormElement;

  let formError: AuthError | null = null;

  const handleSubmit = async (event: any) => {
    // @ts-ignore
    const data = new FormData(form);

    const email = data.get('email') as string;
    const password = data.get('password') as string;

    const {
      error,
      data: { user, session },
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      formError = error;
    }

    if (user && !session) {
      goto('/verify-email');
    }
  };
</script>

<div class="fixed top-4 right-4 z-50">
  <a href="/signin" class="btn">Sign in</a>
</div>

<div class="w-full flex flex-col items-center justify-center space-y-20 p-4">
  <div class="w-full flex flex-col max-w-md space-y-20">
    <h1 class="text-[2.5rem]">Sign up for free today</h1>

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

        {#if formError?.message}
          <p class="text-red"><b>Error</b> {formError?.message}</p>
        {/if}

        <!-- <div class="flex flex-col space-y-2">
            <div class="flex items-center space-x-2">
              <input type="checkbox" name="terms" id="terms" class="w-4 h-4" />
              <label for="terms">
                I agree to Cubr Terms and Privacy Policy.
              </label>
            </div>

            <div class="flex items-center space-x-2">
              <input type="checkbox" name="news" id="news" class="w-4 h-4" />
              <label for="news">
                I agree to receieve Cubr news and updates.
              </label>
            </div>
          </div> -->

        <button type="submit" class="btn btn-primary">Sign up</button>
      </form>
    </div>

    <p class="w-full text-center">
      Already have an account? <a href="/signin" class="primary">Sign In</a>
    </p>
  </div>
</div>

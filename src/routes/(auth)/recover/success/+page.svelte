<script>
  const email =
    document.cookie
      .split('; ')
      .find((row) => row.startsWith('user_email='))
      ?.split('=')[1] || '';
</script>

<div
  class="w-full flex flex-col flex-grow items-center justify-center space-y-20 p-4"
>
  <h1 class="text-[2.5rem]">Reset your password</h1>
  <p>
    If an account exists for <b>{email}</b> we'll send instructions for resetting
    your password.
  </p>
  <a class="btn btn-primary" href="/signin">Back to Sign In</a>
</div>

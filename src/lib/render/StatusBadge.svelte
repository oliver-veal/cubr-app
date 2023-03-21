<script lang="ts" context="module">
  export type Status =
    | 'pending'
    | 'running'
    | 'complete'
    | 'failed'
    | 'canceled';
</script>

<script lang="ts">
  export let status: String;
</script>

<span
  class:badge-grey={status === 'pending'}
  class:badge-primary={status === 'running'}
  class:badge-green={status === 'complete'}
  class:badge-red={status === 'failed' || status === 'canceled'}
>
  {status.toUpperCase()}
</span>

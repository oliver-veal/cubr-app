<script>
  export let progress = 0;
</script>

<div class="relative h-[5px] rounded-full bg-white bg-opacity-20">
  <div
    class="absolute top-0 left-0 gradient h-full rounded-full transition-all"
    style="width: {progress}%"
  />
</div>

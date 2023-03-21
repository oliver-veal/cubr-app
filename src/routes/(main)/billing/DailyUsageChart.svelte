<script lang="ts">
  // @ts-ignore
  import Chart from 'svelte-frappe-charts';

  export let values: {
    date: string;
    usage: number;
  }[] = [];

  let chart_data = {
    labels: values.map((d) => d.date),
    datasets: [
      {
        values: values.map((d) => d.usage),
      },
    ],
  };

  let axisOptions = {
    xAxisMode: 'tick',
    xIsSeries: 1,
  };

  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });

  let tooltipOptions = {
    formatTooltipY: (d: number) => formatter.format(d),
  };
</script>

<Chart
  animate={false}
  data={chart_data}
  type="bar"
  barOptions={{ spaceRatio: 0.25 }}
  colors={['#FF469F']}
  {axisOptions}
  {tooltipOptions}
/>

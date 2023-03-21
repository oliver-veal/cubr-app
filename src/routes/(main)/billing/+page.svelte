<script lang="ts">
  import type { Invoice } from '$lib/api/client/index.js';
  import { openBillingPortal } from '$lib/billing/billing.js';
  import Container from '$lib/layout/Container.svelte';
  import {
    currencyFormatter as cf,
    dateFormatter,
  } from '$lib/render/formatter.js';
  import { ArrowTopRightOnSquare } from '@steeze-ui/heroicons';
  import { Icon } from '@steeze-ui/svelte-icon';
  import DailyUsageChart from './DailyUsageChart.svelte';

  export let data: import('./$types').PageData;

  // create an array of dates for the last 30 days
  let last30Days = Array.from({ length: 30 }, (_, i) => {
    let date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().slice(0, 10);
  }).reverse();

  const usage = new Map(data.usage.map((d) => [d.date, d.cost_billed]));

  const values = last30Days.map((date) => {
    const d = new Date(date);
    return {
      date: `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`,
      usage: usage.get(date) || 0,
    };
  });

  const invoice = (i: Invoice | undefined) => {
    if (!i) {
      return {
        description: '-',
        amount_due: 0,
        total: 0,
        applied_credit: 0,
      };
    }

    let amount_due: any = i.AmountDue / 100;
    let total: any = i.Total / 100;
    let applied_credit: any = amount_due - total;

    let date = dateFormatter(new Date(i.Date * 1000));

    return {
      description: `${cf(amount_due)} on ${date}`,
      amount_due,
      total,
      applied_credit,
    };
  };

  let invoices = {
    upcoming: invoice(data?.invoices?.Upcoming),
    last: invoice(data?.invoices?.Last),
  };

  let credit = Math.abs(data.balance) / 100 + invoices.upcoming.applied_credit;
</script>

<Container>
  <section class="w-full flex flex-col justify-center space-y-8 p-4">
    <div class="w-full flex space-x-2 items-center justify-between">
      <h1>Billing</h1>
      <button class="btn btn-primary space-x-4" on:click={openBillingPortal}>
        <span>Manage Billing</span>
        <Icon
          src={ArrowTopRightOnSquare}
          size="20"
          style="stroke-width: 2px;"
        />
      </button>
    </div>
  </section>

  <section class="w-full flex flex-col justify-center space-y-4 px-4">
    <div class="grid grid-cols-2 gap-4 py-4">
      <div
        class="card items-center justify-between col-span-2 flex-col sm:flex-row space-y-4 sm:space-y-0"
      >
        <div class="flex flex-col">
          <p class="text-light">Upcoming invoice</p>
          <h3>{invoices.upcoming.description}</h3>
        </div>

        <div class="grid grid-cols-3 gap-x-6">
          <p class="text-light text-right col-span-2">Total</p>
          <p>{cf(invoices.upcoming.total)}</p>

          <p class="text-light text-right col-span-2">Applied credit</p>
          <p>{cf(invoices.upcoming.applied_credit)}</p>

          <p class="text-light text-right col-span-2">Amount due</p>
          <p>{cf(invoices.upcoming.amount_due)}</p>
        </div>
      </div>

      <div class="card flex-col">
        <p class="text-light">Last invoice</p>
        <h3>{invoices.last.description}</h3>
      </div>

      <div class="card flex-col">
        <p class="text-light">Credit remaining</p>
        <h3>{cf(credit)}</h3>
      </div>
    </div>
  </section>

  <section class="w-full flex flex-col justify-center space-y-4 px-4">
    <div class="flex pb-2 border-b border-std items-end">
      <h2>Usage this month</h2>
    </div>
    <DailyUsageChart {values} />
  </section>
</Container>

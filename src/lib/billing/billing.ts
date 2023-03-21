import { cubr } from "$lib/api/cubr.js";

export const openCheckoutSession = async () => {
  try {
    const res = await cubr.client.billing.billingCreateCheckoutSession(
      window.location.toString(),
    );
    window.location.replace(res.CheckoutSessionURL);
  } catch (e) {
    console.log(e);
  }
};

export const openBillingPortal = async () => {
  try {
    const res = await cubr.client.billing.billingCreatePortalSession(
      window.location.toString(),
    );
    window.location.replace(res.PortalSessionURL);
  } catch (e) {
    console.log(e);
  }
};

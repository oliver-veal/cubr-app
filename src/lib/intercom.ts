import type { User } from "@supabase/supabase-js";

const load = () => {
  (function () {
    var w = window;
    var ic = w.Intercom;
    if (typeof ic === "function") {
      ic("reattach_activator");
      ic("update", w.intercomSettings);
    } else {
      var d = document;
      var i = function () {
        // @ts-ignore
        i.c(arguments);
      };
      // @ts-ignore
      i.q = [];
      // @ts-ignore
      i.c = function (args) {
        // @ts-ignore
        i.q.push(args);
      };
      // @ts-ignore
      w.Intercom = i;
      var l = function () {
        var s = d.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://widget.intercom.io/widget/f0zphdzd";
        var x = d.getElementsByTagName("script")[0];
        // @ts-ignore
        x.parentNode.insertBefore(s, x);
      };
      if (document.readyState === "complete") l();
      // @ts-ignore
      else if (w.attachEvent) w.attachEvent("onload", l);
      else w.addEventListener("load", l, false);
    }
  })();
};

const boot = (user: User) => {
  const name = user?.user_metadata?.full_name || "";
  const email = user?.email || "";
  let created_at = user?.created_at || 0;
  const user_id = user?.id || "";

  try {
    created_at = Math.floor(new Date(created_at).getTime() / 1000);

    window && window.Intercom && window.Intercom("boot", {
      api_base: "https://api-iam.intercom.io",
      app_id: "f0zphdzd",
      name,
      email,
      created_at,
      user_id,
    });
  } catch (error) {
    console.log(error);
  }
};

const update = () => {
  window.Intercom("update");
};

const shutdown = () => {
  window && window.Intercom && window.Intercom("shutdown");
};

export const intercom = {
  load,
  boot,
  update,
  shutdown,
};

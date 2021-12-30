import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import {
  initialise as initialiseAnalytics,
  pageview as trackPageView,
} from "@/lib/analytics";

const Analytics = () => {
  const router = useRouter();

  useEffect(() => {
    const setClientId = async () => {
      const response = await fetch("/api/v1/analytics/client-id");
      if (response.ok) {
        const { id } = await response.json();
        initialiseAnalytics({
          clientId: id,
        });
      } else {
        initialiseAnalytics({
          clientId: -1,
        });
      }
      trackPageView({ url: router.pathname, title: router.pathname });
    };
    setClientId();
  }, []);

  useEffect(() => {
    const handleRouteChange = (url) => {
      trackPageView({ url: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={"https://www.googletagmanager.com/gtag/js?id=G-NJ8JT0DJWJ"}
      />
      <Script
        id="analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function analytics(){dataLayer.push(arguments);}
            analytics("js", new Date());
          `,
        }}
      />
    </>
  );
};

export default Analytics;

import Script from 'next/script'

/**
 * Google Analytics 4 loader. Only renders if NEXT_PUBLIC_GA_MEASUREMENT_ID is set,
 * so the script is fully absent in dev / before launch.
 *
 * Loaded with `afterInteractive` so it doesn't block the critical path.
 * No cookie consent banner is loaded (deferred to post-launch per project plan).
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (!id) return null
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}', { anonymize_ip: true });`}
      </Script>
    </>
  )
}

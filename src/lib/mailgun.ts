import 'server-only'

type SendArgs = {
  to: string
  subject: string
  text?: string
  html?: string
  replyTo?: string
}

export async function sendMail(args: SendArgs): Promise<
  | { ok: true; id: string }
  | { ok: false; skipped: true; reason: string }
  | { ok: false; error: string }
> {
  const apiKey = process.env.MAILGUN_API_KEY
  const domain = process.env.MAILGUN_DOMAIN
  const from = process.env.MAILGUN_FROM_EMAIL || (domain ? `no-reply@${domain}` : '')

  if (!apiKey || !domain) {
    return { ok: false, skipped: true, reason: 'MAILGUN_API_KEY or MAILGUN_DOMAIN not set' }
  }

  // Mailgun supports US (api.mailgun.net) and EU (api.eu.mailgun.net). Default US.
  const region = process.env.MAILGUN_REGION === 'eu' ? 'api.eu.mailgun.net' : 'api.mailgun.net'
  const url = `https://${region}/v3/${encodeURIComponent(domain)}/messages`

  const body = new URLSearchParams()
  body.append('from', from)
  body.append('to', args.to)
  body.append('subject', args.subject)
  if (args.text) body.append('text', args.text)
  if (args.html) body.append('html', args.html)
  if (args.replyTo) body.append('h:Reply-To', args.replyTo)

  const auth = Buffer.from(`api:${apiKey}`).toString('base64')

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!res.ok) {
    return { ok: false, error: `Mailgun ${res.status}: ${await res.text()}` }
  }
  const json = (await res.json()) as { id?: string }
  return { ok: true, id: json.id || '' }
}

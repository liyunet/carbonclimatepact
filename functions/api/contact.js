function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store"
    }
  });
}

export async function onRequestPost(context) {
  const request = context.request;

  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON payload." }, 400);
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const organization = String(payload.organization || "").trim();
  const country = String(payload.country || "").trim();
  const interest = String(payload.interest || "").trim();
  const message = String(payload.message || "").trim();

  if (!name || !email || !message) {
    return json({ ok: false, error: "Name, email and message are required." }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, error: "Please provide a valid email address." }, 400);
  }

  // This endpoint is intentionally provider-neutral.
  // Configure CONTACT_WEBHOOK_URL in Cloudflare Pages environment variables
  // to forward submissions to your chosen email/CRM/form service.
  const webhook = context.env.CONTACT_WEBHOOK_URL;

  if (!webhook) {
    return json({
      ok: false,
      error: "Contact delivery is not configured yet. Please email contact@carbonclimatepact.com."
    }, 503);
  }

  const forwarded = await fetch(webhook, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      source: "carbonclimatepact.com",
      name,
      email,
      organization,
      country,
      interest,
      message,
      submitted_at: new Date().toISOString()
    })
  });

  if (!forwarded.ok) {
    return json({ ok: false, error: "Message delivery failed. Please email contact@carbonclimatepact.com." }, 502);
  }

  return json({ ok: true, message: "Thank you. Your message has been received." });
}

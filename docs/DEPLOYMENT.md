# Deployment guide

## Cloudflare Pages

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run check`.
4. Run `npm run deploy`.

The public site is served from the `site/` directory.

## Contact form backend

The included Pages Function is available at:

`POST /api/contact`

It validates submissions and forwards them to a webhook configured through:

`CONTACT_WEBHOOK_URL`

Set this environment variable in Cloudflare Pages before enabling server-side form delivery.

Until then, keep `contact@carbonclimatepact.com` as the fallback contact address.

## Custom domain

Attach `carbonclimatepact.com` from the Cloudflare Pages project dashboard and ensure DNS is managed correctly.

## Before launch

- Confirm the final domain.
- Add verified CCPA social-media profile URLs when available.
- Configure the contact webhook if server-side delivery is required.
- Test mobile navigation, all internal links, the contact form, favicon and metadata.

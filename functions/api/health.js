export async function onRequestGet() {
  return Response.json({
    ok: true,
    service: "ccpact.com",
    timestamp: new Date().toISOString()
  });
}

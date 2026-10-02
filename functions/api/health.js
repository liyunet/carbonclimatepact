export async function onRequestGet() {
  return Response.json({
    ok: true,
    service: "carbonclimatepact.com",
    timestamp: new Date().toISOString()
  });
}

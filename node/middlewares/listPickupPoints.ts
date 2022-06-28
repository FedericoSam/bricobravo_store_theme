export async function listPickupPoints(
  ctx: Context,
  next: () => Promise<any>
) {

  ctx.set('Cache-Control', 'no-cache')
  ctx.set('Access-Control-Allow-Origin', "*");

  const { clients: {
    PickupPointClient
  } } = ctx

  try {

    const pickuppoints = await PickupPointClient.list();

    ctx.body = pickuppoints
    ctx.status = 200

  } catch (error) {
    console.log(error.response?.data)
    throw new Error(error.message)

  } finally {
    await next()
  }
}

export async function listAdminRegion(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'no-cache')
  ctx.set('Access-Control-Allow-Origin', '*')

  const {
    clients: { AdminRegionClient },
  } = ctx

  try {
    const adminRegions = await AdminRegionClient.list()

    ctx.body = adminRegions
    ctx.status = 200
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  } finally {
    await next()
  }
}

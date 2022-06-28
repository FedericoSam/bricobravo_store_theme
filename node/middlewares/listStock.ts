export async function listStock(ctx: Context, next: () => Promise<any>) {
  ctx.set('Cache-Control', 'no-cache')
  ctx.set('Access-Control-Allow-Origin', '*')

  const {
    clients: { StockClient },
    vtex: {
      route: { params },
    },
  } = ctx

  const { itemId } = params
  try {
    const stock = await StockClient.list(itemId as string)

    ctx.body = stock
    ctx.status = 200
  } catch (error) {
    throw new Error(error.message)
  } finally {
    await next()
  }
}

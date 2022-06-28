import { JanusClient, InstanceOptions, IOContext } from '@vtex/api'

export default class StockClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        VtexIdclientAutCookie: ctx.authToken,
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  list(itemId: string): any {
    try {
      return this.http.get(`/api/logistics/pvt/inventory/skus/${itemId}`)
    } catch (error) {
      console.trace('getOrderForm', error)
    }
  }
}

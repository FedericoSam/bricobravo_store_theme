import { InstanceOptions, IOContext, JanusClient } from '@vtex/api'

export default class AdminRegionClient extends JanusClient {
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

  list(): any {
    try {
      return this.http.get(`/api/dataentities/ourstore/search?_schema=v1&_fields=id,storeRegion,pickupPoints`)
    } catch (error) {
      console.trace('getOrderForm', error)
    }
  }
}

import { InstanceOptions, IOContext, JanusClient } from '@vtex/api'

export default class PickupPointClient extends JanusClient {
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
    return this.http.get(`/api/logistics/pvt/configuration/pickuppoints`)
  }
}

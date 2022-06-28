import { IOClients } from '@vtex/api'

import AdminRegionClient from './AdminRegionClient'
import PickupPointClient from './PickupPointsClient'
import StockClient from './StockClient'

export class Clients extends IOClients {
  public get PickupPointClient() {
    return this.getOrSet('PickupPointClient', PickupPointClient)
  }

  public get AdminRegionClient() {
    return this.getOrSet('AdminRegionClient', AdminRegionClient)
  }

  public get StockClient() {
    return this.getOrSet('StockClient', StockClient)
  }
}

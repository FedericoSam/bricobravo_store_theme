import {
  ClientsConfig,
  LRUCache,
  method,
  RecorderState,
  Service,
  ServiceContext,
} from '@vtex/api'

import { Clients } from './clients'
import { listAdminRegion } from './middlewares/listAdminRegion'
import { listPickupPoints } from './middlewares/listPickupPoints'
import { listStock } from './middlewares/listStock'

const TIMEOUT_MS = 800

const memoryCache = new LRUCache<string, any>({ max: 5000 })
metrics.trackCache('status', memoryCache)

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    status: {
      memoryCache,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>

  type State = RecorderState
}

export default new Service({
  clients,
  routes: {
    listPickupPoints: method({
      GET: [listPickupPoints],
    }),
    listAdminRegion: method({
      GET: [listAdminRegion],
    }),
    listStock: method({
      GET: [listStock],
    }),
  },
})

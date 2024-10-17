import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import type { App } from 'vue'

const store = createPinia()
store.use(piniaPersist)

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }

/* tslint-disable ts/ban-types */
/// <reference types="vite/client" />

// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'

//   const Component: DefineComponent<{}, {}, object>
//   export default Component
// }

declare module '*.vue' {
  const Component: ReturnType<typeof defineComponent>
  export default Component
}

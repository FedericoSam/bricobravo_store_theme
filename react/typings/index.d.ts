/* eslint-disable @typescript-eslint/ban-types */
import type { FunctionComponent } from 'react'

declare global {
  interface StorefrontFunctionComponent<P = {}> extends FunctionComponent<P> {
    getSchema?(props: P): object
    schema?: object
  }
}

import React from 'react'
import { Helmet } from 'react-helmet'

const StoreLocator = () => {
  const config = {
    selector: '.store-locator-widget',
    account: '1vZ4vwAJQd',
  }
  //@ts-ignore
  window.StoreRocket?.init(config)

  return (
    <>
      <Helmet>
        <script src="//cdn.storerocket.io/widget.js"></script>
      </Helmet>
      <div className="store-locator-widget"></div>
    </>
  )
}

export default StoreLocator

import React from 'react'
import { useProduct } from 'vtex.product-context'

const MantaAvailability = () => {
  const productContextValue = useProduct()
  const quantity =
    productContextValue?.product?.items?.[0]?.sellers?.[0]?.commertialOffer
      ?.AvailableQuantity ?? 1

  // const quantity2 =
  //   productContextValue?.product?.items?.[0]?.sellers?.[1]?.commertialOffer
  //     ?.AvailableQuantity ?? 0

  // const quantity = quantity1 + quantity2

  let message = 'Prodotto non disponibile'
  let messageStyle = { color: 'grey' }

  if (quantity > 9) {
    message = 'Prodotto disponibile'
    messageStyle = { color: '#4320a8', fontWeight: 'bold' }
  } else if (quantity >= 2) {
    message = `Solo ${quantity} prodotti disponibili`
    messageStyle = { color: '#4320a8', fontWeight: 'bold' }
  } else if (quantity === 1) {
    message = 'SOLO 1 DISPONIBILE!'
    messageStyle = { color: '#4320a8', fontWeight: 'bold' }
  }

  const dotStyle = {
    color: messageStyle.color === 'grey' ? 'red' : 'green',
    marginRight: '0.5rem',
    fontSize: '1.5rem',
    paddingBottom: '2px',
  }

  return (
    <>
      {/* {quantity} */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={dotStyle}>&#9679;</span>
        <p style={messageStyle}>{message}</p>
      </div>
    </>
  )
}

export default MantaAvailability

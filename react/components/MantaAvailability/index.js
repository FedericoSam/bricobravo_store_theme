import React, { useState, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

const MantaAvailability = () => {
  const productContextValue = useProduct()
  const [quantity, setQuantity] = useState(null)

  useEffect(() => {
    if (
      productContextValue &&
      productContextValue.product &&
      productContextValue.product.items &&
      productContextValue.product.items.length > 0
    ) {
      let localQuantity = 0

      for (const item of productContextValue.product.items) {
        if (item.sellers && item.sellers[0]) {
          const availableQuantity =
            item.sellers[0].commertialOffer?.AvailableQuantity || 0
          localQuantity += availableQuantity
        }
      }

      setQuantity(localQuantity)
    }
  }, [productContextValue])

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

  // console.log('quantity', quantity)
  // console.log('type quantity', typeof quantity)
  // console.log('product context value', productContextValue.product)

  return (
    <>
      {quantity !== null && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={dotStyle}>&#9679;</span>
          <p style={messageStyle}>{message}</p>
        </div>
      )}
    </>
  )
}

export default MantaAvailability

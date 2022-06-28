import React from 'react'
import { useProduct } from 'vtex.product-context'

const SellingPriceWrapper: React.FC = ({ children }) => {
  const { selectedItem } = useProduct()

  return (
    <>
      <span className="vtex-rich-text-0-x-paragraph--selling-price-label">
        {selectedItem?.measurementUnit === 'm²' ? 'Por caixa:' : 'Por:'}
      </span>

      {children}
    </>
  )
}

export default SellingPriceWrapper

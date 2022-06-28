import React from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import type { SelectedItem } from 'vtex.product-context'
import { useProduct } from 'vtex.product-context'

const isAvailableQuantity = (item: SelectedItem) => {
  const availableQuantity = item.sellers.find(
    seller => seller.commertialOffer.AvailableQuantity > 0
  )

  return !!availableQuantity
}

const StockChallenge = () => {
  const { selectedItem } = useProduct() ?? {}

  if (!selectedItem) return null

  if (!isAvailableQuantity(selectedItem)) {
    return <ExtensionPoint id="stock-challenge.unavailable" />
  }

  return <ExtensionPoint id="stock-challenge.available" />
}

export default StockChallenge

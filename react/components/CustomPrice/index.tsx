import React from 'react'
import { useProduct } from 'vtex.product-context'

import styles from './styles.css'

const CustomPrice = () => {
  const { product } = useProduct() ?? {}

  if (!product) return

  const {
    items: [firstItem],
  } = product

  if (firstItem.measurementUnit !== 'm²') return <></>

  const unitMultiplier = firstItem.unitMultiplier ?? 0

  const price = firstItem.sellers[0].commertialOffer.Price ?? 0

  const newPrice = (Math.trunc(unitMultiplier * price * 100) / 100)
    .toFixed(2)
    .toString()
    .replace('.', ',')

  return (
    <span className={styles.sellingPriceHasUnitMultiplier}>R$ {newPrice}</span>
  )
}

export default CustomPrice

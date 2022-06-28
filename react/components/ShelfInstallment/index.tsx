import React from 'react'
import { useProduct } from 'vtex.product-context'

import styles from './styles.css'

const ShelfInstallment = () => {
  const { product } = useProduct() ?? {}
  const rateOfInterest = 0

  if (!product) return

  const {
    items: [firstItem],
  } = product

  const price = firstItem.sellers[0].commertialOffer.Price ?? 0
  const unitPrice = price

  const allInstallments =
    firstItem.sellers[0].commertialOffer.Installments ?? []

  if (allInstallments.length === 0) return <></>

  const [maxInstallment] = allInstallments
    .filter(item => item.InterestRate === rateOfInterest)
    .map(item => item.NumberOfInstallments)
    .sort((a, b) => b - a)

  const installmentPrice = (unitPrice / maxInstallment)
    .toFixed(2)
    .toString()
    .replace('.', ',')

  return (
    <span className={styles.installmentsCustom}>
      <span className={styles.installmentsNumberCustom}>{maxInstallment}x</span>
      de
      <span className={styles.installmentValueCustom}>
        {`R$ ${installmentPrice}`}
      </span>
      sem juros
    </span>
  )
}

export default ShelfInstallment

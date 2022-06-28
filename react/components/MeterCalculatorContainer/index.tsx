/* eslint-disable no-console */
import React, { useState, useCallback, useEffect } from 'react'
import { useProduct } from 'vtex.product-context'
import { Checkbox } from 'vtex.styleguide'

import styles from './styles.css'

const MeterCalculatorContainer: React.FC = ({ children }) => {
  const { selectedItem, selectedQuantity } = useProduct()
  const [isChecked, setChecked] = useState(false)
  const [isChecked2, setChecked2] = useState(false)
  const [additionalPercent, setAdditionalPercent] = useState(0)
  const [totalPackage, setTotalPackage] = useState(0)

  const additionalLossTexts = {
    text1: 'Adicionar 10% de quebra em instalações na horizontal ou vertical',
    text2: 'Adicionar 15% de quebra em instalações na diagonal',
    content: 'Cada caixa contém:',
  }

  const addAdditionalValue = useCallback(() => {
    let additionalValue = 0

    if (isChecked) {
      additionalValue += 10
    }

    if (isChecked2) {
      additionalValue += 15
    }

    setAdditionalPercent(additionalValue)
  }, [isChecked, isChecked2])

  const countTotalValue = useCallback(() => {
    let totalValue = selectedQuantity

    // if (selectedItem?.unitMultiplier) {
    //   totalValue /= selectedItem.unitMultiplier
    // }

    if (additionalPercent > 0) {
      totalValue += (totalValue * additionalPercent) / 100
    }

    setTotalPackage(Math.ceil(totalValue))
  }, [additionalPercent, selectedItem?.unitMultiplier, selectedQuantity])

  useEffect(() => {
    addAdditionalValue()
    countTotalValue()
  }, [addAdditionalValue, countTotalValue])

  let minQuantityMessage = null

  if (selectedItem?.unitMultiplier) {
    const messageCondition = selectedItem?.unitMultiplier >= 2
    const roundItemUnit = Math.round(selectedItem?.unitMultiplier)

    minQuantityMessage = messageCondition ? (
      <div className={styles.calculateValues}>
        Quantidade mínima de compra de{' '}
        {<span className={styles.minQuantity}>{roundItemUnit}</span>}
      </div>
    ) : null
  }

  return (
    <>
      {selectedItem?.measurementUnit === 'un' && (
        <>
          {minQuantityMessage ? (
            <div className="vtex-flex-layout-0-x-flexRow--calculate-info">
              {minQuantityMessage}
            </div>
          ) : null}
        </>
      )}
      {selectedItem?.measurementUnit === 'm²' && (
        <>
          {children}
          <div className="vtex-flex-layout-0-x-flexRow--checkbox-container">
            <Checkbox
              checked={isChecked}
              id="option-0"
              name="default-checkbox-group"
              onChange={() => setChecked(!isChecked)}
              value="option-0"
            />
            <p className="vtex-rich-text-0-x-paragraph--additionalLossText">
              {additionalLossTexts.text1}{' '}
            </p>
          </div>
          <div className="vtex-flex-layout-0-x-flexRow--checkbox-container">
            <Checkbox
              checked={isChecked2}
              id="option-1"
              name="default-checkbox-group"
              onChange={() => setChecked2(!isChecked2)}
              value="option-1"
            />
            <p className="vtex-rich-text-0-x-paragraph--additionalLossText">
              {additionalLossTexts.text2}{' '}
            </p>
          </div>
          <div className="vtex-flex-layout-0-x-flexRow--calculate-info">
            <div>
              Para:{' '}
              <span className={styles.calculateValues}>
                {' '}
                {console.log(selectedQuantity)}
                {Math.floor(selectedQuantity * selectedItem?.unitMultiplier)} m²
              </span>
            </div>
            {additionalPercent > 0 && (
              <>
                <div>
                  Com adição de:
                  <span className={styles.calculateValues}>
                    {' '}
                    {additionalPercent}%
                  </span>
                </div>
              </>
            )}
            <div>
              Será necessário:
              <span className={styles.calculateValues}>
                {' '}
                {totalPackage} {totalPackage > 1 ? 'caixas' : 'caixa'}
              </span>
            </div>
            <div>
              {additionalLossTexts.content}{' '}
              <span className={styles.calculateValues}>
                {selectedItem?.unitMultiplier} m²
              </span>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default MeterCalculatorContainer

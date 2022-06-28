/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { ChangeEvent } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { Input } from 'vtex.styleguide'
import { useProductDispatch, useProduct } from 'vtex.product-context'

import PlusCircle from './Svg/PlusCircle'
import styles from './styles.css'

interface IInputGroup {
  value1?: string
  value2?: string
}

const MeterCalculator: React.FC = () => {
  const dispatch = useProductDispatch()
  const { selectedItem } = useProduct()
  const [totalMeters, setTotalMeters] = useState(0)
  const [inputGroupList, setInputGroupList] = useState<IInputGroup[]>([
    {
      value1: '',
      value2: '',
    },
  ])

  const handleAddInputGroup = () => {
    setInputGroupList([...inputGroupList, { value1: '', value2: '' }])
  }

  const handleRemoveInputGroup = (index: number) => {
    const listUpdated = [...inputGroupList]

    if (listUpdated.length === 1) {
      setInputGroupList([
        {
          value1: '',
          value2: '',
        },
      ])

      return
    }

    listUpdated.splice(index, 1)
    setInputGroupList(listUpdated)
  }

  const handleChangeValues = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target
    const list = [...inputGroupList]

    // @ts-ignore
    list[index][name] = value

    setInputGroupList(list)
  }

  const sumValues = useCallback(() => {
    const sum = inputGroupList.reduce((acc, curr) => {
      return acc + Number(curr?.value1) * Number(curr?.value2)
    }, 0)

    setTotalMeters(sum)
  }, [inputGroupList])

  const changeQuantity = () => {
    if (!dispatch) return
    const closeButton = document.getElementsByClassName(
      'vtex-modal-layout-0-x-closeButton--meter-calculator'
    )[0] as HTMLElement

    closeButton.click()

    dispatch({
      type: 'SET_QUANTITY',
      args: {
        quantity: Math.ceil(totalMeters / (selectedItem?.unitMultiplier ?? 0)),
      },
    })
  }

  useEffect(() => {
    sumValues()
  }, [sumValues])

  return (
    <section>
      <div className={styles.labelContainer}>
        <span>Largura</span>
        <span>Comprimento</span>
      </div>
      <div className={styles.inputGroupContainer}>
        {inputGroupList.map((inputGroup, index) => {
          return (
            <div key={index} className={styles.inputContainer}>
              <span>Área</span>
              <Input
                className={styles.inputCalculator}
                placeholder="00"
                type="number"
                name="value1"
                value={inputGroup.value1}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChangeValues(event, index)
                }
              />
              <span>x</span>
              <Input
                className={styles.inputCalculator}
                placeholder="00"
                type="number"
                name="value2"
                value={inputGroup.value2}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  handleChangeValues(event, index)
                }
              />

              <span onClick={() => handleRemoveInputGroup(index)}>
                <img
                  src="https://balarotiio.vtexassets.com/arquivos/trash.svg"
                  alt="apagar"
                />
              </span>
            </div>
          )
        })}
      </div>
      <div className={styles.addButtonContainer}>
        <button onClick={handleAddInputGroup}>
          <PlusCircle />
          <p>ADICIONAR MAIS ÁREAS</p>
        </button>
      </div>
      <div className={styles.totalContainer}>
        <div>
          <span>Total:</span>
          <span>{totalMeters} m²</span>
        </div>
        <button onClick={changeQuantity}>
          <p>Atualizar Quantidade</p>
        </button>
      </div>
    </section>
  )
}

export default MeterCalculator

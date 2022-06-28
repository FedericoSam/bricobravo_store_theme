import React, { useEffect, useState } from 'react'
import { useProduct } from 'vtex.product-context'
import { Spinner, Collapsible, Button } from 'vtex.styleguide'
import axios from 'axios'

import styles from './styles.css'
import LocationSvg from './svgs/LocationSvg'
import CartSvg from './svgs/CartSvg'

interface StockItem {
  warehouseId: string
  totalQuantity: number
}

const StockSearch: React.FC = () => {
  const { selectedItem } = useProduct()
  const itemId = selectedItem?.itemId
  const [regions, setRegions] = useState([])
  // const [isLoading, setIsLoading] = useState(true);
  const [toggleAccordion, setToggleAccordion] = useState(null)

  const getStock = () => {
    return axios.get(`/_v/list-stock/${itemId}`)
  }

  const getPickupPoint = () => {
    return axios.get(`/_v/list-pickup-points`)
  }

  const getAdminRegion = () => {
    return axios.get(`/_v/list-admin-regions`)
  }

  const load = () => {
    const adminRegionList = getAdminRegion()
    const pickupPointList = getPickupPoint()
    const stockList = getStock()

    return Promise.all([adminRegionList, pickupPointList, stockList]).then(
      ([_adminRegionList, _pickupPointList, _stockList]) => {
        return _adminRegionList.data.map((region: any) => {
          const { pickupPoints, storeRegion } = region

          const { balance } = _stockList.data
          let totalQuantity = 0

          return {
            label: storeRegion,
            pickupPoints: pickupPoints.map(
              ({ label: pickupPointLabel, value }: any) => {
                const [pickupPointInfo] = _pickupPointList.data.filter(
                  (pickupPointItem: any) =>
                    pickupPointItem.name === pickupPointLabel &&
                    pickupPointItem.id === value.id
                )

                const { address, id: pickupPointId } = pickupPointInfo
                const [pickupPointTotalQuantity] = balance
                  .filter(
                    ({ warehouseId }: StockItem) =>
                      warehouseId === pickupPointId
                  )
                  .map(
                    ({ totalQuantity: stockTotalQuantity }: StockItem) =>
                      stockTotalQuantity
                  ) as number[]

                totalQuantity += pickupPointTotalQuantity

                return {
                  label: pickupPointLabel,
                  ...value,
                  address,
                  totalQuantity: pickupPointTotalQuantity,
                }
              }
            ),
            totalQuantity,
          }
        })
      }
    )
  }

  useEffect(() => {
    load().then(res => {
      setRegions(res)
    })
  }, [])

  if (!regions) return <>Vazio..</>

  return (
    <>
      <section className={styles.stockContainer}>
        {selectedItem ? (
          <>
            <div className={styles.imgContainer}>
              <img
                src={selectedItem?.images[0].imageUrl}
                alt="Product"
                width={64}
                height={64}
              />
            </div>
            <div className={styles.contentContainer}>
              <h3 className={styles.productName}>
                {selectedItem.nameComplete}
              </h3>
              <span className={styles.productReference}>
                REF: {selectedItem.ean}
              </span>
            </div>
          </>
        ) : (
          <Spinner />
        )}
      </section>
      <div>
        <div className={styles.deliveryCard}>
          <div className="flex">
            <div className={`fl w-5 pa2 ${styles.cartSvg}`}>
              <CartSvg />
            </div>
            <div className="fl w-90 pa2">
              <h3 className={`ml5 fw5 ${styles.regionTitle}`}>
                Estoque do Site
              </h3>
              <p className={styles.totalQuantityRegion}>
                {selectedItem?.sellers[0].commertialOffer.AvailableQuantity}{' '}
                unidades em estoque
              </p>
              <div className="balaroti-store-theme-0-x-cart-message">
                <p>Receba na sua casa</p>
              </div>
            </div>
          </div>
        </div>
        {regions.map((region: any, index: any) => (
          <div
            className={`${
              toggleAccordion !== null
                ? `${styles.regionTab} ${styles.regionTab}--isOpen`
                : styles.regionTab
            }`}
            key={index}
          >
            <Collapsible
              header={
                <div className={styles.regionCard}>
                  <div className="flex">
                    <div className={`fl w-5 pa2 ${styles.locationSvg}`}>
                      <LocationSvg />
                    </div>
                    <div className="fl w-95 pa2">
                      <h3 className={`ml5 fw5 ${styles.regionTitle}`}>
                        {region.label}
                      </h3>
                      <p className={styles.totalQuantityRegion}>
                        {region.totalQuantity} unidades em estoque
                      </p>
                    </div>
                  </div>
                  <div className={`tc pb5 ${styles.availableStores}`}>
                    <Button variation="primary">Ver lojas disponíveis</Button>
                  </div>
                </div>
              }
              onClick={() =>
                setToggleAccordion(toggleAccordion !== index ? index : null)
              }
              isOpen={toggleAccordion === index}
              align="right"
              caretColor="muted"
            >
              <div className={`pa3 ${styles.pickupPointsCards}`}>
                {region?.pickupPoints?.map(
                  (pickupPoint: any, pickupPointIndex: number) => (
                    <div key={pickupPointIndex}>
                      <h3 className={styles.pickupPointName}>
                        {pickupPoint.label}
                      </h3>
                      <div>
                        <p className={styles.pickupPointQuantity}>
                          {pickupPoint.totalQuantity} Unidades em estoque
                        </p>
                        <p className={`ma0 mb5 ${styles.pickupPointAddress}`}>
                          Endereço: {pickupPoint.address.street},{' '}
                          {pickupPoint.address.number} -{' '}
                          {pickupPoint.address.neighborhood},{' '}
                          {pickupPoint.address.city} -{' '}
                          {pickupPoint.address.state},{' '}
                          {pickupPoint.address.postalCode}
                        </p>
                        <div className="balaroti-store-theme-0-x-available-message">
                          <p>Loja disponível para retirada ou entrega</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </Collapsible>
          </div>
        ))}
      </div>
    </>
  )
}

export default StockSearch

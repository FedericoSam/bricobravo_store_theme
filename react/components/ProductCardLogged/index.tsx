import React, { useEffect } from 'react'
import { OrderForm } from 'vtex.order-manager'

import ProductSummary from './ProductSummary'
import ProductSummaryMin from './ProductSummaryMin'
import style from './styles.css'
import GetItensWishlistByEmail from '../GetItemsWishlistByEmail'

export default function ProductCardLogged() {
  const { useOrderForm } = OrderForm
  const { orderForm } = useOrderForm()
  const { items, loggedIn: isLoggedIn, clientProfileData } = orderForm

  const lastProductCart = items[items.length - 1]
  const linkProduct = lastProductCart?.detailUrl

  const adjustDecimaisSellingPrice = lastProductCart?.sellingPrice / 100
  const adjustDecimaisListPrice = lastProductCart?.listPrice / 100

  const transformCoinEuroSellingPrice =
    items.length > 0
      ? adjustDecimaisSellingPrice.toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR',
        })
      : (0.0).toLocaleString('de-DE', {
          style: 'currency',
          currency: 'EUR',
        })

  const transformCoinEuroListPrice = adjustDecimaisListPrice.toLocaleString(
    'de-DE',
    { style: 'currency', currency: 'EUR' }
  )

  useEffect(() => {
    if (isLoggedIn) {
      GetItensWishlistByEmail(clientProfileData.email)
        .then((res) => res.json())
        .then((res) => console.log(res, "RESULTADO DA REQUISIÇÃO PARA O WISHLIST"))
    }
  }, [])

  return (
    <div
      className={
        isLoggedIn === true ? style.containerMain : style.hideContainerMain
      }>
      <div className={style.containerCards_productLogged}>
        <div className={style.cardProduct_lastProduct}>
          <p className={style.cardProduct_Title}>Continua ad acquistare</p>
          <ProductSummary
            style={style}
            linkProduct={linkProduct}
            lastProductCart={lastProductCart}
            transformCoinEuroListPrice={transformCoinEuroListPrice}
            adjustDecimaisListPrice={adjustDecimaisListPrice}
            transformCoinEuroSellingPrice={transformCoinEuroSellingPrice}
          />
        </div>
        <div className={style.cardProduct_Wishlist}>
          <p className={style.cardProduct_Title}>La tua lista dei desideri</p>
          <div className={style.cardProduct_WishlistContainerProducts}>
            <ProductSummary
              style={style}
              linkProduct={linkProduct}
              lastProductCart={lastProductCart}
              transformCoinEuroListPrice={transformCoinEuroListPrice}
              adjustDecimaisListPrice={adjustDecimaisListPrice}
              transformCoinEuroSellingPrice={transformCoinEuroSellingPrice}
            />
            <ProductSummary
              style={style}
              linkProduct={linkProduct}
              lastProductCart={lastProductCart}
              transformCoinEuroListPrice={transformCoinEuroListPrice}
              adjustDecimaisListPrice={adjustDecimaisListPrice}
              transformCoinEuroSellingPrice={transformCoinEuroSellingPrice}
            />
          </div>
        </div>
        <div className={style.cardProduct_lastPurchase}>
          <p className={style.cardProduct_Title}>I miei ordini</p>
          <ProductSummaryMin
            style={style}
            linkProduct={linkProduct}
            lastProductCart={lastProductCart}
          />
        </div>
      </div>
    </div>
  )
}

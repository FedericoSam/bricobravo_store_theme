import React from 'react'
import { OrderForm } from 'vtex.order-manager'
import ProductSummary from './ProductSummary'
import ProductSummaryMin from './ProductSummaryMin'
import style from './styles.css'
// import  ClientInfoLogged  from '../ClientInfoLogged'

export default function ProductCardLogged() {
    const { useOrderForm } = OrderForm
    const { orderForm } = useOrderForm()
    const lastProductCart = orderForm.items[orderForm.items.length -1] 
    const linkProduct = lastProductCart?.detailUrl
    const isLoggedIn = orderForm.loggedIn

    const adjustDecimaisSellingPrice = lastProductCart?.sellingPrice / 100
    const adjustDecimaisListPrice = lastProductCart?.listPrice / 100

    const transformCoinEuroSellingPrice = adjustDecimaisSellingPrice.toLocaleString("de-DE", { style: "currency", currency: "EUR" })
    const transformCoinEuroListPrice = adjustDecimaisListPrice.toLocaleString("de-DE", { style: "currency", currency: "EUR" })

    return (
        <div className={isLoggedIn == true ? style.containerMain : style.hideContainerMain}>
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

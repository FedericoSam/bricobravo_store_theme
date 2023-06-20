import React from 'react'
import { useProduct } from 'vtex.product-context'

const MantaVisibilityConditionalHour = ({ WhatsAppComponente }) => {
  const currentDate = new Date()
  const currentHour = currentDate.getHours()
  const currentDay = currentDate.getDay() // Sunday: 0, Monday: 1, ..., Saturday: 6

  const productContextValue = useProduct()

  //product.items[0].sellers[0].commertialOffer.AvailableQuantity
  //product.items[0].variations[0].values[0].name
  //product.properties[0].values[0].name

  console.log('product context', productContextValue)

  const prezzoVendita =
    productContextValue?.product?.priceRange?.sellingPrice?.highPrice
  const prezzoVendita2 = Math.trunc(prezzoVendita)

  const isVisible =
    currentHour >= 10 &&
    (currentHour < 17 ||
      (currentHour === 17 && currentDate.getMinutes() < 31)) &&
    currentDay >= 1 &&
    currentDay <= 5 &&
    prezzoVendita2 > 498 // Monday to Friday > 500

  //return <>{isVisible && <WhatsAppComponente />}</>
  return <>{false && <WhatsAppComponente />}</>
}

MantaVisibilityConditionalHour.schema = {
  title: 'Orari di apertura whatsapp',
  type: 'object',
  properties: {},
}
export default MantaVisibilityConditionalHour

//      "Prezzo": "product-selling-price#pdp"

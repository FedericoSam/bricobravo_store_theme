import { useEffect } from 'react'
import { useProduct } from 'vtex.product-context'

const SellerConsegna = () => {
  const productContextValue = useProduct()
  //console.log(productContextValue);
  const [shippingDays, setShippingDays] = React.useState()

  function formatShippingData(productShippingInfo) {
    let [logisticsInfo] = productShippingInfo.logisticsInfo
    let { shippingEstimate, price } = logisticsInfo.slas[0]
    let substringToReplace = shippingEstimate.includes('bd') ? 'bd' : 'd'

    var shippingEstimateMin = parseInt(
      shippingEstimate.replace(substringToReplace, '')
    )
    var shippingEstimateMax =
      parseInt(shippingEstimate.replace(substringToReplace, '')) + 2
    //console.log("Giorni:"+shippingEstimateMin+" "+shippingEstimateMax);

    var d1 = new Date()
    var d2 = new Date()

    for (let i = 0; i < shippingEstimateMin; i++) {
      d1.setDate(d1.getDate() + 1)
      if (d1.getDay() == 0) {
        d1.setDate(d1.getDate() + 1)
      } else if (d1.getDay() == 6) {
        d1.setDate(d1.getDate() + 2)
      }
    }

    for (let i = 0; i < shippingEstimateMax; i++) {
      d2.setDate(d2.getDate() + 1)
      if (d2.getDay() == 0) {
        d2.setDate(d2.getDate() + 1)
      } else if (d2.getDay() == 6) {
        d2.setDate(d2.getDate() + 2)
      }
    }

    var day1 = d1.getDate()
    var month1 = d1.toLocaleString('it-IT', {
      month: 'long',
    })
    var day2 = d2.getDate()
    var month2 = d2.toLocaleString('it-IT', {
      month: 'long',
    })

    shippingEstimate =
      'tra il ' + day1 + ' ' + month1 + ' e il ' + day2 + ' ' + month2

    setShippingDays(shippingEstimate)
  }

  async function fetchProductShippingData(product) {
    const options = {
      method: 'post',
      body: JSON.stringify({
        items: [
          {
            id: product.items[0].itemId,
            quantity: '1',
            seller: product.items[0].sellers[0].sellerId,
          },
        ],
        country: 'ITA',
        postalCode: '00005021',
      }),
      headers: { 'Content-Type': 'application/json' },
    }
    try {
      const productShippingInfo = await fetch(
        '/api/checkout/pub/orderForms/simulation',
        options
      ).then((resp) => resp.json())

      return productShippingInfo
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (productContextValue.product) {
      fetchProductShippingData(productContextValue.product).then((info) =>
        formatShippingData(info)
      )
    }
  }, [])

  return (
    <>
      {shippingDays && (
        <div>
          <p class="vtex-rich-text-0-x-paragraph--pdp-shipping-info">
            Se lo compri ora lo ricevi{' '}
            <span class="vtex-rich-text-0-x-strong--pdp-shipping-info">
              {shippingDays}
            </span>
          </p>
        </div>
      )}
    </>
  )
}

export default SellerConsegna

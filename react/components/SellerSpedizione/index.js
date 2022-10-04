import { useProduct } from 'vtex.product-context'

const SellerSpedizione = () => {

    const [shippingInfo, setShippingInfo] = React.useState();
    const productContextValue = useProduct();   

    async function fetchData(product) {

        const info = await fetch("/api/checkout/pub/orderForms/simulation", {
            method: "post",
            body: JSON.stringify({
                items: [{
                    id: product.items[0].itemId,
                    quantity: '1',
                    seller: product.items[0].sellers[0].sellerId,
                }],
                country: 'ITA',
                postalCode: '00005021'
            }),
            headers: {'Content-Type': 'application/json'}
            })
            .then( resp => resp.json())
            .then( function(datajson) {
                const finalData = datajson;
                return finalData
            } )
             
            setShippingInfo(info); 

            return info

    }

    var toRender = false;

    if (productContextValue.product) {

        fetchData(productContextValue.product);

             if (shippingInfo) {

                var shippingDays = shippingInfo.logisticsInfo[0].slas[0].shippingEstimate;
                var toReplace = (shippingDays.includes("bd") ? "bd" : "d");
                shippingDays = shippingDays.replace(toReplace, " giorni lavorativi");
                var shippingPrice = shippingInfo.logisticsInfo[0].slas[0].price;

                if (shippingPrice === 0) {
                    shippingPrice = "gratuita";
                } else {
                    shippingPrice = `${(shippingPrice/100)?.toLocaleString('BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })} €`
                }

                toRender = true;
             }
             
    }
    

    return (
        <>
        {toRender ? (
        <div>
            <p class="vtex-rich-text-0-x-paragraph--pdp-shipping-info">Consegna stimata entro <span class="vtex-rich-text-0-x-strong--pdp-shipping-info">{shippingDays}</span><br></br>Spedizione <span class="vtex-rich-text-0-x-strong--pdp-shipping-info">{shippingPrice}</span></p>
        </div>
        ) : null}
        </>
    )
}

export default SellerSpedizione

import { useEffect } from 'react';
import { useProduct } from 'vtex.product-context'

const SellerConsegna = () => {

    const productContextValue = useProduct();

    const [shippingDays, setShippingDays] = React.useState();
    
    function formatShippingData (productShippingInfo) {     
        
        let [logisticsInfo] = productShippingInfo.logisticsInfo;
        let { shippingEstimate, price } = logisticsInfo.slas[0]
        let substringToReplace = (shippingEstimate.includes("bd") ? "bd" : "d");
        
        var shippingEstimateMin = parseInt(shippingEstimate.replace(substringToReplace, ""));
        var shippingEstimateMax = parseInt(shippingEstimate.replace(substringToReplace, ""))+2;
        console.log("Giorni:"+shippingEstimateMin+" "+shippingEstimateMax);
        var d1 = new Date();
        var d2 = new Date();
        d1.setDate(d1.getDate() + shippingEstimateMin);
        console.log(d1.toString());
        d2.setDate(d2.getDate() + shippingEstimateMax);
        console.log(d2.toString());

        shippingEstimate = shippingEstimate.replace(substringToReplace, " giorni lavorativi");
        
        setShippingDays(shippingEstimate); 
    }

    async function fetchProductShippingData(product) {

        const options = {
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
        }
        try {
            const productShippingInfo = await fetch("/api/checkout/pub/orderForms/simulation", options)
            .then( resp => resp.json())

            return productShippingInfo
        } catch(err) {
            console.error(err)
        }       
    }

    useEffect(() => {
        if (productContextValue.product) {
            fetchProductShippingData(productContextValue.product).then((info) => formatShippingData(info));                 
        }
    }, [])
    

    return (
        <>
        {shippingDays && (
        <div>
            <p class="vtex-rich-text-0-x-paragraph--pdp-shipping-info">Consegna stimata entro <span class="vtex-rich-text-0-x-strong--pdp-shipping-info">{shippingDays}</span></p>
        </div>
        )}
        </>
    )
}

export default SellerConsegna

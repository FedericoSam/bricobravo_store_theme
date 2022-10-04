import { useProduct } from 'vtex.product-context'

const SellerSpedizione = () => {

    const [shippingInfo, setShippingInfo] = React.useState();

    const productContextValue = useProduct();
    //console.log(productContextValue);

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
            
            console.log("fetchData", info)         
            setShippingInfo(info); 
            //var shipping = info.logisticsInfo[0].slas[0].shippingEstimate
            return info
        // const payload = {
        //     id:product.productId,
        //     quantity:1,
        //     seller:product.items[0].sellers[0].sellerName,
        //     country:"ITA"
        // }
        
        // const data = await fetch("/api/checkout/pub/orderForms/simulation",{method:"POST", body:payload}).then((response) => {
        //     if (response.ok) {
        //       return response.json();
        //     }
          
        //   console.log(response.body.json())
        //   }).then((d) => d.json())
        // console.info(data)
    }
    var toRender = false;
    if (productContextValue.product) {
        const infoData = fetchData(productContextValue.product);
        // if (info) {
        //     console.log("info")
            //  console.log("info", infoData)
             if (shippingInfo) {
                // console.log("ans",shippin.logisticsInfo[0].slas[0].shippingEstimate)
                var shippingDays = shippingInfo.logisticsInfo[0].slas[0].shippingEstimate.replace("bd", " giorni lavorativi");
                var shippingPrice = shippingInfo.logisticsInfo[0].slas[0].price;
                if (shippingPrice === 0) {
                    shippingPrice = "gratuita";
                } 
                toRender = true;
             }
             
        //     //var shippingEstimate = info.logisticsInfo[0].slas[0].shippingEstimate;
        // // var shippingEstimateNum = shippingEstimate.replace("bd"," giorni lavorativi");
        // }
        

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

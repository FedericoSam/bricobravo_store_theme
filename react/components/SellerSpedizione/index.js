import { useProduct } from 'vtex.product-context'

const SellerSpedizione = () => {

    const productContextValue = useProduct();
    console.log(productContextValue);

    async function fetchData(product) {
        const payload = {
            id:product.productId,
            quantity:1,
            seller:product.items[0].sellers[0].sellerName,
            country:"ITA"
        }
        
        const data = await fetch("/api/checkout/pub/orderForms/simulation",{method:"POST", body:payload}).then((response) => {
            if (response.ok) {
              return response.json();
            }
          
          console.log(response.body.json())
          }).then((d) => d.json())
        console.info(data)
    }

    if (productContextValue.product) {
        fetchData(productContextValue.product)
    }
    

    return (
        <div>
            MA OE!
        </div>
    )
}

export default SellerSpedizione

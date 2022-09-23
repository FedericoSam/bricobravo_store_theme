import React, { useEffect } from 'react'
// import { OrderForm } from 'vtex.order-manager'

export default function ClientInfoLogged() {

    // const { useOrderForm } = OrderForm
    // const { orderForm } = useOrderForm()
    // console.log("Rafa ", orderForm)

    function filterByEmailWishlist(email : string, wishlists : any) {
      const wishlistUser = wishlists.filter((wishlist : any) => wishlist.email === email);
       
      return wishlistUser[0].ListItemsWrapper[0].ListItems
    }

    function getLastProduct(listItens : any) {
      const sizeListItens = listItens.length
      if (sizeListItens == 0) return "Sem Favoritos" 
        return sizeListItens > 1 
          ? 
        [listItens[sizeListItens - 1], listItens[sizeListItens - 2]] 
          : 
        listItens[sizeListItens - 1]
        
    }

    async function getItensWishlist() {
    const options = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      try {
        const response : any = await fetch(`/api/dataentities/wishlist/search?_fields=_all`, options).then(res => res.json())
        console.log("Listaa", response)
        const wishlistUser = filterByEmailWishlist("ester.nobrega@b8one.com", response)
        
        return getLastProduct(wishlistUser)
      } catch(err) {
        console.error(err)
      }
    }

    useEffect(() => {
        async function teste() {          
            const resp = await getItensWishlist().then(res => res)
            const idproducts = await resp.map((ids : any) => ids.ProductId) 

            // const fetchWishProduct = idproducts.map( async (id : any) => {
            //   return await fetch(`api/catalog_system/pub/products/variations/${id}`).then(res => res.json())
            // })
            const featchWishProduct = await fetch(`api/catalog_system/pub/products/variations/${idproducts[0]}`).then(res => res.json())
            // const featchWishSecondProduct = await fetch(`api/catalog_system/pub/products/variations/${idproducts[1]}`).then(res => res.json())
            console.log(resp, idproducts, featchWishProduct)
            return resp
        } 
        teste().catch((error) => {console.log("Erro detectado", error)})
    }, [])
    

// Lógica para o útimo pedido 
    
// async function getLastPurchase() {
//   const options = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//     try {
//       const resp : any = await fetch(`api/orders/feed/config`, options).then(res => res.json())
//       console.log("Ola", resp)
//       // const wishlistUser = filterByEmailWishlist(orderForm.clientProfileData?.email, resp.wishLists)
//       // return getLastProduct(wishlistUser)
//     } catch(err) {
//       console.error(err)
//     }
//   }

//   useEffect(() => {
//     getLastPurchase()
//   }, [])

  return (
    <> </>
  )
}

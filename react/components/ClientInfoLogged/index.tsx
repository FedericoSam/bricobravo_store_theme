import React, { useEffect } from 'react'
import { OrderForm } from 'vtex.order-manager'

export default function ClientInfoLogged() {

    const { useOrderForm } = OrderForm
    const { orderForm } = useOrderForm()
    // console.log("Rafa ", orderForm)

    function filterByEmailWishlist(email : string, wishlists : any) {
      const wishlistUser = wishlists.filter((wishlist : any) => wishlist.email === email);
      return wishlistUser[0].listItemsWrapper[0].listItems
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
        const response : any = await fetch(`/_v/wishlist/export-lists`, options).then(res => res.json())
        const wishlistUser = filterByEmailWishlist(orderForm.clientProfileData?.email, response.wishLists)
        return getLastProduct(wishlistUser)
      } catch(err) {
        console.error(err)
      }
    }

    useEffect(() => {
        async function teste() {
            const response = await getItensWishlist().then(res => res)
            console.log(response) 
            return response
        } 
        teste().catch((error) => {console.log(error)})
    }, [])
    

  return (
    <div>ClientInfoLogged</div>
  )
}

export default async function ClientInfoLogged(
  emailUserLogged: string
): Promise<any> {
  // function filterByEmailWishlist(email: string, wishlists: any) {
  //   console.log(wishlists, "PARAMETRO UTILIZADO NO FILTRO", email, 'EMAIL DA CONTA LOGADA')
  //   const wishlistUser = wishlists.filter(
  //     (wishlist: any) => wishlist.email === email
  //   )
  //   return wishlistUser[0].ListItemsWrapper[0].ListItems
  // }

  function getLastProduct(listItens: any) {
    const sizeListItens = listItens.length

    if (sizeListItens === 0) return 'Sem Favoritos'

    return sizeListItens > 1
      ? [listItens[sizeListItens - 1], listItens[sizeListItens - 2]]
      : listItens[sizeListItens - 1]
  }

  async function getItensWishlist() {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const response: any = await fetch(
        `/api/dataentities/wishlist/search?_email=${emailUserLogged}`,
        options
      ).then((res) => res.json()).catch((err) => console.log(err))
      console.log(emailUserLogged, response, 'LISTAAAAAAAAAAAAAAAAA')
      // const wishlistUser = filterByEmailWishlist(emailUserLogged, response)

      // console.log(wishlistUser, 'WISHLIST DO USUSARIO LOGADO')

      return getLastProduct(response)
    } catch (err) {
      console.log(err)
    }
  }

  const resp = await getItensWishlist().then((res) => res)
  const idproducts = await resp.map((ids: any) => ids.ProductId)
  const featchWishProduct = await fetch(
    `api/catalog_system/pub/products/variations/${idproducts[0]}`
  ).then((res) => res.json())

  console.log(resp, idproducts, featchWishProduct)

  return resp
}

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

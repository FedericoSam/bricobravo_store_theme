

export default async function GetItemOrder(): Promise<any> {
  let lastOrderItem = {}
	const options = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const resp : any = await fetch(`api/oms/user/orders/`, options)
				.then(res => res.json())
      	console.log("ORDERS >>>>", resp)

			const lastOrderId = resp?.list[0].orderId;
			console.log("lastOrder", lastOrderId);

			const resp2 : any = await fetch(`api/oms/user/orders/${lastOrderId}`, options)
				.then(res => res.json())
				console.log("resp2", resp2)
				
				const imageUrlSmall = resp2.items[0].imageUrl;
				const imageUrl = imageUrlSmall.replace("55-55", "100-100")
				const detailUrl = resp2.items[0].detailUrl;
				
			lastOrderItem = {
				'detailUrl': detailUrl,	
				'imageUrl' : imageUrl
			}
						
			console.log('lastOrderItem', lastOrderItem)

    } catch(err) {
			console.error(err)
    }
		return lastOrderItem
}

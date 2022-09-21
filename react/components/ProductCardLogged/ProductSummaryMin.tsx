import React from 'react'
// import { Link } from 'react-router-dom'

interface ProductSummaryMinProps {
    linkProduct: string | any
    lastProductCart: string | any
    style: any
}

export default function ProductSummaryMin({
    style,  
    linkProduct, 
    lastProductCart, 
}:ProductSummaryMinProps) {
  return (
    <a className={style.linkCardProductLogged} href={`${linkProduct}`}>
         <img src={`https:${lastProductCart?.imageUrls?.at1x}`} alt={lastProductCart?.name} />
    </a>
  )
}

/////////////////////
// componente non utilizzato
import React from 'react'

const MantaCustomLinkPageProducts = ({ linkPageProducts }) => {
  return (
    <>
      <p>
        {linkPageProducts}
        {'testtest'}
      </p>
    </>
  )
}

MantaCustomLinkPageProducts.schema = {
  title: 'Custom Link Page Products',
  type: 'object',
  properties: {
    linkPageProducts: {
      type: 'string',
      title: 'Link Page Products',
      default: '',
    },
  },
}

export default MantaCustomLinkPageProducts

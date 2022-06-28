import React from 'react'
// import { useCssHandles } from 'vtex.css-handles'

import styles from './styles.css'

interface ILinkWrapperProps {
  href?: string
}

// const CSS_HANDLES = ['teste'] as const

const LinkWrapper: StorefrontFunctionComponent<ILinkWrapperProps> = ({
  children,
  href,
}) => {
  // const { handles } = useCssHandles(CSS_HANDLES)

  return (
    <>
      <a
        id="b8.linkWrapper"
        href={`${href}`}
        // className={`${handles.teste}`}
        className={styles.b8linkWrapper}
      >
        {children}
      </a>
    </>
  )
}

LinkWrapper.schema = {
  title: 'Link de Categorias',
  description: 'Link para a categoria',
  type: 'object',
  properties: {
    href: {
      title: 'Link',
      type: 'string',
      default: '/teste',
    },
  },
}

export default LinkWrapper

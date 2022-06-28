import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['stockContentWrapper'] as const

const StockContent: React.FC = ({ children }) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  return <div className={handles.stockContentWrapper}>{children}</div>
}

export default StockContent

import React, { useState } from 'react'
import ShowMoreText from 'react-show-more-text'

import styles from './styles.css'

const CustomShowMoreText: React.FC = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      <ShowMoreText
        className={styles.b8CustomShowMoreContainer}
        anchorClass={styles.b8CustomShowMore}
        lines={2}
        more="Ver mais"
        less="Ver menos"
        onClick={() => setIsExpanded(true)}
        expanded={isExpanded}
      >
        {children}
      </ShowMoreText>
    </>
  )
}

export default CustomShowMoreText

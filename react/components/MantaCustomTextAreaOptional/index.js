import React from 'react'
import style from './style.css'

const MantaCustomTextAreaOptional = ({
  textAreaON_OFF,
  titleArea,
  TextArea,
}) => {
  return (
    <>
      {textAreaON_OFF && textAreaON_OFF !== '' ? (
        <div className={style['containerTextArea']}>
          <p className={style['titleTextArea']}>{titleArea}</p>
          <TextArea />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
MantaCustomTextAreaOptional.schema = {
  title: 'Custom Text Area',
  type: 'object',
  properties: {
    textAreaON_OFF: {
      type: 'boolean',
      title: 'TextArea ON/OFF',
      default: false,
    },
    titleArea: {
      type: 'string',
      title: 'Title',
      default: 'Categorie Consigliate',
    },
  },
}
export default MantaCustomTextAreaOptional

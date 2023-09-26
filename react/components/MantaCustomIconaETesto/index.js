import React from 'react'
import style from './style.css'
import Icon1 from '../../../assets/icons/truck.png'

const MantaCustomIconaETesto = ({ mostraON_OFF, icona, testo }) => {
  return (
    <>
      {mostraON_OFF && (
        <div className={style['container']}>
          {icona && icona == '' ? (
            <img src={Icon1} alt="" className={style['icona']} />
          ) : (
            <img src={icona} alt="" className={style['icona']} />
          )}
          <p className={style['testo']}>{testo}</p>
        </div>
      )}
    </>
  )
}

MantaCustomIconaETesto.schema = {
  title: 'Custom Icona E Testo',
  type: 'object',
  properties: {
    mostraON_OFF: {
      type: 'boolean',
      title: 'Mostra componente ON/OFF',
      default: false,
    },

    icona: {
      default: '',
      title: 'Icona',
      widget: {
        'ui:widget': 'image-uploader',
      },
      type: 'string',
    },

    testo: {
      default: 'Spedizione Gratuita',
      title: 'Testo ',
      type: 'string',
    },
  },
}

export default MantaCustomIconaETesto

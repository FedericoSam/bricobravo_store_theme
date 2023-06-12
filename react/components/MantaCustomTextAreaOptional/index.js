import React from 'react'
import style from './style.css'

function parseString(inputString) {
  var result = []
  var pairs = inputString.split('*')

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('#')
    var text = pair[0]
    var link = pair[1]
    result.push({ text: text, link: link })
  }

  return result
}

const MantaCustomTextAreaOptional = ({
  TitleAreaConsigliate,
  textAreaON_OFF,
  textArea,
}) => {
  const textArea2 = textArea || ''
  var result = parseString(textArea2)

  return (
    <>
      {textAreaON_OFF ? (
        <div>
          <TitleAreaConsigliate />
          <div className={style['containerTextArea']}>
            {result.map((item, index) => (
              <a className={style['single-link']} key={index} href={item.link}>
                {item.text}
              </a>
            ))}{' '}
          </div>
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

    textArea: {
      type: 'string',
      title: 'Inserisci i link nel formato TESTO1#LINK1*TESTO2#LINK2',
      default: '',
      description: 'Inserisci il titolo della sezione',
    },
  },
}

export default MantaCustomTextAreaOptional

//ciao#/ciao ciao2#ciao2
//Piscine fuori terra#/piscine-e-accessori/piscine-fuori-terra*Piscina fuori terra legno#Piscinefuoriterrarivestite.it*Piscine per bambini#sbidds

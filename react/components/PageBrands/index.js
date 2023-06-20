import React, { useState, useEffect } from 'react'
import style from './style.css'

function PageBrands(props) {
  const [brands, setUser] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLetter, setSelectedLetter] = useState('')
  const [alphabet, setAlphabet] = useState([]) // Array per le iniziali
  const [brandList, setBrandList] = useState({}) // Oggetto per la lista di brand

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter)
  }

  // const handleLoading = () => {
  //   setLoading(false)
  // }

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false)
  //   }, 4000)
  //   return () => clearTimeout(timer)
  // }, [])

  const fetchData = () => {
    return fetch('/_v/brands')
      .then((response) => response.json())
      .then((data) => setUser(data), setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // Creazione dell'array di iniziali
    const initialSet = new Set() // Utilizzo di un Set per mantenere solo valori unici

    // Iterazione sui brand per ottenere le iniziali
    for (let brand of brands) {
      if (brand.isActive) {
        initialSet.add(brand.name.charAt(0).toUpperCase())
      }
    }

    // Ordinamento delle iniziali
    const sortedAlphabet = Array.from(initialSet).sort()

    // Aggiornamento dello stato con l'array di iniziali
    setAlphabet(sortedAlphabet)

    // Creazione del nuovo oggetto brandList
    const newBrandList = {}
    for (let letter of sortedAlphabet) {
      newBrandList[letter] = []
    }

    // Iterazione sui brand per popolare brandList con i brand corrispondenti
    for (let brand of brands) {
      if (brand.isActive) {
        const firstLetter = brand.name.charAt(0).toUpperCase()
        newBrandList[firstLetter].push(brand)
      }
    }

    // Aggiornamento dello stato con il nuovo oggetto brandList
    setBrandList(newBrandList)
  }, [brands])

  return (
    <div className={`${style['px-3']} ${style['px-md-0']}`}>
      <p
        onClick={() => window.scrollTo(0, 0)}
        className={style['back-to-top']}></p>

      {loading && (
        <div className={style['loading']}>
          <p>Caricamento... </p>
          <div className={style['test']}></div>
        </div>
      )}
      {/* Riassunto rubrica sopra */}
      <div className={style['alphabet-row']}>
        {alphabet.map((letter) => (
          <a
            href={`#${letter}`}
            className={`${style['letter-link']} ${
              selectedLetter === letter ? style['selected'] : ''
            }`}
            onClick={() => handleLetterClick(letter)}
            key={letter}>
            {letter}
          </a>
        ))}
      </div>
      {Object.keys(brandList).map((key) => (
        <div key={key}>
          <h3 className={style['h2']}>{key}</h3>
          <div id={key} className={style['row']}>
            <>
              {brandList[key].map((brandsObj, index) => {
                const brandName = brandsObj.name
                let createLinkBrand = brandName
                  .replace(/([\s+])|([+_])|([&_])|(['])|([.])|([!])/g, '-')
                  .toLowerCase()
                let brandLink = `/${createLinkBrand}/b`

                if (brandsObj.imageUrl != null) {
                  let brandImgUrl = `/arquivos/ids${brandsObj.imageUrl}`
                  return (
                    <div
                      key={index}
                      className={`${style['col-6']} ${style['col-md-4']} ${style['col-lg-3']} ${style['col-xl-2']}`}>
                      <a href={brandLink} className={style['brandLink']}>
                        <div className={style['brand-box']}>
                          <img
                            src={brandImgUrl}
                            alt={brandName}
                            title={brandName}
                            className={style['img-brand']}
                            width="180"
                            height="65"></img>
                        </div>
                        <p className={style['brand-p']}>{brandName}</p>
                      </a>
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={index}
                      className={`${style['col-6']} ${style['col-md-4']} ${style['col-lg-3']} ${style['col-xl-2']}`}>
                      <a href={brandLink} className={style['brandLink']}>
                        <div className={style['brand-box']}>
                          <div className={style['without-image']}>
                            {brandName}
                          </div>
                        </div>
                        <p className={style['brand-p']}>{brandName}</p>
                      </a>
                    </div>
                  )
                }
              })}
            </>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PageBrands

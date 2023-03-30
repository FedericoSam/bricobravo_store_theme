import React, { useState, useEffect } from 'react'
import style from './style.css'

function PageBrands(props) {
  const [brands, setUser] = useState([])
  const [loading, setLoading] = useState(true)

  const handleLoading = () => {
    //console.log('loading: ', loading)
    setLoading(false)
    //console.log('loading: ', loading)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const fetchData = () => {
    return fetch('/_v/brands')
      .then((response) => response.json())
      .then((data) => setUser(data))
  }
  useEffect(() => {
    fetchData()
  }, [])

  brands.sort((a, b) => a.name.localeCompare(b.name)) //ordine alfabetico
  //console.log('brands: ', brands);
  // Create a primative hashtable with the Alphabetized letter as your key.
  // Your value for that key, is a collection of the Names.
  var brandList = brands.reduce((brandList, brand) => {
    //var firstChar = brand.name.charAt(0).toUpperCase();
    var brandisActive = brand.isActive
    if (brandisActive == true) {
      if (brand.name.charAt(0).toUpperCase() in brandList) {
        // if the first letter in the name has already been recorded, then add it to the collection in that letter.
        brandList[brand.name.charAt(0).toUpperCase()].push(brand)
      } else {
        // if the first letter has yet to be added to the memo, add the letter and assign createa a new collection of names.
        // if( firstChar >= 0 && firstChar <= 9) {
        //   brandList[0]= [brand];
        // } else {
        brandList[brand.name.charAt(0).toUpperCase()] = [brand]
        // }
      }
    }
    return brandList
  }, [])
  //console.log('brandList: ', brandList)

  return (
    <div className={`${style['px-3']} ${style['px-md-0']}`}>
      {loading && (
        <div className={style['loading']}>
          <p>Caricamento... </p>
          <div className={style['test']}></div>

          {/* <svg
          width="100px"
          height="100px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
          d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
          stroke="#d82f94"
          stroke-width="2"
          stroke-linecap="round"
          style={{ animation: 'spin 2s linear infinite' }}
          />
        </svg> */}
        </div>
      )}
      {(() => {
        const arr = []
        for (var key in brandList) {
          arr.push(
            <div onLoad={handleLoading}>
              <h3 className={style['h2']}>{key}</h3>
              <div on className={style['row']}>
                <>
                  {
                    //brandList[key] && brandList[key].length > 0 && brandList[key].map((brandsObj, index) => {
                    brandList[key].map((brandsObj, index) => {
                      if (brandsObj.isActive == true) {
                        // console.log('brands: ',brandsObj.name);
                        const brandName = brandsObj.name
                        let createLinkBrand = brandName
                          .replace(
                            /([\s+])|([+_])|([&_])|(['])|([.])|([!])/g,
                            '-'
                          )
                          .toLowerCase() // trasforma i caratteri
                        let brandLink = `/${createLinkBrand}/b`

                        if (brandsObj.imageUrl != null) {
                          let brandImgUrl = `/arquivos/ids${brandsObj.imageUrl}`
                          return (
                            <div
                              key={index}
                              className={`${style['col-6']} ${style['col-md-4']} ${style['col-lg-3']} ${style['col-xl-2']}`}>
                              <a
                                href={brandLink}
                                className={style['brandLink']}>
                                <div className={style['brand-box']}>
                                  <img
                                    src={brandImgUrl}
                                    alt={brandName}
                                    title={brandName}
                                    className={style['img-brand']}
                                    width="180"
                                    height="65"></img>
                                  {/* <p className={style['brand-p']}>{brandName}</p> */}
                                </div>
                                <p className={style['brand-p']}>{brandName}</p>
                              </a>
                            </div>
                          )
                        } else {
                          return (
                            <div
                              className={`${style['col-6']} ${style['col-md-4']} ${style['col-lg-3']} ${style['col-xl-2']}`}>
                              <a
                                href={brandLink}
                                className={style['brandLink']}>
                                {/* <p className={style['brand-box']}>{brandName}</p> */}
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
                      }
                    })
                  }
                </>
              </div>
            </div>
          )
        }
        return arr
      })()}
    </div>
  )
}

export default PageBrands

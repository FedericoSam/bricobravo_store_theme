import React, { useState, useEffect } from 'react'
import style from './style.css'

function PageBrands(props) {
  const [brands, setUser] = useState([]);
  
  const fetchData = () => {
    return fetch("https://bricobravo.myvtex.com/api/catalog_system/pvt/brand/list")
          .then((response) => response.json())
          .then((data) => setUser(data));
  }
  useEffect(() => {
    fetchData();
  },[])

brands.sort((a, b) => a.name.localeCompare(b.name)); //ordine alfabetico
console.log('brands: ', brands);
// Create a primative hashtable with the Alphabetized letter as your key.
// Your value for that key, is a collection of the Names.
var brandList = brands.reduce((brandList, brand) => {
  //var firstChar = brand.name.charAt(0).toUpperCase();
  var brandisActive = brand.isActive;
  if( brandisActive == true) {
    if (brand.name.charAt(0).toUpperCase() in brandList) {             // if the first letter in the name has already been recorded, then add it to the collection in that letter.
      brandList[brand.name.charAt(0).toUpperCase()].push(brand);
    } 
    else {                                                       // if the first letter has yet to be added to the memo, add the letter and assign createa a new collection of names.  
      // if( firstChar >= 0 && firstChar <= 9) {
      //   brandList[0]= [brand]; 
      // } else {
        brandList[brand.name.charAt(0).toUpperCase()] = [brand]; 
      // }    
    }             
  }             

  return brandList;
}, []);
console.log('brandList: ', brandList);

return (
  <div className={`${style['px-3']} ${style['px-md-0']}`}>
    <>
        {(() => {
            const arr = [];
            for (var key in brandList) {
              arr.push(
                <div>
                    <h3 className={style['h2']}>{key}</h3>
                    <div className={style['row']}>
                      <>
                      {//brandList[key] && brandList[key].length > 0 && brandList[key].map((brandsObj, index) => {
                        brandList[key].map((brandsObj, index) => {
                          if (brandsObj.isActive == true){
                         // console.log('brands: ',brandsObj.name);
                          const brandName = brandsObj.name;
                          let createLinkBrand = brandName.replace(/([\s+])|([+_])|([&_])|(['])|([.])|([!])/g, '-').toLowerCase();  // trasforma i caratteri
                          let brandLink = `/${createLinkBrand}/b`;

                          if (brandsObj.imageUrl!=null) {
                            let brandImgUrl = `/arquivos/ids${brandsObj.imageUrl}`;
                            return (
                              <div className={`${style['col-6']} ${style['col-md-4']} ${style['col-lg-3']} ${style['col-xl-2']}`}>
                                <a href={brandLink} className={style['brandLink']}>
                                  <div className={style['brand-box']}>
                                    <img src={brandImgUrl} alt={brandName} title={brandName} className={style['img-brand']} width="180" height="65"></img>
                                    {/* <p className={style['brand-p']}>{brandName}</p> */}
                                  </div>
                                  <p className={style['brand-p']}>{brandName}</p>
                                </a>
                              </div>
                            )
                          } else {
                            return (
                              <div className={`${style['col-6']} ${style['col-md-4']} ${style['col-lg-3']} ${style['col-xl-2']}`}>
                                <a href={brandLink} className={style['brandLink']}>
                                  {/* <p className={style['brand-box']}>{brandName}</p> */}
                                  <div className={style['brand-box']}>
                                    <div className={style['without-image']}>{brandName}</div>
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
              );
            }
            return arr;
        })()}
    </>
  </div>
)

}

export default PageBrands

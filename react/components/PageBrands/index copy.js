import React,  { useState, useEffect, useRef } from 'react'

function PageBrands(props) {
  const [brands, setUser] = useState([]);
  const fetchData = () => {
    return fetch("/api/catalog_system/pvt/brand/list")
          .then((response) => response.json())
          .then((data) => setUser(data));
  }
  useEffect(() => {
    fetchData();
  },[])
  var lastChar = "";

  return (
      <div>
        {brands && brands.length > 0 && brands.map((brandsObj, index) => {
          let {isActiveIn} = brandsObj.isActive; 
          const brandName = brandsObj.name;
          let createLinkBrand = brandName.replace(/([\s+])|([+_])|([&_])|(['])|([.])|([!])/g, '-').toLowerCase();  // trasforma i caratteri
          let brandLink = `/${createLinkBrand}/b`;
          const sort = brands.sort((a, b) => a.name.localeCompare(b.name)); //ordine alfabetico

          // let char=brandName[0];
          // if (char !== lastChar) {
          //        if (lastChar !== ''){
           
          //         <p class="">{char}</p>
        
          //          lastChar = char;}
          //  }

          if (brandsObj.isActive == true){
            
            return ( 
            <p><a href={brandLink}>
                <span>{brandName}</span>
            </a></p>
            )
          }
           
        })}
      </div>
  );
 // return <p>prova</p>;
}

export default PageBrands

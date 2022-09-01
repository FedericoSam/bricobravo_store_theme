import React, { Fragment, useEffect } from 'react'
import headerImgMobile from '../../../assets/icons/logoHeaderMobile.svg'

const HeaderMobile = () => {

    // console.log(window.pageYOffset)
    // alert("Olá")
    // useEffect(() => {    
    //     const handleScroll = event => {
    //       console.log('window.scrollY', window.scrollY);    
    //     };    
    //         window.addEventListener('scroll', handleScroll);    
    //     return () => {
    //           window.removeEventListener('scroll', handleScroll);
    //     };  
    // }, []);


    window.onscroll = function() {
        headerScrollMobile()
        }
        
        function headerScrollMobile() {

        if (document.documentElement.scrollTop > 10) {
            document.querySelector('.vtex-flex-layout-0-x-flexColChild--header-mobile').classList.add('vtex-flex-layout-0-x-flexCol--active')
            document.querySelector('.logoImageMobileWrapper').classList.remove('vtex-flex-layout-0-x-flexCol--active')
        } else if (document.documentElement.scrollTop == 0){
            document.querySelector('.vtex-flex-layout-0-x-flexColChild--header-mobile').classList.remove('vtex-flex-layout-0-x-flexCol--active')
            document.querySelector('.logoImageMobileWrapper').classList.add('vtex-flex-layout-0-x-flexCol--active')
        }
    }

    // const delay = 1

    // useEffect(() => {
    //     alert('Olá')
    //     },
    //     []
    // );

    return (
        <Fragment>
            
                <div><a href='/'><img className='logoImageMobileWrapper' src={headerImgMobile}/></a></div> 

        </Fragment>
    )
}

export default HeaderMobile
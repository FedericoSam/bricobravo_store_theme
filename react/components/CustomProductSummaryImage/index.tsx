import React from 'react'
import { useProduct } from 'vtex.product-context'
import { useDevice } from 'vtex.device-detector'
import { Helmet } from 'vtex.render-runtime'
import Slider from 'react-slick'

import CustomImage from '../CustomImage'
import './style.css'

const CustomProductSummaryImage: React.FC = () => {
  const product = useProduct()

  const { isMobile } = useDevice()

  const selectedItem = product?.selectedItem

  const settings = {
    className: 'slider-width',
    adaptiveHeight: true,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 194,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    swipeToSlide: true,
    autoplay: false,
    //autoplaySpeed: 3000,
  }

  if (!selectedItem) {
    return null
  }

  return (
    <div onClick={function (e) {
      if (window.screen.width <= 1024) {
        e.preventDefault();
        e.stopPropagation();}
      }
      
      }>
      <Helmet>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <style type="text/css">
          {`
              .slick-dots {
                  position: static;
              }
          `}
        </style>
      </Helmet>
      {!isMobile ? (
        <CustomImage
          src={selectedItem.images[0].imageUrl}
          maxHeight={'194px'}
          alt={selectedItem.images[0].imageLabel}
          className={''}
          onError={() => {}}
        />
      ) : (
        <div style={{ paddingBottom: '1rem' }}>
          <Slider {...settings}>
            {selectedItem?.images.slice(0, 3).map((image) => {
              return (
                <div>
                  <CustomImage
                    src={image.imageUrl}
                    maxHeight={'194px'}
                    alt={image.imageLabel}
                    className={''}
                    onError={() => {}}
                  />
                </div>
              )
            })}
          </Slider>
        </div>
      )}
    </div>
  )
}

export default CustomProductSummaryImage

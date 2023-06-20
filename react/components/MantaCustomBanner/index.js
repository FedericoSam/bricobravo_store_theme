import React from 'react'
import style from './style.css'

const MantaCustomBanner = ({ bannerDesktop, bannerMobile, bannerON_OFF }) => {
  return (
    <>
      {bannerMobile && bannerMobile !== '' && bannerON_OFF ? (
        <div className={style['containerBannerMobile']}>
          <img
            src={bannerMobile}
            alt="Edit banner"
            className={style['bannerImgMobile']}
          />
        </div>
      ) : (
        <></>
      )}
      {bannerDesktop && bannerDesktop !== '' && bannerON_OFF ? (
        <div className={style['containerBannerDesktop']}>
          <img
            src={bannerDesktop}
            alt="Edit banner"
            className={style['bannerImgDesktop']}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

MantaCustomBanner.schema = {
  title: 'Custom Banner',
  type: 'object',
  properties: {
    bannerON_OFF: {
      type: 'boolean',
      title: 'Banner ON/OFF',
      default: false,
    },

    bannerMobile: {
      default: '',
      title: 'Mobile banner ',
      widget: {
        'ui:widget': 'image-uploader',
      },
      type: 'string',
    },

    bannerDesktop: {
      default: '',
      title: 'Desktop banner ',
      widget: {
        'ui:widget': 'image-uploader',
      },
      type: 'string',
    },
  },
}

export default MantaCustomBanner

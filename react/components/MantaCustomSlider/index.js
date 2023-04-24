import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import style from './style.css'

import { NoSSR } from 'vtex.render-runtime'

const MantaCustomSlider = ({
  AddImage1,
  AddImage2,
  AddImage3,
  AddImage4,
  AddImage5,
  AddImage6,
  AddVideo1,
  AddVideo2,
  isVideoBlocco1,
  isVideoBlocco2,
}) => {
  return (
    <>
      <NoSSR
        onSSR={
          <div style={{ margin: 'auto', textAlign: 'center' }}>Loading...</div>
        }>
        <Swiper className={style['container']} loop={true}>
          {/* Blocco 1 */}
          {isVideoBlocco1 ? (
            <SwiperSlide>
              <div className={style['video']}>
                <AddVideo1 />
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide>
              <div className={style['image']}>
                <AddImage1 />
              </div>
            </SwiperSlide>
          )}
          {/* Blocco 2 */}
          {isVideoBlocco2 ? (
            <SwiperSlide>
              <div className={style['video']}>
                <AddVideo2 />
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide>
              <div className={style['image']}>
                <AddImage2 />
              </div>
            </SwiperSlide>
          )}
          {/* Blocco 3 */}
          <SwiperSlide>
            <div className={style['image']}>
              <AddImage3 />
            </div>
          </SwiperSlide>
          {/* Blocco 4 */}
          <SwiperSlide>
            <div className={style['image']}>
              <AddImage4 />
            </div>
          </SwiperSlide>
          {/* Blocco 5 */}
          <SwiperSlide>
            <div className={style['image']}>
              <AddImage5 />
            </div>
          </SwiperSlide>
          {/* Blocco 6 */}
          <SwiperSlide>
            <div className={style['image']}>
              <AddImage6 />
            </div>
          </SwiperSlide>
        </Swiper>
      </NoSSR>
    </>
  )
}

MantaCustomSlider.schema = {
  title: 'editor.MantaCustomSlider',
  description: 'editor.MantaCustomSlider',
  type: 'object',
  properties: {
    isVideoBlocco1: {
      type: 'boolean',
      title: 'Is Video 1',
      default: false,
      description:
        "Seleziona se il primo blocco nello slider sarà un'immagine o un video",
    },
    isVideoBlocco2: {
      type: 'boolean',
      title: 'Is Video 2',
      default: false,
      description:
        "Seleziona se il secondo blocco nello slider sarà un'immagine o un video",
    },
  },
}

export default MantaCustomSlider

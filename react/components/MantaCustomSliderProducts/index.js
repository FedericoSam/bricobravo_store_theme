import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import style from './style.css'
import { NoSSR } from 'vtex.render-runtime'
import { FreeMode, Pagination } from 'swiper'

function parseCss(css) {
  return css
    .split(';')
    .filter(Boolean)
    .reduce((acc, propertyValue) => {
      const [property, value] = propertyValue.split(':').map((s) => s.trim())
      return { ...acc, [property]: value }
    }, {})
}
const MantaCustomSliderProducts = ({
  Test,
  TitleProducts,
  SubtitleProducts,
  SliderProductImage1,
  SliderProductImage2,
  SliderProductImage3,
  SliderProductImage4,
  SliderProductImage5,
  SliderProductImage6,
  SliderProductVideo1,
  SliderProductVideo2,
  SliderProductVideo3,
  SliderProductVideo4,
  isVideoProducts1,
  isVideoProducts2,
  isVideoProducts3,
  isVideoProducts4,
  isFreeMode,
  isLoop,
  isGrabCursor,
  isButtonsVisible,
  TitleFra,
  CSSTitleFra,
  SubtitleFra,
  CSSSubtitleFra,
}) => {
  const CSSTitle = CSSTitleFra || ''
  const CSSSubtitle = CSSSubtitleFra || ''
  const Title = TitleFra || ''
  const Subtitle = SubtitleFra || ''
  return (
    <div className={style['main']}>
      <NoSSR
        onSSR={
          <div style={{ margin: 'auto', textAlign: 'center' }}>Loading...</div>
        }>
        {/* <Test /> */}
        <TitleProducts />
        <SubtitleProducts />
        {/* <p>{CSSTitle}</p> */}
        {console.log(CSSTitle)}
        <div style={parseCss(String(CSSTitle))} className={style['title']}>
          {Title}
        </div>
        {/* <div style={parseCss(CSSSubtitle)} className={style['subtitle']}>
          {Subtitle}
        </div> */}
        <Swiper
          className={style['container']}
          loop={isLoop}
          freeMode={isFreeMode}
          grabCursor={isGrabCursor}
          pagination={
            isButtonsVisible
              ? {
                  type: 'bullets',
                  verticalClass: 'swiper-pagination-vertical',
                  clickable: true,
                }
              : false
          }
          modules={[FreeMode, Pagination]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: { slidesPerView: 3, spaceBetween: 15 },
            640: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}>
          {/* Blocco 1 */}
          {isVideoProducts1 ? (
            <SwiperSlide>
              <div className={style['video']}>
                <SliderProductImage1 />
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide>
              <div className={style['image']}>
                <SliderProductVideo1 />
              </div>
            </SwiperSlide>
          )}
          {/* Blocco 2 */}
          {isVideoProducts2 ? (
            <SwiperSlide>
              <div className={style['video']}>
                <SliderProductImage2 />
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide>
              <div className={style['image']}>
                <SliderProductVideo2 />
              </div>
            </SwiperSlide>
          )}
          {/* Blocco 3 */}
          {isVideoProducts3 ? (
            <SwiperSlide>
              <div className={style['video']}>
                <SliderProductImage3 />
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide>
              <div className={style['image']}>
                <SliderProductVideo3 />
              </div>
            </SwiperSlide>
          )}
          {/* Blocco 4 */}
          {isVideoProducts4 ? (
            <SwiperSlide>
              <div className={style['video']}>
                <SliderProductImage4 />
              </div>
            </SwiperSlide>
          ) : (
            <SwiperSlide>
              <div className={style['image']}>
                <SliderProductVideo4 />
              </div>
            </SwiperSlide>
          )}
          <SwiperSlide>
            <div className={style['image']}>
              <SliderProductImage5 />
            </div>
          </SwiperSlide>
          {/* Blocco 6 */}
          <SwiperSlide>
            <div className={style['image']}>
              <SliderProductImage6 />
            </div>
          </SwiperSlide>
        </Swiper>
      </NoSSR>
    </div>
  )
}

MantaCustomSliderProducts.schema = {
  title: 'editor.MantaCustomSliderProducts',
  description: 'editor.MantaCustomSliderProducts',
  type: 'object',
  properties: {
    isVideoProducts1: {
      type: 'boolean',
      title: 'Put Video in card 1',
      default: false,
      description:
        "Seleziona se il primo blocco nello slider sarà un'immagine o un video",
    },
    isVideoProducts2: {
      type: 'boolean',
      title: 'Put Video in card 2',
      default: true,
      description:
        "Seleziona se il secondo blocco nello slider sarà un'immagine o un video",
    },
    isVideoProducts3: {
      type: 'boolean',
      title: 'Put Video in card 3',
      default: true,
      description:
        "Seleziona se il terzo blocco nello slider sarà un'immagine o un video",
    },
    isVideoProducts4: {
      type: 'boolean',
      title: 'Put Video in card 3',
      default: true,
      description:
        "Seleziona se il quarto blocco nello slider sarà un'immagine o un video",
    },
    isFreeMode: {
      type: 'boolean',
      title: 'Free Mode ',
      default: false,
      description:
        'Abilita lo scorrimento libero delle slides, non una per volta',
    },
    isLoop: {
      type: 'boolean',
      title: 'Slide Loop',
      default: false,
      description: 'Le slides si ripetono in modo infinito',
    },

    isGrabCursor: {
      type: 'boolean',
      title: 'Grab Hand Cursor',
      default: false,
      description: 'Fa comparire il cursore a forma di mano',
    },
    isButtonsVisible: {
      type: 'boolean',
      title: 'Navigation Buttons Visible',
      default: false,
      description: 'Mostra i bottoni di navigazione',
    },
    TitleFra: {
      title: 'Title',
      description: 'Title of the slider',
      type: 'string',
      default: 'Title example',
    },
    SubtitleFra: {
      title: 'Subtitle',
      description: 'Subtitle of the slider',
      type: 'string',
      default: 'Subtitle example',
    },
    CSSTitleFra: {
      title: 'CSS Title',
      description: 'CSS to be applied to the Title text',
      type: 'string',
      default:
        'font-size: 2.25rem; font-weight: 600; margin-bottom: 1rem; letter-spacing: 0.1em;',
    },
    CSSSubtitleFra: {
      title: 'CSS Subtitle',
      description: 'CSS to be applied to the Subtitle text',
      type: 'string',
      default:
        'font-size: 1rem; font-weight: 400; margin-bottom: 1rem; letter-spacing: 0.1em; color:gray;',
    },
  },
}

export default MantaCustomSliderProducts

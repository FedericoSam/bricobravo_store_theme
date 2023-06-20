import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import style from './style.css'
import { NoSSR } from 'vtex.render-runtime'
import { FreeMode, Pagination } from 'swiper'
import { Helmet } from 'vtex.render-runtime'

const MantaCustomSliderProducts = ({
  isFreeMode,
  isLoop,
  isGrabCursor,
  isButtonsVisible,
  slide1,
  slide2,
  slide3,
  slide4,
  slide5,
  slide6,
}) => {
  return (
    <>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
        />
      </Helmet>
      <div className={style['main']}>
        <NoSSR
          onSSR={
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              Loading...
            </div>
          }>
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
            <SwiperSlide>
              <div className={style['container-slide']}>
                <p> test </p>
                <img src={slide1} className={style['img-slide']} />
              </div>
            </SwiperSlide>

            {/* Blocco 2 */}
            <SwiperSlide>
              <div className={style['container-slide']}>
                <p> test </p>
                <img src={slide2} className={style['img-slide']} />
              </div>
            </SwiperSlide>

            {/* Blocco 3 */}
            <SwiperSlide>
              <div className={style['container-slide']}>
                <p> test </p>
                <img src={slide3} className={style['img-slide']} />
              </div>
            </SwiperSlide>

            {/* Blocco 4 */}
            <SwiperSlide>
              <div className={style['container-slide']}>
                <p> test </p>
                <img src={slide4} className={style['img-slide']} />
              </div>
            </SwiperSlide>

            {/* Blocco 5 */}
            <SwiperSlide>
              <div className={style['container-slide']}>
                <p> test </p>
                <img src={slide5} className={style['img-slide']} />
              </div>
            </SwiperSlide>
            {/* Blocco 6 */}
            <SwiperSlide>
              <div className={style['container-slide']}>
                <p> test </p>
                <img src={slide6} className={style['img-slide']} />
              </div>
            </SwiperSlide>
          </Swiper>
        </NoSSR>
      </div>
    </>
  )
}

MantaCustomSliderProducts.schema = {
  title: 'editor.Manta Custom Slider Servizi a Disposizione',
  description: 'anta Custom Slider Servizi a Disposizione',
  type: 'object',
  properties: {
    isFreeMode: {
      type: 'boolean',
      title: 'Free Mode running slider',
      default: false,
      description:
        'Abilita lo scorrimento libero delle slides, non una per volta',
    },
    isLoop: {
      type: 'boolean',
      title: 'Slide Loop',
      default: true,
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
    slide1: {
      default: '',
      title: 'Slide 1',
      widget: {
        'ui:widget': 'image-uploader',
      },
      type: 'string',
    },
    slide2: {
      default: 'assets/icons/department-shelf/plant.svg',
      title: 'Slide 2',
      widget: {
        'ui:widget': 'image-uploader',
      },
      type: 'string',
    },
    slide3: {
      default: 'assets/icons/department-shelf/plant.svg',
      title: 'Slide 3',
      widget: {
        'ui:widget': 'image-uploader',
      },
      type: 'string',
    },
    slide4: {
      default: 'assets/icons/department-shelf/plant.svg',
      title: 'Slide 4',
      widget: {
        'ui:widget': 'image-uploader',
      },
      type: 'string',
    },
    slide5: {
      default: 'assets/icons/department-shelf/plant.svg',
      title: 'Slide 5',
      widget: {
        'ui:widget': 'image-uploader',
      },
      type: 'string',
    },
    slide6: {
      default: 'assets/icons/department-shelf/plant.svg',
      title: 'Slide 6',
      widget: {
        'ui:widget': 'image-uploader',
        'ui:options': {
          accept: ['image/*', 'video/*'],
        },
      },
      type: 'string',
    },
  },
}

export default MantaCustomSliderProducts

import React, { useState, useEffect, useRef } from 'react'
import style from './style.css'
import { Link } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { Icon } from 'vtex.store-icons'
import arrowRight from '../../../assets/icons/arrowRightGray.svg'
import IconExample from '../../../assets/icons/iconExample.svg'
import Icon1 from '../../../assets/icons/menu-mobile/1-icone-menu.jpg'
import Icon2 from '../../../assets/icons/menu-mobile/2-icone-menu.svg'
import Icon3 from '../../../assets/icons/menu-mobile/3-icone-menu.svg'
import Icon4 from '../../../assets/icons/menu-mobile/4-icone-menu.svg'
import Icon5 from '../../../assets/icons/menu-mobile/5-icone-menu.svg'
import Icon6 from '../../../assets/icons/menu-mobile/6-icone-menu.svg'
import Icon7 from '../../../assets/icons/menu-mobile/7-icone-menu.svg'
import Icon8 from '../../../assets/icons/menu-mobile/8-icone-menu.svg'
import Icon9 from '../../../assets/icons/menu-mobile/9-icone-menu.svg'
import Icon10 from '../../../assets/icons/menu-mobile/10-icone-menu.svg'
import Icon11 from '../../../assets/icons/menu-mobile/11-icone-menu.svg'
import Icon12 from '../../../assets/icons/menu-mobile/12-icone-menu.svg'
import Icon13 from '../../../assets/icons/menu-mobile/13-icone-menu.svg'
import Icon14 from '../../../assets/icons/menu-mobile/14-icone-menu.svg'
import Icon15 from '../../../assets/icons/menu-mobile/15-icone-menu.svg'
import Icon16 from '../../../assets/icons/menu-mobile/16-icone-menu.svg'

import { usePixel } from 'vtex.pixel-manager/PixelContext'

const CustomMegaMenu = ({ menuFirstLevel, linkUtil }) => {
  const node = useRef()
  const { isMobile } = useDevice()
  const [isOpen, setIsOpen] = useState()
  const [megamenu, setMegaMenu] = useState()
  const [whatSubCategoryIsOpen, setWhatSubCategoryIsOpen] = useState('')
  const { push } = usePixel()

  useEffect(() => {
    // add when mounted
    !isMobile && document.addEventListener('click', handleClickOutsideMenu)

    // return function to be called when unmounted
    return () => {
      !isMobile && document.removeEventListener('click', handleClickOutsideMenu)
    }
  }, [])

  const handleClickOutsideMenu = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    setIsOpen(false)
    setIsSubmenuOpen(false)
  }

  const handleToggleMenu = (index, text) => {
    push({
      event: 'menu_selection',
      menu_item: text,
    })

    setIsOpen(true)
    setMegaMenu(index)
  }

  const mobileHandleToggleMenu = (index, text) => {
    push({
      event: 'menu_selection',
      menu_item: text,
    })

    if (isOpen && megamenu == index) {
      setIsOpen(false)
      setMegaMenu()
    } else if (isOpen && megamenu != index) {
      setIsOpen(true)
      setMegaMenu(index)
    } else {
      setIsOpen(true)
      setMegaMenu(index)
    }
  }

  return !isMobile ? (
    <>
      <nav className={style['top-navigation']}>
        <h2 className={style['title-name']}>Prodotti</h2>
        <div className={style['container']}>
          <ul className={style['menu-department']}>
            {menuFirstLevel?.map(({ text, iconMobile }, index) => {
              return (
                <li
                  key={index}
                  className={`${style['menu-header-category']} ${
                    megamenu == index && isOpen
                      ? style['menu-header-category--active']
                      : style['']
                  }`}
                  onClick={() => mobileHandleToggleMenu(index, text)}>
                  <div className={style['menu-icon-container']}>
                    <img
                      src={iconMobile}
                      className={style['category-menu-item-icon']}
                    />
                    <p className={style['category-menu-item']}>{text}</p>
                  </div>
                  <i
                    className={`${style['category-menu-arrow']} ${
                      megamenu == index && isOpen
                        ? style['category-menu-arrow--active']
                        : style['']
                    }`}></i>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {menuFirstLevel?.map(
        ({ link, text, iconMobile, menuSecondLevel }, index) => {
          return isOpen && index == megamenu ? (
            <div key={index} className={style['mega-menu']}>
              <div className={style['mega-menu-title-link']}>
                <h2
                  className={style['mega-menu-title']}
                  onClick={() => setIsOpen(false)}>
                  {text}
                </h2>
                <Link to={link} className={style['mega-menu-link']}>
                  Vedi tutti i prodotti
                </Link>
              </div>

              <ul className={style['mega-menu-items']}>
                {menuSecondLevel?.map(
                  ({ title, link, subCategories }, index) => {
                    if (subCategories?.length > 0) {
                      return (
                        <>
                          <li
                            key={index}
                            className={style['menu-header-category']}
                            onClick={() => setWhatSubCategoryIsOpen(title)}>
                            <p className={style['category-menu-item']}>
                              {title}
                            </p>
                            <i className={style['category-menu-arrow']}></i>
                          </li>
                          <div
                            className={
                              whatSubCategoryIsOpen === title
                                ? style['subcategory-menu-items']
                                : style['subcategory-hidden']
                            }>
                            <h5
                              className={style['mega-menu-title']}
                              onClick={() => setWhatSubCategoryIsOpen('')}>
                              {title}
                            </h5>
                            <Link to={link} className={style['mega-menu-link']}>
                              Vedi tutti i prodotti
                            </Link>
                            <ul className={style['subcategory-overflow']}>
                              {subCategories?.map(({ text, link }, ind) => {
                                return whatSubCategoryIsOpen &&
                                  title === whatSubCategoryIsOpen ? (
                                  <>
                                    <li
                                      key={ind}
                                      className={`${style['menu-header-subcategory']}`}
                                      onClick={() => {
                                        setWhatSubCategoryIsOpen('')
                                        setIsOpen(false)
                                      }}>
                                      <Link
                                        className={style['category-menu-item']}
                                        to={link}>
                                        {text}
                                      </Link>
                                    </li>
                                  </>
                                ) : null
                              })}
                            </ul>
                          </div>
                        </>
                      )
                    } else {
                      return (
                        <>
                          <li
                            key={index}
                            className={style['menu-header-category']}
                            onClick={() => setWhatSubCategoryIsOpen(title)}>
                            {link ? (
                              <a
                                alt={title}
                                title={title}
                                href={link}
                                className={style['category-menu-item']}>
                                <p>{title}</p>
                              </a>
                            ) : (
                              <p className={style['category-menu-item']}>
                                {title}
                              </p>
                            )}
                          </li>
                        </>
                      )
                    }
                  }
                )}
              </ul>
            </div>
          ) : null
        }
      )}
    </>
  ) : (
    <>
      <nav className={style['mobile-top-navigation']}>
        <h2 className={style['mobile-title-name']}>Prodotti</h2>
        <div className={style['container']}>
          <ul className={style['mobile-menu-department']}>
            {menuFirstLevel?.map(({ text, iconMobile }, index) => {
              return (
                <li
                  key={index}
                  className={`${style['mobile-menu-header-category']} ${
                    megamenu == index && isOpen
                      ? style['mobile-menu-header-category--active']
                      : style['']
                  }`}
                  onClick={() => mobileHandleToggleMenu(index, text)}>
                  <div className={style['mobile-menu-icon-container']}>
                    <img
                      src={iconMobile}
                      className={style['category-menu-item-icon']}
                    />
                    <p className={style['category-menu-item']}>{text}</p>
                  </div>
                  <i
                    className={`${style['category-menu-arrow']} ${
                      megamenu == index && isOpen
                        ? style['category-menu-arrow--active']
                        : style['']
                    }`}></i>
                </li>
              )
            })}
            {linkUtil?.map(({ titleLinkUtil, links }) => (
              <div className={`${style['link-utili-container']}`}>
                <h3>{titleLinkUtil}</h3>
                {links?.map(({ link, text }) => (
                  <li>
                    <Link
                      to={link}
                      className={`${style['category-menu-item']}`}>
                      {text}
                    </Link>
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </nav>

      {menuFirstLevel?.map(
        ({ link, text, iconMobile, menuSecondLevel }, index) => {
          return isOpen && index == megamenu ? (
            <div key={index} className={style['mobile-mega-menu']}>
              <h2
                className={style['mobile-mega-menu-title']}
                onClick={() => setIsOpen(false)}>
                {text}
              </h2>
              <Link to={link} className={style['mobile-mega-menu-link']}>
                Vedi tutti i prodotti
              </Link>
              <ul className={style['mobile-mega-menu-items']}>
                {menuSecondLevel?.map(
                  ({ title, link, subCategories }, index) => {
                    if (subCategories?.length > 0) {
                      return (
                        <>
                          <li
                            key={index}
                            className={style['mobile-menu-header-category']}
                            onClick={() => setWhatSubCategoryIsOpen(title)}>
                            <p className={style['category-menu-item']}>
                              {title}
                            </p>
                            <i className={style['category-menu-arrow']}></i>
                          </li>
                          <div
                            className={
                              whatSubCategoryIsOpen === title
                                ? style['mobile-subcategory-menu-items']
                                : style['subcategory-hidden']
                            }>
                            <h5
                              className={style['mobile-mega-menu-title']}
                              onClick={() => setWhatSubCategoryIsOpen('')}>
                              {title}
                            </h5>
                            <Link
                              to={link}
                              className={style['mobile-mega-menu-link']}>
                              Vedi tutti i prodotti
                            </Link>
                            <ul
                              className={style['mobile-subcategory-overflow']}>
                              {subCategories?.map(({ text, link }, ind) => {
                                return whatSubCategoryIsOpen &&
                                  title === whatSubCategoryIsOpen ? (
                                  <>
                                    <li
                                      key={ind}
                                      className={`${style['mobile-menu-header-subcategory']}`}
                                      onClick={() => {
                                        setWhatSubCategoryIsOpen('')
                                        setIsOpen(false)
                                      }}>
                                      <Link
                                        className={style['category-menu-item']}
                                        to={link}>
                                        {text}
                                      </Link>
                                    </li>
                                  </>
                                ) : null
                              })}
                            </ul>
                          </div>
                        </>
                      )
                    } else {
                      return (
                        <>
                          <li
                            key={index}
                            className={style['mobile-menu-header-category']}
                            onClick={() => setWhatSubCategoryIsOpen(title)}>
                            {link ? (
                              <a
                                alt={title}
                                title={title}
                                href={link}
                                className={style['category-menu-item']}>
                                <p className={style['category-menu-item']}>
                                  {title}
                                </p>
                              </a>
                            ) : (
                              <p className={style['category-menu-item']}>
                                {title}
                              </p>
                            )}
                          </li>
                        </>
                      )
                    }
                  }
                )}
              </ul>
            </div>
          ) : null
        }
      )}
    </>
  )
}

// Caso o componente não receba nenhuma props ele vai usar essas como default
CustomMegaMenu.defaultProps = {
  menuFirstLevel: [
    {
      link: '/offerte-imperdibili',
      text: 'Offerte IMPERDIBILI',
      iconMobile: Icon1,
      // menuSecondLevel: [
      //   {
      //     title: 'Raccolta olive',
      //     link: '#',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Accessori giardinaggio',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Ferramenta',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Aredo',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Raccolta olive',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Accessori giardinaggio',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Ferramenta',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Aredo',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Raccolta olive',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Accessori giardinaggio',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Ferramenta',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Aredo',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Raccolta olive',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Accessori giardinaggio',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Ferramenta',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Aredo',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Raccolta olive',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Accessori giardinaggio',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Ferramenta',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Aredo',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Raccolta olive',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Accessori giardinaggio',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Ferramenta',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Aredo',
      //     subCategories: [
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //       {
      //         text: 'Lorem ipsum dolor sit amet',
      //         link: '#',
      //       },
      //     ],
      //   },
      // ],
      menuSecondLevelImage: '',
    },
    {
      link: '/arredo-casa',
      text: 'Arredo Casa',
      iconMobile: Icon2,
      menuSecondLevel: [
        {
          title: 'Camera da letto',
          link: '/arredo-casa/camera-da-letto',
          subCategories: [
            {
              text: 'Armadi camera da letto',
              link: '/arredo-casa/camera-da-letto/armadi-camera-da-letto',
            },
            {
              text: 'Materassi',
              link: '/arredo-casa/camera-da-letto/materassi',
            },
            {
              text: 'Letti',
              link: '/arredo-casa/camera-da-letto/letti',
            },
            {
              text: 'Reti letto e doghe',
              link: '/arredo-casa/camera-da-letto/reti-letto-e-doghe',
            },
            {
              text: 'Comodini camera da letto',
              link: '/arredo-casa/camera-da-letto/comodini-camera-da-letto',
            },
            {
              text: 'Cassettiere camera da letto',
              link: '/arredo-casa/camera-da-letto/cassettiere-camera-da-letto',
            },
            {
              text: 'Cuscini',
              link: '/arredo-casa/camera-da-letto/cuscini',
            },
            {
              text: 'Topper',
              link: '/arredo-casa/camera-da-letto/topper',
            },
          ],
        },
        {
          title: 'Cameretta',
          link: '/arredo-casa/cameretta',
          subCategories: [
            {
              text: 'Armadi cameretta',
              link: '/arredo-casa/cameretta/armadi-cameretta',
            },
            {
              text: 'Letti per cameretta',
              link: '/arredo-casa/cameretta/letti-per-cameretta',
            },
            {
              text: 'Materassi e cuscini cameretta',
              link: '/arredo-casa/cameretta/materassi-e-cuscini-cameretta',
            },
            {
              text: 'Reti letto e doghe per cameretta',
              link: '/arredo-casa/cameretta/reti-letto-e-doghe-per-cameretta',
            },
            {
              text: 'Comodini cameretta',
              link: '/arredo-casa/cameretta/comodini-cameretta',
            },
            {
              text: 'Cassettiere cameretta',
              link: '/arredo-casa/cameretta/cassettiere-cameretta',
            },
          ],
        },
        {
          title: 'Cucina',
          link: '/arredo-casa/cucina',
          subCategories: [
            {
              text: 'Accessori cucina',
              link: '/arredo-casa/cucina/accessori-cucina',
            },
            {
              text: 'Mobili cucina',
              link: '/arredo-casa/cucina/mobili-cucina',
            },
            {
              text: 'Rubinetti lavello',
              link: '/arredo-casa/cucina/rubinetti-lavello',
            },
            {
              text: 'Cantinette vino',
              link: '/arredo-casa/cucina/cantinette-vino',
            },
            {
              text: 'Lavelli cucina',
              link: '/arredo-casa/cucina/lavelli-cucina',
            },
            {
              text: 'Tavoli cucina',
              link: '/arredo-casa/cucina/tavoli-cucina',
            },
            {
              text: 'Sedie cucina',
              link: '/arredo-casa/cucina/sedie-cucina',
            },
            {
              text: 'Tessili cucina',
              link: '/arredo-casa/cucina/tessili-cucina',
            },
          ],
        },
        {
          title: 'Soggiorno',
          link: '/arredo-casa/soggiorno',
          subCategories: [
            {
              text: 'Poltrone',
              link: '/arredo-casa/soggiorno/poltrone',
            },
            {
              text: 'Mobili soggiorno',
              link: '/arredo-casa/soggiorno/mobili-soggiorno',
            },
            {
              text: 'Librerie',
              link: '/arredo-casa/soggiorno/librerie',
            },
            {
              text: 'Panche contenitori',
              link: '/arredo-casa/soggiorno/panche-contenitori',
            },
            {
              text: 'Pareti attrezzate',
              link: '/arredo-casa/soggiorno/pareti-attrezzate',
            },
            {
              text: 'Porta tv',
              link: '/arredo-casa/soggiorno/porta-tv',
            },
            {
              text: 'Tavolini',
              link: '/arredo-casa/soggiorno/tavolini',
            },
            {
              text: 'Divani',
              link: '/arredo-casa/soggiorno/divani',
            },
            {
              text: 'Pouf',
              link: '/arredo-casa/soggiorno/pouf',
            },
          ],
        },
        {
          title: 'Arredo bagno',
          link: '/arredo-casa/arredo-bagno',
          subCategories: [
            {
              text: 'Accessori bagno',
              link: '/arredo-casa/arredo-bagno/accessori-bagno',
            },
            {
              text: 'Accessori doccia',
              link: '/arredo-casa/arredo-bagno/accessori-doccia',
            },
            {
              text: 'Piatti doccia',
              link: '/arredo-casa/arredo-bagno/piatti-doccia',
            },
            {
              text: 'Box doccia',
              link: '/arredo-casa/arredo-bagno/box-doccia',
            },
            {
              text: 'Mobili bagno',
              link: '/arredo-casa/arredo-bagno/mobili-bagno',
            },
            {
              text: 'Rubinetteria',
              link: '/arredo-casa/arredo-bagno/rubinetteria',
            },
            {
              text: 'Tessili bagno',
              link: '/arredo-casa/arredo-bagno/tessili-bagno',
            },
            {
              text: 'Sanitari',
              link: '/arredo-casa/arredo-bagno/sanitari',
            },
            {
              text: 'Termoarredo',
              link: '/arredo-casa/arredo-bagno/termoarredo',
            },
            {
              text: 'Sanitari',
              link: '/arredo-bagno/sanitari',
            },
            {
              text: 'Termoarredo',
              link: '/arredo-casa/arredo-bagno/termoarredo',
            },
            {
              text: 'Vasche da bagno',
              link: '/arredo-casa/arredo-bagno/vasche-da-bagno',
            },
            {
              text: 'Saune',
              link: '/arredo-casa/arredo-bagno/saune',
            },
          ],
        },
        {
          title: 'Arredo ingresso',
          link: '/arredo-casa/arredo-ingresso',
          subCategories: [
            {
              text: 'Portaombrelli',
              link: '/arredo-casa/arredo-ingresso/portaombrelli',
            },
            {
              text: 'Mobili ingresso',
              link: '/arredo-casa/arredo-ingresso/mobili-ingresso',
            },
            {
              text: 'Appendiabiti',
              link: '/arredo-casa/arredo-ingresso/appendiabiti',
            },
            {
              text: 'Scarpiere',
              link: '/arredo-casa/arredo-ingresso/scarpiere',
            },
            {
              text: 'Zerbini',
              link: '/arredo-casa/arredo-ingresso/zerbini',
            },
          ],
        },
        {
          title: 'Arredo sala da pranzo',
          link: '/arredo-casa/arredo-sala-da-pranzo',
          subCategories: [
            {
              text: 'Tavoli da pranzo',
              link: '/arredo-casa/arredo-sala-da-pranzo/tavoli-da-pranzo',
            },
            {
              text: 'Sedie',
              link: '/arredo-casa/arredo-sala-da-pranzo/sedie',
            },
          ],
        },
        {
          title: 'Arredo ufficio',
          link: '/arredo-casa/arredo-ufficio',
          subCategories: [
            {
              text: 'Sedie ufficio',
              link: '/arredo-casa/arredo-ufficio/sedie-ufficio',
            },
            {
              text: 'Poltrone ufficio',
              link: '/arredo-casa/arredo-ufficio/poltrone-ufficio',
            },
            {
              text: 'Scaffali',
              link: '/arredo-casa/arredo-ufficio/scaffali',
            },
            {
              text: 'Scrivanie ufficio',
              link: '/arredo-casa/arredo-ufficio/scrivanie-ufficio',
            },
            {
              text: 'Gaming',
              link: '/arredo-casa/arredo-ufficio/gaming',
            },
          ],
        },
        {
          title: 'Casalinghi',
          link: '/arredo-casa/casalinghi',
          subCategories: [
            {
              text: 'Padelle e pentole',
              link: '/arredo-casa/casalinghi/padelle-e-pentole',
            },
            {
              text: 'Stoviglie',
              link: '/arredo-casa/casalinghi/stoviglie',
            },
            {
              text: 'Carrelli spesa',
              link: '/arredo-casa/casalinghi/carrelli-spesa',
            },
          ],
        },
        {
          title: "Complementi d'arredo",
          link: '/arredo-casa/complementi-d-arredo',
          subCategories: [
            {
              text: 'Mensole',
              link: '/arredo-casa/complementi-d-arredo/mensole',
            },
            {
              text: 'Tende e accessori',
              link: '/arredo-casa/complementi-d-arredo/tende-e-accessori',
            },
            {
              text: 'Specchi',
              link: '/arredo-casa/complementi-d-arredo/specchi',
            },
            {
              text: 'Tappeti',
              link: '/arredo-casa/complementi-d-arredo/tappeti',
            },
            {
              text: 'Quadri e stampe su tela',
              link: '/arredo-casa/complementi-d-arredo/quadri-e-stampe-su-tela',
            },
            {
              text: 'Orologi da parete',
              link: '/arredo-casa/complementi-d-arredo/orologi-da-parete',
            },
            {
              text: 'Ceste e cestini in vimini',
              link: '/arredo-casa/complementi-d-arredo/ceste-e-cestini-in-vimini',
            },
            {
              text: 'Carta adesiva',
              link: '/arredo-casa/complementi-d-arredo/carta-adesiva',
            },
            {
              text: 'Portariviste',
              link: '/arredo-casa/complementi-d-arredo/portariviste',
            },
            {
              text: 'Decorazioni',
              link: '/arredo-casa/complementi-d-arredo/decorazioni',
            },
            {
              text: 'Paraspifferi e guarnizioni',
              link: '/arredo-casa/complementi-d-arredo/paraspifferi-e-guarnizioni',
            },
            {
              text: 'Vasi da interno',
              link: '/arredo-casa/complementi-d-arredo/vasi-da-interno',
            },
            {
              text: 'Battiscopa',
              link: '/arredo-casa/complementi-d-arredo/battiscopa',
            },
            {
              text: 'Carta da parati',
              link: '/arredo-casa/complementi-d-arredo/carta-da-parati',
            },
            {
              text: 'Fiori e Piante',
              link: '/arredo-casa/complementi-d-arredo/fiori-e-piante',
            },
          ],
        },
        {
          title: 'Lavanderia',
          link: '/arredo-casa/lavanderia',
          subCategories: [
            {
              text: 'Armadi portascope e multiuso',
              link: '/arredo-casa/lavanderia/armadi-portascope-e-multiuso',
            },
            {
              text: 'Armadietti spogliatoio',
              link: '/arredo-casa/lavanderia/armadietti-spogliatoio',
            },
            {
              text: 'Lavatoi',
              link: '/arredo-casa/lavanderia/lavatoi',
            },
            {
              text: 'Coprilavatrice',
              link: '/arredo-casa/lavanderia/coprilavatrice',
            },
            {
              text: 'Mobiletti multiuso',
              link: '/arredo-casa/lavanderia/mobiletti-multiuso',
            },
            {
              text: 'Pulizia e manutenzione casa',
              link: '/arredo-casa/lavanderia/pulizia-e-manutenzione-casa',
            },
          ],
        },
        {
          title: 'Natale',
          link: '/arredo-casa/natale',
          subCategories: [
            {
              text: 'Addobbi natalizi',
              link: '/arredo-casa/natale/addobbi-natalizi',
            },
            {
              text: 'Alberi di natale',
              link: '/arredo-casa/natale/alberi-di-natale',
            },
            {
              text: 'Illuminazione natalizia',
              link: '/arredo-casa/natale/illuminazione-natalizia',
            },
            {
              text: 'Presepi',
              link: '/arredo-casa/natale/presepi',
            },
          ],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/arredo-giardino',
      text: 'Arredo giardino',
      iconMobile: Icon3,
      menuSecondLevel: [
        {
          title: 'Giochi da giardino',
          link: '/arredo-giardino/giochi-da-giardino',
          subCategories: [
            {
              text: 'Altalene',
              link: '/arredo-giardino/giochi-da-giardino/altalene',
            },
            {
              text: 'Casette',
              link: '/arredo-giardino/giochi-da-giardino/casette',
            },
          ],
        },
        {
          title: 'Barbecue',
          link: '/arredo-giardino/barbecue',
          subCategories: [
            {
              text: 'A carbonella',
              link: '/arredo-giardino/barbecue/a-carbonella',
            },
            { text: 'Accessori', link: '/arredo-giardino/barbecue/accessori' },
            { text: 'A gas', link: '/arredo-giardino/barbecue/a-gas' },
            { text: 'Elettrici', link: '/arredo-giardino/barbecue/elettrici' },
            { text: 'A legna', link: '/arredo-giardino/barbecue/a-legna' },
          ],
        },
        {
          title: 'Vasi e fioriere',
          link: '/arredo-giardino/vasi-e-fioriere',
          subCategories: [
            {
              text: 'Balconiere',
              link: '/arredo-giardino/vasi-e-fioriere/balconiere',
            },
            {
              text: 'Fioriere da esterno',
              link: '/arredo-giardino/vasi-e-fioriere/fioriere-da-esterno',
            },
            {
              text: 'Sottovasi',
              link: '/arredo-giardino/vasi-e-fioriere/sottovasi',
            },
            {
              text: 'Vasi da esterno',
              link: '/arredo-giardino/vasi-e-fioriere/vasi-da-esterno',
            },
          ],
        },
        {
          title: 'Siepi arelle e rete ombra',
          link: '/arredo-giardino/siepi-arelle-e-rete-ombra',
          subCategories: [
            {
              text: 'Arelle',
              link: '/arredo-giardino/siepi-arelle-e-rete-ombra/arelle',
            },
            {
              text: 'Reti ombreggianti',
              link: '/arredo-giardino/siepi-arelle-e-rete-ombra/reti-ombreggianti',
            },
            {
              text: 'Siepi finte',
              link: '/arredo-giardino/siepi-arelle-e-rete-ombra/siepi-finte',
            },
          ],
        },
        {
          title: 'Accessori',
          link: '/arredo-giardino/accessori',
          subCategories: [
            {
              text: 'Cassette della posta',
              link: '/arredo-giardino/accessori/cassette-della-posta',
            },
            {
              text: 'Teli di copertura',
              link: '/arredo-giardino/accessori/teli-di-copertura',
            },
          ],
        },
        {
          title: 'Cuscini da esterno',
          link: '/arredo-giardino/cuscini-da-esterno',
          subCategories: [],
        },
        {
          title: 'Dondoli',
          link: '/arredo-giardino/dondoli',
          subCategories: [],
        },
        {
          title: 'Fontane da giardino',
          link: '/arredo-giardino/fontane-da-giardino',
          subCategories: [],
        },
        {
          title: 'Gazebo da giardino',
          link: '/arredo-giardino/gazebo-da-giardino',
          subCategories: [],
        },
        {
          title: 'Ombrelloni e basi',
          link: '/arredo-giardino/ombrelloni-e-basi',
          subCategories: [],
        },
        {
          title: 'Tende da sole',
          link: '/arredo-giardino/tende-da-sole',
          subCategories: [],
        },
        {
          title: 'Erba sintetica',
          link: '/arredo-giardino/erba-sintetica',
          subCategories: [],
        },
        {
          title: 'Mobili da giardino',
          link: '/arredo-giardino/mobili-da-giardino',
          subCategories: [],
        },
        {
          title: 'Tavoli da giardino',
          link: '/arredo-giardino/tavoli-da-giardino',
          subCategories: [],
        },
        {
          title: 'Sedie da giardino',
          link: '/arredo-giardino/sedie-da-giardino',
          subCategories: [],
        },
        {
          title: 'Sdraio da giardino',
          link: '/arredo-giardino/sdraio-da-giardino',
          subCategories: [],
        },
        {
          title: 'Armadi da esterno',
          link: '/arredo-giardino/armadi-da-esterno',
          subCategories: [],
        },
        {
          title: 'Salotti da giardino',
          link: '/arredo-giardino/salotti-da-giardino',
          subCategories: [],
        },
        {
          title: 'Panchine da giardino',
          link: '/arredo-giardino/panchine-da-giardino',
          subCategories: [],
        },
        {
          title: 'Poltrone da giardino',
          link: '/arredo-giardino/poltrone-da-giardino',
          subCategories: [],
        },
        {
          title: 'Lettini da giardino',
          link: '/arredo-giardino/lettini-da-giardino',
          subCategories: [],
        },
        {
          title: 'Amache da giardino',
          link: '/arredo-giardino/amache-da-giardino',
          subCategories: [],
        },
        {
          title: 'Bauli da esterno',
          link: '/arredo-giardino/bauli-da-esterno',
          subCategories: [],
        },
        {
          title: 'Piastrelle da esterno',
          link: '/arredo-giardino/piastrelle-da-esterno',
          subCategories: [],
        },
        {
          title: 'Pergole e pergolati',
          link: '/arredo-giardino/pergole-e-pergolati',
          subCategories: [],
        },
        {
          title: 'Grigliati da giardino',
          link: '/arredo-giardino/grigliati-da-giardino',
          subCategories: [],
        },
        {
          title: 'Pensiline',
          link: '/arredo-giardino/pensiline',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/bricolage-e-fai-da-te',
      text: 'Bricolage e Fai da te',
      iconMobile: Icon4,
      menuSecondLevel: [
        {
          title: 'NEW: scopri le offerte Weicon',
          link: '/weicon',
          subCategories: [],
        },
        {
          title: 'Elettroutensili',
          link: '/bricolage-e-fai-da-te/elettroutensili',
          subCategories: [
            {
              text: 'Accessori e ricambi elettroutensili',
              link: '/bricolage-e-fai-da-te/elettroutensili/accessori-e-ricambi-elettroutensili',
            },
            {
              text: 'Pistole per verniciare',
              link: '/bricolage-e-fai-da-te/elettroutensili/pistole-per-verniciare',
            },
            {
              text: 'Betoniere',
              link: '/bricolage-e-fai-da-te/elettroutensili/betoniere',
            },
            {
              text: 'Bidoni aspiracenere',
              link: '/bricolage-e-fai-da-te/elettroutensili/bidoni-aspiracenere',
            },
            {
              text: 'Bidoni aspiratutto',
              link: '/bricolage-e-fai-da-te/elettroutensili/bidoni-aspiratutto',
            },
            {
              text: 'Compressori e accessori',
              link: '/bricolage-e-fai-da-te/elettroutensili/compressori-e-accessori',
            },
            {
              text: 'Gruppi elettrogeni',
              link: '/bricolage-e-fai-da-te/elettroutensili/gruppi-elettrogeni',
            },
            {
              text: 'Idropulitrici',
              link: '/bricolage-e-fai-da-te/elettroutensili/idropulitrici',
            },
            {
              text: 'Levigatrici',
              link: '/bricolage-e-fai-da-te/elettroutensili/levigatrici',
            },
            {
              text: 'Misuratori e livelle',
              link: '/bricolage-e-fai-da-te/elettroutensili/misuratori-e-livelle',
            },
            {
              text: 'Paranchi',
              link: '/bricolage-e-fai-da-te/elettroutensili/paranchi',
            },
            {
              text: 'Saldatrici',
              link: '/bricolage-e-fai-da-te/elettroutensili/saldatrici',
            },
            {
              text: 'Seghe',
              link: '/bricolage-e-fai-da-te/elettroutensili/seghe',
            },
            {
              text: 'Smerigliatrici',
              link: '/bricolage-e-fai-da-te/elettroutensili/smerigliatrici',
            },
            {
              text: 'Sparapunti e pistole colla caldo',
              link: '/bricolage-e-fai-da-te/elettroutensili/sparapunti-e-pistole-colla-caldo',
            },
            {
              text: 'Trapani a batteria',
              link: '/bricolage-e-fai-da-te/elettroutensili/trapani-a-batteria',
            },
            {
              text: 'Martelli demolitori',
              link: '/bricolage-e-fai-da-te/elettroutensili/martelli-demolitori',
            },
            {
              text: 'Trapani elettrici',
              link: '/bricolage-e-fai-da-te/elettroutensili/trapani-elettrici',
            },
            {
              text: 'Pistole termiche',
              link: '/bricolage-e-fai-da-te/elettroutensili/pistole-termiche',
            },
            {
              text: 'Utensili multifunzione',
              link: '/bricolage-e-fai-da-te/elettroutensili/utensili-multifunzione',
            },
            {
              text: 'Fresatrici',
              link: '/bricolage-e-fai-da-te/elettroutensili/fresatrici',
            },
            {
              text: 'Piallatrici',
              link: '/bricolage-e-fai-da-te/elettroutensili/piallatrici',
            },
            {
              text: 'Troncatrici',
              link: '/bricolage-e-fai-da-te/elettroutensili/troncatrici',
            },
            {
              text: 'Mole da banco',
              link: '/bricolage-e-fai-da-te/elettroutensili/mole-da-banco',
            },
            {
              text: 'Utensili da taglio',
              link: '/bricolage-e-fai-da-te/elettroutensili/utensili-da-taglio',
            },
            {
              text: 'Banchi Sega',
              link: '/bricolage-e-fai-da-te/elettroutensili/banchi-sega',
            },
            {
              text: 'Set di elettroutensili',
              link: '/bricolage-e-fai-da-te/elettroutensili/set-di-elettroutensili',
            },
            {
              text: 'Punte per trapani e demolitori',
              link: '/bricolage-e-fai-da-te/elettroutensili/punte-per-trapani-e-demolitori',
            },
            {
              text: 'Miscelatori e Fruste',
              link: '/bricolage-e-fai-da-te/elettroutensili/miscelatori-e-fruste',
            },
            {
              text: 'Banchi sega',
              link: '/bricolage-e-fai-da-te/elettroutensili/banchi-sega',
            },
            {
              text: 'Set di elettroutensili',
              link: '/bricolage-e-fai-da-te/elettroutensili/set-di-elettroutensili',
            },
            {
              text: 'Punte per trapani e demolitori',
              link: '/bricolage-e-fai-da-te/elettroutensili/punte-per-trapani-e-demolitori',
            },
            {
              text: 'Miscelatori e Fruste',
              link: '/bricolage-e-fai-da-te/elettroutensili/miscelatori-e-fruste',
            },
          ],
        },
        {
          title: 'Pittura e accessori',
          link: '/bricolage-e-fai-da-te/pitture-e-accessori',
          subCategories: [
            {
              text: 'Rulli e pennelli',
              link: '/bricolage-e-fai-da-te/pitture-e-accessori/rulli-e-pennelli',
            },
            {
              text: 'Solventi',
              link: '/bricolage-e-fai-da-te/pitture-e-accessori/solventi',
            },
            {
              text: 'Pitture murali',
              link: '/bricolage-e-fai-da-te/pitture-e-accessori/pitture-murali',
            },
            {
              text: 'Smalti e vernici',
              link: '/bricolage-e-fai-da-te/pitture-e-accessori/smalti-e-vernici',
            },
            {
              text: 'Trattamenti per legno',
              link: '/bricolage-e-fai-da-te/pitture-e-accessori/trattamenti-per-legno',
            },
          ],
        },
        {
          title: 'Ferramenta',
          link: '/bricolage-e-fai-da-te/ferramenta',
          subCategories: [
            {
              text: 'Colle siliconi adesivi',
              link: '/bricolage-e-fai-da-te/ferramenta/colle-siliconi-adesivi',
            },
            {
              text: 'Cacciaviti e chiavi',
              link: '/bricolage-e-fai-da-te/ferramenta/cacciaviti-e-chiavi',
            },
            {
              text: 'Carrelli portapacchi',
              link: '/bricolage-e-fai-da-te/ferramenta/carrelli-portapacchi',
            },
            {
              text: 'Cerniere',
              link: '/bricolage-e-fai-da-te/ferramenta/cerniere',
            },
            {
              text: 'Casseforti e fuciliere',
              link: '/bricolage-e-fai-da-te/ferramenta/casseforti-e-fuciliere',
            },
            {
              text: 'Cassette e carrelli porta utensili',
              link: '/bricolage-e-fai-da-te/ferramenta/cassette-e-carrelli-porta-utensili',
            },
            {
              text: 'Materiale edile',
              link: '/bricolage-e-fai-da-te/ferramenta/materiale-edile',
            },
            {
              text: 'Sicurezza casa',
              link: '/bricolage-e-fai-da-te/ferramenta/sicurezza-casa',
            },
            {
              text: 'Lucchetti',
              link: '/bricolage-e-fai-da-te/ferramenta/lucchetti',
            },
            {
              text: 'Minuteria',
              link: '/bricolage-e-fai-da-te/ferramenta/minuteria',
            },
            {
              text: 'Pavimenti',
              link: '/bricolage-e-fai-da-te/ferramenta/pavimenti',
            },
            {
              text: 'Protezione e imballaggio',
              link: '/bricolage-e-fai-da-te/ferramenta/protezione-e-imballaggio',
            },
            {
              text: 'Scale e trabattelli',
              link: '/bricolage-e-fai-da-te/ferramenta/scale-e-trabattelli',
            },
            {
              text: 'Utensili manuali',
              link: '/bricolage-e-fai-da-te/ferramenta/utensili-manuali',
            },
            {
              text: 'Lubrificanti, grassi e olii',
              link: '/bricolage-e-fai-da-te/ferramenta/lubrificanti-grassi-e-olii',
            },
            {
              text: 'Banchi da lavoro',
              link: '/bricolage-e-fai-da-te/ferramenta/banchi-da-lavoro',
            },
            {
              text: 'Guide per cassetti',
              link: '/bricolage-e-fai-da-te/ferramenta/guide-per-cassetti',
            },
            {
              text: 'Maniglie',
              link: '/bricolage-e-fai-da-te/ferramenta/maniglie',
            },
            {
              text: 'Flessometri',
              link: '/bricolage-e-fai-da-te/ferramenta/flessometri',
            },
            {
              text: 'Tavole e pannelli',
              link: '/bricolage-e-fai-da-te/ferramenta/tavole-e-pannelli',
            },
          ],
        },
        {
          title: 'Materiale elettrico',
          link: '/bricolage-e-fai-da-te/materiale-elettrico',
          subCategories: [
            {
              text: 'Pile batterie',
              link: '/bricolage-e-fai-da-te/materiale-elettrico/pile-batterie',
            },
            {
              text: 'Cavi elettrici',
              link: '/bricolage-e-fai-da-te/materiale-elettrico/cavi-elettrici',
            },
            {
              text: 'Fari, torce e proiettori',
              link: '/bricolage-e-fai-da-te/materiale-elettrico/fari-torce-e-proiettori',
            },
            {
              text: 'Motori per tapparelle',
              link: '/bricolage-e-fai-da-te/materiale-elettrico/motori-per-tapparelle',
            },
            {
              text: 'Ciabatte elettriche adattatori',
              link: '/bricolage-e-fai-da-te/materiale-elettrico/ciabatte-elettriche-adattatori',
            },
            {
              text: 'Prolunghe',
              link: '/bricolage-e-fai-da-te/materiale-elettrico/prolunghe',
            },
            {
              text: 'Lampadine risparmio energetico',
              link: '/bricolage-e-fai-da-te/materiale-elettrico/lampadine-risparmio-energetico',
            },
            {
              text: 'Spine e prese',
              link: '/bricolage-e-fai-da-te/materiale-elettrico/spine-e-prese',
            },
            {
              text: 'Placche elettriche',
              link: '/bricolage-e-fai-da-te/materiale-elettrico/placche-elettriche',
            },
          ],
        },
        {
          title: 'Idraulica',
          link: '/bricolage-e-fai-da-te/idraulica',
          subCategories: [
            {
              text: 'Raccordi',
              link: '/bricolage-e-fai-da-te/idraulica/raccordi',
            },
            {
              text: 'Termoidraulica',
              link: '/bricolage-e-fai-da-te/idraulica/termoidraulica',
            },
          ],
        },
        {
          title: 'Zanzariere e repellenti',
          link: '/bricolage-e-fai-da-te/zanzariere-e-repellenti',
          subCategories: [
            {
              text: 'Zampironi, candele e torce alla citronella',
              link: '/bricolage-e-fai-da-te/zanzariere-e-repellenti/zampironi-candele-e-torce-alla-citronella',
            },
            {
              text: 'Insetticidi e repellenti',
              link: '/bricolage-e-fai-da-te/zanzariere-e-repellenti/insetticidi-e-repellenti',
            },
            {
              text: 'Zanzariere',
              link: '/bricolage-e-fai-da-te/zanzariere-e-repellenti/zanzariere',
            },
          ],
        },
        {
          title: 'Domotica',
          link: '/bricolage-e-fai-da-te/domotica',
          subCategories: [
            {
              text: 'Sistemi di videosorveglianza',
              link: '/bricolage-e-fai-da-te/domotica/sistemi-di-videosorveglianza',
            },
            {
              text: 'Videocitofoni, citofoni e campanelli',
              link: '/bricolage-e-fai-da-te/domotica/videocitofoni-citofoni-e-campanelli',
            },
            {
              text: 'Casa Domotica',
              link: '/bricolage-e-fai-da-te/domotica/casa-domotica',
            },
            {
              text: 'Automazione portoni e garage',
              link: '/bricolage-e-fai-da-te/domotica/automazioni-portoni-e-garage',
            },
            {
              text: 'Altri accessori per domotica',
              link: '/bricolage-e-fai-da-te/domotica/altri-accessori-per-domotica',
            },
          ],
        },
        {
          title: 'Organizzazione box laboratori garage',
          link: '/bricolage-e-fai-da-te/organizzazione-box-laboratori-garage',
          subCategories: [
            {
              text: 'Scatole Organizer',
              link: '/bricolage-e-fai-da-te/organizzazione-box-laboratori-garage/scatole-organizer',
            },
            {
              text: 'Cassettiere minuteria',
              link: '/bricolage-e-fai-da-te/organizzazione-box-laboratori-garage/cassettiere-minuteria',
            },
            {
              text: 'Telai espositori',
              link: '/bricolage-e-fai-da-te/organizzazione-box-laboratori-garage/telai-espositori',
            },
            {
              text: 'Scaffali',
              link: '/bricolage-e-fai-da-te/organizzazione-box-laboratori-garage/scaffali',
            },
            {
              text: 'Vaschette minuteria',
              link: '/bricolage-e-fai-da-te/organizzazione-box-laboratori-garage/vaschette-minuteria',
            },
            {
              text: 'Valigette minuteria',
              link: '/bricolage-e-fai-da-te/organizzazione-box-laboratori-garage/valigette--minuteria',
            },
          ],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/Elettrodomestici',
      text: 'Elettrodomestici',
      iconMobile: Icon5,
      menuSecondLevel: [
        {
          title: 'Piccoli elettrodomestici',
          link: '/elettrodomestici/piccoli-elettrodomestici',
          subCategories: [
            {
              text: 'Aspirapolveri',
              link: '/elettrodomestici/piccoli-elettrodomestici/aspirapolveri',
            },
            {
              text: 'Lavapavimenti',
              link: '/elettrodomestici/piccoli-elettrodomestici/lavapavimenti',
            },
            {
              text: 'Scope a vapore',
              link: '/elettrodomestici/piccoli-elettrodomestici/scope-a-vapore',
            },
            {
              text: 'Bilance',
              link: '/elettrodomestici/piccoli-elettrodomestici/bilance',
            },
            {
              text: 'Frullatori',
              link: '/elettrodomestici/piccoli-elettrodomestici/frullatori',
            },
            {
              text: 'Sbattitori elettrici',
              link: '/elettrodomestici/piccoli-elettrodomestici/sbattitori-elettrici',
            },
            {
              text: 'Ferri da stiro',
              link: '/elettrodomestici/piccoli-elettrodomestici/ferri-da-stiro',
            },
            {
              text: 'Phon',
              link: '/elettrodomestici/piccoli-elettrodomestici/phon',
            },
            {
              text: 'Affilacoltelli',
              link: '/elettrodomestici/piccoli-elettrodomestici/affilacoltelli',
            },
            {
              text: 'Altri elettrodomestici utili',
              link: '/elettrodomestici/piccoli-elettrodomestici/altri-elettrodomestici-utili',
            },
            {
              text: 'Stazioni meteo e orologi',
              link: '/elettrodomestici/piccoli-elettrodomestici/stazioni-meteo-e-orologi',
            },
            {
              text: 'Stazioni meteo e orologi',
              link: '/elettrodomestici/piccoli-elettrodomestici/stazioni-meteo-e-orologi',
            },
            {
              text: 'Robot da cucina',
              link: '/elettrodomestici/piccoli-elettrodomestici/robot-da-cucina',
            },
          ],
        },
        {
          title: 'Forni, cappe e piani cottura',
          link: '/elettrodomestici/forni-cappe-e-piani-cottura',
          subCategories: [],
        },
        {
          title: 'Audio e video',
          link: '/elettrodomestici/audio-e-video',
          subCategories: [],
        },
        {
          title: 'Telefonia',
          link: '/elettrodomestici/telefonia',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/Giardinaggio',
      text: 'Giardinaggio',
      iconMobile: Icon6,
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          link: '/giardinaggio/raccolta-olive',
          subCategories: [
            {
              text: 'Abbacchiatori',
              link: '/giardinaggio/raccolta-olive/abbacchiatori',
            },
            {
              text: 'Contenitori olio inox',
              link: '/giardinaggio/raccolta-olive/contenitori-olio-inox',
            },
            {
              text: 'Reti per olive',
              link: '/giardinaggio/raccolta-olive/reti-per-olive',
            },
          ],
        },
        {
          title: 'Accessori giardinaggio',
          link: '/giardinaggio/accessori-giardinaggio',
          subCategories: [
            {
              text: 'Guanti da giardinaggio',
              link: '/giardinaggio/accessori-giardinaggio/guanti-da-giardinaggio',
            },
            {
              text: 'Taniche',
              link: '/giardinaggio/accessori-giardinaggio/taniche',
            },
            {
              text: 'Terriccio universale',
              link: '/giardinaggio/accessori-giardinaggio/terriccio-universale',
            },
            {
              text: 'Secchi e bidoni da giardino',
              link: '/giardinaggio/accessori-giardinaggio/secchi-e-bidoni-da-giardino',
            },
            {
              text: 'Reti e recinzioni',
              link: '/giardinaggio/accessori-giardinaggio/reti-e-recinzioni',
            },
          ],
        },
        {
          title: 'Attrezzi giardino',
          link: '/giardinaggio/attrezzi-giardino',
          subCategories: [
            { text: 'Cesoie', link: '/giardinaggio/attrezzi-giardino/cesoie' },
            {
              text: 'Svettatoi',
              link: '/giardinaggio/attrezzi-giardino/svettatoi',
            },
            {
              text: 'Forbici da potatura',
              link: '/giardinaggio/attrezzi-giardino/forbici-da-potatura',
            },
            {
              text: 'Troncarami',
              link: '/giardinaggio/attrezzi-giardino/troncarami',
            },
            {
              text: 'Cunei spaccalegna',
              link: '/giardinaggio/attrezzi-giardino/cunei-spaccalegna',
            },
            {
              text: 'Rastrelli',
              link: '/giardinaggio/attrezzi-giardino/rastrelli',
            },
            {
              text: 'Accette, asce e scuri spaccalegna',
              link: '/giardinaggio/attrezzi-giardino/accette-asce-e-scuri-spaccalegna',
            },
            {
              text: 'Arieggiatori',
              link: '/giardinaggio/attrezzi-giardino/arieggiatori',
            },
            {
              text: 'Falci, falcetti e roncole',
              link: '/giardinaggio/attrezzi-giardino/falci-falcetti-e-roncole',
            },
            { text: 'Zappe', link: '/giardinaggio/attrezzi-giardino/zappe' },
            {
              text: 'Vanghe e badili',
              link: '/giardinaggio/attrezzi-giardino/vanghe-e-badili',
            },
            {
              text: 'Seghe, segacci e seghetti',
              link: '/giardinaggio/attrezzi-giardino/seghe-segacci-e-seghetti',
            },
            { text: 'Pale', link: '/giardinaggio/attrezzi-giardino/pale' },
            {
              text: 'Carriole',
              link: '/giardinaggio/attrezzi-giardino/carriole',
            },
            {
              text: 'Carrelli da giardino',
              link: '/giardinaggio/attrezzi-giardino/carrelli-da-giardino',
            },
          ],
        },
        {
          title: 'Decespugliatori e ricambi',
          link: '/giardinaggio/decespugliatori-e-ricambi',
          subCategories: [
            {
              text: 'Decespugliatori a scoppio',
              link: '/giardinaggio/decespugliatori-e-ricambi/decespugliatori-a-scoppio',
            },
            {
              text: 'Decespugliatori elettrici',
              link: '/giardinaggio/decespugliatori-e-ricambi/decespugliatori-elettrici',
            },
            {
              text: 'Decespugliatori multifunzione',
              link: '/giardinaggio/decespugliatori-e-ricambi/decespugliatori-multifunzione',
            },
          ],
        },
        {
          title: 'Irrigazione',
          link: '/giardinaggio/irrigazione',
          subCategories: [
            {
              text: 'Irrigatori da giardino',
              link: '/giardinaggio/irrigazione/irrigatori-da-giardino',
            },
            {
              text: 'Tubi per irrigazione',
              link: '/giardinaggio/irrigazione/tubi-per-irrigazione',
            },
            {
              text: 'Centraline irrigazione',
              link: '/giardinaggio/irrigazione/centraline-irrigazione',
            },
            {
              text: 'Kit irrigazione',
              link: '/giardinaggio/irrigazione/kit-irrigazione',
            },
            {
              text: 'Pompe per irrigazione',
              link: '/giardinaggio/irrigazione/pompe-per-irrigazione',
            },
            {
              text: 'Elettrovalvole per irrigazione',
              link: '/giardinaggio/irrigazione/elettrovalvole-per-irrigazione',
            },
            {
              text: 'Raccordi per tubi',
              link: '/giardinaggio/irrigazione/raccordi-per-tubi',
            },
            {
              text: 'Avvolgitubo',
              link: '/giardinaggio/irrigazione/avvolgitubo',
            },
            {
              text: 'Annaffiatoi',
              link: '/giardinaggio/irrigazione/annaffiatoi',
            },
            {
              text: 'Irrigazione a goccia',
              link: '/giardinaggio/irrigazione/irrigazione-a-goccia',
            },
            {
              text: 'Rubinetti da giardino',
              link: '/giardinaggio/irrigazione/rubinetti-da-giardino',
            },
          ],
        },
        {
          title: 'Motoseghe',
          link: '/giardinaggio/motoseghe',
          subCategories: [
            {
              text: 'Motoseghe a batteria',
              link: '/giardinaggio/motoseghe/motoseghe-a-batteria',
            },
            {
              text: 'Motoseghe a scoppio',
              link: '/giardinaggio/motoseghe/motoseghe-a-scoppio',
            },
            {
              text: 'Motoseghe elettriche',
              link: '/giardinaggio/motoseghe/motoseghe-elettriche',
            },
            {
              text: 'Potatori elettrici',
              link: '/giardinaggio/motoseghe/potatori-elettrici',
            },
            {
              text: 'Ricambi motoseghe',
              link: '/giardinaggio/motoseghe/ricambi-motoseghe',
            },
          ],
        },
        {
          title: 'Pompe sommerse',
          link: '/giardinaggio/pompe-sommerse',
          subCategories: [
            {
              text: 'Elettropompe',
              link: '/giardinaggio/pompe-sommerse/elettropompe',
            },
            {
              text: 'Pompe autoadescanti',
              link: '/giardinaggio/pompe-sommerse/pompe-autoadescanti',
            },
            {
              text: 'Pompe a immersione',
              link: '/giardinaggio/pompe-sommerse/pompe-a-immersione',
            },
          ],
        },
        {
          title: 'Serre',
          link: '/giardinaggio/serre',
          subCategories: [
            {
              text: 'Serre da balcone',
              link: '/giardinaggio/serre/serre-da-balcone',
            },
            {
              text: 'Serre da giardino',
              link: '/giardinaggio/serre/serre-da-giardino',
            },
            {
              text: 'Teli per serre',
              link: '/giardinaggio/serre/teli-per-serre',
            },
            { text: 'Mini serre', link: '/giardinaggio/serre/mini-serre' },
          ],
        },
        {
          title: 'Soffiatori aspiratori trituratori',
          link: '/giardinaggio/soffiatori-aspiratori-trituratori',
          subCategories: [
            {
              text: 'Soffiatori',
              link: '/giardinaggio/soffiatori-aspiratori-trituratori/soffiatori',
            },
            {
              text: 'Aspirafoglie',
              link: '/giardinaggio/soffiatori-aspiratori-trituratori/aspirafoglie',
            },
            {
              text: 'Trituratori',
              link: '/giardinaggio/soffiatori-aspiratori-trituratori/trituratori',
            },
          ],
        },
        {
          title: 'Tagliasiepi',
          link: '/giardinaggio/tagliasiepi',
          subCategories: [
            {
              text: 'Tagliasiepi elettrico',
              link: '/giardinaggio/tagliasiepi/tagliasiepi-elettrico',
            },
            {
              text: 'Tagliasiepi a batteria',
              link: '/giardinaggio/tagliasiepi/tagliasiepi-a-batteria',
            },
            {
              text: 'Tagliasiepi a scoppio',
              link: '/giardinaggio/tagliasiepi/tagliasiepi-a-scoppio',
            },
          ],
        },
        {
          title: 'Teli protettivi',
          link: '/giardinaggio/teli-protettivi',
          subCategories: [
            {
              text: 'Teli occhiellati',
              link: '/giardinaggio/teli-protettivi/teli-occhiellati',
            },
            {
              text: 'Teli per coperture',
              link: '/giardinaggio/teli-protettivi/teli-per-coperture',
            },
            {
              text: 'Teli pacciamatura',
              link: '/giardinaggio/teli-protettivi/teli-pacciamatura',
            },
          ],
        },
        {
          title: 'Tagliabordi',
          link: '/giardinaggio/tagliabordi',
          subCategories: [
            {
              text: 'Tagliabordi elettrici',
              link: '/giardinaggio/tagliabordi/tagliabordi-elettrici',
            },
            {
              text: 'Tagliabordi a scoppio',
              link: '/giardinaggio/tagliabordi/tagliabordi-a-scoppio',
            },
            {
              text: 'Tagliabordi a batteria',
              link: '/giardinaggio/tagliabordi/tagliabordi-a-batteria',
            },
          ],
        },
        {
          title: 'Tagliaerba',
          link: '/giardinaggio/tagliaerba',
          subCategories: [
            {
              text: 'Tagliaerba a scoppio',
              link: '/giardinaggio/tagliaerba/tagliaerba-a-scoppio',
            },
            {
              text: 'Tagliaerba elettrici',
              link: '/giardinaggio/tagliaerba/tagliaerba-elettrici',
            },
            {
              text: 'Trattorini tagliaerba',
              link: '/giardinaggio/tagliaerba/trattorini-tagliaerba',
            },
            {
              text: 'Tagliaerba a batteria',
              link: '/giardinaggio/tagliaerba/tagliaerba-a-batteria',
            },
          ],
        },
        {
          title: 'Motozappe',
          link: '/giardinaggio/motozappe',
          subCategories: [],
        },
        {
          title: 'Spaccalegna',
          link: '/giardinaggio/spaccalegna',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/piscine-e-accessori',
      text: 'Piscine e accessori',
      iconMobile: Icon7,
      menuSecondLevel: [
        {
          title: 'Trattamento acqua',
          link: '/piscine-e-accessori/trattamento-acqua',
          subCategories: [
            {
              text: 'Cloro per piscine',
              link: '/piscine-e-accessori/trattamento-acqua/cloro-per-piscine',
            },
            {
              text: 'Antialghe piscina',
              link: '/piscine-e-accessori/trattamento-acqua/antialghe-piscina',
            },
            {
              text: 'Svernanti per piscine',
              link: '/piscine-e-accessori/trattamento-acqua/svernanti-per-piscine',
            },
            {
              text: 'Regolatori ph piscine',
              link: '/piscine-e-accessori/trattamento-acqua/regolatori-ph-piscine',
            },
            {
              text: 'Sequestranti per piscine',
              link: '/piscine-e-accessori/trattamento-acqua/sequestranti-per-piscine',
            },
          ],
        },
        {
          title: 'Accessori per piscine',
          link: '/piscine-e-accessori/accessori-per-piscine',
          subCategories: [
            {
              text: 'Coperture per piscine',
              link: '/piscine-e-accessori/accessori-per-piscine/coperture-per-piscine',
            },
            {
              text: 'Kit pulizia piscine',
              link: '/piscine-e-accessori/accessori-per-piscine/kit-pulizia-piscine',
            },
            {
              text: 'Tappeti per piscina',
              link: '/piscine-e-accessori/accessori-per-piscine/tappeti-per-piscina',
            },
            {
              text: 'Robot per piscine',
              link: '/piscine-e-accessori/accessori-per-piscine/robot-per-piscine',
            },
            {
              text: 'Skimmer piscine',
              link: '/piscine-e-accessori/accessori-per-piscine/skimmer-piscine',
            },
            {
              text: 'Scalette per piscine',
              link: '/piscine-e-accessori/accessori-per-piscine/scalette-per-piscine',
            },
            {
              text: 'Docce solari per piscine',
              link: '/piscine-e-accessori/accessori-per-piscine/docce-solari-per-piscine',
            },
            {
              text: 'Retini per piscine',
              link: '/piscine-e-accessori/accessori-per-piscine/retini-per-piscine',
            },
            {
              text: 'Luci per piscine',
              link: '/piscine-e-accessori/accessori-per-piscine/luci-per-piscine',
            },
            {
              text: 'Generatori di cloro',
              link: '/piscine-e-accessori/accessori-per-piscine/generatori-di-cloro',
            },
            {
              text: 'Gonfiabili piscina',
              link: '/piscine-e-accessori/accessori-per-piscine/gonfiabili-piscina',
            },
            {
              text: 'Aste telescopiche per piscine',
              link: '/piscine-e-accessori/accessori-per-piscine/aste-telescopiche-per-piscine',
            },
          ],
        },
        {
          title: 'Piscine bambini',
          link: '/piscine-e-accessori/piscine-bambini',
          subCategories: [
            {
              text: 'Piscine gonfiabili per bambini',
              link: '/piscine-e-accessori/piscine-bambini/piscine-gonfiabili-per-bambini',
            },
            {
              text: 'Piscine rigide per bambini',
              link: '/piscine-e-accessori/piscine-bambini/piscine-rigide-per-bambini',
            },
            {
              text: 'Giochi per piscina per bambini',
              link: '/piscine-e-accessori/piscine-bambini/giochi-per-piscina-per-bambini',
            },
          ],
        },
        {
          title: 'Pompe per piscine',
          link: '/piscine-e-accessori/pompe-per-piscine',
          subCategories: [
            {
              text: 'Filtri a sabbia',
              link: '/piscine-e-accessori/pompe-per-piscine/filtri-a-sabbia',
            },
            {
              text: 'Filtri a cartuccia',
              link: '/piscine-e-accessori/pompe-per-piscine/filtri-a-cartuccia',
            },
            {
              text: 'Cartucce filtranti e sabbia',
              link: '/piscine-e-accessori/pompe-per-piscine/cartucce-filtranti-e-sabbia',
            },
            {
              text: 'Tubi per piscine',
              link: '/piscine-e-accessori/pompe-per-piscine/tubi-per-piscine',
            },
          ],
        },
        {
          title: 'Piscine fuori terra',
          link: '/piscine-e-accessori/piscine-fuori-terra',
          subCategories: [
            {
              text: 'Piscine autoportanti',
              link: '/piscine-e-accessori/piscine-fuori-terra/piscine-autoportanti',
            },
            {
              text: 'Piscine frame',
              link: '/piscine-e-accessori/piscine-fuori-terra/piscine-frame',
            },
            {
              text: 'Piscine gonfiabili',
              link: '/piscine-e-accessori/piscine-fuori-terra/piscine-gonfiabili',
            },
            {
              text: 'Piscine rettangolari',
              link: '/piscine-e-accessori/piscine-fuori-terra/piscine-rettangolari',
            },
            {
              text: 'Piscine rigide',
              link: '/piscine-e-accessori/piscine-fuori-terra/piscine-rigide',
            },
          ],
        },
        {
          title: 'Piscine idromassaggio',
          link: '/piscine-e-accessori/piscine-idromassaggio',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/riscaldamento',
      text: 'Riscaldamento',
      iconMobile: Icon8,
      menuSecondLevel: [
        {
          title: 'Accessori camino',
          link: '/riscaldamento/accessori-camino',
          subCategories: [
            {
              text: 'Parascintille',
              link: '/riscaldamento/accessori-camino/parascintille',
            },
            { text: 'Alari', link: '/riscaldamento/accessori-camino/alari' },
            {
              text: 'Portalegna',
              link: '/riscaldamento/accessori-camino/portalegna',
            },
            {
              text: 'Set attrezzi camino',
              link: '/riscaldamento/accessori-camino/set-attrezzi-camino',
            },
            {
              text: 'Canne fumarie',
              link: '/riscaldamento/accessori-camino/canne-fumarie',
            },
            {
              text: 'Accendifuoco',
              link: '/riscaldamento/accessori-camino/accendifuoco',
            },
            {
              text: 'Pulisci camino',
              link: '/riscaldamento/accessori-camino/pulisci-camino',
            },
          ],
        },
        {
          title: 'Scaldabagni',
          link: '/riscaldamento/scaldabagni',
          subCategories: [
            {
              text: 'Scaldabagni elettrici',
              link: '/riscaldamento/scaldabagni/scaldabagni-elettrici',
            },
          ],
        },
        {
          title: 'Camini a bioetanolo',
          link: '/riscaldamento/camini-a-bioetanolo',
          subCategories: [
            {
              text: 'Biocamini da parete',
              link: '/riscaldamento/camini-a-bioetanolo/biocamini-da-parete',
            },
            {
              text: 'Biocamini da terra',
              link: '/riscaldamento/camini-a-bioetanolo/biocamini-da-terra',
            },
            {
              text: 'Biocamini da tavolo',
              link: '/riscaldamento/camini-a-bioetanolo/biocamini-da-tavolo',
            },
            {
              text: 'Bruciatori bioetanolo',
              link: '/riscaldamento/camini-a-bioetanolo/bruciatori-bioetanolo',
            },
            {
              text: 'Accessori biocamini',
              link: '/riscaldamento/camini-a-bioetanolo/accessori-biocamini',
            },
          ],
        },
        {
          title: 'Stufe a pellet',
          link: '/riscaldamento/stufe-a-pellet',
          subCategories: [
            {
              text: 'Stufe a pellet canalizzate',
              link: '/riscaldamento/stufe-a-pellet/stufe-a-pellet-canalizzate',
            },
            {
              text: 'Stufe a pellet ventilate',
              link: '/riscaldamento/stufe-a-pellet/stufe-a-pellet-ventilate',
            },
            {
              text: 'Stufe a pellet slim',
              link: '/riscaldamento/stufe-a-pellet/stufe-a-pellet-slim',
            },
            {
              text: 'Tubi e accessori per stufe a pellet',
              link: '/riscaldamento/stufe-a-pellet/tubi-e-accessori-per-stufe-a-pellet',
            },
          ],
        },
        {
          title: 'Stufe a petrolio',
          link: '/riscaldamento/stufe-a-petrolio',
          subCategories: [
            {
              text: 'Stufe inverter',
              link: '/riscaldamento/stufe-a-petrolio/stufe-inverter',
            },
          ],
        },
        {
          title: 'Stufe elettriche',
          link: '/riscaldamento/stufe-elettriche',
          subCategories: [
            {
              text: 'Termoconvettori elettrici',
              link: '/riscaldamento/stufe-elettriche/termoconvettori-elettrici',
            },
            {
              text: 'Camini elettrici',
              link: '/riscaldamento/stufe-elettriche/camini-elettrici',
            },
            {
              text: 'Termosifoni elettrici',
              link: '/riscaldamento/stufe-elettriche/termosifoni-elettrici',
            },
            {
              text: 'Stufe infrarossi',
              link: '/riscaldamento/stufe-elettriche/stufe-infrarossi',
            },
            {
              text: 'Scaldasalviette elettrici',
              link: '/riscaldamento/stufe-elettriche/scaldasalviette-elettrici',
            },
            {
              text: 'Stufe alogene',
              link: '/riscaldamento/stufe-elettriche/stufe-alogene',
            },
            {
              text: 'Quadri riscaldanti',
              link: '/riscaldamento/stufe-elettriche/quadri-riscaldanti',
            },
          ],
        },
        {
          title: 'Termocoperte',
          link: '/riscaldamento/termocoperte',
          subCategories: [
            {
              text: 'Termocoperte singole',
              link: '/riscaldamento/termocoperte/termocoperte-singole',
            },
          ],
        },
        {
          title: 'Bioetanolo',
          link: '/riscaldamento/bioetanolo',
          subCategories: [],
        },
        {
          title: 'Combustibile liquido',
          link: '/riscaldamento/combustibile-liquido',
          subCategories: [],
        },
        {
          title: 'Termostati',
          link: '/riscaldamento/termostati',
          subCategories: [],
        },
        {
          title: 'Pellet e legna',
          link: '/riscaldamento/pellet-e-legna',
          subCategories: [],
        },
        {
          title: 'Stufe a bioetanolo',
          link: '/riscaldamento/stufe-a-bioetanolo',
          subCategories: [],
        },
        {
          title: 'Stufe a legna',
          link: '/riscaldamento/stufe-a-legna',
          subCategories: [],
        },
        {
          title: 'Stufe a gas',
          link: '/riscaldamento/stufe-a-gas',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/antinfortunistica',
      text: 'Antinfortunistica',
      iconMobile: Icon9,
      menuSecondLevel: [
        {
          title: 'Abbigliamento da lavoro',
          link: '/antinfortunistica/abbigliamento-da-lavoro',
          subCategories: [
            {
              text: 'Pantaloni da lavoro',
              link: '/antinfortunistica/abbigliamento-da-lavoro/pantaloni-da-lavoro',
            },
            {
              text: 'Gilet e smanicati da lavoro',
              link: '/antinfortunistica/abbigliamento-da-lavoro/gilet-e-smanicati-da-lavoro',
            },
            {
              text: 'Giacche da lavoro',
              link: '/antinfortunistica/abbigliamento-da-lavoro/giacche-da-lavoro',
            },
            {
              text: 'Tute da lavoro',
              link: '/antinfortunistica/abbigliamento-da-lavoro/tute-da-lavoro',
            },
            {
              text: 'Maglie e felpe da lavoro',
              link: '/antinfortunistica/abbigliamento-da-lavoro/maglie-e-felpe-da-lavoro',
            },
          ],
        },
        {
          title: 'Dispositivi di protezione individuale',
          link: '/antinfortunistica/dispositivi-di-protezione-individuale',
          subCategories: [
            {
              text: 'Guanti da lavoro',
              link: '/antinfortunistica/dispositivi-di-protezione-individuale/guanti-da-lavoro',
            },
            {
              text: 'Occhiali e visiere protettive',
              link: '/antinfortunistica/dispositivi-di-protezione-individuale/occhiali-e-visiere-protettive',
            },
            {
              text: 'Elmetti',
              link: '/antinfortunistica/dispositivi-di-protezione-individuale/elmetti',
            },
            {
              text: 'Mascherine protettive',
              link: '/antinfortunistica/dispositivi-di-protezione-individuale/mascherine-protettive',
            },
            {
              text: 'Altri dispositivi di protezione',
              link: '/antinfortunistica/dispositivi-di-protezione-individuale/altri-dispositivi-di-protezione',
            },
            {
              text: 'Calze e Calzamaglie',
              link: '/antinfortunistica/abbigliamento-da-lavoro/calze-e-calzamaglie',
            },
          ],
        },
        {
          title: 'Scarpe antinfortunistiche',
          link: '/antinfortunistica/scarpe-antinfortunistiche',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/illuminazione',
      text: 'Illuminazione',
      iconMobile: Icon10,
      menuSecondLevel: [
        {
          title: 'Faretti',
          link: '/illuminazione/faretti',
          subCategories: [
            {
              text: 'Illuminazione led',
              link: '/illuminazione/faretti/illuminazione-led',
            },
          ],
        },
        {
          title: 'Illuminazione da giardino ed esterno',
          link: '/illuminazione/illuminazione-da-giardino-ed-esterno',
          subCategories: [
            {
              text: 'Lampioni da giardino',
              link: '/illuminazione/illuminazione-da-giardino-ed-esterno/lampioni-da-giardino',
            },
            {
              text: 'Lampade da esterno',
              link: '/illuminazione/illuminazione-da-giardino-ed-esterno/lampade-da-esterno',
            },
            {
              text: 'Applique da esterno',
              link: '/illuminazione/illuminazione-da-giardino-ed-esterno/applique-da-esterno',
            },
            {
              text: 'Faretti da esterno',
              link: '/illuminazione/illuminazione-da-giardino-ed-esterno/faretti-da-esterno',
            },
            {
              text: 'Lanterne da esterno',
              link: '/illuminazione/illuminazione-da-giardino-ed-esterno/lanterne-da-esterno',
            },
            {
              text: 'Plafoniere da esterno',
              link: '/illuminazione/illuminazione-da-giardino-ed-esterno/plafoniere-da-esterno',
            },
          ],
        },
        {
          title: 'Lampadari',
          link: '/illuminazione/lampadari',
          subCategories: [],
        },
        {
          title: 'Applique',
          link: '/illuminazione/applique',
          subCategories: [],
        },
        {
          title: 'Plafoniere',
          link: '/illuminazione/plafoniere',
          subCategories: [],
        },
        {
          title: 'Lampadine',
          link: '/illuminazione/lampadine',
          subCategories: [],
        },
        {
          title: 'Lampade da tavolo',
          link: '/illuminazione/lampade-da-tavolo',
          subCategories: [],
        },
        {
          title: 'Lampade da terra',
          link: '/illuminazione/lampade-da-terra',
          subCategories: [],
        },
        {
          title: 'Strisce Led',
          link: '/illuminazione/strisce-led',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/sport-e-tempo-libero',
      text: 'Sport e tempo libero',
      iconMobile: Icon11,
      menuSecondLevel: [
        {
          title: 'Sport',
          link: '/sport-e-tempo-libero/sport',
          subCategories: [
            {
              text: 'Attrezzi sportivi',
              link: '/sport-e-tempo-libero/sport/attrezzi-sportivi',
            },
            {
              text: 'Tapis roulant',
              link: '/sport-e-tempo-libero/sport/tapis-roulant',
            },
            { text: 'Cyclette', link: '/sport-e-tempo-libero/sport/cyclette' },
            {
              text: 'Bilancieri e pesi',
              link: '/sport-e-tempo-libero/sport/bilancieri-e-pesi',
            },
            {
              text: 'Panche addominali',
              link: '/sport-e-tempo-libero/sport/panche-addominali',
            },
            {
              text: 'Abbigliamento sportivo',
              link: '/sport-e-tempo-libero/sport/abbigliameto-sportivo',
            },
          ],
        },
        {
          title: 'Campeggio',
          link: '/sport-e-tempo-libero/campeggio',
          subCategories: [
            {
              text: 'Accessori da campeggio',
              link: '/sport-e-tempo-libero/campeggio/accessori-da-campeggio',
            },
            {
              text: 'Materassi gonfiabili',
              link: '/sport-e-tempo-libero/campeggio/materassi-gonfiabili',
            },
            {
              text: 'Tavoli da campeggio pieghevoli',
              link: '/sport-e-tempo-libero/campeggio/tavoli-da-campeggio-pieghevoli',
            },
            {
              text: 'Tende da campeggio',
              link: '/sport-e-tempo-libero/campeggio/tende-da-campeggio',
            },
            {
              text: 'Divani e poltrone gonfiabili',
              link: '/sport-e-tempo-libero/campeggio/divani-e-poltrone-gonfiabili',
            },
            {
              text: 'Sedie da campeggio',
              link: '/sport-e-tempo-libero/campeggio/sedie-da-campeggio',
            },
          ],
        },
        {
          title: 'Mare e spiaggia',
          link: '/sport-e-tempo-libero/mare-e-spiaggia',
          subCategories: [
            {
              text: 'Borse frigo',
              link: '/sport-e-tempo-libero/mare-e-spiaggia/borse-frigo',
            },
            {
              text: 'Kayak, Sup, Gommoni',
              link: '/sport-e-tempo-libero/mare-e-spiaggia/kayak-sup-gommoni',
            },
            {
              text: 'Gonfiabili e materassini',
              link: '/sport-e-tempo-libero/mare-e-spiaggia/gonfiabili-e-materassini',
            },
            {
              text: 'Lettini da spiaggia',
              link: '/sport-e-tempo-libero/mare-e-spiaggia/lettini-da-spiaggia',
            },
            {
              text: 'Ombrelloni da spiaggia',
              link: '/sport-e-tempo-libero/mare-e-spiaggia/ombrelloni-da-spiaggia',
            },
            {
              text: 'Sedie da spiaggia',
              link: '/sport-e-tempo-libero/mare-e-spiaggia/sedie-da-spiaggia',
            },
          ],
        },
        {
          title: 'Benessere',
          link: '/sport-e-tempo-libero/benessere',
          subCategories: [
            {
              text: 'Accessori',
              link: '/sport-e-tempo-libero/benessere/accessori',
            },
            {
              text: 'Cura della persona',
              link: '/sport-e-tempo-libero/benessere/cura-della-persona',
            },
            {
              text: 'Lettini massaggi',
              link: '/sport-e-tempo-libero/benessere/lettini-massaggi',
            },
          ],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/casette-e-box',
      text: 'Casette e box',
      iconMobile: Icon12,
      menuSecondLevel: [
        {
          title: 'Accessori per casette',
          link: '/casette-e-box/accessori-per-casette',
          subCategories: [],
        },
        {
          title: 'Casette in pvc',
          link: '/casette-e-box/casette-in-pvc',
          subCategories: [],
        },
        {
          title: 'Garage prefabbricati',
          link: '/casette-e-box/garage-prefabbricati',
          subCategories: [],
        },
        {
          title: 'Legnaie e capanni attrezzi',
          link: '/casette-e-box/legnaie-e-capanni-attrezzi',
          subCategories: [],
        },
        {
          title: 'Basi pavimento e piastrelle resina',
          link: '/casette-e-box/basi-pavimento-e-piastrelle-resina',
          subCategories: [],
        },
        {
          title: 'Casette in lamiera',
          link: '/casette-e-box/casette-in-lamiera',
          subCategories: [],
        },
        {
          title: 'Onduline',
          link: '/casette-e-box/onduline',
          subCategories: [],
        },
        {
          title: 'Casette in legno',
          link: '/casette-e-box/casette-in-legno',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/climatizzazione',
      text: 'Climatizzazione',
      iconMobile: Icon13,
      menuSecondLevel: [
        {
          title: 'Condizionatori',
          link: '/climatizzazione/condizionatori',
          subCategories: [
            {
              text: 'Condizionatori fissi',
              link: '/climatizzazione/condizionatori/condizionatori-fissi',
            },
            {
              text: 'Condizionatori portatili',
              link: '/climatizzazione/condizionatori/condizionatori-portatili',
            },
          ],
        },
        {
          title: 'Ventilatori',
          link: '/climatizzazione/ventilatori',
          subCategories: [
            {
              text: 'Ventilatori da soffitto',
              link: '/climatizzazione/ventilatori/ventilatori-da-soffitto',
            },
            {
              text: 'Ventilatori a colonna',
              link: '/climatizzazione/ventilatori/ventilatori-a-colonna',
            },
            {
              text: 'Ventilatori da tavolo',
              link: '/climatizzazione/ventilatori/ventilatori-da-tavolo',
            },
            {
              text: 'Ventilatori nebulizzatori',
              link: '/climatizzazione/ventilatori/ventilatori-nebulizzatori',
            },
          ],
        },
        {
          title: 'Deumidificatori',
          link: '/climatizzazione/deumidificatori',
          subCategories: [
            {
              text: 'Deumidificatori portatili',
              link: '/climatizzazione/deumidificatori/deumidificatori-portatili',
            },
            {
              text: 'Deumidificatori elettrici',
              link: '/climatizzazione/deumidificatori/deumidificatori-elettrici',
            },
            {
              text: 'Assorbi umidità',
              link: '/climatizzazione/deumidificatori/assorbi-umidit%C3%A0',
            },
          ],
        },
        {
          title: 'Umidificatori e Purificatori',
          link: '/climatizzazione/umidificatori-e-purificatori',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/auto-e-moto',
      text: 'Auto e moto',
      iconMobile: Icon14,
      menuSecondLevel: [
        {
          title: 'Accessori auto',
          link: '/auto-e-moto/accessori-auto',
          subCategories: [
            {
              text: 'Compressori portatili e manometri',
              link: '/auto-e-moto/accessori-auto/compressori-portatili-e-manometri',
            },
            {
              text: 'Catene da neve',
              link: '/auto-e-moto/accessori-auto/catene-da-neve',
            },
            {
              text: 'Tappi valvole pneumatici',
              link: '/auto-e-moto/accessori-auto/tappi-valvole-pneumatici',
            },
            {
              text: 'Taniche benzina',
              link: '/auto-e-moto/accessori-auto/taniche-benzina',
            },
            {
              text: 'Kit riparazione gomme',
              link: '/auto-e-moto/accessori-auto/kit-riparazione-gomme',
            },
            {
              text: 'Spazzole tergicristalli',
              link: '/auto-e-moto/accessori-auto/spazzole-tergicristalli',
            },
            {
              text: 'Specchi convessi',
              link: '/auto-e-moto/accessori-auto/specchi-convessi',
            },
            {
              text: 'Porta pneumatici',
              link: '/auto-e-moto/accessori-auto/porta-pneumatici',
            },
            {
              text: 'Aspiratore olio',
              link: '/auto-e-moto/accessori-auto/aspiratore-olio',
            },
            {
              text: 'Antifurti auto meccanici',
              link: '/auto-e-moto/accessori-auto/antifurti-auto-meccanici',
            },
            {
              text: 'Corde traino e allacciabagagli',
              link: '/auto-e-moto/accessori-auto/corde-traino-e-allacciabagagli',
            },
            {
              text: 'Teli copriauto',
              link: '/auto-e-moto/accessori-auto/teli-copriauto',
            },
            {
              text: 'Tappetini auto',
              link: '/auto-e-moto/accessori-auto/tappetini-auto',
            },
            {
              text: 'Lampadine auto',
              link: '/auto-e-moto/accessori-auto/lampadine-auto',
            },
            {
              text: 'Portabici',
              link: '/auto-e-moto/accessori-auto/portabici',
            },
          ],
        },
        {
          title: 'Accessori moto',
          link: '/auto-e-moto/accessori-moto',
          subCategories: [
            {
              text: 'Teli coprimoto',
              link: '/auto-e-moto/accessori-moto/teli-coprimoto',
            },
            {
              text: 'Cavalletti moto',
              link: '/auto-e-moto/accessori-moto/cavalletti-moto',
            },
            {
              text: 'Grassi catena moto',
              link: '/auto-e-moto/accessori-moto/grassi-catena-moto',
            },
          ],
        },
        {
          title: 'Oli lubrificanti e liquidi motore',
          link: '/auto-e-moto/oli-lubrificanti-e-liquidi-motore',
          subCategories: [
            {
              text: 'Olio motore',
              link: '/auto-e-moto/oli-lubrificanti-e-liquidi-motore/olio-motore',
            },
            {
              text: 'Grassi auto, lubrificanti e sbloccanti',
              link: '/auto-e-moto/oli-lubrificanti-e-liquidi-motore/grassi-auto-lubrificanti-e-sbloccanti',
            },
            {
              text: 'Additivi diesel e benzina',
              link: '/auto-e-moto/oli-lubrificanti-e-liquidi-motore/additivi-diesel-e-benzina',
            },
            {
              text: 'Liquidi radiatore',
              link: '/auto-e-moto/oli-lubrificanti-e-liquidi-motore/liquidi-radiatore',
            },
            {
              text: 'Liquidi lavavetri',
              link: '/auto-e-moto/oli-lubrificanti-e-liquidi-motore/liquidi-lavavetri',
            },
          ],
        },
        {
          title: 'Pulizia e manutenzione',
          link: '/auto-e-moto/pulizia-e-manutenzione',
          subCategories: [
            {
              text: 'Idropulitrici',
              link: '/auto-e-moto/pulizia-e-manutenzione/idropulitrici',
            },
            {
              text: 'Lucidatrici auto',
              link: '/auto-e-moto/pulizia-e-manutenzione/lucidatrici-auto',
            },
            {
              text: 'Aspirapolveri auto',
              link: '/auto-e-moto/pulizia-e-manutenzione/aspirapolveri-auto',
            },
            {
              text: 'Pulitore vetri',
              link: '/auto-e-moto/pulizia-e-manutenzione/pulitore-vetri',
            },
            {
              text: 'Nero gomme',
              link: '/auto-e-moto/pulizia-e-manutenzione/nero-gomme',
            },
            {
              text: 'Shampoo e detergenti auto',
              link: '/auto-e-moto/pulizia-e-manutenzione/shampoo-e-detergenti-auto',
            },
            {
              text: 'Prodotti pulizia interni auto',
              link: '/auto-e-moto/pulizia-e-manutenzione/prodotti-pulizia-interni-auto',
            },
          ],
        },
        {
          title: 'Batterie e caricabatterie',
          link: '/auto-e-moto/batterie-e-caricabatterie',
          subCategories: [
            {
              text: 'Caricabatterie e avviatori auto e moto',
              link: '/auto-e-moto/batterie-e-caricabatterie/caricabatterie-e-avviatori-auto-e-moto',
            },
            {
              text: 'Cavi batteria',
              link: '/auto-e-moto/batterie-e-caricabatterie/cavi-batteria',
            },
          ],
        },
        {
          title: 'Sollevatori e Cric',
          link: '/auto-e-moto/sollevatori-e-cric',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/giocattoli',
      text: 'Giocattoli',
      iconMobile: Icon15,
      menuSecondLevel: [
        {
          title: 'Giocattoli prima infanzia',
          link: '/giocattoli/giocattoli-prima-infanzia',
          subCategories: [],
        },
        {
          title: 'Bambole e bambolotti',
          link: '/giocattoli/bambole-e-bambolotti',
          subCategories: [],
        },
        {
          title: 'Bici, tricicli, pattini e monopattini',
          link: '/giocattoli/bici-tricicli-pattomo-e-monopattini',
          subCategories: [],
        },
        {
          title: 'Macchinine, piste e modellini',
          link: '/giocattoli/macchinine-pist-e-modellini',
          subCategories: [],
        },
        { title: 'Peluche', link: '/giocattoli/peluche', subCategories: [] },
        {
          title: 'Giochi educativi',
          link: '/giocattoli/giochi-educativi',
          subCategories: [],
        },
        {
          title: 'Costruzioni',
          link: '/giocattoli/costruzioni',
          subCategories: [],
        },
        {
          title: 'Carte e giochi da tavolo',
          link: '/giocattoli/carte-e-giochi-da-tavolo',
          subCategories: [],
        },
        {
          title: 'Strumenti musicali',
          link: '/giocattoli/strumenti-musicali',
          subCategories: [],
        },
        {
          title: 'Maschere e costumi',
          link: '/giocattoli/maschere-e-costumi',
          subCategories: [],
        },
        { title: 'Scuola', link: '/giocattoli/scuola', subCategories: [] },
        {
          title: 'Giochi acquatici',
          link: '/giocattoli/giochi-acquatici',
          subCategories: [],
        },
      ],
      menuSecondLevelImage: '',
    },
    {
      link: '/animali',
      text: 'Animali',
      iconMobile: Icon16,
      menuSecondLevel: [
        {
          title: 'Cani',
          link: '/animali/cani',
          subCategories: [
            { text: 'Cibo per cani', link: '/animali/cani/cibo-per-cani' },
            { text: 'Cucce per cani', link: '/animali/cani/cucce-per-cani' },
            { text: 'Antiparassitari', link: '/animali/cani/antiparassitari' },
            { text: 'Guinzaglieria', link: '/animali/cani/guinzaglieria' },
            { text: 'Trasportini', link: '/animali/cani/trasportini' },
            { text: 'Accessori', link: '/animali/cani/accessori' },
            { text: 'Ciotole', link: '/animali/cani/ciotole' },
            { text: 'Toelettatura', link: '/animali/cani/toelettatura' },
            { text: 'Recinti', link: '/animali/cani/recinti' },
          ],
        },
        {
          title: 'Gatti',
          link: '/animali/gatti',
          subCategories: [
            { text: 'Cibo per gatti', link: '/animali/gatti/cibo-per-gatti' },
            { text: 'Lettiere', link: '/animali/gatti/lettiere' },
            { text: 'Tiragraffi', link: '/animali/gatti/tiragraffi' },
            { text: 'Toelettatura', link: '/animali/gatti/toelettatura' },
            { text: 'Accessori', link: '/animali/gatti/accessori' },
            { text: 'Antiparassitari', link: '/animali/gatti/antiparassitari' },
            { text: 'Ciotole', link: '/animali/gatti/ciotole' },
          ],
        },
        { title: 'Uccelli', link: '/animali/uccelli', subCategories: [] },
      ],
      menuSecondLevelImage: '',
    },
  ],
  linkUtil: [
    {
      titleLinkUtil: 'Link utili',
      links: [
        {
          text: 'Assistenza',
          link: '#',
        },
        {
          text: `Dov'è il mio ordine?`,
          link: '#',
        },
      ],
    },
  ],
}

// Aqui são configurados os schemas pra exibição no site editor
CustomMegaMenu.getSchema = () => {
  return {
    title: 'Menu Principal',
    description: 'Links do menu principal',
    type: 'object',
    properties: {
      menuFirstLevel: {
        type: 'array',
        title: 'Menu primeiro nível',
        items: {
          type: 'object',
          title: 'Categorias',
          properties: {
            text: {
              type: 'string',
              title: 'Texto de exibição',
              default: null,
            },
            link: {
              type: 'string',
              title: 'Link',
              default: null,
            },
            iconMobile: {
              type: 'string',
              title: 'Ícone do menu mobile',
              description: 'Ex: saude-e-bem-estar',
            },
            menuSecondLevel: {
              type: 'array',
              title: 'Menu segundo nível',
              items: {
                type: 'object',
                title: 'Dropdown Menu',
                properties: {
                  title: {
                    type: 'string',
                    title: 'Texto de exibição',
                    default: null,
                  },
                  link: {
                    type: 'string',
                    title: 'Link',
                    default: null,
                  },
                  subCategories: {
                    type: 'array',
                    title: 'Subcategories',
                    items: {
                      type: 'object',
                      title: 'links menu nivel 3',
                      properties: {
                        text: {
                          type: 'string',
                          title: 'Texto de subcategoria',
                          default: null,
                        },
                        link: {
                          type: 'string',
                          title: 'Link da subcategoria',
                          default: null,
                        },
                      },
                    },
                  },
                },
              },
            },
            menuSecondLevelImage: {
              type: 'string',
              title: 'Banner subCategoria',
              widget: {
                'ui:widget': 'image-uploader',
              },
            },
          },
        },
      },
      linkUtil: {
        type: 'array',
        title: 'Menu de links utils',
        items: {
          type: 'object',
          title: 'Seção de links',
          properties: {
            titleLinkUtil: {
              type: 'string',
              title: 'Titulo',
              default: null,
            },
            links: {
              type: 'array',
              title: 'Links',
              items: {
                type: 'object',
                title: 'Links',
                properties: {
                  text: {
                    type: 'string',
                    title: 'Texto do link',
                    default: null,
                  },
                  link: {
                    type: 'string',
                    title: 'Link',
                    default: null,
                  },
                },
              },
            },
          },
        },
      },
    },
  }
}

export default CustomMegaMenu

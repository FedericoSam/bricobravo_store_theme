import React, { useState, useEffect, useRef } from 'react'
import style from './style.css'
import { Link } from 'vtex.render-runtime'
import { useDevice } from 'vtex.device-detector'
import { Icon } from 'vtex.store-icons'
import arrowRight from '../../../assets/icons/arrowRightGray.svg'
import IconPlanta from '../../../assets/icons/vasoDePlanta.svg';


const CustomMegaMenu = ({ menuFirstLevel }) => {
  const node = useRef()
  const { isMobile } = useDevice()
  const [isOpen, setIsOpen] = useState()
  const [megamenu, setMegaMenu] = useState()

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

  const handleToggleMenu = (index) => {
    setIsOpen(true)
    setMegaMenu(index)
  }

  const mobileHandleToggleMenu = (index) => {
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
    <nav className={style['top-navigation']}>
      <div className={style['container']}>
        <ul className={style['menu-department']}>
          {menuFirstLevel?.map(({ link, text}, index) => {
              return (
                <li ref={node} key={index} className={style['menu-header-category']}>
                  <Link
                    to={link}
                    onMouseOver={() => handleToggleMenu(index)}
                    className={`${style["category-menu-item"]} ${megamenu === index && isOpen ? style['category-menu-item--active'] : style['']}`}
                  >
                    <div className={`${style["col1"]}`}>
                      <img style={{ marginRight: "20px" }} src={IconPlanta} alt="" />
                      {text}
                    </div>
                    <img className={`${style["col2"]}`} src={arrowRight} alt="arrow" />                  </Link>
                </li>
              )
          })}
          <div className={`${style["link-utili-container"]}`}>
            <h3>Link utili</h3>
            <li>
              <Link
                to='#'
                className={`${style["category-menu-item"]}`}
              >
                Store Locator
              </Link>
            </li>
            <li>
              <Link
                to='#'
                className={`${style["category-menu-item"]}`}
              >
                Dov'è il mio ordine?
              </Link>
            </li>
            <li>
              <Link
                to='#'
                className={`${style["category-menu-item"]}`}
              >
                Effetuare un reso
              </Link>
            </li>
            <li>
              <Link
                to='#'
                className={`${style["category-menu-item"]}`}
              >
                FAQ e contatti
              </Link>
            </li>
          </div>
        </ul>


        {menuFirstLevel?.map(({menuSecondLevel, menuSecondLevelImage}, index) => {
          return isOpen && (
            <div key={index} id="megamenu"  className={`${style["megamenu"]} ${megamenu === index && isOpen ? style['megamenu--active'] : style['megamenu--inactive']}`} onMouseLeave={() => setIsOpen(false)} >
              <img src={menuSecondLevelImage} alt="banner" className={`${style["bannerSubCategory"]}`} />
              <ul className={style['submenu-items']}>
                {menuSecondLevel?.map(({title, subCategories}, index) => {
                  return (
                    <li key={index} className={`${style["subcategory-container"]}`}>
                      <h5>{ title }</h5>
                      {subCategories?.map(({ text, link }, ind) => {
                        return (
                          <li key={ind} className={`${style["subcategory-item"]}`}>
                            <Link
                              to={link}
                            >
                              {text}
                            </Link>    
                          </li>
                        )
                      })}
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </nav>
  ) : (
    <>
    <nav className={style['mobile-top-navigation']}>
      <div className={style['container']}>
        <ul className={style['mobile-menu-department']}>
          {menuFirstLevel?.map(({ text, iconMobile }, index) => {
              return (
                <li key={index} className={`${style["mobile-menu-header-category"]} ${ megamenu == index && isOpen ? style['mobile-menu-header-category--active'] : style['']}`} onClick={() => mobileHandleToggleMenu(index)}>
                  <Icon id={megamenu == index && isOpen ? `${iconMobile}-white` : iconMobile} type="filled"/>
                  <p 
                    className={style["category-menu-item"]}
                  >
                    {text}
                  </p>
                  <i className={`${style["category-menu-arrow"]} ${ megamenu == index && isOpen ? style['category-menu-arrow--active'] : style['']}`}></i>
                </li>
              )
          })}
        </ul>
      </div>
    </nav>

    {menuFirstLevel?.map(({link, text, menuSecondLevel}, index) => {
      return isOpen && index == megamenu ? (
        <div key={index} className={style["mobile-mega-menu"]} >
          <h2 className={style["mobile-mega-menu-title"]}
            onClick={() => setIsOpen(false)}
          >
            {`${text}`}
          </h2>
          <ul className={style["mobile-mega-menu-items"]}>
            {menuSecondLevel?.map(({title, subCategories}, index) => {
              return (
                <>
                  <h5 key={index}
                    className={style["mobile-category-menu-item"]}
                  >{ title }</h5>
                  {console.log(subCategories)}
                  {subCategories?.map(({ text, link }, ind) => {
                    <li key={ind} className={`${style["subcategory-item"]}`}>
                      <Link
                        to={link}
                      >
                        {text}
                      </Link>    
                    </li>
                  })}
                </>
              )
            })}
          </ul>

          <Link to={link} className={style["mobile-mega-menu-cta"]}>
            Ver Tudo em {text}
          </Link>
        </div>
      ) : null
    })}

    </>
  )
}

// Caso o componente não receba nenhuma props ele vai usar essas como default
CustomMegaMenu.defaultProps = {
  
  menuFirstLevel: [
    {
      link: '#',
      text: 'Giardinaggio',
      iconMobile: 'giardinaggio',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/740x457/94d6f5/ff9d00.jpg',
    },
    {
      link: '#',
      text: 'Piscine e accessori',
      iconMobile: 'piscine-acessori',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/740x457/94d6f5/ff9d00.jpg',
    },
    {
      link: '#',
      text: 'Arredo giardino',
      iconMobile: 'arredo-giardino',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/740x457/94d6f5/ff9d00.jpg',
    },
    {
      link: '#',
      text: 'Climatizzazione',
      iconMobile: 'climatizzazione',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/740x457/94d6f5/ff9d00.jpg',
    },
    {
      link: '#',
      text: 'Cassette e box',
      iconMobile: 'cassete-box',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
      menuSecondLevelImage: 'https://dummyimage.com/740x457/94d6f5/ff9d00.jpg',
    },
    {
      link: '#',
      text: 'Bricolage e Fai da te',
      iconMobile: 'bricolage-fai-da-te',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
    },
    {
      link: '#',
      text: 'Arredo casa',
      iconMobile: 'arredo-casa',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
    },
    {
      link: '#',
      text: 'Sport e tempo libero',
      iconMobile: 'sport-tempo-libero',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
    },
    {
      link: '#',
      text: 'Antinfortunistica',
      iconMobile: 'antinfortunistica',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
    },
    {
      link: '#',
      text: 'Illuminazione',
      iconMobile: 'illuminazione',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
    },
    {
      link: '#',
      text: 'Riscaldamento',
      iconMobile: 'riscaldamento',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
    },
    {
      link: '#',
      text: 'Giocattoli',
      iconMobile: 'giocattoli',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
    },
    {
      link: '#',
      text: 'Animali',
      iconMobile: 'Animali',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
    },
    {
      link: '#',
      text: 'Elettrodomestici',
      iconMobile: ' elettrodomestici',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
      ],
    },
    {
      link: '#',
      text: 'Auto e moto',
      iconMobile: 'auto-moto',
      menuSecondLevel: [
        {
          title: 'Raccolta olive',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
        },
        {
          title: 'Accessori giardinaggio',
          subCategories: [
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            },
            {
              text: "Lorem ipsum dolor sit amet",
              link: '#',
            }
          ],
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
              type: "string",
              title: "Ícone do menu mobile",
              description: "Ex: saude-e-bem-estar"
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
                  subCategories: {
                    type: 'array',
                    title: 'Subcategories',
                    items: {
                      type: "object",
                      title: "links menu nivel 3",
                      properties: {
                        text: {
                          type: "string",
                          title: "Texto de subcategoria",
                          default: null
                        },
                        link: {
                          type: "string",
                          title: "Link da subcategoria",
                          default: null
                        }
                      }
                    }
                  }
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

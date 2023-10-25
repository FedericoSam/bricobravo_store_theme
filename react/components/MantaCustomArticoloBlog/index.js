import React from 'react'
import style from './style.css'

const MantaCustomArticoloBlog = ({ articles = [] }) => {
  return (
    <div>
      {articles.map((article, index) => (
        <>
          {index === 0 && <div className={style.divider}></div>}

          <div key={index} className={style.blog}>
            <a href={article.buttonLink} className={style.imageDivBlog}>
              <img
                src={article.imageSrcDesktop}
                className={style.imageBlogDesktop}
                alt={article.altImage}
              />
              {/* <img
                src={article.imageSrcMobile}
                className={style.imageBlogMobile}
                alt={article.altImage}
              /> */}
            </a>
            <div className={style.containerBlog}>
              <p className={style.numerazioneClassifica}>#{index + 1}</p>
              <h2 className={style.titleBlog}>{article.title}</h2>
              {/* <h3 className={style.subTitleBlog}>{article.subtitle}</h3> */}
              <p className={style.descriptionBlog}> {article.description}</p>
              <a href={article.buttonLink} className={style.buttonLinkBlog}>
                {article.buttonText}
              </a>
            </div>
          </div>
          <div className={style.divider}></div>
        </>
      ))}
    </div>
  )
}

MantaCustomArticoloBlog.schema = {
  title: 'Articoli',
  description: 'Articoli',
  type: 'object',
  properties: {
    articles: {
      title: 'Articoli',
      type: 'array',
      default: [],
      items: {
        type: 'object',
        properties: {
          imageSrcDesktop: {
            title: 'Immagine',
            type: 'string',
            default: 'https://placehold.co/1000x1000',
            widget: {
              'ui:widget': 'image-uploader',
            },
          },

          // imageSrcMobile: {
          //   title: 'Immagine Mobile',
          //   type: 'string',
          //   widget: {
          //     'ui:widget': 'image-uploader',
          //   },
          // },
          altImage: {
            title: 'Alt Immagine',
            type: 'string',
            default: 'Best of',
          },
          title: {
            title: 'Titolo',
            type: 'string',
            default: 'Titolo',
          },
          // subtitle: {
          //   title: 'Sottotitolo',
          //   type: 'string',
          //   default: 'Sottotitolo',
          // },
          description: {
            title: 'Descrizione',
            type: 'string',
            default:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          },
          buttonText: {
            title: 'Testo del bottone',
            type: 'string',
            default: "SCOPRI L'ARTICOLO",
          },
          buttonLink: {
            title: 'Link del bottone',
            type: 'string',
            default: '#',
          },
        },
      },
    },
  },
}

export default MantaCustomArticoloBlog

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import debounce from 'debounce'
import classNames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

import styles from './styles.css'

const CSS_HANDLES = ['container', 'content', 'showMoreButton']

const transitionStyle = (transitionTime: number) => ({
  transition: `${transitionTime}ms ease-in-out`,
})

const fadeBottomClasses = (state: string) =>
  classNames(styles.fadeBottom, { 'o-0': state === 'entered' }, 'w-100 h-50')

const pointerEventsAutoClasses = (state: string) =>
  classNames(
    styles.pointerEventsAuto,
    {
      'bg-transparent': state === 'entered',
      'bg-base': state !== 'entered',
    },
    'w-100'
  )

function GradientCollapse(props: {
  children: any
  collapseHeight: any
  onCollapsedChange: any
  collapsed: any
}) {
  const {
    children,
    collapseHeight,
    onCollapsedChange,
    collapsed: collapsedProp,
  } = props

  const { handles } = useCssHandles(CSS_HANDLES)
  const [collapsed, setCollapsed] = useState(collapsedProp)
  const [prevCollapsedProp, setPrevCollapsedProp] = useState(collapsedProp)
  const [maxHeight, setMaxHeight] = useState<string | number>('auto')
  const [collapseVisible, setCollapseVisible] = useState(true)
  const wrapper = useRef(null)

  if (prevCollapsedProp !== collapsedProp) {
    setCollapsed(collapsedProp)
    setPrevCollapsedProp(collapsedProp)
  }

  const calcMaxHeight = () => {
    const wrapperEl = wrapper.current as any

    // check if the content is smaller than the passed
    // height to collapse
    if (wrapperEl.scrollHeight > collapseHeight) {
      setMaxHeight(Number(wrapperEl.scrollHeight) + 60)
      setCollapseVisible(true)
    } else {
      setCollapseVisible(false)
      setMaxHeight('auto')
    }
  }

  const handleCollapsedChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newValue: boolean
  ) => {
    setCollapsed(newValue)
    setPrevCollapsedProp(collapsedProp)

    if (onCollapsedChange) {
      onCollapsedChange(e, newValue)
    }
  }

  const debouncedCalcMaxHeight = debounce(calcMaxHeight, 500)

  useLayoutEffect(() => {
    window.addEventListener('resize', debouncedCalcMaxHeight)
    calcMaxHeight()

    return () => {
      window.removeEventListener('resize', debouncedCalcMaxHeight)
    }
  })

  const height = collapseVisible && collapsed ? collapseHeight : maxHeight
  const transitionTime = 600
  const fadeOutTime = 400

  const pointerEventsNoneClasses = classNames(
    styles.pointerEventsNone,
    { flex: collapseVisible, dn: !collapseVisible },
    'absolute bottom-0 w-100 h-100 flex-column justify-end'
  )

  return (
    <Transition timeout={transitionTime} in={!collapsed}>
      {(state) => (
        <div
          style={{
            ...transitionStyle(transitionTime),
            height,
            overflow: 'hidden',
            display: 'block',
          }}
          onTransitionEnd={calcMaxHeight}
          className={`${handles.container} relative`}>
          <div ref={wrapper} className={`${handles.content} h-auto`}>
            {children}
          </div>
          <div className={pointerEventsNoneClasses}>
            <div
              style={transitionStyle(fadeOutTime)}
              className={fadeBottomClasses(state)}
            />
            <div className={pointerEventsAutoClasses(state)}>
              <button
                onClick={(e) => handleCollapsedChange(e, !collapsed)}
                style={{
                  fontFamily: 'Roboto',
                  border: 'none',
                  marginBottom: '20px',
                  backgroundColor: 'transparent',
                  fontWeight: '600',
                  color: '#0B1658',
                }}
                className={`${handles.showMoreButton} mv5`}>
                {state === 'entered' || (collapsed && state !== 'exited')
                  ? 'Leggi meno'
                  : 'Leggi tutto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

GradientCollapse.propTypes = {
  /** Maximum height collapsed */
  collapseHeight: PropTypes.number.isRequired,
  collapsed: PropTypes.bool,
  children: PropTypes.node,
  onCollapsedChange: PropTypes.func,
}

GradientCollapse.defaultProps = {
  collapsed: true,
}

export default GradientCollapse

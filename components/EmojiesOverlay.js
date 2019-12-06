import React, { useCallback } from 'react'
import { Emoji } from 'emoji-mart'
import { useEmojies } from './EmojiesContext'
import { COLORS } from '../lib/constants'
import RemoveIcon from './svg/Remove'

const EmojiesOverlayItem = ({ index, emoji, containerRef, onChange }) => {
  const offset = React.useRef()
  const [position, setPosition] = React.useState({ top: emoji.top, left: emoji.left })

  const onMouseMove = React.useCallback(
    e => {
      const position = containerRef.current.getBoundingClientRect()

      const top =
        ((e.clientY - offset.current.top - position.top) * 100.0) /
        containerRef.current.offsetHeight
      const left =
        ((e.clientX - offset.current.left - position.left) * 100.0) /
        containerRef.current.offsetWidth

      setPosition({ top, left })
    },
    [offset, containerRef, setPosition]
  )

  const onMouseUp = React.useCallback(
    e => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)

      const position = containerRef.current.getBoundingClientRect()

      const top =
        ((e.clientY - offset.current.top - position.top) * 100.0) /
        containerRef.current.offsetHeight
      const left =
        ((e.clientX - offset.current.left - position.left) * 100.0) /
        containerRef.current.offsetWidth

      onChange({ ...emoji, top, left }, index)
    },
    [offset, emoji, index, containerRef, onChange, onMouseMove]
  )

  const onMouseDown = React.useCallback(
    e => {
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)

      const position = e.target.getBoundingClientRect()
      const centerX = position.left + e.target.offsetWidth / 2
      const centerY = position.top + e.target.offsetHeight / 2

      const top = e.clientY - centerY
      const left = e.clientX - centerX

      offset.current = { top, left }
    },
    [onMouseMove, onMouseUp]
  )

  const onRemove = useCallback(() => {
    onChange(null, index)
  }, [index, onChange])

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        className="emojies-overlay-item"
        onMouseDown={onMouseDown}
        style={{ top: `${position.top}%`, left: `${position.left}%` }}
      >
        <Emoji emoji={emoji.emoji} size={64} />
        <span role="button" tabIndex={0} className="emojies-overlay-item-remove" onClick={onRemove}>
          <RemoveIcon size={10} color="white" />
        </span>
      </span>
      <style jsx>
        {`
          .emojies-overlay-item {
            transition: background-color 0.2s ease;
            position: absolute;
            margin-top: -64px;
            margin-left: -64px;
            z-index: 999;
            border-radius: 50%;
            width: 128px;
            height: 128px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: grab;
            overflow: hidden;
            background-color: transparent;
            will-change: background-color;
          }
          .emojies-overlay-item:hover {
            background-color: rgba(0, 0, 0, 0.1);
            z-index: 9999;
          }
          .emojies-overlay-item-remove {
            transition: background-color 0.2s ease;
            color: #fff;
            position: absolute;
            top: 100%;
            left: 50%;
            width: 128px;
            height: 128px;
            margin-left: -64px;
            margin-top: -24px;
            visibility: hidden;
            cursor: pointer;
            border-radius: 50%;
            text-align: center;
            will-change: background-color;
            background-color: rgba(0, 0, 0, 0.1);
          }
          .emojies-overlay-item-remove:hover {
            background-color: ${COLORS.BLACK};
          }
          .emojies-overlay-item:hover .emojies-overlay-item-remove {
            visibility: visible;
          }
        `}
      </style>
    </>
  )
}

const EmojiesOverlay = ({ children }) => {
  const containerRef = React.useRef()
  const [emojies, onChange] = useEmojies()

  return (
    <div className="emojies-overlay" ref={containerRef}>
      {children}
      {emojies.map((emoji, index) => (
        <EmojiesOverlayItem
          key={emoji.key}
          index={index}
          emoji={emoji}
          containerRef={containerRef}
          onChange={onChange}
        />
      ))}
      <style jsx>
        {`
          .emojies-overlay {
            position: relative;
            width: 100%;
          }
          .emojies-overlay > span {
            position: absolute;
            margin-top: -32px;
            margin-left: -32px;
            z-index: 999;
          }
          .emojies-overlay > span,
          .emojies-overlay > span > span {
            width: 24px;
            height: 24px;
          }
        `}
      </style>
    </div>
  )
}

export default EmojiesOverlay

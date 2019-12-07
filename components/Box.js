import React from 'react'
import map from 'lodash.map'
import kebabCase from 'lodash.kebabcase'

const Box = props => {
  const { children, className = '', onClick, ...styleProps } = props

  return (
    <div role="button" tabIndex={0} className={`box ${className}`} onClick={onClick}>
      {children}
      <style jsx>
        {`
          .box {
            ${map(styleProps, (value, key) => {
              return `${kebabCase(key)}: ${value};`
            }).join('\n')}
          }
        `}
      </style>
    </div>
  )
}

export default Box

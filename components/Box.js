import React from 'react'
import map from 'lodash.map'
import kebabCase from 'lodash.kebabcase'

const Box = props => {
  const { children, className, ...styleProps } = props

  return (
    <div className={`box ${className}`}>
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

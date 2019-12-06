import React from 'react'

function noop() {}

const Context = React.createContext([[], noop])

export function useEmojies() {
  return React.useContext(Context)
}

export default Context

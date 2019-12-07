import React from 'react'
import Box from './Box'
import Button from './Button'
import AddIcon from './svg/Add'
import RemoveIcon from './svg/Remove'

const Page = props => {
  const { title, page, selected, onAdd, onRemove, onChange } = props

  const onClick = React.useCallback(() => {
    if (onAdd) {
      onAdd()
    } else {
      onChange(page)
    }
  }, [page, onAdd, onChange])

  const onRemoveClick = React.useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()

      onRemove(page)
    },
    [page, onRemove]
  )

  return (
    <Button
      border
      center
      large
      className="button"
      flex="0 0 auto"
      margin="0 0.5rem 0 0"
      padding="0.5rem"
      minWidth="33px"
      background="transparent"
      selected={selected}
      onClick={onClick}
    >
      {typeof page === 'undefined' ? <AddIcon color="#fff" /> : title || page + 1}
      {typeof page !== 'undefined' && (
        <Box marginLeft="0.5rem" display="flex" alignItems="center" onClick={onRemoveClick}>
          <RemoveIcon color="#fff" size={8} />
        </Box>
      )}
    </Button>
  )
}

const Pagination = props => {
  const { pages, page, onAdd, onChange, onRemove } = props

  return (
    <Box display="flex" justifyContent="flex-start">
      {pages.map((p, index) => (
        <Page
          key={index}
          page={index}
          title={pages[index].title}
          selected={page === index}
          onChange={onChange}
          onRemove={onRemove}
        />
      ))}
      <Page onAdd={onAdd} />
    </Box>
  )
}

export default Pagination

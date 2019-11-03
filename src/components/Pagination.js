import React from 'react'
import JwPagination from 'jw-react-pagination'

function Pagination({ items, initialPage, onChangePage }) {

  const customLabels = {
    first: '<<',
    last: '>>',
    previous: '<',
    next: '>'
  }

  return (
    <JwPagination items={items} 
        onChangePage={onChangePage} 
        pageSize={15}
        initialPage={initialPage}
        disableDefaultStyles={true}
        labels={customLabels}
    />
  )
}

export default Pagination
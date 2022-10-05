import { useEffect } from 'react'

// This custom is to show the clear filter button when the user click at the first filter Item
const ShowClearFilterButton = () => {
useEffect(() => {
  setTimeout(() => {
    const filterItems = document.querySelectorAll('.vtex-search-result-3-x-filterItem')
    for(let i = 0; i < filterItems.length; i++) {
      filterItems[i].addEventListener("click", function (e) {
        setTimeout(() => {
          const filterSelected = document.querySelectorAll('.vtex-search-result-3-x-filterItem--selected')
            if(filterSelected.length >= 0) {
              const clearFilterButton = document.querySelector('.vtex-search-result-3-x-filter__container--clearAllFilters')
              clearFilterButton.style.display = 'block'
            }
        },2100)

      })
    }
  }, 1500);

  },[])
  return null
}

export default ShowClearFilterButton

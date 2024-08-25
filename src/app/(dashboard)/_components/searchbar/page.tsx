
const SearchBar = () => {
  return (
    <form className="py-7 w-full max-w-sm ml-auto translate-x-11">
      <div className="search-input-container relative">
        <input className="search-input pl-11 outline-none" placeholder="search" type="text" name="" id="" />
        <svg className="search-icon absolute top-1/2 left-4 -translate-y-1/2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path className="transition " d="M8.11115 15.2223C12.0385 15.2223 15.2223 12.0385 15.2223 8.11115C15.2223 4.18377 12.0385 1 8.11115 1C4.18377 1 1 4.18377 1 8.11115C1 12.0385 4.18377 15.2223 8.11115 15.2223Z" fill="#28282D" fillOpacity="0.21" stroke="#606068" strokeOpacity="0.72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path className="transition " d="M17.0005 17.0002L13.1338 13.1335" stroke="#606068" strokeOpacity="0.72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

      </div>
    </form>
  )
}

export default SearchBar
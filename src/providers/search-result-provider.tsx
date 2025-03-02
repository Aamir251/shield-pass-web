"use client";


import { CredentialBasic, CredentialSearchItem } from "@/types/credentials"
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from "react"




type SearchResultContextType = {
  searchResults : CredentialBasic[] | null
  setSearchResults : Dispatch<SetStateAction<CredentialBasic[] | null>>
}




const SearchResultContext = createContext<SearchResultContextType | null>(null)

const SearchResultContextProvider = ({ children } : PropsWithChildren) => {

  const [ searchResults, setSearchResults ] = useState<CredentialBasic[] | null>([])

  return (
    <SearchResultContext.Provider value={{
      searchResults,
      setSearchResults,
    }}>
      {children}
    </SearchResultContext.Provider>
  )
}

export default SearchResultContextProvider;



export const useSearchResultContext = () => {
  const context = useContext(SearchResultContext)

  if (!context) throw new Error("useSearchResultContext must be used inside SearchResultContext");


  return context
}
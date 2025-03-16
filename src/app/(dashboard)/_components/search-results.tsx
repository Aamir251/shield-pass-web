"use client";

import CredentialItem from "@/components/credential-item";
import ErrorMessage from "@/components/ErrorMessage";
import CredentialsLoader from "@/components/loaders/credentials-loader";
import { useSearchResultContext } from "@/providers/search-result-provider";
import { useSearchParams } from "next/navigation";


const SearchResults = () => {

  const { searchResults } = useSearchResultContext()


  if (!searchResults) {
    return <CredentialsLoader />
  }

  if (!searchResults?.length) {
    return <ErrorMessage message="No Items Found" />
  }
  return (
    <div className="grid lg:grid-cols-3 gap-x-3 gap-y-4 ">

      {
        searchResults?.map(result => <CredentialItem credential={result} key={result.id} />)
      }
    </div>
  )
}



const SearchResultsWrapper = () => {

  const searchParams = useSearchParams()

  const nextSearchParams = new URLSearchParams(searchParams.toString())

  const containsSearchQuery: boolean = nextSearchParams.has("search")


  if (!containsSearchQuery) return null
  
  return (
    <section className="absolute px-5 lg:px-0 top-0 left-0 z-50 bg-background bor w-full h-full lg:max-w-[97%] h-full overflow-y-scroll">
      <SearchResults />
    </section>
  )

}

export default SearchResultsWrapper
"use client";

import { usePathname, useRouter } from "next/navigation";
import SearchForm from "./search-form";
import { useToast } from "@/hooks/use-toast";
import { useSearchResultContext } from "@/providers/search-result-provider";
import { useCallback } from "react";

type SearchBarProps = {

}



const SearchBar = ({ }: SearchBarProps) => {
  const { setSearchResults } = useSearchResultContext()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()

  const removeQuery = useCallback(() => {
    router.replace(pathname)
    setSearchResults(null)
  },[router, pathname ,setSearchResults ])

  const handleSearch = useCallback(async (userInput: string) => {
    
    if (!userInput.length) {
      
      removeQuery()

      return
    }
    try {
      setSearchResults(null)
      const newUrl = new URL(window.location.toString())
      newUrl.searchParams.set('search', userInput)

      router.push(`?search=${userInput}`, {
        scroll : false
      })

      const resp = await fetch("/api/search-credential", {
        method: "POST",
        body: JSON.stringify({
          searchString: userInput
        })
      })
      const data = await resp.json()

      if (!data.success) throw new Error(data.message)

      setSearchResults(data.credentials)

    } catch (error: any) {

      toast({
        title: error.message
      })

    }
  },[removeQuery, router, setSearchResults, toast ])


  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 md:top-6 md:left-auto  w-11/12 md:max-w-sm md:-translate-x-11 z-20">

      <SearchForm removeQuery={removeQuery} handleSearch={handleSearch} />

    </div>
  )
}

export default SearchBar
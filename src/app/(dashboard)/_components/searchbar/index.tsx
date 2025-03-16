"use client";

import { usePathname, useRouter } from "next/navigation";
import SearchForm from "./search-form";
import { useToast } from "@/hooks/use-toast";
import { useSearchResultContext } from "@/providers/search-result-provider";
import { debouncer } from "@/lib/helpers/utils";
import { useCallback } from "react";

type SearchBarProps = {

}



const SearchBar = ({ }: SearchBarProps) => {
  const { toast } = useToast()
  const { setSearchResults } = useSearchResultContext()


  
  const handleSearch = useCallback(async (userInput: string) => {
    console.log("searching");
    if (!userInput) return

    try {
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


  }, [setSearchResults])

  const deboundedSearchHandler = useCallback(debouncer(handleSearch, 1200), [handleSearch])







  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 md:top-6 md:left-auto  w-11/12 md:max-w-sm md:-translate-x-11 z-20">

      <SearchForm handleSearch={deboundedSearchHandler} />

    </div>
  )
}

export default SearchBar
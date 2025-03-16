import { Input } from "@/components/ui/input"
import { debouncer } from "@/lib/helpers/utils";
import { useSearchResultContext } from "@/providers/search-result-provider";
import { Search } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useCallback } from "react";


type SearchFormProps = {
  handleSearch : (userInput : string) => Promise<void>
}

const SearchForm = ({ handleSearch } : SearchFormProps) => {
  const { setSearchResults } = useSearchResultContext()

  const router = useRouter()
  const pathname = usePathname()

  const removeQuery = useCallback(() => {
    router.replace(pathname)
    setSearchResults(null)
  },[router, pathname ,setSearchResults ])


  const handleSubmit = (e : FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleChange = useCallback((e : ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value

    if (!userInput) {
      removeQuery()
      return
    }

    const newUrl = new URL(window.location.toString())
    newUrl.searchParams.set('search', userInput)

    router.push(`?search=${userInput}`, {
      scroll : false
    })



    handleSearch(userInput)
    
  }, [router, handleSearch ])
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="search-input-container relative">
        <Search className="absolute top-1/2 -translate-y-1/2 left-2" size={16} opacity={0.8} />
        <Input onChange={handleChange} placeholder="Search" className="pl-8" />
      </div>
    </form>
  )
}

export default SearchForm
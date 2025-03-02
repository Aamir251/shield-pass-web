import { Input } from "@/components/ui/input"
import { debouncer } from "@/lib/helpers/utils";
import { Search } from "lucide-react"


type SearchFormProps = {
  handleSearch : (userInput : string) => Promise<void>
  removeQuery : () => void
}

const SearchForm = ({ handleSearch, removeQuery } : SearchFormProps) => {

  const debouncedSearchHandler = debouncer(handleSearch, 500)

  return (
    <form >
      <div className="search-input-container relative">
        <Search className="absolute top-1/2 -translate-y-1/2 left-2" size={16} opacity={0.8} />
        <Input onChange={(e) => debouncedSearchHandler(e.target.value)} placeholder="Search" className="pl-8" />
      </div>
    </form>
  )
}

export default SearchForm
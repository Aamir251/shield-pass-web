"use client";

import BasicSpinnerLoader from "@/components/loaders/basic-spinner";
import { debouncer } from "@/lib/helpers/utils";
import { CredentialsType } from "@/types/credentials"
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import Credentials from "./credentials";
import { Credential } from "@prisma/client";

type SearchBarProps = {
  credentialType: CredentialsType
  isSharedCredentialPage? : boolean
}


export type CredentialSearchItem = Pick<Credential, "id" | "name" | "websiteUrl" | "email" | "category">

const SearchBar = ({ credentialType, isSharedCredentialPage = false }: SearchBarProps) => {


  const { data: session } = useSession()

  const [searchResults, setSearchResults] = useState<CredentialSearchItem[]>([])

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setIsLoading(true)
      const value = e.target.value
      setInputValue(value); // Update inputValue state whenever the input changes
      if (!value || !session?.user?.email) return

      const resp = await fetch(`/api/search?searchTerm=${value}&credentialType=${credentialType}`)

      const data = await resp.json()

      if (!data.credentials.length) {
        // no credentials found
        return
      }

      setSearchResults(data.credentials)
    } catch (error) {

    } finally {
      setIsLoading(false)
    }
  }

  const debouncedSearchHandler = debouncer(handleSearch, 500)

  return (
    <div className="relative py-7 w-full max-w-sm -translate-x-11">
      <form >
        <div className="search-input-container relative">
          <input onChange={debouncedSearchHandler} className="search-input pl-11 outline-none" placeholder="search" type="text" name="" id="" />
          <svg className="search-icon absolute top-1/2 left-4 -translate-y-1/2" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="transition " d="M8.11115 15.2223C12.0385 15.2223 15.2223 12.0385 15.2223 8.11115C15.2223 4.18377 12.0385 1 8.11115 1C4.18377 1 1 4.18377 1 8.11115C1 12.0385 4.18377 15.2223 8.11115 15.2223Z" fill="#28282D" fillOpacity="0.21" stroke="#606068" strokeOpacity="0.72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path className="transition " d="M17.0005 17.0002L13.1338 13.1335" stroke="#606068" strokeOpacity="0.72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </form>

      {inputValue && (
        <div className="absolute top-20 bg-secondary-dark w-full py-2 px-2 rounded-md left-0 z-30 ">
          {
            isLoading ? <BasicSpinnerLoader className="w-full h-20 flex-center" /> : <Credentials credentialType={credentialType} credentials={searchResults} />
          }
        </div>
      )}
    </div>
  )
}

export default SearchBar
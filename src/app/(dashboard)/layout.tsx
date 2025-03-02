"use client";
import dynamic from 'next/dynamic'
import { PropsWithChildren, Suspense } from "react"
import TopNav from "./_components/top-nav"
import MainSideBar from "./_components/main-side-bar"
import EncryptionKeyContextProvider from "@/providers/encryption-key"
import CredentialActionContextProvider from "@/providers/credential-actions-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import SearchResultContextProvider from "@/providers/search-result-provider";
import MainSkeletonLoader from '@/components/loaders/main-skeleton-loader';

const AddCredentialLink = dynamic(() => import('./_components/add-credential-link'));
const SearchResultsWrapper = dynamic(() => import("./_components/search-results"), {
  loading: () => <LoadingSpinner />
});

const DashboardLayout = ({ children }: PropsWithChildren<{ params: any }>) => {


  return <Suspense fallback={<MainSkeletonLoader />}>
    <EncryptionKeyContextProvider>
      <CredentialActionContextProvider>
        <SearchResultContextProvider>
          
          <main className="h-dvh mx-auto">
            <TopNav />

            <section className="flex gap-x-4 h-dvh">
              <MainSideBar />
              <div style={{ height: "calc(100dvh - 180px)" }} className="mt-36 lg:mt-auto w-full px-5 lg:px-0 relative ">
                <div className='w-full lg:max-w-[97%]'>
                  {children}
                </div>
                <Suspense>
                  <SearchResultsWrapper />
                </Suspense>
              </div>

            </section>

            <AddCredentialLink />
          </main>


        </SearchResultContextProvider>
      </CredentialActionContextProvider>
    </EncryptionKeyContextProvider>
  </Suspense>
}


export default DashboardLayout
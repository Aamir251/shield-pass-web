import BasicSpinnerLoader from "@/components/loaders/basic-spinner"

const loading = () => {
  return (
    <div className="h-full flex-grow flex-center">
      <BasicSpinnerLoader />
    </div>
  )
}

export default loading
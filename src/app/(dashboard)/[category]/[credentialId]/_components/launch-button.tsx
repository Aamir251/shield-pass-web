import Link from "next/link"


type LaunchButtonProps = {
  credentialWebsiteLink: string
}
const LaunchButton = ({ credentialWebsiteLink }: LaunchButtonProps) => {
  return (
    <Link target="_blank" className="btn-primary px-6 py-2 rounded-sm font-medium block w-max" href={`${credentialWebsiteLink}`}>Launch! 🚀</Link>
  )
}

export default LaunchButton
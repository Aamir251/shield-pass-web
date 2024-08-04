
"use client";


import Link from "next/link"

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Link href={"/dashboard/private/credentials/logins"}>Go Home</Link>
    </div>
  )
}
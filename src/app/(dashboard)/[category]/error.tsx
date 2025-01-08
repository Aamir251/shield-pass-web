"use client";

import { BASE_URL } from "@/constants"
import Link from "next/link"

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {

  return (
    <div>
      <h2>{error.message}</h2>
      <Link href={BASE_URL}>Go Home</Link>
    </div>
  )
}
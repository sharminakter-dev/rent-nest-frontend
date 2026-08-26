'use client'

import { useState } from 'react'
import Image from 'next/image'

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

export function PropertyHeroImage({
  src,
  alt,
}: {
  src: string | null
  alt: string
}) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_IMAGE)

  return (
    <Image
      src={imgSrc}
      unoptimized
      alt={alt}
      fill
      priority
      className="object-cover"
      onError={() => setImgSrc(FALLBACK_IMAGE)}
    />
  )
}
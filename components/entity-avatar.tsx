import Image from 'next/image'

export function EntityAvatar({
  src,
  fallbackSeed,
  alt,
  size = 48,
}: {
  src?: string | null
  fallbackSeed: string
  alt: string
  size?: number
}) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-full border bg-muted"
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          unoptimized
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-muted-foreground">
          {fallbackSeed?.charAt(0).toUpperCase() ?? '?'}
        </div>
      )}
    </div>
  )
}
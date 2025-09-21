import Link from "next/link"
import Image from "next/image"

export function SimpleHeader() {
  return (
    <header className="bg-gradient-to-r from-purple-900 to-blue-900 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/floresiendo-logo-banner.png"
              alt="FloreSiendo Logo"
              width={400}
              height={400}
              className="max-w-full h-auto"
            />
          </Link>
        </div>
      </div>
    </header>
  )
}

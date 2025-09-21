import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/floresiendo-logo-new.svg"
                alt="FloreSiendo Logo"
                width={56}
                height={56}
                className="rounded-full"
              />
              <span className="text-xl font-bold text-purple-600">FloreSiendo</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8"></nav>

          <div className="flex items-center space-x-4"></div>
        </div>
      </div>
    </header>
  )
}

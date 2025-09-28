"use client"

import { useState } from "react"
import { trackViewContent } from "@/lib/meta-tracking-v2"

export default function VideoSectionV2() {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleVideoClick = () => {
    setIsPlaying(true)

    // Tracking automático - sin necesidad de pasar parámetros manualmente
    trackViewContent({
      funnel: "video",
      source: "floresiendo_lp",
      content_type: "video",
      content_name: "video_video",
    })
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Descubre Tu Transformación</h2>

          <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
            {!isPlaying ? (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={handleVideoClick}
              >
                <img src="/video-thumbnail-floresiendo-retreat.jpg" alt="Video thumbnail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center group-hover:bg-opacity-100 transition-all">
                    <div className="w-0 h-0 border-l-8 border-l-purple-600 border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

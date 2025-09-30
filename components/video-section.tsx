"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, X } from "lucide-react"
import { trackViewContent } from "@/lib/meta-pixel"

interface VideoSectionProps {
  title: string
  subtitle: string
  description: string
  videoId: string
  thumbnail?: string
  className?: string
  funnel?: string
}

export function VideoSection({
  title,
  subtitle,
  description,
  videoId,
  thumbnail,
  className = "",
  funnel = "unknown",
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [imageError, setImageError] = useState(false)

  const youtubeThumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`

  const handlePlayVideo = () => {
    setIsPlaying(true)
    trackViewContent({
      content_name: funnel === "video-llamada" ? "Retiros Video Llamada" : "Retiros Video Formulario",
      content_type: "video",
      content_ids: [videoId],
      value: 25.0,
      currency: "USD",
    })
  }

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h4 className="text-xl md:text-5xl font-bold text-foreground mb-0">{title}</h4>
          <small>{subtitle}</small>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{description}</p>
        </div>

        <Card className="overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900">
              {!isPlaying ? (
                <>
                  {/* Video thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-blue-900/80">
                    {!imageError ? (
                      <img
                        src={thumbnail || youtubeThumbUrl}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover opacity-60"
                        onError={() => setImageError(true)}
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900" />
                    )}
                  </div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      onClick={handlePlayVideo}
                      className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 rounded-full w-20 h-20 p-0"
                    >
                      <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    </Button>
                  </div>

                  {/* Video title overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white/80 text-lg">Haz clic para reproducir</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Close button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  {/* Embedded video */}
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

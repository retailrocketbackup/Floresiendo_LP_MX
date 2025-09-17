import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ScheduleSection() {
  const scheduleData = {
    viernes: [
      { time: "16:00 - 17:00", activity: "Llegada y registro", type: "arrival" },
      { time: "17:00 - 18:00", activity: "Círculo de apertura y presentaciones", type: "ceremony" },
      { time: "18:00 - 19:30", activity: "Cena comunitaria", type: "meal" },
      { time: "19:30 - 21:00", activity: "Preparación y meditación", type: "preparation" },
      { time: "21:00 - 00:00", activity: "Primera ceremonia", type: "ceremony" },
    ],
    sabado: [
      { time: "08:00 - 09:00", activity: "Desayuno ligero", type: "meal" },
      { time: "09:00 - 11:00", activity: "Círculo de integración matutino", type: "integration" },
      { time: "11:00 - 12:30", activity: "Taller de respiración consciente", type: "workshop" },
      { time: "12:30 - 14:00", activity: "Almuerzo y descanso", type: "meal" },
      { time: "14:00 - 16:00", activity: "Tiempo libre y reflexión personal", type: "free" },
      { time: "16:00 - 17:30", activity: "Taller de movimiento corporal", type: "workshop" },
      { time: "17:30 - 19:00", activity: "Cena", type: "meal" },
      { time: "19:00 - 20:30", activity: "Preparación ceremonial", type: "preparation" },
      { time: "20:30 - 02:00", activity: "Segunda ceremonia", type: "ceremony" },
    ],
    domingo: [
      { time: "09:00 - 10:00", activity: "Desayuno", type: "meal" },
      { time: "10:00 - 12:00", activity: "Círculo de integración final", type: "integration" },
      { time: "12:00 - 13:30", activity: "Taller de herramientas para la vida cotidiana", type: "workshop" },
      { time: "13:30 - 15:00", activity: "Almuerzo de despedida", type: "meal" },
      { time: "15:00 - 16:00", activity: "Círculo de cierre y compromisos", type: "ceremony" },
      { time: "16:00", activity: "Despedida", type: "departure" },
    ],
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "ceremony":
        return "bg-primary text-primary-foreground"
      case "integration":
        return "bg-secondary text-secondary-foreground"
      case "workshop":
        return "bg-accent text-accent-foreground"
      case "meal":
        return "bg-muted text-muted-foreground"
      case "preparation":
        return "bg-purple-100 text-purple-800"
      case "free":
        return "bg-green-100 text-green-800"
      case "arrival":
        return "bg-blue-100 text-blue-800"
      case "departure":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">El programa del retiro</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Un cronograma cuidadosamente diseñado para maximizar tu experiencia de transformación
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Viernes */}
          <Card className="shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-2xl text-center">Viernes</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {scheduleData.viernes.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-muted-foreground">{item.time}</span>
                      <Badge className={`text-xs ${getActivityColor(item.type)}`}>{item.type}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{item.activity}</p>
                    {index < scheduleData.viernes.length - 1 && <div className="border-b border-border mt-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sábado */}
          <Card className="shadow-lg">
            <CardHeader className="bg-secondary text-secondary-foreground">
              <CardTitle className="text-2xl text-center">Sábado</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {scheduleData.sabado.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-muted-foreground">{item.time}</span>
                      <Badge className={`text-xs ${getActivityColor(item.type)}`}>{item.type}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{item.activity}</p>
                    {index < scheduleData.sabado.length - 1 && <div className="border-b border-border mt-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Domingo */}
          <Card className="shadow-lg">
            <CardHeader className="bg-accent text-accent-foreground">
              <CardTitle className="text-2xl text-center">Domingo</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {scheduleData.domingo.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-muted-foreground">{item.time}</span>
                      <Badge className={`text-xs ${getActivityColor(item.type)}`}>{item.type}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{item.activity}</p>
                    {index < scheduleData.domingo.length - 1 && <div className="border-b border-border mt-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-lg text-muted-foreground mb-4">¿Listo para comenzar tu transformación?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full"
              >
                Reservar mi lugar
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg rounded-full bg-transparent"
              >
                Más información
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

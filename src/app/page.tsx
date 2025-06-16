"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Leaf, Zap, Brain, RotateCcw } from "lucide-react"
import { gunaDescriptions } from "@/assets/quiz.data"
import { questions } from "@/assets/questions_with_scoring_template"

export default function AyurvedaQuiz() {
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({ sattva: 0, rajas: 0, tamas: 0 })

  const calculateResults = (allAnswers: number[]) => {
    let totalSattva = 0
    let totalRajas = 0
    let totalTamas = 0

    allAnswers.forEach((answerIndex, questionIndex) => {
      const option = questions[questionIndex].options[answerIndex]
      totalSattva += option.sattva
      totalRajas += option.rajas
      totalTamas += option.tamas
    })

    const total = totalSattva + totalRajas + totalTamas
    const sattvaPct = Math.round((totalSattva / total) * 100)
    const rajasPct = Math.round((totalRajas / total) * 100)
    const tamasPct = Math.round((totalTamas / total) * 100)

    setResults({ sattva: sattvaPct, rajas: rajasPct, tamas: tamasPct })
    setShowResults(true)
  }

  const resetQuiz = () => {
    setAnswers([])
    setShowResults(false)
    setResults({ sattva: 0, rajas: 0, tamas: 0 })
  }

  const getDominantGuna = () => {
    const { sattva, rajas, tamas } = results
    if (sattva >= rajas && sattva >= tamas) return "sattva"
    if (rajas >= tamas) return "rajas"
    return "tamas"
  }

  const getGunaDescription = (guna: string) => {
    return gunaDescriptions[guna as keyof typeof gunaDescriptions] ?? {
      title: "",
      description: "",
      recommendations: ""
    }
  }


  if (showResults) {
    const dominantGuna = getDominantGuna()
    const gunaInfo = getGunaDescription(dominantGuna)

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-gray-800 mb-2">Tu Perfil Ayurvédico</CardTitle>
              <CardDescription className="text-lg">Aquí están los resultados de tu evaluación de gunas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Resultados de Sattva */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-700">Sattva</span>
                  </div>
                  <span className="font-bold text-green-700">{results.sattva}%</span>
                </div>
                <Progress value={results.sattva} className="h-3" />
              </div>

              {/* Resultados de Rajas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-red-700">Rajas</span>
                  </div>
                  <span className="font-bold text-red-700">{results.rajas}%</span>
                </div>
                <Progress value={results.rajas} className="h-3" />
              </div>

              {/* Resultados de Tamas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold text-gray-700">Tamas</span>
                  </div>
                  <span className="font-bold text-gray-700">{results.tamas}%</span>
                </div>
                <Progress value={results.tamas} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Interpretación */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">{gunaInfo.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{gunaInfo.description}</p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800 mb-2">Recomendaciones:</h4>
                <p className="text-blue-700">{gunaInfo.recommendations}</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={resetQuiz} className="bg-orange-600 hover:bg-orange-700">
              <RotateCcw className="h-4 w-4 mr-2" />
              Realizar Cuestionario Nuevamente
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-green-50 p-4">
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Cuestionario Ayurvédico</CardTitle>
          <CardDescription>Descubre tu perfil de gunas (Sattva, Rajas, Tamas)</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              calculateResults(answers)
            }}
            className="space-y-4"
          >
            {questions.map((question, qIndex) => (
              <div key={qIndex} className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {`Pregunta ${qIndex + 1}: ${question.question}`}
                </h3>
                <RadioGroup
                  value={answers[qIndex]?.toString() ?? ""}
                  onValueChange={(value) => {
                    const updatedAnswers = [...answers]
                    updatedAnswers[qIndex] = parseInt(value)
                    setAnswers(updatedAnswers)
                  }}
                  className="space-y-3"
                >
                  {question.options.map((option, oIndex) => (
                    <div
                      key={oIndex}
                      className={`mb-0 flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer hover:bg-orange-50 ${
                        answers[qIndex] === oIndex ? "border-orange-400 bg-orange-50" : "border-gray-200"
                      }`}
                      onClick={() => {
                        const updatedAnswers = [...answers]
                        updatedAnswers[qIndex] = oIndex
                        setAnswers(updatedAnswers)
                      }}
                    >
                      <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-opt${oIndex}`} />
                      <Label htmlFor={`q${qIndex}-opt${oIndex}`} className="flex-1 cursor-pointer text-gray-700">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}

            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">
              Ver Resultados
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  </div>
)

}

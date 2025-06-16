// quiz-data.ts
export interface Question {
  id: number
  question: string
  options: {
    text: string
    sattva: number
    rajas: number
    tamas: number
  }[]
}

export const gunaDescriptions = {
  sattva: {
    title: "Sattva Dominante",
    description:
      "Sattva representa pureza, armonía y equilibrio. Las personas con predominio sáttvico tienden a ser tranquilas, sabias, compasivas y buscan el crecimiento espiritual.",
    recommendations:
      "Mantén tu práctica de meditación, consume alimentos frescos y puros, y continúa cultivando la sabiduría y la compasión.",
  },
  rajas: {
    title: "Rajas Dominante",
    description:
      "Rajas representa actividad, pasión y movimiento. Las personas rajásicas son dinámicas, ambiciosas y orientadas a la acción, pero pueden experimentar estrés y agitación.",
    recommendations:
      "Practica técnicas de relajación, reduce los estimulantes, incorpora actividades calmantes como yoga suave y meditación.",
  },
  tamas: {
    title: "Tamas Dominante",
    description:
      "Tamas representa inercia, oscuridad y resistencia al cambio. Puede manifestarse como pereza, confusión o apego excesivo a la comodidad.",
    recommendations:
      "Aumenta la actividad física gradualmente, consume alimentos frescos y ligeros, establece rutinas regulares y busca inspiración.",
  },
}

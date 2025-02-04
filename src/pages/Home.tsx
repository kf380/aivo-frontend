import { ChatInput } from "../components/ChatInput"
import { ChatResponse } from "../components/ChatResponse"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 text-center mx-auto">
        
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Interacción con la IA Generativa
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Proporciona una descripción para recibir la respuesta.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <ChatInput />
        </div>

        <ChatResponse />
      </div>
    </div>
  )
}

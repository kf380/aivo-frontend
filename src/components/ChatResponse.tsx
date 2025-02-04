import React from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

import { useChat } from "../context/ChatContext"
import { processText } from "../services/api"  
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form"
import { Textarea } from "./textarea"
import { Button } from "./button"

const formSchema = z.object({
  additionalInfo: z
    .string()
    .min(1, "Por favor, ingresa la información adicional")
    .max(500, "La información es demasiado larga"),
})

type FormValues = z.infer<typeof formSchema>

export const ChatResponse: React.FC = () => {
  const { chatResponse, setChatResponse, originalText } = useChat()

  if (!chatResponse) return null

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { additionalInfo: "" },
  })

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      const combinedText = `${originalText}\nInformación adicional: ${values.additionalInfo}`
      const payload = { text: combinedText, oldData: chatResponse.json }
      const result = await processText(payload)
      setChatResponse(result)
      reset()
    } catch (error) {
      console.error("Error al enviar la información adicional:", error)
    }
  }

  return (
    <div className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg">
      <div className="border-b border-gray-100 p-4">
        <h2 className="text-2xl font-bold text-gray-800">Respuesta del Asistente</h2>
      </div>

      <div className="p-6 space-y-8">

        {!chatResponse.json.complete && (
          <div className="bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              Información Adicional Requerida
            </h3>
            <p className="text-blue-700 mb-4">
              {chatResponse.json.question}
            </p>

            <Form methods={methods} onSubmit={onSubmit}>
              <FormField name="additionalInfo">
                {({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={4}
                        placeholder="Proporciona la información adicional solicitada..."
                        className="w-full p-4 text-lg border-2 rounded-xl
                                   focus:ring-4 focus:ring-blue-100 focus:border-blue-500
                                   transition-all duration-200 resize-none"
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage>{fieldState.error.message}</FormMessage>
                    )}
                  </FormItem>
                )}
              </FormField>
              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 text-base font-medium rounded-xl
                             bg-blue-600 hover:bg-blue-700
                             text-white shadow-md hover:shadow-lg
                             transform hover:-translate-y-0.5
                             transition-all duration-200
                             disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Enviando...</span>
                    </div>
                  ) : (
                    "Enviar información"
                  )}
                </Button>
              </div>
            </Form>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Respuesta JSON
          </h3>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
            {JSON.stringify(chatResponse.json, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

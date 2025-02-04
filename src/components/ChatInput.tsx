import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { processText } from "../services/api"
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormMessage,
} from "./form"
import { Textarea } from "./textarea"
import { Button } from "./button"
import { useChat } from "../context/ChatContext"
import { useForm } from "react-hook-form"

const formSchema = z.object({
 text: z
   .string()
   .min(1, "Por favor, ingresa una descripción")
   .max(500, "La descripción es demasiado larga"),
})

export const ChatInput: React.FC = () => {
 const { setChatResponse, setOriginalText } = useChat()
 const [charCount, setCharCount] = React.useState(0)

 const methods = useForm<z.infer<typeof formSchema>>({
   resolver: zodResolver(formSchema),
   defaultValues: { text: "" },
 })

 const onSubmit = async (data: z.infer<typeof formSchema>) => {
   try {
     setOriginalText(data.text)
     const result = await processText({ text: data.text })
     setChatResponse(result)
     methods.reset()
     setCharCount(0)
   } catch (error) {
     console.error("Error al enviar el texto:", error)
   }
 }

 return (
   <div className="bg-white rounded-lg shadow-md p-6">
     <Form methods={methods} onSubmit={onSubmit}>
       <FormField name="text">
         {({ field, fieldState }) => (
           <FormItem>
             <label className="block text-lg font-medium text-gray-700 mb-2">
               Describe la situación
             </label>
             <FormControl>
               <Textarea
                 {...field}
                 rows={6}
                 placeholder="Ingresa aquí los detalles..."
                 onChange={(e) => {
                   field.onChange(e)
                   setCharCount(e.target.value.length)
                 }}
               />
             </FormControl>

             <div className="text-gray-500 text-sm mt-1">
               {charCount} / 500 caracteres
             </div>

             {fieldState.error && (
               <FormMessage>{fieldState.error.message}</FormMessage>
             )}
           </FormItem>
         )}
       </FormField>

       <div className="flex justify-end">
         <Button
           type="submit"
           disabled={methods.formState.isSubmitting}
           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
         >
           {methods.formState.isSubmitting ? (
             <>
               <Loader2 className="mr-2 h-5 w-5 animate-spin" />
               Enviando...
             </>
           ) : (
             "Enviar"
           )}
         </Button>
       </div>
     </Form>
   </div>
 )
}
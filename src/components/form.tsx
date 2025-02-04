import * as React from "react"
import {
  FieldValues,
  FormProvider,
  UseFormReturn,
  useFormContext,
  Controller,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
  Path
} from "react-hook-form"

interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  children: React.ReactNode
  methods?: UseFormReturn<TFieldValues>
  onSubmit?: (data: TFieldValues) => void
}

export function Form<TFieldValues extends FieldValues>({
  children,
  methods,
  onSubmit,
}: FormProps<TFieldValues>) {
  if (!methods) {
    return <>{children}</>
  }

  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}>
        {children}
      </form>
    </FormProvider>
  )
}


interface FormItemProps {
  children: React.ReactNode
}

export function FormItem({ children }: FormItemProps) {
  return <div className="mb-4">{children}</div>
}

interface FormControlProps {
  children: React.ReactNode
}

export function FormControl({ children }: FormControlProps) {
  return <div>{children}</div>
}


interface FormMessageProps {
  children: React.ReactNode
}

export function FormMessage({ children }: FormMessageProps) {
  return <p className="text-red-600 text-sm mt-1">{children}</p>
}

interface FormFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>
  children: (props: {
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>
    fieldState: ControllerFieldState
    formState: UseFormStateReturn<TFieldValues>
  }) => React.ReactElement 
}

export function FormField<TFieldValues extends FieldValues>({
  name,
  children
}: FormFieldProps<TFieldValues>) {
  const { control, formState } = useFormContext<TFieldValues>()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return children({
          field,
          fieldState,
          formState,
        })
      }}
    />
  )
}

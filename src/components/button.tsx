import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 font-semibold rounded-md transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

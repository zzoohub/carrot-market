interface ButtonProps {
  text: string
  [key: string]: any
}
export default function Button({ text, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-sm shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none"
    >
      {text}
    </button>
  )
}

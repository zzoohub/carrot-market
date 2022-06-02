
interface TextareaProps{
  label?: string;
  name?: string;
  rows: number;
  [key: string]: any;
}
export default function Textarea({label, name, rows, ...rest}:TextareaProps){
  return (
  <div>
    <label
      htmlFor={name}
      className="mb-1 block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <textarea
      id={name}
      className="mt-1 py-2 px-3 shadow-sm w-full focus:ring-orange-500 rounded-md border border-gray-200 focus:border-orange-500 focus:outline-none"
      rows={rows}
      {...rest}
    />
  </div>
  )
}
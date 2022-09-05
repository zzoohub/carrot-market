import type { UseFormRegisterReturn } from "react-hook-form";
interface TextareaProps {
  label?: string;
  name?: string;
  rows: number;
  register: UseFormRegisterReturn;
  [key: string]: any;
}
export default function Textarea({
  label,
  name,
  rows,
  register,
  ...rest
}: TextareaProps) {
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
        className="mt-1 py-2 px-3 shadow-sm w-full focus:ring-orange-500 text-sm rounded-sm border border-gray-200 focus:border-orange-500 focus:outline-none resize-none placeholder:text-sm"
        rows={rows}
        {...register}
        {...rest}
      />
    </div>
  );
}

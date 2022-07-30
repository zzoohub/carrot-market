import { useForm } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  kind: "text" | "price" | "phone" | "title";
  type: string;
  required?: boolean;
  register: UseFormRegisterReturn;
  placeholder?: string;
}
export default function Input({
  name,
  label,
  kind,
  type,
  required,
  register,
  placeholder,
}: InputProps) {
  return (
    <div>
      {kind === "text" ? (
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor={name}
          >
            {label}
          </label>
          <div className="rounded-md relative flex  items-center shadow-sm">
            <input
              id={name}
              type={type}
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required={required}
              {...register}
              placeholder={placeholder}
            />
          </div>
        </div>
      ) : null}

      {kind === "price" ? (
        <div>
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor={name}
          >
            {label}
          </label>
          <div className="rounded-md relative flex  items-center shadow-sm">
            <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
              <span className="text-gray-500 text-sm">￦</span>
            </div>
            <input
              id={name}
              className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              type={type}
              placeholder="0.00"
              required={required}
              {...register}
            />
            <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
              <span className="text-gray-500">KRW</span>
            </div>
          </div>
        </div>
      ) : null}

      {kind === "phone" ? (
        <div>
          <label
            htmlFor={name}
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <div className="flex rounded-md shadow-sm">
            <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
              +82
            </span>
            <input
              id={name}
              type={type}
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              required={required}
              {...register}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

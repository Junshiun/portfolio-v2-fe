import { TInputFieldProps } from "./type";

export const InputField = (props: TInputFieldProps) => {
  const { formData, handleChange, info } = props;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <div className="group/input flex flex-col gap-4 group-focus-within/form:opacity-50 focus-within:!opacity-100">
      <label htmlFor={info.name}>{info.label}</label>
      <div className="relative py-4 px-3 z-0 before:inset-0 before:border-b before:border-solid before:border-grey-01 before:absolute before:w-full before:full group-focus-within/input:before:rounded group-focus-within/input:before:border-2 group-focus-within/input:before:border-white-01 before:z-negative">
        {info.type === "textarea" ? (
          <textarea
            name={info.name}
            placeholder={info.placeholder}
            className="w-full h-32 focus:outline-none [background:none] resize-none"
            value={formData.message}
            onChange={handleChange}
            required={info.required}
          />
        ) : (
          <input
            name={info.name}
            placeholder={info.placeholder}
            className="w-full h-full [background:none] focus:outline-none"
            value={formData[info.name]}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type={info.type}
            required={info.required}
          />
        )}
      </div>
    </div>
  );
};

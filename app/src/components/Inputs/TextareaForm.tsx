type Props = {
  placeholder: string;
  name: string;
  value?: string;
  label?: string;
  isRequired?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
  errorMesage?: any;
};

const TextareaForm = ({
  placeholder,
  label,
  name,
  value,
  isRequired,
  onChange,
  defaultValue,
  errorMesage,
}: Props) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-lettersDark" htmlFor={name}>
            {label}
          </label>
          <textarea
            placeholder={placeholder}
            name={name}
            id={name}
            value={value}
            required={isRequired}
            onChange={onChange}
            defaultValue={defaultValue}
            className="rounded-2xl border-[1px] focus:border-2 focus:outline-none focus:bg-orange-50 border-orange-400 border-solid 
      text-lettersDark font-normal text-xs py-1 px-3 h-20"
          ></textarea>
        </div>
        {errorMesage && (
          <span className="text-red-600 text-[10px]">{errorMesage}</span>
        )}
      </div>
    </>
  );
};
export default TextareaForm;

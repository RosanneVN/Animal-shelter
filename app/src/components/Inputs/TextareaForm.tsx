type Props = {
    placeholder: string;
    name: string;
    value?: string;
    isRequired?: boolean;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
    defaultValue?: string
}

const TextareaForm = ({placeholder, name, value, isRequired, onChange, defaultValue }:Props) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-lettersDark" htmlFor={name}></label>
          <textarea
            placeholder={placeholder}
            name={name}
            id={name}
            value={value}
            required={isRequired}
            onChange={onChange}
            defaultValue={defaultValue}
          ></textarea>
        </div>
      </div>
    </>
  );
};

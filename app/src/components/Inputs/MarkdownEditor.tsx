import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';

type Props = {
  label?: string;
  value: string;
  onChange: (value?: string) => void;
  placeholder?: string;
  isRequired?: boolean;
  errorMessage?: string;
  height?: number;
};

const MarkdownEditor = ({
  label,
  value,
  onChange,
  placeholder = "Escribe tu contenido...",
  isRequired = false,
  errorMessage,
  height = 400
}: Props) => {
  const [ReactQuill, setReactQuill] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Dynamically import ReactQuill to avoid SSR issues
    import("react-quill").then((module) => {
      setReactQuill(() => module.default);
    });
  }, []);
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'align', 'link'
  ];// Show loading or fallback while component loads
  if (!isClient || !ReactQuill) {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-lettersDark">
            {label} {isRequired && <span className="text-red-500">*</span>}
          </label>
        )}
        
        <div className="border  border-gray-300 rounded-lg overflow-hidden">
          <textarea 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={isRequired}
            className="w-full p-4 border-none outline-none resize-none"
            style={{ height: height }}
          />
        </div>
        
        {errorMessage && (
          <span className="text-red-600 text-xs">{errorMessage}</span>
        )}
      </div>
    );
  }  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-lettersDark">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      
      <div className="border pb-10 border-gray-300 rounded-lg overflow-hidden max-sm:pb-24">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          modules={modules}
          formats={formats}
          style={{ 
            height: height,
            fontFamily: 'Helvetica, Arial, sans-serif'
          }}
        />
      </div>
      
      {errorMessage && (
        <span className="text-red-600 text-xs">{errorMessage}</span>
      )}
        <div className="text-xs text-gray-500 mt-2">
        <p>💡 <strong>Tips de edición:</strong></p>
        <ul className="list-disc list-inside ml-4 space-y-1">
          <li>Usa <strong>Ctrl+B</strong> para texto en negrita</li>
          <li>Usa <strong>Ctrl+I</strong> para texto en cursiva</li>
          <li>Selecciona texto y usa la barra de herramientas para formatear</li>
          <li>Usa los selectores de <strong>tamaño</strong> y <strong>color</strong> para personalizar el texto</li>
          <li>Haz clic en el botón de enlace para agregar links</li>
        </ul>
      </div>
    </div>
  );
};

export default MarkdownEditor;

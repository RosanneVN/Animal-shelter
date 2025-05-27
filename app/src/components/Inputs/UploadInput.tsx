import React, { useEffect, useState, useCallback } from "react";
import { fileToBase64, validateImageFile } from "../../utils/imageUtils";

type Props = {
  onImageChange?: (base64: string | null) => void;
  errorMessage?: string;
};

const UploadInput = ({ onImageChange, errorMessage }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      setError("");
      onImageChange?.(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // Convert to base64
    const convertToBase64 = async () => {
      setLoading(true);
      setError("");
      
      try {
        const base64 = await fileToBase64(selectedFile);
        onImageChange?.(base64);
      } catch (err) {
        setError("Error al procesar la imagen");
        onImageChange?.(null);
      } finally {
        setLoading(false);
      }
    };

    convertToBase64();

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]); // Removemos onImageChange de las dependencias

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate the file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || "Archivo inválido");
      setSelectedFile(null);
      return;
    }

    setError("");
    setSelectedFile(file);
  };  return (
    <div className="flex flex-col gap-2">
      <div className="flex bg-orange-200 h-48 rounded-md items-center justify-center relative">
        <input
          className="h-full w-full opacity-0 absolute top-0 z-30"
          type="file"
          onChange={handleFileSelect}
          accept="image/*"
          disabled={loading}
        />
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40 rounded-md">
            <div className="text-white text-sm">Procesando imagen...</div>
          </div>
        )}
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <img
            src="/Image/camera.png"
            alt="Seleccionar imagen"
            className="w-9 z-20"
          />
        )}
      </div>
      {(error || errorMessage) && (
        <p className="text-red-500 text-sm">
          {error || errorMessage}
        </p>
      )}
    </div>
  );
};
export default UploadInput;

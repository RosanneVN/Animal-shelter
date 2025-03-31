import React, { useEffect, useState } from "react";

type Props = {};

const UploadInput = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };
  return (
    <div className="flex bg-orange-200 h-48 rounded-md items-center justify-center relative">
      <input
        className="h-full w-full opacity-0 absolute top-0 z-30"
        type="file"
        onChange={handleFileSelect}
        accept="image/*"
      />
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
  );
};
export default UploadInput;

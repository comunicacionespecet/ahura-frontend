import React from "react";
import { Image as ImageIcon } from "lucide-react"; // ícono de imagen

const ImageUpload = ({ onChange }) => {
  return (
    <label className="w-40 h-40 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer rounded-lg">
      <ImageIcon className="w-10 h-10 mb-2" />
      <span className="text-sm">Subir imagen</span>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
    </label>
  );
};

export default ImageUpload;

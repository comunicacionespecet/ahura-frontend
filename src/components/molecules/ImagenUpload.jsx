import React from 'react';
import PropTypes from 'prop-types';
import { Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ onChange }) => {
    return (
        <label className="w-full h-40 border-2 border-dashed border-[#8DC63F] flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer rounded-lg">
            <ImageIcon className="w-10 h-10 mb-2" />
            <span className="text-sm">Subir imagen</span>
            <input
                id="imagen"
                type="file"
                accept="image/*"
                onChange={onChange}
                className="hidden"
            />
        </label>

    );
};

ImageUpload.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default ImageUpload;


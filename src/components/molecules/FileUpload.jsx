import React from 'react';
import PropTypes from 'prop-types';
import { File as FileIcon } from 'lucide-react';

const FileUpload = ({ onChange }) => {
    return (
        <label className="w-full max-w-[160px] h-40 border-2 border-dashed border-[#8DC63F] flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer rounded-lg">
            <FileIcon className="w-10 h-10 mb-2" />
            <span className="text-sm text-center">
                Subir archivo
                <br />
                (PDF, Word, Excel...)
            </span>
            <input
                id="archivo"
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.mp3,.mp4,.avi,.bpm,.bpmn,.zip,.rar,.txt"
                onChange={onChange}
                className="hidden"
            />
        </label>
    );
};

FileUpload.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default FileUpload;


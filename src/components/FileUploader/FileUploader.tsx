import styled from 'styled-components';
import React from 'react';

interface FileUploadProps {
    file?: File;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploaderContainer = styled.div`
    width: 100%;
    height: 100%;
    border: 1px dashed black;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const FileUploader: React.FC<FileUploadProps> = ({ file, onChange }) => {
    return (
        <FileUploaderContainer>
            <input type="file" onChange={onChange} />
        </FileUploaderContainer>
    );
};

export default FileUploader;

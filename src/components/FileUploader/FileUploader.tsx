import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

interface FileUploadProps {
    file?: File;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .image-container {
        width: 20rem;
        height: 20rem;
        border: 1px dashed black;
        border-radius: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
        }
    }

    input {
        width: 60%;
        margin: 1rem auto;
    }
`;

const FileUploader: React.FC<FileUploadProps> = ({ file, onChange }) => {
    const [objectUrl, setObjectUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (file) {
            setObjectUrl(URL.createObjectURL(file));
        }
    }, [file]);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const file = files[0];
            if (!file.name.includes('.png') && !file.name.includes('jpeg')) {
                alert('File type should be PNG or JPEG');
                return;
            } else {
                onChange(e);
            }
        }
    };

    return (
        <FileUploaderContainer>
            <div className="image-container">
                <img src={objectUrl} />
            </div>
            <input type="file" onChange={handleOnChange} />
        </FileUploaderContainer>
    );
};

export default FileUploader;

import styled from 'styled-components';
import React, { useState } from 'react';
import FileUploader from '../FileUploader/FileUploader';

const StyleTransferContainer = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    margin: 5rem auto;

    .file-input-container {
        display: flex;
        align-items: center;
    }

    .target-file-input-container,
    .style-file-input-container {
        width: 25rem;
        height: 25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .style-file-input-container {
        margin-left: 2rem;
    }

    h3 {
        font-size: 3rem;
        margin-left: 2rem;
    }

    .file-result-container {
        width: 25rem;
        height: 25rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 2rem;

        .file-result {
            width: 100%;
            height: 100%;
            border: 1px dashed black;
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
`;

const StyleTransfer: React.FC = () => {
    const [inputFile, setInputFile] = useState<File | undefined>(undefined);
    const [styleImage, setStyleImage] = useState<File | undefined>(undefined);

    const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        setInputFile(file);
        console.log(file);
    };

    const onStyleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        setStyleImage(file);
        console.log(file);
    };

    return (
        <StyleTransferContainer>
            <div className="file-input-container">
                <div className="target-file-input-container">
                    <h2>Upload Image or Video</h2>
                    <FileUploader onChange={onInputFileChange} />
                </div>
                <div className="style-file-input-container">
                    <h2>Upload Style Image</h2>
                    <FileUploader onChange={onStyleImageChange} />
                </div>
            </div>
            <h3>=</h3>
            <div className="file-result-container">
                <h2>Result</h2>
                <div className="file-result"></div>
            </div>
        </StyleTransferContainer>
    );
};

export default StyleTransfer;

import styled from 'styled-components';
import React, { useState } from 'react';
import FileUploader from '../FileUploader/FileUploader';
import axios from 'axios';
import { BACKEND_ENDPOINT } from '../../config';
import Loading from '../Loading/Loading';

const StyleTransferContainer = styled.div`
    display: flex;
    align-items: center;
    width: 75%;
    margin: 10rem auto;
    height: 100%;

    .file-input-container {
        display: flex;
        align-items: center;
    }

    .target-file-input-container,
    .style-file-input-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            border-radius: 1rem;
        }
    }

    .style-file-input-container {
        margin-left: 2rem;
    }

    h3 {
        font-size: 3rem;
        margin-left: 2rem;
    }

    .file-result-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-left: 2rem;
        h2 {
            margin: 0;
        }

        .file-result {
            width: 20rem;
            height: 20rem;
            //width: 100%;
            //height: 100%;
            margin-top: 2rem;
            border: 1px dashed black;
            border-radius: 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
                width: 100%;
                height: 100%;
                border-radius: 1rem;
            }
        }

        button {
            margin-top: 1rem;
        }
    }
`;

const StyleTransfer: React.FC = () => {
    const [inputFile, setInputFile] = useState<File | undefined>(undefined);
    const [styleImage, setStyleImage] = useState<File | undefined>(undefined);
    const [resultImage, setResultImage] = useState<string | undefined>(
        undefined
    );
    const [isLoading, setIsLoading] = useState(false);

    const styleTransferApiCaller = async () => {
        setIsLoading(true);
        setResultImage(undefined);
        try {
            if (styleImage && inputFile) {
                const url = `${BACKEND_ENDPOINT}/styletransfer`;
                const formData = new FormData();
                formData.append('style_image', styleImage);
                formData.append('content_image', inputFile);
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                        responseType: 'blob',
                    },
                };
                const res = await axios.post(url, formData, config);
                setResultImage(res.data.image_url);
            }
        } catch (err) {
            alert(err);
        }
        setIsLoading(false);
    };

    const onInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        setInputFile(file);
    };

    const onStyleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        setStyleImage(file);
    };

    return (
        <StyleTransferContainer>
            <div className="file-input-container">
                <div className="target-file-input-container">
                    <h2>Upload Image or Video</h2>
                    <FileUploader
                        onChange={onInputFileChange}
                        file={inputFile}
                    />
                </div>
                <div className="style-file-input-container">
                    <h2>Upload Style Image</h2>
                    <FileUploader
                        onChange={onStyleImageChange}
                        file={styleImage}
                    />
                </div>
            </div>
            <h3>=</h3>
            <div className="file-result-container">
                <h2>Result</h2>
                <div className="file-result">
                    <img src={resultImage} />
                </div>
                <button onClick={() => styleTransferApiCaller()}>
                    Run Process
                </button>
            </div>
            {isLoading && <Loading />}
        </StyleTransferContainer>
    );
};

export default StyleTransfer;

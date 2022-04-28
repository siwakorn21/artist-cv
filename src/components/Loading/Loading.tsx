import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

const LoadingStyle = styled.div`
    z-index: 99;
`;

const ModalContainer = styled.div`
    position: fixed;
    background: rgba(0, 0, 0, 0.75);
    width: 120%;
    height: 120vh;
    margin: 0;
    z-index: 90;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

// const ModalContainer: React.FC = ({ children }) => {
//     return (
//         <ModalContainerStyled>
//             <div className="modal-inner">{children}</div>
//         </ModalContainerStyled>
//     );
// };

const Loading: React.FC = () => {
    return (
        <ModalContainer>
            <LoadingStyle>
                <ReactLoading type={'spin'} color={'black'} />
            </LoadingStyle>
        </ModalContainer>
    );
};

export default Loading;

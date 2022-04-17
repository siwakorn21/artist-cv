import React from 'react';
import { AppStyle } from './App.style';
import StyleTransfer from './components/StyleTransfer/StyleTransfer';

const App: React.FC = () => {
    return (
        <AppStyle>
            <StyleTransfer />
        </AppStyle>
    );
};

export default App;

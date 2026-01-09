import React from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "../assets/loading.json";

const Loading = () => {
    return (
        <div className='loading'>
            <div className='loading-lottie'>
                <Lottie 
                    animationData={loadingAnimation} 
                    loop={true} 
                    autoPlay={true} 
                />
            </div>
            <p>Preparando a cozinha...</p>
        </div>
    );
};

export default Loading;
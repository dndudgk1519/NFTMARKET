import React from 'react';
import styled from 'styled-components';
import MadX from '../img/Mad.mp4';
// import images from '../img/NFT.jpg';
import { InnerLayout } from '../Layouts';
import MainContent from './MainContent';

function MainArea() {
  return (
    <MainAreaStyled>
      <video src={MadX} muted playsInline autoPlay loop></video>
      {/* <img src={images} alt="" className="overlay" /> */}

      <InnerLayout>
        <MainContent />
      </InnerLayout>
    </MainAreaStyled>
  );
}

const MainAreaStyled = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .overlay {
    width: 50%;
    height: 100%;
    position: absolute;
    right: -400px;
    top: -300px;
  }
  video {
    width: 100%; //너비
    height: 100%;
    object-fit: cover;
    //opacity: 0.7;     투명도
  }
`;
export default MainArea;

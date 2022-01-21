import React from 'react';
import styled from 'styled-components';
import Nav from '../pages/Nav';
import SmallHeading from './SmallHeading';

function MainContent() {
  return (
    <MainContentStyled>
      <Nav />
      <div className="content">
        <div className="left">
          <SmallHeading title={'NFT Raffle'} identifier={'Before'} />
          <h1>
            간략한 서비스 설명
            <span className="GradientText">위치!</span>
          </h1>

          <p>다들 화이팅</p>
        </div>
        <div className="right"></div>
      </div>
    </MainContentStyled>
  );
}

const MainContentStyled = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 80%;
  height: 100%;
  transform: translateX(-50%); //기준 축 변경하기
`;

export default MainContent;

import React from 'react';
import { SectionStyled } from '../Layouts';
import MyCard from './MyCard';
import MainTitle from './MainTitle';
import styled from 'styled-components';
import CtaButton from '../components/CtaButton';
import NFT from '../img/NFT.jpg';

function Mycollections() {
  return (
    <MarketStyled>
      <SectionStyled>
        <div className="title-con">
          <MainTitle
            title={'My NFT 리스트'}
            subtitle={'당신의 NFT입니다'}
            para={'반짝반짝 NFT'}
          />
        </div>
        <div className="gradient-cards-con">
          <MyCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <MyCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <MyCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <MyCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <MyCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <MyCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <MyCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <MyCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
        </div>
        <div className="load">
          <CtaButton name={'View More'} />
        </div>
      </SectionStyled>
    </MarketStyled>
  );
}

const MarketStyled = styled.div`
  .load {
    padding-top: 3rem;
    text-align: center;
  }
`;

export default Mycollections;

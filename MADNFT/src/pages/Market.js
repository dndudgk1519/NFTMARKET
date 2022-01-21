import React from 'react';
import { SectionStyled } from '../Layouts';
import ProductCard from './ProductCard';
import MainTitle from './MainTitle';
import styled from 'styled-components';
import CtaButton from '../components/CtaButton';
import NFT from '../img/NFT.jpg';

function Market() {
  return (
    <MarketStyled>
      <SectionStyled>
        <div className="title-con">
          <MainTitle
            title={'Mad-Xcientist'}
            subtitle={'현재 판매중인 NFT입니다'}
            para={'NFT'}
          />
        </div>
        <div className="gradient-cards-con">
          <ProductCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <ProductCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <ProductCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <ProductCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <ProductCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <ProductCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <ProductCard
            image={NFT}
            NFT={NFT}
            name={'이름'}
            price={'가격'}
            title={'제목'}
          />
          <ProductCard
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

export default Market;

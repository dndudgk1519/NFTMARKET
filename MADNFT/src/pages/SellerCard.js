import React from 'react';
import styled from 'styled-components';
import data from '../data';

function SellerCard() {
  return (
    <SellerCardstyled>
      {data.map(item => {
        return (
          <div className="SellerCard" key={item.id}>
            <div className="number">
              <p>0{item.id}</p>
            </div>
            <div className="profile">
              <img src={item.image} alt="" />
              <div className="text">
                <h4>{item.name}</h4>
                <p>{item.currency}</p>
              </div>
            </div>
          </div>
        );
      })}
    </SellerCardstyled>
  );
}

const SellerCardstyled = styled.div`
  border-radius: 20px; //테두리 반경
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.4s ease-in-out;
  &:hover {
    //마우스 커서 위치시 효과
    transform: translateY(-10px);
  }
  .SellerCard {
    display: flex;
    align-items: center;
    padding: 1.5rem 1rem;
    .number {
      padding-right: 1rem;
      font-size: 1.6rem;
      opacity: 0.5;
      p {
        font-weight: 700;
      }
    }
    .profile {
      display: flex;
      img {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 50%;
        margin-right: 1rem;
        border: 2px solid #395ff6;
      }
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      h4 {
        font-weight: 500;
      }
      p {
        padding-top: 0.5rem;
        opacity: 0.5;
      }
    }
  }
`;

export default SellerCard;

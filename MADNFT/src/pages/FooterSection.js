import React from 'react';
import styled from 'styled-components';
import { SectionStyled } from '../Layouts';

function FooterSection() {
  return (
    <FooterStyled>
      <SectionStyled>
        <div className="contact-info">
          <h3 className="contact-title">Contact Us</h3>
          <p>Mad-Xcientist</p>
          <p>서울특별시 서초구 서초대로 397</p>
        </div>
      </SectionStyled>
    </FooterStyled>
  );
}

const FooterStyled = styled.div`
  background-color: #020c31;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4rem 0;
  position: relative;
  z-index: 1;
  p {
    opacity: 0.5;
  }
  .bg-image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    img {
      width: 80%;
      opacity: 0.08;
    }
  }
  .contact-title {
    position: relative;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    font-weight: 500;
    font-size: 1.5rem;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 4rem;
      height: 2px;
      background-color: #eb3fa9;
    }
  }
`;

export default FooterSection;

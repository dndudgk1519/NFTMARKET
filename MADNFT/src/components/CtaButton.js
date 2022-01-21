import React from 'react';
import styled from 'styled-components';

function CtaButton({ name }) {
  return <CtaButtonStyled>{name}</CtaButtonStyled>;
}

const CtaButtonStyled = styled.a`
  text-transform: uppercase;
  background: linear-gradient(130deg, #395ff6, #eb3fa9);
  padding: 0.9rem 1.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  &:last-child {
    margin-left: 1.5rem;
  }
  &:hover {
    transition: all 0.4s ease-in-out;
    background: linear-gradient(120deg, #eb3fa9, #395ff6);
  }
`;
export default CtaButton;

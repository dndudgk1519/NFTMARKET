import React from 'react';
import styled from 'styled-components';
import logo from '../img/logo.jpg';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

function Nav() {
  const injected = new InjectedConnector({
    supportedChainIds: [
      1, // Main net
      3, // Ropsten
      4, // Rinkeby
      5, // Goerli
      42, // Kovan
    ],
  });

  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  // Meta Mask Connect
  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  // Meta Mask DisConnect
  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <NavStyled>
      <div className="logo">
        <img src={logo} alt="" />
      </div>

      <ul className="nav-items">
        <li>
          <a href="/">홈</a>
        </li>
        <li>
          <a href="Mint">NFT 생성</a>
        </li>
        <li>
          <a href="Import">NFT 가져오기</a>
        </li>
        <li>
          <a href="Mycollections">My Collections</a>
        </li>
        <li>
          <a href="Send">NFT 선물하기</a>
        </li>
        <li>
          <a href="Market">NFT 마켓</a>
        </li>
        <li>
          <a href="Random">랜덤박스</a>
        </li>
        <li>
          <a href="Funding">NFT 펀딩</a>
        </li>
        <li>
          <a href="GasTest">가스비테스트</a>
        </li>
        <div className="primary-btn" onClick={connect}>
          Metamask Connect!
        </div>
      </ul>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  min-height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .nav-items {
    display: flex;
    align-items: center;
    li {
      margin: 0.5rem;
    }
    .primary-btn {
      margin-left: 0.5rem;
      background-color: rgba(57, 95, 246, 0.6);
      padding: 0.5rem 0.1rem;
      border-radius: 70px;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      &:hover {
        background-color: rgba(57, 95, 246, 1);
      }
    }
  }
  .logo {
    img {
      width: 50px;
    }
  }
`;

export default Nav;

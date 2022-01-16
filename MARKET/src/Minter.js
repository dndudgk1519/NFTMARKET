import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js";

import "./css/Minter.css";
const Minter = (props) => {
  //State variables
  const [walletAddress, setWallet] = useState(""); //유저의 지갑주소를 담는 변수
  const [status, setStatus] = useState(""); //UI아래쪽에 추가되는 상태
  const [name, setName] = useState(""); //NFT이름
  const [description, setDescription] = useState(""); //NFT설명
  const [url, setURL] = useState(""); //NFT가 저장되는 링크주소
  // const [className, setClassName] = useState("");

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 👆🏽 상단의 모든 필드를 채워야 NFT발행이 가능합니다.");
        } else {
          setWallet("");
          setStatus("🦊  브라우저와 메타마스크를 먼저 연결해주세요.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            브라우저와 메타마스크를 먼저 연결해주세요.
          </a>
        </p>
      );
    }
  }

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();
    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  // dapp 프론트에서 disconnect 구현 시도 (추후 수정 예정)
  // const connectWalletPressed = async () => {
  //   let addressStatus = document.getElementById("walletButton");

  //   if (addressStatus.value === "No") {
  //     const walletResponse = await connectWallet();
  //     setStatus(walletResponse.status);
  //     setWallet(walletResponse.address);
  //     addressStatus.value = "yes";
  //     addressStatus.innerText = "logout";
  //   } else {
  //     //로그아웃 버튼 클릭 시 메타마스크 연결 끊어야함

  //     addressStatus.value = "No";
  //     addressStatus.innerText = "Connect Wallet";
  //     ethereum.disconnect();
  //   }
  // };

  const fileUploadPressed = async () => {
    // let formData = new FormData();
    // formData.append('files')
  };
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { status } = await mintNFT(url, name, description);
    setStatus(status);
  };

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed} value="No">
        {walletAddress.length > 0 ? (
          "연결된 계정: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🧙‍♂️ NFTMARKET</h1>
      <p>모든 빈칸을 작성한 후 "NFT발행" 버튼을 클릭하세요</p>
      <form>
        <h2>🖼NFT 저장 위치: </h2>
        <div id="special">
          <input
            type="text"
            id="uploadText"
            placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
            onChange={(event) => setURL(event.target.value)}
          />
          <input
            type="button"
            id="uploadButton"
            onClick={fileUploadPressed}
            value="파일 선택"
            variant="Contained"
          />
        </div>
        <div>
          <h2>🤔 이름: </h2>
          <input
            type="text"
            placeholder="e.g. My first NFT!"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <h2>✍️ 설명: </h2>
          <input
            type="text"
            placeholder="e.g. Even cooler than cryptokitties ;)"
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        NFT 발행
      </button>
      <p id="status">{status}</p>
    </div>
  );
};

export default Minter;

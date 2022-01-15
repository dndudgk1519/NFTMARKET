import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js";
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
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
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

  // dapp 프론트에서 disconnect 구현 시도
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
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">{status}</p>
    </div>
  );
};

export default Minter;

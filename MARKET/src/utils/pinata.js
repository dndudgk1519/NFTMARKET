require("dotenv").config();
const axios = require("axios");
// --------------------------
const fs = require("fs");
const FormData = require("form-data");
// --------------------------
const key = process.env.REACT_APP_PINATA_KEY;
const secret = process.env.REACT_APP_PINATA_SECRET;

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  //pinata에 axios로 post요청 보내는 로직⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};

export const pinFileToIPFS = (key, secret) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let filename;
  let data = new FormData();
  console.log(fs);

  data.append("file", fs.createReadStream("./127.0.0.1_5500_Home.html.png"));
  const metadata = JSON.stringify({
    name: "testname",
    keyvalues: {
      exampleKey: "exampleValue",
    },
  });
  data.append("pinataMetadata", metadata);

  // const pinataOptions = JSON.stringify({
  //   cidVersion: 0,
  //   customPinPolicy: {
  //     regions: [
  //       {
  //         id: "FRA1",
  //         desireReplicationCount: 1,
  //       },

  //       {
  //         id: `NYC1`,
  //         desireReplicationCount: 2,
  //       },
  //     ],
  //   },
  // });
  // data.append("pinataOptions", pinataOptions);

  return axios
    .post(url, data, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      const hash = response.data.IpfsHash;
      return {
        hash,
        ipfsLink: `ipfs//${hash}`,
        pinataUrl: `https://ipfs.io/ipfs/${hash}`,
      };
    })
    .catch(function (error) {
      // console.log(error);
      return {
        success: false,
        message: error.message,
      };
    });
};
//
// API Key: 2e383ddc7e56be9e0b00
// API Secret: f0a8d5233a2ab5926ec0d2a6a9c9c59bae5f7cd4828b786355d4cef692b60240
// JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJhMWYxMTU5Ni03NWVmLTRkODktYWI5OC02NDcwZmNjNjgxOGMiLCJlbWFpbCI6ImRuZHVkZ2sxNTE5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2V9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyZTM4M2RkYzdlNTZiZTllMGIwMCIsInNjb3BlZEtleVNlY3JldCI6ImYwYThkNTIzM2EyYWI1OTI2ZWMwZDJhNmE5YzljNTliYWU1ZjdjZDQ4MjhiNzg2MzU1ZDRjZWY2OTJiNjAyNDAiLCJpYXQiOjE2NDIyMjgzNjR9.zdHTthPmIdLag1CwzG58tMjdq6olVuTXblAwpx9gKzE

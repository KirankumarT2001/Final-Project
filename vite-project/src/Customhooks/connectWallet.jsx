import { useDispatch } from "react-redux";
import { ethers, Contract } from "ethers";
import { setWallet } from "../store/walletSlice";
import { abi as userAbi } from "../assets/UserManager.json";
import { abi as productAbi } from "../assets/ProductManager.json";
import { toast } from "react-toastify";

function useWallet() {
  const dispatch = useDispatch();
  window.ethereum.on("accountsChanged", connectWallet);

  function connectWallet() {
    return new Promise((resolve, reject) => {
      let signer = null;
      let fsigner = null;
      let provider;
      let freeProvider;
      if (window.ethereum === null) {
        toast.warn("MetaMask not installed; using read-only defaults");
        provider = ethers.getDefaultProvider();
        reject();
      } else {
        provider = new ethers.BrowserProvider(window.ethereum);
        freeProvider = new ethers.JsonRpcProvider("http://localhost:7545");

        let users;
        let product;

        freeProvider.getSigner().then((response) => {
          fsigner = response;
          users = new Contract("0x0A043a5E205748FAecfc72aD09663e4261324f5C",userAbi,fsigner);
          product = new Contract("0xE06498241BC212D6A0F9dbf76B05C3Ee21Ba5Ba6",productAbi,fsigner);
        }).then(()=>{
            provider.getSigner().then((data) => {
                signer = data;
                const userContract = new Contract("0x0A043a5E205748FAecfc72aD09663e4261324f5C",userAbi,signer);
                const productContract = new Contract("0xE06498241BC212D6A0F9dbf76B05C3Ee21Ba5Ba6",productAbi,signer);
                const address = signer.address;
                dispatch(setWallet({userContract,productContract,address,signer,users,product}));
                resolve();
              });
        });
      }
    });
  }

  return connectWallet;
}

export default useWallet;

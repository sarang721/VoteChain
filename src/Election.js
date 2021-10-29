import web3 from "./web3";
import Electionabi from '../src/contracts/Vote.json';

const instance=new web3.eth.Contract(
    Electionabi.abi,
    "0x477eA13E420BBf6fc010F4d6Ba615B6a6Ea4C82E"
);



export default instance;

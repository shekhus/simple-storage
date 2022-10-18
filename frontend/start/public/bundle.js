const simpleStorageABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "data",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_data",
        "type": "string"
      }
    ],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];
const simpleStorageAddress = '0x567d61cF6d98200B986A6006a5bbb6cb602ccA7F';
const web3 = new Web3('http://localhost:9545');
const simpleStorage = new web3.eth.Contract(simpleStorageABI, simpleStorageAddress);

document.addEventListener('DOMContentLoaded', () => {
//to manipulate the setData and span 
//set pointer to setData 
const $setData = document.getElementById('setData');
const $data = document.getElementById('data');

//array of accounts of local blockchain we will need this to send transaction to blockchain 
let accounts= [];

//to populate these account we use web3 
web3.eth.getAccounts ()
.then (_accounts  => {
  accounts = _accounts;
});
 
const getData = () => {
  simpleStorage.methods.get().call()
  .then (result => {    
    $data.innerHTML= result;
});
};

//to execute getData()
getData();

//to execute setData()
//To handle form ,we need to listen to when we click on the sumbit button of the form 

$setData.addEventListener('submit' ,e=>{
  e.preventDefault()   //to prevent event from reloading the page 
  const data =e.target.elements[0].value;  //data will be stored in element array at 0 
  simpleStorage.methods.set(data)
  .send({from :accounts[0]})

  //we need to refreh UI to update 
  .then(getData);

 });
})


import React,{useState,useEffect} from 'react'
import './Add.css'
import Election from '../Election'
import web3 from '../web3';

function Add() {

    const [name,setname]=useState();
    const [quali,setquali]=useState();
    const [party,setparty]=useState();
    const [image,setimage]=useState();
    const [account,setaccount]=useState();


    const getaccount=async()=>{
        const accounts=await web3.eth.getAccounts();
        setaccount(accounts[0]);

    }

    useEffect(() => {

        getaccount();
        
      
    }, [])

    const add=async()=>{

        try{
            await Election.methods.addcandidate(name,party,quali,image).send({
              from:account
            })

            alert("Candidate Added Successfully")
          }
          catch(e){
              alert(e.message)
      
          }
      

    }

    return (
        <div className="addcandi">

            <label className="label">
                Name of Candidate
            </label>
            <br/>
            <input className="input" value={name} onChange={(e)=>setname(e.target.value)}  type="text"></input>
            <br/>

            <label className="label">
                Party 
            </label>
            <br/>
            <input className="input" value={party} onChange={(e)=>setparty(e.target.value)} type="text"></input>
            <br/>

            <label className="label">
                Qualification
            </label>
            <br/>
            <input className="input" value={quali} onChange={(e)=>setquali(e.target.value)} type="text"></input>
            <br/>

            <label className="label">
                Image Url
            </label>
            <br/>
            <input className="input" value={image} onChange={(e)=>setimage(e.target.value)}  type="text"></input>
            <br></br>

            <button className="add" onClick={add} >Add</button>
            
        </div>
    )
}

export default Add

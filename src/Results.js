import React,{useState,useEffect} from 'react'
import './Results.css'
import Election from './Election'
import web3 from './web3';
import {db} from './Firebase';
import { collection, query, where, getDocs ,addDoc,doc} from "firebase/firestore";

function Results() {

    const [cand,setcand]=useState();
    const [list,setlist]=useState([])
    const [phase,setphase]=useState();
    const [account,setaccount]=useState();

    const getphase=async()=>{
        const q=await collection(db,"phase");
        const snap=await getDocs(q);

        snap.forEach((doc)=>{
            setphase(doc.data().phase)
        })


    }

    const getdata=async()=>{

        const accounts=await web3.eth.getAccounts();
        setaccount(accounts[0]);
        const number=await Election.methods.candidatescount().call();
        const manager=await Election.methods.manager().call();
        setcand(number);





        const data = await Promise.all(
            Array(parseInt(number)).fill().map((element,index) =>{
              return Election.methods.candidates(index+1).call()
            })
          );
        setlist(data);

    }

    useEffect(() => {

        getdata();
        getphase();
      
    }, [])




    return (
        <div className="v111">
           
             <div className="votes">
             <h1 className="vote">Results</h1>

         {   
         
         phase==="results"?(
            

        <table id="customers">
            <tr>

        <th>
            Image
        </th>
        <th>
            Name
        </th>
        <th>Party</th>
        <th>Votes</th>
    </tr>

    {
        list.map((val,index)=>{
            return(
                <tr>
        <td>
            <div>
            <img className="image11" src={val.imageurl}>
                
                </img>
                </div>
                </td>

                <td>{val.name.toUpperCase()}</td>
                <td>{val.party}</td>
                <td>{val.votes}</td>
    </tr>


            );
        })
    }

</table>
         ):<h2 className="vote">Results are yet to be declared .Check later</h2>
}

</div>
            
        </div>
    )
}

export default Results

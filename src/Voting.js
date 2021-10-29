import React,{useEffect,useState} from 'react'
import './Voting.css'
import { db } from './Firebase';
import { useAuth } from './AuthContext';
import { collection, query, where, getDocs ,addDoc,doc} from "firebase/firestore";
import Candidates from './Candidates'
import Election from './Election'
import web3 from './web3';

function Voting() {

    const [phase,setphase]=useState();
    const [approved,setapproved]=useState(false);
    const {currentuser}=useAuth();
    const [account,setaccount]=useState();
    const [manager,setmanager]=useState();
    const [cand,setcand]=useState();
    const [list,setlist]=useState([])


    const approvedstatus=async()=>{
        const q=await collection(db,"approved");
        const snap=await getDocs(q);
        snap.forEach((data)=>{
            if(data.data().uid===currentuser.uid)
            setapproved(true);
        })
}

    const getdata=async()=>{
        const accounts=await web3.eth.getAccounts();
        setaccount(accounts[0]);
        const number=await Election.methods.candidatescount().call();
        const manager=await Election.methods.manager().call();
        setmanager(manager);
        setcand(number);


        const data = await Promise.all(
            Array(parseInt(number)).fill().map((element,index) =>{
              return Election.methods.candidates(index+1).call()
            })
          );
        setlist(data);

    }

    const getphase=async()=>{
        const q=await collection(db,"phase");
        const snap=await getDocs(q);

        snap.forEach((doc)=>{
            setphase(doc.data().phase)
        })
}

    
    useEffect(() => {

        getphase();
        approvedstatus();
        getdata();
        
    }, [])

    return (
        <div className="voting">


            <h1 className="vote">Caste your Vote Here</h1>
            {
                phase=="voting" && approved==true ?(
            <div className="voter" >
                {
                    list.map((val,index)=>{
                        return(
                            <Candidates 
                                key={index+1}
                                id={index+1}
                                name={val.name}
                                qualification={val.qualification}
                                party={val.party}
                                imageurl={val.imageurl}
                            ></Candidates>

                        );
                    })
                }
                
               
                 

            </div>
                ):(
                    approved==="false"?<h2 className="vote">You haven't Registered , you cant Vote</h2>:
                (<h2 className="vote">Voting Phase is yet to start or its over</h2>))
            }
            
            
        </div>
    )
}

export default Voting

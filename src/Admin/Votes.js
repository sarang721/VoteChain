import React, { useEffect ,useState} from 'react'
import './Votes.css'
import web3 from '../web3';
import Election from '../Election';

function Votes() {


    const [cand,setcand]=useState();
    const [list,setlist]=useState([])
    const [account,setaccount]=useState();
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
      
    }, [])

    return (
        <div className="votes">

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
            
            
        </div>
    )
}

export default Votes

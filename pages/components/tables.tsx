import Table from './table';
import axios from 'axios';
import {useState} from 'react';
import NewPurchase from './newPurchase'
//import {useRouter} from 'next/router';

const Tables = ({data, userid}) =>{
    const  [ purchase, setpurchase] = useState(data)

  //   const router = useRouter();

  //  const refreshData = () => {
    //    router.replace(router.asPath);
  //  }
    
    const upateTable= async() => {
       
       const purch = await fetch(`http://localhost:7000/api/v2/spendingApp/purchase?userid=62a9018b3c07aa27a7b8959e`)
       const data = await purch.json()

       setpurchase(data)
        // setrecentSpendings(recentSpendings => [...recentSpendings, snewData])
    }
    const addPurchase = async(item, category, amount, date, user) => {
        const purchase = {item: item, category: category, price:amount, date:date,  user:user}

        const res = await fetch(`http://localhost:7000/api/v2/spendingApp/purchase?userid=${user}`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
            },
            body: JSON.stringify(purchase),
        })
    }

    const onDelete = async(id)=>{
        console.log('The data gotten by ssr is -> ' + data.item)
        console.log('The current state of the Data is ' + purchase[0].item)
        axios.delete(`http://localhost:7000/api/v2/spendingApp/purchase/${id}`)
        .then(res => console.log(res.data))
		.catch(err => console.log(err.message))

        const purchdata = axios.get(`http://localhost:7000/api/v2/spendingApp/purchase?userid=${userid}`)
        console.log('New data is' + purchdata)
        //setpurchase([purchdata])
    }
    return(
        <>
        <h3>Recent Spendings</h3>
       
        <div>
        {purchase.map((item)=>(<Table key={item._id} purchase={item} onDelete={() => onDelete(item._id)} />))}
        </div>
        <NewPurchase user={userid}  addPurchase={addPurchase} refreshData={upateTable}/>

        <button > Refresh</button>

        </>
    )

}

export default Tables
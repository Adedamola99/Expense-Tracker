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

    const [addNew, setAddNew] = useState(false)
    
    const upateTable= async() => {
       
       const purch = await fetch(`http://localhost:7000/api/v2/spendingApp/purchase?userid=62a9018b3c07aa27a7b8959e`)
       const data = await purch.json()

       setpurchase(data)
        // setrecentSpendings(recentSpendings => [...recentSpendings, snewData])
    }

    const add = ()=>{
        if(addNew == true) {
            setAddNew(false)
        }
        else{
            setAddNew(true)
        }
        
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

        setAddNew(false)

    }

    const onDelete = async(id)=>{
        await fetch(`http://localhost:7000/api/v2/spendingApp/purchase/${id}`,{method: 'DELETE'})
        
        upateTable()
    }
    return(
        <>
        <h3>Recent Spendings</h3>
       
        <div>
        {purchase.length >1 ? purchase.map((item)=>(<Table key={item._id} purchase={item} onDelete={() => onDelete(item._id)} />)) : <h3> No Data to Display </h3>}
        </div>
        <button type='button' onClick={add}> Add New Purchase </button>

        { addNew && <NewPurchase user={userid}  addPurchase={addPurchase} refreshData={upateTable}/>}

        </>
    )

}

export default Tables

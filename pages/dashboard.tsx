import Graph from './components/graph'
import NewPurchase from './components/newPurchase'
import PieChart from './components/pieChart'
import Tables from './components/tables'
import UserBasic from './components/userBasics'
import Image from 'next/image'
import { useState, useEffect} from 'react'
import type {GetStaticProps} from "next";

export default function dashboard ({data, buys}) {

    const [purch, setPurch] = useState(data)

    const person = {
    username : data.firstname,
    monthlySpend: 20000,
    atHand: 1000,
    inBank: 50000,
    userid: data._id
    }

    console.log(purch)

    // useEffect(() =>{
    //     const getPurchases = async () => {
    //         const purchaseFromServer = await fetchPurchases()
            
    //         setPurch(purchaseFromServer)
    //     }


    //     getPurchases()
    // })

    const fetchPurchases = async(id) => {
        const purch = await fetch(`http://localhost:7000/api/v2/spendingApp/purchase?userid=62a9018b3c07aa27a7b8959e`)
        const data = await purch.json()

        return data
    }

    let gdata = [0,0,0,0,0,0,0,0,0,0,0,0]

    const pieInfo = []

    let userSpendings = []
    const graphdata = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                data: gdata,
            },
        ],
    };

    for (let i in buys){
        const currendata = []
        const pos = Number(i) + 1
        const purchaseid = buys[i]._id
        //const tempdata = [pos, buys[i].item, buys[i].category,  buys[i].price, buys[i].date.slice(0,10)]
        console.log(buys[i])
        const month = Number(buys[i].date.slice(5,7))
        const currentyear = new Date()

        if (Number(buys[i].date.slice(0,4)) == currentyear.getFullYear() ){
            for (let x in graphdata.labels){
                if (month == (Number(x)+1)){
                    gdata[x] = gdata[x] + buys[i].price
                }
            }
        }

        //userSpendings.push(tempdata)
    }

    function upateTable(){
       console.log('Table Updated')
        // setrecentSpendings(recentSpendings => [...recentSpendings, snewData])
    }

    return (
        <>
        <h1> User Dashboard</h1>
        <UserBasic  username = {person.username} monthlySpend = {person.monthlySpend}  atHand = {person.atHand} inBank = {person.inBank}/>
        <Tables data={buys} userid='62a9018b3c07aa27a7b8959e'/>

        <button onClick={upateTable}> update </button>
        <Graph data={graphdata}/>
        {/* <PieChart data={pieInfo}/> */}
        <NewPurchase user={person.userid}/>
        </>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:7000/api/v2/spendingApp/users/62a9018b3c07aa27a7b8959e`)
    const purch = await fetch(`http://localhost:7000/api/v2/spendingApp/purchase?userid=62a9018b3c07aa27a7b8959e`)
    const buys = await purch.json()
    const data = await res.json()


    // Pass data to the page via props
    return { props: { data, buys } }
  }


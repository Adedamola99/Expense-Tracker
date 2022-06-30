import Graph from './components/graph'
import NewPurchase from './components/newPurchase'
import PChart from './components/pieChart'
import Tables from './components/tables'
import UserBasic from './components/userBasics'
import Image from 'next/image'
import { useState, useEffect} from 'react'
import type {GetStaticProps} from "next";
import {useRouter} from 'next/router';

export default function dashboard ({data, buys}) {

    console.log(buys)

    const [purch, setPurch] = useState(buys)

    const person = {username : data.firstname, monthlySpend: 20000, atHand: 1000, inBank: 50000, userid: data._id}

    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath);
    }

    const fetchPurchases = async(id) => {
        const purch = await fetch(`http://localhost:7000/api/v2/spendingApp/purchase?userid=62a9018b3c07aa27a7b8959e`)
        const data = await purch.json()

        return data
    }


    const upateTable= async() => {
       refreshData()
       const purch = await fetch(`http://localhost:7000/api/v2/spendingApp/purchase?userid=62a9018b3c07aa27a7b8959e`)
       const data = await purch.json()

       setPurch(data)
    }

    const styling = {height: '400px' , width: '600px'}

    return (
        <>
        <h1> User Dashboard</h1>
        <UserBasic  username = {person.username} monthlySpend = {person.monthlySpend}  atHand = {person.atHand} inBank = {person.inBank}/>
        <Tables data={purch} userid='62a9018b3c07aa27a7b8959e'/>
        
        <div style={styling}> 
        <Graph  buys={buys}/>
        </div>
        
        <div style={styling}>
        <PChart />
        </div>
         
        
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


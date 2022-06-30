 import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler} from "chart.js";

import {useState} from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

import { Bar, Line, Scatter, Bubble} from "react-chartjs-2";
const Graph = ({data, buys}) => {

    //const [graphData, setgraphData] = useState(data);

    let gdata = [0,0,0,0,0,0,0,0,0,0,0,0]

    const graphdata = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                data: gdata,
            },
        ],
    };

    const piedata ={
        backgroundColor: [
            "rgb(2, 88, 255)",
            "rgb(249, 151, 0",
            "rgb(255, 199, 0)",
            "rgb(32, 214, 152)",
        ],
        labels: ["Tech", "Food", "Entertainment", "Clothing"],
        datasets: [
            {
                label: "My first Dataset",
                data: [300, 50, 100, 300],
                backgroundColor: [
                    "rgb(2, 88, 255)",
                    "rgb(249, 151, 0",
                    "rgb(255, 199, 0)",
                    "rgb(32, 214, 152)",
                ],
                hoverOffset: 4,
            },
        ],
    };

    const optionss = {
        elements: {
            arc: {
                weight: 0.5,
                borderWidth: 3,
            },
        },
        cutout: 150,

    };

    for (let i in buys){
        const currendata = []
        const pos = Number(i) + 1
        const purchaseid = buys[i]._id
        
        const month = Number(buys[i].date.slice(5,7))
        const currentyear = new Date()

        if (Number(buys[i].date.slice(0,4)) == currentyear.getFullYear() ){
            for (let x in graphdata.labels){
                if (month == (Number(x)+1)){
                    gdata[x] = gdata[x] + buys[i].price
                }
            }
        }

    }



    const options = {
        responsive: true,
        pulugins: {
           
        },

        elements: {
            line:{
                tension: 0,
                borderWidth: 2,
                borderColor: "rgba(47,97,68, 1)",
                
                
            },
            point : {
                radius: 0,
                hitRadius: 0,
            },
        },
        scales: {

        
        },
    

    };

    
    return (
        <>
        <h1> The Graph goes in here</h1>
       
         <Line data={graphdata} width={100} height={40} options={options} />   
       
        
        </>
    )
}

export default Graph
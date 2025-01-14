import { PieChart } from 'react-minimal-pie-chart';



const PChart = () => {

    const pfutdata = []

    const data = [  
  {
    _id: '62b8d483520e5b41e1fb49cc',
    item: 'NF Merch',
    price: 50,
    category: 'Fashion',
    date: '2023-12-01T00:00:00.000Z',
    user: '62a9018b3c07aa27a7b8959e',
    createdAt: '2022-06-26T21:49:55.855Z',
    updatedAt: '2022-06-26T21:49:55.855Z',
    __v: 0
  },
  {
    _id: '62b8d659520e5b41e1fb49d7',
    item: 'Camo Hoodie',
    price: 20,
    category: 'Fashion',
    date: '2022-09-02T00:00:00.000Z',
    user: '62a9018b3c07aa27a7b8959e',
    createdAt: '2022-06-26T21:57:45.566Z',
    updatedAt: '2022-06-26T21:57:45.566Z',
    __v: 0
  },
  {
    _id: '62b8d8dd520e5b41e1fb49e3',
    item: 'Lamp',
    price: 10,
    category: 'Others',
    date: '2022-11-01T00:00:00.000Z',
    user: '62a9018b3c07aa27a7b8959e',
    createdAt: '2022-06-26T22:08:29.675Z',
    updatedAt: '2022-06-26T22:08:29.675Z',
    __v: 0
  }
]

    const randColorGen = () => {
       const list = [1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']
       let color = '';

       while (color.length < 6){
           color = color + String(list[Math.floor(Math.random() * list.length)]);
        }

        return ('#'+color)
    }
    for(let i in data){

        for (x in pfutdata){
            if( pfutdata[x].title != data[i].category){
                pfutdata.push({title: data[i].category, value: data[i].price, color: () => randColorGen()})
            }
            else{
                
                function titleIndex( pfutdata, category) {
                    let index = -1
                    for(i in myarray){
                        if (myarray[i].title == category){
                            index = i
                        }
                    }
                    return index
                } 
                
                const theIndex = titleIndex(pfutdata, data[i].category)
                
                pfutdata[theIndex].value = pfutdata[theIndex].value + data[i].price 

            }
        } 
     }

     console.log(pfutdata)
    

    const piedata = [
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ]

    return (
        <>
        <h1> The PieChart goes in here</h1>

        <PieChart  data={piedata} />;
        </>
    )
}

export default PChart
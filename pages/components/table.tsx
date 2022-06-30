
const Table = ({purchase, onDelete})=> {

    return (
        <>
            <h3>{purchase.item}</h3>
            <div>
                <span>PRICE : ${purchase.price} | </span>
                <span>CATEGORY : {purchase.category} | </span>
                <span>DATE : {purchase.date.slice(0,10)}  </span>
                <button type='submit' onClick={onDelete}> Delete </button>
                <button type='button'> Update </button>
            </div>
            {/* data => (<tr key={data.id}>{data.map(item =><td key={item.id}>{item}</td>)} <button type='button' onClick={onDelete}>delete</button></tr>))} */}

        </>
    )
}

export default Table
import { useEffect } from "react"
import { useState } from "react"

export function ProductLists() {

    let [products, setProducts] = useState([])
    let [page, setpage] = useState(1)
    let [delstate, setDelstate] = useState(0)
    let [isSort, setisSort] = useState(false)
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

    let getData = (page, isSort) => {
        let url = isSort? `http://localhost:3001/products?_sort=price&_order=asc&_limit=5&_page=${page}`:`http://localhost:3001/products?_limit=5&_page=${page}`
        return fetch(url)
            .then(
                (res) => {
                    return res.json()
                })
    }

    let fetchandupdateData = async () => {
        try {
            setLoading(true);
            let data = await getData(page, isSort)
            setProducts(data)   
        } catch (error) {
            setError(true)
        }
        setLoading(false)
    }

    useEffect(() =>{
        fetchandupdateData(page, isSort)
    },[page,delstate,isSort])

    let handlePagechange =  (changeby) => {
        setpage(page+changeby)
    }

    let handleDelete =  (id) => {
        fetch(`http://localhost:3001/products/${id}`, {
            method: "DELETE"
        })
        setDelstate(id)
    }
    let handleSort =  () => {
        setisSort(true)
    }

    return loading ? (
        <h1>LOADING...</h1>
      ) : error ? (
        <h1>SOMETHING WENT WRONG</h1>
      ) : (
        <div>
            <h3>Products</h3>
            <button onClick={handleSort}>Sort</button>
            {products.map((ele)=>(
                <div key={ele.id} style={{border : "1px solid black", marginBottom:"15px"}}>
                    <p>{ele.id}</p>
                    <p>Title - {ele.title}</p>
                    <p>Gender - {ele.gender}</p>
                    <p>Price - {ele.price}</p>
                    <p>Category - {ele.category}</p>
                    <img src={ele.image}/> <br/>
                    <button onClick={() => handleDelete(ele.id)}>DELETE</button>
                </div>
                
            ))}
            <button disabled={page===1} onClick={()=>handlePagechange(-1)}>Previous</button>
            <p>{page}</p>
            <button disabled={page===3} onClick={()=>handlePagechange(1)}>Next</button>   
        </div>

    )
}
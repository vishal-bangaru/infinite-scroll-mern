import React, { useState } from 'react'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
function PostList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [err,setErr]=useState('');
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fun=async()=>{
    const res=await axios.get(`/posts?limit=10&page=1`,{ headers: { 'Authorization': 'Bearer ' + token} })
    if(res.status!==200)
    setErr(res.data.message)
  else
    setData(res.data.data)
    }
    fun();
  }, []);
  const fetchMoreData = () => {
    setTimeout(()=>{
    axios
      .get(`/posts?limit=10&page=${page}`,{ headers: { 'Authorization': 'Bearer ' + token} })
      .then((res) => {
        console.log(res.status);
        if(res.status!==200)
        setErr(res.data);
      
      else{
        setData((prevItems) => [...prevItems, ...res.data.data]);
        res.data.data.length > 0 ? setHasMore(true) : setHasMore(false);
      }
      })
      .catch((err) => console.log(err));

    setPage((prevPage) => prevPage + 1);
    },1500
    )
  };
   
  return (
    <div>
      { (err.length!=0 )?  <h5 className='text-danger text-center'>{err}</h5> : <p></p>}
       <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<div className='d-flex justify-content-center m-4'><Spinner animation="grow" /></div>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b >Yay! You have seen it all</b>
        </p>
      }
    >
      <div className='container-fluid'>
      {/* row row-cols-sm-2 row-cols-md-4 row-cols-lg-5 mt-3 */}
      {
        data.map(obj=>(
          <div key={obj.id} className=' shadow m-5 row p-2 rounded'>
            <div className='col-sm-6 col-md-4'>
              <img src={obj.thumbnail} style={{width:250,height:250}} className='rounded-circle'/>
              </div>
            <div className='col-sm-6 p-4 col-md-8'>
              <div >
            <h1 className='fs-bold'>{obj.title}</h1>
            </div>
            <div className='mt-2'>
            <p className='fs-5'>Brand: {obj.brand}</p>
            <p className='fs-5'>About: {obj.description}</p>
            <p className='fs-5'>Price: {obj.price}</p>
            <p className='fs-5'>Rating: {obj.rating}</p>
            </div>

            </div>
            
          </div>
          
        ))
      }
      </div>
       </InfiniteScroll>
       
    </div>
  )
}

export default PostList
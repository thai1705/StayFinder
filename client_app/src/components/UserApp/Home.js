// import NewPost from './Newpost';
import '../../css/Home.css'
// import HotPost from './Hotpost';
// import Post from './Post';
function Home() {

  return (
    <main style={{padding: "0px 184px", backgroundColor:'#f2f2f280', paddingTop:'20px', paddingBottom:'20px'}}>
 {/* Gợi ý khu vực  */}

<h5 style={{marginBottom:'15px', fontSize: '20px'}}>Gợi ý khu vực</h5>

    <div className="Main-GYKV">
    <div className="item1">
        <h5>TP HỒ CHÍ MINH</h5>
        <div className='item_shadow'>
        <img src="/images/anhsg.jpg" width="490px" height="314px" alt="" />
        <div></div>
        </div>
    </div>

    <div className="item2">
        <h6>HÀ NỘI</h6>
        <div className='item_shadow'>
        <img src="/images/anhhn.jpg" width="314px" height="148px" alt="" />
        <div style={{width:'314px'}}></div>
        </div>

    </div>

    <div className="item3">
        <h6>BÌNH DƯƠNG</h6>
        <div className='item_shadow'>
        <img src="/images/anhbd.webp" width="314px" height="148px" alt="" />
        <div style={{width:'314px'}}></div>
        </div>
    </div>

    <div className="item4">
        <h6>ĐỒNG NAI</h6>
        <div className='item_shadow'>
        <img src="/images/anhdn.jpg" width="314px" height="148px" alt="" />
        <div style={{width:'314px'}}></div>
        </div>
    </div>

    <div className="item5">
        <h6>ĐÀ NẴNG</h6>
        <div className='item_shadow'>
        <img src="/images/anhdanang.jpg" width="314px" height="148px" alt="" />
        <div style={{width:'314px'}}></div>
        </div>
    </div>
</div>

  {/* <HotPost /> 
  <NewPost /> 
  <Post />  */}

</main>


  )
}

export default Home
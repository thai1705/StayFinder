import React, { useState,useEffect } from 'react';  
import '../../css/Post.css'
import AxiosInstance from '../../lib/Axiosintance';
import { Link } from 'react-router-dom'; 
function PostRoomSale() {
  const [viewMode, setViewMode] = useState('row');  
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };
  const [post, setPosts] = useState([]);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };
  useEffect(() => {
    const fetchRoomSale = async () => {
      try {
        const response = await AxiosInstance().get('/lay-danh-sach-bai-dang');
  
        console.log('Phản hồi từ API:', response);
  
        // If response is directly an array, set it directly
        if (Array.isArray(response)) {
          const roomPosts = response.filter(post => post.rentaltype === 'cho-thue-phong-tro');
  
          if (roomPosts.length > 0) {
            setPosts(roomPosts);
            console.log('Bài đăng cho thuê phòng trọ:', roomPosts);
          } else {
            console.error('Không có bài đăng cho thuê phòng trọ.');
          }
        } else {
          console.error('Phản hồi từ API không hợp lệ hoặc không có dữ liệu:', response);
        }
      } catch (error) {
        console.error('Lỗi khi lấy bài đăng cho thuê phòng trọ:', error);
      }
    };
  
    fetchRoomSale();
  }, []);
  
  return (
    <div className='PostApartment_container'>  
<div className='form-menu'>
  <div className='form-search'>
    <i className='fa-solid fa-magnifying-glass'></i>
    <input type='text' placeholder='Tìm nhanh. VD: Vinhomes Central Park' />
  </div>

  <select className='select-menu'>
    <option>Loại nhà đất</option>
    <option>Căn hộ</option>
    <option>Nhà phố</option>
  </select>

  <select className='select-menu'>
    <option>Khu vực & dự án</option>
    <option>TP HCM</option>
    <option>Hà Nội</option>
  </select>

  <select className='select-menu'>
    <option>Mức giá</option>
    <option>Dưới 1 triệu</option>
    <option>1 - 3 triệu</option>
  </select>

  <select className='select-menu'>
    <option>Diện tích</option>
    <option>≤ 30 m²</option>
    <option>30 - 50 m²</option>
  </select>

  <button className='reset'>
    <i className='fa-solid fa-rotate-right'></i> Đặt lại
  </button>
</div>



      <div class='container-post'>
            <div className='post-list-render'>
              <div className='border-bottom border-1 border-gray pb-3'>
                <div className='path pb-1'>
                  <ol >
                    <li className='href'>
                      <a href='/'>Trang chủ</a>
                    </li>
                    <li >
                      <a href='/cho-thue-can-ho' className='dsch'>Danh sách phòng trọ</a>
                    </li>
                  </ol>
                </div>
                <div className='title-list'>Danh sách phòng trọ trên Toàn Quốc</div>
              </div>
              <div className='filter-menu row mt-3 '>

                <div className='col-md-6'>
                <p>Hiện có 9000 {post.length} có trên toàn quốc

                </p>
                </div>
              
                <div className='col-md-6 option-post'>
                  <div className='grid-row'>
                  <button 
                  className={`grid-post ${viewMode === 'grid' ? 'active' : ''}`} 
                  onClick={() => handleViewModeChange('grid')}
                >
                  <i class="bi bi-grid"></i>
                    </button>
                    <button 
                  className={`row-post ${viewMode === 'row' ? 'active' : ''}`} 
                  onClick={() => handleViewModeChange('row')}
                >
                    <i class="bi bi-layout-text-sidebar"></i>
                    </button>
                  </div>
                <select className='select-option'>
                  <option value=''>
                    Thông thường
                  </option>
                  <option value='section1'>
                    Tin mới nhất
                  </option>
                  <option value='section2'>
                    Giá thấp đến cao
                  </option>
                  <option value='section3'>
                    Giá cao đến thấp
                  </option>
                  <option value='section4'>
                    Giá trên m² cao đến thấp
                  </option>
                  <option value='section5'>
                    Giá trên m² thấp đến cao
                  </option>
                  <option value='section6'>
                    Diện tích bé đến lớn
                  </option>
                  <option value='section7'>
                    Diện tích lớn đến bé
                  </option>
                </select>
                </div>
              
                </div>
                <div className={`list-home ${viewMode === 'grid' ? 'grid-view' : 'row-view'}`}>
                {post.length === 0 ? (
        <p>Không có bài đăng nào cho thuê phòng trọ.</p>
      ) : (
        post.map(post => (
                  <div className='row post-row'>
                    <div className=' img-post'>
                      {post.image.length > 0 && (
                    <img src={`http://localhost:8000/img/${post.image[0]}`}  alt=""/> 
                  )}
                    </div>
                    <div className='col-7 information'>
                      <div className='item-name'>
                      <Link to={`/chi-tiet-bai-dang/${post._id}`}>
                      <a href='' className='text-decoration-none '>{post.title}</a>
                      </Link>
                      <div className='list-infor'>
                       <li className='list-infor-price'> {formatCurrency(post.price)}/tháng</li>
                       <li className='list-infor-acreage'>{post.area} m²</li>
                       <li className='item'>
                        <div className='number'>{post.bedroom}</div>
                        <div className="icon">
                         <i class="fa fa-bed"></i>
                         </div>
                       </li>
                       <li className='item'>
                       <div className='number'>{post.bathroom}</div>
                       <div className="icon">
                         <i class="fa fa-bath"></i>
                         </div>
                       </li>
                      </div>
                      <div className='location'>
                      <i class="fa-solid fa-map-location-dot"></i>
                      <div className='name-location'>
                      <div>{post.district.name}, {post.province.name}</div>
                      </div>
                      </div>
                      <div className='content'  dangerouslySetInnerHTML={{ __html: post.description }}>
                    
                      </div>
                      <div className='footer-post'>
                      <div className='date'>
                       Hôm Nay
                      </div>
                      <div className='love border-black border-5 w-10 h-10 '>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
                   ))
                  )}
                  
                  </div>
                </div>
            <div className='form-list-filter'>
              <div className='list-filter'>
                <ul className='filters' >
                  <li>
                    <ul className='filter'>
                      <h5>Lọc Theo Giá Tiền</h5>
                      <li>Dưới 1 triệu</li>
                      <li>1 - 3 triệu</li>
                      <li>3 - 5 triệu</li>
                      <li>5 - 10 triệu</li>
                      <li>10 - 40 triệu</li>
                      <li>40 - 70 triệu</li>
                      <li>70 - 100 triệu</li>
                      <li>Trên 100 triệu</li>
                    </ul>
                  </li>
                  <li >
                      <ul className='filter'>
                        <h5>Lọc theo diện tích</h5>
                        <li>≤ 30 m²</li>
                        <li>30 - 50 m²</li>
                        <li>50 - 80 m²</li>
                        <li>80 - 100 m²</li>
                        <li>100 - 150 m²</li>
                        <li>150 - 200 m²</li>
                        <li>200 - 250 m²</li>
                        <li>250 - 300 m²</li>
                        <li>300 - 500 m²</li>
                        <li>Trên 500 m²</li>
                      </ul>
                    </li>
                    <li>
                      <ul className='filter'>
                        <h5>Loại bất động sản</h5>
                        <li>Phòng trọ</li>
                        <li>Căn hộ</li>
                        <li>Kí túc xá</li>
                        <li>Nhà ở</li>
                      </ul>
                    </li>
                  <li>
                    <ul className='filter'>
                      <h5>Lọc Theo Khu Vực</h5>
                      <li>TP HỒ CHÍ MINH</li>
                      <li>HÀ NỘI</li>
                      <li>BÌNH DƯƠNG</li>
                      <li>ĐỒNG NAI</li>
                      <li>BÀ RIẠ</li>
                    </ul>
                    <li>
                      <ul className='filter'>
                     
                      <div class="news-section__header">
                        <h5 class="news-section__title">Tin tức bất động sản</h5>
                      </div>
                      <li>
                      <div class="news-section__item">
                        <div class="news-section__image">
                          <img src="./images/anhsg.jpg" alt="tin tức bất động sản" />
                        </div>
                        <div class="news-section__content">
                          <p class="news-section__description">Chợ Bà Điểm – Nơi giao lưu mua bán của người dân Hóc Môn</p>
                          <div class="news-section__date">27/8/2006</div>
                        </div>
                      </div>
                      </li> 

                        <li>
                        <div class="news-section__item">
                          <div class="news-section__image">
                            <img src="./images/anhsg.jpg" alt="tin tức bất động sản" />
                          </div>
                          <div class="news-section__content">
                            <p class="news-section__description">Chợ Bà Điểm – Nơi giao lưu mua bán của người dân Hóc Môn</p>
                            <div class="news-section__date">27/8/2006</div>
                          </div>
                        </div>
                        </li> 
                        <li>
                        <div class="news-section__item">
                          <div class="news-section__image">
                            <img src="./images/anhsg.jpg" alt="tin tức bất động sản" />
                          </div>
                          <div class="news-section__content">
                            <p class="news-section__description">Chợ Bà Điểm – Nơi giao lưu mua bán của người dân Hóc Môn</p>
                            <div class="news-section__date">27/8/2006</div>
                          </div>
                        </div>
                        </li> 
                        <li>
                        <div class="news-section__item">
                          <div class="news-section__image">
                            <img src="./images/anhsg.jpg" alt="tin tức bất động sản" />
                          </div>
                          <div class="news-section__content">
                            <p class="news-section__description">Chợ Bà Điểm – Nơi giao lưu mua bán của người dân Hóc Môn</p>
                            <div class="news-section__date">27/8/2006</div>
                          </div>
                        </div>
                        </li> 
                      </ul>
                    </li>
                  </li>
                </ul>
              </div>
            </div>
          </div> 
    </div> 
  )
}

export default PostRoomSale

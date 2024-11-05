import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AxiosInstance from '../../lib/Axiosintance';
import { useParams } from 'react-router-dom';

function PostDetail() {
  const { id } = useParams();
  const [post,setPost]=useState({
    media: [], // Dữ liệu media sẽ chứa các video và hình ảnh
    image: [], // Danh sách hình ảnh
    video: [], // Danh sách video
  })
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const result = await AxiosInstance().get(`/chi-tiet-bai-dang/${id}`);
        setPost(result);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
      }
    };

 fetchProduct();
    
  }, [id]);
  // Hàm định dạng ngày
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('vi-VN', options);
  };
  const renderPostType = (type) => {
    switch (type) {
      case 'thuong':
        return 'Tin Thường';
      case 'vip1':
        return 'Tin Vip 1';
      case 'vip2':
        return 'Tin Vip 2';
      default:
        return 'Loại tin không xác định';
    }
  };
 

  return (
    <div className='container post-detail-container'>
      <div className='col-8'>
      <div className='carousel-wrapper'>
      <div id="slider" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
              {/* Render video nếu có, sau đó render hình ảnh */}
              {post.video.length > 0 && post.video.map((vid, index) => (
                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={`video-${index}`}>
                  <video video controls width="100%" height="100%">
                    <source src={`http://localhost:8000/video/${vid}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))}
              {post.image.length > 0 && post.image.map((img, index) => (
                <div className={`carousel-item ${post.video.length === 0 && index === 0 ? 'active' : ''}`} key={`image-${index}`}>
                  <img src={`http://localhost:8000/img/${img}`} alt={`Slide ${index}`} />
                </div>
              ))}
              </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
          </button>
          
        </div>
      </div>
      <div className='body-information'>
        <div class='title-content-post'>{post.title}</div>
        <div class='address-post'>
        {post.address}
        </div>
        <div className='big-information'>
          <div className='big-price'>
            <div className='big-price-head'>Mức giá</div>
            <div className='big-price-body'>{post.price}/tháng</div>
          </div>
          <div className='big-acreage'>
            <div className='big-acreage-head'>Diện tích</div>
            <div className='big-acreage-body'>{post.area} m²</div>
          </div>
          <div className='big-bedrrom'>
            <div className='big-bedrrom-head'>Phòng ngủ</div>
            <div className='big-bedrrom-body'>{post.bedroom} PN</div>
          </div>
        </div>
        <div className='description-information'>
          <div className='description-information-title'>
            Thông tin mô tả
          </div>
          <div className='description-information-content' dangerouslySetInnerHTML={{ __html: post.description }} >
          
          </div>
        </div>
        <div className='characteristic'>
          <div className='characteristic-title'>
          Đặc điểm bất động sản
          </div>
          <div className='post-type-small'>Loại tin đăng: {post.rentaltype}</div>
          <div className="information-container">
  <div className="column-post">
    <div className="small-acreage">
      <div className="acreage-icon-group">
      <div className="acreage-icon">
          <img src="../images/acreage.png" alt="" />
        </div>
        <div className="acreage-icon-name">Diện tích</div>
      </div>
      <div className="number-acreage">{post.area} m²</div>
    </div>

    <div className="small-price">
      <div className="price-icon-group">
      <div className="price-icon">
          <img src="../images/price-icon.png" alt="" />
        </div>
        <div className="price-icon-name">Mức giá</div>
      </div>
      <div className="number-price">{post.price}/tháng</div>
    </div>
    <div className="small-bedroom">
    <div className="bedroom-icon-group">
    <div className="bedroom-icon">
        <img src="../images/bedroom-icon.png" alt="" />
      </div>
    <div className="bedroom-icon-name">Số phòng ngủ</div>
      </div>
      <div className="number-bedroom">1 phòng</div>
    </div>
  </div>

  <div className="column-post">
    

    <div className="small-bathroom">
    <div className="bathroom-icon-group">
    <div className="bathroom-icon">
        <img src="../images/bathroom-icon.png" alt="" />
      </div>
    <div className="bathroom-icon-name">Số phòng vệ sinh</div>
      </div>
      <div className="number-bathroom">{post.bathroom} phòng</div>
    </div>

    <div className="small-floor">
    <div className="bathroom-icon-group">
      <div className="floor-icon">
        <img src="../images/floor-icon.png" alt="" />
      </div>
      <div className="floor-icon-name">Số tầng</div>
      </div>
      <div className="number-floor">{post.floor} tầng</div>
    </div>

    <div className="small-attic">
    <div className="attic-icon-group">
      <div className="attic-icon">
        <img src="../images/attic-icon.png" alt="" />
      </div>
      <div className="attic-icon-name">Gác lửng</div>
      </div>
      <div className="number-attic">{post.attic ? 'Có' : 'Không'}</div>
    </div>
  </div>
</div>

      <div className='map-post'>
        <div className='map-post-title'>Xem trên bản đồ</div>
        <iframe
          title="map-post"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4436614899205!2d106.6252534745119!3d10.85382108929969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752bee0b0ef9e5%3A0x5b4da59e47aa97a8!2zQ8O0bmcgVmnDqm4gUGjhuqduIE3hu4FtIFF1YW5nIFRydW5n!5e0!3m2!1svi!2s!4v1684984988242!5m2!1svi!2s"
          width="100%"
          height="250px"
          style= {{border: "0"}}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          frameBorder="0"
        ></iframe>
      </div>
      <div className='all-information-post'>
        <div className='date-post'>
          <div className='date-post-title'>
            Ngày đăng
          </div>
          <div className='date-post-number'>
          {formatDate(post.createdAt)}
          </div>
        </div>
        <div className='expiration-date'>
          <div className='expiration-date-title'>
            Ngày hết hạn
          </div>
          <div className='expiration-date-number'>
          {post.expireDate ? formatDate(post.expireDate) : 'Không giới hạn thời gian'}
          </div>
        </div>
        <div className='news-type-post'>
          <div className='news-type-post-title'>
            Loại tin
          </div>
          <div className='news-type-post-content'>
          {renderPostType(post.posttype)}
          </div>
        </div>
        <div className='news-code-post'>
          <div className='news-code-post-title'>
            Mã Tin
          </div>
          <div className='news-code-post-number'>
          {post && post._id ? post._id.substring(0, 8).toUpperCase() : 'N/A'}
          </div>
        </div>
      </div>
        </div>
      </div>
      <div className='viewed-news'>
        <div className='viewed-news-title'>Tin dành cho bạn</div>
        <div className='viewed-news-list-post'>
          <div className='viewed-news-post'>
            <div className='viewed-news-post-img'>
              <img src='/images/anhbd.webp' alt=''/>
            </div>
            <div className='viewed-news-post-content'>
              <div className='viewed-news-post-title'>Nhà lầu 2 tầng ba xe,có đầy đủ nội thất, 2 phòng ngủ,
                2 phòng iyfkftgfuf6
              </div>
              <div className='viewed-news-post-center'>
              <div className='viewed-news-post-price'>10 triệu</div>
              <div className='viewed-news-post-acreage'>20 m²</div>
              </div>
              <div className='viewed-news-post-address'>
                Hóc Môn, Hồ Chí Minh
              </div>
              <div className='viewed-news-post-footer'>
                      <div className='viewed-news-post-date'>
                        Hôm Nay
                      </div>
                      <div className='viewed-news-post-love'>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
            </div>
          </div>
          <div className='viewed-news-post'>
            <div className='viewed-news-post-img'>
              <img src='/images/anhbd.webp' alt=''/>
            </div>
            <div className='viewed-news-post-content'>
              <div className='viewed-news-post-title'>Nhà lầu 2 tầng ba xe,có đầy đủ nội thất, 2 phòng ngủ,
                2 phòng iyfkftgfuf6
              </div>
              <div className='viewed-news-post-center'>
              <div className='viewed-news-post-price'>10 triệu</div>
              <div className='viewed-news-post-acreage'>20 m²</div>
              </div>
              <div className='viewed-news-post-address'>
                Hóc Môn, Hồ Chí Minh
              </div>
              <div className='viewed-news-post-footer'>
                      <div className='viewed-news-post-date'>
                        Hôm Nay
                      </div>
                      <div className='viewed-news-post-love'>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
            </div>
          </div>
          <div className='viewed-news-post'>
            <div className='viewed-news-post-img'>
              <img src='/images/anhbd.webp' alt=''/>
            </div>
            <div className='viewed-news-post-content'>
              <div className='viewed-news-post-title'>Nhà lầu 2 tầng ba xe,có đầy đủ nội thất, 2 phòng ngủ,
                2 phòng iyfkftgfuf6
              </div>
              <div className='viewed-news-post-center'>
              <div className='viewed-news-post-price'>10 triệu</div>
              <div className='viewed-news-post-acreage'>20 m²</div>
              </div>
              <div className='viewed-news-post-address'>
                Hóc Môn, Hồ Chí Minh
              </div>
              <div className='viewed-news-post-footer'>
                      <div className='viewed-news-post-date'>
                        Hôm Nay
                      </div>
                      <div className='viewed-news-post-love'>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
            </div>
          </div>
          <div className='viewed-news-post'>
            <div className='viewed-news-post-img'>
              <img src='/images/anhbd.webp' alt=''/>
            </div>
            <div className='viewed-news-post-content'>
              <div className='viewed-news-post-title'>Nhà lầu 2 tầng ba xe,có đầy đủ nội thất, 2 phòng ngủ,
                2 phòng iyfkftgfuf6
              </div>
              <div className='viewed-news-post-center'>
              <div className='viewed-news-post-price'>10 triệu</div>
              <div className='viewed-news-post-acreage'>20 m²</div>
              </div>
              <div className='viewed-news-post-address'>
                Hóc Môn, Hồ Chí Minh
              </div>
              <div className='viewed-news-post-footer'>
                      <div className='viewed-news-post-date'>
                        Hôm Nay
                      </div>
                      <div className='viewed-news-post-love'>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
            </div>
          </div>
          <div className='viewed-news-post'>
            <div className='viewed-news-post-img'>
              <img src='/images/anhbd.webp' alt=''/>
            </div>
            <div className='viewed-news-post-content'>
              <div className='viewed-news-post-title'>Nhà lầu 2 tầng ba xe,có đầy đủ nội thất, 2 phòng ngủ,
                2 phòng iyfkftgfuf6
              </div>
              <div className='viewed-news-post-center'>
              <div className='viewed-news-post-price'>10 triệu</div>
              <div className='viewed-news-post-acreage'>20 m²</div>
              </div>
              <div className='viewed-news-post-address'>
                Hóc Môn, Hồ Chí Minh
              </div>
              <div className='viewed-news-post-footer'>
                      <div className='viewed-news-post-date'>
                        Hôm Nay
                      </div>
                      <div className='viewed-news-post-love'>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
            </div>
          </div>
          <div className='viewed-news-post'>
            <div className='viewed-news-post-img'>
              <img src='/images/anhbd.webp' alt=''/>
            </div>
            <div className='viewed-news-post-content'>
              <div className='viewed-news-post-title'>Nhà lầu 2 tầng ba xe,có đầy đủ nội thất, 2 phòng ngủ,
                2 phòng iyfkftgfuf6
              </div>
              <div className='viewed-news-post-center'>
              <div className='viewed-news-post-price'>10 triệu</div>
              <div className='viewed-news-post-acreage'>20 m²</div>
              </div>
              <div className='viewed-news-post-address'>
                Hóc Môn, Hồ Chí Minh
              </div>
              <div className='viewed-news-post-footer'>
                      <div className='viewed-news-post-date'>
                        Hôm Nay
                      </div>
                      <div className='viewed-news-post-love'>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
            </div>
          </div>
          
          <div className='viewed-news-post'>
            <div className='viewed-news-post-img'>
              <img src='/images/anhbd.webp' alt=''/>
            </div>
            <div className='viewed-news-post-content'>
              <div className='viewed-news-post-title'>Nhà lầu 2 tầng ba xe,có đầy đủ nội thất, 2 phòng ngủ,
                2 phòng iyfkftgfuf6
              </div>
              <div className='viewed-news-post-center'>
              <div className='viewed-news-post-price'>10 triệu</div>
              <div className='viewed-news-post-acreage'>20 m²</div>
              </div>
              <div className='viewed-news-post-address'>
                Hóc Môn, Hồ Chí Minh
              </div>
              <div className='viewed-news-post-footer'>
                      <div className='viewed-news-post-date'>
                        Hôm Nay
                      </div>
                      <div className='viewed-news-post-love'>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
            </div>
          </div>
          <div className='viewed-news-post'>
            <div className='viewed-news-post-img'>
              <img src='/images/anhbd.webp' alt=''/>
            </div>
            <div className='viewed-news-post-content'>
              <div className='viewed-news-post-title'>Nhà lầu 2 tầng ba xe,có đầy đủ nội thất, 2 phòng ngủ,
                2 phòng iyfkftgfuf6
              </div>
              <div className='viewed-news-post-center'>
              <div className='viewed-news-post-price'>10 triệu</div>
              <div className='viewed-news-post-acreage'>20 m²</div>
              </div>
              <div className='viewed-news-post-address'>
                Hóc Môn, Hồ Chí Minh
              </div>
              <div className='viewed-news-post-footer'>
                      <div className='viewed-news-post-date'>
                        Hôm Nay
                      </div>
                      <div className='viewed-news-post-love'>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
            </div>
          </div>
          <div className='viewed-news-post'>
            <div className='viewed-news-post-img'>
              <img src='/images/anhbd.webp' alt=''/>
            </div>
            <div className='viewed-news-post-content'>
              <div className='viewed-news-post-title'>Nhà lầu 2 tầng ba xe,có đầy đủ nội thất, 2 phòng ngủ,
                2 phòng iyfkftgfuf6
              </div>
              <div className='viewed-news-post-center'>
              <div className='viewed-news-post-price'>10 triệu</div>
              <div className='viewed-news-post-acreage'>20 m²</div>
              </div>
              <div className='viewed-news-post-address'>
                Hóc Môn, Hồ Chí Minh
              </div>
              <div className='viewed-news-post-footer'>
                      <div className='viewed-news-post-date'>
                        Hôm Nay
                      </div>
                      <div className='viewed-news-post-love'>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
            </div>
          </div>
          <div className='viewed-news-post'>
            <div className='viewed-news-post-img'>
              <img src='/images/anhbd.webp' alt=''/>
            </div>
            <div className='viewed-news-post-content'>
              <div className='viewed-news-post-title'>Nhà lầu 2 tầng ba xe,có đầy đủ nội thất, 2 phòng ngủ,
                2 phòng iyfkftgfuf6
              </div>
              <div className='viewed-news-post-center'>
              <div className='viewed-news-post-price'>10 triệu</div>
              <div className='viewed-news-post-acreage'>20 m²</div>
              </div>
              <div className='viewed-news-post-address'>
                Hóc Môn, Hồ Chí Minh
              </div>
              <div className='viewed-news-post-footer'>
                      <div className='viewed-news-post-date'>
                        Hôm Nay
                      </div>
                      <div className='viewed-news-post-love'>
                        <i class="fa-regular fa-heart"></i>
                        </div>
                      </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div height='50%' className='col-4 user-post'>
        <div className='user-information-post'>
          <div className='user-information-post-img'>
            <img src='/images/anhbd.webp' alt=''/>
          </div>
          <div className='user-information-post-contact'>
          <div className='user-information-post-phone'>
          <i class="bi bi-telephone"></i>
          <div className='user-information-post-phone-number'>{post.phone}</div>
          </div>
          <div className='user-information-post-chat'>
          <i class="bi bi-chat"></i>
          <div className='user-information-post-chat-title'>Nhắn Tin</div>
          </div>
          <div className='user-information-post-zalo'>
          <img src='/images/zalo-icon.jpg' alt='' />
          <div className='user-information-post-zalo-nam'>{post.username}</div>
          </div>
          </div>
          
        </div>
        <div className='suggest-commune-post'>
          <div className='suggest-commune-post-title'>Cho thuê phòng trọ tại Hóc Môn</div>
          <ul className='suggest-commune-post-name'>
            <li>
            <a href='/xa'>Xã A</a>
            </li>
            <li>
            <a href='/xca'>Xã Châu Á</a>
            </li>
            <li>
            <a href='/xcau'>Xã Châu Âu</a>
            </li>
            <li>
            <a href='xcp'>Xã Châu Pha
            </a>
            </li>
            <li>
            <a href='/xacphi'>Xã Châu Phi</a>
            </li>
            <li>
            <a href='/xcm'>Xã Châu Mỹ</a>
            </li>
            <li>
            <a href='/xct'>Xã Cần Thơ</a>
            </li>
            <li>
            <a href='/xmytho'>Xã Mỹ Tho</a>
            </li>
            <div className='suggest-commune-post-continue'>
            <a href='/xemthem'>Xem thêm</a>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;


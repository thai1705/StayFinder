import React from 'react';
import { Link } from 'react-router-dom';


function PostDetail() {
  return (
    <div className='container post-detail-container'>
      <div className='col-8'>
      <div className='carousel-wrapper'>
        <div id="slider" className="carousel">
      
          <div className="carousel-inner">
  <div className="carousel-item active">
    <img src="/images/anhbd.webp" alt="" />
  </div>
  <div className="carousel-item">
    <img src="/images/anhbd.webp" alt="" />
  </div>
  <div className="carousel-item">
    <img src="/images/anhbd.webp" alt="" />
  </div>
  <div className="carousel-item">
    <img src="/images/anhbd.webp" alt="" />
  </div>
  <div className="carousel-item">
    <img src="/images/anhbd.webp" alt="" />
  </div>
</div>
          <button className="carousel-control-prev" type="button" data-bs-target="#slider" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"><i class="fas fa-chevron-left"></i></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#slider" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>
          </button>
          <div className="carousel-indicators">
            <div data-bs-target="#slider" data-bs-slide-to="0" className="active slideimg">
            <img src="/images/anhbd.webp" alt="" />
            </div>
            <div data-bs-target="#slider" data-bs-slide-to="1" className="slideimg">
              <img src="/images/anhbd.webp" alt="" />
            </div>
            <div data-bs-target="#slider" data-bs-slide-to="2" className="slideimg">
              <img src="/images/anhbd.webp" alt="" />
            </div>
            <div data-bs-target="#slider" data-bs-slide-to="3" className="slideimg">
              <img src="/images/anhbd.webp" alt="" />
            </div>
            <div data-bs-target="#slider" data-bs-slide-to="4" className="slideimg">
              <img src="/images/anhbd.webp" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className='body-information'>
        <div class='title-content-post'>Phòng trọ có DuPlex 4  đến 5 người ở  mới Xây, Giá 
        Bao Rẻ</div>
        <div class='address-post'>
          Đường Nguyễn Thị X, Xã Bình Tĩnh, Huyện Bình Minh, Tp Hồ Chí Minh
        </div>
        <div className='big-information'>
          <div className='big-price'>
            <div className='big-price-head'>Mức giá</div>
            <div className='big-price-body'>2 triệu/tháng</div>
          </div>
          <div className='big-acreage'>
            <div className='big-acreage-head'>Diện tích</div>
            <div className='big-acreage-body'>40 m²</div>
          </div>
          <div className='big-bedrrom'>
            <div className='big-bedrrom-head'>Phòng ngủ</div>
            <div className='big-bedrrom-body'>2 PN</div>
          </div>
        </div>
        <div className='description-information'>
          <div className='description-information-title'>
            Thông tin mô tả
          </div>
          <div className='description-information-content'>
           Bán Nhà sổ Hồng Riêng đường nguyễn thị thủ gần trường pham văn sáng Xtt Hóc Môn
           Dt:4x10 trệt lửng 2 phòng ngủ đường nhựa xe tải đậu cửa
           Giá bán hạ:2 tỷ bớt lộc
           SHR đã có sẵn sang tên trong 1 nốt nhạc
           Đường xá thông thoáng di chuyển không kẹt xe
           Điện , nước có sẵn vào là ở và sinh hoạt ngay được
           Thích hợp để ở hoặc cho thuê
           Hỗ trợ ngân hàng lên đến 50%
           Trường , chợ , quán xá phòng gym... có sẵn xung quanh , đến các địa điểm này không quá 10p
           Liên hệ Đạt ngay để xem sổ xem nhà !
           Chỉ bán trong tuần , chủ gồng không nổi.
          </div>
        </div>
        <div className='characteristic'>
          <div className='characteristic-title'>
          Đặc điểm bất động sản
          </div>
          <div className='post-type-small'>Loại tin đăng: Cho thuê phòng trọ</div>
          <div className="information-container">
  <div className="column-post">
    <div className="small-acreage">
      <div className="acreage-icon-group">
      <div className="acreage-icon">
          <img src="../images/acreage.png" alt="" />
        </div>
        <div className="acreage-icon-name">Diện tích</div>
      </div>
      <div className="number-acreage">40 m²</div>
    </div>

    <div className="small-price">
      <div className="price-icon-group">
      <div className="price-icon">
          <img src="../images/price-icon.png" alt="" />
        </div>
        <div className="price-icon-name">Mức giá</div>
      </div>
      <div className="number-price">10 triệu/tháng</div>
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
      <div className="number-bathroom">1 phòng</div>
    </div>

    <div className="small-floor">
    <div className="bathroom-icon-group">
      <div className="floor-icon">
        <img src="../images/floor-icon.png" alt="" />
      </div>
      <div className="floor-icon-name">Số tầng</div>
      </div>
      <div className="number-floor">1 tầng</div>
    </div>

    <div className="small-attic">
    <div className="attic-icon-group">
      <div className="attic-icon">
        <img src="../images/attic-icon.png" alt="" />
      </div>
      <div className="attic-icon-name">Gác lửng</div>
      </div>
      <div className="number-attic">Có</div>
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
            19/05/2024
          </div>
        </div>
        <div className='expiration-date'>
          <div className='expiration-date-title'>
            Ngày hết hạn
          </div>
          <div className='expiration-date-number'>
            25/05/2024
          </div>
        </div>
        <div className='news-type-post'>
          <div className='news-type-post-title'>
            Loại tin
          </div>
          <div className='news-type-post-content'>
            Tin nổi bật
          </div>
        </div>
        <div className='news-code-post'>
          <div className='news-code-post-title'>
            Mã Tin
          </div>
          <div className='news-code-post-number'>
            A3412322
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
          <div className='user-information-post-phone-number'>0333333624</div>
          </div>
          <div className='user-information-post-chat'>
          <i class="bi bi-chat"></i>
          <div className='user-information-post-chat-title'>Nhắn Tin</div>
          </div>
          <div className='user-information-post-zalo'>
          <img src='/images/zalo-icon.jpg' alt='' />
          <div className='user-information-post-zalo-nam'>Donald Trump</div>
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


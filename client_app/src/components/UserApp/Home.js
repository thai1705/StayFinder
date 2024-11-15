import React, { useEffect, useState } from "react";
import "../../css/Home.css";
import "../../css/PostNew.css";
import { Link, useLocation } from "react-router-dom";
import AxiosInstance from "../../lib/Axiosintance";
import { handleLoveClick } from "./handlePost";
import {
  formatDate,
  formatCurrency,
} from "../UserApp/Post_list_component/utils";
function Home() {
  const [vip2Posts, setVip2Posts] = useState([]);
  const [vip1Posts, setVip1Posts] = useState([]);
  const [regularPosts, setRegularPosts] = useState([]);
  const location = useLocation();
  const provinceQuery = new URLSearchParams(location.search).get("province");
  const [likedPosts, setLikedPosts] = useState([]);
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const response = await AxiosInstance().get("/lay-danh-sach-bai-dang");
        if (Array.isArray(response)) {
          const currentDate = new Date();
          const provinceFilteredPosts = response.filter(
            (post) => post.province.name === provinceQuery
          );
          // Lọc các bài tin VIP1
          const vip1 = response.filter(
            (post) =>
              post.posttype === "vip1" &&
              post.statuspost === "Đã thanh toán" &&
              new Date(post.expireDate) > currentDate &&
              post.isVisible
          );

          // Lọc các bài tin VIP2
          const vip2 = response.filter(
            (post) =>
              post.posttype === "vip2" &&
              post.statuspost === "Đã thanh toán" &&
              new Date(post.expireDate) > currentDate &&
              post.isVisible
          );

          const thuong = response.filter(
            (post) => post.posttype === "thuong" && post.isVisible
          );

          setVip1Posts(vip1);
          setVip2Posts(vip2);
          setRegularPosts(thuong);
        } else {
          console.error(
            "Phản hồi từ API không hợp lệ hoặc không có dữ liệu:",
            response
          );
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài đăng cho thuê phòng trọ:", error);
      }
    };

    fetchAllPost();
  }, [provinceQuery]);
  return (
    <div className='PostApartment_container'>
 {/* Gợi ý khu vực  */}

<h5 style={{marginBottom:'15px', fontSize: '20px'}}>Gợi ý khu vực</h5>

    <div className="Main-GYKV">
    <div className="item1">
        <h5>TP HỒ CHÍ MINH</h5>
        <div className='item_shadow'>
        <img src="/images/anhsg.jpg" width="450px" height="314px" alt="" />
        <div></div>
        </div>
    </div>

          <div className="item2">
            <h6>HÀ NỘI</h6>
            <div className="item_shadow">
              <Link to="/lay-danh-sach-bai-dang-theo-tinh?province=Thành phố Hà Nội">
                <img
                  src="/images/anhhn.jpg"
                  width="313px"
                  height="148px"
                  alt=""
                />
              </Link>
            </div>
          </div>

          <div className="item3">
            <h6>BÌNH DƯƠNG</h6>
            <div className="item_shadow">
              <Link to="/lay-danh-sach-bai-dang-theo-tinh?province=Tỉnh Bình Dương">
                <img
                  src="/images/anhbd.webp"
                  width="313px"
                  height="148px"
                  alt=""
                />
              </Link>
            </div>
          </div>

          <div className="item4">
            <h6>ĐỒNG NAI</h6>
            <div className="item_shadow">
              <Link to="/lay-danh-sach-bai-dang-theo-tinh?province=Tỉnh Đồng Nai">
                <img
                  src="/images/anhdn.jpg"
                  width="313px"
                  height="148px"
                  alt=""
                />
              </Link>
            </div>
          </div>

          <div className="item5">
            <h6>ĐÀ NẴNG</h6>
            <div className="item_shadow">
              <Link to="/lay-danh-sach-bai-dang-theo-tinh?province=Thành phố Đà Nẵng">
                <img
                  src="/images/anhdanang.jpg"
                  width="313px"
                  height="148px"
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      
      <div className="danh-sach-tin-container">
        <div className="name-list-post-title">Tin Vip Cao Cấp</div>
        <div className="danh-sach-tip-vip-cao-cap">
          {vip2Posts.slice(0, 10).length > 0 ? (
            vip2Posts.slice(0, 10).map((post) => (
              <div className="list-post-container" key={post._id}>
                <div className="img-post-list-home">
                  {post.posttype === "vip2" ? (
                    <div className="post-label post-label-vip2">
                      <i className="fa fa-crown" aria-hidden="true"></i> Tin Vip
                      Cao Cấp
                    </div>
                  ) : null}

                  {post.image.length > 0 && (
                    <img
                      src={`http://localhost:8000/img/${post.image[0]}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="post-content-infor">
                  <Link to={`/chi-tiet-bai-dang/${post._id}`}>
                    <div className="title-list-post">{post.title}</div>
                  </Link>
                  <div className="post-number-position">
                    <div className="list-post-price">
                      {formatCurrency(post.price)}/tháng
                    </div>
                    <div className="list-post-are">{post.area} m²</div>
                  </div>
                  <div className="list-post-loaction">
                    {post.district.name}, {post.province.name}
                  </div>
                  <div className="footer-list-post">
                    <div className="date">{formatDate(post.createdAt)}</div>
                    <div
                      className="love"
                      onClick={() =>
                        handleLoveClick(
                          post._id,
                          likedPosts || [],
                          setLikedPosts
                        )
                      } // Sử dụng mảng rỗng nếu likedPosts là undefined
                    >
                      <i
                        className={
                          likedPosts && likedPosts.includes(post._id)
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có tin vip 2 nào</p>
          )}
        </div>
      </div>
      <div className="danh-sach-tin-container">
        <div className="name-list-post-title">Tin Vip Nổi Bật</div>
        <div className="danh-sach-tip-vip-noi-bat">
          {vip1Posts.slice(0, 10).length > 0 ? (
            vip1Posts.slice(0, 10).map((post) => (
              <div className="list-post-container" key={post._id}>
                <div className="img-post-list-home">
                  {post.posttype === "vip1" ? (
                    <div className="post-label post-label-vip1">
                      <i className="fa fa-star" aria-hidden="true"></i> Tin Vip
                      Nổi Bật
                    </div>
                  ) : null}

                  {post.image.length > 0 && (
                    <img
                      src={`http://localhost:8000/img/${post.image[0]}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="post-content-infor">
                  <Link to={`/chi-tiet-bai-dang/${post._id}`}>
                    <div className="title-list-post">{post.title}</div>
                  </Link>
                  <div className="post-number-position">
                    <div className="list-post-price">
                      {formatCurrency(post.price)}/tháng
                    </div>
                    <div className="list-post-are">{post.area} m²</div>
                  </div>
                  <div className="list-post-loaction">
                    {post.district.name}, {post.province.name}
                  </div>
                  <div className="footer-list-post">
                    <div className="date">{formatDate(post.createdAt)}</div>
                    <div
                      className="love"
                      onClick={() =>
                        handleLoveClick(
                          post._id,
                          likedPosts || [],
                          setLikedPosts
                        )
                      } // Sử dụng mảng rỗng nếu likedPosts là undefined
                    >
                      <i
                        className={
                          likedPosts && likedPosts.includes(post._id)
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có tin vip 1 nào</p>
          )}
        </div>
      </div>
      <div className="danh-sach-tin-container">
        <div className="name-list-post-title">Bài đăng miễn phí</div>
        <div className="danh-sach-tin-thuong">
          {regularPosts.slice(0, 10).length > 0 ? (
            regularPosts.slice(0, 10).map((post) => (
              <div className="list-post-container">
                <div className="img-post-list-home">
                  {post.posttype === "thuong" ? (
                    <div className="post-label post-label-thuong">
                      <i className="fa fa-circle" aria-hidden="true"></i> Tin
                      thường
                    </div>
                  ) : null}

                  {post.image.length > 0 && (
                    <img
                      src={`http://localhost:8000/img/${post.image[0]}`}
                      alt=""
                    />
                  )}
                </div>
                <div className="post-content-infor">
                  <Link to={`/chi-tiet-bai-dang/${post._id}`}>
                    <div className="title-list-post">{post.title}</div>
                  </Link>
                  <div className="post-number-position">
                    <div className="list-post-price">
                      {formatCurrency(post.price)}/tháng
                    </div>
                    <div className="list-post-are">{post.area} m²</div>
                  </div>
                  <div className="list-post-loaction">
                    {post.district.name}, {post.province.name}
                  </div>
                  <div className="footer-list-post">
                    <div className="date">{formatDate(post.createdAt)}</div>
                    <div
                      className="love"
                      onClick={() =>
                        handleLoveClick(
                          post._id,
                          likedPosts || [],
                          setLikedPosts
                        )
                      } // Sử dụng mảng rỗng nếu likedPosts là undefined
                    >
                      <i
                        className={
                          likedPosts && likedPosts.includes(post._id)
                            ? "fa-solid fa-heart"
                            : "fa-regular fa-heart"
                        }
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có tin thường nào</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import "../../css/Home.css";
import "../../css/PostNew.css";
import { Link, useLocation } from "react-router-dom";
import AxiosInstance from "../../lib/Axiosintance";
import { handleLoveClick } from "./handlePost";
import { formatDate, formatCurrency } from "../UserApp/Post_list_component/utils";
import axios from "axios"; // Đảm bảo axios đã được cài đặt

function Home() {
  const [vip2Posts, setVip2Posts] = useState([]);
  const [vip1Posts, setVip1Posts] = useState([]);
  const [tinh, setTinh] = useState([]);
  const [error, setError] = useState("");
  const [regularPosts, setRegularPosts] = useState([]);
  const location = useLocation();
  const provinceQuery = new URLSearchParams(location.search).get("province");
  const [likedPosts, setLikedPosts] = useState([]);
  const [provinceImages, setProvinceImages] = useState({}); // Lưu trữ ảnh cho từng tỉnh
  const PEXELS_API_KEY = "JN3UwRYIoiSdfLix9UK6Jv6qSRlXQd3KgMZNGFJiHZWhEbuXRk4mIdEi"; // API Key Pexels
  const PEXELS_API_URL = "https://api.pexels.com/v1/search"; // Endpoint tìm kiếm ảnh từ Pexels

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
          console.error("Phản hồi từ API không hợp lệ hoặc không có dữ liệu:", response);
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài đăng cho thuê phòng trọ:", error);
      }
    };

    fetchAllPost();
  }, [provinceQuery]);

  const fetchImageForProvince = async (provinceName) => {
    if (!provinceImages[provinceName]) { // Kiểm tra xem ảnh của tỉnh đã được lấy chưa
      try {
        const response = await axios.get(PEXELS_API_URL, {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
          params: {
            query: provinceName,
            per_page: 1,
          },
        });

        if (response.data.photos.length > 0) {
          setProvinceImages((prevState) => ({
            ...prevState,
            [provinceName]: response.data.photos[0].src.medium,
          }));
        } else {
          setProvinceImages((prevState) => ({
            ...prevState,
            [provinceName]: "/images/default.jpg", // Ảnh mặc định nếu không có ảnh từ Pexels
          }));
        }
      } catch (error) {
        console.error("Lỗi khi tải ảnh từ Pexels:", error);
      }
    }
  };

  useEffect(() => {
    const fetchTopProvinces = async () => {
      try {
        const response = await AxiosInstance().get("/lay-tinh-co-bai-viet-nhieu-nhat");
        if (Array.isArray(response)) {
          setTinh(response); // Gán danh sách tỉnh từ API
        } else {
          throw new Error("Dữ liệu trả về không hợp lệ");
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách tỉnh:", err);
        setError("Không thể tải danh sách tỉnh tiêu biểu.");
      }
    };

    fetchTopProvinces();
  }, []);

  // Gọi hàm lấy ảnh cho mỗi tỉnh khi danh sách tỉnh thay đổi
  useEffect(() => {
    tinh.forEach((province) => {
      fetchImageForProvince(province._id.name);
    });
  }, [tinh]);

  return (

    <div className="PostApartment_container">
      <marquee direction="right">
        Hoc HTML tai VietJack - Vi du cach su dung the marquee{" "}
      </marquee>
      {/* Gợi ý khu vực  */}
      <h5 style={{ marginBottom: "15px", fontSize: "20px" }}>Gợi ý khu vực</h5>


      <div className="Main-GYKV">
        {tinh.slice(0, 5).map((province, index) => (
          <div className={`item${index + 1}`} key={province._id.code}>
            <h6>{province._id.name.toUpperCase()}</h6>
            <div className="item_shadow">
              <Link
                to={`/lay-danh-sach-bai-dang-theo-tinh?province=${encodeURIComponent(
                  province._id.name
                )}`}
              >
                <img
                  src={provinceImages[province._id.name] || "/images/default.jpg"} // Hiển thị ảnh từ Pexels hoặc ảnh mặc định
                  alt={province._id.name}
                  width={index === 0 ? "450px" : "313px"}
                  height={index === 0 ? "314px" : "148px"}
                />
              </Link>
            </div>
            <div className='quantity-post'>Số bài đăng:{province.postCount}</div>
          </div>
        ))}
        {error && <p>{error}</p>}
      </div>

      {/* Tin VIP Cao Cấp */}
      <div className="danh-sach-tin-container">
        <div className="name-list-post-title">Tin Vip Cao Cấp</div>
        <div className="danh-sach-tip-vip-cao-cap">
          {vip2Posts.slice(0, 10).length > 0 ? (
            vip2Posts.slice(0, 10).map((post) => (
              <div className="list-post-container" key={post._id}>
                <div className="img-post-list-home">
                  {post.posttype === "vip2" && (
                    <div className="post-label post-label-vip2">
                      <i className="fa fa-crown" aria-hidden="true"></i> Tin Vip Cao Cấp
                    </div>
                  )}
                  {post.image.length > 0 && (
                    <img src={`http://localhost:8000/img/${post.image[0]}`} alt="" />
                  )}
                </div>
                <div className="post-content-infor">
                  <Link to={`/chi-tiet-bai-dang/${post._id}`}>
                    <div className="title-list-post">{post.title}</div>
                  </Link>
                  <div className="post-number-position">
                    <div className="list-post-price">{formatCurrency(post.price)}/tháng</div>
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
                        handleLoveClick(post._id, likedPosts || [], setLikedPosts)
                      }
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

      {/* Tin VIP Nổi Bật */}
      <div className="danh-sach-tin-container">
        <div className="name-list-post-title">Tin Vip Nổi Bật</div>
        <div className="danh-sach-tip-vip-noi-bat">
          {vip1Posts.slice(0, 10).length > 0 ? (
            vip1Posts.slice(0, 10).map((post) => (
              <div className="list-post-container" key={post._id}>
                <div className="img-post-list-home">
                  {post.posttype === "vip1" && (
                    <div className="post-label post-label-vip1">
                      <i className="fa fa-star" aria-hidden="true"></i> Tin Vip Nổi Bật
                    </div>
                  )}
                  {post.image.length > 0 && (
                    <img src={`http://localhost:8000/img/${post.image[0]}`} alt="" />
                  )}
                </div>
                <div className="post-content-infor">
                  <Link to={`/chi-tiet-bai-dang/${post._id}`}>
                    <div className="title-list-post">{post.title}</div>
                  </Link>
                  <div className="post-number-position">
                    <div className="list-post-price">{formatCurrency(post.price)}/tháng</div>
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
                        handleLoveClick(post._id, likedPosts || [], setLikedPosts)
                      }
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
        <div className="name-list-post-title">Tin Thường</div>
        <div className="danh-sach-tip-vip-noi-bat">
          {regularPosts.slice(0, 10).length > 0 ? (
            regularPosts.slice(0, 10).map((post) => (
              <div className="list-post-container" key={post._id}>
                <div className="img-post-list-home">
                  {post.posttype === "thuong" && (
                    <div className="post-label post-label-thuong">
                      <i className="fa fa-star" aria-hidden="true"></i> Tin Vip Nổi Bật
                    </div>
                  )}
                  {post.image.length > 0 && (
                    <img src={`http://localhost:8000/img/${post.image[0]}`} alt="" />
                  )}
                </div>
                <div className="post-content-infor">
                  <Link to={`/chi-tiet-bai-dang/${post._id}`}>
                    <div className="title-list-post">{post.title}</div>
                  </Link>
                  <div className="post-number-position">
                    <div className="list-post-price">{formatCurrency(post.price)}/tháng</div>
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
                        handleLoveClick(post._id, likedPosts || [], setLikedPosts)
                      }
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
    </div>
  );
}

export default Home;

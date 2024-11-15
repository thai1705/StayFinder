import React, { useEffect, useState } from "react";
import "../../../css/PostNew.css";
import Menu from "../PostComponent/Menu";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AxiosInstance from "../../../lib/Axiosintance";
import axios from "axios";
import { Button, message, Select } from "antd";
import { jwtDecode } from "jwt-decode";
import {
  handleFileChange,
  handleVideoChange,
} from "../../UserApp/Post_list_component/utils";
const { Option } = Select;

export default function PostNew() {
  const [text, setText] = useState("#PS33630");
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [post, setPost] = useState({
    title: "",
    description: "",
    price: "",
    area: "",
    province: "", // Lưu tên tỉnh
    district: "", // Lưu tên quận
    ward: "", // Lưu tên phường
    address: "",
    bathroom: "",
    bedroom: "",
    attic: false,
    floor: "",
    image: null,
    video: null,
    rentaltype: "", // ID của RentalType
    posttype: "", // ID của PostType
    userId: "", // User ID
    phone: "", // User phone
    username: "",
  });

  const formatPrice = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handlePriceChange = (e) => {
    let inputValue = e.target.value;

    // Lưu trữ giá trị nhập vào
    let rawValue = inputValue.replace(/\./g, ""); // Xóa dấu chấm để chuyển đổi

    // Kiểm tra nếu giá trị là số và không vượt quá 1 tỷ
    if (!isNaN(rawValue) && parseInt(rawValue) <= 1000000000) {
      let formattedPrice = formatPrice(rawValue);
      setPost((prev) => ({ ...prev, price: formattedPrice }));
    } else {
      // Nếu giá trị không hợp lệ, có thể để lại thông báo lỗi hoặc không thay đổi giá trị
      // setPost(prev => ({ ...prev, price: inputValue })); // Giữ nguyên giá trị nhập vào
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(text); // Sao chép mã tài khoản
    message.success("Đã sao chép mã tài khoản vào clipboard!"); // Thông báo thành công
  };

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://provinces.open-api.vn/api/?depth=1"
      );
      setProvinces(response.data || []);
    } catch (error) {
      console.error("Error fetching provinces:", error); // Log detailed error information
      message.error("Lỗi khi lấy danh sách tỉnh/thành phố");
    }
  };
  const [paymentDetails, setPaymentDetails] = useState({
    adType: "", // Loại tin (VIP1, VIP2, Thường)
    price: 0, // Thành tiền
    startDate: null, // Ngày đăng
    endDate: null, // Ngày hết hạn
  });

  const handlePostTypeChange = (e) => {
    const adType = e.target.value;
    const today = new Date();
    let endDate = null;
    let price = 0;

    if (adType === "vip1") {
      endDate = new Date(today.setDate(today.getDate() + 7)); // VIP1: 7 ngày
      price = 15000; // VIP1: 15000
    } else if (adType === "vip2") {
      endDate = new Date(today.setDate(today.getDate() + 14)); // VIP2: 14 ngày
      price = 30000; // VIP2: 30000
    } else if (adType === "thuong") {
      endDate = "Vĩnh viễn"; // Thường: Không có ngày hết hạn
      price = 0; // Thường: Miễn phí
    }

    setPaymentDetails({
      adType,
      price,
      startDate: new Date().toLocaleDateString(), // Ngày đăng là hôm nay
      endDate: endDate === "Vĩnh viễn" ? endDate : endDate.toLocaleDateString(), // Ngày hết hạn
    });

    setPost((prevPost) => ({
      ...prevPost,
      posttype: adType, // Cập nhật loại tin vào post
    }));
  };
  useEffect(() => {
    fetchProvinces(); // Fetch provinces on component mount
  }, []);
  // Decode JWT token to get user information
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setPost((prevPost) => ({
          ...prevPost,
          userId: decoded.userId,
          phone: decoded.phone,
          username: decoded.username,
        }));
      } catch (error) {
        console.error("Invalid token", error);
        message.error("Vui lòng đăng nhập lại.");
      }
    }
  }, []);

  const handleProvinceChange = async (value) => {
    const selectedProvince = provinces.find(
      (province) => province.code === value
    );
    setPost((prev) => ({
      ...prev,
      province: { name: selectedProvince.name, code: selectedProvince.code },
    })); // Lưu tên và mã tỉnh
    setDistricts([]);
    setWards([]);

    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${value}?depth=2`
      );
      setDistricts(response.data.districts || []);
    } catch (error) {
      console.error("Error fetching districts:", error); // Log detailed error information
      message.error("Lỗi khi lấy danh sách huyện");
    }
  };

  const handleDescriptionChange = (value) => {
    setPost((prevPost) => ({
      ...prevPost,
      description: value,
    }));
  };

  const handleDistrictChange = async (value) => {
    const selectedDistrict = districts.find(
      (district) => district.code === value
    );
    setPost((prev) => ({
      ...prev,
      district: { name: selectedDistrict.name, code: selectedDistrict.code }, // Lưu tên và mã huyện
      ward: "",
    }));
    setWards([]);

    try {
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${value}?depth=2`
      );
      setWards(response.data.wards || []);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách xã");
    }
  };

  const handleWardChange = (value) => {
    const selectedWard = wards.find((ward) => ward.code === value);
    if (selectedWard) {
      setPost((prev) => ({
        ...prev,
        ward: { name: selectedWard.name, code: selectedWard.code },
      })); // Lưu tên và mã phường
    }
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    const currentTotal =
      selectedImages.length + (post.video ? post.video.length : 0);

    if (currentTotal > 5) {
      message.error(
        "Bạn chỉ được tải lên tối đa 5 file bao gồm cả ảnh và video."
      );
    } else {
      setPost((prev) => ({ ...prev, image: selectedImages }));

      // Hiển thị tên các tệp đã chọn
      const fileNames = selectedImages.map((file) => file.name).join(", ");
      document.getElementById("file-name").textContent =
        fileNames || "Chưa chọn tệp nào";

      // Hiển thị ảnh được chọn
      const imagePreviewContainer = document.getElementById("image-preview");
      imagePreviewContainer.innerHTML = ""; // Clear previous previews

      selectedImages.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imgElement = document.createElement("img");
          imgElement.src = reader.result;
          imgElement.style.width = "100px"; // You can adjust the size
          imgElement.style.marginRight = "10px";
          imgElement.style.marginBottom = "10px";
          imagePreviewContainer.appendChild(imgElement);
        };
        reader.readAsDataURL(file); // Convert image file to base64 for preview
      });
    }
  };

  const handleVideoChange = (e) => {
    const selectedVideos = Array.from(e.target.files);
    const currentTotal =
      selectedVideos.length + (post.image ? post.image.length : 0);

    if (currentTotal > 5) {
      message.error(
        "Bạn chỉ được tải lên tối đa 5 file bao gồm cả ảnh và video."
      );
    } else {
      setPost((prev) => ({ ...prev, video: selectedVideos }));

      // Hiển thị tên các tệp video đã chọn
      const videoNames = selectedVideos.map((file) => file.name).join(", ");
      document.getElementById("video-name").textContent =
        videoNames || "Chưa chọn video nào";

      // Hiển thị video được chọn
      const videoPreviewContainer = document.getElementById("video-preview");
      videoPreviewContainer.innerHTML = ""; // Clear previous previews

      selectedVideos.forEach((file) => {
        const videoElement = document.createElement("video");
        videoElement.src = URL.createObjectURL(file);
        videoElement.style.width = "100px"; // You can adjust the size
        videoElement.style.marginRight = "10px";
        videoElement.style.marginBottom = "10px";
        videoElement.controls = true; // Enable video controls (play, pause, etc.)
        videoPreviewContainer.appendChild(videoElement);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.userId) {
      message.error("Vui lòng đăng nhập để tiếp tục.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("description", post.description || "");
      formData.append("price", post.price);
      formData.append("area", post.area);
      formData.append("province", JSON.stringify(post.province));
      formData.append("district", JSON.stringify(post.district));
      formData.append("ward", JSON.stringify(post.ward));
      formData.append("address", post.address);
      formData.append("bathroom", post.bathroom || 0);
      formData.append("bedroom", post.bedroom || 0);
      formData.append("attic", post.attic);
      formData.append("floor", post.floor || 0);
      formData.append("userId", post.userId);
      formData.append("phone", post.phone);
      formData.append("username", post.username);
      // Thêm từng tệp hình ảnh vào formData
      if (post.image) {
        post.image.forEach((file) => {
          formData.append("image", file); // Thêm tệp hình ảnh vào formData
        });
      }

      // Thêm từng tệp video vào formData
      if (post.video) {
        post.video.forEach((file) => {
          formData.append("video", file); // Thêm tệp video vào formData
        });
      }
      formData.append("rentaltype", post.rentaltype);
      formData.append("posttype", post.posttype);
      // Console để kiểm tra dữ liệu trong formData
      console.log("Dữ liệu gửi đi:", Array.from(formData.entries()));

      const response = await AxiosInstance("multipart/form-data").post(
        "/them-bai-viet-moi",
        formData
      );
      console.log("Response from backend:", response.data);
      if (response && response.payUrl) {
        console.log("Response from backend:", response.payUrl);
        window.location.href = response.payUrl; // Redirect to MoMo payment
      } else {
        message.success("Đăng tin thành công");
      }
    } catch (error) {
      console.error(
        "Lỗi khi thêm sản phẩm:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <div className="listnewform">
      <aside>
        <Menu />
      </aside>
      <form className="post-form" onSubmit={handleSubmit}>
        <h3>THÔNG TIN</h3>
        <div className="form-filter">
          <div className="form-group">
            <label htmlFor="city">Tỉnh/thành phố *</label>
            <Select
              placeholder="Chọn Tỉnh/Thành Phố"
              onChange={handleProvinceChange}
              style={{ width: "100%" }}
              required
            >
              {provinces.map((province) => (
                <Option key={province.code} value={province.code}>
                  {province.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="form-group">
            <label htmlFor="district">Quận/huyện *</label>
            <Select
              placeholder="Chọn Quận/Huyện"
              onChange={handleDistrictChange}
              style={{ width: "100%" }}
              required
            >
              {districts.map((district) => (
                <Option key={district.code} value={district.code}>
                  {district.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="form-group">
            <label htmlFor="ward">Phường/Xã *</label>
            <Select
              placeholder="Chọn Phường/Xã"
              onChange={handleWardChange}
              style={{ width: "100%" }}
              required
            >
              {wards.map((ward) => (
                <Option key={ward.code} value={ward.code}>
                  {ward.name}
                </Option>
              ))}
            </Select>
          </div>

          <div className="form-group">
            <label htmlFor="address">Địa chỉ chính xác</label>
            <input
              type="text"
              id="address"
              value={post.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ chính xác..."
            />
          </div>
        </div>

        <div className="form-filter">
          <div className="form-group">
            <label htmlFor="category">Chuyên mục cho thuê *</label>
            <select
              id="rentaltype"
              value={post.rentaltype}
              onChange={handleInputChange}
              required
            >
              <option value="">Chọn chuyên mục</option>
              <option value="cho-thue-phong-tro">Cho thuê phòng trọ </option>
              <option value="cho-thue-can-ho">Cho thuê căn hộ</option>
              <option value="cho-thue-nha-o">Cho thuê nhà ở</option>
              <option value="tim-nguoi-o-ghep">Tìm người ở ghép</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Giá *</label>
            <input
              type="text"
              id="price"
              value={post.price}
              onChange={handlePriceChange}
              placeholder="Nhập giá..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="area">Diện tích (m²) *</label>
            <input
              type="number"
              id="area"
              value={post.area}
              onChange={handleInputChange}
              required
              placeholder="Nhập diện tích..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="bathroom">Số nhà vệ sinh *</label>
            <input
              type="number"
              id="bathroom"
              value={post.bathroom}
              onChange={handleInputChange}
              placeholder="Nhập số nhà vệ sinh..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="bedroom">Số phòng ngủ *</label>
            <input
              type="number"
              id="bedroom"
              value={post.bedroom}
              onChange={handleInputChange}
              placeholder="Nhập số phòng ngủ..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="attic">Số gác lửng</label>
            <input
              type="checkbox"
              id="attic"
              value={post.attic}
              onChange={handleInputChange}
              placeholder="Nhập số gác lửng..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="floor">Số tầng</label>
            <input
              type="number"
              id="floor"
              value={post.floor}
              onChange={handleInputChange}
              placeholder="Nhập số tầng..."
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="title">Tiêu đề *</label>
          <input
            type="text"
            id="title"
            value={post.title}
            onChange={handleInputChange}
            required
            placeholder="Nhập tiêu đề..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả *</label>
          <ReactQuill
            className="reactquill-description"
            id="description"
            name="description"
            value={post.description}
            onChange={handleDescriptionChange}
            maxLength="5000"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                [{ font: [] }],
                [{ color: [] }, { background: [] }],
                ["link", "unlink"],
                [{ align: [] }],
                [{ list: "check" }],
                ["image", "video"],
                ["clean"],
              ],
            }}
          />
        </div>

        <div className="form-group">
          <label class="file-upload-wrapper">
            <span class="icon">📁</span>
            <span>Chọn tệp tin ảnh</span>
            <input
              type="file"
              id="image"
              name="image"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          <div class="file-name" id="file-name">
            Chưa chọn tệp nào
          </div>
          <div id="image-preview" class="image-preview"></div>
        </div>
        <div className="form-group">
          <label className="file-upload-wrapper">
            <span className="icon">🎥</span>
            <span>Chọn tệp tin video</span>
            <input
              type="file"
              id="video"
              name="video"
              multiple
              accept="video/*"
              onChange={handleVideoChange}
            />
          </label>
          <div className="file-name" id="video-name">
            Chưa chọn video nào
          </div>
          <div id="video-preview" className="video-preview"></div>
        </div>
        <p>Tối đa 5 ảnh + video.</p>

        <h3>Chọn gói đăng tin</h3>
        <div className="form-group">
          <label htmlFor="adType">Loại tin *</label>
          <select
            id="posttype"
            value={post.posttype}
            onChange={handlePostTypeChange}
            required
          >
            <option value="">Chọn loại tin</option>
            <option value="vip1">Tin Vip 1 </option>
            <option value="vip2">Tin Vip 2</option>
            <option value="thuong">Tin thường</option>
          </select>
        </div>

        <div className="payment-form">
          <h3>Thông tin thanh toán</h3>
          <div className="payment-details">
            <div className="payment-row">
              <span className="payment-row-padding-right">Loại tin:</span>
              <span>
                {paymentDetails.adType === "vip1"
                  ? "Tin Vip 1"
                  : paymentDetails.adType === "vip2"
                  ? "Tin Vip 2"
                  : "Tin Thường"}
              </span>
            </div>
            <div className="payment-row">
              <span className="payment-row-padding-right">Đơn giá:</span>
              <span>
                {paymentDetails.adType === "vip1"
                  ? "15.000đ"
                  : paymentDetails.adType === "vip2"
                  ? "30.000đ"
                  : "Miễn phí"}
              </span>
            </div>
            <div className="payment-row">
              <span className="payment-row-padding-right">Ngày đăng:</span>
              <span>{paymentDetails.startDate}</span>
            </div>
            <div className="payment-row">
              <span className="payment-row-padding-right">Ngày hết hạn:</span>
              <span>{paymentDetails.endDate}</span>
            </div>
            <div className="payment-row payment-row-none">
              <span className="payment-row-padding-right">Thành tiền:</span>
              <span>{paymentDetails.price.toLocaleString()}đ</span>
            </div>
          </div>
          <button className="payment-button">Đăng tin và thanh toán</button>
        </div>
      </form>
    </div>
  );
}

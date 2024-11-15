import React, { useState, useEffect } from 'react';  
import "../../../css/ManagerPost.css";
import Menu from "./Menu";
import AxiosInstance from '../../../lib/Axiosintance';
import { jwtDecode } from 'jwt-decode';
import { formatDate } from '../../UserApp/Post_list_component/utils';
import { Link } from 'react-router-dom';

export default function ManagerPost() {
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [posts, setPosts] = useState([]);

  // Lấy userId từ token
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.userId : null;

  const handleToggleMenu = (id) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await AxiosInstance().get('/lay-danh-sach-bai-dang-theo-userid', {
          params: { userId }
        });
        if (Array.isArray(response)) {
          const filteredPosts = response.filter(post => !post.isDeleted);
          setPosts(response);
        } else {
          console.error('Phản hồi từ API không hợp lệ hoặc không có dữ liệu:', response);
        }
      } catch (error) {
        console.error('Lỗi khi lấy bài đăng của người dùng:', error);
      }
    };

    if (userId) fetchUserPosts();
    else console.error('Không tìm thấy userId trong token');
  }, [userId]);
  const toggleVisibility = async (postId, isVisible) => {
    try {
      // Gọi API để thay đổi trạng thái bài đăng
      const response = await AxiosInstance().put(`/an-hien-bai-dang/${postId}`, {
        isVisible: !isVisible
      });
      if (response) {
        // Cập nhật lại danh sách bài đăng với trạng thái mới
        setPosts(prevPosts => prevPosts.map(post =>
          post._id === postId ? { ...post, isVisible: !isVisible } : post
        ));
      }
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái bài đăng:', error);
    }
  };
  // Tính toán bài đăng hiển thị cho trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Tính số lượng trang
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const deletePost = async (postId) => {
    try {
      const response = await AxiosInstance().delete(`/xoa-bai-dang/${postId}`);
      if (response.message === 'Bài đăng đã bị xóa.') {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      }
    } catch (error) {
      console.error('Lỗi khi xóa bài đăng:', error);
    }
  };
  
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="listnewform">
      <aside>
        <Menu />
      </aside> 
      
      <div className="data-table">
        <div className="filter-section">
          <input type="text" placeholder="Tìm theo ngày đăng" />
          <input type="text" placeholder="Tìm theo danh mục" />
          <input type="text" placeholder="Tìm theo loại tin" />
        </div>
        <div className="tab-section">
          <span className="active-tab">Tất cả ({posts.length})</span>
          <span>Đã cho thuê (0)</span>
          <span>Đang hiển thị ({posts.length})</span>
          <span>Sắp hết hạn (0)</span>
          <span>Hết hạn (0)</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Loại tin</th>
              <th>Tiêu đề</th>
              <th>Ảnh</th>
              <th>Ngày đăng</th>
              <th>Ngày hết hạn</th>
              <th>Trạng thái</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length === 0 ? (
              <tr><td colSpan="8">Không có bài đăng nào của người dùng.</td></tr>
            ) : (
              currentPosts.map((post, index) => (
                <tr key={post._id}>
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{post.posttype}</td>
                  <td>{post.title}</td>
                  <td className='img-table'>
                    {post.image.length > 0 && (
                      <img src={`http://localhost:8000/img/${post.image[0]}`} alt="" />
                    )}
                  </td>
                  <td>{formatDate(post.createdAt)}</td>
                  <td>{formatDate(post.expireDate)}</td>
                  <td><button 
                      className="an-hien-button" 
                      onClick={() => toggleVisibility(post._id, post.isVisible)}
                    >
                      {post.isVisible ? 'Ẩn' : 'Hiện'}
                    </button>
                    </td>
                  <td className="action-post" onClick={() => handleToggleMenu(post._id)}>
                    ⋮
                    {activeMenu === post._id && (
                      <div className="action-menu">
                        <Link to={`/chinh-sua-tin-dang/${post._id}`}>
                        <button onClick={() => alert("Sửa bài đăng")}>Sửa</button>
                        </Link>
                        <button onClick={() => deletePost(post._id)}>Xóa</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <i class="fa-solid fa-circle-chevron-left"></i>
          </button>
          <span> {currentPage} / {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <i class="fa-solid fa-circle-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

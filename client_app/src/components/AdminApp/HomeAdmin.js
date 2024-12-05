import React, { useEffect, useState } from "react";
import { Link,Navigate } from "react-router-dom";

import "../../css/HomeAdmin.css";

function HomeAdmin() {
  const [userCount, setUserCount] = useState(0);
  const [newUserCount, setNewUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [isLoadingRevenues, setIsLoadingRevenues] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingRevenues, setLoadingRevenues] = useState(true);
  const [loadingNewUsers, setLoadingNewUsers] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);  // Trạng thái kiểm tra quyền admin

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAdmin(false);  // Nếu không có token, không phải là admin
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split('.')[1])); // Giải mã token
      if (decoded.role === 0 || decoded.role === 1) {
        setIsAdmin(true);  // Nếu role là admin, cho phép truy cập
      } else {
        setIsAdmin(false);  // Nếu không phải admin, không cho phép
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAdmin(false);  // Nếu có lỗi giải mã token, không phải admin
    }

    if (isAdmin) {
      // Hàm gọi API để lấy tổng số người dùng
      const fetchUserCount = async () => {
        setLoading(true);
        setIsLoadingUsers(true);
        try {
          const response = await fetch("http://localhost:8000/api/auth/count", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Response error:", errorText);
            throw new Error("Không thể lấy dữ liệu");
          }

          const data = await response.json();
          setUserCount(data.totalUsers);
        } catch (error) {
          console.error("Error fetching user count:", error);
          setError(error.message);
        } finally {
          setTimeout(() => {
            setLoading(false);
            setIsLoadingUsers(false);
          }, 300);
        }
      };

      // người dùng mới
      const fetchNewUserCount = async () => {
        setLoadingNewUsers(true);
        try {
          const response = await fetch(
            "http://localhost:8000/api/auth/new-users-count",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Response error:", errorText);
            throw new Error("Không thể lấy số người dùng mới");
          }

          const data = await response.json();
          setNewUserCount(data.newUsersCount);
        } catch (error) {
          console.error("Error fetching new user count:", error);
        } finally {
          setLoadingNewUsers(false);
        }
      };

      // Hàm lấy tổng doanh thu
      const fetchTotalPrice = async () => {
        setIsLoadingRevenues(true);
        try {
          const response = await fetch('http://localhost:8000/lay-tong-so-doanh-thu', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Response error:", errorText);
            throw new Error("Không thể lấy dữ liệu doanh thu");
          }

          const data = await response.json();
          if (data.totalRevenue) {
            setTotalRevenue(data.totalRevenue);
          } else {
            console.log("Không có dữ liệu giao dịch");
            setTotalRevenue(0);
          }
        } catch (error) {
          console.error("Error fetching total price:", error);
          setError(error.message);
          setTotalRevenue(0);
        } finally {
          setIsLoadingRevenues(false);
        }
      };

      // tổng bài đăng
      const fetchTotalPosts = async () => {
        setLoadingPosts(true);
        try {
          const response = await fetch(
            "http://localhost:8000/lay-tong-so-bai-dang",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Response error:", errorText);
            throw new Error("Không thể lấy số bài đăng");
          }

          const data = await response.json();
          setTotalPosts(data.totalPosts);
        } catch (error) {
          console.error("Error fetching total posts:", error);
        } finally {
          setLoadingPosts(false);
        }
      };

      fetchUserCount();
      fetchNewUserCount();
      fetchTotalPosts();
      fetchTotalPrice();
    }
  }, [isAdmin]);
  if (!isAdmin) {
    return <Navigate to="/dang-nhap" />;
  }

  return (
    <div className="main-panel">
      <nav className="navbar navbar-default navbar-fixed">
        <div className="container-fluid">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle"
              data-toggle="collapse"
              data-target="#navigation-example-2"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/#">
              Thống kê
            </a>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="nav navbar-nav navbar-left">
              <li>
                <a href="/#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-dashboard"></i>
                  <p className="hidden-lg hidden-md">Dashboard</p>
                </a>
              </li>
              <li className="dropdown">
                <a href="/#" className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-globe"></i>
                  <b className="caret hidden-sm hidden-xs"></b>
                  <span className="notification hidden-sm hidden-xs">0</span>
                  <p className="hidden-lg hidden-md">
                    5 Notifications
                    <b className="caret"></b>
                  </p>
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/#">Notification 1</a>
                  </li>
                  <li>
                    <a href="/#">Notification 2</a>
                  </li>
                  <li>
                    <a href="/#">Notification 3</a>
                  </li>
                  <li>
                    <a href="/#">Notification 4</a>
                  </li>
                  <li>
                    <a href="/#">Another notification</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/#">
                  <i className="fa fa-search"></i>
                  <p className="hidden-lg hidden-md">Search</p>
                </a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link>
                  <p>Chưa đăng nhập!</p>
                </Link>
              </li>
              <li className="separator hidden-lg hidden-md"></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="dashboard">
        {isLoadingUsers && (
          <div className="overlay">
            <div></div>
          </div>
        )}
        <div className="card">
          <div className="card-icon revenue">💲</div>
          <div className="card-title">Doanh thu</div>
          <div className="card-value">
            {isLoadingRevenues
              ? "Đang tải..."
              : error
              ? "Lỗi tải doanh thu"
              : formatCurrency(totalRevenue)}
          </div>
        </div>

        <div className="card">
          <div className="card-icon users">👤</div>
          <div className="card-title">Người dùng</div>
          <div className="card-value">
            {loading ? "Đang tải..." : error ? error : userCount}
          </div>
        </div>
        <div className="card">
          <div className="card-icon new-users">👥</div>
          <div className="card-title">Người dùng mới</div>
          <div className="card-value">
            {loadingNewUsers ? "Đang tải..." : newUserCount}
          </div>
        </div>
        <div className="card">
          <div className="card-icon posts">📧</div>
          <div className="card-title">Tổng bài đăng</div>
          <div className="card-value">
            {loadingPosts ? "Đang tải..." : totalPosts}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;

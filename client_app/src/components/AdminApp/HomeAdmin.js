import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../css/HomeAdmin.css";

function HomeAdmin() {
  const [userCount, setUserCount] = useState(0);
  const [newUserCount, setNewUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingNewUsers, setLoadingNewUsers] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hàm gọi API để lấy tổng số người dùng
    const fetchUserCount = async () => {
      setLoading(true);
      setIsLoadingUsers(true);
      try {
        const response = await fetch("http://localhost:8000/api/auth/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  }, []);

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

      <div class="dashboard">
        {isLoadingUsers && (
          <div className="overlay">
            <div></div>
          </div>
        )}
        <div class="card">
          <div class="card-icon revenue">💲</div>
          <div class="card-title">Doanh thu</div>
          <div class="card-value">999 VNĐ</div>
        </div>
        <div class="card">
          <div class="card-icon users">👤</div>
          <div class="card-title">Người dùng</div>
          <div className="card-value">
            {loading ? "Đang tải..." : error ? error : userCount}
          </div>
        </div>
        <div class="card">
          <div class="card-icon new-users">👥</div>
          <div class="card-title">Người dùng mới</div>
          <div className="card-value">
            {loadingNewUsers ? "Đang tải..." : newUserCount}
          </div>
        </div>
        <div class="card">
          <div class="card-icon posts">📧</div>
          <div class="card-title">Tổng bài đăng</div>
          <div class="card-value">
            {loadingPosts ? "Đang tải..." : totalPosts}
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeAdmin;

import React from "react";
import { Link } from "react-router-dom";
import '../../css/HomeAdmin.css';


function HomeAdmin(){
     


    return(
        <div className="main-panel">
            <nav className="navbar navbar-default navbar-fixed">  
            <div className="container-fluid">  
                    <div className="navbar-header">  
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">  
                            <span className="sr-only">Toggle navigation</span>  
                            <span className="icon-bar"></span>  
                            <span className="icon-bar"></span>  
                            <span className="icon-bar"></span>  
                        </button>  
                        <a className="navbar-brand" href="/#">Thống kê</a>  
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
                                    <li><a href="/#">Notification 1</a></li>  
                                    <li><a href="/#">Notification 2</a></li>  
                                    <li><a href="/#">Notification 3</a></li>  
                                    <li><a href="/#">Notification 4</a></li>  
                                    <li><a href="/#">Another notification</a></li>  
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
            <div class="card">
                <div class="card-icon revenue">💲</div>
                <div class="card-title">Doanh thu</div>
                <div class="card-value">999 VNĐ</div>
            </div>
            <div class="card">
                <div class="card-icon users">👤</div>
                <div class="card-title">Người dùng</div>
                <div class="card-value">999</div>
            </div>
            <div class="card">
                <div class="card-icon new-users">👥</div>
                <div class="card-title">Người dùng mới</div>
                <div class="card-value">999</div>
            </div>
            <div class="card">
                <div class="card-icon posts">📧</div>
                <div class="card-title">Tổng bài đăng</div>
                <div class="card-value">999</div>
            </div>
        </div> 


        </div>
    )
}
export default HomeAdmin;
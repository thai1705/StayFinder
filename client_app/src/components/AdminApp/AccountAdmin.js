import React from "react";
import { Link } from "react-router-dom";
import '../../css/AccountAdmin.css'

function AccountAdmin(){
     


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
                        <a className="navbar-brand" href="/#">Trang chủ</a>  
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
            <div class="container-tuyen">
                <div class="search-bar">
                    <input type="text" placeholder="Nhập tên người dùng cần tìm..." />
                    {/* <button><i className="fa fa-search"></i></button> */}
                </div>

                <div class="header">
                    <h1 style={{margin: '0'}}>Quản lí tài khoản</h1>
                </div>

                <table class="account-table">
                    <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Người dùng</th>
                        <th>Admin</th>
                        <th>Trạng thái</th>
                        <th>Ngày tạo</th>
                        <th>Chức năng</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><img src="avatar1.png" alt="Avatar" /></td>
                        <td>Người dùng<br /><span>tttt@gmail.com</span></td>
                        <td>Admin phụ</td>
                        <td><span class="status online">Online</span></td>
                        <td>14/09/20</td>
                        <td><button class="edit-btn">Chỉnh sửa</button></td>
                    </tr>
                    <tr>
                        <td><img src="avatar2.png" alt="Avatar" /></td>
                        <td>Người dùng<br /><span>tttt@gmail.com</span></td>
                        <td>Người dùng</td>
                        <td><span class="status online">Online</span></td>
                        <td>14/09/20</td>
                        <td><button class="edit-btn">Chỉnh sửa</button></td>
                    </tr>
                    <tr>
                        <td><img src="avatar3.png" alt="Avatar" /></td>
                        <td>Người dùng<br /><span>tttt@gmail.com</span></td>
                        <td>Người dùng</td>
                        <td><span class="status offline">Offline</span></td>
                        <td>14/09/20</td>
                        <td><button class="edit-btn">Chỉnh sửa</button></td>
                    </tr>
                    <tr>
                        <td><img src="avatar4.png" alt="Avatar" /></td>
                        <td>Người dùng<br /><span>tttt@gmail.com</span></td>
                        <td>Người dùng</td>
                        <td><span class="status locked">Lock</span></td>
                        <td>14/09/20</td>
                        <td><button class="edit-btn">Chỉnh sửa</button></td>
                    </tr>
                
                    </tbody>
                </table>

                <div class="pagination">
                    <button>&lt;</button>
                    <button class="active">1</button>
                    <button>2</button>
                    <button>3</button>
                    <button>&gt;</button>
                </div>
                </div>

            </div>
    )
}
export default AccountAdmin;
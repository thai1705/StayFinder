import React from "react";
import { Link } from "react-router-dom";
import "../../../css/ManagerPost.css";
import Menu from "./Menu";

export default function ManagerPost() {
  const data = [
    { id: 1, loaiTin: 'Thường', tieuDe: 'Cho thuê phòng trọ 436B/76 đường 3/2...', anh: 'Ảnh', ngayDang: '28/09/2024', ngayHetHan: '28/10/2024', trangThai: 'Đang hiển' },
    { id: 2, loaiTin: 'Mới', tieuDe: 'Cho thuê phòng trọ 436B/76 đường 3/2...', anh: 'Ảnh', ngayDang: '28/09/2024', ngayHetHan: '28/10/2024', trangThai: 'Đang ẩn' },
    { id: 3, loaiTin: 'Nổi bật', tieuDe: 'Cho thuê phòng trọ 436B/76 đường 3/2...', anh: 'Ảnh', ngayDang: '28/09/2024', ngayHetHan: '28/10/2024', trangThai: 'Đang hiển' },
    { id: 4, loaiTin: 'Thường', tieuDe: 'Cho thuê phòng trọ 436B/76 đường 3/2...', anh: 'Ảnh', ngayDang: '28/09/2024', ngayHetHan: '28/10/2024', trangThai: 'Đang hiển' },
  ];

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
        <span className="active-tab">Tất cả (4)</span>
        <span>Đã cho thuê (0)</span>
        <span>Đang hiển thị (4)</span>
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
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.loaiTin}</td>
                <td>{item.tieuDe}</td>
                <td>{item.anh}</td>
                <td>{item.ngayDang}</td>
                <td>{item.ngayHetHan}</td>
                <td>{item.trangThai}</td>
                <td>⋮</td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
    </div>
  );
}

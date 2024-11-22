const express = require("express");
const app = express.Router();
const Post = require("../model/post.js");
const { upload } = require("./upload"); // Sửa đổi để import upload
const rentaltype = require("../model/rentaltype.js");
const statuspost = require("../model/statuspost");
const authMiddleware = require("../middleware/auth.js");
const querystring = require("querystring");
const crypto = require("crypto");
const User = require("../model/user.js");
const Transaction = require("../model/Transaction");
const SavedPost = require("../model/savedPost.js");
const https = require("https");
const axios = require("axios");

const posttype = require("../model/posttype.js");
// Thêm ảnh
app.post(
  "/them-bai-viet-moi/upload",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "video", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const image = req.file;
      const video = req.file;
      res.status(200).send({
        message: "File uploaded successfully",
        filename: image.filename,
        filenamw: video.fieldname,
      });
    } catch (error) {
      res.status(500).send({ message: "Error uploading file", error });
    }
  }
);
app.get("/lay-tinh-co-bai-viet-nhieu-nhat", async (req, res) => {
  try {
    // Sử dụng aggregate để nhóm bài viết theo tỉnh và đếm số lượng bài viết trong mỗi tỉnh
    const topProvinces = await Post.aggregate([
      {
        $group: {
          _id: "$province", // Nhóm theo tỉnh
          postCount: { $sum: 1 }, // Đếm số bài viết trong mỗi tỉnh
        },
      },
      {
        $sort: { postCount: -1 }, // Sắp xếp theo số lượng bài viết giảm dần
      },
      {
        $limit: 5, // Lấy 5 tỉnh có nhiều bài viết nhất
      },
    ]);

    res.status(200).json(topProvinces); // Trả về kết quả
  } catch (error) {
    res.status(500).send({ message: "Error fetching top provinces", error });
  }
});

app.get("/posts-by-province", async (req, res) => {
  const { provinceName } = req.query; // Lấy tên tỉnh từ query parameter

  if (!provinceName) {
    return res.status(400).json({ message: "Tỉnh không được cung cấp" });
  }

  try {
    // Tìm bài viết theo tên tỉnh
    const posts = await Post.find({ "province.name": provinceName });

    // Kiểm tra nếu không có bài viết nào
    if (posts.length === 0) {
      return res
        .status(404)
        .json({ message: "Không có bài viết nào ở tỉnh này" });
    }

    res.status(200).json(posts); // Trả về danh sách bài viết
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server khi lấy bài viết" });
  }
});

// Lấy chi tiết bài đăng theo ID
app.get("/chi-tiet-bai-dang/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    console.log("Fetching post with ID:", postId); // Log the ID being fetched
    const post = await Post.findById(postId);
    if (!post || post.isDeleted) {
      console.log("Post not found or is deleted."); // Log if the post is not found
      return res.status(404).json({ error: "Không tìm thấy bài đăng." });
    }
    res.json(post);
  } catch (error) {
    console.error("Error fetching post details:", error); // Log any error that occurs
    res.status(500).json({ error: "Lỗi khi lấy chi tiết bài đăng." });
  }
});

app.post(
  "/them-bai-viet-moi",
  authMiddleware,
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "video", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const {
        title,
        description,
        price,
        area,
        address,
        bathroom,
        bedroom,
        attic,
        floor,
        rentaltype,
        posttype,
        statuspost,
      } = req.body;
      const userId = req.user.userId;
      const province = JSON.parse(req.body.province);
      const district = JSON.parse(req.body.district);
      const ward = JSON.parse(req.body.ward);
      if (!req.user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng!" });
      }
      const imageFiles =
        req.files && req.files["image"]
          ? req.files["image"].map((file) => file.filename)
          : [];
      const videoFiles =
        req.files && req.files["video"]
          ? req.files["video"].map((file) => file.filename)
          : [];
      let amount = 0;
      let status = "chưa thanh toán";
      let isPaid = false;
      if (posttype === "vip1") {
        amount = "15000";
      } else if (posttype === "vip2") {
        amount = "30000";
      } else {
        status = "Đã thanh toán";
        isPaid = true;
      }
      const partnerCode = "MOMO";
      const orderId = partnerCode + new Date().getTime();
      const newPost = new Post({
        title,
        description,
        price,
        area,
        province: { code: province.code, name: province.name },
        district: { code: district.code, name: district.name },
        ward: { code: ward.code, name: ward.name },
        address,
        bathroom,
        bedroom,
        attic,
        floor,
        image: imageFiles,
        video: videoFiles,
        rentaltype,
        posttype,
        userId,
        phone: req.body.phone || req.user.phone,
        username: req.user.username || req.body.username,
        statuspost: status,
        orderId,
      });
      await newPost.save();
      await User.findByIdAndUpdate(req.userId, {
        $inc: { postCount: 1 },
      });
      const orderInfo = "Thanh toán đăng bài viết";
      const newTransaction = new Transaction({
        userId,
        postId: newPost._id,
        amount,
        status: status,
        orderId,
        orderInfo,
      });

      await newTransaction.save();
      if (isPaid) {
        return res.status(200).json({ message: "Đăng tin thành công", status });
      }
      const accessKey = "F8BBA842ECF85";
      const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      const requestId = orderId;

      const redirectUrl = "http://localhost:8000/momo-ipns";
      const ipnUrl = "http://localhost:8000/momo-ipns";
      const requestType = "payWithMethod";
      const extraData = "";
      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
      const signature = crypto
        .createHmac("sha256", secretkey)
        .update(rawSignature)
        .digest("hex");
      const requestBody = JSON.stringify({
        partnerCode,
        accessKey,
        requestId,
        amount,
        orderId,
        orderInfo,
        redirectUrl,
        ipnUrl,
        extraData,
        requestType,
        signature,
        lang: "en",
      });
      const options = {
        hostname: "test-payment.momo.vn",
        port: 443,
        path: "/v2/gateway/api/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(requestBody),
        },
      };
      const reqMoMo = https.request(options, (resMoMo) => {
        resMoMo.setEncoding("utf8");
        resMoMo.on("data", (body) => {
          const paymentResponse = JSON.parse(body);
          const payUrl = paymentResponse.payUrl;
          if (payUrl) {
            console.log("payUrl:", payUrl);
            res.status(200).json({ payUrl, status: "chưa thanh toán" });
          } else {
            res.status(500).json({
              error: "Không tạo được link thanh toán",
              status: "chưa thanh toán",
            });
          }
        });
      });

      reqMoMo.on("error", (e) => {
        console.log(`Problem with request: ${e.message}`);
        res.status(500).json({
          error: "Lỗi trong yêu cầu thanh toán MoMo",
          status: "chưa thanh toán",
        });
      });

      reqMoMo.write(requestBody);
      reqMoMo.end();
    } catch (error) {
      console.error("Lỗi khi thêm bài đăng:", error);
      res
        .status(500)
        .json({ error: "Lỗi khi thêm bài đăng", status: "chưa thanh toán" });
    }
  }
);
app.all("/momo-ipns", async (req, res) => {
  try {
    console.log("IPN Request:", req.method === "POST" ? req.body : req.query);

    const { orderId, requestId, resultCode } =
      req.method === "POST" ? req.body : req.query;

    if (!orderId || !resultCode) {
      return res.status(400).send(`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f9f9f9; }
              .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
              .icon { font-size: 50px; margin-bottom: 20px; }
              .error { color: red; }
              .message { font-size: 18px; color: #333; margin-bottom: 20px; }
              button { padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; }
              button:hover { background-color: #0056b3; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon error">❌</div>
              <h2>Lỗi xử lý IPN</h2>
              <p class="message">Thiếu thông tin trong yêu cầu IPN</p>
            </div>
          </body>
        </html>
      `);
    }

    if (resultCode == "0") {
      console.log("Received OrderId:", orderId);
      const updateResult = await Post.findOneAndUpdate(
        { orderId: orderId },
        { statuspost: "Đã thanh toán" }
      );
      if (updateResult) {
        await Transaction.findOneAndUpdate(
          { orderId: orderId },
          { status: "Đã thanh toán" }
        );
        res.status(200).send(`
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f0fff0; }
                .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
                .icon { font-size: 50px; color: green; margin-bottom: 20px; }
                .message { font-size: 18px; color: #333; margin-bottom: 20px; }
                button { padding: 10px 20px; background-color: #28a745; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; }
                button:hover { background-color: #218838; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="icon">✅</div>
                <h2>Thanh toán thành công!</h2>
                <p class="message">Bài đăng của bạn đã được cập nhật và thanh toán thành công.</p>
                <button onclick="window.location.href='http://localhost:3500/dang-tin'">Trở về trang chủ</button>
              </div>
            </body>
          </html>
        `);
      } else {
        res.status(404).send(`
          <html>
            <head>
              <style>
                
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #fff3f3; }
                .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
                .icon { font-size: 50px; color: #ff6347; margin-bottom: 20px; }
                .message { font-size: 18px; color: #333; margin-bottom: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="icon">🔍</div>
                <h2>Không tìm thấy bài đăng</h2>
                <p class="message">Không tìm thấy bài đăng để cập nhật.</p>
              </div>
            </body>
          </html>
        `);
      }
    } else {
      res.status(400).send(`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #fff3e6; }
              .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
              .icon { font-size: 50px; color: orange; margin-bottom: 20px; }
              .message { font-size: 18px; color: #333; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon">⚠️</div>
              <h2>Thanh toán không thành công</h2>
              <p class="message">Vui lòng thử lại.</p>
            </div>
          </body>
        </html>
      `);
    }
  } catch (error) {
    console.error("Lỗi trong quá trình xử lý IPN:", error);
    res.status(500).send(`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f9f9f9; }
            .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
            .icon { font-size: 50px; color: red; margin-bottom: 20px; }
            .message { font-size: 18px; color: #333; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">🚫</div>
            <h2>Lỗi xử lý IPN</h2>
            <p class="message">Đã có lỗi xảy ra, vui lòng thử lại sau.</p>
          </div>
        </body>
      </html>
   `);
  }
});
app.get("/lay-tin-muon-nang-cap/:id", authMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    console.log("Lấy bài viết muốn nâng cấp:", postId);

    const post = await Post.findById(postId); // Kiểm tra nếu có bài đăng

    if (!post || post.isDeleted) {
      console.log("Bài viết hình như bị xóa rồi.");
      return res.status(404).json({ error: "Không tìm thấy bài đăng." });
    }

    if (post.posttype === "vip2") {
      console.log("Đây là gói cao cấp nhất.");
      return res.status(200).json({
        message: "Đây là gói cao cấp nhất. Không thể nâng cấp thêm.",
        post, // Vẫn trả về thông tin bài viết để frontend sử dụng
      });
    }

    // Trả về bài viết bình thường
    res.json(post);
  } catch (error) {
    console.error("Lỗi khi lấy bài viết muốn nâng cấp:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi xử lý yêu cầu." });
  }
});
const generateSignature = (params, secretKey) => {
  const rawSignature = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  console.log("Raw Signature:", rawSignature); // Debug
  return crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
};

const sendMoMoRequest = (orderId, amount, body, callback) => {
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  const req = https.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      const response = JSON.parse(data);
      callback(null, response);
    });
  });

  req.on("error", (error) => callback(error, null));
  req.write(body);
  req.end();
};

const upgradeAndPay = async (postId, posttype, userId, res) => {
  try {
    const post = await Post.findById(postId);
    console.log("Looking for post with ID:", postId);
    if (!post) {
      console.error(`Không tìm thấy bài đăng với ID: ${postId}`);
      return res.status(404).json({ message: "Bài đăng không tồn tại!" });
    }

    if (post.userId.toString() !== userId) {
      console.error(
        `User không có quyền nâng cấp bài đăng. User ID: ${userId}, Post Owner ID: ${post.userId}`
      );
      return res
        .status(403)
        .json({ message: "Bạn không có quyền nâng cấp bài đăng này!" });
    }

    let amount = 0;
    if (posttype === "vip1") {
      amount = 15000;
    } else if (posttype === "vip2") {
      amount = 30000;
    } else {
      return res.status(400).json({ message: "Loại bài đăng không hợp lệ!" });
    }
    const orderInfo = "Thanh toán nâng cấp bài viết";
    const orderId = "MOMO" + new Date().getTime();
    const transaction = new Transaction({
      userId,
      postId: post._id,
      amount,
      status: "chưa thanh toán",
      orderId,
      orderInfo,
    });
    await transaction.save();

    // Cập nhật orderId vào bài đăng
    post.orderId = orderId;
    post.posttype = posttype;
    await post.save();

    const partnerCode = "MOMO";
    const accessKey = "F8BBA842ECF85";
    const requestId = orderId;
    const secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const redirectUrl = "http://localhost:8000/momo-ipn";
    const ipnUrl = "http://localhost:8000/momo-ipn";
    const extraData = "";
    const requestType = "payWithMethod";
    const params = {
      partnerCode,
      accessKey,
      requestId,
      extraData,
      orderId,
      amount,
      requestType,
      orderInfo,
      redirectUrl,
      ipnUrl,
    };

    const signature = generateSignature(params, secretkey);
    params.signature = signature;

    const requestBody = JSON.stringify(params);

    // Gửi yêu cầu đến MoMo
    sendMoMoRequest(orderId, amount, requestBody, (err, paymentResponse) => {
      if (err || !paymentResponse?.payUrl) {
        console.error("Lỗi MoMo:", { err, paymentResponse });
        console.log("MoMo response subErrors:", paymentResponse.subErrors);

        return res
          .status(500)
          .json({ error: "Không thể tạo được link thanh toán." });
      }

      res
        .status(200)
        .json({ payUrl: paymentResponse.payUrl, status: "chưa thanh toán" });
    });
  } catch (error) {
    console.error("Lỗi khi nâng cấp bài đăng:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi nâng cấp bài đăng" });
  }
};

// Endpoint xử lý nâng cấp bài đăng
app.put("/nang-cap-bai-viet/:id", authMiddleware, async (req, res) => {
  const postId = req.params.id;
  const { posttype } = req.body;
  const userId = req.user.userId;

  await upgradeAndPay(postId, posttype, userId, res);
});

app.all("/momo-ipn", async (req, res) => {
  try {
    console.log("IPN Request:", req.method === "POST" ? req.body : req.query);

    const { orderId, resultCode } =
      req.method === "POST" ? req.body : req.query;

    if (!orderId || !resultCode) {
      return res.status(400).send(`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f9f9f9; }
              .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
              .icon { font-size: 50px; margin-bottom: 20px; }
              .error { color: red; }
              .message { font-size: 18px; color: #333; margin-bottom: 20px; }
              button { padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; }
              button:hover { background-color: #0056b3; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon error">❌</div>
              <h2>Lỗi xử lý IPN</h2>
              <p class="message">Thiếu thông tin trong yêu cầu IPN</p>
            </div>
          </body>
        </html>
      `);
    }

    if (resultCode == "0") {
      console.log("Received OrderId:", orderId);
      // Tìm bài đăng theo orderId, đảm bảo trường orderId có tồn tại
      const updateResult = await Post.findOneAndUpdate(
        { orderId: orderId }, // Tìm theo orderId
        { statuspost: "Đã thanh toán" }
      );

      if (updateResult) {
        await Transaction.findOneAndUpdate(
          { orderId: orderId },
          { status: "Đã thanh toán" }
        );
        res.status(200).send(`
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f0fff0; }
                .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
                .icon { font-size: 50px; color: green; margin-bottom: 20px; }
                .message { font-size: 18px; color: #333; margin-bottom: 20px; }
                button { padding: 10px 20px; background-color: #28a745; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; }
                button:hover { background-color: #218838; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="icon">✅</div>
                <h2>Thanh toán thành công!</h2>
                <p class="message">Bài đăng của bạn đã được cập nhật và thanh toán thành công.</p>
                <button onclick="window.location.href='http://localhost:3500/dang-tin'">Trở về trang chủ</button>
              </div>
            </body>
          </html>
        `);
      } else {
        console.error("Không tìm thấy bài đăng với orderId:", orderId);
        res.status(404).send(`
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #fff3f3; }
                .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
                .icon { font-size: 50px; color: #ff6347; margin-bottom: 20px; }
                .message { font-size: 18px; color: #333; margin-bottom: 20px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="icon">🔍</div>
                <h2>Không tìm thấy bài đăng</h2>
                <p class="message">Không tìm thấy bài đăng để cập nhật.</p>
              </div>
            </body>
          </html>
        `);
      }
    } else {
      res.status(400).send(`
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #fff3e6; }
              .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
              .icon { font-size: 50px; color: orange; margin-bottom: 20px; }
              .message { font-size: 18px; color: #333; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="icon">⚠️</div>
              <h2>Thanh toán không thành công</h2>
              <p class="message">Vui lòng thử lại.</p>
            </div>
          </body>
        </html>
      `);
    }
  } catch (error) {
    console.error("Lỗi trong quá trình xử lý IPN:", error);
    res.status(500).send(`
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f9f9f9; }
            .container { background: #fff; padding: 30px; border-radius: 10px; box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1); max-width: 400px; margin: auto; }
            .icon { font-size: 50px; color: red; margin-bottom: 20px; }
            .message { font-size: 18px; color: #333; margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="icon">🚫</div>
            <h2>Lỗi xử lý IPN</h2>
            <p class="message">Đã có lỗi xảy ra, vui lòng thử lại sau.</p>
          </div>
        </body>
      </html>
    `);
  }
});

app.put("/an-hien-bai-dang/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ error: "Không tìm thấy bài đăng." });

    if (post.expireDate && new Date() > post.expireDate) {
      return res.status(400).json({ message: "Bài đăng đã hết hạn." });
    }

    post.isVisible = !post.isVisible;
    await post.save();

    res.json({
      message: `Bài đăng đã được ${post.isVisible ? "hiện" : "ẩn"}.`,
    });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi thay đổi trạng thái bài đăng." });
  }
});

app.put("/cap-nhat-bai-dang/:id", async (req, res) => {
  try {
    // Lấy bài đăng cần cập nhật
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ error: "Không tìm thấy bài đăng." });

    // Kiểm tra nếu bài đăng là VIP và đã hết hạn
    if (
      (post.rentaltype === "vip" || post.rentaltype === "vip") &&
      post.expireDate &&
      new Date(post.expireDate) < new Date()
    ) {
      return res
        .status(400)
        .json({ error: "Bài đăng đã hết hạn và không thể cập nhật." });
    }

    // Kiểm tra trạng thái của bài đăng
    if (post.statuspost === "đã thuê") {
      return res
        .status(400)
        .json({ error: "Bài đăng đã được thuê, không thể thay đổi." });
    }

    // Cập nhật bài đăng
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPost)
      return res.status(404).json({ error: "Không tìm thấy bài đăng." });

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật bài đăng." });
  }
});

// Xóa bài đăng (Cập nhật trạng thái isDeleted)
// Backend route để xóa bài đăng
app.delete("/xoa-bai-dang/:id", async (req, res) => {
  try {
    // Thực sự xóa bài đăng khỏi cơ sở dữ liệu
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost)
      return res.status(404).json({ error: "Không tìm thấy bài đăng." });
    res.json({ message: "Bài đăng đã bị xóa." });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa bài đăng." });
  }
});

app.get("/lay-danh-sach-bai-dang", async (req, res) => {
  try {
    const province = req.query.province; // Lấy giá trị của 'province' từ query string

    // Tạo điều kiện tìm kiếm theo tỉnh, nếu có
    const query = province
      ? { "province.name": province.replace("_", " ") }
      : {};
    const currentDate = new Date();

    // Tìm bài đăng cho các loại tin khác nhau
    const posts = await Post.find({
      isDeleted: false,
      isVisible: true,
      $or: [
        {
          posttype: { $in: ["vip1", "vip2"] },
          expireDate: { $gte: currentDate },
        },
        { posttype: "thuong" },
      ],
      ...query,
    });
    res.json(posts);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài đăng:", error);
    res.status(500).json({ error: "Lỗi khi lấy danh sách bài đăng." });
  }
});
app.get("/lay-danh-sach-bai-dang-theo-userid", async (req, res) => {
  const { userId } = req.query;

  try {
    if (!userId) {
      return res.status(400).json({ message: "Thiếu userId" });
    }

    // Tìm tất cả bài đăng của userId đã đăng
    const posts = await Post.find({ userId }); // Giả sử trường userId lưu trong bài đăng có tên là `userId`

    res.json(posts);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài đăng:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
});

app.get("/filter", async (req, res) => {
  const { price, area, selectedProvince, rentalType, searchTerm } = req.query;
  const query = { statuspost: "Đã thanh toán" }; 

  try {
    // Xử lý các tiêu chí lọc
    if (price) {
      const [minPrice, maxPrice] = price.split("-").map(Number);
      if (maxPrice) {
        query.price = { $gte: minPrice, $lte: maxPrice };
      } else {
        query.price = { $gte: minPrice };
      }
    }

    if (area) {
      const [minArea, maxArea] = area.split("-").map(Number);
      if (maxArea) {
        query.area = { $gte: minArea, $lte: maxArea };
      } else {
        query.area = { $gte: minArea };
      }
    }

    if (selectedProvince) {
      query["province.code"] = selectedProvince;
    }
    if (rentalType) {
      query.rentaltype = rentalType;
    }

    if (searchTerm) {
      query.title = { $regex: searchTerm, $options: "i" }; // Tìm kiếm theo tiêu đề
    }

    console.log("MongoDB query:", query);

    // Truy vấn dữ liệu từ MongoDB
    const posts = await Post.find(query);

    // Log bài viết tìm thấy
    if (posts.length > 0) {
      console.log("Found posts:", posts);
    } else {
      console.log("No posts found matching the filter criteria.");
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching filtered posts:", error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu bài đăng" });
  }
});

app.get("/transaction-history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const transactions = await Transaction.find({ userId })
      .populate("postId", "title description price")
      .sort({ transactionDate: -1 });
    if (!transactions.length) {
      return res.status(404).json({ message: "Không có giao dịch nào" });
    }
    return res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).json({ error: "Lỗi khi lấy lịch sử giao dịch" });
  }
});
// Phương thức lấy lịch sử giao dịch dựa trên userId
app.get("/transaction-history/:userId", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params; // Lấy userId từ tham số URL
    const page = parseInt(req.query.page) || 1; // Trang mặc định là 1
    const limit = parseInt(req.query.limit) || 10; // Số lượng mỗi trang mặc định là 10
    const skip = (page - 1) * limit;

    // Tìm giao dịch dựa trên userId
    const transactions = await Transaction.find({ userId })
      .populate("postId", "title description price") // Dữ liệu bài đăng liên quan
      .sort({ transactionDate: -1 }) // Sắp xếp theo ngày giao dịch giảm dần
      .skip(skip)
      .limit(limit);

    if (!transactions.length) {
      return res.status(404).json({ message: "Không có giao dịch nào" });
    }

    return res.status(200).json({ transactions, page, limit });
  } catch (error) {
    console.error("Error fetching transaction history by userId:", error);
    res.status(500).json({ error: "Lỗi khi lấy lịch sử giao dịch" });
  }
});

app.get("/lay-tong-so-doanh-thu", authMiddleware, async (req, res) => {
  try {
    const totalRevenue = await Transaction.aggregate([
      // Lọc tất cả giao dịch có status 'chưa thanh toán' (nếu cần, có thể thay đổi)
      { $match: { status: "chưa thanh toán" } },

      // Cộng tất cả các giá trị của trường amount
      {
        $group: {
          _id: null, // Không nhóm theo bất kỳ trường nào
          totalAmount: { $sum: { $toDouble: "$amount" } }, // Cộng các giá trị amount
        },
      },
    ]);

    // Nếu có kết quả, trả về tổng doanh thu
    if (totalRevenue.length > 0) {
      return res
        .status(200)
        .json({ totalRevenue: totalRevenue[0].totalAmount });
    } else {
      return res.status(404).json({ message: "Không có giao dịch nào" });
    }
  } catch (error) {
    console.error("Error fetching total revenue:", error);
    res.status(500).json({ error: "Lỗi khi lấy tổng doanh thu" });
  }
});

app.get("/filtersort", async (req, res) => {
  const { sortOption } = req.query;
  console.log("sortOption:", sortOption); // Thêm dòng này để kiểm tra giá trị
  const sortCriteria = {};

  if (sortOption === "newest") {
    sortCriteria.createdAt = -1; // Tin mới nhất
  } else if (sortOption === "priceAsc") {
    sortCriteria.price = 1; // Giá thấp đến cao
  } else if (sortOption === "priceDesc") {
    sortCriteria.price = -1; // Giá cao đến thấp
  } else if (sortOption === "pricePerSquareMeterDesc") {
    sortCriteria["pricePerSquareMeter"] = -1; // Giá trên m² giảm dần
  } else if (sortOption === "pricePerSquareMeterAsc") {
    sortCriteria["pricePerSquareMeter"] = 1; // Giá trên m² tăng dần
  } else if (sortOption === "areaAsc") {
    sortCriteria.area = 1; // Diện tích từ nhỏ đến lớn
  } else if (sortOption === "areaDesc") {
    sortCriteria.area = -1; // Diện tích từ lớn đến nhỏ
  } else {
    return res.status(400).json({ message: "Invalid sort option" }); // Thêm xử lý nếu sortOption không hợp lệ
  }

  try {
    const posts = await Post.find({}).sort(sortCriteria);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu bài đăng:", error);
    res.status(500).json({ message: "Lỗi khi lấy dữ liệu bài đăng" });
  }
});

// Endpoint lưu bài đăng
app.post("/luu-bai-dang", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId; // Lấy userId từ token
    const { postId } = req.body; // Lấy postId từ request body

    // Kiểm tra xem bài viết đã được lưu hay chưa
    const postSaved = await SavedPost.findOne({ userId, postId });
    if (postSaved) {
      // Nếu đã lưu, tiến hành xóa lưu bài viết
      await SavedPost.deleteOne({ userId, postId });
      return res.status(200).json({ message: "Đã bỏ lưu bài viết." }); // Xóa thành công
    }

    // Tạo bản ghi mới để lưu bài viết
    const newSavedPost = new SavedPost({
      userId,
      postId,
    });

    // Lưu bản ghi
    await newSavedPost.save();
    res.status(200).json({ message: "Đã lưu bài viết thành công." }); // Thành công
  } catch (error) {
    console.error("Lỗi khi lưu bài đăng:", error);
    res.status(500).json({ message: "Lỗi khi lưu bài đăng" }); // Lỗi server
  }
});

// Lấy tổng số bài đăng
app.get("/lay-tong-so-bai-dang", async (req, res) => {
  try {
    // Đếm tổng số bài đăng chưa bị xóa
    const totalPosts = await Post.countDocuments({ isDeleted: false });
    res.json({ totalPosts });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy tổng số bài đăng." });
  }
});

app.get("/bai-dang-da-luu", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const savedPosts = await SavedPost.find({ userId }).populate("postId");
    res.status(200).json(savedPosts);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách bài đăng đã lưu:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách bài đăng đã lưu" });
  }
});
app.put("/dang-lai-bai-viet/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.userId;

    // Find the post by ID
    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: "Bài viết không tồn tại" });

    // Handle VIP posts (payment required)
    if (post.posttype === "vip1" || post.posttype === "vip2") {
      const partnerCode = "MOMO";
      const orderId = partnerCode + new Date().getTime();
      const amount = post.posttype === "vip1" ? 15000 : 30000;
      const orderInfo = "Đăng lại bài viết";

      // Create a new transaction record
      const transaction = new Transaction({
        userId,
        postId: post._id,
        amount,
        status: "chưa thanh toán",
        orderId,
        orderInfo,
      });
      await transaction.save();

      // Generate the payment URL from MoMo API
      const payUrl = await generateMoMoPaymentUrl(orderId, amount);
      
      // Cập nhật ngày hết hạn dựa trên middleware setExpireDateMiddleware
      post.createdAt = new Date(); // Cập nhật lại ngày đăng
      // Middleware sẽ tự động tính toán ngày hết hạn
      post.expireDate = new Date();  // Trường expireDate sẽ được set lại trong middleware.

      // Cập nhật trạng thái bài viết và thông tin thanh toán
      post.orderId = orderId;
      post.statuspost = "chưa thanh toán";

      await post.save();

      // Trả về đường link thanh toán
      return res.status(200).json({ payUrl });
    }

    // Handle non-VIP posts (no payment required)
    const newExpireDate = new Date();
    newExpireDate.setDate(newExpireDate.getDate() + 30); // Extend by 30 days
    post.expireDate = newExpireDate;

    await post.save();
    return res.status(200).json({ message: "Đăng lại thành công", post });
  } catch (error) {
    console.error("Lỗi khi đăng lại bài viết:", error);
    res.status(500).json({ message: "Lỗi khi đăng lại bài viết" });
  }
});

const generateMoMoPaymentUrl = async (orderId, amount) => {
  const accessKey = "F8BBA842ECF85";
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const partnerCode = "MOMO";
  const redirectUrl = "http://localhost:8000/momo-ipns";
  const ipnUrl = "http://localhost:8000/momo-ipns";
  const requestId = orderId;
  const requestType = "payWithMethod";
  const orderInfo = "Đăng lại bài viết";
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const body = {
    partnerCode,
    accessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    extraData: "",
    requestType,
    signature,
  };

  const response = await axios.post(
    "https://test-payment.momo.vn/v2/gateway/api/create",
    body
  );
  console.log("MoMo API response:", response); // Log toàn bộ phản hồi từ MoMo
  return response.data.payUrl;
};

module.exports = app;

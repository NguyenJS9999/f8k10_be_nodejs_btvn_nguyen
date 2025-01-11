export const register = async (req, res) => {
	console.log("register");
	/**
	 * Bước 1: Kiểm tra email đã đăng ký chưa
	 * Bước 2: Mã hoá mật khẩu: bcrypt, bcryptjs
	 * Bước 3: Lưu thông tin đăng ký vào database.
	 * Bước 4: Thông báo thành công
	 *
	 * Lưu ý:
	 * - Nếu đăng ký mà cho phép người dùng đăng nhập luôn thì cần tạo token và đưa vào cookie hoặc trả token cho người dùng.
	 * - Nếu muốn xác thực email, thì gửi email (nodemailer) cho người dùng để kích hoạt.
	 *
	 * 	 */
};
export const login = async (req, res) => {
	/**
	 * Bước 1: Kiểm tra email đã đăng ký chưa?
	 * Bước 2: Từ email đã find được user, compare password.
	 * Bước 3: Sign JWT (cài đặt jwt)
	 * Bước 4: Sử dụng 1 trong các phương thức được học để duy trì trạng thái đăng nhập cho người dùng.
	 * Bước 5: Thông báo.
	 */
};

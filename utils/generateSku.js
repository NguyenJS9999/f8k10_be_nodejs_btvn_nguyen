// function generateSKU(product) {
//     console.log('generateSKU product: ', product);
//
// 	const brand = product.brand
// 		? product.brand.slice(0, 3).toUpperCase()
// 		: 'GEN'; // Thương hiệu
// 	const description = product.color
// 		? product.color.slice(0, 1).toUpperCase()
// 		: 'X'; // Mô tả ngắn
// 	const date = new Date();
// 	const time = `${String(date.getMonth() + 1).padStart(2, '0')}${String(
// 		date.getFullYear()
// 	).slice(-2)}`; // Tháng + Năm
// 	const id = String(product.id).padStart(3, '0'); // ID tự động tăng (3 số)
//
// 	return `${brand}-${description}-${time}-${id}`;
// }

const generateSKU = (brand, title, description = "") => {
    const brandCode = brand ? brand.split(" ").map(word => word[0].toUpperCase()).join("") : 'GEN'; // Thương hiệu (3 chữ cái đầu)
    const titleCode = title ? title.split(" ").slice(0, 2).map(word => word.toUpperCase()).join("") : 'X'; // Mô tả ngắn (2 chữ cái đầu);
    const descriptionCode = description
        ? description.split(" ").slice(0, 3).map(word => word.toUpperCase()).join("")
        : "GEN";
    const timestamp = Date.now().toString().slice(-6);
    return `${brandCode}-${titleCode}-${descriptionCode}-${timestamp}`;
};

// Ví dụ sử dụng:
// const product = {
// 	brand: 'Samsung',
// 	color: 'Black',
// 	id: 1
// };
//
// const sku = generateSKU(product);
// console.log(sku); // Output: "SAM-B-1224-001"

export default generateSKU;

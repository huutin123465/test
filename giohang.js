function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("cart-item");

    li.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-image"/>
      <div class="cart-info">
        <p>${item.name}</p>
        <p>${item.price.toLocaleString()}₫ x ${item.quantity}</p>
      </div>
    `;
    cartList.appendChild(li);
    total += item.price * item.quantity;
  });

  totalDisplay.textContent = `Tổng: ${total.toLocaleString()}₫`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCart();

  const checkoutForm = document.getElementById("checkout-form");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const address = document.getElementById("address").value.trim();
      const payment = document.querySelector('input[name="payment"]:checked').value;

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      if (cart.length === 0) {
        alert("Giỏ hàng đang trống!");
        return;
      }

      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Hiển thị thông báo thanh toán thành công
      const checkoutSection = document.querySelector(".checkout-section");
      checkoutSection.innerHTML = `
        <h2>✅ Đã thanh toán thành công!</h2>
        <p>Khách: ${name}</p>
        <p>SĐT: ${phone}</p>
        <p>Địa chỉ: ${address}</p>
        <p>Thanh toán: ${payment}</p>
        <p>Tổng: ${total.toLocaleString()}₫</p>
        <button id="homeButton" class="buy-button">← Quay về trang chủ</button>
      `;

      document.getElementById("homeButton").addEventListener("click", () => {
        window.location.href = "index.html";
      });

      localStorage.removeItem("cart");
      updateCart();
    });
  }
});

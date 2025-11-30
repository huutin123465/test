function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toLocaleString()}₫`;
    cartList.appendChild(li);
    total += item.price;
  });

  totalDisplay.textContent = `Tổng: ${total.toLocaleString()}₫`;
}

document.addEventListener("DOMContentLoaded", () => {
  updateCart();

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.");
      contactForm.reset();
    });
  }

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

      const total = cart.reduce((sum, item) => sum + item.price, 0);

      alert(
        `✅ Đặt hàng thành công!\n\nKhách: ${name}\nSĐT: ${phone}\nĐịa chỉ: ${address}\nThanh toán: ${payment}\nTổng: ${total.toLocaleString()}₫\n\nCảm ơn bạn đã mua hàng tại Táo Vàng!`
      );

      localStorage.removeItem("cart");
      updateCart();
      checkoutForm.reset();
    });
  }
});

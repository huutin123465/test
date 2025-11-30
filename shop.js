function openLoginForm() {
  document.getElementById("loginModal").style.display = "block";
  showLoginForm();
}

function closeLoginForm() {
  document.getElementById("loginModal").style.display = "none";
}

function showLoginForm() {
  document.getElementById("modalTitle").textContent = "Đăng nhập";
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
}

function showRegisterForm() {
  document.getElementById("modalTitle").textContent = "Đăng ký";
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
}

function login() {
  const username = document.querySelector("#loginForm input[type='text']").value;
  const password = document.querySelector("#loginForm input[type='password']").value;

  if (username === "user" && password === "password") {
    alert("Đăng nhập thành công!");
    closeLoginForm();
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không đúng!");
  }
}

function register() {
  const username = document.querySelector("#registerForm input[type='text']").value;
  const password = document.querySelector("#registerForm input[type='password']").value;
  const email = document.querySelector("#registerForm input[type='email']").value;

  if (username && password && email) {
    alert("Đăng ký thành công!");
    closeLoginForm();
  } else {
    alert("Vui lòng điền đầy đủ thông tin!");
  }
}

function addToCart(button) {
  const product = button.closest('.product');
  const productName = product.querySelector('h3').textContent;
  const productPrice = product.querySelector('.price').textContent.replace(/[₫.]/g, '').trim();

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const existingProductIndex = cart.findIndex(item => item.name === productName);
  if (existingProductIndex > -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({
      name: productName,
      price: parseInt(productPrice),
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${productName} đã được thêm vào giỏ hàng!`);
}

function searchProducts() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const productName = product.getAttribute("data-name").toLowerCase();
    product.style.display = productName.includes(searchInput) ? "block" : "none";
  });
}

function showProductDetail(button) {
  const product = button.closest('.product');
  const name = product.getAttribute('data-name');
  const price = product.getAttribute('data-price');
  const imageSrc = product.querySelector('img').src;

  const screen = product.getAttribute('data-screen');
  const chip = product.getAttribute('data-chip');
  const camera = product.getAttribute('data-camera');
  const battery = product.getAttribute('data-battery');
  const frame = product.getAttribute('data-frame');

  document.getElementById('detailTitle').textContent = name;
  document.getElementById('detailImage').src = imageSrc;
  document.getElementById('detailScreen').textContent = screen;
  document.getElementById('detailChip').textContent = chip;
  document.getElementById('detailCamera').textContent = camera;
  document.getElementById('detailBattery').textContent = battery;
  document.getElementById('detailFrame').textContent = frame;

  document.getElementById('productDetailModal').style.display = 'block';
}

function closeProductDetail() {
  document.getElementById('productDetailModal').style.display = 'none';
}

const users = JSON.parse(localStorage.getItem("users")) || [];
const sectionContainer = document.querySelector(".product-container")

users.forEach(usr => {
    sectionContainer.innerHTML += `<div class="card">
        <div class="card-image">
            <img src="${usr.image}" alt="">
        </div>
        <div class="card-title">
            ${usr.fullname}
        </div>
        <div class="card-price">
            ${usr.age}
        </div>
        <div class="card-footer">
            <a href="/pages/product-detail/product-detail.html">Ver detalle</a>
        </div>
    </div>`
})
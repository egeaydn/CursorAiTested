document.addEventListener('DOMContentLoaded', () => {
    // Ürün verilerini localStorage'dan al
    const productData = JSON.parse(localStorage.getItem('selectedProduct'));
    
    if (!productData) {
        window.location.href = 'product-card.html';
        return;
    }

    // Ürün bilgilerini sayfaya yerleştir
    document.getElementById('mainImage').src = productData.image;
    document.getElementById('productName').textContent = productData.name;
    document.getElementById('productBrand').textContent = productData.brand;
    document.getElementById('productRating').innerHTML = productData.rating;
    document.getElementById('productPrice').textContent = productData.discountedPrice;
    
    if (productData.originalPrice) {
        document.getElementById('originalPrice').textContent = productData.originalPrice;
    } else {
        document.getElementById('originalPrice').style.display = 'none';
    }

    if (productData.discount) {
        document.getElementById('discountBadge').textContent = productData.discount;
    } else {
        document.getElementById('discountBadge').style.display = 'none';
    }

    // Favori butonu işlemleri
    const favoriteBtn = document.getElementById('favoriteBtn');
    const heartIcon = favoriteBtn.querySelector('i');

    // Favori durumunu kontrol et
    if (favoriteManager.isFavorite(productData.name)) {
        favoriteBtn.classList.add('active');
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
    }

    // Favori butonuna tıklama olayı
    favoriteBtn.addEventListener('click', () => {
        favoriteBtn.classList.toggle('active');
        
        if (favoriteBtn.classList.contains('active')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            favoriteManager.addFavorite(productData);
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            favoriteManager.removeFavorite(favoriteManager.favorites.findIndex(fav => fav.name === productData.name));
        }
    });

    // Küçük resimlere tıklama olayı
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            // Aktif sınıfını güncelle
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            // Ana görseli güncelle
            mainImage.src = thumb.src;
        });
    });
}); 
document.addEventListener('DOMContentLoaded', () => {
    // Favori butonunu yönetme
    const favoriteBtn = document.querySelector('.product-favorite');
    favoriteBtn.addEventListener('click', () => {
        favoriteBtn.classList.toggle('active');
        const heartIcon = favoriteBtn.querySelector('i');
        if (favoriteBtn.classList.contains('active')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
        }
    });

    // Hızlı görünüm butonunu yönetme
    const quickViewBtn = document.querySelector('.quick-view');
    quickViewBtn.addEventListener('click', () => {
        alert('Hızlı görünüm özelliği açıldı!');
        // Burada modal veya popup açılabilir
    });

    // Görsel yükleme hatası durumunda yedek görsel
    const productImage = document.querySelector('.product-image img');
    productImage.addEventListener('error', () => {
        productImage.src = 'https://via.placeholder.com/400x500?text=Ürün+Görseli';
    });
}); 
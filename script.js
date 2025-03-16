document.addEventListener('DOMContentLoaded', () => {
    // Favori butonunu yönetme
    const favoriteButtons = document.querySelectorAll('.product-favorite');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Detay sayfasına yönlendirmeyi engelle
            btn.classList.toggle('active');
            const heartIcon = btn.querySelector('i');
            if (btn.classList.contains('active')) {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
            } else {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
            }
        });
    });

    // Ürün kartlarına tıklama olayı ekleme
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        // Ürün bilgilerini alma
        const productData = {
            brand: card.querySelector('.brand').textContent,
            name: card.querySelector('.name').textContent,
            image: card.querySelector('.product-image img').src,
            rating: card.querySelector('.rating').innerHTML,
            originalPrice: card.querySelector('.original')?.textContent || '',
            discountedPrice: card.querySelector('.discounted').textContent,
            discount: card.querySelector('.discount')?.textContent || '',
            cargoFree: card.querySelector('.cargo-free') ? true : false
        };

        // Kart içindeki tüm tıklanabilir öğelere olay dinleyicisi ekleme
        const clickableElements = card.querySelectorAll('a, button, .quick-view');
        clickableElements.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                if (element.classList.contains('product-favorite')) {
                    return; // Favori butonu için işlem yapma
                }
                
                // Ürün verilerini localStorage'a kaydetme
                localStorage.setItem('selectedProduct', JSON.stringify(productData));
                
                // Detay sayfasına yönlendirme
                window.location.href = 'product-detail.html';
            });
        });

        // Kartın kendisine tıklama olayı ekleme
        card.addEventListener('click', () => {
            localStorage.setItem('selectedProduct', JSON.stringify(productData));
            window.location.href = 'product-detail.html';
        });
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
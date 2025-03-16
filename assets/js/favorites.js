class FavoriteManager {
    constructor() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.favoritesGrid = document.getElementById('favoritesGrid');
        this.emptyFavorites = document.getElementById('emptyFavorites');
        this.favoriteCount = document.getElementById('favoriteCount');
        
        this.init();
    }

    init() {
        this.updateFavoriteCount();
        this.renderFavorites();
    }

    updateFavoriteCount() {
        if (this.favoriteCount) {
            this.favoriteCount.textContent = this.favorites.length;
        }
    }

    renderFavorites() {
        if (!this.favoritesGrid || !this.emptyFavorites) return;

        if (this.favorites.length === 0) {
            this.favoritesGrid.style.display = 'none';
            this.emptyFavorites.style.display = 'block';
            return;
        }

        this.favoritesGrid.style.display = 'grid';
        this.emptyFavorites.style.display = 'none';

        this.favoritesGrid.innerHTML = this.favorites.map((product, index) => `
            <div class="favorite-card" data-index="${index}">
                <button class="remove-favorite" onclick="favoriteManager.removeFavorite(${index})">
                    <i class="fas fa-times"></i>
                </button>
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <div class="brand">${product.brand}</div>
                    <div class="name">${product.name}</div>
                    <div class="rating">${product.rating}</div>
                    <div class="price">
                        ${product.originalPrice ? `<span class="original">${product.originalPrice}</span>` : ''}
                        <span class="discounted">${product.discountedPrice}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    addFavorite(product) {
        if (!this.isFavorite(product.name)) {
            this.favorites.push(product);
            this.saveFavorites();
            this.updateFavoriteCount();
            this.showNotification('Ürün favorilere eklendi');
        }
    }

    removeFavorite(index) {
        if (index > -1) {
            this.favorites.splice(index, 1);
            this.saveFavorites();
            this.updateFavoriteCount();
            this.showNotification('Ürün favorilerden çıkarıldı');
            this.renderFavorites();
        }
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    isFavorite(productName) {
        return this.favorites.some(fav => fav.name === productName);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global favorite manager instance
const favoriteManager = new FavoriteManager(); 
    const products = [
        { id: 1, name: 'Makanan Anjing', emoji: '🍖', price: 'Rp 55.000' },
        { id: 2, name: 'Makanan Kucing', emoji: '🐟', price: 'Rp 48.000' },
        { id: 3, name: 'Sangkar Burung', emoji: '🐦', price: 'Rp 135.000' },
        { id: 4, name: 'Akuarium Ikan', emoji: '🐠', price: 'Rp 275.000' },
        { id: 5, name: 'Tali Anjing', emoji: '🦮', price: 'Rp 38.000' },
        { id: 6, name: 'Mainan Kucing', emoji: '🧶', price: 'Rp 22.000' },
        { id: 7, name: 'Vitamin Hewan', emoji: '💊', price: 'Rp 65.000' },
        { id: 8, name: 'Sisir Bulu', emoji: '🪮', price: 'Rp 30.000' }
    ];

    let cartItems = [];        // menyimpan objek produk yang dibeli
    let cartCount = 0;

    // DOM Elements
    const grid = document.getElementById('productGrid');
    const cartCountEl = document.getElementById('cartCount');
    const toastEl = document.getElementById('toast');
    const cartBtn = document.getElementById('cartBtn');
    
    function renderProducts() {
        grid.innerHTML = ''; // kosongkan dulu

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            card.innerHTML = `
                <div class="product-emoji">${product.emoji}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-price">${product.price}</div>
                <button class="btn-beli" data-id="${product.id}">🛒 Beli</button>
            `;

            grid.appendChild(card);
        });

        document.querySelectorAll('.btn-beli').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.dataset.id);
                const product = products.find(p => p.id === id);
                if (product) {
                    tambahKeKeranjang(product);
                }
            });
        });
    }

    function tambahKeKeranjang(product) {
        // Tambah ke array (simulasi)
        cartItems.push(product);
        cartCount++;
        cartCountEl.textContent = cartCount;

        // Tampilkan toast dengan nama produk
        showToast(`✅ ${product.name} ditambahkan! (${product.price})`);
    }

    let toastTimer = null;

    function showToast(message) {
        toastEl.textContent = message;
        toastEl.classList.add('show');

        // Hapus notifikasi otomatis setelah 2 detik
        if (toastTimer) clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 2000);
    }

    cartBtn.addEventListener('click', function() {
        if (cartItems.length === 0) {
            showToast('🛒 Keranjang masih kosong!');
            return;
        }

        // Buat daftar isi keranjang (alert atau console, biar simpel)
        const names = cartItems.map(item => `- ${item.emoji} ${item.name} (${item.price})`).join('\n');
        alert(`🛒 Isi Keranjang (${cartItems.length} item):\n\n${names}\n\nTotal: ${cartItems.length} produk`);
    });

    renderProducts();
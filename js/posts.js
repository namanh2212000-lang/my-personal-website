// Posts management functions

// Get posts from localStorage
function getPosts() {
    const posts = localStorage.getItem('website_posts');
    return posts ? JSON.parse(posts) : [];
}

// Save posts to localStorage
function savePosts(posts) {
    localStorage.setItem('website_posts', JSON.stringify(posts));
}

// Add new post
function addPost(post) {
    const posts = getPosts();
    posts.unshift(post); // Add to beginning
    savePosts(posts);
}

// Delete post
function deletePost(postId) {
    const posts = getPosts();
    const updatedPosts = posts.filter(post => post.id !== postId);
    savePosts(updatedPosts);
}

// Get posts by category
function getPostsByCategory(category) {
    const posts = getPosts();
    return posts.filter(post => post.category === category);
}

// Load posts for a specific category page
function loadPosts(category) {
    const posts = getPostsByCategory(category);
    const container = document.getElementById('posts-container');
    
    if (posts.length === 0) {
        container.innerHTML = `
            <div class="post-item">
                <h3>Chưa có bài viết</h3>
                <p>Hiện tại chưa có bài viết nào trong danh mục này.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = posts.map(post => `
        <div class="post-item">
            <h3>${post.title}</h3>
            <div class="post-meta">
                Đăng ngày: ${new Date(post.date).toLocaleDateString('vi-VN')} | Tác giả: ${post.author}
            </div>
            <div class="post-content">
                ${post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}
            </div>
        </div>
    `).join('');
}

// Load all posts for admin dashboard
function loadAllPosts() {
    const posts = getPosts();
    const tbody = document.getElementById('posts-tbody');
    
    if (!tbody) return;
    
    if (posts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4">Chưa có bài viết nào</td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = posts.map(post => `
        <tr>
            <td>${post.title}</td>
            <td>${getCategoryName(post.category)}</td>
            <td>${new Date(post.date).toLocaleDateString('vi-VN')}</td>
            <td>
                <button onclick="deletePostById('${post.id}')" class="btn-danger">Xóa</button>
            </td>
        </tr>
    `).join('');
}

// Delete post by ID
function deletePostById(postId) {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
        deletePost(postId);
        loadAllPosts();
    }
}

// Get category display name
function getCategoryName(category) {
    const categories = {
        'google-one': 'Google One',
        'nigeria': 'Nigeria',
        'edu': 'EDU',
        'the-ao': 'Thẻ ảo',
        'vpn-proxy': 'VPN Proxy'
    };
    return categories[category] || category;
}

// Initialize with sample data if empty
function initializeSampleData() {
    const posts = getPosts();
    if (posts.length === 0) {
        const samplePosts = [
            {
                id: '1',
                title: 'Cách tạo tài khoản Google One miễn phí',
                category: 'google-one',
                content: 'Hướng dẫn chi tiết cách tạo tài khoản Google One miễn phí và nhận 15GB dung lượng lưu trữ. Bước 1: Truy cập google.com/drive...',
                date: new Date().toISOString(),
                author: 'Admin'
            },
            {
                id: '2',
                title: 'Thủ thuật tạo tài khoản Nigeria trên Netflix',
                category: 'nigeria',
                content: 'Cách tạo tài khoản Netflix Nigeria để có giá rẻ hơn. Sử dụng VPN Nigeria và thẻ ảo để thanh toán...',
                date: new Date().toISOString(),
                author: 'Admin'
            }
        ];
        savePosts(samplePosts);
    }
}

// Initialize sample data when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSampleData();
});

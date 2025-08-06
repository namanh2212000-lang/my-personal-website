// Enhanced Admin Panel Functions
let dataManager;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize data manager
    dataManager = new DataManager();
    
    // Load initial data
    refreshStats();
    loadAllPostsEnhanced();
});

// Refresh statistics
async function refreshStats() {
    try {
        const allPosts = await dataManager.getAllPosts();
        const localPosts = dataManager.loadFromLocalStorage();
        
        const stats = {
            serverPosts: allPosts.length,
            localPosts: localPosts.length,
            categories: {}
        };
        
        // Count by category
        allPosts.forEach(post => {
            const cat = post.category || 'uncategorized';
            stats.categories[cat] = (stats.categories[cat] || 0) + 1;
        });
        
        displayStats(stats);
    } catch (error) {
        console.error('Error refreshing stats:', error);
    }
}

// Display statistics
function displayStats(stats) {
    const statsContainer = document.getElementById('stats-info');
    
    const categoryStats = Object.entries(stats.categories)
        .map(([cat, count]) => `
            <div class="stat-item">
                <span>${getCategoryName(cat)}:</span>
                <strong>${count} bài</strong>
            </div>
        `).join('');
    
    statsContainer.innerHTML = `
        <div class="stat-item">
            <span>📊 Tổng bài viết (Server):</span>
            <strong>${stats.serverPosts} bài</strong>
        </div>
        <div class="stat-item">
            <span>💾 Bài viết local (chưa đồng bộ):</span>
            <strong>${stats.localPosts} bài</strong>
        </div>
        <hr style="margin: 10px 0;">
        <div style="font-weight: bold; margin-bottom: 5px;">📈 Theo danh mục:</div>
        ${categoryStats}
        <div style="margin-top: 10px; font-size: 12px; color: #666;">
            Cập nhật: ${new Date().toLocaleString('vi-VN')}
        </div>
    `;
}

// Export data for server
async function exportServerData() {
    try {
        const exportData = await dataManager.exportForServer();
        
        // Create and download file
        const blob = new Blob([JSON.stringify(exportData, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `posts-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('✅ Đã tải xuống file posts.json!\nUpload file này vào thư mục /var/www/website/data/ trên VPS.');
        
    } catch (error) {
        alert('❌ Lỗi khi export dữ liệu: ' + error.message);
    }
}

// Preview data
async function previewData() {
    try {
        const exportData = await dataManager.exportForServer();
        document.getElementById('exportPreview').value = JSON.stringify(exportData, null, 2);
    } catch (error) {
        alert('❌ Lỗi khi preview dữ liệu: ' + error.message);
    }
}

// Enhanced load posts for admin
async function loadAllPostsEnhanced() {
    try {
        const allPosts = await dataManager.getAllPosts();
        const tbody = document.getElementById('posts-tbody');
        
        if (!tbody) return;
        
        if (allPosts.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align: center; padding: 20px;">
                        <strong>Chưa có bài viết nào</strong><br>
                        <em>Thêm bài viết đầu tiên ở form bên trên</em>
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = allPosts.map(post => `
            <tr>
                <td>${post.title}</td>
                <td>${getCategoryName(post.category)}</td>
                <td>${new Date(post.date).toLocaleDateString('vi-VN')}</td>
                <td>
                    <button onclick="deletePostEnhanced('${post.id}')" class="btn-danger">🗑️ Xóa</button>
                </td>
            </tr>
        `).join('');
        
    } catch (error) {
        console.error('Error loading posts:', error);
    }
}

// Enhanced delete post
function deletePostEnhanced(postId) {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này?\n\n⚠️ Lưu ý: Thao tác này chỉ xóa trong localStorage. Để xóa vĩnh viễn khỏi server, bạn cần export và cập nhật file JSON.')) {
        dataManager.deletePost(postId);
        loadAllPostsEnhanced();
        refreshStats();
    }
}

// Enhanced form submission
document.getElementById('addPostForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const postData = {
        title: formData.get('title'),
        category: formData.get('category'), 
        content: formData.get('content')
    };
    
    try {
        dataManager.addPost(postData);
        this.reset();
        
        // Show success message
        const successMsg = document.getElementById('success-message');
        if (successMsg) {
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        }
        
        // Refresh displays
        loadAllPostsEnhanced();
        refreshStats();
        
    } catch (error) {
        alert('❌ Lỗi khi thêm bài viết: ' + error.message);
    }
});

// Helper function
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

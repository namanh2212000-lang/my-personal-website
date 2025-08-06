// Data Manager - Quản lý dữ liệu tập trung
class DataManager {
    constructor() {
        this.serverDataUrl = './data/posts.json';
        this.localStorageKey = 'website_posts';
        this.cache = null;
        this.cacheExpiry = 5 * 60 * 1000; // 5 minutes cache
    }

    // Load dữ liệu từ server với fallback localStorage
    async loadPosts() {
        try {
            console.log('🔄 Loading posts from server...');
            const response = await fetch(this.serverDataUrl + '?t=' + Date.now());
            
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('✅ Server data loaded:', data.posts.length, 'posts');
            
            // Cache dữ liệu server
            this.cache = {
                data: data.posts,
                timestamp: Date.now()
            };
            
            return data.posts;
            
        } catch (error) {
            console.warn('⚠️ Cannot load from server:', error.message);
            return this.loadFromLocalStorage();
        }
    }

    // Fallback: Load từ localStorage
    loadFromLocalStorage() {
        console.log('🔄 Loading from localStorage...');
        const localData = localStorage.getItem(this.localStorageKey);
        const posts = localData ? JSON.parse(localData) : [];
        console.log('📱 LocalStorage data:', posts.length, 'posts');
        return posts;
    }

    // Lưu vào localStorage (cho admin)
    saveToLocalStorage(posts) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
        console.log('💾 Saved to localStorage:', posts.length, 'posts');
    }

    // Lấy posts theo category
    async getPostsByCategory(category) {
        const posts = await this.loadPosts();
        return posts.filter(post => post.category === category && post.status !== 'deleted');
    }

    // Lấy tất cả posts
    async getAllPosts() {
        return await this.loadPosts();
    }

    // Thêm post mới (localStorage)
    addPost(postData) {
        const posts = this.loadFromLocalStorage();
        const newPost = {
            id: Date.now().toString(),
            title: postData.title,
            category: postData.category,
            content: postData.content,
            date: new Date().toISOString(),
            author: 'Admin',
            status: 'published'
        };
        
        posts.unshift(newPost);
        this.saveToLocalStorage(posts);
        console.log('➕ Added new post:', newPost.title);
        return newPost;
    }

    // Xóa post (localStorage)
    deletePost(postId) {
        const posts = this.loadFromLocalStorage();
        const filteredPosts = posts.filter(post => post.id !== postId);
        this.saveToLocalStorage(filteredPosts);
        console.log('🗑️ Deleted post:', postId);
    }

    // Export để cập nhật server
    async exportForServer() {
        const localPosts = this.loadFromLocalStorage();
        const serverPosts = await this.loadPosts();
        
        // Merge: Server posts + Local posts (chưa có trên server)
        const mergedPosts = [...serverPosts];
        
        localPosts.forEach(localPost => {
            const existsOnServer = serverPosts.find(p => p.id === localPost.id);
            if (!existsOnServer) {
                mergedPosts.unshift(localPost);
            }
        });

        const exportData = {
            posts: mergedPosts,
            metadata: {
                lastUpdated: new Date().toISOString(),
                totalPosts: mergedPosts.length,
                version: "1.0",
                exportedBy: "Admin Panel"
            }
        };

        return exportData;
    }
}

// Global instance
const dataManager = new DataManager();

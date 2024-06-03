new Vue({
    el: '#app',
    data: {
        users: []
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get('http://localhost:3000/api/users'); // Ganti dengan endpoint API Anda
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async deleteUser(id) {
            try {
                await axios.delete(`http://localhost:3000/api/users/${id}`); // Ganti dengan endpoint API Anda
                this.fetchUsers(); // Refresh user list
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
        editUser(id) {
            // Implement edit user functionality
            console.log(`Edit user with ID: ${id}`);
        }
    },
    mounted() {
        this.fetchUsers(); // Fetch users when component is mounted
    }
});

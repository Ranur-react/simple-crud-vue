const app = Vue.createApp({
    data:()=>{
        return{
            input: {
                email: 'email',
                username: 'username',
                password: 'p',
                noWa: '00',
                roleId: 3
            },
            users:[],
            modalCreate:false
        }
    },
    methods:{
        async createUser(){
            try {
                // const respong
                const response = await axios.post('https://absekol-api.numpang.my.id/api/users',this.input); // Ganti dengan endpoint API Anda
                this.fetchUsers();
                this.closeModal();
            } catch (error) {
                console.error('Error create user:', error);
            }
        }
        ,
        async fetchUsers() {
            try {
                const response = await axios.get('https://absekol-api.numpang.my.id/api/users'); // Ganti dengan endpoint API Anda
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        async deleteUser(uid) {
            try {
                await axios.delete(`https://absekol-api.numpang.my.id/api/users/${uid}`); // Ganti dengan endpoint API Anda
                this.fetchUsers(); // Refresh user list
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
        closeModal() {
            document.getElementById('closeModalCreat').click();
        }
    },
    mounted() {
        this.fetchUsers(); // Fetch users when component is mounted
    }        
})

const mountedApp = app.mount('#app')
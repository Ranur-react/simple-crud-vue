const app = Vue.createApp({
    data:()=>{
        return{
            users:[]
        }
    },
    methods:{
        async fetchUsers() {
            try {
                const response = await axios.get('https://absekol-api.numpang.my.id/api/users'); // Ganti dengan endpoint API Anda
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
    },
    mounted() {
        this.fetchUsers(); // Fetch users when component is mounted
    }        
})

const mountedApp = app.mount('#app')
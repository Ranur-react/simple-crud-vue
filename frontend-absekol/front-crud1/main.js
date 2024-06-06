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
            modalCreate:false,
            formValidations:{
                email: {
                    errorMessage: null,
                    validMessage: "Looks good!",
                    isValid:true,
                    isInvalid:null

                },
                username: {
                    errorMessage: null,
                    validMessage: "Looks good!",
                    isValid: true,
                    isInvalid: null

                },
                password: {
                    errorMessage: null,
                    validMessage: "Looks good!",
                    isValid: null,
                    isInvalid: null

                },
                noWa: {
                    errorMessage: null,
                    validMessage: "Looks good!",
                    isValid: null,
                    isInvalid: null

                },
                httpRespondCode: null,

            }
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
                if (error.response){
                    const result = error.response;
                    if(result.status==500){
                        this.formValidations.httpRespondCode=result.status;
                        if (result.data.errorDetails){
                            if (result.data.errorDetails.errors.length>0){
                                result.data.errorDetails.errors.map((items,key)=>{
                                    console.log("----------Value----------------")
                                    console.log(items)
                                    console.log("-----------Key---------------")
                                    console.log(key)
                                    if(items.path=="email"){
                                        this.formValidations.email.errorMessage = items.message;
                                        this.formValidations.email.isInvalid = true;
                                        this.formValidations.username.isInvalid = false;

                                    } else if (items.path == "username") {
                                        this.formValidations.username.errorMessage = items.message;
                                        this.formValidations.username.isInvalid = true;
                                        this.formValidations.email.isInvalid = false;

                                    } else if (items.path == "noWa") {
                                        this.formValidations.noWa.errorMessage = items.message;
                                        this.formValidations.noWa.isInvalid = true;
                                        this.formValidations.username.isInvalid = false;
                                        this.formValidations.email.isInvalid = false;

                                    } else if (items.path == "password") {
                                        this.formValidations.password.errorMessage = items.message;
                                        this.formValidations.password.isInvalid = true;
                                        this.formValidations.noWa.isInvalid = false;
                                        this.formValidations.username.isInvalid = false;
                                        this.formValidations.email.isInvalid = false;

                                    }


                                })
                            }
                        }
                    }
                }
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
        editUser(data){
            alert(`Kamu belum bisa hapus user ${data.username}, saya belum sempat bkinnya hehe :D`)
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
const app = Vue.createApp({
    data:()=>{
        return{
            message:"wew",
            srcimg:"loading.gif",
            daibaledButton:false,
            buttonTitle:"upload Button"
        }
    }
})
const mountdApp=app.mount('#app')
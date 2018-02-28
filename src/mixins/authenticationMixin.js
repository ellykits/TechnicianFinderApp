export default{
    methods:{
        checkLogin(){
            if(!this.getCookie('session')){       
                this.$router.push('/login');
            }else{
                this.$router.push('/user_info');
            }
        }
    }
}
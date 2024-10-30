<template>
  <div class="nav">
    <div style="display: flex; height: 100vh; overflow: hidden;">
      <div class="imageArea">
        <img style="height: 100%; background-color: white;" src="../../assets/images/login.png"/>
      </div>
      <div class="loginFormArea">
        <div class="loginForm">
          <form @submit.prevent="login()" class="loginBox">
            <div class="loginTextBox">Log in</div>
            <div class="loginInputName">Email</div>
            <div class="loginInput" style="margin-bottom: 20px;">
              <va-input v-model.trim="id" id="id" required/>
            </div>
            <div class="loginInputName">Password</div>
            <div class="loginInput">
              <va-input v-model.trim="password" id="password" class="mb-6" :type="isPasswordVisible ? 'text' : 'password'" required>
                <template #appendInner>
                  <va-icon :name="isPasswordVisible ? 'visibility_off' : 'visibility'" size="small" color="--va-primary" @click="isPasswordVisible = !isPasswordVisible"/>
                </template>
              </va-input>
            </div>
            <div class="auth-layout__options d-flex align-center justify-space-between" style="margin: 15px 10px 50px 10px;">
              <va-checkbox v-model="checkBox" class="mb-0" label="Remember Me" />
              <div style="color:blue; cursor:pointer;">Forgot Password?</div>
            </div>
            <va-button class="loginBtn" type="submit" style="margin-bottom:50px;" color="#677798">Log in</va-button>
            <div>
              <span>Not registered yet?</span> &nbsp; <span style="color:blue; cursor:pointer;">Create an Account</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Types',
  data () {
    return {
      isPasswordVisible: false,
      id: '',
      password:'',
      checkBox:true,
    }
  },
  mounted(){
  },
  methods: {
    login(){
      var id = document.getElementById("id");
      var password = document.getElementById("password");
      if (id.value == "admin@xcure.co.kr" && password.value == "qwer1234!"){
            this.$router.push('/mydashboard')
      }
      else {
        if (id.value == 'admin@xcure.co.kr'){
          this.$swal({
            title : 'Incorrect password.',
            text : 'Try again or click Forgot Password to reset it.'
          })
          this.id = id.value
        }
        else {
          this.$swal('ID does not exist.')
          this.id = ''
        }
        this.password = ''
        this.$router.push('/')
      }
    },
}

}
</script>

<style scoped>
 @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

/* parent box div */
 .nav {
  width: 100%;
  height: 100vh;
  text-align: center;
  align-items: center;
 }

 .imageArea {
  flex-basis: 50%;
  background-color: white;
  
 }

 .loginFormArea {
  flex-grow: 1;
  background-color: white;
  display: flex;
 }

 /* login form div */
 .loginForm{
  width: 70%;
  height: 60%;
  background : white;
  margin:auto;
 }

 /* login box */
 .loginBox{
  width: 60%;
  margin: auto;
  padding-top: 10px;
 }

 /* login span text div */
 .loginTextBox{
  font-size: xx-large;
  margin: 40px 0px 60px 0px;
  padding-bottom: 14px;
  font-weight: bold;
 }

 /* login button css */
 .loginBtn{
  width: 100%;
  height: 45px;
 }

 .loginInputName {
  text-align: left;
  font-size:larger;
  padding-bottom: 10px;
 }

 .loginInput {
  display : flex;
  justify-content : center;
  align-items : center;
  height : 45px;
 }

/* --------------- Custom alert ---------------- */
.slit-in-vertical {
	-webkit-animation: slit-in-vertical 0.45s ease-out both;
	        animation: slit-in-vertical 0.45s ease-out both;
}

@-webkit-keyframes slit-in-vertical {
  0% {
    -webkit-transform: translateZ(-800px) rotateY(90deg);
            transform: translateZ(-800px) rotateY(90deg);
    opacity: 0;
  }
  54% {
    -webkit-transform: translateZ(-160px) rotateY(87deg);
            transform: translateZ(-160px) rotateY(87deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(0) rotateY(0);
            transform: translateZ(0) rotateY(0);
  }
}
@keyframes slit-in-vertical {
  0% {
    -webkit-transform: translateZ(-800px) rotateY(90deg);
            transform: translateZ(-800px) rotateY(90deg);
    opacity: 0;
  }
  54% {
    -webkit-transform: translateZ(-160px) rotateY(87deg);
            transform: translateZ(-160px) rotateY(87deg);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateZ(0) rotateY(0);
            transform: translateZ(0) rotateY(0);
  }
}

#dialogoverlay{
  display: none;
  opacity: .8;
  position: fixed;
  top: 0px;
  left: 0px;
  background: #707070;
  width: 100%;
  z-index: 10;
}

#dialogbox{
  display: none;
  position: absolute;
  background: rgb(0, 47, 43);
  border-radius:7px; 
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.575);
  transition: 0.3s;
  width: 40%;
  z-index: 10;
  top:0;
  left: 0;
  right: 0;
  margin: auto;
}

#dialogbox:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.911);
}

.container {
  padding: 2px 16px;
}

.pure-material-button-contained {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  min-width: 64px;
  height: 36px;
  vertical-align: middle;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: uppercase;
  color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
  background-color: rgb(var(--pure-material-primary-rgb, 0, 77, 70));
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  font-family: var(--pure-material-font, "Roboto", "Segoe UI", BlinkMacSystemFont, system-ui, -apple-system);
  font-size: 14px;
  font-weight: 500;
  line-height: 36px;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition: box-shadow 0.2s;
}

.pure-material-button-contained::-moz-focus-inner {
  border: none;
}

.pure-material-button-contained::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
  opacity: 0;
  transition: opacity 0.2s;
}

.pure-material-button-contained::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  padding: 50%;
  width: 32px; /* Safari */
  height: 32px; /* Safari */
  background-color: rgb(var(--pure-material-onprimary-rgb, 255, 255, 255));
  opacity: 0;
  transform: translate(-50%, -50%) scale(1);
  transition: opacity 1s, transform 0.5s;
}

.pure-material-button-contained:hover,
.pure-material-button-contained:focus {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
}

.pure-material-button-contained:hover::before {
  opacity: 0.08;
}

.pure-material-button-contained:focus::before {
  opacity: 0.24;
}

.pure-material-button-contained:hover:focus::before {
  opacity: 0.3;
}

.pure-material-button-contained:active {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}

.pure-material-button-contained:active::after {
  opacity: 0.32;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0s;
}

.pure-material-button-contained:disabled {
  color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.38);
  background-color: rgba(var(--pure-material-onsurface-rgb, 0, 0, 0), 0.12);
  box-shadow: none;
  cursor: initial;
}

.pure-material-button-contained:disabled::before {
  opacity: 0;
}

.pure-material-button-contained:disabled::after {
  opacity: 0;
}

#dialogbox > div{ 
  background:#FFF; 
  margin:8px; 
}

#dialogbox > div > #dialogboxhead{ 
  background: rgb(0, 77, 70); 
  font-size:19px; 
  padding:10px; 
  color:rgb(255, 255, 255); 
  font-family: Verdana, Geneva, Tahoma, sans-serif ;
}

#dialogbox > div > #dialogboxbody{ 
  background:rgb(0, 47, 43); 
  padding:20px; 
  color:#FFF; 
  font-family: Verdana, Geneva, Tahoma, sans-serif ;
}

#dialogbox > div > #dialogboxfoot{ 
  background: rgb(0, 47, 43); 
  padding:10px; 
  text-align:right; 
}

/* --------------- Custom alert ---------------- */
</style>
<template>
    <div>
        <a id="custom-login-btn" @click="kakaoLogin()">
            <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
            width="222"/>
        </a>
        <button type="button" @click="kakaoLogout()">카카오 로그아웃</button> <!-- ()괄호치는게 맞는지 확인할것 -->
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            code: "",
        };
    },
    mounted() {
    },
    methods: {
        kakaoLogin() {
            window.Kakao.Auth.login({
                scope: "profile_nickname, profile_image, account_email",
                success: this.getKakaoAccount() //()괄호치는게 맞는지 확인할것
            })
        },
        getKakaoAccount() {
            window.Kakao.API.request({
                url: "/v2/user/me",
                success: (res) => {
                    //TODO response 값들의 이름이 맞는지 확인할것
                    const kakao_account = res.kakao_account;
                    const nickname = kakao_account.profile.nickname;
                    const image = kakao_account.profile.profile_image_url;
                    const email = kakao_account.email;

                    console.log("nickname", nickname);
                    console.log("image", image);
                    console.log("email", email);

                    console.log(kakao_account);
                    this.$store.commit("user", kakao_account);

                    alert("login success!");
                },
                fail: (error) => {
                    console.log(error);
                }
            });
        },
        kakaoLogout() {
            if(!window.Kakao.Auth.getAccessToken()) {
                console.log("Not logged in..");
                return;
            }
            window.Kakao.Auth.logout((response) => {
                //logout  
                console.log("access  token: ", window.Kakao.Auth.getAccessToken());
                console.log("log out : ", response);
            });
        }
    },
}
</script>
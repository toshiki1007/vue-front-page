<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      </v-flex>
      <v-flex v-if="signupForm" xs4 text-xs-left>
        <h3>SignUp</h3>
        <v-form>
          <v-text-field v-model="userId" label="User Id"></v-text-field>
        </v-form>
        <v-form>
          <v-text-field v-model="email" label="Email Address"></v-text-field>
        </v-form>
        <v-form>
          <v-text-field v-model="password" label="Password"></v-text-field>
        </v-form>
        <br>
        <v-btn round color="primary" @click="signUp()">signUp</v-btn>
      </v-flex>
      <v-flex v-else xs4 text-xs-left>
        <h3>SignUp</h3>
        <v-form>
          <v-text-field v-model="verifyCode" label="Verify Code"></v-text-field>
        </v-form>
        <br>
        <v-btn round color="primary" @click="userVerify()">verify</v-btn>
      </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import { Auth } from "aws-amplify";
	import router from "@/router";
	import graphQL from '../services/graphQL.js'

	export default {
		name: 'SignUp',
		data() {
			return {
				email: '',
				password: '',
				signupForm: true,
				userId: '',
				verifyCode: '',
			}
		},
		methods: {
			async signUp() {
				Auth.signUp(this.userId, this.password, this.email)
					.then(user => {
						this.signupForm = false;
					}).catch(err => {
						console.error(err);
					})
			},
			async createUser() {
				console.log("create")
				await graphQL.createUser(this.userId, this.email)
				await graphQL.createWallet(this.userId)
			},
			async signIn() {
				console.log("signin")
				await Auth.signIn(this.userId, this.password)
			},
			async toTopPage() {
				console.log("to top page")
				return router.push("/")
			},
			async userVerify() {
				console.log("verify!");
				await Auth.confirmSignUp(this.userId, this.verifyCode)
					.then(data => {
						console.log(data);
						alert("登録完了しました");
					})
					.catch(err => {
						console.error(err);
						alert("登録エラー");
					});
				await this.signIn()
				await this.createUser()
				await this.toTopPage()
			},
		},
		async mounted() {}
	}
</script>

<style>
	.signup-form {
		margin: 40px auto 0;
		width: 40vw;
	}

	.input-area {
		line-height: 60px;
		margin: 10px 0;
	}

	.auth-button {
		font-weight: bold;
		margin-top: 20px;
		width: 40%;
	}
</style>

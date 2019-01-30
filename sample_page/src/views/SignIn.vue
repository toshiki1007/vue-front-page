<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      </v-flex>
      <v-flex xs4 text-xs-left>
        <h3>SignIn</h3>
        <v-form>
          <v-text-field v-model="userId" label="User Id"></v-text-field>
        </v-form>
        <v-form>
          <v-text-field v-model="password" label="Password"></v-text-field>
        </v-form>
        <br>
        <v-btn round color="primary" @click="signIn()">signIn</v-btn>
        <br>
        <v-btn round color="primary" @click="linkSignUp()">to SignUp Page</v-btn>
      </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
	import { Component, Prop, Vue } from "vue-property-decorator";
	import { Auth } from "aws-amplify";
	import router from "@/router";

	export default {
		name: 'SignUp',
		data() {
			return {
				password: '',
				userId: '',
			}
		},
		methods: {
			async signIn() {
				Auth.signIn(this.userId, this.password)
					.then(user => {
						return router.push("/");
					}).catch(err => {
						console.error(err);
					})
			},
			async linkSignUp() {
				return router.push("/signUp");
			},
		},
		async mounted() {}
	}
</script>

<style>
	.signin-form {
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

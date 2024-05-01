<template>
  <div class="center">
    <div class="col-lg-5 mt-3 d-flex justify-content-center align-items-center">
      <card style="width: 20rem">
        <h4 class="card-title">Login</h4>
        <base-input
          label="Email address"
          type="email"
          placeholder="Enter email"
          v-model="userLogin.email"
        >
        </base-input>
        <base-input
          label="Password"
          type="password"
          placeholder="Password"
          v-model="userLogin.password"
        >
        </base-input>
        <base-button type="secondary btn-sm" @click="login()"
          >Login</base-button
        >
      </card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "LoginPage",
  data() {
    return {
      userLogin: {
        email: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          this.$baseURL + '/users/login',
          this.userLogin
        );
        if (response.status === 200) {
          const token = response.data.data.token;
          localStorage.setItem("authToken", token);
          const intendedPath = localStorage.getItem("intendedPath");
          localStorage.removeItem("intendedPath");
          this.$router.push(intendedPath || "/dashboard");
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 400) {
          const errorMessages = error.response.data.meta.message;
          this.error = errorMessages
            .map((msg) => `<p style="color: black;">${msg}</p>`)
            .join("");
          Swal.fire({
            icon: "warning",
            title: "Failed To Login",
            html: this.error,
            showConfirmButton: true,
          });
        } else if (error.response && error.response.status === 500) {
          const errorMessages = error.response.data.meta.message;
          this.error = errorMessages;
        }
      }
    },
  },
};
</script>
<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

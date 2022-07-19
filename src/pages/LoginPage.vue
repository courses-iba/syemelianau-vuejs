<template>
  <div class="login">
    <form class="card" @submit="handleSubmit">
      <AppInput type="email" name="email" placeholder="example@mail.com" />
      <AppInput type="password" name="password" placeholder="12345678" />
      <div :class="styles.element">
        <button
            class="button"
            :class="styles.input"
            :disabled="isSubmitting"
            type="submit"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';

import AppInput from '@/components/AppInput';
import styles from '@/styles/AppInput.module.css';

export default {
  components: { AppInput },
  setup() {
    const store = useStore();
    const validationSchema = object().shape({
      email: string()
          .email('Invalid email')
          .required('Required'),
      password: string()
          .min(8, 'Too Short!')
          .matches(/(\D\d)+/g, 'Must contain numbers & characters')
          .required('Required')
    });
    const { isSubmitting, handleSubmit } = useForm({ validationSchema });

    return {
      isSubmitting,
      handleSubmit: handleSubmit(values => {
        setTimeout(() => {
          store.dispatch('login', values);
          alert(JSON.stringify(values, null, 2));
        }, 400);
      })
    };
  },
  data() {
    return {
      styles
    };
  }
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  padding: 10vh;
}

.login * {
  color: #586069;
}

.card {
  padding: 3vh 10vh;
  display: flex;
  flex-direction: column;
  border: 1px solid #e1e4e8;
  border-radius: 6px;
  transition: 0.3s;
}

.button {
  cursor: pointer;
  transition: .3s;
}

.button:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.button:active {
  transition: none;
  background-color: #f1f8ff;
  border-color: #c8e1ff;
}
</style>

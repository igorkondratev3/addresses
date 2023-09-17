<script setup>
//не прерывается запрос если меньше трех - исправить
//делигирование событий использовать

import { ref } from 'vue';
import { suggestionsApi } from './api';
import { debounce } from './scripts/debounce.js';
import SpinnerLoading from './components/spinnerLoading.vue';
import PopUp from './components/popUp/popUp.vue';

const address = ref('');
const addressList = ref([]);
const addressObj = ref(null);
const addressListVisibility = ref(false);
const isLoadingAddress = ref(false);

const changeAddressList = async (address) => {
  addressList.value = [];
  addressObj.value = null;
  //обнулять последующие и в других также
  if (address.length >= 3) {
    try {
      isLoadingAddress.value = true;
      addressList.value = await suggestionsApi.getAddressList(address);
    } catch (error) {
      console.error('message:', error.message);
      popUpMessage.value = 'Не удалось получить адрес';
    } finally {
      isLoadingAddress.value = false;
    }
  }
};

const debounceChangeAddressList = debounce(changeAddressList, 500);

const setAddress = (value) => {
  address.value = value;
  addressObj.value = addressList.value.find((el) => el.value === address.value);
  addressList.value = [];
  addressListVisibility.value = false;
};

const closeAddressList = (event) => {
  const id = event.target.id;
  if (id !== 'address-input' && id !== 'address-p')
    addressListVisibility.value = false;
};

const house = ref('');

const popUpMessage = ref('');

const selectedAddress = ref('');
</script>

<template>
  <div class="page" @click="closeAddressList">
    <div class="address-wrapper">
      <label class="address-wrapper__address address">
        <h4 class="address__header input-header">Адрес</h4>
        <input
          id="address-input"
          class="address__content input"
          v-model="address"
          placeholder="Введите не менее 3 символов"
          spellcheck="false"
          @input="debounceChangeAddressList(address)"
          @focus="addressListVisibility = true"
        />
      </label>
      <div
        class="address-wrapper__list address-list datalist"
        v-show="addressListVisibility && addressList.length"
      >
        <p
          id="address-p"
          class="address-list__address"
          v-for="address of addressList"
          :key="address.value"
          @click="setAddress(address.value)"
        >
          {{ address.value }}
        </p>
      </div>
      <!--<datalist id="addresses">
        <option v-for="address of addresses" :key="address.value">
          {{ address.value }}
        </option>
      </datalist>-->
      <SpinnerLoading v-show="isLoadingAddress" />
    </div>

    <div class="house-wrapper">
      <label>
        <h4 class="input-header">Дом</h4>
        <input
          class="input"
          v-model="house"
          placeholder="Номер дома"
          :disabled="!addressObj"
        />
      </label>
    </div>
    <div class="address-select-wrapper">
      <label>
        <h4 class="input-header">Дом</h4>
        <select class="address-select" v-model="selectedAddress">
          <option disabled value="" class="address-select__option">
            Выберите адрес
          </option>
          <option
            class="address-select__option"
            v-for="address of addressList"
            :key="address.value"
            :value="address"
          >
            {{ address.value }}
          </option>
        </select>
      </label>
      <SpinnerLoading v-show="isLoadingAddress" />
    </div>

    <PopUp
      :popUpSeen="Boolean(popUpMessage)"
      :popUpMessage="popUpMessage"
      :popUpDuration="4000"
      where="top"
      howFar="8px"
      @closePopUp="popUpMessage = ''"
    />
  </div>
</template>

<style>
@import '@/assets/fonts.css';

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  padding: 16px;
  padding-top: 128px;
}

.input-header {
  margin-left: 8px;
  margin-bottom: 4px;
  font-weight: 400;
}

.input {
  display: block;
  align-self: center;
  height: 64px;
  width: 700px;
  padding: 24px;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  background-color: white;
  font-family: 'MontserratCY', 'MontserratLA';
  font-size: 24px;
  letter-spacing: 0.065em;
}

.input::placeholder {
  font-family: 'MontserratCY', 'MontserratLA';
  font-size: 24px;
  letter-spacing: 0.065em;
}

.input:focus-visible {
  outline: 1px solid black;
  outline-offset: 1px;
}

.input:disabled {
  opacity: 40%;
}

.datalist {
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  transform: translateY(4px);
  width: 700px;
  max-height: 200px;
  overflow-y: auto;
  user-select: none;
  background-color: rgb(224, 224, 224);
  font-family: 'MontserratCY', 'MontserratLA';
  font-size: 16px;
  letter-spacing: 0.065em;
}

.address-list__address {
  padding: 4px;
}

.address-list__address:hover {
  background-color: rgb(184, 184, 184);
}

.house-wrapper, .address-select-wrapper {
  margin-top: 32px;
}

.address-select {
  width: 700px;
  height: 64px;
  font: inherit;
  border-radius: 8px;
  background-color: white;
}

.address-select:focus-visible {
  outline: 1px solid black;
  outline-offset: 1px;
}

.address-select__option {
  background-color: rgb(224, 224, 224);
  font-size: 16px;
}
</style>

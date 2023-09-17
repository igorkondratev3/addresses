<script setup>
import { watchEffect } from 'vue';
import { getCoordinates } from './helpers.js';

const props = defineProps({
  popUpSeen: Boolean,
  popUpMessage: String,
  popUpDuration: Number,
  where: String,
  howFar: String,
});
const emit = defineEmits(['closePopUp']);

watchEffect(() => {
  if (props.popUpSeen) {
    setTimeout(() => emit('closePopUp'), props.popUpDuration);
  }
});

const {
  position,
  xTranslateStartPosition,
  yTranslateStartPosition,
  transformEndPosition,
} = getCoordinates(props.where, props.howFar);
</script>

<template>
  <Transition>
    <div class="popUp" v-if="props.popUpSeen" :style="position">
      {{ props.popUpMessage }}
    </div>
  </Transition>
</template>

<style>
.popUp {
  position: fixed;
  transform: v-bind(transformEndPosition);
  z-index: 999;
  max-width: 300px;
  min-height: 74px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
  font: inherit;
  text-align: center;
  background-color: rgb(235, 94, 94);
}

.v-enter-from,
.v-leave-to {
  transform: translate(
    v-bind(xTranslateStartPosition),
    v-bind(yTranslateStartPosition)
  );
}

.v-enter-active,
.v-leave-active {
  transition: all 1s;
}

.v-enter-to,
.v-leave-from {
  transform: v-bind(transformEndPosition);
}
</style>

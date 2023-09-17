<template>
  <div class="spinner"></div>
</template>

<style>
.spinner {
  position: absolute;
  display: block;
  bottom: 14px;
  right: 16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 4px solid black;
  border-color: black transparent black transparent;
  animation: spinner 1.2s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

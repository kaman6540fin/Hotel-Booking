<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style>
.loading {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(200, 200, 200, 0.8);
  background-image: url("./../assets/spinner.gif");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 200px;
  /* opacity: 0.5; */
}
</style>

<script lang="ts">
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup(props) {
    return props.msg;
  },
};
</script>

<template>
  <div class="greetings">
    <h1
      class="font-extrabold text-text-DarkPurple text-4xl"
    >
      {{ msg }}
    </h1>
    <h3 class="text-text-DarkPurple">
      You’ve successfully cloned our school project for the Talahons.
      <div class="flex flex-row gap-2">
        <p class="text-text-DarkPurple">IT22-B</p>
        +
        <p class="text-text-DarkPurple">HA24</p>
      </div>
    </h3>
  </div>
</template>

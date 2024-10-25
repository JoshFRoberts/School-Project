<script lang="ts">
export default {
  name: "NavLink",
  props: {
    link: String,
  },
  setup(props) {
    return props.link;
  },
};
</script>

<template>
  <li>
    <a
      :href=link
      target="_blank"
      class="text-text-DarkPurple cursor-pointer"
    >
      <slot name="default"> Linkname </slot>
    </a>
  </li>
</template>

<style scoped></style>

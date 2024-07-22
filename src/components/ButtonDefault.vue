<template>
    <button class="btn" @click="handleClick">
      <slot></slot>
    </button>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    onClick?: () => void;
  }>();
  
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };
  </script>
  
  <style scoped>
  .btn {
    padding: 10px;
    background-color: #4285f4;
    border: none;
    color: white;
    border-radius: 21px;
    cursor: pointer;
    font-size: 1em;
  }
  .btn:hover {
    background-color: #357ae8;
  }
  </style>
  
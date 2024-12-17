<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import NotFound from '@/pages/NotFound.vue';
import { useMainStore } from './stores/main';
import { storeToRefs } from 'pinia';

const { notFound } = storeToRefs(useMainStore())
</script>

<template>
  <Header />
  <NotFound v-if="notFound" />
  <RouterView v-else class="px-4" />
  <Footer />
</template>



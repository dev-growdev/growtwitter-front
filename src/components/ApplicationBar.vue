<script setup lang="ts">
import homePageLogo from '@/components/icons/homePageLogo.vue';
import HashTagLogo from '@/components/icons/hashTagLogo.vue';
import ProfileLogo from '@/components/icons/profileLogo.vue';
import type { UserType } from '@/types';

interface iconProps {
  userId?: UserType;
}

defineProps<iconProps>();
</script>

<template>
  <v-bottom-navigation grow>
    <v-btn>
      <RouterLink to="/">
        <homePageLogo class="img-icon" />
      </RouterLink>
    </v-btn>
    <v-btn>
      <RouterLink to="/explore">
        <HashTagLogo class="img-icon" />
      </RouterLink>
    </v-btn>
    <v-btn>
      <RouterLink :to="`/profile/${userId?.id}`">
        <ProfileLogo class="img-icon" />
      </RouterLink>
    </v-btn>
  </v-bottom-navigation>
</template>

<style scoped>
.img-icon {
  max-width: 16vh;
  max-height: 25vh;
}
</style>

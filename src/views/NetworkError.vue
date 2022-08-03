<template>
  <div class="networkError">
    <h1>Uh-Oh!</h1>
    <!-- The user will be navigate to the previous route. -->
    <h3>
      It looks like you're experiencing some network issues, please take a
      breath and <a href="#" @click="$router.go(-1)">click here</a> to try
      again.
    </h3>
  </div>
</template>

<template>
  <n-card class="home-box">
    <n-space justify="center">
      <n-icon class="css3-logo" size="9em" color="#5FBC21">
        <LogoCss3/>
      </n-icon>    
    </n-space>
    <n-space justify="center">
      <n-p class="project-title">Libre Testing</n-p>
    </n-space>
    <n-divider class="divider"/>
    <n-space justify="center">
      <n-p class="tech-stack" :depth="3">A Vue 3 + Vite + Naive UI Project</n-p>      
    </n-space>
    <n-space justify="center" :size="[60, 0]">
      <n-icon size="4em" class="vue-logo">
        <IconVue/>
      </n-icon>
      <div class="flex-wrapper">
        <n-icon size="2em" :component="AddSharp"/>
      </div>
      <n-icon size="4em">
        <IconVite/>
      </n-icon>
      <div class="flex-wrapper">
        <n-icon size="2em" :component="AddSharp"/>
      </div> 
      <n-icon size="4em">
        <IconNaiveUi/>
      </n-icon>      
    </n-space>
    <n-space justify="center">
      <n-p class="intro">Automated Software Testing, Simple and Easy to Use</n-p>
    </n-space>
    <n-space justify="center">
      <n-p class="try" :depth="3">Have a Try</n-p>
    </n-space>
    <template #footer>
      <n-space justify="center">
        <n-p :depth="3">
          Libre Testing beta 0.0.0 · Made in China
        </n-p>
      </n-space>
    </template>       
  </n-card>
</template>

<script setup>
import { NIcon, NCard, NSpace, NP, NDivider } from 'naive-ui'
import { AddSharp, LogoCss3 } from '@vicons/ionicons5'
import IconNaiveUi from '../components/icons/IconNaiveUI.vue'
import IconVite from '../components/icons/IconVite.vue'
import IconVue from '../components/icons/IconVue.vue'

</script>

<style scoped>
.home-box{
  width: 100%;
  max-height: 85vh;
}
.css3-logo{
  margin: .4em 0 .1em 0;
}
.project-title{
  font-size: 2.4em;
  font-weight: 500;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
.divider{
  width: 60%;
  margin: .8em auto;
}
.tech-stack{
  font-size: 1.2em;
  font-weight: 500;
  margin-bottom: .8em;
}
.vue-logo{
  padding-top: .05em;
}
.intro{
  margin-top: .8em;
  font-size: 1.2em;
  font-weight: 510;
}
.try{
  font-size: 1.2em;
  font-weight: 500;
  margin: .8em 0 4em 0;
}
.flex-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>
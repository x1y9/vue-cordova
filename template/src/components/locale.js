import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../assets/messages'

Vue.use(VueI18n)

// Create VueI18n instance with options
export const i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: navigator.language.split('-')[0],
  messages
})

import { drawAuth } from "./auth.js"
import { drawPlaner } from "./planer.js"

window.addEventListener('authStateChange', (e) => {
  drawAuth(e.detail.user)
  drawPlaner();
})

window.addEventListener('DOMContentLoaded', (e) => {
 
})
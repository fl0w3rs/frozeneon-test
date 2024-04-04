<script setup lang="ts">
import SearchPage from './pages/SearchPage.vue';
</script>

<template>
  <div class="modal__inner">

  </div>
  <header>
    <div class="container">
      <img src="https://www.jsdelivr.com/assets/8aab44d2735c604d59887d32cc74b517689e5d5c/img/jsdelivr-horizontal-regular.svg" alt="JSDelivr Logo" />
      <div class="header__content">

      </div>
    </div>
  </header>

  <main>
    <div class="container">
      <search-page />
    </div>
  </main>

  <footer>
    <div class="footer__author container">
      <div class="footer__author__name">
        fl0w3rs
      </div>
      <div class="footer__author__github">
        <a href="https://github.com/fl0w3rs">
          <img src="https://www.logo.wine/a/logo/GitHub/GitHub-Wordmark-White-Logo.wine.svg" alt="GitHub">
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;

  width: 100%;
  max-width: 1240px;
  padding: 0 20px;
}

header {
  padding: 20px 0;

  border-bottom: var(--border) 1px solid;

  & > .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
}

main {
  padding: 20px 0;
}

footer {
  margin-top: auto;
  padding: 20px 0;

  border-top: var(--border) 1px solid;

  .footer__author {
    display: flex;
    flex-direction: row;
    align-items: center;

    gap: 0.5rem;

    &__name {
      font-size: 1.5rem;
    }

    &__github {
      height: 64px;

      img {
        height: 100%;
        width: auto;
      }
    }
  }
}

.modal__inner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  display: block;
  visibility: visible;
  opacity: 1;

  transition: .2s ease-in-out;

  &:empty {
    display: none;
    visibility: hidden;
    opacity: 0;
  }
}
</style>

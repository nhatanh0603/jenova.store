<template>
  <div class="jnv-layout__default">
    <Header />

    <div class="jnv-main">
      <main class="section">
        <div class="jnv-content">
          <div class="jnv-user__account">
            <div class="jnv-user__account-tabs">
              <div v-for="(tab, index) in tabs" :key="index"
                  :class="['jnv-user__account-tab-head', {'tab-active': $route.path.includes(tab.page)}]"
                  @click="$router.push(tab.page)"
              >
                <div class="jnv-user__account-tab-head-icon">
                  <component :is="tab.icon"></component>
                </div>
                <span class="jnv-user__account-tab-head-name">{{ tab.name }}</span>
              </div>
            </div>

            <div class="jnv-user__account-content">
              <slot />
            </div>
          </div>
        </div>
      </main>
    </div>

    <Footer />
  </div>
</template>

<script setup>
  import Header from '@/components/layout/Header.vue'
  import Footer from '@/components/layout/Footer.vue'
  import SyncLock from '@/components/general/svg/SyncLock.vue'
  import Paid from '@/components/general/svg/Paid.vue'
  import AccountCircle from '@/components/general/svg/AccountCircle.vue'
  import GameCard from '@/components/general/svg/GameCard.vue'
  
  const tabs = [
    { 'page': '/user/account/profile', 'name': 'My Profile', 'icon': AccountCircle },
    { 'page': '/user/account/order', 'name': 'My Purchase', 'icon': Paid },
    { 'page': '/user/account/card', 'name': 'My Cards', 'icon': GameCard },
    { 'page': '/user/account/change-password', 'name': 'Change Password', 'icon': SyncLock }
  ]
</script>

<style lang="scss">
  @import '@/assets/css/variables.scss';

  .jnv-user__account {
    display: flex;
    column-gap: 2rem;

    .jnv-user__account-tabs {
      display: flex;
      flex-direction: column;
      height: fit-content;
      background: linear-gradient(54deg, rgb(25, 59, 78), #06284a, rgb(11 66 102));
      box-shadow: 0 0 5px #0e0e0e;

      .jnv-user__account-tab-head {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 10px;
        padding: 1rem 2rem;
        white-space: nowrap;
        text-transform: uppercase;
        font-weight: 700;
        width: 100%;
        cursor: pointer;

        .jnv-user__account-tab-head-icon {
          display: flex;
          justify-content: center;
        }
      }

      .jnv-user__account-tab-head.tab-active {
        position: relative;
        background: radial-gradient(circle at 15%, rgb(94 0 0), rgb(145 18 18));
        box-shadow: 0 0 5px #ad0101;

        &:after {
          content: '';
          position: absolute;
          right: -16px;
          padding: 4px;
          border-right: 9px solid #911212;
          border-bottom: 9px solid #911212;
          border-top: 9px solid transparent;
          border-left: 9px solid transparent;
          transform: rotate(-45deg);
          filter: drop-shadow(0px 0px 1.5px #ad0101);
        }
      }
    }

    .jnv-user__account-content {
      background: linear-gradient(54deg, rgb(25, 59, 78), #06284a, rgb(11 66 102));
      box-shadow: 0 0 5px #0e0e0e;
      width: 100%;
      padding: 2rem 3rem;
    }
  }

  @media screen and (max-width: 830px) {
    .jnv-user__account {
      flex-direction: column;
      row-gap: 2rem;
      column-gap: 0;

      .jnv-user__account-tabs {
        flex-direction: row;
        justify-content: space-between;

        .jnv-user__account-tab-head {
          width: 100%;
          padding: 14px 10px;
          justify-content: center;

          .jnv-user__account-tab-head-name {
            display: none;
            font-size: 12px;
            white-space: wrap;
          }
        }

        .jnv-user__account-tab-head.tab-active {
          .jnv-user__account-tab-head-name {
            display: block;
          }

          &:after {
            right: unset;
            bottom: -16px;
            transform: rotate(45deg);
            border-right: 9px solid #730808;
            border-bottom: 9px solid #730808;
          }
        }
      }

      .jnv-user__account-content {
        padding: 20px;
      }
    }
  }
</style>
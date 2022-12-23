<template>
  <!---------------------- DESKTOP ---------------------->
  <div class="jnv-header__search--desktop" ref="searchDesktop" v-if="isDesktop">
    <input type="text" 
           class="jnv-header__search-input"
           :placeholder="$t('content.page.search.place_holder')"
           :value="search.keyword"
           @click="show = true"
           @input="searching"
           @keydown.enter="toSearchPage"
    >

    <div class="jnv-header__search-icon" @click="toSearchPage">
      <Search />
    </div>

    <!---------------------- SEARCH RESULT ---------------------->
    <div class="jnv-header__search-result" v-if="show">
      <div class="jnv-header__search-loader" v-if="search.loading">
        <Loader width="30"/>
      </div>

      <div class="jnv-header__search-result-container" v-else>
        <div v-if="Object.keys(search.result).length">
          <div class="jnv-header__search-result-item" v-for="item in search.result" @click="forwardToItem(item.slug)">
            <img :src="url.heroImage + item.name + '.png'" alt="Hero Image" class="jnv-header__search-result-item-img">

            <div class="jnv-header__search-result-item-detail">
              <Attribute :primary="item.primary_attr" width="20" :has-label="false"/>

              <div class="jnv-header__search-result-item-name">
                <span>{{ item.display_name }}</span>
              </div>

              <div class="jnv-header__search-result-item-price">
                <img :src="url.misc + 'coin.svg'" alt="Coin Icon" width="20">
                <div class="jnv-header__search-result-item-price-display">{{ item.price }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="jnv-header__search-nothing" v-else>
          <!-- <span>No results found</span> -->
          <img :src="url.misc + 'curiosity-search.svg'" alt="Curiosity Search">
        </div>
      </div>      
    </div>
  </div>

  <!---------------------- MOBILE ---------------------->
  <div class="jnv-header__search--mobile" v-else>
    <div class="jnv-header__search-icon--mobile" @click="showMobileSearch">
      <Search />
    </div>

    <!---------------------- SEARCH RESULT ---------------------->
    <div class="jnv-header__search-container" v-show="show">
      <div class="jnv-header__search-wrapper">
        <div class="jnv-header__search-close" @click="hideMobileSearch">
          <Xmark width="20px"/>
        </div>

        <div class="jnv-header__search-input-group">
          <input type="text"
                 class="jnv-header__search-input"
                 ref="searchMobile"
                 :placeholder="$t('content.page.search.place_holder')"
                 :value="search.keyword"
                 @input="searching"
                 @keydown.enter="toSearchPage"
          >

          <div class="jnv-header__search-icon" @click="toSearchPage">
            <Search />
          </div>
        </div>
        

        <div class="jnv-header__search-result">
          <div class="jnv-header__search-loader" v-if="search.loading">
            <Loader width="30"/>
          </div>

          <div class="jnv-header__search-result-container" v-else>
            <div class="jnv-header__search-result-wrapper" v-if="Object.keys(search.result).length">
              <div class="jnv-header__search-result-item" v-for="item in search.result" @click="forwardToItem(item.slug)">
                <img :src="url.heroImage + item.name + '.png'" alt="Hero Image" class="jnv-header__search-result-item-img">

                <div class="jnv-header__search-result-item-detail">
                  <Attribute :primary="item.primary_attr" width="25" :has-label="false"/>

                  <div class="jnv-header__search-result-item-name">
                    <span>{{ item.display_name }}</span>
                  </div>

                  <div class="jnv-header__search-result-item-price">
                    <img :src="url.misc + 'coin.svg'" alt="Coin Icon" width="26">
                    <div class="jnv-header__search-result-item-price-display">{{ item.price }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="jnv-header__search-nothing" v-else>
              <img :src="url.misc + 'curiosity-search.svg'" alt="Curiosity Search">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import Search from '../general/svg/Search.vue'
  import Xmark from '../general/svg/Xmark.vue'
  import Loader from '../general/Loader.vue'
  import Attribute from '../general/svg/attributes/Attribute.vue'
  import { useSearchStore } from '@/stores/search'

  const show = ref(false)
  const searchDesktop = ref(null)
  const searchMobile = ref(null)
  const isDesktop = ref(true)
  const { url } = useAppConfig()
  const search = useSearchStore()

  onBeforeMount(() => {
    if(window.innerWidth < 717)
      isDesktop.value = false

    window.addEventListener('resize', desktopWidthTracker)
    window.addEventListener('click', closeSearchResult)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('click', closeSearchResult)
    window.removeEventListener('resize', desktopWidthTracker)
  })

  const closeSearchResult = (e) => {
    if(searchDesktop.value) {
      if(!searchDesktop.value.contains(e.target))
        show.value = false
    }
  }

  const forwardToItem = (slug) => {
    search.reset()
    hideMobileSearch()
    useRouter().push('/hero/' + slug)
  }

  const searching = (e) => {
    search.keyword = e.target.value
    search.fetch()
  }

  const desktopWidthTracker = () => {
    if(window.innerWidth < 717) {
      isDesktop.value = false

      if(show.value)
        document.body.style.overflow = 'hidden'
      else
        document.body.style.overflow = ''
    }
    else {
      isDesktop.value = true
      document.body.style.overflow = ''
    }
  }

  const showMobileSearch = async () => {
    await new Promise((resolve) => {
      show.value = true
      
      if(show.value)
        resolve()
    }).then(() => {
      searchMobile.value.focus()
      document.body.style.overflow = 'hidden'
    })
  }

  const hideMobileSearch = () => {
    show.value = false
    document.body.style.overflow = ''
  }

  const toSearchPage = () => {
    if(search.keyword.length > 0) {
      useRouter().push('/search/' + search.keyword)

      searchMobile ? hideMobileSearch() : show.value = false
    }
  }
</script>
  
<style lang="scss">
  @import '../assets/css/variables.scss';

  /*------------- DESKTOP -------------*/
  .jnv-header__search--desktop {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 4rem;

    .jnv-header__search-result {
      position: absolute;
      top: 45px;
      width: 100%;
      min-width: 350px;
      background: radial-gradient(circle at 2%, #204c2a, #365280);
      border-radius: 10px;
      box-shadow: 0 0 7px #184a3d;
      
      .jnv-header__search-result-container {
        display: flex;
        flex-direction: column;
        max-height: 530px;
        overflow-y: auto;
        margin: 5px;

        .jnv-header__search-result-item {
          display: flex;
          cursor: pointer;
          margin: 0 15px 15px;
          filter: drop-shadow(0 0 3px #0c0c0c);

          &:first-child {
            margin: 15px;
          }

          .jnv-header__search-result-item-img {
            width: 35%;
            height: 35%;
          }

          .jnv-header__search-result-item-detail {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 5px 10px;
            width: 100%;
            background: linear-gradient(135deg, black, #114656);
            position: relative;

            .jnv-header__search-result-item-name {
              margin-bottom: 2px;
              display: flex;
              align-items: center;
              margin-left: 22px;

              span {
                @include golden-gradient-text;
                font-weight: 800;
                margin-left: 5px;
                font-size: 15px;
                //text-transform: uppercase;
              }
            }

            .jnv-header__search-result-item-price {
              display: flex;
              align-items: center;
              margin-top: 6px;

              .jnv-header__search-result-item-price-display {
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
  }


  /*------------- MOBILE -------------*/
  .jnv-header__search--mobile {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    margin-right: 15px;

    .jnv-header__search-icon--mobile {
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 999px;

      &:hover {
        box-shadow: 0 0 10px $jnv__color--scarlet;
      }

      svg {
        width: 24px;
        top: 7px;
        left: 7px;
      }
    }

    .jnv-header__search-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: radial-gradient(circle at 2%, #204c2a, #365280);
      z-index: 52;

      .jnv-header__search-wrapper {
        position: relative;
        display: flex;
        flex-direction: column;

        .jnv-header__search-close {
          position: absolute;
          top: 10px;
          right: 10px;
          cursor: pointer;

          &:hover {
            .jnv-svg__x-mark {
              fill: $jnv__color--scarlet;
            }
          }
        }

        .jnv-header__search-input-group {
          position: relative;
          display: flex;
          align-items: center;
          margin: 40px 20px 20px;
        }

        .jnv-header__search-result {
          margin: 0 20px;

          .jnv-header__search-result-container {

            .jnv-header__search-result-wrapper {
              height: calc(100vh - 160px);
              overflow: auto;
              display: flex;
              flex-direction: column;

              .jnv-header__search-result-item {
                display: flex;
                margin: 0 10px 20px;
                filter: drop-shadow(0 0 5px #0c0c0c);
                cursor: pointer;

                &:first-child {
                  margin-top: 20px;
                }

                .jnv-header__search-result-item-img {
                  width: 35%
                }

                .jnv-header__search-result-item-detail {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  padding-left: 20px;
                  width: 100%;
                  background: linear-gradient(135deg, black, #114656);
                  position: relative;

                  .jnv-header__search-result-item-name {
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    margin-left: 22px;

                    span {
                      @include golden-gradient-text;
                      font-size: 16px;
                      //text-transform: uppercase;
                      font-weight: 800;
                    }
                  }

                  .jnv-header__search-result-item-price {
                    display: flex;
                    align-items: center;

                    .jnv-header__search-result-item-price-display {
                      margin-left: 7px;
                      font-weight: 600;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .jnv-header__search-input {
    width: 100%;
    padding: 12px 42px 12px 15px;
    border: none;
    border-radius: 999px;
    background-color: rgb(23 36 58 / 90%);
    color: $jnv__color--white;

    &:focus {
      box-shadow: 0 0 5px #2642bf;
    }

    &::placeholder {
      color: $jnv__color--light-grey;
    }
  }

  .jnv-header__search-icon {
    position: absolute;
    width: 34px;
    height: 34px;
    border-radius: 999px;
    right: 3px;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 10px $jnv__color--scarlet;
    }
  }

  .jnv-header__search-loader {
    display: flex;
    height: 50px;
    justify-content: center;
    align-items: center;
  }

  .jnv-header__search-nothing {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      margin: 25px;
      width: 100%;
      height: 100%;
      max-width: 400px;
    }
  }

  .jnv-header__search-result-item-detail .jnv-attribute {
    position: absolute;
    background-color: $jnv__color--black;
    border-radius: 999px;
    padding: 3px;
    top: -8px;
    left: 3px;
  }
</style>
<template>
  <div class="jnv-about">
    <div class="jnv-about__introduction">
      "{{ $t('content.page.about.introduction') }}"
    </div>

    <div class="jnv-about__me">
      <div class="jnv-about__skill-title">{{ $t('content.page.about.my_skills') }}</div>

      <div class="jnv-about__me-skill">
        <div class="jnv-about__skill-bar" v-for="skill in skills">
          <div :class="['jnv-about__skill-exp', 'jnv-about__keyframe-' + skill.id]" :style="`width: ${skill.experience}%`">
            <span class="jnv-about__skill-name">{{ skill.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
  useHead({
    title: 'About - NuxtJS Framework, Laravel Framework'
  })
 
  const skills = [
    {id: 'php', name: 'PHP', experience: 60},
    {id: 'laravel', name: 'Laravel Framework', experience: 70},
    {id: 'mysql', name: 'MySQL', experience: 57},
    {id: 'html', name: 'HTML/CSS', experience: 70},
    {id: 'bootstrap', name: 'Bootstrap', experience: 40},
    {id: 'javascript', name: 'Javascript', experience: 60},
    {id: 'vuejs', name: 'Vue.js', experience: 65},
    {id: 'nuxtjs', name: 'NuxtJS Framework', experience: 60},
    {id: 'msoffice', name: 'Microsoft Office', experience: 37},
    {id: 'illustrator', name: 'Adobe Illustrator', experience: 30}
  ]
</script>
  
<style lang="scss">
  .jnv-about {
    display: flex;
    flex-direction: column;
    row-gap: 30px;

    .jnv-about__introduction {
      text-indent: 15px;
      font-style: italic;
    }

    .jnv-about__me {
      display: flex;
      flex-direction: column;
      row-gap: 30px;

      .jnv-about__skill-title {
        text-align: center;
        font-size: 16px;
        text-transform: uppercase;
        font-weight: 700;
      }

      .jnv-about__me-skill {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 20px;

        .jnv-about__skill-bar {
          background-color: #545353;
          box-shadow: 0 0 2px #3e3e3e;
          width: 100%;
          max-width: 500px;

          .jnv-about__skill-exp {
            padding: 5px 0;
            background: linear-gradient(45deg, #0a7425, #008b52);
            box-shadow: 0 0 3px #0a7425;

            .jnv-about__skill-name {
              white-space: nowrap;
              margin-left: 20px;
              font-weight: 700;
            }
          }
        }
      }
    }
  }

  $exps: (php: 60%, laravel: 70%, mysql: 57%, html: 70%, bootstrap: 40%, javascript: 60%, vuejs: 65%, nuxtjs: 60%, msoffice: 37%, illustrator: 30%);

  @mixin keyframe($exp, $name) {
    .jnv-about__keyframe-#{$name} {
      animation: $name 4s ease /* delay iteration-count direction fill-mode */;
    }

    @keyframes #{$name} {
      from {
        width: 0%;
      }
      to {
        width: $exp;
      }
    }
  }

  @each $name, $exp in $exps {
    @include keyframe($exp, $name);
  }
</style>
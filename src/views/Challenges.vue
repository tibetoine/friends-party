<template>
  <v-container offset-md4 style="margin-top: 50px">
    <v-layout>
      <v-flex xs12 offset-lg3 offset-xl2>
        <v-card>
          <v-toolbar>
            <v-app-bar-nav-icon></v-app-bar-nav-icon>
            <v-toolbar-title>Les défis</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <!-- Simon Essai d'ajout de bouton pour ajouter un défi -->
            <v-btn
              class="mx-2"
              fab
              dark
              color="indigo"
              @click="challengeform = !challengeform"
            >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
            <v-dialog v-model="challengeform" max-width="500px">
              <v-card>
                <v-container fluid>
                  <v-text-field
                    v-model="title"
                    label="Titre du défi"
                  ></v-text-field>

                  <v-textarea
                    v-model="description"
                    name="input"
                    auto-grow
                    filled
                    label="Description du défi"
                    value="Mais c'est complétement GUEDIN !"
                    hint="Décrivez le défi"
                  ></v-textarea>

                  <v-file-input
                    accept="image/*"
                    small-chips
                    show-size
                    multiple
                    placeholder="Téléchargez vos photos pour illustrer le défi"
                    label="Photos"
                    prepend-icon="mdi-camera"
                  ></v-file-input>

                  <v-subheader>Pondération du défi</v-subheader>
                  <v-slider
                    v-model="slider"
                    :thumb-size="24"
                    thumb-label="always"
                    class="align-center"
                    :max="5"
                    :min="1"
                    hide-details
                  ></v-slider>

                  <v-subheader
                    >Critères de réussite du défi (1 minimum, 4
                    maximum)</v-subheader
                  >
                  <v-text-field
                    label="Critère 1"
                    :rules="criteremini"
                  ></v-text-field>
                  <v-text-field label="Critère 2"></v-text-field>
                  <v-text-field label="Critère 3"></v-text-field>
                  <v-text-field label="Critère 4"></v-text-field>
                </v-container>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="
                      challengeform = false
                      triggerAddChallengeAction
                    "
                    >Submit</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-toolbar>
          <v-list>
            <v-list-item
              v-for="(challenge, index) in challenges"
              :key="index"
              @click="goToChallenge"
            >
              <v-list-item-icon>
                <v-icon v-if="challenge.favorite" color="amber darken-1"
                  >mdi-star</v-icon
                >
                <v-icon v-else>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="challenge.name"></v-list-item-title>
              </v-list-item-content>
              <div v-if="challenge.doneBy && challenge.doneBy.length <= 3">
                <v-list-item-avatar
                  v-for="(user, index2) in challenge.doneBy"
                  :key="index2"
                >
                  <v-img :src="getUser(user).avatar"></v-img>
                </v-list-item-avatar>
              </div>
              <div v-if="challenge.doneBy && challenge.doneBy.length > 3">
                <v-badge overlap right>
                  <template v-slot:badge>
                    <span v-if="challenge.doneBy">
                      {{ challenge.doneBy.length }}
                    </span>
                  </template>
                  <v-avatar size="36">
                    <v-img :src="getUser(challenge.doneBy[0]).avatar"></v-img>
                  </v-avatar>
                </v-badge>
              </div>
            </v-list-item>
          </v-list>
          <add-challenge v-if="networkOnLine"></add-challenge>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import AddChallenge from '@/components/AddChallenge'
import { mapMutations, mapGetters, mapState, mapActions } from 'vuex'

export default {
  components: { AddChallenge },

  data: () => ({
    criteremini: [
      value => !!value || 'Requis.',
      value => (value && value.length >= 3) || 'Min 3 caractères'
    ],
    slider: 1,
    challengeform: false,
    challenges: [
      {
        name: 'Les 1000 kms',
        favorite: false,
        points: 1000,
        doneBy: [1, 2, 4]
      },
      {
        name: 'Cocombre & vaseline',
        favorite: true,
        points: 850,
        doneBy: [1, 2, 3, 4]
      },
      {
        name: 'Resto avec un invité',
        favorite: false,
        points: 500,
        doneBy: [2]
      },
      {
        name: 'Nu comme un ver',
        favorite: false,
        points: 600,
        doneBy: []
      }
    ],
    users: [
      {
        userId: 1,
        icon: true,
        title: 'Jason Oner',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg'
      },
      {
        userId: 2,
        title: 'Travis Howard',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg'
      },
      {
        userId: 3,
        title: 'Ali Connors',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg'
      },
      {
        userId: 4,
        title: 'Cindy Baker',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg'
      }
    ]
  }),

  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle']),
    ...mapState('challenges', [
      'challengeNameToCreate',
      'challengeCreationPending'
    ]),
    title: {
      get() {
        console.log(
          'get tiitle : ',
          this.$store.state.challenges.challengeToCreate.title
        )
        return this.$store.state.challenges.challengeToCreate.title
      },
      set(value) {
        this.$store.commit('challenges/updateChallengeToCreateTitle', value)
      }
    },
    description: {
      get() {
        return this.$store.state.challenges.challengeToCreate.description
      },
      set(value) {
        this.$store.commit(
          'challenges/updateChallengeToCreateDescription',
          value
        )
      }
    },
    points: {
      get() {
        return this.$store.state.challenges.challengeToCreate.points
      },
      set(value) {
        this.$store.commit('challenges/updateChallengeToCreatePoints', value)
      }
    },
    successCriteria: {
      get() {
        return this.$store.state.challengeToCreate.successCriteria
      },
      set(value) {
        this.$store.commit(
          'challenges/updateChallengeToCreateSuccessCriteria',
          value
        )
      }
    }
  },
  methods: {
    ...mapMutations('challenges', ['setChallengeNameToCreate']),
    ...mapActions('challenges', ['triggerAddChallengeAction']),
    goToChallenge(challenge) {
      console.log('TODO goToChallenge ', challenge)
    },

    getUser(num) {
      let returnUser = {
        userId: 0,
        title: 'John DO',
        avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg'
      }
      for (let index = 0; index < this.users.length; index += 1) {
        if (num === this.users[index].userId) {
          returnUser = this.users[index]
        }
      }
      return returnUser
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.products-page-title {
  text-align: center;
  margin-bottom: 60px;
}

.product-list {
  margin: 20px 0;
}
</style>

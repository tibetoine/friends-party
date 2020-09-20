<template>
  <div>
    <div class="challenge-action-bar">
      <input
        placeholder="challenge name..."
        class="challenge-name-input"
        type="text"
        :value="challengeNameToCreate"
        @input="setChallengeNameToCreate($event.target.value)"
        @keypress.enter="triggerAddChallengeAction"
      />
      <div
        :class="{ disabled: challengeCreationPending }"
        class="create-challenge-btn"
        @click="triggerAddChallengeAction"
      >
        add challenge
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
  computed: mapState('challenges', [
    'challengeNameToCreate',
    'challengeCreationPending'
  ]),
  methods: {
    ...mapMutations('challenges', ['setChallengeNameToCreate']),
    ...mapActions('challenges', ['triggerAddChallengeAction'])
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.challenge-action-bar {
  display: flex;
  align-items: center;
  justify-content: center;

  .challenge-name-input {
    padding-left: 5px;
    height: 30px;
    width: 150px;
    outline: none;
    font: inherit;
    border: 1px solid;
    border-color: red;
    border-radius: 3px;
  }

  .create-challenge-btn {
    cursor: pointer;
    padding: 5px 10px;
    border: 1px solid;
    display: inline-block;
    border-radius: 3px;
    margin-left: 10px;
    border-color: #2c3e50;

    &.disabled {
      pointer-events: none;
      background-color: #aaa;
    }

    &:hover {
      color: $vue-color;
      border-color: $vue-color;
    }
  }
}
</style>

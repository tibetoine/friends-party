import { find } from 'lodash'

export default {
  /**
   * Check if a challenge has deletion pending
   */
  isChallengeDeletionPending: state => challengeId =>
    state.challengeDeletionPending.includes(challengeId),

  /**
   * Get challenge by id
   */
  getChallengeById: state => challengeId =>
    find(state.challenges, challenge => challenge.id === challengeId)
}

import ChallengesDB from '@/firebase/challenges-db'

export default {
  /**
   * Create a challenge for current loggedin user
   */
  createChallenge: async ({ commit }, challenge) => {
    const challengeDb = new ChallengesDB()
    console.log('challenge in db is : ', challenge)

    commit('setChallengeCreationPending', true)
    const createdChallenge = await challengeDb.create(challenge)
    commit('addChallenge', createdChallenge)
    commit('setChallengeCreationPending', false)
  },

  /**
   * Create a new challenge for current loggedin user and reset challenge name input
   */
  triggerAddChallengeAction: ({ dispatch, state, commit }) => {
    if (state.challengeNameToCreate === '') return

    const challenge = { name: state.challengeNameToCreate }
    console.log('challenge is : ', challenge)
    commit('setChallengeNameToCreate', '')
    dispatch('createChallenge', challenge)
  },

  /**
   * Delete a user challenge from its id
   */
  deleteChallenge: async ({ commit, getters }, challengeId) => {
    if (getters.isChallengeDeletionPending(challengeId)) return

    const userChallengesDb = new ChallengesDB()

    commit('addChallengeDeletionPending', challengeId)
    await userChallengesDb.delete(challengeId)
    commit('removeChallengeById', challengeId)
    commit('removeChallengeDeletionPending', challengeId)
  }
}

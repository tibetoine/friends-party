export default {
  /* Challenge input name */
  updateChallengeToCreateTitle: (state, title) =>
    (state.challengeToCreate.title = title),
  updateChallengeToCreateDescription: (state, description) =>
    (state.challengeToCreate.description = description),

  /* Challenges */
  setChallenges: (state, challenges) => (state.challenges = challenges),
  addChallenge: (state, challenge) => state.challenges.push(challenge),
  removeChallengeById: (state, challengeId) => {
    const index = state.challenges.findIndex(
      challenge => challenge.id === challengeId
    )
    state.challenges.splice(index, 1)
  },

  /* Challenges deletion */
  addChallengeDeletionPending: (state, challengeId) =>
    state.challengeDeletionPending.push(challengeId),
  removeChallengeDeletionPending: (state, challengeId) => {
    const index = state.challenges.findIndex(
      challenge => challenge.id === challengeId
    )
    state.challengeDeletionPending.splice(index, 1)
  },

  /* Challenge creation */
  setChallengeCreationPending: (state, value) =>
    (state.challengeCreationPending = value)
}

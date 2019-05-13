export default {
    getLabelMessages: state => state.labelMessages,
    getThreadMessages: state => state.threadMessages,
    getLabelNextPageTokens: state => state.labelNextPageTokens,
    getLatestThreadMessageTime: state => state.latestThreadMessageTime,
    getAttachments: state => state.attachments,
    googleAuth: state => state.googleAuth,
    getCurrentUserProfile: state => state.currentUserProfile,
    getCurrentUser: state => state.currentUser,
    getSessionExpiration: state => state.sessionExpiration,
    getToken: state => state.token,
    loggedIn: state => {
      if (state.token === "") {
        return false;
      }
      return true;
    },
}
const admin = require("firebase-admin");

const serviceAccount = require("./secret_admin_config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// admin.auth().projectConfigManager().updateProjectConfig({
//   passwordPolicyConfig: {
//     enforcementState: 'ENFORCE',
//     forceUpgradeOnSignin: true,
//     constraints: {
//       minLength: 8,
//       maxLength: 40,
//     },
//   },
// })

module.exports = { admin };
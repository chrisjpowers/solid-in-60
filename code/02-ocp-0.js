class UserAuthController {
  login(user, pw) {
    let result, path;
    if (user.type === "admin") {
      path = "/admin";
      result = UserAuth.authenticateWithLdap(user.ldapUser(), pw);
    } else if (user.freeTrial === true) {
      path = "/upsell";
      result = user.trialKey === pw;
    } else {
      path = "/home";
      result = UserAuth.isAuthenticatedBy(user.email, pw);
    }
    return result ? {redirect: path} : {redirect: "/login"};
  }
}
class UserAuthController {
  login(user, pw) {
    let login, result, page;
    if (user.type === "admin") {
      login = new AdminLogin(user);
    } else if (user.freeTrial === true) {
      login = new FreeTrialLogin(user)
    } else {
      login = new MemberLogin(user)
    }
    return login.authenticate(pw) ?
      {redirect: login.successPath} :
      {redirect: "/login"};
  }
}

class AdminLogin {
  constructor(user) {
    this.successPath = "/admin";
    this.user = user;
  }
  authenticate(pw) {
    return UserAuth.authenticateWithLdap(this.user.ldapUser(), pw);
  }
}

class FreeTrialLogin {
  constructor(user) {
    this.successPath = "/upsell";
    this.user = user;
  }
  authenticate(pw) {
    return this.user.trialKey === pw;
  }
}

class MemberLogin {
  constructor(user) {
    this.successPath = "/home";
    this.user = user;
  }
  authenticate(pw) {
    return UserAuth.isAuthenticatedBy(this.user.email, pw);
  }
}
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

//---------------------

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

//------------------

class UserAuthController {
  login(user, pw) {
    let login = this.getLoginForUser(user);
    return login.authenticate(pw) ?
      {redirect: login.successPath} :
      {redirect: "/login"};
  }

  getLoginForUser(user) {
    if (user.type === "admin") {
      return new AdminLogin(user);
    } else if (user.freeTrial === true) {
      return new FreeTrialLogin(user);
    } else {
      return new MemberLogin(user);
    }
  }
}

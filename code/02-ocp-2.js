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

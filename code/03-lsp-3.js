class UserAuthController {
  login(user, pw) {
    let login = this.getLoginForUser(user);
    let rejectionPath = login.getRejectionPath();
    if (rejectionPath) return {redirect: rejectionPath};

    if (login.authenticateAsync) {
      login.authenticateAsync(pw, (err) => {
        !err ?
          {redirect: login.successPath} :
          {redirect: "/login"};
      });
    } else {
      return login.authenticate(pw) ?
        {redirect: login.successPath} :
        {redirect: "/login"};
    }
  }
}

class Under18Login {
  constructor(user) {
    this.successPath = "/home";
    this.user = user;
  }
  authenticate(pw) {
    return UserAuth.isAuthenticatedBy(this.user.username, pw);
  }
  getRejectionPath() {
    return this.pastCurfew() ? "/curfew" : null;
  }
  pastCurfew(date) {
    const hours = date.getHours();
    return hours < 7 || hours > 22;
  }
}

class FacebookLogin {
  constructor(user) {
    this.successPath = '/home';
    this.user = user;
  }
  // Asynchronous!
  authenticateAsync(pw, cb) {
    UserAuth.authenticateWithFacebook(this.user.fb, pw, cb);
  }
  getRejectionPath() { return null; }
}
class FacebookLogin {
  constructor(user) {
    this.successPath = '/home';
    this.user = user;
  }
  // Asynchronous!
  authenticate(pw, cb) {
    UserAuth.authenticateWithFacebook(this.user.fb, pw, cb);
  }
}

class UserAuthController {
  login(user, pw) {
    let login = this.getLoginForUser(user);
    return login.authenticate(pw) ?
      {redirect: login.successPath} :
      {redirect: "/login"};
  }
}
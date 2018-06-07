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

//----------------

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
    if (login instanceof FacebookLogin) {
      login.authenticate(pw, (err) => {
        err ?
          {redirect: "/login"} :
          {redirect: login.successPath};
      });
    } else {
      return login.authenticate(pw) ?
        {redirect: login.successPath} :
        {redirect: "/login"};
    }
  }
}

//----------------

class Under18Login {
  constructor(user) {
    this.successPath = "/home";
    this.user = user;
  }
  authenticate(pw) {
    return UserAuth.isAuthenticatedBy(this.user.username, pw);
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
  authenticate(pw, cb) {
    UserAuth.authenticateWithFacebook(this.user.fb, pw, cb);
  }
}

class UserAuthController {
  login(user, pw) {
    let login = this.getLoginForUser(user);
    if (login instanceof Under18Login) {
      if (login.pastCurfew(new Date())) {
        return {redirect: "/curfew"};
      }
    }
    if (login instanceof FacebookLogin) {
      login.authenticate(pw, (err) => {
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

//--------------------

class UserAuthController {
  login(user, pw) {
    let login = this.getLoginForUser(user);
    let rejectionPath = login.getRejectionPath();
    if (rejectionPath) return {redirect: rejectionPath};

    if (login.authenicateAsync) {
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
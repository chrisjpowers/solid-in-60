class User {
  // ...
  renderWelcomeEmail() { new WelcomeEmail().render(this); }
  isAuthenticatedBy(pw) {
    return new UserAuth().isAuthenticatedBy(user.hashedPassword, pw);
  }
  // ...
}

class UserAuth {
  isAuthenticatedBy(hashedPw, pw) {
    return UserAuth.hash(UserAuth.salt(pw)) === hashedPw;
  }

  static salt(str) { return `${str}-salted`; }
  static hash(str) { return `${str}-hashed`; }
}

class WelcomeEmail {
  render(user) {
    return `
      Welcome, ${user.firstName}!
      We hope you enjoy your ${user.membershipType} membership.
      Thanks, Mgmt
    `;
  }
}
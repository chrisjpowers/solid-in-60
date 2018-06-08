class User {
  // ...
  renderWelcomeEmail() { new WelcomeEmail().render(this); }

  isAuthenticatedBy(pw) {
    return User.hash(User.salt(pw)) === this.hashedPassword;
  }

  static salt(str) { return `${str}-salted`; }
  static hash(str) { return `${str}-hashed`; }
  // ...
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
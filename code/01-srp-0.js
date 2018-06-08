class User {
  // ...
  renderWelcomeEmail() {
    return `
      Welcome, ${this.firstName}!
      We hope you enjoy your ${this.membershipType} membership.
      Thanks, Mgmt
    `;
  }

  isAuthenticatedBy(pw) {
    return User.hash(User.salt(pw)) === this.hashedPassword;
  }

  static salt(str) { return `${str}-salted`; }
  static hash(str) { return `${str}-hashed`; }
  // ...
}
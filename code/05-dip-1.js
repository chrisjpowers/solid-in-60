class MemberLogin {
  constructor(user, authStrategy) {
    this.successPath = "/home";
		this.user = user;
		this.authStrategy = authStrategy;
  }
  authenticate(pw) {
    return this.authStrategy.isAuthenticatedBy(this.user.hashedPassword, pw);
  }
}

class LousyHashedAuth {
  isAuthenticatedBy(hashedPw, pw) {
    return LousyHashedAuth.hash(LousyHashedAuth.salt(pw)) === hashedPw;
  }
  static salt(str) { return `${str}-salted`; }
  static hash(str) { return `${str}-hashed`; }
}
class TrialUser {
	constructor(user) { this.user = user; }
	trialKey() { ... }
	daysLeftInTrial() { ... }
}

class MemberUser {
	constructor(user) { this.user = user; }
	billingAddress() { ... }
	hashedPassword() { ... }
}

class AdminUser {
	constructor(user) { this.user = user; }
	ldapUser() { ... }
	loggedInAs() { ... }
}

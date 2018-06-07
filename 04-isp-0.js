class User {
	// ...
	trialKey() { ... }
	daysLeftInTrial() { ... }
	billingAddress() { ... }
	hashedPassword() { ... }
	ldapUser() { ... }
	loggedInAs() { ... }
	// ...
}

//------------------

class User {
	// Trial user only
	trialKey() { ... }
	daysLeftInTrial() { ... }
	// Member user only
	billingAddress() { ... }
	hashedPassword() { ... }
	// Admin user only
	ldapUser() { ... }
	loggedInAs() { ... }
}

//--------------------

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

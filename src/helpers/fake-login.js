export function fakeLogin(body) {
	let users = [{ id: 1, username: 'test', password: 'test', role: 'Admin' }];
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			// authenticate
			// find if any user matches login credentials
			let filteredUsers = users.filter(user => {
				return user.username === body.username && user.password === body.password;
			});

			if (filteredUsers.length) {
				// if login details are valid return user details and fake jwt token
				let user = filteredUsers[0];
				let responseJson = {
					id: user.id,
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					role: "Admin",
					token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlcnRoZW1lIiwiaWF0IjoxNTU1NjgyNTc1LCJleHAiOjE1ODcyMTg1NzUsImF1ZCI6ImNvZGVydGhlbWVzLmNvbSIsInN1YiI6InRlc3QiLCJmaXJzdG5hbWUiOiJIeXBlciIsImxhc3RuYW1lIjoiVGVzdCIsIkVtYWlsIjoidGVzdEBoeXBlci5jb2RlcnRoZW1lcy5jb20iLCJSb2xlIjoiQWRtaW4ifQ.8qHJDbs5nw4FBTr3F8Xc1NJYOMSJmGnRma7pji0YwB4'
				};
				resolve({ ok: true, data: responseJson });
			} else {
				// else return error
				reject('Username or password is incorrect');
			}
			return;
		}, 500)
	})
}
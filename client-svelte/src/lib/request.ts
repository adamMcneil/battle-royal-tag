function getBaseServerPath(): string | null {
	return localStorage.getItem('base_server_path');
}

export async function postJoinGame(name: string) {
	const request = await fetch(localStorage.getItem('base_server_path') + 'join', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			player: name
		})
	});
	return request;
}

export async function getGame() {
	const response: Response = await fetch(getBaseServerPath() + 'game', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
	return response;
}

export async function getShuffle() {
	const response: Response = await fetch(getBaseServerPath() + 'shuffle', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
	return response;
}

export async function getReset() {
	const response: Response = await fetch(getBaseServerPath() + 'reset', {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' }
	});
	return response;
}

export async function postKill(name: string) {
	const request = await fetch(localStorage.getItem('base_server_path') + 'kill', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			player: name
		})
	});
	return request;
}

export async function deletePlayerFromGame(game_name: string | null, name: string | null) {
	const response: Response = await fetch(getBaseServerPath() + game_name + '/exit', {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			player: name
		})
	});
	return response;
}

export async function deleteGame(game_name: string | null) {
	const response: Response = await fetch(getBaseServerPath() + game_name, {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	});
	return response;
}

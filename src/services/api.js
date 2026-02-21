const API_URL = import.meta.env.VITE_API_URL;

export async function buscarUsuarios() {
    const resposta = await fetch(`${API_URL}/users`);
    return resposta.json();
}

export async function cadastrarUsuarios(users) {
    return fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    });
}

export async function editarUsuario(id, users) {
    return fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    });
}

export async function excluirUsuario(id) {
    return fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE'
    });
}
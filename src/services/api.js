const API_URL = import.meta.env.VITE_API_URL;

export async function buscarUsuarios() {
    const resposta = await fetch(API_URL);
    return resposta.json();
}

export async function cadastrarUsuarios(users) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    });
}

export async function editarUsuario(id, users) {
    return fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(users)
    });
}

export async function excluirUsuario(id) {
    return fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
}
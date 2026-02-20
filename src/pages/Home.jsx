/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { buscarUsuarios, cadastrarUsuarios, excluirUsuario, editarUsuario } from "../services/api";
import '../styles/style.css'

export default function Home() {
    const [users, setUsers] = useState([]);

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha , setSenha] = useState('');

    const [usuarioEditando, setUsuarioEditando] = useState(null);

    const [mensagem, setMensagem] = useState('');
    const [tipoMensagem, setTipoMensagem] = useState('');

    function mostrarMensagem(texto, tipo) {
        setMensagem(texto);
        setTipoMensagem(tipo);

        setTimeout(() => {
            setMensagem('');
            setTipoMensagem('');
        }, 3000);
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    async function carregarUsuarios() {
        const dados = await buscarUsuarios();
        setUsers(dados);
    }

    async function handleCadastrar() {
        if (!nome || !email || !senha) {
            mostrarMensagem('Preencha todos os campos', 'erro');
            return;
        }

        await cadastrarUsuarios({ nome, email, senha });

        mostrarMensagem('Usuário cadastrado', 'sucesso');

        setNome('');
        setEmail('');
        setSenha('');

        carregarUsuarios();
    }

    function selecionarUsuario(user) {
        setUsuarioEditando(user);
        setNome(user.nome);
        setEmail(user.email);
        setSenha(user.senha);
    }

    async function handleEditar() {
        await editarUsuario(usuarioEditando._id, {
            nome,
            email,
            senha
        });
        mostrarMensagem('Usuário atualizado', 'sucesso');

        setUsuarioEditando(null);
        setNome('');
        setEmail('');
        setSenha('');

        carregarUsuarios();
    }

    async function handleExcluir(id) {
        const confirmar = window.confirm('Deseja excluir?');
        if (!confirmar) return;

        await excluirUsuario(id);
        mostrarMensagem('Usuário excluido', 'sucesso');
        carregarUsuarios();
    }

    return (
        <div className="container">
            <header>
                <h1>Cadastro de Usuários</h1>
            </header>

            <main className="body">

                <section className="form">
                    <input type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Nome" />
                    <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email" />
                    <input type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Senha" />
                    
                    {mensagem && (
                        <p className={`message ${tipoMensagem === 'erro' ? 'message-erro' : 'message-sucesso'}`}>
                            {mensagem}
                        </p>
                    )}
                    
                    {usuarioEditando ? (
                        <button className="btnForm salvar active" onClick={handleEditar}>Salvar</button> ) : ( <button className="btnForm cadastro active" onClick={handleCadastrar}>Cadastrar</button>)}
                </section>

                {users.map((user) => (
                    <div className="list" key={user._id}>
                        <p>Nome: {user.nome}</p>
                        <p>Email: {user.email}</p>

                        <div className="btns">
                            <button className="btn editar" onClick={() => selecionarUsuario(user)}>
                                Editar
                            </button>
                            <button className="btn excluir" onClick={() => handleExcluir(user._id)}>
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
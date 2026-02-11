import { useState } from 'react'
import './App.css'
import { LuCheck, LuTrash } from 'react-icons/lu'

interface IErro {
  active: boolean
  description: string
}

interface IEndereco {
  id: string
  nome: string
  rua: string
  numero: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  criadoEm: string
  ativo: boolean
  cadastrado: boolean
}

interface IAjustarEndereco {
  id: string
  tipo: "ATUALIZAR" | "EXCLUIR"
}

export function App() {
  const [valorDoInput, setValorDoInput] = useState({
    nome: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: ""
  })

  const [enderecos, setEnderecos] = useState<IEndereco[]>([])
  const [erro, setErro] = useState<IErro>({
    active: false,
    description: ""
  })
  const [mostrarModal, setMostrarModal] = useState<boolean>(false)
  const [idEnderecoSelecionado, setIdEnderecoSelecionado] = useState<string>("")

  function adicionarEndereco(): void {
    if (
      !valorDoInput.nome ||
      !valorDoInput.rua ||
      !valorDoInput.numero ||
      !valorDoInput.bairro ||
      !valorDoInput.cidade ||
      !valorDoInput.estado ||
      !valorDoInput.cep
    ) {
      setErro({
        active: true,
        description: "Todos os campos são obrigatórios."
      })
      return
    }

    const enderecoDuplicado = enderecos.filter(
      e =>
        e.rua.toLowerCase() === valorDoInput.rua.toLowerCase() &&
        e.numero === valorDoInput.numero &&
        e.cep === valorDoInput.cep
    )

    if (enderecoDuplicado.length > 0) {
      setErro({
        active: true,
        description: "Endereço já cadastrado."
      })
      return
    }

    const montarObjetoEndereco: IEndereco = {
      id: Math.random().toString(36).substring(2, 9),
      ...valorDoInput,
      criadoEm: new Date().toISOString(),
      cadastrado: true,
      ativo: true
    }

    setEnderecos(oldState => [...oldState, montarObjetoEndereco])
    setValorDoInput({
      nome: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: ""
    })
    setErro({ active: false, description: "" })
  }

  function ajustarEndereco({ id, tipo }: IAjustarEndereco): void {
    if (tipo === "ATUALIZAR") {
      setEnderecos(enderecos.map(endereco =>
        endereco.id === id ? { ...endereco, ativo: false } : endereco
      ))
    }

    if (tipo === "EXCLUIR") {
      setEnderecos(enderecos.filter(endereco => endereco.id !== id))
    }
  }

  return (
    <>
      <div className="card">
        <div className='input-wrapper'>
          <input
            placeholder="Nome"
            value={valorDoInput.nome}
            onChange={e => setValorDoInput({ ...valorDoInput, nome: e.target.value })}
          />

          <input
            placeholder="Rua"
            value={valorDoInput.rua}
            onChange={e => setValorDoInput({ ...valorDoInput, rua: e.target.value })}
          />

          <input
            placeholder="Número"
            value={valorDoInput.numero}
            onChange={e => setValorDoInput({ ...valorDoInput, numero: e.target.value })}
          />

          <input
            placeholder="Bairro"
            value={valorDoInput.bairro}
            onChange={e => setValorDoInput({ ...valorDoInput, bairro: e.target.value })}
          />

          <input
            placeholder="Cidade"
            value={valorDoInput.cidade}
            onChange={e => setValorDoInput({ ...valorDoInput, cidade: e.target.value })}
          />

          <input
            placeholder="Estado"
            value={valorDoInput.estado}
            onChange={e => setValorDoInput({ ...valorDoInput, estado: e.target.value })}
          />

          <input
            placeholder="CEP"
            value={valorDoInput.cep}
            onChange={e => setValorDoInput({ ...valorDoInput, cep: e.target.value })}
          />

          <p className='erro'>{erro.active && erro.description}</p>
        </div>

        <button onClick={adicionarEndereco}>Cadastrar Endereço</button>
      </div>

      <ul>
        {enderecos.map((endereco) => (
          <div className='item-list' key={endereco.id}>
            <li className={endereco.ativo ? '' : 'concluido'}>
              <strong>{endereco.nome}</strong><br />
              {endereco.rua}, {endereco.numero} – {endereco.bairro}<br />
              {endereco.cidade}/{endereco.estado} – CEP: {endereco.cep}
            </li>

            <LuTrash
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setIdEnderecoSelecionado(endereco.id)
                setMostrarModal(true)
              }}
            />

            <LuCheck
              style={{ cursor: 'pointer' }}
              onClick={() =>
                ajustarEndereco({ id: endereco.id, tipo: "ATUALIZAR" })
              }
            />
          </div>
        ))}
      </ul>

      {mostrarModal && (
        <div className='modal-wrapper'>
          <div className="modal">
            <h1>Remover Endereço</h1>
            <h3>Deseja confirmar a exclusão?</h3>
            <div className='modal-buttons'>
              <button onClick={() => setMostrarModal(false)}>NÃO</button>
              <button onClick={() => {
                ajustarEndereco({ id: idEnderecoSelecionado, tipo: "EXCLUIR" })
                setMostrarModal(false)
              }}>
                SIM
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

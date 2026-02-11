import { useState } from 'react'
import './App.css'

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
  cadastrado: boolean
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

    const enderecoDuplicado = enderecos.some(
      e =>
        e.rua.toLowerCase() === valorDoInput.rua.toLowerCase() &&
        e.numero === valorDoInput.numero &&
        e.cep === valorDoInput.cep
    )

    if (enderecoDuplicado) {
      setErro({
        active: true,
        description: "Endereço já cadastrado."
      })
      return
    }

    const novoEndereco: IEndereco = {
      id: Math.random().toString(36).substring(2, 9),
      ...valorDoInput,
      criadoEm: new Date().toISOString(),
      cadastrado: true
    }

    setEnderecos(old => [...old, novoEndereco])
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

  return (
    <>
      <div className="card">
        <div className="input-wrapper">
          <input placeholder="Nome" value={valorDoInput.nome}
            onChange={e => setValorDoInput({ ...valorDoInput, nome: e.target.value })} />

          <input placeholder="Rua" value={valorDoInput.rua}
            onChange={e => setValorDoInput({ ...valorDoInput, rua: e.target.value })} />

          <input placeholder="Número" value={valorDoInput.numero}
            onChange={e => setValorDoInput({ ...valorDoInput, numero: e.target.value })} />

          <input placeholder="Bairro" value={valorDoInput.bairro}
            onChange={e => setValorDoInput({ ...valorDoInput, bairro: e.target.value })} />

          <input placeholder="Cidade" value={valorDoInput.cidade}
            onChange={e => setValorDoInput({ ...valorDoInput, cidade: e.target.value })} />

          <input placeholder="Estado" value={valorDoInput.estado}
            onChange={e => setValorDoInput({ ...valorDoInput, estado: e.target.value })} />

          <input placeholder="CEP" value={valorDoInput.cep}
            onChange={e => setValorDoInput({ ...valorDoInput, cep: e.target.value })} />

          <p className="erro">{erro.active && erro.description}</p>
        </div>

        <button onClick={adicionarEndereco}>Cadastrar Endereço</button>
      </div>

      <ul className="lista-enderecos">
        {enderecos.map(endereco => (
          <li key={endereco.id}>
            <strong>{endereco.nome}</strong><br />
            {endereco.rua}, {endereco.numero} – {endereco.bairro}<br />
            {endereco.cidade}/{endereco.estado} – CEP: {endereco.cep}
          </li>
        ))}
      </ul>
    </>
  )
}

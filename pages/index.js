import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [dados, setDados] = useState({
    nome: "",
    cargo: "",
    email: "",
    telefone: "",
    linkedin: "",
    endereco: { rua: "", numero: "", bairro: "", cidade: "", cep: "" },
    formacoes: [{ curso: "", instituicao: "", periodo: "" }],
    habilidades: [""],
    cursos: [{ nome: "", instituicao: "", carga: "" }],
    experiencias: [{ empresa: "", cargo: "", periodo: "", descricao: "" }],
  });

  const router = useRouter();

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setDados({
      ...dados,
      endereco: {
        ...dados.endereco,
        [name]: value,
      },
    });
  };

  const handleItemChange = (campo, index, value, subcampo = null) => {
    const atualizado = [...dados[campo]];
    if (subcampo) {
      atualizado[index][subcampo] = value;
    } else {
      atualizado[index] = value;
    }
    setDados({ ...dados, [campo]: atualizado });
  };

  const adicionarCampo = (campo) => {
    const novos = {
      formacoes: { curso: "", instituicao: "", periodo: "" },
      experiencias: { empresa: "", cargo: "", periodo: "", descricao: "" },
      habilidades: "",
      cursos: { nome: "", instituicao: "", carga: "" },
    };
    setDados({ ...dados, [campo]: [...dados[campo], novos[campo]] });
  };

  const handleSubmit = () => {
    localStorage.setItem("curriculo", JSON.stringify(dados));
    router.push("/preview");
  };

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">CV Express</h1>

        {["nome", "cargo", "email", "telefone", "linkedin"].map((campo) => (
          <div key={campo}>
            <label className="label">{campo}</label>
            <input
              type="text"
              name={campo}
              value={dados[campo]}
              onChange={handleChange}
              className="input"
            />
          </div>
        ))}

        <div>
          <h2 className="label">Endereço</h2>
          {["rua", "numero", "bairro", "cidade", "cep"].map((campo) => (
            <input
              key={campo}
              type="text"
              name={campo}
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
              value={dados.endereco[campo]}
              onChange={handleEnderecoChange}
              className="input"
            />
          ))}
        </div>

        <div>
          <h2 className="label">Formação Acadêmica</h2>
          {dados.formacoes.map((f, i) => (
            <div key={i}>
              <input
                type="text"
                placeholder="Curso"
                className="input"
                value={f.curso}
                onChange={(e) =>
                  handleItemChange("formacoes", i, e.target.value, "curso")
                }
              />
              <input
                type="text"
                placeholder="Instituição"
                className="input"
                value={f.instituicao}
                onChange={(e) =>
                  handleItemChange("formacoes", i, e.target.value, "instituicao")
                }
              />
              <input
                type="text"
                placeholder="Período"
                className="input"
                value={f.periodo}
                onChange={(e) =>
                  handleItemChange("formacoes", i, e.target.value, "periodo")
                }
              />
            </div>
          ))}
          <button
            onClick={() => adicionarCampo("formacoes")}
            className="link-button"
          >
            + Adicionar formação
          </button>
        </div>

        <div>
          <h2 className="label">Experiência Profissional</h2>
          {dados.experiencias.map((e, i) => (
            <div key={i}>
              <input
                type="text"
                placeholder="Empresa"
                className="input"
                value={e.empresa}
                onChange={(ev) =>
                  handleItemChange("experiencias", i, ev.target.value, "empresa")
                }
              />
              <input
                type="text"
                placeholder="Cargo"
                className="input"
                value={e.cargo}
                onChange={(ev) =>
                  handleItemChange("experiencias", i, ev.target.value, "cargo")
                }
              />
              <input
                type="text"
                placeholder="Período"
                className="input"
                value={e.periodo}
                onChange={(ev) =>
                  handleItemChange("experiencias", i, ev.target.value, "periodo")
                }
              />
              <textarea
                placeholder="Descrição"
                className="textarea"
                value={e.descricao}
                onChange={(ev) =>
                  handleItemChange("experiencias", i, ev.target.value, "descricao")
                }
              />
            </div>
          ))}
          <button
            onClick={() => adicionarCampo("experiencias")}
            className="link-button"
          >
            + Adicionar experiência
          </button>
        </div>

        <div>
          <h2 className="label">Cursos</h2>
          {dados.cursos.map((curso, i) => (
            <div key={i}>
              <input
                type="text"
                placeholder="Curso"
                className="input"
                value={curso.nome}
                onChange={(e) =>
                  handleItemChange("cursos", i, e.target.value, "nome")
                }
              />
              <input
                type="text"
                placeholder="Instituição"
                className="input"
                value={curso.instituicao}
                onChange={(e) =>
                  handleItemChange("cursos", i, e.target.value, "instituicao")
                }
              />
              <input
                type="text"
                placeholder="Carga horária"
                className="input"
                value={curso.carga}
                onChange={(e) =>
                  handleItemChange("cursos", i, e.target.value, "carga")
                }
              />
            </div>
          ))}
          <button
            onClick={() => adicionarCampo("cursos")}
            className="link-button"
          >
            + Adicionar curso
          </button>
        </div>

        <div>
          <h2 className="label">Habilidades</h2>
          {dados.habilidades.map((h, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Habilidade ${i + 1}`}
              className="input"
              value={h}
              onChange={(e) =>
                handleItemChange("habilidades", i, e.target.value)
              }
            />
          ))}
          <button
            onClick={() => adicionarCampo("habilidades")}
            className="link-button"
          >
            + Adicionar habilidade
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="button"
          style={{ width: "100%" }}
        >
          Visualizar Currículo
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [dados, setDados] = useState({
    nome: "",
    cargo: "",
    email: "",
    telefone: "",
    linkedin: "",
    endereco: "",
    formacoes: [{ curso: "", instituicao: "", periodo: "" }],
    habilidades: [""],
    cursos: [""],
    experiencias: [{ empresa: "", cargo: "", periodo: "", descricao: "" }]
  });

  const router = useRouter();

  const handleChange = (e) => {
    setDados({ ...dados, [e.target.name]: e.target.value });
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
      cursos: ""
    };
    setDados({ ...dados, [campo]: [...dados[campo], novos[campo]] });
  };

  const handleSubmit = () => {
    localStorage.setItem("curriculo", JSON.stringify(dados));
    router.push("/preview");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">CV Express</h1>

        {/* Dados pessoais */}
        {["nome", "cargo", "email", "telefone", "linkedin", "endereco"].map((campo) => (
          <div className="mb-4" key={campo}>
            <label className="block text-sm font-medium mb-1 capitalize">{campo}</label>
            <input
              type="text"
              name={campo}
              value={dados[campo]}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        ))}

        {/* Formação Acadêmica */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Formação Acadêmica</h2>
          {dados.formacoes.map((f, i) => (
            <div key={i} className="mb-3">
              <input
                type="text"
                placeholder="Curso"
                className="w-full mb-1 border rounded px-3 py-2"
                value={f.curso}
                onChange={(e) => handleItemChange("formacoes", i, e.target.value, "curso")}
              />
              <input
                type="text"
                placeholder="Instituição"
                className="w-full mb-1 border rounded px-3 py-2"
                value={f.instituicao}
                onChange={(e) => handleItemChange("formacoes", i, e.target.value, "instituicao")}
              />
              <input
                type="text"
                placeholder="Período"
                className="w-full border rounded px-3 py-2"
                value={f.periodo}
                onChange={(e) => handleItemChange("formacoes", i, e.target.value, "periodo")}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => adicionarCampo("formacoes")}
            className="text-blue-600 text-sm"
          >
            + Adicionar formação
          </button>
        </div>

        {/* Experiências Profissionais */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Experiência Profissional</h2>
          {dados.experiencias.map((e, i) => (
            <div key={i} className="mb-3">
              <input
                type="text"
                placeholder="Empresa"
                className="w-full mb-1 border rounded px-3 py-2"
                value={e.empresa}
                onChange={(e) => handleItemChange("experiencias", i, e.target.value, "empresa")}
              />
              <input
                type="text"
                placeholder="Cargo"
                className="w-full mb-1 border rounded px-3 py-2"
                value={e.cargo}
                onChange={(e) => handleItemChange("experiencias", i, e.target.value, "cargo")}
              />
              <input
                type="text"
                placeholder="Período"
                className="w-full mb-1 border rounded px-3 py-2"
                value={e.periodo}
                onChange={(e) => handleItemChange("experiencias", i, e.target.value, "periodo")}
              />
              <textarea
                placeholder="Descrição"
                className="w-full border rounded px-3 py-2"
                value={e.descricao}
                onChange={(e) => handleItemChange("experiencias", i, e.target.value, "descricao")}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={() => adicionarCampo("experiencias")}
            className="text-blue-600 text-sm"
          >
            + Adicionar experiência
          </button>
        </div>

        {/* Cursos */}
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Cursos</h2>
          {dados.cursos.map((c, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Curso ${i + 1}`}
              className="w-full mb-2 border px-3 py-2 rounded"
              value={c}
              onChange={(e) => handleItemChange("cursos", i, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={() => adicionarCampo("cursos")}
            className="text-blue-600 text-sm"
          >
            + Adicionar curso
          </button>
        </div>

        {/* Habilidades */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Habilidades</h2>
          {dados.habilidades.map((h, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Habilidade ${i + 1}`}
              className="w-full mb-2 border px-3 py-2 rounded"
              value={h}
              onChange={(e) => handleItemChange("habilidades", i, e.target.value)}
            />
          ))}
          <button
            type="button"
            onClick={() => adicionarCampo("habilidades")}
            className="text-blue-600 text-sm"
          >
            + Adicionar habilidade
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Visualizar Currículo
        </button>
      </div>
    </div>
  );
}

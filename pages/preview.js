import { useEffect, useState, useRef } from "react";

export default function Preview() {
  const [dados, setDados] = useState(null);
  const curriculoRef = useRef();

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("curriculo");
    if (dadosSalvos) {
      setDados(JSON.parse(dadosSalvos));
    }
  }, []);

  const gerarPDF = () => {
    if (typeof window === "undefined") return;

    import("html2pdf.js").then((html2pdf) => {
      const elemento = curriculoRef.current;

      if (!elemento) {
        alert("Currículo não encontrado.");
        return;
      }

      const opt = {
        margin: 0.5,
        filename: "curriculo.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
      };

      html2pdf.default().set(opt).from(elemento).save();
    });
  };

  if (!dados) {
    return <p className="p-6">Carregando currículo...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto">
        <button
          type="button"
          onClick={gerarPDF}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Baixar PDF
        </button>

        <div
          ref={curriculoRef}
          className="bg-white p-6 rounded shadow-md text-gray-800"
        >
          <h1 className="text-2xl font-bold mb-2">{dados.nome}</h1>
          <p className="mb-1 font-semibold">{dados.cargo}</p>
          <p className="mb-1">{dados.email}</p>
          <p className="mb-1">{dados.telefone}</p>
          <p className="mb-1">{dados.linkedin}</p>
          <p className="mb-4">{dados.endereco}</p>

          {dados.formacoes?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Formação Acadêmica</h2>
              {dados.formacoes.map((form, i) => (
                <div key={i} className="mb-3">
                  <h3 className="font-bold">{form.curso}</h3>
                  <p className="italic text-sm">{form.instituicao} — {form.periodo}</p>
                </div>
              ))}
            </div>
          )}

          {dados.experiencias?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Experiências Profissionais</h2>
              {dados.experiencias.map((exp, i) => (
                <div key={i} className="mb-3">
                  <h3 className="font-bold">{exp.empresa}</h3>
                  <p className="italic text-sm">{exp.cargo} — {exp.periodo}</p>
                  <p className="text-sm">{exp.descricao}</p>
                </div>
              ))}
            </div>
          )}

          {dados.cursos?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Cursos</h2>
              <ul className="list-disc list-inside">
                {dados.cursos.map((curso, i) => (
                  <li key={i}>{curso}</li>
                ))}
              </ul>
            </div>
          )}

          {dados.habilidades?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Habilidades</h2>
              <ul className="list-disc list-inside">
                {dados.habilidades.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <footer className="text-center text-sm text-gray-500 mt-6">
          Criado por Sadira Oliveira · Parcerias: (35)98880-1235
        </footer>
      </div>
    </div>
  );
}

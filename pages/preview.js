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

  const gerarPDF = async () => {
    try {
      const html2pdf = await import("html2pdf.js");
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
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      await html2pdf.default().set(opt).from(elemento).save();
    } catch (error) {
      console.error("Erro ao gerar o PDF:", error);
    }
  };

  if (!dados) {
    return <p style={{ padding: "1.5rem" }}>Carregando currículo...</p>;
  }

  return (
    <div className="container">
      <div className="card">
        <button
          onClick={gerarPDF}
          className="button"
          style={{ marginBottom: "1rem" }}
        >
          Baixar PDF
        </button>

        <div ref={curriculoRef} style={{ color: "#1f2937" }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            {dados.nome}
          </h1>
          <p style={{ fontWeight: "600" }}>{dados.cargo}</p>
          <p>{dados.email}</p>
          <p>{dados.telefone}</p>
          <p>{dados.linkedin}</p>
          <p style={{ marginBottom: "1rem" }}>
            {dados.endereco?.rua}, {dados.endereco?.numero}, {dados.endereco?.bairro}, {dados.endereco?.cidade}, CEP {dados.endereco?.cep}
          </p>

          {dados.formacoes?.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 className="preview-label">Formação Acadêmica</h2>
              {dados.formacoes.map((form, i) => (
                <div key={i} style={{ marginBottom: "0.75rem" }}>
                  <p style={{ fontWeight: "bold" }}>{form.curso}</p>
                  <p style={{ fontStyle: "italic", fontSize: "0.875rem" }}>
                    {form.instituicao} — {form.periodo}
                  </p>
                </div>
              ))}
            </div>
          )}

          {dados.experiencias?.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 className="preview-label">Experiências Profissionais</h2>
              {dados.experiencias.map((exp, i) => (
                <div key={i} style={{ marginBottom: "0.75rem" }}>
                  <p style={{ fontWeight: "bold" }}>{exp.empresa}</p>
                  <p style={{ fontStyle: "italic", fontSize: "0.875rem" }}>
                    {exp.cargo} — {exp.periodo}
                  </p>
                  <p style={{ fontSize: "0.875rem" }}>{exp.descricao}</p>
                </div>
              ))}
            </div>
          )}

          {dados.cursos?.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 className="preview-label">Cursos</h2>
              {dados.cursos.map((curso, i) => (
                <div key={i} style={{ marginLeft: "1rem", marginBottom: "0.5rem" }}>
                  <p><strong>{curso.nome}</strong></p>
                  <p style={{ fontSize: "0.875rem" }}>
                    {curso.instituicao} — {curso.carga}h
                  </p>
                </div>
              ))}
            </div>
          )}

          {dados.habilidades?.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h2 className="preview-label">Habilidades</h2>
              <ul>
                {dados.habilidades.map((skill, i) => (
                  <li key={i} style={{ listStyle: "disc", marginLeft: "1rem" }}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <footer className="footer" style={{ marginTop: "2rem", textAlign: "center", fontSize: "0.875rem", color: "#6b7280" }}>
          Criado por Sadira Oliveira · Parcerias: (35) 98880-1235
        </footer>
      </div>
    </div>
  );
}

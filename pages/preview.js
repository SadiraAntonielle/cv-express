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
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.25rem" }}>
            {dados.nome}
          </h1>
          {dados.cargo && (
            <p style={{ fontWeight: "600", fontSize: "1rem", marginBottom: "0.5rem", color: "#4b5563" }}>
              {dados.cargo}
            </p>
          )}
          {dados.email && <p>{dados.email}</p>}
          {dados.telefone && <p>{dados.telefone}</p>}
          {dados.linkedin && <p>{dados.linkedin}</p>}
          {dados.endereco && <p style={{ marginBottom: "1rem" }}>{dados.endereco}</p>}

          {dados.formacoes?.some(f => f.curso || f.instituicao || f.periodo) && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h1 className="label">Formação Acadêmica</h1>
              {dados.formacoes.map((form, i) => (
                (form.curso || form.instituicao || form.periodo) && (
                  <div key={i} style={{ marginBottom: "0.75rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600" }}>{form.curso}</h3>
                    <p style={{ fontStyle: "italic", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                      {form.instituicao} — {form.periodo}
                    </p>
                  </div>
                )
              ))}
            </div>
          )}

          {dados.experiencias?.some(e => e.empresa || e.cargo || e.periodo || e.descricao) && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h1 className="label">Experiências Profissionais</h1>
              {dados.experiencias.map((exp, i) => (
                (exp.empresa || exp.cargo || exp.periodo || exp.descricao) && (
                  <div key={i} style={{ marginBottom: "0.75rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600" }}>{exp.empresa}</h3>
                    <p style={{ fontStyle: "italic", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                      {exp.cargo} — {exp.periodo}
                    </p>
                    <p style={{ fontSize: "0.875rem", marginBottom: "0.5rem" }}>{exp.descricao}</p>
                  </div>
                )
              ))}
            </div>
          )}

          {dados.cursos?.some(c => c.nome) && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h1 className="label">Cursos</h1>
              {dados.cursos.map((curso, i) => (
                curso.nome && (
                  <div key={i} style={{ marginBottom: "0.75rem" }}>
                    <h3 style={{ fontSize: "1rem", fontWeight: "600" }}>{curso.nome}</h3>
                    <p style={{ fontStyle: "italic", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                      {curso.instituicao} — {curso.carga}
                    </p>
                  </div>
                )
              ))}
            </div>
          )}

          {dados.habilidades?.some(h => h) && (
            <div style={{ marginBottom: "1.5rem" }}>
              <h1 className="label">Habilidades</h1>
              <ul>
                {dados.habilidades.map((skill, i) => (
                  skill && (
                    <li key={i} style={{ listStyle: "disc", marginLeft: "1rem" }}>
                      {skill}
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <footer className="footer">
        Criado por Sadira Oliveira · Parcerias: (35)98880-1235
      </footer>
    </div>
  );
}

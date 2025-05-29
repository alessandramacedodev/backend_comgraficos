import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

// Dados simulados de "bancoodonto.js"
const registros = [
  {
    tipoDoRegistro: "ante-mortem",
    conteudoLaudo: {
      tipoDenticao: "permanente",
      caracteristicasEspecificas: "coroas",
      regiao: "anterior",
    },
  },
  {
    tipoDoRegistro: "post-mortem",
    conteudoLaudo: {
      tipoDenticao: "permanente",
      caracteristicasEspecificas: "implante",
      regiao: "mandibula",
    },
  },
  {
    tipoDoRegistro: "ante-mortem",
    conteudoLaudo: {
      tipoDenticao: "mista",
      caracteristicasEspecificas: "restaurações",
      regiao: "mandibula",
    },
  },
  {
    tipoDoRegistro: "post-mortem",
    conteudoLaudo: {
      tipoDenticao: "permanente",
      caracteristicasEspecificas: "dentes ausentes",
      regiao: "mandibula",
    },
  },
  {
    tipoDoRegistro: "ante-mortem",
    conteudoLaudo: {
      tipoDenticao: "permanente",
      caracteristicasEspecificas: "implante",
      regiao: "posterior",
    },
  },
  {
    tipoDoRegistro: "post-mortem",
    conteudoLaudo: {
      tipoDenticao: "permanente",
      caracteristicasEspecificas: "pontes",
      regiao: "posterior",
    },
  },
  {
    tipoDoRegistro: "ante-mortem",
    conteudoLaudo: {
      tipoDenticao: "permanente",
      caracteristicasEspecificas: "dentes ausentes",
      regiao: "anterior",
    },
  },
];

// Função de contagem
const contarOcorrencias = (array, campo) => {
  const contagem = {};
  array.forEach((item) => {
    const valor =
      campo === "tipoDoRegistro" ? item[campo] : item.conteudoLaudo[campo];
    contagem[valor] = (contagem[valor] || 0) + 1;
  });
  return contagem;
};

// Dados para gráfico de barras (tipo de registro)
const tipoRegistroCount = contarOcorrencias(registros, "tipoDoRegistro");

const barData = {
  labels: Object.keys(tipoRegistroCount),
  datasets: [
    {
      label: "Tipo de Registro",
      data: Object.values(tipoRegistroCount),
      backgroundColor: ["rgba(255,99,132,0.6)", "rgba(54,162,235,0.6)"],
    },
  ],
};

// Dados para gráfico de pizza (tipo de dentição)
const denticaoCount = contarOcorrencias(registros, "tipoDenticao");

const pieData = {
  labels: Object.keys(denticaoCount),
  datasets: [
    {
      label: "Tipo de Dentição",
      data: Object.values(denticaoCount),
      backgroundColor: [
        "rgba(255, 205, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
        "rgba(153, 102, 255, 0.6)",
      ],
    },
  ],
};

// Dados para gráfico de linha (características específicas)
const caracteristicasCount = contarOcorrencias(
  registros,
  "caracteristicasEspecificas"
);

const lineData = {
  labels: Object.keys(caracteristicasCount),
  datasets: [
    {
      label: "Características Específicas",
      data: Object.values(caracteristicasCount),
      borderColor: "rgba(255,99,132,1)",
      backgroundColor: "rgba(255,99,132,0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const Barchart = () => {
  return (
    <div style={{ background: "#f8f9fa", padding: "2rem", borderRadius: "1rem" }}>
      <h2>Gráfico de Colunas: Tipo de Registro</h2>
      <Bar data={barData} options={chartOptions} />

      <h2 style={{ marginTop: "2rem" }}>Gráfico de Pizza: Tipo de Dentição</h2>
      <Pie data={pieData} options={chartOptions} />

      <h2 style={{ marginTop: "2rem" }}>Gráfico de Linha: Características Específicas</h2>
      <Line data={lineData} options={chartOptions} />
    </div>
  );
};

export default Barchart;

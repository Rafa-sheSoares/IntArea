# 📐 IntArea - Calculadora de Áreas entre Funções

<div align="center">

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.13-22B5BF?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-0.46-F56565?style=for-the-badge&logo=lucide&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Aplicação web interativa para cálculo numérico e plotagem visual de áreas sob curvas e regiões delimitadas entre funções em um plano cartesiano.**

[Sobre](#-sobre-o-projeto) •
[Funcionalidades](#-funcionalidades) •
[Fundamentação Matemática](#-fundamentação-matemática) •
[Tecnologias](#-tecnologias) •
[Como Executar](#-como-executar-o-projeto) •
[Equipe e Autores](#-equipe-e-autores)

</div>

---

## 📌 Sobre o Projeto

O **IntArea** é uma solução web intuitiva inspirada em ferramentas como o *GeoGebra*, projetada para auxiliar estudantes, professores e profissionais de engenharia e ciências exatas no estudo de **Cálculo Diferencial e Integral**.

A plataforma permite inserir expressões matemáticas personalizadas, definir intervalos de integração $[a, b]$, visualizar graficamente as curvas em tempo real e calcular com precisão a área da região delimitada através de métodos de integração numérica.

---

## 🚀 Funcionalidades

- 📈 **Plotagem Dinâmica de Funções:**
  - Renderização gráfica em tempo real das curvas no plano cartesiano com escala adaptativa.
  - Suporte a múltiplas funções simultâneas com diferenciação de cores.
- 🧮 **Avaliador de Expressões Matemáticas:**
  - Suporte a polinômios (`x^2`, `3*x + 1`), funções trigonométricas (`sin(x)`, `cos(x)`, `tan(x)`), raiz quadrada (`sqrt(x)`), exponenciais (`exp(x)`), logaritmos (`log(x)`) e módulo (`abs(x)`).
- 📐 **Cálculo de Área Numérica (Regra dos Trapézios):**
  - Aproximação numérica de alta precisão dividindo o intervalo em milhares de subintervalos.
  - Cálculo de área sob uma curva ou área compreendida **entre duas curvas distintas**.
- 💡 **Exemplos e Presets Integrados:**
  - Modelos pré-configurados para aprendizado rápido: *Triângulo linear*, *Parábola quadrática*, *Onda Senoidal*, *Região entre Curvas* e *Curva Exponencial*.
- 🎨 **Interface Moderna e Responsiva:**
  - Desenvolvida com **TailwindCSS** e componentes baseados no design system Radix UI.

---

## 🔬 Fundamentação Matemática

Para determinar a área delimitada por uma função contínua $f(x)$ no intervalo $[a, b]$, a ferramenta calcula a integral definida:

$$A = \int_{a}^{b} |f(x)| \, dx$$

Para regiões compreendidas entre duas funções $f(x)$ e $g(x)$:

$$A = \int_{a}^{b} |f(x) - g(x)| \, dx$$

O cálculo computacional é executado via **Regra dos Trapézios Composta** com $n = 5000$ iterações para garantir alta convergência e precisão:

$$A \approx \sum_{i=0}^{n-1} \frac{f(x_i) + f(x_{i+1})}{2} \cdot \Delta x \quad \text{onde} \quad \Delta x = \frac{b - a}{n}$$

---

## 🛠️ Tecnologias

- **Core & Runtime:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Visualização Gráfica:** [Recharts](https://recharts.org/) & [Plotly.js](https://plotly.com/javascript/)
- **Estilização & UI:** [TailwindCSS](https://tailwindcss.com/), PostCSS, [Lucide React Icons](https://lucide.dev/), Radix UI Primitives
- **Linguagem:** JavaScript (ES6+ / JSX)

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- Gerenciador de pacotes **npm** ou **yarn**

### 1. Clonar o Repositório
```bash
git clone https://github.com/Rafa-sheSoares/IntArea.git
cd IntArea
```

### 2. Instalar as Dependências
```bash
npm install
```

### 3. Executar o Servidor de Desenvolvimento
```bash
npm run dev
```

Abra o navegador e acesse: **`http://localhost:5173`**

### 4. Gerar Build de Produção
```bash
npm run build
```

---

## 👥 Equipe e Autores

Projeto desenvolvido em colaboração acadêmica por:

<div align="center">

| **Rafaela Soares** | **Gabriel Silva** | **Matheus Pereira** |
| :---: | :---: | :---: |
| <img src="src/imagens/rafa.png" width="100" style="border-radius: 50%" alt="Rafaela" /><br>[GitHub](https://github.com/Rafa-sheSoares) | <img src="src/imagens/gabriel.jpeg" width="100" style="border-radius: 50%" alt="Gabriel" /> | <img src="src/imagens/matheus.jpeg" width="100" style="border-radius: 50%" alt="Matheus" /> |

| **Breno Sousa** | **Antonio Lima** | **João Zache** |
| :---: | :---: | :---: |
| <img src="src/imagens/breno.jpeg" width="100" style="border-radius: 50%" alt="Breno" /> | <img src="src/imagens/antonio.jpeg" width="100" style="border-radius: 50%" alt="Antonio" /> | <img src="src/imagens/joao.jpeg" width="100" style="border-radius: 50%" alt="João" /> |

</div>

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais informações.

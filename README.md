# LBEdu — Tecnologia que transforma vidas

> Website oficial da iniciativa [lbedu.me](https://lbedu.me) — Conectando computadores recuperados e educação em inteligência artificial a quem mais precisa.

---

## 📌 Sobre a iniciativa

A **LBEdu** é uma iniciativa social baseada em São Paulo dedicada a democratizar o acesso à tecnologia e à educação digital:

- 💻 **Recuperação e Doação de Computadores**: Equipamentos em desuso são revisados, higienizados, equipados com sistemas otimizados e entregues para pessoas de baixa renda e pessoas com deficiência.
- 🤖 **Aulas Gratuitas de Inteligência Artificial**: Capacitação prática e acessível para que os beneficiários utilizem ferramentas de IA no dia a dia, nos estudos e no mercado de trabalho.
- 🤝 **Parcerias Corporativas**: Empresas doam computadores corporativos substituídos e recebem workshops e palestras de IA para suas equipes como contrapartida.

---

## 🚀 Tecnologias

O site foi construído com foco em performance, acessibilidade e design contemporâneo:

- **[React 19](https://react.dev/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Vite 7](https://vite.dev/)** + [`vite-plugin-singlefile`](https://github.com/richardtallent/vite-plugin-singlefile)
- **[Tailwind CSS v4](https://tailwindcss.com/)**
- **[Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)**, **[Anton](https://fonts.google.com/specimen/Anton)** & **[JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)**

---

## 🛠️ Como executar localmente

### Pré-requisitos

- Node.js (versão 20 ou superior recomendada)
- npm

### Passo a passo

1. Clone o repositório:
   ```sh
   git clone https://github.com/lbhubedu/lbedu.me.git
   cd lbedu.me
   ```

2. Instale as dependências:
   ```sh
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```

4. Acesse no navegador em `http://localhost:5173`.

---

## 📦 Build e Publicação

Para gerar o pacote estático para produção:

```sh
npm run build
```

Para visualizar o build localmente:

```sh
npm run preview
```

Os arquivos estáticos otimizados são gerados no diretório `dist/`.

### Deploy na Vercel

1. Importe o repositório `lbhubedu/lbedu.me` na [Vercel](https://vercel.com/).
2. O preset Vite será detectado automaticamente:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Não são necessárias variáveis de ambiente ou infraestrutura de backend.

---

## 📂 Estrutura do Projeto

```
lbedu.me/
├── public/                 # Favicon, imagens e assets públicos estáticos
│   ├── favicon.svg
│   ├── CNAME               # Configuração de domínio customizado (lbedu.me)
│   └── images/             # Fotos e ilustrações do projeto
├── src/
│   ├── App.tsx             # Componente raiz: seções, formulário de contato e navegação
│   ├── Brand.tsx           # Componentes de identidade visual e logo LBedu
│   ├── index.css           # Estilos globais, temas e tipografia com Tailwind CSS
│   ├── main.tsx            # Ponto de entrada React DOM
│   ├── three.tsx           # Ilustrações e efeitos 3D leves em CSS/SVG
│   └── utils/
│       └── cn.ts           # Utilitário de composição de classes (clsx + tailwind-merge)
├── index.html              # HTML base com meta tags, Open Graph e tipografia
├── package.json            # Metadados e dependências do projeto
├── tsconfig.json           # Configuração TypeScript
└── vite.config.ts          # Configuração do Vite e plugins
```

---

## ♿ Acessibilidade e Inclusão

- Navegação completa por teclado com atalhos de salto para conteúdo principal (`#top`).
- Indicador visual claro de foco (`focus-visible`).
- Menu mobile responsivo com fechamento pela tecla `Escape` e backdrop acessível.
- Suporte total a `prefers-reduced-motion` com botão no rodapé para pausar animações.
- Textos alternativos (`alt`) descritivos em todas as imagens.

---

## 🔒 Privacidade e Contato

- O formulário de contato processa todos os dados localmente no navegador e prepara a mensagem diretamente para o cliente de e-mail do usuário (`lb@lbedu.me`, com cópia para `lbedu.me@gmail.com`).
- Opção integrada para copiar o texto formatado para a área de transferência.
- Nenhum dado pessoal é transmitido para servidores de terceiros ou armazenado em banco de dados.

---

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE).
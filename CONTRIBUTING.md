# Contribuindo com o site da LBEdu

Obrigado pelo interesse em ajudar a tornar a tecnologia mais acessível. Você pode sugerir melhorias, relatar problemas ou propor alterações no código.

## Antes de começar

Confira a [licença do repositório](LICENSE), incluindo as condições sobre marca, identidade visual, textos e imagens. Ao relatar um problema, descreva o que aconteceu e, se possível, os passos para reproduzi-lo. Evite compartilhar dados pessoais ou informações confidenciais.

## Preparar o ambiente

Você precisará de npm e de uma versão do Node.js compatível com a versão do Vite indicada no `package.json`.

```bash
git clone https://github.com/lbhubedu/lbedu.me.git
cd lbedu.me
npm install
npm run dev
```

Abra o endereço exibido no terminal para visualizar o site localmente.

## Fazer uma alteração

1. Crie uma branch para sua contribuição.
2. Faça uma alteração focada e verifique seu funcionamento no navegador.
3. Gere e confira o pacote de produção:

   ```bash
   npm run build
   npm run preview
   ```

4. Abra um pull request explicando o que mudou e como você verificou a alteração. Para mudanças visuais, inclua imagens quando ajudarem na revisão.

Considere navegação por teclado, textos claros, uso em dispositivos móveis e preferências de movimento reduzido ao propor melhorias de interface.
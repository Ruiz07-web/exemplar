# Agência Exemplo — Sites e Soluções Digitais

Site institucional moderno, responsivo e acessível, desenvolvido em HTML, CSS e JavaScript puro.

## Estrutura do Projeto

```
AutoEnergisa/
├── index.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   └── vendor.js
│   └── img/
│       ├── C.png
│       ├── contabilidade.jpg
│       ├── dev.png
│       ├── direito.jpg
│       ├── empresa.png
│       ├── guincho.jpg
│       ├── image.png
│       ├── img.jpg
│       ├── locacao.jpg
│       └── apple-touch-icon.png
```

## Como rodar localmente

1. Clone o repositório:
   ```sh
   git clone <url-do-seu-repo>
   ```
2. Abra a pasta do projeto.
3. Clique duas vezes em `index.html` ou use um servidor local:
   ```sh
   # Com Python
   python -m http.server 8080
   # Com Node.js
   npx serve .
   ```

## Personalização

- Substitua as imagens da pasta `assets/img` pelas suas próprias.
- Edite textos, contatos e links em `index.html`.
- Ajuste cores e fontes em `assets/css/styles.css`.
- Adicione bibliotecas externas em `assets/js/vendor.js` se necessário.

## Funcionalidades

- Navegação SPA por âncoras
- Menu mobile acessível
- Formulário de contato com validação e consentimento LGPD
- Botão "Voltar ao topo"
- Layout responsivo e acessível (WCAG 2.1 AA)
- SEO básico e metatags sociais

## Publicação

- Suba o projeto para GitHub Pages, Netlify ou Vercel.
- Atualize o domínio canônico e URLs de imagens OG em `index.html` após publicar.

## Licença

Este projeto é livre para uso e adaptação.  
Consulte a licença do repositório para mais detalhes.

---

> Dúvidas ou sugestões? Abra uma issue ou entre em
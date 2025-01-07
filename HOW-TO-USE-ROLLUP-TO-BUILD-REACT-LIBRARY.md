# Como usar o `rollup` para gerar pacote de bibliotecas react

## Rollup
### O Rollup é uma ferramenta de empacotamento de módulos JavaScript (bundler) que permite reunir e otimizar código para produção. Ele converte módulos ES6+ em formatos compatíveis com navegadores e servidores.
### Características:
#### 1. Suporte a ES6+: Rollup suporta sintaxe moderna de JavaScript.
#### 2. Empacotamento: Reúne módulos num arquivo único.
#### 3. Otimização: Minifica e compacta código.
#### 4. Tree Shaking: Remove código desnecessário.
#### 5. Compatibilidade: Gera códigos compatíveis com navegadores e servidores.
#### 6. Plug-ins: Suporta extensões para funcionalidades adicionais.
### Vantagens
#### 1. Melhor performance.
#### 2. Redução de tamanho do código.
#### 3. Simplificação da gestão de dependências.
#### 4. Suporte a módulos ES6+.
#### 5. Facilita deploy.
### Uso comum
#### 1. Desenvolvimento de bibliotecas JavaScript.
#### 2. Criação de aplicativos web.
#### 3. Otimização de código legado.
#### 4. Integração com frameworks (React, Angular, Vue.js).
### Comparação com outras ferramentas
#### 1. Webpack: Mais complexo, mas com mais recursos.
#### 2. Parcel: Mais rápido, mas com menos configurações.
#### 3. Gulp: Focado em tarefas automatizadas.

## CLI
### Para usá-lo globalmente, você deve instalar o repositório rollup globalmente. Você pode usar o comando abaixo:
```sh
  npm install rollup --global 
```
----
#### obs: Mesmo instalando de forma global é necessário instalar no projeto.
```sh
  npm install rollup -D 
```

## Configuração
### Após instalar o rollup é necessário realizar algumas configurações básicas.
### No `package.json` , vamos adicionar o script de execução
```
  "build": "rollup -c", 
```
### Depois vamos criar o arquivo de configuração chamado rollup.config.mjs na raiz do projeto.
### Vamos primeiramente instalar algumas bibliotecas para nos auxiliar:
#### `glob`: Vai nos ajudar a buscar e acessar arquivos de forma mais simples.
```sh
  npm install glob -D 
```
#### `@rollup/plugin-typescript`: É uma extensão oficial do rollup para suportar typescript.
```sh
  npm install @rollup/plugin-typescript -D 
```
#### `rollup-plugin-postcss`: É uma extensão do rollup que permite processar arquivos CSS com PostCSS.
```sh
  npm install rollup-plugin-postcss -D 
```
#### `rollup-plugin-sass`: É uma extensão do Rollup que permite compilar arquivos Sass (SCSS) em CSS, integrando-o com o fluxo de build do Rollup.
```sh
  npm install rollup-plugin-sass -D 
```
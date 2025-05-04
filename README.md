# 💇‍♀️ Tamy Salão

Projeto desenvolvido com [Ionic](https://ionicframework.com/) + [Angular](https://angular.io/) para o gerenciamento de agendamentos, serviços e clientes do salão **Tamy Salão**.

## 🧰 Tecnologias Utilizadas

* **Node.js**: v20.x
* **Ionic Framework**
* **Angular**: v17+
* **Capacitor** para funcionalidades nativas (Android/iOS)

## ✅ Pré-requisitos

Antes de começar, instale os seguintes itens:

* **Node.js** v20: [https://nodejs.org/en](https://nodejs.org/en)
* **Ionic CLI** (global)

  ```bash
  npm install -g @ionic/cli
  ```

## 📆 Instalação

Clone o repositório e instale as dependências com:

```bash
npm install --force
```

> ⚠️ O uso de `--force` é necessário para forçar a instalação de dependências com versões conflitantes.

## ▶️ Executando o Projeto

Para rodar em ambiente de desenvolvimento:

```bash
ionic serve
```

Para rodar em dispositivo/emulador:

```bash
ionic cap run android
# ou
ionic cap run ios
```

Para rodar em browser:

```bash
ionic serve
```

## 📤 Build

Para gerar a build de produção:

```bash
ionic build --prod
```

## 📲 Publicação com Capacitor

Após o build, sincronize com o Capacitor:

```bash
npx cap sync
```

## 📝 Licença

Este projeto é de uso privado para o salão **Tamy Salão**. Todos os direitos reservados.

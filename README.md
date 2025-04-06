# PROJETO PRÁTICO PARA O PROCESSO SELETIVO DA **SEPLAG**

# VAGA: Frontend Pleno

### Nome: **Thássyus Fabiano M de A Carvalho**

### CPF: 038.682.661-78

### Framework utilizado: **Angular 17**

### Bibliotecas utilizadas:

- Tailwindcss: estilização css
- ngx-mask: mascaras para entrada de dados
- ngx-toastr: apresentação de mensagens ao usuário

---

# COMO FAZER O TESTE DA APLICAÇÃO

- [1. Sem precisar do Docker](#1-sem-precisar-do-docker)
- [2. Usando Docker com imagem que esta no DockerHub](#2-usando-docker-com-imagem-que-esta-no-dockerhub)
- [3. Usando Docker com imagem salva do respositório do github](#3-usando-docker-com-imagem-salva-do-respositório-do-github)

## 1. Sem precisar do Docker

Acesse o endereço https://thassyus.github.io/proc-sel-seplag

---

## 2. Usando Docker com imagem que esta no DockerHub

siga os passos abaixo:

### a. Baixe a imagem :

```
docker pull thassyus/proc-sel-seplag:latest
```

### b. Levante o container

```
docker run -d -it -p 80:80 thassyus/proc-sel-seplag
```

### c. Teste a aplicação

Clique em qualquer link dos abaixo e será aberto o navegador com a aplicação rodando:

[http://localhost](http://localhost)  
**ou**  
[http://127.0.0.1](http://127.0.0.1)

---

## 3. Usando Docker com imagem salva do respositório do github

### a. Clone o repositório

```
git clone https://github.com/Thassyus/proc-sel-seplag.git
```

### b. entre na pasta do projeto

```
cd proc-sel-seplag
```

### c. Carregue a imagem

```
docker load -i proc-sel-seplag.tar
```

### d. Levante o container

```
docker run -d -it -p 80:80 proc-sel-seplag
```

### e. Teste a aplicação

Clique em qualquer link dos abaixo e será aberto o navegador com a aplicação rodando:

[http://localhost](http://localhost)  
**ou**  
[http://127.0.0.1](http://127.0.0.1)

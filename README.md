# PokeMesh

Projeto experimental para estudar sistemas distribuídos utilizando **Node.js, TypeScript e Express.js**, explorando comunicação HTTP entre serviços, autenticação centralizada (SSO), autorização, escalabilidade, infraestrutura e segurança de APIs.

## Desafio prático: Sistemas Distribuídos, Serviços e SSO

A proposta do desafio é compreender, na prática, como diferentes serviços de um sistema distribuído se comunicam e compartilham recursos, autenticação e permissões.

Um exemplo é utilizar **SSO (Single Sign-On)**, um mecanismo de autenticação que permite ao usuário acessar diferentes sistemas realizando login apenas uma vez.

### Exemplo prático: Sistema Pokémon

Desenvolver dois sistemas independentes e, posteriormente, um serviço de autenticação:

- **Pokémon Service (Servidor A):** responsável pelo cadastro e gerenciamento de Pokémon.
- **Pokédex Service (Servidor B):** responsável pela consulta de Pokémon.
- **Auth Service (futuro):** responsável pela autenticação e identidade dos usuários.

O objetivo é permitir que o usuário se autentique em um dos sistemas e acesse o outro sem precisar realizar login novamente.

Além da autenticação, será necessário implementar **autorização**, garantindo que cada usuário tenha acesso somente às funcionalidades permitidas. Por exemplo, quem não possui permissão para cadastrar Pokémon não deverá visualizar os botões de cadastro e, caso tente acessar a funcionalidade diretamente, deverá receber uma resposta de acesso negado.

### Arquitetura e comunicação entre serviços

O projeto começa com dois serviços independentes, desenvolvidos com **Node.js, TypeScript e Express.js**, executados localmente em portas distintas.

As escolhas iniciais são:

- **Comunicação:** HTTP, utilizando APIs REST.
- **Formato dos dados:** JSON.
- **Organização:** serviços independentes dentro de um mesmo repositório.
- **Execução:** cada serviço pode ser iniciado individualmente utilizando `npm run dev`.

A arquitetura evoluirá gradualmente, conforme novos conceitos forem estudados e novas necessidades surgirem.

### Integração e sincronização com a PokéAPI

Uma das funcionalidades futuras do PokeMesh será a integração com a **PokéAPI**, permitindo importar e sincronizar os 151 Pokémon da primeira geração com o banco de dados local.

Inicialmente, a sincronização poderá ser realizada por um endpoint do Pokémon Service, evoluindo conforme a necessidade.

Essa funcionalidade permitirá explorar conceitos como:

- **Integração com APIs externas:** consumo e processamento de dados HTTP.
- **Sincronização de dados:** importação, atualização e prevenção de registros duplicados.
- **Processamento em lotes:** controle da quantidade de requisições simultâneas.
- **Resiliência:** tratamento de falhas e indisponibilidade da API externa.
- **Automação:** execução periódica da sincronização, sem necessidade de intervenção manual.

Futuramente, também será possível avaliar a separação dessa responsabilidade em um serviço independente.

O objetivo é compreender os desafios de manter dados sincronizados entre sistemas, preservando a consistência e evitando dependências desnecessárias de serviços externos.

## Funcionalidades e Evoluções Futuras

O PokeMesh será desenvolvido de forma incremental, partindo de serviços simples até um ambiente distribuído com autenticação, persistência, escalabilidade e automação.

As principais evoluções planejadas são:

- **Comunicação entre serviços:** permitir que o Pokédex Service consulte os Pokémon cadastrados no Pokémon Service utilizando HTTP.
- **Persistência com PostgreSQL:** armazenar os dados de forma permanente, permitindo que diferentes instâncias trabalhem com as mesmas informações.
- **Autenticação centralizada (SSO):** implementar um mecanismo de login único para acessar diferentes sistemas.
- **Autorização e permissões:** controlar quais funcionalidades cada usuário pode acessar.
- **Containerização com Docker:** executar cada serviço em seu próprio container e utilizar Docker Compose para iniciar todo o ambiente com um único comando.
- **Proxy reverso com NGINX:** centralizar o acesso aos serviços e reduzir a exposição desnecessária dos componentes internos.
- **Escalabilidade com PM2:** explorar a execução de múltiplos processos Node.js utilizando Cluster Mode.
- **Escalabilidade com Docker e NGINX:** executar múltiplas instâncias dos serviços e distribuir as requisições entre elas.
- **Testes de carga e desempenho:** simular diferentes volumes de requisições, identificar gargalos e comparar estratégias de escalabilidade.
- **CI/CD com GitHub Actions:** automatizar testes, builds, publicação de imagens Docker e, futuramente, o deploy da aplicação.
- **Resiliência e observabilidade:** estudar tratamento de falhas, logs, monitoramento e disponibilidade dos serviços.
- **Segurança da infraestrutura:** analisar a superfície de ataque e aplicar práticas para proteger a comunicação e os componentes internos.

Essas funcionalidades representam possibilidades de evolução, não requisitos que precisam ser implementados de uma só vez.

### Uma provocação sobre escalabilidade

> **"Se uma API Node.js precisa escalar, a solução é deixar de usar Node.js?"**

Essa pergunta surgiu de um relato sobre uma entrevista técnica em que a resposta esperada para escalar uma aplicação Node.js era simplesmente não utilizar Node.js.

Mas será que a linguagem é realmente o problema? Ou a resposta depende da arquitetura, da natureza da aplicação e dos gargalos encontrados?

Uma das propostas do PokeMesh é justamente explorar essa questão na prática: testar diferentes estratégias, compreender as limitações do Node.js e entender quando escalar processos, distribuir containers ou até reconsiderar a tecnologia utilizada.

**O objetivo não é provar que Node.js é a melhor ferramenta para tudo, mas aprender a identificar quando ele é a ferramenta certa.**

### Segurança e infraestrutura

Uma das evoluções será executar os serviços em containers Docker e analisar os riscos de expor diretamente cada componente da aplicação.

A partir disso, será possível estudar como um proxy reverso, redes internas e outras práticas de infraestrutura podem reduzir a superfície de ataque.

O projeto também permitirá experimentar diferentes configurações de execução e distribuição de carga, observando seus impactos no desempenho e na disponibilidade dos serviços.

### Escalabilidade e sobrecarga do banco de dados

Aumentar o número de instâncias de uma aplicação pode melhorar sua capacidade de atender requisições, mas também pode gerar um novo problema: **a sobrecarga do banco de dados**.

Antes de simplesmente aumentar os recursos do banco ou adotar soluções mais complexas, existem estratégias que podem ser exploradas:

- **Otimização de consultas SQL:** identificar consultas lentas, analisar planos de execução e reduzir operações desnecessárias.
- **Indexação:** utilizar índices adequados para melhorar o desempenho das consultas.
- **Views e Materialized Views:** explorar formas de organizar consultas e, quando apropriado, armazenar resultados pré-calculados.
- **Cache com Redis:** reduzir consultas repetitivas ao banco de dados.
- **Connection Pooling:** gerenciar as conexões para evitar consumo excessivo de recursos.

O PokeMesh também poderá explorar essas estratégias, identificando gargalos e avaliando como o aumento de instâncias afeta o banco de dados.

**Afinal, de que adianta escalar uma aplicação se todas as instâncias acabam sobrecarregando a mesma dependência?**

## Objetivo final

Entender como sistemas distribuídos funcionam além da simples divisão de uma aplicação em vários servidores, explorando comunicação, autenticação, autorização, persistência, infraestrutura, segurança e escalabilidade.

Mais do que implementar funcionalidades, o PokeMesh busca desenvolver uma compreensão prática das **decisões arquiteturais, seus benefícios, limitações e consequências**.

Embora nem toda aplicação precise de uma arquitetura distribuída, compreender seus fundamentos é importante para desenvolver sistemas preparados para diferentes necessidades e cenários de crescimento.

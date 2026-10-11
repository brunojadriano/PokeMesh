# PokeMesh

Projeto experimental para estudar sistemas distribuídos utilizando Node.js e TypeScript, explorando comunicação entre serviços, autenticação centralizada (SSO), autorização, infraestrutura com Docker e segurança de APIs.

## Desafio prático: Sistemas Distribuídos, Serviços e SSO

A proposta do desafio é compreender, na prática, como diferentes serviços de um sistema distribuído se comunicam e compartilham recursos, autenticação e permissões.

Um exemplo simples é utilizar **SSO (Single Sign-On)**, um mecanismo de autenticação que permite ao usuário acessar diferentes sistemas realizando login apenas uma vez.

### Exemplo prático: Sistema Pokémon

Desenvolver dois sistemas independentes:

- **Servidor A:** responsável pelo cadastro de Pokémon.
- **Servidor B:** responsável pela consulta de Pokémon.
- **Serviço de autenticação:** responsável por autenticar usuários e fornecer uma identidade reconhecida pelos dois sistemas.

O usuário poderá se autenticar em qualquer um dos sistemas e acessar o outro sem precisar realizar login novamente.

Além da autenticação, será necessário implementar **autorização**, garantindo que cada usuário tenha acesso somente às funcionalidades permitidas. Por exemplo, quem não possui permissão para cadastrar Pokémon não deverá visualizar os botões de cadastro e, caso tente acessar a funcionalidade diretamente, deverá receber uma resposta de acesso negado.

### Arquitetura e comunicação entre serviços

A infraestrutura poderá começar com poucos serviços, executados localmente, e evoluir conforme a necessidade de granularidade, carga e utilização.

Durante o desenvolvimento, algumas decisões arquiteturais precisarão ser tomadas:

- **Comunicação:** HTTP ou sockets, por exemplo.
- **Formato dos dados:** JSON, Protocol Buffers ou outros formatos.
- **Infraestrutura:** utilizar Docker Compose para executar os serviços.
- **Segurança:** analisar quais componentes precisam estar acessíveis externamente.

### Evoluindo o desafio

Uma evolução interessante é iniciar o ambiente com todos os serviços expondo suas portas e realizar uma análise da **superfície de ataque**, identificando os riscos de segurança dessa abordagem.

A partir disso, implementar um **proxy reverso**, criando um ponto de entrada controlado e evitando a exposição desnecessária dos serviços internos.

Conforme o projeto crescer, também será possível explorar balanceamento de carga, escalabilidade, comunicação entre serviços, tolerância a falhas e observabilidade.

### Objetivo final

Entender como sistemas distribuídos funcionam além da divisão de uma aplicação em vários servidores, explorando autenticação centralizada, autorização, comunicação, infraestrutura e segurança.

Esse tipo de arquitetura aparece em diversos contextos, como fintechs, plataformas de saúde e sistemas corporativos. Embora nem toda aplicação precise ser distribuída, essa abordagem se tornou bastante comum na indústria de software.

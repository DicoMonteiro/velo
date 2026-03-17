# Documento de Casos de Teste - Velô Sprint

## Informações Gerais
- **Sistema:** Velô Sprint - Configurador de Veículo Elétrico
- **Perfil de Usuário:** Cliente (Usuário Comum)

---

## Módulo 1: Landing Page

### CT01 - Acessar Configurador a partir da Landing Page
#### Objetivo
Validar se o usuário consegue navegar da Landing Page para o Configurador com sucesso.
#### Pré-Condições
- O sistema deve estar no ar e acessível.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a página inicial (Landing Page) | A página é carregada corretamente com o botão de "Configurar" ou "Monte o seu" visível |
| 2  | Clicar no botão para iniciar a configuração | O sistema redireciona o usuário para a página do Configurador de Veículo |
#### Resultados Esperados
- O usuário é levado à página do Configurador sem erros.
#### Critérios de Aceitação
- A URL muda para a rota do configurador.
- A página do configurador carrega as opções base do veículo.

---

## Módulo 2: Configurador de Veículo

### CT02 - Cálculo do Preço Base e Adicionais (Fluxo Feliz)
#### Objetivo
Validar se o cálculo do preço do veículo é atualizado corretamente ao selecionar opções que alteram o valor.
#### Pré-Condições
- Estar na página do Configurador.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Verificar o preço inicial exibido | O preço inicial deve ser R$ 40.000 (valor base) |
| 2  | Selecionar as rodas "Sport" | O preço total deve ser atualizado para R$ 42.000 (+R$ 2.000) |
| 3  | Adicionar o pacote "Precision Park" | O preço total deve ser atualizado para R$ 47.500 (+R$ 5.500) |
| 4  | Adicionar o pacote "Flux Capacitor" | O preço total deve ser atualizado para R$ 52.500 (+R$ 5.000) |
| 5  | Desmarcar as rodas "Sport" voltando para "Aero" | O preço total deve ser atualizado para R$ 50.500 (-R$ 2.000) |
#### Resultados Esperados
- O sistema calcula rigorosamente a soma do valor base com os opcionais selecionados em tempo real.
#### Critérios de Aceitação
- Valor base é R$ 40.000.
- Rodas "Sport" custam exatamente +R$ 2.000.
- "Precision Park" custita exatamente +R$ 5.500.
- "Flux Capacitor" custa exatamente +R$ 5.000.

---

## Módulo 3: Checkout/Pedido e Análise de Crédito

### CT03 - Pagamento à Vista com Sucesso (Score > 700)
#### Objetivo
Validar a finalização de um pedido à vista para um cliente com Score alto (Aprovado direto).
#### Pré-Condições
- Estar na página de Checkout (Order) com um veículo configurado.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher os campos obrigatórios válidos (Nome, Email, Telefone, CPF, Loja) | Os campos não apresentam mensagens de erro |
| 2  | Selecionar o método de pagamento "À Vista" | A opção é selecionada e exibida sem juros |
| 3  | Marcar o checkbox de "Aceite os termos" | O botão de finalizar pedido é habilitado |
| 4  | Clicar em "Finalizar Pedido" usando um CPF associado a um Score > 700 | O pedido é processado e o usuário é redirecionado para a página de Confirmação |
#### Resultados Esperados
- O pedido é finalizado com status "Aprovado" instantâneo graças ao score > 700.
#### Critérios de Aceitação
- Todos os campos obrigatórios validados positivamente.
- Integração de crédito retorna aprovação imediata para Score > 700.

### CT04 - Pagamento Financiado (Cálculo de Juros de 2% a.m em 12x)
#### Objetivo
Validar se o cálculo da parcela do financiamento está aplicando a regra de juros compostos de 2% ao mês em 12 vezes.
#### Pré-Condições
- Estar na página de Checkout.
- Veículo configurado apenas com valor base (R$ 40.000) para facilitar o teste.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Selecionar o método de pagamento "Financiamento" | Exibe o campo de valor de entrada |
| 2  | Inserir valor de entrada igual a R$ 0 | O valor da entrada é processado, simulando financiamento integral |
| 3  | Verificar o valor calculado para as 12 parcelas | O valor da parcela deve refletir a fórmula de juros compostos com 2% a.m. |
#### Resultados Esperados
- O sistema informa corretamente o valor travado em 12x com a taxa definida.
#### Critérios de Aceitação
- O financiamento tem parcelamento fixo em 12x.
- A taxa de juros aplicada é de exatos 2% a.m em regime composto.

### CT05 - Financiamento com Entrada >= 50% (Aprovação Automática Ignorando Score)
#### Objetivo
Validar a regra de exceção em que a análise de crédito aprova automaticamente o pedido se a entrada for maior ou igual a 50% do valor total do veículo.
#### Pré-Condições
- Estar na página de Checkout com veículo configurado (ex: R$ 40.000).
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados pessoais válidos (usando CPF com Score <= 500) | Dados aceitos e validados |
| 2  | Selecionar método "Financiamento" | Campo de entrada é exibido |
| 3  | Informar valor de entrada de R$ 20.000 ou superior (>= 50% do total) | Valor de entrada é aceito e cálculo de parcelas é atualizado |
| 4  | Aceitar os termos e clicar em "Finalizar Pedido" | O sistema processa o pedido e redireciona para a página de Sucesso |
#### Resultados Esperados
- Pedido é finalizado com status de "Aprovado", contornando a recusa pelo Score baixo.
#### Critérios de Aceitação
- Entrada >= 50% aprova a compra automaticamente independente de outros fatores financeiros do usuário.

### CT06 - Pedido Reprovado por Score Baixo (Score <= 500)
#### Objetivo
Validar o fluxo em que o usuário tem o crédito negado devido a um score baixo na opção de financiamento com baixa entrada.
#### Pré-Condições
- Estar na página de Checkout com veículo de R$ 40.000.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher dados pessoais válidos com CPF associado a perfil de Score <= 500 | Dados validados |
| 2  | Selecionar método "Financiamento" com valor de entrada de R$ 5.000 (menos de 50%) | Método de pagamento aceito |
| 3  | Aceitar os termos e clicar em "Finalizar Pedido" | O sistema exibe o status final ou recusa explícita por crédito reprovado |
#### Resultados Esperados
- O pedido fica com status "Reprovado" e o cliente recebe a informação sobre a análise de crédito.
#### Critérios de Aceitação
- Score <= 500 com entrada < 50% resulta em reprovação imediata.

### CT07 - Pedido Em Análise por Score Intermediário (Score 501 a 700)
#### Objetivo
Validar que a API reflete corretamente o status "Em Análise" para clientes que caem na faixa de score intermediária.
#### Pré-Condições
- Estar na página de Checkout.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Preencher com CPF associado a Score entre 501 e 700 | Dados validados |
| 2  | Selecionar "À Vista" ou "Financiamento" com entrada < 50% | Método selecionado |
| 3  | Aceitar termos e finalizar | Sistema registra o pedido e redireciona ao Sucesso |
#### Resultados Esperados
- O sistema finaliza o pedido, mas o status gerado deverá ser "Em Análise" até aprovação manual/interna.
#### Critérios de Aceitação
- A tela de conformação e consulta deve exibir claramente "Em Análise" (com ícone específico) conforme configuração do usuário.

### CT08 - Tentativa de Checkout com Dados Inválidos/Faltantes (Cenário Negativo)
#### Objetivo
Garantir que os formulários de checkout validam corretamente os dados inseridos, bloqueando a submissão até a correção.
#### Pré-Condições
- Estar na página de Checkout.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Deixar o campo "Nome" vazio ou com menos de 3 caracteres | Exibe erro: "Nome deve ter no mínimo 3 caracteres" |
| 2  | Inserir um Email em formato incorreto (ex: "cliente.com") | Exibe erro: "Email inválido" |
| 3  | Deixar o campo de Telefone incompleto (menos de 14 dígitos formatados) | Exibe erro: "Telefone inválido" |
| 4  | Deixar o CPF incompleto (menos de 14 dígitos formatados) | Exibe erro: "CPF inválido" |
| 5  | Não selecionar a loja de retirada | Exibe erro: "Selecione uma loja" |
| 6  | Não marcar o "Aceite os termos" | Botão inativo ou erro ao validar o checkbox "Aceite os termos" |
#### Resultados Esperados
- O formulário impede o envio dos dados e aponta as mensagens de erros em vermelho/logo abaixo dos inputs para correção imdediata.
#### Critérios de Aceitação
- Validador Zod dispara corretamente e nenhuma chamada de API é acionada indevidamente sem dados completos.

---

## Módulo 4: Confirmação e Consulta de Pedidos

### CT09 - Acessar Tela de Confirmação Após Pedido
#### Objetivo
Validar a tela exibida logo após a concretização de um pedido com sucesso.
#### Pré-Condições
- O usuário deve recém ter finalizado um pedido pela página de Checkout.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Concluir o pedido no Checkout | O sistema redireciona para a tela de Success (Confirmação) |
| 2  | Visualizar o identificador do pedido gerado | A tela exibe claramente o `order_number` e as instruções para o usuário copiar |
#### Resultados Esperados
- O número de rastreio (`order_number`) é exibido de forma proeminente ao cliente.
#### Critérios de Aceitação
- A navegação segue do Carrinho para a página de Sucesso sem perder o ID.
- O `order_number` exibido corresponde rigorosamente ao registro do banco.

### CT10 - Consultar Pedido Existente (Fluxo Feliz)
#### Objetivo
Validar se a funcionalidade de buscar pedido via Landing Page funciona com o código válido.
#### Pré-Condições
- O usuário possui um `order_number` válido existente no sistema.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Acessar a tela de Consulta de Pedidos | Tela de busca exibida com o campo de "Número do Pedido" |
| 2  | Digitar o `order_number` e clicar em "Buscar Pedido" | O sistema mostra um estado de carregamento "Buscando..." |
| 3  | Aguardar o fim do carregamento | O painel exibe as informações completas do veículo configurado, cliente, valor, pagamento e seu **Status Atual** |
#### Resultados Esperados
- O usuário encontra seu pedido e o status exato correspondente no banco de dados.
#### Critérios de Aceitação
- Renderização visual correta das imagens externas das rodas e cores do pedido.

### CT11 - Consultar Pedido Inexistente (Cenário Negativo)
#### Objetivo
Validar a resposta da consulta de um código falsificado ou inválido.
#### Pré-Condições
- Estar na página de Consulta de Pedidos.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Digitar um `order_number` inexistente (ex: `VLO-000BRX`) | O campo aceita e permite a busca |
| 2  | Clicar em "Buscar Pedido" | O sistema processa e aguarda retorno da API |
| 3  | Visualizar a resposta do componente | Exibe aviso informando "Pedido não encontrado. Verifique o número e tente novamente" |
#### Resultados Esperados
- Nenhuma informação sensível é exposta na tela de Consulta de Pedidos.
#### Critérios de Aceitação
- Confidencialidade garantida e tratamento seguro de erro proveniente do fallback do backend para números corrompidos.

### CT12 - Segurança de Regra: Consulta Exige Número do Pedido
#### Objetivo
Validar a regra que diz que a consulta requer preenchimento estrito e não pode retornar listas de clientes vazias ou predefinidas.
#### Pré-Condições
- Acessar a tela de Consulta de Pedidos aberta inicialmente.
#### Passos
| Id | Ação | Resultado Esperado |
|----|------|--------------------|
| 1  | Visualizar o botão "Buscar Pedido" com o input vazio | O botão está inabilitado (disabled) e não permite clique |
| 2  | Inserir apenas espaços em branco ou vazios | O comportamento persiste e evita qualquer request indevido para a base geral |
#### Resultados Esperados
- Prevenção eficiente de Listagens de pedidos por vias do fluxo normal de tela de Busca, blindando o número do pedido (`order_number`) obrigatório.
#### Critérios de Aceitação
- Campo validando e dependendo da existência de strings de caracteres para ativar o botão de Buscar Pedido.

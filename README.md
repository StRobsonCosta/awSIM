# 🧠 AWS Certification Simulator (SAA Level)

Simulador interativo de prova **AWS Certified Solutions Architect – Associate**, desenvolvido em **HTML + JavaScript**, com foco em **aprendizado ativo**, **repetição inteligente** e **experiência fiel à prova real**.

> Ideal para quem quer praticar no mesmo nível de dificuldade da certificação oficial da AWS.

---

## 🚀 Visão Geral

Este projeto simula uma prova digital da AWS, permitindo que o candidato:

- Responda questões **sem ver a resposta previamente**
- Receba **feedback imediato e educativo**
- Seja obrigado a **revisitar questões erradas** até dominá-las
- Aprenda o *porquê* da resposta correta, não apenas o gabarito

O simulado **só termina quando todas as questões forem acertadas**.

---

## 🎯 Objetivos do Projeto

- Reproduzir a **experiência cognitiva da prova AWS**
- Forçar retenção real de conhecimento
- Eliminar o hábito de decorar respostas
- Criar um simulador **simples, offline e extensível**

---

## 🧩 Funcionalidades

- ✅ Questões no padrão **AWS SAA (nível real)**
- ✅ Interface limpa e objetiva
- ✅ Feedback imediato:
  - ✔️ **Acerto** → explicação + conteúdo complementar
  - ❌ **Erro** → resposta correta + justificativa
- 🔁 **Algoritmo de reaprendizagem**:
  - Questões erradas retornam automaticamente para o final da fila
  - O usuário precisa acertar **100%** para concluir
- 🧠 Aprendizado progressivo e cumulativo

---

## 🧠 Algoritmo de Reaprendizagem (Repetition Loop)

O núcleo do simulador segue o princípio:

> **Você só avança quando realmente aprende.**

### Funcionamento:

1. A questão é exibida
2. O usuário responde
3. Se **acertar**:
   - Recebe explicação + aprofundamento
   - A questão é removida da fila
4. Se **errar**:
   - A resposta correta é explicada
   - A questão volta para o final da lista
5. O processo se repete até que **todas sejam acertadas**

Esse modelo garante retenção e elimina falsos positivos de aprendizado.

---

## 🏗️ Estrutura do Projeto

```text
aws-certification-simulator/
│
├── index.html        # Interface do simulador
├── script.js         # Lógica do simulado + banco de questões
├── style.css         # (Opcional) Estilização
└── README.md         # Documentação do projeto
```

---

## 📦 Estrutura das Questões

As questões seguem um formato simples e extensível:

```js
{
  text: "Pergunta no estilo AWS",
  options: ["Opção A", "Opção B", "Opção C", "Opção D"],
  correct: [1],
  explanation: "Por que as outras opções estão erradas",
  extra: "Complemento conceitual para aprofundar o aprendizado"
}
```

- Suporte a expansão para **choose 2 / choose 3**
- Fácil adição de novos blocos de questões

---

## ▶️ Como Executar

### Requisitos
- Apenas um navegador moderno (Chrome, Firefox, Edge)

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/aws-certification-simulator.git
   ```

2. Abra o arquivo:
   ```text
   index.html
   ```

3. Comece a praticar 🚀

> Não é necessário backend, build ou dependências.

---

## 📚 Conteúdos Cobertos

- Alta disponibilidade (Multi-AZ, ALB, Route 53)
- Segurança (IAM, WAF, Shield, GuardDuty, KMS)
- Serverless (Lambda, Step Functions, EventBridge)
- Containers (ECS, EKS, Fargate)
- Storage (S3, EBS, EFS)
- Banco de dados (RDS, DynamoDB, Aurora, Redshift)
- Observabilidade (CloudWatch, X-Ray, CloudTrail)
- Custos e otimização

---

## 🛣️ Roadmap (Opcional)

- ⏱️ Timer de 130 minutos (modo prova oficial)
- 📊 Score final no padrão AWS
- 🧪 Modo simulado completo (feedback só no fim)
- 📱 Melhorias visuais
- 🔀 Questões de múltipla resposta

---

## ⚠️ Aviso Legal

Este projeto **não é afiliado à Amazon Web Services (AWS)**.

As questões são **autorais**, inspiradas no estilo da prova, criadas exclusivamente para fins educacionais.

---

## 👨‍💻 Autor

Projeto desenvolvido para estudo profundo e preparação real para certificações AWS.

Se este simulador te ajudou, ⭐ considere deixar uma estrela no repositório.

---

Boa prova e bons estudos ☁️🚀
// ================================
// SIMULADO AWS - LÓGICA PRINCIPAL
// ================================

let questions = [
{text:"Uma aplicação web precisa de alta disponibilidade. Qual a melhor abordagem?",options:["Usar EC2 em uma única AZ","Distribuir EC2 em múltiplas AZs com ALB","Aumentar o tamanho da instância","Usar Spot Instances apenas"],correct:[1],explanation:"Alta disponibilidade exige múltiplas AZs com balanceamento.",extra:"Esse é um princípio central do Well-Architected Framework."},
{text:"Qual serviço permite auditoria completa de chamadas de API na AWS?",options:["CloudWatch","AWS Config","CloudTrail","IAM"],correct:[2],explanation:"CloudTrail registra todas as chamadas de API.",extra:"Muito usado para compliance e segurança."},
{text:"Qual serviço é indicado para armazenar segredos com rotação automática?",options:["S3","Secrets Manager","SSM sem KMS","CloudWatch"],correct:[1],explanation:"Secrets Manager permite rotação automática.",extra:"Ideal para credenciais de banco de dados."},
{text:"Qual recurso permite failover automático em banco relacional?",options:["RDS Single-AZ","Read Replica","RDS Multi-AZ","Snapshot manual"],correct:[2],explanation:"Multi-AZ faz failover automático.",extra:"Read Replica é para leitura, não HA."},
{text:"Qual serviço protege aplicações contra ataques DDoS?",options:["AWS Shield","IAM","KMS","Inspector"],correct:[0],explanation:"AWS Shield protege contra DDoS.",extra:"Shield Standard já vem ativo por padrão."},
{text:"Qual serviço distribui conteúdo globalmente com baixa latência?",options:["S3","CloudFront","Route 53","ELB"],correct:[1],explanation:"CloudFront é uma CDN global.",extra:"Reduz latência e custo de transferência."},
{text:"Qual serviço fornece cache em memória gerenciado?",options:["RDS","DynamoDB","ElastiCache","SQS"],correct:[2],explanation:"ElastiCache fornece Redis/Memcached.",extra:"Muito usado para reduzir carga no banco."},
{text:"Qual prática segue o princípio do menor privilégio?",options:["Dar permissões administrativas","Usar policies restritivas","Usar usuário root","Compartilhar credenciais"],correct:[1],explanation:"Menor privilégio reduz riscos.",extra:"Fundamental em segurança na AWS."},
{text:"Qual serviço gerencia usuários finais com login social?",options:["IAM","Cognito","STS","Shield"],correct:[1],explanation:"Cognito gerencia autenticação de usuários finais.",extra:"Integra login social e JWT."},
{text:"Qual opção reduz custo para workloads estáveis?",options:["On-Demand","Spot","Reserved Instances","Mais instâncias"],correct:[2],explanation:"Reserved Instances reduzem custo a longo prazo.",extra:"Savings Plans também são cobrados na prova."},
{text:"Qual serviço permite execução serverless de containers?",options:["EC2","ECS com EC2","ECS Fargate","Lightsail"],correct:[2],explanation:"Fargate elimina gestão de servidores.",extra:"Muito cobrado como otimização operacional."},
{text:"Qual serviço fornece filas desacopladas e altamente escaláveis?",options:["SNS","SQS","Kinesis","Step Functions"],correct:[1],explanation:"SQS desacopla produtores e consumidores.",extra:"Essencial para arquiteturas resilientes."},
{text:"Qual banco NoSQL totalmente gerenciado oferece escalabilidade automática?",options:["RDS","Aurora","DynamoDB","Redshift"],correct:[2],explanation:"DynamoDB escala automaticamente.",extra:"Usado para workloads de baixa latência."},
{text:"Qual serviço armazena objetos com durabilidade de 11 noves?",options:["EBS","EFS","S3","FSx"],correct:[2],explanation:"S3 tem durabilidade extremamente alta.",extra:"Muito utilizado para backup e dados estáticos."},
{text:"Qual serviço monitora métricas e cria alarmes?",options:["CloudTrail","CloudWatch","Config","Inspector"],correct:[1],explanation:"CloudWatch monitora métricas e logs.",extra:"Essencial para observabilidade."}
];

let pending = [...questions];
let current = null;

const questionBox = document.getElementById("question-box");
const form = document.getElementById("answers-form");
const feedback = document.getElementById("feedback");
const progress = document.getElementById("progress");

function loadQuestion() {
  feedback.innerHTML = "";
  feedback.className = "";

  if (pending.length === 0) {
    questionBox.innerHTML = "🎉 Parabéns! Você acertou todas as questões!";
    form.innerHTML = "";
    document.getElementById("submit-btn").style.display = "none";
    progress.innerHTML = "Simulado finalizado com sucesso.";
    return;
  }

  current = pending[0];
  progress.innerHTML = `Questões restantes: ${pending.length}`;

  questionBox.innerHTML = current.text;
  form.innerHTML = "";

  current.options.forEach((opt, index) => {
    const id = `opt-${index}`;
    form.innerHTML += `
      <label>
        <input type="checkbox" name="answer" value="${index}" /> ${opt}
      </label>
    `;
  });
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every(v => b.includes(v));
}

document.getElementById("submit-btn").addEventListener("click", () => {
  const checked = [...document.querySelectorAll("input[name='answer']:checked")]
    .map(i => Number(i.value));

  if (checked.length === 0) return;

  if (arraysEqual(checked, current.correct)) {
    feedback.className = "correct";
    feedback.innerHTML = `✅ <strong>Correto!</strong><br>${current.extra}`;
    pending.shift(); // remove questão acertada
  } else {
    feedback.className = "wrong";
    const correctText = current.correct.map(i => current.options[i]).join(", ");
    feedback.innerHTML = `❌ <strong>Incorreto.</strong><br>
      Resposta correta: <em>${correctText}</em><br>
      Motivo: ${current.explanation}`;

    // move questão errada para o final da fila
    pending.push(pending.shift());
  }

  setTimeout(loadQuestion, 2000);
});

loadQuestion();


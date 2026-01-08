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
{text:"Qual serviço monitora métricas e cria alarmes?",options:["CloudTrail","CloudWatch","Config","Inspector"],correct:[1],explanation:"CloudWatch monitora métricas e logs.",extra:"Essencial para observabilidade."},
{
  text: "Uma aplicação precisa enviar notificações para milhares de usuários simultaneamente. Qual serviço é mais adequado?",
  options: ["SQS", "SNS", "SES", "EventBridge"],
  correct: [1],
  explanation: "SNS é um serviço de pub/sub projetado para enviar mensagens para múltiplos assinantes simultaneamente.",
  extra: "SNS é muito usado para fan-out, integrando com SQS, Lambda, SMS e e-mail."
},
{
  text: "Qual recurso permite comunicação privada entre uma VPC e serviços AWS sem usar a internet?",
  options: ["NAT Gateway", "Internet Gateway", "VPC Endpoint", "Elastic IP"],
  correct: [2],
  explanation: "VPC Endpoints permitem acesso privado a serviços AWS.",
  extra: "Muito cobrado quando o requisito é segurança e tráfego privado."
},
{
  text: "Qual serviço AWS permite orquestrar workflows serverless com estados e retries?",
  options: ["Lambda", "Step Functions", "SQS", "EventBridge"],
  correct: [1],
  explanation: "Step Functions orquestra fluxos complexos entre serviços.",
  extra: "Excelente para processos longos e tolerantes a falhas."
},
{
  text: "Qual estratégia reduz downtime durante deploys em produção?",
  options: ["Deploy direto", "Blue/Green Deployment", "Parar aplicação", "Aumentar TTL do DNS"],
  correct: [1],
  explanation: "Blue/Green permite alternar versões sem impacto ao usuário.",
  extra: "Canary deployment é uma variação muito cobrada na prova."
},
{
  text: "Qual serviço fornece balanceamento de carga na camada 7?",
  options: ["NLB", "ALB", "Route 53", "CloudFront"],
  correct: [1],
  explanation: "ALB opera na camada 7 (HTTP/HTTPS).",
  extra: "Ideal para aplicações web e microserviços."
},
{
  text: "Qual banco de dados AWS é mais indicado para workloads analíticos (OLAP)?",
  options: ["RDS MySQL", "DynamoDB", "Redshift", "Aurora"],
  correct: [2],
  explanation: "Redshift é otimizado para consultas analíticas em grandes volumes.",
  extra: "Muito usado em BI e Data Warehousing."
},
{
  text: "Qual serviço permite proteger APIs contra ataques como SQL Injection?",
  options: ["AWS Shield", "AWS WAF", "IAM", "KMS"],
  correct: [1],
  explanation: "AWS WAF filtra requisições HTTP maliciosas.",
  extra: "Frequentemente usado junto com CloudFront ou ALB."
},
{
  text: "Qual opção fornece criptografia em repouso automaticamente no S3?",
  options: ["SSE-S3", "HTTPS", "VPC Endpoint", "IAM Role"],
  correct: [0],
  explanation: "SSE-S3 usa chaves gerenciadas pela AWS.",
  extra: "SSE-KMS é usado quando há necessidade de controle de chaves."
},
{
  text: "Qual serviço registra mudanças de configuração dos recursos AWS?",
  options: ["CloudWatch", "CloudTrail", "AWS Config", "Inspector"],
  correct: [2],
  explanation: "AWS Config rastreia mudanças de configuração.",
  extra: "Muito usado para compliance e auditoria."
},
{
  text: "Qual recurso do RDS melhora escalabilidade de leitura?",
  options: ["Multi-AZ", "Read Replica", "Snapshot", "Parameter Group"],
  correct: [1],
  explanation: "Read Replicas distribuem carga de leitura.",
  extra: "Multi-AZ é para alta disponibilidade, não performance."
},
{
  text: "Qual serviço permite executar código sem provisionar servidores?",
  options: ["EC2", "ECS", "Lambda", "Lightsail"],
  correct: [2],
  explanation: "Lambda é serverless e executa código sob demanda.",
  extra: "Muito cobrado quando o foco é reduzir custo operacional."
},
{
  text: "Qual serviço AWS é indicado para migração de grandes volumes de dados offline?",
  options: ["DataSync", "Snowball", "S3 Transfer Acceleration", "FTP"],
  correct: [1],
  explanation: "Snowball é usado para migrações físicas de dados.",
  extra: "Ideal quando a internet é limitada ou o volume é muito grande."
},
{
  text: "Qual serviço fornece cache DNS altamente disponível?",
  options: ["CloudFront", "Route 53", "ELB", "API Gateway"],
  correct: [1],
  explanation: "Route 53 é um serviço DNS gerenciado.",
  extra: "Usa routing policies como latency e failover."
},
{
  text: "Qual recurso reduz latência de leitura no DynamoDB?",
  options: ["Read Replica", "DAX", "ElastiCache", "Aurora"],
  correct: [1],
  explanation: "DAX é um cache em memória para DynamoDB.",
  extra: "Usado para microssegundos de latência."
},
{
  text: "Qual prática reduz custos em workloads com uso imprevisível?",
  options: ["Reserved Instances", "Savings Plans", "On-Demand", "Spot Instances"],
  correct: [3],
  explanation: "Spot Instances oferecem grande economia.",
  extra: "Devem ser usadas apenas quando há tolerância à interrupção."
},
{
  text: "Uma aplicação precisa garantir baixa latência global para usuários distribuídos. Qual solução é mais adequada?",
  options: ["ALB em uma região", "CloudFront", "Route 53 com weighted routing", "Auto Scaling apenas"],
  correct: [1],
  explanation: "CloudFront distribui conteúdo por edge locations próximas aos usuários.",
  extra: "É a principal solução da AWS para performance global."
},
{
  text: "Qual serviço permite comunicação entre múltiplas VPCs de forma centralizada?",
  options: ["VPC Peering", "Transit Gateway", "Direct Connect", "NAT Gateway"],
  correct: [1],
  explanation: "Transit Gateway centraliza a conectividade entre VPCs e on-premises.",
  extra: "Muito usado em ambientes corporativos complexos."
},
{
  text: "Qual estratégia de backup permite recuperação ponto-a-ponto em bancos RDS?",
  options: ["Snapshots manuais", "Backups automáticos", "Read Replicas", "Multi-AZ"],
  correct: [1],
  explanation: "Backups automáticos permitem Point-in-Time Recovery.",
  extra: "Essencial para requisitos de RPO rigorosos."
},
{
  text: "Qual recurso do Route 53 permite failover automático entre regiões?",
  options: ["Weighted routing", "Latency routing", "Failover routing", "Geolocation routing"],
  correct: [2],
  explanation: "Failover routing usa health checks para alternar endpoints.",
  extra: "Combinado com health checks, garante alta disponibilidade."
},
{
  text: "Qual serviço é indicado para ingestão de dados em tempo real (streaming)?",
  options: ["SQS", "SNS", "Kinesis Data Streams", "Step Functions"],
  correct: [2],
  explanation: "Kinesis é projetado para streaming em tempo real.",
  extra: "Muito usado para logs, métricas e eventos."
},
{
  text: "Qual tipo de load balancer suporta tráfego TCP de alta performance?",
  options: ["ALB", "Classic ELB", "NLB", "CloudFront"],
  correct: [2],
  explanation: "Network Load Balancer opera na camada 4.",
  extra: "Ideal para baixa latência e alto throughput."
},
{
  text: "Qual serviço permite executar consultas SQL diretamente em dados no S3?",
  options: ["Redshift", "Athena", "Glue", "EMR"],
  correct: [1],
  explanation: "Athena permite consultas SQL serverless no S3.",
  extra: "Muito cobrado quando o requisito é simplicidade e custo baixo."
},
{
  text: "Qual recurso protege dados em trânsito entre serviços AWS?",
  options: ["IAM", "TLS/HTTPS", "KMS", "SSE-S3"],
  correct: [1],
  explanation: "TLS/HTTPS criptografa dados em trânsito.",
  extra: "Boa prática mesmo dentro da VPC."
},
{
  text: "Qual serviço é indicado para execução de aplicações Kubernetes gerenciadas?",
  options: ["ECS", "EKS", "Fargate", "EC2 apenas"],
  correct: [1],
  explanation: "EKS fornece Kubernetes gerenciado pela AWS.",
  extra: "Cai bastante em cenários de containers."
},
{
  text: "Qual recurso ajuda a detectar recursos AWS expostos publicamente?",
  options: ["AWS Config", "IAM Access Analyzer", "CloudTrail", "Inspector"],
  correct: [1],
  explanation: "IAM Access Analyzer identifica acessos públicos ou externos.",
  extra: "Importante para segurança e compliance."
},
{
  text: "Qual serviço fornece armazenamento de arquivos compartilhado e escalável?",
  options: ["EBS", "EFS", "S3", "FSx for Lustre"],
  correct: [1],
  explanation: "EFS é um sistema de arquivos NFS gerenciado.",
  extra: "Muito usado com EC2 e containers."
},
{
  text: "Qual prática reduz o impacto de falhas em microserviços?",
  options: ["Deploy monolítico", "Circuit Breaker", "Aumentar timeout", "Single AZ"],
  correct: [1],
  explanation: "Circuit Breaker evita falhas em cascata.",
  extra: "Arquitetura resiliente é muito cobrada."
},
{
  text: "Qual serviço permite centralizar logs de aplicações e infraestrutura?",
  options: ["CloudTrail", "CloudWatch Logs", "Config", "S3 Glacier"],
  correct: [1],
  explanation: "CloudWatch Logs centraliza logs.",
  extra: "Pode ser integrado com alarmes e métricas."
},
{
  text: "Qual opção é mais econômica para dados raramente acessados, mas que precisam ser recuperados rapidamente?",
  options: ["S3 Standard", "S3 One Zone-IA", "S3 Glacier", "S3 Glacier Deep Archive"],
  correct: [1],
  explanation: "One Zone-IA é mais barato e permite acesso rápido.",
  extra: "Avaliar durabilidade e SLA antes de usar."
},
{
  text: "Qual serviço ajuda a automatizar respostas a eventos AWS?",
  options: ["Lambda", "EventBridge", "SNS", "CloudWatch Alarms"],
  correct: [1],
  explanation: "EventBridge roteia eventos e aciona serviços.",
  extra: "Base de arquiteturas orientadas a eventos."
}


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


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
},
{
  text: "Uma aplicação precisa armazenar sessões de usuário com latência de microssegundos. Qual serviço é mais indicado?",
  options: ["RDS", "ElastiCache", "DynamoDB", "S3"],
  correct: [1],
  explanation: "ElastiCache fornece armazenamento em memória de baixa latência.",
  extra: "Redis é o engine mais usado para sessões e cache."
},
{
  text: "Qual recurso permite controlar permissões temporárias para aplicações?",
  options: ["IAM User", "IAM Role", "IAM Group", "Access Key"],
  correct: [1],
  explanation: "IAM Roles fornecem credenciais temporárias.",
  extra: "Essencial para EC2, Lambda e ECS."
},
{
  text: "Qual serviço garante auditoria de chamadas à API AWS?",
  options: ["CloudWatch", "CloudTrail", "Config", "Inspector"],
  correct: [1],
  explanation: "CloudTrail registra chamadas de API.",
  extra: "Muito cobrado em segurança e compliance."
},
{
  text: "Qual serviço AWS é indicado para processamento batch em larga escala?",
  options: ["Lambda", "Batch", "Step Functions", "SQS"],
  correct: [1],
  explanation: "AWS Batch gerencia jobs batch.",
  extra: "Usa EC2 e Spot Instances para otimização de custo."
},
{
  text: "Qual opção melhora disponibilidade de aplicações EC2 sem alterar código?",
  options: ["Aumentar tamanho da instância", "Multi-AZ com ALB", "Adicionar cache", "Usar Spot"],
  correct: [1],
  explanation: "Multi-AZ com ALB distribui tráfego.",
  extra: "Arquitetura clássica cobrada na prova."
},
{
  text: "Qual serviço permite detectar vulnerabilidades em instâncias EC2?",
  options: ["GuardDuty", "Inspector", "Shield", "Macie"],
  correct: [1],
  explanation: "Inspector analisa vulnerabilidades e exposição.",
  extra: "Muito cobrado em segurança."
},
{
  text: "Qual tipo de armazenamento EBS é indicado para workloads de alta IOPS?",
  options: ["gp2", "gp3", "io1/io2", "st1"],
  correct: [2],
  explanation: "io1/io2 são volumes provisionados para alta performance.",
  extra: "Comuns em bancos de dados críticos."
},
{
  text: "Qual serviço facilita a migração de bancos on-premises para AWS com mínimo downtime?",
  options: ["Snowball", "DMS", "DataSync", "Storage Gateway"],
  correct: [1],
  explanation: "DMS permite replicação contínua.",
  extra: "Muito cobrado em cenários de migração."
},
{
  text: "Qual prática aumenta resiliência contra falhas de zona?",
  options: ["Single AZ", "Multi-AZ", "On-Demand apenas", "Snapshots"],
  correct: [1],
  explanation: "Multi-AZ distribui recursos entre zonas.",
  extra: "Base de alta disponibilidade."
},
{
  text: "Qual serviço AWS fornece detecção de atividades maliciosas?",
  options: ["GuardDuty", "WAF", "Inspector", "Shield"],
  correct: [0],
  explanation: "GuardDuty analisa logs e detecta ameaças.",
  extra: "Integra CloudTrail, VPC Flow Logs e DNS logs."
},
{
  text: "Qual recurso do Auto Scaling ajusta capacidade automaticamente?",
  options: ["Launch Template", "Scaling Policy", "AMI", "Elastic IP"],
  correct: [1],
  explanation: "Scaling Policies definem regras de escala.",
  extra: "Target tracking é o mais comum."
},
{
  text: "Qual serviço é indicado para filas com garantia de processamento único?",
  options: ["SNS", "SQS Standard", "SQS FIFO", "EventBridge"],
  correct: [2],
  explanation: "SQS FIFO garante ordem e processamento único.",
  extra: "Muito cobrado quando há consistência."
},
{
  text: "Qual opção permite versionamento de objetos no S3?",
  options: ["Lifecycle Policy", "Versioning", "Replication", "Encryption"],
  correct: [1],
  explanation: "Versioning mantém múltiplas versões de objetos.",
  extra: "Protege contra deleção acidental."
},
{
  text: "Qual serviço fornece dashboards para métricas AWS?",
  options: ["CloudTrail", "CloudWatch", "Config", "X-Ray"],
  correct: [1],
  explanation: "CloudWatch exibe métricas e dashboards.",
  extra: "Base para observabilidade."
},
{
  text: "Qual estratégia reduz impacto financeiro de instâncias Spot interrompidas?",
  options: ["Single Instance", "Auto Scaling com múltiplos tipos", "Reserved Instances", "On-Demand apenas"],
  correct: [1],
  explanation: "Diversificar tipos reduz interrupções.",
  extra: "Spot é cobrado junto com resiliência."
},
{
  text: "Uma aplicação precisa acessar um bucket S3 a partir de uma VPC sem usar a internet. Qual solução atende?",
  options: ["Internet Gateway", "NAT Gateway", "VPC Endpoint", "Elastic IP"],
  correct: [2],
  explanation: "VPC Endpoints permitem acesso privado ao S3.",
  extra: "Muito cobrado quando o requisito é segurança."
},
{
  text: "Qual serviço permite armazenamento de objetos com 11 noves de durabilidade?",
  options: ["EFS", "EBS", "S3", "FSx"],
  correct: [2],
  explanation: "S3 oferece 99.999999999% de durabilidade.",
  extra: "Durabilidade é diferente de disponibilidade."
},
{
  text: "Qual recurso permite rotação automática de credenciais?",
  options: ["IAM User", "Secrets Manager", "Parameter Store", "KMS"],
  correct: [1],
  explanation: "Secrets Manager gerencia e rotaciona segredos.",
  extra: "Cai bastante em segurança."
},
{
  text: "Qual serviço AWS é mais indicado para ETL serverless?",
  options: ["Glue", "EMR", "Athena", "Redshift"],
  correct: [0],
  explanation: "Glue é um serviço ETL totalmente gerenciado.",
  extra: "Base de pipelines de dados."
},
{
  text: "Qual opção reduz latência de acesso global a arquivos estáticos?",
  options: ["S3 Standard", "EFS", "CloudFront", "ALB"],
  correct: [2],
  explanation: "CloudFront usa edge locations.",
  extra: "Sempre que falar em latência global, pense em CloudFront."
},
{
  text: "Qual serviço fornece gerenciamento centralizado de contas AWS?",
  options: ["IAM", "Organizations", "Control Tower", "RAM"],
  correct: [1],
  explanation: "Organizations permite gerenciar múltiplas contas.",
  extra: "Control Tower usa Organizations por baixo."
},
{
  text: "Qual banco de dados suporta armazenamento chave-valor totalmente gerenciado?",
  options: ["Aurora", "RDS", "DynamoDB", "Redshift"],
  correct: [2],
  explanation: "DynamoDB é NoSQL chave-valor.",
  extra: "Muito usado em aplicações serverless."
},
{
  text: "Qual serviço protege aplicações contra ataques DDoS na camada de rede?",
  options: ["WAF", "Shield", "Inspector", "Macie"],
  correct: [1],
  explanation: "Shield protege contra DDoS.",
  extra: "Shield Standard já vem habilitado."
},
{
  text: "Qual opção permite comunicação assíncrona entre microserviços?",
  options: ["ALB", "SNS", "EC2", "Direct Connect"],
  correct: [1],
  explanation: "SNS desacopla produtores e consumidores.",
  extra: "Fan-out é um padrão comum."
},
{
  text: "Qual recurso do S3 reduz custos automaticamente ao longo do tempo?",
  options: ["Versioning", "Replication", "Lifecycle Policy", "Encryption"],
  correct: [2],
  explanation: "Lifecycle Policies movem objetos entre classes.",
  extra: "Muito cobrado quando fala de custo."
},
{
  text: "Qual serviço permite monitorar latência de aplicações distribuídas?",
  options: ["CloudWatch", "X-Ray", "CloudTrail", "Config"],
  correct: [1],
  explanation: "X-Ray fornece tracing distribuído.",
  extra: "Essencial para microsserviços."
},
{
  text: "Qual tipo de instância EC2 é otimizada para computação intensiva?",
  options: ["t3", "c6g", "r6g", "m6i"],
  correct: [1],
  explanation: "Família C é otimizada para compute.",
  extra: "Sempre leia a letra da família."
},
{
  text: "Qual serviço permite compartilhamento de recursos entre contas?",
  options: ["Organizations", "RAM", "IAM", "Control Tower"],
  correct: [1],
  explanation: "Resource Access Manager compartilha recursos.",
  extra: "Muito usado para subnets e Transit Gateway."
},
{
  text: "Qual opção permite recuperação rápida após exclusão acidental no S3?",
  options: ["Encryption", "Versioning", "Replication", "Lifecycle"],
  correct: [1],
  explanation: "Versioning mantém versões antigas.",
  extra: "Evita perda de dados."
},
{
  text: "Qual prática reduz blast radius em falhas de segurança?",
  options: ["Single account", "Least privilege", "Admin access", "Shared credentials"],
  correct: [1],
  explanation: "Least privilege limita impacto.",
  extra: "Princípio fundamental de segurança."
},
{
  text: "Uma aplicação global usa ALB em duas regiões diferentes. É necessário direcionar usuários automaticamente para a região mais próxima, com failover automático em caso de indisponibilidade regional. Qual solução atende melhor?",
  options: ["Weighted routing", "Latency routing com health checks", "Geolocation routing", "Round Robin DNS"],
  correct: [1],
  explanation: "Latency routing direciona usuários para a região com menor latência e, com health checks, permite failover.",
  extra: "É a abordagem clássica da AWS para HA multi-region."
},
{
  text: "Uma aplicação EC2 precisa acessar segredos de banco de dados com rotação automática e auditoria. Qual solução é mais adequada?",
  options: ["IAM User com Access Key", "Parameter Store Standard", "Secrets Manager", "KMS direto"],
  correct: [2],
  explanation: "Secrets Manager fornece rotação automática e auditoria.",
  extra: "Parameter Store não faz rotação automática nativa."
},
{
  text: "Uma aplicação usa Spot Instances e não pode perder jobs em execução quando ocorre interrupção. Qual abordagem reduz impacto?",
  options: ["Usar apenas On-Demand", "Usar Reserved Instances", "Checkpoint + Auto Scaling com múltiplos tipos", "Aumentar tamanho das instâncias"],
  correct: [2],
  explanation: "Checkpointing combinado com diversificação reduz impacto de interrupções.",
  extra: "Spot exige arquitetura tolerante a falhas."
},
{
  text: "Um banco RDS MySQL precisa suportar falha total de AZ sem perda de dados e sem intervenção manual. Qual configuração é necessária?",
  options: ["Read Replica", "Snapshot diário", "Multi-AZ", "Backup manual"],
  correct: [2],
  explanation: "Multi-AZ fornece failover automático síncrono.",
  extra: "Read Replicas são assíncronas."
},
{
  text: "Uma aplicação serverless precisa processar eventos em ordem exata e sem duplicação. Qual combinação atende?",
  options: ["SNS + Lambda", "SQS Standard + Lambda", "SQS FIFO + Lambda", "EventBridge + Lambda"],
  correct: [2],
  explanation: "SQS FIFO garante ordem e processamento único.",
  extra: "Muito cobrado quando aparece 'exactly-once' e 'order'."
},
{
  text: "Uma empresa precisa migrar 300 TB de dados com link de internet limitado e prazo curto. Qual solução é mais adequada?",
  options: ["DataSync", "S3 Transfer Acceleration", "Snowball Edge", "AWS Backup"],
  correct: [2],
  explanation: "Snowball Edge é ideal para grandes volumes offline.",
  extra: "DataSync depende de banda de rede."
},
{
  text: "Uma aplicação crítica precisa de latência extremamente baixa para leituras frequentes em DynamoDB. Qual solução atende?",
  options: ["Read Replica", "DAX", "Global Tables", "Athena"],
  correct: [1],
  explanation: "DAX fornece cache em memória com microssegundos de latência.",
  extra: "Global Tables são para replicação, não performance."
},
{
  text: "Uma arquitetura precisa desacoplar microserviços e permitir fan-out para múltiplos consumidores. Qual padrão AWS é ideal?",
  options: ["ALB", "SNS + SQS", "SQS FIFO apenas", "Step Functions"],
  correct: [1],
  explanation: "SNS + SQS permite fan-out desacoplado.",
  extra: "Cenário clássico de mensageria."
},
{
  text: "Uma aplicação precisa executar containers sem gerenciar servidores e escalar automaticamente. Qual solução reduz overhead operacional?",
  options: ["EC2 Auto Scaling", "ECS on EC2", "ECS com Fargate", "EKS com nodes próprios"],
  correct: [2],
  explanation: "Fargate elimina gerenciamento de servidores.",
  extra: "Sempre que o requisito for 'menos operação', pense em Fargate."
},
{
  text: "Uma empresa precisa bloquear ataques SQL Injection e XSS em uma aplicação HTTP sem alterar código. Qual serviço usar?",
  options: ["Shield", "WAF", "GuardDuty", "Inspector"],
  correct: [1],
  explanation: "WAF protege contra ataques na camada 7.",
  extra: "Shield é focado em DDoS."
},
{
  text: "Uma aplicação precisa armazenar arquivos compartilhados acessados simultaneamente por centenas de instâncias EC2. Qual serviço atende?",
  options: ["EBS", "S3", "EFS", "FSx for Windows"],
  correct: [2],
  explanation: "EFS permite acesso NFS simultâneo.",
  extra: "EBS não pode ser compartilhado dessa forma."
},
{
  text: "Uma empresa precisa rastrear quem alterou configurações de recursos AWS ao longo do tempo. Qual combinação atende melhor?",
  options: ["CloudWatch + X-Ray", "CloudTrail apenas", "AWS Config + CloudTrail", "Inspector + GuardDuty"],
  correct: [2],
  explanation: "Config rastreia estado e CloudTrail registra ações.",
  extra: "Pergunta clássica de auditoria."
},
{
  text: "Uma aplicação multi-region precisa replicar dados DynamoDB automaticamente com baixa latência. Qual solução usar?",
  options: ["DAX", "Streams", "Global Tables", "S3 Replication"],
  correct: [2],
  explanation: "Global Tables replicam DynamoDB entre regiões.",
  extra: "Não confundir com DAX."
},
{
  text: "Uma workload previsível e estável precisa reduzir custos a longo prazo. Qual opção é mais indicada?",
  options: ["On-Demand", "Spot Instances", "Reserved Instances", "Auto Scaling apenas"],
  correct: [2],
  explanation: "Reserved Instances oferecem economia para uso previsível.",
  extra: "Savings Plans também seriam corretos em outro cenário."
},
{
  text: "Uma aplicação distribuída precisa identificar gargalos de latência entre microsserviços. Qual serviço AWS usar?",
  options: ["CloudWatch Logs", "CloudTrail", "X-Ray", "Config"],
  correct: [2],
  explanation: "X-Ray fornece tracing distribuído.",
  extra: "Muito cobrado em arquiteturas modernas."
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

  setTimeout(loadQuestion, 3500);
});

loadQuestion();


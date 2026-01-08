// ================================
// SIMULADO AWS - LÓGICA PRINCIPAL
// ================================

let questions = [
  {
    text: "Uma aplicação web precisa de alta disponibilidade. Qual a melhor abordagem?",
    options: [
      "Usar EC2 em uma única AZ",
      "Distribuir EC2 em múltiplas AZs com ALB",
      "Aumentar o tamanho da instância",
      "Usar Spot Instances apenas"
    ],
    correct: [1],
    explanation: "Distribuir instâncias em múltiplas AZs com um Application Load Balancer garante alta disponibilidade e tolerância a falhas.",
    extra: "Esse padrão é base para arquiteturas resilientes na AWS e é amplamente cobrado na prova."
  },
  {
    text: "Qual serviço permite auditoria de chamadas de API na AWS?",
    options: [
      "CloudWatch",
      "AWS Config",
      "CloudTrail",
      "IAM"
    ],
    correct: [2],
    explanation: "O AWS CloudTrail registra todas as chamadas de API feitas na conta, permitindo auditoria e rastreabilidade.",
    extra: "CloudTrail é essencial para segurança, compliance e investigação de incidentes."
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

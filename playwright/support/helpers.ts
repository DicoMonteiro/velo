export function generateOrderCode() {
    const PREFIX = 'VLO';
    const ALPHANUMERIC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const CODE_LENGTH = 6;
  
    const randomPart = Array.from({ length: CODE_LENGTH }, () =>
      ALPHANUMERIC.charAt(Math.floor(Math.random() * ALPHANUMERIC.length))
    ).join('');
  
    return `${PREFIX}-${randomPart}`;
}

// Exemplo de uso
//const order = generateOrderCode();
//console.log(order); // Ex: "VLO-8FQ2X9"
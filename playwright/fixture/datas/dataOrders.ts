export const orders = {
    aprovado: {
      code: 'VLO-OPHS0J',
      status: 'APROVADO',
      model: 'Velô Sprint',
      color: 'Midnight Black',
      interior: 'cream',
      wheels: 'sport Wheels',
      customer: {
        name: 'Pedro Amado',
        email: 'pedro.amado@qax.com.br'
      },
      payment: {
        method: 'À Vista',
        amount: 'R$ 52.500,00'
      }
    },
    reprovado: {
      code: 'VLO-165ZEY',
      status: 'REPROVADO',
      model: 'Velô Sprint',
      color: 'Lunar White',
      interior: 'cream',
      wheels: 'aero Wheels',
      customer: {
        name: 'Apolo Vale',
        email: 'apolo.vale@teste.com.br'
      },
      payment: {
        method: 'À Vista',
        amount: 'R$ 45.000,00'
      }
    },
    emAnalise: {
      code: 'VLO-BXFHDZ',
      status: 'EM_ANALISE',
      model: 'Velô Sprint',
      color: 'Lunar White',
      interior: 'cream',
      wheels: 'aero Wheels',
      customer: {
        name: 'Marcus Antunes',
        email: 'marcus.antunes@teste.com.br'
      },
      payment: {
        method: 'À Vista',
        amount: 'R$ 40.000,00'
      }
    }
  };
  
  export const statusConfig = {
    APROVADO: {
      bgClass: 'bg-green-100',
      textClass: 'text-green-700',
      iconClass: 'lucide-circle-check-big'
    },
    REPROVADO: {
      bgClass: 'bg-red-100',
      textClass: 'text-red-700',
      iconClass: 'lucide-circle-x'
    },
    EM_ANALISE: {
      bgClass: 'bg-amber-100',
      textClass: 'text-amber-700',
      iconClass: 'lucide-circle-clock'
    }
  };
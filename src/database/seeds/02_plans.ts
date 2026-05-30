import type { Knex } from 'knex';

interface Perk {
  icon: string;
  label: string;
}

interface PlanSeed {
  title: string;
  color: string;
  focus: string;
  focus_desc: string;
  price: number;
  free_consultations: number;
  perks: Perk[];
}

const plans: PlanSeed[] = [
  {
    title: 'Essencial',
    color: '#FAF9F6',
    focus: 'Prevenção básica e suporte digital imediato',
    focus_desc:
      'Tutores que buscam cuidado eficiente, orientação confiável e praticidade no dia a dia do seu pet.',
    price: 39.9,
    free_consultations: 1,
    perks: [
      { icon: 'i-ph-dog', label: 'Cadastro de até 2 pets (cães e gatos)' },
      { icon: 'i-ph-stethoscope', label: 'Consulta Virtual Agendada: 1 por mês' },
      {
        icon: 'i-ph-play-circle',
        label:
          'Plataforma de Conteúdo: Acesso completo incluso (Vídeos educativos, culinária e mais!)',
      },
      { icon: 'i-ph-users-three', label: 'Clube ConectaVet (Grupo VIP no WhatsApp)' },
      { icon: 'i-ph-gift', label: 'Clube de Benefícios: Descontos Exclusivos na Boutique MAFFY' },
      {
        icon: 'i-ph-gift',
        label:
          'Benefício Aniversário ConectaVet: Surpresa especial para o seu pet, com cupom, parabéns personalizado e mais!',
      },
      { icon: 'i-ph-gift', label: 'Envio de 1 Mini Kit Emergência Pet (Anual)' },
      {
        icon: 'i-ph-seal-percent',
        label:
          'Consultas Virtuais Extras: Coparticipação inteligente (50% de desconto sobre o valor avulso)',
      },
    ],
  },
  {
    title: 'Care Plus',
    color: '#014496',
    focus: 'Conforto e a tranquilidade de um suporte mais robusto',
    focus_desc:
      'Tutores que desejam mais suporte, comodidade e benefícios para cuidar melhor do seu pet.',
    price: 79.9,
    free_consultations: 2,
    perks: [
      { icon: 'i-ph-exclamation-mark', label: 'Tudo incluso no Essencial' },
      {
        icon: 'i-ph-stethoscope',
        label: 'Consulta Virtual Agendada ou Pronto Atendimento: 2 por mês',
      },
      { icon: 'i-ph-first-aid-kit', label: 'Envio de 1 Mini Kit Emergência Pet: Anual' },
      {
        icon: 'i-ph-house-line',
        label:
          'Atendimento Veterinário Domiciliar: 5% de desconto em todos os atendimentos domiciliares',
      },
      {
        icon: 'i-ph-cat',
        label:
          'Encontros ConectaVet: Participação em encontros presenciais exclusivos com aulas práticas e socialização pet',
      },
      {
        icon: 'i-ph-first-aid',
        label:
          'Exames Laboratoriais e de Imagem em Casa: Acesso a valores reduzidos de rede',
      },
      {
        icon: 'i-ph-seal-percent',
        label: 'Consultas Virtuais Extras: Coparticipação fixa de apenas R$ 29,00',
      },
    ],
  },
  {
    title: 'Super Premium',
    color: '#01193A',
    focus: 'A experiência máxima de exclusividade, comodidade e mimos físicos',
    focus_desc:
      'Tutores que querem o melhor em exclusividade, benefícios e mimos para seu pet.',
    price: 149.9,
    free_consultations: 4,
    perks: [
      { icon: 'i-ph-exclamation-mark', label: 'Tudo incluso no Essencial e Care Plus' },
      {
        icon: 'i-ph-stethoscope',
        label: 'Consulta Virtual ou Pronto Atendimento: 4 por mês (inclui pets exóticos/silvestres)',
      },
      { icon: 'i-ph-first-aid-kit', label: 'Envio de 1 Mini Kit Emergência Pet Premium: Anual' },
      {
        icon: 'i-ph-house-line',
        label:
          'Atendimento Veterinário Domiciliar: 10% de desconto em todos os atendimentos domiciliares',
      },
      {
        icon: 'i-ph-first-aid',
        label:
          'Coleta de Exames Laboratoriais em Domicílio: 100% inclusa (até 2x/ano para Check-up de Rotina)',
      },
      {
        icon: 'i-ph-cake',
        label:
          'Benefício Aniversário ConectaVet: Kit premium aniversário com mimos físicos, cupom exclusivo, parabéns personalizado e descontos de elite',
      },
      {
        icon: 'i-ph-lego',
        label:
          'MAFFYBOX: Envio mensal de brinquedos, petiscos e itens de moda pet ergonômica direto para sua casa',
      },
      {
        icon: 'i-ph-house-line',
        label: 'Ultrassonografia em Domicílio: Tarifa VIP com desconto exclusivo (1x/ano)',
      },
      {
        icon: 'i-ph-seal-percent',
        label: 'Consultas Virtuais Extras: Coparticipação fixa de apenas R$ 19,00',
      },
    ],
  },
];

export async function seed(knex: Knex): Promise<void> {
  for (const plan of plans) {
    const existing = await knex('plans').where({ title: plan.title }).first();
    if (existing) continue;

    await knex('plans').insert({
      title: plan.title,
      color: plan.color,
      focus: plan.focus,
      focus_desc: plan.focus_desc,
      price: plan.price,
      free_consultations: plan.free_consultations,
      perks: JSON.stringify(plan.perks),
      is_active: true,
    });
  }
}

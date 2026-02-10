// Tipos do Dashboard ENAMED

export interface Questao {
  numero: number;
  enunciado: string;
  area: string;
  subespecialidade: string;
  tema: string;
  subtema: string;
  bloom: string;
  competencia_principal: string;
  competencias_secundarias: string;
  dominios: string;
  eixo_cognitivo: string;
  nivel_cognitivo: string;
  cenarios: string;
  ciclo_formativo: string;
  eixos_transversais: string;
  area_formacao_principal: string;
  area_formacao_secundaria: string;
  gabarito: string;
  acertos: number;
  erros: number;
  total: number;
  taxa_acerto: number;
}

export interface IndicesDimensao {
  [chave: string]: number[];
}

export interface Indices {
  por_ciclo: IndicesDimensao;
  por_bloom: IndicesDimensao;
  por_competencia: IndicesDimensao;
  por_dominio: IndicesDimensao;
  por_cenario: IndicesDimensao;
  por_area: IndicesDimensao;
  por_subespecialidade: IndicesDimensao;
  por_tema: IndicesDimensao;
  por_subtema: IndicesDimensao;
  por_eixo_cognitivo: IndicesDimensao;
  por_nivel_cognitivo: IndicesDimensao;
  por_eixo_transversal: IndicesDimensao;
  por_area_formacao: IndicesDimensao;
}

export interface TaxaDimensao {
  taxa: number;
}

export interface SPRMedDimensao {
  [chave: string]: TaxaDimensao;
}

export interface SPRMedData {
  ciclos: SPRMedDimensao;
  bloom: SPRMedDimensao;
  competencias: SPRMedDimensao;
  dominios: SPRMedDimensao;
  cenarios: SPRMedDimensao;
  areas: SPRMedDimensao;
}

export interface EscolaConfig {
  nome: string;
  sigla: string;
  cidade: string;
  uf: string;
  co_curso: number;
  total_alunos: number;
  nota_media: number;
  proficiencia_media: number;
  alunos_risco: number;
  percentual_risco: number;
}

export interface DashboardData {
  escola: EscolaConfig;
  questoes: Questao[];
  indices: Indices;
  sprmed: SPRMedData;
}

// Legendas - Portaria Inep 478/2025
export const LEGENDAS = {
  ciclo: {
    'M2': 'ENAMED-2 - Ciclo Basico (Final do 2o ano)',
    'M4': 'ENAMED-4 - Ciclo Clinico (Final do 4o ano)',
    'M6': 'ENAMED-6 - Internato (Final do 6o ano)'
  },
  competencia: {
    'C-I': 'Singularidade',
    'C-II': 'Hipoteses diagnosticas',
    'C-III': 'Exames complementares',
    'C-IV': 'Planos terapeuticos',
    'C-V': 'Urgencias/emergencias',
    'C-VI': 'Procedimentos basicos',
    'C-VII': 'Necessidades coletivas',
    'C-VIII': 'Promocao e vigilancia',
    'C-IX': 'Principios do SUS',
    'C-X': 'Comunicacao',
    'C-XI': 'Equipe multiprofissional',
    'C-XII': 'Etica e deontologia',
    'C-XIII': 'Autorreflexao',
    'C-XIV': 'TICs em saude',
    'C-XV': 'Emergencias sanitarias'
  },
  dominio: {
    'D-I': 'Bases moleculares e celulares',
    'D-II': 'Processos fisiologicos do ciclo de vida',
    'D-III': 'Determinantes sociais, culturais e ecologicos',
    'D-IV': 'Etica, bioetica e seguranca de dados',
    'D-V': 'Direitos humanos e inclusao',
    'D-VI': 'Semiologia',
    'D-VII': 'Comunicacao em saude',
    'D-VIII': 'Registro e documentacao medica',
    'D-IX': 'Propedeutica e diagnostico',
    'D-X': 'Terapeutica',
    'D-XI': 'Prognostico e prevencao',
    'D-XII': 'Reabilitacao',
    'D-XIII': 'Promocao e educacao em saude',
    'D-XIV': 'Politicas de saude e SUS',
    'D-XV': 'Gestao de servicos',
    'D-XVI': 'Epidemiologia',
    'D-XVII': 'Vigilancia em saude',
    'D-XVIII': 'Saude ambiental e ocupacional',
    'D-XIX': 'Lideranca e trabalho em equipe',
    'D-XX': 'Metodologia cientifica e MBE',
    'D-XXI': 'Tecnologias da informacao'
  },
  cenario: {
    'APS': 'Atencao Primaria a Saude',
    'URG': 'Urgencia e Emergencia',
    'MAT': 'Rede Materno-Infantil',
    'RAPS': 'Atencao Psicossocial',
    'CRON': 'Doencas Cronicas',
    'REAB': 'Reabilitacao'
  },
  eixo_cognitivo: {
    'E1': 'Conhecimento e Compreensao',
    'E2': 'Aplicacao e Analise',
    'E3': 'Avaliacao e Julgamento Etico-Profissional'
  },
  nivel_cognitivo: {
    'NC1': 'Conhecimento e Compreensao (Cognitivo)',
    'NC2': 'Aplicacao e Execucao Pratica (Psicomotor)',
    'NC3': 'Raciocinio Clinico e Julgamento Etico (Atitudinal)'
  },
  eixo_transversal: {
    'AT': 'Atencao a Saude',
    'GS': 'Gestao em Saude',
    'ES': 'Educacao em Saude'
  },
  area_formacao: {
    'CLIN': 'Clinica Medica',
    'CIR': 'Cirurgia Geral',
    'GO': 'Ginecologia e Obstetricia',
    'PED': 'Pediatria',
    'MFC': 'Medicina de Familia e Comunidade',
    'SM': 'Saude Mental',
    'SC': 'Saude Coletiva'
  },
  bloom: {
    'Lembrar': 'Recuperar informacao da memoria',
    'Entender': 'Compreender significado, interpretar',
    'Aplicar': 'Usar conhecimento em situacao pratica',
    'Analisar': 'Decompor em partes, identificar relacoes',
    'Avaliar': 'Fazer julgamentos baseados em criterios',
    'Criar': 'Produzir algo novo, sintetizar'
  }
} as const;

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

// Legendas
export const LEGENDAS = {
  ciclo: {
    'M2': '2o ano - Conteudos basicos',
    'M4': '4o ano - Conteudos intermediarios',
    'M6': '6o ano - Internato'
  },
  competencia: {
    'C-I': 'Atencao as Necessidades de Saude',
    'C-II': 'Tomada de Decisao Clinica',
    'C-III': 'Comunicacao',
    'C-IV': 'Cuidado Clinico Centrado na Pessoa',
    'C-V': 'Promocao da Saude',
    'C-VI': 'Prevencao de Agravos',
    'C-VII': 'Raciocinio Epidemiologico',
    'C-VIII': 'Gestao do Cuidado',
    'C-IX': 'Trabalho em Equipe',
    'C-X': 'Educacao em Saude',
    'C-XI': 'Aprendizagem Autodirigida',
    'C-XII': 'Etica e Profissionalismo'
  },
  dominio: {
    'D-I': 'Processo Saude-Doenca',
    'D-II': 'Semiologia e Propedeutica',
    'D-III': 'Exames Complementares',
    'D-IV': 'Diagnostico',
    'D-V': 'Terapeutica',
    'D-VI': 'Urgencia e Emergencia',
    'D-VII': 'Saude da Crianca',
    'D-VIII': 'Saude do Adolescente',
    'D-IX': 'Saude do Adulto',
    'D-X': 'Saude do Idoso',
    'D-XI': 'Saude da Mulher',
    'D-XII': 'Saude Mental',
    'D-XIII': 'Saude Coletiva',
    'D-XIV': 'Atencao Primaria',
    'D-XV': 'Politicas de Saude'
  },
  cenario: {
    'APS': 'Atencao Primaria a Saude',
    'URG': 'Urgencia e Emergencia',
    'CRON': 'Doencas Cronicas',
    'MAT': 'Maternidade',
    'RAPS': 'Rede de Atencao Psicossocial'
  },
  eixo_cognitivo: {
    'E1': 'Memoria - Reconhecer, identificar',
    'E2': 'Raciocinio Clinico - Analisar, diagnosticar',
    'E3': 'Tomada de Decisao - Avaliar, decidir'
  },
  nivel_cognitivo: {
    'NC1': 'Basico - Reconhecimento',
    'NC2': 'Intermediario - Aplicacao',
    'NC3': 'Avancado - Sintese critica'
  },
  eixo_transversal: {
    'AT': 'Atencao a Saude',
    'ES': 'Educacao em Saude',
    'GS': 'Gestao em Saude'
  },
  area_formacao: {
    'CLIN': 'Clinica Medica',
    'CIR': 'Cirurgia',
    'PED': 'Pediatria',
    'GO': 'Ginecologia e Obstetricia',
    'MFC': 'Medicina de Familia e Comunidade',
    'SC': 'Saude Coletiva',
    'SM': 'Saude Mental'
  },
  bloom: {
    'Lembrar': 'Recuperar informacao da memoria',
    'Entender': 'Compreender significado',
    'Aplicar': 'Usar conhecimento em pratica',
    'Analisar': 'Decompor em partes',
    'Avaliar': 'Fazer julgamentos'
  }
} as const;

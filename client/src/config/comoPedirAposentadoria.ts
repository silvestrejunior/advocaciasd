/**
 * Configuração manual da landing page de assessoria antes do pedido.
 * O vídeo foi fornecido pelo escritório. Somente esta campanha utiliza estes dados.
 */
export const PEDIDO_APOSENTADORIA = {
  caminho: "/como-pedir-aposentadoria",
  origemCanonica: "https://advocaciasd.com.br",
  // 51 caracteres: dentro do limite de 30 a 60 recomendado pelo Google.
  titulo: "Como pedir aposentadoria com segurança | Maringá-PR",
  descricao:
    "Vai pedir sua aposentadoria? Conheça seu direito antes de dar entrada no INSS. Assista ao vídeo e fale com advogado previdenciário em Maringá.",
  nomeEscritorio: "Santana Daufenbach Advocacia Previdenciária",
  mensagemPadrao: "Quero assessoria para pedir minha aposentadoria",
  video: {
    url: "https://www.youtube.com/shorts/KNg-vQ7uo3k",
    id: "KNg-vQ7uo3k",
    titulo: "Por que pedir a aposentadoria com assessoria",
    descricao:
      "Dr. João Luiz explica as vantagens e a importância de contar com um advogado antes do pedido.",
    capa: "/images/video-como-pedir-aposentadoria.webp",
    // Preenchidos somente com metadados verificados do vídeo original.
    dataPublicacao: "2025-03-24",
    duracao: "",
  },
} as const;

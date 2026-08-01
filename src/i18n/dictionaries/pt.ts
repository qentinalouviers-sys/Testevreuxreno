import type { Dictionary } from "./fr";

const pt: Dictionary = {
  meta: {
    title: "Al Arifa — O mercado dos produtores do Mediterrâneo",
    description:
      "Azeites, méis, açafrão, sais e frutos secos de produtores independentes do Mediterrâneo. Cada casa vende sob a sua marca e recebe diretamente, sem intermediário.",
    ogAlt: "Al Arifa — seleção de produtores mediterrânicos",
  },

  nav: {
    home: "Início",
    catalog: "A seleção",
    producers: "Os produtores",
    story: "A História",
    sell: "Tornar-se produtor",
    order: "Encomendar",
    contact: "Contacto",
    cart: "Carrinho",
    pro: "Área do produtor",
    admin: "Admin",
    menu: "Menu",
    close: "Fechar",
    language: "Idioma",
  },

  hero: {
    eyebrow: "Casas independentes · Mediterrâneo",
    titleTop: "As grandes casas",
    titleBottom: "do Sul, reunidas",
    subtitle:
      "Uma seleção restrita de produtores que vendem sob a sua própria marca. Encomende a vários de uma só vez — cada um é pago diretamente, sem intermediário.",
    ctaPrimary: "Descobrir a seleção",
    ctaSecondary: "Vender na Al Arifa",
    scroll: "Deslize",
  },

  marquee: [
    "Produtores independentes",
    "Cada um sob a sua marca",
    "Pagamento direto",
    "Seis países mediterrânicos",
    "Expedição mundial",
  ],

  product: {
    eyebrow: "O produto",
    producer: "Produtor",
    origin: "Origem",
    category: "Categoria",
    format: "Formato",
    price: "Preço",
    tradePrice: "Preço profissional",
    tradeNote: "S/ IVA, a partir de 12 unidades — disponível com conta profissional.",
    quantity: "Quantidade",
    addToCart: "Adicionar ao carrinho",
    added: "Adicionado ao carrinho",
    viewCart: "Ver carrinho",
    shipping: "Expedido pelo produtor",
    freeShippingFrom: "Portes grátis a partir de",
    otherProducts: "Outros produtos da casa",
    backToCatalog: "Voltar à seleção",
    notFound: "Produto não encontrado",
  },

  catalog: {
    metaTitle: "A seleção",
    metaDescription:
      "Todos os produtos das casas referenciadas: azeites, méis, especiarias, sais, azeitonas e frutos secos.",
    eyebrow: "A seleção",
    title: "Todo o catálogo",
    subtitle: "Cada produto vem de uma casa independente. Filtre por família ou por produtor.",
    allCategories: "Todas as famílias",
    allProducers: "Todos os produtores",
    filterCategory: "Família",
    filterProducer: "Produtor",
    results: "produtos",
    empty: "Nenhum produto corresponde a estes filtros.",
    reset: "Repor",
    categories: {
      huile: "Azeites",
      miel: "Méis",
      epices: "Especiarias",
      "fruits-secs": "Frutos secos",
      sel: "Sais",
      olives: "Azeitonas",
    },
  },

  producers: {
    metaTitle: "Os produtores",
    metaDescription:
      "As casas referenciadas na Al Arifa: seis famílias de produtores do Mediterrâneo, cada uma sob a sua marca.",
    eyebrow: "As casas",
    title: "Os nossos produtores",
    subtitle:
      "Seis famílias, seis terroirs, seis formas de trabalhar. Nenhuma abdicou do seu nome ao juntar-se a nós.",
    since: "Casa fundada em",
    products: "produtos",
    discover: "Descobrir a casa",
    theirProducts: "Os produtos da casa",
    payoutsActive: "Pagamento direto ativo",
    payoutsPending: "Conta de pagamento em ativação",
    notFound: "Produtor não encontrado",
    backToProducers: "Voltar aos produtores",
  },

  cart: {
    metaTitle: "O seu carrinho",
    eyebrow: "Carrinho",
    title: "A sua encomenda",
    empty: "O seu carrinho está vazio.",
    emptyCta: "Percorrer a seleção",
    shippedBy: "Expedido por",
    remove: "Remover",
    goods: "Subtotal produtos",
    shipping: "Envio",
    freeShipping: "Grátis",
    subtotal: "Subtotal",
    total: "Total a pagar",
    checkout: "Finalizar encomenda",
    continue: "Continuar a comprar",
    multiProducerNote:
      "O seu carrinho contém produtos de várias casas. Paga apenas uma vez: cada produtor recebe a sua parte e expede a sua encomenda.",
    parcels: "encomendas",
    parcelNote: "Receberá uma encomenda por produtor.",
  },

  split: {
    title: "Repartição do pagamento",
    subtitle: "Para onde vai o seu pagamento. Nenhum montante passa por uma conta intermediária.",
    producerShare: "Pago ao produtor",
    platformShare: "Comissão Al Arifa",
    commission: "comissão",
    shippingNote: "Os portes são pagos na totalidade ao produtor que expede.",
    transfers: "transferências distintas",
    explain:
      "O pagamento é cobrado uma única vez e depois dividido automaticamente. Cada casa é creditada da sua parte no próprio dia, sem fatura a emitir nem adiantamento de tesouraria.",
  },

  checkout: {
    metaTitle: "Encomendar",
    metaDescription: "Finalize a sua encomenda junto das casas selecionadas.",
    eyebrow: "Encomendar",
    title: "Finalizar a encomenda",
    subtitle: "Verifique o carrinho e escolha a sua forma de pagamento.",
    summary: "Resumo",
    delivery: "Entrega",
    deliveryNote: "Cada casa expede a partir da sua oficina.",
    empty: "O seu carrinho está vazio.",
    emptyCta: "Percorrer a seleção",
    payment: {
      title: "Forma de pagamento",
      subtitle: "Selecione o seu meio de pagamento preferido.",
      card: { name: "Cartão bancário", note: "Visa, Mastercard, Amex — via Stripe" },
      transfer: { name: "Transferência bancária", note: "SEPA & SWIFT — ideal para grandes volumes" },
      crypto: { name: "Criptomoeda", note: "BTC, ETH, USDT" },
      cta: "Validar e pagar",
    },
    modal: {
      title: "Pagamento em desenvolvimento",
      text: "O módulo de pagamento repartido está a ser integrado com o Stripe Connect. Entretanto, a nossa equipa finaliza a sua encomenda manualmente em 24 horas úteis.",
      hint: "Contacte-nos pelo formulário ou WhatsApp para validar a sua encomenda de imediato.",
      contact: "Contactar-nos",
      close: "Fechar",
    },
  },

  sell: {
    metaTitle: "Tornar-se produtor referenciado",
    metaDescription:
      "Venda sob a sua própria marca na Al Arifa. Recebe diretamente 70 % de cada encomenda, sem refaturação nem adiantamento de tesouraria.",
    eyebrow: "Produtores",
    title: "A sua marca, o seu dinheiro",
    subtitle:
      "Não compramos a sua produção nem a revendemos com o nosso nome. Vende em seu nome, na nossa montra.",
    heroCta: "Enviar candidatura",
    heroCtaAlt: "Falar com alguém",

    splitTitle: "A regra é simples",
    splitLead: "Em cada encomenda de 100 €",
    splitProducer: "para si",
    splitPlatform: "para a plataforma",
    splitNote: "Os portes são-lhe pagos na totalidade. A comissão incide apenas sobre a mercadoria.",

    pillarsTitle: "O que muda na prática",
    pillars: [
      {
        title: "Sem refaturação",
        text: "A nossa comissão é retida na origem no momento do pagamento. Não tem nenhuma fatura a emitir nem nada a devolver-nos.",
      },
      {
        title: "Sem adiantamento de tesouraria",
        text: "A sua parte é creditada no dia da encomenda. Não espera trinta ou sessenta dias para ser pago.",
      },
      {
        title: "A sua marca continua sua",
        text: "O seu nome, o seu rótulo, a sua página. O cliente sabe a quem compra e a relação continua sua.",
      },
      {
        title: "Não cede o seu stock",
        text: "Sem compra firme, sem consignação. Expede o que for vendido, a partir da sua oficina.",
      },
    ],

    howTitle: "Como funciona",
    steps: [
      {
        title: "Candidatura",
        text: "Apresenta-nos a sua casa, os produtos e os volumes. Respondemos em 48 horas úteis.",
      },
      {
        title: "Verificação",
        text: "Provamos e verificamos as suas análises e documentos. É a única etapa em que somos exigentes.",
      },
      {
        title: "Conta de pagamento",
        text: "Abre a sua conta de pagamento em cinco minutos. É essa conta que recebe a sua parte, diretamente.",
      },
      {
        title: "Publicação",
        text: "A sua página de marca e os produtos ficam online. Gere preços e stocks a partir da sua área.",
      },
    ],

    faqTitle: "Perguntas frequentes",
    faq: [
      {
        q: "Quando sou pago exatamente?",
        a: "A sua parte é creditada na conta de pagamento no momento em que o cliente paga. A transferência para a sua conta bancária segue depois o calendário padrão, configurável até diariamente.",
      },
      {
        q: "Quem suporta os custos bancários?",
        a: "A plataforma, sobre a sua parte. Os 70 % anunciados são líquidos para si.",
      },
      {
        q: "E se um cliente pedir reembolso?",
        a: "O reembolso é retirado proporcionalmente dos dois lados: a sua parte e a nossa comissão. Ninguém adianta pelo outro.",
      },
      {
        q: "Posso vender noutro lado ao mesmo tempo?",
        a: "Sim. Sem exclusividade, sem prazo mínimo, sem compromisso de volume.",
      },
    ],

    ctaTitle: "A sua casa tem lugar aqui?",
    ctaText: "Apresente-a. Analisamos cada candidatura pessoalmente.",
    ctaButton: "Enviar candidatura",
  },

  pillars: {
    eyebrow: "A nossa exigência",
    title: "Quatro princípios, nenhum compromisso",
    items: [
      {
        title: "Seleção à mão",
        text: "Provamos tudo e recusamos muito. Uma casa entra no catálogo porque nos convenceu, não porque pagou.",
      },
      {
        title: "Cada um em seu nome",
        text: "Sem marca branca, sem origem vaga. Sabe sempre que família produziu o que está a comprar.",
      },
      {
        title: "Pagamento direto",
        text: "O produtor é creditado da sua parte no momento do seu pagamento. Nunca detemos o dinheiro dele.",
      },
      {
        title: "Rastreabilidade total",
        text: "Cada lote é numerado, analisado e documentado. Certificados disponíveis a pedido.",
      },
    ],
  },

  origins: {
    eyebrow: "As origens",
    title: "Um arco, do Atlântico ao Levante",
    text: "Portugal, Espanha, Itália, Marrocos, Tunísia: as nossas casas distribuem-se por todo o Mediterrâneo. Verões secos, noites frescas, terras exigentes — as condições que dão às colheitas a sua rara concentração.",
    stats: [
      { value: "6", label: "Casas referenciadas" },
      { value: "5", label: "Países de origem" },
      { value: "70 %", label: "Pagos ao produtor" },
      { value: "0", label: "Intermediários" },
    ],
  },

  btob: {
    eyebrow: "Profissionais",
    title: "Um só interlocutor, todas as casas",
    text: "Alta restauração, mercearias finas, importadores e distribuidores: encomende a vários produtores de uma só vez, com uma única fatura e um preço negociado por conta.",
    bullets: [
      "Preços degressivos negociados, aplicados a todo o catálogo",
      "Um carrinho, várias casas, uma única encomenda",
      "Documentos de exportação, certificados de análise e fichas técnicas",
      "Logística de palete, contentor e grupagem internacional",
      "Interlocutor comercial dedicado",
    ],
    cta: "Abrir uma conta profissional",
    ctaSecondary: "Pedir preço profissional",
    cards: [
      {
        title: "Restauração",
        text: "Volumes regulares, consistência de sabor lote após lote, entrega planeada.",
      },
      {
        title: "Distribuição",
        text: "Mercearia fina, garrafeira, concept store: produtos de forte valor percebido e margem sólida.",
      },
      {
        title: "Import / Export",
        text: "Contentores completos, incoterms à escolha, documentação aduaneira completa.",
      },
    ],
  },

  cta: {
    eyebrow: "Começar",
    title: "Comprar ou vender",
    text: "Escolha o seu canal. A nossa equipa responde em 24 horas úteis.",
    particulier: "Quero encomendar",
    pro: "Sou produtor",
  },

  story: {
    metaTitle: "A História Al Arifa",
    metaDescription:
      "De um olival do Alentejo a um mercado de produtores mediterrânicos. A história da casa Al Arifa.",
    eyebrow: "A História",
    title: "Al Arifa",
    lead: "«Al Arifa» — aquela que sabe. Um nome herdado de uma avó que reconhecia, apenas pelo cheiro, o dia exato da colheita.",
    chapters: [
      {
        year: "1898",
        title: "A primeira parcela",
        text: "No fim de um caminho de terra, uma família planta trinta oliveiras numa colina que ninguém queria. O solo é pobre, o declive é duro — mas a luz permanece até ao último momento do dia. São essas árvores, hoje centenárias, que continuam a dar o coração do nosso azeite.",
      },
      {
        year: "1954",
        title: "O lagar",
        text: "A segunda geração constrói o seu próprio lagar a minutos das parcelas. Uma decisão simples e decisiva: nunca mais deixar passar mais de doze horas entre a colheita e a prensagem.",
      },
      {
        year: "1987",
        title: "Aquela que sabe",
        text: "Aïcha, chamada Al Arifa, dirigiu a colheita durante trinta anos. Recusou os rendimentos fáceis e impôs a colheita manual e a seleção fruto a fruto. A sua regra cabia numa frase: «nunca se recupera uma azeitona colhida tarde demais».",
      },
      {
        year: "Hoje",
        title: "A casa abre as portas",
        text: "Ao exportar, encontrámos outras famílias: um apicultor do Médio Atlas, um produtor de açafrão do Souss, um salineiro siciliano. Os mesmos gestos, as mesmas recusas, a mesma dificuldade em ganhar espaço. A Al Arifa tornou-se a montra comum — cada uma em seu nome, cada uma paga diretamente.",
      },
    ],
    valuesTitle: "O que nunca mudará",
    values: [
      {
        title: "A paciência",
        text: "Uma oliveira dá o seu melhor depois de quarenta anos. Não temos pressa.",
      },
      {
        title: "A mão",
        text: "Nenhuma máquina distingue uma azeitona pronta de uma quase pronta. A mão, sim.",
      },
      {
        title: "A verdade",
        text: "Sem lotes de conveniência, sem origem vaga. O que está escrito é o que está no frasco.",
      },
    ],
    quote: "«Não se fabrica um grande azeite. Apenas se evita estragá-lo.»",
    quoteAuthor: "Aïcha — Al Arifa",
    cta: "Descobrir a seleção",
  },

  contact: {
    metaTitle: "Contacto — Al Arifa",
    metaDescription:
      "Contacte a Al Arifa: encomendas, preço profissional, candidatura de produtor ou grandes volumes.",
    eyebrow: "Contacto",
    title: "Vamos falar do seu projeto",
    subtitle: "Uma questão, uma amostra, um volume a orçamentar? Resposta em 24 horas úteis.",
    quickTitle: "Contacto rápido",
    whatsappTitle: "Resposta imediata",
    whatsappText: "A nossa equipa responde diretamente no WhatsApp, de segunda a sábado.",
    whatsapp: "Escrever no WhatsApp",
    whatsappMessage: "Olá Al Arifa, gostaria de informações sobre a vossa seleção.",
    form: {
      name: "Nome completo",
      company: "Empresa (opcional)",
      email: "E-mail",
      phone: "Telefone",
      country: "País",
      profile: "Você é",
      profileOptions: {
        particulier: "Particular",
        restaurant: "Restauração",
        retail: "Mercearia / Distribuição",
        importer: "Importador / Grossista",
        producer: "Produtor candidato",
        other: "Outro",
      },
      volume: "Volume estimado",
      volumePlaceholder: "Ex. 48 unidades / mês",
      message: "A sua mensagem",
      messagePlaceholder: "Descreva a sua necessidade em algumas linhas…",
      consent: "Aceito ser contactado sobre o meu pedido.",
      submit: "Enviar pedido",
      submitting: "A enviar…",
      successTitle: "Pedido enviado",
      successText: "Obrigado. A nossa equipa responde em 24 horas úteis.",
      errorRequired: "Este campo é obrigatório.",
      errorEmail: "Endereço de e-mail inválido.",
      errorConsent: "Confirme o seu acordo, por favor.",
      errorGeneric: "O envio falhou. Tente novamente ou contacte-nos no WhatsApp.",
      another: "Enviar outro pedido",
    },
    infoTitle: "Informações",
    info: [
      { label: "E-mail", value: "contact@al-arifa.com" },
      { label: "Telefone", value: "+33 6 00 00 00 00" },
      { label: "Horário", value: "Seg. – Sáb. · 9h – 19h (CET)" },
      { label: "Exportação", value: "Europa, Magrebe, Golfo, Ásia, Américas" },
    ],
  },

  pro: {
    metaTitle: "Área do produtor — Al Arifa",
    metaDescription:
      "Área do produtor Al Arifa: os seus produtos, encomendas, receitas e conta de pagamento.",
    eyebrow: "Área do produtor",
    title: "A sua casa",
    subtitle: "Os seus produtos, encomendas e pagamentos, num espaço privado.",
    tabs: { login: "Iniciar sessão", register: "Candidatar-me" },
    login: {
      title: "Iniciar sessão",
      email: "E-mail profissional",
      password: "Palavra-passe",
      submit: "Entrar",
      error: "Credenciais incorretas.",
      pendingError:
        "A sua candidatura está em análise. Será notificado por e-mail assim que for aprovada.",
      rejectedError: "A sua candidatura não foi aceite. Contacte-nos para saber mais.",
      demoHint: "Demo — admin: admin@al-arifa.com / arifa2024",
    },
    register: {
      title: "Candidatura de produtor",
      intro:
        "Apresente-nos a sua casa. Analisamos cada candidatura pessoalmente e respondemos em 48 horas úteis.",
      accountType: {
        label: "Tipo de conta",
        producer: "Produtor",
        producerNote: "Vendo os meus produtos",
        buyer: "Comprador profissional",
        buyerNote: "Compro para o meu estabelecimento",
      },
      company: "Nome da casa",
      vat: "N.º de IVA / registo comercial",
      contactName: "Nome do contacto",
      email: "E-mail profissional",
      phone: "Telefone",
      country: "País",
      activity: "Família de produtos",
      volume: "Produção anual estimada",
      password: "Palavra-passe",
      passwordConfirm: "Confirmar palavra-passe",
      submit: "Enviar a minha candidatura",
      success: "Candidatura registada",
      successText: "Obrigado. Vamos analisar o seu processo e responder em 48 horas úteis.",
      errorExists: "Já existe uma candidatura com este e-mail.",
      errorPassword: "A palavra-passe deve ter pelo menos 8 caracteres.",
      errorMatch: "As palavras-passe não coincidem.",
    },
    dashboard: {
      welcome: "Olá",
      status: "Estado",
      logout: "Terminar sessão",
      payoutsTitle: "Conta de pagamento",
      payoutsActive: "Ativa — a sua parte é creditada automaticamente",
      payoutsPending: "A ativar para receber os seus pagamentos",
      payoutsCta: "Ativar a minha conta",
      payoutsSoon: "Integração Stripe Connect em curso",
      revenueTitle: "As suas receitas",
      revenueGross: "Volume cobrado",
      revenueYours: "A sua parte",
      revenueCommission: "Comissão da plataforma",
      yourRate: "A sua taxa",
      productsTitle: "Os seus produtos",
      productsEmpty: "Ainda sem produtos publicados.",
      ordersTitle: "As suas encomendas",
      ordersEmpty: "Ainda sem encomendas.",
      orderRef: "Referência",
      orderDate: "Data",
      orderQty: "Artigos",
      orderTotal: "Montante",
      orderYours: "A sua parte",
      orderStatus: "Estado",
      docsTitle: "Documentos",
      docs: [
        "Contrato de referenciação (PDF)",
        "Extrato de pagamentos do mês",
        "Condições gerais para produtores",
      ],
      docsSoon: "Brevemente disponível",
    },
    buyer: {
      title: "As suas condições",
      discount: "O seu desconto de catálogo",
      discountNote: "Desconto negociado, aplicado automaticamente a todo o catálogo.",
      catalogCta: "Percorrer a seleção",
      none: "Ainda sem desconto negociado.",
      approved: "Conta de comprador validada",
    },
    status: {
      pending: "Candidatura em análise",
      approved: "Casa referenciada",
      rejected: "Não aceite",
    },
  },

  admin: {
    metaTitle: "Administração — Al Arifa",
    title: "Administração",
    subtitle: "Produtores referenciados, taxas de comissão e acompanhamento de encomendas.",
    login: {
      title: "Acesso de administrador",
      email: "E-mail",
      password: "Palavra-passe",
      submit: "Entrar",
      error: "Acesso recusado.",
    },
    tabs: { accounts: "Produtores", orders: "Encomendas", pricing: "Comissões" },
    accounts: {
      title: "Candidaturas e casas referenciadas",
      empty: "Nenhuma candidatura registada.",
      company: "Casa",
      contact: "Contacto",
      country: "País",
      activity: "Família",
      registered: "Candidatura em",
      status: "Estado",
      actions: "Ações",
      approve: "Referenciar",
      reject: "Recusar",
      pendingCount: "em espera",
    },
    pricing: {
      title: "Taxas de comissão",
      note: "Defina a parte da plataforma para cada casa referenciada. O restante é pago ao produtor no momento do pagamento. Deixe vazio para aplicar a taxa padrão.",
      client: "Casa",
      publicPrice: "Taxa padrão",
      customPrice: "Taxa aplicada",
      discount: "Parte do produtor",
      type: "Tipo",
      simulation: "Numa encomenda de 100 €",
      producerGets: "O produtor recebe",
      platformGets: "A plataforma retém",
      buyerDiscount: "Desconto de catálogo",
      commissionLabel: "Comissão da plataforma",
      dragHint: "Arraste para ajustar",
      save: "Guardar",
      saved: "Taxas guardadas",
      placeholder: "Padrão",
    },
    orders: {
      title: "Encomendas",
      empty: "Nenhuma encomenda registada.",
      ref: "Ref.",
      client: "Casa",
      date: "Data",
      qty: "Qtd",
      unit: "Cobrado",
      total: "Parte do produtor",
      commission: "Comissão",
      status: "Estado",
      statuses: {
        pending: "Pendente",
        confirmed: "Confirmada",
        shipped: "Expedida",
        cancelled: "Anulada",
      },
    },
    logout: "Terminar sessão",
  },

  payment: {
    eyebrow: "Pagamento",
    title: "Três formas de pagar",
    subtitle:
      "Cartão bancário, transferência ou criptomoeda — escolha o que convém à sua organização.",
    soon: "Brevemente",
  },

  footer: {
    tagline: "O mercado dos produtores mediterrânicos",
    navTitle: "Navegação",
    proTitle: "Produtores",
    legalTitle: "Informações",
    contactTitle: "Contacto",
    newsletter: "Receber as notícias da colheita",
    newsletterPlaceholder: "O seu e-mail",
    newsletterCta: "Subscrever",
    newsletterOk: "Obrigado, subscrição registada.",
    rights: "Todos os direitos reservados.",
    legal: "Menções legais",
    privacy: "Privacidade",
    terms: "Condições de venda",
    madeIn: "Seis casas · Cinco países · Expedição mundial",
  },

  legal: {
    mentionsTitle: "Menções legais",
    privacyTitle: "Política de privacidade",
    termsTitle: "Condições gerais de venda",
    updated: "Última atualização",
    backHome: "Voltar ao início",
    placeholder:
      "Este documento é fornecido como modelo e deve ser completado com as informações legais definitivas da empresa antes do lançamento comercial.",
  },

  a11y: {
    skipToContent: "Ir para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    changeLanguage: "Mudar de idioma",
    whatsapp: "Contactar no WhatsApp",
    scrollTop: "Voltar ao topo",
    openCart: "Abrir o carrinho",
    itemsInCart: "artigos no carrinho",
  },

  catalogData: {
    producers: {
      "al-arifa": {
        tagline: "Azeite virgem extra, Seleção Herança",
        bio: "Três gerações na mesma colina do Alentejo. Colheita manual, prensagem em doze horas e a recusa obstinada dos rendimentos fáceis.",
      },
      kerkennah: {
        tagline: "Azeites e azeitonas da variedade Chétoui",
        bio: "Uma herdade familiar frente às ilhas Kerkennah, em modo biológico desde 1998. A Chétoui dá um azeite verde, ardente, muito marcado pelo amargor nobre.",
      },
      cedres: {
        tagline: "Méis de alta montanha do Médio Atlas",
        bio: "Colmeias transumantes conduzidas entre 1 400 e 2 000 metros, ao ritmo das florações. Extração a frio, sem pasteurização nem lotes.",
      },
      taliouine: {
        tagline: "Açafrão e especiarias do planalto de Souktana",
        bio: "Uma cooperativa de famílias produtoras de açafrão a 1 800 metros. As flores são colhidas antes do nascer do sol e mondadas no próprio dia.",
      },
      ronda: {
        tagline: "Amêndoas Marcona da serra andaluza",
        bio: "Amendoeiras em socalcos acima de Ronda, em sequeiro. A Marcona amadurece devagar e desenvolve uma polpa redonda, quase doce.",
      },
      trapani: {
        tagline: "Sais marinhos das salinas da Sicília ocidental",
        bio: "Os mesmos tanques de evaporação desde o século XIV, entre Trapani e Marsala. A flor de sal ainda é colhida com pá de madeira.",
      },
    },
    products: {
      "arifa-5l": {
        tagline: "O sabor autêntico dos olivais de Portugal",
        description:
          "Prensado nas doze horas seguintes à colheita. Cor de ouro profundo, nariz de erva fresca e amêndoa verde, final apimentado que assina os grandes azeites.",
      },
      "arifa-500": {
        tagline: "O formato de mesa da Seleção Herança",
        description:
          "O mesmo azeite da lata de cinco litros, em vidro escuro para a mesa. Acidez livre inferior a 0,3 %.",
      },
      "kerkennah-bio": {
        tagline: "Chétoui biológico, primeira prensagem a frio",
        description:
          "Um azeite verde e franco, de amargor assumido e picante longo. Certificado biológico, colheita precoce em novembro.",
      },
      "kerkennah-olives": {
        tagline: "Azeitonas partidas à moda marroquina",
        description:
          "Azeitonas verdes partidas, preparadas com limão em conserva, alho e pimento doce. Não pasteurizadas nem esterilizadas.",
      },
      "cedres-cedre": {
        tagline: "Mel de melada de cedro do Atlas",
        description:
          "Mel escuro, denso, quase resinoso, com notas de madeira e alcaçuz. Uma colheita confidencial, algumas centenas de quilos por ano.",
      },
      "cedres-oranger": {
        tagline: "Mel de flor de laranjeira do Souss",
        description:
          "Cristalização fina e loira, perfume floral imediato. Colhido em pomares de laranjeira amarga em plena floração de primavera.",
      },
      "taliouine-safran": {
        tagline: "Filamentos de primeira categoria, colheita do dia",
        description:
          "Apenas os estigmas vermelhos, sem estilete amarelo. Elevado poder corante, aroma de feno, mel e couro.",
      },
      "taliouine-ras": {
        tagline: "Vinte e sete especiarias reunidas à mão",
        description:
          "A mistura da cooperativa, moída a pedido. Sem corantes, sem realçadores, sem cargas.",
      },
      "ronda-marcona": {
        tagline: "Amêndoas Marcona peladas e torradas",
        description:
          "Torradas a seco e depois salgadas com flor de sal. Polpa redonda e amanteigada, muito diferente das variedades californianas.",
      },
      "ronda-huile": {
        tagline: "Óleo de amêndoa doce de primeira prensagem",
        description:
          "Prensado a frio a partir das amêndoas da herdade, sem refinação. Uso culinário, pastelaria e acabamento.",
      },
      "trapani-fleur": {
        tagline: "Flor de sal colhida à mão",
        description:
          "A fina crosta cristalina retirada à superfície dos tanques, com pá de madeira. Estaladiça, nitidamente iodada, para juntar no fim da cozedura.",
      },
      "trapani-herbes": {
        tagline: "Sal marinho com ervas da Sicília",
        description:
          "Sal marinho integral misturado com orégãos silvestres, alecrim e raspa de limão seca, todos colhidos na ilha.",
      },
    },
  },
};

export default pt;

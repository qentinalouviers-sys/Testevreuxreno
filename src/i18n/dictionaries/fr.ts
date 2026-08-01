const fr = {
  meta: {
    title: "Al Arifa — La place de marché des producteurs de la Méditerranée",
    description:
      "Huiles d'olive, miels, safran, sels et fruits secs de producteurs indépendants du bassin méditerranéen. Chaque maison vend sous sa marque, encaisse directement, sans intermédiaire.",
    ogAlt: "Al Arifa — sélection de producteurs méditerranéens",
  },

  nav: {
    home: "Accueil",
    catalog: "La sélection",
    producers: "Nos producteurs",
    story: "L'Histoire",
    sell: "Devenir producteur",
    order: "Commander",
    contact: "Contact",
    cart: "Panier",
    pro: "Espace producteur",
    admin: "Admin",
    menu: "Menu",
    close: "Fermer",
    language: "Langue",
  },

  hero: {
    eyebrow: "Maisons indépendantes · Méditerranée",
    titleTop: "Les grandes maisons",
    titleBottom: "du Sud, réunies",
    subtitle:
      "Une sélection resserrée de producteurs qui vendent sous leur propre marque. Vous commandez chez plusieurs d'entre eux en une seule fois — chacun est payé directement, sans intermédiaire.",
    ctaPrimary: "Découvrir la sélection",
    ctaSecondary: "Vendre chez Al Arifa",
    scroll: "Faites défiler",
  },

  marquee: [
    "Producteurs indépendants",
    "Chacun sous sa marque",
    "Reversement direct",
    "Six pays méditerranéens",
    "Expédition mondiale",
  ],

  product: {
    eyebrow: "Le produit",
    producer: "Producteur",
    origin: "Origine",
    category: "Catégorie",
    format: "Format",
    price: "Prix",
    tradePrice: "Tarif professionnel",
    tradeNote: "HT, à partir de 12 unités — accessible avec un compte professionnel.",
    quantity: "Quantité",
    addToCart: "Ajouter au panier",
    added: "Ajouté au panier",
    viewCart: "Voir le panier",
    shipping: "Expédié par le producteur",
    freeShippingFrom: "Port offert dès",
    otherProducts: "Autres produits de la maison",
    backToCatalog: "Retour à la sélection",
    notFound: "Produit introuvable",
  },

  catalog: {
    metaTitle: "La sélection",
    metaDescription:
      "Tous les produits des maisons référencées : huiles d'olive, miels, épices, sels, olives et fruits secs.",
    eyebrow: "La sélection",
    title: "Tout le catalogue",
    subtitle:
      "Chaque produit vient d'une maison indépendante. Filtrez par famille ou par producteur.",
    allCategories: "Toutes les familles",
    allProducers: "Tous les producteurs",
    filterCategory: "Famille",
    filterProducer: "Producteur",
    results: "produits",
    empty: "Aucun produit ne correspond à ces filtres.",
    reset: "Réinitialiser",
    categories: {
      huile: "Huiles",
      miel: "Miels",
      epices: "Épices",
      "fruits-secs": "Fruits secs",
      sel: "Sels",
      olives: "Olives",
    },
  },

  producers: {
    metaTitle: "Nos producteurs",
    metaDescription:
      "Les maisons référencées chez Al Arifa : six familles de producteurs du bassin méditerranéen, chacune sous sa propre marque.",
    eyebrow: "Les maisons",
    title: "Nos producteurs",
    subtitle:
      "Six familles, six terroirs, six façons de faire. Aucune n'a renoncé à son nom en nous rejoignant.",
    since: "Maison fondée en",
    products: "produits",
    discover: "Découvrir la maison",
    theirProducts: "Les produits de la maison",
    payoutsActive: "Reversement direct actif",
    payoutsPending: "Compte de reversement en cours d'activation",
    notFound: "Producteur introuvable",
    backToProducers: "Retour aux producteurs",
  },

  cart: {
    metaTitle: "Votre panier",
    eyebrow: "Panier",
    title: "Votre commande",
    empty: "Votre panier est vide.",
    emptyCta: "Parcourir la sélection",
    shippedBy: "Expédié par",
    remove: "Retirer",
    goods: "Sous-total produits",
    shipping: "Livraison",
    freeShipping: "Offerte",
    subtotal: "Sous-total",
    total: "Total à payer",
    checkout: "Passer commande",
    continue: "Continuer mes achats",
    multiProducerNote:
      "Votre panier contient des produits de plusieurs maisons. Vous ne payez qu'une fois : chaque producteur reçoit sa part et expédie son colis.",
    parcels: "colis",
    parcelNote: "Vous recevrez un colis par producteur.",
  },

  split: {
    title: "Répartition du paiement",
    subtitle:
      "Ce que devient votre règlement. Aucun montant ne transite par un compte intermédiaire.",
    producerShare: "Reversé au producteur",
    platformShare: "Commission Al Arifa",
    commission: "commission",
    shippingNote: "Les frais de port sont reversés en totalité au producteur qui expédie.",
    transfers: "virements distincts",
    explain:
      "Le paiement est encaissé une seule fois puis scindé automatiquement. Chaque maison est créditée de sa part le jour même, sans facture à émettre ni avance de trésorerie.",
  },

  checkout: {
    metaTitle: "Commander",
    metaDescription: "Finalisez votre commande auprès des maisons sélectionnées.",
    eyebrow: "Commander",
    title: "Finaliser la commande",
    subtitle: "Vérifiez votre panier, puis choisissez votre moyen de paiement.",
    summary: "Récapitulatif",
    delivery: "Livraison",
    deliveryNote: "Chaque maison expédie depuis son atelier.",
    empty: "Votre panier est vide.",
    emptyCta: "Parcourir la sélection",
    payment: {
      title: "Mode de paiement",
      subtitle: "Sélectionnez votre moyen de paiement préféré.",
      card: { name: "Carte bancaire", note: "Visa, Mastercard, Amex — via Stripe" },
      transfer: { name: "Virement bancaire", note: "SEPA & SWIFT — idéal grands volumes" },
      crypto: { name: "Cryptomonnaie", note: "BTC, ETH, USDT" },
      cta: "Valider et payer",
    },
    modal: {
      title: "Paiement en cours de développement",
      text: "Le module de paiement scindé est en cours d'intégration avec Stripe Connect. En attendant, notre équipe finalise votre commande manuellement sous 24 h ouvrées.",
      hint: "Contactez-nous par formulaire ou WhatsApp pour valider votre commande immédiatement.",
      contact: "Nous contacter",
      close: "Fermer",
    },
  },

  sell: {
    metaTitle: "Devenir producteur référencé",
    metaDescription:
      "Vendez sous votre propre marque sur Al Arifa. Vous encaissez directement 70 % de chaque commande, sans refacturation ni avance de trésorerie.",
    eyebrow: "Producteurs",
    title: "Votre marque, votre argent",
    subtitle:
      "Nous ne rachetons pas votre production et nous ne la revendons pas sous notre nom. Vous vendez chez vous, sur notre vitrine.",
    heroCta: "Déposer ma candidature",
    heroCtaAlt: "Parler à quelqu'un",

    splitTitle: "La règle est simple",
    splitLead: "Sur chaque commande de 100 €",
    splitProducer: "pour vous",
    splitPlatform: "pour la plateforme",
    splitNote:
      "Les frais de port vous sont reversés en totalité. La commission ne porte que sur la marchandise.",

    pillarsTitle: "Ce que ça change concrètement",
    pillars: [
      {
        title: "Pas de refacturation",
        text: "Notre commission est prélevée à la source au moment du paiement. Vous n'avez aucune facture à émettre, aucun montant à nous reverser.",
      },
      {
        title: "Pas d'avance de trésorerie",
        text: "Votre part est créditée le jour de la commande. Vous n'attendez pas un règlement à trente ou soixante jours.",
      },
      {
        title: "Votre marque reste la vôtre",
        text: "Votre nom, votre étiquette, votre page. Le client sait chez qui il achète, et vous conservez la relation.",
      },
      {
        title: "Vous ne cédez pas votre stock",
        text: "Aucun achat ferme, aucun dépôt-vente. Vous expédiez ce qui est vendu, depuis votre atelier.",
      },
    ],

    howTitle: "Comment ça se passe",
    steps: [
      {
        title: "Candidature",
        text: "Vous nous présentez votre maison, vos produits et vos volumes. Nous répondons sous 48 heures ouvrées.",
      },
      {
        title: "Vérification",
        text: "Nous goûtons, nous vérifions vos analyses et vos documents. C'est la seule étape où nous sommes exigeants.",
      },
      {
        title: "Compte de reversement",
        text: "Vous ouvrez votre compte de paiement en cinq minutes. C'est lui qui recevra votre part, directement.",
      },
      {
        title: "Mise en ligne",
        text: "Votre page de marque et vos produits sont publiés. Vous pilotez vos prix et vos stocks depuis votre espace.",
      },
    ],

    faqTitle: "Les questions qui reviennent",
    faq: [
      {
        q: "Quand suis-je payé exactement ?",
        a: "Votre part est créditée sur votre compte de reversement au moment où le client paie. Le virement vers votre compte bancaire suit ensuite le calendrier standard, réglable jusqu'au quotidien.",
      },
      {
        q: "Qui porte les frais bancaires ?",
        a: "La plateforme, sur sa part. Les 70 % annoncés sont nets pour vous.",
      },
      {
        q: "Et si un client demande un remboursement ?",
        a: "Le remboursement est repris proportionnellement des deux côtés : votre part et notre commission. Personne n'avance pour l'autre.",
      },
      {
        q: "Puis-je vendre ailleurs en même temps ?",
        a: "Oui. Aucune exclusivité, aucun engagement de durée, aucun minimum de volume.",
      },
    ],

    ctaTitle: "Votre maison a sa place ici ?",
    ctaText: "Présentez-la nous. Nous regardons chaque candidature nous-mêmes.",
    ctaButton: "Déposer ma candidature",
  },

  pillars: {
    eyebrow: "Notre exigence",
    title: "Quatre principes, aucun compromis",
    items: [
      {
        title: "Sélection à la main",
        text: "Nous goûtons tout, nous refusons beaucoup. Une maison entre au catalogue parce qu'elle nous a convaincus, pas parce qu'elle a payé.",
      },
      {
        title: "Chacun sous son nom",
        text: "Pas de marque blanche, pas d'origine floue. Vous savez toujours quelle famille a produit ce que vous achetez.",
      },
      {
        title: "Paiement direct",
        text: "Le producteur est crédité de sa part au moment de votre règlement. Nous ne détenons jamais son argent.",
      },
      {
        title: "Traçabilité totale",
        text: "Chaque lot est numéroté, analysé et documenté. Certificats disponibles sur demande.",
      },
    ],
  },

  origins: {
    eyebrow: "Les origines",
    title: "Un arc, de l'Atlantique au Levant",
    text: "Portugal, Espagne, Italie, Maroc, Tunisie : nos maisons se répartissent sur tout le pourtour méditerranéen. Des étés secs, des nuits fraîches, des terres exigeantes — les conditions qui donnent aux récoltes leur concentration rare.",
    stats: [
      { value: "6", label: "Maisons référencées" },
      { value: "5", label: "Pays d'origine" },
      { value: "70 %", label: "Reversés au producteur" },
      { value: "0", label: "Intermédiaire" },
    ],
  },

  btob: {
    eyebrow: "Professionnels",
    title: "Un seul interlocuteur, toutes les maisons",
    text: "Restauration gastronomique, épiceries fines, importateurs et distributeurs : commandez chez plusieurs producteurs en une seule fois, avec une seule facture et un tarif négocié par compte.",
    bullets: [
      "Tarifs dégressifs négociés, appliqués sur tout le catalogue",
      "Un panier, plusieurs maisons, une seule commande",
      "Documents export, certificats d'analyse et fiches techniques",
      "Logistique palette, conteneur et groupage international",
      "Interlocuteur commercial dédié",
    ],
    cta: "Ouvrir un compte professionnel",
    ctaSecondary: "Demander le tarif pro",
    cards: [
      {
        title: "Restauration",
        text: "Volumes réguliers, régularité gustative lot après lot, livraison planifiée.",
      },
      {
        title: "Distribution",
        text: "Épicerie fine, cave, concept store : des produits à forte valeur perçue et à marge solide.",
      },
      {
        title: "Import / Export",
        text: "Conteneurs complets, incoterms au choix, documentation douanière complète.",
      },
    ],
  },

  cta: {
    eyebrow: "Commencer",
    title: "Acheter ou vendre",
    text: "Choisissez votre canal. Notre équipe revient vers vous sous 24 heures ouvrées.",
    particulier: "Je veux commander",
    pro: "Je suis producteur",
  },

  story: {
    metaTitle: "L'Histoire Al Arifa",
    metaDescription:
      "D'une oliveraie de l'Alentejo à une place de marché de producteurs méditerranéens. L'histoire de la maison Al Arifa.",
    eyebrow: "L'Histoire",
    title: "Al Arifa",
    lead: "« Al Arifa » — celle qui sait. Un nom hérité d'une grand-mère qui reconnaissait, rien qu'à l'odeur, le jour exact où il fallait cueillir.",
    chapters: [
      {
        year: "1898",
        title: "La première parcelle",
        text: "Au bout d'un chemin de terre, une famille plante trente oliviers sur une colline que personne ne voulait. Le sol est pauvre, la pente est rude — mais la lumière y reste jusqu'au dernier moment du jour. Ce sont ces arbres, aujourd'hui centenaires, qui donnent encore le cœur de notre huile.",
      },
      {
        year: "1954",
        title: "Le moulin",
        text: "La deuxième génération construit son propre moulin à quelques minutes des parcelles. Une décision simple et décisive : ne plus jamais laisser passer plus de douze heures entre la cueillette et la pression.",
      },
      {
        year: "1987",
        title: "Celle qui sait",
        text: "Aïcha, dite Al Arifa, dirige la récolte pendant trente ans. Elle refuse les rendements faciles, impose la cueillette manuelle et la sélection fruit par fruit. Sa règle tient en une phrase : « on ne rattrape jamais une olive cueillie trop tard ».",
      },
      {
        year: "Aujourd'hui",
        title: "La maison ouvre ses portes",
        text: "En exportant, nous avons rencontré d'autres familles : un apiculteur du Moyen Atlas, un safranier du Souss, un saunier sicilien. Mêmes gestes, mêmes refus, mêmes difficultés à se faire une place. Al Arifa est devenue leur vitrine commune — chacune sous son nom, chacune payée directement.",
      },
    ],
    valuesTitle: "Ce qui ne changera pas",
    values: [
      {
        title: "La patience",
        text: "Un olivier donne son meilleur après quarante ans. Nous ne sommes pas pressés.",
      },
      {
        title: "La main",
        text: "Aucune machine ne distingue une olive prête d'une olive presque prête. La main, oui.",
      },
      {
        title: "La vérité",
        text: "Pas d'assemblage de complaisance, pas d'origine floue. Ce qui est écrit est ce qui est dans le bocal.",
      },
    ],
    quote: "« On ne fabrique pas une grande huile. On évite simplement de l'abîmer. »",
    quoteAuthor: "Aïcha — Al Arifa",
    cta: "Découvrir la sélection",
  },

  contact: {
    metaTitle: "Contact — Al Arifa",
    metaDescription:
      "Contactez Al Arifa : commande, tarif professionnel, candidature producteur ou grand volume.",
    eyebrow: "Contact",
    title: "Parlons de votre projet",
    subtitle: "Une question, un échantillon, un volume à chiffrer ? Réponse sous 24 heures ouvrées.",
    quickTitle: "Contact rapide",
    whatsappTitle: "Réponse immédiate",
    whatsappText: "Notre équipe répond directement sur WhatsApp, du lundi au samedi.",
    whatsapp: "Écrire sur WhatsApp",
    whatsappMessage: "Bonjour Al Arifa, je souhaite des informations sur votre sélection.",
    form: {
      name: "Nom et prénom",
      company: "Société (optionnel)",
      email: "E-mail",
      phone: "Téléphone",
      country: "Pays",
      profile: "Vous êtes",
      profileOptions: {
        particulier: "Particulier",
        restaurant: "Restaurateur",
        retail: "Épicerie / Distribution",
        importer: "Importateur / Grossiste",
        producer: "Producteur candidat",
        other: "Autre",
      },
      volume: "Volume estimé",
      volumePlaceholder: "Ex. 48 unités / mois",
      message: "Votre message",
      messagePlaceholder: "Décrivez votre besoin en quelques lignes…",
      consent: "J'accepte d'être recontacté au sujet de ma demande.",
      submit: "Envoyer la demande",
      submitting: "Envoi en cours…",
      successTitle: "Demande envoyée",
      successText: "Merci. Notre équipe vous répond sous 24 heures ouvrées.",
      errorRequired: "Ce champ est obligatoire.",
      errorEmail: "Adresse e-mail invalide.",
      errorConsent: "Merci de valider votre accord.",
      errorGeneric: "L'envoi a échoué. Réessayez ou contactez-nous sur WhatsApp.",
      another: "Envoyer une autre demande",
    },
    infoTitle: "Informations",
    info: [
      { label: "E-mail", value: "contact@al-arifa.com" },
      { label: "Téléphone", value: "+33 6 00 00 00 00" },
      { label: "Horaires", value: "Lun. – Sam. · 9h – 19h (CET)" },
      { label: "Export", value: "Europe, Maghreb, Golfe, Asie, Amériques" },
    ],
  },

  pro: {
    metaTitle: "Espace producteur — Al Arifa",
    metaDescription:
      "Espace producteur Al Arifa : vos produits, vos commandes, vos revenus et votre compte de reversement.",
    eyebrow: "Espace producteur",
    title: "Votre maison",
    subtitle: "Vos produits, vos commandes et vos reversements, réunis dans un espace privé.",
    tabs: { login: "Connexion", register: "Candidater" },
    login: {
      title: "Connexion",
      email: "E-mail professionnel",
      password: "Mot de passe",
      submit: "Se connecter",
      error: "Identifiants incorrects.",
      pendingError:
        "Votre candidature est en cours d'examen. Vous serez notifié par e-mail dès validation.",
      rejectedError: "Votre candidature n'a pas été retenue. Contactez-nous pour en savoir plus.",
      demoHint: "Démo — admin : admin@al-arifa.com / arifa2024",
    },
    register: {
      title: "Candidature producteur",
      intro:
        "Présentez-nous votre maison. Nous examinons chaque candidature nous-mêmes et répondons sous 48 heures ouvrées.",
      company: "Nom de la maison",
      vat: "N° TVA / registre du commerce",
      contactName: "Nom du contact",
      email: "E-mail professionnel",
      phone: "Téléphone",
      country: "Pays",
      activity: "Famille de produits",
      volume: "Production annuelle estimée",
      password: "Mot de passe",
      passwordConfirm: "Confirmer le mot de passe",
      submit: "Envoyer ma candidature",
      success: "Candidature enregistrée",
      successText:
        "Merci. Nous examinons votre dossier et revenons vers vous sous 48 heures ouvrées.",
      errorExists: "Une candidature existe déjà avec cet e-mail.",
      errorPassword: "Le mot de passe doit contenir au moins 8 caractères.",
      errorMatch: "Les mots de passe ne correspondent pas.",
    },
    dashboard: {
      welcome: "Bonjour",
      status: "Statut",
      logout: "Déconnexion",
      payoutsTitle: "Compte de reversement",
      payoutsActive: "Actif — vos parts sont créditées automatiquement",
      payoutsPending: "À activer pour recevoir vos reversements",
      payoutsCta: "Activer mon compte",
      payoutsSoon: "Intégration Stripe Connect en cours",
      revenueTitle: "Vos revenus",
      revenueGross: "Volume encaissé",
      revenueYours: "Votre part",
      revenueCommission: "Commission plateforme",
      yourRate: "Votre taux",
      productsTitle: "Vos produits",
      productsEmpty: "Aucun produit publié pour le moment.",
      ordersTitle: "Vos commandes",
      ordersEmpty: "Aucune commande pour le moment.",
      orderRef: "Référence",
      orderDate: "Date",
      orderQty: "Articles",
      orderTotal: "Montant",
      orderYours: "Votre part",
      orderStatus: "Statut",
      docsTitle: "Documents",
      docs: [
        "Contrat de référencement (PDF)",
        "Relevé de reversements du mois",
        "Conditions générales producteurs",
      ],
      docsSoon: "Bientôt disponible",
    },
    status: {
      pending: "Candidature en cours d'examen",
      approved: "Maison référencée",
      rejected: "Non retenue",
    },
  },

  admin: {
    metaTitle: "Administration — Al Arifa",
    title: "Administration",
    subtitle: "Producteurs référencés, taux de commission et suivi des commandes.",
    login: {
      title: "Accès administrateur",
      email: "E-mail",
      password: "Mot de passe",
      submit: "Entrer",
      error: "Accès refusé.",
    },
    tabs: { accounts: "Producteurs", orders: "Commandes", pricing: "Commissions" },
    accounts: {
      title: "Candidatures et maisons référencées",
      empty: "Aucune candidature enregistrée.",
      company: "Maison",
      contact: "Contact",
      country: "Pays",
      activity: "Famille",
      registered: "Candidature du",
      status: "Statut",
      actions: "Actions",
      approve: "Référencer",
      reject: "Refuser",
      pendingCount: "en attente",
    },
    pricing: {
      title: "Taux de commission",
      note: "Définissez la part de la plateforme pour chaque maison référencée. Le solde est reversé au producteur au moment du paiement. Laissez vide pour appliquer le taux standard.",
      client: "Maison",
      publicPrice: "Taux standard",
      customPrice: "Taux appliqué",
      discount: "Part producteur",
      save: "Enregistrer",
      saved: "Taux enregistrés",
      placeholder: "Standard",
    },
    orders: {
      title: "Commandes",
      empty: "Aucune commande enregistrée.",
      ref: "Réf.",
      client: "Maison",
      date: "Date",
      qty: "Qté",
      unit: "Encaissé",
      total: "Part producteur",
      commission: "Commission",
      status: "Statut",
      statuses: {
        pending: "En attente",
        confirmed: "Confirmée",
        shipped: "Expédiée",
        cancelled: "Annulée",
      },
    },
    logout: "Déconnexion",
  },

  payment: {
    eyebrow: "Paiement",
    title: "Trois façons de régler",
    subtitle:
      "Carte bancaire, virement ou cryptomonnaie — choisissez ce qui convient à votre organisation.",
    soon: "Bientôt",
  },

  footer: {
    tagline: "La place de marché des producteurs méditerranéens",
    navTitle: "Navigation",
    proTitle: "Producteurs",
    legalTitle: "Informations",
    contactTitle: "Contact",
    newsletter: "Recevoir nos actualités récolte",
    newsletterPlaceholder: "Votre e-mail",
    newsletterCta: "S'inscrire",
    newsletterOk: "Merci, inscription enregistrée.",
    rights: "Tous droits réservés.",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    terms: "CGV",
    madeIn: "Six maisons · Cinq pays · Expédition mondiale",
  },

  legal: {
    mentionsTitle: "Mentions légales",
    privacyTitle: "Politique de confidentialité",
    termsTitle: "Conditions générales de vente",
    updated: "Dernière mise à jour",
    backHome: "Retour à l'accueil",
    placeholder:
      "Ce document est fourni à titre de gabarit et doit être complété avec les informations légales définitives de la société avant mise en ligne commerciale.",
  },

  a11y: {
    skipToContent: "Aller au contenu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    changeLanguage: "Changer de langue",
    whatsapp: "Contacter sur WhatsApp",
    scrollTop: "Remonter en haut",
    openCart: "Ouvrir le panier",
    itemsInCart: "articles dans le panier",
  },

  /**
   * Contenu éditorial du catalogue. Les noms de marque et de produit ne sont
   * jamais traduits — ce sont des noms propres, ils restent tels qu'ils figurent
   * sur l'étiquette. Seules les descriptions changent de langue.
   */
  catalogData: {
    producers: {
      "al-arifa": {
        tagline: "Huile d'olive vierge extra, Sélection Héritage",
        bio: "Trois générations sur la même colline de l'Alentejo. Cueillette manuelle, pression dans les douze heures, et le refus obstiné des rendements faciles.",
      },
      kerkennah: {
        tagline: "Huiles et olives de la variété Chétoui",
        bio: "Un domaine familial face aux îles Kerkennah, converti au bio dès 1998. La Chétoui y donne une huile verte, ardente, très marquée par l'amertume noble.",
      },
      cedres: {
        tagline: "Miels de haute montagne du Moyen Atlas",
        bio: "Des ruches transhumantes conduites entre 1 400 et 2 000 mètres, au rythme des floraisons. Récolte à froid, sans pasteurisation ni mélange.",
      },
      taliouine: {
        tagline: "Safran et épices du plateau de Souktana",
        bio: "Une coopérative de familles safranières à 1 800 mètres d'altitude. Les fleurs sont cueillies avant le lever du soleil et émondées le jour même.",
      },
      ronda: {
        tagline: "Amandes Marcona de la serranía andalouse",
        bio: "Des amandiers en terrasses au-dessus de Ronda, cultivés en sec. La Marcona y mûrit lentement et développe une chair ronde, presque sucrée.",
      },
      trapani: {
        tagline: "Sels marins des salines de Sicile occidentale",
        bio: "Les mêmes bassins d'évaporation depuis le XIVᵉ siècle, entre Trapani et Marsala. La fleur de sel y est encore récoltée à la pelle de bois.",
      },
    },
    products: {
      "arifa-5l": {
        tagline: "Le goût authentique des oliveraies du Portugal",
        description:
          "Pressée dans les douze heures suivant la cueillette. Robe or profond, nez d'herbe fraîche et d'amande verte, finale poivrée qui signe les grandes huiles.",
      },
      "arifa-500": {
        tagline: "Le format de table de la Sélection Héritage",
        description:
          "La même huile que le bidon de cinq litres, en bouteille de verre teinté pour la table. Acidité libre inférieure à 0,3 %.",
      },
      "kerkennah-bio": {
        tagline: "Chétoui bio, première pression à froid",
        description:
          "Une huile verte et franche, à l'amertume assumée et à l'ardence longue. Certifiée biologique, récolte précoce en novembre.",
      },
      "kerkennah-olives": {
        tagline: "Olives cassées à la marocaine",
        description:
          "Olives vertes cassées, préparées au citron confit, à l'ail et au piment doux. Ni pasteurisées ni stérilisées.",
      },
      "cedres-cedre": {
        tagline: "Miel de miellat de cèdre de l'Atlas",
        description:
          "Miel sombre, dense, presque résineux, aux notes de bois et de réglisse. Une récolte confidentielle, quelques centaines de kilos par an.",
      },
      "cedres-oranger": {
        tagline: "Miel de fleur d'oranger du Souss",
        description:
          "Cristallisation fine et blonde, parfum floral immédiat. Récolté sur les vergers d'orangers amers en pleine floraison de printemps.",
      },
      "taliouine-safran": {
        tagline: "Filaments de première catégorie, récolte du jour",
        description:
          "Uniquement les stigmates rouges, sans style jaune. Puissance colorante élevée, parfum de foin, de miel et de cuir.",
      },
      "taliouine-ras": {
        tagline: "Vingt-sept épices assemblées à la main",
        description:
          "Le mélange de la coopérative, moulu à la demande. Aucun colorant, aucun exhausteur, aucune charge.",
      },
      "ronda-marcona": {
        tagline: "Amandes Marcona émondées et grillées",
        description:
          "Grillées à sec puis salées à la fleur de sel. Chair ronde et beurrée, très différente des variétés californiennes.",
      },
      "ronda-huile": {
        tagline: "Huile d'amande douce de première pression",
        description:
          "Pressée à froid à partir des amandes du domaine, sans raffinage. Usage culinaire, pâtisserie et finition.",
      },
      "trapani-fleur": {
        tagline: "Fleur de sel récoltée à la main",
        description:
          "La fine croûte cristalline prélevée en surface des bassins, à la pelle de bois. Croquante, nettement iodée, à ajouter en fin de cuisson.",
      },
      "trapani-herbes": {
        tagline: "Sel marin aux herbes de Sicile",
        description:
          "Sel marin intégral mêlé d'origan sauvage, de romarin et de zeste de citron séché, tous récoltés sur l'île.",
      },
    },
  },
};

/** Le dictionnaire français fait foi : toutes les autres langues doivent en respecter la forme. */
export type Dictionary = typeof fr;

export default fr;

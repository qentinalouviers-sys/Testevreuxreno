import type { Dictionary } from "./fr";

const en: Dictionary = {
  meta: {
    title: "Al Arifa — The marketplace for Mediterranean producers",
    description:
      "Olive oils, honeys, saffron, salts and nuts from independent producers across the Mediterranean. Every house sells under its own brand and is paid directly, with no middleman.",
    ogAlt: "Al Arifa — a selection of Mediterranean producers",
  },

  nav: {
    home: "Home",
    catalog: "The selection",
    producers: "Our producers",
    story: "Our Story",
    sell: "Become a producer",
    order: "Order",
    contact: "Contact",
    cart: "Cart",
    pro: "Producer area",
    admin: "Admin",
    menu: "Menu",
    close: "Close",
    language: "Language",
  },

  hero: {
    eyebrow: "Independent houses · Mediterranean",
    titleTop: "The great houses",
    titleBottom: "of the South, together",
    subtitle:
      "A tight selection of producers who sell under their own brand. Order from several of them at once — each one is paid directly, with no middleman.",
    ctaPrimary: "Discover the selection",
    ctaSecondary: "Sell on Al Arifa",
    scroll: "Scroll",
  },

  marquee: [
    "Independent producers",
    "Each under its own brand",
    "Paid directly",
    "Six Mediterranean countries",
    "Worldwide shipping",
  ],

  product: {
    eyebrow: "The product",
    producer: "Producer",
    origin: "Origin",
    category: "Category",
    format: "Format",
    price: "Price",
    tradePrice: "Trade price",
    tradeNote: "Excl. tax, from 12 units — available with a trade account.",
    quantity: "Quantity",
    addToCart: "Add to cart",
    added: "Added to cart",
    viewCart: "View cart",
    shipping: "Shipped by the producer",
    freeShippingFrom: "Free shipping from",
    otherProducts: "More from this house",
    backToCatalog: "Back to the selection",
    notFound: "Product not found",
  },

  catalog: {
    metaTitle: "The selection",
    metaDescription:
      "Every product from our listed houses: olive oils, honeys, spices, salts, olives and nuts.",
    eyebrow: "The selection",
    title: "The full catalogue",
    subtitle: "Every product comes from an independent house. Filter by family or by producer.",
    allCategories: "All families",
    allProducers: "All producers",
    filterCategory: "Family",
    filterProducer: "Producer",
    results: "products",
    empty: "No product matches these filters.",
    reset: "Reset",
    categories: {
      huile: "Oils",
      miel: "Honeys",
      epices: "Spices",
      "fruits-secs": "Nuts",
      sel: "Salts",
      olives: "Olives",
    },
  },

  producers: {
    metaTitle: "Our producers",
    metaDescription:
      "The houses listed on Al Arifa: six producer families from around the Mediterranean, each under its own brand.",
    eyebrow: "The houses",
    title: "Our producers",
    subtitle:
      "Six families, six terroirs, six ways of working. Not one gave up its name to join us.",
    since: "House founded in",
    products: "products",
    discover: "Discover the house",
    theirProducts: "Products from this house",
    payoutsActive: "Direct payouts active",
    payoutsPending: "Payout account being activated",
    notFound: "Producer not found",
    backToProducers: "Back to producers",
  },

  cart: {
    metaTitle: "Your cart",
    eyebrow: "Cart",
    title: "Your order",
    empty: "Your cart is empty.",
    emptyCta: "Browse the selection",
    shippedBy: "Shipped by",
    remove: "Remove",
    goods: "Products subtotal",
    shipping: "Shipping",
    freeShipping: "Free",
    subtotal: "Subtotal",
    total: "Total to pay",
    checkout: "Checkout",
    continue: "Continue shopping",
    multiProducerNote:
      "Your cart holds products from several houses. You pay only once: each producer receives their share and ships their own parcel.",
    parcels: "parcels",
    parcelNote: "You will receive one parcel per producer.",
  },

  split: {
    title: "How the payment is split",
    subtitle: "Where your money goes. No amount ever sits in an intermediary account.",
    producerShare: "Paid to the producer",
    platformShare: "Al Arifa commission",
    commission: "commission",
    shippingNote: "Shipping costs go in full to the producer who ships.",
    transfers: "separate transfers",
    explain:
      "The payment is collected once, then split automatically. Every house is credited its share the same day, with no invoice to issue and no cash advance.",
  },

  checkout: {
    metaTitle: "Checkout",
    metaDescription: "Complete your order with the selected houses.",
    eyebrow: "Checkout",
    title: "Complete your order",
    subtitle: "Review your cart, then choose your payment method.",
    summary: "Summary",
    delivery: "Delivery",
    deliveryNote: "Each house ships from its own workshop.",
    empty: "Your cart is empty.",
    emptyCta: "Browse the selection",
    payment: {
      title: "Payment method",
      subtitle: "Select your preferred payment method.",
      card: { name: "Credit card", note: "Visa, Mastercard, Amex — via Stripe" },
      transfer: { name: "Bank transfer", note: "SEPA & SWIFT — ideal for large volumes" },
      crypto: { name: "Cryptocurrency", note: "BTC, ETH, USDT" },
      cta: "Confirm and pay",
    },
    modal: {
      title: "Payment under development",
      text: "The split-payment module is currently being integrated with Stripe Connect. In the meantime our team finalises your order manually within 24 business hours.",
      hint: "Contact us via the form or WhatsApp to confirm your order right away.",
      contact: "Contact us",
      close: "Close",
    },
  },

  sell: {
    metaTitle: "Become a listed producer",
    metaDescription:
      "Sell under your own brand on Al Arifa. You are paid 70% of every order directly, with no re-invoicing and no cash advance.",
    eyebrow: "Producers",
    title: "Your brand, your money",
    subtitle:
      "We do not buy your production and we do not resell it under our name. You sell as yourself, on our shopfront.",
    heroCta: "Apply now",
    heroCtaAlt: "Talk to someone",

    splitTitle: "The rule is simple",
    splitLead: "On every €100 order",
    splitProducer: "for you",
    splitPlatform: "for the platform",
    splitNote: "Shipping costs go to you in full. The commission applies to the goods only.",

    pillarsTitle: "What it changes in practice",
    pillars: [
      {
        title: "No re-invoicing",
        text: "Our commission is deducted at source when the payment is made. You have no invoice to issue and nothing to pay back to us.",
      },
      {
        title: "No cash advance",
        text: "Your share is credited on the day of the order. You are not waiting thirty or sixty days to be paid.",
      },
      {
        title: "Your brand stays yours",
        text: "Your name, your label, your page. The customer knows who they are buying from, and you keep the relationship.",
      },
      {
        title: "You keep your stock",
        text: "No outright purchase, no consignment. You ship what sells, from your own workshop.",
      },
    ],

    howTitle: "How it works",
    steps: [
      {
        title: "Application",
        text: "Tell us about your house, your products and your volumes. We reply within 48 business hours.",
      },
      {
        title: "Verification",
        text: "We taste, and we check your analyses and paperwork. This is the one stage where we are demanding.",
      },
      {
        title: "Payout account",
        text: "You open your payment account in five minutes. That is the account that receives your share, directly.",
      },
      {
        title: "Going live",
        text: "Your brand page and products are published. You control your prices and stock from your own area.",
      },
    ],

    faqTitle: "Questions we get",
    faq: [
      {
        q: "When exactly am I paid?",
        a: "Your share is credited to your payout account the moment the customer pays. The transfer to your bank account then follows the standard schedule, which can be set as often as daily.",
      },
      {
        q: "Who bears the banking fees?",
        a: "The platform, out of its share. The 70% quoted is net to you.",
      },
      {
        q: "What if a customer asks for a refund?",
        a: "The refund is taken proportionally from both sides: your share and our commission. Neither party fronts money for the other.",
      },
      {
        q: "Can I sell elsewhere at the same time?",
        a: "Yes. No exclusivity, no minimum term, no volume commitment.",
      },
    ],

    ctaTitle: "Does your house belong here?",
    ctaText: "Introduce it to us. We review every application ourselves.",
    ctaButton: "Apply now",
  },

  pillars: {
    eyebrow: "Our standard",
    title: "Four principles, no compromise",
    items: [
      {
        title: "Chosen by hand",
        text: "We taste everything and turn down a lot. A house joins the catalogue because it convinced us, not because it paid.",
      },
      {
        title: "Each under its own name",
        text: "No white label, no vague origin. You always know which family made what you are buying.",
      },
      {
        title: "Paid directly",
        text: "The producer is credited their share the moment you pay. We never hold their money.",
      },
      {
        title: "Full traceability",
        text: "Every batch is numbered, analysed and documented. Certificates available on request.",
      },
    ],
  },

  origins: {
    eyebrow: "The origins",
    title: "An arc from the Atlantic to the Levant",
    text: "Portugal, Spain, Italy, Morocco, Tunisia: our houses are spread around the whole Mediterranean rim. Dry summers, cool nights, demanding soils — the conditions that give these harvests their rare concentration.",
    stats: [
      { value: "6", label: "Listed houses" },
      { value: "5", label: "Countries of origin" },
      { value: "70%", label: "Paid to the producer" },
      { value: "0", label: "Middlemen" },
    ],
  },

  btob: {
    eyebrow: "Trade",
    title: "One contact, every house",
    text: "Fine dining, delicatessens, importers and distributors: order from several producers at once, with a single invoice and a price grid negotiated per account.",
    bullets: [
      "Negotiated tiered pricing, applied across the whole catalogue",
      "One cart, several houses, a single order",
      "Export paperwork, certificates of analysis and technical sheets",
      "Pallet, container and international groupage logistics",
      "A dedicated account manager",
    ],
    cta: "Open a trade account",
    ctaSecondary: "Request trade pricing",
    cards: [
      {
        title: "Hospitality",
        text: "Steady volumes, batch-to-batch consistency, scheduled delivery.",
      },
      {
        title: "Retail",
        text: "Delicatessen, wine merchant, concept store: products with high perceived value and a solid margin.",
      },
      {
        title: "Import / Export",
        text: "Full containers, incoterms of your choice, complete customs documentation.",
      },
    ],
  },

  cta: {
    eyebrow: "Get started",
    title: "Buy or sell",
    text: "Choose your channel. Our team replies within 24 business hours.",
    particulier: "I want to order",
    pro: "I'm a producer",
  },

  story: {
    metaTitle: "The Al Arifa Story",
    metaDescription:
      "From an olive grove in the Alentejo to a marketplace of Mediterranean producers. The story of the Al Arifa house.",
    eyebrow: "Our Story",
    title: "Al Arifa",
    lead: "“Al Arifa” — she who knows. A name inherited from a grandmother who could tell, by scent alone, the exact day the olives had to be picked.",
    chapters: [
      {
        year: "1898",
        title: "The first plot",
        text: "At the end of a dirt track, a family plants thirty olive trees on a hill nobody wanted. The soil is poor, the slope is harsh — but the light lingers there until the very last moment of the day. Those trees, now a century old, still form the heart of our oil.",
      },
      {
        year: "1954",
        title: "The mill",
        text: "The second generation builds its own mill minutes from the groves. A simple, decisive choice: never again let more than twelve hours pass between picking and pressing.",
      },
      {
        year: "1987",
        title: "She who knows",
        text: "Aïcha, known as Al Arifa, ran the harvest for thirty years. She refused easy yields, insisted on hand picking and fruit-by-fruit selection. Her rule fit in one sentence: “you never get back an olive picked too late.”",
      },
      {
        year: "Today",
        title: "The house opens its doors",
        text: "Exporting brought us to other families: a beekeeper in the Middle Atlas, a saffron grower in the Souss, a Sicilian salt maker. The same gestures, the same refusals, the same struggle to be seen. Al Arifa became their shared shopfront — each under its own name, each paid directly.",
      },
    ],
    valuesTitle: "What will never change",
    values: [
      {
        title: "Patience",
        text: "An olive tree gives its best after forty years. We are in no hurry.",
      },
      {
        title: "The hand",
        text: "No machine can tell an olive that is ready from one that is nearly ready. A hand can.",
      },
      {
        title: "Truth",
        text: "No convenient blending, no vague origin. What is written is what is in the jar.",
      },
    ],
    quote: "“You don't make a great oil. You simply avoid ruining it.”",
    quoteAuthor: "Aïcha — Al Arifa",
    cta: "Discover the selection",
  },

  contact: {
    metaTitle: "Contact — Al Arifa",
    metaDescription:
      "Get in touch with Al Arifa: orders, trade pricing, producer applications or bulk volumes.",
    eyebrow: "Contact",
    title: "Let's talk about your project",
    subtitle: "A question, a sample, a volume to quote? We reply within 24 business hours.",
    quickTitle: "Quick contact",
    whatsappTitle: "Immediate answer",
    whatsappText: "Our team replies directly on WhatsApp, Monday to Saturday.",
    whatsapp: "Message on WhatsApp",
    whatsappMessage: "Hello Al Arifa, I would like information about your selection.",
    form: {
      name: "Full name",
      company: "Company (optional)",
      email: "Email",
      phone: "Phone",
      country: "Country",
      profile: "You are",
      profileOptions: {
        particulier: "Private client",
        restaurant: "Restaurant",
        retail: "Retail / Distribution",
        importer: "Importer / Wholesaler",
        producer: "Producer applicant",
        other: "Other",
      },
      volume: "Estimated volume",
      volumePlaceholder: "e.g. 48 units / month",
      message: "Your message",
      messagePlaceholder: "Describe your needs in a few lines…",
      consent: "I agree to be contacted about my request.",
      submit: "Send request",
      submitting: "Sending…",
      successTitle: "Request sent",
      successText: "Thank you. Our team will reply within 24 business hours.",
      errorRequired: "This field is required.",
      errorEmail: "Invalid email address.",
      errorConsent: "Please confirm your agreement.",
      errorGeneric: "Sending failed. Try again or reach us on WhatsApp.",
      another: "Send another request",
    },
    infoTitle: "Information",
    info: [
      { label: "Email", value: "contact@al-arifa.com" },
      { label: "Phone", value: "+33 6 00 00 00 00" },
      { label: "Hours", value: "Mon. – Sat. · 9am – 7pm (CET)" },
      { label: "Export", value: "Europe, North Africa, Gulf, Asia, Americas" },
    ],
  },

  pro: {
    metaTitle: "Producer area — Al Arifa",
    metaDescription:
      "Al Arifa producer area: your products, your orders, your revenue and your payout account.",
    eyebrow: "Producer area",
    title: "Your house",
    subtitle: "Your products, your orders and your payouts, in one private area.",
    tabs: { login: "Sign in", register: "Apply" },
    login: {
      title: "Sign in",
      email: "Business email",
      password: "Password",
      submit: "Sign in",
      error: "Incorrect credentials.",
      pendingError:
        "Your application is under review. You will be notified by email once it is approved.",
      rejectedError: "Your application was not accepted. Contact us to find out more.",
      demoHint: "Demo — admin: admin@al-arifa.com / arifa2024",
    },
    register: {
      title: "Producer application",
      intro:
        "Tell us about your house. We review every application ourselves and reply within 48 business hours.",
      accountType: {
        label: "Account type",
        producer: "Producer",
        producerNote: "I sell my products",
        buyer: "Trade buyer",
        buyerNote: "I buy for my business",
      },
      company: "House name",
      vat: "VAT no. / trade register",
      contactName: "Contact name",
      email: "Business email",
      phone: "Phone",
      country: "Country",
      activity: "Product family",
      volume: "Estimated annual production",
      password: "Password",
      passwordConfirm: "Confirm password",
      submit: "Send my application",
      success: "Application recorded",
      successText:
        "Thank you. We are reviewing your file and will come back to you within 48 business hours.",
      errorExists: "An application already exists with this email.",
      errorPassword: "The password must be at least 8 characters.",
      errorMatch: "Passwords do not match.",
    },
    dashboard: {
      welcome: "Hello",
      status: "Status",
      logout: "Sign out",
      payoutsTitle: "Payout account",
      payoutsActive: "Active — your share is credited automatically",
      payoutsPending: "Activate it to receive your payouts",
      payoutsCta: "Activate my account",
      payoutsSoon: "Stripe Connect integration in progress",
      revenueTitle: "Your revenue",
      revenueGross: "Volume collected",
      revenueYours: "Your share",
      revenueCommission: "Platform commission",
      yourRate: "Your rate",
      productsTitle: "Your products",
      productsEmpty: "No products published yet.",
      ordersTitle: "Your orders",
      ordersEmpty: "No orders yet.",
      orderRef: "Reference",
      orderDate: "Date",
      orderQty: "Items",
      orderTotal: "Amount",
      orderYours: "Your share",
      orderStatus: "Status",
      docsTitle: "Documents",
      docs: [
        "Listing agreement (PDF)",
        "This month's payout statement",
        "Producer terms and conditions",
      ],
      docsSoon: "Coming soon",
    },
    buyer: {
      title: "Your terms",
      discount: "Your catalogue discount",
      discountNote: "Negotiated discount, applied automatically across the whole catalogue.",
      catalogCta: "Browse the selection",
      none: "No negotiated discount yet.",
      approved: "Buyer account approved",
    },
    status: {
      pending: "Application under review",
      approved: "Listed house",
      rejected: "Not accepted",
    },
  },

  admin: {
    metaTitle: "Administration — Al Arifa",
    title: "Administration",
    subtitle: "Listed producers, commission rates and order tracking.",
    login: {
      title: "Administrator access",
      email: "Email",
      password: "Password",
      submit: "Enter",
      error: "Access denied.",
    },
    tabs: { accounts: "Producers", orders: "Orders", pricing: "Commissions" },
    accounts: {
      title: "Applications and listed houses",
      empty: "No applications recorded.",
      company: "House",
      contact: "Contact",
      country: "Country",
      activity: "Family",
      registered: "Applied on",
      status: "Status",
      actions: "Actions",
      approve: "List",
      reject: "Reject",
      pendingCount: "pending",
    },
    pricing: {
      title: "Commission rates",
      note: "Set the platform's share for each listed house. The balance is paid to the producer at the moment of payment. Leave empty to apply the standard rate.",
      client: "House",
      publicPrice: "Standard rate",
      customPrice: "Applied rate",
      discount: "Producer share",
      type: "Type",
      simulation: "On a €100 order",
      producerGets: "The producer receives",
      platformGets: "The platform keeps",
      buyerDiscount: "Catalogue discount",
      commissionLabel: "Platform commission",
      dragHint: "Drag to adjust",
      save: "Save",
      saved: "Rates saved",
      placeholder: "Standard",
    },
    orders: {
      title: "Orders",
      empty: "No orders recorded.",
      ref: "Ref.",
      client: "House",
      date: "Date",
      qty: "Qty",
      unit: "Collected",
      total: "Producer share",
      commission: "Commission",
      status: "Status",
      statuses: {
        pending: "Pending",
        confirmed: "Confirmed",
        shipped: "Shipped",
        cancelled: "Cancelled",
      },
    },
    logout: "Sign out",
  },

  payment: {
    eyebrow: "Payment",
    title: "Three ways to pay",
    subtitle:
      "Credit card, bank transfer or cryptocurrency — choose what suits your organisation.",
    soon: "Soon",
  },

  footer: {
    tagline: "The marketplace for Mediterranean producers",
    navTitle: "Navigation",
    proTitle: "Producers",
    legalTitle: "Information",
    contactTitle: "Contact",
    newsletter: "Receive our harvest news",
    newsletterPlaceholder: "Your email",
    newsletterCta: "Subscribe",
    newsletterOk: "Thank you, subscription recorded.",
    rights: "All rights reserved.",
    legal: "Legal notice",
    privacy: "Privacy",
    terms: "Terms of sale",
    madeIn: "Six houses · Five countries · Worldwide shipping",
  },

  legal: {
    mentionsTitle: "Legal notice",
    privacyTitle: "Privacy policy",
    termsTitle: "Terms and conditions of sale",
    updated: "Last updated",
    backHome: "Back to home",
    placeholder:
      "This document is provided as a template and must be completed with the company's final legal information before commercial launch.",
  },

  a11y: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    changeLanguage: "Change language",
    whatsapp: "Contact on WhatsApp",
    scrollTop: "Back to top",
    openCart: "Open cart",
    itemsInCart: "items in cart",
  },

  catalogData: {
    producers: {
      "al-arifa": {
        tagline: "Extra virgin olive oil, Heritage Selection",
        bio: "Three generations on the same Alentejo hillside. Hand picking, pressing within twelve hours, and a stubborn refusal of easy yields.",
      },
      kerkennah: {
        tagline: "Oils and olives from the Chétoui variety",
        bio: "A family estate facing the Kerkennah Islands, organic since 1998. Chétoui gives a green, pungent oil marked by noble bitterness.",
      },
      cedres: {
        tagline: "High-mountain honeys from the Middle Atlas",
        bio: "Migratory hives worked between 1,400 and 2,000 metres, following the blooms. Cold extraction, never pasteurised, never blended.",
      },
      taliouine: {
        tagline: "Saffron and spices from the Souktana plateau",
        bio: "A cooperative of saffron-growing families at 1,800 metres. Flowers are picked before sunrise and stripped the same day.",
      },
      ronda: {
        tagline: "Marcona almonds from the Andalusian sierra",
        bio: "Terraced almond trees above Ronda, dry-farmed. Marcona ripens slowly here and develops a round, almost sweet flesh.",
      },
      trapani: {
        tagline: "Sea salts from the western Sicilian salt pans",
        bio: "The same evaporation basins since the 14th century, between Trapani and Marsala. The fleur de sel is still raked by wooden shovel.",
      },
    },
    products: {
      "arifa-5l": {
        tagline: "The authentic taste of Portugal's olive groves",
        description:
          "Pressed within twelve hours of picking. Deep golden robe, a nose of fresh grass and green almond, and the peppery finish that marks the great oils.",
      },
      "arifa-500": {
        tagline: "The table format of the Heritage Selection",
        description:
          "The same oil as the five-litre tin, in tinted glass for the table. Free acidity below 0.3%.",
      },
      "kerkennah-bio": {
        tagline: "Organic Chétoui, first cold press",
        description:
          "A green, forthright oil with assertive bitterness and a long pungency. Certified organic, early November harvest.",
      },
      "kerkennah-olives": {
        tagline: "Moroccan-style cracked olives",
        description:
          "Cracked green olives prepared with preserved lemon, garlic and mild chilli. Neither pasteurised nor sterilised.",
      },
      "cedres-cedre": {
        tagline: "Atlas cedar honeydew honey",
        description:
          "Dark, dense, almost resinous, with notes of wood and liquorice. A confidential harvest of a few hundred kilos a year.",
      },
      "cedres-oranger": {
        tagline: "Orange blossom honey from the Souss",
        description:
          "Fine blond crystallisation and an immediate floral scent. Harvested from bitter orange orchards in full spring bloom.",
      },
      "taliouine-safran": {
        tagline: "First-grade threads, harvested that day",
        description:
          "Red stigmas only, no yellow style. High colouring power, with aromas of hay, honey and leather.",
      },
      "taliouine-ras": {
        tagline: "Twenty-seven spices blended by hand",
        description:
          "The cooperative's own blend, ground to order. No colourings, no enhancers, no fillers.",
      },
      "ronda-marcona": {
        tagline: "Blanched and roasted Marcona almonds",
        description:
          "Dry roasted then salted with fleur de sel. Round, buttery flesh, quite unlike Californian varieties.",
      },
      "ronda-huile": {
        tagline: "First-press sweet almond oil",
        description:
          "Cold pressed from the estate's own almonds, unrefined. For cooking, pastry and finishing.",
      },
      "trapani-fleur": {
        tagline: "Hand-harvested fleur de sel",
        description:
          "The fine crystalline crust lifted from the surface of the pans with a wooden shovel. Crunchy, distinctly briny, to add at the end of cooking.",
      },
      "trapani-herbes": {
        tagline: "Sea salt with Sicilian herbs",
        description:
          "Whole sea salt mixed with wild oregano, rosemary and dried lemon zest, all gathered on the island.",
      },
    },
  },
};

export default en;

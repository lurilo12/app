// Mock data for Dr Pet Domiciliar website

export const siteConfig = {
  phone: '(11) 95877-3524',
  whatsapp: '5511958773524',
  email: 'pirajuvet@gmail.com',
  hours: 'Domingo à Domingo até às 22:00 horas',
  facebook: 'https://www.facebook.com/drpetdomiciliar',
  instagram: 'https://www.instagram.com/drpetdomiciliar'
};

export const navigation = [
  { name: 'HOME', path: '/' },
  { name: 'SOBRE', path: '/sobre' },
  {
    name: 'SERVIÇOS',
    path: '/servicos',
    dropdown: [
      { name: 'Consultas', path: '/consultas' },
      { name: 'Vacinas', path: '/vacinas' },
      { name: 'Cirurgias', path: '/cirurgias' }
    ]
  },
  { name: 'DÚVIDAS', path: '/duvidas' },
  { name: 'CONTATO', path: '/contato' }
];

export const services = [
  {
    id: 1,
    title: 'Consultas',
    description: 'Consultas de rotina e check-up geral para garantir que seu bichinho fique saudável em qualquer idade ou tamanho, sem o estresse causado nos pets durante visitas a consultórios veterinários.',
    icon: 'briefcase-medical',
    image: 'https://images.unsplash.com/photo-1644675272883-0c4d582528d8?w=400',
    link: '/consultas'
  },
  {
    id: 2,
    title: 'Vacinas',
    description: 'Examinação de cães e gatos para atestar se estão aptos para serem imunizados por vacinas contra raiva, gripe e outras doenças que podem comprometer a saúde de seu pet.',
    icon: 'syringe',
    image: 'https://images.unsplash.com/photo-1644675443401-ea4c14bad0e6?w=400',
    link: '/vacinas'
  },
  {
    id: 3,
    title: 'Cirurgias',
    description: 'Contamos com diferentes tipos de cirurgia que só ocorrerão após a examinação em sua própria casa. O seu bichinho será observado em nossa unidade física, no caso de cirurgias serem necessárias.',
    icon: 'stethoscope',
    image: 'https://images.unsplash.com/photo-1632236542159-809925d85fc0?w=400',
    link: '/cirurgias'
  }
];

export const testimonials = [
  {
    id: 1,
    name: 'Rogério',
    subtitle: 'Dono do Thor (Cachorro)',
    text: 'A melhor parte de poder contar com um veterinário à domicílio, é que nosso pet fica à vontade. Dessa forma não causa nenhum desconforto ou insegurança, assim nosso bichinho fica sempre bem.',
    image: 'https://images.unsplash.com/photo-1579119134757-5c38803f34fc?w=800'
  },
  {
    id: 2,
    name: 'Priscila',
    subtitle: 'Dona do Tinho (Gato)',
    text: 'Sempre que precisei de um veterinário de confiança optei por contar com o Dr Pet Domiciliar. Que pode me atender aqui em casa e tratar com o carrinho e a atenção que o meu gatinhho precisa.',
    image: 'https://images.unsplash.com/photo-1579119134757-5c38803f34fc?w=800'
  }
];

export const regions = [
  {
    id: 1,
    name: 'São Paulo',
    description: 'Quer solicitar os nossos serviços para garantir a saúde e a felicidade do seu melhor amigo? Nossos serviços estão sempre disponíveis nas principais regiões de:'
  }
];

export const heroData = {
  subtitle: 'VETERINÁRIO EM DOMICÍLIO',
  title: 'Dr. Pet Domiciliar',
  description: 'Médicos veterinários de confiança e procedimentos desenvolvidos com carinho visando o bem-estar do seu bichinho, feito através de um atendimento domiciliar.',
  ctaPrimary: 'NOSSOS SERVIÇOS',
  ctaSecondary: 'ENVIE SUA MENSAGEM',
  image: 'https://images.unsplash.com/photo-1644675272883-0c4d582528d8?w=800'
};

export const scheduleSection = {
  title: 'Agende sua visita',
  description: 'Solicite uma consulta em casa agora mesmo! Atendemos de domingo à domingo até às 22h, após esse horário somente para clientes cadastrados. Agende pelo telefone, WhatsApp ou em nosso site',
  cta: 'AGENDE PELO WHATSAPP',
  image: 'https://images.unsplash.com/photo-1557495235-340eb888a9fb?w=600'
};

export const regionsSection = {
  title: 'Regiões atendidas',
  description: 'Quer solicitar os nossos serviços para garantir a saúde e a felicidade do seu melhor amigo? Nossos serviços estão sempre disponíveis nas principais regiões de:',
  region: 'São Paulo',
  cta: 'AGENDE PELO WHATSAPP',
  image: 'https://images.unsplash.com/photo-1632236542159-809925d85fc0?w=600'
};

export const footerData = {
  menu: [
    { name: 'Home', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Serviços', path: '/servicos' }
  ],
  services: [
    { name: 'Consultas', path: '/consultas' },
    { name: 'Vacinas', path: '/vacinas' },
    { name: 'Cirurgias', path: '/cirurgias' }
  ],
  location: 'São Paulo',
  schedule: 'De Domingo à Domingo',
  phone: '(11) 95877-3524',
  whatsapp: '(11) 95877-3524',
  email: 'pirajuvet@gmail.com'
};

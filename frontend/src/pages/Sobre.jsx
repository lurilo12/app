import React from 'react';
import { Heart, Award, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

const Sobre = () => {
  const values = [
    {
      icon: Heart,
      title: 'Amor pelos animais',
      description: 'Nossa equipe é formada por profissionais apaixonados por animais, dedicados ao bem-estar de cada pet.'
    },
    {
      icon: Award,
      title: 'Profissionalismo',
      description: 'Veterinários qualificados e experientes, comprometidos com a excelência no atendimento.'
    },
    {
      icon: Users,
      title: 'Atendimento humanizado',
      description: 'Tratamos cada pet como se fosse nosso, oferecendo carinho e atenção em cada consulta.'
    },
    {
      icon: Clock,
      title: 'Disponibilidade',
      description: 'Atendemos de domingo a domingo até às 22h para garantir o melhor para seu pet.'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Sobre o Dr. Pet Domiciliar</h1>
            <p className="text-xl text-green-50 max-w-3xl mx-auto">
              Cuidamos da saúde do seu melhor amigo com carinho e profissionalismo
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Nossa História</h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  O Dr. Pet Domiciliar nasceu do desejo de proporcionar cuidados veterinários de qualidade
                  sem o estresse que muitos pets enfrentam ao serem levados a clínicas veterinárias.
                </p>
                <p>
                  Entendemos que o conforto e a segurança do seu pet são fundamentais para um atendimento
                  eficaz. Por isso, levamos nossos serviços até você, garantindo que seu bichinho receba
                  os melhores cuidados no ambiente onde ele se sente mais à vontade: sua casa.
                </p>
                <p>
                  Nossa equipe é formada por veterinários experientes e apaixonados, que tratam cada
                  animal com o mesmo carinho e dedicação que dariam aos próprios pets.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1644675272883-0c4d582528d8?w=800"
                alt="Veterinário com pet"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Nossos Valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                      <p className="text-gray-600">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Proporcionar cuidados veterinários de excelência no conforto do seu lar, garantindo
              o bem-estar e a saúde dos pets através de um atendimento humanizado, profissional e
              repleto de carinho.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sobre;

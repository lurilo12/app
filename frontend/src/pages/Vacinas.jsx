import React from 'react';
import { Syringe, CheckCircle, Shield, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { siteConfig } from '../mocks/mock';

const Vacinas = () => {
  const vaccines = [
    { name: 'V8 ou V10', description: 'Proteção contra cinomose, parvovirose, hepatite e outras doenças' },
    { name: 'Antirrábica', description: 'Proteção contra a raiva, obrigatória por lei' },
    { name: 'Gripe Canina', description: 'Prevenção contra tosse dos canis' },
    { name: 'Giardíase', description: 'Proteção contra parasitas intestinais' },
    { name: 'Tríplice Felina', description: 'Proteção para gatos contra rinotraqueíte, calicivirose e panleucopenia' },
    { name: 'Leucemia Felina', description: 'Prevenção da leucemia viral felina' }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Vacinas importadas e de qualidade garantida'
    },
    {
      icon: Calendar,
      title: 'Calendário',
      description: 'Orientação sobre o calendário de vacinação ideal'
    },
    {
      icon: Syringe,
      title: 'Aplicação',
      description: 'Técnica adequada para conforto do seu pet'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Syringe className="w-12 h-12 text-blue-200" />
              </div>
              <h1 className="text-5xl font-bold mb-6">Vacinação Domiciliar</h1>
              <p className="text-xl text-blue-50 leading-relaxed mb-8">
                Examinação de cães e gatos para atestar se estão aptos para serem imunizados
                por vacinas contra raiva, gripe e outras doenças que podem comprometer a saúde
                de seu pet.
              </p>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-base font-medium"
                onClick={() => window.open(`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`, '_blank')}
              >
                Agendar Vacinação
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1644675443401-ea4c14bad0e6?w=800"
                alt="Vacinação"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <Icon className="w-12 h-12 text-blue-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Vaccines List */}
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Vacinas Disponíveis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {vaccines.map((vaccine, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-6 py-3">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{vaccine.name}</h3>
                  <p className="text-gray-600">{vaccine.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-gray-700 text-lg">
                <CheckCircle className="w-6 h-6 text-green-500 inline mr-2" />
                Todas as vacinas são acompanhadas de carteirinha de vacinação
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Proteja seu pet agora!
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Mantenha a vacinação do seu pet em dia e garanta sua saúde
          </p>
          <Button
            className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-medium"
            onClick={() => window.open(`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`, '_blank')}
          >
            Falar com Veterinário
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Vacinas;

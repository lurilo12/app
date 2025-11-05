import React from 'react';
import { Activity, CheckCircle, Clock, Home } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { siteConfig } from '../mocks/mock';

const Consultas = () => {
  const benefits = [
    'Check-up completo de rotina',
    'Avaliação de peso e condição corporal',
    'Exame clínico detalhado',
    'Orientações sobre alimentação',
    'Controle de parasitas',
    'Vacinação (se necessário)',
    'Receituário médico',
    'Orientações sobre cuidados diários'
  ];

  const features = [
    {
      icon: Home,
      title: 'Conforto do Lar',
      description: 'Seu pet fica no ambiente familiar, sem estresse de transporte ou consultório'
    },
    {
      icon: Clock,
      title: 'Horário Flexível',
      description: 'Atendemos de domingo a domingo até às 22h'
    },
    {
      icon: Activity,
      title: 'Avaliação Completa',
      description: 'Consulta detalhada com todos os exames necessários'
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
                <Activity className="w-12 h-12 text-blue-200" />
              </div>
              <h1 className="text-5xl font-bold mb-6">Consultas Veterinárias</h1>
              <p className="text-xl text-blue-50 leading-relaxed mb-8">
                Consultas de rotina e check-up geral para garantir que seu bichinho fique
                saudável em qualquer idade ou tamanho, sem o estresse causado nos pets
                durante visitas a consultórios veterinários.
              </p>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-base font-medium"
                onClick={() => window.open(`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`, '_blank')}
              >
                Agendar Consulta
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1644675272883-0c4d582528d8?w=800"
                alt="Consulta veterinária"
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

          {/* What's Included */}
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              O que está incluído na consulta?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Agende sua consulta agora mesmo!
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e garanta o melhor cuidado para seu pet
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

export default Consultas;

import React from 'react';
import { Stethoscope, CheckCircle, AlertCircle, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { siteConfig } from '../mocks/mock';

const Cirurgias = () => {
  const surgeries = [
    'Castração de machos e fêmeas',
    'Remoção de tumores e nódulos',
    'Cirurgias ortopédicas',
    'Extração dentária',
    'Cirurgias de pele',
    'Cesariana',
    'Limpeza de tártaro sob anestesia',
    'Outros procedimentos cirúrgicos'
  ];

  const process = [
    {
      icon: Heart,
      title: 'Consulta Prévia',
      description: 'Avaliação completa no conforto da sua casa para determinar a necessidade cirúrgica'
    },
    {
      icon: Stethoscope,
      title: 'Exames Pré-operatórios',
      description: 'Realização de todos os exames necessários para garantir segurança'
    },
    {
      icon: AlertCircle,
      title: 'Procedimento',
      description: 'Cirurgia realizada em nossa clínica com toda estrutura necessária'
    },
    {
      icon: CheckCircle,
      title: 'Acompanhamento Pós-operatório',
      description: 'Visitas domiciliares para acompanhar a recuperação do seu pet'
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
                <Stethoscope className="w-12 h-12 text-blue-200" />
              </div>
              <h1 className="text-5xl font-bold mb-6">Cirurgias Veterinárias</h1>
              <p className="text-xl text-blue-50 leading-relaxed mb-8">
                Contamos com diferentes tipos de cirurgia que só ocorrerão após a examinação
                em sua própria casa. O seu bichinho será observado em nossa unidade física,
                no caso de cirurgias serem necessárias.
              </p>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-base font-medium"
                onClick={() => window.open(`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`, '_blank')}
              >
                Agendar Avaliação
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1632236542159-809925d85fc0?w=800"
                alt="Cirurgia veterinária"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {process.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold text-green-500 mb-3">{index + 1}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Surgeries List */}
          <div className="bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
              Cirurgias Realizadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {surgeries.map((surgery, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">{surgery}</span>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6">
              <p className="text-gray-700 text-lg">
                <AlertCircle className="w-6 h-6 text-blue-500 inline mr-2" />
                <strong>Importante:</strong> Todas as cirurgias são realizadas em nossa clínica
                veterinária com toda a estrutura e equipamentos necessários. O acompanhamento
                pós-operatório pode ser feito na sua casa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Seu pet precisa de cirurgia?
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Agende uma avaliação domiciliar e tire todas as suas dúvidas
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

export default Cirurgias;

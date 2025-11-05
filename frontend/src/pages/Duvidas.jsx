import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { siteConfig } from '../mocks/mock';

const Duvidas = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'Como funciona o atendimento domiciliar?',
      answer: 'Nosso veterinário vai até a sua casa no horário agendado, com todos os equipamentos necessários para realizar a consulta. O atendimento é feito no ambiente onde seu pet se sente mais confortável, reduzindo o estresse e facilitando o exame.'
    },
    {
      question: 'Quais regiões são atendidas?',
      answer: 'Atendemos todas as principais regiões de São Paulo. Entre em contato conosco para verificar se sua localização está na nossa área de cobertura.'
    },
    {
      question: 'Qual é o horário de atendimento?',
      answer: 'Atendemos de domingo a domingo até às 22h. Após esse horário, realizamos atendimentos apenas para clientes cadastrados em casos de emergência.'
    },
    {
      question: 'Como agendar uma consulta?',
      answer: 'Você pode agendar pelo telefone (11) 95877-3524, WhatsApp ou através do nosso formulário de contato no site. Nossa equipe entrará em contato para confirmar o horário.'
    },
    {
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos dinheiro, cartão de crédito, cartão de débito e PIX. O pagamento pode ser feito no momento do atendimento.'
    },
    {
      question: 'As vacinas são aplicadas em casa?',
      answer: 'Sim! Levamos as vacinas refrigeradas adequadamente e aplicamos no conforto da sua casa. Também fornecemos a carteirinha de vacinação.'
    },
    {
      question: 'As cirurgias são feitas em casa?',
      answer: 'Não. As cirurgias são realizadas em nossa clínica veterinária com toda a estrutura necessária. Fazemos a avaliação pré-operatória na sua casa e o acompanhamento pós-operatório pode ser domiciliar.'
    },
    {
      question: 'Preciso preparar algo antes da visita?',
      answer: 'Para consultas de rotina, não é necessário nenhum preparo especial. Para procedimentos específicos, nossa equipe dará todas as orientações necessárias no momento do agendamento.'
    },
    {
      question: 'Atendem casos de emergência?',
      answer: 'Sim, atendemos emergências para clientes cadastrados. Em caso de emergência, entre em contato imediatamente pelo WhatsApp ou telefone.'
    },
    {
      question: 'Qual a duração da consulta?',
      answer: 'Uma consulta de rotina geralmente dura entre 30 e 45 minutos. Esse tempo pode variar dependendo da necessidade de cada pet.'
    },
    {
      question: 'Atendem gatos e cães?',
      answer: 'Sim! Atendemos tanto cães quanto gatos de todos os tamanhos e idades. Nossa equipe está preparada para lidar com as particularidades de cada espécie.'
    },
    {
      question: 'O que devo ter em casa para a visita?',
      answer: 'Não é necessário ter nada de especial. Nosso veterinário leva todos os equipamentos e materiais necessários. Apenas garanta que seu pet esteja em um ambiente confortável e seguro.'
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-green-200" />
            <h1 className="text-5xl font-bold mb-6">Dúvidas Frequentes</h1>
            <p className="text-xl text-green-50 max-w-3xl mx-auto">
              Encontre respostas para as perguntas mais comuns sobre nossos serviços
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 pr-8">
                      {faq.question}
                    </span>
                    {openIndex === index ? (
                      <ChevronUp className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 text-center bg-white rounded-lg shadow-lg p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ainda tem dúvidas?
            </h2>
            <p className="text-gray-700 text-lg mb-8">
              Nossa equipe está pronta para atendê-lo e responder todas as suas perguntas
            </p>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg font-medium"
              onClick={() => window.open(`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`, '_blank')}
            >
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Duvidas;

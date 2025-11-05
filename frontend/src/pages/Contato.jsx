import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useToast } from '../hooks/use-toast';
import { siteConfig } from '../mocks/mock';

const Contato = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      content: siteConfig.phone,
      link: `tel:${siteConfig.phone}`
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: siteConfig.phone,
      link: `https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`
    },
    {
      icon: Mail,
      title: 'E-mail',
      content: siteConfig.email,
      link: `mailto:${siteConfig.email}`
    },
    {
      icon: Clock,
      title: 'Horário',
      content: 'Domingo a Domingo até 22h',
      link: null
    },
    {
      icon: MapPin,
      title: 'Região',
      content: 'São Paulo - SP',
      link: null
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would send data to backend
    toast({
      title: 'Mensagem enviada!',
      description: 'Entraremos em contato em breve.',
    });
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Entre em Contato</h1>
            <p className="text-xl text-green-50 max-w-3xl mx-auto">
              Estamos prontos para atender você e seu pet
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              const content = info.link ? (
                <a
                  href={info.link}
                  className="text-green-600 hover:text-green-700 font-medium"
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {info.content}
                </a>
              ) : (
                <span className="text-gray-700 font-medium">{info.content}</span>
              );

              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-green-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      {info.title}
                    </h3>
                    {content}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form and WhatsApp */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Envie uma Mensagem
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome completo
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assunto
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full"
                      placeholder="Conte-nos sobre seu pet e o que precisa..."
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-medium"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* WhatsApp Direct Contact */}
            <div className="space-y-8">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-8">
                  <MessageCircle className="w-16 h-16 mb-6" />
                  <h2 className="text-3xl font-bold mb-4">
                    Atendimento pelo WhatsApp
                  </h2>
                  <p className="text-green-50 text-lg mb-6 leading-relaxed">
                    Prefere falar conosco diretamente? Clique no botão abaixo e inicie uma
                    conversa no WhatsApp. Responderemos o mais rápido possível!
                  </p>
                  <Button
                    className="w-full bg-white text-green-600 hover:bg-gray-100 py-6 text-lg font-medium"
                    onClick={() => window.open(`https://api.whatsapp.com/send?phone=${siteConfig.whatsapp}`, '_blank')}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Abrir WhatsApp
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Horário de Atendimento
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-green-500 mr-3" />
                      <span className="font-medium">Domingo a Domingo</span>
                    </div>
                    <div className="pl-8">
                      <p>Até às 22:00 horas</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Após esse horário: somente para clientes cadastrados
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;

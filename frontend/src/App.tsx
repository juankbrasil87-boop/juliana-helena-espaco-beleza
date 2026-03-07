/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Instagram,
  Phone,
  MapPin,
  Clock,
  Scissors,
  Sparkles,
  Camera,
  Calendar,
  Menu,
  X,
  ChevronRight,
  Star,
  Play,
  Mic,
  MicOff,
  Volume2,
  Loader2
} from 'lucide-react';
import { RetellWebClient } from 'retell-client-js-sdk';

const retellWebClient = new RetellWebClient();
const AGENT_ID = "agent_798b8e6fea6c849eac9bbb4260"; // Agent ID para Isabela

// --- Types & Constants ---

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const SERVICES: Service[] = [
  {
    id: 1,
    name: "Nanoblading (Nanobland)",
    description: "A evolução do fio a fio. Técnica suave com nanoagulha para um resultado ultra natural que dura de 6 a 12 meses.",
    price: "A consultar",
    image: "/assets/images/service_1.jpg"
  },
  {
    id: 2,
    name: "Brow Lamination",
    description: "Sobrancelhas alinhadas e perfeitas. Técnica que disfarça falhas e realça o olhar, com duração de até 8 semanas.",
    price: "A consultar",
    image: "/assets/images/service_2.jpg"
  },
  {
    id: 3,
    name: "Extensão de Cílios",
    description: "Olhar marcante e elegante. Diferentes técnicas como Volume Brasileiro e Fox Eyes para ressaltar sua beleza única.",
    price: "A consultar",
    image: "/assets/images/service_3.jpg"
  },
  {
    id: 4,
    name: "Limpeza de Pele Profunda",
    description: "Pele renovada e saudável. Remoção de impurezas, esfoliação e hidratação profunda com protocolos personalizados.",
    price: "A consultar",
    image: "/assets/images/service_4.jpg"
  },
  {
    id: 5,
    name: "Hydragloss Labial",
    description: "Hidratação profunda, realce da cor natural e brilho espelhado sem agulhas. Lábios macios e ultra saudáveis.",
    price: "A consultar",
    image: "/assets/images/service_5.jpg"
  },
  {
    id: 6,
    name: "Massagem Relaxante",
    description: "Um momento só seu. Alivia tensões, reduz o estresse e renova suas energias com nossa massagem exclusiva para mulheres.",
    price: "A consultar",
    image: "/assets/images/service_6.jpg"
  }
];

const GALLERY_IMAGES = [
  "/assets/images/gallery/foto_005.jpg",
  "/assets/images/gallery/foto_006.jpg",
  "/assets/images/gallery/foto_017.jpg",
  "/assets/images/gallery/foto_018.jpg",
  "/assets/images/gallery/foto_020.jpg",
  "/assets/images/gallery/foto_024.jpg",
  "/assets/images/gallery/foto_030.jpg",
  "/assets/images/gallery/foto_031.jpg",
  "/assets/images/gallery/foto_033.jpg",
  "/assets/images/gallery/foto_034.jpg",
  "/assets/images/gallery/foto_036.jpg",
  "/assets/images/gallery/foto_037.jpg",
  "/assets/images/gallery/foto_038.jpg",
  "/assets/images/gallery/foto_039.jpg",
  "/assets/images/gallery/foto_040.jpg",
  "/assets/images/gallery/foto_041.jpg",
  "/assets/images/gallery/foto_042.jpg",
  "/assets/images/gallery/foto_043.jpg",
  "/assets/images/gallery/foto_045.jpg",
  "/assets/images/gallery/foto_046.jpg",
  "/assets/images/gallery/foto_049.jpg",
  "/assets/images/gallery/foto_050.jpg",
  "/assets/images/gallery/foto_051.jpg",
  "/assets/images/gallery/foto_054.jpg"
];

const VIDEOS = [
  "/assets/videos/video_1.mp4",
  "/assets/videos/video_2.mp4",
  "/assets/videos/video_3.mp4"
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-beige/90 backdrop-blur-sm border-b border-ink/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-xl md:text-2xl font-serif tracking-widest font-bold uppercase">Juliana Helena</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-xs font-semibold uppercase tracking-widest">
          <a href="#inicio" className="hover:text-gold transition-colors">Início</a>
          <a href="#sobre" className="hover:text-gold transition-colors">Sobre Nós</a>
          <a href="#servicos" className="hover:text-gold transition-colors">Serviços</a>
          <a href="#galeria" className="hover:text-gold transition-colors">Galeria</a>
          <a href="#contato" className="hover:text-gold transition-colors">Contato</a>
        </div>

        <div className="hidden md:block">
          <a href="#reservas" className="btn-primary">Reservar</a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-20 left-0 w-full bg-beige border-b border-ink/5 px-6 py-8 flex flex-col space-y-6 text-center uppercase tracking-widest text-sm font-semibold shadow-xl"
          >
            <a href="#inicio" onClick={() => setIsOpen(false)}>Início</a>
            <a href="#sobre" onClick={() => setIsOpen(false)}>Sobre Nós</a>
            <a href="#servicos" onClick={() => setIsOpen(false)}>Serviços</a>
            <a href="#galeria" onClick={() => setIsOpen(false)}>Galeria</a>
            <a href="#contato" onClick={() => setIsOpen(false)}>Contato</a>
            <a href="#reservas" onClick={() => setIsOpen(false)} className="btn-primary inline-block">Reservar</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero.jpg"
          alt="Juliana Helena Hero"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-right md:object-center brightness-[0.95]"
        />
        {/* Overlay subtle para legibilidad a la izquierda */}
        <div className="absolute inset-0 bg-gradient-to-r from-beige/90 via-beige/30 to-transparent md:from-beige/60 md:via-transparent md:to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl text-left">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="uppercase tracking-[0.4em] text-xs mb-6 font-bold text-gold"
          >
            Espaço da Beleza
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-[0.9] italic text-ink"
          >
            Realce sua <br />
            <span className="text-gold">Beleza</span> Natural
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-ink/80 text-lg mb-10 max-w-md leading-relaxed font-medium"
          >
            Cuidado exclusivo feito com amor e propósito para realçar seu olhar e renovar sua pele.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-start"
          >
            <a href="#reservas" className="btn-primary text-center py-5 px-12 text-sm shadow-lg shadow-gold/10">
              Reservar Agora
            </a>
            <a href="#servicos" className="btn-outline text-center py-5 px-12 text-sm bg-white/50 backdrop-blur-sm">
              Ver Serviços
            </a>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-6 md:left-12 lg:left-24 flex items-center space-x-4">
        <div className="w-12 h-px bg-ink/20"></div>
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-ink/40">Deslize para descobrir</span>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="sobre" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl z-10 relative">
            <img
              src="/assets/images/service_6.jpg"
              alt="Juliana Helena Espaço"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-soft-pink -z-0 rounded-2xl hidden lg:block border border-gold/10"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">Bem-vinda</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight italic">Onde a técnica encontra o amor</h2>
          <p className="text-ink/70 mb-8 leading-relaxed">
            Juliana Helena Espaço da Beleza é um refúgio dedicado ao bem-estar feminino. Cada técnica, do Nanoblading aos protocolos faciais, é realizada com dedicação e o propósito de celebrar sua beleza única.
          </p>
          <div className="space-y-4 mb-10">
            <div className="flex items-center space-x-3 text-sm text-ink/80 font-medium">
              <Sparkles size={16} className="text-gold" />
              <span>Protocolos progressivos para resultados duradouros.</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-ink/80 font-medium">
              <Sparkles size={16} className="text-gold" />
              <span>Ambiente acolhedor e atendimento personalizado.</span>
            </div>
            <div className="flex items-center space-x-3 text-sm text-ink/80 font-medium">
              <Sparkles size={16} className="text-gold" />
              <span>Especialistas em sobrancelhas, cílios e cuidados faciais.</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 pt-6 border-t border-ink/5">
            <div>
              <h4 className="font-serif text-3xl mb-1 italic text-gold">100%</h4>
              <p className="text-[10px] uppercase tracking-widest text-ink/50 font-bold">Dedicação Feminina</p>
            </div>
            <div>
              <h4 className="font-serif text-3xl mb-1 italic text-gold">+58</h4>
              <p className="text-[10px] uppercase tracking-widest text-ink/50 font-bold">Técnicas de Beleza</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="servicos" className="section-padding bg-beige">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">Personalizado</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-4 italic text-ink">Nossas Especialidades</h2>
        <div className="w-24 h-px bg-gold/30 mx-auto"></div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-gold/20"
          >
            <div className="h-64 overflow-hidden relative">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-500"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase">
                {service.price}
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-serif mb-3 italic">{service.name}</h3>
              <p className="text-ink/60 text-sm leading-relaxed mb-6 h-12 overflow-hidden">{service.description}</p>
              <a href="#reservas" className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center text-gold hover:text-ink transition-colors">
                Tenho interesse <ChevronRight size={14} className="ml-1" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const VideoGallery = () => {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">Inspiração</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-4 italic">Resultados Reais</h2>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {VIDEOS.map((video, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="aspect-[9/16] rounded-3xl overflow-hidden bg-beige relative group shadow-xl"
          >
            <video
              src={video}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
              autoPlay
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play size={16} fill="white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="galeria" className="section-padding bg-beige/50">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">Instagram</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-4 italic">Siga nosso espaço</h2>
        <a href="https://www.instagram.com/julianahelena_espacodabeleza/" target="_blank" className="text-ink/40 text-xs tracking-widest font-bold">@julianahelena_espacodabeleza</a>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {GALLERY_IMAGES.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="aspect-square overflow-hidden rounded-xl relative group cursor-pointer shadow-sm"
          >
            <img
              src={img}
              alt={`Gallery ${index}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Instagram className="text-white" size={24} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const BookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Solicitação enviada! Juliana entrará em contato com você em breve.');
  };

  return (
    <section id="reservas" className="section-padding bg-soft-pink">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-serif mb-8 italic">Agende sua visita</h2>
          <p className="text-ink/70 mb-12 leading-relaxed">
            Permita-nos cuidar de você. Preencha o formulário e coordenaremos seu horário personalizado em nosso espaço.
          </p>

          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-gold/10">
                <Clock className="text-gold" size={20} />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-[10px] mb-2 text-gold">Horários</h4>
                <p className="text-sm text-ink/60">Agendamento prévio via WhatsApp ou formulário.</p>
                <p className="text-sm text-ink/40 mt-1 italic text-[11px]">*Tolerância máxima de 10 min por atraso.</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-gold/10">
                <MapPin className="text-gold" size={20} />
              </div>
              <div>
                <h4 className="font-bold uppercase tracking-widest text-[10px] mb-2 text-gold">Localização</h4>
                <p className="text-sm text-ink/60 italic">Atendimento personalizado em espaço privado.</p>
                <p className="text-sm text-ink/60">Curitiba, PR.</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-3xl shadow-2xl border border-gold/10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-ink/50">Nome Completo</label>
              <input
                type="text"
                required
                className="w-full border-b border-ink/10 py-3 focus:outline-none focus:border-gold transition-colors bg-transparent"
                placeholder="Ex. Maria Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-ink/50">Telefone (WhatsApp)</label>
              <input
                type="tel"
                required
                className="w-full border-b border-ink/10 py-3 focus:outline-none focus:border-gold transition-colors bg-transparent"
                placeholder="+55 ..."
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-ink/50">Serviço Desejado</label>
              <select
                required
                className="w-full border-b border-ink/10 py-3 focus:outline-none focus:border-gold transition-colors bg-transparent"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              >
                <option value="">Selecione um serviço</option>
                {SERVICES.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full btn-primary py-5 mt-4 shadow-lg shadow-ink/20 transform hover:-translate-y-1">
              Solicitar Agendamento
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contato" className="bg-ink text-white pt-24 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="lg:col-span-1">
          <h2 className="text-3xl font-serif tracking-widest mb-8 italic">JULIANA HELENA</h2>
          <p className="text-white/40 text-sm leading-relaxed mb-8">
            Beleza natural com identidade. Especialistas em realçar seu olhar e cuidar da sua pele com técnicas avançadas em Curitiba.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/julianahelena_espacodabeleza/" target="_blank" className="w-11 h-11 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-11 h-11 border border-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300">
              <Phone size={20} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-gold">Explorar</h4>
          <ul className="space-y-4 text-sm text-white/40 font-medium">
            <li><a href="#inicio" className="hover:text-white transition-colors">Início</a></li>
            <li><a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a></li>
            <li><a href="#servicos" className="hover:text-white transition-colors">Serviços</a></li>
            <li><a href="#galeria" className="hover:text-white transition-colors">Galeria</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-gold">Especialidades</h4>
          <ul className="space-y-4 text-sm text-white/40 font-medium">
            <li>Design & Microblading</li>
            <li>Extensões de Cílios</li>
            <li>Limpeza de Pele</li>
            <li>Hydragloss Lips</li>
            <li>Lash Lifting</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-gold">Contato</h4>
          <p className="text-sm text-white/40 mb-6 font-medium leading-relaxed">
            Curitiba, PR<br />
            Brasil
          </p>
          <a href="https://wa.me/message/HZTQZIPAWOWZH1" target="_blank" className="text-sm font-bold text-gold hover:text-white transition-colors flex items-center">
            WhatsApp Direto <ChevronRight size={16} />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-12 border-t border-white/5 text-center text-[9px] text-white/20 uppercase tracking-[0.4em] font-medium">
        &copy; {new Date().getFullYear()} Juliana Helena Espaço da Beleza. Elevando sua autoestima.
      </div>
    </footer>
  );
};

const IsabelaVoiceAgent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'loading' | 'active'>('idle');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    retellWebClient.on('call_started', () => {
      console.log('Call started');
      setCallStatus('active');
    });
    retellWebClient.on('call_ended', () => {
      console.log('Call ended');
      setCallStatus('idle');
      setIsModalOpen(false);
    });
    retellWebClient.on('error', (error) => {
      console.error('Retell error:', error);
      setCallStatus('idle');
    });

    return () => {
      retellWebClient.off('call_started');
      retellWebClient.off('call_ended');
      retellWebClient.off('error');
    };
  }, []);

  const toggleCall = async () => {
    if (callStatus === 'active') {
      retellWebClient.stopCall();
      setCallStatus('idle');
      setIsModalOpen(false);
      return;
    }

    setCallStatus('loading');
    try {
      const response = await fetch('/api/create-web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent_id: AGENT_ID }),
      });
      const data = await response.json();

      await retellWebClient.startCall({
        accessToken: data.access_token,
      });
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus('idle');
    }
  };

  const toggleMute = () => {
    const newMuteStatus = !isMuted;
    setIsMuted(newMuteStatus);
    retellWebClient.updateConfig({ isMuted: newMuteStatus });
  };

  return (
    <>
      {/* Botón flotante para abrir el modal - POSICIÓN CORREGIDA A LA DERECHA */}
      <motion.button
        onClick={() => setIsModalOpen(!isModalOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-[100] w-16 h-16 bg-white text-ink rounded-full flex items-center justify-center shadow-2xl border border-gold/20 group"
      >
        <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20 group-hover:opacity-40"></div>
        <div className="absolute inset-0 rounded-full bg-gold animate-pulse opacity-10"></div>
        <div className="relative z-10 w-full h-full rounded-full flex items-center justify-center border-2 border-white shadow-inner bg-gold/5">
          <Phone size={24} className="text-gold group-hover:rotate-12 transition-transform" />
        </div>
        {!isModalOpen && (
          <span className="absolute right-20 bg-white text-ink text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-gold/10 whitespace-nowrap">
            Falar com Isabela
          </span>
        )}
      </motion.button>

      {/* Modal de Isabela - ESTILO CHATBOT CORREGIDO SIN DIFUMINADO */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-8 z-[100] w-[calc(100vw-4rem)] max-w-sm bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gold/10 pointer-events-auto"
          >
            <div className="p-8 text-center pt-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-ink/20 hover:text-ink transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className={`absolute inset-0 rounded-full bg-gold/20 ${callStatus === 'active' ? 'animate-ping' : ''}`}></div>
                <div className="w-full h-full rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-lg overflow-hidden bg-beige">
                  <img
                    src="/assets/images/isabela_avatar.png"
                    alt="Isabela Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-2xl font-serif mb-2 italic">Olá, sou Isabela</h3>
              <p className="text-ink/50 text-[13px] mb-8 leading-relaxed font-medium">
                {callStatus === 'active' ? 'Conte-me, como posso te ajudar hoje?' : 'Sua assistente virtual da Juliana Helena. Deseja agendar um horário ou tem alguma dúvida?'}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={toggleCall}
                  disabled={callStatus === 'loading'}
                  className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-500 font-bold uppercase tracking-widest text-[10px] ${callStatus === 'active'
                    ? 'bg-soft-pink text-red-500 border border-red-100 hover:bg-red-50'
                    : 'bg-ink text-white hover:bg-gold shadow-xl shadow-ink/10'
                    }`}
                >
                  {callStatus === 'loading' ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : callStatus === 'active' ? (
                    <>Encerrar Chamada</>
                  ) : (
                    <>Iniciar Chamada de Voz</>
                  )}
                </button>

                {callStatus === 'active' && (
                  <div className="flex items-center justify-center gap-6 pt-2">
                    <button
                      onClick={toggleMute}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isMuted ? 'bg-red-100 text-red-500' : 'bg-beige text-ink hover:bg-gold/10'}`}
                    >
                      {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                    <div className="flex items-center gap-2 text-gold animate-pulse font-bold text-[9px] uppercase tracking-widest">
                      <Volume2 size={14} />
                      Em linha
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-gold/30 selection:text-ink">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <VideoGallery />
      <Gallery />
      <BookingSection />
      <Footer />
      <IsabelaVoiceAgent />
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { Cpu, BrainCircuit, Globe, GraduationCap, ChevronRight, PlayCircle, Lightbulb, Rocket, Award, Send } from 'lucide-react';
import videoPromo from '../assets/video_promo.mp4';


export default function LandingPage({ onNavigateToAuth }) {
  // ... pega todo el contenido de la función LandingPage aquí ...
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');
  const videoRef = useRef(null);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Enviando...');
    setTimeout(() => {
      setFormStatus('¡Mensaje enviado con éxito! Nos contactaremos pronto.');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-300 font-sans overflow-x-hidden selection:bg-blue-500/30">
      
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-[#050B14]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="text-blue-500 w-8 h-8" />
            <span className="text-white font-black text-xl tracking-tighter">EMERIA TECH</span>
          </div>
          <button onClick={onNavigateToAuth} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:scale-105">
            Acceder
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-10 px-6 lg:pt-48 lg:pb-20 overflow-hidden perspective-1000">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="hidden lg:block absolute top-40 left-20 animate-float rotate-y-12 transform-3d z-0">
          <div className="w-32 h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl" style={{ animation: 'pulse-glow 4s infinite' }}>
            <BrainCircuit className="w-16 h-16 text-indigo-400" />
          </div>
        </div>
        <div className="hidden lg:block absolute bottom-20 right-20 animate-float-delayed rotate-y-minus-12 transform-3d z-0">
          <div className="w-40 h-40 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-2xl" style={{ animation: 'pulse-glow 5s infinite 1s' }}>
            <Globe className="w-20 h-20 text-blue-400" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-8 animate-bounce">
            <GraduationCap className="w-4 h-4" /> Proyecto de Titulación UNESUM
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight tracking-tight mb-8 drop-shadow-2xl">
            Gamificación para las <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Tecnologías Emergentes
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Aplicación de gamificación interactiva diseñada para estudiantes de 8vo semestre de la carrera de Tecnologías de la Información. Desarrolla tus competencias digitales a través de la gamificación.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={onNavigateToAuth} className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.4)]">
              Iniciar Aventura <ChevronRight className="w-5 h-5" />
            </button>
            <a href="#contacto" className="w-full sm:w-auto px-10 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center transition-all backdrop-blur-sm">
              Saber más
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN DE VIDEO PROMOCIONAL */}
      <section className="relative pb-24 px-6 z-20">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(37,99,235,0.15)] bg-slate-900 group">
            <video 
              ref={videoRef}
              autoPlay loop muted playsInline controls
              className="w-full h-auto aspect-video object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              poster="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
            >
              <source src="src/assets/video_promo.mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>
            
            <div className="absolute inset-0 pointer-events-none rounded-[2.5rem] shadow-inner border border-white/5"></div>
            <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-white tracking-widest uppercase">Promo Oficial</span>
            </div>
          </div>
        </div>
      </section>

      {/* RUTA DE APRENDIZAJE */}
      <section className="py-32 relative bg-gradient-to-b from-transparent via-blue-900/5 to-transparent border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-24">
            <h2 className="text-3xl lg:text-5xl font-black text-white mb-6 tracking-tight">Tu Ruta de Aprendizaje</h2>
            <p className="text-slate-400 text-lg">Un viaje estructurado a través de cuatro misiones principales. Supera cada módulo para dominar la Inteligencia Artificial.</p>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-indigo-500 to-transparent transform md:-translate-x-1/2 rounded-full opacity-30 animate-draw-line"></div>
            <div className="space-y-16">
              {[
                { id: 1, title: "Introducción a la IA", desc: "Introducción general a las Tecnologías Emergentes y a la Inteligencia Artificial.", icon: <PlayCircle className="w-8 h-8 text-blue-400" /> },
                { id: 2, title: "Gestión y Avances", desc: "Gestión de Conocimientos y Avances Tecnológicos en el mundo moderno.", icon: <Lightbulb className="w-8 h-8 text-indigo-400" /> },
                { id: 3, title: "Sistemas Basados", desc: "Sistema basado en el Conocimiento y Resolución de problemas mediante búsqueda.", icon: <BrainCircuit className="w-8 h-8 text-purple-400" /> },
                { id: 4, title: "Machine Learning", desc: "Aprendizaje automático basado en tecnologías e Incertidumbre en IA.", icon: <Rocket className="w-8 h-8 text-pink-400" /> }
              ].map((ut, index) => (
                <div key={ut.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} group cursor-pointer`}>
                  <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-[#050B14] border-4 border-blue-500 rounded-full transform -translate-x-1/2 z-10 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.6)] group-hover:scale-125 transition-transform duration-300">
                    <span className="text-white font-black text-sm">{ut.id}</span>
                  </div>
                  <div className={`w-full md:w-1/2 pl-24 pr-4 md:px-16 ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white/10 group-hover:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.3)] group-hover:border-blue-500/30">
                      <div className={`flex items-center gap-4 mb-6 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform">{ut.icon}</div>
                        <span className="text-blue-500 font-black text-sm uppercase tracking-widest">Unidad Temática {ut.id}</span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-4">{ut.title}</h3>
                      <p className="text-slate-400 leading-relaxed text-base">{ut.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative mt-16 flex justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center z-10 shadow-[0_0_40px_rgba(37,99,235,0.8)] animate-pulse border-4 border-[#050B14]">
                <Award className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto & Footer Section */}
      <section id="contacto" className="py-24 bg-gradient-to-b from-[#050B14] to-slate-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-2">¿Tienes dudas sobre el proyecto?</h2>
            <p className="text-slate-400 mb-8 text-sm">Déjanos tu mensaje y nos pondremos en contacto contigo.</p>
            <form onSubmit={handleContactSubmit} className="space-y-5">
              <input type="text" required placeholder="Tu Nombre Completo" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-5 focus:outline-none focus:border-blue-500 transition-colors" />
              <input type="email" required placeholder="Correo Electrónico" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-5 focus:outline-none focus:border-blue-500 transition-colors" />
              <textarea required placeholder="¿En qué podemos ayudarte?" rows="4" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 text-white rounded-2xl py-4 px-5 focus:outline-none focus:border-blue-500 transition-colors resize-none"></textarea>
              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all">
                <Send className="w-5 h-5" /> Enviar Mensaje
              </button>
              {formStatus && <p className={`text-center text-sm font-bold mt-4 ${formStatus.includes('éxito') ? 'text-green-400' : 'text-blue-400 animate-pulse'}`}>{formStatus}</p>}
            </form>
          </div>

          <div className="flex flex-col justify-center lg:pl-10">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="text-blue-500 w-10 h-10" />
                <span className="text-white font-black text-3xl tracking-tighter">EMERIA TECH</span>
              </div>
              <p className="text-slate-400 leading-relaxed max-w-md">Desarrollado como proyecto de titulación para la carrera de Tecnologías de la Información de la UNESUM. Impulsando la educación a través de la gamificación y la IA.</p>
            </div>
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4 text-slate-400"><Globe className="w-5 h-5 text-blue-500" /> Jipijapa, Manabí, Ecuador</div>
              <div className="flex items-center gap-4 text-slate-400"><GraduationCap className="w-5 h-5 text-blue-500" /> UNESUM</div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-6 text-center border-t border-white/5 bg-[#050B14]">
        <p className="text-slate-600 text-sm">© 2026 EMERIA TECH. Todos los derechos reservados.</p>
      </div>
    </div>
  );

}
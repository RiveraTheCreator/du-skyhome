"use client";

import { useState, useEffect, useRef, ReactNode } from "react";

// Webhook y Calendly configuraciones
const WEBHOOK_URL = "https://go.alex-ai.dev/webhook-test/skyhome-lead";
// URL PROD: "https://go.alex-ai.dev/webhook/skyhome-lead"
const CALENDLY_URL = "PENDIENTE"; // PENDIENTE DE CONFIGURAR

// Reveal Component for scroll animations
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({
    zona: "",
    uso: "",
    construida: "",
    metros: "",
    cuando: "",
    ubicacion: "",
    nombre: "",
    whatsapp: "",
    correo: "",
    consentimiento: false,
  });

  const [paso, setPaso] = useState(1);
  const [pasoAlcanzado, setPasoAlcanzado] = useState(1);
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState("");
  const [attribution, setAttribution] = useState<any>(null);

  // Captura de parámetros UTM y atribución al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const vp = `${window.innerWidth}x${window.innerHeight}`;
      const device = window.innerWidth < 768 ? "movil" : "escritorio";

      setAttribution({
        utm_source: urlParams.get("utm_source") || "",
        utm_medium: urlParams.get("utm_medium") || "",
        utm_campaign: urlParams.get("utm_campaign") || "",
        utm_content: urlParams.get("utm_content") || "",
        utm_term: urlParams.get("utm_term") || "",
        fbclid: urlParams.get("fbclid") || "",
        gclid: urlParams.get("gclid") || "",
        referrer: document.referrer || "",
        landing_url: window.location.href,
        dispositivo: device,
        viewport: vp,
        ts_inicio: new Date().toISOString(),
      });
    }
  }, []);

  // Evento del Píxel para cada paso
  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("trackCustom", `form_step_${paso}`);
    }
  }, [paso]);

  const handleSelect = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNextPaso = () => {
    const nextStep = paso + 1;
    setPaso(nextStep);
    if (nextStep > pasoAlcanzado) {
      setPasoAlcanzado(nextStep);
    }
  };

  const isPasoValid = (step: number) => {
    if (step === 1) return Boolean(formData.zona);
    if (step === 2) return Boolean(formData.uso);
    if (step === 3) return Boolean(formData.construida && formData.metros && formData.cuando && formData.ubicacion.trim());
    if (step === 4) {
      const phoneDigits = formData.whatsapp.replace(/\D/g, "");
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo.trim());
      return Boolean(formData.nombre.trim()) && phoneDigits.length >= 10 && validEmail && formData.consentimiento;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPasoValid(4)) return;

    setEnviando(true);
    setErrorEnvio("");

    const ts_envio = new Date().toISOString();
    const ts_inicio_date = attribution?.ts_inicio ? new Date(attribution.ts_inicio) : new Date();
    const duracion_seg = Math.floor((new Date().getTime() - ts_inicio_date.getTime()) / 1000);

    const payload = {
      campana: "sky-home",
      zona: formData.zona,
      uso: formData.uso,
      construida: formData.construida,
      metros: formData.metros,
      cuando: formData.cuando,
      ubicacion: formData.ubicacion,
      nombre: formData.nombre,
      whatsapp: formData.whatsapp,
      correo: formData.correo,
      consentimiento: formData.consentimiento,
      ...attribution,
      ts_envio,
      duracion_seg,
      paso_alcanzado: pasoAlcanzado,
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Error en el envío");

      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead");
      }

      setEnviado(true);
    } catch (err) {
      setErrorEnvio("Hubo un problema al enviar tu información. Por favor, intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="w-full selection:bg-primary selection:text-white">
      {/* 1. Hero */}
      <section className="relative isolate flex min-h-[clamp(620px,88vh,900px)] items-center overflow-hidden bg-ink px-6 py-28 text-white md:py-36">
        <video
          className="absolute inset-0 -z-20 size-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        >
          <source src="/videos/skyhome_video.mp4" type="video/mp4" />
        </video>
        {/* Adjusted gradients for more transparency so the video shows better */}
        <div className="absolute inset-0 -z-10 bg-ink/20" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/50 via-ink/20 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink/30 to-transparent" aria-hidden="true" />

        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-3xl">
            <Reveal>
              <div className="mb-8 inline-flex border border-white/60 px-4 py-2 text-xs font-display font-bold uppercase tracking-[0.2em]">
                Sky Home
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="max-w-4xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                Tu azotea puede ser un departamento que genera ingresos.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-white/85 md:text-xl">
                La mayoría de las azoteas en México solo sirven para tender ropa. La tuya puede convertirse en un activo rentable en aproximadamente 4 meses.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <a href="#contacto" className="mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 font-display font-bold text-white transition-all duration-300 hover:bg-primary-hover active:scale-95">
                Agenda tu llamada
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Tecnología estructural */}
      <section className="py-24 md:py-32 px-6 bg-ink text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-full max-h-96 border-[1px] border-white/5 rounded-[100%] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-10 leading-tight">Tecnología estructural probada para azoteas mexicanas.</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed md:px-12">
              El <strong>80% de las propiedades</strong> califican para una extensión gracias a la sobredimensión estructural típica de la construcción tradicional en el país.
              Utilizamos un <strong>sistema estructural ligero</strong> soportado por nuestro equipo interno de arquitectura e ingeniería.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. Pilares de valor & Galería */}
      <section className="py-24 md:py-32 bg-white border-b border-line overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-16">Por qué somos diferentes</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-10 md:space-y-16">
              {[
                { title: "Velocidad", desc: "Un tercio del tiempo de la construcción tradicional, sin obras eternas." },
                { title: "Respaldo profesional", desc: "Arquitectos e ingenieros con cálculo estructural real, no intuición." },
                { title: "Estética y diseño", desc: "Arquitectura integrada que respeta tu propiedad, no un cuarto agregado al azar." },
                { title: "Sustentabilidad", desc: "Estrategia de eficiencia energética y opción de tecnologías fotovoltaicas." }
              ].map((pilar, idx) => (
                <Reveal key={pilar.title} delay={idx * 100} className="flex gap-6">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                  <div>
                    <h3 className="font-display font-bold text-xl md:text-2xl mb-2">{pilar.title}</h3>
                    <p className="text-gray leading-relaxed">{pilar.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            
            <Reveal delay={200} className="relative h-full min-h-[400px]">
              <div className="absolute inset-0 bg-line transform translate-x-4 translate-y-4 rounded-2xl hidden md:block"></div>
              <img src="/renders/room01.jpeg" alt="Interior Sky Home" className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10" />
            </Reveal>
          </div>
        </div>

        {/* Galeria Horizontal Snap Scroll para Mobile */}
        <div className="w-full">
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <Reveal>
              <h3 className="font-display font-bold text-2xl">Espacios pensados para rentar o vivir</h3>
            </Reveal>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-6 pb-8 md:grid md:grid-cols-3 md:gap-8 md:px-6 max-w-7xl mx-auto">
            {[
              "/renders/rooftop01.jpeg",
              "/renders/room08.jpeg",
              "/renders/rooftop02.jpeg"
            ].map((img, idx) => (
              <Reveal key={idx} delay={idx * 150} className="snap-center shrink-0 w-[85vw] md:w-auto h-[50vh] md:h-[60vh] relative group overflow-hidden rounded-2xl border border-line">
                <img src={img} alt="Vista Sky Home" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Problema / Situación actual */}
      <section className="py-24 md:py-32 px-6 bg-white border-b border-line relative">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 md:mb-16 md:max-w-2xl">El espacio muerto que te está costando dinero.</h2>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            <Reveal delay={100}>
              <p className="text-lg text-gray leading-relaxed">
                Tienes un espacio en tu azotea que no genera nada, y necesitas más metros habitables sin mudarte ni meterte en una obra interminable. 
                Pensar en maestros de obra informales trae dudas: ¿Aguntará la casa? ¿Cuándo terminarán realmente?
              </p>
            </Reveal>

            <Reveal delay={200} className="space-y-8">
              <div className="pl-6 border-l border-line">
                <h3 className="font-display font-bold text-lg mb-2 text-gray">La obra tradicional</h3>
                <ul className="space-y-2 text-gray/80 text-sm">
                  <li className="flex gap-2"><span>×</span> Tiempos de entrega indefinidos.</li>
                  <li className="flex gap-2"><span>×</span> Sin cálculos estructurales formales.</li>
                  <li className="flex gap-2"><span>×</span> Escombro y suciedad por meses.</li>
                </ul>
              </div>
              <div className="pl-6 border-l-2 border-primary bg-primary-tint/30 py-4 px-6 rounded-r-2xl">
                <h3 className="font-display font-bold text-lg mb-2 text-primary">La alternativa Sky Home</h3>
                <ul className="space-y-2 text-ink text-sm font-medium">
                  <li className="flex gap-2"><span className="text-primary">✓</span> Construcción modular en 4 meses.</li>
                  <li className="flex gap-2"><span className="text-primary">✓</span> Ingeniería y cálculo estructural profesional.</li>
                  <li className="flex gap-2"><span className="text-primary">✓</span> Instalación limpia sin obra húmeda excesiva.</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5. Cómo funciona */}
      <section className="py-24 md:py-32 px-6 bg-primary text-white relative overflow-hidden">
        {/* Subtle background geometry */}
        <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] border-[1px] border-white/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-16 md:mb-24">Cómo construimos tu Sky Home</h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0">
            {[
              { num: "01", title: "Diseño y Proyecto", desc: "Arquitectura adaptada a tus necesidades y al espacio de tu propiedad." },
              { num: "02", title: "Ingeniería", desc: "Cálculo estructural preciso para garantizar la seguridad de la ampliación." },
              { num: "03", title: "Fabricación", desc: "Construcción modular con sistema estructural ligero, limpio y eficiente." },
              { num: "04", title: "Montaje en sitio", desc: "Instalación rápida que reduce al mínimo las molestias y escombros." }
            ].map((paso, idx) => (
              <Reveal key={paso.num} delay={idx * 150} className="relative md:px-8 md:border-l border-white/20 first:border-l-0 pt-6 md:pt-0">
                <div className="text-white/40 font-display font-bold text-4xl md:text-5xl mb-4 md:mb-8">{paso.num}</div>
                <h3 className="font-bold text-xl mb-3">{paso.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{paso.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Ejercicio financiero / ROI */}
      <section className="py-24 md:py-32 px-6 bg-primary-tint">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-line">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">Inversión y Retorno</h2>
            </Reveal>
            
            <div className="grid md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-line">
              <Reveal delay={100} className="flex flex-col items-center md:items-start text-center md:text-left">
                <p className="text-gray text-xs font-bold uppercase tracking-[0.2em] mb-4">DESDE</p>
                <p className="text-5xl font-display font-bold text-primary mb-2"><span className="text-xl text-ink font-sans font-bold uppercase">Desde </span>$15,500 <span className="text-xl text-ink font-sans font-normal">MXN / m²</span></p>
              </Reveal>
              
              <Reveal delay={200} className="flex flex-col items-center md:items-start text-center md:text-left pt-12 md:pt-0 md:pl-12">
                <p className="text-gray text-xs font-bold uppercase tracking-[0.2em] mb-4">Mínimo de construcción</p>
                <p className="text-5xl font-display font-bold text-ink mb-2">20 <span className="text-xl font-sans font-normal">m²</span></p>
              </Reveal>
            </div>

            <Reveal delay={300} className="mt-16 pt-12 border-t border-line">
              <h3 className="font-display font-bold text-xl mb-6 text-center md:text-left">Esquemas de pago</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border border-line rounded-xl bg-primary-tint/30">
                  <h4 className="font-bold mb-2">Capital propio</h4>
                  <p className="text-gray text-sm leading-relaxed">Anticipo y pagos escalonados estructurados según el avance de la obra.</p>
                </div>
                <div className="p-6 border border-line rounded-xl bg-primary-tint/30">
                  <h4 className="font-bold mb-2">Crédito de autofinanciamiento</h4>
                  <p className="text-gray text-sm leading-relaxed">Aportas solo el 33% del capital inicial, nosotros te asesoramos en el proceso.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Qué incluye y qué no */}
      <section className="py-24 md:py-32 px-6 bg-white border-b border-line">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16">
          <Reveal className="p-8 md:p-12 rounded-3xl bg-primary-tint/40 border border-line">
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-8 text-primary">Lo que incluye tu proyecto</h3>
            <ul className="space-y-5 text-ink font-medium">
              {[
                "Diseño arquitectónico",
                "Diseño de instalaciones hidráulicas y eléctricas",
                "Proyecto ejecutivo y cálculo estructural",
                "Estrategia de sustentabilidad",
                "Planos para permisos y memoria descriptiva",
                "Asesoría financiera del esquema de pago"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-1 bg-primary text-white rounded-full p-1 shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          
          <Reveal delay={100} className="p-8 md:p-12 rounded-3xl border border-line">
            <h3 className="font-display font-bold text-2xl md:text-3xl mb-8 text-ink">Lo que NO incluye</h3>
            <ul className="space-y-5 text-gray">
              {[
                "Gestoría y trámite de permisos ante el municipio",
                "Estudios de impacto ambiental",
                "Estudios de tránsito"
              ].map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <div className="mt-1 bg-line text-gray rounded-full p-1 shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-6 border-t border-line">
              <p className="text-sm text-gray leading-relaxed">
                * Te entregamos toda la documentación técnica necesaria para que puedas gestionar tus permisos fácilmente o contratar a un gestor independiente.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. Preguntas frecuentes */}
      <section className="py-24 md:py-32 px-6 bg-white border-b border-line">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-16 text-center">Preguntas Frecuentes</h2>
          </Reveal>
          <div className="space-y-6">
            {[
              { q: "¿Mi casa aguanta estructuralmente?", a: "Realizamos un cálculo estructural real liderado por ingenieros profesionales para asegurar que tu propiedad soporta el sistema estructural sin riesgos." },
              { q: "¿Necesito permisos y quién los tramita?", a: "Sí se requieren permisos. Nosotros te entregamos los planos y la memoria descriptiva, pero el trámite y la gestoría ante el municipio corren por tu cuenta." },
              { q: "¿Puedo ver un proyecto terminado?", a: "Nuestros primeros modelos Sky Home se encuentran actualmente en fase de producción. Te mostraremos renders de alta fidelidad y detalles técnicos completos en nuestra llamada." }
            ].map((faq, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="p-8 border border-line rounded-2xl hover:border-primary/30 transition-colors">
                  <h3 className="font-bold text-lg mb-3">{faq.q}</h3>
                  <p className="text-gray leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Sección de conversión final */}
      <section id="contacto" className="py-24 md:py-32 px-6 bg-primary-tint relative">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-line overflow-hidden flex flex-col md:flex-row">
              
              {/* Form Sidebar */}
              <div className="bg-primary text-white p-7 sm:p-10 md:p-14 md:w-2/5 flex flex-col justify-between relative overflow-hidden shrink-0">
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-3xl mb-6">Agenda tu llamada de descubrimiento.</h3>
                  <p className="text-white/80 leading-relaxed text-lg">Conoce si tu propiedad es viable y da el primer paso hacia tu ampliación modular.</p>
                </div>
                
                {/* Progress Indicators */}
                <div className="mt-12 flex gap-2 relative z-10">
                  {[1,2,3,4].map(step => (
                    <div key={step} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${paso >= step ? 'bg-white' : 'bg-white/20'}`}></div>
                  ))}
                </div>

                {/* Geometric decoration */}
                <div className="absolute -bottom-16 -left-16 w-64 h-64 border-[24px] border-white/5 rounded-full pointer-events-none"></div>
              </div>
              
              {/* Form Content */}
              <div className="p-5 pt-8 sm:p-8 sm:pt-10 md:p-14 md:w-3/5 bg-white relative flex flex-col min-h-[560px] md:min-h-[560px]">
                {!enviado ? (
                  <form onSubmit={handleSubmit} noValidate className="flex flex-col h-full grow">
                    <div className="relative grow min-h-[360px]">
                      
                      {/* Paso 1 */}
                      <div className={`transition-all duration-500 absolute inset-0 ${paso === 1 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-8 pointer-events-none invisible'}`}>
                        <p className="text-xs font-display text-primary font-bold uppercase tracking-[0.2em] mb-4">Paso 1 de 4</p>
                        <h4 className="font-display font-bold text-2xl mb-8">¿Dónde construirías tu extensión?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {["Azotea", "Patio o jardín", "Terreno anexo", "Aún no lo defino"].map((opt) => (
                            <button 
                              key={opt} type="button"
                              onClick={() => handleSelect("zona", opt)}
                              className={`p-5 rounded-xl text-left transition-all border ${formData.zona === opt ? 'border-primary bg-primary-tint ring-1 ring-primary' : 'border-line hover:border-gray/30'}`}
                            >
                              <span className="block font-medium text-sm text-ink">{opt}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Paso 2 */}
                      <div className={`transition-all duration-500 absolute inset-0 ${paso === 2 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 pointer-events-none invisible'}`}>
                        <p className="text-xs font-display text-primary font-bold uppercase tracking-[0.2em] mb-4">Paso 2 de 4</p>
                        <h4 className="font-display font-bold text-2xl mb-8">¿Qué uso tendría ese espacio?</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {["Recámara", "Oficina o estudio", "Departamento independiente", "Roof garden o terraza", "Otro"].map((opt) => (
                            <button 
                              key={opt} type="button"
                              onClick={() => handleSelect("uso", opt)}
                              className={`p-5 rounded-xl text-left transition-all border ${formData.uso === opt ? 'border-primary bg-primary-tint ring-1 ring-primary' : 'border-line hover:border-gray/30'}`}
                            >
                              <span className="block font-medium text-sm text-ink">{opt}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Paso 3 */}
                      <div className={`transition-all duration-500 absolute inset-0 overflow-y-auto hide-scrollbar pb-10 ${paso === 3 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 pointer-events-none invisible'}`}>
                        <p className="text-xs font-display text-primary font-bold uppercase tracking-[0.2em] mb-4">Paso 3 de 4</p>
                        <h4 className="font-display font-bold text-2xl mb-8">Cuéntanos de la propiedad</h4>
                        <div className="space-y-5">
                          <div>
                            <label className="block text-sm font-medium text-gray mb-2">¿Ya está construida?</label>
                            <select name="construida" value={formData.construida} onChange={handleChange} className="w-full p-4 border border-line rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-all text-ink">
                              <option value="">Selecciona una opción</option>
                              <option value="Sí">Sí, ya está construida</option>
                              <option value="En construcción">En construcción</option>
                              <option value="No">Aún no</option>
                            </select>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray mb-2">Metros aprox.</label>
                              <select name="metros" value={formData.metros} onChange={handleChange} className="w-full p-4 border border-line rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-all text-ink">
                                <option value="">Rango</option>
                                <option value="<30">Menos de 30 m²</option>
                                <option value="30-60">30 – 60 m²</option>
                                <option value="60-100">60 – 100 m²</option>
                                <option value=">100">Más de 100 m²</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray mb-2">Inicio ideal</label>
                              <select name="cuando" value={formData.cuando} onChange={handleChange} className="w-full p-4 border border-line rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white transition-all text-ink">
                                <option value="">Selecciona</option>
                                <option value="1 mes">En 1 mes</option>
                                <option value="1-3 meses">1 a 3 meses</option>
                                <option value="3-6 meses">3 a 6 meses</option>
                                <option value="explorando">Solo explorando</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray mb-2">Ubicación (Ciudad / Colonia)</label>
                            <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} placeholder="Ej. CDMX, Roma Norte" className="w-full p-4 border border-line rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-ink" />
                          </div>
                        </div>
                      </div>

                      {/* Paso 4 */}
                      <div className={`transition-all duration-500 absolute inset-0 overflow-y-auto hide-scrollbar pb-10 ${paso === 4 ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-8 pointer-events-none invisible'}`}>
                        <p className="text-xs font-display text-primary font-bold uppercase tracking-[0.2em] mb-4">Paso 4 de 4</p>
                        <h4 className="font-display font-bold text-2xl mb-8">Tus datos de contacto</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray mb-2">Nombre completo</label>
                            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Tu nombre" className="w-full p-4 border border-line rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-ink" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray mb-2">WhatsApp</label>
                            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="55 1234 5678" className="w-full p-4 border border-line rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-ink" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray mb-2">Correo electrónico</label>
                            <input type="email" name="correo" value={formData.correo} onChange={handleChange} placeholder="tu@email.com" className="w-full p-4 border border-line rounded-xl outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-ink" />
                          </div>
                          
                          {/* Consentimiento */}
                          <div className="pt-2">
                            <label className="flex items-start gap-3 cursor-pointer group">
                              <input 
                                type="checkbox" 
                                name="consentimiento"
                                checked={formData.consentimiento}
                                onChange={handleChange}
                                className="mt-0.5 w-4 h-4 text-primary bg-white border-line rounded focus:ring-primary shrink-0"
                              />
                              <span className="text-sm text-gray leading-tight group-hover:text-ink transition-colors">
                                Acepto el <a href="/aviso-de-privacidad" target="_blank" className="text-primary underline">aviso de privacidad</a> y el tratamiento de mis datos para ser contactado.
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons & Error message */}
                    <div className="mt-auto pt-8 border-t border-line flex flex-col z-20 relative bg-white">
                      {errorEnvio && (
                        <div className="mb-4 text-red-500 text-sm font-medium text-center bg-red-50 py-2 px-4 rounded-lg">
                          {errorEnvio}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <button 
                          type="button" 
                          onClick={() => setPaso(paso - 1)} 
                          className={`text-gray hover:text-ink font-medium text-sm transition-colors ${paso === 1 ? 'invisible' : 'visible'}`}
                        >
                          ← Atrás
                        </button>
                        
                        {paso < 4 ? (
                          <button 
                            type="button" 
                            onClick={handleNextPaso} 
                            disabled={!isPasoValid(paso)}
                            className="bg-primary text-white font-display font-bold py-3 px-6 md:py-4 md:px-8 rounded-full disabled:bg-line disabled:text-gray/50 transition-all hover:bg-primary-hover active:scale-95"
                          >
                            Siguiente
                          </button>
                        ) : (
                          <button 
                            type="submit" 
                            disabled={!isPasoValid(4) || enviando}
                            className="bg-primary text-white font-display font-bold py-3 px-6 md:py-4 md:px-8 rounded-full disabled:bg-line disabled:text-gray/50 transition-all hover:bg-primary-hover active:scale-95 flex gap-2 items-center"
                          >
                            {enviando ? "Enviando..." : (
                              <>
                                Enviar proyecto
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center transition-all duration-500 opacity-100 scale-100">
                    <div className="w-20 h-20 bg-primary-tint text-primary rounded-full flex items-center justify-center mb-8">
                      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="font-display font-bold text-3xl mb-4 text-ink">Recibimos tu solicitud</h4>
                    <p className="text-gray mb-10 max-w-sm font-sans">Un especialista te contactará pronto. Si prefieres elegir tú el horario, puedes agendar directamente.</p>
                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-white font-display font-bold py-4 px-8 rounded-full hover:bg-primary-hover transition-all active:scale-95">
                      Agendar mi llamada ahora
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-ink text-white/50 py-16 px-6 text-sm border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="font-display font-bold text-white text-xl tracking-[0.15em] uppercase">Disrupción Urbana</span>
            <p className="max-w-xs text-center md:text-left">Construcción modular sostenible sobre azoteas y espacios subutilizados.</p>
          </div>
          <div className="flex gap-8 font-medium">
            <span className="hover:text-white transition-colors cursor-default">CDMX</span>
            <span className="hover:text-white transition-colors cursor-default">Guadalajara</span>
            <span className="hover:text-white transition-colors cursor-default">Net Zero Habitat</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between gap-4">
          <p>© {new Date().getFullYear()} Disrupción Urbana. Todos los derechos reservados.</p>
          <a href="#" className="hover:text-white transition-colors">Aviso de Privacidad</a>
        </div>
      </footer>
      
      {/* Custom scrollbar hiding and fluid transition classes */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </main>
  );
}

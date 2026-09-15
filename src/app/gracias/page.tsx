"use client";

import { useEffect, useState } from "react";

const CALENDLY_URL = "PENDIENTE"; // PENDIENTE DE CONFIGURAR

export default function Gracias() {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    // Redirigir al inicio después de 1 minuto
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="w-full min-h-screen bg-primary-tint flex items-center justify-center p-6 selection:bg-primary selection:text-white">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-line overflow-hidden w-full max-w-2xl relative p-8 md:p-16 text-center">
        {/* Progress bar at the top indicating time left before redirect */}
        <div className="absolute top-0 left-0 h-1 bg-primary transition-all duration-1000 ease-linear" style={{ width: \`\${(timeLeft / 60) * 100}%\` }} />
        
        <div className="flex justify-center mb-8">
          <img src="/logo_du.png" alt="Logo Disrupción Urbana" className="h-16 w-auto" />
        </div>

        <div className="w-20 h-20 bg-primary-tint text-primary rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="font-display font-bold text-3xl md:text-4xl mb-4 text-ink">¡Gracias por tu interés en Sky Home!</h1>
        <p className="text-gray text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Hemos recibido tu información correctamente. Un especialista se pondrá en contacto contigo muy pronto para evaluar la viabilidad de tu proyecto.
        </p>
        
        <div className="bg-ink/5 rounded-2xl p-6 md:p-8 mb-10">
          <h2 className="font-bold text-xl mb-3 text-ink">¿No quieres esperar?</h2>
          <p className="text-gray text-sm mb-6">Elige el horario que mejor te funcione y hablemos directamente.</p>
          <a 
            href={CALENDLY_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-white font-display font-bold py-4 px-8 rounded-full hover:bg-primary-hover transition-all active:scale-95"
          >
            Agendar mi llamada ahora
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>

        <p className="text-xs text-gray/60">
          Serás redirigido al inicio en {timeLeft} segundos...
        </p>
      </div>
    </main>
  );
}

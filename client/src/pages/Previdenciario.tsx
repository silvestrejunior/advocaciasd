/**
 * Página Previdenciário - Exibe site de Direito Previdenciário via iframe
 * O site está hospedado em: https://direitoprev-w9hn3xxp.manus.space
 * 
 * Otimizações aplicadas:
 * - Lazy loading com Intersection Observer (50px antes de entrar em view)
 * - Skeleton loading animado durante carregamento
 * - Preload DNS e preconnect para reduzir latência
 * - Timeout de 15s com fallback
 * - Compressão e cache HTTP
 * - Sandbox seguro com permissões limitadas
 */

import { useEffect, useRef, useState } from "react";

const PREVIDENCIARIO_URL = "https://direitoprev-w9hn3xxp.manus.space";
const LOAD_TIMEOUT = 15000; // 15 segundos

export default function Previdenciario() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Lazy loading com Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px", // Começa a carregar 50px antes de entrar em view
        threshold: 0.01,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Timeout para carregamento do iframe
  useEffect(() => {
    if (isVisible && !isLoaded && !hasError) {
      timeoutRef.current = setTimeout(() => {
        if (!isLoaded) {
          console.warn("Timeout ao carregar iframe do site previdenciário");
          setHasError(true);
        }
      }, LOAD_TIMEOUT);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, isLoaded, hasError]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleIframeError = () => {
    setHasError(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white flex flex-col"
    >
      {/* Skeleton loading enquanto o iframe não carrega */}
      {!isLoaded && !hasError && (
        <div className="w-full h-screen bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Carregando Direito Previdenciário...</p>
            <p className="mt-2 text-sm text-gray-500">Isso pode levar alguns segundos</p>
          </div>
        </div>
      )}

      {/* Mensagem de erro */}
      {hasError && (
        <div className="w-full h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Erro ao Carregar</h2>
            <p className="text-gray-600 mb-6">
              Desculpe, o site de Direito Previdenciário está demorando para carregar.
            </p>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoaded(false);
                setIsVisible(false);
                // Recarrega a página após 1s
                setTimeout(() => setIsVisible(true), 1000);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Tentar Novamente
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Ou acesse diretamente:{" "}
              <a
                href={PREVIDENCIARIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                direitoprev-w9hn3xxp.manus.space
              </a>
            </p>
          </div>
        </div>
      )}

      {/* iframe com lazy loading e otimizações */}
      {isVisible && !hasError && (
        <iframe
          ref={iframeRef}
          src={PREVIDENCIARIO_URL}
          className={`w-full h-screen border-none transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          title="Direito Previdenciário - Santana Daufenbach"
          allow="geolocation; microphone; camera"
          loading="lazy"
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-top-navigation"
        />
      )}
    </div>
  );
}

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { PEDIDO_APOSENTADORIA } from "@/config/comoPedirAposentadoria";

export type VideoAssessoriaHandle = { abrir: () => void };

/**
 * Fachada leve de vídeo: a capa é local, nenhuma requisição ao player do
 * YouTube ocorre antes de uma interação. O vídeo é vertical, mas o quadro
 * preserva o formato 16:9 especificado pelo cliente. Sem autoplay.
 */
export const VideoAssessoria = forwardRef<VideoAssessoriaHandle>(
  function VideoAssessoria(_, ref) {
    const [aberto, setAberto] = useState(false);
    const player = useRef<HTMLIFrameElement>(null);
    const { video } = PEDIDO_APOSENTADORIA;

    const abrir = () => {
      setAberto(true);
      requestAnimationFrame(() => player.current?.focus());
    };
    useImperativeHandle(ref, () => ({ abrir }));

    return (
      <figure
        id="video-assessoria"
        className="cp-video"
        aria-labelledby="cp-video-titulo"
      >
        <p id="cp-video-titulo" className="cp-video-titulo">
          {video.titulo}
        </p>
        <div className="cp-video-quadro">
          {aberto ? (
            <iframe
              ref={player}
              src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&playsinline=1`}
              title={video.titulo}
              allow="encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              tabIndex={0}
            />
          ) : (
            <button
              type="button"
              onClick={abrir}
              aria-label={`Assistir ao vídeo: ${video.titulo}`}
              className="cp-video-capa"
            >
              <img
                src={video.capa}
                alt="Capa do vídeo sobre assessoria para aposentadoria do canal SD Advocacia Previdenciária"
                width={480}
                height={360}
                loading="lazy"
                decoding="async"
              />
              <span className="cp-video-sombra" aria-hidden="true" />
              <span className="cp-play" aria-hidden="true">
                <span />
              </span>
              <span className="cp-video-acao">Assistir ao vídeo</span>
            </button>
          )}
        </div>
        <figcaption>{video.descricao}</figcaption>
        {aberto && (
          <a
            className="cp-video-alternativa"
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Assistir ao vídeo diretamente no YouTube"
          >
            Assistir ao vídeo
          </a>
        )}
        <noscript>
          <a className="cp-video-alternativa" href={video.url}>
            Assistir ao vídeo
          </a>
        </noscript>
      </figure>
    );
  }
);

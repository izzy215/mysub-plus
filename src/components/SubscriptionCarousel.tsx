import React, { useEffect, useRef } from 'react';

const SubscriptionCarousel = () => {
  const handleLogoClick = (url: string) => {
    window.open(url, '_blank');
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollPosition = useRef(0);

  const logos = [
    { name: 'Netflix', color: '#E50914', url: 'https://www.netflix.com' },
    { name: 'Spotify', color: '#1DB954', url: 'https://www.spotify.com' },
    { name: 'Disney+', color: '#113CCF', url: 'https://www.disneyplus.com' },
    { name: 'YouTube Premium', color: '#FF0000', url: 'https://www.youtube.com/premium' },
    { name: 'Amazon Prime', color: '#00A8E1', url: 'https://www.primevideo.com' },
    { name: 'Apple Music', color: '#FA243C', url: 'https://music.apple.com' },
    { name: 'HBO Max', color: '#8B5CF6', url: 'https://www.hbomax.com' },
    { name: 'Hulu', color: '#1CE783', url: 'https://www.hulu.com' },
    { name: '피클플러스', color: '#0ea5e9', url: 'https://pickle.plus/' },
  ];

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const logoWidth = 120 + 24;
    const totalWidth = logos.length * logoWidth;

    const animate = () => {
      scrollPosition.current += 1;

      if (scrollPosition.current >= totalWidth) {
        scrollPosition.current = 0;
      }

      scrollElement.style.transform = `translateX(-${scrollPosition.current}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [logos.length]);

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden py-8">
      <h3 className="text-lg font-semibold mb-4 text-center">🔥 인기 구독 서비스</h3>
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex"
          onMouseEnter={() => {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }
          }}
          onMouseLeave={() => {
            const scrollElement = scrollRef.current;
            if (!scrollElement) return;

            const logoWidth = 120 + 24;
            const totalWidth = logos.length * logoWidth;

            const animate = () => {
              scrollPosition.current += 1;

              if (scrollPosition.current >= totalWidth) {
                scrollPosition.current = 0;
              }

              scrollElement.style.transform = `translateX(-${scrollPosition.current}px)`;
              animationRef.current = requestAnimationFrame(animate);
            };

            animate();
          }}
        >
          {/* 첫 번째 세트 */}
          {logos.concat(logos).map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              onClick={() => handleLogoClick(logo.url)}
              className="flex-shrink-0 mx-3 px-5 py-3 rounded-md border border-gray-200 bg-white shadow hover:shadow-md hover:bg-blue-50 hover:scale-105 transition-all cursor-pointer min-w-[120px] text-center"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-4 text-center">
        서비스를 클릭하면 새 탭으로 이동합니다
      </p>
    </div>
  );
};

export default SubscriptionCarousel;

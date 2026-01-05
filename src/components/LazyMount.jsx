import { useEffect, useRef, useState } from 'react';

const LazyMount = ({
  children,
  anchorId,
  rootMargin = '200px 0px',
  minHeight = 1,
  className = ''
}) => {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div
      ref={ref}
      id={!mounted ? anchorId : undefined}
      className={className}
      style={!mounted ? { minHeight } : undefined}
    >
      {mounted ? children : null}
    </div>
  );
};

export default LazyMount;

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

const CountUp = ({
  end,
  decimals = 0,
  duration = 1.2,
  prefix = "",
  suffix = "",
}: {
  end: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    if (end === 0) { setCount(0); return; }
    const steps = 30;
    const increment = end / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(decimals > 0 ? parseFloat(current.toFixed(decimals)) : Math.floor(current));
      }
    }, (duration * 1000) / steps);
    return () => clearInterval(interval);
  }, [inView, end, decimals, duration]);

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? count.toFixed(decimals) : count.toLocaleString()}{suffix}
    </span>
  );
};

export default CountUp;

import { useEffect, useState } from "react";

const CountUp = ({
  target,
  prefix = "",
  suffix = "",
  active,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  active: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (target === 0) {
      setCount(0);
      return;
    }
    const duration = 1200;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(interval);
  }, [active, target]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export default CountUp;

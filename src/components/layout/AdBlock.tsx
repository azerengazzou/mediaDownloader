import { useEffect } from "react";

interface AdsterraNativeProps {
  containerId?: string;
  scriptSrc?: string;
}

const DEFAULT_CONTAINER = "container-6f2aebca8452c5a25d0b09507eedc8df";
const DEFAULT_SCRIPT =
  "https://pl29318476.profitablecpmratenetwork.com/6f2aebca8452c5a25d0b09507eedc8df/invoke.js";

export function AdsterraNativeBanner({
  containerId = DEFAULT_CONTAINER,
  scriptSrc = DEFAULT_SCRIPT,
}: AdsterraNativeProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // prevent duplicate script injection
    const existing = document.querySelector(`script[src="${scriptSrc}"]`);
    if (existing) return;

    const script = document.createElement("script");
    script.async = true;
    script.src = scriptSrc;
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);
  }, [scriptSrc]);

  return (
    <div className="w-full flex justify-center my-4">
      <div id={containerId} />
    </div>
  );
}
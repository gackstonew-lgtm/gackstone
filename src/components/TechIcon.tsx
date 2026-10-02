import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function TechIcon({ name, className = "w-3.5 h-3.5", size = 14 }: TechIconProps) {
  const norm = name.trim().toLowerCase();

  // 1. React / React 19 / React Native
  if (norm.includes("react")) {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" width={size} height={size} className={className} fill="none">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // 2. Next.js
  if (norm.includes("next")) {
    return (
      <svg viewBox="0 0 180 180" width={size} height={size} className={className}>
        <mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
          <circle cx="90" cy="90" fill="black" r="90" />
        </mask>
        <g mask="url(#mask0_next)">
          <circle cx="90" cy="90" data-circle="true" fill="black" r="90" />
          <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.137 149.508 157.438Z" fill="white" />
          <rect fill="white" height="72" width="12" x="115" y="54" />
        </g>
      </svg>
    );
  }

  // 3. TypeScript / TS
  if (norm.includes("typescript") || norm === "ts") {
    return (
      <svg viewBox="0 0 128 128" width={size} height={size} className={className}>
        <rect width="128" height="128" rx="20" fill="#3178C6" />
        <path d="M72.06 88.08c1.37.91 3.2 1.83 5.48 2.74 2.29.91 4.57 1.37 6.86 1.37 3.2 0 5.64-.69 7.31-2.06 1.68-1.37 2.51-3.2 2.51-5.48 0-1.83-.53-3.28-1.6-4.34-1.07-1.07-3.2-2.29-6.4-3.66-3.81-1.52-6.55-3.05-8.23-4.57-1.68-1.52-2.51-3.81-2.51-6.86 0-3.35 1.37-6.1 4.11-8.23 2.74-2.13 6.4-3.2 10.97-3.2 2.9 0 5.49.46 7.77 1.37 2.29.91 3.96 1.83 5.03 2.74l-4.11 8.23c-1.07-.76-2.44-1.45-4.11-2.06-1.68-.61-3.35-.91-5.03-.91-2.29 0-4.04.46-5.26 1.37-1.22.91-1.83 2.13-1.83 3.66 0 1.52.53 2.74 1.6 3.66 1.07.91 3.05 1.98 5.94 3.2 4.11 1.68 7.01 3.35 8.69 5.03 1.68 1.68 2.51 4.11 2.51 7.31 0 3.66-1.45 6.71-4.34 9.14-2.9 2.44-6.86 3.66-11.89 3.66-3.81 0-7.09-.61-9.83-1.83-2.74-1.22-4.88-2.59-6.4-4.11l4.57-8.23zM32.86 54.89H18.69V46.2h39.77v8.69H44.29v55.31H32.86V54.89z" fill="#FFF" />
      </svg>
    );
  }

  // 4. JavaScript / JS
  if (norm.includes("javascript") || norm === "js") {
    return (
      <svg viewBox="0 0 128 128" width={size} height={size} className={className}>
        <rect width="128" height="128" rx="20" fill="#F7DF1E" />
        <path d="M72.06 88.08c1.37.91 3.2 1.83 5.48 2.74 2.29.91 4.57 1.37 6.86 1.37 3.2 0 5.64-.69 7.31-2.06 1.68-1.37 2.51-3.2 2.51-5.48 0-1.83-.53-3.28-1.6-4.34-1.07-1.07-3.2-2.29-6.4-3.66-3.81-1.52-6.55-3.05-8.23-4.57-1.68-1.52-2.51-3.81-2.51-6.86 0-3.35 1.37-6.1 4.11-8.23 2.74-2.13 6.4-3.2 10.97-3.2 2.9 0 5.49.46 7.77 1.37 2.29.91 3.96 1.83 5.03 2.74l-4.11 8.23c-1.07-.76-2.44-1.45-4.11-2.06-1.68-.61-3.35-.91-5.03-.91-2.29 0-4.04.46-5.26 1.37-1.22.91-1.83 2.13-1.83 3.66 0 1.52.53 2.74 1.6 3.66 1.07.91 3.05 1.98 5.94 3.2 4.11 1.68 7.01 3.35 8.69 5.03 1.68 1.68 2.51 4.11 2.51 7.31 0 3.66-1.45 6.71-4.34 9.14-2.9 2.44-6.86 3.66-11.89 3.66-3.81 0-7.09-.61-9.83-1.83-2.74-1.22-4.88-2.59-6.4-4.11l4.57-8.23zM41.44 87.62c0 2.29-.46 4.11-1.37 5.48-.91 1.37-2.44 2.06-4.57 2.06-1.68 0-3.2-.38-4.57-1.14-1.37-.76-2.44-1.75-3.2-2.97l-4.11 7.31c1.52 1.83 3.51 3.28 5.94 4.34 2.44 1.07 5.18 1.6 8.23 1.6 4.88 0 8.76-1.45 11.66-4.34 2.9-2.9 4.34-6.86 4.34-11.89V46.2H41.44v41.42z" fill="#000" />
      </svg>
    );
  }

  // 5. Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#38BDF8">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    );
  }

  // 6. Go / Golang
  if (norm === "go" || norm.includes("golang")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#00ADD8">
        <path d="M1.811 10.231c.076 0 .142.004.223.004.607 0 1.157-.168 1.637-.478.47-.307.828-.737 1.054-1.258.232-.53.309-1.127.228-1.745a3.46 3.46 0 0 0-.796-1.701 3.518 3.518 0 0 0-1.517-.991 3.738 3.738 0 0 0-1.831-.082c-.604.103-1.144.385-1.58.825A3.498 3.498 0 0 0 .195 6.37a3.472 3.472 0 0 0 .138 1.834c.198.544.542.997.994 1.334.455.337.996.536 1.58.583a3.54 3.54 0 0 0 .904-.09v1.204zm11.758 4.793a5.27 5.27 0 0 1-1.34.821 4.75 4.75 0 0 1-1.727.313 4.966 4.966 0 0 1-1.921-.37 4.954 4.954 0 0 1-1.545-1.042 5.093 5.093 0 0 1-1.026-1.589 5.276 5.276 0 0 1-.365-1.973c0-.693.123-1.357.365-1.968a5.187 5.187 0 0 1 1.026-1.597 4.955 4.955 0 0 1 1.545-1.047 4.965 4.965 0 0 1 1.921-.37c.616 0 1.202.106 1.727.313.535.207.99.486 1.34.821l-1.365 1.401a3.14 3.14 0 0 0-.776-.502 2.784 2.784 0 0 0-.926-.153 2.94 2.94 0 0 0-1.14.22c-.347.145-.639.351-.861.607a3.13 3.13 0 0 0-.547.954 3.49 3.49 0 0 0-.191 1.189c0 .423.064.825.191 1.189.13.364.316.684.547.947.23.264.514.47.861.615.347.146.732.22 1.14.22.33 0 .644-.053.926-.154.282-.101.546-.273.776-.502l1.365 1.398zm7.394-2.825h-5.263v-2.073h7.452a5.454 5.454 0 0 1-.39 2.063 5.068 5.068 0 0 1-1.096 1.673 4.996 4.996 0 0 1-1.688 1.104 5.474 5.474 0 0 1-2.146.408 5.452 5.452 0 0 1-2.138-.415 5.02 5.02 0 0 1-1.684-1.127 5.176 5.176 0 0 1-1.085-1.689 5.568 5.568 0 0 1-.383-2.08c0-.734.13-1.439.383-2.08a5.176 5.176 0 0 1 1.085-1.689 5.02 5.02 0 0 1 1.684-1.127 5.452 5.452 0 0 1 2.138-.415c.78 0 1.512.143 2.164.423a4.912 4.912 0 0 1 1.67 1.164l-1.492 1.48a3.197 3.197 0 0 0-.986-.713 3.178 3.178 0 0 0-1.356-.279c-.454 0-.877.085-1.252.253a2.983 2.983 0 0 0-.962.705 3.328 3.328 0 0 0-.61 1.066 3.864 3.864 0 0 0-.21 1.332c0 .484.07.933.21 1.332.143.407.35.767.61 1.066.269.3.593.535.962.705.375.168.798.253 1.252.253.483 0 .918-.088 1.285-.26a3.02 3.02 0 0 0 .964-.698v-1.134z" />
      </svg>
    );
  }

  // 7. Python
  if (norm.includes("python")) {
    return (
      <svg viewBox="0 0 110 110" width={size} height={size} className={className}>
        <path d="M54.34 2C30.64 2 32.18 12.3 32.18 12.3l.03 10.68h22.61v3.2H23.57S8.22 24.42 8.22 48.06s13.38 22.84 13.38 22.84h7.98v-11.2s-.43-13.38 13.16-13.38h22.58s12.72.2 12.72-12.28V14.28S80.3 2 54.34 2zm-12.5 7.42c2.58 0 4.67 2.09 4.67 4.68 0 2.58-2.09 4.67-4.67 4.67-2.59 0-4.68-2.09-4.68-4.67 0-2.59 2.09-4.68 4.68-4.68z" fill="#387EB8" />
        <path d="M55.66 108c23.7 0 22.16-10.3 22.16-10.3l-.03-10.68H55.18v-3.2h31.25s15.35 1.76 15.35-21.88-13.38-22.84-13.38-22.84h-7.98v11.2s.43 13.38-13.16 13.38H44.68s-12.72-.2-12.72 12.28v19.76S29.7 108 55.66 108zm12.5-7.42c-2.58 0-4.67-2.09-4.67-4.68 0-2.58 2.09-4.67 4.67-4.67 2.59 0 4.68 2.09 4.68 4.67 0 2.59-2.09 4.68-4.68 4.68z" fill="#FFE052" />
      </svg>
    );
  }

  // 8. FastAPI
  if (norm.includes("fastapi")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#059669">
        <circle cx="12" cy="12" r="10" fill="#009688" />
        <path d="M11.5 5.5L7 13.5H12L10.5 18.5L17 10.5H12.5L14 5.5H11.5Z" fill="white" />
      </svg>
    );
  }

  // 9. Node.js
  if (norm.includes("node")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#5FA04E">
        <path d="M12 2l10 5.8v11.6L12 22 2 19.4V7.8L12 2zm0 2.3L4.3 8.8v8.8L12 20.3l7.7-2.7V8.8L12 4.3z" />
        <path d="M12 7a5 5 0 0 1 5 5c0 2-1.5 3.7-3.5 4.5V14a3 3 0 0 0 1.5-2.5A3 3 0 0 0 12 9a3 3 0 0 0-3 3c0 1.2.7 2.2 1.8 2.7l-.8 1.8A5 5 0 0 1 7 12a5 5 0 0 1 5-5z" fill="#5FA04E" />
      </svg>
    );
  }

  // 10. Express
  if (norm.includes("express")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#000000">
        <circle cx="12" cy="12" r="11" fill="#F4F4F5" stroke="#000" strokeWidth="1.5" />
        <path d="M6 8h4v1.5H7.5V11h2v1.5h-2v2H10V16H6V8zm6 0l1.8 3.5L15.6 8H17.5l-2.7 4.8 2.8 5.2h-1.9L14 14.5 12.2 18H10.3l2.8-5.2L10.4 8H12.3z" fill="#000" />
      </svg>
    );
  }

  // 11. NestJS
  if (norm.includes("nest")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#E0234E">
        <path d="M19.8 4.2c-1.8-1.5-4.3-1.6-6.4-.6L6.5 7.4C4.8 8.2 3.7 9.8 3.7 11.7c0 1.6.8 3.1 2.2 4l3.1 2c.6.4 1.4.3 1.9-.2.5-.5.5-1.3 0-1.8l-2.4-1.6c-.7-.5-1.1-1.3-1.1-2.2 0-1 .6-1.9 1.5-2.3l6.9-3.8c1.3-.6 2.8-.5 3.9.4 1.1.9 1.5 2.4 1.1 3.7l-2.5 8c-.2.7.2 1.4.9 1.6.7.2 1.4-.2 1.6-.9l2.5-8c.7-2.3.1-4.7-1.6-6.4z" />
      </svg>
    );
  }

  // 12. Gemini
  if (norm.includes("gemini")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
        <defs>
          <linearGradient id="gemini_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1BA1E3" />
            <stop offset="50%" stopColor="#5B6CF6" />
            <stop offset="100%" stopColor="#D96570" />
          </linearGradient>
        </defs>
        <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" fill="url(#gemini_grad)" />
      </svg>
    );
  }

  // 13. Claude
  if (norm.includes("claude")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#D97706">
        <circle cx="12" cy="12" r="9" fill="#CC6B49" />
        <path d="M12 4.5v15M4.5 12h15M6.7 6.7l10.6 10.6M17.3 6.7L6.7 17.3" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 14. Agentic Workflows / AI Agents / Agentic
  if (norm.includes("agent") || norm.includes("workflow")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" fill="#2563EB" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  }

  // 15. Grounded RAG / RAG
  if (norm.includes("rag") || norm.includes("grounded")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#7C3AED" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" fill="#EDE9FE" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  // 16. PostgreSQL / Postgres
  if (norm.includes("postgres")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#336791">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.8 15.8c-1.2.6-2.6.9-4 .9-3.9 0-7.1-2.8-7.7-6.5.6-1.1 1.7-1.8 3-1.8.8 0 1.5.3 2.1.8.4-.7 1.1-1.2 2-1.4.3-.8 1-1.4 1.9-1.6 1.4-.3 2.8.3 3.5 1.5.8 1.4.6 3.2-.5 4.4-.4.4-.9.7-1.4.8.6 1.3.8 2.4 1.1 3.3z" />
      </svg>
    );
  }

  // 17. Prisma
  if (norm.includes("prisma")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#2D3748">
        <path d="M18.8 18.2L12.7 2.8C12.5 2.3 11.8 2.3 11.6 2.8L5.2 18.2C5 18.7 5.4 19.3 6 19.3H18C18.6 19.3 19 18.7 18.8 18.2ZM12 6.2L16.4 17.3H7.6L12 6.2Z" fill="#5A67D8" />
      </svg>
    );
  }

  // 18. Supabase
  if (norm.includes("supabase")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
        <path d="M13.4 2.1c-.6-.7-1.7-.3-1.7.6V11H4.1c-.9 0-1.4 1-.8 1.6l8.5 10.2c.6.7 1.7.3 1.7-.6V13h7.6c.9 0 1.4-1 .8-1.6L13.4 2.1z" fill="#3ECF8E" />
      </svg>
    );
  }

  // 19. Redis
  if (norm.includes("redis")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#DC382D">
        <path d="M2 15.5l9.5 4.5 9.5-4.5-9.5-4.5L2 15.5zm19-7L11.5 4 2 8.5l9.5 4.5 9.5-4.5z" />
        <path d="M2 12l9.5 4.5 9.5-4.5" stroke="#DC382D" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }

  // 20. RabbitMQ
  if (norm.includes("rabbit")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#FF6600">
        <path d="M18.5 7.5C18.5 5 17 3 15 3c-1.3 0-2.4.8-3 2-.6-1.2-1.7-2-3-2-2 0-3.5 2-3.5 4.5 0 1.2.4 2.3 1.1 3.1C5 11.5 4 13.1 4 15c0 3.3 2.7 6 6 6h6c3.3 0 6-2.7 6-6 0-2.4-1.4-4.5-3.5-5.4.6-.9 1-2 1-3.1zM8.5 8c0-1.4.7-2.5 1.5-2.5s1.5 1.1 1.5 2.5v1h-3V8zm7 0v1h-3V8c0-1.4.7-2.5 1.5-2.5s1.5 1.1 1.5 2.5z" />
      </svg>
    );
  }

  // 21. Docker
  if (norm.includes("docker")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#2496ED">
        <path d="M13.9 8.2h2v2h-2v-2zm-2.8 0h2v2h-2v-2zm-2.8 0h2v2h-2v-2zm5.6-2.8h2v2h-2V5.4zm-2.8 0h2v2h-2V5.4zm-2.8 0h2v2h-2V5.4zm8.4 5.6h2v2h-2V11zm-11.2 0h2v2h-2V11zm-2.8 0h2v2H4.7V11zm17.9 2.5c-.3 0-.6.1-.9.2-.6-1.4-1.9-2.3-3.4-2.3H2.8C2.3 11.4 2 11.8 2 12.3c0 4.3 3.2 7.8 7.4 8.2 5.1.5 9.7-2.5 11.2-6.5.7.1 1.4-.2 1.8-.7.4-.6.3-1.4-.3-1.8-.3-.3-.7-.5-1.2-.5z" />
      </svg>
    );
  }

  // 22. Kubernetes
  if (norm.includes("kubenetes") || norm.includes("kubernetes") || norm === "k8s") {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#326CE5">
        <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 2.3l6.5 3.8v7.6L12 19.5 5.5 15.7V8.1L12 4.3zm0 3.7c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
      </svg>
    );
  }

  // 23. GitOps / Git
  if (norm.includes("git")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#F05032">
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.8 4.6l2.7 2.7c.6-.2 1.4 0 1.9.5.5.5.7 1.3.5 1.9l2.6 2.6c.6-.2 1.4 0 1.9.5.8.8.8 2 0 2.8s-2 .8-2.8 0c-.6-.6-.7-1.4-.5-2.1l-2.4-2.4v4.5c.2.2.4.5.4.8 0 1.1-.9 2-2 2s-2-.9-2-2c0-.8.5-1.5 1.2-1.8V9.1c-.7-.3-1.2-1-1.2-1.8 0-.4.1-.7.3-1L2.4 10.9c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.6-.6.6-1.5.1-2.1z" />
      </svg>
    );
  }

  // 24. CI/CD
  if (norm.includes("ci/cd") || norm.includes("cicd")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" stroke="#10B981" fill="#ECFDF5" />
        <path d="M8 12h8M13 9l3 3-3 3" />
      </svg>
    );
  }

  // 25. Vercel
  if (norm.includes("vercel")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#000000">
        <path d="M12 2L24 22H0L12 2Z" />
      </svg>
    );
  }

  // 26. OpenTelemetry
  if (norm.includes("opentelemetry") || norm.includes("telemetry")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#4B5563">
        <circle cx="12" cy="12" r="9" stroke="#3B82F6" strokeWidth="2" fill="none" />
        <circle cx="12" cy="12" r="3" fill="#3B82F6" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="#3B82F6" strokeWidth="2" />
      </svg>
    );
  }

  // 27. Grafana
  if (norm.includes("grafana")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#F46800">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14.5c-2.5 0-4.5-2-4.5-4.5S10.5 7.5 13 7.5s4.5 2 4.5 4.5-2 4.5-4.5 4.5z" />
        <circle cx="13" cy="12" r="2.5" fill="#FFF" />
      </svg>
    );
  }

  // 28. Loki
  if (norm.includes("loki")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#00B4D8">
        <path d="M12 2l8 4.5v11L12 22 4 17.5v-11L12 2zm0 3.5L7 8.5v7l5 3 5-3v-7l-5-3z" fill="#0077B6" />
        <path d="M12 8.5v7M8.5 10.5l7 3.5" stroke="#FFF" strokeWidth="1.5" />
      </svg>
    );
  }

  // 29. Tempo
  if (norm.includes("tempo")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#06B6D4">
        <circle cx="12" cy="12" r="9" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
        <path d="M12 7v5l3.5 2" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 30. Mimir
  if (norm.includes("mimir")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#8B5CF6">
        <path d="M12 2L4 7v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V7l-8-5zm0 3.2L18 8v5c0 3.8-2.6 7.2-6 8.5-3.4-1.3-6-4.7-6-8.5V8l6-2.8z" />
      </svg>
    );
  }

  // 31. Kotlin
  if (norm.includes("kotlin")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
        <defs>
          <linearGradient id="kotlin_grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7F52FF" />
            <stop offset="50%" stopColor="#C711E1" />
            <stop offset="100%" stopColor="#E4485D" />
          </linearGradient>
        </defs>
        <path d="M22 2H2v20l10-10L22 2zM12 12L2 22h20L12 12z" fill="url(#kotlin_grad)" />
      </svg>
    );
  }

  // 32. Java
  if (norm.includes("java")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#EA2D2E">
        <path d="M8.8 19.5c2.3.2 4.6.2 6.8-.2.7-.1 1.4-.3 1.9-.7.4-.3.5-.7.4-1.1-.2-.5-.8-.8-1.4-.9-1.8-.3-3.6-.4-5.5-.3-1.4.1-2.9.4-4 .9-.4.2-.6.4-.6.7 0 .4.4.7.8.9.5.3 1 .5 1.6.7zm-1.2-3.1c1.9.2 3.8.2 5.7-.1.9-.1 1.8-.4 2.5-.9.4-.3.5-.8.3-1.2-.2-.5-.7-.8-1.3-.9-1.6-.3-3.3-.4-4.9-.3-1.5.1-3 .4-4.3 1-.4.2-.6.5-.5.8.1.4.4.8.9 1 .5.3 1.1.5 1.6.6zm9.3-5.2c-.3 1.1-1.2 1.9-2.2 2.3 1.5.4 3-.2 3.7-1.5.7-1.3.4-2.8-.7-3.7-.3-.2-.6-.4-.9-.5.4 1 .3 2.3-.2 3.4zM9 13.5c1.4.2 2.9.2 4.3-.1.8-.2 1.5-.5 2.1-1 .3-.3.4-.6.2-.9-.2-.4-.6-.6-1.1-.7-1.3-.2-2.6-.3-3.9-.2-1.3.1-2.5.4-3.6.8-.4.2-.5.4-.5.7 0 .3.3.6.7.8.6.3 1.2.5 1.8.6z" />
      </svg>
    );
  }

  // 33. Android SDK / Android
  if (norm.includes("android")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#3DDC84">
        <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v6c0 .83.67 1.5 1.5 1.5S5 16.33 5 15.5v-6C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-6c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.62 1.23 12.83 1 12 1c-.83 0-1.62.23-2.64.63L7.88.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.44 3.25 5 5.17 5 7.4h14c0-2.23-1.44-4.15-3.47-5.24zM9 5.5c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75zm6 0c-.41 0-.75-.34-.75-.75s.34-.75.75-.75.75.34.75.75-.34.75-.75.75z" />
      </svg>
    );
  }

  // 34. libGDX / OpenGL / 3D / Game
  if (norm.includes("libgdx") || norm.includes("opengl") || norm.includes("3d")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#E74C3C">
        <rect x="3" y="6" width="18" height="12" rx="4" fill="#E74C3C" />
        <path d="M7 12h4M9 10v4M15 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 35. MetaTrader 5 / MT5
  if (norm.includes("metatrader") || norm.includes("mt5")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#D97706">
        <circle cx="12" cy="12" r="10" fill="#F59E0B" />
        <path d="M7 15l3-6 2.5 4 2-3 2.5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    );
  }

  // 36. MQL5
  if (norm.includes("mql5") || norm.includes("mql")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#2563EB">
        <rect x="3" y="4" width="18" height="16" rx="3" fill="#1E40AF" />
        <path d="M6 15V9l3 4 3-4v6M15 9h3v6h-3z" stroke="white" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }

  // 37. Pine Script / TradingView
  if (norm.includes("pine") || norm.includes("tradingview")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#10B981">
        <path d="M12 2L4 14h5l-3 6 12-10h-6l4-8z" fill="#059669" />
      </svg>
    );
  }

  // 38. Trade Analytics / Quantitative / Analytics
  if (norm.includes("trade") || norm.includes("analytic") || norm.includes("quant")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    );
  }

  // 39. Vite
  if (norm.includes("vite")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
        <defs>
          <linearGradient id="vite_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#41D1FF" />
            <stop offset="100%" stopColor="#BD34FE" />
          </linearGradient>
        </defs>
        <path d="M21.5 4.5l-9.2 16.8c-.3.5-1 .5-1.3 0L1.8 4.5c-.3-.6.1-1.3.8-1.3h18.1c.7 0 1.1.7.8 1.3z" fill="url(#vite_grad)" />
        <path d="M14.5 3L8.5 12h4l-2 6 7-11h-4l1-4z" fill="#FFD02F" />
      </svg>
    );
  }

  // 40. PHP
  if (norm.includes("php")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#777BB4">
        <ellipse cx="12" cy="12" rx="11" ry="7" fill="#8892BF" />
        <path d="M7 10h2c.6 0 1 .4 1 1s-.4 1-1 1H7v2H5.5V10H7zm5 0h2c.6 0 1 .4 1 1s-.4 1-1 1h-2v2H10.5V10H12zm5 0h2c.6 0 1 .4 1 1s-.4 1-1 1h-2v2H15.5V10H17z" fill="white" />
      </svg>
    );
  }

  // 41. MySQL / Database
  if (norm.includes("mysql") || norm.includes("database")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="#00758F">
        <ellipse cx="12" cy="6" rx="8" ry="3" fill="#00758F" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#00758F" strokeWidth="1.5" fill="none" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#00758F" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }

  // 42. WebRTC / Protocols / WebSockets / gRPC / APIs
  if (norm.includes("webrtc") || norm.includes("socket") || norm.includes("grpc") || norm.includes("api")) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" stroke="#6366F1" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }

  // Default fallback code icon
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

import React from "react"

interface LogoProps {
  size?: number
  showText?: boolean
}

export const Logo: React.FC<LogoProps> = ({ size = 42, showText = true }) => {
  return (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Artistic Mark Container */}
      <div 
        className="relative flex items-center justify-center" 
        style={{ width: size, height: size }}
      >
        {/* Background Shape - "The Petal" */}
        <div 
          className="absolute inset-0 bg-linear-to-tr from-purple-700 via-purple-500 to-fuchsia-400 
                     shadow-lg shadow-purple-200/50 transform rotate-45 
                     rounded-t-full rounded-bl-full transition-transform duration-500 group-hover:rotate-225"
        />
        
        {/* Inner Glass Layer for Depth */}
        <div className="absolute inset-[10%] bg-white/10 backdrop-blur-[1px] rounded-t-full rounded-bl-full transform rotate-45" />

        {/* The DC Monogram (Styled Text) */}
        <div className="relative flex items-center justify-center translate-y-[0.5px]">
          <span 
            className="font-bold tracking-tighter text-white uppercase italic drop-shadow-sm"
            style={{ fontSize: size * 0.38 }}
          >
            DC
          </span>
        </div>
      </div>

      {/* Elegant Typography (Side Text) */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] font-semibold tracking-[0.2em] text-black uppercase -mt-1 opacity-100">
             Store
          </span>
        </div>
      )}
    </div>
  )
}
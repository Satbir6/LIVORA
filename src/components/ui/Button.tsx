import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
}

const stylesByVariant: Record<ButtonVariant, string> = {
  primary:
    'bg-livora-brown text-white border-livora-brown hover:bg-livora-gold hover:border-livora-gold hover:text-livora-ink',
  secondary:
    'border-livora-blue text-livora-blue hover:bg-livora-blue hover:text-white bg-transparent',
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={[
        'inline-flex items-center justify-center rounded-full border px-6 py-3 font-subheading text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-all duration-300',
        stylesByVariant[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#be185d" />
      <path d="M9 10h14M9 16h14M9 22h8" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M21 25l6-9" stroke="#fde68a" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'
export default function Icon() {
  return new ImageResponse(
    <div style={{
      width: 32, height: 32, borderRadius: 8,
      background: 'linear-gradient(135deg, #1d4ed8, #2563eb)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Downward arrow into a circle — bills going down / savings */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
        <path d="M12 7v7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8.5 11L12 14.5L15.5 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

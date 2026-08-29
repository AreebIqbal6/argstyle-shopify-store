'use client'

import { X } from 'lucide-react'

export function SignupModal({ close }: { close: () => void }) {
  return <div className="signup-backdrop" role="dialog" aria-modal="true" aria-label="Newsletter signup">
    <div className="signup-modal">
      <button className="signup-close" aria-label="Close signup" onClick={close}><X size={24} /></button>
      <h2>GET 10% OFF ON YOUR FIRST ORDER<br />WHEN YOU SIGN UP.</h2>
      <p>Sign up for our newsletter to be the first to learn about new arrivals, special promotions, and online exclusives.</p>
      <form onSubmit={(event) => { event.preventDefault(); close() }}><input required type="email" placeholder="Enter your email" aria-label="Email address" /><button>SUBSCRIBE</button></form>
      <small>By submitting this form, you agree to receive our emails.</small>
      <button className="no-thanks" onClick={close}>No thanks!</button>
    </div>
  </div>
}

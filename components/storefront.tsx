'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, UserRound, Heart, ShoppingBag, Menu, X, ChevronDown, ArrowRight, Plus, Minus, Trash2, MessageCircle, Star, ShieldCheck, Truck, RefreshCw, Filter } from 'lucide-react'
import { SignupModal } from './signup-modal'

export type Product = { id: number; name: string; category: string; price: number; oldPrice?: number; badge?: string; image: string; position?: string }

const categories = ['New Arrivals', 'Men', 'Women', 'Activewear', 'T-Shirts', 'Anime', 'Car Culture', 'Graphic Tees', 'Trousers', 'Polo Shirts', 'Chino Shorts']
const baseProducts: Product[] = [
  { id: 1, name: 'ARG Colorblock Sweatshirt', category: 'Sweatshirts', price: 49.99, badge: 'NEW', image: '/arg-man-sweater.jpg', position: 'center 15%' },
  { id: 2, name: 'ARG Kids Classic Tee', category: 'Kids', price: 24.99, badge: 'BESTSELLER', image: '/arg-boy-tee.jpg', position: 'center 15%' },
  { id: 3, name: 'Kids Plaid Overshirt Set', category: 'Kids', price: 54.99, image: '/arg-boy-plaid.jpg', position: 'center 15%' },
  { id: 4, name: 'Relaxed Cargo Trouser', category: 'Trousers', price: 49.99, image: '/arg-boy-plaid.jpg', position: 'center 15%' },
  { id: 5, name: 'Tokyo Street Graphic Tee', category: 'Anime', price: 32.99, image: '/arg-boy-tee.jpg', position: 'center 15%' },
  { id: 6, name: 'Boxy Washed Tee', category: 'Graphic Tees', price: 27.99, oldPrice: 35.99, badge: 'SALE', image: '/arg-man-sweater.jpg', position: 'center 15%' },
  { id: 7, name: 'Everyday Chino Short', category: 'Chino Shorts', price: 36.99, image: '/arg-boy-plaid.jpg', position: 'center 15%' },
  { id: 8, name: 'Performance Track Pant', category: 'Activewear', price: 44.99, image: '/arg-man-sweater.jpg', position: 'center 15%' },
]
const products = [...baseProducts, ...Array.from({ length: 63 }, (_, i) => ({ ...baseProducts[i % baseProducts.length], id: i + 9, name: `${baseProducts[i % baseProducts.length].name} ${Math.floor(i / 8) + 2}` }))]

function formatPrice(n: number) { return `$${n.toFixed(2)}` }

function ProductCard({ product, onWish }: { product: Product; onWish: (id: number) => void }) {
  const [wished, setWished] = useState(false)
  return <article className="product-card reveal" data-reveal>
    <div className="product-image-wrap group">
      <Link href={`/products/${product.name.toLowerCase().replaceAll(' ', '-')}`} aria-label={`View ${product.name}`}>
        <div className="product-image" style={{ backgroundImage: `url(${product.image})`, backgroundPosition: product.position || 'center' }} />
      </Link>
      <div className="hidden md:block absolute inset-x-4 bottom-4 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <button className="button w-full dark shadow-xl py-2 text-xs" onClick={(e) => { e.preventDefault(); /* quick add */ }}>QUICK ADD</button>
      </div>
      {product.badge && <span className={`badge ${product.badge === 'SALE' ? 'badge-sale' : ''}`}>{product.badge}</span>}
      <button className={`wish-button ${wished ? 'is-wished' : ''}`} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} onClick={() => { setWished(!wished); onWish(product.id) }}><Heart size={18} fill={wished ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="product-info"><Link href={`/products/${product.name.toLowerCase().replaceAll(' ', '-')}`}><h3>{product.name}</h3></Link><p className="flex items-center gap-1">{product.category} <span className="flex items-center text-yellow-400 ml-2"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></span></p><div><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div></div>
  </article>
}

function Header({ cartCount, wishCount, onCart, onSearch }: { cartCount: number; wishCount: number; onCart: () => void; onSearch: () => void }) {
  const [mobile, setMobile] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  return <>
    <div className="announcement"><div className="scrolling--item scrolling--animated"><span>NEW DROP IS HERE</span><span>•</span><span>Enjoy Free Shipping over Rs 5,000</span><span>•</span><span>Freedom Sale - Upto 50% Off</span><span>•</span><span>ARG STYLE</span><span>•</span><span>NEW DROP IS HERE</span><span>•</span><span>Enjoy Free Shipping over Rs 5,000</span><span>•</span><span>Freedom Sale - Upto 50% Off</span></div><div className="scrolling--item scrolling--animated" aria-hidden="true"><span>NEW DROP IS HERE</span><span>•</span><span>Enjoy Free Shipping over Rs 5,000</span><span>•</span><span>Freedom Sale - Upto 50% Off</span><span>•</span><span>ARG STYLE</span><span>•</span><span>NEW DROP IS HERE</span></div></div>
    <header className="site-header"><div className="header-inner">
      <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMobile(!mobile)}>{mobile ? <X /> : <Menu />}</button>
      <Link className="logo" href="/"><img src="/arg-style-logo.png" alt="ARG STYLE" /></Link>
      <nav className={mobile ? 'main-nav mobile-open' : 'main-nav'}>
        <Link href="/collections/new-arrivals">NEW IN</Link><div className="nav-dropdown"><button onClick={() => setShopOpen(!shopOpen)}>SHOP <ChevronDown size={14} /></button>{shopOpen && <div className="dropdown-menu">{categories.slice(1, 7).map(c => <Link key={c} href={`/collections/${c.toLowerCase().replaceAll(' ', '-')}`}>{c}</Link>)}</div>}</div><Link href="/collections/sale">SALE</Link><Link href="/collections/men">MEN</Link><Link href="/collections/women">WOMEN</Link><Link href="/pages/about-us">ABOUT</Link>
      </nav>
      <div className="header-actions"><button aria-label="Search" onClick={onSearch}><Search /></button><Link href="/account/login" aria-label="Account"><UserRound /></Link><Link href="/pages/wishlist" aria-label={`Wishlist ${wishCount}`} className="icon-count"><Heart /><i>{wishCount}</i></Link><button aria-label="Cart" onClick={onCart} className="icon-count"><ShoppingBag /><i>{cartCount}</i></button></div>
    </div></header>
  </>
}

function SupportBar() { return <div className="support-bar"><span>HIGH QUALITY PRODUCTS</span><span>OVERSIZED FOR RELAXED FIT</span><span>FAST DELIVERY</span><button aria-label="Message us">Message us</button></div> }

function Footer() { return <footer><div className="footer-top"><div><Link className="logo footer-logo" href="/"><img src="/arg-style-logo-light-2.png" alt="ARG STYLE" /></Link><p>Everyday essentials for<br />the modern trendsetter.</p></div><div><h4>SHOP</h4>{categories.slice(0, 6).map(c => <Link key={c} href={`/collections/${c.toLowerCase().replaceAll(' ', '-')}`}>{c}</Link>)}</div><div><h4>HELP</h4><Link href="/pages/contact-us">Contact Us</Link><Link href="/pages/shipping-returns">Shipping & Returns</Link><Link href="/pages/faq">FAQs</Link><Link href="/pages/size-guide">Size Guide</Link></div><div className="newsletter"><h4>JOIN THE DROP</h4><p>Sign up for early access, new drops and exclusive offers.</p><form onSubmit={e => { e.preventDefault(); alert('Thanks for joining the drop.') }}><input required type="email" placeholder="Your email address" aria-label="Your email address" /><button>JOIN <ArrowRight size={16} /></button></form></div></div><div className="footer-bottom"><span>© 2026 ARG STYLE</span><span>INSTAGRAM &nbsp; TIKTOK</span><span>PRIVACY &nbsp; TERMS</span></div></footer> }

function SearchPanel({ close, activeProducts = products }: { close: () => void; activeProducts?: Product[] }) { const [q, setQ] = useState(''); const results = useMemo(() => q ? activeProducts.filter(p => p.name.toLowerCase().includes(q.toLowerCase())).slice(0, 4) : [], [q, activeProducts]); return <div className="search-panel"><div className="search-box"><Search /><input autoFocus placeholder="Search products" value={q} onChange={e => setQ(e.target.value)} /><button onClick={close}><X /></button></div>{q && <div className="search-results">{results.map(p => <Link key={p.id} href={`/products/${p.name.toLowerCase().replaceAll(' ', '-')}`} onClick={close}>{p.name}<span>{formatPrice(p.price)}</span></Link>)}{!results.length && <p>No products found.</p>}</div>}</div> }

function useRevealAnimations() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { threshold: 0.12 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

export default function Storefront({ shopifyProducts }: { shopifyProducts?: Product[] | null }) {
  useRevealAnimations()
  const activeProducts = shopifyProducts && shopifyProducts.length > 0 ? shopifyProducts : products
  const [cart, setCart] = useState<Product[]>([]); const [wishes, setWishes] = useState<number[]>([]); const [search, setSearch] = useState(false); const [cartOpen, setCartOpen] = useState(false); const [signupOpen, setSignupOpen] = useState(true)
  const path = usePathname() || '/'; const slug = path.split('/').filter(Boolean).pop() || ''; const isCollection = path.startsWith('/collections'); const isProduct = path.startsWith('/products'); const isWishlist = path.includes('wishlist'); const isCart = path === '/cart'; const isLogin = path.includes('login')
  const currentCategory = isCollection ? (slug === 'sale' ? 'Sale' : slug.replaceAll('-', ' ')) : 'All Products'; const visible = isWishlist ? activeProducts.filter(p => wishes.includes(p.id)) : isCollection ? (['men', 'women', 'new-arrivals', 'sale'].includes(slug) ? (slug === 'sale' ? activeProducts.filter(p => p.badge === 'SALE') : activeProducts) : activeProducts.filter(p => p.category.toLowerCase().includes(slug.replaceAll('-', ' ')) || slug === 'all')) : activeProducts
  const add = (p: Product) => { setCart([...cart, p]); setCartOpen(true) }
  return <div><Header cartCount={cart.length} wishCount={wishes.length} onCart={() => setCartOpen(true)} onSearch={() => setSearch(true)} />{search && <SearchPanel close={() => setSearch(false)} activeProducts={activeProducts} />}
    {isLogin ? <Login /> : isCart || cartOpen ? <CartView cart={cart} setCart={setCart} close={() => setCartOpen(false)} /> : isProduct ? <ProductView product={activeProducts.find(p => slug.includes(p.name.toLowerCase().replaceAll(' ', '-'))) || activeProducts[0]} add={add} /> : isCollection || isWishlist ? <Collection title={isWishlist ? 'Wishlist' : currentCategory} items={visible} onWish={id => setWishes(wishes.includes(id) ? wishes.filter(x => x !== id) : [...wishes, id])} /> : <Home add={add} onWish={id => setWishes(wishes.includes(id) ? wishes.filter(x => x !== id) : [...wishes, id])} activeProducts={activeProducts} />}
    {!isCart && !cartOpen && !isLogin && <Footer />}<SupportBar />
    <div className="fixed bottom-6 right-6 z-50">
      <a href="#" className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle size={28} />
      </a>
    </div>
    {!isCollection && !isProduct && !isWishlist && !isCart && !isLogin && signupOpen && <SignupModal close={() => setSignupOpen(false)} />}
  </div>
}

function Home({ add, onWish, activeProducts = products }: { add: (p: Product) => void; onWish: (id: number) => void; activeProducts?: Product[] }) { const [slide, setSlide] = useState(0); useEffect(() => { const id = window.setInterval(() => setSlide((v) => (v + 1) % 3), 5000); return () => window.clearInterval(id) }, []); const slides = [{ title: <>WEAR<br /><em>YOUR</em><br />ATTITUDE.</>, eyebrow: 'THE NEW STANDARD' }, { title: <>BUILT<br /><em>TO</em><br />MOVE.</>, eyebrow: 'THE EVERYDAY UNIFORM' }, { title: <>MAKE<br /><em>IT</em><br />YOURS.</>, eyebrow: 'THE LATEST DROP' }]; return <main><section className={`hero hero-slide-${slide}`}><button className="hero-arrow hero-prev" aria-label="Previous slide" onClick={() => setSlide((slide + 2) % 3)}>‹</button><div className="hero-copy" key={slide}><p className="eyebrow">{slides[slide].eyebrow}</p><h1>{slides[slide].title}</h1><Link className="button" href="/collections/new-arrivals">SHOP THE DROP <ArrowRight size={16} /></Link></div><button className="hero-arrow hero-next" aria-label="Next slide" onClick={() => setSlide((slide + 1) % 3)}>›</button><div className="hero-dots">{slides.map((_, i) => <button key={i} aria-label={`Go to slide ${i + 1}`} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} />)}</div></section><section className="section reveal" data-reveal><div className="section-heading"><div><p className="eyebrow">CURATED FOR YOU</p><h2>THE LATEST DROP</h2></div><Link href="/collections/new-arrivals">VIEW ALL <ArrowRight size={16} /></Link></div><div className="product-grid">{activeProducts.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onWish={onWish} />)}</div></section><section className="split-banner reveal" data-reveal><div className="split-copy"><p className="eyebrow">BUILT FOR EVERY DAY</p><h2>STYLE THAT<br /><em>DOES MORE.</em></h2><Link className="button dark" href="/collections/men">SHOP MEN <ArrowRight size={16} /></Link></div><div className="split-image" /></section><section className="section reveal" data-reveal><div className="section-heading"><div><p className="eyebrow">FIND YOUR FIT</p><h2>SHOP BY CATEGORY</h2></div></div><div className="category-grid">{['MEN','WOMEN','ACTIVEWEAR','GRAPHIC TEES'].map((x, i) => <Link key={x} href={`/collections/${x.toLowerCase().replaceAll(' ', '-')}`}><span>0{i + 1}</span><strong>{x}</strong><ArrowRight size={20} /></Link>)}</div></section></main> }

function Collection({ title, items, onWish }: { title: string; items: Product[]; onWish: (id: number) => void }) { return <main className="collection-page"><div className="collection-hero"><p className="eyebrow">ARG STYLE / COLLECTION</p><h1>{title}</h1><p>Essentials made to stand out. Explore the latest styles and find your next everyday uniform.</p></div><div className="collection-toolbar"><span>{items.length || 0} PRODUCTS</span><select aria-label="Sort products"><option>Featured</option><option>Price: Low to High</option><option>Price: High to Low</option></select></div>
<div className="flex flex-col md:flex-row mt-8 gap-8">
  <div className="w-full md:w-64 md:pr-8 md:border-r border-gray-200 shrink-0">
    <h3 className="font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2"><Filter size={16} /> Filters</h3>
    <div className="mb-8">
      <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-4">Size</h4>
      <div className="grid grid-cols-3 gap-2">
        {['S','M','L','XL','XXL'].map(s => <button key={s} className="border border-gray-200 py-2 text-xs hover:border-black transition-colors">{s}</button>)}
      </div>
    </div>
    <div className="mb-8">
      <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-4">Price</h4>
      <div className="flex flex-col gap-2 text-sm">
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-black" /> Under $50</label>
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-black" /> $50 - $100</label>
        <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-black" /> Over $100</label>
      </div>
    </div>
  </div>
  <div className="flex-1">
    <div className="product-grid">{items.length ? items.slice(0, 24).map(p => <ProductCard key={p.id} product={p} onWish={onWish} />) : <p className="empty">Your wishlist is waiting for its next favorite.</p>}</div>
  </div>
</div>
</main> }

function ProductView({ product, add }: { product: Product; add: (p: Product) => void }) { const [qty, setQty] = useState(1); return <main className="detail"><div className="detail-image" style={{ backgroundImage: `url(${product.image})`, backgroundPosition: product.position || 'center' }} /><div className="detail-copy"><p className="eyebrow">{product.category}</p><h1>{product.name}</h1><div className="detail-price">{formatPrice(product.price)} {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}</div><p className="detail-description">Built for daily rotation. A considered fit, premium feel and the kind of graphic that does the talking for you.</p><div className="size-label">SELECT SIZE <span>SIZE GUIDE</span></div><div className="sizes"><button>S</button><button>M</button><button>L</button><button>XL</button></div><div className="purchase"><div className="quantity"><button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button><span>{qty}</span><button onClick={() => setQty(qty + 1)}><Plus size={14} /></button></div><button className="button add-button" onClick={() => Array.from({ length: qty }).forEach(() => add(product))}>ADD TO BAG <ShoppingBag size={16} /></button></div>
<div className="grid grid-cols-3 gap-2 mt-6 border-t border-gray-200 pt-6">
  <div className="flex flex-col items-center text-center gap-2"><Truck size={20} className="text-gray-600" /><span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Free Shipping</span></div>
  <div className="flex flex-col items-center text-center gap-2"><RefreshCw size={20} className="text-gray-600" /><span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">30-Day Returns</span></div>
  <div className="flex flex-col items-center text-center gap-2"><ShieldCheck size={20} className="text-gray-600" /><span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Secure Checkout</span></div>
</div>
<div className="accordions"><details><summary>DESCRIPTION <ChevronDown size={16} /></summary><p>Relaxed, oversized silhouette with a soft hand feel and durable construction.</p></details><details><summary>SHIPPING & RETURNS <ChevronDown size={16} /></summary><p>Free shipping over $50. Easy returns within 30 days.</p></details></div>
<div className="mt-12 pt-8 border-t border-gray-200">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-bold tracking-tight uppercase">Customer Reviews</h2>
    <div className="flex items-center gap-2">
      <div className="flex text-yellow-400"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
      <span className="text-sm font-bold">5.0 (12 Reviews)</span>
    </div>
  </div>
  <div className="space-y-6">
    {[1,2,3].map(i => (
      <div key={i} className="pb-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <strong className="text-sm uppercase tracking-wider">Verified Buyer {i}</strong>
          <span className="text-xs text-gray-400">2 days ago</span>
        </div>
        <div className="flex text-yellow-400 mb-2"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
        <p className="text-sm text-gray-600">Amazing quality and perfect oversized fit. The material is thick and feels very premium compared to other brands.</p>
      </div>
    ))}
    <button className="button dark w-full text-center flex justify-center">Write a Review</button>
  </div>
</div>
</div></main> }

function CartView({ cart, setCart, close }: { cart: Product[]; setCart: (p: Product[]) => void; close?: () => void }) { const total = cart.reduce((a, p) => a + p.price, 0); return <main className="cart-page"><div className="cart-heading"><p className="eyebrow">YOUR BAG</p><h1>{cart.length ? `${cart.length} ITEMS` : 'YOUR BAG IS EMPTY'}</h1></div>{cart.length ? <><div className="cart-items">{cart.map((p, i) => <div className="cart-item" key={`${p.id}-${i}`}><div className="cart-thumb" style={{ backgroundImage: `url(${p.image})`, backgroundPosition: p.position || 'center' }} /><div><h3>{p.name}</h3><p>{p.category}</p><strong>{formatPrice(p.price)}</strong></div><button aria-label={`Remove ${p.name}`} onClick={() => setCart(cart.filter((_, x) => x !== i))}><Trash2 size={17} /></button></div>)}</div><div className="cart-summary"><span>SUBTOTAL</span><strong>{formatPrice(total)}</strong><button className="button">CHECKOUT <ArrowRight size={16} /></button></div></> : <Link className="button" href="/collections/new-arrivals" onClick={close}>SHOP NEW ARRIVALS <ArrowRight size={16} /></Link>}</main> }
function Login() { return <main className="login-page"><div><p className="eyebrow">WELCOME BACK</p><h1>YOUR ACCOUNT.</h1><p>Log in to manage your orders and save your favorite drops.</p><form onSubmit={e => { e.preventDefault(); alert('Login submitted') }}><label>Email address<input required type="email" /></label><label>Password<input required type="password" /></label><button className="button">LOG IN <ArrowRight size={16} /></button></form><Link href="/account/register">Create an account</Link></div></main> }

export { products }

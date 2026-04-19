'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/lib/cart-context';
import { Product } from '@/lib/types';
import { formatPrice, ALL_PRODUCTS } from '@/lib/products-data';
import { CATEGORIES } from '@/lib/types';
import {
  Star, Heart, ShoppingBag, Share2, Truck, Shield,
  ChevronRight, Minus, Plus, Check, ArrowLeft,
  ThumbsUp, MessageCircle, ZoomIn, Award, Lock
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = ALL_PRODUCTS.find(p => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const [showZoom, setShowZoom] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { addItem } = useCart();

  // Related products (same category)
  const relatedProducts = ALL_PRODUCTS.filter(
    p => p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  const categoryIcons: Record<string, string> = { male: '♂', female: '♀', lingerie: '✦' };

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [product, quantity, addItem]);

  if (!product) {
    return (
      <div className="min-h-screen bg-zeneio-black">
        <Navbar />
        <div className="section-container pt-32 pb-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-white/50 mb-8">This product may have been removed or the URL is incorrect.</p>
          <Link href="/products" className="btn-accent">Back to Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  return (
    <div className="min-h-screen bg-zeneio-black">
      <Navbar />

      {/* Breadcrumb */}
      <div className="section-container pt-24 lg:pt-28 pb-4">
        <div className="flex items-center gap-2 text-xs text-white/35 overflow-x-auto no-scrollbar">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <ChevronRight size={12} />
          {product.category && (
            <>
              <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors capitalize">
                {CATEGORIES.find(c => c.slug === product.category)?.name || product.category}
              </Link>
              <ChevronRight size={12} />
            </>
          )}
          <span className="text-white/60 truncate">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="section-container pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div
              className="relative aspect-square rounded-2xl overflow-hidden bg-zeneio-gray cursor-zoom-in group"
              onClick={() => setShowZoom(true)}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.jpg'; }}
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isNew && <span className="badge badge-new">New</span>}
                {product.isHot && <span className="badge badge-hot">Hot 🔥</span>}
                {hasDiscount && <span className="badge badge-sale">-{product.discountPercent}%</span>}
              </div>

              {/* Zoom Icon */}
              <button
                onClick={(e) => { e.stopPropagation(); setShowZoom(true); }}
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ZoomIn size={18} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === i ? 'border-zeneio-accent' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:py-4 space-y-6">
            {/* Category */}
            <p className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-white/30">
              <span>{categoryIcons[product.category]}</span>
              {CATEGORIES.find(c => c.slug === product.category)?.name}
            </p>

            {/* Name */}
            <h1 className="text-heading-1 font-bold leading-tight">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 flex-wrap">
              {(product.rating || 0) > 0 && (
                <>
                  <div className="star-rating flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < Math.floor(product.rating!) ? '#FBBF24' : 'none'} stroke="#333" />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">{product.rating}</span>
                  <span className="text-sm text-white/30">({product.reviewCount} reviews)</span>
                  <span className="text-white/15">|</span>
                </>
              )}
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                {product.inStock ? '✓ In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="text-3xl font-black text-zeneio-accent">{formatPrice(product.price)}</span>
              {hasDiscount && (
                <>
                  <span className="text-xl text-white/30 line-through">{formatPrice(product.comparePrice!)}</span>
                  <span className="px-2 py-0.5 rounded-md bg-pink-400/10 text-pink-400 text-sm font-bold">
                    Save ${(product.comparePrice! - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-body text-white/50 leading-relaxed border-y border-white/5 py-5">
              {product.shortDescription || product.description.slice(0, 200)}...
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-5">
              <span className="input-label mb-0">Quantity</span>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))} readOnly />
                <button onClick={() => setQuantity(Math.min(10, quantity + 1))}><Plus size={16} /></button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`btn-accent flex-1 py-4 text-base ${addedToCart ? '!bg-green-500' : ''}`}
              >
                {addedToCart ? (
                  <>✓ Added to Cart</>
                ) : (
                  <><ShoppingBag size={18} /> Add to Cart — {formatPrice(product.price * quantity)}</>
                )}
              </button>

              <button className="btn-outline px-6" aria-label="Add to wishlist">
                <Heart size={18} />
              </button>

              <button className="btn-outline px-6 hidden sm:flex" aria-label="Share">
                <Share2 size={18} />
              </button>
            </div>

            {/* Trust Info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              {[
                { icon: Truck, label: 'Free Shipping $99+' },
                { icon: Shield, label: 'Discreet Package' },
                { icon: Check, label: 'Secure Payment' },
                { icon: Award, label: '30-Day Returns' },
              ].map(item => (
                <div key={item.label} className="glass rounded-xl p-3 text-center group hover:border-zeneio-accent/20 transition-all">
                  <item.icon size={18} className="mx-auto text-zeneio-accent/60 mb-1.5 group-hover:text-zeneio-accent" />
                  <p className="text-[11px] font-medium text-white/50 leading-tight">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Strong Trust Bar */}
            <div className="mt-4 rounded-xl bg-green-500/5 border border-green-500/10 p-4 flex items-start gap-3">
              <Lock size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-green-400">100% Discreet & Secure</p>
                <p className="text-[11px] text-white/35 mt-1 leading-relaxed">Plain packaging • "ZNE LLC" billing • 256-bit SSL • 30-day hassle-free returns</p>
              </div>
            </div>

            {/* Features List */}
            {product.features && product.features.length > 0 && (
              <div className="pt-4">
                <p className="input-label">Key Features</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <Check size={14} className="text-zeneio-accent mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SKU & Meta */}
            <div className="text-[12px] text-white/25 space-y-1 pt-2 border-t border-white/5">
              <p>SKU: <span className="font-mono">{product.sku || product.id.toUpperCase()}</span></p>
              <p>Category: <span className="capitalize">{product.category}</span></p>
            </div>
          </div>
        </div>

        {/* ============================================
            TABS SECTION
            ============================================ */}
        <div className="mt-16 lg:mt-24">
          {/* Tab Headers */}
          <div className="flex gap-1 border-b border-white/5 mb-8 overflow-x-auto no-scrollbar">
            {[
              { id: 'description', label: 'Description' },
              ...(product.specifications ? [{ id: 'specs', label: 'Specifications' }] : []),
              { id: 'reviews', label: `Reviews (${product.reviewCount || 0})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-zeneio-accent text-white'
                    : 'border-transparent text-white/40 hover:text-white/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="animate-fade-in">
            {activeTab === 'description' && (
              <div className="max-w-3xl text-body text-white/50 leading-relaxed space-y-4">
                {product.description.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                
                {/* Features Grid in Description */}
                {product.features && (
                  <div className="grid sm:grid-cols-2 gap-3 my-8 not-prose">
                    {product.features.map((f, i) => (
                      <div key={i} className="glass rounded-xl p-4 flex items-start gap-3">
                        <span className="w-7 h-7 rounded-lg bg-zeneio-accent/10 flex items-center justify-center text-zeneio-accent text-xs font-bold flex-shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm text-white/70">{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specs' && product.specifications && (
              <div className="max-w-2xl">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <tr key={key} className="border-b border-white/5">
                        <td className="py-3.5 pr-8 font-semibold text-white/70 w-1/3">{key}</td>
                        <td className="py-3.5 text-white/50">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-3xl space-y-6">
                {/* Review Summary */}
                <div className="glass rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                  <div className="text-center">
                    <p className="text-5xl font-black text-white">{product.rating || '-'}</p>
                    <div className="star-rating flex justify-center gap-0.5 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} fill={i < Math.floor(product.rating || 0) ? '#FBBF24' : 'none'} stroke="#444" />
                      ))}
                    </div>
                    <p className="text-sm text-white/40 mt-1">{product.reviewCount} reviews</p>
                  </div>

                  {/* Rating Bars */}
                  <div className="flex-1 space-y-2 w-full sm:w-auto">
                    {[5, 4, 3, 2, 1].map(star => {
                      const percent = star === (product.rating ? Math.round(product.rating) : 5)
                        ? 72 : star >= 4 ? 18 : star >= 3 ? 7 : 3;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-sm text-white/50 w-8">{star}★</span>
                          <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                            <div className="h-full bg-yellow-400/80 rounded-full transition-all" style={{ width: `${percent}%` }} />
                          </div>
                          <span className="text-xs text-white/30 w-8">{percent}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample Reviews */}
                {[
                  {
                    name: 'Sarah M.',
                    rating: 5,
                    date: '2 weeks ago',
                    title: 'Exceeded expectations!',
                    content: 'I was skeptical at first but this product is absolutely incredible. The quality is premium and it works exactly as described. Shipping was discreet and fast.',
                    verified: true,
                  },
                  {
                    name: 'James K.',
                    rating: 4,
                    date: '1 month ago',
                    title: 'Great quality, worth the price',
                    content: 'Solid build quality and the features are exactly what I needed. Only giving 4 stars because I wish the battery lasted a bit longer. Still very happy with this purchase!',
                    verified: true,
                  },
                  {
                    name: 'Anonymous',
                    rating: 5,
                    date: '3 weeks ago',
                    title: 'My new favorite',
                    content: 'Best purchase I\'ve made in a long time. The design is beautiful and it feels amazing. Will definitely be buying more from ZENEIO.',
                    verified: false,
                  },
                ].map((review, i) => (
                  <div key={i} className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zeneio-accent to-zeneio-purple flex items-center justify-center text-sm font-bold text-black">
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{review.name}</p>
                          <p className="text-xs text-white/30">{review.date}</p>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="text-[11px] font-bold tracking-wide uppercase text-green-400/80 bg-green-400/10 px-2.5 py-1 rounded-full">
                          ✓ Verified Purchase
                        </span>
                      )}
                    </div>
                    <div className="star-rating flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} fill={j < review.rating ? '#FBBF24' : 'none'} stroke="#444" />
                      ))}
                    </div>
                    <h4 className="font-bold text-sm mb-1">{review.title}</h4>
                    <p className="text-sm text-white/50 leading-relaxed">{review.content}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-white/30">
                      <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <ThumbsUp size={13} /> Helpful ({Math.floor(Math.random() * 20)})
                      </button>
                      <button className="flex items-center gap-1 hover:text-white transition-colors">
                        <MessageCircle size={13} /> Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ============================================
            RELATED PRODUCTS
            ============================================ */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 lg:mt-28 border-t border-white/5 pt-16">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-white/30 mb-2">You May Also Like</p>
                <h2 className="text-heading-3 font-bold">Related Products</h2>
              </div>
              <Link href={`/products?category=${product.category}`} className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-zeneio-accent transition-colors">
                View All <ChevronRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Zoom Modal */}
      {showZoom && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center cursor-zoom-out"
          onClick={() => setShowZoom(false)}
        >
          <img
            src={product.images[selectedImage]}
            alt={product.name}
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
          <button className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center text-white/70 hover:text-white">×</button>
        </div>
      )}

      <Footer />
    </div>
  );
}

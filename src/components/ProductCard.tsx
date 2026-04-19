'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Check } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/products-data';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const hasDiscount = product.comparePrice && product.comparePrice > product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className={`product-card ${className}`}>
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="product-image-wrapper block">
        <img
          src={product.images[0] || '/images/placeholder.jpg'}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.serialNumber && (
            <span className="text-[9px] font-mono font-bold tracking-widest text-zeneio-accent/60 bg-black/40 px-2 py-0.5 rounded border border-zeneio-accent/20 backdrop-blur-md">
              SN: {product.serialNumber}
            </span>
          )}
          {product.isNew && <span className="badge badge-new">NEW MODEL</span>}
          {product.isHot && <span className="badge badge-hot">HOT 🔥</span>}
        </div>

        {/* Hover Technical HUD */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm z-20 flex flex-col justify-end p-4 pointer-events-none">
          <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-1">
              <span className="text-[10px] font-mono text-white/40 uppercase">Architecture</span>
              <span className="text-[10px] font-mono text-zeneio-accent">BIO-SILICONE 4.0</span>
            </div>
            {product.specifications && Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-[9px] font-mono text-white/30 uppercase">{key}</span>
                <span className="text-[9px] font-mono text-white/70">{value}</span>
              </div>
            ))}
            <div className="pt-2">
               <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-zeneio-accent/40 w-2/3 animate-pulse" />
               </div>
               <p className="text-[8px] font-mono text-zeneio-accent/50 mt-1 text-right">SYSTEM ACTIVE</p>
            </div>
          </div>
        </div>

        {/* Hover Quick Actions */}
        <div className="quick-actions z-30">
          <button
            className={`w-full text-sm py-2.5 ${added ? 'bg-green-500 text-white' : 'btn-accent'}`}
            onClick={handleAddToCart}
          >
            {added ? <><Check size={16} /> Added!</> : <><ShoppingBag size={16} /> Add to Cart</>}
          </button>
        </div>

        {/* Wishlist Button (always visible on hover) */}
        <button
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center text-white/60 hover:text-pink-400 transition-colors z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            alert('Sign in to save to wishlist!');
          }}
          aria-label="Add to wishlist"
        >
          <Heart size={16} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4 sm:p-5">
        {/* Category Label */}
        <p className="text-[11px] font-semibold tracking-wider uppercase text-white/30 mb-1.5">
          {product.category === 'male' ? "Men's" : product.category === 'female' ? "Women's" : "Lingerie"}
        </p>

        {/* Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-sm sm:text-base text-white/90 leading-snug mb-2 line-clamp-2 hover:text-zeneio-accent transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {(product.rating || 0) > 0 && (
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="star-rating flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill={i < Math.floor(product.rating || 0) ? '#FBBF24' : 'none'} stroke={i < Math.floor(product.rating || 0) ? '#FBBF24' : '#333'} />
              ))}
            </div>
            <span className="text-xs text-white/30">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="price-current">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="price-original text-sm">{formatPrice(product.comparePrice!)}</span>
          )}
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <p className="text-xs font-medium text-red-400 mt-2">Out of stock</p>
        )}
      </div>
    </div>
  );
}

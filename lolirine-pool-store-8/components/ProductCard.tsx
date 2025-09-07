import React, { useState, useRef, useEffect } from 'react';
import { ProductCardProps, Page, Product } from '../types';
import { ShoppingCart, Star, Plus, Minus, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { formatCurrency } from '../utils/formatting';

const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({ rating, reviewCount }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-current" />
        ))}
        {halfStar && <Star key="half" size={16} className="text-yellow-400 fill-current" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={16} className="text-gray-300 fill-current" />
        ))}
        <span className="text-xs text-gray-500 ml-1">({reviewCount})</span>
      </div>
    );
};

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, onSelectProduct, wishlist, addToWishlist }) => {
    const [quantity, setQuantity] = useState(1);
    
    const isOutOfStock = product.stock !== undefined && product.stock <= 0;
    const isInWishlist = wishlist.some(item => item.id === product.id);

    const getRibbonColor = (ribbonText: string) => {
        const text = ribbonText.toLowerCase();
        if (text.includes('promo')) return 'bg-red-500';
        if (text.includes('nouveau')) return 'bg-blue-500';
        return 'bg-green-500';
    };

    const priceTTC = product.isOnSale && product.promoPrice ? product.promoPrice * (1 + product.tvaRate) : product.price * (1 + product.tvaRate);
    const oldPriceTTC = product.isOnSale && product.promoPrice ? product.price * (1 + product.tvaRate) : null;
    
    return (
        <div 
          className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-500 hover:shadow-xl flex flex-col h-full [transform-style:preserve-3d] hover:[transform:translateY(-4px)_rotateY(15deg)]"
        >
            <div className="relative">
                <div className="cursor-pointer" onClick={() => onSelectProduct(product)}>
                    <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
                    
                    {isOutOfStock ? (
                        <div className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1.5 rounded-full bg-gray-700 shadow-lg">
                            Rupture de stock
                        </div>
                    ) : product.ribbon && (
                        <div className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-1.5 rounded-full ${getRibbonColor(product.ribbon)} shadow-lg`}>
                            {product.ribbon}
                        </div>
                    )}
                </div>
                <button 
                    onClick={() => addToWishlist(product)} 
                    className="absolute top-3 right-3 p-2 bg-white/70 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all"
                    aria-label="Ajouter à la liste de souhaits"
                >
                    <Heart size={20} className={isInWishlist ? 'text-red-500 fill-current' : ''} />
                </button>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSelectProduct(product)}>{product.category}</p>
                <h3 className="text-md font-bold text-gray-800 my-1 uppercase cursor-pointer line-clamp-2 h-12" onClick={() => onSelectProduct(product)}>{product.name}</h3>
                {product.rating !== undefined && product.reviewCount !== undefined && (
                    <div className="my-2 cursor-pointer" onClick={() => onSelectProduct(product)}>
                        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                    </div>
                )}
                <div className="mt-auto pt-2">
                     <div className="mb-2 h-8">
                        {oldPriceTTC !== null ? (
                            <div className="flex items-baseline gap-2">
                                <p className="text-xl font-bold text-cyan-600">{formatCurrency(priceTTC)} <span className="text-xs font-normal">TVAC</span></p>
                                <p className="text-sm font-semibold text-gray-500 line-through">{formatCurrency(oldPriceTTC)}</p>
                            </div>
                        ) : (
                            <p className="text-lg font-semibold text-cyan-600">{formatCurrency(priceTTC)} <span className="text-xs font-normal text-gray-500">TVAC</span></p>
                        )}
                     </div>
                     <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center border rounded-md">
                           <button 
                             onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                             className="px-2 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-l-md disabled:opacity-50"
                             aria-label="Diminuer la quantité"
                             disabled={isOutOfStock}
                           >
                             <Minus size={14}/>
                           </button>
                           <input 
                             type="number"
                             value={quantity}
                             onChange={e => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                             className="w-12 text-center border-l border-r h-full focus:outline-none disabled:bg-gray-100"
                             aria-label="Quantité"
                             min="1"
                             disabled={isOutOfStock}
                           />
                           <button 
                             onClick={() => setQuantity(q => q + 1)} 
                             className="px-2 py-2 text-gray-600 hover:bg-gray-100 transition-colors rounded-r-md disabled:opacity-50"
                             aria-label="Augmenter la quantité"
                             disabled={isOutOfStock}
                           >
                             <Plus size={14}/>
                           </button>
                        </div>
                        <button 
                          onClick={() => addToCart(product, quantity)} 
                          className="flex-shrink-0 bg-cyan-500 text-white p-2.5 rounded-md hover:bg-cyan-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                          aria-label="Ajouter au panier"
                          disabled={isOutOfStock}
                        >
                            <ShoppingCart size={18} />
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

interface ProductsCarouselProps {
    title?: string;
    subtitle?: string;
    products: Product[];
    addToCart: (product: Product, quantity: number) => void;
    onSelectProduct: (product: Product) => void;
    navigateTo: (page: Page, options?: { categoryFilter?: string }) => void;
    categoryFilter?: string;
    viewAllLink?: boolean;
    bgColor?: string;
    headless?: boolean;
    wishlist: Product[];
    addToWishlist: (product: Product) => void;
}

export const ProductsCarousel: React.FC<ProductsCarouselProps> = ({ title, subtitle, products, addToCart, onSelectProduct, navigateTo, categoryFilter, viewAllLink, bgColor = 'bg-cyan-50/70', headless = false, wishlist, addToWishlist }) => {
    const scrollContainer = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const intervalRef = useRef<number | null>(null);
    
    if (products.length === 0) return null;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainer.current) {
            const scrollAmount = scrollContainer.current.offsetWidth * 0.8;
            scrollContainer.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };
    
    const startAutoScroll = React.useCallback(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = window.setInterval(() => {
            if (scrollContainer.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
                if (scrollLeft + clientWidth >= scrollWidth - 1) { // -1 for floating point precision issues
                    scrollContainer.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scroll('right');
                }
            }
        }, 3000);
    }, []);

    const stopAutoScroll = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    useEffect(() => {
        if (!isHovering) {
            startAutoScroll();
        } else {
            stopAutoScroll();
        }
        return () => stopAutoScroll();
    }, [isHovering, startAutoScroll]);

    const scrollbarHideStyle: React.CSSProperties = {
        scrollbarWidth: 'none', /* For Firefox */
    };

    const carouselContent = (
        <div 
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity opacity-75 hover:opacity-100 -ml-4 hidden sm:block">
                <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <div ref={scrollContainer} className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4 items-stretch" style={scrollbarHideStyle}>
                {products.map(product => (
                    <div key={product.id} className="flex-shrink-0 w-80 [perspective:1000px]">
                        <ProductCard product={product} addToCart={addToCart} onSelectProduct={onSelectProduct} wishlist={wishlist} addToWishlist={addToWishlist} />
                    </div>
                ))}
            </div>
            <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-opacity opacity-75 hover:opacity-100 -mr-4 hidden sm:block">
                <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>
        </div>
    );

    if (headless) {
        return carouselContent;
    }

    return (
        <section className={`py-16 ${bgColor}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {(title || viewAllLink) && (
                    <div className="flex justify-between items-center mb-8">
                        {title && (
                            <div>
                                <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
                                {subtitle && <p className="text-gray-600">{subtitle}</p>}
                            </div>
                        )}
                        {viewAllLink && (
                            <button onClick={() => navigateTo('shop', { categoryFilter: categoryFilter })} className="font-semibold text-cyan-600 hover:underline">Voir tout →</button>
                        )}
                    </div>
                )}
                {carouselContent}
            </div>
        </section>
    );
};


export default ProductCard;
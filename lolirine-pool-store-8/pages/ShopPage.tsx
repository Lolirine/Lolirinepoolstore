import React, { useState, useMemo, useEffect } from 'react';
import { ShopPageProps, Product, FilterFacet, ActiveFilters } from '../types';
import { Search } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const PRICE_RANGES = [
    { label: 'Moins de 50 €', value: '0-50' },
    { label: '50 € - 100 €', value: '50-100' },
    { label: '100 € - 200 €', value: '100-200' },
    { label: '200 € - 500 €', value: '200-500' },
    { label: '500 € et plus', value: '500-Infinity' },
];

const ShopPage: React.FC<ShopPageProps> = ({ products, addToCart, onSelectProduct, initialCategoryFilter, initialSearchTerm, wishlist, addToWishlist }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryFilter || 'Tous');
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [sortOrder, setSortOrder] = useState('name-asc');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;
  
  useEffect(() => {
    setSelectedCategory(initialCategoryFilter || 'Tous');
    if (initialSearchTerm) {
      setSearchTerm(initialSearchTerm);
    } else {
      setSearchTerm('');
    }
    setActiveFilters({});
    setSelectedPriceRanges([]);
    setCurrentPage(1);
  }, [initialCategoryFilter, initialSearchTerm]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, activeFilters, selectedPriceRanges]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory && selectedCategory !== 'Tous') {
      if (selectedCategory === 'Promotions') {
        filtered = products.filter(p => p.isOnSale);
      } else {
        const categoryParts = selectedCategory.split(' - ');
        filtered = filtered.filter(p => {
            return categoryParts.every(part => p.category.includes(part));
        });
      }
    }

    // Search term filter
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(lowercasedTerm) ||
        (p.description && p.description.toLowerCase().includes(lowercasedTerm)) ||
        p.category.toLowerCase().includes(lowercasedTerm)
      );
    }
    
    // Active filters (attributes)
    if (Object.keys(activeFilters).length > 0) {
        filtered = filtered.filter(p => {
            return Object.entries(activeFilters).every(([key, values]) => {
                if (!p.attributes || !values.length) return true;
                const productValue = p.attributes[key];
                if (productValue === undefined) return false;
                return values.includes(productValue);
            });
        });
    }

    // Price range filter
    if (selectedPriceRanges.length > 0) {
        filtered = filtered.filter(p => {
            const price = (p.promoPrice ?? p.price) * (1 + p.tvaRate);
            return selectedPriceRanges.some(range => {
                const [minStr, maxStr] = range.split('-');
                const min = parseFloat(minStr);
                const max = maxStr === 'Infinity' ? Infinity : parseFloat(maxStr);
                
                if (max === Infinity) {
                    return price >= min;
                }
                return price >= min && price < max;
            });
        });
    }

    return filtered;
  }, [products, selectedCategory, searchTerm, activeFilters, selectedPriceRanges]);

  const filterFacets = useMemo(() => {
    const facets: FilterFacet[] = [];
    const attributeKeys = new Set<string>();
    filteredProducts.forEach(p => {
        if(p.attributes) {
            Object.keys(p.attributes).forEach(key => attributeKeys.add(key));
        }
    });

    attributeKeys.forEach(key => {
        const options: { [value: string]: number } = {};
        filteredProducts.forEach(p => {
            if (p.attributes && p.attributes[key] !== undefined) {
                const value = String(p.attributes[key]);
                options[value] = (options[value] || 0) + 1;
            }
        });
        if (Object.keys(options).length > 1) { // Only show facets with more than one option
            facets.push({
                name: key,
                options: Object.entries(options).map(([value, count]) => ({ value, count })).sort((a,b) => a.value.localeCompare(b.value))
            });
        }
    });
    return facets;
  }, [filteredProducts]);

  const handleFilterChange = (facetName: string, value: string | number) => {
    setActiveFilters(prev => {
        const newFilters = { ...prev };
        const currentValues = newFilters[facetName] || [];
        if (currentValues.includes(value)) {
            newFilters[facetName] = currentValues.filter(v => v !== value);
        } else {
            newFilters[facetName] = [...currentValues, value];
        }
        if (newFilters[facetName].length === 0) {
            delete newFilters[facetName];
        }
        return newFilters;
    });
  };

  const handlePriceRangeChange = (rangeValue: string) => {
    setSelectedPriceRanges(prev => {
        if (prev.includes(rangeValue)) {
            return prev.filter(r => r !== rangeValue);
        } else {
            return [...prev, rangeValue];
        }
    });
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSelectedPriceRanges([]);
  }

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    sorted.sort((a, b) => {
        switch (sortOrder) {
            case 'price-asc':
                return (a.promoPrice ?? a.price) - (b.promoPrice ?? b.price);
            case 'price-desc':
                return (b.promoPrice ?? b.price) - (a.promoPrice ?? a.price);
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });
    
    return sorted;
  }, [filteredProducts, sortOrder]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

  const categoryNavItems = [
    { name: 'Tout voir', filter: 'Tous', color: 'bg-slate-600 text-white hover:bg-slate-700', ring: 'ring-cyan-400' },
    { name: 'Espace Wellness', filter: 'Wellness', color: 'bg-cyan-500 text-white hover:bg-cyan-600' },
    { name: 'Promotions', filter: 'Promotions', color: 'bg-yellow-400 text-black hover:bg-yellow-500' },
    { name: 'Nettoyage', filter: 'Nettoyage', color: 'bg-blue-500 text-white hover:bg-blue-600' },
    { name: 'Filtration', filter: 'Filtration', color: 'bg-indigo-500 text-white hover:bg-indigo-600' },
    { name: 'Pompes', filter: 'Pompes', color: 'bg-indigo-600 text-white hover:bg-indigo-700' },
    { name: "Traitement de l'eau", filter: "Traitement de l'eau", color: 'bg-purple-500 text-white hover:bg-purple-600' },
    { name: 'Instruments de mesure', filter: 'Instruments de mesure', color: 'bg-fuchsia-500 text-white hover:bg-fuchsia-600' },
    { name: 'Matériel Électrique', filter: 'Matériel Électrique', color: 'bg-pink-600 text-white hover:bg-pink-700' },
    { name: 'Pièces à sceller', filter: 'Pièces à sceller', color: 'bg-red-500 text-white hover:bg-red-600' },
    { name: 'Raccords & PVC', filter: 'Raccords & PVC', color: 'bg-red-600 text-white hover:bg-red-700' },
    { name: 'Chauffage', filter: 'Chauffage', color: 'bg-orange-500 text-white hover:bg-orange-600' },
    { name: 'Liners', filter: 'Liners', color: 'bg-teal-500 text-white hover:bg-teal-600' },
  ];


  return (
    <div className="bg-gray-100">
      <div className="bg-cyan-100 py-8 text-center border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 capitalize">{initialCategoryFilter || (initialSearchTerm ? `Recherche pour "${initialSearchTerm}"` : 'Notre Boutique')}</h1>
          <div className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto space-y-2">
            <p>🏊‍♀️ Bienvenue dans la boutique la plus complète dédiée à l’univers de la piscine.</p>
            <p>Trouvez tout ce dont vous avez besoin, du spa au robot, en passant par l’entretien, les accessoires et les équipements techniques.</p>
            <p className="font-semibold text-gray-700">Un seul site, une infinité de solutions.</p>
          </div>
        </div>
      </div>

      <div className="py-6 bg-white border-b sticky top-[212px] z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-3">
                {categoryNavItems.map(cat => {
                    const isSelected = selectedCategory === cat.filter;
                    return (
                        <button
                            key={cat.name}
                            onClick={() => setSelectedCategory(cat.filter)}
                            className={`px-5 py-2.5 text-sm font-semibold rounded-full shadow-md transition-all duration-200 transform hover:-translate-y-0.5 ${cat.color} ${isSelected ? `ring-4 ${cat.ring || 'ring-offset-2 ring-cyan-500'}` : ''}`}
                        >
                            {cat.name}
                        </button>
                    );
                })}
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-[300px]">
              <h2 className="text-xl font-bold mb-4">Filtres</h2>
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher dans les résultats..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                </div>
              </div>

              <div className="border-t py-4">
                <h3 className="font-semibold mb-2">Prix</h3>
                <div className="space-y-2">
                    {PRICE_RANGES.map(range => (
                        <label key={range.value} className="flex items-center space-x-2 text-sm">
                            <input
                                type="checkbox"
                                checked={selectedPriceRanges.includes(range.value)}
                                onChange={() => handlePriceRangeChange(range.value)}
                                className="rounded text-cyan-600 focus:ring-cyan-500"
                            />
                            <span>{range.label}</span>
                        </label>
                    ))}
                </div>
              </div>
              
              {filterFacets.map(facet => (
                <div key={facet.name} className="border-t py-4">
                  <h3 className="font-semibold mb-2 capitalize">{facet.name}</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {facet.options.map(option => (
                      <label key={String(option.value)} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={activeFilters[facet.name]?.includes(option.value) || false}
                          onChange={() => handleFilterChange(facet.name, option.value)}
                          className="rounded text-cyan-600 focus:ring-cyan-500"
                        />
                        <span>{option.value} ({option.count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {(Object.keys(activeFilters).length > 0 || selectedPriceRanges.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-red-600 hover:underline"
                >
                  Effacer les filtres
                </button>
              )}
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
              <p className="text-sm text-gray-600">{filteredProducts.length} produits trouvés</p>
              <div className="flex items-center gap-4">
                <select
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                  className="border-gray-300 rounded-md shadow-sm text-sm"
                >
                  <option value="name-asc">Nom (A-Z)</option>
                  <option value="name-desc">Nom (Z-A)</option>
                  <option value="price-asc">Prix (croissant)</option>
                  <option value="price-desc">Prix (décroissant)</option>
                </select>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    onSelectProduct={onSelectProduct}
                    wishlist={wishlist}
                    addToWishlist={addToWishlist}
                  />
                ))}
              </div>
            ) : (
                <div className="text-center bg-white p-12 rounded-lg shadow-sm">
                  <Search size={48} className="mx-auto text-gray-300 mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">Aucun produit trouvé</h2>
                  <p className="text-gray-500 mb-6">Essayez d'ajuster vos filtres ou votre recherche.</p>
              </div>
            )}


            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
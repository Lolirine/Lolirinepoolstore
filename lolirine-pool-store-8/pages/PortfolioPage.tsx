import React, { useState, useMemo } from 'react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioPageProps } from '../types';
import GoBackButton from '../components/GoBackButton';

const PortfolioPage: React.FC<PortfolioPageProps> = ({ goBack, canGoBack }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('Tout');

    const categories = useMemo(() => ['Tout', ...new Set(PORTFOLIO_ITEMS.map(p => p.category))], []);
    
    const filteredItems = useMemo(() => {
        if (selectedCategory === 'Tout') {
        return PORTFOLIO_ITEMS;
        }
        return PORTFOLIO_ITEMS.filter(p => p.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="bg-white">
            {/* Page Header */}
            <div className="bg-gray-800 text-white py-20 text-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-bold">Nos Réalisations</h1>
                    <p className="mt-2 text-lg text-gray-300">La preuve de notre savoir-faire en images.</p>
                </div>
            </div>

            {/* Filters and Portfolio */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-48">
                {canGoBack && <GoBackButton onClick={goBack} className="mb-8" />}
                {/* Category Filters */}
                <div className="flex justify-center flex-wrap gap-2 mb-12">
                {categories.map(category => (
                    <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                        selectedCategory === category
                        ? 'bg-cyan-500 text-white shadow'
                        : 'bg-white text-gray-600 hover:bg-cyan-100 border'
                    }`}
                    >
                    {category}
                    </button>
                ))}
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredItems.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden group">
                            <div className="relative">
                                <div className="grid grid-cols-2">
                                    <div className="relative">
                                        <img src={item.beforeImageUrl} alt={`Avant - ${item.title}`} className="object-cover h-[160px] w-full" />
                                        <div className="absolute bottom-0 left-0 bg-red-500 text-white px-2 py-1 text-xs font-bold">AVANT</div>
                                    </div>
                                    <div className="relative">
                                        <img src={item.afterImageUrl} alt={`Après - ${item.title}`} className="object-cover h-[160px] w-full" />
                                        <div className="absolute bottom-0 left-0 bg-green-500 text-white px-2 py-1 text-xs font-bold">APRÈS</div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50">
                                <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                                <p className="text-sm text-cyan-600">{item.category}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
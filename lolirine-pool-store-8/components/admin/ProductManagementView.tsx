import React, { useState, useMemo } from 'react';
import { Product, Supplier } from '../../types';
import { Edit, PlusCircle, Trash2, Copy, ChevronDown, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import ProductEditModal from './ProductEditModal';
import ProductCreateModal from './ProductCreateModal';
import CategoryActionModal from './CategoryActionModal';

interface ProductManagementViewProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onCreateProduct: (newProduct: Omit<Product, 'id'>) => void;
  onDeleteProduct: (productId: string | number) => void;
  onBulkUpdateProducts: (products: Product[]) => void;
  suppliers: Supplier[];
  onAddCategory: (categoryPath: string) => void;
  onDeleteCategoryAndProducts: (categoryPath: string) => void;
  onRenameCategory: (oldCategoryPath: string, newCategoryName: string) => void;
  onDuplicateCategory: (sourceCategoryPath: string, newCategoryPath: string) => void;
}

interface CategoryNode {
    name: string;
    fullName: string;
    children: Map<string, CategoryNode>;
    productCount: number;
}


const ProductManagementView: React.FC<ProductManagementViewProps> = ({ 
    products, onUpdateProduct, onCreateProduct, onDeleteProduct, onBulkUpdateProducts, suppliers,
    onAddCategory, onDeleteCategoryAndProducts, onRenameCategory, onDuplicateCategory 
}) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [duplicatingProduct, setDuplicatingProduct] = useState<Product | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['All']));
    const [categoryAction, setCategoryAction] = useState<{ action: 'add' | 'rename' | 'duplicate', path: string } | null>(null);
    
    const allCategories = useMemo(() => {
        return [...new Set(products.map(p => p.category))].sort();
    }, [products]);

    const categoryTree = useMemo(() => {
        const visibleProducts = products.filter(p => !p.isHidden);
        const root: CategoryNode = { name: 'Tous les produits', fullName: 'All', children: new Map(), productCount: visibleProducts.length };
        
        products.forEach(product => {
            const parts = product.category.split(' - ');
            let currentNode = root;
            let currentPath = '';
            parts.forEach((part, index) => {
                currentPath = index === 0 ? part : `${currentPath} - ${part}`;
                if (!currentNode.children.has(part)) {
                    currentNode.children.set(part, { name: part, fullName: currentPath, children: new Map(), productCount: 0 });
                }
                currentNode = currentNode.children.get(part)!;
                if (!product.isHidden) {
                    currentNode.productCount++;
                }
            });
        });
        return root;
    }, [products]);

    const handleCreateProduct = (newProduct: Omit<Product, 'id'>) => {
        onCreateProduct(newProduct);
        setIsCreateModalOpen(false);
        setDuplicatingProduct(null);
    };
    
    const handleDuplicateProduct = (product: Product) => {
        setDuplicatingProduct(product);
        setIsCreateModalOpen(true);
    }

    const handleCategoryActionSave = (newName: string) => {
        if (!categoryAction) return;

        const { action, path } = categoryAction;
        const newPath = path ? `${path} - ${newName}` : newName;

        switch(action) {
            case 'add':
                onAddCategory(newPath);
                break;
            case 'rename':
                onRenameCategory(path, newName);
                break;
            case 'duplicate':
                onDuplicateCategory(path, newPath);
                break;
        }
        setCategoryAction(null);
    };
    
    const renderCategoryTree = (node: CategoryNode, level = 0) => {
        const isExpanded = expandedCategories.has(node.fullName);
        const hasChildren = node.children.size > 0;
        
        const sortedChildren = Array.from(node.children.values()).sort((a,b) => a.name.localeCompare(b.name));

        return (
            <div style={{ paddingLeft: level > 0 ? '1rem' : '0' }}>
                <div 
                    className={`group flex items-center justify-between p-2 rounded-md cursor-pointer ${selectedCategory === node.fullName ? 'bg-cyan-100 text-cyan-800' : 'hover:bg-gray-100'}`}
                >
                    <div className="flex items-center flex-1 min-w-0" onClick={() => setSelectedCategory(node.fullName)}>
                         {hasChildren ? (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedCategories(prev => {
                                        const newSet = new Set(prev);
                                        if (newSet.has(node.fullName)) {
                                            newSet.delete(node.fullName);
                                        } else {
                                            newSet.add(node.fullName);
                                        }
                                        return newSet;
                                    });
                                }}
                                className="mr-1 p-1 rounded-full hover:bg-gray-200"
                            >
                                {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            </button>
                        ) : <div className="w-6 mr-1"></div>}
                        <span className="font-medium text-sm truncate">{node.name}</span>
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full flex-shrink-0">{node.productCount}</span>
                    </div>
                    {node.fullName !== 'All' && (
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setCategoryAction({ action: 'rename', path: node.fullName })} title="Renommer" className="p-1 hover:text-cyan-600"><Edit size={14}/></button>
                            <button onClick={() => setCategoryAction({ action: 'duplicate', path: node.fullName })} title="Dupliquer" className="p-1 hover:text-blue-600"><Copy size={14}/></button>
                            <button onClick={() => onDeleteCategoryAndProducts(node.fullName)} title="Supprimer" className="p-1 hover:text-red-600"><Trash2 size={14}/></button>
                        </div>
                    )}
                </div>
                 {isExpanded && hasChildren && (
                    <div className="mt-1">
                        {sortedChildren.map(child => renderCategoryTree(child, level + 1))}
                    </div>
                )}
            </div>
        );
    };

    const displayedProducts = useMemo(() => {
        const visibleProducts = products.filter(p => !p.isHidden);
        if (selectedCategory === 'All') return visibleProducts;
        return visibleProducts.filter(p => p.category.startsWith(selectedCategory));
    }, [products, selectedCategory]);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Sidebar */}
        <div className="lg:col-span-1 bg-white p-4 rounded-lg shadow-md flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Catégories</h3>
                <button onClick={() => setCategoryAction({ action: 'add', path: ''})} title="Ajouter une catégorie racine" className="p-2 text-cyan-600 hover:bg-cyan-100 rounded-full">
                    <PlusCircle size={20} />
                </button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">
                {renderCategoryTree(categoryTree)}
            </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Gestion : {selectedCategory === 'All' ? 'Tous les produits' : selectedCategory}</h2>
                    <p className="text-sm text-gray-500">{displayedProducts.length} produits affichés</p>
                </div>
                 <button onClick={() => { setDuplicatingProduct(null); setIsCreateModalOpen(true); }} className="flex items-center gap-2 bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-colors">
                    <PlusCircle size={20} />
                    Ajouter un produit
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500">
                     <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-4 py-3 w-16">Image</th>
                            <th scope="col" className="px-4 py-3">Produit</th>
                            <th scope="col" className="px-4 py-3">Prix TTC</th>
                            <th scope="col" className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedProducts.map(product => (
                            <tr key={product.id} className="bg-white border-b hover:bg-gray-50 align-top">
                                <td className="p-2">
                                    <img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded-md"/>
                                </td>
                                <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-normal">
                                    <div className="font-bold">{product.name}</div>
                                    <p className="text-xs text-gray-500 font-normal mt-1 line-clamp-2">{product.description}</p>
                                </th>
                                <td className="px-4 py-4">
                                    {product.isOnSale && product.promoPrice != null ? (
                                        <div className="flex flex-col">
                                            <span className="font-bold text-cyan-600">{formatCurrency(product.promoPrice * (1 + product.tvaRate))}</span>
                                            <span className="text-xs text-gray-500 line-through">{formatCurrency(product.price * (1 + product.tvaRate))}</span>
                                        </div>
                                    ) : (
                                        <span className="font-semibold text-cyan-600">{formatCurrency(product.price * (1 + product.tvaRate))}</span>
                                    )}
                                </td>
                                <td className="px-4 py-4 text-center space-x-1">
                                   <button onClick={() => setEditingProduct(product)} className="p-2 text-cyan-600 hover:text-cyan-800 hover:bg-cyan-50 rounded-full" title="Modifier">
                                        <Edit size={16} />
                                    </button>
                                     <button onClick={() => handleDuplicateProduct(product)} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-full" title="Dupliquer">
                                        <Copy size={16} />
                                    </button>
                                     <button onClick={() => onDeleteProduct(product.id)} className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full" title="Supprimer">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {editingProduct && (
                <ProductEditModal 
                    product={editingProduct}
                    onClose={() => setEditingProduct(null)}
                    onSave={(p) => { onUpdateProduct(p); setEditingProduct(null); }}
                    suppliers={suppliers}
                />
            )}
             {(isCreateModalOpen) && (
                <ProductCreateModal
                    onClose={() => { setIsCreateModalOpen(false); setDuplicatingProduct(null); }}
                    onCreate={handleCreateProduct}
                    allCategories={allCategories}
                    suppliers={suppliers}
                    initialCategory={selectedCategory === 'All' ? undefined : selectedCategory}
                    productToDuplicate={duplicatingProduct}
                />
            )}
            {categoryAction && (
                <CategoryActionModal
                    action={categoryAction.action}
                    categoryPath={categoryAction.path}
                    onClose={() => setCategoryAction(null)}
                    onSave={handleCategoryActionSave}
                />
            )}
        </div>
      </div>
    );
};

export default ProductManagementView;
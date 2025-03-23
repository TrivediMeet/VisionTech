
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";
import { ProductForm } from "./ProductForm";
import { PlusCircle } from "lucide-react";
import { fetchFarmerProducts, createProduct, updateProduct, deleteProduct, Product } from "@/services/products";
import { useAuth } from "@/contexts/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface FarmerProductsManagerProps {
  onProductsChange?: () => void;
}

export const FarmerProductsManager = ({ onProductsChange }: FarmerProductsManagerProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToDeleteOrEdit, setProductToDeleteOrEdit] = useState<Product | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const { user } = useAuth();

  useEffect(() => {
    loadProducts();
  }, [user]);

  const loadProducts = async () => {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const data = await fetchFarmerProducts(user.id);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (productData: any) => {
    if (!user?.id) {
      toast.error("You must be logged in as a farmer to add products");
      return;
    }

    try {
      await createProduct(productData, user.id);
      setIsFormOpen(false);
      await loadProducts();
      if (onProductsChange) onProductsChange();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditProduct = async (productData: any) => {
    if (!productToDeleteOrEdit) return;

    try {
      await updateProduct(productToDeleteOrEdit.id, productData);
      setIsFormOpen(false);
      setProductToDeleteOrEdit(null);
      await loadProducts();
      if (onProductsChange) onProductsChange();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDeleteOrEdit) return;

    try {
      await deleteProduct(productToDeleteOrEdit.id);
      setIsDeleteDialogOpen(false);
      setProductToDeleteOrEdit(null);
      await loadProducts();
      if (onProductsChange) onProductsChange();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleOpenEditForm = (product: Product) => {
    setProductToDeleteOrEdit(product);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const handleOpenDeleteDialog = (product: Product) => {
    setProductToDeleteOrEdit(product);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Products</h2>
        <Button
          onClick={() => {
            setFormMode("create");
            setProductToDeleteOrEdit(null);
            setIsFormOpen(true);
          }}
          className="rounded-full"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-100 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-medium mb-2">No Products Yet</h3>
          <p className="text-gray-600 mb-6">
            Start adding your products to showcase them in the marketplace.
          </p>
          <Button
            onClick={() => {
              setFormMode("create");
              setIsFormOpen(true);
            }}
            size="lg"
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            Add Your First Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFarmerView={true}
              onEdit={handleOpenEditForm}
              onDelete={handleOpenDeleteDialog}
            />
          ))}
        </div>
      )}

      {/* Product Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {formMode === "create" ? "Add New Product" : "Edit Product"}
            </DialogTitle>
          </DialogHeader>
          
          <ProductForm
            initialData={formMode === "edit" ? productToDeleteOrEdit : undefined}
            onSubmit={formMode === "create" ? handleCreateProduct : handleEditProduct}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>
              Are you sure you want to delete "{productToDeleteOrEdit?.name}"? This action cannot be undone.
            </p>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProduct}
            >
              Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

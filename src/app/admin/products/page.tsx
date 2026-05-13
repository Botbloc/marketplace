"use client";
import { useState } from "react";
import AdminDataTable from "../../../components/elements/AdminDataTable";
import AdminEntityCreator from "../../../components/elements/AdminEntityCreator";
import {
  createAdminEntity,
  updateAdminEntity,
} from "../../../service/admin.service";
import {
  buildProductInitialValues,
  productFields,
} from "../entityInitialValues";
import {
  AdminEntityCreatorPayload,
  Products_type,
  TableColumn,
} from "../../../types/Index";

const formatPrice = (price: number, currency: string) => {
  if (typeof price !== "number") {
    return "-";
  }

  return `${currency ?? "$"} ${price.toFixed(2)}`;
};

const productColumns: TableColumn<Products_type>[] = [
  { key: "id", label: "ID" },
  { key: "product_name", label: "Product" },
  { key: "category", label: "Category" },
  {
    key: "price",
    label: "Price",
    render: (value, row) =>
      formatPrice(value as number, row.currency),
  },
  { key: "stock", label: "Stock" },
  { key: "status", label: "Status" },
  {
    key: "active",
    label: "Active",
    render: (value) => (value ? "Yes" : "No"),
  },
];

const parseCommaSeparatedList = (value: string) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const parseSpecsText = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((accumulator, line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        return accumulator;
      }

      const key = line.slice(0, separatorIndex).trim();
      const specValue = line.slice(separatorIndex + 1).trim();

      if (key) {
        accumulator[key] = specValue;
      }

      return accumulator;
    }, {});

const buildProductPayload = (
  payload: AdminEntityCreatorPayload
): AdminEntityCreatorPayload => {
  const values = payload.values;

  return {
    ...payload,
    values: {
      id: String(values.id ?? payload.documentId ?? ""),
      product_name: String(values.product_name ?? ""),
      category: String(values.category ?? ""),
      price: Number(values.price ?? 0),
      currency: String(values.currency ?? ""),
      stock: Number(values.stock ?? 0),
      condition: String(values.condition ?? ""),
      rating: Number(values.rating ?? 0),
      status: String(values.status ?? ""),
      delivery_status: String(values.delivery_status ?? ""),
      active: Boolean(values.active),
      img: Array.isArray(values.img) ? values.img : [],
      shipping: parseCommaSeparatedList(String(values.shipping ?? "")),
      description: String(values.description ?? ""),
      specs: parseSpecsText(String(values.specs ?? "")),
    },
  };
};

const Products = () => {
  const [editingProduct, setEditingProduct] = useState<Products_type | null>(
    null
  );
  const [refreshKey, setRefreshKey] = useState(0);
  const productInitialValues = buildProductInitialValues(editingProduct);

  const handleCreateProduct = async (payload: AdminEntityCreatorPayload) => {
    await createAdminEntity("/api/admin/products", buildProductPayload(payload));
    setRefreshKey((currentKey) => currentKey + 1);
  };

  const handleUpdateProduct = async (payload: AdminEntityCreatorPayload) => {
    await updateAdminEntity("/api/admin/products", buildProductPayload(payload));
    setRefreshKey((currentKey) => currentKey + 1);
  };

  return (
    <div className="table_container">
      <div className="feature_bar">
        <h3>Product Information</h3>
        <AdminEntityCreator
          buttonLabel="Add product"
          title="Add a product"
          parentPath="/Products"
          documentIdLabel="Product document ID"
          fields={productFields}
          onSave={handleCreateProduct}
        />
      </div>

      <AdminEntityCreator
        buttonLabel="Edit product"
        title="Edit a product"
        parentPath="/Products"
        documentIdLabel="Product document ID"
        fields={productFields}
        open={Boolean(editingProduct)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingProduct(null);
          }
        }}
        showTrigger={false}
        showAutoId={false}
        saveLabel="Update"
        initialDocumentId={editingProduct?.id}
        initialValues={productInitialValues}
        onSave={handleUpdateProduct}
      />

      <div className="table_session">
        <AdminDataTable<Products_type>
          title="Products"
          endpoint="/api/admin/products"
          columns={productColumns}
          rowKey="id"
          initialPageSize={25}
          pageSizeOptions={[10, 25, 50, 100]}
          onEdit={setEditingProduct}
          refreshKey={refreshKey}
        />
      </div>
    </div>
  );
};

export default Products;

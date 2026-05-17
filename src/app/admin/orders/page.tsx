"use client";
import { useState } from "react";
import AdminDataTable from "../../../components/elements/AdminDataTable";
import AdminEntityCreator from "../../../components/elements/AdminEntityCreator";
import {
  createAdminEntity,
  updateAdminEntity,
} from "../../../service/admin.service";
import { buildOrderInitialValues, orderFields } from "../entityInitialValues";
import {
  AdminEntityCreatorPayload,
  Order_type,
  TableColumn,
} from "../../../types/Index";

const orderColumns: TableColumn<Order_type>[] = [
  { key: "id", label: "Order ID" },
  { key: "Buyer", label: "Buyer" },
  { key: "Seller", label: "Seller" },
  { key: "Location", label: "Location" },
  { key: "Currency", label: "Currency" },
  {
    key: "Price",
    label: "Price",
    render: (value) => String(value ?? "-"),
  },
];

const buildOrderPayload = (
  payload: AdminEntityCreatorPayload
): AdminEntityCreatorPayload => {
  const values = payload.values;

  return {
    ...payload,
    values: {
      Buyer: String(values.Buyer ?? ""),
      Currency: String(values.Currency ?? ""),
      Location: String(values.Location ?? ""),
      Price: Number(values.Price ?? 0),
      Seller: String(values.Seller ?? ""),
    },
  };
};

const Orders = () => {
  const [editingOrder, setEditingOrder] = useState<Order_type | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const orderInitialValues = buildOrderInitialValues(editingOrder);

  const handleCreateOrder = async (payload: AdminEntityCreatorPayload) => {
    await createAdminEntity("/api/admin/orders", buildOrderPayload(payload));
    setRefreshKey((currentKey) => currentKey + 1);
  };

  const handleUpdateOrder = async (payload: AdminEntityCreatorPayload) => {
    await updateAdminEntity("/api/admin/orders", buildOrderPayload(payload));
    setRefreshKey((currentKey) => currentKey + 1);
  };

  return (
    <div className="table_container">
      <div className="feature_bar">
        <h3>Order Information</h3>
        <AdminEntityCreator
          buttonLabel="Add order"
          title="Add a document"
          parentPath="/Orders"
          documentIdLabel="Order document ID"
          fields={orderFields}
          onSave={handleCreateOrder}
        />
      </div>

      <AdminEntityCreator
        buttonLabel="Edit order"
        title="Edit a document"
        parentPath="/Orders"
        documentIdLabel="Order document ID"
        fields={orderFields}
        open={Boolean(editingOrder)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingOrder(null);
          }
        }}
        showTrigger={false}
        showAutoId={false}
        saveLabel="Update"
        initialDocumentId={editingOrder?.id}
        initialValues={orderInitialValues}
        onSave={handleUpdateOrder}
      />

      <div className="table_session">
        <AdminDataTable<Order_type>
          title="Orders"
          endpoint="/api/admin/orders"
          columns={orderColumns}
          rowKey="id"
          initialPageSize={25}
          pageSizeOptions={[10, 25, 50, 100]}
          onEdit={setEditingOrder}
          refreshKey={refreshKey}
        />
      </div>
    </div>
  );
};

export default Orders;

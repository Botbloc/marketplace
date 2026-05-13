"use client";
import { useState } from "react";
import AdminDataTable from "../../../components/elements/AdminDataTable";
import AdminEntityCreator from "../../../components/elements/AdminEntityCreator";
import {
  createAdminEntity,
  updateAdminEntity,
} from "../../../service/admin.service";
import { buildUserInitialValues, userFields } from "../entityInitialValues";

import {
  AdminEntityCreatorPayload,
  FirestoreTimestamp,
  TableColumn,
  User_type,
} from "../../../types/Index";

const isFirestoreTimestamp = (
  value: unknown
): value is FirestoreTimestamp => {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "_seconds" in value && "_nanoseconds" in value;
};

const formatDate = (value?: string | FirestoreTimestamp) => {
  if (!value) {
    return "-";
  }

  if (isFirestoreTimestamp(value)) {
    return new Date(value._seconds * 1000).toLocaleString();
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
};

const userColumns: TableColumn<User_type>[] = [
  { key: "uid", label: "UID" },
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  {
    key: "email_verified",
    label: "Verified",
    render: (value) => (value ? "Yes" : "No"),
  },
  { key: "role", label: "Role" },
  {
    key: "createdAt",
    label: "Created",
    render: (value) =>
      formatDate(value as User_type["createdAt"]),
  },
  {
    key: "verifiedAt",
    label: "Verified At",
    render: (value) =>
      formatDate(value as User_type["verifiedAt"]),
  },
  
];

const buildUserPayload = (
  payload: AdminEntityCreatorPayload
): AdminEntityCreatorPayload => {
  const values = payload.values;

  return {
    ...payload,
    values: {
      uid: String(values.uid ?? payload.documentId ?? ""),
      username: String(values.username ?? ""),
      email: String(values.email ?? ""),
      role: String(values.role ?? ""),
      email_verified: Boolean(values.email_verified),
      createdAt: String(values.createdAt ?? "").trim(),
      verifiedAt: String(values.verifiedAt ?? "").trim(),
    },
  };
};

const Users = () => {
  const [editingUser, setEditingUser] = useState<User_type | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const userInitialValues = buildUserInitialValues(editingUser);

  const handleCreateUser = async (payload: AdminEntityCreatorPayload) => {
    await createAdminEntity("/api/admin/users", buildUserPayload(payload));
    setRefreshKey((currentKey) => currentKey + 1);
  };

  const handleUpdateUser = async (payload: AdminEntityCreatorPayload) => {
    await updateAdminEntity("/api/admin/users", buildUserPayload(payload));
    setRefreshKey((currentKey) => currentKey + 1);
  };

  return (
    <div className="table_container">
      <div className="feature_bar">
        <h3>User Information</h3>
        <AdminEntityCreator
          buttonLabel="Add user"
          title="Add a user"
          parentPath="/Users"
          documentIdLabel="User document ID"
          fields={userFields}
          onSave={handleCreateUser}
        />
      </div>

      <AdminEntityCreator
        buttonLabel="Edit user"
        title="Edit a user"
        parentPath="/Users"
        documentIdLabel="User document ID"
        fields={userFields}
        open={Boolean(editingUser)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingUser(null);
          }
        }}
        showTrigger={false}
        showAutoId={false}
        saveLabel="Update"
        initialDocumentId={editingUser?.uid}
        initialValues={userInitialValues}
        onSave={handleUpdateUser}
      />

      <div className="table_session">
        <AdminDataTable<User_type>
          title="Users"
          endpoint="/api/admin/users"
          columns={userColumns}
          rowKey="uid"
          initialPageSize={25}
          pageSizeOptions={[10, 25, 50, 100]}
          onEdit={setEditingUser}
          refreshKey={refreshKey}
        />
      </div>
    </div>
  );
};

export default Users;

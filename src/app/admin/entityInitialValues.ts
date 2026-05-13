import {
  AdminEntityFieldConfig,
  AdminEntityFieldValue,
  FirestoreTimestamp,
  Order_type,
  Products_type,
  User_type,
} from "../../types/Index";

export const userFields: AdminEntityFieldConfig[] = [
  {
    name: "uid",
    label: "UID",
    type: "text",
    placeholder: "user_001",
    required: true,
  },
  {
    name: "username",
    label: "Username",
    type: "text",
    placeholder: "Sam",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "sam@example.com",
    required: true,
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Seller", value: "seller" },
    ],
  },
  {
    name: "email_verified",
    label: "Verified",
    type: "checkbox",
    placeholder: "Email verified",
    defaultValue: false,
  },
];

export const productFields: AdminEntityFieldConfig[] = [
  {
    name: "id",
    label: "Product ID",
    type: "text",
    placeholder: "AB-1000",
    required: true,
  },
  {
    name: "product_name",
    label: "Product Name",
    type: "text",
    placeholder: "Universal Robot Core",
    required: true,
  },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      { label: "R-cores", value: "R-cores" },
      { label: "Actuators", value: "Actuators" },
      { label: "End effectors", value: "End effectors" },
      { label: "Sensors", value: "Sensors" },
      { label: "Applications", value: "applications" },
      { label: "Accessories", value: "accessories" },
    ],
  },
  {
    name: "price",
    label: "Price",
    type: "number",
    placeholder: "200",
    required: true,
  },
  {
    name: "currency",
    label: "Currency",
    type: "select",
    required: true,
    options: [
      { label: "British Pounds", value: "British Pounds" },
      { label: "US Dollars", value: "$" },
      { label: "Euros", value: "Euros" },
    ],
  },
  {
    name: "stock",
    label: "Stock",
    type: "number",
    placeholder: "12",
    required: true,
  },
  {
    name: "condition",
    label: "Condition",
    type: "select",
    options: [
      { label: "New", value: "New" },
      { label: "Refurbished", value: "Refurbished" },
      { label: "Used", value: "Used" },
    ],
  },
  {
    name: "rating",
    label: "Rating",
    type: "number",
    placeholder: "4.8",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Available", value: "Available" },
      { label: "Draft", value: "Draft" },
      { label: "Archived", value: "Archived" },
    ],
  },
  {
    name: "delivery_status",
    label: "Delivery Status",
    type: "select",
    options: [
      { label: "Ready to ship", value: "Ready to ship" },
      { label: "Made to order", value: "Made to order" },
      { label: "Pre-order", value: "Pre-order" },
    ],
  },
  {
    name: "active",
    label: "Active",
    type: "checkbox",
    placeholder: "Product is active",
    defaultValue: true,
  },
  {
    name: "img",
    label: "Product Images",
    type: "image-list",
    placeholder: "/images/product.png",
    addItemLabel: "Add image",
  },
  {
    name: "shipping",
    label: "Shipping Locations",
    type: "textarea",
    placeholder: "EU, UK, US",
    helperText: "Enter a comma-separated list of supported shipping regions.",
    rows: 3,
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Write a short product description...",
    rows: 5,
  },
  {
    name: "specs",
    label: "Specs",
    type: "textarea",
    placeholder: "weight: 2kg\npower: 24V",
    helperText: "Enter one key:value pair per line.",
    rows: 5,
  },
];

export const orderFields: AdminEntityFieldConfig[] = [
  {
    name: "Buyer",
    label: "Buyer",
    type: "text",
    placeholder: "Sam",
    required: true,
  },
  {
    name: "Currency",
    label: "Currency",
    type: "select",
    required: true,
    options: [
      { label: "British Pounds", value: "British Pounds" },
      { label: "US Dollars", value: "US Dollars" },
      { label: "Euros", value: "Euros" },
    ],
  },
  {
    name: "Location",
    label: "Location",
    type: "text",
    placeholder: "EU",
    required: true,
  },
  {
    name: "Price",
    label: "Price",
    type: "number",
    placeholder: "200",
    required: true,
  },
  {
    name: "Seller",
    label: "Seller",
    type: "text",
    placeholder: "BotBloc",
    required: true,
  },
];

const isFirestoreTimestamp = (
  value: unknown
): value is FirestoreTimestamp => {
  if (!value || typeof value !== "object") {
    return false;
  }

  return "_seconds" in value && "_nanoseconds" in value;
};

const formatDateForInput = (value?: string | FirestoreTimestamp) => {
  if (!value) {
    return "";
  }

  if (isFirestoreTimestamp(value)) {
    return new Date(value._seconds * 1000).toISOString();
  }

  return String(value);
};

const normalizeProductImages = (value: Products_type["img"]) => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value : [""];
  }

  if (typeof value === "string" && value.trim() !== "") {
    return [value];
  }

  return [""];
};

export const buildUserInitialValues = (
  user: User_type | null
): Record<string, AdminEntityFieldValue> | undefined => {
  if (!user) {
    return undefined;
  }

  return {
    uid: user.uid ?? "",
    username: user.username ?? "",
    email: user.email ?? "",
    role: user.role ?? "",
    email_verified: Boolean(user.email_verified),
    createdAt: formatDateForInput(user.createdAt),
    verifiedAt: formatDateForInput(user.verifiedAt),
  };
};

export const buildProductInitialValues = (
  product: Products_type | null
): Record<string, AdminEntityFieldValue> | undefined => {
  if (!product) {
    return undefined;
  }

  return {
    id: product.id ?? "",
    product_name: product.product_name ?? "",
    category: product.category ?? "",
    price: product.price ?? 0,
    currency: product.currency ?? "",
    stock: product.stock ?? 0,
    condition: product.condition ?? "",
    rating: product.rating ?? 0,
    status: product.status ?? "",
    delivery_status: product.delivery_status ?? "",
    active: Boolean(product.active),
    img: normalizeProductImages(product.img),
    shipping: Array.isArray(product.shipping) ? product.shipping.join(", ") : "",
    description: product.description ?? "",
    specs: Object.entries(product.specs ?? {})
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n"),
  };
};

export const buildOrderInitialValues = (
  order: Order_type | null
): Record<string, AdminEntityFieldValue> | undefined => {
  if (!order) {
    return undefined;
  }

  return {
    Buyer: order.Buyer ?? "",
    Currency: order.Currency ?? "",
    Location: order.Location ?? "",
    Price: typeof order.Price === "number" ? order.Price : Number(order.Price ?? 0),
    Seller: order.Seller ?? "",
  };
};

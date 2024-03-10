type selectBoxData = {
  value: string;
  label: string;
};

type userData = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  date: string;
};

type categoryData = {
  _id: string;
  name: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  date: string;
};

type productVariationData = {
  _id: string;
  variation: string;
  price: string;
  quantity: number;
  image: string;
};

type productData = {
  _id: string;
  name: string;
  slug: string;
  status: string
  category: categoryData | null;
  price: string;
  mrpPrice: string;
  quantity: number;
  unit: string;
  weight: number;
  sku: string;
  description: string;
  image: string;
  variations: productVariationData[] | [];
  metaTitle: string;
  metaDescription: string;
  views: number;
  userId: string;
  date: string;
};

type cartData = {
  id: string;
  name: string;
  image: string;
  price: string;
  status: string
  mrpPrice: string;
  quantity: number;
  maximumQuantity: number;
  unit: string;
  weight: number | null;
  variation?: string;
  userId: string;
};

interface sellerData {
  _id: string,
  name: string,
  email:string,
  
}

type orderedProductData = {
  _id: string;
  name: string;
  image: string;
  price: string;
  quantity: number;
  unit: string;
  seller: sellerData
  status: string
  
};

type orderData = {
  _id: string;
  orderId: string;
  products: orderedProductData[];
  deliveryAddress: {
    name: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
  };
  paymentMethod: string;
  paymentId: string;
  total: string;
  sellerId: string;
  customerId: string;
  seller: userData;
  customer: userData;
  paymentStatus: string;
  orderStatus: string;
  date: string;
};

type messageData = {
  sender: string;
  receiver: string;
  content: string;
  seen?: boolean;
  date?: any;
};

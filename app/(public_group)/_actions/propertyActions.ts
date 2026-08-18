"use server"

export const getAllProperties = async({
  query,
  }: {
    query?: { [key: string]: string | string[] | undefined };
  }
)=>{

  const params = new URLSearchParams();

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined) return;
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    });
  }


  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`,
    { cache: "no-store" }
  );
  const result = await res.json();

  return result.data;
}

export const getPropertyById = async(propertyId : string)=>{
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${propertyId}`);

  const result = await res.json();

  // console.log(result);
  return result.data;
}

export const getAllCategories = async()=>{
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`,
    { cache: "no-store" }
  );
  const result = await res.json();

  return result.data.map((category: { slug: string }) => category.slug);
  
}
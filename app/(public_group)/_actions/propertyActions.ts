"use server"

export const getAllProperties = async()=>{
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties`);
  const result = await res.json();

  console.log(result)

  return result.data;
}

export const getPropertyById = async(propertyId : string)=>{
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/${propertyId}`);

  const result = await res.json();

  console.log(result);
  return result.data;
}
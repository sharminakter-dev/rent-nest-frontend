import React from 'react'

const PropertiesByIdPage = async({
    params,
} : {
    params: Promise<{id: string} >
}) => {

    const {id} = await params;

  return (
    <div>
        <h4>PropertiesByIdPage</h4> 
        <p> Property: {id}</p>
    </div>
  )
}

export default PropertiesByIdPage
import React, { useState, createContext } from 'react'

export const AddProjectResponseContext = createContext()
export const EditProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

function ContextShare({children}) {
  const [addProjectResponse, setAddProjectResponse] = useState({})
  const [editProjectResponse, setEditProjectResponse] = useState({})
  const [isAuthToken, setIsAuthToken] = useState(false)
  return (
    <AddProjectResponseContext.Provider value={{addProjectResponse , setAddProjectResponse}}>
      <EditProjectResponseContext.Provider value={{editProjectResponse, setEditProjectResponse}}><isAuthTokenContext.Provider value={{isAuthToken, setIsAuthToken}}>{children}</isAuthTokenContext.Provider></EditProjectResponseContext.Provider>
    </AddProjectResponseContext.Provider> 
  )
}

export default ContextShare
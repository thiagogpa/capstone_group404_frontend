//keep context of the bin to update or add new 
import React from 'react';
const CBinContext = React.createContext();


export const CBinProvider = CBinContext.Provider;
export const CBinConsumer = CBinContext.Consumer;

export default CBinContext;
"use client"

import React from 'react'
import {
  QueryClientProvider,
  QueryClient,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";



const ReactQueryProvider = ({children}: {children: React.ReactNode}) => {

    const queryClient = new QueryClient()
  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}
      < ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  );
}

export default ReactQueryProvider
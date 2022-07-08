import {useMutation,useQuery,useQueryClient} from "react-query";
import axios from "axios";
import { useState,useEffect } from "react";

const addTombstone=(tombstone)=>{
    return axios.post("http://localhost:4000/tombstone",tombstone);
  }
 export const useSaveTombstone=()=>{
     const queryClient=useQueryClient()
    return useMutation(addTombstone,{
        onSuccess:()=>{
            queryClient.invalidateQueries('tombstone');
        }
    });
  }

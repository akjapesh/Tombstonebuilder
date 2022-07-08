import {useMutation,useQuery} from "react-query";
import axios from "axios";
import { useState,useEffect } from "react";

const fetchTombstone=()=>{
    return axios.get("http://localhost:4000/tombstone")
    }
export const useLoadTombstone=()=>{
      return useQuery('tombstone',fetchTombstone);
}
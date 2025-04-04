
import { useState,useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import {InitialFeedsResponse } from "@/api/types/FeedsTypes"
import { handleApiError } from "../utils/apiUtils";
export default function useFetchFeeds({fetchAgain}:{fetchAgain:boolean}) {
    const [feeds,setFeeds] = useState<Partial<InitialFeedsResponse> | null>(null)
    const [loading,setLoading]= useState<boolean>(true)
    const [error,setError] = useState <boolean | any>(false)
    
    useEffect(()=>{
        const fetchFeeds = async() =>{
            try{
                let response;
                response=await axiosClient.get('/posts')
                
            
                const data=response.data;

                setFeeds(data);
            } catch(error: any) {
                const ErrorResponse = handleApiError(error)
                setError(ErrorResponse.message)
            } finally {
                setLoading(false);
            }
        
        }
        fetchFeeds();
        
    },[fetchAgain])



    return [feeds,setFeeds,loading,error];
}
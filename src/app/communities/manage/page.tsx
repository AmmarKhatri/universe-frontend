'use client'
import { RootState } from "@/app/redux/store";
import FetchAllCommunities from "@/calls/fetchAllCommunities";
import JoinCommunity from "@/calls/joinCommunity";
import LeaveCommunity from "@/calls/leaveCommunity";
import { toast } from "@/components/ui/use-toast";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { IconLeft } from "react-day-picker";
import { useSelector } from "react-redux";

  export default function ManageCommunities() {
    const user = useSelector((state: RootState) => state.user);
    const [communities, setCommunities] = useState<any>([]);
    useEffect(()=>{
        try {
            FetchAllCommunities(user.access_token, setCommunities, user.userid);
          } catch (err) {
            toast({
              title: "Error",
              description: "Could not set communities",
            });
          }
    },[])
    
    return (
      <div className="mx-20 my-10">
        <span className=" font-bold text-3xl">Manage Communities</span>
        <ul role="list" className="divide-y divide-gray-100">
          {communities.map((community:any) => (
            <li key={community.commid} className="flex items-center justify-between gap-x-6 py-5">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{community.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{community.description}</p>
                </div>
              </div>
              {
                community.joined ? <button
                onClick={()=>{LeaveCommunity(user.access_token, communities, setCommunities, community.commid)}}
                className="rounded bg-red-500 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-200 hover:text-black"
              >
                Leave
              </button> : <button
                onClick={()=>{JoinCommunity(user.access_token, communities, setCommunities, community.commid)}}
                className="rounded bg-green-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-200 hover:text-black"
              >
                Join
              </button>
              }
            </li>
          ))}
        </ul>
        <a
          href="/communities"
          className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
        <IconLeft className="h-3 w-6 pr-4 shrink-0" aria-hidden="true" />
          Back to posts
        </a>
      </div>
    )
  }
  
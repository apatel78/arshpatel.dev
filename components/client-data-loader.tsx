"use client"

import { useEffect } from "react"
import { fetchProjectsData } from "./projects-list"

export default function ClientDataLoader() {
  useEffect(() => {
    fetchProjectsData().catch(console.error);
  }, []);
  
  return null;
} 
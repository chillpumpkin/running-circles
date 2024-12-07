"use client";

import { useEffect, useState } from "react";
import { Activity } from "./types";
import ActivityList from "@/components/activityList";
import ActivityModal from "@/components/activityModal";
import { useAuth } from "@clerk/nextjs";

export default function Home() {
  return <main className="container mx-auto p-4">Placeholder for welcome</main>;
}

"use client";

import { useSearchParams } from "next/navigation";
import { TJobResponse_Public } from "../../../../types/job.types";
import JobCard, { JobCardSkeleton } from "./job-card";
import { useState, useEffect } from "react";

export default function JobsContainer() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<TJobResponse_Public>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(searchParams.toString());
        // Only show open jobs by default
        if (!params.get('status')) {
          params.set('status', 'open');
        }
        
        const res = await fetch(`/api/jobs?${params}`);
        
        if (res.ok) {
          const data = await res.json();
          setJobs(data);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }, (_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-slate-400 text-lg mb-2">No job openings found</div>
        <p className="text-slate-500">
          We don't have any open positions matching your criteria at the moment. 
          Please check back later or try different filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}
import React from "react";
import { getApplications } from "@/helper/applications/action";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BriefcaseBusiness, Eye } from "lucide-react";

async function Page() {
  const applications = await getApplications();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BriefcaseBusiness className="w-6 h-6 text-[#2D5A5D]" />
          Applications
        </h1>
      </div>

      <div className="grid gap-4">
        {applications.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl text-gray-400">
            No applications found.
          </div>
        ) : (
          applications.map((application) => (
            <div
              key={application.id}
              className="bg-white p-4 rounded-lg border shadow-sm flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <h3 className="font-semibold text-lg">{application.name}</h3>

                <p className="text-sm text-gray-500">
                  {application.email} | {application.mobileNumber}
                </p>

                <p className="text-sm text-gray-400">
                  {application.subject}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  Applied on{" "}
                  {application.createdAt
                    ? new Date(application.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              <div className="flex gap-2">
                <Link href={`/admin/applications/${application.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 border-amber-200 hover:bg-amber-50 text-amber-600"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Page;
import { getCareerApplications } from "@/helper/career/action";

export default async function ApplicationsPage() {
  const result = await getCareerApplications();
  const applications = result.data;

  return (
    <div className="w-full">
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>

        <p className="text-sm text-gray-500">Total: {applications.length}</p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead className="border-b bg-gray-50 text-gray-700">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Mobile</th>
                <th className="px-4 py-3 font-medium">Subject</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium">Resume</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>

            <tbody>
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-gray-500"
                  >
                    No applications found
                  </td>
                </tr>
              ) : (
                applications.map((application) => (
                  <tr
                    key={application.id}
                    className="border-b last:border-b-0 text-gray-700"
                  >
                    <td className="px-4 py-3">{application.name}</td>

                    <td className="px-4 py-3">{application.email}</td>

                    <td className="px-4 py-3">
                      {application.mobileNumber}
                    </td>

                    <td className="px-4 py-3">{application.subject}</td>

                    <td className="max-w-[260px] px-4 py-3">
                      <p className="line-clamp-2">
                        {application.description}
                      </p>
                    </td>

                    <td className="px-4 py-3">
                      {application.resumeUrl || "Attached in mail"}
                    </td>

                    <td className="px-4 py-3">
                      {application.createdAt
                        ? new Date(application.createdAt).toLocaleString()
                        : "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
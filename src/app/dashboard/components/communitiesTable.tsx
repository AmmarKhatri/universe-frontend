import ArchiveCommunity from "@/calls/archiveCommunity";
import { Community } from "@/types";

const MAX_LENGTH = 30;

interface Props {
  communities: Community[];
  handleArchiveCommunity: (e: any) => void;
}

export default function CommunitiesTable({
  communities,
  handleArchiveCommunity,
}: Props) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Communities
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the communities for which you are SUPERADMIN.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Creator
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Moderators
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {communities.map((comm) => (
                  <tr key={comm.id}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img
                            className="h-11 w-11 rounded-full"
                            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {comm.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {/* limit comm.description to 30 chars and the show ... */}
                      <div className="text-gray-900">
                        {comm.description.length > MAX_LENGTH
                          ? comm.description.slice(0, MAX_LENGTH) + "..."
                          : comm.description}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center rounded-md ${
                          comm.isArchived
                            ? "bg-red-50 text-red-700 ring-red-600/20"
                            : "bg-green-50 text-green-700 ring-green-600/20"
                        } px-2 py-1 text-xs font-medium  ring-1 ring-inset `}
                      >
                        {comm.isArchived ? "Archived" : "Active"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="font-medium text-gray-900">
                        {comm.createdBy.username}
                      </div>
                      <div className="mt-1 text-gray-500">
                        {comm.createdBy.email}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 space-x-2 text-sm">
                      {comm.moderators.map((mod) => (
                        <span
                          key={mod}
                          className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                        >
                          {mod}
                        </span>
                      ))}
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href="#"
                        onClick={(e) => {
                          if (comm.isArchived) {
                            e.preventDefault(); // Prevent the default action
                            return; // Exit the function if archived
                          }
                          handleArchiveCommunity(comm.commid);
                        }}
                        className={`
                            ${
                              comm.isArchived
                                ? "text-gray-500 cursor-not-allowed"
                                : "text-red-600 hover:text-red-700"
                            }
                          `}
                        aria-disabled={comm.isArchived} // Added for screen readers
                      >
                        Archive
                        <span className="sr-only">, {comm.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

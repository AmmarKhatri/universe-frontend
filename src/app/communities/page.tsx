"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  Cog6ToothIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/states/userReducer";
import FetchUserCommunities from "@/calls/fetchUserCommunities";
import { toast } from "@/components/ui/use-toast";
import { RootState } from "../redux/store";
import Postings from "../../components/postings";
import CreatePostModal from "./components/createPost";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashboard() {
  const dispatch = useDispatch();
  const [communities, setCommunities] = useState<any>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
  const [createCommunityModalOpen, setCreateCommunityModalOpen] =
    useState(false);
  const [postCreated, setPostCreated] = useState(false);
  const user = useSelector((state: RootState) => state.user);

  function handleSignOut() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    try {
      FetchUserCommunities(user.access_token, (fetchedCommunities: any) => {
        setCommunities(fetchedCommunities);
        if (fetchedCommunities.length > 0) {
          setSelectedCommunity(fetchedCommunities[0]); // Set the first community as selected
        }
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not set communities",
      });
    }
  }, [user.access_token]);

  const handleCommunitySelect = (community: any) => {
    setSelectedCommunity(community);
    setCommunities(
      communities.map((c: any) =>
        c.commid === community.commid
          ? { ...c, current: true }
          : { ...c, current: false }
      )
    );
  };

  return (
    <>
      <div>
        <Transition show={sidebarOpen}>
          <Dialog className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </TransitionChild>

                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="/universe0logo.webp"
                        alt="Universe"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your communities
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {communities.map((community: any) => (
                              <li key={community.commid}>
                                <a
                                  href="#"
                                  onClick={() =>
                                    handleCommunitySelect(community)
                                  }
                                  className={classNames(
                                    community.current
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {community.initial}
                                  </span>
                                  <span className="truncate">
                                    {community.name}
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto">
                          <a
                            onClick={() => setCreateCommunityModalOpen(true)} // open modal on click
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <PlusIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Create Post
                          </a>
                        </li>
                        <li className="mt-auto">
                          <a
                            href="/communities/manage"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Manage Communities
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-10 w-auto"
                src="/universe0logo.webp"
                alt="Universe"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">
                    Your communities
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {communities.map((community: any) => (
                      <li key={community.commid}>
                        <a
                          href="#"
                          onClick={() => handleCommunitySelect(community)}
                          className={classNames(
                            community.current
                              ? "bg-gray-800 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-800",
                            "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {community.initial}
                          </span>
                          <span className="truncate">{community.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="mt-auto">
                  <a
                    href="/communities/manage"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    Manage Communities
                  </a>
                </li>
                <li className="mt-auto">
                  <a
                    onClick={() => setCreateCommunityModalOpen(true)} // open modal on click
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <PlusIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    Create Post
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div
              className="h-6 w-px bg-gray-900/10 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form
                className="relative flex flex-1 my-2"
                action="#"
                method="GET"
              >
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none ml-2 absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  aria-hidden="true"
                />
                <input
                  id="search-field"
                  className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </form>
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
                  aria-hidden="true"
                />

                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                        aria-hidden="true"
                      >
                        {user.username}
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </MenuButton>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <MenuItem key={"Your profile"}>
                        {({ focus }) => (
                          <a
                            href={"/profile"}
                            className={classNames(
                              focus ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            {"Your profile"}
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem key={"Sign out"}>
                        {({ focus }) => (
                          <a
                            onClick={handleSignOut}
                            href="/signin"
                            className={classNames(
                              focus ? "bg-gray-50" : "",
                              "block px-3 py-1 text-sm leading-6 text-gray-900"
                            )}
                          >
                            {"Sign out"}
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              {/* Content here */}
              {selectedCommunity && (
                <div>
                  <h1 className=" font-bold">{selectedCommunity.name}</h1>
                  <h1 className=" text-gray-500">
                    {selectedCommunity.description}
                  </h1>
                  {/* Add logic to fetch and display content based on selectedCommunity.commid */}
                  <Postings
                    commid={selectedCommunity.commid}
                    token={user.access_token}
                    userid={user.userid}
                  />
                </div>
              )}
            </div>
            {selectedCommunity && (<CreatePostModal
              isOpen={createCommunityModalOpen}
              onClose={() => setCreateCommunityModalOpen(false)}
              user={user}
              commId={selectedCommunity.commid}
              setPostCreated={setPostCreated} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

import FetchPaginatedPosts from "@/calls/fetchPaginatedPosts";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  HandThumbUpIcon,
  PaperClipIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import {
  DeleteIcon,
  Edit2Icon,
  PackageIcon,
  PodcastIcon,
  TrashIcon,
  ViewIcon,
  WatchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import useFetchPaginatedPosts from "./useFetchPaginatedPosts";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Postings(props: any) {
  let commid = props.commid;
  console.log("CommunityID:", commid);
  let token = props.token;
  let userid = props.userid;
  //let limit = 3;

  // --
  const { posts, hasMore } = useFetchPaginatedPosts(token, commid);


  return (
    <div className="mt-4">
      <h1 className="sr-only">Recent questions</h1>
      <ul role="list" className="space-y-4">
        {posts.map((post: any) => (
          <li
            key={post._id}
            className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
          >
            <article aria-labelledby={"question-title-" + post._id}>
              <div>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={"/universe0logo.webp"}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {post.createdBy.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      <time dateTime={post.createdAt}>{post.createdAt}</time>
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 self-center">
                    {post.createdBy._id === userid ? (
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <MenuButton className="relative -m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                            <span className="absolute -inset-1" />
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </MenuButton>
                        </div>

                        <Transition
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              <MenuItem>
                                {({ focus }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      focus
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "flex px-4 py-2 text-sm"
                                    )}
                                  >
                                    <Edit2Icon
                                      className="mr-3 h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span>Edit Post</span>
                                  </a>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ focus }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      focus
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "flex px-4 py-2 text-sm"
                                    )}
                                  >
                                    <TrashIcon
                                      className="mr-3 h-5 w-5 text-red-400"
                                      aria-hidden="true"
                                    />
                                    <span>Delete Post</span>
                                  </a>
                                )}
                              </MenuItem>
                            </div>
                          </MenuItems>
                        </Transition>
                      </Menu>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <h2
                  id={"question-title-" + post._id}
                  className="mt-4 text-base font-medium text-gray-900"
                >
                  {post.title}
                </h2>
              </div>
              <div
                className="mt-2 space-y-4 text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.description }}
              />
              <div className="mt-6 flex justify-between space-x-8">
                <div className="flex space-x-6"></div>
                <div className="flex text-sm">
                  <span className="inline-flex items-center text-sm">
                    <a
                      type="button"
                      href={`/communities/${post._id}`}
                      className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="font-medium text-gray-900">
                        View Post
                      </span>
                      <PackageIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {hasMore && <p>Loading more posts...</p>}
    </div>
  );
}

'use client'
import { RootState } from "@/app/redux/store";
import FetchSinglePost from "@/calls/fetchSinglePost";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { ChatBubbleLeftEllipsisIcon, CodeBracketIcon, EllipsisVerticalIcon, EyeIcon, FlagIcon, HandThumbUpIcon, ShareIcon, StarIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
  }
export default function EachPost(props: any){
    const router = useRouter()
    const id = router.query.id;
    const [posts, setPost] = useState<any>([]);
    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const user = useSelector((state: RootState) => state.user);
    let commid = props.commid;
    useEffect(()=>{
      //Fetch Post itself
      FetchSinglePost(user.access_token, posts, setPost, id)
    }, [])
    return(
        <div className="mt-4">
                <h1 className="sr-only">Recent questions</h1>
                <ul role="list" className="space-y-4">
                  {posts.map((post: any) => (
                    <li key={post._id} className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6">
                      <article aria-labelledby={'question-title-' + post._id}>
                        <div>
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={"/universe0logo.webp"} alt="" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                  {post.createdBy.username}
                              </p>
                              <p className="text-sm text-gray-500">
                                  <time dateTime={post.updatedAt}>{post.updatedAt}</time>
                              </p>
                            </div>
                            <div className="flex flex-shrink-0 self-center">
                              <Menu as="div" className="relative inline-block text-left">
                                <div>
                                  <MenuButton className="relative -m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600">
                                    <span className="absolute -inset-1" />
                                    <span className="sr-only">Open options</span>
                                    <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
                                              focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                              'flex px-4 py-2 text-sm'
                                            )}
                                          >
                                            <StarIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span>Add to favorites</span>
                                          </a>
                                        )}
                                      </MenuItem>
                                      <MenuItem>
                                        {({ focus }) => (
                                          <a
                                            href="#"
                                            className={classNames(
                                              focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                              'flex px-4 py-2 text-sm'
                                            )}
                                          >
                                            <CodeBracketIcon
                                              className="mr-3 h-5 w-5 text-gray-400"
                                              aria-hidden="true"
                                            />
                                            <span>Embed</span>
                                          </a>
                                        )}
                                      </MenuItem>
                                      <MenuItem>
                                        {({ focus }) => (
                                          <a
                                            href="#"
                                            className={classNames(
                                              focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                              'flex px-4 py-2 text-sm'
                                            )}
                                          >
                                            <FlagIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                            <span>Report content</span>
                                          </a>
                                        )}
                                      </MenuItem>
                                    </div>
                                  </MenuItems>
                                </Transition>
                              </Menu>
                            </div>
                          </div>
                          <h2 id={'question-title-' + post.id} className="mt-4 text-base font-medium text-gray-900">
                            {post.title}
                          </h2>
                        </div>
                        <div
                          className="mt-2 space-y-4 text-sm text-gray-700"
                          dangerouslySetInnerHTML={{ __html: post.description }}
                        />
                        <div className="mt-6 flex justify-between space-x-8">
                          <div className="flex space-x-6">
                            <span className="inline-flex items-center text-sm">
                              <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                                <span className="font-medium text-gray-900">{likeCount}</span>
                                <span className="sr-only">Likes</span>
                              </button>
                            </span>
                            <span className="inline-flex items-center text-sm">
                              <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                <ChatBubbleLeftEllipsisIcon className="h-5 w-5" aria-hidden="true" />
                                <span className="font-medium text-gray-900">{dislikeCount}</span>
                                <span className="sr-only">Dislikes</span>
                              </button>
                            </span>
                            <span className="inline-flex items-center text-sm">
                              <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                                <span className="font-medium text-gray-900">{commentCount}</span>
                                <span className="sr-only">Comments</span>
                              </button>
                            </span>
                          </div>
                          <div className="flex text-sm">
                            <span className="inline-flex items-center text-sm">
                              <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                                <ShareIcon className="h-5 w-5" aria-hidden="true" />
                                <span className="font-medium text-gray-900">Share</span>
                              </button>
                            </span>
                          </div>
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
    );
}
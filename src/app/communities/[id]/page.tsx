'use client'
import { RootState } from "@/app/redux/store";
import CreateComment from "@/calls/createComment";
import FetchPaginatedComments from "@/calls/fetchPaginatedComments";
import FetchPostImpressions from "@/calls/fetchPostImpressions";
import FetchSinglePost from "@/calls/fetchSinglePost";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { ChatBubbleLeftEllipsisIcon, EllipsisVerticalIcon, HandThumbDownIcon, HandThumbUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Edit2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function classNames(...classes:any) {
  return classes.filter(Boolean).join(' ');
}

export default function EachPost() {
  const params = useParams();
  const { id } = params; // Extract slug ID from query
  const [post, setPost] = useState<any>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const user = useSelector((state: RootState) => state.user);
  const [comments, setComments] = useState<any>([]);
  const [pagination, setPagination] = useState({
    page: 0,
    records_per_page: 5,
    total_records: 0,
    total_pages: 0
  });
  const [c, setC] = useState<string>("");
  useEffect(() => {
    if (id) {
      // Fetch Single Post itself
      FetchSinglePost(user.access_token, setPost, id);
      //Fetch impression counts
      FetchPostImpressions(user.access_token, setLikeCount, setDislikeCount, id);
      //Fetch paginated first few comments and their counts as well
      FetchPaginatedComments(user.access_token, comments, setComments, setPagination, id, (pagination.page)*pagination.records_per_page, pagination.records_per_page);
    }
  }, [id, user.access_token]);

  if (!post) {
    return <div>Loading...</div>;
  }

  function handleCommentClick(event: any): void {
    CreateComment(user.access_token, id, c, post.community);
    //window.location.reload();
  }

  function loadMoreComments(event: any): void {
    FetchPaginatedComments(user.access_token, comments, setComments, setPagination, id, (pagination.page + 1)*pagination.records_per_page, pagination.records_per_page);
  }

  return (
    <div className="mt-4">
      <h1 className="sr-only">Recent question</h1>
      <div key={post._id} className="bg-white mb-4 px-4 mt-20 sm:mx-10 md:mx-32 py-6 shadow sm:rounded-lg sm:p-6 ">
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
                {post.createdBy._id === user.userid ? <Menu as="div" className="relative inline-block text-left">
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
                              <Edit2Icon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                              <span>Edit Post</span>
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
                </Menu> : <></>}
              </div>
            </div>
            <h2 id={'question-title-' + post._id} className="mt-4 text-base font-medium text-gray-900">
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
                  <HandThumbDownIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium text-gray-900">{dislikeCount}</span>
                  <span className="sr-only">Dislikes</span>
                </button>
              </span>
              <span className="inline-flex items-center text-sm">
                <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                  <ChatBubbleLeftEllipsisIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium text-gray-900">{pagination.total_records}</span>
                  <span className="sr-only">Comments</span>
                </button>
              </span>
            </div>
          </div>
        </article>
      </div>
      <span className=" mt-2 mx-32 font-bold text-lg">Comments</span>
      <div className="mt-2 flex md:mx-32 gap-x-3">
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
          className="h-6 w-6 flex-none rounded-full bg-gray-50"
        />
        <form action="#" className="relative flex-auto">
          <div className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-gray-600">
            <label htmlFor="comment" className="sr-only">
              Add your comment
            </label>
            <textarea
              rows={2}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Add your comment..."
              defaultValue={''}
              onChange={(e)=>setC(e.target.value)}
            />
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
              </div>
              <div className="flex items-center">
              </div>
            </div>
            <button
              type="submit"
              disabled={c === ""}
              onClick={handleCommentClick}
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Comment
            </button>
          </div>
        </form>
      </div>
      {comments.length === 0 && (
        <p className="text-center mt-10">No comments to show</p>
      )}
      {/*comment section*/}
      <div className="mx-auto md:mx-32 mt-10"> {/* Center the comment section */}
      <div className="flow-root">
      <ul role="list" className="-mb-8">
        {comments.map((comment: any, i: any) => (
          <li key={comment._id}>
            <div className="relative pb-8">
              {i !== comments.length - 1 ? (
                <span className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex items-start space-x-3">
                  <>
                    <div className="relative">
                      <img
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                        src={"/universe0logo.webp"}
                        alt=""
                      />

                      <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {comment.createdBy}
                          </div>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">Commented at {comment.updatedAt}</p>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{comment.description}</p>
                      </div>
                    </div>
                  </>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
    {pagination.page + 1 < pagination.total_pages ? <button onClick={loadMoreComments} className="  mb-10 text-center hover:text-gray-200 text-gray-800"><p>Load more</p></button>: null}
    </div>
    

  );
}

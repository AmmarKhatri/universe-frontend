import {
    PhotoIcon,
    UserCircleIcon,
    XMarkIcon,
  } from "@heroicons/react/24/solid";
  import { Formik, Field, Form, useFormikContext } from "formik";
  import { Dialog, Transition } from "@headlessui/react";
  import { Fragment } from "react";
  import { UserState } from "@/app/redux/states/userReducer";
import CreatePost from "@/calls/createPost";
  
  type CreatePostModalProps = {
    isOpen: boolean;
    onClose: () => void;
    user: UserState;
    commId: string;
    setPostCreated: (value: boolean) => void;
  };
  
  export default function CreatePostModal({
    isOpen,
    onClose,
    user,
    commId,
  setPostCreated,
  }: CreatePostModalProps) {
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
  
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create a new Community
                  </Dialog.Title>
                  <Formik
                    initialValues={{
                      name: "",
                      description: "",
                    }}
                    onSubmit={async (values, actions) => {
                      console.log("VALUES => ", values);
  
                      try {
                          const response = await CreatePost(user.access_token, values.name, values.description, commId);
                          console.log("Community created:", response);
                          setPostCreated(true);
                          onClose();
                          window.location.reload();
                      } catch (error) {
                          console.error("Error creating community:", error);
                      }
  
                    }}
                  >
                    {({ values, setFieldValue, handleChange }) => (
                      <div className="flex justify-center px-4 py-6">
                        <div className="w-full max-w-4xl">
                          <Form>
                            <div className="space-y-12">
                              <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                  Post
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                  This information will be displayed publicly
                                  after you successfully create a post.
                                </p>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                  <div className="sm:col-span-4">
                                    <label
                                      htmlFor="name"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Name
                                    </label>
                                    <div className="mt-2">
                                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <Field
                                          type="text"
                                          name="name"
                                          id="name"
                                          autoComplete="name"
                                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                          placeholder=""
                                        />
                                      </div>
                                    </div>
                                  </div>
  
                                  <div className="col-span-full">
                                    <label
                                      htmlFor="description"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Description
                                    </label>
                                    <div className="mt-2">
                                      <Field
                                        as="textarea"
                                        id="description"
                                        name="description"
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder=""
                                      />
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-gray-600">
                                      What is on your mind.
                                    </p>
                                  </div>
  
                                  {/* <div className="col-span-full">
                                    <label
                                      htmlFor="photo"
                                      className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                      Photo
                                    </label>
                                    <div className="mt-2 flex items-center gap-x-3">
                                      <UserCircleIcon
                                        className="h-12 w-12 text-gray-300"
                                        aria-hidden="true"
                                      />
                                      <button
                                        type="button"
                                        className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                      >
                                        Change
                                      </button>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
  
                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                type="submit"
                                className="rounded-md bg-blue-600 px-8 py-2 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Create
                              </button>
                            </div>
                          </Form>
                        </div>
                      </div>
                    )}
                  </Formik>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    );
  }
  
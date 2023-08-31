"use client";

import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import dayjs from "dayjs";
import { Action, IPlan, PlansDispatchContext, initialPlan } from "@/contexts/PlansContext";
import { SectionsContext } from "@/contexts/SectionsContext";
import BaseIcon from "@/components/common/elements/BaseIcon";

export default function Modal({ open, setOpen, plan }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; plan: IPlan }) {
  const titleInputRef = useRef(null);
  const dispatch = useContext(PlansDispatchContext);
  const sections = useContext(SectionsContext);
  const [formValue, setFormValue] = useState<IPlan>(initialPlan);
  const displayDate = plan ? dayjs(plan.date).format("YYYY/MM/DD") : "";
  const sectionName = plan ? sections?.find((section) => section.id === plan.sectionId)?.name : "";

  useEffect(() => {
    if (plan) {
      setFormValue(plan);
    }
  }, [plan]);

  async function handleSave() {
    if (plan.id) {
      await axios.patch("/api/plan", formValue);
      if (dispatch) {
        dispatch({ type: Action.UPDATE, value: formValue });
      }
    } else {
      const { data } = await axios.post("/api/plan", formValue);
      if (dispatch) {
        dispatch({ type: Action.ADD, value: data });
      }
    }
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={titleInputRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                      <BaseIcon>
                        <CheckCircleIcon />
                      </BaseIcon>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-4/5">
                      <Dialog.Title as="h3" className="text-base leading-6 ">
                        <label className="block text-sm text-gray-600 font-bold mb-2">タイトル</label>
                        <input
                          defaultValue={formValue.title}
                          onChange={(e) => setFormValue({ ...formValue, title: e.target.value })}
                          ref={titleInputRef}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </Dialog.Title>
                      <div className="mt-4">
                        <label className="block text-sm text-gray-600 font-bold mb-2">日付</label>
                        <p className="text-sm text-gray-600 px-3">{displayDate}</p>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm text-gray-600 font-bold mb-2">列名</label>
                        <p className="text-sm text-gray-600 px-3">{sectionName}</p>
                      </div>
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">
                          <label className="block text-sm text-gray-600 font-bold mb-2">詳細</label>
                          <textarea
                            defaultValue={formValue.content}
                            onChange={(e) => setFormValue({ ...formValue, content: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={() => handleSave()}
                  >
                    {plan.id ? "更新" : "登録"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                  >
                    キャンセル
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

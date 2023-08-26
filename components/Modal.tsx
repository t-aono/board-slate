"use client";

import { Dispatch, Fragment, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import dayjs from "dayjs";
import { Action, IPlan, PlanDispatchContext } from "@/modules/PlanContext";
import { TeamsContext } from "@/modules/TeamsContext";

export default function Modal({ open, setOpen, plan }: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; plan: IPlan }) {
  const titleInputRef = useRef(null);
  const [formValue, setFormValue] = useState<IPlan>(plan);
  const dispatch = useContext(PlanDispatchContext);
  const teams = useContext(TeamsContext);

  useEffect(() => {
    setFormValue(plan);
  }, [plan]);

  const displayDate = plan ? dayjs(plan.date).format("YYYY/MM/DD") : "";
  const teamName = plan ? teams?.find((team) => team.id === plan.teamId)?.name : "";

  async function handSave() {
    if (plan.id) {
      await axios.patch("/api/plan", formValue);
      if (dispatch) {
        dispatch({ type: Action.UPDATE, value: formValue });
      }
    } else {
      await axios.post("/api/plan", formValue);
      if (dispatch) {
        dispatch({ type: Action.ADD, value: formValue });
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
                      <CalendarIcon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        <input defaultValue={formValue.title} onChange={(e) => setFormValue({ ...formValue, title: e.target.value })} ref={titleInputRef} />
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{displayDate}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{teamName}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <textarea defaultValue={formValue.content} onChange={(e) => setFormValue({ ...formValue, content: e.target.value })} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={() => handSave()}
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

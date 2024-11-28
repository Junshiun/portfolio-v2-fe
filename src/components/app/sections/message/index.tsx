"use client";
import { SectionWrapper } from "@/components/section";
import { ChangeEvent, FormEvent, useState } from "react";
import { InputField } from "./inputField";
import { TFormData, TInputInfo } from "./type";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const MessageSection = () => {
  const formInitial: TFormData = {
    name: "",
    email: "",
    title: "",
    message: "",
  };

  const [formData, setFormData] = useState(formInitial);
  const [submitLoading, setSubmitLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const { name, email, message, title } = formData;

    try {
      setSubmitLoading(true);

      await fetch("https://api.junshiun.com/send-email-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          title,
          message,
        }),
      });
    } catch (err) {
      console.error((err as Error).message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const inputInfo: TInputInfo[] = [
    {
      type: "text",
      label: "Name *",
      required: true,
      name: "name",
      placeholder: "Jack",
    },
    {
      type: "email",
      label: "Email *",
      required: true,
      name: "email",
      placeholder: "example@domain.com",
    },
    {
      type: "text",
      label: "Title",
      // required: true,
      name: "title",
      placeholder: "Hi",
    },
    {
      type: "textarea",
      label: "Message *",
      required: true,
      name: "message",
      placeholder: "Your message here ..",
    },
  ];

  return (
    <SectionWrapper id="message" title={"SEND ME A MESSAGE"}>
      <form
        className="group/form flex flex-col gap-8 group-focus-within/form:opacity-50"
        onSubmit={submit}
      >
        {inputInfo.map((info) => {
          return (
            <InputField
              key={"inputField_" + info.name}
              formData={formData}
              handleChange={handleChange}
              info={info}
            />
          );
        })}
        {
          <button
            type="submit"
            className="self-end w-20 h-10 px-4 py-2 flex justify-center items-center //bg-gradient-to-r //from-white-01 //to-grey-01 text-grey-01 hover:text-yellow-01 rounded relative after:content-[''] after:absolute after:inset-0 after:w-full after:h-full after:bg-white after:opacity-0 hover:after:opacity-10 after:z-negative border-[0.01rem] border-solid border-grey-02 disabled:after:hidden disabled:border-none"
            disabled={submitLoading}
          >
            {submitLoading ? (
              <div className="animate-spin">
                <AiOutlineLoading3Quarters />
              </div>
            ) : (
              "Send"
            )}
          </button>
        }
      </form>
    </SectionWrapper>
  );
};

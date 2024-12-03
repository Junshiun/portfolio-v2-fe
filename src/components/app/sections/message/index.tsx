"use client";
import { SectionWrapper } from "@/components/section";
import { ChangeEvent, FormEvent, useState } from "react";
import { InputField } from "./inputField";
import { TFormData, TInputInfo } from "./type";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsSendCheck, BsSendX } from "react-icons/bs";
import { motion } from "framer-motion";

export const MessageSection = () => {
  const formInitial: TFormData = {
    name: "",
    email: "",
    title: "",
    message: "",
  };

  const [formData, setFormData] = useState(formInitial);
  const [submitState, setSubmitState] = useState<{
    loading: boolean;
    status: null | "success" | "failed"
  }>({
    loading: false,
    status: null
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();

    const { name, email, message, title } = formData;

    try {
      setSubmitState({
        loading: true,
        status: null
      });

      const response = await fetch("https://api.junshiun.com/send-email-api", {
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
      }).then(res => res.json());

      if (response.statusCode !== 200) {
        throw Error(response.message);
      }

      setSubmitState({
        loading: false,
        status: "success"
      });

    } catch (err) {
      console.error((err as Error).message);

      setSubmitState({
        loading: false,
        status: "failed"
      })
    } finally {
      setTimeout(() => {
        setSubmitState({
          loading: false,
          status: null
        })
      }, 5000)
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
      label: "Subject",
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
    <SectionWrapper id="message" title={"SEND ME A MESSAGE"} className="relative">
      <form
        className={`group/form flex flex-col gap-8 group-focus-within/form:opacity-50 ${submitState.status !== null && "opacity-20"}`}
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
            disabled={submitState.loading}
          >
            {submitState.loading ? (
              <div className="animate-spin">
                <AiOutlineLoading3Quarters />
              </div>
            ) : (
              "Send"
            )}
          </button>
        }
      </form>
      {
          submitState.status !== null &&
          <motion.div initial={{opacity: 0}} animate={{opacity: 100}} transition={{duration: 1}} className="absolute inset-0 h-full w-full flex flex-col justify-center items-center z-10">
            <div className="p-4 bg-black flex flex-col justify-center items-center gap-4 rounded [&_*]:[color:white]">
              {
                submitState.status === "success"? <BsSendCheck size="1.5rem"/> : <BsSendX size="1.5rem"/>
              }
              <span>
                {
                  submitState.status === "success"? "Message sent!": "Failed to send. Please try again."
                }
              </span>
            </div>
          </motion.div>
        }
    </SectionWrapper>
  );
};

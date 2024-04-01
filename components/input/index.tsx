"use client";

import { KeyboardEvent, useContext, useRef, useState } from "react";

import { AppContext } from "@/contexts/AppContext";
import { Cover } from "@/types/cover";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter();
  const { setCovers, user, fetchUserInfo } = useContext(AppContext);
  const [vocabulary, setVocabulary] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && !e.shiftKey) {
      if (e.keyCode !== 229) {
        e.preventDefault();
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    console.log("vocabulary", vocabulary);
    if (!vocabulary) {
      toast.error("请输入红包封面描述");
      inputRef.current?.focus();
      return;
    }

    if (!user) {
      toast.error("请先登录");
      router.push("/sign-in");
      return;
    }

    try {
      const params = {
        words: vocabulary,
      };

      setLoading(true);
      const resp = await fetch("/api/gen-cover", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
      const { code, message, data } = await resp.json();
      setLoading(false);

      if (resp.status === 401) {
        toast.error("请先登录");
        router.push("/sign-in");
        return;
      }
      console.log("save vocabulary resp", resp);

      if (code !== 0) {
        toast.error(message);
        return;
      }

      fetchUserInfo();
      setVocabulary("");

      toast.success("生成成功");
      if (data) {
        console.log("new cover", data);
        // setCovers((covers: Cover[]) => [data, ...covers]);
      }
    } catch (e) {
      console.log("gen cover failed", e);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-4 md:mt-16">
      <input
        type="text"
        className="mb-1 h-9 w-full rounded-md border border-solid border-primary px-3 py-6 text-sm text-[#333333] focus:border-primary"
        placeholder="请输入你的单词"
        ref={inputRef}
        value={vocabulary}
        onChange={(e) => setVocabulary(e.target.value)}
        onKeyDown={handleInputKeydown}
      />
      {loading ? (
        <button
          className="relative right-0 top-[5px] w-full cursor-pointer rounded-md bg-primary px-6 py-2 text-center font-semibold text-white sm:absolute sm:right-[5px] sm:w-auto"
          disabled
        >
          保存中...
        </button>
      ) : (
        <button
          className="relative right-0 top-[5px] w-full cursor-pointer rounded-md bg-primary border-primary px-6 py-2 text-center font-semibold text-white sm:absolute sm:right-[5px] sm:w-auto"
          onClick={handleSubmit}
        >
          点击保存
        </button>
      )}
    </div>
  );
}
